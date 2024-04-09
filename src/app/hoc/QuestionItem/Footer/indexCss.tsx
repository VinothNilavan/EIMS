import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import DIMEN from '@constants/DIMEN';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {getWp, getHp} from '@utils';
import DeviceInfo from 'react-native-device-info';

export default {
  soundIcon: {
    width: getWp(20),
    height: getWp(20),
  },
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
      //flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginRight: getWp(13),
      width: '40%',
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
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    explanationView: {
      // paddingLeft: getWp(44),
      // paddingRight: getWp(10),
      paddingTop: getHp(5), //getHp(40.3),
      paddingBottom: getHp(23.2),
    },
    webViewStyle: {
      width: getWp(375),
    },
    myAudio: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
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
      alignItems: 'flex-end',
      width: '50%',
      marginRight:15,
      right:0,
      position : 'absolute'
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
