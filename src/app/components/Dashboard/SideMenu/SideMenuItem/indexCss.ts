import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  svgStyle: {
    width: getWp(30),
    height: getHp(30),
    marginBottom: getHp(20),
  },

  countContainer: {
    width: getWp(16),
    height: getWp(16),
    borderRadius: getWp(8),
    backgroundColor: "#1BA5E8",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: getHp(1),
  },

  countText: {
    fontSize: TEXTFONTSIZE.Text11,
    color: COLORS.white,
  }
});
