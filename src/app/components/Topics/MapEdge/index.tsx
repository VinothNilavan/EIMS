/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Easing, ImageBackground } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { Lottie } from '@lottie/lottieFiles';
import LottieView from 'lottie-react-native';
import { USE_NATIVE_DRIVER } from '@utils';

const MapEdge = props => {
  let animation = useRef(null);
  const [progress] = useState(new Animated.Value(0));
  const { testID, isActive, type, playOnce, duration, loop, autoPlay, style } = props;

  useEffect(() => {
    try {
      if (playOnce) {
        animation.current.play();
      } else {
        animation.current.reset();
      }
      Animated.timing(progress, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start(() => {
        console.log('DONE');
      });
    } catch (error) {
      console.log(`error in MapEdge ${error}`);
    }
  }, [loop, autoPlay, isActive, type, playOnce, duration, progress]);
  /**
   * For Lottie give only width
   */
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={styles.container}>
      <ImageBackground resizeMode="cover" style={styles.imageBackground}>
        <View key="svgContainer" style={styles.lottieContainer}>
          <LottieView
            accessible={true}
            testID="LottieViewMapEdge"
            accessibilityLabel="LottieViewMapEdge"
            ref={animation}
            source={Lottie.generic[type + '_edge']}
            aspectRatio={2}
            autoSize={true}
            style={{
              ...styles.lottieStyle,
              ...style,
            }}
            autoPlay={autoPlay}
            loop={loop}
            {...props}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

MapEdge.propTypes = {
  testID: PropTypes.string
};

MapEdge.defaultProps = {
  testID: 'MapEdge',
  isActive: false,
  type: 'initial',
  playOnce: false,
  duration: 5000,
  loop: false,
  autoPlay: false,
  style: {},
};
export default MapEdge;
