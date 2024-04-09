import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS } from '@constants';
import { getWp } from '@utils';

const styles = StyleSheet.create({
    mrgnRight6: {},
    bottomLeftSvgSize: {
        height: getWp(60),
        width: getWp(60)
    },
    ActivityViewStyle: {
        flex: 1,
        position: 'absolute',
        left: wp('2'),
        right: wp('2'),
        marginBottom: 20,
        bottom: 0,
        zIndex: 5,
        width: DeviceInfo.isTablet() ? wp(25) : 150,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.skyBlue,
    },
    ActivityTxtStyle: {
        color: COLORS.white,
        fontFamily: 'BalooThambi-Regular',
        fontSize: wp('6')
    },
    ActivityBaseContainer: {
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    ButtonPlayView: {
        position: 'absolute',
        right: wp('10'),
        top: hp('2'),
        zIndex: 5
    },
    SkipText: {
        fontFamily: 'BalooThambi-Regular',
        fontSize: wp('4')
    },
    ActiveBtnContainer: {
        marginBottom: hp('2'),
        marginTop: hp('2'),
        alignSelf: 'center'
    },
    ButtonDoneText: {
        fontFamily: 'BalooThambi-Regular',
        fontSize: wp('3')
    },
    ButtonDoneStyle: {
        marginTop: hp('2'),
        marginBottom: hp('2'),
        alignSelf: 'center',
        padding: 10,
    }
});

export default styles;