// External Imports
import React, { useEffect, useState } from 'react';
import { View, SectionList } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

// Internal Imports
import styles from './style';
import {
  BalooThambiRegTextView,
  SearchInput,
  HomeworkListItem,
  RoundedButton,
} from '@components';
import { getWp, getHp } from '@utils';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { HomeWorkSearchEmpty } from '@images';
import { useLanguage } from '@hooks';

const HomeworkListContent = props => {
  const {
    testID,
    liveHomeworks,
    completedHomeworks,
    onSearch,
    searchQuery,
    permissions,
    showEmptyMessage,
    onPress,
    emptyMessage,
    oldHomeworkBtnPressed,
  } = props;

  const {
    wasdueOnText,
    dueOnText,
    submittedOnText,
    questionText,
    searchHomeWorkText,
    liveHwLabel,
    completedHomeWorkLabel,
    seeOlderHwBtnText,
  } = useLanguage();

  const [emptyListMessage, setEmptyListMessage] = useState();

  useEffect(() => {
    if (showEmptyMessage) {
      let emptyListMessage = (
        <BalooThambiRegTextView
          testID="HomeworkListContentEmptyMessage1"
          style={styles.emptyData}>
          {emptyMessage}
        </BalooThambiRegTextView>
      );
      setEmptyListMessage(emptyListMessage);
    }
  }, [showEmptyMessage])

  const getHour = (now, end) => {
    let startTime = moment(now, 'YYYY-MM-DD hh:mm:ss');
    let endTime = moment(end, 'YYYY-MM-DD hh:mm:ss');
    let duration = moment.duration(endTime.diff(startTime));
    let hours = parseInt(duration.asHours());
    return hours;
  };

  const renderHomeworkItem = data => {
    try {
      if (data.item.isEmpty)
        return (
          <BalooThambiRegTextView
            testID="HomeworkListContentsubHeading"
            style={styles.subHeading}>
            {data.item.title}
          </BalooThambiRegTextView>
        );

      let desc = null;
      let upperTagText = null;
      let isBackgroundRed = false;
      let questionAttempted = data.item.progress.completed;
      let totalQuestions = data.item?.progress.total;
      let questionString = totalQuestions > 1 ? 's' : '';
      desc = configDesc(data.item, desc, questionAttempted, totalQuestions, questionString, questionText);

      if (data.item.actions[0].actionText !== 'See Report') {
        let current_date = moment().format('YYYY-MM-DD hh:mm:ss');
        let homeWorkDueDate = data.item.endDate;
        let hourDiff = getHour(current_date, homeWorkDueDate);
        if ((hourDiff > 0 && hourDiff <= 24) || hourDiff < 0) {
          isBackgroundRed = true;
        } else {
          isBackgroundRed = false;
        }
        if (current_date > homeWorkDueDate) {
          upperTagText = `${wasdueOnText} ${moment(data.item.endDate).format(
            'DD MMM YYYY, hh:mm A',
          )}`;
        } else {
          upperTagText = `${dueOnText} ${moment(data.item.endDate).format(
            'DD MMM YYYY, hh:mm A',
          )}`;
        }
      } else if (data.item.endDate) {
        upperTagText = `${submittedOnText} ${moment(data.item.endDate).format(
          'DD MMM YYYY, hh:mm A',
        )}`;
      }

      return (
        <View style={styles.itemContainer}>
          <HomeworkListItem
            testID="HomeworkListItemHomeworkListContent"
            upperTagText={upperTagText}
            isRecentlyAnnounced={data.item.recentlyAnnounced}
            title={data.item.name}
            isBackgroundRed={isBackgroundRed}
            desc={desc}
            actionText={data.item.actions[0].actionText}
            isExpired={data.item.actions[0].actionText === 'See Report'}
            isCompleted={data.item.actions[0].actionText === 'See Report'}
            isStart={data.item.actions[0].actionText === 'Start'}
            isInProgress={data.item.actions[0].actionText === 'Continue'}
            onClickCallback={() => onPress(data.item)}
            leftImage={data.item.icon}
            permissions={permissions}
          />
        </View>
      );
    } catch (error) {
      console.log(`HomeworkListContent error ${error}`)
    }

  };

  const renderSectionHeader = (title, data) => {
    return (
      <View>
        <BalooThambiRegTextView
          testID="HomeworkListContentSectionTitle"
          style={styles.sectionTitle}>
          {title}
        </BalooThambiRegTextView>
        {data != null && data.length === 0 && (
          <View>
            <HomeWorkSearchEmpty
              accessible={true}
              testID="HomeworkListContentSearchEmpty6"
              accessibilityLabel="HomeworkListContentSearchEmpty6"
              width={getWp(150)}
              style={styles.searchIcon}
            />
            <BalooThambiRegTextView
              testID="HomeworkListContentEmptyMessage2"
              style={styles.emptyData}>
              {emptyMessage}
            </BalooThambiRegTextView>
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={styles.container}>
      <View style={styles.subContainer}>
        {permissions.homeworkSearch && (
          <View key="searchContainer" style={styles.searchStyle}>
            <SearchInput
              testID="SearchInputHomeworkListContent"
              onChangeText={val => {
                onSearch(val);
              }}
              placeholder={searchHomeWorkText}
              value={searchQuery}
            />
          </View>
        )}
        <ScrollView
          nestedScrollEnabled={false}
          showsVerticalScrollIndicator={false}>
          {liveHomeworks !== null && liveHomeworks.length > 0 && (
            <FlatList
              data={liveHomeworks}
              ListHeaderComponent={
                <BalooThambiRegTextView
                  testID="HomeworkListContenLiveHwLabelt"
                  style={styles.heading}>
                  {liveHwLabel}
                </BalooThambiRegTextView>
              }
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={emptyListMessage}
              renderItem={renderHomeworkItem}
              keyExtractor={item => item.id}
            />
          )}
          {completedHomeworks !== null && completedHomeworks.length > 0 && (
            <SectionList
              sections={completedHomeworks}
              keyExtractor={(item, index) => item + index}
              renderItem={renderHomeworkItem}
              renderSectionHeader={({ section: { title, data } }) =>
                renderSectionHeader(title, data)
              }
              ListHeaderComponent={
                <BalooThambiRegTextView
                  testID="HomeworkListContentCompletedHomeWorkLabel"
                  style={styles.completeHeading}>
                  {completedHomeWorkLabel}
                </BalooThambiRegTextView>
              }
              ListEmptyComponent={emptyListMessage}
              showsVerticalScrollIndicator={false}
              stickySectionHeadersEnabled={false}
            />
          )}
          <View style={{ marginBottom: getHp(130) }}>
            {completedHomeworks !== null && completedHomeworks.length > 0 && (
              <RoundedButton
                testID="RoundedButtonHomeworkListContentOlderHwBtnText"
                text={seeOlderHwBtnText}
                type="elevatedOrange"
                width={getWp(250)}
                height={getHp(60)}
                onPress={oldHomeworkBtnPressed}
                containerStyle={styles.buttonContainer}
                textStyle={styles.buttonText}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

HomeworkListContent.propTypes = {
  testID: PropTypes.string,
  liveHomeworks: PropTypes.array,
  completedHomeworks: PropTypes.array,
  onSearch: PropTypes.func,
  searchQuery: PropTypes.string,
  permissions: PropTypes.array,
  onPress: PropTypes.func,
  oldHomeworkBtnPressed: PropTypes.func,
  emptyMessage: 'Homework absent! Ask your teacher to assign you Homework.',
};

HomeworkListContent.defaultProps = {
  testID: 'HomeworkListContent',
  onPress: () => { console.log(`HomeworkListContent default`) },
  oldHomeworkBtnPressed: () => { console.log(`oldHomeworkBtnPressed default`) },
};

export default HomeworkListContent;

const configDesc = (item, desc, questionAttempted, totalQuestions, questionString, questionText) => {
  if (item.status === 'in-progress' || item.status === 'complete' || item.actions[0].actionText === 'See Report') {
    desc = item && `${questionAttempted} out of ${totalQuestions} question${questionString} completed`;
  } else {
    desc = item && ` ${totalQuestions} ${questionText}${questionString}`;
  }
  return desc;
}
