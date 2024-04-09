import { useReducer } from 'react';
import { API } from '@api';
import { useStores } from '@mobx/hooks';
import { ApiEndPoint, ScreenNames } from '@constants';
import { setAsValue, getAsValue } from '@utils';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'native-base';
import { getVersion } from 'react-native-device-info';

let pattern = new RegExp(/[^a-zA-Z0-9_@|\-.]/);

const SEE_PASSWORD = 'SEE_PASSWORD';
const SEE_CONFIRM_PASSWORD = 'SEE_CONFIRM_PASSWORD';
const PASSWORD_TEXT_CHANGE = 'PASSWORD_TEXT_CHANGE';
const CONFIRM_PASSWORD_TEXT_CHANGE = 'ENTERED_PASSWORD_TEXT_CHANGE';
const INVALID = 'INVALID';
const CONFIRM_PWD_INVALID = 'CONFIRM_PWD_INVALID';
const CLEAR_PSWD = 'CLEAR_PSWD';
const SHOW_TOAST = 'SHOW_TOAST';
const HIDE_TOAST = 'HIDE_TOAST';
const TRUSTED_DEVICE = 'TRUSTED_DEVICE';
const TRUSTED_DEVICE_CONFIRMED = 'TRUSTED_DEVICE_CONFIRMED';

const initialState = {
  passwordText: '',
  confirmPasswordText: '',
  isPasswordError: false,
  isConfirmPasswordError: false,
  passwordSecure: true,
  confirmPasswordSecure: true,
  errorMessage: '',
  isTouched: false,
  Toast_Visibility: false,
  Toast_title: '',
  Toast_desc: '',
  Toast_bgcolor: '',
  Toast_timeout: 10000,
  trustedDevice: false,
  trusetedDeviceConfirmed: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SEE_PASSWORD:
      return {
        ...state,
        passwordSecure: !state.passwordSecure,
      };
    case SEE_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPasswordSecure: !state.confirmPasswordSecure,
      };
    case PASSWORD_TEXT_CHANGE:
      return {
        ...state,
        passwordText: action.value.replace(pattern, ''),
        isTouched: true,
      };
    case CONFIRM_PASSWORD_TEXT_CHANGE:
      return {
        ...state,
        confirmPasswordText: action.value.replace(pattern, ''),
      };
    case INVALID:
      return {
        ...state,
        isPasswordError: action.isError,
        errorMessage: action.message,
      };
    case CONFIRM_PWD_INVALID:
      return {
        ...state,
        isConfirmPasswordError: action.isError,
        errorMessage: action.message,
      };
    case CLEAR_PSWD:
      return {
        ...state,
        passwordText: '',
      };
    case SHOW_TOAST:
      return {
        ...state,
        Toast_Visibility: true,
        Toast_title: action.Toast_title || '',
        Toast_desc: action.Toast_desc || '',
        Toast_bgcolor: action.Toast_bgcolor || state.Toast_bgcolor,
        Toast_timeout: action.Toast_timeout || state.Toast_timeout,
      };
    case HIDE_TOAST:
      return {
        ...state,
        Toast_Visibility: false
      }
    case TRUSTED_DEVICE:
      return {
        ...state,
        trustedDevice: !state.trustedDevice
      }
    case TRUSTED_DEVICE_CONFIRMED:
      return {
        ...state,
        trusetedDeviceConfirmed: !state.trusetedDeviceConfirmed
      }
    default:
      break;
  }
};

const paswordRules = {
  required: true,
  minLength: 4,
  noSpecialChars: true,
  includeAtChar: true,
};

