import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    width: getWp(80),
    position: 'relative',
  },

  text: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
  },

  selected: {
    position: 'absolute',
    top: 0,
    right: 4,
  },
});
