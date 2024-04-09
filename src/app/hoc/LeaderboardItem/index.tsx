/* eslint-disable react-hooks/exhaustive-deps */
// External Imports

import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import { observer } from 'mobx-react';

// Internal Imports
import { BalooThambiRegTextView } from '@components';
import styles from './style';
import { SparkyIcon } from '@images';
import { useLanguage } from '@hooks';
import PropTypes from 'prop-types';

const LeaderboardItem = props => {
  const { permissions, item, type } = props;
  const { sparkieEarned } = useLanguage();

  return (
    <Fragment>
    {permissions.mySparkies && (
        <View style={styles.sparkeyContainer}>
          <View style={styles.row}>
            <Image
              accessible={true}
              testID={`LeaderBoardMySparkies${item.upid}`}
              accessibilityLabel={`LeaderBoardMySparkies${item.upid}`}
              source={SparkyIcon}
              style={styles.iconStyle}
            />
            <BalooThambiRegTextView
              testID={`LeaderboardItemCount${item.upid}`}
              style={[
                styles.pointStyle,
                item.thisUser && styles.whiteTextColor,
              ]}>
              {item.count < 10 ? `0${item.count}` : item.count}
            </BalooThambiRegTextView>
          </View>
          <BalooThambiRegTextView
            testID={`LeaderBoardSparkiesEarned${item.upid}`}
            style={[
              styles.titleStyle,
              item.thisUser && styles.whiteTextColor,
            ]}>
            {sparkieEarned}
          </BalooThambiRegTextView>
        </View>
      )}
      </Fragment>
  );
};

LeaderboardItem.propTypes = {
  testID: PropTypes.string,
};

LeaderboardItem.defaultProps = {
  testID: 'LeaderboardItem',
};

export default observer(LeaderboardItem);