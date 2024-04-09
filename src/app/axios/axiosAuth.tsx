/* eslint-disable dot-notation */
import axios from 'axios';
import { Config } from 'react-native-config';

import { setAsValue, getProductName } from '@utils';
import { API } from '@api';
import { ApiEndPoint } from '@constants';
import { Alert } from 'react-native';
const axiosAuth = (store, isMindsparkApi) => {
  const instance = axios.create({
    baseURL: isMindsparkApi ? `${Config.MINDSPARK_BASE_URL}` : `${Config.BASE_URL}`,
  });
  instance.defaults.headers.common['config_key'] = Config.CONFIG_KEY;
  instance.defaults.headers.common['Content-Type'] = 'application/json';

  let timerID = null;
  instance.interceptors.request.use(
    request => {
      if (!`${request.url}`.includes(ApiEndPoint.HEARTBEAT)) {
        store.uiStore.setLoader(true);
        store.qnaStore.setDisableBTn(true);
        store.uiStore.setShowInactivePopUp(false);
      }
      let sparkBaseUrl = isMindsparkApi ? `${Config.MINDSPARK_BASE_URL}` : `${Config.BASE_URL}`;
      console.log(`API Base URL>>>>>>${sparkBaseUrl}`);
      return request;
    },
    error => {
      store.uiStore.setLoader(false);
      store.qnaStore.setDisableBTn(false);
      store.qnaStore.setLoader(false);
      clearTimeout(timerID);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    async response => {
      const heartbeatApi = `${ApiEndPoint.HEARTBEAT}`.toLowerCase();
      if (!`${response.request.responseURL}`.toLowerCase().includes(heartbeatApi) || (response.url !== undefined &&
        !`${response.url}`.toLowerCase().includes(heartbeatApi))) {
        store.uiStore.setLoader(false);
        store.qnaStore.setDisableBTn(false);
      }
      clearTimeout(timerID);
      if (response.data.resultMessage === 'redirect') {
        if (response?.data?.redirectionData?.sessionTimeExceededFlag === true) {
          store.uiStore.setSessionExceeded(true);
          await setAsValue('jwt', '');
          store.appStore.setJwt(null);
        }
      }      
      console.log('response for this api', JSON.stringify(response.data));
      return response;
    },
    async error => {
      clearTimeout(timerID);
      store.uiStore.setLoader(false);
      store.qnaStore.setLoader(false);
      store.qnaStore.setDisableBTn(false);
      try {
        let errorResponseData = error.response.data;
        switch (error.response.status) {
          case 400:
            if (errorResponseData?.redirectionData?.sessionTimeExceededFlag) {
              store.uiStore.setSessionExceeded(true);
              await setAsValue('jwt', '');
              store.appStore.setJwt(null);
            } else {
              store.uiStore.apiErrorInit({ code: '400', message: 'Bad Request' });
            }
            break;
          case 401:
            if (store.appStore.isTrusted || store.appStore.trustedDeviceId) {
              break;
            } else {
              store.loginStore.setIsAuth(false);
              await setAsValue('jwt', '');
              store.appStore.setJwt(null);
              error.response.data.resultMessage = 'Session Expired, Login Again';
              store.uiStore.setSessionExceeded(true);
            }
            break;
          case 402:
            store.uiStore.setDoubleLogin(true);
            break;
          case 500:
            Alert.alert('Alert', 'Sorry, our servers are not available at the moment. Please try later.', [{ text: 'ok', }]);
            break;
          default:
            if (errorResponseData && errorResponseData?.resultMessage && errorResponseData?.resultMessage != '') {
              store.uiStore.apiErrorInit({ code: error.response.status, message: errorResponseData?.resultMessage });
            }
            break;
        }
      } catch (err) {
        console.log('API ERROR', JSON.stringify(err));
      }
      console.log('API ERROR', JSON.stringify(error));
      return error;
    },
  );

  return instance;
};

export default axiosAuth;
