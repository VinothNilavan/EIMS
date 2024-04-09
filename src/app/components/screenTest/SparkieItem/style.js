import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  subContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: getWp(14),
  },

  titleText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
  },

  valueText: {
    color: COLORS.white,
    fontSize: TEXTFONTSIZE.Text32,
  },
  imageContainer: {
    width: getWp(60),
    height: getWp(60),
  },
});
