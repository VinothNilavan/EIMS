// External Imports
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {getWp, getHp} from '@utils';

// Internal Imports
import styles from './style';
import {BalooThambiRegTextView, RoundedButton} from '@components';
import {HeaderBackground} from '@images';
import {useLanguage} from '@hooks';

const ActivityStartModal = props => {
  const {testID, isVisible, title, description, onStartBtnPressed, onHide} =
    props;
  const {startText} = useLanguage();

  return (
    <Modal
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      isVisible={isVisible}
      animationIn="fadeIn"
      onHide={onHide}
      animationOut="fadeOut">
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <BalooThambiRegTextView
            testID="ActivityStartModalTitle"
            style={styles.titleText}>
            {title}
          </BalooThambiRegTextView>
          <HeaderBackground
            accessible={true}
            testID="ActivityStartModalHeaderBackground"
            accessibilityLabel="ActivityStartModalHeaderBackground"
            style={styles.svgBackgroundImage}
          />
        </View>
        <BalooThambiRegTextView
          testID="ActivityStartModalDescription"
          style={styles.subTitleText}>
          {description}
        </BalooThambiRegTextView>
        <View style={styles.buttonContainer}>
          <RoundedButton
            testID="RoundedButtonActvityStartModalStartText"
            text={startText}
            textStyle={styles.btnText}
            type="elevatedOrange"
            width={getWp(150)}
            height={getHp(60)}
            onPress={onStartBtnPressed}
          />
        </View>
      </View>
    </Modal>
  );
};

ActivityStartModal.propTypes = {
  testID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  onStartBtnPressed: PropTypes.func,
  onHide: PropTypes.func,
};

ActivityStartModal.defaultProps = {
  testID: 'ActivityStartModal',
  isVisible: false,
  title: 'Activity \nUnlocked',
  description: 'Geek out! Its game time',
  onStartBtnPressed: () => {console.log(`ActivityStartModal default onStartBtnPressed`)},
  onHide: () => {console.log(`ActivityStartModal default onHide`)},
};

export default ActivityStartModal;
