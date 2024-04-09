import React, { Fragment, useRef, useState, useEffect } from 'react';
import { View, YellowBox, TouchableOpacity } from 'react-native';
import { ApiEndPoint, ScreenNames } from '@constants';

import {
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
  RoundedButton,
  OTPInput,
  CommonHeader
} from '@components';
import { useStores } from '@mobx/hooks';
import { API } from '@api';
import { observer } from 'mobx-react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { setAsValue } from '@utils';
import { useLanguage } from '@hooks';
import moment from 'moment';
import { useToast } from 'native-base';
import { HeaderType } from '../../../utils/helper';
import { OtpStyles } from './styles';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

const Screen = props => {
  const otpRef = useRef();
  const store = useStores();
  const Toast = useToast();
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [verifyBtnEnabled, setVerifyBtnEnabled] = useState(false);
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(1);
  const [intervalId, setIntervalId] = useState(0);
  const { okayBtnText, pleaseEnterValidOtp, enterOtpText, sentOtpToParent, resendBtnText, verifyBtnText } = useLanguage();

  useEffect(() => {
    startTimer();
    sentOTP(false);
    return () => { if (intervalId) { clearInterval(intervalId); } };
  }, []);


  const startTimer = () => {
    let interval = 1000;
    let counter = 60000;

    const endTime = moment().add(1, 'minutes');
    let diff = 0;

    if (intervalId) {
      clearInterval(intervalId);
    }

    setIntervalId(setInterval(() => {
      diff = endTime.diff(moment(), 'seconds');

      counter = counter - (((counter / 1000) - diff) * 1000)
      if (counter <= 0) {
        setMins(0);
        setSecs(0);
        clearInterval(intervalId);
        setShowResendOtp(true);
      } else {
        let minutes = Math.floor(counter / 60000);
        let seconds = ((counter % 60000) / 1000).toFixed(0);
        setMins(minutes);
        setSecs(seconds);
      }
    }, interval));
  }

  const sentOTP = async hasResend => {
    otpRef.current.resetOtp();
    const req = {
      body: {
        resendOTP: hasResend,
        userName: store.loginStore.username,
      },
      store,
    };
    const response = await API(ApiEndPoint.FORGOT_PASSWORD_SENDOTP, req);

    if ( response?.data?.resultCode === 'CL029' || response?.data?.resultCode === 'CL028' || response?.data?.resultCode === 'CL030' ) {
      if (!Toast.isActive(13)) {
        Toast.show({
          description: response?.data?.resultMessage,
          duration: 2000,
          buttonText: okayBtnText,
          id: 13,
        });
      }
    } else {
      store?.uiStore.apiErrorInit({code: response.status, message: response.data?.resultMessage});
    }
  };

  const verifyOTP = async () => {
    setVerifyBtnEnabled(false);

    const inputOtp = otpRef.current.getInputOtp();
    if (inputOtp !== null && typeof inputOtp !== 'undefined' && inputOtp !== '') {
      try {
        const reqBody = {
          store: store,
          body: {
            OTP: inputOtp,
            type: 'F',
            userName: store.loginStore.username,
          },
        };

        const response = await API( ApiEndPoint.FORGOT_PASSWORD_VALIDATE_OTP, reqBody );
        if (response?.data?.resultCode === 'C004') {
          otpResponseAction(response, store, props);
        } else if (response?.data?.resultCode === 'CL032') {
          otpRef.current.resetOtp();
          if (!Toast.isActive(22))
            Toast.show({ description: response.data?.resultMessage, duration: 2000, buttonText: okayBtnText, id: 22 });
        } else {
          otpRef.current.resetOtp();
          store?.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
        }
      } catch (e) {
        console.log('Verify OTP API error', e);
      }
    } else {

      if (!Toast.isActive(12)) {
        Toast.show({ description: pleaseEnterValidOtp, duration: 2000, buttonText: okayBtnText, id: 12 });
      }
    }
  };

  const enableMethod = () => {
    const inputOtp = otpRef.current.getInputOtp().toString();
    setVerifyBtnEnabled(inputOtp.length === 4);
  };

  return (
    <Fragment>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={OtpStyles.otpBg}>
        <View style={OtpStyles.screen}>
          <CommonHeader
            headerType={HeaderType.login}
            testID="LoginHeaderForgotPassword"
            lottieFileName="header"
            theme="generic"
            containerStyle={OtpStyles.header}
            helpNeedEnable={true}
          />
          <View style={OtpStyles.innerContainer}>
            <SourceSansProBoldTextView
              testID="OTPUserNameText"
              style={{ ...OtpStyles.text }}>
              Hey, {store.loginStore.username}
            </SourceSansProBoldTextView>
            <SourceSansProBoldTextView
              testID="OTPText"
              style={{ ...OtpStyles.text, ...OtpStyles.subTitle }}>
              {enterOtpText}
            </SourceSansProBoldTextView>
            <SourceSansProRegTextView
              testID="OTPSentToParent"
              style={OtpStyles.instructionStyle}>
              {sentOtpToParent}
            </SourceSansProRegTextView>
          </View>
          <View style={OtpStyles.otpInputContainer}>
            <OTPInput
              accessible={true}
              testID="OTPSentToParent"
              accessibilityLabel="OTPSentToParent"
              ref={otpRef}
              otpLength={4}
              enableMethod={() => { enableMethod() }}
            />

            {showResendOtp ? <TouchableOpacity
              onPress={() => {
                sentOTP(true)
                setMins(1);
                setSecs(0);
                clearInterval(intervalId);
                setShowResendOtp(false);
                startTimer();
              }}>
              <View>
                <SourceSansProRegTextView
                  testID="OTPresendOTP"
                  style={OtpStyles.resendOtpStyle}>
                  {`${resendBtnText}`.toUpperCase()}
                </SourceSansProRegTextView>
              </View>
            </TouchableOpacity> : <SourceSansProRegTextView style={OtpStyles.otpExpiry}>
              OTP expires in {' '}
              <SourceSansProBoldTextView
                testID="OTPTimer"
              >
                {mins >= 10 ? mins : `0${mins}`}:{secs >= 10 ? secs : `0${secs}`}
              </SourceSansProBoldTextView>
              {' '} sec
            </SourceSansProRegTextView>}

          </View>
          <View style={OtpStyles.btnView}>
            <RoundedButton
              testID="RoundedButtonOTPSubmitBtn"
              type={verifyBtnEnabled ? 'primaryOrange' : 'disabledGray'}
              text={`${verifyBtnText}`.toUpperCase()}
              width={OtpStyles.submitBtn.width}
              height={OtpStyles.submitBtn.height}
              borderRadius={50}
              containerStyle={OtpStyles.submitBtn}
              disabled={!verifyBtnEnabled}
              onPress={verifyOTP}
              btnTextStyle={{ textTransform: 'uppercase' }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Fragment>
  );
};

export default observer(Screen);

const otpResponseAction = (response, store, props) => {
  store.appStore.setJwt(response.headers.jwt);
  setAsValue('jwt', response.headers.jwt);
  if (store.loginStore.passwordType == 'picture') {
    props.navigation.navigate(ScreenNames.PicturePasswordScreen, { setNewPassword: true, setPasswordAfterReset: true });
  } else {
    props.navigation.navigate(ScreenNames.TextPasswordScreen, { setNewPassword: true });
  }
}