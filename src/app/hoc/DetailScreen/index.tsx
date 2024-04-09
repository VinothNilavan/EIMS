import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { DashboardFooter, SVGImageBackground, SimpleLottie, CommonHeader } from '@components';
import { useStores } from '@mobx/hooks';
import styles from './style';
import PropTypes from 'prop-types';

const DetailsScreen = props => {
  const store = useStores();

  const {
    headerBtnType,
    headerBtnClick,
    showAnimation,
    animationName,
    bgName,
    themeName,
    secondaryBtnPressed,
    enableSecondaryBtn,
    hideLogo,
    title,
    hideFooter,
    showOverflow,
    animationPosition,
    customTitleStyle,
  } = props;

  let lottiesStyle: any = styles.topLeftAnimContainer;
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SVGImageBackground SvgImage={bgName} themeBased screenBg>
        <CommonHeader
          type={headerBtnType}
          customTitleStyle={customTitleStyle}
          onClick={headerBtnClick}
          secondaryBtnPressed={secondaryBtnPressed}
          enableSecondaryBtn={enableSecondaryBtn}
          hideLogo={hideLogo}
          title={title}
        />
        {showAnimation && (
          <View style={lottiesStyle}>
            <SimpleLottie theme={themeName} jsonFileName={animationName} />
          </View>
        )}

        {showOverflow === false && (
          <DashboardFooter
            permissions={
              Object.keys(store.uiStore.menuDataPermissions).length > 0 && hideFooter === false ? store.uiStore.menuDataPermissions.home : {}
            }
          />
        )}
        {props.children}
        {showOverflow && (
          <DashboardFooter
            permissions={
              Object.keys(store.uiStore.menuDataPermissions).length > 0 && hideFooter === false ? store.uiStore.menuDataPermissions.home : {}
            }
          />
        )}
      </SVGImageBackground>
    </SafeAreaView>
  );
};

DetailsScreen.propTypes = {
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
  headerBtnType: 'logout',
  footerContainerStyle: styles.footerContainerStyle,
  bgName: 'bgCommon',
  animationName: 'bg8',
  themeName: 'ocean',
  hideFooter: true,
  showOverflow: true,
  animationPosition: 'bottomRight',
  customTitleStyle: {},
};

export default observer(DetailsScreen);
