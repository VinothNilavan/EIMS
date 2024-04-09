import { Dimensions } from 'react-native';
import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  qnaCard: {
    marginStart: getWp(20.7),
    borderRadius: getWp(16.5),
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.red,
    marginTop: getHp(45),
    flex: 1,
    marginEnd: getWp(20.7),
    marginBottom: getHp(45),
    shadowRadius: getWp(12.4),
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.5,
    elevation: 1,
    overflow: 'hidden',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: getWp(21),
    marginLeft: getWp(12),
    marginRight: getWp(12),
    marginTop: getHp(179.2),
    marginBottom: getHp(45),
    height: Platform.OS == 'ios' ? getHp(610) : getHp(630),
    backgroundColor: 'white',
  },

  soundIconContainer: {
    width: getWp(46),
    height: getWp(46),
    borderRadius: getWp(15),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    borderWidth: getWp(3),
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: getWp(-23),
    right: getWp(18),
    zIndex: 1,
  },

  questionNumberContainer: {
    width: getWp(46),
    height: getWp(46),
    borderRadius: getWp(15),
    backgroundColor: COLORS.qnaNumber,
    borderWidth: getWp(3),
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: getWp(-23),
    left: getWp(18),
    zIndex: 1,
  },

  questionNumberText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
  },

  questionTagContainer: {
    // width: getWp(46),
    // height: getWp(46),
    // borderRadius: getWp(15),
    // backgroundColor: COLORS.qnaNumber,
    // borderWidth: getWp(3),
    // borderColor: COLORS.white,
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'absolute',
    top: getWp(-15),
    left: getWp(64),
    zIndex: 1,
  },

  sessionIDText: {
    fontSize: TEXTFONTSIZE.Text11,
    color: COLORS.infoMessageGray,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: getWp(-20),
  },

  timerContainer: {
    position: 'absolute',
    left: getWp(200),
    top: getWp(-23),
  },

  timeTestDetailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  timeTestTitle: {
    fontSize: TEXTFONTSIZE.Text18,
    marginTop: getHp(40),
    paddingHorizontal: getWp(20),
    textAlign: 'center',
  },

  challengeQuestion: {
    position: 'absolute',
    top: getWp(-13),
    left: getWp(52),
  },

  questionContainer: {
    marginTop: getHp(40),
    marginLeft: getWp(16),
    marginRight: getWp(16),
  },

  bottomBtnContainer: {
    flex: 1,
    elevation: 3,
    position: 'absolute',
    bottom: getHp(30),
    backgroundColor: 'transparent',
    marginLeft: 16,
  },

  bottomBtnSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: screenWidth - 32,
    justifyContent: 'space-between',
  },

  skipButtonContainer: {
    marginBottom: getHp(5),
  },

  leftButtons: { flexDirection: 'row', justifyContent: 'flex-start' },
  bottomBtnText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: getWp('24'),
  },
  bottomRightBtnSize: {
    width: getWp(145),
    height: Platform.OS == 'ios' ? getHp(45) : getHp(48),
  },
  bottomLeftSvgSize: {
    height: getWp(48),
    width: getWp(48),
  },
  headerContainer: {
    marginTop: getHp(27),
    paddingStart: getWp(20.7),
    paddingEnd: getWp(20.7),
    width: '100%',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomRightRadius: getWp(20.7),
    borderBottomLeftRadius: getWp(20.7),
  },
  headerContainerCollapsed: {
    backgroundColor: 'transparent',
  },
  pedagogyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pedagogyListContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    height: getHp(52),
  },
  headerTitle: {
    color: COLORS.topicCardTitle,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'BalooThambi-Regular',
    width: getWp(269),
  },
  collapsibleContainer: {
    marginTop: getHp(16),
    marginBottom: getHp(16),
    backgroundColor: 'white',
    borderBottomLeftRadius: getWp(12.4),
    borderBottomRightRadius: getWp(12.4),
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
    marginTop: getHp(18),
    justifyContent: 'center',
    marginStart: getWp(8.2),
  },
  sparkiePointsContainer: { marginStart: getWp(33) },
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
  collapsibleBtnContainer: { alignSelf: 'center' },
  collBtn: {
    width: getWp(35),
    height: getWp(25),
  },
  footerContainerStyle: {
    height: getHp(60),
  },
  mrgnRight6: {
    marginRight: getWp(4),
  },
  buttonText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: getWp('20'),
  }
});
