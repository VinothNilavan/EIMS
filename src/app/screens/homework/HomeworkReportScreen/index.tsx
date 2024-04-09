/* eslint-disable react-hooks/exhaustive-deps */
// External Imports
import React, { useState, useEffect, Fragment, useContext } from 'react';
import { FlatList, View } from 'react-native';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';

// Internal Imports
import { API } from '@api';
import { ApiEndPoint, ScreenNames } from '@constants';
import styles from './style';
import {
  WorksheetTopicHeader,
  BalooThambiRegTextView,
  FilterItem,
  PaginationView,
  DetailsScreen,
  CustomReportListCard,
} from '@components';
import { screenLogging } from '@utils';
import { useLanguage } from '@hooks';
import { useBackHandler } from '@react-native-community/hooks';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions } from '@constants';
import { ReportScreen } from '../../../helpers';

const HomeworkReportScreen = props => {
  const [currentMode, setCurrentMode] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  const [summaryCardHeight, setSummaryCardHeight] = useState(0);

  const { filterNoQuestionFound, homeWorkReportLabel } = useLanguage();

  const { homework } = props.route.params;
  const store = useStores();
  const { homeworkStore, appStore } = useStores();

  const auth = useContext(AuthContext);

  const permissions =
    Object.keys(store.uiStore.menuDataPermissions).length > 0
      ? store.uiStore.menuDataPermissions.homeworkReport
      : {};

  useEffect(() => {
    return () => {
      homeworkStore.reset();
    }
  }, []);

  useEffect(() => {
    crashLog();
    homeworkStore.reset();
    fetchContent();
  }, [homework]);

  const crashLog = () => {
    screenLogging("HomeworkReportScreen", appStore?.userData);
  }

  useBackHandler(() => {
    homeworkStore.reset();
    props.navigation.navigate(ScreenNames.HomeworkListScreen);
  });


  const fetchContent = async () => {
    try {
      let req = {
        body: {
          homeworkId: homework.homeworkId,
          groupId: appStore?.userData?.groupID,
          startFrom: 1,
          pageSize: 20,
        },
        store: store,
      };

      let response = await API(ApiEndPoint.GET_HOMEWORK_TRIAL_V3, req);
      if (response.data.resultCode === 'C001') {
        homeworkStore.init(response?.data);
        homeworkStore.setExerciseWiseSummary(response?.data);
        const { exerciseWiseSummary } = response?.data;
        if (exerciseWiseSummary) {
          auth.trackEvent('mixpanel', MixpanelEvents.SESSION_REPORT, {
            Category: MixpanelCategories.HOMEWORK,
            Action: MixpanelActions.OPEN,
            Label: ``,
            Accuracy: exerciseWiseSummary.overallAccuracy || '0',
          });
        }
      } else {
        store.uiStore.apiErrorInit({
          code: response.status,
          message: response.data?.resultMessage,
        });
      }
    } catch (error) {
      console.log(`HomeworkReportScreen fetchContent error ${error}`);
    }
  };

  const fetchFilteredReports = async (index, mode) => {
    try {
      let req = {
        body: {
          homeworkId: homework.homeworkId,
          groupId: appStore?.userData?.groupID,
          startFrom: (index - 1) * 20 + 1,
          pageSize: 20,
          filter: mode,
        },
        store: store,
      };

      let response = await API(
        ApiEndPoint.GET__FILTERED_HOMEWORK_QUESTIONS_TRIALS,
        req,
      );
      if (response.data.resultCode === 'C001') {
        if (index === 1) {
          homeworkStore.init(response?.data);
        } else {
          homeworkStore.setTrailList(response?.data.trailList);
          homeworkStore.setPaginationDetails(response?.data);
        }
      } else if (response.data.resultCode === 'S046') {
        homeworkStore.setTrailList([]);
        homeworkStore.init(response?.data);
        homeworkStore.setExerciseWiseSummary(response?.data);
      } else if (response.data.resultCode === 'S049' && response.data.resultMessage === 'Question not available') {
        homeworkStore.setTrailList([]);
      } else {
        store.uiStore.apiErrorInit({
          code: response.status,
          message: response.data?.resultMessage,
        });
      }
    } catch (error) {
      console.log(`fetchFilteredReports error ${error}`)
    }
  };

  const findSummaryCardHeight = layout => {
    const { height } = layout;
    setSummaryCardHeight(height);
  };

  const renderItem = (item, index) => {
    if (index === 0) {
      return (
        <View
          onLayout={event => {
            findSummaryCardHeight(event.nativeEvent.layout);
          }}>
          <WorksheetTopicHeader
            testID="WorksheetTopicHeaderHomeworkReport"
            accuracy={homeworkStore?.exerciseWiseSummary?.overallAccuracy}
            correct={homeworkStore?.exerciseWiseSummary?.overallCorrect}
            wrong={homeworkStore?.exerciseWiseSummary?.overallWrong}
            topicList={homeworkStore?.exerciseWiseSummary?.records}
            subjectiveCount={
              homeworkStore?.exerciseWiseSummary?.overallSubjectiveQuestions
            }
            unAttemptedQuestionCount={
              homeworkStore?.exerciseWiseSummary?.overallUnattemptedQuestions
            }
            hasHomework={true}
          />
        </View>
      );
    } else if (index === 1) {
      return (
        <Fragment>
          <View style={styles.childContainer}>
            <FilterItem
              testID="FilterItemHomeworkReportRenderItem"
              questionCount={
                homeworkStore?.exerciseWiseSummary?.overallQuestions
              }
              wrongCount={homeworkStore?.exerciseWiseSummary?.overallWrong}
              rightCount={homeworkStore?.exerciseWiseSummary?.overallCorrect}
              subjectiveCount={
                homeworkStore?.exerciseWiseSummary?.overallSubjectiveQuestions
              }
              unAttemptedQuestionCount={
                homeworkStore?.exerciseWiseSummary?.overallUnattemptedQuestions
              }
              mode={currentMode}
              hasHomework={true}
              containerStyle={styles.filterStyle}
              onClick={mode => {
                filter(mode);
              }}
            />
            {homeworkStore?.paginationDetails?.totalPages > 1 ? (
              <View style={styles.paginationButtonStyle}>
                <PaginationView
                  currentPage={homeworkStore?.paginationDetails?.currentPage}
                  totalPage={homeworkStore?.paginationDetails?.totalPages}
                  onNextBtnPressed={() => {
                    let index = homeworkStore?.paginationDetails?.currentPage;
                    fetchFilteredReports(index + 1, currentMode);
                  }}
                  onPreviousBtnPressed={() => {
                    let index = homeworkStore?.paginationDetails?.currentPage;
                    fetchFilteredReports(index - 1, currentMode);
                  }}
                />
              </View>
            ) : null}
          </View>
          <View>
            {homeworkStore.trailList && homeworkStore.trailList.length === 2 && (
              <BalooThambiRegTextView
                testID="HomeworkReportFilterNoQuestionFound"
                style={styles.title}>
                {filterNoQuestionFound}
              </BalooThambiRegTextView>
            )}
          </View>
        </Fragment>
      );
    } else {
      return (
        <CustomReportListCard
          testID={`HomeworkQuestionItemHomeworkReport`}
          item={item}
          seqNum={index + 1}
          permissions={permissions}
          screen={ReportScreen.Homework}
        />
      );
    }
  };

  const filter = mode => {
    if (mode !== currentMode) {
      setCurrentMode(mode);
      switch (mode) {
        case 'all':
          fetchFilteredReports(1, 'all');
          break;
        case 'wrong':
          fetchFilteredReports(1, 'wrong');
          break;
        case 'right':
          fetchFilteredReports(1, 'right');
          break;
        case 'unAttempted':
          fetchFilteredReports(1, 'unattempted');
          break;
        case 'Subjective':
          fetchFilteredReports(1, 'subjective');
          break;
      }
    }
  };

  const getRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const headerBtnClickHandler = () => {
    homeworkStore.reset();
    props.navigation.navigate(ScreenNames.HomeworkListScreen);
  };

  const onScrollHandler = e => {
    if (e.nativeEvent.contentOffset.y > 120 + summaryCardHeight) {
      setShowFilter(true);
    } else {
      setShowFilter(false);
    }
  };

  let filterView = null;
  if (showFilter) {
    filterView = (
      <View style={styles.filterView}>
        <FilterItem
          testID="FilterItemHomeworkReport"
          questionCount={homeworkStore?.exerciseWiseSummary?.overallQuestions}
          wrongCount={homeworkStore?.exerciseWiseSummary?.overallWrong}
          rightCount={homeworkStore?.exerciseWiseSummary?.overallCorrect}
          subjectiveCount={
            homeworkStore?.exerciseWiseSummary?.overallSubjectiveQuestions
          }
          unAttemptedQuestionCount={
            homeworkStore?.exerciseWiseSummary?.overallUnattemptedQuestions
          }
          mode={currentMode}
          hasHomework={true}
          containerStyle={styles.filterStyle}
          onClick={mode => {
            filter(mode);
          }}
        />

        {homeworkStore?.paginationDetails?.totalPages > 1 ? (
          <View style={styles.UpperPagination}>
            <PaginationView
              currentPage={homeworkStore?.paginationDetails?.currentPage}
              totalPage={homeworkStore?.paginationDetails?.totalPages}
              onNextBtnPressed={() => {
                let index = homeworkStore?.paginationDetails?.currentPage;
                fetchFilteredReports(index + 1, currentMode);
              }}
              onPreviousBtnPressed={() => {
                let index = homeworkStore?.paginationDetails?.currentPage;
                fetchFilteredReports(index - 1, currentMode);
              }}
            />
          </View>
        ) : null}
        {homeworkStore.trailList && homeworkStore.trailList.length === 2 && (
          <BalooThambiRegTextView
            testID="HomeworkReportScreenFilterNoQuestionFound"
            style={styles.title}>
            {filterNoQuestionFound}
          </BalooThambiRegTextView>
        )}
      </View>
    );
  }

  return (
    <DetailsScreen
      testID="DetailsScreenHomeworkReport"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      headerTitle={homeWorkReportLabel}
      footerContainerStyle={styles.footerContainerStyle}>
      <BalooThambiRegTextView testID="HomeworkReportName" style={styles.title}>
        {homework?.name}
      </BalooThambiRegTextView>

      {homeworkStore.homeworkReportResponse && (
        <View style={styles.flexOne}>
          {filterView}
          {homeworkStore?.trailList && homeworkStore?.trailList.length > 0 && (
            <FlatList
              data={homeworkStore.trailList}
              renderItem={({ item, index }) => renderItem(item, index)}
              keyExtractor={item =>
                item?.data?._id ? item.data._id : getRandomNumber()
              }
              // onEndReached={event => {
              //     fetchFilteredReports(event, currentMode);
              //     console.log(`onclick --------------------------------> `)
              // }}
              onEndReachedThreshold={0.7}
              overScrollMode='never'
              onScroll={onScrollHandler}
              windowSize={5}
              removeClippedSubviews={true}
              initialNumToRender={1}
            />
          )}
        </View>
      )}
    </DetailsScreen>
  );
};

export default observer(HomeworkReportScreen);
