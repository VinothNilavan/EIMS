import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

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
    flexDirection : 'row',
    marginBottom : 5,
    height : getHp(100),
  },
  innerSubContainer: {
    top : 10,
    flexDirection : 'row',
    //left : 5,
    justifyContent : 'flex-start'
  },
  headerContainerCollapsed: {
    backgroundColor: 'transparent',
  },
  pedagogyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHp(0),
    marginBottom: getHp(20),
  },
  pedagogyListContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerBtnContainer: {
    justifyContent: 'center',
    left: getWp(15),
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
    alignSelf: 'center',
  },
  headerBtn: {
    width: getWp(70),
    height: getHp(52),
  },
  headerTitle: {
    color: COLORS.topicCardTitle,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'BalooThambi-Regular',
    width: getWp(235),
    fontSize: TEXTFONTSIZE.Text18,
    flexShrink: 1,
    marginLeft:30
  },
  collapsibleContainer: {
    marginTop: getHp(0),
    marginBottom: getHp(16),
    backgroundColor: 'white',
    borderBottomLeftRadius: getWp(12.4),
    borderBottomRightRadius: getWp(12.4),
    paddingHorizontal: getWp(16),
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
  sparkiePointsContainer: {
    marginStart: getWp(12),
  },
  sparkiePtsVal: {
    color: COLORS.topicCardTitle,
    fontSize: TEXTFONTSIZE.Text25,
    fontFamily: 'BalooThambi-Regular',
  },
  LeaderAndSparkieContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leadericonStyle: {
    alignSelf: 'flex-end',
    left: Dimensions.get('window').width / 2,
  },
  sparkiePtsLabel: {
    color: COLORS.topicCardTitle,
    fontSize: TEXTFONTSIZE.Text16,
    marginTop: -getHp(9),
    fontFamily: 'BalooThambi-Regular',
  },
  collapsibleBtnContainer: {
    marginTop: 3,
    bottom: getHp(17),
    alignSelf: 'center',
  },
  collBtn: {
    width: getWp(35),
    height: getWp(25),
  },
  sparkieImgContainer: {
    width: getWp(40),
    height: getWp(40),
  },
  sparkieImg: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    justifyContent: 'center',
  },
});