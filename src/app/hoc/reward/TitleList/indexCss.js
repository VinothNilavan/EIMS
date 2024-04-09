
import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
    titleItemContainer: {
        alignItems: "center"
    },
    titleElementStyle: {
        marginRight: getWp(35),
        marginTop: getHp(30)
    },
    itemListContainer: {
        width: "90%",
        alignSelf: "center",
        marginVertical: getHp(5),
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: 'center',
        justifyContent: 'center',
    },
    rewardSectionChildContainer: {
        marginBottom: getHp(25),
    },
    checkMarkConatiner: {
        marginTop: getHp(5),
        alignSelf: "center"
    },
    linearGradientViewStyle: {
        marginRight: getWp(20),
        marginTop: getHp(30),
        paddingHorizontal: getWp(15),
        justifyContent: "center",
        alignItems: "center",
        height: getHp(50),
    },
    emptyTitleContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'center',
    },
    emptyTitleText: {
        color: COLORS.white,
        fontSize: TEXTFONTSIZE.Text18,
        textAlign: 'center',
    },
    searchIcon: {
        alignSelf: 'center',
    },
});