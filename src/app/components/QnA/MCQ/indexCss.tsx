import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    marginTop: getHp(18),
    marginBottom: getHp(18),
    paddingBottom: getHp(18),
    justifyContent: 'center',
    flex: 1,
    paddingTop: getHp(25),
  },
  innerContainer: {
    margin: getWp(8.2),
    paddingBottom: 0,
  },
  webViewContainer: {
    width: Dimensions.get('window').width - 20,
    justifyContent: 'center',
    alignContent: 'center',
    opacity: 0.99,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getWp(16),
    marginLeft: getWp(10),
    marginRight: getWp(10),
  },

  RTLOptionContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: getWp(16),
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

  mcqTouchContainer: {
    justifyContent: 'center',
    width: getWp(40),
    height: getWp(40),
    borderRadius: getWp(20),
    alignItems: 'center',
  },

  optionHtmlContainer: {
    marginLeft: getWp(20),
    paddingTop: getHp(10),
    marginRight: getWp(20),
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

  optionIndex: {
    fontSize: TEXTFONTSIZE.Text22,
    color: COLORS.white,
  },

  optionListStyle: {
    marginBottom: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  optionWebView: { width: getWp(194) },
});