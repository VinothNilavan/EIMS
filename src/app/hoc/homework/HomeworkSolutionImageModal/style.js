import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
    },

    imageContainer: {
        width: getWp(345),
        height: getHp(600),
        borderRadius: getWp(20),
        marginTop: getHp(20),
        resizeMode: 'stretch',
        overflow: 'hidden',
    },

    closeButtonContainer: {
        width: getWp(34),
        height: getWp(34),
        borderRadius: getWp(17),
        backgroundColor: COLORS.white,
        position: 'absolute',
        right: getWp(0),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: getWp(1),
        borderColor: COLORS.hintBg,
        elevation: 10,
    }
})