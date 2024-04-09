import { StyleSheet } from 'react-native';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoView: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    btnContainer: {
        position: 'absolute',
        right: getWp(41),
        top: getHp(18),
        zIndex: 5,
    },
    btnText: {
        fontSize: getWp(16),
    },

    btnStyle: {
        width: getWp(49),
        height: getWp(49),
    },
});
