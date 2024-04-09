import {StyleSheet, Platform} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';

import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  containerStyle: {
    borderRadius: getWp(100),
    paddingHorizontal: 0,
    paddingTop: 0,
    backgroundColor: COLORS.worksheetReportQuestionOptionColor,
  },

  containerWhiteStyle: {
    borderRadius: getWp(100),
    //paddingHorizontal: 0,
    minHeight: getHp(560),
    justifyContent: 'flex-start',
    paddingTop: 0,
    backgroundColor: COLORS.white,
  },

  whiteBackground: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: getWp(100),
    borderTopRightRadius: getWp(100),
    paddingTop: getHp(35),
  },

  container: {
    width: '100%',
    alignItems: 'stretch',
  },

  modalHeader: {
    marginTop: getHp(65),
    position: 'absolute',
    alignSelf: 'center',
    fontSize: TEXTFONTSIZE.Text32,
    textAlign: 'center',
    lineHeight: Platform.isPad ? getHp(60) : getHp(48),
    color: COLORS.statTextColor,
    padding: 0,
  },

  headerSvg: {
    marginTop: getHp(10),
    width: getWp(230),
    height: getHp(110),
    alignSelf: 'center',
  },

  detailsContainer: {
    alignItems: 'center',
    paddingHorizontal: getWp(16),
  },

  title: {
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text26,
    color: COLORS.btnColor,
    marginTop: getHp(20),
    marginBottom: getHp(10),
  },

  timeStatsStyle: {
    width: getWp(280),
  },

  testTitle: {
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text20,
    marginVertical: getHp(20),
  },

  messageTitle: {
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text16,
    marginVertical: getHp(100),
  },

  info: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.conceptsColor,
    marginTop: getHp(20),
  },

  subTitle: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.screenTestDescriptionTextColor,
    textAlign: 'center',
  },

  btn: {
    width: getWp('210'),
    height: getHp('70'),
  },

  btnContainer: {
    position: 'absolute',
    flexDirection: 'row',
    // alignSelf: 'center',
    bottom: getHp(55),
    borderRadius: getWp(13),
  },

  btnText: {
    color: COLORS.orange,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text22,
    position:'relative',
    //lineHeight:20,
    ///arginTop:5,
    justifyContent:'center',
   // alignContent:'center',
    //alignSelf:'center',
    alignItems:'center'
  },
});
