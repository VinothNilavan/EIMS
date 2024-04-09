import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'stretch',
    width: '100%',
  },
  choiceItem: {
    padding: getWp(15),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputTextBorder,
    alignItems: 'center',
  },
  choiceText: {
    fontSize: TEXTFONTSIZE.Text24,
  },
  webViewContainer: {
    width: getWp(373)
  }
});
