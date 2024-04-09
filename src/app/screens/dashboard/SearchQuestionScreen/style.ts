import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  flexOne: {
    flex: 1
  },

  row: {
    flexDirection: 'row'
  },

  sessionIDText: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.inputTextBlack,
    position: 'absolute',
    bottom: getHp(0),
    left: 0,
    right: 0,
    textAlign: 'center',
  },

  headerContainer: {
    height: getHp(130),
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    position: 'absolute',
  },

  RTLHeaderContainer: {
    flexDirection: 'row-reverse',
    height: getHp(100),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: getWp(10),
    marginRight: getWp(10),
    marginTop: hp(2),
  },

  RTLSearchFieldContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: getWp(10),
    marginRight: getWp(10),
    marginTop: hp(2),
  },

  container: {
    flexDirection: 'row',
    minHeight: getHp(50),
    borderRadius: getWp(4),
    borderWidth: getWp(1),
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: getWp(16),
    width: getWp(120),
  },

  RTLContainer: {
    flexDirection: 'row-reverse',
    minHeight: getHp(50),
    borderRadius: getWp(4),
    borderWidth: getWp(1),
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: getWp(16),
    width: getWp(120),
  },

  input: {
    flex: 1,
    height: getHp(48),
    fontSize: TEXTFONTSIZE.Text14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.Cinder,
    padding: getWp(0),
    paddingHorizontal: getWp(16),
  },

  buttonContainer: {
    marginRight: getWp(11),
  },

  icon: {
    width: getWp(24),
    height: getHp(24),
  },

  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: getWp(21),
    marginLeft: getWp(12),
    marginRight: getWp(12),
    marginTop: getWp(20),
    marginBottom: getWp(60),
    height: Platform.OS === 'ios' ? hp('68') : hp('74'),
    backgroundColor: COLORS.white,
  },

  buttonTextstyle: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: getWp('24'),
  },

  roundButtonContainerStyle: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  instructorStimulusContainer: {
    marginTop: getWp(16),
    marginLeft: getWp(16),
    marginRight: getWp(16),
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
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.screenTestDescriptionTextColor,
    width: getWp(290),
  },

  RTLInstructorStimulusText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.screenTestDescriptionTextColor,
    textAlign: 'right',
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
    marginRight: getWp(12),
  },

  questionNumberText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
  },

  questionCardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: getWp(16),
    left: getWp(16),
    top: getWp(-23),
  },

  RTLQuestionCardHeaderContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    position: 'absolute',
    right: getWp(16),
    left: getWp(16),
  },

  questionTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: getWp(10),
  },

  RTLQuestionTagContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    position: 'absolute',
    right: getWp(10),
  },

  questionTagText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text14,
    position: 'absolute',
    left: getWp(60),
  },

  challengeQuestionText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text13,
    position: 'absolute',
    left: getWp(40),
  },

  footerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: getWp(-20),
    marginHorizontal: getWp(16),
  },

  RTLFooterButtonContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: getWp(-20),
    marginHorizontal: getWp(16),
  },

  footerButton: {
    backgroundColor: 'transparent',
  },

  footerButtonText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text24,
    color: COLORS.white,
  },

  headerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 0,
    marginTop: getWp(20),
    marginLeft: getWp(8),
    marginRight: getWp(8),
  },

  RTLHeaderButtonContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 0,
    marginTop: getWp(20),
    marginLeft: getWp(8),
    marginRight: getWp(8),
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
    justifyContent: 'flex-start',
  },
});