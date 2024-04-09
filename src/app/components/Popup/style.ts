import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
    modalOuter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        borderRadius: getWp(30),
        borderColor: '#DEE2EB',
        borderWidth: getWp(5),
        height: getHp(540),
        width: getWp(360),
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    modalHeader: {
        marginTop: getHp(40),
        position: 'absolute',
        alignSelf: 'center',
        fontSize: TEXTFONTSIZE.Text32,
        color: COLORS.statTextColor,
    },
    modalContentText: {
        fontSize: TEXTFONTSIZE.Text18,
        color: COLORS.screenTestDescriptionTextColor,
        marginBottom: getHp(10),
        textAlign: 'center',
    },
    HeaderText: {
        fontSize: TEXTFONTSIZE.Text28,
        color: '#93DA27',
        textAlign: 'center'
    },
    text: {
        marginBottom: getHp(36),
        fontSize: TEXTFONTSIZE.Text20,
    },
    youReceivedContainer: {
        marginTop: getHp(20),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bgRaysContainer: {
        width: '100%',
        justifiyContent: 'center',
        alignItem: 'center'
    },
    bgRayAnimationContiner: {
        position: 'absolute',
        alignSelf: 'center',
        margin: getHp(5),
        zIndex: 100
    },
    titleText: {
        fontSize: TEXTFONTSIZE.Text28,
        color: COLORS.statTextColor,
        textAlign: 'center',
        alignSelf: 'center'
    },
    svgBackgroundImage: {
        position: 'absolute',
    },
    imageChamp: {
        position: 'absolute',
        width: 131, //getWp(131),
        height: 110,//getHp(110),
        alignSelf: 'center',
    },
    imageSparkie: {
        position: 'absolute',
        width: 80,
        height: 110,
        alignSelf: 'center',
    },
    buttonContainer: {
        borderWidth: 2,
        borderColor: '#8DE000',
        borderRadius: getWp(25),
        width: getWp(130),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: getHp(10),
        zIndex: 1000
    },
    closeContainer: {
        alignSelf: 'flex-end',
        marginTop: getHp(15),
        marginRight: getHp(15),
        margin: getHp(5)
    },
    YouReceivedCertificateText: {
        position: 'absolute',
        fontSize: TEXTFONTSIZE.Text20,
        alignSelf: 'center',
        margin: DeviceInfo.isTablet() ? getHp(5) : getHp(30)
    },
    btntext: {
        alignSelf: 'center',
        padding: 3,
        fontSize: 20
    },
    headerSvg: {
        marginTop: getHp(10),
        width: getWp(340),
        height: getHp(110),
    },
    SparkieLabelContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: DeviceInfo.isTablet() ? getHp(250) : getHp(280)
    },
    AnimationContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: DeviceInfo.isTablet() ? getHp(1) : getHp(20)
    },
    bgRayAnimation: {
        height: getHp(300),
        marginTop: getHp(10),
        alignSelf: 'center'
    }
});
