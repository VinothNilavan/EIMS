import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { RoundedButton, SourceSansProRegTextView } from '@components';
import { getHp } from '@utils';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '@mobx/hooks';
import { ScreenNames } from '@constants';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { useLanguage } from '@hooks';

const LoginFooterBtn = props => {
  const {
    type,
    text,
    onPress,
    containerStyle,
    textStyle,
    btnStyle,
    ppContainerStyle,
    forgotpassword,
    isForgotPasswordShown
  } = props;
  const navigation = useNavigation();
  const { forgotPasswordText } = useLanguage();
  const { loginStore } = useStores();

  let btnContainerStyle = {
    ...styles.container,
    ...containerStyle,
  };

  if (ppContainerStyle) {
    btnContainerStyle = {
      ...ppContainerStyle,
    };
  }

  const onForgotPassWordClick = () => {
    loginStore.setIsOtpLogin(false);
    navigation.navigate(ScreenNames.ForgotPasswordScreen);
  };

  let forgotPassword = (
    <TouchableWithoutFeedback onPress={onForgotPassWordClick}>
      <View>
        <SourceSansProRegTextView
          testID="LoginFooterBtnforgotPasswordText"
          style={{ ...styles.text, ...styles.subTitle }}>
          {forgotPasswordText}
        </SourceSansProRegTextView>
      </View>
    </TouchableWithoutFeedback>
  );

  if (!forgotpassword) {
    forgotPassword = null;
  }

  return (
    <View style={btnContainerStyle}>
      {isForgotPasswordShown ? forgotPassword : null}
      <RoundedButton
        testID="RoundedButtonLoginFooterBtn"
        type={type}
        text={text}
        width={btnStyle.width ? btnStyle.width : styles.submitBtn.width}
        height={btnStyle.height ? btnStyle.height : styles.submitBtn.height}
        borderRadius={50}
        containerStyle={{ ...styles.submitBtn, ...btnStyle }}
        onPress={onPress}
        textStyle={{ ...styles.btnText, ...textStyle }}
        {...props}
      />
    </View>
  );
};

LoginFooterBtn.propTypes = {
  testID: PropTypes.string,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  btnStyle: PropTypes.object,
  isForgotPasswordShown: PropTypes.bool,
  type: PropTypes.string,
  forgotpassword: PropTypes.bool,
};

LoginFooterBtn.defaultProps = {
  testID: 'LoginFooterBtn',
  text: 'LOGIN',
  type: 'primaryOrange',
  isForgotPasswordShown: true,
  onPress: () => alert('clicked!'),
  btnStyle: {
    width: '100%',
    height: getHp(60),
  },
  forgotpassword: true,
};

export default LoginFooterBtn;