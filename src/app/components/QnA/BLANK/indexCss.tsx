import { StyleSheet } from 'react-native';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    margin: 0,
    paddingBottom: 0,
    justifyContent: 'center',
    flex: 1,
    marginTop: getHp(27),
  },

  innserContainer: {
    margin: 0,
    paddingBottom: 0,
  },
  webViewContainer: {
    width: getWp(393),
    opacity: 0.99
  },
  keyboard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
 },
});
