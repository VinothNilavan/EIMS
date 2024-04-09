import React, { useContext } from 'react';
import { View, Image, Platform } from 'react-native';
import styles from './style';
import { BalooThambiRegTextView } from '@components';
import { ThemeContext } from '@contexts/theme-context';
import { themeSvg } from '@themeSvgs';
import PropTypes from 'prop-types';
import { useStores } from '@mobx/hooks';
import { TEXTFONTSIZE } from '@constants';
import DeviceInfo from 'react-native-device-info';

const SparkieItem = props => {
  const theme = useContext(ThemeContext);
  const {
    testID,
    title,
    value,
    containerStyle,
    titleStyle,
    valueStyle,
    image,
    ImageSVG,
    themeBased,
  } = props;

  let SvgImage = ImageSVG;

  if (themeBased && SvgImage) {
    SvgImage = themeSvg[theme.name][SvgImage];
  }
  const { appStore } = useStores();

  let fontSize =
    appStore?.userLanguage && appStore?.userLanguage === 'ta'
      ? TEXTFONTSIZE.Text14
      : DeviceInfo.isTablet()? TEXTFONTSIZE.Text18:TEXTFONTSIZE.Text20;

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={[styles.container, containerStyle]}>
      <View style={styles.imageContainer}>
        {ImageSVG != null ? (
          <SvgImage accessible={true} testID="SparkieItemSvgImage" accessibilityLabel="SparkieItemSvgImage" width="100%" height="100%" />
        ) : (
            <Image accessible={true} testID="SparkieItemImage" accessibilityLabel="SparkieItemImage" source={image} width="100%" height="100%" />
          )}
      </View>
      <View style={styles.subContainer}>
        <BalooThambiRegTextView testID="SparkieItemValue" style={[styles.valueText, valueStyle,{ fontSize: fontSize }]}>
          {value}
        </BalooThambiRegTextView>
        <BalooThambiRegTextView
          testID="SparkieItemTitle"
          style={[styles.titleText, titleStyle, { fontSize: fontSize }]}>
          {title}
        </BalooThambiRegTextView>
      </View>
    </View>
  );
};

SparkieItem.propTypes = {
  testID: PropTypes.string,
  title: PropTypes.any,
  value: PropTypes.any,
  containerStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  valueStyle: PropTypes.any,
  image: PropTypes.any,
  imageURI: PropTypes.string,
};

SparkieItem.defaultProps = {
  testID: 'SparkieItem',
  title: '',
  value: '',
  ImageSVG: null,
};

export default SparkieItem;
