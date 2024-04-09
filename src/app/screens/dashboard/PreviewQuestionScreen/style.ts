import { StyleSheet, Platform } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: getWp(21),
    marginLeft: getWp(16),
    marginRight: getWp(16),
    marginTop: getHp(30),
    marginBottom: getHp(45),
    height: Platform.OS == 'ios' ? getHp(582.4) : getHp(672),
    backgroundColor: 'white',
    paddingTop: getHp(20),
  },

  questionNumberContainer: {
    width: getWp(46),
    height: getWp(46),
    borderRadius: getWp(15),
    backgroundColor: COLORS.qnaNumber,
    borderWidth: getWp(3),
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: getWp(-23),
    left: getWp(18),
    zIndex: 1,
  },

  questionNumberText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
  },

  questionTagContainer: {
    position: 'absolute',
    top: getWp(-15),
    left: getWp(40),
    zIndex: 1,
  },

  timerContainer: {
    position: 'absolute',
    width: getWp(100),
    left: getWp(200),
    top: getWp(-23),
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

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: getWp(-20),
  },

  buttonText: {
    color: COLORS.soundButtonBackgroundColor,
  },

  bottomBtnContainer: {
    flex: 1,
    elevation: 3,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: getHp(53.7),
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    width: getWp(331.2),
    marginLeft: getWp(16),
    bottom: Platform.OS == 'android' ? getHp(30) : getHp(50),
    justifyContent: 'space-around',
  },

  bottomBtnText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: getWp('24'),
  },

  bottomRightBtnSize: {
    width: getWp(145),
    height: Platform.OS == 'ios' ? getHp(45) : getHp(48),
  },

  bottomLeftSvgSize: {
    height: getWp(48),
    width: getWp(48),
  },

  challengeQuestion: {
    position: 'absolute',
    top: getWp(-14),
    left: getWp(52),
  },

  sessionIDText: {
    fontSize: TEXTFONTSIZE.Text11,
    color: COLORS.infoMessageGray,
    position: 'absolute',
    bottom: getHp(0),
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});
