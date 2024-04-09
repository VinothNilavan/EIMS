import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import styles from './indexCss';
import { ScreenTestHeader, RoundedButton, Passage } from '@components';
import { getWp, setAsValue } from '@utils';
import { useStores } from '@mobx/hooks';
import { API } from '@api';
import moment from 'moment';
import { useToast } from 'native-base';
import { runInAction } from 'mobx';
import { ApiEndPoint, ScreenNames } from '@constants';
import { useQnA, useLanguage } from '@hooks';
import { QnAScreen } from '@hoc';

const ScreenTestScreen = props => {
  const store = useStores();
  const { qnaStore, uiStore, appStore } = store;
  const Toast = useToast();

  const {
    submitFunction,
    renderQuestionsItem,
    scrollViewRef,
    setEnableScroll,
    enableScroll,
    skipQuestion,
    setskipQuestion,
    renderCSHtmlView,
    setStartTime,
    parentScrollRef,
    reset,
    playSound,
    initializeAudioSection,
    audioCleanup,
    showInsStVO,
    showQuesVO,
    qBodyVoiceOver,
    dontKnow,
    passageBtnClickHandler,
  } = useQnA('SCREEN_TEST');

  const {
    closeText,
    nextText,
    idontknowText,
    viewQuestionText,
    readPassageText,
    titleText,
    baselineTitleText,
    midlineTitleText,
    endlineTitleText
  } = useLanguage();

  const isRTL = uiStore.isRTL;

  let testTitleText = titleText;
  switch (appStore.screeningData.pedagogyType.toLowerCase()) {
    case "baselinetest":
      testTitleText = baselineTitleText
      break;
    case "midlinetest":
      testTitleText = midlineTitleText
      break;
    case "endlinetest":
      testTitleText = endlineTitleText
      break;
    default:
      if (titleText.toLowerCase() === "screening test") {
        testTitleText = "Level Check";
      }
      break;
  }

  useEffect(() => {
    (async () => {
      let req = {
        body: {},
        store: store,
      };

      qnaStore.setLoader(true);
      try {
        let response = await API(ApiEndPoint.FETCH_CONTENT_V3, req);
        qnaStore.setLoader(false);
        if (response.data.resultCode === 'C001') {
          let questions = response.data.contentData;
          if (response?.data?.contentData?.data.length == 0) {
            store.uiStore.setcontentEmpty(true);
          }
          if (
            questions.hasOwnProperty('contentParams') &&
            questions?.contentParams &&
            questions?.contentParams.length > 0 &&
            questions?.contentParams.userAttemptData.hasOwnProperty(
              'userResponse',
            )
          ) {
            quitWorksheets();
          } else if (questions.length === 0) {
            quitWorksheets();
          } else {
            reset();
            setskipQuestion(response?.data?.contentData?.skipQuestion);
            qnaStore.init(response.data);
            setStartTime(moment());
            await audioCleanup();
            initializeAudioSection(response?.data?.contentData?.data[0]);
            //Disable scroll for Sortlist and Matchlist questions
            if (qnaStore?.currentQuestion?.template === 'SortList' || qnaStore?.currentQuestion?.template === 'MatchList') {
            } else {
              setEnableScroll(true);
            }
          }
        } else {
          if (response.data.resultMessage === 'redirect') {
            if (
              response.data.redirectionData.sessionTimeExceededFlag === true
            ) {
              console.log('SESSION TIME EXCEEDED3');
              if (!Toast.isActive(31)) {
                Toast.show({ id: 31, description: 'Fetch Content: Session Exceeded' });
              }
              store.uiStore.setSessionExceeded(true);
              runInAction(() => {
                store.uiStore.sessionExceeded = true;
              });

              setTimeout(() => {
                setAsValue('jwt', '');
                store.loginStore.setIsAuth(false);
              }, 5000);
            }
          }
          console.log(
            'Fetch First Content API ERROR:' + JSON.stringify(response.data),
          );
          qnaStore.setLoader(false);
        }
      } catch (e) {
        if (!Toast.isActive(32)) {
          Toast.show({
            id: 32,
            description: 'Error in fetch Content:' + e,
            duration: 5000,
          });
        }
        console.log(`Screening Test error>>>${e}`);
        qnaStore.setLoader(false);
      }
    })();

    return () => { };
  }, []);

  const isNextBtnVisible = () => {
    if (qnaStore?.currentQuestion?.template !== 'MCQ') {
      return true;
    } else {
      if (qnaStore?.currentQuestion?.multiResponse === true || qnaStore?.currentQuestion?.multiResponse === 'true') {
        return true;
      }
    }
    return false;
  }

  const renderPassageView = () => {
    return (
      <Passage
        passageTree={qnaStore.contentData?.passageData[0]}
        audioCleanup={audioCleanup}
      />
    );
  };

  const renderBottomButtonView = () => {
    return (
      <View style={isRTL ? styles.RTLButtonContainer : styles.buttonContainer}>
        {skipQuestion && (
          <RoundedButton
            onPress={() => {
              dontKnow();
            }}
            width={getWp(150)}
            height={getWp(46)}
            textStyle={styles.buttonText}
            type="secondaryWhite"
            text={idontknowText}
          />
        )}
        {qnaStore.isReadPassageBtnVisible && (
          <RoundedButton
            type="elevatedOrange"
            text={readPassageText}
            textStyle={styles.footerButtonText}
            width={getWp(180)}
            height={getWp(46)}
            onPress={() => {
              passageBtnClickHandler('view_passage');
              runInAction(() => {
                qnaStore.isReadPassageBtnVisible = false;
                qnaStore.isViewQuestionBtnVisible = true;
              });
            }}
          />
        )}
        {qnaStore.isViewQuestionBtnVisible && (
          <RoundedButton
            type="elevatedOrange"
            text={viewQuestionText}
            textStyle={styles.footerButtonText}
            containerStyle={styles.footerButton}
            width={Dimensions.get('window').width / 2}
            height={getWp(46)}
            onPress={() => {
              passageBtnClickHandler('view_question');
              runInAction(() => {
                qnaStore.isReadPassageBtnVisible = true;
                qnaStore.isViewQuestionBtnVisible = false;
              });
            }}
          />
        )}
        {isNextBtnVisible() && <RoundedButton
          onPress={async () => {
            store.uiStore.setIsClicked(true);
            submitFunction();
          }}
          width={getWp(120)}
          height={getWp(46)}
          type="elevatedOrange"
          text={nextText}
        />}
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <ScreenTestHeader
        primaryButtonText={closeText}
        title={testTitleText}
        primaryButtonPressed={() => {
          qnaStore.reset();
          audioCleanup();
          props.navigation.replace(ScreenNames.ScreeningTestReportScreen);
        }}
        secondaryButtonPressed={() => {
          if (!Toast.isActive(33)) {
            Toast.show({ id: 33, description: 'WIP' });
          }
        }}
      />
    );
  };

  return (
    <QnAScreen
      qnaStore={qnaStore}
      renderPassageView={renderPassageView}
      renderBottomButtons={renderBottomButtonView}
      searchQScreen={false}
      parentScrollRef={parentScrollRef}
      enableScroll={enableScroll}
      skipQuestion={skipQuestion}
      scrollViewRef={scrollViewRef}
      renderQuestionsItem={renderQuestionsItem}
      renderCSHtmlView={renderCSHtmlView}
      showQuesVO={showQuesVO}
      showInsStVO={showInsStVO}
      playSound={playSound}
      qBodyVoiceOver={qBodyVoiceOver}
      renderHeader={renderHeader}
    />
  );
};

ScreenTestScreen.propTypes = {};

ScreenTestScreen.defaultProps = {};

export default ScreenTestScreen;
