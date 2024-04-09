import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import NormalText from '@components/NormalText';
import styles from './styles';
import PropTypes from 'prop-types';

const Item = props => {
  const {
    testID,
    leftText,
    rightText,
    LeftSvg,
    containerStyle,
    leftContantStyle,
    textStyle,
    isActive,
    onPress,
  } = props;

  let leftContent = null;

  if (leftText) {
    leftContent = (
      <NormalText
        testID="NormalTextItemLeftContent"
        text={leftText}
        styles={{ ...styles(isActive).textStyle, ...textStyle }}
      />
    );
  }
  if (LeftSvg) {
    leftContent = (
      <LeftSvg
        accessible={true}
        testID="ItemLeftSvg"
        accessibilityLabel="ItemLeftSvg"
        width={styles(isActive).leftSvgStyle.width}
        height={styles(isActive).leftSvgStyle.height}
      />
    );
  }

  return (
    <TouchableWithoutFeedback accessible={true} testID={testID} accessibilityLabel={testID} onPress={onPress}>
      <View style={{ ...styles(isActive).container, ...containerStyle }}>
        <View style={styles(isActive).innerContainer}>
          <View style={{ ...styles(isActive).leftContent, ...leftContantStyle }}>
            {leftContent}
          </View>
          <View style={styles(isActive).rightContent}>
            <NormalText
              testID="NormalTextItemRightText"
              text={rightText}
              styles={{ ...styles(isActive).textStyle, ...textStyle }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

Item.propTypes = {
  testID: PropTypes.string,
  leftText: PropTypes.string,
  rightText: PropTypes.number.isRequired,
  LeftSvg: PropTypes.func,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

Item.defaultProps = {
  testID: 'Item',
  leftText: 'All',
  rightText: '',
};

export default Item;
