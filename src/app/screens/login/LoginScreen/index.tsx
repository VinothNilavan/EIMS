/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect, useContext, useState } from 'react';
import { View, ScrollView, LogBox, Linking, Platform, AppState, Text } from 'react-native';
import { setAsValue, formValidation, getLanguageUrl, getSubString, screenLogging, appVersionCompare } from '@utils';
import { Config } from 'react-native-config';
import { Logo, GuestAccount } from '@images';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { runInAction } from 'mobx';
import { API } from '@api';
import { useLanguage } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '@contexts/auth-context';
import { useNavigation } from '@react-navigation/native';
import { getVersion } from 'react-native-device-info';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApiEndPoint, ScreenNames } from '@constants';
import { CustomTextInput, BottomSheet, CustomButton, NeedHelp, RefreshComponent, SourceSansProBoldTextView, SourceSansProRegTextView } from '@components';
import { styles } from './styles';

LogBox.ignoreAllLogs();

const TEXT_CHANGE = 'TEXT_CHANGE';
const INVALID = 'INVALID';
const BOTTOMSHEET_OPEN = 'BOTTOMSHEET_OPEN';
const BOTTOMSHEET_CLOSE = 'BOTTOMSHEET_CLOSE';

const initialState = {
  enteredText: '',
  isError: false,
  errorMessage: '',
  enableSubmitBtn: false,
  bottomSheetOpen: false,
  isTouched: false,
};

let pattern = new RegExp(/[^a-zA-Z0-9_\-.]/);

const reducer = (state, action) => {
  switch (action.type) {
    case TEXT_CHANGE:
      return { ...state, enteredText: action.value.replace(pattern, '').toLowerCase(), enableSubmitBtn: true, isError: false, isTouched: true };
    case INVALID:
      return { ...state, isError: action.isError, errorMessage: action.message };
    case BOTTOMSHEET_OPEN:
      return { ...state, bottomSheetOpen: true };
    case BOTTOMSHEET_CLOSE:
      return { ...state, bottomSheetOpen: false };
    default:
      break;
  }
};

