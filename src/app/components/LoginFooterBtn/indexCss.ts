import { StyleSheet, Platform } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? getHp(40) : getHp(20),
    left: 0,
    right: 0,
    paddingHorizontal: getWp(33),
  },
  submitBtn: {
    width: '100%',
    height: getHp(60),
  },
  btnText: {
    fontSize: TEXTFONTSIZE.Text16,
  },
  text: {
    marginBottom: getHp(24),
    fontSize: TEXTFONTSIZE.Text20,
    textAlign: 'center',
  },
  subTitle: { fontSize: TEXTFONTSIZE.Text20, color: COLORS.orange },
});
