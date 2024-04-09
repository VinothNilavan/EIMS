/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import AwesomeButton from 'react-native-really-awesome-button';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './indexCss';

const SmallRoundButton = props => {
  const {
    testID,
    type,
    width,
    height,
    iconName,
    iconColor,
    iconStyle,
    iconTheme,
  } = props;
  const sizeObj = {
    width: width ? width : hp('5'),
    height: height ? height : hp('5'),
  };

  return (
    <AwesomeButton
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      {...styles[type]}
      {...sizeObj}
      {...props}
      style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute' }}>
        <NativeBaseProvider>
          <Icon
            active
            name={iconName}
            style={{
              color: iconColor,
              fontSize: hp('2.5'),
              textAlign: 'center',
              ...iconStyle,
            }}
            type={iconTheme}
          />
        </NativeBaseProvider>
      </View>
    </AwesomeButton>
  );
};

SmallRoundButton.propTypes = {
  testID: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  textSize: PropTypes.number,
};

SmallRoundButton.defaultProps = {
  testID: 'SmallRoundButton',
  type: 'primaryOrange',
  width: hp('5'),
  height: hp('5'),
};

export default SmallRoundButton;
