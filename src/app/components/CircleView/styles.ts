import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';

const styles = (width = 30, height = 30) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: height,
      borderRadius: width / 2,
      backgroundColor: COLORS.orColor,
    },
    text: {
      fontSize: TEXTFONTSIZE.Text16,
      color: COLORS.inputTextBlack,
    },
  });

export default styles;