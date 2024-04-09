import { StyleSheet, Platform } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  container: {
    height: getHp(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  leftImageContainer: {
    marginStart: getWp(32),
    alignItems: 'flex-start',
    width: getWp(50),
    height: getWp(50),
  },
  svgLeft: {
    width: '100%',
    height: '100%',
  },
  textContainer: { flex: 3, alignItems: 'flex-start', marginStart: getWp(10) },
  title: {
    fontSize: TEXTFONTSIZE.Text20,
  },
  desc: {
    color: COLORS.orange,
  },
  rightImageContainer: { flex: 1, marginEnd: getWp(32), alignItems: 'flex-end' },
  svgRight: {
    width: getWp(40),
    height: getHp(40),
  },
});
