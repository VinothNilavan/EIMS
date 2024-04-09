import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { ValidationMessage } from '@utils';
import { COLORS, } from '@constants';
import { GuestAccount } from '@images';

import {
  BottomSheet,
  CustomCheckBox,
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
  CustomButton,
  LoginHeader,
} from '@components';

import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { runInAction } from 'mobx';
import { API } from '@api';
import { ApiEndPoint, ScreenNames } from '@constants';
import { useLanguage } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from '@react-navigation/native';
import styles from './style'

const ContactNumberScreen = props => {
  const store = useStores();
  const { loginStore } = useStores();

  const { loginSignup, SignInWithusername } = useLanguage();
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [whatsAppCheck, setWhatsAppCheck] = useState(false);
  let navigation = useNavigation();

  const loginScreenApi = async () => {
    const loginScreenData = await API(ApiEndPoint.LOGIN_SCREEN, { store });
    if (!loginScreenData.hasOwnProperty('data')) {
      return;
    }
    let loginResponse = loginScreenData.data;

    if (loginResponse.resultCode === 'C001') {
      if (loginResponse.caurosal.length > 0) {
        const sparkiesChamp = loginResponse.caurosal[0]?.studentList;
        if (sparkiesChamp) {
          loginStore.setSparkiesChamp(sparkiesChamp);
        }
      }
      runInAction(() => {
        loginStore.sparkyFromDate = loginResponse.fromDate;
        loginStore.sparkyToDate = loginResponse.toDate;
        loginStore.loginPermissions = loginResponse.permissions;
      });
    }
  };

  useEffect(() => {
    store.uiStore.setLoader(false);
    store.loginStore.setLoader(false);
    loginScreenApi();
  }, [loginStore, store]);

  const onSubmit = async () => {
    if (validateInputFields(mobileNumber)) {
      let formatedCode = countryCode.slice(0, -mobileNumber.length);

      let otpLoginData = {
        mobileNo: mobileNumber,
        countryCode: formatedCode,
      };

      const req = {
        body: otpLoginData,
        store,
      };

      try {
        const response = await API(ApiEndPoint.GENERATE_OTP, req, false);
        if (response.data.resultCode === 'C001') {
          loginStore.setParentMobile(mobileNumber);
          loginStore.setCountryCode(formatedCode);
          loginStore.setWhatsAppConsent(whatsAppCheck);

          navigation.navigate(ScreenNames.ValidateOTPScreen);
        }
      } catch (err) {
        console.log(`API Error>>>>${JSON.stringify(err)}`);
      }
    }
  }

  const login = () => {
    navigation.navigate(ScreenNames.LoginScreen);
  }

  const validatePhoneNumber = (input = '') => {
    {
      let rejxPattern = /^\d{10}$/
      if ((input.match(rejxPattern))) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  const validateInputFields = (phone: string) => {
    let phoneNumberStatus = true;
    if (phone == '') {
      setPhoneNumberError(ValidationMessage.PhoneNumberRequired);
      phoneNumberStatus = false;
    }
    if (phoneNumberStatus && countryCode.startsWith('+91')) {
      if (phone.length < 10) {
        setPhoneNumberError(ValidationMessage.MinimumLength10);
        phoneNumberStatus = false;
      }

      if (phone.length > 10) {
        setPhoneNumberError(ValidationMessage.PleaseEnterValidPhoneNumber);
        phoneNumberStatus = false;
      }

      if (!validatePhoneNumber(phone)) {
        setPhoneNumberError(ValidationMessage.InvalidFormat);
        phoneNumberStatus = false;
      }
    } else {
      if (phoneNumberStatus && phone.length < 4) {
        setPhoneNumberError(ValidationMessage.MinimumLength04);
        phoneNumberStatus = false;
      }
    }


    if (phoneNumberStatus) {
      setPhoneNumberError('');
    }

    return phoneNumberStatus;
  }

  const onTextChange = (text) => {
    setMobileNumber(text);
  }

  const onChangeCountryCode = (text) => {
    setCountryCode(text);
  }

  let bdrColor = null;
  if (phoneNumberError != '') {
    bdrColor = { borderColor: COLORS.red };
  }

  let loginWithMobileNumber = (
    <View style={styles.footerTextContainer}>
      <TouchableOpacity onPress={login}>
        <View style={styles.linkContainer}>
          <SourceSansProRegTextView testID="LoginCreateGuestAccountText" style={styles.link1}>
            {SignInWithusername}
          </SourceSansProRegTextView>
        </View>
      </TouchableOpacity>
    </View>
  );

  let LoginHeaderBanner = (
    <LoginHeader
      testID="LoginHeaderTextPassword"
      containerStyle={styles.header}
      hideBackButton={false}
      helpNeedEnable={true}
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
  )

  return (
    <BottomSheet>
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag">
        <View style={styles.screen}>
          {LoginHeaderBanner}
          <View style={styles.innerContainer}>
            <SourceSansProBoldTextView testID="LoginText" style={styles.heading}>
              {loginSignup}
            </SourceSansProBoldTextView>
            <View style={{ width: wp(80) }}>
              <View style={styles.seperator} />
              <PhoneInput
                defaultValue={''}
                containerStyle={{ ...styles.inputContainerStyle, ...bdrColor }}
                textContainerStyle={styles.textContainerStyle}
                textInputStyle={styles.textInputStyle}
                codeTextStyle={styles.codeTextStyle}
                countryPickerButtonStyle={styles.countryPickerStyle}
                defaultCode="IN"
                layout="second"
                placeholder={'Enter mobile number'}
                onChangeText={(text) => {
                  onTextChange(text)
                }}
                onChangeFormattedText={(text) => {
                  onChangeCountryCode(text)
                }}
              />
              {phoneNumberError != '' &&
                <SourceSansProRegTextView style={styles.errorMessage} testID="phoneNumberError">
                  {phoneNumberError}
                </SourceSansProRegTextView>}
              <CustomCheckBox
                label={'Get important updates on WhatsApp'}
                isSelected={whatsAppCheck}
                setIsSelected={setWhatsAppCheck}
              />
              <View style={styles.btnContainer}>
                <CustomButton disabled={false} testId={"requestOtpButton"} onSubmit={onSubmit} btnText={"Request OTP"} />
              </View>
              {loginWithMobileNumber}
              <View style={styles.footerContainer}>
                <GuestAccount
                  accessible={true}
                  testID="LoginGuestAccountImg"
                  accessibilityLabel="LoginGuestAccountImg"
                  width={styles.footerSvg.width}
                  height={styles.footerSvg.height}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

export default observer(ContactNumberScreen);