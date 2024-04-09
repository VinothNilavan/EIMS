import { StyleSheet } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: getWp(70),
    height: getHp(70),
  },
  text: {
    color: COLORS.topicTitle,
    fontFamily: 'BalooThambi-Regular',
    fontSize: TEXTFONTSIZE.Text15,
    textAlign: 'center'
  },
  iconView: {
    width: getWp(40),
    height: getWp(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: getWp(35),
    height: getWp(35),
  },
});
