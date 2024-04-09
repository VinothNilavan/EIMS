import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getWp(10),
    paddingHorizontal: getWp(18),
    paddingBottom: getHp(12),
  },
  AlertBackgroundColor:{
     backgroundColor: COLORS.red,
  },
  ConABackgroundColor:{
    backgroundColor: COLORS.tagColor,
  },
  innerContainer: {
    alignItems: 'flex-start',
  },
  text: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.white,
    marginBottom: -getHp(10),
  },
  label: {
    fontSize: TEXTFONTSIZE.Text12,
  },
  separator: {
    fontSize: TEXTFONTSIZE.Text16,
    marginTop: getHp(2),
    color: COLORS.white,
  },
  separatorContainer: {
    paddingHorizontal: getWp(8),
  },
});
