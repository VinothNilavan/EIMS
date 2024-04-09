import { StyleSheet } from 'react-native';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'black',
    opacity: 0.7,
  },
  lottieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: getWp(200),
    height: getHp(200),
  },
  lottie: {
    width: '100%',
    height: '100%',
    padding: 0,
    marginStart: 0,
    marginEnd: 0,
  },
});
