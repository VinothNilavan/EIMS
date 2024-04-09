import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: getWp(20),
        marginBottom: getWp(30),
        marginLeft: getWp(16),
        marginRight: getWp(16),
        backgroundColor: COLORS.white,
    },

    questionContainer: {
        width: getWp(310),
        marginBottom: getWp(0),
        marginLeft: getWp(16),
    },
});