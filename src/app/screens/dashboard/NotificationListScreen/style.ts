import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp } from '@utils';

export default StyleSheet.create({
    titleText: {
        color: COLORS.white,
        fontSize: TEXTFONTSIZE.Text26,
        marginTop: getHp(25),
        textAlign: 'center',
    },

    notificationContainer: {
        marginBottom: getHp(60),
    },

    errorMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: getHp(200),
    },

    errorMessage: {
        fontSize: TEXTFONTSIZE.Text22,
        color: COLORS.white,
    },
});