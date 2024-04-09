import { StyleSheet } from 'react-native';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 15
  },
  otpInputContainer: {
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWp(20),
    minWidth: getWp(40),
    minHeight: getWp(40)
  },
  newOtpInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWp(20),
    width: getWp(50),
    height: getWp(50),
    backgroundColor: '#f5f5f5',
    borderRadius: 10
  }
});