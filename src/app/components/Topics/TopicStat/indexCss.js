import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp} from '@utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  subContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  accuracyVal: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
  },

  accuracyPerVal: {
    fontSize: TEXTFONTSIZE.Text10,
  },

  title: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text18,
  },

  progressSvgStyle: {
    height: getWp(49),
    width: getWp(49),
    justifyContent: 'center',
  },

  svgStyle: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },

  attemptText: {
    fontSize: TEXTFONTSIZE.Text20,
    alignSelf: 'center',
  },

  accSvgStyle: {
    width: getWp(59.3),
    height: getWp(59.3),
    justifyContent: 'center',
  },

  svgContainer: {
    width: getWp(30),
    height: getWp(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:getWp(10)
  },
  
  svgBgStyle: {
    width: '100%',
    height: '100%',
  },
});
