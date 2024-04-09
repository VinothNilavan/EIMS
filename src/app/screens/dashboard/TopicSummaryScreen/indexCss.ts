import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
  },

  subContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: DeviceInfo.isTablet() ? getHp(100) : getHp(50),
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buddyContainer: {
    position: 'absolute',
    right: getWp(16),
    top: getWp(0),
    marginTop: heightPercentageToDP('2'),
  },

  questionCountText: {
    fontSize: TEXTFONTSIZE.Text24,
    color: COLORS.white,
    marginTop: DeviceInfo.isTablet() ? -getHp(80) : getHp(0),
    textAlign: 'center',
  },

  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getWp(15),
    marginBottom: getWp(25),
  },

  titleText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
    // marginTop: getWp(-5),
    marginBottom: getHp(10),
    textAlign: 'center',
  },

  sparkieContainer: {
    alignSelf: 'flex-start',
    marginStart: getWp(20),
  },

  mrgnBtm30: {
    marginBottom: getHp(10),
  },
  mrgnBtm120: {
    marginBottom: DeviceInfo.isTablet() ? getHp(80) : getHp(50),
  },

  attemptCountText: {
    fontSize: TEXTFONTSIZE.Text22,
    color: COLORS.white,
    alignSelf: 'center',
  },

  attempmtContainer: {
    alignSelf: 'center',
    marginTop: getHp(12),
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: DeviceInfo.isTablet() ? getHp(0) : getHp(30),
    marginBottom: getWp(50),
  },

  btnText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text22,
    fontFamily: 'BalooThambi-Regular',
  },
  btnStyle: {
    height: getHp(80),
  },
  footerContainerStyle: {
    height: getHp(60),
  },
  numberSquareStyle: {
    alignItems: 'center'
  },
  attemptSvgStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  svgContainer: {
    width: getWp(60),
    height: getWp(60),
  },
  svgBgStyle: {
    width: '100%',
    height: '100%',
  },
  headerContainer: { alignItems: 'center', alignself: 'center' }
});
