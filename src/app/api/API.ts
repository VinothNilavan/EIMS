import axiosAuth from '../axios/axiosAuth';
import { setAsValue, getProductName, getAsValue } from '@utils';
import { ApiEndPoint } from '@constants';

const logoutHandler = async (store, type) => {
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
    await setAsValue('jwt', '');
    await setAsValue('oldJWT', '');
  } else {
    console.log('API ERROR');
  }
};

const API = async (endPoint, req, isMindsparkApi) => {
  const store = req.store;
  if (store.uiStore.lastUpdatedTime) {
    let diff = Math.abs(store.uiStore.lastUpdatedTime - new Date());
    store.uiStore.setLastUpdatedTime(new Date());
    if (diff > 0) {
      let minutes = Math.floor(diff / 1000 / 60);
      if (minutes >= 10) {
        if (store.loginStore.isAuth) {
          if (store.appStore.isTrusted) {
            const reqBody = {
              body: {
                'username': store.appStore.username,
                'trustedDeviceId': store.appStore.trustedDeviceId,
                'productName': getProductName(store.appStore.selectedSubject),
                'platform' : 'mobile', 
              },
              store: store,
            };
            const response = await API(ApiEndPoint.START_NEW_SESSION, reqBody);
            if (response.data.resultCode === 'C001') {
              console.log('sessions Api res', response.data);
              store.appStore.setJwt(response.headers.jwt);
              await setAsValue('jwt', response.headers.jwt);
              await setAsValue('oldJWT', response.headers.jwt);
              const reqBodyMenu = { jwt: getAsValue('jwt'), store: store };
              const responseMenu = await API(ApiEndPoint.MENU_LIST, reqBodyMenu);
              if (responseMenu.data.resultCode === 'C001') {
                store.uiStore.setMenuDataPermission(responseMenu.data.permissions);
                await setAsValue('HeartBeatInterval', `${responseMenu?.data?.permissions?.heartbeatInterval}`);
                return await callAxios(endPoint, req, isMindsparkApi);
              } else {
                if (responseMenu.status && responseMenu.data?.resultMessage && responseMenu.data?.resultMessage != "") {
                  store.uiStore.apiErrorInit({ code: responseMenu.status, message: responseMenu.data?.resultMessage });
                }
                return;
              }
            } else {
              return;
            }
          } else {
            store.uiStore.reset();
            store.leaderBoardStore.reset();
            store.appStore.setRewardData();
            store.loginStore.setIsAuth(false);
            store.loginStore.setFirstLogin(false);
            await setAsValue('HeartBeatInterval', '');
            store.uiStore.setSessionExceeded(true);
            logoutHandler(store, "auto-logout");
            store.loginStore.setSkipOnBoardingScreen(true);
            return;
          }
        } else {
          return;
        }
      }
    }
  } else {
    store.uiStore.setLastUpdatedTime(new Date());
  }
  return callAxios(endPoint, req, isMindsparkApi);
};



const HeartBeatCall = async (endPoint, req, isMindsparkApi) => {
  const store = req.store;
  if (store.loginStore.isAuth) {
    return await callAxios(endPoint, req, isMindsparkApi);
  }
}

async function callAxios(endPoint, req, isMindsparkApi) {
  const jwt = await getAsValue('jwt');
  const request = { url: endPoint, body: req.body };
  let signalObj = null;
  if (req.signal) {
    signalObj = { cancelToken: req.signal.token };
  }

  let axios = axiosAuth(req.store, isMindsparkApi);
  axios.defaults.headers.common['jwt'] = jwt;
  axios.defaults.headers.common['Auth'] = 'EISecret';
  console.log(`\n\n${endPoint} API Request: ` + JSON.stringify(req.body));
  return axios.post(request.url, req.body, signalObj);
}

export { API, HeartBeatCall }  