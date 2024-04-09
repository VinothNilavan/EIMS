import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: getWp(70),
    width: getWp(70),
    justifyContent: 'center',
  },
  image: {
    width: getWp(70),
    height: getWp(70),
    borderRadius: getHp(50),
    alignSelf: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: getWp(26),
    width: getWp(26),
    borderRadius: getWp(26),
    borderWidth: 1,
    borderColor: 'white',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
