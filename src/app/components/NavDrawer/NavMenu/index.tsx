/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { SimpleLottie, NavHeader, SVGImageBackground, MenuItem } from '@components';
import {
  HomeMenuIcon,
  HomeMenuActiveIcon,
  LogoutIcon,
  LogoutActiveIcon,
  MessageIcon,
  MessageActiveIcon,
  LeaderboardHigher,
  RewardsIcon,
  RewardsActiveIcon,
  SettingIcon,
  SettingActiveIcon,
  SaveIcon,
  SaveActiveIcon,
  Notification_Icon,
  Preview_Icon,
  FeedbackIcon,
  PrivacyPolicy,
} from '@images';
import { useAuth, useLanguage } from '@hooks';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { setAsValue, getAsValue } from '@utils';
import { useStores } from '@mobx/hooks';
import { AuthContext } from '@contexts/auth-context';
import { ThemeContext } from '@contexts/theme-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, ApiEndPoint, ScreenNames } from '@constants';
import { API } from '@api';
import { CopilotStep, walkthroughable, useCopilot } from 'react-native-copilot';
import { Config } from 'react-native-config';

const WalkthroughableView = walkthroughable(View);

const NavMenu = props => {
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const { logoutHandler } = useAuth();
  const { copilotEvents, start } = useCopilot();

  const {
    homeText,
    staredPularText,
    askADoubt,
    leaderboardLabelText,
    rewardLabelText,
    profileLabelText,
    logoutLableText,
    feedback,
    notificationPlural,
    previewText,
    privacyPolicy
  } = useLanguage();
  
  const {
    testID,
    isModalVisible,
    toggleModal,
    animationIn,
    animationOut,
    permissions,
    clickedMenuItem,
  } = props;
  const navigation = useNavigation();
  const store = useStores();

  useEffect(() => {
    if (isModalVisible) {
      if (store.uiStore.showNavbarOverlay) {
        start();
      }
      copilotEvents.on('stop', () => { store.uiStore.setShowNavbarOverlay(false); });
      return copilotEvents.off('stop');
    }
  }, [isModalVisible]);

  const onFeedbackCTA = async () => {
    const { sessionInformation, userData } = store.appStore;
    // console.log("FeedbackCTA------>",JSON.stringify(userData));

    let sessionId = sessionInformation.sessionID || '';
    let classId = userData.grade || '';
    let userType = userData.isB2CUser ? 'B2C' : userData.userType;
    let username = userData.username || '';

    const subjectName = await getAsValue('subjectName');
    let subject = subjectName || 'Maths';
    let subject_Name = userData.subject || '';
    let school = userData.schoolName || '' + userData.schoolCode || '' ;
    let nationality = userData.nationality || '';
    let language = userData.language || '';
    let url = `https://forms.zohopublic.in/educationalinitiativesprivat/form/MindsparkFeedbackStudent/formperma/7tTA7TtjDKi7iSBwDsL2IRp2GoUh0Bpt0EyfOSBLgDY?sessionid=${sessionId}&class=${classId}&platform=app&&usersubscription=${userType}&username=${username}&subject=${subject_Name}&schoolname=${school}&usertype=${userType}&nationality=${nationality}&language=${language}`;
    Linking.openURL(url);
  };
  const onPrivacyPolicy = async () => {
     Linking.openURL(`${Config.PRIVACY_POLICY}`);
  };

  const removeTrustedDevice = async () => {
    try {
      if (store.appStore.isTrusted) {
        auth.trackEvent('mixpanel', MixpanelEvents.REMOVE_TRUSTED_DEVICE, {
          Category: MixpanelCategories.TRUSTEDDEVICE,
          Action: MixpanelActions.CLICKED,
          Label: '',
        });

        const req = {
          store: store,
          body: { platform: 'mobile', deviceId: store.appStore.trustedDeviceId },
        };

        const response = await API(ApiEndPoint.REMOVE_TRUSTED_DEVICE, req);
        if (response.data.resultCode === 'C001') {
          store.appStore.setTrustedDeviceId('');
          store.appStore.setTrusted(false);
          await setAsValue('trustedDeviceId', '');
        } else {
          store.uiStore.apiErrorInit({
            code: response.status,
            message: response.data?.resultMessage,
          });
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View accessible={true} testID={testID} accessibilityLabel={testID}>
      <Modal
        style={{
          backgroundColor: 'transparent',
        }}
        onSwipeComplete={() => {
          toggleModal();
        }}
        swipeThreshold={10}
        hideModalContentWhileAnimating={true}
        isVisible={isModalVisible}
        animationOutTiming={300}
        useNativeDriver={true}
        animationIn={animationIn}
        onBackdropPress={toggleModal}
        animationOut={animationOut}>
        <View key="main" style={styles.main}>
          <View key="parentWhite" style={styles.parentWhite}>
            <View key="NavHeader" style={styles.NavHeader}>
              <NavHeader
                permissions={permissions}
                onSubjectSelect={() => {
                  toggleModal();
                  store.uiStore.setSubjectChanges(true);
                  navigation.navigate(ScreenNames.SelectSubjectScreen, { fromNavHeader: true });
                }}
                onPress={() => {
                  auth.trackEvent(
                    'mixpanel',
                    MixpanelEvents.MENU_PROFILE_IMAGE,
                    {
                      Category: MixpanelCategories.HAMBURGER,
                      Action: MixpanelActions.CLICKED,
                      Label: '',
                    },
                  );
                  toggleModal();
                  navigation.navigate(ScreenNames.ProfileScreen);
                }}
              />
            </View>
            <View key="parentBlue" style={styles.parentBlue}>
              <SVGImageBackground SvgImage="bgDrawer" themeBased screenBg>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  indicatorStyle="white"
                  persistentScrollbar={true}
                  style={styles.scrollViewStyle}>
                  {permissions.home && (
                    <CopilotStep
                      text="To visit the Home page, click here."
                      order={3}
                      name="Home">
                      <WalkthroughableView>
                        <MenuItem
                          SvgIcon={HomeMenuIcon}
                          ActiveIcon={HomeMenuActiveIcon}
                          label={homeText}
                          isActive={false}
                          callback={() => {
                            auth.trackEvent(
                              'mixpanel',
                              MixpanelEvents.GO_TO_HOME,
                              {
                                Category: MixpanelCategories.HAMBURGER,
                                Action: MixpanelActions.CLICKED,
                                Label: '',
                              },
                            );
                            toggleModal();
                          }}
                        />
                      </WalkthroughableView>
                    </CopilotStep>
                  )}
                  {permissions.starredQuestions && (
                    <CopilotStep
                      text="You can bookmark questions that you wish to revisit. Access them from here."
                      order={4}
                      name="StaredQuestion">
                      <WalkthroughableView>
                        <MenuItem
                          SvgIcon={SaveIcon}
                          ActiveIcon={SaveActiveIcon}
                          label={staredPularText}
                          isActive={true}
                          callback={() => {
                            auth.trackEvent(
                              'mixpanel',
                              MixpanelEvents.STARRED_QUESTION,
                              {
                                Category: MixpanelCategories.HAMBURGER,
                                Action: MixpanelActions.CLICKED,
                                Label: '',
                              },
                            );
                            toggleModal();
                            navigation.navigate(ScreenNames.StarredQuestionsScreen);
                          }}
                        />
                      </WalkthroughableView>
                    </CopilotStep>
                  )}

                  {permissions.mailbox && (
                    <CopilotStep
                      text="Share your doubts here and get support from our academic experts."
                      order={5}
                      name="Message">
                      <WalkthroughableView>
                        <MenuItem
                          SvgIcon={MessageIcon}
                          ActiveIcon={MessageActiveIcon}
                          label={askADoubt}
                          isActive={false}
                          callback={() => {
                            auth.trackEvent(
                              'mixpanel',
                              MixpanelEvents.MESSAGES,
                              {
                                Category: MixpanelCategories.HAMBURGER,
                                Action: MixpanelActions.CLICKED,
                                Label: '',
                              },
                            );
                            toggleModal();
                            navigation.navigate(ScreenNames.MailBoxScreen);
                          }}
                        />
                      </WalkthroughableView>
                    </CopilotStep>
                  )}
                  {permissions.leaderboard && (
                    <MenuItem
                      SvgIcon={LeaderboardHigher}
                      ActiveIcon={SettingActiveIcon}
                      label={leaderboardLabelText}
                      isActive={false}
                      callback={() => {
                        toggleModal();
                        navigation.navigate(ScreenNames.Leaderboard);
                      }}
                    />
                  )}
                  <CopilotStep
                    text="Love using Mindspark? Let us know here!."
                    order={6}
                    name="Feedback">
                    <WalkthroughableView>
                      <MenuItem
                        SvgIcon={FeedbackIcon}
                        ActiveIcon={FeedbackIcon}
                        label={feedback}
                        isActive={false}
                        callback={() => {
                          onFeedbackCTA();
                        }}
                      />
                    </WalkthroughableView>
                  </CopilotStep>
                 
                  {permissions.reward && (
                    <CopilotStep
                      text="Ace questions and earn exciting badges and titles. Click here to check what you have earned."
                      order={7}
                      name="Rewards">
                      <WalkthroughableView>
                        <MenuItem
                          SvgIcon={RewardsIcon}
                          ActiveIcon={RewardsActiveIcon}
                          label={rewardLabelText}
                          isActive={false}
                          callback={() => {
                            auth.trackEvent(
                              'mixpanel',
                              MixpanelEvents.GO_TO_REWARDS,
                              {
                                Category: MixpanelCategories.HAMBURGER,
                                Action: MixpanelActions.CLICKED,
                                Label: '',
                              },
                            );
                            toggleModal();
                            navigation.navigate(ScreenNames.RewardsScreen);
                          }}
                        />
                      </WalkthroughableView>
                    </CopilotStep>
                  )}
                  {permissions.profile && (
                    <CopilotStep
                      text="View and update your profile details here."
                      order={8}
                      name="Profile">
                      <WalkthroughableView>
                        <MenuItem
                          SvgIcon={SettingIcon}
                          ActiveIcon={SettingActiveIcon}
                          label={profileLabelText}
                          isActive={false}
                          callback={() => {
                            auth.trackEvent(
                              'mixpanel',
                              MixpanelEvents.PROFILES,
                              {
                                Category: MixpanelCategories.HAMBURGER,
                                Action: MixpanelActions.CLICKED,
                                Label: '',
                              },
                            );
                            toggleModal();
                            navigation.navigate(ScreenNames.ProfileScreen);
                          }}
                        />
                      </WalkthroughableView>
                    </CopilotStep>
                  )}
                  {store?.uiStore?.menuDataPermissions?.home?.notification && (
                    <MenuItem
                      SvgIcon={Notification_Icon}
                      ActiveIcon={SettingActiveIcon}
                      label={notificationPlural}
                      isActive={false}
                      callback={() => {
                        auth.trackEvent('mixpanel', MixpanelEvents.GO_TO_HELP, {
                          Category: MixpanelCategories.HAMBURGER,
                          Action: MixpanelActions.CLICKED,
                          Label: '',
                        });
                        toggleModal();
                        clickedMenuItem('notification');
                      }}
                      notificationCount={
                        store?.appStore?.userData?.notificationCount
                      }
                    />
                  )}
                  {store.uiStore.menuDataPermissions?.home?.contentPreview && (
                    <MenuItem
                      SvgIcon={Preview_Icon}
                      ActiveIcon={SettingActiveIcon}
                      label={previewText}
                      isActive={false}
                      callback={() => {
                        auth.trackEvent(
                          'mixpanel',
                          MixpanelEvents.GO_TO_PREVIEW,
                          {
                            Category: MixpanelCategories.HOME,
                            Action: MixpanelActions.CLICKED,
                            Label: '',
                          },
                        );
                        toggleModal();
                        navigation.navigate(ScreenNames.PreviewQnASearchScreen);
                      }}
                    />
                  )}
                   <CopilotStep
                    text="Love using Mindspark? Let us know here!."
                    order={9}
                    name="Privacy Policy">
                    <WalkthroughableView>
                      <MenuItem
                        SvgIcon={PrivacyPolicy}
                        ActiveIcon={PrivacyPolicy}
                        label={privacyPolicy}
                        isActive={false}
                        callback={() => {
                          onPrivacyPolicy();
                        }}
                      />
                    </WalkthroughableView>
                  </CopilotStep>

                  <MenuItem
                    SvgIcon={LogoutIcon}
                    ActiveIcon={LogoutActiveIcon}
                    label={logoutLableText}
                    isActive={false}
                    callback={async () => {
                      removeTrustedDevice();
                      auth.trackEvent('mixpanel', MixpanelEvents.LOGOUT_USER, {
                        Category: MixpanelCategories.HAMBURGER,
                        Action: MixpanelActions.CLICKED,
                        Label: '',
                      });
                      toggleModal();
                      store.appStore.setRewardData();
                      store.loginStore.setVernacularUser(false);
                      auth.logout();
                      store.loginStore.setSkipOnBoardingScreen(true);
                      logoutHandler("normal");
                      
                    }}
                  />
                </ScrollView>
              </SVGImageBackground>
            </View>
            <View style={styles.btmRightAnimContainer}>
              <SimpleLottie theme={theme.name} jsonFileName="drawerAnimation" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

NavMenu.propTypes = {
  testID: PropTypes.string,
  isModalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  clickedMenuItem: PropTypes.func.isRequired,
  mascotName: PropTypes.string,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  buttonText: PropTypes.string,
};
NavMenu.defaultProps = {
  testID: 'NavMenu',
  isModalVisible: false,
  animationIn: 'fadeInLeftBig',
  animationOut: 'fadeOutLeftBig',
  buttonText: 'Okay',
};

export default NavMenu