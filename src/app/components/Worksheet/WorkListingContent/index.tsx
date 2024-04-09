/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import { View, SectionList, SafeAreaView } from 'react-native';

import {
  BalooThambiRegTextView,
  SearchInput,
  WorksheetListItem,
  RoundedButton,
} from '@components';

import moment from 'moment';
import { getWp, replaceAll } from '@utils';
import { useNavigation } from '@react-navigation/native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { WorkSheetSearchEmpty5, WorksheetEmty2 } from '@images';
import { useLanguage } from '@hooks';
import { AuthContext } from '@contexts/auth-context';
import {
  MixpanelCategories,
  MixpanelEvents,
  MixpanelActions,
  ScreenNames,
} from '@constants';

const WorkListingContent = props => {
  const {
    testID,
    sectionList,
    onSearch,
    searchQuery,
    permissions,
    showEmptyMessage,
    showSearchQueryEmptyMessage,
    loading,
    onClickItem,
  } = props;
  const navigation = useNavigation();
  const {
    submittedOnText,
    questionText,
    dueOnText,
    worksheetSearchEmpty,
    worksheetEmptyState,
    goHomeBtnText,
    searchWorksheetText,
  } = useLanguage();
  const auth = useContext(AuthContext);
  const [emptyListMessage, setEmptyListMessage] = useState();

  useEffect(() => {
    let emptyListMessageLocal = null;
    if (showSearchQueryEmptyMessage) {
      emptyListMessageLocal = (
        <View style={styles.emptyStateView}>
          <WorkSheetSearchEmpty5
            accessible={true}
            testID="WorkSheetListingContentSearchEmpty5Svg"
            accessibilityLabel="WorkSheetListingContentSearchEmpty5Svg"
            width={getWp(150)}
            style={styles.searchIcon}
          />
          <BalooThambiRegTextView
            testID="WorkSheetListingContentSearchEmptTxt"
            style={styles.emptyData}>
            {worksheetSearchEmpty}
          </BalooThambiRegTextView>
        </View>
      );
    }
    if (showEmptyMessage) {
      emptyListMessageLocal = (
        <View style={styles.emptyStateView1}>
          <WorksheetEmty2
            accessible={true}
            testID="WorkSheetListingContentSearchEmpty2Svg"
            accessibilityLabel="WorkSheetListingContentSearchEmpty2Svg"
            width={getWp(150)}
            style={styles.searchIcon}
          />
          {loading === false && (
            <BalooThambiRegTextView testID="WorksheetEmptyStateWorksheetEmptyState" style={styles.emptyData}>
              {worksheetEmptyState}
            </BalooThambiRegTextView>
          )}
          {loading === false && (
            <RoundedButton
              testID="RoundedButtonWorkSheetListingContentGoHomeBtnText"
              onPress={() => {
                navigation.navigate(ScreenNames.DashboardScreen);
              }}
              type="primaryOrange"
              text={goHomeBtnText}
              width={150}
              containerStyle={{ ...styles.goHomeBtnContainer }}
            />
          )}
        </View>
      );
    }
    setEmptyListMessage(emptyListMessageLocal);
  }, [showSearchQueryEmptyMessage, showEmptyMessage, loading]);

  const renderTopicItem = data => {
    try {
      if (data.item.isEmpty) {
        return (
          <BalooThambiRegTextView
            testID="WorkListingContentItemTitle"
            style={styles.subHeading}>
            {data.item.title}
          </BalooThambiRegTextView>
        );
      }
      let desc = null;
      let upperTagText = null;
      let questionAttempted = data.item.questionAttempted;
      let totalQuestions = data.item.totalQuestions;
      desc = configDesc(
        totalQuestions,
        questionAttempted,
        data,
        desc,
        questionText,
        permissions,
        submittedOnText,
      );

      if (
        data.item.actions.actionText !== 'expired' &&
        data.item.endDateTime &&
        data.item.endDateTime != ' '
      ) {
        upperTagText = `${dueOnText} ${moment(data.item.endDateTime).format(
          'DD MMM, hh:mm A',
        )}`;
      } else if (data.item.submittedOn) {
        upperTagText = `${submittedOnText} ${moment(
          replaceAll(data.item.submittedOn, '/', '-'),
        ).format('DD MMM YYYY')}`;
      }

      const onScrollAction = () => {
        try {
          auth.trackEvent('mixpanel', MixpanelEvents.WORKSHEET_SEE_REPORT, {
            Category: MixpanelCategories.WORKSHEET,
            Action: MixpanelActions.CLICKED,
            Label: '',
          });
          if (
            data.item.actions.actionText === 'expired' ||
            data?.item?.contentStatus === 'deactive'
          ) {
            navigation.navigate(ScreenNames.WorksheetReportScreen, { worksheet: data.item });
          } else if (data.item.actions.actionText !== 'complete') {
            onClickItem(data.item);
          }
        } catch (err) {
          console.log('onScrollAction = ', err);
        }
      };

      return (
        <View style={styles.itemContainer}>
          <WorksheetListItem
            testID="WorksheetListItemWorkSheetListingContent"
            upperTagText={upperTagText}
            isRecentlyAnnounced={
              data?.item?.recentlyAnnounced
                ? data?.item?.recentlyAnnounced
                : false
            }
            title={data?.item?.contentName}
            desc={desc}
            actionText={data?.item?.actions?.actionText}
            isExpired={
              data?.item?.actions?.actionText === 'expired' ||
              data?.item?.contentStatus === 'deactive'
            }
            isSubmitted={Boolean(data?.item?.submittedOn)}
            isCompleted={data?.item?.actions?.actionText === 'complete'}
            isStart={
              data?.item?.actions?.actionText === 'start' &&
              data?.item?.contentStatus !== 'deactive'
            }
            isInProgress={data?.item?.actions?.actionText === 'in-progress'}
            onClickCallback={onScrollAction}
            leftImage={data?.item?.worksheetIcon}
            permissions={permissions}
          />
        </View>
      );
    } catch (error) {
      console.log(`renderTopicItem error ${error}`)
    }
  };

  return (
    <>
      <SafeAreaView
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        style={styles.container}>
        <View style={styles.subContainer}>
          {permissions.worksheetSearch && !showEmptyMessage && (
            <View key="searchContainer" style={styles.searchStyle}>
              <SearchInput
                testID="SearchInputWorkListingContent"
                onChangeText={val => {
                  onSearch(val);
                }}
                placeholder={searchWorksheetText}
                value={searchQuery}
              />
            </View>
          )}
          <View style={styles.scrollViewContainer}>
            <SectionList
              accessible={true}
              testID="WorkListingCotentSectionList"
              accessibilityLabel="WorkListingCotentSectionList"
              sections={sectionList}
              keyExtractor={(item, index) => item + index}
              renderItem={renderTopicItem}
              overScrollMode="never"
              renderSectionHeader={({ section: { title } }) => (
                <BalooThambiRegTextView
                  testID="WorkListingContentTitleTxt"
                  style={styles.heading}>
                  {title}
                </BalooThambiRegTextView>
              )}
              ListEmptyComponent={emptyListMessage}
              showsVerticalScrollIndicator={false}
              stickySectionHeadersEnabled={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

WorkListingContent.propTypes = {
  testID: PropTypes.string,
  sectionList: PropTypes.array,
  onSearch: PropTypes.func,
  searchQuery: PropTypes.string,
  permissions: PropTypes.array,
};

WorkListingContent.defaultProps = {
  testID: 'WorkListingContent',
};

export default WorkListingContent;

const configDesc = (
  totalQuestions,
  questionAttempted,
  data,
  desc,
  questionText,
  permissions,
  submittedOnText,
) => {
  let questionString = totalQuestions > 1 ? 's' : '';
  if (questionAttempted === 0) {
    if (
      data.item.actions.actionText === 'expired' ||
      data.item.actions.actionText === 'in-progress'
    ) {
      desc =
        data.item &&
        `${questionAttempted} out of ${totalQuestions} question${questionString} completed`;
    } else {
      desc = data.item && ` ${totalQuestions} ${questionText}${questionString}`;
    }
  } else if (
    data.item.actions.actionText === 'complete' &&
    data.item.submittedOn &&
    permissions.submittedOn
  ) {
    desc = `${submittedOnText} ${moment(
      replaceAll(data.item.submittedOn, '/', '-'),
    ).format('DD MMM, hh:mm A')}`;
  } else {
    desc =
      data.item &&
      `${data.item.questionAttempted} out of ${totalQuestions} completed`;
  }
  return desc;
};
