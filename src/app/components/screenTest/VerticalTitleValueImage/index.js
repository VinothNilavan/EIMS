import React from 'react';
import {View} from 'native-base';
import styles from './style';
import {BalooThambiRegTextView} from '@components';
import PropTypes from 'prop-types';
import {PixelRatio} from 'react-native';
import {getWp} from '@utils';

const VerticalTitleValueImage = props => {
  const {
    title,
    count,
    SVGIcon,
    containerStyle,
    titleStyle,
    countStyle,
    optionText,
    optionTextStyle,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <BalooThambiRegTextView style={[styles.titleText, titleStyle]}>
        {title}
      </BalooThambiRegTextView>
      <View style={styles.subContainer}>
        <SVGIcon />
        <View
          style={[
            styles.countTextContainer,
            {top: PixelRatio.get() > 1.6 ? getWp(10) : getWp(5)},
          ]}>
          <BalooThambiRegTextView style={[styles.countText, countStyle]}>
            {count}
          </BalooThambiRegTextView>
          {optionText != null && optionText.length > 0 && (
            <BalooThambiRegTextView
              style={[styles.optionText, optionTextStyle]}>
              {optionText}
            </BalooThambiRegTextView>
          )}
        </View>
      </View>
    </View>
  );
};

VerticalTitleValueImage.propTypes = {
  title: PropTypes.any,
  count: PropTypes.any,
  optionText: PropTypes.any,
  SVGIcon: PropTypes.any,
  containerStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  countStyle: PropTypes.any,
  optionTextStyle: PropTypes.any,
};

VerticalTitleValueImage.defaultProps = {};

export default VerticalTitleValueImage;
