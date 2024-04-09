/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useContext } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { API } from '@api';
import { useStores } from '@mobx/hooks';
import { NativeBaseProvider } from 'native-base';
import {
  HowIDidHeader,
  BalooThambiRegTextView,
  FilterItem,
  QuestionCard,
  PaginationView,
  DetailsScreen,
  CustomReportListCard,
} from '@components';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import styles from './style';
import { GameEmptyState8 } from '@images';
import { getWp, screenLogging } from '@utils';
import { useLanguage } from '@hooks';
import { useBackHandler } from '@react-native-community/hooks';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, ScreenNames, ApiEndPoint } from '@constants';
import { ReportScreen } from '../../../helpers';


const HowIDidScreen = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const { appStore } = useStores();
  const [currentMode, setCurrentMode] = useState('all');
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  const {
    forAttemptNumber,
    filterNoQuestionFound,
    howIDidEmptyStateText,
  } = useLanguage();

  const { topic } = props.route.params;
  const store = useStores();
  const { topicTrailsStore } = useStores();

  const permissions =
    Object.keys(store.uiStore.menuDataPermissions).length > 0
      ? store.uiStore.menuDataPermissions.howIDid
      : {};

  useBackHandler(() => {
    topicTrailsStore.reset();
    return navigation.replace(ScreenNames.DashboardScreen);
  });

  const crashLog = () => {
    screenLogging("TopicHowIDidScreen", appStore?.userData);
  }

  useEffect(() => {
    return () => {
      topicTrailsStore.reset();
    }
  }, []);

  useEffect(() => {
    crashLog();
    topicTrailsStore.reset();
    fetchContent(1);
  }, [topicTrailsStore]);

  const fetchContent = async index => {
    if (refreshing) return;
    try {
      setRefreshing(true);
      let req = {
        body: {
          topicId: topic.contentID,
          index: index,
          limit: 20,
          startFrom: (index - 1) * 20 + 1,
        },
        store: store,
      };
      let res = await API(ApiEndPoint.GET_TOPIC_TRAILS, req);
      if (res.data.resultCode === 'C001') {
        if (index === 1) {
          let Q_id = 1;

          if (res.data.trailList && res.data.trailList.length > 0) {
            let trailList = res.data.trailList.map(data => {
              data.Q_id = Q_id++;
              return data;
            });
            res.data.topicList = trailList;
            topicTrailsStore.init(res.data);
          } else {
            res.data.topicList = [];
            topicTrailsStore.init(res.data);
          }
          console.log(`GET_TOPIC_TRAILS pagination testing Q_id - ${Q_id} index - ${index}`)

        } else {
          let Q_id = (index - 1) * 20 + 1;
          if (res.data.trailList && res.data.trailList.length > 0) {
            let trailList = res.data.trailList.map(data => {
              data.Q_id = Q_id++;
              return data;
            });
            topicTrailsStore.setTrailList([]);
            topicTrailsStore.setTrailList(trailList);
          } else {
            topicTrailsStore.setTrailList([]);
          }
          console.log(`GET_TOPIC_TRAILS pagination testing else block Q_id - ${Q_id} index - ${index}`)
        }

        const { topicDetails } = res.data;
        topicTrailsStore.setTopicDetails(topicDetails);
        if (topicDetails) {
          auth.trackEvent('cleaverTap', MixpanelEvents.SESSION_REPORT);
          auth.trackEvent('mixpanel', MixpanelEvents.SESSION_REPORT, {
            Category: MixpanelCategories.TOPIC,
            Action: MixpanelActions.OPEN,
            Label: ``,
            Accuracy: topicDetails.accuracy || '0',
          });
        }
        filter(currentMode);
      } else {
        if (res.status && res.data?.resultMessage && res.data?.resultMessage != '') {
          store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
        }
      }
      setRefreshing(false);
    }
    catch (error) {
      console.log('fetch content error', error);
    }
  };

  const renderItem = (item, index) => {
    if (item.contentMode == 'TimedTest') {
      return (
        <QuestionCard
          accessible={true}
          testID={`HowIDidQuestionCard${item.data._id}`}
          accessibilityLabel={`HowIDidQuestionCard${item.data._id}`}
          response={item}
          permissions={permissions}
        />
      );
    } else {

      return (
        <CustomReportListCard
          testID={`HowIDidQuestionCard${item.data._id}`}
          accessibilityLabel={`HowIDidQuestionCard${item.data._id}`}
          item={item}
          seqNum={item.contentSeqNum}
          permissions={permissions}
          screen={ReportScreen.Topic}
          topicId={topicTrailsStore.topicDetails.topicId}
        />
      );
    }
  };

  const filter = mode => {
    setTopicList({});

    switch (mode) {
      case 'all':
        setTopicList(topicTrailsStore.trailList);
        break;
      case 'wrong':
        setTopicList(
          topicTrailsStore.trailList.filter(item =>
            item?.data?.template != 'TimedTest' && (item.userAttemptData.result === 'fail' || item.userAttemptData.result === 'learn' || item.userAttemptData.result === 'skip' && item?.data?.template != "Introduction")));
        break;
      case 'right':
        setTimeout(() => {
          setTopicList(topicTrailsStore.trailList.filter(item => item.userAttemptData.result === 'pass'));
        }, 300);
        break;
    }
  };


  return (
    <NativeBaseProvider>
      <DetailsScreen
        testID="DetailsScreenHowIDidBackBtn"
        headerBtnType="back"
        headerBtnClick={() => {
          topicTrailsStore.reset();
          navigation.goBack();
        }}>
        {topicTrailsStore.topicTrailResponse && (
          <View style={styles.flexOne}>
            <BalooThambiRegTextView
              testID="HowIDidScreenAttemptedNumbers"
              style={styles.attemptsHeading}>
              {forAttemptNumber}
              {topicTrailsStore.topicDetails &&
                topicTrailsStore.topicDetails.attemptNumbers &&
                ` ${topicTrailsStore.topicDetails.attemptNumbers.join(' & ')}`}
            </BalooThambiRegTextView>
            {topicTrailsStore.topicDetails && Object.keys(topicTrailsStore.topicDetails).length > 0 && (
              <HowIDidHeader
                testID="HeaderHowIDid"
                attempts={topicTrailsStore.topicDetails.totaltAttempts}
                questionsDone={topicTrailsStore.topicDetails.totalQuestion}
                accuracy={topicTrailsStore.topicDetails.accuracy}
                permissions={permissions}
              />
            )}

            {topicTrailsStore.trailList &&
              topicTrailsStore.trailList.length > 0 ? (
              <Fragment>
                <View style={styles.headerFilterContainer}>
                  <FilterItem
                    testID="ItemHowIDidFilter"
                    questionCount={topicTrailsStore.topicDetails.totalQuestion}
                    wrongCount={topicTrailsStore.topicDetails.totalWrong}
                    rightCount={topicTrailsStore.topicDetails.totalCorrect}
                    onClick={mode => {
                      setCurrentMode(mode);
                      filter(mode);
                    }}
                  />
                  {topicTrailsStore?.topicDetails?.totalPages > 1 ? (
                    <PaginationView
                      testID="PaginationViewHowIDidBtns"
                      currentPage={topicTrailsStore?.topicDetails?.currentPage}
                      totalPage={topicTrailsStore?.topicDetails?.totalPages}
                      onNextBtnPressed={() => {
                        let index = topicTrailsStore?.topicDetails?.currentPage;
                        fetchContent(index + 1);
                      }}
                      onPreviousBtnPressed={() => {
                        let index = topicTrailsStore?.topicDetails?.currentPage;
                        fetchContent(index - 1);
                      }}
                    />
                  ) : null}
                </View>

                {topicList !== null && topicList.length > 0 ? (
                  <FlatList
                    data={topicList}
                    refreshControl={<RefreshControl refreshing={refreshing} />}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    keyExtractor={item => item.data._id}
                    contentContainerStyle={styles.listContainerStyle}
                    windowSize={4}
                    overScrollMode="never"
                    disableVirtualization={true}
                    removeClippedSubviews={false}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                  />
                ) : (
                  <View style={{ marginTop: 60, marginHorizontal: 10 }}>
                    <BalooThambiRegTextView
                      testID="HowIDidNoQuestionsFound"
                      style={styles.attemptsHeading}>
                      {filterNoQuestionFound}
                    </BalooThambiRegTextView>
                  </View>
                )}
              </Fragment>
            ) : (
              <View style={{ alignSelf: 'center' }}>
                <GameEmptyState8
                  accessible={true}
                  testID="HowIDidGameEmptyState8"
                  accessibilityLabel="HowIDidGameEmptyState8"
                  width={getWp(150)}
                  style={styles.searchIcon}
                />
                <BalooThambiRegTextView
                  testID="HowIDidEmptyStateText"
                  style={styles.attemptsHeadingEmpty}>
                  {howIDidEmptyStateText}
                </BalooThambiRegTextView>
              </View>
            )}
          </View>
        )}
      </DetailsScreen>
    </NativeBaseProvider>
  );
};

export default observer(HowIDidScreen);