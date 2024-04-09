// External Imports
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

// Internal Imports
import styles from './style';
import {BalooThambiRegTextView} from '@components';
import {Correct, CloseBlue} from '@images';
import {getWp} from '@utils';
import {useLanguage} from '@hooks';

const TrustedDeviceItem = props => {
  const {testID, deviceName, updateOn, onPress} = props;
  const {removeLabel} = useLanguage();
  return (
    <View
      accessible={true}
      testID={`TrustedDeviceItem${testID}`}
      accessibilityLabel={`TrustedDeviceItem${testID}`}
      style={styles.container}>
      <View style={styles.titleContainer}>
        <BalooThambiRegTextView
          testID="TrustedDeviceItemDeviceNameTxt"
          style={styles.titleText}>
          {deviceName}
        </BalooThambiRegTextView>
        <View style={styles.removeButtonContainer}>
          <View style={styles.checkedContainer}>
            <Correct
              accessible={true}
              testID="TrustedDeviceItemCorrectImg"
              accessibilityLabel="TrustedDeviceItemCorrectImg"
              width={getWp(16)}
              height={getWp(16)}
            />
          </View>
          <BalooThambiRegTextView
            testID="TrustedDeviceItemUpdateOn"
            style={styles.removeButtonText}>
            {moment(updateOn).format('llll')}
          </BalooThambiRegTextView>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.removeButtonContainer}>
        <BalooThambiRegTextView
          testID="TrustedDeviceItemRemoveLabel"
          style={styles.removeButtonText}>
          {removeLabel}
        </BalooThambiRegTextView>
        <View style={styles.removeButtonCircleContainer}>
          <CloseBlue
            accessible={true}
            testID="TrustedDeviceItemCloseBlue"
            accessibilityLabel="TrustedDeviceItemCloseBlue"
            width={getWp(16)}
            height={getWp(16)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

TrustedDeviceItem.propTypes = {
  testID: PropTypes.string,
  deviceName: PropTypes.string,
  updateOn: PropTypes.string,
  onPress: PropTypes.func,
};

TrustedDeviceItem.defaultProps = {
  testID: 'TrustedDeviceItem',
  onPress: () => {console.log(`TrustedDeviceItem default onPress`)},
};

export default TrustedDeviceItem;
