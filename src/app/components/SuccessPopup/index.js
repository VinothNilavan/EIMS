import React from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './style';
import { HeaderBackground } from '@images';

import { RoundedButton, BalooThambiRegTextView } from '@components';
import { getWp, getHp } from '@utils';
import { useLanguage } from '@hooks';

const SuccessPopup = props => {
  const { testID, isVisible, text, containerStyle, onPress } = props;
  const { okayBtnText, hoorayText } = useLanguage();

  return (
    <Modal
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View
        style={[
          styles.modalStyle,
          { justifyContent: 'center', alignSelf: 'center' },
        ]}>
        <View style={[styles.container, containerStyle]}>
          <View style={styles.titleContainer}>
            <BalooThambiRegTextView
              testID="SessionTimeOutDialogTitleText"
              style={styles.titleText}>
              {hoorayText}
            </BalooThambiRegTextView>
            <HeaderBackground
              accessible={true}
              testID="SessionTimeOutDialogHeaderBg"
              accessibilityLabel="SessionTimeOutDialogHeaderBg"
              style={styles.svgBackgroundImage}
            />
          </View>
          <BalooThambiRegTextView
            testID="RoundedButton"
            style={styles.textStyle}>
            {text}
          </BalooThambiRegTextView>
        </View>
        <RoundedButton
          testID="RoundedButtonRoundedButtonOkayBtnText"
          text={okayBtnText}
          type="elevatedOrange"
          width={getWp(180)}
          height={getHp(70)}
          onPress={() => {
            onPress();
          }}
          containerStyle={styles.buttonStyle}
          textStyle={styles.whiteButtonText}
        />
      </View>
    </Modal>
  );
};

SuccessPopup.propTypes = {
  testID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string,
  containerStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

SuccessPopup.defaultProps = {
  testID: 'SuccessPopup',
  onPress: () => { console.log(`SuccessPopup default`) },
};

export default SuccessPopup;
