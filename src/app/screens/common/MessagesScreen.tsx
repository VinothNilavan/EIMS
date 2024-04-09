import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE, ScreenNames } from '@constants';
import {
  CorrectAnswer,
  Teachers,
  Parents,
  Email,
  Lock,
  Error,
} from '@images';
import {
  LoginHeader,
  ButtonRightImageLeftIcon,
  LoginFooterBtn,
  CommonHeader
} from '@components';
import {
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
} from '@components';
import { useLanguage } from '@hooks';

import { useStores } from '@mobx/hooks';
import { HeaderType } from '../../utils/helper';

const Screen = ({ route, navigation }) => {
  const context =
    route.params && route.params.type ? route.params.type : 'teacher'; //teacher, parent,mindspark, passwordApprovalExpired, accountLocked
  const store = useStores();
  const { notifiedTeacherToResetPass, teacherBtnText, parentBtnText, mindaSparkLabel, notifiedMindsparkToResetPass, weWillGetBackText, passResetApprovalExpiredText, passResetExpiredMessage, requestAgainPlease, maxAttemptReachedText, okayBtnText } = useLanguage();
  console.log('locked', route.params);
  let content = null;
  switch (context) {
    case 'teacher':
      content = (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <ButtonRightImageLeftIcon
            SvgRightImage={Teachers}
            SvgLeftImage={CorrectAnswer}
            text={`${teacherBtnText}`.toUpperCase()}
            textStyle={styles.btnText}
            containerStyle={styles.btnContainer}
          />
          <SourceSansProRegTextView testID="MessagesScreenNotifiedTeacherToResetPass" style={styles.infoText}>
            {notifiedTeacherToResetPass}
          </SourceSansProRegTextView>
        </View>
      );
      break;
    case 'parent':
      content = (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <ButtonRightImageLeftIcon
            SvgRightImage={Parents}
            SvgLeftImage={CorrectAnswer}
            text={parentBtnText}
            textStyle={styles.btnText}
            containerStyle={styles.btnContainer}
          />
          <SourceSansProRegTextView style={styles.infoText}>
            {notifiedParentToResetPass}
          </SourceSansProRegTextView>
        </View>
      );
      break;

    case 'mindspark':
      content = (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <ButtonRightImageLeftIcon
            testID="InputWithRightIconMessagesScreenMindaSparkLabel"
            SvgRightImage={Email}
            SvgLeftImage={CorrectAnswer}
            text={mindaSparkLabel}
            textStyle={styles.btnText}
            containerStyle={styles.btnContainer}
          />
          <SourceSansProRegTextView
            testID="MessagesScreenNotifiedMindsparkToResetPass"
            style={{ ...styles.infoText, width: '95%', marginBottom: getHp(25) }}>
            {notifiedMindsparkToResetPass}
          </SourceSansProRegTextView>
          <SourceSansProRegTextView
            testID="MessagesScreenWeWillGetBackText"
            style={styles.infoText}>
            {weWillGetBackText}
          </SourceSansProRegTextView>
        </View>
      );
      break;
    case 'passwordApprovalExpired':
      content = (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <SourceSansProBoldTextView
            testID="MessagesScreenPassResetApprovalExpiredText"
            style={{ ...styles.text, ...styles.subTitle }}>
            {passResetApprovalExpiredText}
          </SourceSansProBoldTextView>
          <SourceSansProRegTextView
            testID="MessagesScreenPassResetExpiredMessage"
            style={{ ...styles.infoText, width: '95%', marginBottom: getHp(25) }}>
            {passResetExpiredMessage}
          </SourceSansProRegTextView>
          <SourceSansProRegTextView style={{ ...styles.infoText, width: '56%' }}>
            {requestAgainPlease}
          </SourceSansProRegTextView>
        </View>
      );
      break;
    case 'accountLocked':
      content = (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <ButtonRightImageLeftIcon
            testID="InputWithRightIconMessagesScreenAccountLocked"
            SvgRightImage={Lock}
            SvgLeftImage={Error}
            text="Account Locked"
            textStyle={styles.btnText}
            containerStyle={styles.btnContainer}
          />
          <SourceSansProRegTextView testID="MessageScreenMaxAttemptReachedText" style={{ ...styles.infoText, width: '90%' }}>
            {maxAttemptReachedText}
          </SourceSansProRegTextView>
        </View>
      );
      break;
    default:
      break;
  }

  return (
    <View style={styles.screen}>
      <CommonHeader
        headerType = {HeaderType.login}
        testID="LoginHeaderMessagesHeader"
        theme={'generic'}
        lottieFileName={'naandi_header'}
        helpNeedEnable={true}
        containerStyle={styles.header}
      />
      <View style={styles.innerContainer}>
        <SourceSansProBoldTextView testID="MessagesScreenUsernameText" style={styles.text}>
          Hey, {store.loginStore.username}
        </SourceSansProBoldTextView>
        {content}
      </View>
      <LoginFooterBtn
        testID="LoginFooterBtnMessagesScreenOkayBtnText"
        isForgotPasswordShown={false}
        text={"OK"}
        onPress={() => navigation.replace(ScreenNames.LoginScreen)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: { marginBottom: getHp(72) },
  text: {
    marginBottom: getHp(36),
    fontSize: TEXTFONTSIZE.Text28,
  },
  subTitle: { fontSize: TEXTFONTSIZE.Text20, color: COLORS.orange },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: getWp(33),
    width: '100%',
  },
  btnText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.orange
  },
  btnContainer: {
    marginBottom: getHp(36),
    backgroundColor: COLORS.teacherColor,
    borderColor: COLORS.orange
  },
  infoText: {
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    width: '75%',
  },
  actionBtnContainer: {
    position: 'absolute',
    bottom: getHp(40),
    left: 0,
    right: 0,
    paddingHorizontal: getWp(33),
  },
  submitBtn: {
    width: '100%',
    height: getHp(60),
  },
  footerContainerStyle: {
    height: 0,
  },
});

export default Screen;
