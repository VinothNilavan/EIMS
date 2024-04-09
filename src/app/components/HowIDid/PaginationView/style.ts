import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils'

export default StyleSheet.create({
    container: {
        width: getWp(90),
        height: getHp(40),
        marginLeft: getWp(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    textContainer: {
        width: getWp(34),
        height: getHp(30),
        backgroundColor: COLORS.white,
        borderRadius: getWp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontSize: TEXTFONTSIZE.Text16,
        color: COLORS.screenTestDescriptionTextColor,
    },

    emptyContainer: {
        width: getWp(20),
        height: getWp(20)
    }
})