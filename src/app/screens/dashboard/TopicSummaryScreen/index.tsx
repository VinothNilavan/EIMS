/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { ScrollView } from 'react-native';
import moment from 'moment';

import {
  BalooThambiRegTextView,
  RoundedButton,
  NumberSquareButton,
  SparkieItem,
  DetailsScreen,
  SVGImageBackground,
  EarnedRewardPopup,
} from '@components';
import { Coin } from '@images';
import { API } from '@api';
import { getAsValue, replaceString, screenLogging } from '@utils';
import { useStores } from '@mobx/hooks';
import styles from './indexCss';
import { useLanguage } from '@hooks';
import { useBackHandler } from '@react-native-community/hooks';
import DeviceInfo from 'react-native-device-info';
import { AuthContext } from '@contexts/auth-context';
import { NativeBaseProvider, View } from 'native-base';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, COLORS, ApiEndPoint, ScreenNames } from '@constants';

const TopicSummaryScreen = props => {
  const store = useStores();
  const { qnaStore, appStore } = useStores();
  const [topicReport, setTopicReport] = useState({});
  const auth = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const {
    sparkieEarnedText,
    timeTakenText,
    youDidQuestionText,
    viewMapText,
    correctText,
    wrongText,
    attemptText,
  } = useLanguage();

  const permissions =
    Object.keys(store.uiStore.menuDataPermissions).length > 0
      ? store.uiStore.menuDataPermissions.topicSessionReport
      : {};

  const crashLog = () => {
    screenLogging(ScreenNames.TopicSummeryScreen, appStore?.userData);
  }

  useEffect(() => {
    (async () => {
      const reqBody = {
        jwt: getAsValue('jwt'),
        store: store,
        body: {
          topicID: store.qnaStore.topicId,
        },
      };
      try {
        let response = await API(ApiEndPoint.TOPIC_SESSION_REPORT, reqBody);
        console.log('\n\n response.data.sessionReport.actions[1].name', response.data.sessionReport.actions);
        response.data.sessionReport.actions[1].name = "howIDid";
        console.log('\n\n response.data.sessionReport.actions[1].name', response.data.sessionReport.actions);

        console.log('\n\n response', JSON.stringify(response.data));
        if (response.data.resultCode === 'C001') {
          let sessionReport = response.data.sessionReport;
          sessionReport.sessionReward = response.data.sessionReward;
          store.uiStore.setChangedInUserData(true);
          setTopicReport(sessionReport);
          console.log("setTopicReport(sessionReport); Successfull")
        } else {
          if (
            response.status &&
            response.data?.resultMessage &&
            response.data?.resultMessage != ''
          ) {
            store.uiStore.apiErrorInit({
              code: response.status,
              message: response.data?.resultMessage,
            });
          }
        }
      } catch (err) {
        console.log(`Reward Details error>>>${err}`);
      }
      crashLog();
    })();
    clearNextQuestionResForEndtopic();
  }, [store]);

  useBackHandler(() => {
    return props.navigation.navigate(ScreenNames.DashboardScreen);
  });

  const clearNextQuestionResForEndtopic = () => {
    if (store.appStore.isTopicHadReward === true) {
      qnaStore.setNextQuestionData({});
      store.appStore.setTopicHadReward(false);
    } else if (showPopup == false && qnaStore?.nextQuestionRes?.contentHeaderInfo?.alert != null) {
      if (qnaStore?.nextQuestionRes?.contentHeaderInfo?.alert?.title != null || qnaStore?.nextQuestionRes?.contentHeaderInfo?.alert?.badge != null) {
        store.appStore.setShowEarnedPopUp(true);
        setShowPopup(true);
      }
    }
  }


  const onEarnedPopupClickHandler = () => {
    setShowPopup(false);
    qnaStore.setNextQuestionData({});
  }

  const headerBtnClickHandler = () => {
    auth.trackEvent('mixpanel', MixpanelEvents.SESSION_REPORT_GO_TO_HOME, { "Category": MixpanelCategories.TOPIC, "Action": MixpanelActions.CLICKED, "Label": '' });
    props.navigation.navigate(ScreenNames.DashboardScreen);
  };

  const ViewMapLearningClickHandler = () => {
    auth.trackEvent('mixpanel', MixpanelEvents.SESSION_REPORT_LEARNING_MAP, {
      Category: MixpanelCategories.TOPIC,
      Action: MixpanelActions.CLICKED,
      Label: '',
    });
    props.navigation.replace(ScreenNames.TopicMapScreen, {
      topic: store.qnaStore.selectedTopic,
    });
  };

  return (
    <NativeBaseProvider>
      <DetailsScreen
        testID="DetailsScreenTopicSummary"
        headerBtnType="home"
        headerBtnClick={headerBtnClickHandler}
        footerContainerStyle={styles.footerContainerStyle}
        showAnimation
        headerTitle={topicReport?.topicName}
        svgUrl={topicReport?.topicIcon}
        bgName="bgSummary"
        bgFooterName="bgFooterInner"
        animationName="rightSummaryAnimation">
        <ScrollView
          overScrollMode='never'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: DeviceInfo.isTablet() ? 1 : 0.9,
            height: '90%',
            alignItems: 'center',
          }}>
          <View style={styles.subContainer}>
            <View style={styles.sparkieContainer}>
              {permissions.mySparkies && (
                <SparkieItem
                  testID="TopicSummaryTopicSummarySparkieEarnedText"
                  title={sparkieEarnedText}
                  value={topicReport?.sessionReward?.sparkie}
                  ImageSVG={Coin}
                  containerStyle={styles.mrgnBtm30}
                />
              )}
              <SparkieItem
                testID="TopicSummaryTopicSummarySparkieTimeTakenText"
                title={timeTakenText}
                value={
                  topicReport
                    ? moment
                      .utc(
                        moment
                          .duration(topicReport.timeSpent, 'seconds')
                          .as('milliseconds'),
                      )
                      .format('mm:ss')
                    : 0
                }
                ImageSVG="timeTaken"
                themeBased
                containerStyle={styles.mrgnBtm120}
              />
            </View>

            <BalooThambiRegTextView
              testID="TopicSummaryTopicSummaryYouDidQuestionText"
              style={styles.questionCountText}>
              {replaceString(youDidQuestionText, 'questions_attempt', topicReport?.questionAttempted)}
            </BalooThambiRegTextView>

            <View style={styles.countContainer}>
              {permissions.correct && (
                <NumberSquareButton
                  testID="NumberSquareButtoTopicSummarynCorrectText"
                  text={topicReport?.questionCorrect}
                  title={correctText}
                  contentStyle={styles.numberSquareStyle}
                />
              )}

              {permissions.wrong && (
                <NumberSquareButton
                  testID="NumberSquareButtonTopicSummaryWrongText"
                  text={topicReport?.questionWrong}
                  title={wrongText}
                  containerStyle={{
                    backgroundColor: COLORS.pink,
                  }}
                  contentStyle={styles.numberSquareStyle}
                  isLastItem
                />
              )}
            </View>

            {showPopup ? <EarnedRewardPopup
              isVisible={true}
              title={qnaStore?.nextQuestionRes?.contentHeaderInfo?.alert?.title}
              badge={qnaStore?.nextQuestionRes?.contentHeaderInfo?.alert?.badge}
              onPress={onEarnedPopupClickHandler}
            /> : null}  
            {permissions.attempt && !topicReport?.revise && (
              <Fragment>
                <BalooThambiRegTextView
                  testID="TopicSummaryAttemptedText"
                  style={styles.titleText}>
                  {attemptText}
                </BalooThambiRegTextView>
                <View style={styles.svgContainer}>
                  <SVGImageBackground
                    testID="SVGImageBackgroundTopicSummary"
                    SvgImage="attempt"
                    themeBased
                    customContainerStyle={styles.svgBgStyle}
                    style={styles.attemptSvgStyle}
                  />
                </View>
                <BalooThambiRegTextView
                  testID="TopicSummarytopicReportTxt"
                  style={styles.attemptCountText}>
                  {topicReport?.topicAttemptNum}
                </BalooThambiRegTextView>
              </Fragment>
            )}
            <View style={styles.buttonContainer}>
              <RoundedButton
                testID="RoundedButtonTopicSummarySelectedTopic"
                onPress={ViewMapLearningClickHandler}
                width={'100%'}
                height={styles.btnStyle.height}
                textStyle={styles.btnText}
                type="elevatedOrange"
                text={viewMapText}
              />
            </View>
          </View>
        </ScrollView>
      </DetailsScreen>
    </NativeBaseProvider>
  );
};

TopicSummaryScreen.propTypes = {};

TopicSummaryScreen.defaultProps = {};

export default TopicSummaryScreen;
