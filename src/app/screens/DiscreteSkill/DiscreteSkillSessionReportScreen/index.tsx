import React, { useState, useEffect } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import styles from './style';
import {
  BalooThambiRegTextView,
  NumberSquareButton,
  SparkieItem,
  RoundedButton,
  DetailsScreen,
} from '@components';
import { getWp, replaceString, screenLogging } from '@utils';
import { useStores } from '@mobx/hooks';
import { COLORS, ApiEndPoint , ScreenNames} from '@constants';
import { API } from '@api';
import { TimeTaken, Coin } from '@images';

import { useLanguage } from '@hooks';

const DiscreteSkillSessionReportScreen = props => {
  const [sessionReport, setSessionReport] = useState({});
  const store = useStores();
  const { appStore } = useStores();
  const {
    correctText,
    wrongText,
    skippedText,
    seeReportText,
    timeTakenText,
    sparkieEarnedText,
    youDidQuestionText,
  } = useLanguage();
  const isRTL = store?.uiStore?.isRTL;

  useEffect(async () => {
    crashLog();
    loadSessionReport(store,setSessionReport);
  }, [store]);


  const crashLog = () => {
    screenLogging("DiscreteSkillSessionReportScreen", appStore?.userData);
  }

  const skippedQuestionCount =
    setSessionReport?.totalQuestions > 0
      ? setSessionReport?.totalQuestions -
      (setSessionReport?.questionsCorrect + setSessionReport.questionsWrong)
      : 0;

  return (
    sessionReport &&
    <DetailsScreen
      headerBtnType="home"
      headerBtnClick={() => {
        props.navigation.navigate(ScreenNames.DashboardScreen);
      }}
      customTitleStyle={styles.titleText}
      bgName="bgSummary"
      hideLogo={true}
      title={sessionReport?.worksheetName}
      themeName="ocean"
      showAnimation={true}
      animationPosition="bottomRight"
      animationName="right_summary_animation">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={isRTL ? styles.RTLHeaderContainer : styles.headerContainer}>
          <View style={(Platform.isPad || DeviceInfo.isTablet()) && isRTL ? { flexDirection: 'row-reverse' } :
            (Platform.isPad || DeviceInfo.isTablet()) && !isRTL ? { flexDirection: 'row' } :
              { flexDirection: 'column' }}>
            <SparkieItem
              title={sparkieEarnedText}
              value={sessionReport?.sparkies}
              ImageSVG={Coin}
            />
            <SparkieItem
              title={timeTakenText}
              value={sessionReport?.timeTaken}
              ImageSVG={TimeTaken}
            />
          </View>
        </View>
        <BalooThambiRegTextView style={styles.questionCountText}>
          {replaceString(
            youDidQuestionText,
            'questions_attempt',
            sessionReport?.totalQuestions ? sessionReport?.totalQuestions : '',
          )}
        </BalooThambiRegTextView>
        <View style={isRTL ? styles.RTLCountContainer : styles.countContainer}>
          <NumberSquareButton
            text={sessionReport?.questionsCorrect}
            title={correctText}
            containerStyle={{
              backgroundColor: COLORS.worksheetCorrectCountBackgroundColor,
            }}
          />
          <View style={{ width: getWp(34) }} />
          <NumberSquareButton
            text={sessionReport?.questionsWrong}
            title={wrongText}
            containerStyle={{
              backgroundColor: COLORS.worksheetWrongCountBackgroundColor,
            }}
          />
          <View style={{ width: getWp(34) }} />
          <NumberSquareButton
            text={skippedQuestionCount}
            title={skippedText}
            containerStyle={{
              backgroundColor: 'black',
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
            onPress={() => {
              props.navigation.navigate(ScreenNames.DiscreteSkillReportScreen, {
                trailType: 'session',
              });
            }}
            width={getWp(180)}
            height={getWp(56)}
            textStyle={{ color: COLORS.white }}
            type="elevatedOrange"
            text={seeReportText}
          />
        </View>
      </ScrollView>
    </DetailsScreen>
  );
};

DiscreteSkillSessionReportScreen.propTypes = {};

DiscreteSkillSessionReportScreen.defaultProps = {};

export default DiscreteSkillSessionReportScreen;

const loadSessionReport = async (store, setSessionReport) => {

  const req = { store: store, body: {} };
  try {
    const response = await API(ApiEndPoint.GET_DISCRETE_SKILL_SESSION_REPORT, req);
    if (response.data.resultCode === 'C001') {
      let reports = response?.data?.data;
      setSessionReport(reports);
      store.uiStore.setChangedInUserData(true);
    } else {
      store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
    }
  } catch (error) {
    console.log(`Reward Details error>>>${error}`);
  }
}