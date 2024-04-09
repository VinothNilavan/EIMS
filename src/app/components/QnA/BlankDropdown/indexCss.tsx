import { StyleSheet, Dimensions} from 'react-native';
import { getHp } from '@utils';

export default StyleSheet.create({
  container: {
    margin: 0,
    paddingBottom: 0,
    justifyContent: 'center',
    flex: 1,
    marginTop: getHp(27),
  },

  webViewContainer: {
    width: Dimensions.get('window').width - 50,
  },
});
