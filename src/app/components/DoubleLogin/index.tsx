import React from 'react';
import { View } from 'react-native';
import { Logo } from '@images';
import { CustomButton, SourceSansProBoldTextView, SourceSansProRegTextView } from '@components';
import { useLanguage } from '@hooks';
import { useStores } from '@mobx/hooks';
import styles from './indexCss';
import { observer } from 'mobx-react';

const DoubleLogin = props => {
  const store = useStores();

  const {
    doubleLoginHeader,
    doubleLoginMessage,
    doubleLoginNotYouMessage,
    loginAgainBtnText,
  } = useLanguage();

  const loginAgain = () => {
    store.loginStore.setIsAuth(false);
    store.appStore.setJwt(null);
    store.loginStore.setSkipOnBoardingScreen(true);
    store.uiStore.apiErrorReset();
    store.uiStore.setDoubleLogin(false);
  };

  if (!store.uiStore.doubleLogin) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Logo
          accessible={true}
          testID="MSLogo"
          accessibilityLabel="MSLogo"
          width={styles.logo.width}
          height={styles.logo.height}
        />
      </View>

      <SourceSansProBoldTextView
        testID="doubleLoginHeader"
        style={styles.heading}>
        {doubleLoginHeader}
      </SourceSansProBoldTextView>

      <SourceSansProRegTextView
        testID="doubleLoginMessage"
        style={styles.text1}>
        {doubleLoginMessage}
      </SourceSansProRegTextView>

      <SourceSansProRegTextView
        testID="doubleLoginNotYouMessage"
        style={styles.text2}>
        {doubleLoginNotYouMessage}
      </SourceSansProRegTextView>

      <CustomButton
        testId="loginAgainButton"
        onSubmit={loginAgain}
        btnText={loginAgainBtnText}
      />
    </View>
  );
};

export default observer(DoubleLogin);
