import { StyleSheet } from 'react-native';
import { TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    marginBottom: getHp(32),
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(360),
  },

  text: {
    fontSize: TEXTFONTSIZE.Text20,
    marginBottom: getHp(20),
    color: 'orange'
  },

  picturePasswordContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  picturePasswordRTLContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});