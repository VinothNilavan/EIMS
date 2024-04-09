import { StyleSheet } from 'react-native';
import { getHp, getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: getHp(840),
    },
    modalHeader: {
        marginTop: getHp(30),
        position: 'absolute',
        alignSelf: 'center',
        fontSize: TEXTFONTSIZE.Text32,
        color: COLORS.statTextColor,
    },
    modalContentText: {
        width: getWp(204),
        marginTop: getHp(30),
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: TEXTFONTSIZE.Text16,
        color: '#464646',
    },
    modalButtonRow: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: getHp(48),
        marginTop: getHp(40),
        flexDirection: 'row',
    },
    buttonSkipText: {
        color: COLORS.orange,
        fontSize: TEXTFONTSIZE.Text20,
        fontFamily: 'BalooThambi-Regular',
    },
    buttonYesText: {
        color: COLORS.white,
        fontSize: TEXTFONTSIZE.Text20,
        fontFamily: 'BalooThambi-Regular',
    },
    modalOuter: {
        backgroundColor: 'rgba(0,0,0,.8)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerSvg: {
        marginTop: getHp(10),
        width: getWp(230),
        height: getHp(110),
    },
    modalContainer: {
        borderRadius: getWp(50),
        borderColor: '#DEE2EB',
        borderWidth: getWp(3),
        height: getHp(520),
        width: getWp(340),
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    header: { marginBottom: getHp(42) },
    text: {
        marginBottom: getHp(36),
        fontSize: TEXTFONTSIZE.Text20,
    },
    title: { fontSize: TEXTFONTSIZE.Text28, color: COLORS.titleDarkBlue },
    subTitle: { fontSize: TEXTFONTSIZE.Text20, color: COLORS.titlePink },

    innerContainer: {
        alignItems: 'center',
        paddingHorizontal: getWp(33),
        paddingVertical: getHp(50),
        width: '100%',
    },
    submitBtn: {
        width: '100%',
        height: getHp(60),
        marginBottom: getHp(40),
    },
    inputContainer: {
        // marginBottom: getHp(70),
    },
    password: {
        width: '100%',
        height: getHp(60),
        marginBottom: getHp(24),
    },
    confirmPassword: {
        width: '100%',
        height: getHp(60),
        marginBottom: getHp(20),
    },
    textContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: getHp(30),
    },
    instructionText: {
        fontSize: TEXTFONTSIZE.Text14,
        lineHeight: getHp(24),
        color: COLORS.inputTextBlack,
    },
    desc: {
        color: COLORS.infoMessageGray,
    },
    errorMessage: {
        color: COLORS.errorMessage,
        fontSize: TEXTFONTSIZE.Text16,
        textAlign: 'center',
    },
    modalStyle: {
        borderRadius: getWp(20),
        justifyContent: 'center',
    },
    saveMyLoginConatiner: {
        flexDirection: 'row',
    },
    saveMyLoginText: {
        marginLeft: getWp(8),
    },
});
