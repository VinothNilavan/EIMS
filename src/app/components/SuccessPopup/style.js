import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(80),
    borderWidth: getWp(5),
    paddingTop: getHp(30),
    borderColor: COLORS.infoContainerBdr,
    alignItems: 'center',
  },

  textStyle: {
    fontSize: TEXTFONTSIZE.Text18,
    marginTop: getWp(45),
    marginBottom: getWp(80),
    padding: getWp(24),
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    width: getWp(271),
    height: getHp(128),
    marginTop: getWp(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: TEXTFONTSIZE.Text35,
    color: COLORS.statTextColor,
    textAlign: 'center',
  },
  svgBackgroundImage: {
    position: 'absolute',
  },
  whiteButtonText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    padding: 0,
  },

  buttonStyle: {
    alignSelf: 'center',
    marginTop: getHp(-40),
  },
});