const LoginScreen = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [show, setShow] = useState(false);
  const [isBannerDisplayed, setIsBannerDisplayed] = useState(false);
  const [versionInfo, setVersionInfo] = useState({});
  const [versionUpdateEnabled, setVersionUpdateEnabled] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const store = useStores();
  const { userNamePlaceHolder, teacherLoginError, loginWithContactNumberText } = useLanguage();
  const auth = useContext(AuthContext);

  let { enteredText, isError, errorMessage, isTouched } = state;

  const { loginStore } = useStores();
  const navigation = useNavigation();

  const hideBanner = () => {
    setIsBannerDisplayed(false);
  };

  const handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => { subscription.remove(); };
  }, []);

  useEffect(() => {
    forceUpdateCall();
  }, [appState]);


  const forceUpdateCall = async () => {
    try {
      const response = await API(ApiEndPoint.FORCE_UPDATE, { store });
      if (response.data.resultCode === 'C001') {
        setVersionInfo(response?.data?.responseData);
        let serverVersion = response?.data?.responseData?.student[Platform.OS]?.version;
        let appVersion = getVersion();
        if (appVersionCompare(`${appVersion}`, `${serverVersion}`) < 0) {
          setVersionUpdateEnabled(true);
        }
      }
    } catch (err) {
      console.log("forceUpdateCall --- ", err)
    }
  }

  const loginScreenApi = async () => {
    try {
      let loginScreenData = await API(ApiEndPoint.LOGIN_SCREEN, { store });
      if (!loginScreenData.hasOwnProperty('data')) return
      loginScreenData = loginScreenData.data;
      if (loginScreenData.resultCode === 'C001') {
        const sparkiesChamp = loginScreenData.caurosal[0]?.studentList;
        if (sparkiesChamp) { loginStore.setSparkiesChamp(sparkiesChamp); }
        runInAction(() => {
          loginStore.sparkyFromDate = loginScreenData.fromDate;
          loginStore.sparkyToDate = loginScreenData.toDate;
          loginStore.loginPermissions = loginScreenData.permissions;
        });
      }
    } catch (err) {
      console.log("LoginScreenApi --- ", err)
    }
  };

  const getConfig = async (langaugeContext) => {
    try {
      const req = {
        body: {
          version: store.loginStore.version,
          platform: store.loginStore.platform,
          app_id: store.loginStore.appId,
        },
        store,
      };
      const response = await API(ApiEndPoint.GET_CONFIG, req);
      runInAction(async () => {
        store.loginStore.setTempJwt(response.headers.tempjwt);
        await setAsValue('tempJWT', response.headers.tempjwt);
        store.loginStore.setConfig(response.data);
        store.loginStore.didTryAutoLogin = true;
      });
      await fetchLanguage(langaugeContext);
    } catch (error) {
      console.log("Login Screen GetCongig Error -> ", error)
    }
  }

  const fetchLanguage = async language => {
    try {
      let configTranslation = loginStore.getConfig?.data?.translation?.student;
      let userLanguage = language && language.length > 0 ? language : 'en-IN';
      if (configTranslation && configTranslation?.hasOwnProperty(userLanguage) || language) {
        let translationEndpoint = getSubString(`${Config.BASE_URL}`, "https", "Framework");
        let languageURL = getLanguageUrl(userLanguage, translationEndpoint);
        let response = await fetch(languageURL);
        let responseJson = await response.json();
        setAsValue('languageData', JSON.stringify(responseJson));
        setAsValue('language', userLanguage);
        store.uiStore.setLanguageData(responseJson);
      }
    } catch (e) {
      console.log(`Language API error>>>${e.message}`);
    }
  };

  useEffect(() => {
    screenLogging('Login screen');
    store.uiStore.setLoader(false);
    store.loginStore.setLoader(false);
    loginScreenApi();
  }, [loginStore, store]);

  useEffect(() => {
    if (enteredText != '') {
      let { isValid, errMsg } = formValidation('Username', enteredText, {
        noSpecialCharsExceptAtChar: true,
        noWhiteSpace: true,
        noFirstDot: true,
      });
      if (!isValid) {
        dispatch({
          type: INVALID,
          isError: true,
          message: errMsg,
        });
      }
    }
  }, [enteredText]);

  let errorMessageView = null;

  if (isError) {
    errorMessageView = (<SourceSansProRegTextView style={styles.errorMessage} testID="LoginInputError"> {errorMessage} </SourceSansProRegTextView>);
  }

  const onTextChange = text => {
    dispatch({ type: TEXT_CHANGE, value: text });
  };

  const onSubmit = async () => {
    //Call checkUsername API
    const req = {
      body: {
        username: enteredText,
        app_id: loginStore.appId,
        platform: 'app',
      },
      store,
    };
    try {
      const response = await API(ApiEndPoint.CHECK_USERNAME, req);
      //Check No Password //
      loginStore.setUsername(enteredText);
      if (response.data.resultCode === 'C001') {
        if (response?.data?.userInformation?.category === 'student') {
          let language = response?.data?.userInformation?.languageContext;
          let nationalityValue = response?.data?.userInformation?.nationality;
          loginStore.setNationality(nationalityValue);
          getConfig(language);
          if (response?.data?.userInformation?.userType === 'vernacular') {
            loginStore.setVernacularUser(true);
          }
          store.appStore.setUserLanguage(language);
          store.uiStore.setRTL(language);
          setAsValue('userName', enteredText);
          auth.trackIdentity(enteredText);
          setAsValue('passwordType', response.data.userInformation.passwordType);
          loginStore.setPasswordType(response.data.userInformation.passwordType);
          if (response.data.userInformation.passwordType === 'picture') {
            props.navigation.navigate(ScreenNames.PicturePasswordScreen, {
              setNewPassword:
                response.data.userInformation.callSetNewPasswordType,
              setPasswordAfterReset:
                response.data.userInformation.callSetNewPasswordType,
            });
          } else if (response.data.userInformation.passwordType === 'text') {

            props.navigation.navigate(ScreenNames.TextPasswordScreen, {});
          }
          // ** passwordType == 'no' **//
          else if (response.data.userInformation.passwordType === 'no') {
            let appVersion = getVersion();
            const noPassReq = {
              body: {
                username: enteredText,
                password: 'null',
                passwordType: 'no',
                app_id: loginStore.appId,
                version: appVersion
              },
              store,
            };
            const noPassResp = await API(ApiEndPoint.VALID_PASSWORD_V3, noPassReq);
            await setAsValue('userRedirectionData', '');
            await setAsValue('subjectName', '');
            await setAsValue('ProductName', '');
            await setAsValue('trustedDeviceId', '');
            store.appStore.setTrusted(false);
            store.appStore.setSelectedSubject('');
            store.appStore.setTrustedDeviceId('');
            store.appStore.setSubjects('');
            if (noPassResp.data.resultCode === 'C004' && (noPassResp.data.redirectionCode == 'GetLandingPage' || noPassResp.data.redirectionCode == 'ProductSelectionPage')) {
              // if productlist is there set it in store
              if (noPassResp.data.redirectionData && noPassResp.data.redirectionData.productList) {
                if (noPassResp.data.redirectionData.productList.length > 1) {
                  await setAsValue('userRedirectionData', noPassResp.data.redirectionData.productList.join(','));
                  store.appStore.setUserRedirectionData(noPassResp.data.redirectionData.productList);
                } else {
                  let productList = noPassResp.data.redirectionData.productList;
                  if (productList.length > 0) {
                    let product = productList[0];
                    let subjectName = product == 'MS3' ? 'Science' : 'Maths';
                    setAsValue('ProductName', product);
                    setAsValue('subjectName', subjectName);
                  }
                }
              }
              setAsValue('jwt', noPassResp.headers.jwt);
              store.appStore.setJwt(noPassResp.headers.jwt);
              loginStore.setShowTrustedPopUp(true);
              loginStore.setIsAuth(true);
            } else if (
              noPassResp.data.resultCode === 'C004' &&
              noPassResp.data.redirectionCode == 'SubscriptionEnded'
            ) {
              props.navigation.navigate(ScreenNames.SubscriptionEndedScreen, {
                username: enteredText,
              });
            } else {
              loginStore.setLoader(false);
              dispatch({
                type: INVALID,
                isError: true,
                message: noPassResp.data.resultMessage,
              });
            }
          }
        } else {
          loginStore.setLoader(false);
          dispatch({
            type: INVALID,
            isError: true,
            message: teacherLoginError,
          });
        }
        // ** passwordType == 'no' **//
      } else if (
        response.data.resultCode === 'C004' &&
        response.data.redirectionCode === 'AccountLocked'
      ) {
        props.navigation.navigate(ScreenNames.MessagesScreen, { type: 'accountLocked' });
      } else if (
        response.data.resultCode === 'C004' &&
        response.data.redirectionCode === 'SetPasswordAfterReset'
      ) {
        await setAsValue('jwt', response.headers.jwt);
        store.appStore.setJwt(response.headers.jwt);
        if (response.data.redirectionData.newPasswordType === 'picture') {
          props.navigation.navigate(ScreenNames.PicturePasswordScreen, {
            setNewPassword: true,
            setPasswordAfterReset: true,
          });
        } else {
          props.navigation.navigate(ScreenNames.TextPasswordScreen, {
            setNewPassword: true,
            setPasswordAfterReset: true,
          });
        }
      } else {
        loginStore.setLoader(false);
        dispatch({
          type: INVALID,
          isError: true,
          message: response?.data?.resultMessage,
        });
      }
    } catch (err) {
      console.log(`API Error>>>>${JSON.stringify(err)}`);
    }
  };

  let submitBtn = (
    <CustomButton
      disabled={!isError && enteredText !== '' ? false : true}
      testId={'loginNextButton'}
      onSubmit={onSubmit}
      btnText={'Next'}
    />
  );

  const NeedHelpSymbol = (
    <View style={styles.needHelpSymbol}>
      <TouchableOpacity onPress={() => {
        setShow(true);
      }}>
        <View style={styles.NeedHelpContainer}>
          <Text style={styles.NeedHelpTextStyle}>
            ?
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  let GuestAccountImage = (
    <View style={styles.guestAccountImage}>
      <GuestAccount
        accessible={true}
        testID="LoginGuestAccountImg"
        accessibilityLabel="LoginGuestAccountImg"
        width={styles.footerGuestImg.width}
        height={styles.footerGuestImg.height}
      />
    </View>
  )

  const loginClickHandler = () => {
    navigation.navigate(ScreenNames.ContactNumberScreen);
  }

  let loginWithMobileNumber = (
    <View style={styles.footerTextContainer}>
      <TouchableOpacity onPress={loginClickHandler}>
        <View style={styles.linkContainer}>
          <SourceSansProRegTextView testID="LoginCreateGuestAccountText" style={styles.link1}>
            {`${loginWithContactNumberText}`}
          </SourceSansProRegTextView>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <BottomSheet>
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag">
        <View style={styles.screen}>

          {isBannerDisplayed &&
            <View style={styles.bannerContainerStyle} >
              <BalooThambiRegTextView style={styles.svgText}>
                {appMaintenanceDescription}
              </BalooThambiRegTextView>
              <TouchableOpacity style={styles.closeContainer} onPress={hideBanner}>
                <View style={styles.closeIcon}>
                  <RoundCloseIcon />
                </View>
              </TouchableOpacity>
            </View>}

          <View style={styles.innerContainer}>
            {NeedHelpSymbol}
            <View style={styles.logoContainer}>
              <Logo
                accessible={true}
                testID="LoginMSLogo"
                accessibilityLabel="LoginMSLogo"
                width={styles.logo.width}
                height={styles.logo.height}
              />
              {show ? <NeedHelp showModal={true} onClick={() => setShow(false)} /> : null}
            </View>
            <SourceSansProBoldTextView
              testID={"LoginText"}
              style={styles.heading}>
              {'Login'}
            </SourceSansProBoldTextView>
            <View style={{ width: wp(80) }}>
              <CustomTextInput
                testID="CustomTextInputLoginInput"
                value={enteredText}
                placeholder={!isTouched ? userNamePlaceHolder : ''}
                isError={isError}
                style={styles.input}
                onChangeText={onTextChange}
                autoCapitalize="none"
                autoCorrect={true}
                autoCompleteType="off"
              />
              {errorMessageView}
              {submitBtn}
              {/* {loginWithMobileNumber} */}
              {GuestAccountImage}
              <RefreshComponent
                forceUpdate={
                  Object.keys(versionInfo).length > 0
                    ? versionInfo?.student[Platform.OS]?.forceUpdate
                    : false
                }
                visible={versionUpdateEnabled}
                description={
                  Object.keys(versionInfo).length > 0
                    ? versionInfo?.student[Platform.OS]?.message
                    : ''
                }
                heading={
                  Object.keys(versionInfo).length > 0
                    ? versionInfo?.student[Platform.OS]?.headerText
                    : ''
                }
                onPress={() => {
                  Linking.openURL(versionInfo?.student[Platform.OS]?.url);
                  setVersionUpdateEnabled(false);
                }}
                onCancel={() => {
                  setVersionUpdateEnabled(false);
                }}
              />
            </View>
          </View>
        </View>
        {isBannerDisplayed && <View style={styles.bannerStyle} />}
      </ScrollView>
    </BottomSheet>
  );
};

export default observer(LoginScreen);