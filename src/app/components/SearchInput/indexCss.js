import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: getHp(40),
  },
  inputContainer: {
    backgroundColor: COLORS.searchBarBg,
    width: '100%',
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    position: 'absolute',
    borderColor: 'transparent',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
  input: {
    fontSize: TEXTFONTSIZE.Text13,
    fontFamily: 'BalooThambi-Regular',
    color: COLORS.white,
    width:'90%',
    marginStart: getWp(10),
  },
  icon: {
    color: COLORS.white,
    position: 'absolute',
    right: 0,
    marginRight: getWp(10),
    fontSize: getWp(16.5),
  },
});
