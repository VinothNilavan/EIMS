import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.topicCardTitle,
  },
  text: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.statTextColor,
  },
});
