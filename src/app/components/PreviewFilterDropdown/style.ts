import { StyleSheet } from 'react-native';
import { getWp, getHp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: getWp(300),
        minHeight: getHp(49),
        borderRadius: getWp(10),
        backgroundColor: COLORS.white,
        marginTop: getWp(20),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    dropdownContainer: {
        width: getWp(270),
        minHeight: getWp(30),
        backgroundColor: COLORS.white,
        borderBottomWidth: 0,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    dropdownSelectedText: {
        fontSize: TEXTFONTSIZE.Text16,
        color: COLORS.screenTestDescriptionTextColor,
        fontFamily: 'BalooThambi-Regular',
        paddingLeft: getWp(12),
    },

    dropdown: {
        width: getWp(300),
        height: 'auto',
        borderTopWidth: 0,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        backgroundColor: COLORS.white,
        maxHeight: getHp(200),
    },

    dropdownItemContainer: {
        flex: 1,
        height: getHp(45),
        justifyContent: 'center',
        borderWidth: 0,
        paddingLeft: getWp(12),
        paddingRight: getWp(12)
    },

    dropdownText: {
        color: COLORS.VulcanColor,
        fontSize: TEXTFONTSIZE.Text14,
    },

})