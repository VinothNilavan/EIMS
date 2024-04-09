import React from 'react';
import { View, Text } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';

const InputWithRightIcon = props => {
  const {
    testID,
    SvgRightImage,
    SvgLeftImage,
    containerStyle,
    text,
    textStyle,
    leftImageStyle,
    rightImageStyle,
  } = props;
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={{ ...styles.SectionStyle, ...containerStyle }}>
      <View style={styles.leftImagecontainer}>
        <SvgLeftImage accessible={true} testID="InputWithRightIconSvgLeftImage" accessibilityLabel="InputWithRightIconSvgLeftImage" style={{ ...leftImageStyle }} />
      </View>
      <View style={styles.textContainer}>
        <Text accessible={true} testID="InputWithRightIconText" accessibilityLabel="InputWithRightIconText" style={{ ...styles.text, ...textStyle }}>{text}</Text>
      </View>
      <View style={styles.rightImageContainer}>
        <SvgRightImage accessible={true} testID="InputWithRightIconRightImageContainer" accessibilityLabel="InputWithRightIconRightImageContainer" style={{ ...rightImageStyle }} />
      </View>
    </View>
  );
};

InputWithRightIcon.propTypes = {
  testID: PropTypes.string,
  containerStyle: PropTypes.object,
  SvgRightImage: PropTypes.func,
  SvgLeftImage: PropTypes.func,
};

InputWithRightIcon.defaultProps = {
  testID: 'InputWithRightIcon'
};


export default InputWithRightIcon;
