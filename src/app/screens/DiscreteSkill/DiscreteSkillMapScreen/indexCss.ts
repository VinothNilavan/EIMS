import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  modalContainerAlertStyle: {
    backgroundColor: COLORS.subtitleDarkBlue,
    paddingBottom: 0,
  },
  errorView: {
    padding: getWp(24),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: COLORS.white,
    fontSize: getWp(28),
    paddingTop: 16,
  },
  secondaryTextStyle: {
    color: COLORS.white,
    marginBottom: getHp(16),
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  subContainer: { flex: 90, backgroundColor: 'transparent' },
  innerSubContainer: {
    flex: 1,
  },
  topicStatContainer: { flex: 15, marginBottom: getHp(18), marginTop: getHp(15) },
  contentContainer: {
    flex: 65,
    marginBottom: getHp(26),
  },
  mapItemLRAlign: { marginBottom: -getHp(19) },
  higherLevelMap: {
    alignSelf: 'center',
    marginTop: getHp(27),
    marginBottom: getHp(17),
  },
  leftSideButtonsList: {
    flex: 1,
    paddingTop: getWp(12.4),
    paddingBottom: getWp(8.2),
  },
  btnOverlayText: {
    color: COLORS.orangeBg,
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
  },
  btmLeftBtnContainer: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(20.7),
    alignSelf: 'center',
    width: getWp(331.2),
    position: 'absolute',
    bottom: getHp(105),
  },
  btmLeftBtnSeparator: {
    width: getWp(331.2),
    height: 1,
    backgroundColor: COLORS.itemSeparatorBlue,
    opacity: 0.24,
  },
  btmBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: getHp(20),
    paddingHorizontal: getWp(20),
  },
  singleBtmBtn: {
    paddingHorizontal: getWp(50)
  },
  RTLbtmBtnContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: getHp(40),
    paddingHorizontal: getWp(20),
  },
  startBtn: {
    justifyContent: 'center'
  },
  btmBtnMainContainer: { flex: 15, backgroundColor: 'transparent' },
  leftArrowContainer: {
    width: getWp(65),
    height: getHp(60),
  },
  buddy: { position: 'absolute', right: getWp(16), top: getHp(18) },
  btmLeftBtnText: {
    color: COLORS.orange,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
  },
  btmRightBtnText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
  },
  btmBtnStyle: {
    width: getWp(179),
    height: getHp(60),
  },
  longBtnBtnStyle: {
    width: getWp(239),
  },
  footerContainerStyle: {
    height: getHp(60),
  },
});
