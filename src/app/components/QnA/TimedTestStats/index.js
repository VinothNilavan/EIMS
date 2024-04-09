import React from 'react';
import {Text, View} from 'react-native';
import Item from './Item';
import styles from './indexCss';
import PropTypes from 'prop-types';
const TimedTestStat = props => {
  const {accuracy, correct, wrong, containerStyle} = props;
  return (
    <View key="container" style={{...styles.container, ...containerStyle}}>
      <View
        key="itemContainer1"
        style={{
          ...styles.itemContainer,
          ...styles.itemContainerBorder,
        }}>
        <Item title="Accuracy" text={`${accuracy}%`} />
      </View>
      <View
        key="itemContainer2"
        style={{...styles.itemContainer, ...styles.itemContainerBorder}}>
        <Item title="Correct" text={correct} />
      </View>
      <View key="itemContainer3" style={styles.itemContainer}>
        <Item title="Wrong" text={wrong} />
      </View>
    </View>
  );
};

TimedTestStat.propTypes = {
  accuracy: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
  wrong: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
};

TimedTestStat.defaultProps = {
  accuracy: '100%',
  correct: '0',
  wrong: '0',
};

export default TimedTestStat;
