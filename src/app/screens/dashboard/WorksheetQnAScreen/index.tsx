/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/**
|--------------------------------------------------
| Q and A Screen
|--------------------------------------------------
*/
import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { useBackHandler } from '@react-native-community/hooks';
import { useLanguage } from '@hooks';

import {
  RoundedButton,
  NewMessageModal,
  SuccessPopup,
  CommonHeader
} from '@components';
import { HigherMessage } from '@images';
import moment from 'moment';
import { useToast } from 'native-base';
import styles from './style';
import { API } from '@api';
import { screenLogging } from '@utils';
import { ApiEndPoint, ScreenNames } from '@constants';
import { useQnA } from '@hooks';
import { QnAScreen } from '@hoc';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions } from '@constants';
import { HeaderType } from '../../../utils/helper';

const WorksheetQnAScreen = props => {
  const store = useStores();
  const { qnaStore, appStore } = useStores();
  const [showMessage, setShowMessage] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const auth = useContext(AuthContext);
  const Toast = useToast();

  const {
    submitText,
    pleaseCompleteAllQuestion,
    nextText,
    msgSuccessText,
  } = useLanguage();

  const {
    submitFunction,
    enableScroll,
    renderCSHtmlView,
    scrollViewRef,
    renderQuestionsItem,
    reset,
    timerRef,
    getWorksheetPopup,
    setShowSubmitPopup,
    setShowClosePopup,
    parentScrollRef,
    setStartTime,
    updateInputResponse,
    setShowTimesUp,
    showInsStVO,
    showQuesVO,
    qBodyVoiceOver,
    initializeAudioSection,
    audioCleanup,
    playSound,
    closeWSSession
  } = useQnA('WORKSHEET_EDICINE');

  useEffect(() => {
    if (store.uiStore.closeQnA) { 
      closeWSSession();
      store.uiStore.closeQnA = false;
    }
  }, [store.uiStore.closeQnA]);

  useBackHandler(() => {
    timerRef?.current?.stop();
    setShowClosePopup(true);
    return true;
  });

  const crashLog = () => {
    screenLogging("WorksheetQnAScreen", appStore?.userData);
  }

  const permissions = permMenuData(store);

  useEffect(() => {
    crashLog();
    reset();
    fetchContent();
  }, []);

  const callSubmitFunctionApi = (isFromNextButton = false) => {
    if (store.uiStore.isApiCalled == false) {
      submitFunction({},isFromNextButton);
      store.uiStore.setIsApiCalled(true);
      store.uiStore.setIsClicked(true);
    }
  }
  
  const fetchContent = async () => {
    try {
      let req = {body: {}, store: store};
      let res = await API(ApiEndPoint.FETCH_CONTENT_V3, req);
      if (res?.data?.resultCode === 'C001') {
        await reset();
        qnaStore.init(res?.data);
        await audioCleanup();
        if (res?.data?.contentData?.data.length == 0) {
          store.uiStore.setcontentEmpty(true);
        }
        initializeAudioSection(res?.data?.contentData?.data[0]);
        setStartTime(moment());
        updateInputResponse();
      } else if (
        res?.data?.resultCode == 'C004' &&
        res?.data?.redirectionCode == 'CloseContent'
      ) {
        props.navigation.goBack();
      } else {
        store.uiStore.apiErrorInit({
          code: res.status,
          message: res?.data?.resultMessage,
        });
        props.navigation.replace(ScreenNames.WorksheetListScreen);
      }
    } catch (err) {
      console.log('WorksheetQNA fetchContenterr err = ', err);
    }
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        testID="HeaderWorksheetQnA"
        onPressBtn={() => {
          timerRef?.current?.stop();
          setShowClosePopup(true);
        }}
        onPaginationItemPressed={callSubmitFunctionApi}
        permissions={permissions}
        headerType={HeaderType.worksheet}
      />
    );
  };

  const renderBottomButtons = () => {
    return (
      <View key="btm_buttons" style={styles.bottomBtnContainer}>
        <View style={styles.leftButtons}>
          {permissions.comment && (
            <HigherMessage
              testID="igherMessageWorkSheetQnA"
              onPress={() => {
                setShowMessage(true);
              }}
              height={styles.bottomLeftSvgSize.height}
              width={styles.bottomLeftSvgSize.width}
            />
          )}
        </View>

        <RoundedButton
          testID="RoundedButtonWorksheetQnASubmitTextn"
          type={qnaStore.isSubmitEnabled ? 'squareOrange' : 'squareDisabled'}
          text={submitText}
          textStyle={styles.bottomBtnText}
          containerStyle={{
            backgroundColor: 'transparent',
          }}
          width={styles.bottomRightBtnSize.width}
          height={styles.bottomRightBtnSize.height}
          onPress={() => {
            if (qnaStore.isSubmitEnabled) {
              auth.trackEvent('mixpanel', MixpanelEvents.WORKSHEET_SUBMIT, { "Category": MixpanelCategories.WORKSHEET, "Action": MixpanelActions.CLICKED, "Label": '' });
              setShowSubmitPopup(true);
            } else {
              if (!Toast.isActive(25)) {
                Toast.show({ id: 25, description: pleaseCompleteAllQuestion });
              }
            }
          }}
        />

        <RoundedButton
          testID="RoundedButtonWorksheetQnANextScreen"
          type="hintBlue"
          text={nextText}
          textStyle={styles.bottomBtnText}
          containerStyle={{
            backgroundColor: 'transparent',
          }}
          width={styles.bottomRightBtnSize.width}
          height={styles.bottomRightBtnSize.height}
          onPress={() => { callSubmitFunctionApi(true) }}
        />
      </View>
    );
  };

  const getParams = () => {
    let data = {
      contentDetails: {
        contentType: qnaStore?.contentData?.contentType,
        context: qnaStore?.currentQuestion?.langCode,
        revisionNo: qnaStore?.currentQuestion?.revisionNo,
        contentSeqNum: qnaStore?.contentData?.contentSeqNum,
        contentAttempted: Boolean(qnaStore?.userResponse),
      },
      contentID: qnaStore?.contentData?.contentId,
    };
    return data;
  };

  return (
    <QnAScreen
      testID="QnAScreenWorkSheetQnA"
      renderHeader={renderHeader}
      renderBottomButtons={renderBottomButtons}
      parentScrollRef={parentScrollRef}
      enableScroll={enableScroll}
      scrollViewRef={scrollViewRef}
      renderQuestionsItem={renderQuestionsItem}
      renderCSHtmlView={renderCSHtmlView}
      qnaStore={qnaStore}
      timerRef={timerRef}
      showInsStVO={showInsStVO}
      showQuesVO={showQuesVO}
      playSound={playSound}
      qBodyVoiceOver={qBodyVoiceOver}
      setShowTimesUp={setShowTimesUp}
      isWorksheet={true}>
      <NewMessageModal
        testID="NewMessageModelWorkSheetQnA"
        isVisible={showMessage}
        pageId={'workSheetsPage'}
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
        testID="SuccessPopupWorkSheetQnA"
        isVisible={showSuccessPopup}
        text={msgSuccessText}
        onPress={() => {
          setShowSuccessPopup(false);
        }}
      />
      {getWorksheetPopup()}
    </QnAScreen>
  );
};


export default observer(WorksheetQnAScreen);

const permMenuData = (store) => {
  return Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.worksheetQuestion : {};
}