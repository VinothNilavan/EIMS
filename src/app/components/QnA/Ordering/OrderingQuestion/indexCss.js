import { StyleSheet } from 'react-native';
import { getWp, getHp, deviceWidth } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: getHp(68),
    marginTop: getWp(10),
    alignSelf: 'center',
    justifyContent: 'center',
  },

  RTLContainer: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    minHeight: getHp(68),
    marginTop: getWp(10),
    alignSelf: 'center',
  },

  optionContainer: {
    flexDirection: 'row',
    width: deviceWidth() - 80,
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderRadius: getWp(5),
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: getWp(1),
    borderStyle: 'dashed',
    borderColor: COLORS.dotLineColor,
    padding: getWp(16),
    textAlign:'center',
    paddingRight:getWp(40)
  },

  RTLoptionContainer: {
    flexDirection: 'row-reverse',
    width: getWp(280),
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderRadius: getWp(5),
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: getWp(1),
    borderStyle: 'dashed',
    borderColor: COLORS.dotLineColor,
    padding: getWp(16),
  },

  indexContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: getWp(40),
    height: getWp(40),
    borderRadius: getWp(20),
    backgroundColor: COLORS.statTextColor,
  },

  indexText: {
    fontSize: TEXTFONTSIZE.Text22,
    color: COLORS.white,
  },

  arrangeLetterContainerChildView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: getWp(10),
    textAlign:'center',
    minHeight: getHp(30),
  },

  webviewContainer: {
    width: getWp(180),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
