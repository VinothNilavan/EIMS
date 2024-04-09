import React, { useState, useEffect } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { RoundedButton, ConfirmationDialog, Passage, CommonHeader } from '@components';
import moment from 'moment';
import styles from './indexCss';
import { API } from '@api';
import { ApiEndPoint, TEXTFONTSIZE, ScreenNames } from '@constants';
import { runInAction } from 'mobx';
import { getWp, getHp, screenLogging } from '@utils';
import { useQnA, useLanguage } from '@hooks';
import axios from 'axios';
import { QnAScreen } from '@hoc';
import { HeaderType } from '../../../utils/helper';

const DiscreteSkillQnAScreen = props => {
  const [keyboardAwareState, setKeyboardAwareState] = useState(false);
  const [confirmationDialog, showConfirmationDialog] = useState(false);
  const store = useStores();
  const { qnaStore, uiStore, appStore } = useStores();

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
    parentScrollRef,
    dontKnow,
    setStartTime,
    playSound,
    initializeAudioSection,
    audioCleanup,
    showInsStVO,
    showQuesVO,
    qBodyVoiceOver,
    updateQuestion,
    skipQuestion,
    exitQnARequest,
    passageBtnClickHandler,
    stopAudio,
    closeContent,
  } = useQnA('DISCRETE_SKILL');

  const {
    closeText,
    nextText,
    idontknowText,
    submitText,
    isTamilLang,
    yesbtnText,
    nobtnText,
    viewQuestionText,
    readPassageText,
    viewPassageText,
    confirmationText,
    sessionEndingConfirmMessage,
    viewWordMeaningText,
  } = useLanguage();
  const isRTL = uiStore.isRTL;

  const signal = axios.CancelToken.source();

  useEffect(() => {
    if (qnaStore.isViewQuestionBtnVisible) {
      stopAudio();
    }
  }, [qnaStore.isViewQuestionBtnVisible]);

  const permissions =
    Object.keys(store.uiStore.menuDataPermissions).length > 0
      ? store.uiStore.menuDataPermissions.question
      : {};


  const crashLog = () => {
    screenLogging("DiscreteSkillQnAScreen", appStore?.userData);
  }
  useEffect(() => {
    reset();
    fetchContent();
    crashLog();
    return () => {
      signal.cancel('FetchFirstContent API is cancelling..');
    };
  }, []);
  const handleKeyboardListener = params => {
    setKeyboardAwareState(p => params);
  };
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

  useEffect(() => {
    if (store.uiStore.closeQnA) { 
      closeDS();
      store.uiStore.closeQnA = false;
    }
  }, [store.uiStore.closeQnA]);

  const onHeaderBtnPressHandler = () => {
    if (qnaStore.isTimeTest) {
      runInAction(() => {
        qnaStore.isTimeTestDone = true;
        qnaStore.isTimeUp = true;
      });
      setShowTimeTestModal(true);
      closeContent();
    } else {
      showConfirmationDialog(true);
    }
  };

  const fetchContent = async () => {
    let req = {
      body: {},
      store: store,
      signal,
    };
    let res = await API(ApiEndPoint.FETCH_CONTENT_V3, req);
    if (res.data.resultCode === 'C001') {
      qnaStore.init(res.data);
      if (res?.data?.contentData?.data.length == 0) {
        store.uiStore.setcontentEmpty(true);
      }
      setStartTime(moment());
      if (
        qnaStore.contentData.contentType != 'passage' ||
        qnaStore.contentData.contentSeqNum != 1
      ) {
        await audioCleanup();
        initializeAudioSection(res?.data?.contentData?.data[0]);
      }
    } else {
      store.uiStore.apiErrorInit({
        code: res.status,
        message: res.data?.resultMessage,
      });
      props.navigation.goBack();
    }
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        permissions={permissions}
        onPressBtn={onHeaderBtnPressHandler}
        headerBtnText={closeText}
        sparkieCount={qnaStore.sparkieCount}
        headerType={HeaderType.qna}
      />
    );
  };

  let rtlStyle = isRTL ? styles.RTLFooterButtonContainer : styles.footerButtonContainer;
  let baseStyle = [rtlStyle, (qnaStore.hasViewMeaningBtnVisibility === true && qnaStore.isViewQuestionBtnVisible === true) ||
    (qnaStore.isReadPassageBtnVisible === true && qnaStore.isViewQuestionBtnVisible === true) ? styles.twoLargeBtnStyle : styles.emptyStyle];

  const renderBottomButtons = () => {
    return (
      <View
        key="btm_buttons"
        style={baseStyle}>
        {skipQuestion && (
          <RoundedButton onPress={() => { dontKnow(); }}
            width={getWp(120)}
            height={getWp(46)}
            textStyle={styles.buttonText}
            type="secondaryWhite"
            text={idontknowText}
          />
        )}
        {qnaStore.isReadPassageBtnVisible && (
          <RoundedButton
            type="elevatedOrange"
            text={
              qnaStore.passageData[0]?.type == 'text'
                ? readPassageText
                : viewPassageText
            }
            textStyle={[
              styles.footerButtonText,
              {
                fontSize: isTamilLang
                  ? TEXTFONTSIZE.Text18
                  : TEXTFONTSIZE.Text24,
              },
            ]}
            containerStyle={[styles.footerButton, { marginBottom: getHp(5) }]}
            width={getWp(207)}
            height={Platform.OS === 'ios' ? getHp(45) : getHp(54)}
            onPress={() => passageBtnClickHandler('view_passage')}
          />
        )}
        {qnaStore.isViewQuestionBtnVisible && (
          <RoundedButton
            type={
              !qnaStore.enableViewQuestionButton
                ? 'squareDisabledElevated'
                : 'elevatedOrange'
            }
            disabled={!qnaStore.enableViewQuestionButton}
            text={viewQuestionText}
            textStyle={[
              styles.footerButtonText,
              {
                fontSize: isTamilLang
                  ? TEXTFONTSIZE.Text18
                  : TEXTFONTSIZE.Text24,
              },
            ]}
            containerStyle={[styles.footerButton, { marginBottom: getHp(5) }]}
            width={getWp(207)}
            height={Platform.OS === 'ios' ? getHp(45) : getHp(54)}
            onPress={() => passageBtnClickHandler('view_question')}
          />
        )}
        {qnaStore.hasViewMeaningBtnVisibility && (
          <RoundedButton
            type={
              !qnaStore?.enableViewWordMeaningButton
                ? 'squareDisabledElevated'
                : 'elevatedOrange'
            }
            disabled={!qnaStore?.enableViewWordMeaningButton}
            text={viewWordMeaningText}
            textStyle={[
              styles.footerButtonText,
              {
                fontSize: isTamilLang
                  ? TEXTFONTSIZE.Text18
                  : TEXTFONTSIZE.Text24,
              },
            ]}
            containerStyle={styles.footerButton}
            width={getWp(207)}
            height={Platform.OS === 'ios' ? getHp(45) : getHp(54)}
            onPress={() => passageBtnClickHandler('view_word_meaing')}
          />
        )}
        {qnaStore.isSubmitBtnVisible &&
          qnaStore?.isViewQuestionBtnVisible === false && (
            <RoundedButton
              type="elevatedOrange"
              text={submitText}
              textStyle={[
                styles.footerButtonText,
                {
                  fontSize: isTamilLang
                    ? TEXTFONTSIZE.Text18
                    : TEXTFONTSIZE.Text24,
                },
              ]}
              containerStyle={styles.footerButton}
              width={getWp(145)}
              height={Platform.OS === 'ios' ? getHp(45) : getHp(54)}
              onPress={() => {
                store.uiStore.setIsClicked(true);
                submitFunction();
              }}
            />
          )}
        {qnaStore.isNextBtnVisible && (
          <RoundedButton
            type="elevatedOrange"
            text={nextText}
            textStyle={[
              styles.footerButtonText,
              {
                fontSize: isTamilLang
                  ? TEXTFONTSIZE.Text18
                  : TEXTFONTSIZE.Text24,
              },
            ]}
            containerStyle={styles.footerButton}
            width={getWp(145)}
            height={Platform.OS === 'ios' ? getHp(45) : getHp(54)}
            onPress={() => {
              store.uiStore.setLoader(true);
              updateQuestion();
            }}
          />
        )}
      </View>
    );
  };
  const renderPassageView = () => {
    return (
      <Passage
        passageTree={qnaStore.passageData}
        audioCleanup={audioCleanup}
        onErrorClick={() => {
          qnaStore.reset();
          props.navigation.goBack();
        }} />
    );
  };

  const closeDS = () => {
    audioCleanup();
    showConfirmationDialog(false);
    qnaStore.reset();
    let wordData = qnaStore?.wordMeaningData;
    if ( wordData && wordData.length > 0 ) {
      exitQnARequest();
    } else {
      props.navigation.replace(ScreenNames.DiscreteSkillSessionReportScreen);
    }
  }
  return (
    <QnAScreen
      qnaStore={qnaStore}
      renderPassageView={renderPassageView}
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
      showQuesVO={showQuesVO}
      showInsStVO={showInsStVO}
      playSound={playSound}
      isBuddyVisible={!qnaStore.isTimeTest}
      qBodyVoiceOver={qBodyVoiceOver}>
      <ConfirmationDialog
        isVisible={confirmationDialog}
        title={confirmationText}
        text={sessionEndingConfirmMessage}
        primaryButton={yesbtnText}
        secondaryButton={nobtnText}
        primaryBtnPressed={() => { closeDS(); }}
        secondaryBtnPressed={() => {
          showConfirmationDialog(false);
        }}
      />
    </QnAScreen>
  );
};

export default observer(DiscreteSkillQnAScreen);
