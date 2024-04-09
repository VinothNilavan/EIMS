import React, { useEffect, useState, useContext } from 'react';
import styles from './indexCss';
import { View, FlatList } from 'react-native';
import { screenLogging, ScreenNames } from '@utils';
import { BadgeList, TitleList, RewardShowcase, AppliedReward, RewardCollectionModal, CertificateList } from '@hoc';
import { observer } from 'mobx-react';
import { API } from '@api';
import { useStores } from '@mobx/hooks';
import { ApiEndPoint, REWARD_TYPES, REWARD_TYPES_CATEGORY, STRINGS, REWARD_TYPES_CATEGORY_CERTIFICATES, MixpanelCategories, MixpanelEvents, MixpanelActions } from '@constants';
import { RewardTabs } from './rewardTabs';
import { AuthContext } from '@contexts/auth-context';
import { ThemeContext } from '@contexts/theme-context';
import { useLanguage } from '@hooks';
import { useBackHandler } from '@react-native-community/hooks';
import { SnackBar, DetailsScreen, SimpleLottie } from '@components'

const RewardsScreen = props => {
  const theme = useContext(ThemeContext);
  const store = useStores();
  const auth = useContext(AuthContext);
  const defaultTab = props?.route?.params?.tab;
  const certificateDetails = props?.route?.params?.certificateDetails;
  const fromDashboardScreen = props?.route?.params?.fromDashboardScreen;
  const { appStore } = useStores();
  const { profileDetails } = appStore.userData;
  const { uiStore } = useStores();

  const { badgesLabel, titleLabel, certificatesLabel } = useLanguage();
  const [SelecteTab, setSelectedTab] = useState(defaultTab ? defaultTab : REWARD_TYPES.CERTIFICATES);
  const [rewardShowCaseDetails, setRewardShowCaseDetails] = useState({
    type: '',
    item: undefined,
  });
  const [showAppliedStatus, setShowAppliedStatus] = useState(false);
  const [filterRewardTypes, setFilterRewardTypes] = useState([
    {
      id: 0,
      title: badgesLabel,
      type: REWARD_TYPES.BADGES,
    },
    {
      id: 1,
      title: titleLabel,
      type: REWARD_TYPES.TITLES,
    },
    {
      id: 2,
      title: certificatesLabel,
      type: REWARD_TYPES.CERTIFICATES,
    }
  ]);

  const [currentRewardTab, setCurrentRewardTab] = useState(filterRewardTypes[2]);

  const [rewardModal, setRewardModal] = useState(false);

  useEffect(() => {
    screenLogging('My Rewards screen', appStore?.userData);
    (async () => {
      let certificatePermission = Object.keys(uiStore.menuDataPermissions).length > 0 ? uiStore.menuDataPermissions.reward.myCertificate : false;
      if (certificatePermission && defaultTab == REWARD_TYPES.CERTIFICATES) {
        setCurrentRewardTab(filterRewardTypes[2]);
      }
      if (!certificatePermission) {
        filterRewardTypes.splice(2, 1);
        setCurrentRewardTab(filterRewardTypes[0]);
        setSelectedTab(REWARD_TYPES.BADGES);
        await fetchRewards();
        return;
      }
      await fetchRewards(SelecteTab);
    })();
  }, []);

  useBackHandler(() => { return props.navigation.navigate(ScreenNames.DashboardScreen); });

  const showcaseRewardHighlight = (type, userReward) => {
    // sorting earned , ongoing and upcoming.
    const keys = Object.keys(userReward).sort();

    var displayItem = undefined;
    var cateType = undefined;
    for (let keyItem of keys) {
      const rewardItem = userReward[keyItem];
      cateType = keyItem;
      // if earned/ongoing/upcoming having valid objects then taking respective first obj.
      if (rewardItem && rewardItem.length > 0) {
        displayItem = rewardItem[0];
        break;
      }
    }
    setRewardShowCaseDetails({ item: { ...displayItem, category: cateType}, type });
  }

  const fetchRewards = async (type = REWARD_TYPES.BADGES, selectedRewardShowCase = true) => {
    const req = {
      body: { type },
      store: store
    };
    try {
      const response = await API(ApiEndPoint.GET_REWARD_INFO, req);
      if (response.data.resultCode === 'C001') {
        let userReward = response.data.userRewardInfo[type];
        if (type == REWARD_TYPES.CERTIFICATES) {
          let appliedStarCertificate = userReward?.star?.length == 0 ? undefined : userReward?.star?.find(certificate => certificate.isApplied) || undefined;
          if (certificateDetails?.category && fromDashboardScreen) {
            let rewardDetails;
            if (certificateDetails.category == REWARD_TYPES_CATEGORY_CERTIFICATES.STAR) {
              rewardDetails = userReward?.star?.length == 0 ? undefined : userReward?.star?.find(certificate => certificate?.certificateID == certificateDetails?.starCertificate?.certificateID);
            } else {
              rewardDetails = userReward?.champ?.length == 0 ? undefined : userReward?.champ?.find(certificate => certificate?.certificateID == certificateDetails?.champCertificate?.certificateID);
            }
            setRewardShowCaseDetails({ item: { ...rewardDetails, category: certificateDetails.category }, type });
          } else {
            if (appliedStarCertificate) {
              setRewardShowCaseDetails({ item: { ...appliedStarCertificate, category: REWARD_TYPES_CATEGORY_CERTIFICATES.STAR }, type });
            } else {
              let appliedChampCertificate = userReward?.champ?.length == 0 ? undefined : userReward?.champ?.find(certificate => certificate.isApplied) || undefined;
              if (appliedChampCertificate) {
                setRewardShowCaseDetails({ item: { ...appliedChampCertificate, category: REWARD_TYPES_CATEGORY_CERTIFICATES.CHAMP }, type });
              }
            }
          }
        } else {
          showcaseRewardHighlight(type, userReward);
        }

        let newRewardData = { ...store.appStore.rewardData };
        newRewardData[type] = userReward;
        store.appStore.setRewardData(newRewardData);
      } else {
        store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
      }
    } catch (error) {
      console.log(`Reward Details error>>>${error}`);
    }
  };

  const applyRewards = async (type, Id) => {
    try {
      store.uiStore.setChangedInUserData(true);
      let newRewardData = { ...store.appStore.rewardData };
      let rewardCollections = newRewardData[type].earned
      if (type === REWARD_TYPES.CERTIFICATES) {
        let isApplied = false;
        let isReset = false;
        rewardCollections = newRewardData[type].champ.map(certificateItem => {
          if (certificateItem.isApplied) {
            certificateItem.isApplied = false;
            isReset = true;
          }
          if (certificateItem.certificateID == Id) {
            certificateItem.isApplied = true;
            isApplied = true;
            return certificateItem;
          } else {
            return certificateItem;
          }
        });
        if (!isApplied || !isReset) {
          rewardCollections = newRewardData[type].star.map(certificateItem => {
            if (certificateItem.isApplied) {
              certificateItem.isApplied = false;
            }
            if (certificateItem.certificateID == Id) {
              certificateItem.isApplied = true;
              return certificateItem;
            } else {
              return certificateItem;
            }
          })
        }
      } else {
        rewardCollections = rewardCollections.map(badgeData => {
          if (badgeData.isApplied) {
            badgeData.isApplied = false;
          }
          else if (type == REWARD_TYPES.BADGES) {
            if (badgeData.badgeID == Id) {
              badgeData.isApplied = true;
              return badgeData;
            } else {
              return badgeData;
            }
          } else {
            if (badgeData.titleID == Id) {
              badgeData.isApplied = true;
              if (profileDetails != null && profileDetails.title != null) {
                profileDetails.title.titleName = badgeData?.name;
                profileDetails.title.titleID = badgeData?.titleID;
                profileDetails.title.titleImg = badgeData?.titleIcon;
              }
              return badgeData;
            } else {
              return badgeData;
            }
          }
        });
      }
      store.appStore.setRewardData(newRewardData);
    } catch (err) {
      console.log('Error  = ', err);
    }
  };

  const onSetRewardsClick = async () => {
    let engagementId = rewardShowCaseDetails.item.badgeID;
    let category = null;
    switch (rewardShowCaseDetails.type) {
      case REWARD_TYPES.BADGES:
        engagementId = rewardShowCaseDetails.item.badgeID;
        screenLogging('My Rewards badges', appStore?.userData);
        break;
      case REWARD_TYPES.TITLES:
        engagementId = rewardShowCaseDetails.item.titleID;
        screenLogging('My Rewards titles', appStore?.userData);
        break;
      case REWARD_TYPES.CERTIFICATES:
        engagementId = rewardShowCaseDetails.item.certificateID;
        category = rewardShowCaseDetails?.item?.category == REWARD_TYPES_CATEGORY_CERTIFICATES.CHAMP ? 'Weekly' : 'Monthly'; //pass weekly if it is star and montly if it champ
        screenLogging('My Rewards certificate', appStore?.userData);
        break;
    }

    const req = {
      body: {
        ID: engagementId,
        type: rewardShowCaseDetails.type.slice(0, -1),
        category
      },
      store: store,
    };
    try {
      const response = await API(ApiEndPoint.APPLY_ENGAGEMENT_REWARD, req);
      if (response.data.resultCode === 'C001') {
        setRewardShowCaseDetails({
          type: rewardShowCaseDetails.type,
          item: { ...rewardShowCaseDetails.item, isApplied: true },
        });
        if (rewardShowCaseDetails.type == REWARD_TYPES.CERTIFICATES) {
          let message = STRINGS.applyCertificateMessage.replace('_date_', (rewardShowCaseDetails?.item?.expiryDate) ? rewardShowCaseDetails?.item?.expiryDate : '');
          appStore.setSnackBar({ isVisible: true, title: message })
        }
        await applyRewards(currentRewardTab.type, engagementId);
      } else {
        store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
      }
    } catch (e) {
      console.log('SET_ENGAGEMENT_ERROR - ', JSON.stringify(e));
    }
  };

  const switchTabContent = async renderContent => {
    setCurrentRewardTab(renderContent);
    setSelectedTab(renderContent.type);
    switch (renderContent.type) {
      case REWARD_TYPES.BADGES:
        auth.trackEvent('mixpanel', MixpanelEvents.BADGES_REWARDS, {
          Category: MixpanelCategories.REWARDS,
          Action: MixpanelActions.CLICKED,
          Label: '',
        });
        break;
      case REWARD_TYPES.TITLES:
        auth.trackEvent('mixpanel', MixpanelEvents.TITLES_REWARDS, {
          Category: MixpanelCategories.TITLE,
          Action: MixpanelActions.CLICKED,
          Label: '',
        });
        break;
      case REWARD_TYPES.CERTIFICATES:
        auth.trackEvent('mixpanel', MixpanelEvents.CERTIFICATES_REWARDS, {
          Category: MixpanelCategories.CERTIFICATE,
          Action: MixpanelActions.CLICKED,
          Label: '',
        });
        break;
    }
    setRewardShowCaseDetails({ type: '', item: undefined });
    await fetchRewards(renderContent.type, true);
  };
  return (
    <DetailsScreen
      testID="DetailScreenRewards"
      headerBtnType="back"
      headerBtnClick={props.navigation.goBack}
      footerContainerStyle={styles.footerContainerStyle}>
      <View style={styles.lottieAnimationLeftContainer}>
        <SimpleLottie
          testID="SimpleLottieRewardsDrawerAnimation"
          theme={theme.name}
          jsonFileName="drawerAnimation"
        />
      </View>
      <View style={styles.lottieAnimationRightContainer}>
        <SimpleLottie
          testID="SimpleLottieRewardsDashboardAnimation"
          theme={theme.name}
          jsonFileName="dashboardAnimation"
        />
      </View>
      <View style={styles.childContainer}>
        <View style={styles.rewardShowCaseSection}>
          <RewardShowcase
            testID="rewardShowCaseRewardsDetails"
            rewardShowCaseDetails={rewardShowCaseDetails}
            onSetRewardsClick={onSetRewardsClick}
            fromDashboardScreen={fromDashboardScreen}
          />
        </View>
        <View style={styles.rewardContentSection}>
          <View style={styles.rewardContentFlatListStyle}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={filterRewardTypes}
              renderItem={renderContent => (
                <RewardTabs
                  {...renderContent}
                  testID={renderContent.item.id}
                  onTabTitlePress={() => switchTabContent(renderContent.item)}
                  isActive={currentRewardTab.id == renderContent.item.id}
                />
              )}
              keyExtractor={({ id }) => id}
            />
          </View>
          <View>
            {findRewardsType()}
          </View>
        </View>
        <AppliedReward
          testID="AppliedAwardRewards"
          isVisible={showAppliedStatus}
        />
        <RewardCollectionModal
          testID="CollectionModalRewards"
          isVisible={rewardModal}
          onSkipBtnPressed={() => {
            setRewardModal(false);
          }}
          onStartBtnPressed={() => {
            setRewardModal(false);
          }}
        />
        {appStore.SnackBar.isVisible && <SnackBar />}
      </View>
    </DetailsScreen>
  );

  function findRewardsType() {
    switch (SelecteTab) {
      case REWARD_TYPES.BADGES:
        return <BadgeList
          testID="BadgeListRewards"
          setRewardShowCase={setRewardShowCaseDetails}
          selectedReward={rewardShowCaseDetails}
          heading={''} />;
      case REWARD_TYPES.TITLES:
        return <TitleList
          testID="TitleListRewards"
          setRewardShowCase={setRewardShowCaseDetails}
          selectedReward={rewardShowCaseDetails}
          heading={''} />;
      case REWARD_TYPES.CERTIFICATES:
        return <CertificateList
          testID="CertificateListRewards"
          setRewardShowCase={setRewardShowCaseDetails}
          selectedReward={rewardShowCaseDetails}
          heading={''} />;
    }
  };
}

RewardsScreen.propTypes = {};

RewardsScreen.defaultProps = {};

export default observer(RewardsScreen);
