import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: getWp(21),
    paddingTop: getHp(18),
    paddingBottom: getHp(40),
    marginBottom: '10%',//getWp(45),
    marginTop: '35%',//getHp(129.2),
    width: getWp(393),
    backgroundColor: COLORS.white,
    alignSelf: 'center',
  },
  questionCardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: getWp(16),
    left: getWp(16),
    top: getWp(-23),
  },

  RTLQuestionCardHeaderContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    position: 'absolute',
    right: getWp(16),
    left: getWp(16),
    top: getWp(-23),
  },

  soundIconContainer: {
    width: '90%',
    height: '100%',
    borderRadius: getWp(15),
    backgroundColor: COLORS.qnaNumber,
    borderWidth: getWp(3),
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getWp(12),
    flex: 0.18,
  },

  questionNumberText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
  },

  sessionIDText: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.inputTextBlack,
    position: 'absolute',
    bottom: getHp(0),
    left: 0,
    right: 0,
    textAlign: 'center',
    backgroundColor: COLORS.yellow,
  },
  timerContainer: {
    position: 'absolute',
    right: getWp(10),
  },

  timeTestDetailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeTestTitle: {
    fontSize: TEXTFONTSIZE.Text18,
    marginTop: getHp(40),
    paddingHorizontal: getWp(20),
    textAlign: 'center',
  },
  questionTagContainer: {
    position: 'absolute',
    left: getWp(60),
    zIndex: 1,
    marginLeft: '6%'
  },
  footerContainerStyle: {
    height: getHp(60),
    bottom: -30,
  },
  questionContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  explanationContainer: {
    width: getWp(393),
  },

  scrollviewContainer: {
  },

  skipQuestionScrollContainer: {
    marginBottom: getHp(50),
  },

  flexOne: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
 },
  voiceOverContainer: {
    marginTop: getHp(10),
  }
});
