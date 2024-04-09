import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import DeviceInfo from 'react-native-device-info';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  containerStyle: {
    borderRadius: getWp(100),
    paddingHorizontal: 0,
    paddingTop: 0,
    minHeight: getHp(460),
    backgroundColor: COLORS.worksheetReportQuestionOptionColor,
  },

  containerWhiteStyle: {
    borderRadius: getWp(100),
    paddingHorizontal: 0,
    minHeight: getHp(560),
    justifyContent: 'flex-start',
    paddingTop: 0,
    backgroundColor: COLORS.white,
  },

  whiteBackground: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: getWp(100),
    borderTopRightRadius: getWp(100),
    paddingTop: getHp(35),
  },

  container: {
    width: '100%',
    alignItems: 'stretch',
  },

  modalHeader: {
    marginTop: getHp(30),
    position: 'absolute',
    alignSelf: 'center',
    fontSize: TEXTFONTSIZE.Text32,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: DeviceInfo.isTablet() ? getHp(64) : getHp(44),
    color: COLORS.statTextColor,
    padding: 0,
  },

  headerSvg: {
    marginTop: getHp(10),
    width: getWp(230),
    height: getHp(110),
    alignSelf: 'center',
  },

  detailsContainer: {
    alignItems: 'center',
    paddingHorizontal: getWp(16),
  },

  testTitle: {
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text18,
    marginTop: getHp(60),
    color: COLORS.screenTestDescriptionTextColor,
  },

  timeTest: {
    marginTop: getHp(25),
  },

  messageTitle: {
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text20,
    marginVertical: getHp(100),
  },

  info: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.errorMessage,
  },

  subTitle: {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.screenTestDescriptionTextColor,
    textAlign: 'center',
    marginTop: getHp(25),
  },

  btn: {
    width: getWp('210'),
    height: getHp('70'),
  },

  btnContainer: {
    position: 'absolute',
    flexDirection: 'row',
    // alignSelf: 'center',
    bottom: getHp(55),
    borderRadius: getWp(13),
  },

  btnText: {
    color: COLORS.orange,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text22,
  },

  timercontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: getHp(12),
  },

  innerContainer: {
    alignItems: 'center',
  },

  text: {
    fontSize: TEXTFONTSIZE.Text32,
    color: COLORS.explanationGreen,
    marginBottom: -getHp(10),
  },

  label: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.screenTestDescriptionTextColor,
  },

  separator: {
    fontSize: TEXTFONTSIZE.Text16,
    marginTop: getHp(2),
    color: COLORS.explanationGreen,
  },

  separatorContainer: {
    paddingHorizontal: getWp(8),
  },
});
