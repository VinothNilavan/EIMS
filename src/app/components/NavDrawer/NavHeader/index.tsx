/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { CustomProgress, ProfileTitle, BalooThambiRegTextView, ImageWithIcon } from '@components';
import { BoyPng, GirlPng, NeutralPng, TitleBg, Coin } from '@images';

import { useStores } from '@mobx/hooks';
import { COLORS } from '@constants';
import styles from './indexCss.ts';
import { SvgCssUri } from 'react-native-svg/css';
import { getWp, getHp } from '@utils';
import { useLanguage } from '@hooks';
import PropTypes from 'prop-types';
import { CopilotStep, walkthroughable } from 'react-native-copilot';

const WalkthroughableView = walkthroughable(View);
const WalkthroughableTouchableOpacity = walkthroughable(TouchableOpacity);

const NavHeader = props => {
  const { testID, permissions, onPress, onSubjectSelect } = props;
  const { appStore, uiStore } = useStores();
  const { profileCompleteText, changeSubject } = useLanguage();

  const { name, avatar, sparkies, profileProgress, profileDetails, gender } = appStore.userData;

  let showChangeSubject = getStoreShowChangeSubject(appStore);
  let profileImageStyle = (profileDetails?.certificate?.certificateCrownImg || profileDetails?.certificate?.certificateBannerImg) ? styles.profileImgWithBanner : styles.profileImg;

  const checkForUserDefaultProfileImage = () => {
    try {
      let extension = `${avatar}`.split('.').pop();
      let neutralImg = `${avatar}`.includes("neutral.svg");
      if ((gender === 'N' && extension == 'svg' && neutralImg) || (extension == 'svg' && !neutralImg)) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  const getProfileUrl = () => {
    let neutralImg = `${avatar}`.includes("neutral.svg");
    if (neutralImg) {
      if (gender === 'F') return GirlPng
      return gender === 'M' ? BoyPng : NeutralPng;
    } else {
      return { uri: avatar }
    }
  }

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={styles.container}>
      {uiStore.showNavbarOverlay ? (
        <CopilotStep
          text="Personalise your account by adding your picture here."
          order={1}
          name="ProfilePicture">
          <WalkthroughableTouchableOpacity onPress={onPress}>
            <View key="profileDescription" style={styles.profileDescription}>
              <View key="bgPurpleRec" style={{ ...styles.bgPurpleRec }}>
                <View style={styles.profileNameTitleContainer}>
                  {permissions?.profileName && (
                    <BalooThambiRegTextView
                      testID="NavHeaderName"
                      style={styles.name}>
                      {name}
                    </BalooThambiRegTextView>
                  )}
                  {permissions?.profileTitle &&
                    profileDetails?.title?.titleName && (
                      <ProfileTitle
                        testID="ProfileTitleNavHeader"
                        key="profileTitle"
                        SvgImage={TitleBg}
                        text={profileDetails?.title?.titleName || 'NA'}
                        containerStyle={styles.profileTitle}
                        textStyle={styles.profileTitleText}
                      />
                    )}
                </View>
              </View>

              {permissions?.profilePicture && (
                <View key="profileBg" style={styles.profilePicture}>
                  <TouchableOpacity onPress={onPress}>
                    <ImageWithIcon
                      testID="ImageWithIconDashBoardFooter"
                      containerStyle={styles.leftImageContainer}
                      imageStyle={styles.leftImageStyle}
                      iconContainerStyle={styles.iconContainer}
                      imageUrl={avatar}
                      gender={gender}
                      avatarWidth={getWp(90)}
                      avatarHeight={getWp(90)}
                    />
                  </TouchableOpacity>

                </View>
              )}

              {permissions?.myBadge &&
                profileDetails?.badge?.badgeImg?.length > 0 && (
                  <View
                    key="profileImgContainer"
                    style={styles.profileImgContainer}>
                    <SvgCssUri
                      accessible={true}
                      testID="NavHeaderSvgUri"
                      accessibilityLabel="NavHeaderSvgUri"
                      uri={profileDetails.badge.badgeImg}
                      width={getWp(32)}
                      height={getWp(32)}
                    />
                  </View>
                )}
            </View>
          </WalkthroughableTouchableOpacity>
        </CopilotStep>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <View key="profileDescription" style={styles.profileDescription}>
            <View key="bgPurpleRec" style={{ ...styles.bgPurpleRec }}>
              <View style={styles.profileNameTitleContainer}>
                {permissions?.profileName && (
                  <BalooThambiRegTextView
                    testID="NavHeaderName"
                    style={styles.name}>
                    {name}
                  </BalooThambiRegTextView>
                )}
                {permissions?.profileTitle &&
                  profileDetails?.title?.titleName && (
                    <ProfileTitle
                      testID="ProfileTitleNavHeader"
                      key="profileTitle"
                      SvgImage={TitleBg}
                      text={profileDetails?.title?.titleName || 'NA'}
                      containerStyle={styles.profileTitle}
                      textStyle={styles.profileTitleText}
                    />
                  )}
              </View>
            </View>

            {permissions?.profilePicture && (
              <View key="profileBg" style={styles.profilePicture}>
                <TouchableOpacity onPress={onPress}>
                  {profileDetails?.certificate?.certificateCrownImg &&
                    <View key="crownContainer" style={styles.crownContainer}>
                      <SvgCssUri
                        accessible={true}
                        testID="DashBoardFooterSVGUri"
                        accessibilityLabel="DashBoardFooterSVGUri"
                        uri={profileDetails?.certificate?.certificateCrownImg}
                      />
                    </View>
                  }
                  {profileDetails?.certificate?.certificateBannerImg &&
                    <View key="bannerContainer" style={styles.bannerContainer}>
                      <SvgCssUri
                        accessible={true}
                        testID="DashBoardFooterSVGUri"
                        accessibilityLabel="DashBoardFooterSVGUri"
                        uri={profileDetails?.certificate?.certificateBannerImg}
                        width={55}
                        height={55}
                      />
                    </View>
                  }
                  {checkForUserDefaultProfileImage() ? (
                    <SvgCssUri
                      accessible={true}
                      testID="ProfileCardImage"
                      accessibilityLabel="ProfileCardImage"
                      width={getHp(90)}
                      height={getHp(90)}
                      uri={avatar}
                    />
                  ) : (
                    <Image
                      accessible={true}
                      testID="NavHeaderImageAvatar"
                      accessibilityLabel="NavHeaderImageAvatar"
                      style={profileImageStyle}
                      source={ avatar !== '' ? getProfileUrl() : NeutralPng
                      }
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}

            {permissions?.myBadge &&
              profileDetails?.badge?.badgeImg?.length > 0 && (
                <View
                  key="profileImgContainer"
                  style={styles.profileImgContainer}>
                  <SvgCssUri
                    accessible={true}
                    testID="NavHeaderSvgUri"
                    accessibilityLabel="NavHeaderSvgUri"
                    uri={profileDetails.badge.badgeImg}
                    width={getWp(32)}
                    height={getWp(32)}
                  />
                </View>
              )}
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        accessible={true}
        testID="NavHeaderProgressAndSparky"
        accessibilityLabel="NavHeaderProgressAndSparky"
        key="progressAndSparky"
        style={styles.progressAndSparky}
        onPress={onPress}>
        {permissions.myProgress &&
          (uiStore.showNavbarOverlay ? (
            <CopilotStep
              text="Check your profile completion status here."
              order={2}
              name="Progress">
              <WalkthroughableView
                key="progressContainer"
                style={styles.progressContainer}>
                <BalooThambiRegTextView
                  testID="NavHeaderProfileProgressText"
                  style={styles.progressLabel}>
                  {profileCompleteText}
                </BalooThambiRegTextView>
                <View key="progressView" style={styles.progressView}>
                  <CustomProgress
                    testID="CustomProgressNavHeader"
                    key="customProgress"
                    currentProgress={profileProgress}
                    progressColor={COLORS.parrotGreen}
                    borderRadius={30}
                    containerStyle={styles.customProgressContainerStyle}
                    progressBarStyle={styles.customProgressBarStyle}
                    commonStyle={styles.customProgressCommonStyle}
                  />

                  <BalooThambiRegTextView
                    testID="NavHeaderProfileProgress"
                    style={styles.percentageLabel}>
                    {`${profileProgress}%`}
                  </BalooThambiRegTextView>
                </View>
              </WalkthroughableView>
            </CopilotStep>
          ) : (
            <View key="progressContainer" style={styles.progressContainer}>
              <BalooThambiRegTextView
                testID="NavHeaderProfileProgressText"
                style={styles.progressLabel}>
                {profileCompleteText}
              </BalooThambiRegTextView>
              <View key="progressView" style={styles.progressView}>
                <CustomProgress
                  testID="CustomProgressNavHeader"
                  key="customProgress"
                  currentProgress={profileProgress}
                  progressColor={COLORS.parrotGreen}
                  borderRadius={30}
                  containerStyle={styles.customProgressContainerStyle}
                  progressBarStyle={styles.customProgressBarStyle}
                  commonStyle={styles.customProgressCommonStyle}
                />

                <BalooThambiRegTextView
                  testID="NavHeaderProfileProgress"
                  style={styles.percentageLabel}>
                  {`${profileProgress}%`}
                </BalooThambiRegTextView>
              </View>
            </View>
          ))}
        {permissions.mySparkies && (
          <View key="sparkyContainer" style={styles.sparkyContainer}>
            <View style={styles.sparkieImgContainer}>
              <Coin
                accessible={true}
                testID="NavHeaderCoinSvg"
                accessibilityLabel="NavHeaderCoinSvg"
                width={styles.sparkieImg.width}
                height={styles.sparkieImg.height}
              />
            </View>
            <BalooThambiRegTextView
              testID="NavHeaderSparkies"
              style={styles.sparkyPts}>
              {sparkies}
            </BalooThambiRegTextView>
          </View>
        )}
      </TouchableOpacity>
      {showChangeSubject && changeSubjectContainerView(onSubjectSelect, changeSubject)}
    </View>
  );
};

NavHeader.propTypes = {
  testID: PropTypes.string,
};

NavHeader.defaultProps = {
  testID: 'NavHeader',
};

export default NavHeader;

const getStoreShowChangeSubject = (appStore) => {
  let flag = false
  if (appStore.isTrusted && appStore.subjects && appStore.subjects.length > 0) {
    flag = true;
  }
  return flag;
}

const changeSubjectContainerView = (onSubjectSelect, changeSubject) => {
  return <View style={styles.changeSubjectContainer}>
    <TouchableOpacity onPress={onSubjectSelect}>
      <View style={styles.changeSubjectBtn}>
        <BalooThambiRegTextView style={styles.changeSubjectTxt}>
          {changeSubject}
        </BalooThambiRegTextView>
      </View>
    </TouchableOpacity>
  </View>;
}
