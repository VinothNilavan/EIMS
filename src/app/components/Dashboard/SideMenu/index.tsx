import React from 'react';
import { View } from 'react-native';
import SideMenuItem from './SideMenuItem';
import {
  Save,
  Message,
  Leaderboard,
  Reward,
  Store,
  Setting,
  Preview,
  Notification,
} from '@images';
import styles from './indexCss';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '@mobx/hooks';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { ScreenNames } from '@constants';
import { useBackHandler } from '@react-native-community/hooks';

const SideMenu = props => {
  const {
    testID,
    containerStyle,
    SvgMessage,
    SvgLeaderboard,
    SvgReward,
    SvgStarredQuestions,
    SvgNotification,
    SvgSetting,
    clickedMenuItem,
    permissions,
  } = props;

  const navigation = useNavigation();
  const store = useStores();

  useBackHandler(() => {
    return props.navigation.navigate(ScreenNames.DashboardScreen);
  });

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{ ...styles.container, ...containerStyle }}>
      <View style={styles.iconContainer}>
        {permissions.starredQuestions && (
          <SideMenuItem
            testID="SideMenuItemSideMenuStarredQuestion"
            SvgItem={SvgStarredQuestions}
            clicked={() => navigation.navigate(ScreenNames.StarredQuestionsScreen)}
          />
        )}
        {permissions.mailbox && (
          <SideMenuItem
            testID="SideMenuItemSideMenuMessage"
            SvgItem={SvgMessage}
            clicked={() => clickedMenuItem('message')}
          />
        )}
        {permissions.leaderboard && (
          <SideMenuItem
            testID="SideMenuItemSideMenuLeaderboard"
            SvgItem={SvgLeaderboard}
            clicked={() => navigation.navigate(ScreenNames.Leaderboard)}
          />
        )}
        {permissions.reward && (
          <SideMenuItem
            testID="SideMenuItemSideMenuReward"
            SvgItem={SvgReward}
            clicked={() => navigation.navigate(ScreenNames.RewardsScreen)}
          />
        )}
        {store?.uiStore?.menuDataPermissions?.home?.notification && (
          <SideMenuItem
            testID="SideMenuItemSideMenuNotification"
            SvgItem={SvgNotification}
            notificationCount={store?.appStore?.userData?.notificationCount}
            clicked={() => clickedMenuItem('notification')}
          />
        )}
        {permissions.profile && (
          <SideMenuItem
            testID="SideMenuItemSideMenuSetting"
            SvgItem={SvgSetting}
            clicked={() => navigation.navigate(ScreenNames.ProfileScreen)}
          />
        )}
        {store.uiStore.menuDataPermissions?.home?.contentPreview && (
          <SideMenuItem
            testID="SideMenuItemSideMenuPreview"
            SvgItem={Preview}
            clicked={() => navigation.navigate(ScreenNames.PreviewQnASearchScreen)}
          />
        )}
      </View>
    </View>
  );
};

SideMenu.propTypes = {
  testID: PropTypes.string,
  containerStyle: PropTypes.func,
  SvgSave: PropTypes.func,
  SvgMessage: PropTypes.func,
  SvgLeaderboard: PropTypes.func,
  SvgReward: PropTypes.func,
  SvgStore: PropTypes.func,
  SvgStarredQuestions: PropTypes.func,
  SvgNotification: PropTypes.func,
  SvgSetting: PropTypes.func,
  clickedMenuItem: PropTypes.func,
};

SideMenu.defaultProps = {
  testID: 'SideMenu',
  SvgSave: Save,
  SvgMessage: Message,
  SvgLeaderboard: Leaderboard,
  SvgReward: Reward,
  SvgStore: Store,
  SvgStarredQuestions: Save,
  SvgSetting: Setting,
  SvgNotification: Notification,
  clickedMenuItem: () => { console.log(`default clickedMenuItem`) },
};

export default observer(SideMenu);
