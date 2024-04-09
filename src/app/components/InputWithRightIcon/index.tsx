import React from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Password } from '@images';
import { COLORS } from '@constants';
import styles from './indexCss';
import PropTypes from 'prop-types';

const InputWithRightIcon = props => {
  const {
    testID,
    SvgImage,
    onPressIcon,
    containerStyle,
    inputContainerStyle,
    inputStyle,
    ImageStyle,
    isError,
    secureTextEntry,
  } = props;
  let bdrColor = null;

  if (isError) {
    bdrColor = { borderColor: COLORS.red };
  }

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{ ...styles.SectionStyle, ...containerStyle, ...bdrColor }}>
      <View style={{ ...styles.inputContainer, ...inputContainerStyle }}>
        <TextInput
          accessible={true}
          testID="InputWithRightIconTextInput"
          accessibilityLabel="InputWithRightIconTextInput"
          style={{ ...styles.input, ...inputStyle }}
          {...props}
          secureTextEntry={secureTextEntry}
        />
      </View>
      <View style={styles.imageContainer}>
        <TouchableWithoutFeedback onPress={onPressIcon}>
          <View style = {ImageStyle} accessible={true} testID={'InputWithRightIconTextInput' + testID} accessibilityLabel={testID}>
          <SvgImage
            accessible={true}
            testID="InputWithRightIconSvgImage"
            accessibilityLabel="InputWithRightIconSvgImage"
            style={ImageStyle}
          />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

InputWithRightIcon.propTypes = {
  testID: PropTypes.string,
  SvgImage: PropTypes.func.isRequired,
  onPressIcon: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  inputContainerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  ImageStyle: PropTypes.object,
  secureTextEntry: PropTypes.bool,
};

InputWithRightIcon.defaultProps = {
  testID: 'InputWithRightIcon',
  SvgImage: Password,
  secureTextEntry: false,
  onPressIcon: () => alert('pressed'),
};

export default InputWithRightIcon;
