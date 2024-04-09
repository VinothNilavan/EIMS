import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
    rewardShowCaseContainer: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        marginTop: -getHp(35),
        marginBottom: getWp(15)
    },
    rewardBadgeContainerStyle: {
        height: getHp(120),
        width: getHp(120),
        borderRadius: getHp(100),
        marginTop: getHp(60),
    },
    rewardBadgeContainerStyle1: {
        height: getHp(120),
        width: getHp(120),
        borderRadius: getHp(100),
        marginTop: getHp(60),
        backgroundColor: '#022A4B'
    },
    rewardNameTextStyle: {
        marginTop: getHp(15),
        color: COLORS.white,
        fontSize: TEXTFONTSIZE.Text24
    },
    positiveMessageStyle: {
        color: COLORS.white,
        fontSize: TEXTFONTSIZE.Text14,
        textAlign: 'center'
    },
    rewardTypeTextStyle: {
        color: `#1C516A`,
        fontSize: TEXTFONTSIZE.Text18,
        marginTop: -getHp(5)
    },
    rewardDescriptionTextStyle: {
        marginTop: getHp(4),
        fontSize: TEXTFONTSIZE.Text16,
        color: "#FFF",
        textAlign: "center"
    },
    applyRewardTextStyle: {
        color: COLORS.orange,
        fontSize: TEXTFONTSIZE.Text28,
        fontFamily: 'BalooThambi-Regular',
    },
    applyReward: {
        height: getHp(60),
        width: getWp(215)
    },
    rewardTitleNameStyle: {
        fontSize: TEXTFONTSIZE.Text22,
        textAlign: "center",
        color: "#FFF"
    },
    rewardTitleTextStyle: {
        marginTop: getHp(30),
        textAlign: "center",
        fontSize: TEXTFONTSIZE.Text16,
        color: "#FFF",
        marginBottom: getHp(30)
    },
    rewardTitleSVGContainer: {
        position: 'absolute',
    },
    rewardTitleContainer: {
        marginTop: getHp(95),
        justifyContent: "center",
        alignItems: "center"
    },
    rewardsBgRaysContainer: {
        position: 'absolute',
        top: DeviceInfo.isTablet() ? getHp(-50) : getHp(0),
        width: "70%",
    },
    titleIconSvgStyle: {
        width: getWp(330),
        height: getHp(50)
    },
    rewardBadgeCountContainerStyle: {
        bottom: getHp(6),
        right: getWp(10),
        width: getHp(25),
        height: getHp(25),
        borderRadius: getHp(50)
    },
    imageChamp: {
        marginTop: -15,
        width: 100,
        height: 85
    },
    imageSparkie: {
        marginTop: -15,
        width: 80,
        height: 110,
        alignSelf: 'center'
    }

});
