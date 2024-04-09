import { StyleSheet } from 'react-native';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: getWp(5),
    flex: 1,
  },

  RTLContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    marginHorizontal: getWp(16),
  },

  webviewContainer: {
    javaScriptEnabled: false,
    width: '85%'
  },

  webviewContentContainer: {
    width: getWp(120),
    height: '100%',
  },
});
