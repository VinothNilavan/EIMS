import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginStart: wp(5),
  },

  RTLContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignSelf: 'center',
  },

  dragableListContainer: {
    marginLeft: wp(2),
  },
});
