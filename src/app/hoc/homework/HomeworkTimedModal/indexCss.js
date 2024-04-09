import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  container: {
    borderRadius: getWp(100),
    paddingHorizontal: 0,
    minHeight: getHp(560),
    justifyContent: 'flex-start',
    paddingTop: 0,
    backgroundColor: COLORS.white,
  },

  subContainer: {
    width: '100%',
    alignItems: 'stretch',
  },

  whiteBackground: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: getWp(100),
    borderTopRightRadius: getWp(100),
    paddingTop: getHp(35),
  },

  modalHeader: {
    marginTop: getHp(30),
    position: 'absolute',
    alignSelf: 'center',
    fontSize: TEXTFONTSIZE.Text32,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: DeviceInfo.isTablet() ? getHp(60) : getHp(44),
    color: COLORS.statTextColor,
    padding: 0,
  },

  hwSubmitmodalHeader: {
    marginTop: getHp(40),
    position: 'absolute',
    alignSelf: 'center',
    fontSize: TEXTFONTSIZE.Text32,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: DeviceInfo.isTablet() ? getHp(60) : getHp(44),
    color: COLORS.statTextColor,
     padding:getWp(20)
  },

  headerSvg: {
    marginTop: getHp(10),
    width: getWp(230),
    height: getHp(110),
    alignSelf: 'center',
  },

  messageTitle: {
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text16,
  },

  submitHwmessageTitle: {
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text18,
    padding:getWp(20),
    marginTop:getWp(40)
  },

  btn: {
    height: getHp('70'),
    width: getWp('300')
  },

  btnContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: getHp(55),
    borderRadius: getWp(13),
  },

  btnText: {
    color: COLORS.orange,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text22,
  },

  btnHwText :{
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text22,
  },

  dueDateText: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text16,
    textAlign: 'center',
    marginTop: getHp(100),
},
});
