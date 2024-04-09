/* eslint-disable react-hooks/exhaustive-deps */
// External Imports

import React, { useEffect, Fragment, useState } from 'react';
import { FlatList, View, Image } from 'react-native';
import moment from 'moment';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { SvgCssUri } from 'react-native-svg/css';

// Internal Imports
import { BalooThambiRegTextView } from '@components';
import { LeaderboardItem, LeaderboardNameItem } from '@hoc';
import styles from './style';
import { Gold, Silver, Bronze, SelectedTitleSVG, SparkyIcon, NeutralPng } from '@images';
import { getFormatedDate, getTimeDiff, isTablet, getWp, getHp } from '@utils';
import { useLanguage } from '@hooks';
import PropTypes from 'prop-types';

const isTablets = isTablet();

const Leaderboard = props => {
  const [offset, setOffset] = useState(0);
  const { testID, permissions, onEndReached, type } = props;
  const { sparkieEarned, sparkieLeaderBoard } = useLanguage();
  const { leaderBoardStore, appStore } = useStores();
  const [loaded, setLoaded] = useState(false);
  const [isScrollDirectionUp, setIsScrollDirectionUp] = useState(false);
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false);
  const [userDetails, setUserDetails] = useState({ index: -1, user: null });
  const [flexValue, setFlexValue] = useState(isTablets ? 0.38 : 0.18);
  const [inVisibleItems, setInVisibleItems] = useState([null]);
  const { profileDetails } = appStore.userData;

  useEffect(() => {
    let userDetails = {
      index: -1,
      user: null,
    };

    leaderBoardStore?.groupSparkieData.map((item, index) => {
      if (item.thisUser && userDetails.user === null) {
        userDetails.index = index;
        userDetails.user = item;
      }
    });

    setUserDetails(userDetails);
    setTimeout(() => { setLoaded(() => true); }, 150);
  }, [currentUserLoaded]);

  const getRankItem = (index, thisUser) => {
    if (index === 1 || index === 2 || index === 3) {
      let Svg = Bronze;
      if (index === 1) {
        Svg = Gold;
      } else if (index === 2) {
        Svg = Silver;
      }
      return (
        <View style={styles.rankContainer}>
          <Svg width={'100%'} height={getHp(40)} style={styles.medalStyle} />
          <BalooThambiRegTextView
            style={[
              styles.rankStyle,
              userDetails?.user?.rank === index &&
              thisUser &&
              styles.whiteTextColor,
            ]}>
            {index}
          </BalooThambiRegTextView>
        </View>
      );
    } else {
      return (
        <BalooThambiRegTextView
          style={[
            styles.rankStyle,
            userDetails?.user?.rank === index &&
            thisUser &&
            styles.whiteTextColor,
          ]}>
          {index}
        </BalooThambiRegTextView>
      );
    }
  };

  const onScrollLeaderBoard = event => {
    try {
      let currentOffset = event.nativeEvent.contentOffset.y;
      let direction = currentOffset > offset ? 'down' : 'up';
      setOffset(currentOffset);
      setIsScrollDirectionUp(direction === 'up');
      if (isScrollDirectionUp && inVisibleItems.length > 0) {
        setCurrentUserLoaded(false);
        setFlexValue(isTablets ? 0.38 : 0.18);
      }
    } catch (err) {
      console.log('onScrollLeaderBoard error = ', err);
    }
  };

  const onViewableItemsChangedV2 = ({ viewableItems, changed }) => {
    const visibleItemsNew = changed.filter(
      entry => entry.item.thisUser && entry.isViewable,
    );
    const inVisiItemsNew = changed.filter(
      entry => entry.item.thisUser && !entry.isViewable,
    );
    setInVisibleItems(inVisiItemsNew);
    if (visibleItemsNew.length > 0) {
      setFlexValue(0);
      setCurrentUserLoaded(true);
    }
  };

  const viewabilityConfigCallbackPairs = React.useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: -flexValue,
      },
      onViewableItemsChanged: onViewableItemsChangedV2,
    },
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: -flexValue,
      },
      onViewableItemsChanged: onViewableItemsChangedV2,
    },
  ]);

  const renderItem = ({ item, index }, show = false) => {
    if (!show && item.count == 0) {
      return null;
    }

    var imageString = NeutralPng;
    try {
      imageString = (item?.avatar?.split('.').pop().toLowerCase()) === 'svg' ? NeutralPng : { uri: item.avatar };
    } catch (err) {
      console.log(err);
    }

    return (
      <View
        style={[
          styles.listItemContainer,
          item.thisUser && styles.stickyListItemContainer,
        ]}>
        {getRankItem(item.rank, item?.thisUser)}
        {permissions.profilePicture && (
          <View>
            <View key="crownContainer" style={styles.crownContainer}>
              {profileDetails?.certificate?.certificateCrownImg && (
                <SvgCssUri
                  accessible={true}
                  testID="DashBoardFooterSVGUri"
                  accessibilityLabel="DashBoardFooterSVGUri"
                  uri={profileDetails?.certificate?.certificateCrownImg}
                  width={getWp(15)}
                  height={getWp(15)}
                />
              )}
              {profileDetails?.certificate?.certificateBannerImg && (
                <View key="bannerContainer" style={styles.bannerContainer}>
                  <SvgCssUri
                    accessible={true}
                    testID="DashBoardFooterSVGUri"
                    accessibilityLabel="DashBoardFooterSVGUri"
                    uri={profileDetails?.certificate?.certificateBannerImg}
                    width={isTablets ? getWp(55) : getWp(35)}
                    height={getWp(25)}
                  />
                </View>
              )}
            </View>
            {item?.badgeIcon && item?.badgeIcon?.length > 0 && (
              <SvgCssUri
                accessible={true}
                testID={`LeaderboardSvgUri${item.upid}`}
                accessibilityLabel={`LeaderboardSvgUri${item.upid}`}
                uri={item?.badgeIcon}
                width={getWp(20)}
                height={getWp(20)}
                style={styles.badgeStyle}
              />
            )}
            <Image
              accessible={true}
              testID={`LeaderboardImage${item.upid}`}
              style={styles.avatar}
              source={imageString}
            />
          </View>
        )}

        {permissions.profileName && ( <LeaderboardNameItem item = {item} permissions = {permissions}/> )}
        {permissions.mySparkies && ( <LeaderboardItem item = {item} permissions = {permissions}/> )}
      </View>
    );
  };

  const getDate = () => {
    if (leaderBoardStore?.currentMonth) {
      const array = leaderBoardStore?.currentMonth.split('-');
      return (
        moment()
          .month(array[1] - 1)
          .format('MMMM') +
        ' ' +
        array[0]
      );
    }
  };

  const leaderBoardDateSection = () => {
    let element = null;
    if (type == 'yourSection') {
      element = (
        <BalooThambiRegTextView
          testID="LeaderboardDate"
          style={styles.subTitle}>
          {getDate()}
        </BalooThambiRegTextView>
      );
    } else {
      if (leaderBoardStore?.startDate && leaderBoardStore?.endDate) {
        let updatedTime = getTimeDiff(leaderBoardStore?.lastUpdatedOn);
        element = (
          <Fragment>
            <BalooThambiRegTextView
              testID="LeaderboardFormattedDate"
              style={styles.subTitle}>
              {getFormatedDate(leaderBoardStore?.startDate)} -{' '}
              {getFormatedDate(leaderBoardStore?.endDate)}
            </BalooThambiRegTextView>
            <BalooThambiRegTextView
              testID="LeaderBoardUpdated"
              style={styles.subTitle1}>
              {`Updated ${updatedTime.timeDifference} ${updatedTime.unit} ago`}
            </BalooThambiRegTextView>
          </Fragment>
        );
      }
    }
    return element;
  };

  const sortNameInRank = () => {
    let sortedArray = [...leaderBoardStore.groupSparkieData];
    sortedArray.sort((a, b) =>
      b.rank === a.rank ? a.name.toLowerCase().localeCompare(b.name.toLowerCase()) : a.rank - b.rank,
    );
    return sortedArray;
  };

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={styles.container}>
      <View style={styles.titleContainer}>
        <BalooThambiRegTextView
          testID="LeaderboardSparkieLeaderBoard"
          style={styles.title}>
          {sparkieLeaderBoard}
        </BalooThambiRegTextView>
        {leaderBoardDateSection()}
      </View>
      <View style={styles.listContainer}>
        {loaded &&
          leaderBoardStore?.groupSparkieData !== null &&
          leaderBoardStore?.groupSparkieData.length > 0 ? (
          <FlatList
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            style={styles.flexOne}
            data={sortNameInRank()}
            renderItem={item => renderItem(item)}
            onEndReached={() => {
              onEndReached();
            }}
            onEndReachedThreshold={0.7}
            keyExtractor={item => item?.upid}
            removeClippedSubviews={false}
            onScroll={event => onScrollLeaderBoard(event)}
            stickyHeaderIndices={
              userDetails.index != null ? [userDetails.index] : []
            }
          />
        ) : null}
        <View style={{ flex: flexValue }}>
          {loaded &&
            leaderBoardStore?.myRankDetails &&
            (isNaN(leaderBoardStore?.myRankDetails.sparkieRank)
              ? true
              : leaderBoardStore?.myRankDetails?.sparkieRank > 5) &&
            !currentUserLoaded &&
            renderItem(currentUserItem(leaderBoardStore), true)}
        </View>
      </View>
    </View>
  );
};

Leaderboard.propTypes = {
  testID: PropTypes.string,
};

Leaderboard.defaultProps = {
  testID: 'Leaderboard',
};

export default observer(Leaderboard);

function currentUserItem(leaderBoardStore: any): { item: any; index: any } {
  return {
    item: {
      name: leaderBoardStore?.myRankDetails.name,
      avatar: leaderBoardStore?.myRankDetails.avatar,
      count: leaderBoardStore?.myRankDetails?.sparkieCount,
      rank: leaderBoardStore?.myRankDetails?.sparkieRank,
      badgeIcon: leaderBoardStore?.myRankDetails?.badgeIcon,
      title: leaderBoardStore?.myRankDetails?.title,
      thisUser: true,
    },
  };
}
