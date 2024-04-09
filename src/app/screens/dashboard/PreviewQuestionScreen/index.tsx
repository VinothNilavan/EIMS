// External Imports
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { QnAScreen } from '@hoc';
import { CommonActions } from '@react-navigation/native';

// Internal Imports
import styles from './style';
import { ApiEndPoint, ContentIDs, ScreenNames } from '@constants';
import { getWp } from '@utils';
import { API } from '@api';
import { RoundedButton, CommonHeader } from '@components';
import { useQnA } from '@hooks';
import { useLanguage } from '@hooks';
import { HeaderType } from '../../../utils/helper';

const PreviewQuestionScreen = props => {
  const { route } = props;
  const store = useStores();
  const { uiStore, qnaStore } = store;
  const params = route?.params?.data;
  const { skipBtnText, submitText, nextText } = useLanguage();

  const {
    submitFunction,
    enableScroll,
    renderCSHtmlView,
    scrollViewRef,
    renderQuestionsItem,
    renderExplanation,
    reset,
    getTimeTestPopup,
    timerRef,
    setShowTimeTestModal,
    parentScrollRef,
    initializeAudioSection,
    showQuesVO,
    showInsStVO,
    playSound,
    qBodyVoiceOver,
    stopAudio,
  } = useQnA('SEARCH');

  useEffect(() => {
    reset();
    fetchQuestion();
  }, []);

  const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.question : {};

  const fetchQuestion = async () => {
    const reqBody = { store: store, body: params };

    qnaStore.setLoader(true);
    const URL = params?.category === 'IGRE' || params?.category === 'IGRE_REM' ? ApiEndPoint.GET_PREVIEW_QUESTION_IGRE : ApiEndPoint.GET_PREVIEW_QUESTION_CONTENT;

    const response = await API(URL, reqBody);
    qnaStore.setLoader(true);
    if (response.data.resultCode === 'C001') {
      try {
        const question = response?.data?.contentData?.data[0];
        if (question) {
          qnaStore.init(response?.data);
          if (question.langCode) {
            uiStore.setRTL(question.langCode);
          }
          initializeAudioSection(question);
          if (ContentIDs.includes(qnaStore.contentData.contentId)) {
            qnaStore.showSkip();
          }
        } else {
          uiStore.apiErrorInit({ code: response.status, message: "Question not found" });
          props.navigation.navigate('PreviewQnASearchScreen');
        }
      }
      catch (error) {
        console.log('error in preview response');
      }
    } else {
      if (response.status && response.data?.resultMessage && response.data?.resultMessage != '') {
        uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
      }
      props.navigation.navigate(ScreenNames.PreviewQnASearchScreen);
    }
  };

  const renderBottomButtons = () => {
    return (
      <View key="btm_buttons" style={styles.bottomBtnContainer}>
        {qnaStore.isSkipBtnVisible && (
          <RoundedButton
            testID="RoundedButtonPreviewQuestionSkipBtn"
            onPress={() => props.navigation.dispatch(CommonActions.goBack())}
            width={getWp(120)}
            height={getWp(46)}
            textStyle={styles.buttonText}
            type="secondaryWhite"
            text={skipBtnText}
          />
        )}
        {qnaStore.isSubmitBtnVisible && (
          <RoundedButton
            testID="RoundedButtonPreviewQuestionSumbitText"
            type="squareOrange"
            text={submitText}
            textStyle={styles.bottomBtnText}
            containerStyle={{
              backgroundColor: 'transparent',
            }}
            width={styles.bottomRightBtnSize.width}
            height={styles.bottomRightBtnSize.height}
            onPress={() => {
              store.uiStore.setIsClicked(true);
              submitFunction();
            }}
          />
        )}
        {qnaStore.isTimeTest && qnaStore.isNextBtnVisible && (
          <RoundedButton
            testID="RoundedButtonPreviewQuestionNextText"
            type="squareOrange"
            text={nextText}
            textStyle={styles.bottomBtnText}
            containerStyle={{
              backgroundColor: 'transparent',
            }}
            width={styles.bottomRightBtnSize.width}
            height={styles.bottomRightBtnSize.height}
            onPress={() => { console.log(`RoundedButton`) }}
          />
        )}
      </View>
    );
  };

  const HeaderClickListner = () => {
    stopAudio();
    reset();
    props.navigation.dispatch(CommonActions.goBack());
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        onPressBtn={HeaderClickListner}
        permissions={permissions}
        onClick={() => { }}
        headerType={HeaderType.qna}
      />
    );
  };

  return (
    <QnAScreen
      testID="QnAScreenPreviewQuestion"
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
      showQuesVO={showQuesVO}
      showInsStVO={showInsStVO}
      playSound={playSound}
      qBodyVoiceOver={qBodyVoiceOver}
    />
  );
};

PreviewQuestionScreen.propTypes = {};

PreviewQuestionScreen.defaultProps = {};

export default observer(PreviewQuestionScreen);