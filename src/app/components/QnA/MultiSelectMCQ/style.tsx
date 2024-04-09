import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: getWp(20),
    marginBottom: getWp(30),
    backgroundColor: COLORS.white,
  },

  scrollContentContainer: {
    margin: getWp(20),
  },

  questionContainer: {
    width: getWp(383),
    marginBottom: getWp(0),
    opacity: 0.99
  },

  optionContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getWp(10),
    marginLeft: getWp(10),
  },

  RTLoptionContainer: {
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: getWp(10),
    marginLeft: getWp(10),
    marginRight: getWp(16),
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
  },

  mcqItemBg: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getWp(14),
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderRadius: getWp(5),
  },

  RTLMcqItemBg: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: getWp(14),
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderRadius: getWp(5),
  },

  imageMCQOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: getWp(14),
    paddingRight: getWp(14),
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderRadius: getWp(5),
  },

  RTLImageMCQOptionContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingLeft: getWp(14),
    paddingRight: getWp(14),
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderRadius: getWp(5),
  },

  mcsqCheckbox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWp(20),
  },

  mcqTouchContainer: {
    justifyContent: 'center',
    width: getWp(40),
    height: getWp(40),
    borderRadius: getWp(20),
    alignItems: 'center',
  },

  optionHtmlContainer: {
    marginLeft: getWp(20),
    marginRight: getWp(20),
    paddingTop: getHp(10),
  },

  optionImageContainer: {
    marginLeft: getWp(20),
    marginRight: getWp(20),
  },

  optionIndex: {
    fontSize: TEXTFONTSIZE.Text22,
    color: COLORS.white,
  },
});
