import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

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
    marginLeft: getWp(16),
    marginRight: getWp(16),
    marginTop: getHp(182),
    marginBottom: getHp(45),
    height: Platform.OS == 'ios' ? getHp(582.4) : getHp(672),
    backgroundColor: 'white',
    paddingTop: getHp(20),
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
    width: getWp(48),
    height: getWp(48),
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
    position: 'absolute',
    top: getWp(-15),
    left: getWp(66),
    zIndex: 1,
  },

  sessionIDText: {
    fontSize: TEXTFONTSIZE.Text11,
    color: COLORS.infoMessageGray,
    position: 'absolute',
    bottom: getHp(0),
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

  buttonText: {
    color: COLORS.soundButtonBackgroundColor,
  },

  timerContainer: {
    position: 'absolute',
    right: getWp(18),
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
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: getHp(53.7),
    alignItems: 'center',
    position: 'absolute',
    marginLeft: getWp(16),
    bottom: getHp(30),
    alignSelf: 'center',
    width: getWp(360),
    justifyContent: 'space-between',
  },
  leftButtons: { flexDirection: 'row', justifyContent: 'flex-start' },
  bottomBtnText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text22,
  },
  bottomRightBtnSize: {
    width: getWp(145),
    height: Platform.OS == 'ios' ? getHp(45) : getHp(48),
  },
  bottomLeftSvgSize: {
    height: getWp(48),
    width: getWp(48),
  },
  csHtmlStyle: {
    width: getWp(4),
    height: getWp(4),
  },
  headerBtnText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text16,
  },
  headerBtnContainer: {
    marginTop: getHp(18),
    alignSelf: 'center',
  },
  headerBtn: {
    width: getWp(56),
    height: getHp(52),
  },

  shadow: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  headerContainer: {
    paddingStart: wp('5'),
    paddingEnd: wp('5'),
    width: wp('100'),
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderBottomRightRadius: wp('5'),
    borderBottomLeftRadius: wp('5'),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleStyle: {
    color: COLORS.topicCardTitle,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'BalooThambi-Regular',
    width: wp('65'),
    fontSize: wp(4.3),
    lineHeight: hp(2),
    paddingTop: hp(1),
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  collapsableContainer: {
    marginTop: hp('2'),
    marginBottom: hp('2'),
    backgroundColor: 'white',
    borderBottomLeftRadius: wp('3'),
    borderBottomRightRadius: wp('3'),
  },

  countText: {
    width: wp('15'),
    height: hp('4'),
    borderRadius: wp('3'),
    justifyContent: 'center',
    backgroundColor: COLORS.skyBlue,
    color: COLORS.white,
    fontSize: hp('1.8'),
    fontFamily: 'BalooThambi-Regular',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  pedagogyChildTitle: {
    color: COLORS.topicCardTitle,
    fontSize: hp('1.5'),
    textAlign: 'left',
    marginEnd: wp('20'),
    marginStart: wp('5'),
  },

  sparkyProgressView: {
    flexDirection: 'row',
    marginTop: hp('2'),
    justifyContent: 'center',
    marginStart: wp('2'),
  },

  marginStart8: { marginStart: wp('8') },

  marginStart5: { marginStart: wp('5') },

  alignSelfCenter: { alignSelf: 'center' },

  rewardInfo: {
    color: COLORS.topicCardTitle,
    fontSize: hp('2.5'),
    fontFamily: 'BalooThambi-Regular',
  },

  sparkies: {
    color: COLORS.topicCardTitle,
    fontSize: hp('2.5'),
    fontFamily: 'BalooThambi-Regular',
  },
  worksheetQuestionTag: {
    position: 'absolute',
    top: getWp(-13),
    left: getWp(52),
  },
  worksheetSvg: {
    width: getWp(140),
    height: getWp(26),
  },
});
