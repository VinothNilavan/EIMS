import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(67),
    height: getWp(59),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    borderRadius: getWp(9),
  },

  text: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.white,
    textAlign: 'center',
  },
});
