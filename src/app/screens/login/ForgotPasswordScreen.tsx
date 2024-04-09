import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE, ApiEndPoint } from '@constants';
import {
  RoundedButton,
  CircleView,
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
  CommonHeader
} from '@components';
import { Teachers, Parents } from '@images';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { AuthContext } from '@contexts/auth-context';
import { ScreenNames } from '@constants';
import { API } from '@api';
import { useLanguage } from '@hooks';
import { HeaderType } from '../../utils/helper';

const Screen = props => {
  const store = useStores();
  const [warningMessage, showWarningMessage] = useState(false);
  const auth = useContext(AuthContext);
  const {
    youAlreadyHavePendingPassRequest,
    okayBtnText,
    resetPassLabel,
    askHelpFromYourLabel,
    teacherBtnText,
    parentBtnText,
    emailUsAtLabel,
    orLabel,
    b2bUserInstForResetPassword,
  } = useLanguage();
  const { userData } = store.appStore;
  let userType = userData.isB2CUser ? 'B2C' : 'B2B';

  useEffect(() => {
    (async () => {
      try {
        const req = {
          body: {
            username: store.loginStore.username,
          },
          store,
        };
        const forgotPasswordScreenData = await API(ApiEndPoint.FORGOT_PASSWORD, req);
        //Set Sparkies champ data in mobx
        if (forgotPasswordScreenData.data.resultCode === 'C001') {
          store.loginStore.setResetPasswordDetails(forgotPasswordScreenData.data);
        } else if (forgotPasswordScreenData?.data.resultCode === 'CLFP25') {
          showWarningMessage(true);
        }
      } catch (e) {
        console.log('LoginScreenAPI Error ');
      }
    })();
  }, [props.navigation, store]);

  const validateVerificationDetails = async () => {
    try {
      const reqBody = {
        store: store,
        body: {
          type: 'F',
          userName: store.loginStore.username,
        },
      };

      const response = await API(ApiEndPoint.CHECK_VERIFIED_DETAILS_FORGOT_PASSWORD, reqBody);
      if (response?.data?.resultCode === 'C004') {
        props.navigation.navigate(ScreenNames.OTPScreen);
      } else if (response?.data?.resultCode === 'CL027') {
        props.navigation.navigate(ScreenNames.ContactDetailsMissing);
      } else {
        store?.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
      }
    } catch (e) {
      console.log('Check Verification Details API Error ');
    }
  };

  const onRequestResetByTeacherClicked = async () => {
    try {
      const req = {
        body: {
          username: store.loginStore.username,
          validationToken: store.loginStore.getResetPasswordDetails.validationToken,
        },
        store,
      };
      const RequestResetByTeacherData = await API(ApiEndPoint.TEACHER_RESET_PASSWORD, req);
      console.log('RequestResetByTeacherData', RequestResetByTeacherData);
      if (RequestResetByTeacherData.data.resultCode === 'C001') {
        props.navigation.replace(ScreenNames.MessagesScreen);
      } else if (RequestResetByTeacherData.data.resultCode === 'CLFP25') {
        props.navigation.replace(ScreenNames.MessagesScreen, { type: 'teacher' });
      } else {
        store.uiStore.apiErrorInit({ code: RequestResetByTeacherData.status, message: RequestResetByTeacherData.data?.resultMessage });
      }
    } catch (e) {
      console.log('LoginScreenAPI Error ');
    }
  };

  let permissions = store.loginStore.getResetPasswordDetails && store.loginStore.getResetPasswordDetails.permissions;

  return (
    <View style={styles.screen}>
      <CommonHeader
        headerType={HeaderType.login}
        testID="LoginHeaderForgotPassword"
        lottieFileName={'header'}
        theme="generic"
        containerStyle={styles.header}
        helpNeedEnable={true}
      />
      <View style={styles.innerContainer}>
        <SourceSansProBoldTextView
          testID="userNameForgortPasswordText"
          style={{ ...styles.text, ...styles.title }}>
          Hey, {store.loginStore.username}
        </SourceSansProBoldTextView>
        {permissions?.StudentOtpVerificationButton && (
          <SourceSansProBoldTextView
            testID="forgotPasswordText"
            style={{ ...styles.text, ...styles.subTitle }}>
            {"Forgot Password"}
          </SourceSansProBoldTextView>
        )}
        {(permissions === null || typeof permissions === 'undefined') &&
          warningMessage && (
            <View>
              <SourceSansProRegTextView
                testID="PendingPassRequest"
                style={styles.messageText}>
                {youAlreadyHavePendingPassRequest}
              </SourceSansProRegTextView>
              <RoundedButton
                testID="RoundedButtonForgotPasswordOkayBtnText"
                type="primaryOrange"
                text={okayBtnText}
                width={styles.okayButton.width}
                height={styles.okayButton.height}
                borderRadius={50}
                containerStyle={styles.okayButton}
                onPress={() => props.navigation.popToTop()}
                textStyle={styles.btnText}
              />
            </View>
          )}
        {permissions?.StudentOtpVerificationButton && (
          <RoundedButton
            testID="RoundedButtonForgotPasswordResetPassLabel"
            type="primaryOrange"
            text={`${resetPassLabel}`.toUpperCase()}
            width={styles.submitBtn.width}
            height={styles.submitBtn.height}
            borderRadius={50}
            containerStyle={styles.submitBtn}
            onPress={validateVerificationDetails}
            textStyle={styles.btnText}
          />
        )}
        {permissions?.adminButton ||
          ((permissions?.teacherButton || permissions?.parentButton) && (
            <CircleView
              testID="CircleViewForgotPasswordOrLabel1"
              text="or"
              containerStyle={styles.mrgnBtm24}
            />
          ))}
        {(permissions?.teacherButton || permissions?.parentButton) && (
          <SourceSansProRegTextView
            testID="ForgotPasswordHelpLabel"
            style={styles.infoText}>
            {askHelpFromYourLabel}
          </SourceSansProRegTextView>
        )}
        {permissions?.teacherButton && (
          <RoundedButton
            testID="RoundedButtonForgotPasswordTeacherBtnText"
            type="teacherBlue"
            text={`${teacherBtnText}`.toUpperCase()}
            width={styles.submitBtn.width}
            height={styles.submitBtn.height}
            borderRadius={50}
            containerStyle={styles.submitBtn}
            onPress={() => {
              onRequestResetByTeacherClicked();
            }}
            SvgImage={Teachers}
            textStyle={{ ...styles.btnText, ...styles.mrgnBtm16 }}
          />
        )}
        {permissions?.parentButton && (
          <RoundedButton
            testID="RoundedButtonForgotPasswordParentBtnText"
            type="parentBlue"
            text={parentBtnText}
            width={styles.submitBtn.width}
            height={styles.submitBtn.height}
            borderRadius={50}
            containerStyle={styles.submitBtn}
            onPress={() => alert('Parent API')}
            SvgImage={Parents}
            textStyle={{ ...styles.btnText }}
          />
        )}
        {permissions?.mindsparkButton &&
          (permissions?.teacherButton || permissions?.parentButton) && (
            <CircleView
              testID="CircleViewForgotPasswordOrLabel2"
              text={orLabel}
              containerStyle={styles.mrgnBtm24}
            />
          )}
        {permissions?.mindsparkButton && (
          <SourceSansProRegTextView
            testID="forgotPasswordEmailUsAtLabel"
            style={styles.infoText}>
            {emailUsAtLabel}
            <TouchableWithoutFeedback onPress={() => alert('Hi')}>
              <SourceSansProRegTextView
                testID="forgotPasswordmindSparkEmailID"
                style={{ ...styles.infoText, ...styles.email }}>
                {store.loginStore.getConfig.data.mindSparkEmailID}
              </SourceSansProRegTextView>
            </TouchableWithoutFeedback>
          </SourceSansProRegTextView>
        )}
        {userType === 'B2B' ?
          <SourceSansProRegTextView
            testID="forgotPasswordmindSparkEmailID"
            style={{ fontSize: TEXTFONTSIZE.Text18, textAlign: 'center', color: COLORS.b2bColor, fontWeight: '600', paddingHorizontal: 20 }}>
            {b2bUserInstForResetPassword}
          </SourceSansProRegTextView> : null}
      </View>
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
    textAlign: 'center'
  },
  subTitle: { fontSize: TEXTFONTSIZE.Text20, color: COLORS.orange },
  innerContainer: {
    paddingHorizontal: getWp(33),
    width: '100%',
  },
  submitBtn: {
    width: '100%',
    height: getHp(60),
    marginBottom: getHp(24),
  },
  btnText: { fontSize: TEXTFONTSIZE.Text16 },
  mrgnBtm24: { marginBottom: getHp(24), alignSelf: 'center' },
  mrgnBtm16: { marginBottom: getHp(16) },
  infoText: { fontSize: TEXTFONTSIZE.Text20, marginBottom: getHp(16), textAlign: 'center' },
  email: { color: COLORS.emailColor },
  messageText: {
    fontSize: TEXTFONTSIZE.Text20,
    marginBottom: getHp(30),
    textAlign: 'center',
  },
  okayButton: {
    width: getWp(100),
    height: getHp(50),
    marginBottom: getHp(24),
    alignSelf: 'center',
  },
});

export default observer(Screen);
