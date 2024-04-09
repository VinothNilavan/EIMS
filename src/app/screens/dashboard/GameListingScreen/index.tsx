/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { screenLogging, getWp } from '@utils';
import {
  GameListingContent,
  BalooThambiRegTextView,
  RoundedButton,
  SVGImageBackground,
  DashboardFooter,
  CommonHeader,
} from '@components';

import Orientation from 'react-native-orientation-locker';
import { API } from '@api';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';

import {
  ApiEndPoint,
  ScreenNames,
  MixpanelCategories,
  MixpanelEvents,
  MixpanelActions,
} from '@constants';
import styles from './indexCss';
import { GameEmptyState8 } from '@images';
import { useLanguage } from '@hooks';
import { AuthContext } from '@contexts/auth-context';
import { useBackHandler } from '@react-native-community/hooks';

const GameListingScreen = props => {
  const [gameList, setGameList] = useState([]);
  const [newGameList, setNewGameList] = useState([]);
  const store = useStores();
  const { appStore, uiStore } = useStores();
  const auth = useContext(AuthContext);
  const {
    playedGamesLabel,
    latestGamesLabel,
    lockedGamesLabel,
    noGamesAssignedText,
    goHomeBtnText,
  } = useLanguage();

  const [showMoreObj, setShowMoreObj] = useState({
    attempted: -1,
    unattempted: -1,
    locked: -1,
  });
  const [shouldScroll, setShouldScroll] = useState(false);

  const init = async () => {
    try {
      const req = { body: {}, store };
      const res = await API(ApiEndPoint.LIST_ACTIVITY, req);
      if (res.data.resultCode == 'C001') {
        let tempList = [];
        let newTempList = [];
        let showMoreObjTemp = showMoreObj;
        console.log('After:', JSON.stringify(showMoreObj));
        Object.keys(res.data.activityList).forEach(key => {
          let gameCategoryList = res.data.activityList[key];
          let keyName = '';
          let order = -1;
          let index = 0;
          if (key == 'attempted') {
            keyName = playedGamesLabel;
            order = 1;
          }
          if (key == 'unattempted') {
            keyName = latestGamesLabel;
            order = 3;
            index = 2;
          }
          if (key == 'locked') {
            keyName = lockedGamesLabel;
            order = 2;
            index = 1;
          }
          if (gameCategoryList.length <= 3) {
            showMoreObjTemp[key] = -1;
          } else {
            showMoreObjTemp[key] = 0;
          }

          tempList.push({
            data: gameCategoryList,
            lessData:
              gameCategoryList.length > 3
                ? gameCategoryList.slice(0, 3)
                : gameCategoryList,
            showMoreBtn: gameCategoryList.length > 3 ? true : false,
            hideBtn: gameCategoryList.length > 3 ? false : true,
            title: keyName,
            key: key,
            order: order,
            index: index,
          });
          newTempList.push({
            data:
              gameCategoryList.length > 3
                ? gameCategoryList.slice(0, 3)
                : gameCategoryList,
            showMoreBtn: gameCategoryList.length > 3 ? true : false,
            hideBtn: gameCategoryList.length > 3 ? false : true,
            title: keyName,
            key: key,
            order: order,
            index: index,
          });
        });
        tempList.sort((a, b) => {
          return a.order > b.order;
        });
        newTempList.sort((a, b) => {
          return a.order > b.order;
        });
        setGameList(tempList);
        setNewGameList(newTempList);
        setShowMoreObj(showMoreObjTemp);
      } else {
        if (
          res.status &&
          res.data?.resultMessage &&
          res.data?.resultMessage != ''
        ) {
          store.uiStore.apiErrorInit({
            code: res.status,
            message: res.data?.resultMessage,
          });
        }
      }
    } catch (error) {
      console.warn('ERROR>', JSON.stringify(error));
    }
  };

  useBackHandler(() => {
    return props.navigation.navigate(ScreenNames.DashboardScreen);
  });

  useEffect(() => {
    Orientation.lockToPortrait();
    screenLogging('Game listing screen', appStore?.userData);
    init();
  }, []);

  const toggleMoreOrLess = (key, index) => {
    try {
      let tempObj = { ...showMoreObj };
      let tempList = newGameList;
      let itemIndex = 0;
      let sectionIndex = 0;
      if (key == 'unattempted') {
        sectionIndex = 1;
      } else {
        sectionIndex = 2;
      }
      if (showMoreObj[key] == 0) {
        tempObj[key] = 1;
        tempList[index].data = gameList[index].data;
        itemIndex = gameList[index].data.length - 1;
      } else {
        tempObj[key] = 0;
        tempList[index].data = gameList[index].lessData;
        itemIndex = gameList[index].lessData.length - 1;
      }
      setNewGameList(tempList);
      setShowMoreObj(tempObj);
      setShouldScroll({
        animated: true,
        itemIndex: itemIndex,
        sectionIndex: sectionIndex,
        viewPosition: 1,
      });
    } catch (err) {
      console.log('toggleMoreOrLess : ', err);
    }
  };

  const headerBtnClickHandler = () => {
    props.navigation.navigate(ScreenNames.DashboardScreen);
  };

  return (
    <View style={styles.flexOne}>
      <SVGImageBackground
        testID="SVGImageBackgroundListingDashboard"
        SvgImage="bgDashboard"
        themeBased
        screenBg>
        <CommonHeader
          testID="HeaderListing"
          type={'home'}
          onClick={headerBtnClickHandler}
          headerBtnType="home"
        />
        <View style={styles.contentContainer}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollViewContainer}>
            {newGameList && newGameList.length > 0 ? (
              <View>
                <GameListingContent
                  gameList={newGameList}
                  showMoreObj={showMoreObj}
                  toggleMoreOrLess={toggleMoreOrLess}
                  shouldScroll={shouldScroll}
                />
                <View style={styles.bottomView} />
              </View>
            ) : (
              <View>
                <GameEmptyState8
                  accessible={true}
                  testID="GameListingGameEmptyState8"
                  accessibilityLabel="GameListingGameEmptyState8"
                  width={getWp(150)}
                  style={styles.searchIcon}
                />
                <BalooThambiRegTextView
                  testID="GameListingNoGamesAssignedText"
                  style={styles.errorText}>
                  {noGamesAssignedText}
                </BalooThambiRegTextView>
                <RoundedButton
                  testID="RoundedButtonGameListingGoHomeBtn"
                  onPress={() => {
                    props.navigation.navigate(ScreenNames.DashboardScreen);
                  }}
                  type="primaryOrange"
                  text={goHomeBtnText}
                  width={150}
                  containerStyle={{ ...styles.goHomeBtnContainer }}
                />
              </View>
            )}
          </ScrollView>
        </View>
        <DashboardFooter
          footerOnPress={() => {
            auth.trackEvent(
              'mixpanel',
              MixpanelEvents.GO_TO_HOME_FOOTER_PROFILE,
              {
                Category: MixpanelCategories.PROFILE,
                Action: MixpanelActions.CLICKED,
                Label: '',
              },
            );
            props.navigation.navigate(ScreenNames.ProfileScreen);
          }}
          permissions={
            Object.keys(uiStore.menuDataPermissions).length > 0
              ? uiStore.menuDataPermissions.home
              : {}
          }
        />
      </SVGImageBackground>
    </View>
  );
};

GameListingScreen.propTypes = {};

GameListingScreen.defaultProps = {};
export default observer(GameListingScreen);