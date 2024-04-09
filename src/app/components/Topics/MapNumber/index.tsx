/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { COLORS } from '@constants/COLORS';
import { BalooThambiRegTextView, SimpleLottie } from '@components';
import { FinishFlag } from '@images';
import { useStores } from '@mobx/hooks';

const MapNumber = props => {
  const [starName, setstarName] = useState();
  const store = useStores();
  const isRTL = store?.uiStore?.isRTL;

  const {
    testID,
    text,
    position,
    percentage,
    isActive,
    containerStyle,
    showFlag,
  } = props;
  const isLeft = position == 'left' ? true : false;

  useEffect(() => {
    if (percentage) {
      setstarName(getStarName(percentage));
    }
  }, [percentage]);
  
  let numContainer = styles.numContainer;
  let numText = styles.numText;
  if (isActive) {
    numContainer = { ...styles.numContainer, ...styles.activeNumContainer };
  }
  let totalMapcontainer = {};
  if (position == 'initial' && isRTL) {
    numContainer =  styles.numRightContainer;
    totalMapcontainer = styles.holderContainer;
    if (isActive) {
      numContainer = { ...styles.numRightContainer, ...styles.activeNumContainer };
    }
  }
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} key="container" style={{ ...styles.container, ...containerStyle }}>
      {isLeft && starName && (
        <View style={styles.leftStarContainer}>
          {isActive && (
            <SimpleLottie
              testID="SimpleLottieMapNumberStarName"
              jsonFileName={starName}
              theme="generic"
              styles={styles.leftStarLottie}
            />
          )}
        </View>
      )}
      <View style={totalMapcontainer}>
        {showFlag && <FinishFlag accessible={true} testID="MapNumberFinishFlag" accessibilityLabel="MapNumberFinishFlag" style={styles.finishFlag} />}
        <View key="bg" style={numContainer}>
          <BalooThambiRegTextView testID="MapNumberText" style={text == 'Go' ? numText : styles.vernacularNumText}> {text} </BalooThambiRegTextView>
        </View>
      </View>
      {!isLeft && starName && (
        <View style={styles.rightStarContainer}>
          {isActive && (
            <SimpleLottie
              accessible={true}
              testID="MapNumberStarName"
              jsonFileName={starName}
              theme="generic"
              styles={styles.rightStarLottie}
            />
          )}
        </View>
      )}
    </View>
  );
};

const getStarName = percentage => {
  if (percentage > 90) {
    return 'three_stars';
  } else if (percentage > 50) {
    return 'two_stars';
  } else if (percentage > 35) {
    return 'one_star';
  } else {
    return null;
  }
};

MapNumber.propTypes = {
  testID: PropTypes.string
};

MapNumber.defaultProps = {
  testID: 'MapNumber',
  bgColor: COLORS.white,
  textColor: COLORS.mapTextDarkBlue,
  text: 'GO',
  position: 'left',
  percentage: 95,
  isActive: false,
  showFlag: false,
};
export default MapNumber;
