/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment, useContext } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { getDeviceDetails, MultigetAsValue, setAsValue, captureDeviceDetails } from '@utils';
import { v4 as uuidv4 } from 'uuid';
import { runInAction } from 'mobx';
import { API } from '@api';
import { ApiEndPoint } from '@constants';
import { useStores } from '@mobx/hooks';
import { AuthContext } from '@contexts/auth-context';
import { useToast } from 'native-base';
import Geolocation from '@react-native-community/geolocation';

const StartupScreen = props => {
  const store = useStores();
  const auth = useContext(AuthContext);
  const Toast = useToast();

  const tryLogin = async () => {
    try {
      const offline_data = await MultigetAsValue([
        'tempJWT',
        'jwt',
        'appId',
        'skipOnBoardingScreen',
        'trustedDeviceId',
        'userName',
        'userRedirectionData',
        'subjectName',
        'languageData',
        'ProductName',
      ]);
      const { tempJWT, skipOnBoardingScreen, jwt } = configStore(store, offline_data);
      if (!tempJWT) {
        //Call Set Device Details API
        Geolocation.getCurrentPosition(
          async info => {
            let result = await setDeviceDetails(info);
            if (result) checkLoginStatus(offline_data, skipOnBoardingScreen, jwt);
          },
          async error => {
            let result = await setDeviceDetails('');
            if (result) checkLoginStatus(offline_data, skipOnBoardingScreen, jwt);
          },
          { enableHighAccuracy: true }
        );
      } else {
        checkLoginStatus(offline_data, skipOnBoardingScreen, jwt);
      }
    } catch (error) {
      console.log('StartupScreen ERROR - ', error);
      store.loginStore.setDidTryAutoLogin(true);
      auth.setDidTryAutoLogin();
      SplashScreen.hide();
    }
  };

  const checkLoginStatus = async (offline_data, skipOnBoardingScreen, jwt) => {
    try {
      let languageData = store?.uiStore?.languageData;
      if (!languageData?.Mindspark) {
        languageData = offline_data[8][1];
        store.uiStore.setLanguageData(JSON.parse(languageData));
      }
      if (skipOnBoardingScreen != 'true') {
        await getConfig();
      } else {
        store.loginStore.setSkipOnBoardingScreen(true);
      }
      if (jwt) {
        store.loginStore.setUserType(1);
        store.loginStore.setIsAuth(true);
        store.appStore.setJwt(jwt);
        auth.login();
        return;
      } else {
        store.loginStore.setDidTryAutoLogin(true);
        auth.setDidTryAutoLogin();
        SplashScreen.hide();
      }
    } catch (err) {
      SplashScreen.hide();
      console.log('checkLoginStatus error = ', err);
    }
  };

  const getConfig = async () => {
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
      if (response?.data?.resultCode == 'C001') {
        runInAction(async () => {
          store.loginStore.setTempJwt(response?.headers?.tempjwt);
          await setAsValue('tempJWT', response?.headers?.tempjwt);
          store.loginStore.setConfig(response?.data);
          store.loginStore.didTryAutoLogin = true;
        });
        await setOnBoardingScreen(response?.data);
      } else {
        Toast.show({ description: 'Data Not Loaded' });
      }
    } catch (err) {
      SplashScreen.hide();
      console.log('getConfig error = ', err);
    }
  };

  const setDeviceDetails = async (info = null) => {
    try {
      let deviceDetail = await getDeviceDetails();
      deviceDetail.app_id = store.loginStore.appId;
      let details = await captureDeviceDetails(store);
      if (info && info?.coords?.longitude && info?.coords?.latitude) {
          details.longitude = info?.coords?.longitude;
          details.latitude = info?.coords?.latitude;
      }
      const completeDetails = { ...deviceDetail, ...details };
      const req = {
        body: completeDetails,
        store,
      };
      let result = await API(ApiEndPoint.SET_DEVICE_DETAILS, req);
      if (result?.data) return true;
    } catch (err) {
      console.log('setDevice Details error = ', err);
    }
  };

  useEffect(() => {
    tryLogin();
  });

  const setOnBoardingScreen = async response => {
    let data = response && response.data && response.data.featurePages && response.data.featurePages.students;
    let filterData = [];
    if (data && data.length > 0) {
      filterData = data.filter(item => item.status === 'A');
      store.loginStore.setSkipOnBoardingScreen(filterData.length > 0 ? false : true);
    } else {
      store.loginStore.setSkipOnBoardingScreen(true);
    }
    await setAsValue('skipOnBoardingScreen', 'true');
  };

  return <Fragment />;
};

export default StartupScreen;

const configStore = (store, offline_data) => {
  let appId;
  const tempJWT = offline_data[0][1];
  const jwt = offline_data[1][1];
  appId = offline_data[2][1];
  const skipOnBoardingScreen = offline_data[3][1];
  const trustedDeviceId = offline_data[4][1];
  const username = offline_data[5][1];
  const productList = offline_data[6][1];
  try {
    if (productList && productList != '') {
      let products = productList.split(',');
      store.appStore.setSubjects(products);
    }
    if (trustedDeviceId && trustedDeviceId != '') {
      store.appStore.setTrustedDeviceId(trustedDeviceId);
      store.appStore.setTrusted(true);
      const ProductName = offline_data[9][1];
      store.appStore.setSelectedSubject(ProductName);
    }
    store.loginStore.setSkipOnBoardingScreen(skipOnBoardingScreen);

    if (username) {
      store.appStore.setUsername(username);
    }
    if (!appId) {
      const uuidV4 = uuidv4();
      setAsValue('appId', uuidV4);
      appId = uuidV4;
    }
    store.loginStore.setAppId(appId);
  }
  catch (error) {
    console.log('error in start up screen', error);
  }
  return { tempJWT, skipOnBoardingScreen, jwt };
};
