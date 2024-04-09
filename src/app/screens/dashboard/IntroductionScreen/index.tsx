/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { ApiEndPoint, ScreenNames } from '@constants';
import styles from './stylesCss';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Orientation from 'react-native-orientation-locker';
import {
  RoundedButton,
  MyAutoHeightWebView,
  SVGImageBackground,
  NewMessageModal,
  SuccessPopup,
} from '@components';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { API } from '@api';
import { runInAction } from 'mobx';
import { useQnA, useLanguage } from '@hooks';
import { HigherMessage, GameBg } from '@images';

const IntroductionScreen = props => {
  const { route } = props;
  const store = useStores();
  const { qnaStore } = store;
  const { reset } = useQnA('TOPICS');

  const { nextText, msgSuccessText } = useLanguage();
  const [qUri, setQUri] = useState('');
  const [submitData, setSubmitData] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  let screenWidth = Dimensions.get('window').width - wp('10');
  let screenHeight = Dimensions.get('window').height - hp('5');

  const callFetchContent = async () => {
    try {
      let req = { body: {}, store };
      const res = await API(ApiEndPoint.FETCH_CONTENT_V3, req);
      if (res.data.resultCode == 'C001') {
        if (res?.data?.contentData?.data.length == 0) {
          store.uiStore.setcontentEmpty(true);
        }
        let contentData = res.data.contentData;

        let data = contentData.data[0];
        let contentInfo = {
          contentID: contentData.contentId,
          contentVersionID: data._id,
          contentType: contentData.contentType,
          activityType: 'introduction',
          revisionNum: data.revisionNo,
          langCode: data.langCode,
        };
        let submitInfo = {
          contentID: contentData.contentId,
          contentInfo: contentInfo,
          contentSubMode: contentData.contentSubMode,
          contentSeqNum: contentData.contentSeqNum,
        };
        setSubmitData(submitInfo);
        initializeIFrame(data.file);
      } else {
        console.log('RES:', JSON.stringify(res.data));
      }
    } catch (error) {
      console.log('intro screen error', error);
    }
  };

  const submitActivityAttempt = async option => {
    try {
      const req = {
        store: store,
        body: submitData,
      };
      const res = await API(ApiEndPoint.SUBMIT_ACTIVITY_ATTEMPT_V3, req);
      console.log('Option  = ' + option);
      if (res.data.resultCode === 'C001') {
        qnaStore.setNextQuestionData(res.data);
        runInAction(() => {
          qnaStore.showExplanation = false;
          qnaStore.isOpenActivity = false;
        });
        await reset();
        qnaStore.init(qnaStore.nextQuestionRes);
        Orientation.lockToPortrait();
        if (option == 'done') {
          props.navigation.replace(ScreenNames.TopicSummaryScreen);
        } else props.navigation.goBack();
      } else {
        store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
      }
    } catch (error) {
      console.log('submit activity attempt error', error);
    }
  };

  useEffect(() => {
    Orientation.lockToLandscape();
    Orientation.addOrientationListener(onOrientationChangeHandler);
    onOrientationChangeHandler('LANDSCAPE');
    return () => {
      Orientation.lockToPortrait();
      Orientation.removeOrientationListener(onOrientationChangeHandler);
    };
  }, [onOrientationChangeHandler]);

  const onOrientationChangeHandler = orientation => {
    if (orientation.includes('LANDSCAPE')) {
      if (route?.params?.file) {
        initializeIFrame(route?.params?.file);
      } else {
        callFetchContent();
      }
    }
  };

  const initializeIFrame = file => {
    let qUriTemp = '';
    try {
      qUriTemp = decodeURI(file);
    } catch (err) {
      qUriTemp = file;
    }
    console.log('Game Frame' + qUriTemp);
    let gameHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        body {
          font-size:100% !important;
        }
        </style>
    </head>
    <body>
    <div><iframe id='quesInteractive' src='${qUriTemp}' height='${screenWidth}' width='${screenHeight}' scrolling='yes'></iframe></div>
    </body>
    </html>`;

    setQUri(gameHtml);
  };

  const getParams = () => {
    let data = {
      contentDetails: {
        contentType: qnaStore.contentData.contentType,
        context: qnaStore.currentQuestion.langCode,
        revisionNo: qnaStore.currentQuestion.revisionNo,
        contentSeqNum: qnaStore.contentData.contentSeqNum,
        contentAttempted: qnaStore.isNextBtnVisible,
      },
      contentID: qnaStore.contentData.contentId,
    };

    return data;
  };

  return (
    <View style={styles.baseFlexOne}>
      <View
        style={styles.container}>
        <SVGImageBackground
          testID="SVGImageBackgroundGamePlayArena"
          SvgImage={GameBg}>
          <View style={styles.webviewContainer}>
            <MyAutoHeightWebView
              testID="MyAutoHeightWebViewGamePlayArena"
              onMessage={props.onWebViewCallback}
              containerStyle={{ width: screenWidth, height: screenHeight }}
              style={{
                width: screenWidth,
                height: screenHeight,
                position: 'relative',
                fontSize: 16,
              }}
              source={{ html: qUri }}
              zoomable={false}
              textZoom={100}
            />
          </View>
        </SVGImageBackground>
      </View>
      <View
        style={styles.gameDone}>
        <RoundedButton
          testID="RoundedButtonGamePlayArenaDoneBtnText"
          type="squareOrange"
          text={'Done'}
          textStyle={styles.roundedButtonText}
          containerStyle={styles.gameDoneRoundedButtonStyle}
          width={wp('12')}
          height={wp('12')}
          onPress={() => { submitActivityAttempt('done'); }}
        />
      </View>
      <View
        style={styles.baseHigherMsgModel}>
        <HigherMessage
          onPress={() => { setShowMessage(true); }}
          style={styles.higherMsgModel}
          accessible={true}
          testID="HigherMessageTopicQnA"
          accessibilityLabel="HigherMessageTopicQnA"
        />

        <RoundedButton
          testID="RoundedButtonGamePlayArenaDoneBtnText"
          type="squareOrange"
          text={nextText}
          textStyle={styles.roundedButtonText}
          containerStyle={styles.roundedButtonStyle}
          width={wp('12')}
          height={wp('12')}
          onPress={() => {
            submitActivityAttempt('next');
          }}
        />
      </View>

      <NewMessageModal
        testID="NewMessageModalTopicQnA"
        isVisible={showMessage}
        pageId={'contentPage'}
        params={getParams()}
        style={styles.newMsgModel}
        onSuccess={() => { setShowMessage(false); }}
        onHide={() => { setShowSuccessPopup(true); }}
        onclose={() => { setShowMessage(false); }}
      />
      <SuccessPopup
        testID="SuccessPopupTopicQnA"
        isVisible={showSuccessPopup}
        text={msgSuccessText}
        containerStyle={styles.sucPopup}
        onPress={() => { setShowSuccessPopup(false); }}
      />
    </View>
  );
};

IntroductionScreen.propTypes = {};

IntroductionScreen.defaultProps = {};

export default observer(IntroductionScreen);
