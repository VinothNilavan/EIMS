/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import {
  BalooThambiRegTextView,
  RoundedButton,
  ProfileInputField,
  SuccessPopup,
  DetailsScreen,
} from '@components';
import styles from './style';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { ApiEndPoint, ScreenNames } from '@constants';
import { API } from '@api';
import { useLanguage } from '@hooks';
import DeviceInfo from 'react-native-device-info';
import { screenLogging } from '@utils'

const ChangeTextPassWordScreen = props => {
  const store = useStores();
  const [errorField, setErrorField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const {
    notYourPasswordMsg,
    somethingWentWrong,
    onlyAplhaPassRules,
    minLengthFour,
    thisFieldIsRequired,
    changeYourPassMsg,
    currentPassText,
    newPassText,
    reEnterNewPass,
    passwordNotMatchText,
    changePassNolineBreak,
    yourAndConfirmPassNotMatch,
    passChangedSuccessfully,
  } = useLanguage();

  useEffect(() => {
    screenLogging('Change text password screen');
  });
  const fields = {
    currentPassword: 'currentPassword',
    newPassword: 'newPassword',
    confirmPassword: 'confirmPassword',
  };

  const updatePassword = async body => {
    try {
      let req = {
        body: body,
        store: store,
      };
      let res = await API(ApiEndPoint.UPDATE_PASSWORD, req);
      console.log('PasswordUpdated', JSON.stringify(res));
      if (res.data.resultCode === 'C001') {
        setShowSuccessPopup(true);
      } else if (res.data.resultCode === 'CL001') {
        setErrorField(fields.currentPassword);
        setErrorMessage(notYourPasswordMsg);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        store.uiStore.apiErrorInit({
          code: res.status,
          message: res.data?.resultMessage,
        });
      }
    } catch (error) {
      store.uiStore.apiErrorInit({
        code: error.response.status,
        message: somethingWentWrong,
      });
    }
  };

  const validate = password => {
    setErrorMessage('');
    let specialCharsRegExp = /^[^*|\":<>[\]{}`\\()';&$]+$/;
    if (!specialCharsRegExp.test(password)) {
      setErrorMessage(onlyAplhaPassRules);
      return false;
    }

    if (password.length < 4) {
      setErrorMessage(minLengthFour);
      return false;
    }
    return true;
  };

  const validateOnfocus = (e, field) => {
    setErrorMessage('');
    console.log(field, 'errorField:', errorField, '\nevent:', newPassword);

    if (newPassword?.length < 1 || confirmPassword?.length < 1) {
      setErrorMessage(thisFieldIsRequired);
      return false;
    }

    return true;
  };

  const headerBtnClickHandler = () => {
    props.navigation.goBack();
  };

  const onMessageCloseHandler = () => {
    setShowSuccessPopup(false);
    props.navigation.navigate(ScreenNames.ProfileScreen);
  };

  const hasValidateField = () => {
    return (
      currentPassword !== null &&
      currentPassword !== '' &&
      newPassword !== null &&
      newPassword !== '' &&
      confirmPassword !== null &&
      confirmPassword !== '' &&
      newPassword == confirmPassword
    );
  };

  return (
    <DetailsScreen
      testID="DetailsScreenChangeTextPassBackBtn"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      footerContainerStyle={styles.footerContainerStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.contentStyle}
        keyboardVerticalOffset={84}
      >
        <View style={{
          padding: DeviceInfo.isTablet() ? 64 : 24,
          flex: 1,
          justifyContent: "flex-end",
        }} >
          <BalooThambiRegTextView
            testID="ChangeTextPassBackBtChangeTextPassMsg"
            style={styles.title}>
            {changeYourPassMsg}
          </BalooThambiRegTextView>
          <ProfileInputField
            testID="ChangeTextPassProfileInputField1"
            style={styles.marginTop24}
            title={currentPassText}
            field={fields.currentPassword}
            errorField={errorField}
            error={errorMessage}
            onChangeText={value => {
              setCurrentPassword(value);
              console.log(value);
              if (!validate(value)) {
                setErrorField(fields.currentPassword);
              }
            }}
            isPassWordField={true}
          />
          <ProfileInputField
            accessible={true}
            testID="changeTextPassProfileInputField2"
            accessibilityLabel="changeTextPassProfileInputField2"
            style={styles.marginTop24}
            title={newPassText}
            field={fields.newPassword}
            validateOnfocus={e => {
              if (newPassword?.length < 1) {
                setErrorField(fields.newPassword);
                setErrorMessage(thisFieldIsRequired);
                return false;
              }

              return true;
            }}
            errorField={errorField}
            error={errorMessage}
            onChangeText={value => {
              setNewPassword(value);
              console.log(value);
              if (!validate(value)) {
                setErrorField(fields.newPassword);
              }
            }}
            isPassWordField={true}
            disabled={!currentPassword}
          />
          <ProfileInputField
            accessible={true}
            testID="changeTextPassProfileInputField3"
            accessibilityLabel="changeTextPassProfileInputField3"
            style={styles.marginTop24}
            title={reEnterNewPass}
            field={fields.confirmPassword}
            validateOnfocus={e => {
              if (confirmPassword?.length < 1) {
                setErrorField(fields.confirmPassword);
                setErrorMessage(thisFieldIsRequired);
                return false;
              }

              return true;
            }}
            errorField={errorField}
            error={errorMessage}
            onChangeText={value => {
              setConfirmPassword(value);
              if (!validate(value)) {
                setErrorField(fields.confirmPassword);
              } else if (
                newPassword !== null &&
                newPassword !== '' &&
                newPassword !== value
              ) {
                setErrorMessage(passwordNotMatchText);
                setErrorField(fields.confirmPassword);
                return false;
              }
              setConfirmPassword(value);
              console.log(value);
            }}
            isPassWordField={true}
            disabled={
              newPassword === null || newPassword === '' || !currentPassword
            }
          />
          <RoundedButton
            testID="RoundedButtonchangeTextPassn"
            text={changePassNolineBreak}
            type={
              hasValidateField() ? 'elevatedOrange' : 'squareDisabledElevated'
            }
            width={styles.btnStyle.width}
            height={styles.btnStyle.height}
            disabled={!hasValidateField()}
            onPress={() => {
              setErrorMessage('');
              if (!validate(currentPassword)) {
                setErrorField(fields.currentPassword);
                return;
              }
              if (!validate(newPassword)) {
                setErrorField(fields.newPassword);
                return;
              }
              if (!validate(confirmPassword)) {
                setErrorField(fields.confirmPassword);
                return;
              }
              if (newPassword !== confirmPassword) {
                setErrorMessage(yourAndConfirmPassNotMatch);
                setErrorField(fields.confirmPassword);
                return;
              }

              let reqBody = {
                passwordType: 'text',
                currentPassword: currentPassword,
                newPassword: newPassword,
              };
              updatePassword(reqBody);
            }}
            textStyle={styles.whiteButtonText}
            containerStyle={styles.btnContainerStyle}
          />
          <View style={{ flex: 1 }} />
        </View>
      </KeyboardAvoidingView>
      <SuccessPopup
        testID="SuccessPopUpChangeTextPass"
        isVisible={showSuccessPopup}
        text={passChangedSuccessfully}
        onPress={onMessageCloseHandler}
      />
    </DetailsScreen>
  );
};

export default observer(ChangeTextPassWordScreen);
