/* eslint-disable prettier/prettier */
import {COLORS, TEXTFONTSIZE} from '@constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Platform, Dimensions} from 'react-native';
import {getWp, getHp} from '@utils';
const width = Dimensions.get('window').width;
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
      height:getWp(100),
      paddingRight: getWp(18),
      paddingLeft: getWp(13),
      paddingVertical: getHp(4.5),
    },

    RTLInnerContainer: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: hp('8.7'),
      paddingRight: wp('4.3'),
      paddingLeft: wp('3.1'),
      paddingVertical: hp('0.5'),
    },

    innerLeftContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginRight: getWp(13),
    },

    RTLInnerLeftContainer: {
      flex: 1,
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },

    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },

    RTLRow: {
      flexDirection: 'row-reverse',
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

    RTLinnerLeftSvg: {
      marginLeft: getWp(16),
    },

    innerLeftText: {
      fontSize: TEXTFONTSIZE.Text20,
      color: COLORS.leaderBoardTitleColor,
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
    webViewStyle: {
      width: getWp(320),
    },

    optionContainer: {
      minWidth: getWp(26),
      height: getWp(26),
      marginLeft: getWp(8),
      borderRadius: getWp(13),
      backgroundColor: COLORS.worksheetCorrectCountBackgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },

    optionOtherContainer: {
      minWidth: getWp(26),
      height: getWp(26),
      marginLeft: getWp(8),
      borderRadius: getWp(13),
      backgroundColor: COLORS.worksheetCorrectCountBackgroundColor,
      alignItems: 'center',
      paddingLeft: getWp(5),
      paddingRight: getWp(5),
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
      flex: 1,
      alignItems: 'flex-end',
      height: width > 360 ? getWp(80) : getHp(96),
      marginTop: '1%',
    },
    answerSubContainer: {
      flexDirection: 'row',
    },

    RTLanswerContainer: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'center',
    },

    answers: {
      textAlign: 'right',
      color: COLORS.leaderBoardTitleColor,
      fontSize: width > 392 ? TEXTFONTSIZE.Text16 : TEXTFONTSIZE.Text13,
    },
    answerVal: {
      // backgroundColor: COLORS.rightAnswerBg,
      // paddingHorizontal: getWp(6),
    },
    answerHeading: {
      color: COLORS.leaderBoardTitleColor,
      fontSize: TEXTFONTSIZE.Text16,
    },
    explainationTitle: {
      color: COLORS.answerText,
      fontSize: TEXTFONTSIZE.Text16,
      marginBottom: getHp(12),
      textAlign: 'center',
    },
    explainationContainer: {
      paddingBottom: getHp(16),
      paddingRight: getWp(15),
      paddingLeft: getWp(15),
      justifyContent: 'center',
    },
    explainationImageContainer: {
      width: getWp(175),
      height: getHp(220),
      marginTop: getHp(12),
      marginBottom: getHp(12),
      //transform: [{ rotate: '90deg' }]
    },
  },
};
