
import { StyleSheet } from 'react-native';
import { TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
export default StyleSheet.create({
    titleTextStyle: {
        fontSize: TEXTFONTSIZE.Text15,
        color: `#FFFFFF`,
        textAlign: 'center'
    },
    progressContainerStyle: {
        alignSelf: "center",
        marginTop: getHp(5),
        marginBottom: getHp(8)
    },
    dotViewContainer: {
        width: getWp(40),
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    singleDotView: {
        height: getHp(7),
        width: getHp(7),
        borderRadius: getHp(40),
        backgroundColor: "#FFF",
        marginBottom: getHp(7)
    }
});