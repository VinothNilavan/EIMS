import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: COLORS.questionInstructionBackgroundColor,
        borderRadius: getWp(9),
        marginStart: getWp(12),
        marginEnd: getWp(16),
        paddingStart: getWp(16),
        paddingEnd: getWp(16),
        paddingTop: getHp(14),
        paddingBottom: getHp(14),
        marginTop: getHp(15),
    },

    titleText: {
        color: COLORS.leaderBoardTitleColor,
        fontSize: TEXTFONTSIZE.Text16,
        marginBottom: getHp(3),
    },

    webViewContainer: {
        width: getWp(300),
    }
});