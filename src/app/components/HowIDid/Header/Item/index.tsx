import React from 'react';
import { View } from 'react-native';
import {
  BalooThambiRegTextView,
  SVGImageBackground,
} from '@components';
import styles from './indexCss';
import PropTypes from 'prop-types';

const Item = props => {
  let {
    testID,
    text,
    SvgImage,
    svgText,
    containerStyle,
    textStyle,
    svgTextStyle,
    percentage,
  } = props;

  if (percentage) {
    svgText = (
      <BalooThambiRegTextView testID="ItemSvgText1" style={{ ...styles.svgText, ...svgTextStyle }}>
        {svgText}
        <BalooThambiRegTextView
          testID="ItemPercentage"
          style={{
            ...styles.svgText,
            ...svgTextStyle,
            ...styles.accuracyPerVal,
          }}>
          %
        </BalooThambiRegTextView>
      </BalooThambiRegTextView>
    );
  }
  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} key="container" style={{ ...styles.container, ...containerStyle }}>
      <View key="text" style={styles.containerUpper}>
        <BalooThambiRegTextView testID="ItemText" style={{ ...styles.text, ...textStyle }}>
          {text}
        </BalooThambiRegTextView>
      </View>
      <View key="svgImage" style={styles.containerLower}>
        <View style={styles.svgContainer}>
          <SVGImageBackground
            testID="SVGImageBackgroundItem"
            SvgImage={SvgImage}
            themeBased
            customContainerStyle={styles.svgBgStyle}
            style={styles.svgStyle}
          />
        </View>
        <BalooThambiRegTextView testID="ItemSvgText2" style={{ ...styles.svgText, ...svgTextStyle }}>
          {svgText}
        </BalooThambiRegTextView>
      </View>
    </View>
  );
};

Item.propTypes = {
  testID: PropTypes.string,
  text: PropTypes.string.isRequired,
  SvgImage: PropTypes.func.isRequired,
  svgText: PropTypes.number,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  svgTextStyle: PropTypes.object,
};

Item.defaultProps = {
  testID: 'Item'
};

export default Item;
