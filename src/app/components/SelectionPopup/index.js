import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { SVGImageBackground, RoundedButton } from '@components';
import NormalText from '@components/NormalText';
import { HeaderBackground } from '@images';

import styles from './indexCss';
import PropTypes from 'prop-types';

const SelectionPopup = props => {
  const {
    testID,
    show,
    SvgImage,
    svgText,
    desc,
    cancelBtnText,
    actionBtnText,
    onCancelPress,
    onActionPress,
  } = props;
  return (
    <Modal
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      isVisible={show}
      {...props}>
      <View style={{ ...styles.container }}>
        <View style={styles.btnContainer}>
          <View style={styles.mrgnBtm17}>
            <RoundedButton
              testID="RoundedButtonSelectionPopupActionBtnText"
              onPress={onActionPress}
              type="elevatedOrange"
              text={actionBtnText}
              width={styles.btn.width}
              height={styles.btn.height}
              textStyle={{ ...styles.actionBtnText }}
            />
          </View>
          <RoundedButton
            testID="RoundedButtonSelectionPopupCancelBtnText"
            onPress={onCancelPress}
            type="secondaryWhite"
            text={cancelBtnText}
            width={styles.btn.width}
            height={styles.btn.height}
            textStyle={{ ...styles.actionBtnText, ...styles.cancelBtnText }}
          />
        </View>
        <View style={styles.svgContainer}>
          <SVGImageBackground
            testID="SelectionPopupSVGImageBackground"
            SvgImage={SvgImage}>
            <View style={{ ...styles.svgTextContainer }}>
              <NormalText
                testID="SelectionPopupNormalTextSvgText"
                text={svgText}
                styles={{ ...styles.svgText }}
              />
            </View>
          </SVGImageBackground>
        </View>
        <NormalText
          testID="SelectionPopupNormalTextDesc"
          text={desc}
          styles={{ ...styles.text }}
        />
      </View>
    </Modal>
  );
};

SelectionPopup.propTypes = {
  testID: PropTypes.string,
  show: PropTypes.bool.isRequired,
  SvgImage: PropTypes.func.isRequired,
  svgText: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

SelectionPopup.defaultProps = {
  testID: 'SelectionPopup',
  show: false,
  SvgImage: HeaderBackground,
  svgText: 'Sparkies Alert!',
  btnText: 'Okay',
  desc: 'This is your <x> topic attempt and you will not get any sparkies or challenge questions now.',
};

export default SelectionPopup;
