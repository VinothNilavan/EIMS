import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: getWp(60),
        borderWidth: getWp(5),
        borderColor: COLORS.infoContainerBdr,
        alignItems: 'center',
        width: getWp(375),
        alignSelf: 'center',
        paddingBottom: getHp(40),
    },

    titleContainer: {
        flexDirection: 'row',
        width: getWp(271),
        height: getHp(128),
        marginTop: getWp(25),
        alignItems: 'center',
        justifyContent: 'center',
    },

    svgBackgroundImage: {
        position: 'absolute',
    },

    titleText: {
        fontSize: TEXTFONTSIZE.Text35,
        color: COLORS.statTextColor,
        textAlign: 'center',
    },

    subTitleText: {
        fontSize: TEXTFONTSIZE.Text20,
        color: COLORS.leaderBoardTitleColor,
        textAlign: 'center',
        marginTop: getHp(16),
    },

    dueDateText: {
        color: COLORS.errorMessage,
        fontSize: TEXTFONTSIZE.Text16,
        marginBottom: getHp(20),
    },

    commentContainer: {
        width: getWp(303),
        minHeight: getHp(166),
        marginTop: getHp(10),
        paddingStart: getWp(15),
        paddingEnd: getWp(15),
        paddingTop: getHp(18),
        paddingBottom: getWp(18),
        borderRadius: getWp(23),
        marginBottom: getHp(100),
        backgroundColor: COLORS.worksheetReportQuestionOptionColor,
    },

    commentText: {
        fontSize: TEXTFONTSIZE.Text16,
        color: COLORS.leaderBoardTitleColor,
    },

    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        height: getHp(60),
        left: getWp(20),
        right: getWp(20),
        bottom: getHp(-30),
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});