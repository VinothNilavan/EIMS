import { StyleSheet } from 'react-native';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    progressContainerStyle: {
        position: 'absolute'
    },
    mainContainer: {
        width: getWp(57),
        height: getWp(57),
        borderRadius: getWp(28.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotProgressContainerStyle: {
        position: "absolute",
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center"
    },
    dotProgressStyle: {
        height: getHp(8),
        width: getHp(8),
        backgroundColor: "#FFF",
        borderRadius: getHp(8),
        marginLeft: getHp(4)
    },
    imageChamp: {
        width: getWp(64),
        height: getWp(49),
        alignSelf: 'center'
    },
    imageStar: {
        width: getWp(41),
        height: getWp(56),
        alignSelf: 'center'
    }
});