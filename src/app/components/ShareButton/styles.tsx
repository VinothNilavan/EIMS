import { StyleSheet,Dimensions} from 'react-native';
import {getWp, getHp} from '@utils';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
      container:{
        position:'absolute',
        width: getWp(Dimensions.get('window').width),
        bottom: getHp(170),
        //justifyContent:'flex-end',
        flexDirection:'row',
        marginLeft :DeviceInfo.isTablet() ? Dimensions.get('window').width -  Dimensions.get('window').width/4 :
                                            Dimensions.get('window').width -  Dimensions.get('window').width/2.7
        ///marginRight:20
      }
});
export default styles;