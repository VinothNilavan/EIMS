import React, { useContext } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import {
  CommonHeader,
  DashboardFooter,
  SVGImageBackground,
  SimpleLottie
} from '@components';
import { useStores } from '@mobx/hooks';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { ThemeContext } from '@contexts/theme-context';

const DetailsScreen = props => {
  const theme = useContext(ThemeContext);
  const store = useStores();
  const {
    testID,
    headerBtnType,
    headerBtnClick,
    headerTitle,
    headerDesc,
    footerContainerStyle,
    showAnimation,
    animationName,
    bgName,
    bgFooterName,
    secondaryBtnPressed,
    enableSecondaryBtn,
    hideLogo,
    hideFooter,
    showOverflow,
    animationPosition,
    customTitleStyle,
    containerStyle
  } = props;

  let lottiesStyle = styles.topLeftAnimContainer;
  switch (animationPosition) {
    case 'topLeft':
      lottiesStyle = styles.topLeftAnimContainer;
      break;

    case 'topRight':
      lottiesStyle = styles.topRightAnimContainer;
      break;

    case 'bottomLeft':
      lottiesStyle = styles.btmLeftAnimContainer;
      break;

    case 'bottomRight':
      lottiesStyle = styles.btmRightAnimContainer;
      break;

    default:
      lottiesStyle = styles.topLeftAnimContainer;
  }

  return (
    <SafeAreaView
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SVGImageBackground
        testID="SVGImageRewards"
        SvgImage={bgName}
        themeBased
        screenBg>
        <View style={{ flex: 0.1, width: '100%' }}>
          <CommonHeader
            testID="HeaderDetailsScreen"
            type={headerBtnType}
            customTitleStyle={customTitleStyle}
            onClick={headerBtnClick}
            title={headerTitle}
            desc={headerDesc}
            containerStyle={[styles.headerContainer, containerStyle]}
            secondaryBtnPressed={secondaryBtnPressed}
            enableSecondaryBtn={enableSecondaryBtn}
            hideLogo={hideLogo}
          />
        </View>
        <View style={{ flex: 0.9, width: '100%' }}>
          {showAnimation && (
            <View style={lottiesStyle}>
              <SimpleLottie
                testID="SimpleLottieHeaderDetails"
                theme={theme.name}
                jsonFileName={animationName}
              />
            </View>
          )}

          {showOverflow === false && (
            <DashboardFooter
              accessible={true}
              testID="DashboardFooterHeaderNoDetails"
              permissions={
                Object.keys(store.uiStore.menuDataPermissions).length > 0 &&
                  hideFooter === false
                  ? store.uiStore.menuDataPermissions.home
                  : {}
              }
              detailPage
              containerStyle={footerContainerStyle}
              bgName={bgFooterName}
            />
          )}
          {props.children}

          {showOverflow && (
            <DashboardFooter
              testID="DashboardFooterHeaderDetails"
              permissions={
                Object.keys(store.uiStore.menuDataPermissions).length > 0 &&
                  hideFooter === false
                  ? store.uiStore.menuDataPermissions.home
                  : {}
              }
            />
          )}
        </View>
      </SVGImageBackground>
    </SafeAreaView>
  );
};

DetailsScreen.propTypes = {
  testID: PropTypes.string,
  headerBtnType: PropTypes.string,
  showAnimation: false,
  animationName: PropTypes.string,
  bgName: PropTypes.string,
  hideFooter: PropTypes.bool,
  showOverflow: PropTypes.bool,
  animationPosition: PropTypes.string,
  customTitleStyle: PropTypes.object,
};

DetailsScreen.defaultProps = {
  testID: 'DetailsScreen',
  headerBtnType: 'menu',
  footerContainerStyle: styles.footerContainerStyle,
  bgName: 'bgCommon',
  animationName: 'rightMapAnimation',
  bgFooterName: 'bgFooterInner',
  hideFooter: false,
  showOverflow: false,
  animationPosition: 'bottomRight',
  customTitleStyle: {},
};

export default observer(DetailsScreen);
