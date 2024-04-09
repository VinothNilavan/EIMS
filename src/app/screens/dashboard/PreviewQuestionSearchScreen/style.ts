import { StyleSheet } from 'react-native';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: getHp(150),
        alignSelf: 'center',
    },

    searchContainer: {
        width: getWp(300),
        height: getWp(49),
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTextstyle: {
        fontFamily: 'BalooThambi-Regular',
        fontSize: getWp(24),
    },

    roundButtonContainerStyle: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: getWp(60),
    },
});