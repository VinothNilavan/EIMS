import React, { useContext } from 'react';
import { View, Platform, StatusBar, TouchableOpacity } from 'react-native';
import {
  Home,
  Logo,
  Hamburger,
  Back,
  NaandiLogout,
  HomeMenuIcon,
  LeaderboardIcon,
} from '@images';
import styles from './style';
import PropTypes from 'prop-types';
import { getWp, getHp, getStatusBarHeight } from '@utils';
import {
  BalooThambiRegTextView,
  SVGImageBackground,
  RoundedVerticalImageButton,
} from '@components';
import { useStores } from '@mobx/hooks';
import { AuthContext } from '@contexts/auth-context';
import { SvgCssUri } from 'react-native-svg/css';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, COLORS, ScreenNames } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { walkthroughable, CopilotStep } from 'react-native-copilot';
import { useLanguage } from '@hooks';

const WalkthroughableView = walkthroughable(View);

const Header = props => {
  const {
    testID,
    type,
    onClick,
    title,
    desc,
    svgUrl,
    secondaryBtnPressed,
    enableSecondaryBtn,
    containerStyle,
    customTitleStyle,
    fromHome,
  } = props;
  const navigation = useNavigation();
  const store = useStores();
  const auth = useContext(AuthContext);
  const { homeText } = useLanguage();

  const feedbackButton = () => {
    return (
      fromHome &&
      store.uiStore.menuDataPermissions &&
      store.uiStore.menuDataPermissions.home &&
      store.uiStore.menuDataPermissions.home.leaderboard &&
      <View style={styles.feedbackContainer}>
        <LeaderboardIcon onPress={() => {
          auth.trackEvent('mixpanel', MixpanelEvents.GO_TO_LEADERBOARD, { "Category": MixpanelCategories.LEADERBOARD, "Action": MixpanelActions.CLICKED, "Label": "" });
          navigation.navigate(ScreenNames.Leaderboard);
        }} width={getWp(56)} height={getHp(52)} />
      </View>
    )
  }

  const renderLogo = () => {
    switch (type) {
      case 'home':
        return <Home width={getWp(56)} height={getHp(52)} onPress={onClick} />;
      case 'menu':
        return (<Hamburger onPress={onClick} width={getWp(56)} height={getHp(52)} />);
      case 'back':
        return <Back onPress={onClick} width={getWp(56)} height={getHp(52)} />;
      case 'logout':
        return (
          <TouchableOpacity style={styles.buttonContainer} onPress={onClick}>
            <NaandiLogout width={getWp(56)} height={getHp(52)} />
          </TouchableOpacity>
        );
      case 'naandi_home':
        return (
          <RoundedVerticalImageButton
            text={homeText}
            SvgImage={HomeMenuIcon}
            onPress={onClick}
            containerStyle={{ height: getHp(60), width: getWp(60), marginLeft: 5 }}
          />
        );
    }
  };

  /**
   * This is to use this header in Search screen
   */

  const getSearchQuestionView = () => {
    return (
      enableSecondaryBtn ? (
        <TouchableOpacity
          style={styles.searchQuestionContainer}
          onPress={secondaryBtnPressed}>
          <BalooThambiRegTextView
            testID="HeaderQuestionText"
            style={styles.searchQuestionText}>
            Search Questions
          </BalooThambiRegTextView>
        </TouchableOpacity>
      ) : feedbackButton()
    )
  }

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={[styles.mainContainer, containerStyle]}>
      <SVGImageBackground
        testID="SVGImageBackgroundHeaderSVGImage"
        SvgImage="bgHeader"
        themeBased
        screenBg>
        {Platform.OS === 'android' ? (
          <StatusBar
            accessible={true}
            testID="HeaderStatusBarAndroid"
            accessibilityLabel="HeaderStatusBarAndroid"
            backgroundColor={COLORS.white}
            barStyle="dark-content"
          />
        ) : (
          <View>
            <StatusBar
              accessible={true}
              testID="HeaderStatusBar"
              accessibilityLabel="HeaderStatusBar"
              barStyle="dark-content"
            />
            <View style={{ height: Platform.isPad ? 0 : getStatusBarHeight() }} />
          </View>
        )}
        <View key="container" style={styles.container}>
          {title != null && title.length > 0 ? (
            <View style={styles.titleContaine}>
              {svgUrl && svgUrl.includes('.svg') &&
                <View style={styles.svgContainer}>
                  <SvgCssUri
                    accessible={true}
                    testID="HeaderSvgUri"
                    accessibilityLabel="HeaderSvgUri"
                    width={styles.topicIcon.width}
                    height={styles.topicIcon.height}
                    uri={svgUrl}
                  />
                </View>}
              {title && <BalooThambiRegTextView
                testID="HeaderTitleText"
                style={{ ...styles.titleText, ...customTitleStyle }}
                numberOfLines={1}>
                {title}
              </BalooThambiRegTextView>}
              {desc && <BalooThambiRegTextView style={styles.description} numberOfLines={2}>
                {desc}
              </BalooThambiRegTextView>}
            </View>
          ) : (
            <View style={styles.logo}>
              <Logo width={getWp(152)} height={getHp(60)} />
            </View>
          )}

          {store.uiStore.showHomepageOverlay ?
            <CopilotStep
              text="For more exciting features, click here."
              order={1}
              name="Menu">
              <WalkthroughableView style={styles.hamBurger}>{renderLogo()}</WalkthroughableView>
            </CopilotStep> :
            <View style={styles.hamBurger}>{renderLogo()}</View>
          }
          {store.uiStore.showHomepageOverlay ?
            <CopilotStep
              text="To benchmark your learning with your peers at an international and national level, click here."
              order={2}
              name="LeaderBoard">
              <WalkthroughableView style={styles.rightContainer}>
                {getSearchQuestionView()}
              </WalkthroughableView>
            </CopilotStep> :
            <View style={styles.rightContainer}>
              {getSearchQuestionView()}
            </View>
          }
        </View>
      </SVGImageBackground>
    </View>
  );
};

Header.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  containerStyle: PropTypes.object,
};

Header.defaultProps = {
  onClick: () => { console.log(`default onClick `) },
  title: null,
  desc: null,
  hideEILogo: false,
  containerStyle: { flex: 0.15 },
};

export default Header;


