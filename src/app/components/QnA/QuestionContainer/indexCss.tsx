import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  questionBodyContainer: {
    width: wp(85),
    marginLeft: wp(4),
  },
});