const useAuth = (passwordType = null) => {
  const store = useStores();
  const navigation = useNavigation();
  const { loginStore } = store;
  const [state, dispatch] = useReducer(reducer, initialState);
  let {
    passwordSecure,
    confirmPasswordSecure,
    passwordText,
    confirmPasswordText,
    isPasswordError,
    isConfirmPasswordError,
    errorMessage,
    isTouched,
    trustedDevice,
    trusetedDeviceConfirmed
  } = state;

  let confirmPasswordRules = {
    shouldMatchPassword: true,
    password: state.passwordText,
  };

  const logoutHandler = async (type) => {
    const reqBody = {
      body: {
        platform: 'mobile',
        token: await getAsValue('jwt'),
        logoutType: type,
      },
      store: store,
    };
    const response = await API(ApiEndPoint.STUDENT_LOGOUT, reqBody);
    if (response?.data) {
      store.loginStore.setIsAuth(null);
      store.loginStore.setFirstLogin(false);
      await setAsValue('HeartBeatInterval', '');
      await setAsValue('jwt', '');
      await setAsValue('oldJWT', '');
      store.appStore.resetAppStoreOnLogout();
      store.uiStore.reset();
      store.loginStore.reset();
      store.leaderBoardStore.reset();
      store.qnaStore.reset();
      store.profileStore.reset();
      store.starredQuestionStore.reset();
      store.notificationStore.reset();
      store.worksheetStore.reset();
      store.topicTrailsStore.reset();
      store.homeworkStore.reset();
    } else {
      Toast.show({ text: 'LOGOUT API Error:' + response.data.resultMessage, duration: 5000 });
    }
  };

  const onTokenHandshake = async eisecretKey => {
    const req = {
      body: {
        username: loginStore.username,
        eisecretKey: eisecretKey ? eisecretKey : '',
        app_id: store.loginStore.appId,
        platform: 'app'
      },
      store,
    };

    try {
      let response = await API(ApiEndPoint.INTERNAL_HAND_SHAKE, req);
      parseSubmitPasswordRes(response);
    } catch (e) {
      console.log(`Validate Password error>>>${e}`);
    }
  }

  const parseSubmitPasswordRes = async response => {
    await setAsValue('userRedirectionData', '');
    await setAsValue('subjectName', '');
    await setAsValue('trustedDeviceId', '');
    await setAsValue('ProductName', '');
    store.appStore.setTrusted(false);
    store.appStore.setSelectedSubject('');
    store.appStore.setTrustedDeviceId('');
    store.appStore.setSubjects('');
    if (response.data.resultCode === 'C004' && response.data.redirectionCode == 'SubscriptionEnded') {
      navigation.navigate(ScreenNames.SubscriptionEndedScreen, { username: loginStore.username });
    } else if (response.data.resultCode === 'C004' && response.data.redirectionCode === 'NewLogin') {
      dispatch({ type: CLEAR_PSWD });
      store.appStore.setJwt(response.headers.jwt);
      loginStore.setPasswordType(response?.data?.redirectionData?.newPasswordType);
      setAsValue('jwt', response.headers.jwt);
      setAsValue('oldJWT', response.headers.jwt);
      loginStore.setFirstLogin(true);
      if (response.data.redirectionData.newPasswordType === 'picture') {
        navigation.navigate(ScreenNames.PicturePasswordScreen, { setNewPassword: true, setPasswordAfterReset: true });
      } else {
        navigation.navigate(ScreenNames.TextPasswordScreen, { setNewPassword: true, setPasswordAfterReset: true });
      }
    } else if (response.data.resultCode === 'C004') {
      store.appStore.setUserRedirectionData(null);
      console.log("response.data.isB2CUser = ", response.data.isB2CUser)
      let userdata = { isB2CUser: response.data.isB2CUser }
      store.appStore.setUserData(userdata);
      loginStore.setUserType(1);

      // if productlist is there set it in store
      if (response.data.redirectionData && response.data.redirectionData.productList) {
        if (response.data.redirectionData.productList.length > 1) {
          await setAsValue('userRedirectionData', response.data.redirectionData.productList.join(','));
          store.appStore.setUserRedirectionData(response.data.redirectionData.productList);
        } else {
          let productList = response.data.redirectionData.productList;
          if (productList.length > 0) {
            let product = productList[0];
            let subjectName = product == 'MS3' ? 'Science' : 'Maths';
            setAsValue('ProductName', product);
            setAsValue('subjectName', subjectName);
          }
        }
      }
      store.appStore.setJwt(response.headers.jwt);
      setAsValue('jwt', response.headers.jwt);
      /** CheckSessionForDevice **/
      setAsValue('oldJWT', response.headers.jwt);
      /** CheckSessionForDevice **/
      loginStore.setIsAuth(true);
    } else {
      dispatch({ type: INVALID, message: response.data.resultMessage });
    }
  }

  const onSubmitPassword = async passwordBody => {
    let versionString = getVersion();
    const req = {
      body: {
        username: loginStore.username,
        password: passwordBody ? passwordBody : passwordText,
        passwordType,
        app_id: store.loginStore.appId,
        mobileNo: loginStore.parentMobile,
        countryCode: loginStore.countryCode,
        version: versionString
      },
      store
    };
    try {
      let response = await API(ApiEndPoint.VALID_PASSWORD_V3, req);
      parseSubmitPasswordRes(response);
    } catch (e) {
      console.log(`Validate Password error>>>${e}`);
    }
  };

  const onSubmitResetPassword = async () => {
    console.warn('Password:', passwordText);
    const req = {
      body: {
        newPasswordType: passwordType,
        newPassword: passwordText,
        firstLogin: loginStore.firstLogin,
      },
      store,
    };
    console.log('APP respp- useauth bidy,', req.body);
    try {
      const response = await API(ApiEndPoint.SET_PASSWORD_AFTER_RESET, req);

      // Reset All data 
      await setAsValue('userRedirectionData', '');
      await setAsValue('subjectName', '');
      await setAsValue('ProductName', '');
      await setAsValue('trustedDeviceId', '');
      store.appStore.setTrusted(false);
      store.appStore.setSelectedSubject('');
      store.appStore.setTrustedDeviceId('');
      store.appStore.setSubjects('');

      if (response?.data?.resultCode === 'C001' ||
        (response?.data?.resultCode === 'C004' &&
          response?.data?.redirectionCode == 'GetLandingPage')) {
        await setAsValue('jwt', response.headers.jwt);
        store.appStore.setJwt(response.headers.jwt);
        loginStore.setIsAuth(true);
      } else if (
        response?.data?.resultCode === 'C004' &&
        response?.data?.redirectionCode == 'ProductSelectionPage'
      ) {
        dispatch({ type: CLEAR_PSWD });

        // if productlist is there set it in store
        if (response.data.redirectionData && response.data.redirectionData.productList) {
          if (response.data.redirectionData.productList.length > 1) {
            await setAsValue('userRedirectionData', response.data.redirectionData.productList.join(','));
            store.appStore.setUserRedirectionData(response.data.redirectionData.productList);
          }
        }
        parseSubmitPasswordRes(response);
      } else {
        dispatch({ type: INVALID, message: response?.data?.resultMessage });
      }
    } catch (e) {
      console.log(`Validate Password error>>>${e}`);
    }
  };

  const show_Toast = ({ title, description, bgcolor, timeout }) => {
    try {
      dispatch({
        type: SHOW_TOAST,
        Toast_title: title,
        Toast_desc: description,
        Toast_bgcolor: bgcolor,
        Toast_timeout: timeout,
      });
    } catch (err) {
      console.log(err);
    }
  };


  const hide_Toast = async () => {
    dispatch({ type: HIDE_TOAST })
  }

  return {
    logoutHandler,
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
    show_Toast,
    hide_Toast,
    state,
    trustedDevice,
    trusetedDeviceConfirmed,
    TRUSTED_DEVICE_CONFIRMED,
    onTokenHandshake,
    parseSubmitPasswordRes
  };
};

export default useAuth;