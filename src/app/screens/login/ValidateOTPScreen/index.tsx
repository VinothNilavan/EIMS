import React, { Fragment, useEffect, useState, useRef } from 'react';
import { View, Keyboard } from 'react-native';
import { COLORS } from '@constants';
import { SourceSansProBoldTextView, SourceSansProRegTextView, OTPInput, CustomButton, RenewUserList, CommonHeader } from '@components';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API } from '@api';
import { ApiEndPoint, ScreenNames } from '@constants';
import { useAuth } from '@hooks';
import { HeaderType } from '../../../utils/helper';
import { useToast } from 'native-base';
import styles from './styles'
import RNOtpVerify from 'react-native-otp-verify';
import moment from 'moment';

const ValidateOTPScreen = props => {
  const { parseSubmitPasswordRes } = useAuth('text');
  const Toast = useToast();
  const store = useStores();
  const { loginStore } = useStores();

  let navigation = useNavigation();
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(2);
  const [otpError, setOtpError] = useState('');
  const [showResendOtp, setShowResendOtp] = useState(false);
  const otpRef = useRef();
  const [otpArray, setOtpArray] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const [verifyBtnEnabled, setVerifyBtnEnabled] = useState(false);

  const onSubmit = async () => {
    setVerifyBtnEnabled(false);
    const inputOtp = otpRef.current.getInputOtp().toString();

    if (inputOtp.length === 4) {
      setOtpError('');

      const otpLoginData = {
        mobileNo: loginStore.parentMobile,
        countryCode: loginStore.countryCode,
        OTP: inputOtp
      }

      const req = { body: otpLoginData, store };

      try {
        const response = await API(ApiEndPoint.VALIDATE_OTP, req, false);
        if (response.data.resultCode === 'CL0023') {
          navigation.navigate(ScreenNames.SelectionScreen);
        } else if (response.data.resultCode === 'C004') {
          parseSubmitPasswordRes(response);
        } else if (response.data.resultCode === 'CL0031') {
          loginStore.setRenewStudents(response.data.userData);
          setIsModalVisible(true);
        } else {
          setOtpError(response.data.resultMessage);
          otpRef.current.resetOtp();
        }
      } catch (err) {
        console.log(`API Error>>>>${JSON.stringify(err)}`);
      }
    } else {
      setOtpError('Please check and enter the valid OTP');
    }
  };

  useEffect(() => {
    startTimer();
    getOtp();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      RNOtpVerify?.removeListener();
    };
  }, []);

  const getOtp = async () => {
    try {
      await RNOtpVerify.getOtp();
      RNOtpVerify?.addListener(message => {
          try {
          const otp = /(\d{4})/g.exec(message)[1];
          if (otp) {
            let otpArray = otp.split('');
            setOtpArray(otpArray);
            setVerifyBtnEnabled(otpArray.length === 4);
          }
          RNOtpVerify.removeListener();
          Keyboard.dismiss();
        } catch (error) {
          console.log("RNOtpVerify fix error : ", error);
        }
      })
    } catch (err) {
      console.log("error in getOTP : ", err);
      if (!Toast.isActive(34)) {
        Toast.show({ id: 34, description: "Not able to fetch OTP" });
      }
    }
  };

  const startTimer = () => {
    let interval = 1000;
    let counter = 120000;

    const endTime = moment().add(2, 'minutes');
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

  const resendOtp = async () => {
    setOtpError('');

    const formData = {
      mobileNo: loginStore.parentMobile,
      countryCode: loginStore.countryCode,
    };

    const req = {
      body: formData,
      store,
    };

    try {
      const response = await API(ApiEndPoint.GENERATE_OTP, req, false);
      if (response.data.resultCode === 'C001') {
        setMins(2);
        setSecs(0);
        clearInterval(intervalId);
        setShowResendOtp(false);
        startTimer();
        getOtp();
      }
    } catch (err) {
      console.log(`API Error>>>>${JSON.stringify(err)}`);
    }
  };

  const hideRenewModel = () => {
    setOtpArray([]);
    otpRef.current.resetOtp();
    setIsModalVisible(false);
    setMins(2);
    setSecs(0);
    clearInterval(intervalId);
    setShowResendOtp(true);
  };

  const enableMethod = () => {
    const inputOtp = otpRef.current.getInputOtp().toString();
    setVerifyBtnEnabled(inputOtp.length === 4);
  };

  return (
    <Fragment>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        style={{ backgroundColor: 'white' }}>
        <View style={styles.screen}>
          {isModalVisible && <RenewUserList isNewFlow={true} hideRenewModel={hideRenewModel} />}

          <CommonHeader
            headerType={HeaderType.login}
            testID="LoginHeaderTextPassword"
            containerStyle={styles.header}
            hideBackButton={false}
            iconStyle={{
              iconName: 'left',
              iconColor: COLORS.maroon,
              iconTheme: 'AntDesign',
              type: 'maroon',
              width: 30,
              height: 30,
            }}
            isNewFlow={true}
          />
          <View style={styles.innerContainer}>
            <SourceSansProBoldTextView
              testID="OTPText"
              style={styles.subTitle}>
              Enter OTP
            </SourceSansProBoldTextView>
            <SourceSansProRegTextView style={styles.instructionStyle}>
              We have sent an OTP on your
              phone number, please enter it below to login
            </SourceSansProRegTextView>
            <View style={styles.otpInputContainer}>
              <OTPInput
                accessible={true}
                testID="otpInput"
                accessibilityLabel="otpInput"
                otpLength={4}
                ref={otpRef}
                otp={otpArray}
                isNewFlow={true}
                enableMethod={() => { enableMethod() }}
              />

              {showResendOtp ? <TouchableOpacity
                onPress={() => {
                  resendOtp();
                }}>
                <View>
                  <SourceSansProRegTextView
                    testID="ResendOtp"
                    style={styles.resendOtp}>
                    Resend OTP
                  </SourceSansProRegTextView>
                </View>
              </TouchableOpacity> : <SourceSansProRegTextView style={styles.otpExpiry}>
                OTP expires in {' '}
                <SourceSansProBoldTextView
                  testID="OTPTimer"
                  style={styles.otpTimer}>
                  {mins >= 10 ? mins : `0${mins}`}:{secs >= 10 ? secs : `0${secs}`}
                </SourceSansProBoldTextView>
                {' '} sec
              </SourceSansProRegTextView>}
            </View>
            {otpError != '' && <SourceSansProRegTextView style={styles.errorMessage} testID="otpError">
              {otpError}
            </SourceSansProRegTextView>}

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View
                style={styles.footerContainer}>
                <SourceSansProBoldTextView
                  testID="phoneNumberText"
                  style={styles.otpTimer}>
                  {loginStore.parentMobile}
                </SourceSansProBoldTextView>
                <SourceSansProRegTextView testID="LoginNewToMindSparkText" style={styles.footerText}>
                  Wrong information?
                </SourceSansProRegTextView>

                <SourceSansProRegTextView testID="LoginCreateGuestAccountText" style={styles.link}>
                  Click here to change
                </SourceSansProRegTextView>
              </View>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
              <CustomButton
                type={verifyBtnEnabled ? 'primaryOrange' : 'disabledGray'}
                disabled={!verifyBtnEnabled}
                testId={"sendOtpButton"}
                onSubmit={onSubmit}
                btnText={"Verify"} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Fragment>
  );
};



export default observer(ValidateOTPScreen);