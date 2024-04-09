import React from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { HeaderBackground } from '@images';
import { BalooThambiRegTextView } from '@components';
import { getWp, getHp } from '@utils';

const EffortPopup = props => {
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
        <View style={styles.btncontainerStyle}>
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => {
              onPress();
            }}>
            <Text
              style={[{ color: 'white', fontWeight: 'bold' }, styles.btntext]}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

EffortPopup.propTypes = {
  testID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string,
  containerStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

EffortPopup.defaultProps = {
  testID: 'MessagePopup',
  onPress: () => { console.log(`default onPress`) },
  SvgImage: HeaderBackground,
};

export default EffortPopup;
