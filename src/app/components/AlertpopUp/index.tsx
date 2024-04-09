import React from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { HeaderBackground } from '@images';
import { BalooThambiRegTextView, SVGImageBackground } from '@components';

const AlertPopup = props => {
  const { testID, isVisible, text, containerStyle, onBackPress, onPress, svgText } = props;

  return (
    <Modal accessible={true} testID={testID} accessibilityLabel={testID} isVisible={isVisible}>
      <View style={styles.modalStyle}>
        <View style={[styles.container, containerStyle]}>
          <View style={styles.svgTitleContainer}>
            <SVGImageBackground
              SvgImage={HeaderBackground}
              style={{ ...styles.svgContainer }}>
              <View style={{ ...styles.svgTextContainer }}>
                <BalooThambiRegTextView testID="InfoPopupSvgText" style={styles.svgText}>
                  {svgText}
                </BalooThambiRegTextView>
              </View>
            </SVGImageBackground>
          </View>
          <BalooThambiRegTextView
            testID="RoundedButton"
            style={styles.textStyle}>
            {text}
          </BalooThambiRegTextView>
          <View style={styles.btncontainerStyle}>
            <TouchableOpacity
              style={styles.buttonLeftStyle}
              onPress={() => {
                onBackPress();
              }}>
              <Text
                style={[
                  { color: '#F56523', fontWeight: 'bold' },
                  styles.btntext,
                ]}>
                {'No'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRightStyle}
              onPress={() => {
                onPress();
              }}>
              <Text
                style={[{ color: 'white', fontWeight: 'bold' }, styles.btntext]}>
                {'Yes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

AlertPopup.propTypes = {
  testID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string,
  containerStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

AlertPopup.defaultProps = {
  testID: 'SuccessPopup',
  onPress: () => { console.log(`Default AlertPopup onPress`) },
};

export default AlertPopup;
