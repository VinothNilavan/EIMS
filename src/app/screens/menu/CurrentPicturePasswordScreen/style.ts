import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  flexOne: {
    flex: 1
  },

  title: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text28,
    textAlign: 'center',
    padding: 0,
    marginBottom: getHp(40),
  },
  subtitle: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text26,
    textAlign: 'center',
    padding: 0,
    marginBottom: getHp(30),
  },

  contentStyle: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: getWp(16),
    marginTop: getHp(42),
  },

  whiteButtonText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: getHp(50),
    padding: 0,
  },

  marginLeft12: {
    marginLeft: getWp(12),
  },

  marginTop24: {
    marginTop: getWp(24),
  },

  whiteText: {
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text18,
  },

  errorField: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text12,
  },
});
