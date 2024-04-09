// External Imports
import React, { useState, useEffect, Fragment } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { useLanguage } from '@hooks';
import { screenLogging } from '@utils';

// Internal Imports
import { BalooThambiRegTextView, DetailsScreen } from '@components';
import { Leaderboard } from '@hoc';
import { API } from '@api';
import styles from './style';
import { useBackHandler } from '@react-native-community/hooks';
import { MixpanelEvents, ApiEndPoint } from '@constants';

const LeaderboardScreen = props => {
  const store = useStores();
  const { isVernacularUser } = store.loginStore;
  const { leaderBoardStore } = store;
  const [selected, setSelected] = useState(0);
  const [isEveryCountZero, setIsEveryCountZero] = useState(false);
  const {
    yourSection,
    yourCity,
    yourCountry,
    leaderboardLabelText,
    sectionLeaderBoardEmpty,
    cityLeaderBoardEmpty,
    worldLeaderBoardEmpty,
    yourDistrict,
    yourNationalRanking,
  } = useLanguage();
  
  const [filterItems, setFilterItem] = useState([
    {
      id: '1',
      title: yourSection,
      selectedTab: 'yourSection',
    },
  ]);

  let countryObj = {
    id: '3',
    title: isVernacularUser ? yourNationalRanking : yourCountry,
    selectedTab: 'yourCountry',
  };

  let cityObj = {
    id: '2',
    title: isVernacularUser ? yourDistrict : yourCity,
    selectedTab: isVernacularUser ? 'yourDistrict' : 'yourCity',
  };

  let leaderPermission = store.uiStore.menuDataPermissions;

  const permissions = Object.keys(leaderPermission).length > 0 ? leaderPermission.leaderBoard : {};

  useEffect(() => {
    screenLogging('Leaderboard screen');
    if (permissions.yourCity || permissions?.cityLeaderBoardEnabled) {
      filterItems.push(cityObj);
    }

    if (permissions.yourCountry || permissions?.countryLeaderBoardEnabled) {
      filterItems.push(countryObj);
    }
  }, []);

  useEffect(() => {
    leaderBoardStore.reset();
    fetchLeaderboard(1);
  }, [selected]);

  useBackHandler(() => { return props.navigation.navigate(ScreenNames.DashboardScreen); });

  const fetchLeaderboard = async index => {
    try {
      if (index !== 1) {
        if (typeof leaderBoardStore?.currentPage !== 'undefined') {
          index = leaderBoardStore?.currentPage + 1;
          if (index > leaderBoardStore.totalPages) return;
        } else return;
      }

      const selectedTab = filterItems[selected]?.selectedTab;
      const req = {
        body: {
          selectedTab: selectedTab,
          index: index,
          startFrom: (index - 1) * 50 + 1,
          limit: 50,
        },
        store: store,
      };

      const response = await API(ApiEndPoint.UPDATED_GET_LEADERBOARD_INFO, req);
      if (response?.data?.resultCode === 'C001') {
        setIsEveryCountZero(response?.data.groupSparkieData.every(item => item.count == 0),);
        if (index === 1) {
          leaderBoardStore.init(response?.data);
        }
        else {
          leaderBoardStore.setGroupSparkieData(leaderBoardStore?.groupSparkieData.concat(response?.data?.groupSparkieData,),);
          leaderBoardStore.setPaginationDetails(response?.data);
        }
      }
    } catch (ex) {
      console.log('Leaderboard Error>>>', ex);
    }
  };

  const renderLeaderboardSection = () => {
    if (leaderBoardStore?.groupSparkieData === undefined || leaderBoardStore?.groupSparkieData.length === 0 || isEveryCountZero)
      return (
        <View style={styles.emptyMessageContainer}>
          <BalooThambiRegTextView
            testID="LeaderBoardEmptyTxt"
            style={styles.emptyMessageText}>
            {selected === 0 ? sectionLeaderBoardEmpty : selected === 1 ? cityLeaderBoardEmpty : worldLeaderBoardEmpty}
          </BalooThambiRegTextView>
        </View>
      );
    return (
      <Leaderboard
        testID="leaderBoardScreen"
        permissions={permissions}
        onEndReached={fetchLeaderboard}
        type={filterItems[selected]?.selectedTab}
      />
    );
  };

  const selectTabs = index => {
    setSelected(index);
    var sectionSelected = '';
    switch (index) {
      case 0:
        sectionSelected = MixpanelEvents.SECTION_LEADERBOARD;
        break;
      case 1:
        sectionSelected = MixpanelEvents.CITY_LEADERBOARD;
        break;
      default:
        sectionSelected = MixpanelEvents.WORLD_LEADERBOARD;
        break;
    }
    screenLogging((sectionSelected + ' screen'));
  };

  const renderSectionItem = ({ item, index }) => {
    return (
      <Fragment>
        <TouchableOpacity onPress={() => selectTabs(index)}>
          <View
            style={[
              styles.filterItemStyle,
              selected === index && styles.selectedFilterItemStyle,
            ]}>
            <BalooThambiRegTextView
              testID={`LeaderBoardTitleText${item.id}`}
              style={[
                styles.textStyle,
                selected === index && styles.selectedTextStyle,
              ]}>
              {item?.title}
            </BalooThambiRegTextView>
          </View>
        </TouchableOpacity>
      </Fragment>
    );
  };

  const headerBtnClickHandler = () => {
    props.navigation.goBack();
  };

  return (
    <DetailsScreen
      testID="DetailsScreenLeaderBoardBackBtn"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      footerContainerStyle={styles.footerContainerStyle}>
      <BalooThambiRegTextView
        testID="DetailsScreenLeaderBoardLabel"
        style={styles.titleStyle}>
        {leaderboardLabelText}
      </BalooThambiRegTextView>
      <View style={styles.listContainerStyle}>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          showsHorizontalScrollIndicator={false}
          data={filterItems}
          renderItem={renderSectionItem}
          horizontal={true}
        />
      </View>
      {permissions?.sparkieLeaderboard && renderLeaderboardSection()}
    </DetailsScreen>
  );
};

export default observer(LeaderboardScreen);
