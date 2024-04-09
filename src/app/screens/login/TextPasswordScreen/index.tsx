import React, { Fragment } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Text, Image } from 'react-native';
import { PwdValidation } from '@utils';
import { COLORS, ScreenNames } from '@constants';
import {
  InputWithRightIcon,
  LoginFooterBtn,
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
  TrustedDeviceCallout,
  CommonHeader
} from '@components';
import { Password, PasswordSee, CheckedBox, UncheckedBox, Nanhi_Kali_Logo, } from '@images';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useAuth, useLanguage } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { HeaderType } from '../../../utils/helper';
import { styles } from './styles';

const Screen = props => {
  const {
    onSubmitResetPassword,
    onSubmitPassword,
    dispatch,
    passwordSecure,
    isTouched,
    errorMessage,
    passwordText,
    isPasswordError,
    confirmPasswordSecure,
    confirmPasswordText,
    isConfirmPasswordError,
    SEE_PASSWORD,
    SEE_CONFIRM_PASSWORD,
    PASSWORD_TEXT_CHANGE,
    CONFIRM_PASSWORD_TEXT_CHANGE,
    TRUSTED_DEVICE,
    INVALID,
    CONFIRM_PWD_INVALID,
    paswordRules,
    confirmPasswordRules,
    trustedDevice,
    trusetedDeviceConfirmed,
    TRUSTED_DEVICE_CONFIRMED,
  } = useAuth('text');

  const { saveMyLoginIdAndPassword } = useLanguage();
  const { loginStore } = useStores();
  const store = useStores();
  const navigation = useNavigation();

  const onPressIcon = type => {
    type === 'pwd' ? dispatch({ type: SEE_PASSWORD }) : dispatch({ type: SEE_CONFIRM_PASSWORD });
  };

  const onPasswordChange = password => {
    const { isValid, errMsg } = PwdValidation('password', password, paswordRules);
    dispatch({ type: INVALID, isError: !isValid, message: errMsg });
    dispatch({ type: PASSWORD_TEXT_CHANGE, value: password });
  };
  const onConfirmPasswordChange = confirmPassword => {
    const { isValid, errMsg } = PwdValidation('password', confirmPassword, confirmPasswordRules);
    dispatch({ type: CONFIRM_PWD_INVALID, isError: !isValid, message: errMsg });
    dispatch({ type: CONFIRM_PASSWORD_TEXT_CHANGE, value: confirmPassword });
  };

  const onLogin = () => {
    loginStore.setIsOtpLogin(false);
    if ( props.route.params.setPasswordAfterReset || props.route.params.setNewPassword ) {
      onSubmitResetPassword();
    } else {
      onSubmitPassword();
    }
  };

  const onSaveMySession = async () => {
    dispatch({ type: TRUSTED_DEVICE_CONFIRMED, value: !trusetedDeviceConfirmed });
    loginStore.setTrusted(true);
  };

  const showTrustedDevicePopUp = () => {
    if (trusetedDeviceConfirmed) {
      loginStore.setTrusted(false);
      dispatch({ type: TRUSTED_DEVICE_CONFIRMED, value: !trusetedDeviceConfirmed });
    }
    dispatch({ type: TRUSTED_DEVICE, value: !trustedDevice });
  };

  const disableTrustedDevice = () => {
    dispatch({ type: TRUSTED_DEVICE, value: !trustedDevice });
  };

  let PwdSvg = Password;
  let ConPwdSvg = Password;
  let passwordHeading = 'Create New Password';

  if (!passwordSecure) {
    PwdSvg = PasswordSee;
  }

  if (!confirmPasswordSecure) {
    ConPwdSvg = PasswordSee;
  }

  let passwordFields = (
    <Fragment>
      <InputWithRightIcon
        testID="InputWithRightIconTextPasswordEnterNewPasswordInput"
        SvgImage={PwdSvg}
        containerStyle={styles.password}
        secureTextEntry={passwordSecure}
        onPressIcon={onPressIcon.bind(this, 'pwd')}
        onChangeText={onPasswordChange}
        value={passwordText}
        textContentType="oneTimeCode"
        placeholder={!isTouched ? passwordHeading : ''}
        placeholderTextColor={COLORS.popUpTextColor}
        isError={isPasswordError}
        autoCapitalize="none"
      />
      <InputWithRightIcon
        testID="InputWithRightIconTextPasswordReEnterNewPasswordInput"
        SvgImage={ConPwdSvg}
        containerStyle={styles.confirmPassword}
        secureTextEntry={confirmPasswordSecure}
        textContentType="oneTimeCode"
        onPressIcon={onPressIcon.bind(this, 'conpwd')}
        onChangeText={onConfirmPasswordChange}
        value={confirmPasswordText}
        placeholder={!isTouched ? 'Re-enter New Password' : ''}
        placeholderTextColor={COLORS.popUpTextColor}
        isError={isConfirmPasswordError}
        autoCapitalize="none"
      />
    </Fragment>
  );

  let passwordInstructions = (
    <View style={styles.textContainer}>
      <SourceSansProBoldTextView
        testID="TextPasswordYourPassword"
        style={styles.instructionText}>
        Your Password
      </SourceSansProBoldTextView>
      <SourceSansProRegTextView
        testID="TextPasswordYourPasswordValidation"
        style={{ ...styles.instructionText, ...styles.desc }}>
        {`${'\u2B24'} Can contain _ @ . -${'\n'}${'\u2B24'} Cannot contain special characters like !#$%^&*(){}[]${'\n'}${'\u2B24'} Minimum character length is 4${'\n'}`}
      </SourceSansProRegTextView>
    </View>
  );

  if (!props.route.params.setNewPassword) {
    passwordHeading = 'Enter password';
    passwordFields = (
      <InputWithRightIcon
        testID="InputWithRightIconTextPasswordInput"
        SvgImage={PwdSvg}
        containerStyle={styles.password}
        secureTextEntry={passwordSecure}
        onPressIcon={onPressIcon.bind(this, 'pwd')}
        onChangeText={onPasswordChange}
        value={passwordText}
        placeholder={!isTouched ? passwordHeading : ''}
        placeholderTextColor={COLORS.popUpTextColor}
        isError={errorMessage && true}
        autoCapitalize="none"
      />
    );
    passwordInstructions = null;
  }

  let loginBtn = (
    <LoginFooterBtn
      testID="loginBtn"
      type="disabledGray"
      text="LOGIN"
      disabled={true}
      onPress={() => onLogin()}
      forgotpassword={!props.route.params.setNewPassword}
    />
  );

  if (
    (loginStore.firstLogin &&
      passwordText != '' &&
      confirmPasswordText != '' &&
      !isPasswordError &&
      !isConfirmPasswordError) ||
    (!loginStore.firstLogin && passwordText != '' && !isPasswordError)
  ) {
    loginBtn = (
      <LoginFooterBtn
        testID="loginBtn"
        type="primaryOrange"
        text="LOGIN"
        onPress={() => onLogin()}
        forgotpassword={!props.route.params.setNewPassword}
      />
    );
  }

  let errorMessageView = null;

  if (errorMessage) {
    errorMessageView = (
      <SourceSansProRegTextView
        style={styles.errorMessage}
        testID="TextPasswordErrorText">
        {errorMessage}
      </SourceSansProRegTextView>
    );
  }

  const onBackPress = () => {
    loginStore.setFirstLogin(false);
    if (loginStore.isOtpLogin) {
      navigation.navigate(ScreenNames.SelectionScreen);
      loginStore.setIsOtpLogin(false);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          style={{ backgroundColor: 'white' }}>
          <View style={styles.screen}>
            <CommonHeader
              headerType={HeaderType.login}
              testID="LoginHeaderTextPassword"
              containerStyle={styles.header}
              hideBackButton={false}
              helpNeedEnable={true}
              onBack={onBackPress}
            />
            <View style={styles.innerContainer}>
              <SourceSansProBoldTextView
                testID="TextPasswordUserNameText"
                style={{ ...styles.text, ...styles.title }}>
                Hey, {store.loginStore.username}
              </SourceSansProBoldTextView>
              <SourceSansProBoldTextView
                testID="TextPasswordUserPasswordHeading"
                style={{ ...styles.text, ...styles.subTitle }}>
                {passwordHeading}
              </SourceSansProBoldTextView>
              <View style={styles.inputContainer}>
                {passwordFields}
                {errorMessageView}
                {!props.route.params.setPasswordAfterReset &&
                  !props.route.params.setNewPassword && (
                    <TouchableOpacity onPress={() => showTrustedDevicePopUp()}>
                      <View style={styles.saveMyLoginConatiner}>
                        {trustedDevice ? <CheckedBox /> : <UncheckedBox />}
                        <SourceSansProRegTextView
                          style={styles.saveMyLoginText}>
                          {saveMyLoginIdAndPassword}
                        </SourceSansProRegTextView>
                      </View>
                    </TouchableOpacity>
                  )}
                {store.appStore?.userLanguage === 'ka' || store.appStore?.userLanguage === 'pu' || store.appStore?.userLanguage === 'ur' || store.appStore?.userLanguage === 'ta' || store.appStore?.userLanguage === 'ma' ?
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '15%' }}>
                    <Text style={{ marginBottom: '3%', color: '#757575' }}>Inspired by <Text style={{ color: '#24a6e5', textDecorationLine: 'underline' }}>Project Nanhi Kali</Text></Text>
                    <Image source={Nanhi_Kali_Logo} style={{ height: 50, width: 100 }} />
                  </View> : null}
              </View>
              {passwordInstructions}
            </View>
            {loginBtn}
          </View>
        </KeyboardAwareScrollView>
        {trustedDevice && !trusetedDeviceConfirmed && (
          <TrustedDeviceCallout
            onSaveMySession={onSaveMySession}
            disableTrustedDevice={disableTrustedDevice}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default observer(Screen);