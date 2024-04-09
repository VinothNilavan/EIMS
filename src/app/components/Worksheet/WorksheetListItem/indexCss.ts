import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  cardTag: {
    height: getHp(22),
    width: getWp(170),
    marginTop: getHp(5),
    overflow: 'hidden',
  },

  cardTagText: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.white,
    paddingLeft: getWp(15),
    paddingRight: getWp(30),
  },

  cardTagSvgStyle: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },

  cardUpperTag: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getWp(18),
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: getHp(22),
    alignSelf: 'center',
  },

  highlightColor: {
    backgroundColor: COLORS.cardUpperTag,
  },

  submitColor: {
    backgroundColor: COLORS.worksheetReportQuestionOptionColor,
  },

  submitTextColor: { color: COLORS.conceptsColor },

  cardUpperTagText: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.white,
    alignSelf: 'center',
    textAlign: 'center',
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },

  marginTop: {
    marginTop: getHp(20),
  },

  btnLeftContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: getWp(16),
  },

  imageHolder: { width: getWp(40), height: getWp(40) },

  btnMidContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: getWp(8),
  },

  btnMidUpperText: {
    color: COLORS.topicCardTitle,
    includeFontPadding: false,
    marginBottom: -getHp(8),
    textAlignVertical: 'bottom',
    textAlign: 'left',
    fontSize: TEXTFONTSIZE.Text20,
    lineHeight: Platform.isPad || DeviceInfo.isTablet() ? getHp(35) : getHp(26),
    paddingTop: getHp(12),
    marginTop: getHp(5),
  },

  btnMidLowerText: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.infoMessageGray,
    textAlign: 'left',
    lineHeight: getHp(13),
    paddingTop: getHp(10),
  },

  btnRightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: getWp(14),
  },

  rightSvgStyle: {
    width: getWp(49),
    height: getHp(39),
  },

  rightLottieStyle: {
    width: getWp(49),
    height: getHp(49),
    marginBottom: -getHp(5),
  },

  topicItem: {
    overflow: 'hidden',
    borderRadius: getWp(30),
  },

  svgbg: {
    paddingBottom: getHp(45),
    minHeight: getHp(110),
  },

  svgBgContainer: {
    minHeight: getHp(110),
  },

  rightSvgText: {
    fontSize: TEXTFONTSIZE.Text13,
    color: COLORS.secondaryBlack,
  },

  buttonText: {
    color: COLORS.progressBlue,
    fontSize: TEXTFONTSIZE.Text16,
    lineHeight: getWp(16),
    includeFontPadding: false,
    textAlign: 'center',
    paddingTop: getHp(8),
  },

  doneStyle: {
    alignSelf: 'center',
  },
});
