import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';


export default {
  generic: {
    container: {
      marginTop: getHp(30),
      width: getWp(393),
      alignSelf: 'center',
    },
    innerContainer: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderTopLeftRadius: getWp(20),
      borderTopRightRadius: getWp(20),
      backgroundColor: 'white',
      paddingHorizontal: getWp(10),
      paddingVertical: getHp(20),
    },
    roundedBottom: {
      borderBottomLeftRadius: getWp(20),
      borderBottomRightRadius: getWp(20),
    },
    conceptContainer: { flexDirection: 'row', marginBottom: getHp(20.6) },
    tagContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: getHp(39.4),
    },
    tagText: {
      color: COLORS.answerText,
      fontSize: getWp(15.7),
      textAlign: 'left',
    },
    conceptText: { fontSize: TEXTFONTSIZE.Text14, color: COLORS.conceptsColor },
    questionTimeTakenContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    RTLquestionTimeTakenContainer: {
      flex: 1,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    questionContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    RTLquestionContainer: {
      flex: 1,
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
    questionText: {
      fontSize: TEXTFONTSIZE.Text20,
      color: COLORS.screenTestDescriptionTextColor,
      marginRight: getWp(10),
    },
    passageText: {
      fontSize: TEXTFONTSIZE.Text18,
    },
    questionSvg: {
      width: getWp(24),
      height: getWp(24),
    },
    timeContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    RTLtimeContainer: {
      flex: 1,
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    timeSvg: {
      width: getWp(18.6),
      height: getWp(19),
      marginRight: getWp(10),
    },
    RTLtimeSvg: {
      width: getWp(18.6),
      height: getWp(19),
      marginLeft: getWp(10),
    },
    timeText: {
      fontSize: TEXTFONTSIZE.Text12,
      color: COLORS.screenTestDescriptionTextColor,
    },
    optionContainer: { flex: 1, marginTop: getHp(19.7) },
    star: { position: 'absolute', top: -getHp(24), right: getWp(20.7) },
    starSvg: {
      width: getWp(53),
      height: getHp(53),
    },
    questions: {
      flex: 1,
      width: getWp(393),
    },
  },
  challenge: {
    innerContainer: {
      paddingVertical: getHp(27.7),
    },
  },
  activity: {
    innerContainer: {
      paddingVertical: getHp(27.7),
    },
  },
  timed: {
    innerContainer: {
      paddingVertical: getHp(27.7),
    },
  },
  skippedText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.skipText,
  },
  passageView: {
    paddingVertical: getHp(15),
    paddingHorizontal: getWp(10),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    borderBottomColor: COLORS.inputTextBorder,
    borderBottomWidth: 1,
    marginBottom: getHp(10),
  },
  RTLpassageView: {
    flexDirection: 'row-reverse',
    flex: 1,
    borderBottomColor: COLORS.inputTextBorder,
    borderBottomWidth: 1,
    marginBottom: getHp(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: getHp(15),
  },
  footerButtonText: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.white,
  },
  footerButton: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
  },

  RTLFooterButton: {
    backgroundColor: 'transparent',
    marginRight: getWp(4),
    alignSelf: 'flex-end',
  },
};
