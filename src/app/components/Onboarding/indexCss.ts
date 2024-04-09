import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHp(115),
  },
  title: {
    fontSize: TEXTFONTSIZE.Text32,
    color: COLORS.titleDarkBlue,
    textAlign: 'left',
    marginBottom: -getHp(18),
  },
  desc: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.titleDarkBlue,
    lineHeight: getHp(27.7),
    textAlign: 'left',
    paddingTop: getHp(31.3),
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-end',
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: getHp(70),
    paddingHorizontal: getWp(32),
  },
  lottieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(380),
    height: getHp(240),
  },
});