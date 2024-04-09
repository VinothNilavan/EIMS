import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp, getHp} from '@utils';

export default {
  generic: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.howIdidFooter,
      width: '100%',
      borderBottomLeftRadius: getWp(20),
      borderBottomRightRadius: getWp(20),
    },
    innerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: getHp(78),
      paddingRight: getWp(18),
      paddingLeft: getWp(13),
      paddingVertical: getHp(4.5),
    },
    innerLeftContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginRight: getWp(13),
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    innerLeftSvg: {
      marginRight: getWp(12),
    },
    innerLeftSvgStyle: {
      width: getWp(21),
      height: getWp(21),
    },
    innerLeftText: {
      fontSize: TEXTFONTSIZE.Text20,
      color: COLORS.secondaryBlack,
      textAlign: 'left',
    },
    innerRightContainer: {flex: 1},
    yourAnswer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: getHp(4.5),
    },
    answerText: {
      fontSize: getWp(15.7),
      color: COLORS.answerText,
      marginRight: getWp(8),
    },
    wrongAnswerMCQOption: {
      backgroundColor: COLORS.btnColor,
      color: COLORS.wrongAnswerText,
    },
    rightAnswerMCQOption: {
      backgroundColor: COLORS.mapTextBlue,
      color: COLORS.rightAnswerText,
    },
    collapsibleContainer: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
    },
    explanationView: {
      paddingLeft: getWp(44),
      paddingRight: getWp(10),
      paddingTop: getHp(40.3),
      paddingBottom: getHp(23.2),
    },
    webViewStyle: {
      width: getWp(310.5),
    },

    optionContainer: {
       width: getWp(26),
       height: getWp(26),
      marginLeft: getWp(8),
      borderRadius: getWp(13),
      backgroundColor: COLORS.worksheetCorrectCountBackgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionContainerWithDim: {
      marginLeft: getWp(8),
      borderRadius: getWp(13),
      backgroundColor: COLORS.worksheetCorrectCountBackgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionContainerWrong: {
      backgroundColor: COLORS.wrongAnswerBg,
    },
    optionContainerRight: {
      backgroundColor: COLORS.rightAnswerBg,
    },

    option: {
      fontSize: TEXTFONTSIZE.Text14,
      color: COLORS.white,
    },
    optionRight: {
      color: COLORS.rightAnswerText,
    },
    optionWrong: {
      color: COLORS.wrongAnswerText,
    },
    answerContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
    },
    answerSubContainer: {
      flexDirection: 'row',
      marginLeft: getWp(10),
    },

    answers: {
      textAlign: 'right',
    },
    answerVal: {
      // backgroundColor: COLORS.rightAnswerBg,
      // paddingHorizontal: getWp(6),
    },
    answerHeading: {
      color: COLORS.answerText,
      fontSize: TEXTFONTSIZE.Text16,
    },
  },
};
