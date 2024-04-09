/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, LogBox, Keyboard } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen'; 
import RootNavigator from '@navigation/RootNavigator';
import NetInfo from '@react-native-community/netinfo';

import {
  NetworkError,
  Loader,
  AppUpdateDialog,
  ApiError,
  DoubleLogin,
  CustomToast,
  HeartBeatApiCall,
} from '@components';

import Orientation from 'react-native-orientation-locker';
import { AuthContext } from '@contexts/auth-context';
import { Mixpanel } from 'mixpanel-react-native';
import { useStores } from '@mobx/hooks';
import { SessionTimeOutDialog } from '@hoc';
import { NativeBaseProvider } from 'native-base';
console.disableYellowBox = true;
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { isOnlineUser } from '@utils';

LogBox.ignoreLogs([
  "No stops in gradient",
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  "RNGestureHandlerRootView will be removed",
  "GestureHandlerRootView will be removed",
])
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  const store = useStores();

  const [isAuth, setIsAuth] = useState(false);
  const [didTryAutoLogin, setDidTryAutoLogin] = useState(false);
  const [enableRouteView, setRouteViewEnabled] = useState(true);
  const [mixPanelObj, setMixPanelObj] = useState(null);
  const [ToastData, setToastData] = useState(null);

  const showToast = ({ title, description, bgcolor, timeout = 5000 }) => {
    try {
      setToastData({
        Visibility: true,
        Toast_title: title,
        Toast_desc: description,
        Toast_bgcolor: bgcolor,
      });
      setTimeout(() => {
        hideToast();
      }, timeout);
    } catch (err) {
      console.log(err);
    }
  };

  const hideToast = () => {
    setToastData(null);
  };

  const login = () => {
    setIsAuth(true);
    setDidTryAutoLogin(true);
  };

  const logout = () => {
    setIsAuth(false);
    setDidTryAutoLogin(false);
  };

  const setAutoLogin = () => {
    setDidTryAutoLogin(true);
  };

  useEffect(() => {
    initialSetup();
    configMixpanel();
  },[]);

  const configMixpanel = async () => {
    const trackAutomaticEvents = true;
    const mixpanel = new Mixpanel('352f0ee62ccef8e73a5b773acbe314af', trackAutomaticEvents);
    mixpanel.init()
    setMixPanelObj(mixpanel);
  };

  const trackIdentity = async username => {
    mixPanelObj.identify(username);
  };

  const trackEvent = async (type, eventName, eventInfo = null) => {
    if (isOnlineUser) {
      mixPanelObj.track(eventName, eventInfo);
    }
  };

  const setUserProfile = async (userInfo, type) => {
    if (userInfo) {
      if (type == 'mixpanel') {
        const {
          isFreeTrail,
          name,
          isB2CUser,
          grade,
          section,
          schoolName,
          language,
          parentDetails,
          schoolCode,
          username,
          userType,
          nationality
        } = userInfo;
        mixPanelObj.getPeople().set('isB2CUser', isB2CUser);
        mixPanelObj.getPeople().set('isFreeTrial', isFreeTrail);
        mixPanelObj.getPeople().set('class', grade || '');
        mixPanelObj.getPeople().set('section', section || '');
        mixPanelObj.getPeople().set('schoolName', schoolName || '');
        mixPanelObj.getPeople().set('schoolCode', schoolCode || '');
        mixPanelObj.getPeople().set('context', language || '');
        mixPanelObj.getPeople().set('User Category', 'Student');
        mixPanelObj.getPeople().set('Username', username || '');
        mixPanelObj.getPeople().set('Product', 'Mindspark');
        mixPanelObj.getPeople().set('Platform', 'Mobile');
        mixPanelObj.getPeople().set('UserType', userType);
        mixPanelObj.getPeople().set('Nationality', nationality);

        if (parentDetails) {
          const { parent1, parent2 } = parentDetails;
          if (parent1) {
            const { name, email, mobile } = parent1;
            mixPanelObj.getPeople().set('parent1Name', name || '');
            mixPanelObj.getPeople().set('parent1Email', email.email || '');
            mixPanelObj.getPeople().set('parent1Mobile', mobile.number || '');
          }

          if (parent2) {
            const { name, email, mobile } = parent2;
            mixPanelObj.getPeople().set('parent2Name', name || '');
            mixPanelObj.getPeople().set('parent2Email', email.email || '');
            mixPanelObj.getPeople().set('parent2Mobile', mobile.number || '');
          }
        }

        if (name) {
          mixPanelObj.getPeople().set('Name', name);
        }
      }
    }
  };

  const initialSetup = () => {
    Orientation.lockToPortrait();
  };

  useEffect(() => {
    try {
      NetInfo.addEventListener(state => {
        console.log("Nework Status : ", state);
        if (!state.isConnected) {
          store.uiStore.setHadDisconnected(true);
        }
        store.uiStore.set_isWifiConnected(state.isInternetReachable);
        store.uiStore.setIsNetConnected(state.isConnected);
      });

    } catch (err) {
      console.log(err);
    }
  }, [store.uiStore.isWifiConnected, store.uiStore.isNetConnected]);

  const keyboardWillShow = () => {
    store.uiStore.setKeypadOpened(true);
  };

  const keyboardWillHide = () => {
    store.uiStore.setKeypadOpened(false);
  };

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', keyboardWillShow);
    const keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', keyboardWillHide);
    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: Colors.lighter, flex: 1 }}>
        <StatusBar barStyle={'dark-content'} />
        {enableRouteView ? (
          <NativeBaseProvider>
            <AuthContext.Provider
              value={{
                isAuth,
                didTryAutoLogin,
                login,
                logout,
                setDidTryAutoLogin: setAutoLogin,
                trackIdentity,
                setUserProfile,
                trackEvent,
                showToast,
                hideToast,
              }}>
              <RootNavigator />
            </AuthContext.Provider>
            <ApiError />
            <NetworkError />
            <HeartBeatApiCall />
            <Loader />
            <AppUpdateDialog/>
            <DoubleLogin />
            <SessionTimeOutDialog />
            {ToastData && ToastData?.Visibility && (
              <CustomToast
                title_text={ToastData.Toast_title}
                textdesc={ToastData.Toast_desc}
                background_color={ToastData.Toast_bgcolor}
                hideToast={hideToast}
              />
            )}
          </NativeBaseProvider>
        ) : null}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
export default App;
