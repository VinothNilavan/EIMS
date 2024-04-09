/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { COLORS } from '@constants/COLORS';
import { SimpleLottie } from '@components';
import { FinishFlag } from '@images';

const MapProfile = props => {
  const [starName, setstarName] = useState();
  const {
    testID,
    profileUrl,
    position,
    percentage,
    isActive,
    containerStyle,
    showFlag,
    unitStatus,
  } = props;
  const isLeft = position == 'left' ? true : false;

  useEffect(() => {
    if (percentage) {
      setstarName(getStarName());
    }
  }, [getStarName, percentage]);

  let imgContainer = styles.imgContainer;
  if (isActive) {
    imgContainer = { ...styles.imgContainer, ...styles.activeImgContainer };
  }

  const getStarName = () => {
    if (unitStatus == 'completed' && percentage > 90) {
      return 'three_stars';
    } else if (unitStatus == 'completed' && percentage > 50) {
      return 'two_stars';
    } else if (unitStatus == 'completed' && percentage > 35) {
      return 'one_star';
    } else {
      return null;
    }
  };

  
  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={{
        ...styles.container,
        ...containerStyle,
      }}>
      {isLeft && starName && isActive && (
        <View style={styles.leftStarContainer}>
          <SimpleLottie
            testID="SimpleLottieMapProfileLeftStar"
            jsonFileName={starName}
            theme="generic"
            styles={styles.leftStarLottie}
          />
        </View>
      )}
      <View style={{}}>
        {showFlag && <FinishFlag accessible={true} testID="MapProfileFinish" accessibilityLabel="MapProfileFinish" style={styles.finishFlag} />}
        <View key="bg" style={imgContainer}>
          <Image
            accessible={true}
            testID="MapProfileProfileImage"
            accessibilityLabel="MapProfileProfileImage"
            style={styles.image}
            source={{
              uri: profileUrl,
            }}
          />
        </View>
      </View>
      {!isLeft && starName && isActive && (
        <View style={styles.rightStarContainer}>
          <SimpleLottie
            testID="SimpleLottieMapProfileRightStar"
            jsonFileName={starName}
            theme="generic"
            styles={styles.rightStarLottie}
          />
        </View>
      )}
    </View>
  );
};

MapProfile.propTypes = {
  testID: PropTypes.string
};

MapProfile.defaultProps = {
  testID: 'MapProfile',
  bgColor: COLORS.white,
  textColor: COLORS.mapTextDarkBlue,
  profileUrl:
    'https://image.shutterstock.com/image-vector/star-vector-icon-600w-594937739.jpg',
  position: 'left',
  percentage: 95,
  isActive: false,
  showFlag: false,
};
export default MapProfile;
