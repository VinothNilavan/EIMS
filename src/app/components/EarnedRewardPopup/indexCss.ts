import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  modalHeader: {
    marginTop: getHp(40),
    position: 'absolute',
    alignSelf: 'center',
    fontSize: TEXTFONTSIZE.Text32,
    color: COLORS.statTextColor,
  },
  textContainer: {
    width: getWp(292),
    marginTop: getHp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentText: {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.screenTestDescriptionTextColor,
    marginBottom: getHp(10),
    textAlign: 'center',
  },
  qText: {
    fontSize: TEXTFONTSIZE.Text20,
  },
  modalButtonRow: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: getHp(38),
    marginTop: getHp(40),
    flexDirection: 'row',
  },
  buttonSkipText: {
    color: COLORS.orange,
    fontSize: TEXTFONTSIZE.Text20,
    fontFamily: 'BalooThambi-Regular',
  },
  buttonYesText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
    fontFamily: 'BalooThambi-Regular',
  },
  modalOuter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSvg: {
    marginTop: getHp(10),
    width: getWp(230),
    height: getHp(110),
  },
  modalContainer: {
    borderRadius: getWp(80),
    borderColor: '#DEE2EB',
    borderWidth: getWp(5),
    height: getHp(540),
    width: getWp(340),
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  header: {
    marginBottom: getHp(42)
  },
  text: {
    marginBottom: getHp(36),
    fontSize: TEXTFONTSIZE.Text20,
  },
  subTitle: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.orange
  },
  btnStyle: {
    width: getWp(160),
    height: getHp(56.4),
  },
  bigBtnStyle: {
    width: getWp(320),
    height: getHp(56.4),
  },
  bigBtnContainer: {
    position: 'absolute',
    bottom: -30
  },
  youReceivedContainer: {
    marginTop: getHp(25)
  },
  bgRaysContainer: {
    position: 'absolute',
    width: '80%',
    top: getHp(60),
    marginTop: getHp(70)
  },
  capSvgStyle: {
    marginTop: getHp(30)
  },
  earnedBadgeTextStyle: {
    fontSize: TEXTFONTSIZE.Text20,
    position: 'absolute',
    color: COLORS.green
  },
  earnedBadgeFooterContainer: {
    position: 'absolute',
    bottom: -1,
    width: "101%"
  },
  badgeMessageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: getHp(55),
    backgroundColor: "#F7F7F7"
  },
  okayMessageContainer: {
    borderBottomRightRadius: getWp(50),
    borderBottomLeftRadius: getWp(50),
    backgroundColor: '#E86D2F',
    justifyContent: "center",
    alignItems: "center",
    height: getHp(60),
  },
  okayTextStyle: { color: '#FFF', fontSize: 18 },
  badgeMessageTextStyle: {
    fontSize: TEXTFONTSIZE.Text16
  },
  bottomTextStyle: {
    position: 'absolute',
    bottom: getHp(20),
    color: '#464646',
    fontSize: TEXTFONTSIZE.Text16
  },
  okayBtnContainerStyle: {
    width: getWp(180),
    height: getHp(60),
    position: "absolute",
    bottom: -getHp(35)
  },
  earndRewardContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: getHp(105)
  },

});
