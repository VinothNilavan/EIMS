import React from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './style';
import { RoundedButton, BalooThambiRegTextView } from '@components';
import { getWp } from '@utils';
import { useStores } from '@mobx/hooks';
import { TEXTFONTSIZE } from '@constants';

const ConfirmationDialog = props => {
  const {
    testID,
    isVisible,
    text,
    primaryButton,
    secondaryButton,
    containerStyle,
    textStyle,
    primaryButtonStyle,
    secondaryButtonStyle,
    primaryBtnPressed,
    secondaryBtnPressed,
    title,
  } = props;

  const { appStore } = useStores();
  let fontSize = appStore?.userLanguage && appStore?.userLanguage === 'ta' ? TEXTFONTSIZE.Text18 : TEXTFONTSIZE.Text24;

  return (
    <Modal accessible={true} testID={testID} accessibilityLabel={testID} isVisible={isVisible}>
      <View style={[styles.container, containerStyle]}>
        <BalooThambiRegTextView testID="ConfirmationDialogTitle" style={styles.titleText}>
          {title}
        </BalooThambiRegTextView>
        <BalooThambiRegTextView testID="ConfirmationDialogText" style={[styles.descriptionText, textStyle]}>
          {text}
        </BalooThambiRegTextView>
        <View style={styles.buttonContainer}>
          <RoundedButton
            testID="RoundedButtonConfirmationDialogPrimaryButton"
            type="squareOrange"
            text={primaryButton}
            containerStyle={primaryButtonStyle}
            textStyle={[styles.buttonText, { fontSize: fontSize }]}
            width={getWp(120)}
            height={getWp(45)}
            onPress={primaryBtnPressed}
          />
          <View style={{ width: getWp(20) }} />
          {secondaryButton != null && (
            <RoundedButton
              testID="RoundedButtonConfirmationDialogSecondaryButton"
              type="squareOrange"
              text={secondaryButton}
              textStyle={[styles.buttonText, { fontSize: fontSize }]}
              containerStyle={secondaryButtonStyle}
              width={getWp(120)}
              height={getWp(45)}
              onPress={secondaryBtnPressed}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

ConfirmationDialog.propTypes = {
  testID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string,
  primaryButton: PropTypes.string,
  secondaryButton: PropTypes.string,
  containerStyle: PropTypes.any,
  textStyle: PropTypes.any,
  primaryButtonStyle: PropTypes.any,
  secondaryButtonStyle: PropTypes.any,
  primaryBtnPressed: PropTypes.func,
  secondaryBtnPressed: PropTypes.func,
  title: PropTypes.string,
};

ConfirmationDialog.defaultProps = {
  testID: 'ConfirmationDialog',
  secondaryButton: null,
  primaryBtnPressed: () => {  console.log(`default primaryBtnPressed`)},
  secondaryBtnPressed: () => { console.log(`default secondaryBtnPressed`)},
  title: 'Confirmation',
};

export default ConfirmationDialog;
