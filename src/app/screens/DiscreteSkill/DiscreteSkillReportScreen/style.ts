import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
    mainContainer: { 
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLORS.white,
        alignSelf: 'center',
    },

    scrollContainer: {
        marginTop: getWp(60),
    },

    childContainer: {
        flex: 1,
        // flexDirection: 'column',
        alignItems: 'center',
    },

    headerContainer: {
        width: getWp(350),
        marginBottom: getWp(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        flex: 1,
    },

    RTLHeaderContainer: {
        width: getWp(350),
        marginBottom: getWp(15),
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },

    filterStyle: {
        marginTop: getWp(30),
    },

    gotoTopButtonContainer: {
        width: getWp(34),
        height: getWp(34),
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: getWp(17),
        position: 'absolute',
        bottom: getWp(5),
        right: getWp(20),
    },

    marginBottom: {
        marginBottom: getWp(25),
    },
    emptyText: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    emptyContaner: {
        justifyContent: 'center',
        flex: 1
    }
});
