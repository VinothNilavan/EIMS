/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/**
|--------------------------------------------------
| Dashboard Screen
|--------------------------------------------------
*/
import React, { useState, useContext, useEffect } from 'react';
import { View, Platform } from 'react-native';

import { SurpriseGiftImg } from '@images';
import {
  NavMenu,
  NewMessageModal,
  DashboardFooter,
  SuccessPopup,
  SimpleLottie,
  Shade,
  ShareButton,
} from '@components';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { ThemeContext } from '@contexts/theme-context';
import PropTypes from 'prop-types';
import { NotificationListModal } from '@hoc';
import styles from './indexCss';
import { useLanguage } from '@hooks';
import { useBackHandler } from '@react-native-community/hooks';
import { useCopilot } from 'react-native-copilot';

const ListingScreen = props => {
  const theme = useContext(ThemeContext);
  const { uiStore } = useStores();
  const [showMessage, setShowMessage] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { copilotEvents, start } = useCopilot();
  const { msgSuccessText, thisIsSchoolDeviceBtnText } = useLanguage();

  const {
    testID,
    showSideDrawer,
    headerBtnClick,
    topShadeView,
    bottomShadeView,
    shadeTopContainer,
    shadeBottomContainer,
    footerOnPress,
    fromHome,
  } = props;

  useEffect(() => {
    if (uiStore.showHomepageOverlay === true) {
      start();
    }
    copilotEvents.on('stop', () => {
      uiStore.setShowHomepageOverlay(false);
    });
    return copilotEvents.off('stop');
  }, []);

  useBackHandler(() => {
    console.log('Entered BAck Handlerr : ', showSideDrawer);
    headerBtnClick();
  });

  const clickedMenuItemHandler = item => {
    switch (item) {
      case 'message':
        setShowMessage(true);
        break;
      case 'notification':
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            setShowNotification(true);
          }, 900);
        } else {
          setShowNotification(true);
        }
        break;
    }
  };

  const dashboardFooterVisible = () => {
    if (fromHome) {
      return null;
    } else {
      return (
        <DashboardFooter
          footerOnPress={footerOnPress}
          permissions={
            Object.keys(uiStore.menuDataPermissions).length > 0
              ? uiStore.menuDataPermissions.home
              : {}
          }
        />
      );
    }
  };

  const getShareButton = () => {
    if (fromHome) {
      return <ShareButton />;
    } else {
      return null;
    }
  };

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={styles.container}>
      <View key="innerContainer" style={styles.innerContainer}>
        <View style={styles.subContainer}>
          {props.children}
          {topShadeView && <Shade containerStyle={shadeTopContainer} />}
          {bottomShadeView && (
            <Shade
              containerStyle={shadeBottomContainer}
              imageName="shadeBottom"
            />
          )}
        </View>
      </View>
      <View style={styles.buddy}></View>
      {/* {getShareButton()} */}
      {dashboardFooterVisible()}
      <View style={styles.btmLeftAnimContainer}>
        <SimpleLottie theme={theme.name} jsonFileName="dashboardAnimation" />
      </View>
      <NewMessageModal
        isVisible={showMessage}
        pageId={'contentPage'}
        onSuccess={() => {
          setShowMessage(false);
        }}
        onHide={() => {
          setShowSuccessPopup(true);
        }}
        onclose={() => {
          setShowMessage(false);
        }}
      />
      <NotificationListModal
        isVisible={showNotification}
        onPress={() => setShowNotification(false)}
      />
      <SuccessPopup
        isVisible={!showMessage && showSuccessPopup}
        text={msgSuccessText}
        onPress={() => {
          setShowSuccessPopup(false);
        }}
      />
      <NavMenu
        permissions={
          Object.keys(uiStore.menuDataPermissions).length > 0
            ? uiStore.menuDataPermissions.menu
            : {}
        }
        isModalVisible={showSideDrawer}
        toggleModal={headerBtnClick}
        TopSvg={SurpriseGiftImg}
        buttonText={thisIsSchoolDeviceBtnText}
        clickedMenuItem={clickedMenuItemHandler}
      />
    </View>
  );
};

ListingScreen.propTypes = {
  testID: PropTypes.string,
  headerBtnType: PropTypes.string,
};

ListingScreen.defaultProps = {
  testID: 'ListingScreen',
  headerBtnType: 'menu',
  topShadeView: false,
  bottomShadeView: false,
  footerOnPress: () => {
    console.log('Add footerOnPress()');
  },
};

export default observer(ListingScreen);
