/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import {
  VerticalTitleValueImage,
  FilterItem,
  PaginationView,
  DetailsScreen,
  BalooThambiRegTextView,
  CustomReportListCard,
} from '@components';
import { QuestionsDone, Accuracy, ArrowUpGrey } from '@images';
import { observer } from 'mobx-react';
import { screenLogging } from '@utils';
import { useStores } from '@mobx/hooks';
import { COLORS, ApiEndPoint } from '@constants';
import { API } from '@api';
import { useLanguage } from '@hooks';
import { ReportScreen } from '../../../helpers';

const DiscreteSkillReportScreen = props => {
  const { trailType } = props.route.params;
  const [refreshing, setRefreshing] = useState(false);
  const store = useStores();
  const { topicTrailsStore, uiStore, appStore } = useStores();
  const [worksheetReports, setWorksheetReports] = useState([]);
  const [currentMode, setCurrentMode] = useState('all');
  const [topBtnVisibility, setTopBtnVisibility] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState('');
  const [trailDuration, setTrailDuration] = useState('all');
  const listRef = useRef();
  const navigation = useNavigation();


  const crashLog = () => {
    screenLogging("DiscreteSkillReportScreen", appStore?.userData);
  }
  useEffect(() => {
    return () => {
      topicTrailsStore.reset();
    }
  }, []);

  useEffect(() => {
    crashLog();
    fetchContent(1);
  }, [trailDuration]);

  const {
    questionsDoneText,
    correctAnswerText,
    titleText,
    genericEmptyText,
  } = useLanguage();
  const isRTL = uiStore.isRTL;

  const permissions =
    Object.keys(store.uiStore.menuDataPermissions).length > 0
      ? store.uiStore.menuDataPermissions.howIDid
      : {};

  permissions.viewExplanation = true;

  const fetchContent = async index => {
    if (!refreshing) {
      if (index !== 1) {
        if (index > topicTrailsStore?.topicTrailResponse?.totalPages) {
          return;
        }
      }
      setRefreshing(true);
      let req = {
        body: {
          index,
          limit: 20,
          startFrom: (index - 1) * 20 + 1,
          filter: trailDuration,
        },
        store: store,
      };
      let trailAPI = ApiEndPoint.GET_DISCRETE_SKILL_TRAIL;
      if (trailType == 'session') {
        trailAPI = ApiEndPoint.GET_DISCRETE_SKILL_SESSION_TRAIL;
      }
      let res = await API(trailAPI, req);
      if (res.data.resultCode === 'C001') {
        if (index === 1) {
          topicTrailsStore.init(res.data);
        } else {
          topicTrailsStore.setTrailList(res.data.trailList);
          topicTrailsStore.setWorksheetTrialResponse(res.data);
        }
        if (!res.data.trailList) {
          setEmptyMessage(genericEmptyText);
        }
        filter(currentMode);
      } else {
        store.uiStore.apiErrorInit({
          code: res.status,
          message: res.data?.resultMessage,
        });
      }

      setRefreshing(false);
    }
  };

  const filter = mode => {
    try {
      switch (mode) {
        case 'all':
          setWorksheetReports(topicTrailsStore?.trailList);
          break;
        case 'wrong':
          setWorksheetReports(
            topicTrailsStore?.trailList.filter(item => item.userAttemptData.result === 'fail'),
          );
          break;
        case 'right':
          setWorksheetReports(
            topicTrailsStore?.trailList.filter(item => item.userAttemptData.result === 'pass'),
          );
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HeaderItem = () => {
    return (
      <View style={isRTL ? styles.RTLHeaderContainer : styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <VerticalTitleValueImage
            title={questionsDoneText}
            count={topicTrailsStore?.topicTrailResponse?.totalQuestion}
            SVGIcon={QuestionsDone}
          />
        </View>
        <View style={{ flex: 1 }}>
          <VerticalTitleValueImage
            title={correctAnswerText}
            count={topicTrailsStore?.topicTrailResponse?.totalCorrect}
            optionText={`/${topicTrailsStore?.topicTrailResponse?.totalQuestion
              }`}
            countStyle={{ color: COLORS.screenTestDescriptionTextColor }}
            SVGIcon={Accuracy}
          />
        </View>
      </View>
    );
  }

  return (
    <NativeBaseProvider>
      <DetailsScreen
        headerBtnType="back"
        headerBtnClick={() => {
          console.log("Discreetskill back button clicked");
          navigation.goBack(null);
        }}
        bgName="bgSummary"
        hideLogo={true}
        title={titleText}
        showOverflow={false}
        themeName="ocean"
        showAnimation={true}
        animationPosition="bottomRight"
        animationName="right_summary_animation"
        showFooterText={false}>
        {topicTrailsStore.topicTrailResponse &&
          topicTrailsStore.trailList &&
          topicTrailsStore.trailList.length > 0 && (
            <View style={styles.childContainer}>
              <FilterItem
                questionCount={
                  topicTrailsStore?.topicTrailResponse?.totalQuestion
                }
                wrongCount={topicTrailsStore?.topicTrailResponse?.totalWrong}
                rightCount={topicTrailsStore?.topicTrailResponse?.totalCorrect}
                containerStyle={styles.filterStyle}
                onClick={mode => {
                  setCurrentMode(mode);
                  filter(mode);
                }}
              />
              <PaginationView
                currentPage={topicTrailsStore?.topicTrailResponse?.currentPage}
                totalPage={topicTrailsStore?.topicTrailResponse?.totalPages}
                onNextBtnPressed={() => {
                  let index = topicTrailsStore?.topicTrailResponse?.currentPage;
                  fetchContent(index + 1);
                }}
                onPreviousBtnPressed={() => {
                  let index = topicTrailsStore?.topicTrailResponse?.currentPage;
                  fetchContent(index - 1);
                }}
              />

              <Fragment>
                <FlatList
                  ref={listRef}
                  showsVerticalScrollIndicator={false}
                  onScroll={event =>
                    setTopBtnVisibility(
                      event?.nativeEvent?.contentOffset?.y > 100,
                    )
                  }
                  ListHeaderComponent={() => (
                    <HeaderItem
                      setActiveMode={mode => {
                        setCurrentMode(mode);
                        filter(mode);
                      }}
                    />
                  )}
                  data={worksheetReports}
                  overScrollMode="never"
                  renderItem={({ item, index }) => (
                    <View style={{ width: Dimensions.get('screen').width }}>
                      <CustomReportListCard
                        item={item}
                        seqNum={item?.contentSeqNum}
                        permissions={permissions}
                        screen={ReportScreen.DiscreteSkill}
                        howIdid={true}
                      />
                    </View>
                  )}
                  keyExtractor={item => item.data._id}
                  onEndReachedThreshold={0.9}
                  initialNumToRender={1}
                />
                <View style={styles.marginBottom} />
              </Fragment>
            </View>
          )}
        {topBtnVisibility && (
          <TouchableOpacity
            onPress={() =>
              listRef.current.scrollToOffset({ animated: true, offset: 0 })
            }
            style={styles.gotoTopButtonContainer}>
            <ArrowUpGrey />
          </TouchableOpacity>
        )}

        {emptyMessage != '' && (
          <View style={styles.emptyContaner}>
            <BalooThambiRegTextView style={styles.emptyText}>
              {emptyMessage}
            </BalooThambiRegTextView>
          </View>
        )}

      </DetailsScreen>
    </NativeBaseProvider>
  );
};

DiscreteSkillReportScreen.propTypes = {};

DiscreteSkillReportScreen.defaultProps = {};

export default observer(DiscreteSkillReportScreen);
