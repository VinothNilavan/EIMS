import React, { useRef, useState} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { observer, PropTypes } from 'mobx-react';
import {
  SVGImageBackground,
  BalooThambiRegTextView,
  SourceSansProBoldTextView,
  Loader,
  QuestionLabel,
  Timer,
  TimedTestLiveStats,
  WorksheetTimer,
  DashboardFooter,
  WordMeaning,
  Buddy,
} from '@components';

import { getHp } from '@utils';
import DeviceInfo from 'react-native-device-info';

import { Config } from 'react-native-config';

import { useStores } from '@mobx/hooks';
import { runInAction } from 'mobx';
import styles from './indexCss';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const QnAScreen = props => {
  const {
    testID,
    renderHeader,
    renderPassageView,
    renderBottomButtons,
    renderSearchFields,
    searchQScreen,
    enableScroll,
    scrollViewRef,
    renderQuestionsItem,
    renderExplanation,
    timerRef,
    setShowTimeTestModal,
    setShowTimesUp,
    getTimeTestPopup,
    renderHomeworkSolutionView,
    renderHomeworkInstructionView,
    isBuddyVisible,
    isWorksheet,
    isFromTopicScreen
  } = props;

  const { qnaStore, uiStore } = useStores();
  const isRTL = uiStore.isRTL;
  const currScrollView = useRef(null);
  const [subscriptionPos, setSubscriptionPos] = useState({ x: 0, y: 0 });

  const contentIdArray =`${qnaStore.currentQuestion?._id}`.split('_');
  const qcodeVersion= (contentIdArray.length>0)?` | ${contentIdArray[contentIdArray.length-2]}_${contentIdArray[contentIdArray.length-1]}`:``;
  
  let loader = null;

  if (qnaStore.loader) {
    loader = <Loader />;
  }

  const onLayoutHandler = () => {
    currScrollView?.current?.scrollTo({ x: 0, y: subscriptionPos.y, animated: true });
  };

  const onLayoutChangeListner = event => {
    const layout = event.nativeEvent.layout;
    setSubscriptionPos({
      x: layout.x,
      y: layout.y,
    });
    if (layout.height > 0) {
      onLayoutHandler();
    }
  }

  const renderQuestionView = () => {
    return qnaStore?.isViewQuestionBtnVisible ? (
      renderPassageView()
    ) : (
      renderQuestionsItem(qnaStore.currentQuestion.template, isWorksheet)
    )
  }

  return (
    <SafeAreaView
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={styles.mainContainer}>
      <SVGImageBackground
        testID="SVGImageBackgroundQnAScreen"
        SvgImage="bgCommon"
        themeBased
        screenBg>
        <View style={styles.flexOne}>
          <DashboardFooter
            testID="DashboardFooterQnAScreen"
            detailPage
            containerStyle={styles.footerContainerStyle}
          />

          <KeyboardAwareScrollView
            scrollEnabled={true}
            ref={currScrollView}>
            <View style={[styles.keyboard, { marginTop: DeviceInfo.isTablet() ? getHp(-50) : getHp(0) }]} >
              <ScrollView
                key="qnaScrollView"
                overScrollMode={'never'}
                horizontal={false}
                persistentScrollbar={false}
                showsVerticalScrollIndicator={true}
                scrollEnabled={enableScroll}
                nestedScrollEnabled={true}
                style={
                  qnaStore?.isSkipBtnVisible
                    ? styles.skipQuestionScrollContainer
                    : styles.scrollviewContainer
                }
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="never"
                automaticallyAdjustContentInsets={false}
                onResponderMove={() => { console.log('outer responding'); }}
                ref={scrollViewRef}>
                <View>
                  {qnaStore?.currentQuestion?._id && (
                    <View style={styles.cardContainer}>
                      <View
                        style={
                          isRTL
                            ? styles.RTLQuestionCardHeaderContainer
                            : styles.questionCardHeaderContainer
                        }>
                        {qnaStore?.isViewQuestionBtnVisible === false && (
                          <View
                            accessible={true}
                            testID="QnAScreenisViewQuestionBtnVisible"
                            accessibilityLabel="QnAScreenisViewQuestionBtnVisible"
                            style={[styles.questionTagContainer]}>
                            <QuestionLabel />
                          </View>
                        )}
                        <View style={styles.soundIconContainer}>
                          <BalooThambiRegTextView
                            testID="QnAScreenContentSeqNum"
                            style={styles.questionNumberText}>
                            {qnaStore.contentData?.contentSeqNum}
                          </BalooThambiRegTextView>
                        </View>

                        {qnaStore.isTimeTest && (
                          <Timer
                            testID="TimerQnAScreen"
                            start={qnaStore.timeTestData.durationClass}
                            ref={timerRef}
                            onTimeUp={() => {
                              runInAction(() => {
                                qnaStore.isTimeUp = true;
                                qnaStore.timeTaken =
                                  qnaStore.timeTestData.durationClass * 60;
                              });
                              setShowTimeTestModal(true);
                            }}
                            containerStyle={styles.timerContainer}
                          />
                        )}
                        {qnaStore?.timed && !qnaStore?.isOpenedFirstTime && (
                          <WorksheetTimer
                            testID="WorksheetTimerQnAScreen"
                            start={
                              qnaStore?.contentHeaderInfo?.remainingTime
                                ? qnaStore?.contentHeaderInfo?.remainingTime
                                : qnaStore?.contentHeaderInfo?.totalTime
                            }
                            ref={timerRef}
                            onTimeUp={() => {
                              setShowTimesUp(true);
                            }}
                            containerStyle={styles.timerContainer}
                          />
                        )}
                      </View>
                      <View>
                        <View style={styles.questionContainer}>
                          {qnaStore.isTimeTest && (
                            <View style={styles.timeTestDetailsContainer}>
                              <BalooThambiRegTextView
                                testID="QnAScreenTimeTitle"
                                style={styles.timeTestTitle}>
                                {qnaStore.timeTestData.title}
                              </BalooThambiRegTextView>
                              <TimedTestLiveStats
                                testID="TimedTestStatQnAScreen"
                                attempted={qnaStore.timeTestUserAnswers.length}
                                correct={qnaStore.correctAnswerCount}
                                total={qnaStore.timeTextQuestions.length}
                              />
                            </View>
                          )}
                          {renderHomeworkInstructionView &&
                            typeof renderHomeworkInstructionView !==
                            'undefined' &&
                            renderHomeworkInstructionView()}
                          
                          {qnaStore?.enableWordMeaning ? (
                            <WordMeaning />
                          ) : renderQuestionView()}

                          {typeof renderHomeworkSolutionView !== 'undefined' &&
                            renderHomeworkSolutionView()}
                        </View>
                        <View style={styles.explanationContainer} onLayout={onLayoutChangeListner}>
                          {qnaStore?.isViewQuestionBtnVisible === false &&
                            renderExplanation &&
                            renderExplanation()}
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          </KeyboardAwareScrollView>
          {renderBottomButtons()}
          
          {isBuddyVisible && !isFromTopicScreen && <Buddy isAnimated={true}/>}
          {isFromTopicScreen && <Buddy isAnimated={true} isBuddyVisible={isBuddyVisible}/>}
          
          <SourceSansProBoldTextView
            testID="QnAScreenSessionID"
            style={styles.sessionIDText}>
            {Config.FIX_VERSION + '|'}
            {qnaStore.sessionInformation?.sessionID} |{' '}
            {qnaStore.currentQuestion?.qcode}
            {qcodeVersion}
          </SourceSansProBoldTextView>
          {!searchQScreen && renderHeader()}
          {searchQScreen && renderSearchFields()}
          {qnaStore.isTimeTest && getTimeTestPopup()}
          {props.children}
        </View>
        {loader}
      </SVGImageBackground>
    </SafeAreaView>
  );
};

QnAScreen.propTypes = {
  testID: PropTypes.string,
  isWorksheet: PropTypes.bool,
};

QnAScreen.defaultProps = {
  testID: 'QnAScreen',
  isWorksheet: false,
  isFromTopicScreen : false
};

export default observer(QnAScreen);
