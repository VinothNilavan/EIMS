import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  ProfileTitle,
  SubTitleTwo,
  SquareView,
  ImageWithIcon,
  SVGImageBackground,
} from '@components';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { SvgCssUri } from 'react-native-svg/css';
import { getWp } from '@utils';
import { TitleBg } from '@images';
import { walkthroughable, CopilotStep } from 'react-native-copilot';
import DeviceInfo from 'react-native-device-info';

const WalkthroughableView = walkthroughable(View);

const DashboardFooter = props => {
  const { appStore, uiStore } = useStores();
  const { name, avatar, sparkies, profileDetails, gender } = appStore.userData;
  const {
    testID,
    containerStyle,
    permissions,
    detailPage,
    bgName,
    footerOnPress,
  } = props;
  const isRTL = uiStore.isRTL;

  let profileView = (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={isRTL ? styles.RTLInnerContainer : styles.innerContainer}>
      <View style={styles.leftImageContainer}>
        {profileDetails?.certificate?.certificateCrownImg &&
          <View key="crownContainer" style={styles.crownContainer}>
            <SvgCssUri
              accessible={true}
              testID="DashBoardFooterSVGUri"
              accessibilityLabel="DashBoardFooterSVGUri"
              uri={profileDetails?.certificate?.certificateCrownImg}
              width={DeviceInfo.isTablet() ? getWp(15) : getWp(25)}
              height={DeviceInfo.isTablet() ? getWp(15) : getWp(25)}
            />
          </View>}
        {profileDetails?.certificate?.certificateBannerImg &&
          <View key="bannerContainer" style={styles.bannerContainer}>
            <SvgCssUri
              accessible={true}
              testID="DashBoardFooterSVGUri"
              accessibilityLabel="DashBoardFooterSVGUri"
              uri={profileDetails?.certificate?.certificateBannerImg}
              width={getWp(55)}
              height={getWp(55)}
            />
          </View>}
        {permissions?.profilePicture && (
          <ImageWithIcon
            testID="ImageWithIconDashBoardFooter"
            containerStyle={styles.leftImageContainer}
            imageStyle={styles.leftImageStyle}
            iconContainerStyle={styles.iconContainer}
            imageUrl={avatar}
            gender={gender}
            avatarWidth={getWp(70)}
            avatarHeight={getWp(70)}
          />
        )}
        {permissions?.myBadge && profileDetails?.badge?.badgeImg?.length > 0 && (
          <View key="profileImgContainer" style={styles.profileImgContainer}>
            <SvgCssUri
              accessible={true}
              testID="DashBoardFooterSVGUri"
              accessibilityLabel="DashBoardFooterSVGUri"
              uri={profileDetails.badge.badgeImg}
              width={getWp(32)}
              height={getWp(32)}
            />
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        {permissions?.profileName && (
          <SubTitleTwo
            testID="SubTitleTwoDashboardFooter"
            text={name}
            styles={styles.title}
          />
        )}
        {permissions?.profileTitle && profileDetails?.title?.titleName && (
          <ProfileTitle
            testID="profileTitleDashBoardFooter"
            key="profileTitle"
            SvgImage={TitleBg}
            text={profileDetails?.title?.titleName || 'NA'}
            containerStyle={styles.profileTitle}
            textStyle={styles.profileTitleText}
          />
        )}
      </View>
      {permissions?.mySparkies &&
        (uiStore.showHomepageOverlay ? (
          <CopilotStep
            text="Check your Sparkie count here. Sparkies are points that you can earn on answering questions correctly."
            order={5}
            name="Sparkies">
            <WalkthroughableView style={styles.rightImageContainer}>
              <SquareView
                testID="SquareViewDashBoardFooter"
                containerStyle={styles.svgStyle}
                text={sparkies}
              />
            </WalkthroughableView>
          </CopilotStep>
        ) : (
          <View style={styles.rightImageContainer}>
            <SquareView
              testID="SquareViewDashBoardFooter"
              containerStyle={styles.svgStyle}
              text={sparkies}
            />
          </View>
        ))}
    </View>
  );

  if (detailPage) {
    profileView = null;
  }

  return !uiStore.isKeypadOpened &&
    <View
      style={[
        styles.container,
        containerStyle,
      ]}
    >
      <TouchableOpacity
        onPress={footerOnPress}
        activeOpacity={1}
        style={{ ...styles.container, ...containerStyle }}>
        <SVGImageBackground
          testID="SVGImageBackgroundDashBoardFooter"
          SvgImage={bgName}
          themeBased
          screenBg>
          {profileView}
        </SVGImageBackground>
      </TouchableOpacity>
    </View>
};

DashboardFooter.propTypes = {
  testID: PropTypes.string,
  bgName: PropTypes.string,
  footerOnPress: PropTypes.func,
};

DashboardFooter.defaultProps = {
  testID: 'DashBoardFooter',
  bgName: 'bgFooter',
  footerOnPress: () => {
    console.log('Add footerOnPress()');
  },
};
export default React.memo(observer(DashboardFooter));
