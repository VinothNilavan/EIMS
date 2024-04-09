import { StyleSheet, Platform } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export const OtpStyles = StyleSheet.create({
  otpBg: {
    backgroundColor: 'white' 
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    minHeight: Platform.OS === 'ios' ? getHp(830) : getHp(860),
  },
  header: { marginBottom: getHp(42) },
  text: {
    fontSize: TEXTFONTSIZE.Text20,
  },
  subTitle: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.orange,
    marginTop: getHp(30),
  },

  innerContainer: {
    marginTop: getHp(40),
    alignItems: 'center',
    width: '100%',
  },
  submitBtn: {
    width: getWp(360),
    height: getHp(60),
    alignSelf: 'center',
    marginTop: getHp(30),
  },
  logoContainer: {
    width: getWp(190),
    height: getHp(110),
    marginTop: getHp(90),
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  otpInputContainer: {
    marginTop: getHp(20),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionStyle: {
    textAlign: 'center',
    marginTop: getHp(25),
    fontSize: TEXTFONTSIZE.Text20,
    marginHorizontal: 20
  },
  informationContainer: {
    marginTop: getHp(60),
    width: '80%',
    alignSelf: 'center',
  },
  changeInfoText: {
    fontSize: TEXTFONTSIZE.Text20,
  },
  resendOtpStyle: {
    marginTop: getHp(35),
    color: COLORS.orange,
    fontSize: TEXTFONTSIZE.Text16,
  },
  orangeColor: {
    color: COLORS.orange,
  },
  btnView: {
    display: 'flex',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  otpExpiry: {
    color: COLORS.inputHeaderColor,
    marginTop: getHp(30),
  }
});