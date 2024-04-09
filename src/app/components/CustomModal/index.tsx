import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { RoundedButton } from '@components';
import styles from './indexCss';
import PropTypes from 'prop-types';

const CustomModal = props => {
  const { testID, show, onPress, btnText, containerStyle, btnType, largeWidth } = props;
  return (
    <Modal
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      isVisible={show}
      {...props}>
      <View style={styles.wrapperContainer}>
        <View style={{ ...styles.container, ...containerStyle }}>
          {props.children}
        </View>
        <RoundedButton
          testID="RoundedButtonCustomModal"
          onPress={onPress}
          type={btnType}
          text={btnText}
          width={largeWidth ? largeWidth : styles.btn.width}
          height={styles.btn.height}
          containerStyle={{ ...styles.btnContainer }}
          textStyle={
            btnType === 'secondaryWhite'
              ? { ...styles.hwbtnText }
              : { ...styles.btnText }
          }
        />
      </View>
    </Modal>
  );
};

CustomModal.propTypes = {
  testID: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
};

CustomModal.defaultProps = {
  testID: 'CustomModal',
  btnType: 'elevatedOrange',
  show: false,
  btnText: 'Okay',
  onPress: () => alert('hi'),
};

export default CustomModal;
