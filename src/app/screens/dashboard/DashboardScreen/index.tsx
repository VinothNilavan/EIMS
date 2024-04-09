/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/**
|--------------------------------------------------
| Dashboard Screen
|--------------------------------------------------
*/
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Alert, View, BackHandler, Linking, Platform, AppState, Image, TouchableOpacity } from 'react-native';
import {
  DashboardContent, ListingScreen, DashboardFooter, TrustedDeviceCallout, Buddy, ShareButton,
  RefreshComponent, FeedBackModal, SVGImageBackground, CommonHeader, Popup,
  BalooThambiRegTextView, HomeSessionUsage
} from '@components';
import { useStores } from '@mobx/hooks';
import { Config } from 'react-native-config';
import { observer } from 'mobx-react';
import { getAsValue, setAsValue, configurePushNotification, getDeviceDetails, appVersionCompare, getLanguageUrl, getSubString, screenLogging } from '@utils';
import { API } from '@api';
import { useToast } from 'native-base';
import { ThemeContext } from '@contexts/theme-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, ApiEndPoint, GENERIC, ScreenNames, REWARD_TYPES, REWARD_TYPES_CATEGORY_CERTIFICATES } from '@constants';
import { useBackHandler } from '@react-native-community/hooks';
import { ScreenTestDialog } from '@hoc';
import { useLanguage, useAuth } from '@hooks';
import { HeaderType } from '../../../utils/helper';
import DeviceInfo, { getVersion } from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import styles from './indexCss';
import moment from 'moment';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { StarBanner, RoundCloseIcon } from '@images';

