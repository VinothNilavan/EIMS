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
        height: getHp(480),
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

    btnText: {
        fontSize: TEXTFONTSIZE.Text20,
    },

    subTitleText: {
        fontSize: TEXTFONTSIZE.Text20,
        color: COLORS.leaderBoardTitleColor,
        textAlign: 'center',
        marginTop: getHp(80),
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