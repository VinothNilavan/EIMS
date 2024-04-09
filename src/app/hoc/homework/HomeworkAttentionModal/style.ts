import { StyleSheet ,Platform} from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: getWp(60),
        borderWidth: getWp(5),
        borderColor:COLORS.infoContainerBdr,
        alignItems: 'center',
        width: '85%',//getWp(340),
        height: '50%',//getHp(460),
        alignSelf: 'center',
    },

    titleContainer: {
        flexDirection: 'row',
        width: '100%',//getWp(271),
        height: '40%',//getHp(128),
        marginTop: '2%',//getWp(25),
        alignItems: 'center',
        justifyContent: 'center',
    },

    svgBackgroundImage: {
        position: 'absolute',
        flex:1
    },

    titleText: {
        fontSize: TEXTFONTSIZE.Text35,
        color: COLORS.statTextColor,
        textAlign: 'center',
        lineHeight: Platform.isPad ? 95 : Platform.OS === 'ios' ? 55 : DeviceInfo.isTablet()  ? 75 : 65,
    },

    messageText: {
        fontSize: TEXTFONTSIZE.Text16,
        color: COLORS.leaderBoardTitleColor,
        marginTop: '2%',//getHp(40),
        marginStart: getWp(57),
        marginEnd: getWp(57),
        textAlign: 'center',
    },

    buttonContainer: {
        position: 'absolute',
        height: getHp(60),
        left: getWp(20),
        right: getWp(20),
        bottom: getHp(48),
        alignItems: 'center',
    },

    buttonSkipText: {
        color: COLORS.orange,
        fontSize: TEXTFONTSIZE.Text20,
        fontFamily: 'BalooThambi-Regular',
    },

    buttonSeparator: {
        height: getHp(18),
    }
});