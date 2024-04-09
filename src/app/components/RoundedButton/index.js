/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { COLORS } from '@constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './indexCss';

import { getWp, getHp } from '@utils';
/**
 *
 * @param {type,width,height,textSize,containerStyle} props
 */

const RoundedButton = props => {
  const {
    testID,
    type,
    width,
    height,
    textSize,
    containerStyle,
    text,
    style,
    SvgImage,
    textStyle,
    isRTLSvg,
  } = props;
  const sizeObj = {
    width: width ? width : wp('40'),
    height: height ? height : hp('5'),
    textSize: textSize ? textSize : hp('1.5'),
  };
  if (SvgImage) {
    if (isRTLSvg) {
      return (
        <AwesomeButton
          accessible={true}
          testID={testID}
          accessibilityLabel={testID}
          {...styles[type]}
          {...sizeObj}
          {...props}
          {...style}
          style={containerStyle}>
          <View
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ flex: 1, marginStart: wp('2') }}>
              <SvgImage height={getHp(28)} width={getWp(30)} />
            </View>
            <Text
              style={{
                position: 'absolute',
                color: COLORS.white,
                fontSize: hp('2'),
                fontFamily: 'SourceSansPro-Bold',
                alignSelf: 'center',
                paddingLeft: 10,
                ...textStyle,
              }}>
              {text}
            </Text>
          </View>
        </AwesomeButton>
      );
    }
    return (
      <AwesomeButton
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        {...styles[type]}
        {...sizeObj}
        {...props}
        {...style}
        backgroundDarker="black"
        style={containerStyle}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'flex-end', marginEnd: wp('5') }}>
            <SvgImage height={getHp(20)} width={getWp(20)} />
          </View>
          <Text
            style={{
              position: 'absolute',
              color: COLORS.white,
              fontSize: hp('2'),
              fontFamily: 'SourceSansPro-Bold',
              alignSelf: 'center',
              ...textStyle,
            }}>
            {text}
          </Text>
        </View>
      </AwesomeButton>
    );
  } else {
    return (
      <AwesomeButton
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        {...styles[type]}
        {...sizeObj}
        {...props}
        style={containerStyle}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Text
            style={{
              position: 'absolute',
              color: COLORS.white,
              fontSize: hp('2'),
              fontFamily: 'SourceSansPro-Bold',
              alignSelf: 'center',
              ...textStyle,
            }}>
            {text}
          </Text>
        </View>
      </AwesomeButton>
    );
  }
};

RoundedButton.propTypes = {
  testID: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  textSize: PropTypes.number,
};

RoundedButton.defaultProps = {
  testID: 'RoundedButton',
  type: 'primaryOrange',
  disabled: false,
  width: wp('40'),
  height: hp('5'),
  textSize: hp('1.5'),
};

export default RoundedButton;
