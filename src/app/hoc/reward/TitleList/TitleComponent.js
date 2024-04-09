import React from 'react';
import { View } from 'react-native';
import styles from './indexCss';
import { RewardTitle } from '@components';
import { CorrectAnswer } from '@images';
import { getWp } from '@utils';

export const TitleItem = props => {
  const { item, titleRewardSectionType } = props;
  return (
    <View style={[styles.titleItemContainer]}>
      <RewardTitle item={item} titleRewardSectionType={titleRewardSectionType} />
      {item.isApplied != undefined && item.isApplied == true && (
        <CorrectAnswer width={getWp(21)} height={getWp(21)} style={styles.checkMarkConatiner} />
      )}
    </View>
  );
};