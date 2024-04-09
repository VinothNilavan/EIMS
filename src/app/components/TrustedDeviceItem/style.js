import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    container: {
        width: getWp(410),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: getHp(24),
    },

    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginStart: getWp(24),
    },

    titleText: {
        fontSize: TEXTFONTSIZE.Text20,
        color: COLORS.white,
    },

    removeButtonText: {
        fontSize: TEXTFONTSIZE.Text12,
        color: COLORS.white,
    },

    checkedContainer: {
        width: getWp(16),
        height: getWp(16),
        backgroundColor: COLORS.white,
        borderRadius: getWp(8),
        marginEnd: getWp(6),
    },

    removeButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    removeButtonCircleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: getWp(18),
        height: getWp(18),
        backgroundColor: COLORS.white,
        borderRadius: getWp(12),
        marginLeft: getWp(10),
        marginRight: getWp(16),
    },
});

