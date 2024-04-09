import React from 'react';
import { View } from 'react-native';
import {
  CustomModal,
  SVGImageBackground,
  BalooThambiRegTextView,
} from '@components';
import { HeaderBackground } from '@images';
import styles from './indexCss';
import PropTypes from 'prop-types';

const InfoPopup = props => {
  const {
    testID,
    show,
    SvgImage,
    svgText,
    onPress,
    desc,
    highlightText,
    desc_end,
  } = props;

  return (
    <CustomModal accessible={true} testID={testID} accessibilityLabel={testID} show={show} onPress={onPress} {...props}>
      <View style={styles.container}>
        <SVGImageBackground
          testID="SVGImageBackgroundInfoPopupSVGBackground"
          SvgImage={SvgImage}
          style={{ ...styles.svgContainer }}>
          <View style={{ ...styles.svgTextContainer }}>
            <BalooThambiRegTextView testID="InfoPopupSvgText" style={styles.svgText}>
              {svgText}
            </BalooThambiRegTextView>
          </View>
        </SVGImageBackground>
      </View>
      <BalooThambiRegTextView testID="InfoPopupDesc" style={styles.text}>
        {desc}
      </BalooThambiRegTextView>
      {highlightText && (
        <BalooThambiRegTextView
          testID="InfoPopupHiglightText"
          style={{ ...styles.text, ...styles.highlightText }}>
          {highlightText}
        </BalooThambiRegTextView>
      )}
      {desc_end && (
        <BalooThambiRegTextView testID="InfoPopupDesc_end" style={styles.text}>
          {desc_end}
        </BalooThambiRegTextView>
      )}
    </CustomModal>
  );
};

InfoPopup.propTypes = {
  testID: PropTypes.string,
  show: PropTypes.bool.isRequired,
  SvgImage: PropTypes.func.isRequired,
  svgText: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

InfoPopup.defaultProps = {
  testID: 'InfoPopup',
  show: false,
  SvgImage: HeaderBackground,
  svgText: 'Sparkies Alert!',
  btnText: 'Okay',
  desc:
    'This is your <x> topic attempt and you will not get any sparkies or challenge questions now.',
};

export default InfoPopup;
