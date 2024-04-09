import React, { Fragment, useState, useCallback } from 'react';
import { View, StyleSheet, Linking } from 'react-native';

import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';
import {
  LoginFooterBtn,
  SourceSansProBoldTextView,
  InfoPopup,
  CommonHeader
} from '@components';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { useLanguage } from '@hooks';
import { HeaderType } from '../../utils/helper';

const SUBSCRIPTION_PURCHASE = 'https://mindspark.in/subscription';
const Screen = props => {
  const store = useStores();
  const { yourSubEndedMsg, hangOnText, cantOpenUrl } = useLanguage();
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const openPurchaseURL = useCallback(async () => {
    const canOpenURL = await Linking.canOpenURL(SUBSCRIPTION_PURCHASE);
    if (canOpenURL) {
      await Linking.openURL(SUBSCRIPTION_PURCHASE);
    } else {
      setShowInactiveModal(true);
    }
  }, [SUBSCRIPTION_PURCHASE]);
  let loginBtn = (
    <LoginFooterBtn
      testID="LoginFooterBtnSubscriptionEndedRenewal"
      type="primaryOrange"
      text="Renew Subscription"
      disabled={false}
      forgotpassword={false}
      onPress={openPurchaseURL}
    />
  );

  return (
    <Fragment>
      <View style={styles.screen}>
        <CommonHeader
          headerType={HeaderType.login}
          testID="LoginHeaderSubscriptionEndedRenewalHeader"
          theme={'generic'}
          lottieFileName={'naandi_header'}
          containerStyle={styles.header}
          hideBackButton={false}
          fromSubscription={true}
        />
        <InfoPopup
          testID="InfoPopupSubscriptionEndedPurchaseSubcription"
          show={showInactiveModal}
          svgText={hangOnText}
          desc={`${cantOpenUrl} ${SUBSCRIPTION_PURCHASE}`}
          onPress={() => setShowInactiveModal(false)}
        />
        <View style={styles.innerContainer}>
          <SourceSansProBoldTextView
            testID="SubscriptionEndedUserNameText"
            style={{ ...styles.text, ...styles.title }}>
            Hey, {store.loginStore.username}
          </SourceSansProBoldTextView>
          <SourceSansProBoldTextView
            testID="SubscriptionEndedMsg"
            style={{ ...styles.text, ...styles.subTitle }}>
            {
              yourSubEndedMsg
            }
          </SourceSansProBoldTextView>
        </View>
        {loginBtn}
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: getHp(840),
  },
  modalHeader: {
    marginTop: getHp(30),
    position: 'absolute',
    alignSelf: 'center',
    fontSize: TEXTFONTSIZE.Text32,
    color: COLORS.statTextColor,
  },
  modalContentText: {
    width: getWp(204),
    marginTop: getHp(30),
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: TEXTFONTSIZE.Text16,
    color: '#464646',
  },
  modalButtonRow: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: getHp(48),
    marginTop: getHp(40),
    flexDirection: 'row',
  },
  buttonSkipText: {
    color: COLORS.orange,
    fontSize: TEXTFONTSIZE.Text20,
    fontFamily: 'BalooThambi-Regular',
  },
  buttonYesText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
    fontFamily: 'BalooThambi-Regular',
  },
  modalOuter: {
    backgroundColor: 'rgba(0,0,0,.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSvg: {
    marginTop: getHp(10),
    width: getWp(230),
    height: getHp(110),
  },
  modalContainer: {
    borderRadius: getWp(50),
    borderColor: '#DEE2EB',
    borderWidth: getWp(3),
    height: getHp(520),
    width: getWp(340),
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  header: { marginBottom: getHp(42) },
  text: {
    marginBottom: getHp(36),
    fontSize: TEXTFONTSIZE.Text20,
  },
  subTitle: {
    fontSize: TEXTFONTSIZE.Text18,
    textAlign: 'center',
    color: COLORS.infoMessageGray,
  },

  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: getWp(33),
    paddingVertical: getHp(50),
    width: '100%',
  },
  submitBtn: {
    width: '100%',
    height: getHp(60),
    marginBottom: getHp(40),
  },
  inputContainer: {
    marginBottom: getHp(70),
  },
  password: {
    width: '100%',
    height: getHp(60),
    marginBottom: getHp(24),
  },
  confirmPassword: {
    width: '100%',
    height: getHp(60),
    marginBottom: getHp(20),
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: getHp(30),
  },
  instructionText: {
    fontSize: TEXTFONTSIZE.Text14,
    lineHeight: getHp(24),
    color: COLORS.inputTextBlack,
  },
  desc: {
    color: COLORS.infoMessageGray,
  },
  errorMessage: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text16,
    textAlign: 'center',
  },
  modalStyle: {
    borderRadius: getWp(20),
    justifyContent: 'center',
  },
});

export default observer(Screen);
