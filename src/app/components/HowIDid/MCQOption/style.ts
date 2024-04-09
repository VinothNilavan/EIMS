import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHp(12),
  },
  RTLContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: getHp(12),
  },

  optionContainer: {
    width: getWp(26),
    height: getWp(26),
    borderRadius: getWp(13),
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getWp(16),
  },

  option: {
    fontSize: TEXTFONTSIZE.Text14,
  },

  text: {
    fontSize: TEXTFONTSIZE.Text14,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: getWp(12),
  },

  webViewStyle: {
    width: getWp(330),
    marginTop: getHp(2),
    marginLeft: getWp(5),
  },
});
