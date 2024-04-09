import { StyleSheet, Dimensions } from 'react-native';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    container: {
        margin: 0,
        paddingBottom: 0,
        justifyContent: 'center',
        flex: 1,
        marginTop: getHp(27),
    },
    webViewContainer: {
        width: getWp(393),
        height: Dimensions.get('screen').height - Dimensions.get('screen').height / 2.3 - 55,
    },
});
