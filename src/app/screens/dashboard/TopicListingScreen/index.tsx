/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  TopicListingContent,
  BalooThambiRegTextView,
  RoundedButton,
  Buddy,
  CommonHeader,
  SVGImageBackground,
  DashboardFooter,
} from '@components';
import { useStores } from '@mobx/hooks';
import { API } from '@api';
import styles from './indexCss';
import { ONE_ICON } from '@images';
import { useLanguage } from '@hooks';
import { getWp, getHp, screenLogging, deviceInfo } from '@utils';
import { AuthContext } from '@contexts/auth-context';
import {
  MixpanelCategories,
  MixpanelEvents,
  MixpanelActions,
  ApiEndPoint,
  ScreenNames,
} from '@constants';
import { useBackHandler } from '@react-native-community/hooks';

const TopicListingScreen = props => {
  const store = useStores();
  const { appStore, uiStore } = useStores();
  const [allTopics, setAllTopics] = useState([]);
  const [sectionedTopic, setSectionedTopic] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFired, searchQueryFired] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isFreetrialUser, setIsFreetrialUser] = useState(false);
  const auth = useContext(AuthContext);

  const {
    activeTopicsLabel,
    otherTopicsLabel,
    topicSearchEmptystateText,
    topicEmptyStateText,
    goHomeBtnText,
  } = useLanguage();

  const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.topicList : {};

  let activeT = [];
  let otherT = [];

  let response;

  const crashLog = () => {
    screenLogging('TopicListingScreen', appStore?.userData);
  };

  useBackHandler(() => {
    return props.navigation.goBack();
  });

  useEffect(() => {
    (async () => {
      const req = {
        body: {},
        store,
      };
      try {
        store.uiStore.setSpecificLoader(true);

        let apiUrl = '';
        apiUrl = ApiEndPoint.GET_MY_TOPICS;

        response = await API(apiUrl, req);
        if (response.data.resultCode === 'C001') {
          setAllTopics(response.data.topicList);
          if (response.data.topicList.length === 0) {
            store.uiStore.setSpecificLoader(false);
          }
          let freeTrialUser = response.data.userInformation.isFreeTrail;
          setIsFreetrialUser(freeTrialUser);
          console.log('\nresponse.length\n', response.data.topicList.length);
          //Find if priority topic
          let priorityTopic = [];
          activeT = [];
          otherT = [];

          response.data.topicList.forEach(item => {
            if (item.contentStatus === 'active') {
              activeT.push(item);
            }

            if (item.contentStatus === 'deactive') {
              otherT.push(item);
            }

            if (item.priority === true) {
              priorityTopic.push(item);
            }
          });
          priorityTopic && store.qnaStore.setPriorityTopic(priorityTopic);
          setSectionList(activeT, otherT);
          store.uiStore.setSpecificLoader(false);
        } else {
          store.uiStore.setSpecificLoader(false);
          if (
            response.status &&
            response.data?.resultMessage &&
            response.data?.resultMessage != ''
          ) {
            store.uiStore.apiErrorInit({
              code: response.status,
              message: response.data?.resultMessage,
            });
          }
        }
      } catch (e) {
        store.uiStore.setSpecificLoader(false);
        console.log(`Topic list error>>>${e}`);
      }
      crashLog();
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => { setSearchQuery(''); searchQueryFired(false); }, []),
  );


  useEffect(() => {
    let activeT = allTopics.filter(item => {
      return (
        item?.contentStatus === 'active' &&
        item?.contentName
          ?.toLocaleUpperCase()
          .indexOf(searchQuery.toLocaleUpperCase()) != -1
      );
    });
    let otherT = allTopics.filter(item => {
      return (
        item?.contentStatus === 'deactive' &&
        item?.contentName
          ?.toLocaleUpperCase()
          .indexOf(searchQuery.toLocaleUpperCase()) != -1
      );
    });
    setSectionList(activeT, otherT);
  }, [allTopics, searchQuery]);

  const setSectionList = (activeT, otherT) => {
    let section;
    let activeTitle = activeTopicsLabel;
    let otherTitle = otherTopicsLabel;

    if (
      isSearchFired &&
      activeT !== null &&
      activeT.length < 1 &&
      otherT !== null &&
      otherT.length < 1
    ) {
      activeT.push({
        title: topicSearchEmptystateText,
        isEmpty: true,
        searchEmpty: true,
      });
      activeTitle = '';

      otherT.push({ title: '', isEmpty: true });
      otherTitle = '';
    } else {
      if (activeT !== null && activeT.length < 1) {
        activeT.push({ title: '', isEmpty: true });
        activeTitle = '';
      }
      if (otherT !== null && otherT.length < 1) {
        otherT.push({ title: '', isEmpty: true });
        otherTitle = '';
      }
    }

    section = [
      {
        title: activeTitle,
        data: activeT,
      },
      {
        title: otherTitle,
        data: otherT,
      },
    ];
    setSectionedTopic(section);
  };

  const onSearchChange = val => {
    setSearchQuery(val);
    searchQueryFired(true);
  };

  const headerBtnClickHandler = () => {
    auth.trackEvent('mixpanel', MixpanelEvents.GO_BACK_TO_HOME_FROM_TOPIC, {
      Category: MixpanelCategories.TOPIC,
      Action: MixpanelActions.CLICKED,
      Label: ``,
    });
    props.navigation.navigate(ScreenNames.DashboardScreen);
  };

  return (
    <View style={{ flex: 1 }}>
      <SVGImageBackground testID="SVGImageBackgroundListingDashboard" SvgImage="bgDashboard" themeBased screenBg>
        <CommonHeader testID="HeaderListing" type={'home'} onClick={headerBtnClickHandler} headerBtnType="home" />
        <View style={{ flex: 1 }}>
          <View style={[styles.contentContainer, { marginBottom: deviceInfo() == 'Ipad' || deviceInfo() == 'Tablet' ? getHp(footerHeight - 80) : getHp(footerHeight - 30) }]}>
            <Buddy style={{ position: 'absolute', top: -45, right: 5 }} />
            {allTopics.length === 0 ? (
              <View style={styles.emptyContainer}>
                <ONE_ICON
                  accessible={true}
                  testID="TopicListingONEImage"
                  accessibilityLabel="TopicListingONEImage"
                  width={getWp(150)}
                  style={styles.emptyStateIcon}
                />
                {store.uiStore.specificLoader === false && (
                  <BalooThambiRegTextView
                    testID="TopicListingEmptyStateText"
                    style={styles.textColor}>
                    {topicEmptyStateText}
                  </BalooThambiRegTextView>
                )}
                {store.uiStore.specificLoader === false && (
                  <RoundedButton
                    testID="RoundedButtonTopicListingGoHomeBtnTex"
                    onPress={() => {
                      props.navigation.navigate(ScreenNames.DashboardScreen);
                    }}
                    type="primaryOrange"
                    text={goHomeBtnText}
                    width={150}
                    containerStyle={{ ...styles.goHomeBtnContainer }}
                  />
                )}
              </View>
            ) : (
              <TopicListingContent
                testID="TopicListingContentTopicListingScreen"
                sectionList={sectionedTopic}
                onSearch={onSearchChange}
                isSearchFired={isSearchFired}
                searchQuery={searchQuery}
                searchQueryFired={searchQueryFired}
                permissions={permissions}
                freeTrialUser={isFreetrialUser}
              />
            )}
          </View>
        </View>
        <View onLayout={(event) => {
          var { height } = event.nativeEvent.layout;
          setFooterHeight(height)
        }}>
          <DashboardFooter
            footerOnPress={() => {
              auth.trackEvent('mixpanel', MixpanelEvents.GO_TO_HOME_FOOTER_PROFILE, { Category: MixpanelCategories.PROFILE, Action: MixpanelActions.CLICKED, Label: '' });
              props.navigation.navigate(ScreenNames.ProfileScreen);
            }}
            permissions={Object.keys(uiStore.menuDataPermissions).length > 0 ? uiStore.menuDataPermissions.home : {}}
            containerStyle={{ position: 'relative' }}
          />
        </View>
      </SVGImageBackground>
    </View>
  );
};

TopicListingScreen.propTypes = {};

TopicListingScreen.defaultProps = {};
export default TopicListingScreen;
