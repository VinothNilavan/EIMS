import { StyleSheet, Dimensions } from 'react-native';
import { getWp } from '@utils';

const { height, width } = Dimensions.get('window');

let aspectRatio = width / height;

export default StyleSheet.create({
  lottieStyle: {
    width: getWp(290),
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },

  lottie: {
    width: '100%',
    aspectRatio,
    flexGrow: 1,
  },

  lottieContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  imageBackground: {
    flex: 1,
    width: '100%',
  },
});
