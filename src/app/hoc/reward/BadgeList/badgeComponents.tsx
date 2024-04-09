import React, { memo } from 'react';
import { View } from 'react-native';
import styles from './indexCss';
import { RewardBadge, BalooThambiRegTextView } from '@components';
import {
  CorrectAnswer,
  StarBadge1,
  SelectedBadgeSVG,
  RewardEmptyState,
} from '@images';
import { getWp, getHp } from '@utils';
import { useLanguage } from '@hooks';

export const BadgeItem = memo(props => {
  const { item, badgeType, isSelectedBadge } = props;
  const injectProps = {};
  const containerStyle = {};

  if (badgeType == 'earned') {
    injectProps.svgURI = item?.badgeIcon;
    containerStyle.borderColor = `#FFFFFF`;
  } else {
    injectProps.Svg = StarBadge1;
    containerStyle.borderColor = `#256F94`;
  }
  return (
    <View style={{ alignItems: 'center' }}>
      {isSelectedBadge && (
        <View style={styles.selectedBadgeSVGContainer}>
          <SelectedBadgeSVG
            width={getWp(95)}
            heigth={getWp(150)}
            preserveAspectRatio={'none'}
          />
        </View>
      )}
      <View style={[styles.badgeItemContainer]}>
        <RewardBadge
          {...injectProps}
          count={item?.count}
          containerStyle={containerStyle}
          progress={item?.progress}
        />
        <BalooThambiRegTextView style={styles.badgeItemText}>
          {item.name}
        </BalooThambiRegTextView>

        {item.isApplied != undefined && item.isApplied && (
          <View style={{ height: getHp(50) }}>
            <CorrectAnswer
              width={getWp(21)}
              height={getWp(21)}
              style={styles.checkMarkConatiner}
            />
          </View>
        )}
      </View>
    </View>
  );
});

export const EmptyComponent = () => {
  const { rewardEmptyState } = useLanguage();
  return (
    <View style={styles.emptyBadgeContainer}>
      <RewardEmptyState width={getWp(150)} style={styles.searchIcon} />
      <BalooThambiRegTextView style={styles.emptyBadgeText}>
        {rewardEmptyState}
      </BalooThambiRegTextView>
    </View>
  );
};
