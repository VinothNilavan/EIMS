import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    itemContainer: {
        alignItems: "center"
    },
    titleElementStyle: {
        marginRight: getWp(35),
        marginTop: getHp(30)
    },
    certificateItemContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        //flex: 1,
    },
    certificateItemText: {
        color: COLORS.white,
        fontSize: TEXTFONTSIZE.Text14,
        marginTop: getHp(15),
        textAlign: 'center',
    },
    certificateBaseStyle: {
        flexDirection: 'column',
        width: getWp(127),
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent: 'flex-end',
        marginVertical: 10,
    },
    selectedCertificateSVGContainer: {
        position: 'absolute',
        top: 10
    },
    itemListContainer: {
        width: "100%",
        alignSelf: "center",
        marginTop: getHp(20),
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: 'center',
        justifyContent: 'center',
    },
    rewardSectionChildContainer: {
        marginBottom: getHp(25),
    },
    checkMarkContainer: {
        marginTop: getHp(5),
        alignSelf: "center"
    },
    emptyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
    emptyStateText: {
        flexDirection: 'row',
        color: COLORS.white,
        fontSize: TEXTFONTSIZE.Text18,
        textAlign: 'center',
    },
    imageContainer: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 20,
        width: 50,
        height: 70,
        alignSelf: 'center'
    },
    linearGradientViewStyle: {
        marginRight: getWp(20),
        marginTop: getHp(30),
        paddingHorizontal: getWp(15),
        justifyContent: "center",
        alignItems: "center",
        height: getHp(50),
    },
});