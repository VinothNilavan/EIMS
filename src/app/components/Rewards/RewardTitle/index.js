import React from 'react';
import { View } from 'react-native';
import { BalooThambiRegTextView } from '@components';
import styles from './indexCss';
import * as ProgressBar from 'react-native-progress';
import { getWp, getHp } from '@utils';
import { REWARD_TYPES_CATEGORY } from '@constants';

const RewardTitle = props => {
  const { item, titleRewardSectionType } = props;
  const DotView = () => {
    return (
      <View style={styles.dotViewContainer}>
        {new Array(3).fill(0).map(i => (
          <View style={styles.singleDotView} />
        ))}
      </View>
    );
  };
  const RenderProgressBar = () => {
    if (isNaN(item?.progress)) {
      return null;
    }
    if (item?.progress == 0) {
      return (
        <View
          style={{
            alignSelf: 'center',
            marginTop: getHp(5),
            marginBottom: getHp(8),
          }}>
          <DotView />
        </View>
      );
    }
    return (
      <View style={styles.progressContainerStyle}>
        <ProgressBar.Bar
          progress={item?.progress ? item?.progress / 100 : 0}
          width={getWp(40)}
          height={getHp(8)}
          unfilledColor={'#000'}
          borderWidth={0}
          color={'#FFF'}
        />
      </View>
    );
  };
  return (
    <View>
      {titleRewardSectionType == REWARD_TYPES_CATEGORY.ONGOING && (
        <RenderProgressBar />
      )}
      <BalooThambiRegTextView style={styles.titleTextStyle}>
        {item.name}
      </BalooThambiRegTextView>
    </View>
  );
};

export default RewardTitle;
