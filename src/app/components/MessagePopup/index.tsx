import React from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './style';
import { HeaderBackground } from '@images';
import { RoundedButton, BalooThambiRegTextView } from '@components';
import { getWp, getHp } from '@utils';

const MessagePopup = props => {
  const {
    testID,
    isVisible,
    text,
    containerStyle,
    onPress,
    svgText,
    buttonText,
  } = props;

  return (
    <Modal accessible={true} testID={testID} accessibilityLabel={testID} isVisible={isVisible}>
      <View style={styles.modalStyle}>
        <View style={[styles.container, containerStyle]}>
          <View>
            <HeaderBackground
              accessible={true}
              testID="MessagePopupHeaderBgImg"
              accessibilityLabel="MessagePopupHeaderBgImg"
              width={getWp(230)}
              height={getHp(120)}
              style={styles.headerSvg}
            />
            <BalooThambiRegTextView testID="MessagePopupSvgText" style={styles.modalHeader}>
              {svgText}
            </BalooThambiRegTextView>
          </View>
          <BalooThambiRegTextView testID="MessagePopupText" style={styles.textStyle}>
            {text}
          </BalooThambiRegTextView>
        </View>
        <RoundedButton
          testID="RoundedButtonMessagePopupBtn"
          text={buttonText}
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

MessagePopup.propTypes = {
  testID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string,
  containerStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

MessagePopup.defaultProps = {
  testID: 'MessagePopup',
  onPress: () => { console.log(`onPress`) },
  SvgImage: HeaderBackground,
};

export default MessagePopup;