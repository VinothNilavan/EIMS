/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import { View, SectionList, SafeAreaView } from 'react-native';
import { EmptyFour } from '@images';
import {
  BalooThambiRegTextView,
  SearchInput,
  ListItem,
  InfoPopup,
} from '@components';

import { useNavigation } from '@react-navigation/native';
import { useStores } from '@mobx/hooks';
import { runInAction } from 'mobx';
import styles from './indexCss';
import { getWp, replaceTwiceString } from '@utils';
import { useLanguage } from '@hooks';
import PropTypes from 'prop-types';
import { AuthContext } from '@contexts/auth-context';
import {
  MixpanelCategories,
  MixpanelEvents,
  MixpanelActions,
  ScreenNames,
} from '@constants';

const TopicListingContent = props => {
  const {
    testID,
    sectionList,
    onSearch,
    searchQuery,
    permissions,
    onScrollBegin,
    onScroll,
    freeTrialUser,
  } = props;
  const navigation = useNavigation();
  const store = useStores();
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [showTopicLocked, setShowTopicLocked] = useState(false);
  const auth = useContext(AuthContext);

  const {
    priorityTopicActiveText,
    youHaveToCompleteText,
    toAccessTopicText,
    hangOnText,
    letsDoActiveTopicText,
    searchTopicText,
    attemptNoInitCapText,
    upgradeToGetAccess,
    lockedText,
    outOfUnitsCompleted,
    outOfUnitCompleted,
    okayBtnText,
    UnitTxt,
    UnitsTxt,
  } = useLanguage();

  let priorityModal = null;

  if (store.qnaStore.priorityTopic) {
    priorityModal = (
      <InfoPopup
        testID="InfoPopupTopicListingShowPriority"
        show={showPriorityModal}
        svgText={priorityTopicActiveText}
        desc={youHaveToCompleteText}
        onPress={() => setShowPriorityModal(false)}
        highlightText={store.qnaStore.priorityTopic[0]?.contentName}
        desc_end={toAccessTopicText}
      />
    );
  }

  const renderTopicItem = data => {
    if (data.item.isEmpty) {
      return (
        <View
          accessible={true}
          testID={`TopicListingRenderTopicView${data.contentID}`}
          accessibilityLabel={`TopicListingRenderTopicView${data.contentID}`}>
          {data.item.searchEmpty && (
            <EmptyFour
              accessible={true}
              testID={`TopicListingEmptyFourImage${data.contentID}`}
              accessibilityLabel={`TopicListingEmptyFourImage${data.contentID}`}
              width={getWp(150)}
              style={styles.searchIcon}
            />
          )}

          <BalooThambiRegTextView
            testID={`TopicListingTitle${data.contentID}`}
            style={styles.subHeading}>
            {data.item.title}
          </BalooThambiRegTextView>
        </View>
      );
    }
    let desc = null;
    let attempt = null;
    let hasUpperTag = false;
    let percentage = 0;
    if (data.item) {
      if (data.item.unitsOverall > 1) {
        desc =
          data.item.contentAttemptNumber == 0
            ? data.item.unitsOverall + ' ' + UnitsTxt
            : replaceTwiceString(
              outOfUnitsCompleted,
              'unitsCleared',
              data.item.unitsCleared,
              'unitsOverall',
              data.item.unitsOverall,
            );
      } else {
        desc =
          data.item.contentAttemptNumber == 0
            ? data.item.unitsOverall + ' ' + UnitTxt
            : replaceTwiceString(
              outOfUnitCompleted,
              'unitsCleared',
              data.item.unitsCleared,
              'unitsOverall',
              data.item.unitsOverall,
            );
      }
    }
    if (data.item.unitsCleared && data.item.unitsOverall) {
      percentage = (
        (data.item.unitsCleared / data.item.unitsOverall) *
        100
      ).toFixed(0);
    }

    const ordinal_suffix_of = attemptNumber => {
      let suffixValue = 'th';
      if (attemptNumber % 10 == 1 && attemptNumber % 100 != 11) {
        suffixValue = 'st';
      } else if (attemptNumber % 10 == 2 && attemptNumber % 100 != 12) {
        suffixValue = 'nd';
      } else if (attemptNumber % 10 == 3 && attemptNumber % 100 != 13) {
        suffixValue = 'rd';
      }
      return attemptNumber + suffixValue;
    };

    if (data.item.contentAttemptNumber && data.item.contentAttemptNumber > 1) {
      hasUpperTag = true;
      attempt = `${ordinal_suffix_of(
        data.item.contentAttemptNumber,
      )} ${attemptNoInitCapText}`;
    }

    const onScrollAction = () => {
      auth.trackEvent('mixpanel', MixpanelEvents.TOPIC_OPEN, {
        Category: MixpanelCategories.TOPIC,
        Action: MixpanelActions.OPEN,
        Label: `Class${store.appStore.userData.grade || ''}_Maths_${data.item.contentName || ''
          }`,
      });
      if (data.item.contentStatus === 'active') {
        //Check if locked and give message
        if (data.item.freeTrailLock && freeTrialUser) {
          // topic locked handler
          setShowTopicLocked(true);
        } else {
          if (data.item.lock) {
            if (store.qnaStore.priorityTopic) {
              setShowPriorityModal(true);
            } else {
              setShowInactiveModal(true);
            }
          } else {
            runInAction(() => {
              store.qnaStore.selectedTopic = data.item;
            });
            navigation.navigate(ScreenNames.TopicMapScreen, { topic: data.item });
          }
        }
      } else {
        if (
          data.item.contentStatus === 'deactive' &&
          data.item.status === 'complete'
        ) {
          navigation.navigate(ScreenNames.HowIDidScreen, { topic: data.item });
        } else {
          setShowInactiveModal(true);
        }
      }
    };

    return (
      <View style={styles.itemContainer}>
        <ListItem
          key={data.index}
          isUpperTag={hasUpperTag}
          upperTagText={attempt}
          title={data.item.contentName}
          desc={desc}
          isPriority={permissions.priorityTag && data.item.priority}
          isRevice={permissions.reviseTag && data.item.revise}
          onClickCallback={onScrollAction}
          leftImage={data.item.topicIcon}
          isActive={data.item.contentStatus === 'active' ? true : false}
          isLocked={
            data.item.lock || (data.item.freeTrailLock && freeTrialUser)
          }
          percentage={
            data?.item?.contentAttemptNumber > 1 || data?.item?.higherLevel
              ? -1
              : percentage
          }
          permissions={permissions}
          priorityCount={data?.item?.order}
        />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        style={styles.container}>
        <InfoPopup
          testID="InfoPopupTopicListingHangOnText"
          show={showInactiveModal}
          svgText={hangOnText}
          desc={letsDoActiveTopicText}
          btnText={okayBtnText}
          onPress={() => setShowInactiveModal(false)}
        />
        <InfoPopup
          testID="topicLockedPopUp"
          show={showTopicLocked}
          svgText={lockedText}
          desc={upgradeToGetAccess}
          onPress={() => setShowTopicLocked(false)}
        />
        <View style={styles.subContainer}>
          {priorityModal}

          {permissions?.topicSearch && (
            <View key="searchContainer" style={styles.searchStyle}>
              <SearchInput
                testID="SearchInputTopicListingSearchTopicText"
                onChangeText={val => {
                  onSearch(val);
                }}
                placeholder={searchTopicText}
                value={searchQuery}
              />
            </View>
          )}
          <View style={styles.scrollViewContainer}>
            <SectionList
              sections={sectionList}
              keyExtractor={(item, index) => item + index}
              renderItem={renderTopicItem}
              renderSectionHeader={({ section: { title } }) => (
                <BalooThambiRegTextView
                  testID="TopicListingSectionListTitle"
                  style={styles.heading}>
                  {title}
                </BalooThambiRegTextView>
              )}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              windowSize={10}
              removeClippedSubviews={true}
              initialNumToRender={6}
              onScrollBeginDrag={onScrollBegin}
              onScroll={onScroll}
              stickySectionHeadersEnabled={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

TopicListingContent.propTypes = {
  testID: PropTypes.string,
  onScroll: PropTypes.func,
  onScrollBegin: PropTypes.func,
};

TopicListingContent.defaultProps = {
  testID: 'TopicListingContent',
  onScroll: () => { },
  onScrollBegin: () => { },
};
export default TopicListingContent;
