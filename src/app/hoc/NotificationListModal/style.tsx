import { StyleSheet,Platform} from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import DeviceInfo from 'react-native-device-info';
import { getWp, getHp , isTablet} from '@utils';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: isTablet() ? 1 : 0,
        backgroundColor: COLORS.white,
        minHeight: getHp(476),
        borderRadius: getWp(6),
        overflow: 'hidden',
    },

    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: getHp(56),
        paddingLeft: getWp(30),
        paddingRight: getWp(24),
        backgroundColor: COLORS.messageAreaBg,
        marginBottom: getWp(17)
    },

    titleText: {
        fontSize: TEXTFONTSIZE.Text16,
        color: COLORS.blackText,
    },

    errorMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: getHp(150),
    },

    errorMessage: {
        fontSize: TEXTFONTSIZE.Text18,
        color: COLORS.notificationMessageText,
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: getHp(20),
        marginTop: getHp(20),
    },

    buttonText: {
        color: COLORS.viewAllButtonTextColor,
        fontSize: TEXTFONTSIZE.Text16,
    }
});