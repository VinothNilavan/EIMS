import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(80),
    borderBottomLeftRadius: getWp(30),
    borderBottomRightRadius: getWp(30),
    borderWidth: getWp(5),
    paddingTop: getHp(30),
    borderColor: COLORS.infoContainerBdr,
    alignItems: 'center',
    height: getHp(430),
  },

  textStyle: {
    fontSize: TEXTFONTSIZE.Text18,
    marginTop: getHp(40),
    textAlign: 'center',
  },

  whiteButtonText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    padding: 0,
  },

  buttonLeftStyle: {
    width: getWp(180),
    height: getHp(70),
    alignSelf: 'center',
    borderBottomLeftRadius: getWp(30),
    backgroundColor: 'lightgray',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRightStyle: {
    alignSelf: 'center',
    borderBottomRightRadius: getWp(30),
    backgroundColor: '#F56523',
    width: getWp(180),
    height: getHp(70),
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btncontainerStyle: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },
  btntext: {
    fontSize: getHp('25'),
    fontFamily: 'SourceSansPro-Bold',
    alignSelf: 'center',
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
