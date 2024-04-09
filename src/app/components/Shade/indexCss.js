import { StyleSheet } from 'react-native';
import { getHp } from '@utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: getHp(30),
    position: 'absolute',
    top: getHp(85),
  },
  imgStyle: {
    width: '100%',
    height: getHp(30),
  },
});
