import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp } from '@utils';

export default StyleSheet.create({
    buttonText: {
        color: COLORS.soundButtonBackgroundColor,
    },
    footerButtonContainer: {
        flex: 1,
        elevation: 3,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: getHp(25),
        width: '100%',
        zIndex: 1,
    },

    RTLFooterButtonContainer: {
        flex: 1,
        elevation: 3,
        flexDirection: 'row-reverse',
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: getHp(25),
        width: wp('90'),
        zIndex: 1,
    },

    footerButton: {
        backgroundColor: 'transparent',
    },

    footerButtonText: {
        fontFamily: 'BalooThambi-Regular',
        fontSize: TEXTFONTSIZE.Text24,
        color: COLORS.white,
    },

    twoLargeBtnStyle: {
        flexDirection: 'column',
        bottom: getHp(25),
    },
    emptyStyle: { }
});
