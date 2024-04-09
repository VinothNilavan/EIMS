import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default {
  generic: {
    container: {
      marginHorizontal: getWp(16),
    },
    innerContainer: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderTopLeftRadius: getWp(20),
      borderTopRightRadius: getWp(20),
      backgroundColor: 'white',
      paddingHorizontal: getWp(20),
      paddingVertical: getHp(46.5),
    },
    conceptContainer: { flexDirection: 'row', marginBottom: getHp(20.6) },
    tagContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: getHp(39.4),
      backgroundColor: 'blue',
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
    questionContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    questionText: {
      fontSize: TEXTFONTSIZE.Text20,
      color: COLORS.screenTestDescriptionTextColor,
      marginRight: getWp(10),
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
    timeSvg: {
      width: getWp(18.6),
      height: getWp(19),
      marginRight: getWp(10),
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
      width: getWp(325),
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
  notAttempted: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.blue,
  },
};
