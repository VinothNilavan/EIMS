import { StyleSheet, Platform } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: hp('100'),
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: getWp(32),
    paddingTop: getHp(80),
    alignItems: 'center',
  },
  logoContainer: {
    width: getWp(190),
    height: getHp(110),
    marginBottom: getHp(80),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: TEXTFONTSIZE.Text28,
    color: COLORS.subtitleDarkBlue,
    marginBottom: getHp(36),
    textAlign: 'center',
    marginTop: Platform.isPad ? getHp(15) : -40,
  },
  input: {
    width: '100%',
    height: getHp(60),
    justifyContent: 'center',
    textAlign: 'center',
    borderColor: COLORS.disabledGray,
    borderWidth: 1,
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.subtitleDarkBlue,
    marginBottom: getHp(24),
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: Platform.isPad ? getHp(20) : getHp(56),
  },
  footerSvg: {
    width: getWp(78),
    height: getHp(130),
  },
  footerText: {
    fontSize: TEXTFONTSIZE.Text20,
    marginLeft: 5,
    marginBottom: getHp(16)
  },
  link: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.primary,
  },
  errorMessage: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text13,
    textAlign: 'left',
    marginTop: getHp(5),
    marginLeft: getWp(12),
    alignSelf: 'center'
  },
  inputContainerStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.disabledGray,
    borderRadius: getHp(60),
    height: getHp(60),
  },
  textContainerStyle: {
    backgroundColor: 'transparent',
    height: getHp(60),
    paddingLeft: 0
  },
  textInputStyle: {
    height: getHp(60),
    fontSize: TEXTFONTSIZE.Text20,
  },
  codeTextStyle: {
    fontSize: TEXTFONTSIZE.Text20
  },
  countryPickerStyle: {
    width: getWp(80),
  },
  btnContainer: {
    marginTop: getHp(15),
    marginBottom: getHp(20)
  },
  seperator: {
    height: 30,
    width: 1,
    zIndex: 1,
    backgroundColor: COLORS.disabledGray,
    position: 'absolute',
    left: DeviceInfo.isTablet() ? 120 : 72,
    top: DeviceInfo.isTablet() ? 20 : 10
  },
  footerTextContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    position: 'relative',
    marginTop: getHp(64),
  },
  linkContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: getHp(60),
    paddingHorizontal: 7,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(60),
    alignSelf: 'center',
    elevation: 0,
    width: '100%',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
  },
  link1: {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.primary,
  },
});