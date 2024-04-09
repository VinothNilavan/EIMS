/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/COLORS';
import styles from './indexCss';
/**
 *
 * @param {currentProgress,progressColor,containerStyle,progressBarStyle} props
 */

const GiftProgress = props => {
  let {
    testID,
    currentProgress,
    progressColor,
    containerStyle,
    progressBarStyle,
    commonStyle,
  } = props;
  let animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(0);

  useInterval(() => {
    if (progress < currentProgress) {
      setProgress(progress + 1);
    } else if (progress > currentProgress) {
      setProgress(progress - 1);
    }
  }, 10);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 1000,
    }).start();
  }, [progress, currentProgress]);

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={[styles.container, containerStyle]}>
      <View
        style={{ ...styles.progressBar, ...commonStyle, ...progressBarStyle }}>
        <Animated.View
          style={[
            (StyleSheet.absoluteFill,
            {
              backgroundColor: progressColor,
              width,
            }),
            commonStyle,
          ]}
        />
      </View>
    </View>
  );
};

GiftProgress.defaultProps = {
  testID: 'GiftProgress',
  currentProgress: 30,
  progressColor: COLORS.blue,
  containerStyle: {},
  progressBarStyle: {},
};

GiftProgress.propTypes = {
  testID: PropTypes.string,
  currentProgress: PropTypes.number,
  progressColor: PropTypes.string,
  containerStyle: PropTypes.object,
  progressBarStyle: PropTypes.object,
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default GiftProgress;
