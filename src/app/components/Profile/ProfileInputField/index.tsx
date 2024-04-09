import React, { useState } from 'react';
import { View } from 'react-native';
import { BalooThambiRegTextView } from '@components';
import styles from './style';
import PropTypes from 'prop-types';
import { getWp } from '@utils';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { Password, PasswordSee } from '@images';

const ProfileInputField = props => {
  const [showPassword, setshowPassword] = useState(false);
  const {
    testID,
    title,
    defaultValue,
    disabled,
    onChangeText,
    field,
    errorField,
    error,
    style,
    isPassWordField,
    validateOnfocus,
  } = props;

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={[styles.container, style]}>
      <View style={styles.column}>
        <BalooThambiRegTextView
          testID="ProfileInputFieldTitle"
          style={styles.title}>
          {title}
        </BalooThambiRegTextView>
        {disabled ? (
          <BalooThambiRegTextView
            testID="ProfileInputFieldDefaultValue"
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[styles.field, styles.disabledField]}>
            {defaultValue}
          </BalooThambiRegTextView>
        ) : (
          <TextInput
            accessible={true}
            testID="ProfileInputFieldTextInput"
            accessibilityLabel="ProfileInputFieldTextInput"
            style={styles.field}
            editable={true}
            onChangeText={onChangeText}
            onFocus={validateOnfocus}
            defaultValue={defaultValue}
            secureTextEntry={isPassWordField ? !showPassword : false}
          />
        )}

        {field === errorField && (
          <BalooThambiRegTextView
            testID="ProfileInputFieldError"
            style={styles.errorField}>
            {error}
          </BalooThambiRegTextView>
        )}
      </View>
      <TouchableOpacity
        accessible={true}
        testID="ProfileInputFieldPasswordTouchableComp"
        accessibilityLabel="ProfileInputFieldPasswordTouchableComp"
        onPress={() => {
          setshowPassword(!showPassword);
        }}>
        {isPassWordField && showPassword && (
          <PasswordSee width={getWp(52)} height={getWp(52)} />
        )}
        {isPassWordField && !showPassword && (
          <Password width={getWp(52)} height={getWp(52)} />
        )}
      </TouchableOpacity>
    </View>
  );
};

ProfileInputField.propTypes = {
  testID: PropTypes.string,
  title: PropTypes.string,
  defaultValue: PropTypes.string,
  field: PropTypes.string,
  errorField: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChangeText: PropTypes.func,
  style: PropTypes.object,
  isPassWordField: PropTypes.bool,
  validateOnfocus: PropTypes.func,
};

ProfileInputField.defaultProps = {
  testID: 'ProfileInputField',
  title: '',
  defaultValue: '',
  field: '',
  error: '',
  disabled: false,
  isPassWordField: false,
  onChangeText: () => { console.log('profile on change text'); },
  validateOnfocus: () => { console.log('profile on validateOnfocus text'); }
};
export default ProfileInputField;
