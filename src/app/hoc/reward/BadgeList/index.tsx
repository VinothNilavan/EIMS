import React, { useCallback } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import styles from './indexCss';
import { RewardSection } from '@components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { BadgeItem, EmptyComponent } from './badgeComponents';
import { useStores } from '@mobx/hooks';
import { REWARD_TYPES, REWARD_TYPES_SECTION, GET_SORTED_REWARD_TYPES } from '@constants';
import { useToggleSection } from '@hooks';

const BadgeList = props => {
  const { testID, setRewardShowCase, selectedReward } = props;
  const { toggleState, toggleSection } = useToggleSection();
  const store = useStores();

  const permissions = getMenuDataPermissionReward();

  permissions.myBadge = true;

  let BADGES = getStoreBadge();

  const RenderBadge = useCallback(
    ({ item, badgeRewardSectionType, marginleft }) => {
      const isSelectedBadge = REWARD_TYPES.BADGES == selectedReward.type && item.badgeID == selectedReward.item.badgeID;

      return (
        <TouchableOpacity
          accessible={true}
          testID={`BadgeListBadgeItem${item.name}`}
          accessibilityLabel={`BadgeListBadgeItem${item.name}`}
          style={[styles.badgeElementStyle, { marginLeft: marginleft }]}
          onPress={() =>
            setRewardShowCase({
              type: REWARD_TYPES.BADGES,
              item: { ...item, category: badgeRewardSectionType },
            })
          }
        >
          <BadgeItem
            item={item}
            selectedBadge={false}
            badgeType={badgeRewardSectionType}
            isSelectedBadge={isSelectedBadge}
          />
        </TouchableOpacity>
      );
    },
    [selectedReward],
  );

  const RenderBadges = useCallback(
    ({ testID, title, badges, badgeRewardSectionType }) => {
      let badgesData = configBadgesData(badges, toggleState, badgeRewardSectionType);
      return (
        <RewardSection
          accessible={true}
          testID={testID}
          accessibilityLabel={testID}
          title={title}
          contentLength={badges.length}
          onViewAllPress={() => toggleSection(badgeRewardSectionType)}
          isViewAll={toggleState[badgeRewardSectionType].isVisible}>
          <View style={styles.badgeListContainer}>
              <FlatList
                contentContainerStyle={styles.marginTop24}
                horizontal={false}
                data={badgesData}
                renderItem={item => (
                  <RenderBadge
                    {...item}
                    badgeRewardSectionType={badgeRewardSectionType}
                  />
                )}
                numColumns={3}
                keyExtractor={item => item.name}
                ListEmptyComponent={<EmptyComponent/>}
              />
          </View>
        </RewardSection>
      );
    },
    [toggleState, selectedReward],
  );
  const InitBadges = useCallback(() => {
    const composeBadges = Object.keys(BADGES).map((badgeRewardSection, i) => {
      let title = REWARD_TYPES_SECTION[REWARD_TYPES.BADGES][badgeRewardSection];
      // if(badgeRewardSection != 0) {
      if (Array.isArray(BADGES[badgeRewardSection])) {
        return (
          <RenderBadges
            testID={testID}
            title={title}
            badges={BADGES[badgeRewardSection]}
            badgeRewardSectionType={badgeRewardSection}
          />
        );
      }
    });
    if (composeBadges.length > 0) {
      return composeBadges;
    }
  }, [store, selectedReward, toggleState, BADGES]);
  return (
    <ScrollView>
      {permissions.myBadge && Object.keys(BADGES).length > 0 && <InitBadges />}
    </ScrollView>
  );
};

BadgeList.propTypes = {
  testID: PropTypes.string,
};

BadgeList.defaultProps = {
  testID: 'BadgeList',
};

export default observer(BadgeList);

const configBadgesData = (badges, toggleState, badgeRewardSectionType) => {
  return badges?.length > 3 && !toggleState[badgeRewardSectionType]?.isVisible ? badges?.slice(0, 3) : badges;
}

const getStoreBadge = () => {
  const store = useStores();
  return store.appStore.rewardData != null && store.appStore.rewardData.badges != null ?
    GET_SORTED_REWARD_TYPES(store.appStore.rewardData.badges) : GET_SORTED_REWARD_TYPES({ upComing: [], onGoing: [], earned: [] });
}

const getMenuDataPermissionReward = () => {
  const store = useStores();
  return Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.reward : {};
}
