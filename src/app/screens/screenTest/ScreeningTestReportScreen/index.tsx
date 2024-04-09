import React, { useEffect } from 'react';
import styles from './indexCss';
import { View } from 'react-native';
import {
  RoundedButton,
  BalooThambiRegTextView,
  NumberSquareButton,
  DetailsScreen
} from '@components';
import { COLORS, ApiEndPoint, ScreenNames } from '@constants';
import { getWp, replaceString } from '@utils';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { API } from '@api';
import { useAuth, useLanguage } from '@hooks';

const ScreeningTestReportScreen = props => {
  const { logoutHandler } = useAuth();
  const store = useStores();

  const isRTL = store?.uiStore?.isRTL;

  useEffect(() => { (async () => { await getScreeningTestReport(store); })(); }, [store]);

  const {
    titleText,
    youDidQuestionText,
    logoutLableText,
    homeText,
    correctText,
    wrongText,
    skippedLabel
  } = useLanguage();

  return (
    <DetailsScreen
      headerBtnType="none"
      headerBtnClick={() => {
        props.navigation.goBack();
      }}
      bgName="bgSummary"
      hideLogo={true}
      customTitleStyle={styles.headerContainer}
      title={titleText == "Screening Test" ? "Level Check" : titleText}
      showOverflow={false}
      themeName="ocean"
      showAnimation={true}
      animationPosition="bottomRight"
      animationName="right_summary_animation">
      <BalooThambiRegTextView style={styles.questionCountText}>
        {replaceString(
          youDidQuestionText,
          'questions_attempt',
          store.appStore.screeningTestReport?.questionsAttempted,
        )}
      </BalooThambiRegTextView>
      {store.appStore.isAssesementTestActive ?
        <View style={isRTL ? styles.RTLCountContainer : styles.countContainer}>
          {nonAssessementReport(isRTL, store, correctText, wrongText)}
        </View> : (
          <View style={isRTL ? styles.RTLCountContainer : styles.countContainer}>
            {nonAssessementReport(isRTL, store, correctText, wrongText)}
            <View style={styles.separateView} />
            <NumberSquareButton
              text={store.appStore.screeningTestReport?.questionsSkipped}
              title={skippedLabel}
              contentStyle={{ alignItems: 'center' }}
              containerStyle={{ backgroundColor: COLORS.skippedTextColor }}
            />
          </View>)
      }

      <View style={isRTL ? styles.RTLButtonContainer : styles.buttonContainer}>
        <RoundedButton
          onPress={() => { props.navigation.replace(ScreenNames.DashboardScreen); }}
          width={getWp(120)}
          height={getWp(46)}
          type="elevatedOrange"
          text={homeText}
        />
        <View style={{ width: getWp(20) }} />
        <RoundedButton
          onPress={() => { logoutHandler("normal") }}
          width={getWp(120)}
          textStyle={styles.logoutButton}
          height={getWp(46)}
          type="secondaryWhite"
          text={logoutLableText}
        />
      </View>
    </DetailsScreen>
  );
};

const nonAssessementReport = (isRTL, store, correctText, wrongText) => {
  return (
    <>
      <NumberSquareButton
        text={store.appStore.screeningTestReport?.questionsCorrect}
        title={correctText}
        contentStyle={{ alignItems: 'center' }}
      />
      <View style={styles.separateView} />
      <NumberSquareButton
        text={store.appStore.screeningTestReport?.questionsWrong}
        title={wrongText}
        containerStyle={{ backgroundColor: COLORS.pink }}
        contentStyle={{ alignItems: 'center' }}
      />
    </>
  )
}

ScreeningTestReportScreen.propTypes = {};

ScreeningTestReportScreen.defaultProps = {};

export default observer(ScreeningTestReportScreen);

async function getScreeningTestReport(store) {
  let req = {
    body: {
      screeningTestID: store.appStore?.screeningData?.pedagogyID,
    },
    store: store,
  };
  try {
    const response = await API(ApiEndPoint.GET_SCREENING_TEST_REPORT, req);
    console.log(JSON.stringify(response.data));
    if (response.data.resultCode === 'C001') {
      let screeningReport = response.data.sessionReport;
      store.appStore.setScreeningTestReport(screeningReport);
    } else {
      console.log('API ERROR');
    }
  } catch (e) {
    console.log(`Screening Test Report error>>>${e}`);
  }
}