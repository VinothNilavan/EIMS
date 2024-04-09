import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextfontSize from '@constants/TextfontSize';

export default StyleSheet.create({
    footer: {
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },

    container: {
        marginTop: hp('1'),
        marginBottom: hp('15')
    },

    header: {
       fontSize: TextfontSize.Text32,
          alignSelf: 'center',
          color: COLORS.white,
          marginTop: hp('2'),
          marginBottom: hp('3'),
    },

    mainContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        marginBottom: hp('2'),
        flexDirection: 'row',
        justifyContent: 'center'
    }
});