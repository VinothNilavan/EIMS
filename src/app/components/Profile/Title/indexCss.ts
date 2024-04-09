import { StyleSheet } from 'react-native';
import { getWp } from '@utils';
import { TEXTFONTSIZE, COLORS } from '@constants';
export default StyleSheet.create({
  container: {
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: getWp(50),
  },
  textContainer: {

  },
  text: {
    fontSize: TEXTFONTSIZE.Text10,
    color: COLORS.white,
    fontFamily: 'BalooThambi-Regular',
    textAlign: "center"
  },
});
