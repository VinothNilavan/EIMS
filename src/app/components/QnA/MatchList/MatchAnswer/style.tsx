import { StyleSheet } from 'react-native';
import { getWp, getHp } from '@utils';
import { COLORS,TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderRadius: getWp(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getWp(12),
    borderColor: COLORS.dotLineColor,
  },

  imageContainer: {
    width: getWp(130),
    height: getHp(110),
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderRadius: getWp(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getWp(12),
    marginLeft: getWp(30),
    borderColor: COLORS.dotLineColor,
  },

  arrangeLetterContainerChildView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  webviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(140),
    alignContent: 'center',
    fontSize: TEXTFONTSIZE.Text14,
  },
});
