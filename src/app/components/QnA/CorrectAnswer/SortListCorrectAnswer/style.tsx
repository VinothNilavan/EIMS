import {Dimensions, StyleSheet} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {COLORS} from '@constants';
import {getWp} from '@utils';

export default StyleSheet.create({
  
  container: {
    flexDirection: 'row',
    borderRadius: wp(5),
    backgroundColor: COLORS.white,
    marginHorizontal: getWp(5),
    width:'95%',
    flexWrap: 'wrap',
    padding: getWp(5),
    alignItems: 'center',
    justifyContent: 'center'
  },

  RTLContainer: {
    flexDirection: 'row-reverse',
  },

  webviewContainer: {
    flex:1,
    width: getWp(Dimensions.get('window').width/2 + Dimensions.get('window').width/3-1),
  },

  textStyle: {
    padding: getWp(5),
  }
});
