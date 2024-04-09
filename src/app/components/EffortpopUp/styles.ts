import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(30),
    borderWidth: getWp(5),
    paddingTop: getHp(30),
    borderColor: COLORS.infoContainerBdr,
    alignItems: 'center',
    height: getHp(430)
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

  btncontainerStyle: {
    flexDirection: 'row',
    position: 'absolute',
    width: '96%',
    height: '20%',
    backgroundColor: 'darkorange',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: '1%',
    bottom: 1,
    borderBottomLeftRadius: getWp(30),
    borderBottomRightRadius: getWp(30),
  },
  btntext: {
    fontSize: getHp('25'),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  svgTitleContainer: {
    height: getHp(179)
  },
  svgContainer: {
    marginBottom: getHp(16),
    width: getWp(232.6),
    height: getHp(108.4),
    alignItems: 'center',
  },
  svgTextContainer: {
    flex: 1,
    width: getWp(196),
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgText: {
    fontSize: TEXTFONTSIZE.Text32,
    color: COLORS.infoPopupTitle,
    textAlign: 'center',
    lineHeight: getHp(32),
    paddingTop: getHp(32),
  }
});
