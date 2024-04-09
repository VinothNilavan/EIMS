import React, { useState, useEffect, Fragment, useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { getHp, getWp, replaceString, screenLogging } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';
import {
  PicturePassword,
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
  LoginFooterBtn,
  TrustedDeviceCallout,
  CommonHeader
} from '@components';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useAuth, useLanguage } from '@hooks';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions } from '@constants';
import { CheckedBox, UncheckedBox, Nanhi_Kali_Logo } from '@images';
import { HeaderType } from '../../utils/helper';

const PicturePasswordScreen = props => {
  const [passwordSeleted, setPasswordSelected] = useState(0);
  const [passwordSelectionCompleted, setPasswordSelectionCompleted] = useState(false);
  const [row1, setRow1] = useState('');
  const [row2, setRow2] = useState('');
  const [row3, setRow3] = useState('');
  const [subHeading, setsubHeading] = useState('');
  const store = useStores();
  const { loginStore } = useStores();
  const {
    onSubmitResetPassword,
    onSubmitPassword,
    dispatch,
    errorMessage,
    PASSWORD_TEXT_CHANGE,
    trustedDevice,
    trusetedDeviceConfirmed,
    TRUSTED_DEVICE_CONFIRMED,
    TRUSTED_DEVICE,
  } = useAuth('picture');
  const auth = useContext(AuthContext);

  const { enterPasswordText, choosePasswordText, userNameText, saveMyLoginIdAndPassword, loginBtnName } = useLanguage();

  useEffect(() => {
    setPasswordSelectionCompleted((passwordSeleted === 3));
  }, [passwordSeleted]);

  useEffect(() => {
    screenLogging('PicturePassword screen');
    dispatch({ type: PASSWORD_TEXT_CHANGE, value: `${row1}|${row2}|${row3}` });
  }, [row1, row2, row3]);

  useEffect(() => {
    if (props.route.params.setNewPassword) {
      setsubHeading(choosePasswordText);
    } else {
      setsubHeading(enterPasswordText);
    }
  }, [choosePasswordText, enterPasswordText, props.route.params.setNewPassword]);

  const onSelectPassword = type => {
    if (type === 'inc' && passwordSeleted < 3) {
      setPasswordSelected(passwordSeleted + 1);
    }
    if (type !== 'inc') {
      setPasswordSelected(passwordSeleted - 1);
    }
  };

  const onBackPress = () => {
    loginStore.setFirstLogin(false);
    props.navigation.goBack();
  };

  const onLogin = () => {
    if (props.route.params.setPasswordAfterReset || props.route.params.setNewPassword) {
      onSubmitResetPassword();
    } else {
      onSubmitPassword();
    }
    auth.trackEvent('mixpanel', MixpanelEvents.LOGIN, { Category: MixpanelCategories.LOGIN, Action: MixpanelActions.CLICKED, Label: '' });
  };

  let loginBtn = (
    <LoginFooterBtn
      testID="loginBtn1"
      type="disabledGray"
      text={loginBtnName}
      onPress={() => onLogin()}
      disabled={true}
      ppContainerStyle={styles.submitBtn}
      btnStyle={styles.btnStyle}
      forgotpassword={false}
    />
  );

  let errorMessageView = null;
  if (errorMessage) {
    errorMessageView = (
      <SourceSansProRegTextView testID="PicturePasswordErrorMsg" style={styles.errorMessage}> {errorMessage} </SourceSansProRegTextView>
    );
  }

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

  if (passwordSelectionCompleted) {
    loginBtn = (
      <>
        {errorMessageView}
        <LoginFooterBtn
          testID="loginBtn1"
          type="primaryOrange"
          text={loginBtnName}
          onPress={() => {
            props.route.params.setPasswordAfterReset
              ? onSubmitResetPassword()
              : onSubmitPassword();
          }}
          ppContainerStyle={styles.submitBtn}
          btnStyle={styles.btnStyle}
          forgotpassword={false}
        />
      </>
    );
  }

  return (
    <Fragment>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <View style={styles.screen}>
          <CommonHeader
            headerType={HeaderType.login}
            testID="LoginHeaderPicturePassword"
            theme={'generic'}
            lottieFileName={'naandi_header'}
            containerStyle={styles.header}
            hideBackButton={false}
            onBack={onBackPress}
          />
          <View style={styles.innerContainer}>
            <SourceSansProBoldTextView
              testID="PicturePasswordUserNameTxt"
              style={{ ...styles.text, ...styles.title }}>
              {replaceString(
                userNameText,
                'userName',
                store.loginStore.username,
              )}
            </SourceSansProBoldTextView>
            <SourceSansProBoldTextView
              testID="PicturePasswordSubHeading"
              style={{ ...styles.text, ...styles.subTitle }}>
              {subHeading}
            </SourceSansProBoldTextView>
            <PicturePassword
              testID="PicturePasswordPPAnimalPicture"
              onSelectPassword={onSelectPassword}
              category="animals"
              onPress={val => {
                setRow1(val);
                // setErrorMessage('');
              }}
              row="a"
              textStyle={{ color: '#222E59' }}
            />
            <PicturePassword
              testID="PicturePasswordPPFruitPicture"
              onSelectPassword={onSelectPassword}
              category="fruits"
              row="b"
              onPress={val => {
                setRow2(val);
              }}
              textStyle={{ color: '#222E59' }}
            />
            <PicturePassword
              testID="PicturePasswordPPFoodPicture"
              category="food"
              onSelectPassword={onSelectPassword}
              row="c"
              onPress={val => {
                setRow3(val);
              }}
              textStyle={{ color: '#222E59' }}
            />
            {!props.route.params.setPasswordAfterReset &&
              !props.route.params.setNewPassword && (
                <TouchableOpacity onPress={() => showTrustedDevicePopUp()}>
                  <View style={styles.saveMyLoginContainer}>
                    {trustedDevice ? <CheckedBox /> : <UncheckedBox />}
                    <SourceSansProRegTextView style={styles.saveMyLoginText}>
                      {saveMyLoginIdAndPassword}
                    </SourceSansProRegTextView>
                  </View>
                </TouchableOpacity>
              )}
            {store.appStore?.userLanguage === 'ka' || store.appStore?.userLanguage === 'pu' || store.appStore?.userLanguage === 'ur' || store.appStore?.userLanguage === 'ta' || store.appStore?.userLanguage === 'ma' ?
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginBottom: '3%', color: '#757575' }}>Inspired by <Text style={{ color: '#24a6e5', textDecorationLine: 'underline' }}>Project Nanhi Kali</Text></Text>
                <Image source={Nanhi_Kali_Logo} style={{ height: 50, width: 100, marginBottom: 10 }} />
              </View> : null}
            <View style={styles.btnStyle}>{loginBtn}</View>
          </View>
        </View>
      </ScrollView>
      {trustedDevice && !trusetedDeviceConfirmed && (
        <TrustedDeviceCallout
          onSaveMySession={onSaveMySession}
          disableTrustedDevice={disableTrustedDevice}
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
  },

  header: {
    marginBottom: getHp(42),
    flex: 0.2,
  },

  text: {
    marginBottom: getHp(36),
    fontSize: TEXTFONTSIZE.Text20,
  },

  title: {
    fontSize: TEXTFONTSIZE.Text28,
    marginBottom: getHp(15),
    color: COLORS.titleDarkBlue,
  },

  subTitle: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.titlePink,
    marginBottom: getHp(15),
  },

  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: getWp(33),
    flex: 0.8,
  },

  submitBtn: {
    paddingHorizontal: getWp(33),
    alignItems: 'center',
    width: '100%',
    marginBottom: getHp(40),
  },
  btnStyle: {
    width: getWp(360),
  },

  errorMessage: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text16,
    textAlign: 'center',
    marginBottom: hp('2'),
  },
  saveMyLoginContainer: {
    flexDirection: 'row',
    marginBottom: getHp(20),
  },
  saveMyLoginText: {
    marginLeft: getWp(8),
  },
});

export default observer(PicturePasswordScreen);