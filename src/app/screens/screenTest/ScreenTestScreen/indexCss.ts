import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
  },

  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: getWp(21),
    paddingTop: hp('2'),
    marginLeft: getWp(12),
    marginRight: getWp(12),
    marginTop: getHp(40),
    height: Platform.OS === 'ios' ? hp('65') : hp('75'),
    backgroundColor: 'white',
  },

  questionCardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    height: getWp(46),
    top: getWp(-23),
    left: getWp(18),
    right: getWp(18),
    zIndex: 1,
  },

  RTLQuestionCardHeaderContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    height: getWp(46),
    top: getWp(-23),
    left: getWp(18),
    right: getWp(18),
    zIndex: 1,
  },

  soundIconContainer: {
    width: getWp(46),
    marginStart: getWp(10),
    marginTop: getHp(10),
    height: getWp(46),
    borderRadius: getWp(15),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    borderWidth: getWp(3),
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  RTLInstructorStimulusText: {
    width: getWp(270),
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.screenTestDescriptionTextColor,
    textAlign: 'right',
  },

  instructorStimulusContainer: {
    marginTop: getWp(16),
    marginLeft: getWp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },

  RTLInstructorStimulusContainer: {
    marginTop: getWp(16),
    marginLeft: getWp(16),
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },

  instructorStimulusTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  RTLInstructorStimulusTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  instructorStimulusText: {
    width: getWp(290),
    margin: getWp(5),
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.screenTestDescriptionTextColor,
  },

  questionNumberText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
  },

  sessionIDText: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.inputTextBlack,
    textAlign: 'center',
  },

  sessionIDTextOld: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.inputTextBlack,
    position: 'absolute',
    bottom: getHp(0),
    left: 0,
    right: 0,
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: getWp(20),
    left: 0,
    right: 0,
  },

  RTLButtonContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: getWp(20),
    left: 0,
    right: 0,
  },

  buttonText: {
    color: COLORS.soundButtonBackgroundColor,
  },

  timerContainer: {
    height: getHp(52),
    width: getWp(120),
    borderWidth: getWp(1),
    borderColor: COLORS.sessionTextColor,
    backgroundColor: COLORS.white,
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
  footerTextStyle: {
    marginTop: getHp(60),
  },

  RTLQbodyVoiceOverContainer: {
    marginTop: getWp(16),
    marginLeft: getWp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },

  QbodyVoiceOverContainer: {
    marginTop: getWp(16),
    marginLeft: getWp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
});
