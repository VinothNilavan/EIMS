/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import { FlatList, LayoutAnimation } from 'react-native';
import { API } from '@api';
import { useStores } from '@mobx/hooks';
import { ApiEndPoint, ScreenNames } from '@constants';
import styles from './style';
import { FilterModes, ReportScreen } from '../../../helpers';
import {
  WorksheetTopicHeader,
  BalooThambiRegTextView,
  FilterItem,
  PaginationView,
  DetailsScreen,
  CustomReportListCard,
} from '@components';
import { screenLogging } from '@utils';
import { observer } from 'mobx-react';
import { View } from 'native-base';
import { useLanguage } from '@hooks';

const WorksheetReportScreen = props => {
  const [currentMode, setCurrentMode] = useState(FilterModes.all);
  const [showFilter, setShowFilter] = useState(false);
  const { worksheetReportText, filterNoQuestionFound } = useLanguage();

  const { worksheet } = props.route.params;
  const store = useStores();
  const { worksheetStore, appStore } = useStores();

  const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.worksheetReport : {};

  const crashLog = () => {
    screenLogging("WorksheetReportScreen", appStore?.userData);
  }

  useEffect(() => {
    return () => {
      worksheetStore.reset();
    }
  }, []);

  useEffect(() => {
    crashLog();
    worksheetStore.reset();
    fetchContent(1, FilterModes.all);
  }, []);

  const fetchContent = async (index, mode) => {
    try {
      let req = {
        body: {
          worksheetID: worksheet.contentID,
          index: index,
          limit: 20,
          startFrom: (index - 1) * 20 + 1,
          filter: mode,
        },
        store: store,
      };
      let res = await API(ApiEndPoint.GET_FILTERED_WORKSHEET_REPORT, req);
      if (res.data.resultCode === 'C001') {
        let paginationDetails =
          res?.data?.paginationDetails == null
            ? {
              totalPages: res?.data?.totalPages,
              currentPage: res?.data?.currentPage,
              showingFrom: res?.data.showingFrom,
              showingTo: res?.data?.showingTo,
            }
            : res?.data?.paginationDetails;
        if (index === 1) {
          worksheetStore.init(res.data);
        } else {
          worksheetStore.setTrailList(res.data.trailList);
        }
        worksheetStore.setPaginationDetails(paginationDetails);
      } else {
        if (res.status && res.data?.resultMessage && res.data?.resultMessage != '') {
          store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
        }
      }
    } catch (error) {
      console.log('error in fetch content work report', error);
    }
  };

  const renderItem = (item, index) => {
    let testID = item?.data?._id ? item.data._id : getRandomNumber();
    if (index === 0) {
      return (
        <WorksheetTopicHeader
          testID={`WorksheetTopicHeaderWorkSheetReportScreen4${testID}`}
          accuracy={worksheetStore.worksheetReportResponse.accuracy}
          correct={worksheetStore.worksheetReportResponse.totalCorrect}
          wrong={worksheetStore.worksheetReportResponse.totalWrong}
          topicList={worksheetStore.topicList}
        />
      );
    } else if (index === 1) {
      return (
        <Fragment>
          <View style={styles.headerFilterContainer}>
            <FilterItem
              testID={`FilterItemWorkSheetReport${testID}`}
              questionCount={
                worksheetStore?.worksheetReportResponse?.topicList[0]
                  ?.totalQuestions != null
                  ? worksheetStore?.worksheetReportResponse?.topicList[0]
                    ?.totalQuestions
                  : worksheetStore?.worksheetReportResponse?.totalQuestion
              }
              wrongCount={worksheetStore.worksheetReportResponse.totalWrong}
              rightCount={worksheetStore.worksheetReportResponse.totalCorrect}
              mode={currentMode}
              onClick={mode => {
                filter(mode);
              }}
            />
            {worksheetStore?.paginationDetails?.totalPages > 1 ? (
              <PaginationView
                testID={`PaginationViewWorkSheetReport${testID}`}
                currentPage={worksheetStore?.paginationDetails?.currentPage}
                totalPage={worksheetStore?.paginationDetails?.totalPages}
                onNextBtnPressed={() => {
                  let index = worksheetStore?.paginationDetails?.currentPage;
                  fetchContent(index + 1, currentMode);
                }}
                onPreviousBtnPressed={() => {
                  let index = worksheetStore?.paginationDetails?.currentPage;
                  fetchContent(index - 1, currentMode);
                }}
              />
            ) : null}
          </View>
          {worksheetStore.trailList && worksheetStore.trailList.length === 2 && (
            <BalooThambiRegTextView
              testID={`WorkSheetReportFilterNoQuestionFound${testID}`}
              style={styles.title}>
              {filterNoQuestionFound}
            </BalooThambiRegTextView>
          )}
        </Fragment>
      );
    } else {
      return (

        <CustomReportListCard
          testID={`WorksheetQuestionItemWorksheetReport${testID}`}
          item={item}
          seqNum={index + 1}
          permissions={permissions}
          screen={ReportScreen.Worksheet}
        />

      );
    }
  };

  const filter = mode => {
    if (mode !== currentMode) {
      setCurrentMode(mode);
      switch (mode) {
        case FilterModes.all:
          fetchContent(1, mode);
          break;
        case FilterModes.wrong:
          fetchContent(1, mode);
          break;
        case FilterModes.right:
          fetchContent(1, mode);
          break;
      }
    } else {
      fetchContent(1, FilterModes.all);
      setCurrentMode(FilterModes.all);
    }
  };

  const getRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const headerBtnClickHandler = () => {
    props.navigation.navigate(ScreenNames.WorksheetListScreen);
  };

  const onScrollHandler = scrollContent => {
    try {
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut
        },
      });
      setShowFilter(scrollContent.nativeEvent.contentOffset.y > 300)
    } catch (err) {
      console.log('WorksheetReportScreen onScrollHandler = ', err)
    }
  };

  let filterView = null;
  if (showFilter) {
    filterView = (
      <View style={styles.filterView}>
        <View style={styles.headerFilterContainer}>
          <FilterItem
            testID="FilterItemWorkSheetReport"
            questionCount={
              worksheetStore?.worksheetReportResponse?.topicList[0]
                ?.totalQuestions != null
                ? worksheetStore?.worksheetReportResponse?.topicList[0]
                  ?.totalQuestions
                : worksheetStore?.worksheetReportResponse?.totalQuestion
            }
            wrongCount={worksheetStore.worksheetReportResponse.totalWrong}
            rightCount={worksheetStore.worksheetReportResponse.totalCorrect}
            mode={currentMode}
            containerStyle={styles.filterStyle}
            onClick={mode => {
              filter(mode);
            }}
          />

          {worksheetStore?.paginationDetails?.totalPages > 1 ? (
            <PaginationView
              testID="PaginationWorkSheetReport"
              currentPage={worksheetStore?.paginationDetails?.currentPage}
              totalPage={worksheetStore?.paginationDetails?.totalPages}
              onNextBtnPressed={() => {
                let index = worksheetStore?.paginationDetails?.currentPage;
                fetchContent(index + 1, currentMode);
              }}
              onPreviousBtnPressed={() => {
                let index = worksheetStore?.paginationDetails?.currentPage;
                fetchContent(index - 1, currentMode);
              }}
            />
          ) : null}
        </View>
        {worksheetStore.trailList && worksheetStore.trailList.length === 2 && (
          <BalooThambiRegTextView
            testID="WorkSheetReportFilterNoQuestionFound"
            style={styles.title}>
            {filterNoQuestionFound}
          </BalooThambiRegTextView>
        )}
      </View>
    );
  }

  return (
    <DetailsScreen
      testID="DetailsScreenWorkSheetReport"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      headerTitle={worksheetReportText}
      customTitleStyle={styles.headerTitileStyle}
      footerContainerStyle={styles.footerContainerStyle}>
      <BalooThambiRegTextView
        testID="WorkSheetReportContentName"
        style={styles.title}>
        {worksheet.contentName}
      </BalooThambiRegTextView>

      {worksheetStore.worksheetReportResponse && (
        <View style={styles.flexOne}>
          {filterView}
          {worksheetStore.trailList && worksheetStore.trailList.length > 0 && (
            <FlatList
              data={worksheetStore.trailList}
              renderItem={({ item, index }) => renderItem(item, index)}
              keyExtractor={item =>
                item?.data?._id ? item.data._id : getRandomNumber()
              }
              onScroll={onScrollHandler}
              overScrollMode='never'
              removeClippedSubviews={true}
              initialNumToRender={1}
            />
          )}
        </View>
      )}
    </DetailsScreen>
  );
};

export default observer(WorksheetReportScreen);