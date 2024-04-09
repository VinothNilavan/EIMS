import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    appliedContainer: { 
        position: 'absolute', 
        bottom: getHp(15), 
        width: "93%", 
        alignSelf: "center", 
        height: getHp(90), 
        backgroundColor: "#FFF", 
        borderRadius: getHp(20), 
        justifyContent: "center", 
        alignItems: "center",
        flexDirection: "row"
    },
    appliedTextStyle: {
        fontSize: TEXTFONTSIZE.Text28,
        marginLeft: getWp(10)
    }
});
