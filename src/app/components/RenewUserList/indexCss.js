import { StyleSheet } from 'react-native';

import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        zIndex: 999,
        justifyContent: 'flex-end'

    },
    wrapper: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: getWp(20),
        borderTopRightRadius: getWp(20)
    },
    heading: {
        fontSize: TEXTFONTSIZE.Text24,
        color: COLORS.subtitleDarkBlue,
        marginBottom: getHp(30),
        marginTop: getHp(50),
        textAlign: 'center',
        marginHorizontal: getWp(40),
    },
    tableWrapper: {
        height: getHp(300),
        marginHorizontal: getWp(40)
    },
    userName: {
        fontSize: TEXTFONTSIZE.Text18,
        color: COLORS.subtitleDarkBlue,
    },
    userListContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: getWp(20),
    },
    classText: {
        marginTop: getHp(20),
    },
    btnContainer: {
        marginTop: getHp(32),
        marginHorizontal: getWp(40),
        marginBottom: getHp(50)
    },
    card: {
        //borderRadius: 10,
        paddingHorizontal: Platform.OS ? getHp(0) : getHp(17),
        //height: getHp(80),
        //padding:10,
        paddingVertical: Platform.OS ? getHp(0) : getHp(17),
        //paddingVertical: getHp(10),
        borderWidth: 2,
        borderColor: 'white',
        marginTop: getHp(5),
        elevation: 1,
        marginBottom: 3

    },
});
