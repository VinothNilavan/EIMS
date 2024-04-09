import { StyleSheet } from 'react-native';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingHorizontal: getWp(18),
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  logoContainer: {
    width: getWp(190),
    height: getHp(110),
    marginTop: getHp(80),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: 30,
    marginTop: getHp(36),
    marginBottom: getHp(36),
    marginHorizontal: getWp(43),
    textAlign: 'center',
  },
  text1: {
    fontSize: 20,
    marginBottom: getHp(36),
    textAlign: 'center',
    marginLeft: getWp(10),
  },
  text2: {
    fontSize: 20,
    marginBottom: getHp(150),
    textAlign: 'center',
    marginLeft: getWp(10),
    marginRight: getWp(5),
  },
});
