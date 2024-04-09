import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import DeviceInfo from 'react-native-device-info';

let phoneLineHeight = DeviceInfo.isTablet ? 30 : 18;
let lineHeight = Platform.isPad ? 0 : phoneLineHeight;

export default StyleSheet.create({
  headerContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomRightRadius: getWp(20.7),
    borderBottomLeftRadius: getWp(20.7),
  },
  innerContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: '100%',
    flex: 1,
    paddingBottom: 5
  },
  innerSubContainer: {
    flex: 1,
    paddingHorizontal: getWp(16),
    paddingBottom: 10
  },
  headerContainerCollapsed: {
    backgroundColor: 'transparent',
  },
  pedagogyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '2%',
    flex: 0.5
  },
  pedagogyListContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerBtnContainer: {
    position: 'absolute',
    bottom: getHp(20),
    left: getWp(16),
  },
  csHtmlStyle: {
    width: getWp(4),
    height: getWp(4),
  },
  headerBtnText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text16,
  },
  headerBtnStyle: {
    marginTop: getHp(18),
    alignSelf: 'center',
  },
  headerBtn: {
    width: getWp(56),
    height: getWp(52),
  },
  headerTitle: {
    color: COLORS.topicCardTitle,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'BalooThambi-Regular',
    width: '87%',
    marginLeft: '12%',
    lineHeight: lineHeight,
    padding: '2%',
    marginTop: '2%',
    flex: 1,
    flexShrink: 1
  },
  collapsibleContainer: {
    marginTop: getHp(16),
    marginBottom: getHp(16),
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: getWp(12.4),
    borderBottomRightRadius: getWp(12.4),
    paddingHorizontal: getWp(16),
    shadowOpacity: 10,
    shadowColor: COLORS.cardShadowColor,
    elevation: 10,
  },
  collapsibleSubContainer: { flexDirection: 'row' },
  blueCountContainer: {
    width: getWp(62),
    height: getHp(36),
    borderRadius: getWp(12.4),
    justifyContent: 'center',
    backgroundColor: COLORS.skyBlue,
  },
  blueCountText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text16,
    fontFamily: 'BalooThambi-Regular',
    textAlign: 'center',
  },
  pedChildTitle: {
    color: COLORS.topicCardTitle,
    fontSize: TEXTFONTSIZE.Text14,
    textAlign: 'left',
    marginEnd: getWp(83),
    marginStart: getWp(20.7),
  },
  sparkieContainer: {
    flexDirection: 'row',
    marginTop: getHp(10),
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginStart: getWp(8.2),
  },
  sparkiePointsContainer: { marginStart: getWp(12) },
  sparkiePtsVal: {
    color: COLORS.topicCardTitle,
    fontSize: TEXTFONTSIZE.Text25,
    fontFamily: 'BalooThambi-Regular',
  },
  sparkiePtsLabel: {
    color: COLORS.topicCardTitle,
    fontSize: TEXTFONTSIZE.Text16,
    marginTop: -getHp(9),
    fontFamily: 'BalooThambi-Regular',
  },
  collapsibleBtnContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginTop: '1%',
  },
  collBtn: {
    width: getWp(35),
    height: getWp(18),
  },
});
