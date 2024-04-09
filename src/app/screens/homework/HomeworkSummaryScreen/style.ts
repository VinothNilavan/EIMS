import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  footerContainer: {
    height: getHp(60),
  },

  scrollContainer: {
    alignItems: 'center',
  },

  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getHp(50),
  },

  dividerContainer: {
    marginBottom: getHp(60),
  },

  questionCountText: {
    fontSize: TEXTFONTSIZE.Text24,
    color: COLORS.white,
    textAlign: 'center',
  },

  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getWp(15),
    marginBottom: getWp(25),
  },

  squareNumberContainer: {
    alignItems: 'center',
  },

  wrongSquareContainer: {
    backgroundColor: COLORS.pink,
  },

  subjectiveSquareContainer: {
    backgroundColor: COLORS.subjectiveQuestionBackgroundColor,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getHp(35),
    marginBottom: getWp(50),
  },
  buttonText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text22,
    fontFamily: 'BalooThambi-Regular',
  },
});
