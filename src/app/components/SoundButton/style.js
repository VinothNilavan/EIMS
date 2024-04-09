import {StyleSheet} from 'react-native';
import {COLORS} from '@constants';
import {getWp} from '@utils';

export default StyleSheet.create({
  container: {
    width: getWp(46),
    height: getWp(46),
    borderRadius: getWp(15),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    borderWidth: getWp(3),
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
