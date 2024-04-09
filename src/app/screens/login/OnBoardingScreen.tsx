/**
|--------------------------------------------------
| Onboarding Screen
|--------------------------------------------------
*/
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, NativeBaseProvider } from 'native-base';
import {
  Carousel,
  Onboarding,
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
} from '@components';
import { COLORS, TEXTFONTSIZE, ScreenNames } from '@constants';
import {
  slugify,
  onboardingLottie,
  getWp,
  getHp,
  configurePushNotification,
  screenLogging,
} from '@utils';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { useLanguage } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';

const OnBoardingScreen = props => {
  const navigation = useNavigation();
  const { loginStore, appStore } = useStores();
  const Toast = useToast();
  const { nextText, skipBtnText, continueText } = useLanguage();
  const [data] = useState(loginStore.getConfig && loginStore.getConfig.data && loginStore.getConfig.data.featurePages && loginStore.getConfig.data.featurePages.students);
  const [filterData, set_FilterData] = useState([]);
  let [currItemIndex, setCurrItemIndex] = useState(0);
  let [carousel, setCarousel] = useState(null);
  let [onboardingFinished, setOnboardingFinished] = useState(false);

  useEffect(() => {
    screenLogging("OnBoardingScreen");
    configurePushNotification(appStore, navigation, true);
  }, []);

  useEffect(() => {
    let filterData_temp = [];
    if (data && data.length > 0) {
      filterData_temp = data.filter(item => item.status === 'A');
      set_FilterData(filterData_temp);
    }
  }, data);

  const onSlide = index => {
    setCurrItemIndex(index);
    if (index === data.length - 1) {
      setOnboardingFinished(true);
    } else {
      setOnboardingFinished(false);
    }
  };
  const getRef = c => {
    setCarousel(c);
  };

  const renderFunc = ({ item }) => {
    return (
      <Onboarding
        testID="onboardingDetails"
        title={item.title}
        desc={item.description}
        lottieFileName={onboardingLottie[slugify(item.title)]}
        currIndex={currItemIndex}
      />
    );
  };

  let footerBtnText = nextText;

  if (onboardingFinished) {
    footerBtnText = continueText;
  }

  const onClickFooterBtn = () => {
    if (onboardingFinished) {
      props.navigation.replace(ScreenNames.LoginScreen);
      loginStore.setSkipOnBoardingScreen(true);
    } else {
      if (filterData.length > 0) {
        carousel.snapToNext();
      } else {
        if (!Toast.isActive(35)) {
          Toast.show({ id: 35, description: 'Data Not Loaded' });
        }
      }
    }
  };

  return (
    <View key="screen" style={styles.screen}>
      <View key="upperContainer" style={styles.upperContainer}>
      </View>
      <View style={styles.middleContainer}>
        {filterData.length > 0 && (
          <Carousel
            testID="onBoardingCarousel"
            data={filterData}
            renderFunc={renderFunc}
            onSlide={onSlide}
            currItemIndex={currItemIndex}
            getRef={getRef}
          />
        )}
      </View>
      <View style={styles.lowerContainer}>
        <NativeBaseProvider>
          <View style={styles.actions}>
            <Button
              rounded
              block
              style={styles.btn}
              accessible={true}
              testID="onBoardingfooterBtn"
              accessibilityLabel="onBoardingFooterBtn"
              onPress={onClickFooterBtn}>
              <SourceSansProBoldTextView
                testID="onBoardingFooterText"
                style={styles.btnText}>
                {footerBtnText}
              </SourceSansProBoldTextView>
            </Button>
          </View>
        </NativeBaseProvider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: getWp(32),
  },
  upperContainer: {
    position: 'absolute',
    top: getHp(65),
    right: getWp(32),
  },
  upperTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: getHp(30.4),
  },
  upperText: { fontSize: TEXTFONTSIZE.Text16, color: COLORS.subtitleDarkBlue },
  middleContainer: { flex: 8 },
  lowerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  actions: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: getHp(39.4),
  },
  btn: {
    backgroundColor: COLORS.orange,
    height: getHp(60),
    alignSelf: 'center',
    elevation: 0,
    width: '100%',
    borderRadius: getHp(60),
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
  },
  btnText: { fontSize: TEXTFONTSIZE.Text20, color: COLORS.white },
});

export default observer(OnBoardingScreen);
