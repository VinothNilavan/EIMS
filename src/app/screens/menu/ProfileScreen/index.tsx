/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, Fragment, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TouchableOpacity, Image, FlatList, Platform, ActionSheetIOS, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { 
  BalooThambiRegTextView, RoundedButton, CustomProgress, GenderItem,
  ProfileInputField, DatePicker, PhoneIput, 
  SuccessPopup, DetailsScreen, PreferenceSwitch, TrustedDeviceItem } from '@components';
import { useLanguage } from '@hooks';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { API, APIFormData } from '@api';
import { useToast } from 'native-base';
import { getWp, getHp, screenLogging, isTablet, getDeviceDetails, replaceString, setAsValue, getAsValue } from '@utils';
import { Copy, Camera, CopyDisabled, Coin, SoundWhite, BoyPng, GirlPng, NeutralPng, TrustedDeviceEmpty11 } from '@images';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import styles from './style';
import { useBackHandler } from '@react-native-community/hooks';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, ApiEndPoint, COLORS, ScreenNames } from '@constants';
import { SvgCssUri } from 'react-native-svg/css';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const ProfileScreen = props => {
  const store = useStores();
  const { profileStore } = useStores();
  const { isVernacularUser } = store.loginStore;
  const auth = useContext(AuthContext);
  const Toast = useToast();
  const isPickerOpen = useRef(false);

  const {
    copyiedToClipboard,
    maxFileSizeText,
    fileFormatErrorText,
    parentCodeText,
    totalSparkieEarneText,
    changePassBtnText,
    viewSubscriptionBtnText,
    profileCompleteText,
    imText,
    nameText,
    profileClass,
    sectionText,
    schoolText,
    cityText,
    dobText,
    saveChangesBtnText,
    parent1Detail,
    parent2Detail,
    parent1Name,
    parent2Name,
    alphabetsAllowedText,
    parent1PhoneLabel,
    validPhoneNumText,
    parent1EmailLabel,
    parent2EmailLabel,
    validEmailIDText,
    parent2PhoneLabel,
    endDateText,
    startDateText,
    notifySetText,
    notificationPlural,
    trustedDevicesText,
    soundText,
    markAsTrustedProfile,
    thisDeviceText,
    markTrustedBtnText,
    profileLabelText,
    myProfileText,
    subsciptionSingular,
    profileUpdatedText,
    trustedDeviceEmptyState,
    daysRemainingLabel,
  } = useLanguage();

  let Parent1phone = useRef(null);
  let Parent2phone = useRef(null);
  const currScrollView = useRef(null);
  const [errorField, setErrorField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [subscriptionPos, setSubscriptionPos] = useState({ x: 0, y: 0 });
  const [deviceName, setDeviceName] = useState('');
  const [trustedDevices, setTrustedDevices] = useState([]);
  const [disableProfileSaveBtn, setDisableProfileSaveBtn] = useState(true);
  const [disableParent1SaveBtn, setDisableParent1SaveBtn] = useState(true);
  const { appStore } = useStores();
  const [disableParent2SaveBtn, setDisableParent2SaveBtn] = useState(true);
  const { profileDetails } = appStore.userData;

  const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.profile : {};

  const notificationPermission = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions?.notificationSettings : {};

  const fields = {
    fName: 'FName',
    fEmail: 'FEmail',
    fNumber: 'FNumber',
    mName: 'MName',
    mEmail: 'MEmail',
    mNumber: 'MNumber',
  };

  useBackHandler(() => {
    return props.navigation.navigate(ScreenNames.DashboardScreen);
  });

  useFocusEffect(
    React.useCallback(() => { fetchProfileDetails(); }, [fetchProfileDetails]),
  );

  useEffect(() => {
    screenLogging('Profile screen', appStore?.userData);
    DeviceInfo.getDeviceName().then(deviceName => { setDeviceName(deviceName); });
    getNotificationPreference();
    fetchTrustedDevices();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      let req = { store: store };
      let res = await API(ApiEndPoint.GET_PROFILE_DETAILS, req);
      if (res.data.resultCode === 'C001') {
        profileStore.reset();
        profileStore.init(res.data.profileInformation);
      } else {
        store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
      }
    } catch (error) {
      console.log(`fetchProfileDetails error ${error}`)
    }
  };

  const updateProfileDetails = async reqbody => {
    try {
      let req = { body: reqbody, store: store };

      let res = await API(ApiEndPoint.UPDATE_PROFILE_DETAILS, req);
      if (res.data.resultCode === 'C001') {
        fetchProfileDetails();
        setShowSuccessPopup(true);
      } else {
        store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
      }
    } catch (error) {
      console.log(`updateProfileDetails error ${error}`)
    }
  };

  const AddMixPannelEvent = () => {
    console.log('Clicked save ... ');
    auth.trackEvent('mixpanel', MixpanelEvents.SAVE_CHANGES, {
      Category: MixpanelCategories.PROFILE,
      Action: MixpanelActions.CLICKED,
      Label: '',
    });
  };

  const fetchTrustedDevices = async () => {
    try {
      const req = { store: store, body: {} };
      const response = await API(ApiEndPoint.GET_TRUSTED_DEVICES, req);
      if (response?.data?.resultCode === 'C001') {
        let responseData = response?.data?.trustedDeviceList;
        if (responseData) {
          let objectData = Object.keys(responseData);
          if (objectData.length > 0) {
            // If user removed from other device reset
            if (store.appStore.isTrusted || store.appStore.trustedDeviceId) {
              if (!responseData[store.appStore.trustedDeviceId]) {
                store.appStore.setTrustedDeviceId('');
                store.appStore.setTrusted(false);
                await setAsValue('trustedDeviceId', '');
              }
            }
            let tempArray = objectData.map(key => responseData[key]);
            setTrustedDevices(tempArray);
          } else {
            if (store.appStore.isTrusted || store.appStore.trustedDeviceId) {
              store.appStore.setTrustedDeviceId('');
              store.appStore.setTrusted(false);
              await setAsValue('trustedDeviceId', '');
            }
            setTrustedDevices([]);
          }
        } else {
          if (store.appStore.isTrusted || store.appStore.trustedDeviceId) {
            store.appStore.setTrustedDeviceId('');
            store.appStore.setTrusted(false);
            await setAsValue('trustedDeviceId', '');
          }
          setTrustedDevices([]);
        }
      } else {
        store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
      }
    } catch (error) {
      console.log(`fetchTrustedDevices error ${error}`)
    }
  };

  const removeTrustedDevice = async appID => {
    try {
      auth.trackEvent('mixpanel', MixpanelEvents.REMOVE_TRUSTED_DEVICE, {
        Category: MixpanelCategories.TRUSTEDDEVICE,
        Action: MixpanelActions.CLICKED,
        Label: '',
      });
      const req = {
        store: store,
        body: {
          platform: 'mobile',
          deviceId: appID,
        },
      };
      const resposne = await API(ApiEndPoint.REMOVE_TRUSTED_DEVICE, req);
      if (resposne.data.resultCode === 'C001') {
        if (appID == store.appStore.trustedDeviceId) {
          store.appStore.setTrustedDeviceId('');
          store.appStore.setTrusted(false);
          await setAsValue('trustedDeviceId', '');
        }
        fetchTrustedDevices();
      } else {
        store.uiStore.apiErrorInit({ code: res.status, message: res.data?.resultMessage });
      }
    } catch (error) {
      console.log(`removeTrustedDevice error ${error}`)
    }
  };

  const markAsTrustedDevice = async () => {
    try {
      auth.trackEvent('mixpanel', MixpanelEvents.MARK_AS_TRUSTED, {
        Category: MixpanelCategories.TRUSTEDDEVICE,
        Action: MixpanelActions.CLICKED,
        Label: '',
      });
      const deviceDetail = await getDeviceDetails();
      let iosString = deviceDetail.deviceOs == 'android' ? 'Android' : 'iOS';
      const req = {
        body: {
          deviceName: `${deviceName}`,
          Os_type: iosString,
          BrowserType: '',
          BrowserVersion: '',
        },
        store,
      };
      const response = await API(ApiEndPoint.ADD_TO_TRUSTED, req);
      if (response.data.resultCode === 'C001') {
        let responseData = response?.data?.trustedDeviceList;
        if (responseData) {
          let objectData = Object.keys(responseData);
          if (objectData.length > 0) {
            let tempArray = objectData.map(key => responseData[key]);
            store.appStore.setTrusted(true);
            store.appStore.setTrustedDeviceId(tempArray[0].deviceId);
            await setAsValue('trustedDeviceId', tempArray[0].deviceId);
            setTrustedDevices(trustedDevices => [
              ...trustedDevices,
              tempArray[0],
            ]);
            await updateNames(store);
          }
        }
      }
    } catch (error) {
      console.log(`markAsTrustedDevice error ${error}`)
    }
  };

  const getNotificationPreference = async () => {
    try {
      const reqBody = { store: store };

      const response = await API( ApiEndPoint.GET_NOTIFICATION_PREFERENCE, reqBody );
      if (response.data.resultCode === 'C001') {
        const settingData = response?.data?.settings;
        profileStore.setEnableNotification(settingData?.pushNotifications);
        profileStore.setEnableNotificationSound(settingData?.sound);
      } else {
        store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
      }
    } catch (error) {
      console.log(`getNotificationPreference error ${error}`)
    }
  };

  const updateNotificationPreference = async () => {
    try {
      const reqbody = {
        store: store,
        body: {
          pushNotifications: profileStore.enableNotification !== null && typeof profileStore.enableNotification !== 'undefined' ? profileStore.enableNotification : false,
          sound: profileStore?.enableNotificationSound !== null && typeof profileStore.enableNotificationSound !== 'undefined' ? profileStore?.enableNotificationSound : false,
        },
      };
      console.log('Update Notification Request', reqbody.body);
      const response = await API( ApiEndPoint.SET_NOTIFICATION_PREFERENCE, reqbody );
      console.log('Update Notification Setting Resposne', response?.data);
      if (response?.data?.resultCode === 'C001') {
        const settingData = response?.data?.data?.settings;
        profileStore.setEnableNotification(settingData?.pushNotifications);
        profileStore.setEnableNotificationSound(settingData?.sound);
      } else {
        store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
      }
    } catch (error) {
      console.log(`updateNotificationPreference error ${error}`);
    }
  };

  const writeToClipboard = async () => {
    await Clipboard.setString(profileStore.parentsCode);
    if (!Toast.isActive(30)) {
      Toast.show({ id: 30, description: copyiedToClipboard, duration: 2000 });
    }
  };

  const isValidName = value => {
    try {
      const regex = /^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$/;
      return regex.test(value);
    } catch (error) {
      console.log(`isValidName error ${error}`)
    }
  };

  const isValidEmail = value => {
    try {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value);
    } catch (error) {
      console.log(`isValidEmail error ${error}`)
    }
  };

  const options = {
    quality: 0.4,
    mediaType: 'photo',
    storageOptions: { skipBackup: true },
  };

  const onImagePick = async () => {
    const options = ['Take Photo...', 'Choose from Library... ', 'Cancel'];
    const cancelButtonIndex = 2;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { title: 'Select a Photo', options, cancelButtonIndex },
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
              cameraAction();
              break;
            case 1:
              photolibraryAction();
              break;
            case cancelButtonIndex:
              break;
          }
        },
      );
    } else {
      Alert.alert(
        '',
        'Select a Photo',
        [
          { text: 'Cancel', onPress: () => console.log('OK Pressed') },
          {
            text: 'Choose from Library...',
            onPress: () => callPhotoActions(1),
            style: 'cancel',
          },
          {
            text: 'Take Photo...',
            onPress: () => callPhotoActions(2),
          },
        ],
        { cancelable: true },
      );
    }
  };

  const callPhotoActions = type => {
    type === 1 ? photolibraryAction() : cameraAction();
  };
  const photolibraryAction = async () => {
    if(isPickerOpen.current) return;
    try {
      isPickerOpen.current = true;
      let response = await launchImageLibrary(options);
      isPickerOpen.current = false;
      uploadImage(response, false);
    } catch (er) {
        isPickerOpen.current = false;
        console.log('photolibraryAction = ', er);
    }
  };

  const uploadImageApiCall = async (uri, responseAsset) => {
    let res = {
      fileCopyUri: uri,
      name: responseAsset.fileName,
      size: responseAsset.fileSize,
      type: responseAsset.type,
      uri: uri,
    };

    try {
      if ( res.size / 1000 < 2049 && (res.type === 'image/jpeg' || res.type === 'image/png' || res.type === 'image/jpg') ) {
        const data = new FormData();
        FormData.prototype[Symbol.toStringTag] = 'FormData';
        data.append('avatarFile', res);
        let req = {
          store: store,
          body: data,
        };
        let response1 = await APIFormData(ApiEndPoint.UPDATE_PROFILE_PIC, req);
        if (response1.data.resultCode === 'C001') {
          profileStore.setAvatar(res.uri);
          store.uiStore.setChangedInUserData(true);
        } else {
          store.uiStore.apiErrorInit({ code: response1.status, message: response1.data?.resultMessage });
        }
      } else {
        let error;
        if (res.size > 2000000) {
          error = maxFileSizeText;
        } else {
          error = fileFormatErrorText;
        }
        if (!Toast.isActive(31)) {
          Toast.show({ id: 31, description: error, duration: 5000 });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImage = async (response, isCamera) => {
    try {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('uploadImage Error: ', response.error);
      } else {
        let responseAsset = response.assets[0];
        console.log('resulyt = ', responseAsset.fileSize);
        let path = responseAsset.uri;
        if (Platform.OS === 'ios') {
          path = '~' + path.substring(path.indexOf('/Documents'));
        }
        if (!responseAsset.fileName)
          responseAsset.fileName = path.split('/').pop();
        if (!responseAsset && !responseAsset.uri) return;
        ImageResizer.createResizedImage(
          responseAsset.uri,
          responseAsset.height,
          responseAsset.width,
          'JPEG',
          75,
          isCamera && Platform.OS === 'ios' ? 90 : 0,
        )
          .then(({ uri }) => {
            uploadImageApiCall(uri, responseAsset);
          })
          .catch(err => {
            console.log(err);
            return Alert.alert(
              'Unable to capture the image',
              'Please try again!',
            );
          });
      }
    } catch (error) {
      console.log(`uploadImage error ${error}`)
    }
  };

  const cameraAction = async () => {
    if(isPickerOpen.current) return;
    try {
      isPickerOpen.current = true;
      let response = await launchCamera(options);
      isPickerOpen.current = false;
      uploadImage(response, true);
    } catch (er) {
      isPickerOpen.current = false;
      console.log(er);
    }
  };

  const onSubscriptionLayouthandler = event => {
    const layout = event.nativeEvent.layout;
    setSubscriptionPos({ x: layout.x, y: layout.y });
  };

  const onViewSubscription = () => {
    try {
      auth.trackEvent('mixpanel', MixpanelEvents.GO_TO_VIEW_SUBSCRIPTION, {
        Category: MixpanelCategories.PROFILE,
        Action: MixpanelActions.CLICKED,
        Label: '',
      });
      currScrollView.current.scrollTo({ x: 0, y: subscriptionPos.y, animated: true });
    } catch (err) {
      console.log('ProfileScreen onViewSubscription Error ==', err);
    }
  };

  const renderSparkieCard = () => {
    return (
      <View style={styles.sparkeyParentContainer}>
        {permissions.mySparkies && (
          <TouchableOpacity
            accessible={true}
            testID="ProfileCardTouchableCompRewardsScreen"
            accessibilityLabel="ProfileCardTouchableCompRewardsScreen"
            style={styles.sparkeyContainer}
            onPress={() => {
              if (isVernacularUser == false)
                props.navigation.navigate(ScreenNames.RewardsScreen);
            }}>
            <View style={styles.row}>
              <View style={styles.sparkieContainer}>
                <Coin
                  accessible={true}
                  testID="ProfileCardCoinImg"
                  accessibilityLabel="ProfileCardCoinImg"
                  width={styles.iconStyle.width}
                  height={styles.iconStyle.height}
                />
              </View>
              <View style={styles.pointsContainer}>
                <BalooThambiRegTextView
                  testID="ProfileCardRewardSummaryTxt"
                  style={styles.pointStyle}>
                  {profileStore.rewardSummary.sparkies}
                </BalooThambiRegTextView>
                <BalooThambiRegTextView
                  testID="ProfileCardTotalSparkiesEarnedText"
                  style={styles.titleStyle}>
                  {totalSparkieEarneText}
                </BalooThambiRegTextView>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const checkForUserDefaultProfileImage = () => {
    try {
      let extension = profileStore.avatar.split('.').pop();
      let neutralImg = `${profileStore.avatar}`.includes('neutral.svg');

      if ( (profileStore.gender === 'N' && extension == 'svg' && neutralImg) || (extension == 'svg' && !neutralImg) ) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(`checkForUserDefaultProfileImage error ${error}`)
    }
  };

  const getProfileUrl = () => {
    let neutralImg = `${profileStore.avatar}`.includes('neutral.svg');
    if (neutralImg) {
      return profileStore.gender === 'F' ? GirlPng : profileStore.gender === 'M' ? BoyPng : NeutralPng;
    } else {
      return { uri: profileStore.avatar };
    }
  };

  const renderProfileCard = () => {
    return (
      <View style={styles.profileContainer}>
        {permissions.profilePicture && (
          <View style={styles.container}>
            <View style={styles.ImageContainer}>
              <View key="crownContainer" style={styles.crownContainer}>
                {profileDetails?.certificate?.certificateCrownImg && (
                  <SvgCssUri
                    accessible={true}
                    testID="DashBoardFooterSVGUri"
                    accessibilityLabel="DashBoardFooterSVGUri"
                    uri={profileDetails?.certificate?.certificateCrownImg}
                    width={isTablet() ? getWp(20) : getWp(25)}
                    height={isTablet() ? getWp(20) : getWp(25)}
                  />
                )}
                {profileDetails?.certificate?.certificateBannerImg && (
                  <View key="bannerContainer" style={styles.bannerContainer}>
                    <SvgCssUri
                      accessible={true}
                      testID="DashBoardFooterSVGUri"
                      accessibilityLabel="DashBoardFooterSVGUri"
                      uri={profileDetails?.certificate?.certificateBannerImg}
                      width={isTablet() ? getWp(55) : getWp(75)}
                      height={getWp(55)}
                    />
                  </View>
                )}
              </View>
            </View>
            {checkForUserDefaultProfileImage() ? (
              <SvgCssUri
                accessible={true}
                testID="ProfileCardImage"
                accessibilityLabel="ProfileCardImage"
                width={getHp(100)}
                height={getHp(100)}
                uri={profileStore.avatar}
              />
            ) : (
              <Image
                accessible={true}
                testID="ProfileCardImage"
                accessibilityLabel="ProfileCardImage"
                style={styles.profilePicContainer}
                source={
                  profileStore.avatar !== '' ? getProfileUrl() : NeutralPng
                }
              />
            )}
            {permissions && permissions?.changeProfilePicture && (
              <TouchableOpacity
                accessible={true}
                testID="ProfileCardTouchableCompOnImagePick"
                accessibilityLabel="ProfileCardTouchableCompOnImagePick"
                style={styles.cameraButtonStyle}
                onPress={() => {
                  onImagePick();
                }}>
                <Camera
                  accessible={true}
                  testID="ProfileCardCameraImg"
                  accessibilityLabel="ProfileCardCameraImg"
                  width={getWp(32)}
                  height={getWp(32)}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.userInfoContainer}>
          {permissions.profileName && (
            <BalooThambiRegTextView
              testID="ProfileStoreName"
              style={styles.title}>
              {profileStore.name}
            </BalooThambiRegTextView>
          )}
          {permissions.parentCode && Boolean(profileStore.parentsCode) && (
            <Fragment>
              <BalooThambiRegTextView
                testID="ProfileParentCodeText"
                style={styles.parentCodeTitle}>
                {parentCodeText}
              </BalooThambiRegTextView>

              <View style={styles.row}>
                <BalooThambiRegTextView
                  testID="ProfileStoreParentsCode"
                  style={styles.parentCodeStyle}>
                  {profileStore.parentsCode}
                </BalooThambiRegTextView>
                <TouchableOpacity
                  accessible={true}
                  testID="ProfileCardTouchableCompWriteToClipboard"
                  accessibilityLabel="ProfileCardTouchableCompWriteToClipboard"
                  style={styles.copyButton}
                  disabled={!profileStore.parentsCode}
                  onPress={writeToClipboard}>
                  {profileStore.parentsCode ? (
                    <Copy height={getHp(25)} width={getWp(72)} />
                  ) : (
                    <CopyDisabled height={getHp(25)} width={getWp(72)} />
                  )}
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
        </View>
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.mainButtonContainer}>
        {permissions.changePassword && (
          <RoundedButton
            testID="RoundedButtonProfileChangePassBtnText"
            type="secondaryWhite"
            width={getWp(180)}
            height={getHp(85)}
            text={changePassBtnText}
            onPress={() => {
              auth.trackEvent('mixpanel', MixpanelEvents.CHANGE_PASSWORD, {
                Category: MixpanelCategories.PROFILE,
                Action: MixpanelActions.CLICKED,
                Label: '',
              });
              console.log(store.loginStore.passwordType);
              store.loginStore.passwordType === 'picture'
                ? props.navigation.navigate(
                  ScreenNames.CurrentPicturePasswordScreen,
                )
                : props.navigation.navigate(
                  ScreenNames.ChangeTextPassWordScreen,
                );
            }}
            textStyle={styles.orangeTextButton}
          />
        )}
        <View style={styles.flexOne} />
        {permissions.viewSubscriptionButton && (
          <RoundedButton
            testID="RoundedButtonProfileViewSubscriptionBtnText"
            text={viewSubscriptionBtnText}
            type="elevatedOrange"
            width={getWp(180)}
            height={getHp(85)} //{getHp(80)}
            onPress={onViewSubscription}
            textStyle={styles.whiteButtonText}
          />
        )}
      </View>
    );
  };

  const renderMyProfile = () => {
    return (
      <View>
        {permissions.myProgress && (
          <View style={styles.progressContainer}>
            <BalooThambiRegTextView
              testID="ProfileProgressText"
              style={styles.progressLabel}>
              {profileCompleteText}
            </BalooThambiRegTextView>
            <View style={styles.progressView}>
              <CustomProgress
                testID="CustomProgressProfile"
                key="customProgress"
                currentProgress={profileStore.profileProgress}
                progressColor={COLORS.parrotGreen}
                borderRadius={30}
                progressBarStyle={styles.customProgressBarStyle}
                commonStyle={styles.customProgressCommonStyle}
              />

              <BalooThambiRegTextView
                testID="ProfileProgressPercentage"
                style={styles.percentageLabel}>
                {profileStore.profileProgress + '%'}
              </BalooThambiRegTextView>
            </View>
          </View>
        )}

        {permissions.gender && (
          <View style={styles.genderContainer}>
            <BalooThambiRegTextView
              testID="ProfileImText"
              style={styles.genderTitle}>
              {imText}
            </BalooThambiRegTextView>
            <GenderItem
              testID="GenderItemProfileM"
              type={'M'}
              selectedType={profileStore.gender}
              onSelected={selected => {
                setDisableProfileSaveBtn(profileStore.gender === selected);
                profileStore.setGender(selected);
                console.log('Selected Gender', selected);
              }}
            />
            <GenderItem
              testID="GenderItemProfileF"
              type={'F'}
              style={styles.marginLeft12}
              selectedType={profileStore.gender}
              onSelected={selected => {
                setDisableProfileSaveBtn(profileStore.gender === selected);
                profileStore.setGender(selected);
                console.log('Selected Gender', selected);
              }}
            />
          </View>
        )}
        <ProfileInputField
          testID="ProfileInputFieldNameText"
          style={styles.marginTop24}
          title={nameText}
          defaultValue={profileStore.name}
          disabled={true}
        />
        <View style={styles.row}>
          <ProfileInputField
            testID="ProfileInputFieldClassText"
            style={styles.flexOne}
            title={profileClass}
            defaultValue={profileStore.grade.toString()}
            disabled={true}
          />
          <ProfileInputField
            testID="ProfileInputFieldSectionText"
            style={[styles.flexOne, styles.marginLeft12]}
            title={sectionText}
            defaultValue={profileStore.section}
            disabled={true}
          />
        </View>
        <ProfileInputField
          testID="ProfileInputFieldSchoolText"
          title={schoolText}
          defaultValue={`${profileStore.organization}`}
          disabled={true}
        />
        <ProfileInputField
          testID="ProfileInputFieldCityText"
          title={cityText}
          defaultValue={`${profileStore.profileInformation.city}`}
          disabled={true}
        />
        <DatePicker
          testID="ProfileInputFieldDobText"
          title={dobText}
          defaultValue={profileStore.dob && parseDate(profileStore.dob)}
          onDateSet={date => {
            setDisableProfileSaveBtn(profileStore.dob === date ? true : false);
            profileStore.setDOB(parseDateToSystemFormat(date));
          }}
        />
        <RoundedButton
          testID="RoundedButtonProfileSaveChangesBtnText"
          text={saveChangesBtnText}
          type={
            disableProfileSaveBtn ? 'squareDisabledElevated' : 'elevatedOrange'
          }
          width={getWp(210)}
          height={getHp(70)}
          onPress={() => {
            let body = {
              dateOfBirth: profileStore.dob,
              gender: profileStore.gender,
            };
            AddMixPannelEvent();
            updateProfileDetails(body);
            setDisableProfileSaveBtn(true);
            store.uiStore.setChangedInUserData(true);
          }}
          containerStyle={styles.saveButtonStyle}
          textStyle={styles.saveWhiteButtonText}
          disabled={disableProfileSaveBtn}
        />
      </View>
    );
  };

  const renderParentsDetails = () => {
    return (
      <View style={styles.parentsDetailsContainer}>
        <BalooThambiRegTextView
          testID="ProfileParent1Detail"
          style={styles.title}>
          {parent1Detail}
        </BalooThambiRegTextView>
        <ProfileInputField
          testID="ProfileInputFieldProfileParent1Name"
          style={styles.marginTop24}
          title={parent1Name}
          defaultValue={profileStore.fatherName}
          field={fields.fName}
          errorField={errorField}
          error={errorMessage}
          onChangeText={val => {
            setDisableParent1SaveBtn(
              profileStore.fatherName === val ? true : false,
            );
            profileStore.setFatherName(val);
            if (!isValidName(val)) {
              setErrorField(fields.fName);
              setErrorMessage(alphabetsAllowedText);
              return;
            } else {
              setErrorField('');
            }
          }}
          disabled={false}
        />
        <PhoneIput
          testID="PhoneInputProfileParent2Phone"
          reference={Parent2phone}
          title={parent1PhoneLabel}
          field={fields.fNumber}
          value={profileStore.fatherNumber}
          errorField={errorField}
          error={errorMessage}
          onChangePhoneNumber={value => {
            setDisableParent1SaveBtn(
              profileStore.fatherNumber === value ? true : false,
            );
            profileStore.setFatherNumber(value);
            if (isNaN(value) || !validatePhoneNumber(value)) {
              setErrorField(fields.fNumber);
              setErrorMessage(validPhoneNumText);
              return;
            } else {
              setErrorField('');
            }
          }}
        />
        <ProfileInputField
          testID="ProfileInputFieldProfileParent1EmailLabel"
          title={parent1EmailLabel}
          defaultValue={profileStore.fatherEmail}
          field={fields.fEmail}
          errorField={errorField}
          error={errorMessage}
          onChangeText={val => {
            setDisableParent1SaveBtn(
              profileStore.fatherEmail === val ? true : false,
            );
            profileStore.setFatherEmail(val);
            if (!isValidEmail(val)) {
              setErrorField(fields.fEmail);
              setErrorMessage(validEmailIDText);
              return;
            } else {
              setErrorField('');
            }
          }}
          disabled={false}
        />
        <RoundedButton
          testID="RoundedButtonProfileSaveChangesBtnText"
          text={saveChangesBtnText}
          type={
            disableParent1SaveBtn ? 'squareDisabledElevated' : 'elevatedOrange'
          }
          width={getWp(210)}
          height={getHp(70)}
          onPress={() => {
            AddMixPannelEvent();
            setErrorMessage('');
            if (
              Boolean(profileStore.fatherName) &&
              !isValidName(profileStore.fatherName)
            ) {
              setErrorField(fields.fName);
              setErrorMessage(alphabetsAllowedText);
              return;
            }
            if (
              Boolean(profileStore.fatherNumber) &&
              !Parent2phone.current.isValidNumber(
                `${profileStore.fatherNumber}`,
              )
            ) {
              setErrorField(fields.fNumber);
              setErrorMessage(validPhoneNumText);
              return;
            }

            if (
              Boolean(profileStore.fatherEmail) &&
              !isValidEmail(profileStore.fatherEmail)
            ) {
              setErrorField(fields.fEmail);
              setErrorMessage(validEmailIDText);
              return;
            }

            profileStore.setFatherISD(Parent2phone.current.getCallingCode());
            let body = {
              dateOfBirth: profileStore.dob,
              gender: profileStore.gender,
              fatherEmail: profileStore.fatherEmail,
              fatherISD: profileStore.fatherISD,
              fatherMobile: profileStore.fatherNumber,
              fatherName: profileStore.fatherName,
              motherEmail: profileStore.motherEmail,
              motherISD: profileStore.motherISD,
              motherMobile: profileStore.motherNumber,
              motherName: profileStore.motherName,
            };
            updateProfileDetails(body);
            setDisableParent1SaveBtn(true);
          }}
          containerStyle={styles.saveButtonStyle}
          textStyle={styles.saveWhiteButtonText}
          disabled={disableParent1SaveBtn}
        />

        <BalooThambiRegTextView
          testID="ProfileParent2Detail"
          style={[styles.title, styles.marginTop24]}>
          {parent2Detail}
        </BalooThambiRegTextView>
        <ProfileInputField
          testID="ProfileInputFieldProfileParent2Name"
          style={styles.marginTop24}
          title={parent2Name}
          field={fields.mName}
          errorField={errorField}
          error={errorMessage}
          defaultValue={profileStore.motherName}
          onChangeText={value => {
            setDisableParent2SaveBtn(
              profileStore.motherName === value ? true : false,
            );
            profileStore.setMotherName(value);
            if (!isValidName(value)) {
              setErrorField(fields.mName);
              setErrorMessage(alphabetsAllowedText);
              return;
            } else {
              setErrorField('');
            }
          }}
          disabled={false}
        />
        <PhoneIput
          testID="PhoneInputProfileParent1Phone"
          reference={Parent1phone}
          field={fields.mNumber}
          value={profileStore.motherNumber}
          errorField={errorField}
          error={errorMessage}
          title={parent2PhoneLabel}
          onChangePhoneNumber={value => {
            setDisableParent2SaveBtn(
              profileStore.motherNumber === value ? true : false,
            );
            profileStore.setMotherNumber(value);
            if (isNaN(value) || !validatePhoneNumber(value)) {
              setErrorField(fields.mNumber);
              setErrorMessage(validPhoneNumText);
              return;
            } else {
              setErrorField('');
            }
          }}
        />
        <ProfileInputField
          testID="ProfileInputFieldProfileParent2EmailLabel"
          title={parent2EmailLabel}
          defaultValue={profileStore.motherEmail}
          field={fields.mEmail}
          errorField={errorField}
          error={errorMessage}
          onChangeText={val => {
            setDisableParent2SaveBtn(
              profileStore.motherEmail === val ? true : false,
            );
            profileStore.setMotherEmail(val);
            if (!isValidEmail(val)) {
              setErrorField(fields.mEmail);
              setErrorMessage(validEmailIDText);
              return;
            } else {
              setErrorField('');
            }
          }}
          disabled={false}
        />
        <RoundedButton
          testID="RoundedButtonProfileSaveChangesBtnText"
          text={saveChangesBtnText}
          type={
            disableParent2SaveBtn ? 'squareDisabledElevated' : 'elevatedOrange'
          }
          width={getWp(210)}
          height={getHp(70)}
          onPress={() => {
            AddMixPannelEvent();
            setErrorMessage('');
            if (
              Boolean(profileStore.motherName) &&
              !isValidName(profileStore.motherName)
            ) {
              setErrorField(fields.mName);
              setErrorMessage(alphabetsAllowedText);
              return;
            }
            if (
              Boolean(profileStore.motherNumber) &&
              !Parent1phone.current.isValidNumber(
                `${profileStore.motherNumber}`,
              )
            ) {
              // console.log(
              //   '\nnumber check',
              //   Parent1phone.current.getAllCountries(),
              // );
              setErrorField(fields.mNumber);
              setErrorMessage(validPhoneNumText);
              return;
            }

            if (
              Boolean(profileStore.motherEmail) &&
              !isValidEmail(profileStore.motherEmail)
            ) {
              setErrorField(fields.mEmail);
              setErrorMessage(validEmailIDText);
              return;
            }
            //console.log(`code ----> ${JSON.stringify(Parent1phone.current)}`);

            profileStore.setMotherISD(Parent1phone.current.getCallingCode());
            let body = {
              dateOfBirth: profileStore.dob,
              gender: profileStore.gender,
              motherEmail: profileStore.motherEmail,
              motherISD: profileStore.motherISD,
              motherMobile: profileStore.motherNumber,
              motherName: profileStore.motherName,
              fatherEmail: profileStore.fatherEmail,
              fatherISD: profileStore.fatherISD,
              fatherMobile: profileStore.fatherNumber,
              fatherName: profileStore.fatherName,
            };
            updateProfileDetails(body);
            setDisableParent2SaveBtn(true);
          }}
          containerStyle={styles.saveButtonStyle}
          textStyle={styles.saveWhiteButtonText}
          disabled={disableParent2SaveBtn}
        />
      </View>
    );
  };

  const validatePhoneNumber = phoneNumber => {
    const regx = /^\d{10}$/;
    return regx.test(phoneNumber);
  };

  const renderSubscription = () => {
    let remainingDays = profileStore?.subscriptionDetails?.remainingDays;
    return (
      <View onLayout={onSubscriptionLayouthandler}>
        <BalooThambiRegTextView
          testID="ProfileSubscriptionSingular"
          style={[styles.title, styles.marginTop24]}>
          {subsciptionSingular}
        </BalooThambiRegTextView>
        <View style={styles.subscriptionContainer} key="subscription">
          <View style={styles.row}>
            <BalooThambiRegTextView
              testID="ProfileStartDateText"
              style={styles.subscriptionTitle}>
              {startDateText}
            </BalooThambiRegTextView>
            <BalooThambiRegTextView
              testID="ProfileSubscriptionFrom"
              style={styles.subscriptionValue}>
              {parseDate(profileStore.subscriptionDetails?.subscriptionFrom)}
            </BalooThambiRegTextView>
          </View>
          <View style={styles.row}>
            <BalooThambiRegTextView
              testID="ProfileEndDateText"
              style={styles.subscriptionTitle}>
              {endDateText}
            </BalooThambiRegTextView>
            <BalooThambiRegTextView
              testID="ProfileSubscriptionTo"
              style={styles.subscriptionValue}>
              {parseDate(profileStore.subscriptionDetails?.subscriptionTo)}
            </BalooThambiRegTextView>
          </View>
          <View style={styles.row}>
            <BalooThambiRegTextView
              testID="ProfileRemainingDays"
              style={styles.subscriptionMessage}>
              {` ( ${remainingDays} ${remainingDays != 'Subscription Expired'
                ? replaceString(daysRemainingLabel, 'remainingDays', '')
                : ''
                })`}
            </BalooThambiRegTextView>
          </View>
        </View>
      </View>
    );
  };

  const renderNotificationSettings = () => {
    return (
      <View style={styles.notificationSettingContainer}>
        <BalooThambiRegTextView
          testID="ProfileNotifySetText"
          style={styles.title}>
          {notifySetText}
        </BalooThambiRegTextView>
        {notificationPermission ? (
          <PreferenceSwitch
            testID="PreferenceSwitchProfileNotificationPlural"
            title={notificationPlural}
            isEnabled={profileStore?.enableNotification}
            onValueChange={() => {
              profileStore?.setEnableNotification( !profileStore?.enableNotification );
              updateNotificationPreference();
            }}
          />
        ) : (
          <View />
        )}
        {notificationPermission ? (
          <View style={styles.separateView} />
        ) : (
          <View />
        )}
        {notificationPermission ? (
          <PreferenceSwitch
            testID="PreferenceSwitchProfileSoundText"
            Icon={SoundWhite}
            title={soundText}
            isEnabled={profileStore?.enableNotificationSound}
            onValueChange={() => {
              profileStore?.setEnableNotificationSound( !profileStore?.enableNotificationSound );
              updateNotificationPreference();
            }}
          />
        ) : (
          <View />
        )}
      </View>
    );
  };

  const renderEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <TrustedDeviceEmpty11
          accessible={true}
          testID="ProfileTrustedDeviceEmpty11"
          accessibilityLabel="ProfileTrustedDeviceEmpty11"
          width={getWp(250)}
          style={styles.trustedDeviceIcon}
        />
        <BalooThambiRegTextView
          testID="ProfileTrustedDeviceEmptyState"
          style={styles.emptyText}>
          {trustedDeviceEmptyState}
        </BalooThambiRegTextView>
      </View>
    );
  };

  const renderTrustedDevices = () => {
    return (
      <View style={styles.trustedDeviceContainer}>
        <BalooThambiRegTextView
          testID="ProfileTrustedDevicesText"
          style={styles.title}>
          {trustedDevicesText}
        </BalooThambiRegTextView>

        {!store.appStore.isTrusted && trustedDevices.length < 3 && (
          <View style={styles.markTrustedContainer}>
            <BalooThambiRegTextView
              testID="ProfileMarkAsTrustedProfile"
              style={styles.trustedDeviceSubTitle}>
              {markAsTrustedProfile}
            </BalooThambiRegTextView>
            <View style={styles.currentDeviceContainer}>
              <View style={styles.currentDeviceTitleContainer}>
                <BalooThambiRegTextView
                  testID="ProfileDeviceName"
                  style={styles.currentDevicetitleText}>
                  {deviceName}
                </BalooThambiRegTextView>
                <BalooThambiRegTextView
                  testID="ProfileThisDeviceText"
                  style={styles.currentDeviceText}>
                  {thisDeviceText}
                </BalooThambiRegTextView>
              </View>
              <TouchableOpacity
                onPress={() => markAsTrustedDevice()}
                style={styles.trustedDeviceButtonContainer}>
                <BalooThambiRegTextView
                  testID="ProfileMarkTrustedBtnText"
                  style={styles.trustedDeviceButtonText}>
                  {markTrustedBtnText}
                </BalooThambiRegTextView>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {Array.isArray(trustedDevices) && (
          <FlatList
            data={trustedDevices}
            renderItem={({ item }) => (
              <TrustedDeviceItem
                testID={item._id}
                deviceName={item.deviceName}
                updateOn={item._updatedAt}
                onPress={() => removeTrustedDevice(item?.deviceId)}
              />
            )}
            ListEmptyComponent={renderEmptyView}
            keyExtractor={item => item._id}
          />
        )}
      </View>
    );
  };

  const parseDate = strDate => {
    console.log('date', strDate);
    if (strDate) {
      return moment(strDate).format('DD MMMM YYYY');
    }
    return '';
  };

  const parseDateToSystemFormat = date => {
    return moment(date).format('YYYY-MM-DD');
  };

  const headerBtnClickHandler = () => {
    props.navigation.goBack();
  };

  return (
    <DetailsScreen
      testID="DetailsScreenProfile"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      footerContainerStyle={styles.footerContainerStyle}>
      <ScrollView ref={currScrollView}>
        {profileStore.profileInformation && (
          <View style={styles.contentStyle}>
            <BalooThambiRegTextView
              testID="ProfileLabelText"
              style={styles.title}>
              {profileLabelText}
            </BalooThambiRegTextView>
            {renderProfileCard()}
            {renderSparkieCard()}
            {renderButtons()}
            <BalooThambiRegTextView
              testID="ProfileText"
              style={styles.profileTitle}>
              {myProfileText}
            </BalooThambiRegTextView>
            {renderMyProfile()}
            {permissions.parentDetails && renderParentsDetails()}
            {permissions.subscription && renderSubscription()}
          </View>
        )}
        {renderTrustedDevices()}
        {notificationPermission ? renderNotificationSettings() : null}
        <SuccessPopup
          testID="SuccessPopupProfile"
          isVisible={showSuccessPopup}
          text={profileUpdatedText}
          onPress={() => {
            setShowSuccessPopup(false);
          }}
        />
      </ScrollView>
    </DetailsScreen>
  );
};

export default observer(ProfileScreen);

const updateNames = async store => {
  try {
    const username = await getAsValue('userName');
    if (username) {
      store.appStore.setUsername(username);
    }
    const productList = await getAsValue('userRedirectionData');
    if (productList && productList != '') {
      let products = productList.split(',');
      store.appStore.setSubjects(products);
    }
  } catch (error) {
    console.log(`updateNames error ${error}`)
  }
};
