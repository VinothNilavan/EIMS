import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(80),
    borderWidth: getWp(5),
    paddingTop: getHp(30),
    borderColor: COLORS.infoContainerBdr,
    alignItems: 'center',
    height: getHp(560),
  },
  headerSvg: {
    marginTop: getHp(10),
    width: getWp(230),
    height: getHp(110),
  },
  modalHeader: {
    marginTop: getHp(40),
    position: 'absolute',
    alignSelf: 'center',
    fontSize: TEXTFONTSIZE.Text32,
    color: COLORS.statTextColor,
  },

  textStyle: {
    fontSize: TEXTFONTSIZE.Text18,
    marginTop: getHp(98),
    textAlign: 'center',
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
