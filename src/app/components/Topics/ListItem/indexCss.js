import { StyleSheet,Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  cardTag: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 2,
    borderTopLeftRadius: getWp(50),
    overflow: 'hidden',
    height: getHp(26),
  },
  cardTagText: {
    fontSize: TEXTFONTSIZE.Text13,
    color: COLORS.white,
    paddingLeft: getWp(20),
    paddingRight: getWp(20),
  },
  cardTagSvgStyle: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  cardUpperTag: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getWp(33),
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: COLORS.cardUpperTag,
  },
  cardUpperTagText: {
    fontSize: TEXTFONTSIZE.Text13,
    color: COLORS.white,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  btnLeftContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginEnd: getWp(10),
  },
  imageHolder: { width: getWp(35), height: getHp(35) },
  btnMidContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  btnMidUpperText: {
    color: COLORS.topicCardTitle,
    includeFontPadding: false,
    marginBottom: -getHp(5),
    textAlignVertical: 'bottom',
    textAlign: 'left',
    fontSize: DeviceInfo.isTablet() ? TEXTFONTSIZE.Text18 : TEXTFONTSIZE.Text20,
    lineHeight: Platform.isPad || DeviceInfo.isTablet() ? getHp(32) : getHp(26),
    paddingTop: getHp(10),
  },
  disabledStyle: {
    color: COLORS.disabledText,
  },
  btnMidLowerText: {
    fontSize: TEXTFONTSIZE.Text13,
    color: COLORS.infoMessageGray,
    textAlign: 'left',
    lineHeight: Platform.isPad || DeviceInfo.isTablet() ? getHp(20) : getHp(13),
    paddingTop: getHp(10),
  },
  btnRightContainer: {
    flex: 1,
    alignItems: 'flex-end',
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
  svgbg: {
    paddingVertical: getHp(25),
  },
  topicItem: { },
  svgBgContainer: {
    minHeight: getHp(110),
  },
  rightSvgText: {
    fontSize: TEXTFONTSIZE.Text13,
    color: COLORS.secondaryBlack,
  },
});
