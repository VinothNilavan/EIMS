/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/**
|--------------------------------------------------
| Q and A Screen
|--------------------------------------------------
*/
import React, { useState, useEffect, useContext } from 'react';
import { Keyboard } from 'react-native';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import {
  RoundedButton,
  NewMessageModal,
  SuccessPopup,
  AlertPopup,
  EffortPopup,
  HomeworkInstruction,
  EarnedRewardPopup,
  CommonHeader
} from '@components';
import { StarAdd, StarAdded, HigherMessage } from '@images';
import moment from 'moment';
import styles from './indexCss';
import { API } from '@api';
import { runInAction } from 'mobx';
import { getHp, getWp, screenLogging } from '@utils';
import { useBackHandler } from '@react-native-community/hooks';
import { useQnA, useStarQuestion, useLanguage } from '@hooks';
import axios from 'axios';
import { QnAScreen, ActivityStartModal, RewardCollectionModal } from '@hoc';
import { AuthContext } from '@contexts/auth-context';
import { NativeBaseProvider, View } from 'native-base';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, ApiEndPoint, ContentIDs, ScreenNames } from '@constants';
import { HeaderType } from '../../../utils/helper';

const TopicQnAScreen = props => {
  const store = useStores();
  const { qnaStore, appStore } = useStores();
  const [showMessage, setShowMessage] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { onStarHandler, starred, setStarred } = useStarQuestion();
  const [donepopupflg, setdonepopupflg] = useState(false);
  const [showBuddyImg, setShowBuddyImg] = useState(false);
  const {
    skipBtnText,
    idontknowText,
    submitText,
    nextText,
    msgSuccessText,
    effortModeLabel,
    descEffortModeLabel,
    letsGoBtnText
  } = useLanguage();

  const {
    submitFunction,
    enableScroll,
    renderCSHtmlView,
    scrollViewRef,
    renderQuestionsItem,
    renderExplanation,
    reset,
    setShowTimeTestModal,
    timerRef,
    getTimeTestPopup,
    callUpdateQuestionAttemptAPI,
    parentScrollRef,
    showQuesVO,
    setStartTime,
    dontKnow,
    callOpenActivity,
    initializeAudioSection,
    playSound,
    showInsStVO,
    qBodyVoiceOver,
    stopAudio,
  } = useQnA('TOPICS');

  const signal = axios.CancelToken.source();
  const auth = useContext(AuthContext);

  useBackHandler(() => {
    timerRef.current?.stop();
    reset();
    return props.navigation.replace(ScreenNames.TopicListingScreen);
  });

  const permissions =
    Object.keys(store.uiStore.menuDataPermissions).length > 0
      ? store.uiStore.menuDataPermissions.question
      : {};

  const crashLog = () => {
    screenLogging("TopicQnAScreen", appStore?.userData);
  }
  useEffect(() => {
    reset();
    crashLog();
    fetchContent();
    return () => {
      signal.cancel('FetchFirstContent API is cancelling..');
    };
  }, []);

  useEffect(() => {
    if (qnaStore?.isOpenActivity == true) {
      callOpenActivity();
    }
  }, [qnaStore?.isOpenActivity]);

  useEffect(() => {
    if (store.uiStore.closeQnA) { 
      closeContent();
      store.uiStore.closeQnA = false;
    }
  }, [store.uiStore.closeQnA]);

  useEffect(() => {
    if (
      qnaStore?.activityButtonType !== null &&
      qnaStore?.activityButtonType !== '' &&
      qnaStore?.activityButtonType !== undefined
    ) {
      if (qnaStore?.activityButtonType === 'done') {
        store.uiStore.setLoader(true);
        closeContent();
      } else if (qnaStore?.activityButtonType === 'skip') {
        dontKnow();
        qnaStore.setDisableBTn(true);
        callUpdateQuestionAttemptAPI();
        closeContent();
      }
    }
  }, [qnaStore?.activityButtonType]);

  const handleKeyboardListener = params => { };

  useEffect(() => {
    let didShowListener = Keyboard.addListener('keyboardDidShow', () =>
      handleKeyboardListener(true),
    );
    let didHideListener = Keyboard.addListener('keyboardDidHide', () =>
      handleKeyboardListener(false),
    );

    return () => {
      didShowListener.remove();
      didHideListener.remove();
    };
  }, []);

  const onHeaderBtnPressHandler = () => {
    timerRef.current?.stop();
    stopAudio();
    let contentMode = qnaStore.contentData.contentSubMode
      ? qnaStore.contentData.contentSubMode
      : '';

    if (qnaStore.isTimeTest) {
      runInAction(() => {
        qnaStore.isTimeTestDone = true;
        qnaStore.isTimeUp = true;
      });
      setShowTimeTestModal(true);
    } else {
      if (contentMode == 'higherLevel') {
        setdonepopupflg(!donepopupflg);
      } else {
        qnaStore.reset();
        closeContent();
      }
    }
  };

  //starred question logic
  let StarSvg = StarAdd;

  if (starred) {
    StarSvg = StarAdded;
  }

  const onStarClick = () => {
    let req = {};
    let languageCode = (qnaStore && qnaStore?.currentQuestion && qnaStore?.currentQuestion?.langCode) ? qnaStore?.currentQuestion?.langCode : "";
    let pedagogyChildId = (qnaStore?.contentHeaderInfo && qnaStore?.contentHeaderInfo.pedagogyChild && qnaStore?.contentHeaderInfo?.pedagogyChild?.id) ?
      qnaStore?.contentHeaderInfo?.pedagogyChild?.id : "";

    if (starred) {
      req = {
        contentId: qnaStore.contentData.contentId,
        topicId: qnaStore.topicId,
      };
    } else {
      req = {
        conceptID: pedagogyChildId,
        topicID: qnaStore.topicId,
        contentInfo: {
          contentID: qnaStore.contentData.contentId,
          contentVersionID: qnaStore.currentQuestion._id,
          version: qnaStore.currentQuestion.revisionNo,
          context: languageCode,
        },
      };
    }

    onStarHandler(req, starred);
  };

  const fetchContent = async () => {
    let req = {
      body: {},
      store: store,
      signal,
    };
    let apiUrl = '';
    apiUrl = ApiEndPoint.FETCH_CONTENT_V3;

    let res = await API(apiUrl, req);
    if (res.data.resultCode === 'C001') {
      qnaStore.init(res.data);
      if (res?.data?.contentData?.data.length == 0) {
        store.uiStore.setcontentEmpty(true);
      }
      if (ContentIDs.includes(qnaStore.contentData.contentId)) {
        qnaStore.showSkip();
        qnaStore.skipQnaQuestion();
      }
      initializeAudioSection(res?.data?.contentData?.data[0]);

      setStartTime(moment());
    } else if (
      res.data.resultCode == 'C004' &&
      res.data.redirectionCode == 'CloseContent'
    ) {
      //Call Close topic
      closeContent();
    } else {
      if (
        res.status &&
        res.data?.resultMessage &&
        res.data?.resultMessage != ''
      ) {
        store.uiStore.apiErrorInit({
          code: res.status,
          message: res.data?.resultMessage,
        });
        props.navigation.goBack();
      }
    }
  };

  const quitHigherLevel = async () => {
    stopAudio();
    let req = {
      body: {},
      store: store,
    };

    let res = await API(ApiEndPoint.QUIT_HIGHER_LEVEL, req);

    if (
      res.data.resultCode === 'C004' &&
      res.data.redirectionCode === 'TopicSessionReport'
    ) {
      runInAction(() => {
        store.qnaStore.topicId = res.data.redirectionData.topicID;
      });
      props.navigation.replace(ScreenNames.TopicSummaryScreen);
    } else {
      store.uiStore.apiErrorInit({
        code: res.status,
        message: res.data?.resultMessage,
      });
      console.log('CLOSE CONTENT ERROR' + JSON.stringify(res.data));
    }
  };

  const closeContent = async () => {
    store.uiStore.setTopScreenName('');
    try {
      let req = {
        body: {
          endTopicFlag: false,
          endTopicHigherLevel: false,
          userTriggered: true,
          sessionTimeExceededFlag: false,
        },
        store: store,
      };
      let res = await API(ApiEndPoint.CLOSE_CONTENT, req);
      if (!(res.hasOwnProperty('data'))) return;
      let responseData = res.data;
      if (responseData.resultCode === 'C004' && responseData.redirectionCode === 'TopicSessionReport') {
        //Check if Revice mode
        if (store.qnaStore.contentData.contentSubMode == 'revise') {
          props.navigation.navigate(ScreenNames.TopicListingScreen);
        } else {
          runInAction(() => {
            if (responseData.hasOwnProperty('redirectionData')) {
              let redirectionData = responseData.redirectionData;
              if (redirectionData.hasOwnProperty('ID')) {
                store.qnaStore.topicId = redirectionData.ID;
              }
            }
            props.navigation.navigate(ScreenNames.TopicSummaryScreen);
          });
        }
      } else {
        store.uiStore.apiErrorInit({ code: res.status, message: responseData?.resultMessage });
        console.log('CLOSE CONTENT ERROR');
        console.log(JSON.stringify(responseData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClollapsClickEvent = () => {
    setShowBuddyImg(!showBuddyImg);
  }

  const renderHeader = () => {
    return (
      <CommonHeader
        onPressBtn={onHeaderBtnPressHandler}
        permissions={permissions}
        onClick={onClollapsClickEvent}
        headerType={HeaderType.qna}
      />
    );
  };

  const renderBottomButtons = () => {
    let showFullScreenSubmit =
      qnaStore.isSkipBtnVisible &&
      qnaStore?.enableActivityStartModal === false &&
      qnaStore?.currentQuestion?.template !== 'MCQ';
    let showSbumitBtn = true;
    if (
      qnaStore?.currentQuestion?.template === 'Game' &&
      !qnaStore?.isSubmitEnabled
    ) {
      showSbumitBtn = false;
    }

    return (
      <View key="btm_buttons" style={styles.bottomBtnContainer}>
        {showFullScreenSubmit && showSbumitBtn && (
          <RoundedButton
            testID="RoundedButtonTopicQnASubmitText"
            type="squareOrange"
            text={submitText}
            textStyle={styles.bottomBtnText}
            containerStyle={{
              backgroundColor: 'transparent',
              marginBottom: getHp(5),
            }}
            width={'100%'}
            height={styles.bottomRightBtnSize.height}
            onPress={() => {
              qnaStore.setDisableBTn(true);
              store.uiStore.setIsClicked(true);
              submitFunction();
            }}
            disabled={qnaStore.disiableBtn}
          />
        )}
        {qnaStore?.enableActivityStartModal === false && (
          <View style={styles.bottomBtnSubContainer}>
            <View style={styles.leftButtons}>
              {permissions.comment && (
                <View style={styles.mrgnRight6}>
                  <HigherMessage
                    onPress={() => {
                      setShowMessage(true);
                    }}
                    height={styles.bottomLeftSvgSize.height}
                    width={styles.bottomLeftSvgSize.width}
                    accessible={true}
                    testID="HigherMessageTopicQnA"
                    accessibilityLabel="HigherMessageTopicQnA"
                  />
                </View>
              )}
              {permissions.starredQuestions && !qnaStore.isTimeTest && (
                <StarSvg
                  accessible={true}
                  testID="StarSvgTopicQnA"
                  accessibilityLabel="StarSvgTopicQnA"
                  onPress={onStarClick}
                  height={styles.bottomLeftSvgSize.height}
                  width={styles.bottomLeftSvgSize.width}
                />
              )}
            </View>
            {!qnaStore.isNextBtnVisible &&
              qnaStore.contentData.contentSubMode == 'challenge' &&
              qnaStore?.currentQuestion?.template === 'MCQ' ? (
              <RoundedButton
                testID="RoundedButtonTopicQnADontKnowBtn"
                onPress={() => {
                  dontKnow();
                }}
                width={styles.bottomRightBtnSize.width}
                height={styles.bottomRightBtnSize.height}
                containerStyle={styles.skipButtonContainer}
                textStyle={styles.buttonText}
                type="squareOrange"
                text={
                  qnaStore.contentData.contentType === 'activity'
                    ? skipBtnText
                    : idontknowText
                }
                disabled={qnaStore.disiableBtn}
              />
            ) : null}

            {(qnaStore.isSkipBtnVisible &&
              qnaStore?.currentQuestion?.template === 'MCQ') ||
              (showFullScreenSubmit && (
                <RoundedButton
                  testID="RoundedButtonTopicQnADontKnowBtn"
                  onPress={() => {
                    dontKnow();
                  }}
                  width={
                    qnaStore.contentData.contentType === 'activity' ||
                      qnaStore.isQnaSkip
                      ? styles.bottomRightBtnSize.width
                      : getWp(200)
                  }
                  height={styles.bottomRightBtnSize.height}
                  containerStyle={styles.skipButtonContainer}
                  textStyle={styles.buttonText}
                  type="squareOrange"
                  text={
                    qnaStore.contentData.contentType === 'activity' ||
                      qnaStore.isQnaSkip
                      ? skipBtnText
                      : idontknowText
                  }
                  disabled={qnaStore.disiableBtn}
                />
              ))}
            {qnaStore.isSubmitBtnVisible && !showFullScreenSubmit && (
              <RoundedButton
                testID="RoundedButtonTopicQnASubmitText"
                type="squareOrange"
                text={submitText}
                textStyle={styles.bottomBtnText}
                containerStyle={{
                  backgroundColor: 'transparent',
                }}
                width={styles.bottomRightBtnSize.width}
                height={styles.bottomRightBtnSize.height}
                onPress={() => {
                  qnaStore.setDisableBTn(true);
                  store.uiStore.setIsClicked(true);
                  submitFunction();
                }}
                disabled={qnaStore.disiableBtn}
              />
            )}
            {qnaStore.isEffortpopupVisible && (
              <EffortPopup
                testID="MessagePopupChangePicPass"
                accessible={true}
                accessibilityLabel="changePicPassMsgPopup"
                isVisible={qnaStore.isEffortpopupVisible}
                text={descEffortModeLabel}
                onPress={() => {
                  qnaStore.hideEffortpopup();
                  qnaStore.setDisableBTn(true);
                  callUpdateQuestionAttemptAPI();
                }}
                svgText={effortModeLabel}
                buttonText={letsGoBtnText}
              />
            )}
            {qnaStore.isNextBtnVisible && (
              <RoundedButton
                testID="RoundedButtonTopicQnANextText"
                type="squareOrange"
                text={nextText}
                textStyle={styles.bottomBtnText}
                containerStyle={{
                  backgroundColor: 'transparent',
                }}
                width={styles.bottomRightBtnSize.width}
                height={styles.bottomRightBtnSize.height}
                onPress={() => {
                  auth.trackEvent(
                    'mixpanel',
                    MixpanelEvents.TOPIC_NEXT_QUESTION,
                    {
                      Category: MixpanelCategories.TOPIC,
                      Action: MixpanelActions.CLICKED,
                      Label: ``,
                    },
                  );
                  qnaStore.setDisableBTn(true);
                  callUpdateQuestionAttemptAPI();
                  setStarred(false);
                }}
                disabled={qnaStore.disiableBtn}
              />
            )}
          </View>
        )}
      </View>
    );
  };

  const getParams = () => {
    let languageCode = (qnaStore && qnaStore?.currentQuestion && qnaStore?.currentQuestion?.langCode) ? qnaStore?.currentQuestion?.langCode : "";

    let data = {
      contentDetails: {
        contentType: qnaStore.contentData.contentType,
        context: languageCode,
        revisionNo: qnaStore.currentQuestion.revisionNo,
        contentSeqNum: qnaStore.contentData.contentSeqNum,
        contentAttempted: qnaStore.isNextBtnVisible,
      },
      contentID: qnaStore.contentData.contentId,
    };
    return data;
  };

  const renderInstructionView = () => {
    const instruction = qnaStore?.timeTestData?.instruction;
    if (
      instruction &&
      typeof instruction !== 'undefined' &&
      instruction !== ''
    ) {
      return (
        <HomeworkInstruction
          testID="HomeworkInstructionHomeworkQnA"
          instruction={instruction}
        />
      );
    }
    return <View />;
  };

  const checkForBadgeTitle = () => {
    if (qnaStore.nextQuestionRes != null) {
      if (qnaStore?.nextQuestionRes?.redirectionData?.endTopicFlag === true && qnaStore?.nextQuestionRes?.contentHeaderInfo?.alert != null) {
        if (qnaStore?.nextQuestionRes?.contentHeaderInfo?.alert?.title != null || qnaStore?.nextQuestionRes?.contentHeaderInfo?.alert?.badge != null) {
          store.appStore.setShowEarnedPopUp(true);
          store.appStore.setTopicHadReward(true);
          return (<EarnedRewardPopup
            isVisible={true}
            title={qnaStore?.nextQuestionRes?.contentHeaderInfo?.alert?.title}
            badge={qnaStore?.nextQuestionRes?.contentHeaderInfo?.alert?.badge}
            onPress={() => { 'EarnedRewardPopup' }}
          />)
        }
      }
    }
  }
  return (
    <NativeBaseProvider>
      <QnAScreen
        testID="QnAScreenTopicQnA"
        qnaStore={qnaStore}
        renderHeader={renderHeader}
        renderBottomButtons={renderBottomButtons}
        parentScrollRef={parentScrollRef}
        enableScroll={enableScroll}
        scrollViewRef={scrollViewRef}
        renderQuestionsItem={renderQuestionsItem}
        renderExplanation={renderExplanation}
        renderCSHtmlView={renderCSHtmlView}
        timerRef={timerRef}
        setShowTimeTestModal={setShowTimeTestModal}
        getTimeTestPopup={getTimeTestPopup}
        playSound={playSound}
        showInsStVO={showInsStVO}
        qBodyVoiceOver={qBodyVoiceOver}
        showQuesVO={showQuesVO}
        isFromTopicScreen = {true}
        isBuddyVisible={!qnaStore.isTimeTest && !showBuddyImg}
        renderHomeworkInstructionView={renderInstructionView}>
        <ActivityStartModal
          testID="ActivityStartModalTopicQnA"
          isVisible={qnaStore?.enableActivityStartModal}
          onStartBtnPressed={() => {
            qnaStore.enableActivityStartModal = false;
            callOpenActivity();
          }}
        />
        <NewMessageModal
          testID="NewMessageModalTopicQnA"
          isVisible={showMessage}
          pageId={'contentPage'}
          params={getParams()}
          onSuccess={() => {
            setShowMessage(false);
          }}
          onHide={() => {
            setShowSuccessPopup(true);
          }}
          onclose={() => {
            setShowMessage(false);
          }}
        />
        <SuccessPopup
          testID="SuccessPopupTopicQnA"
          isVisible={showSuccessPopup}
          text={msgSuccessText}
          onPress={() => {
            setShowSuccessPopup(false);
          }}
        />
        <RewardCollectionModal
          isVisible={qnaStore.enableRewardCollectModal}
          item={qnaStore.titleRewardObject}
          rewardtype={'title'}
          onStartBtnPressed={() => {
            qnaStore.enableRewardCollectModal = false;
            closeContent();
          }}
        />

        {donepopupflg && (
          <AlertPopup
            testID="SuccessPopupTopicQnA"
            isVisible={donepopupflg}
            svgText="Attention Please!"
            text={
              'Would you like to continue doing a \n higher level topic next time'
            }
            onPress={() => {
              setdonepopupflg(!donepopupflg);
              closeContent();
              qnaStore.reset();
            }}
            onBackPress={() => {
              setdonepopupflg(!donepopupflg);
              quitHigherLevel();
              qnaStore.reset();
            }}
          />
        )}
        {checkForBadgeTitle()}
      </QnAScreen>
    </NativeBaseProvider>
  );
};

export default observer(TopicQnAScreen);
