// External Imports
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

// Internal Imports
import {
  RobotoBoldTextView,
  RobotoRegTextView,
  RoundedButton,
} from '@components';
import styles from './style';
import { getWp } from '@utils';
import { useLanguage } from '@hooks';

const RefreshComponent = props => {
  const {
    visible,
    description,
    heading,
    onPress,
    forceUpdate,
    onHide,
  } = props;
  const { updateLabel } = useLanguage();
  return (
    <Modal
      animationIn={'zoomIn'}
      animationOut="zoomOut"
      isVisible={visible}
      onModalHide={onHide}
      style={styles.container}>
      <View style={styles.errorView}>
        <View style={[styles.headerSec]}>
          <RobotoBoldTextView style={styles.textStyle}>
            {heading}
          </RobotoBoldTextView>
        </View>
        <View style={styles.subContainer}>
          <RobotoRegTextView style={styles.secondaryTextStyle}>
            {description}
          </RobotoRegTextView>
          {!forceUpdate ? (
            <View style={styles.rowCenterSpace}>
              <RoundedButton
                text={updateLabel}
                width={getWp(120)}
                type="elevatedOrange"
                onPress={onPress}
              />
            </View>
          ) : (
            <RoundedButton
              shade="orange"
              text={updateLabel}
              width={getWp(120)}
              type="primaryOrange"
              onPress={onPress}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

RefreshComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  heading: PropTypes.string,
  description: PropTypes.string,
  onPress: PropTypes.func,
  onCancel: PropTypes.func,
  onHide: PropTypes.func,
};

RefreshComponent.defaultProps = {
  visible: false,
  heading: '!',
  description: '!',
  onPress: () => { console.log(`RefreshComponent default onPress`) },
  onCancel: () => { console.log(`RefreshComponent default onCancel`) },
  onHide: () => { console.log(`RefreshComponent default onHide`) },
};

export default RefreshComponent;