const DashboardScreen = props => {
  const theme = useContext(ThemeContext);
  const { uiStore, loginStore, profileStore } = useStores();
  const store = useStores();
  const { appStore } = store;
  const navigation = useNavigation();
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [showFeedBackPopup, setShowFeedBackPopup] = useState(false);
  const [isBack, setIsBack] = useState(true);
  const auth = useContext(AuthContext);
  const [isStart, setIsStart] = useState(false);
  const [showTrustedPopUp, setShowTrustedPopUp] = useState(false);
  const [versionInfo, setVersionInfo] = useState({});
  const [versionUpdateEnabled, setVersionUpdateEnabled] = useState(false);
  const { trustedDeviceMaxLimitMsg, loggedOutText, idleLoggedOutMsg, appBannerDescription } = useLanguage();
  const [appState, setAppState] = useState(AppState.currentState);
  const Toast = useToast();
  const { logoutHandler } = useAuth();
  const [isBannerDisplayed, setIsBannerDisplayed] = useState(false);
  const [homeSession, setHomeSession] = useState(false);

  const handleSessionUsage = () => {
    console.log("home session handleSessionUsage ... ");
    setHomeSession(false);
  };

  const [isBanner, setIsBanner] = useState(false);
  const CancelBtnClickHandler = () => {
    setShowSideDrawer(false);
    setIsBack(true);
  }

  const didTapBanner = () => {
    Linking.openURL('https://forms.gle/FbY7seTBZ7bjsCrLA');
  };

  const hideBanner = () => {
    setIsBanner(false);
  };

  useBackHandler(() => {
    setIsBack(false);
    setShowSideDrawer(false);
    Alert.alert("MindSpark Exit ", "Are you sure you want to exit App", [{
      text: 'Cancel',
      onPress: () => CancelBtnClickHandler(),
      style: 'cancel'
    }, {
      text: 'OK',
      onPress: () => BackHandler.exitApp()
    },], {
      cancelable: false
    });
  });

  useFocusEffect( useCallback(() => {
      const reqBody = {
        jwt: getAsValue('jwt'),
        store: store,
      };
      if (store.uiStore.isSubjectChanges) {
        TriggerOnSubjectChanges();
        store.uiStore.setSubjectChanges(false);
      }
      if (store.uiStore.isAnyChangesInUserData) {
        fetchHomeDetails(reqBody);
        store.uiStore.setChangedInUserData(false);
      }
    }, []),
  );

  const TriggerOnSubjectChanges = async () => {
    if (store.uiStore.isNetConnected) {
      const reqBody = {
        jwt: getAsValue('jwt'),
        store: store,
      };
      const req = {
        body: reqBody.jwt,
        store: reqBody.store,
      };
      Promise.all([
        API(ApiEndPoint.MENU_LIST, req),
        API(ApiEndPoint.HOME_DETAILS, req),
      ])
        .then(response => {
          fetchMenuListAPI(reqBody, response[0]);
          fetchHomeDetails(reqBody, response[1]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  const showBannerPrivateUser = (nationality, flag) => {
    const isBefore = moment().isBefore(`2023-12-30T12:30:00.000Z`); // IST 6 pm 30 of dec

    if (isBefore && nationality == 'national' && (!flag)) {
      //setIsBannerDisplayed(true);
    }
  }

  useEffect(() => {
    if (uiStore.menuDataPermissions?.home?.displaySparkyBanner) {
      setIsBanner(true);
    }
  }, [uiStore.menuDataPermissions?.home?.displaySparkyBanner])

  useEffect(() => {
    configurePushNotification(appStore, navigation, profileStore?.enableNotificationSound);
    showBannerPrivateUser(loginStore.nationality.toLowerCase(), loginStore.isVernacularUser);
  }, [profileStore?.enableNotificationSound]);

  useEffect(() => {
    DeviceInfo.getDeviceName().then((deviceName) => { isDeviceTrusted(deviceName); });

    if (loginStore.showTrustedPopUp) {
      loginStore.setShowTrustedPopUp(false);
      setShowTrustedPopUp(true);
    }
  }, [])

  useEffect(() => {
    (async () => {
      const subjectName = await getAsValue('subjectName');
      SplashScreen.hide();
      if (subjectName === null) {
        logoutHandler("normal");
      } else {
        if (store.uiStore.isNetConnected) {
          const reqBody = {
            jwt: getAsValue('jwt'),
            store: store,
          };
          const req = {
            body: reqBody.jwt,
            store: reqBody.store,
          };
          Promise.all([
            API(ApiEndPoint.MENU_LIST, req),
            API(ApiEndPoint.HOME_DETAILS, req),
          ])
            .then(response => {
              fetchMenuListAPI(reqBody, response[0]);
              fetchHomeDetails(reqBody, response[1]);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    })();
  }, [store, store.uiStore.isNetConnected, store.uiStore.isWifiConnected]);

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


  useEffect(() => {
    if (
      appStore?.pushNotificationToken !== null &&
      appStore?.pushNotificationToken !== ''
    ) {
      updateDeviceNotificationToken();
    }
  }, [store?.appStore?.pushNotificationToken]);

  const getCertificateDetails = async () => {
    try {
      let response = await API(ApiEndPoint.GET_CERTIFICATE_POPUP_DETAILS, { store });
      if (response?.data?.resultCode === 'C001') {
        let item = response?.data?.certificatePopupShown;
        let visible = false;
        if (item?.starCertificate?.showPopup) {
          item = { ...item, category: REWARD_TYPES_CATEGORY_CERTIFICATES.STAR }
          visible = true;
        }
        if (item?.champCertificate?.showPopup) {
          item = { ...item, category: REWARD_TYPES_CATEGORY_CERTIFICATES.CHAMP }
          visible = true;
        }
        appStore.setPopup({ isVisible: visible, item: item });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const updateDeviceNotificationToken = async () => {
    const oldToken = await getAsValue('notificationToken');

    if (oldToken !== store?.appStore?.pushNotificationToken) {
      const reqBody = {
        store: store,
        body: {
          app_id: store?.loginStore?.appId,
          old_notification_token: oldToken,
          new_notification_token: store?.appStore?.pushNotificationToken,
        },
      };

      const response = await API(
        ApiEndPoint.UPDATE_DEVICE_NOTIFICATION_TOKEN,
        reqBody,
      );
      if (response?.data?.resultCode === 'C001') {
        await setAsValue(
          'notificationToken',
          store?.appStore?.pushNotificationToken,
        );
      }
    }
  };

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

  // Implementaion of Screening test 
  const checkScreenTestStatus = async reqBody => {
    try {
      const response = await API(
        ApiEndPoint.CHECK_SCREENING_TEST_STATUS,
        reqBody,
      );
      setScreenTestData(response);
    } catch (err) {
      console.log(`Check Screen Test Status error>>>${err}`);
    }
  };

  const setScreenTestData = response => {
    let screeningResponse = response.data;
    if (screeningResponse.resultCode === 'C001') {
      if (screeningResponse.screeningTestFlag) {
        appStore.setScreenTestActive(true);
        appStore.setAssesementTestActive(false);
      } else if (screeningResponse.levelTestFlag) {
        appStore.setScreenTestActive(false);
        appStore.setAssesementTestActive(false);
      } else if (screeningResponse.assesementTestFlag) {
        appStore.setScreenTestActive(false);
        appStore.setAssesementTestActive(true);
      } else {
        console.log('No test is active');
      }
      if (screeningResponse.screeningTestFlag || screeningResponse.levelTestFlag || screeningResponse.assesementTestFlag) {
        let testData = screeningResponse.screeningTestFlag ? screeningResponse.screeningData : screeningResponse.levelTestData;

        if (screeningResponse.assesementTestFlag) {
          testData = screeningResponse.assesementData
        }
        appStore.setScreeningData(testData);

        switch (testData.pedagogyStatus.toLowerCase()) {
          case 'new':
            uiStore.setScreenTestDialog(true);
            setIsStart(true);
            break;
          case 'in-progress':
            uiStore.setScreenTestDialog(true);
            setIsStart(false);
            break;
          default:
            uiStore.setScreenTestDialog(false);
            break;
        }
      }
    }
  };

  const fetchHomeDetails = async (reqBody, response = undefined) => {
    try {
      const req = {
        body: reqBody.jwt,
        store: reqBody.store,
      };
      if (response == undefined) {
        response = await API(ApiEndPoint.HOME_DETAILS, req);
      }

      if (response?.data?.userInformation?.userType === 'vernacular') {
        loginStore.setVernacularUser(true);
      }

      if (response.data.resultCode === 'C001') {
        let userData = response?.data?.userInformation;

        loginStore.setNationality(userData?.nationality);
        showBannerPrivateUser(userData?.nationality.toLowerCase(), userData?.userType.toLowerCase() == 'vernacular');

        if (userData?.canFeedbackPopupBeShown && !store.uiStore.feedbackPopupFirstTime) {
          setTimeout(() => { setShowFeedBackPopup(true); store.uiStore.setFeedBackPopupFirstTime(true); }, 1000);
        } else {
          setShowFeedBackPopup(false);
        }

        configTheme(userData.selectedTheme, theme);

        // set userData in appStore
        userConfig(userData, store, auth);
        userData.sparkies = response.data.rewardSummary.sparkies;
        userData.notificationCount = response?.data?.notificationInformation?.totalUnreadNotification;
        let language = userData?.language;
        fetchLanguage(language);
        appStore.setUserLanguage(language);
        uiStore.setRTL(language);

        appStore.setUserData(userData);
        screenLogging("DashboardScreen", userData);
        if (response?.data?.sessionInformation) {
          appStore.setSessionInformation(response?.data?.sessionInformation);
        }
      } else {
        configStoreApiError(response.status, response.data?.resultMessage, store);
      }
    } catch (e) {
      console.log(`Home_Details_error1>>>${e}`);
    }
  };

  const fetchMenuListAPI = async (reqBody, response) => {
    try {
      if (response.data.resultCode === 'C001') {
        let menuPermission = response.data.permissions;
        uiStore.setMenuDataPermission(menuPermission);
        await setAsValue('HeartBeatInterval', `${response?.data?.permissions?.heartbeatInterval}`);
        store.appStore.setValidatePassordApiCalled(!store.appStore.validatepasswordApiCalled);

        if (menuPermission.reward.myCertificate) {
          getCertificateDetails();
        }

        if (menuPermission?.contentDelivery?.screeningTestEnable) {
          checkScreenTestStatus(reqBody);
        }
        if (menuPermission?.homeUsageAlertEnable) {
          store.appStore.setHomeUsageAlertEnable(true);
        }

      } else {
        if (response.status && response.data?.resultMessage && response.data?.resultMessage != "") {
          store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
        }
      }
    } catch (err) {
      console.log(`Menu List API error>>>${err}`);
    }
  };

  const getSubject = (product, languageData) => {    
    let subjectName;
    switch (product) {
      case 'MS1':    
        subjectName = languageData?.Mindspark || "Maths";
        break;

      case 'MS2':
        subjectName = languageData?.MSE || "English";
        break;

      case 'MS3':
        subjectName = languageData?.MSS || "Science";
        break;

      case 'MS4':
        subjectName = languageData?.MSHi || "Basha";
        break;

      case 'MS5':
        subjectName = languageData?.MSUr || "Urdu";
        break;

      case 'MS6':
        subjectName = languageData?.MSMa || "Marathi";
        break;

      case 'MS7':
        subjectName = languageData?.MSPu || "Punjabi";
        break;

      case 'MS8':
        subjectName = languageData?.MSGu || "Gujarati";
        break;

      case 'MS9':
        subjectName = languageData?.MSTe || "Telugu";
        break;

      case 'MS10':
        subjectName = languageData?.MSTa || "Tamil";
        break;

      case 'MS11':
        subjectName = languageData?.MSKa || "Kannada";
        break;

      case 'MS13':
        subjectName = languageData?.MSOr || "Oriya";
        break;
    }
    return subjectName;
  };

  const fetchLanguage = async language => {
    try {
      let configTranslation = loginStore.getConfig?.data?.translation?.student;
      let userLanguage = language && language.length > 0 ? language : 'en-IN';
      if (
        configTranslation &&
        configTranslation?.hasOwnProperty(userLanguage) || language
      ) {
        let translationEndpoint = getSubString(`${Config.BASE_URL}`, "https", "Framework");
        let languageURL = getLanguageUrl(userLanguage, translationEndpoint);
        let response = await fetch(languageURL);
        let responseJson = await response.json();
        setAsValue('languageData', JSON.stringify(responseJson));
        setAsValue('language', userLanguage);
        store.uiStore.setLanguageData(responseJson);
        let savedProductName = await getAsValue("ProductName");
        let selectedSub = getSubject(savedProductName, store.uiStore.languageData);    
        store.appStore.setSelectedSubValue(selectedSub);
      }
    } catch (err) {
      console.log(`Language API error>>>${err}`);
    }
  };

  const isDeviceTrusted = async (deviceName) => {
    if (loginStore.isTrusted) {
      loginStore.setTrusted(false);
      const deviceDetail = await getDeviceDetails();
      const req = {
        body: {
          deviceName: `${deviceName}`,
          Os_type: deviceDetail.deviceOs == 'android' ? "Android" : 'iOS',
          BrowserType: "",
          BrowserVersion: ""
        },
        store
      };
      const response = await API(ApiEndPoint.ADD_TO_TRUSTED, req);
      if (response.data.resultCode === 'C001') {
        try {
          let responseData = response?.data?.trustedDeviceList;
          if (responseData) {
            let objectData = Object.keys(responseData);
            if (objectData.length > 0) {
              let tempArray = objectData.map((key) => responseData[key]);
              appStore.setTrusted(true);
              appStore.setTrustedDeviceId(tempArray[0].deviceId);
              await setAsValue('trustedDeviceId', tempArray[0].deviceId);
              const username = await getAsValue('userName');

              if (username) {
                appStore.setUsername(username);
              }
              const productList = await getAsValue('userRedirectionData');
              if (productList && productList != '') {
                let products = productList.split(',');
                store.appStore.setSubjects(
                  products
                );
              }
            }
          }
        } catch (error) {
          console.log('error in dashboard ....');
        }
      } else if (response.data.resultCode === 'S0191') {
        if (!Toast.isActive(19)) {
          Toast.show({ id: 19, description: trustedDeviceMaxLimitMsg, duration: 5000 });
        }
      }
    }
  };

  const headerBtnClickHandler = () => {
    auth.trackEvent('mixpanel', MixpanelEvents.HOME_HAMBURGER, { "Category": MixpanelCategories.HAMBURGER, "Action": MixpanelActions.CLICKED, "Label": "" });
    setShowSideDrawer(!showSideDrawer);
  };

  const onSaveMySession = () => {
    auth.trackEvent('mixpanel', MixpanelEvents.TRUSTED_POP_UP_YES, { "Category": MixpanelCategories.TRUSTEDDEVICE, "Action": MixpanelActions.CLICKED, "Label": "" });

    setShowTrustedPopUp(false);
    loginStore.setTrusted(true);

    DeviceInfo.getDeviceName().then((deviceName) => { isDeviceTrusted(deviceName); });
  };

  const onCloseTrustedPopUp = () => {
    auth.trackEvent('mixpanel', MixpanelEvents.TRUSTED_POP_UP_NO, { "Category": MixpanelCategories.TRUSTEDDEVICE, "Action": MixpanelActions.CLICKED, "Label": "" });
    setShowTrustedPopUp(false);
  }

  let sparkieBannerUI = (
    <TouchableWithoutFeedback style={styles.bannerContainerStyle} onPress={didTapBanner} >
      <Image accessible={true} testID="StarBannerPng" accessibilityLabel="StarBannerPng" style={styles.starBannerStyle} source={StarBanner} />
      <BalooThambiRegTextView style={[styles.svgText, styles.sparkieBannerInstruction4]}>
        {'Share your'}
      </BalooThambiRegTextView>
      <BalooThambiRegTextView style={[styles.svgText, styles.sparkieBannerInstruction3]}>
        {'#MainBhi'}
      </BalooThambiRegTextView>
      <BalooThambiRegTextView style={[styles.svgText, styles.sparkieBannerInstruction2]}>
        {'Sparkie'}
      </BalooThambiRegTextView>
      <BalooThambiRegTextView style={[styles.svgText, styles.sparkieBannerInstruction1]}>
        {'story and earn a sparkie!'}
      </BalooThambiRegTextView>
      <Image accessible={true} testID="StarBannerPng" accessibilityLabel="StarBannerPng" style={styles.starBannerStyle} source={StarBanner} />
    </TouchableWithoutFeedback>
  );

  if (uiStore.screenTestDialog) {
    return (
      <ScreenTestDialog
        isStart={isStart}
        onPress={() => {
          props.navigation.replace(ScreenNames.ScreenTestScreen);
        }}
      />
    );
  } else {
    return (
      <View style={styles.flexOne}>
        <View style={styles.flexOne}>
          <SVGImageBackground testID="SVGImageBackgroundListingDashboard" SvgImage="bgDashboard" themeBased screenBg>

            <CommonHeader testID="HeaderListing" type={"menu"} onClick={headerBtnClickHandler} fromHome={true} headerType={HeaderType.base} containerStyle={{ marginTop: -16 }} />
            {isBannerDisplayed && sparkieBannerUI}
            {isBanner &&
              <View style={styles.bannerContainerStyle1} >
                <BalooThambiRegTextView style={styles.svgText1}>
                  {appBannerDescription}
                </BalooThambiRegTextView>
                <TouchableOpacity style={styles.closeContainer} onPress={hideBanner}>
                  <View style={styles.closestyle}><RoundCloseIcon /></View>
                </TouchableOpacity>
              </View>}
            <View style={styles.flexOne}>
              <Buddy style={styles.buddy} />
              {appStore.Popup.isVisible && <Popup onButtonPress={() => navigation.navigate(ScreenNames.RewardsScreen, { tab: REWARD_TYPES.CERTIFICATES, certificateDetails: appStore.Popup.item, fromDashboardScreen: true })} />}
              <DashboardContent
                testID="ContentDashBoard"
                clickedButton={name => {
                  if (!Toast.isActive(20)) { Toast.show({ id: 20, description: 'Work In Progress' }); }
                }}
              />
              <DashboardFooter
                footerOnPress={() => {
                  auth.trackEvent('mixpanel', MixpanelEvents.GO_TO_HOME_FOOTER_PROFILE, { "Category": MixpanelCategories.PROFILE, "Action": MixpanelActions.CLICKED, "Label": "" });
                  props.navigation.navigate(ScreenNames.ProfileScreen);
                }}
                permissions={
                  Object.keys(uiStore.menuDataPermissions).length > 0
                    ? uiStore.menuDataPermissions.home
                    : {}
                }
              />
              {showTrustedPopUp &&
                <TrustedDeviceCallout onSaveMySession={onSaveMySession} disableTrustedDevice={onCloseTrustedPopUp} />
              }

              <ShareButton />
              {showFeedBackPopup ? <FeedBackModal onClick={() => setShowFeedBackPopup(false)} /> : null}
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
              <View>
                <ListingScreen
                  testID="ListingScreenDashBoard"
                  headerBtnType="menu"
                  fromHome
                  showSideDrawer={showSideDrawer && isBack}
                  headerBtnClick={headerBtnClickHandler} />
              </View>
            </View>
            {!store.uiStore.displayedHomeUsagePopup && store.loginStore.isAuth && <HomeSessionUsage />}
          </SVGImageBackground>
        </View>
      </View>
    );
  }
};


export default observer(DashboardScreen);

const configTheme = (selectedTheme, theme) => {
  if (!GENERIC.LOTTIES.includes(selectedTheme)) {
    theme.setTheme('ocean');
  } else {
    theme.setTheme(selectedTheme);
  }
}

const configStoreApiError = (responseStatus, responseResultMessage, store) => {
  if (responseStatus && responseResultMessage && responseResultMessage != "") {
    store.uiStore.apiErrorInit({ code: responseStatus, message: responseResultMessage });
  }
}

const userConfig = (userData, store, auth) => {
  if (userData.isB2CUser && store.uiStore.firstLogin) {
    store.uiStore.setFirstLogin(false);
  } else {
    auth.setUserProfile(userData, 'mixpanel');
  }
}