import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  answerContainer: {
    flexDirection: 'row',
    width: getWp(331),
    height: getHp(81),
    borderWidth: getWp(3),
    borderColor: COLORS.secondaryBlack,
    marginTop: getHp(9),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getWp(20),
  },

  RTLAnswerContainer: {
    flexDirection: 'row-reverse',
    width: getWp(331),
    height: getHp(81),
    borderWidth: getWp(3),
    borderColor: COLORS.secondaryBlack,
    marginTop: getHp(9),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getWp(20),
  },

  text: {
    fontSize: TEXTFONTSIZE.Text24,
    alignSelf: 'center',
  },

  optionContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: getWp(8),
    marginRight: getWp(8),
    minWidth: getWp(30),
    minHeight: getWp(30),
    maxWidth: getWp(190),
    paddingLeft: getWp(10),
    paddingRight: getWp(10),
    borderRadius: getWp(15),
    backgroundColor: COLORS.explanationGreen,
  },

  optionText: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.white,
  },
});
