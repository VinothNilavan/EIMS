import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
  },

  title: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text24,
    textAlign: 'center',
    padding: 0,
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
    height: Platform.OS == 'ios' ? null : getHp(50),
    padding: 0,
  },

  marginLeft12: {
    marginLeft: getWp(12),
  },

  marginTop24: {
    marginTop: getWp(24),
  },
  btnContainer: {
    paddingHorizontal: getWp(15),
  },
  btnContainerStyle: {
    paddingHorizontal: getWp(8),
    paddingVertical: getHp(14),
  },
  btnStyle: {
    width: getWp(300),
    height: getHp(70),
  },
});
