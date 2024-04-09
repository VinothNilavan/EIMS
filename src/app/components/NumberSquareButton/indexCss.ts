import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    minWidth: getWp(54),
    minHeight: getWp(54),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.green,
    borderColor: COLORS.white,
    borderWidth: getWp(3),
    borderRadius: getWp(10),
    paddingHorizontal: getWp(10)
  },
  wrapper: {
    marginRight: getWp(20),
  },

  text: {
    fontSize: TEXTFONTSIZE.Text32,
    color: COLORS.white,
  },

  normalText: {
    fontSize: TEXTFONTSIZE.Text13,
    color: COLORS.white,
    marginTop: getWp(3),
  },
});