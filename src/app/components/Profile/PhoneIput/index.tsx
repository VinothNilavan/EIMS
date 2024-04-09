import React from 'react';
import { View } from 'react-native';
import { BalooThambiRegTextView } from '@components';
import styles from './style';
import PropTypes from 'prop-types';
import PhoneInput from 'react-native-phone-number-input';

const PhoneIput = props => {
  const {
    testID,
    title,
    reference,
    onChangePhoneNumber,
    field,
    errorField,
    error,
    style,
    value,
  } = props;

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID} style={[styles.container, style]}>
      <BalooThambiRegTextView testID="PhoneInputTitle" style={styles.title}>
        {title}
      </BalooThambiRegTextView>

      <PhoneInput
        accessible={true}
        testID="PhoneInputField"
        accessibilityLabel="PhoneInputField"
        initialCountry={'in'}
        style={styles.inputStyle}
        textStyle={styles.field}
        value={value}
        onChangeText={onChangePhoneNumber}
        ref={reference}
      />

      {field === errorField && (
        <BalooThambiRegTextView testID="PhoneInputError" style={styles.errorField}>
          {error}
        </BalooThambiRegTextView>
      )}
    </View>
  );
};

PhoneIput.propTypes = {
  testID: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  onChangePhoneNumber: PropTypes.func,
  field: PropTypes.string,
  errorField: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
};

PhoneIput.defaultProps = {
  testID: 'PhoneInput',
  title: '',
  field: '',
  error: '',
  onChangePhoneNumber: val => {
    console.log('Num', val);
  },
};
export default PhoneIput;