import React from 'react';
import { Text, View } from 'react-native';
import Item from '../TimedTestStats/Item';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { useLanguage } from '@hooks';
const TimedTestStat = props => {
  const { testID, attempted, correct, total, containerStyle } = props;
  const { attemptedLabel, correctText, totalLabel } = useLanguage();
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} key="container" style={{ ...styles.container, ...containerStyle }}>
      <View
        key="itemContainer1"
        style={{
          ...styles.itemContainer,
          ...styles.itemContainerBorder,
        }}>
        <Item
          accessible={true}
          testID="TimeTestsLiveStatsAttempted"
          accessibilityLabel="TimeTestsLiveStatsAttempted"
          title={attemptedLabel}
          text={attempted}
          titleStyle={{ ...styles.titleStyle, ...styles.attemptedColor }}
          textStyle={{ ...styles.textStyle, ...styles.attemptedColor }}
        />
      </View>
      <View
        key="itemContainer2"
        style={{ ...styles.itemContainer, ...styles.itemContainerBorder }}>
        <Item
          accessible={true}
          testID="TimeTestsLiveStatsCorrectText"
          accessibilityLabel="TimeTestsLiveStatsCorrectText"
          title={correctText}
          text={correct}
          titleStyle={{ ...styles.titleStyle, ...styles.correctColor }}
          textStyle={{ ...styles.textStyle, ...styles.correctColor }}
        />
      </View>
      <View key="itemContainer3" style={styles.itemContainer}>
        <Item
        accessible={true}
        testID="TimeTestsLiveStatsTotalLabel"
        accessibilityLabel="TimeTestsLiveStatsTotalLabel"
          title={totalLabel}
          text={total}
          titleStyle={{ ...styles.titleStyle, ...styles.totalColor }}
          textStyle={{ ...styles.textStyle, ...styles.totalColor }}
        />
      </View>
    </View>
  );
};

TimedTestStat.propTypes = {
  testID: PropTypes.string,
  accuracy: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
};

TimedTestStat.defaultProps = {
  testID: 'TimedTestStat',
  attempted: '0',
  correct: '0',
  total: '0',
};

export default TimedTestStat;
