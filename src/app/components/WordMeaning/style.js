import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: getHp(480),
        marginBottom: getHp(10),
        overflow: 'hidden',
        width: getWp(350),
        marginTop: getHp(10),
        backgroundColor: COLORS.white,
    },

    subContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: getHp(20),
        paddingBottom: getHp(20),
        minHeight: getHp(110),
    },

    separateView: {
        height: getHp(1),
        width: '100%',
        backgroundColor: COLORS.separatorColor,
    },

    soundIconContainer: {
        width: getWp(46),
        height: getWp(46),
        borderRadius: getWp(15),
        backgroundColor: COLORS.soundButtonBackgroundColor,
        borderWidth: getWp(3),
        borderColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: getWp(16),
    },

    webviewContainer: {
        width: getWp(360),
        alignItems: 'flex-start',
        justifyContent: 'center',
        // paddingTop: getHp(5),
    },

    webView: {
        width: getWp(280),
    },

    buttonContainer: {
        flexDirection: 'row',
        width: getWp(350),
        height: getHp(45),
        alignItems: 'center',
        justifyContent: 'space-between',
        //position: 'absolute',
        bottom: 0,
    },

    emptyContainer: {
        width: getWp(62),
        height: getWp(46),
    },
});
