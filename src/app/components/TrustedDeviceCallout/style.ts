import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    trustedPopUp: {
        position: 'absolute',
        top: getHp(40),
        backgroundColor: COLORS.white,
        width: '90%',
        marginHorizontal: getWp(20),
        borderRadius: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        padding: getHp(10),
        borderBottomWidth: 3,
        borderRightWidth: 2,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderColor: COLORS.shadowBoarder,
        zIndex: 999
    },
    borderBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: getHp(30)
    },
    borderButton: {
        borderRadius: 10,
        paddingHorizontal: getHp(30),
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: COLORS.carouselDotStyle,
    },
    trustPopUpTxt: {
        color: COLORS.black,
        fontSize: TEXTFONTSIZE.Text16,
        textAlign: 'center'
    },
    borderText: {
        color: COLORS.carouselDotStyle,
        fontSize: TEXTFONTSIZE.Text20,
    }
});

