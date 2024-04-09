import { StyleSheet } from 'react-native';
import { getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: getWp(24),
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: getWp(24),
    },

    titleText: {
        fontSize: TEXTFONTSIZE.Text20,
        color: COLORS.white,
        marginLeft: getWp(10),
    },

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: getWp(24),
    },

    switchText: {
        fontSize: TEXTFONTSIZE.Text14,
        color: COLORS.white,
    }
});