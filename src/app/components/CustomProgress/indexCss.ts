import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    backgroundColor: 'transparent',
    padding: 0,
  },
  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: wp('50'),
    backgroundColor: 'green',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
});
