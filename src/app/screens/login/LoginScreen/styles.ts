import { StyleSheet, Platform, PlatformIOSStatic } from 'react-native';
import { getHp, getWp } from '@utils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, TEXTFONTSIZE } from '@constants';

const platformIOS = Platform as PlatformIOSStatic

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        height: hp('100'),
    },
    innerContainer: {
        width: '100%',
        paddingHorizontal: getWp(32),
        paddingTop: getHp(80),
        alignItems: 'center',
    },
    logoContainer: {
        width: getWp(190),
        height: getHp(110),
        marginBottom: getHp(80),
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    heading: {
        fontSize: TEXTFONTSIZE.Text28,
        color: COLORS.subtitleDarkBlue,
        marginBottom: getHp(36),
        textAlign: 'center',
        marginTop: platformIOS.isPad ? getHp(15) : Platform.OS === 'ios' ? -25 : 0
    },
    input: {
        width: '100%',
        height: getHp(60),
        justifyContent: 'center',
        textAlign: 'center',
        borderColor: COLORS.disabledGray,
        borderWidth: 1,
        fontSize: TEXTFONTSIZE.Text20,
        color: COLORS.subtitleDarkBlue,
        marginBottom: getHp(24),
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: getWp(37),
        paddingRight: getWp(36),
        width: '100%',
        marginTop: getHp(76),
    },
    footerSvg: {
        width: getWp(74),
        height: getHp(124),
    },

    footerGuestImg: {
        width: getWp(78),
        height: getHp(130),
    },
    errorMessage: {
        color: COLORS.errorMessage,
        fontSize: TEXTFONTSIZE.Text16,
        textAlign: 'center',
        marginBottom: hp('2'),
        marginTop: hp('-2.5'),
    },
    footerTextContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        position: 'relative',
        marginTop: getHp(84),
    },
    footerText: {
        fontSize: TEXTFONTSIZE.Text20,
        marginLeft: 5,
        marginBottom: getHp(16)
    },
    linkContainer: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: getHp(60),
        paddingHorizontal: 7,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: getHp(60),
        alignSelf: 'center',
        elevation: 0,
        width: '100%',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
    },
    link: {
        fontSize: TEXTFONTSIZE.Text20,
        color: COLORS.primary,
    },
    link1: {
        fontSize: TEXTFONTSIZE.Text18,
        color: COLORS.primary,
    },
    NeedHelpContainer: {
        borderRadius: 20,
        backgroundColor: '#FF6100',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: 0
    },
    NeedHelpTextStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: TEXTFONTSIZE.Text12
    },
    bannerText: {
        fontSize: TEXTFONTSIZE.Text32,
        color: COLORS.infoPopupTitle,
        textAlign: 'center',
        lineHeight: getHp(32),
        paddingTop: getHp(32),
    },
    closeContainer: {
        justifyContent: 'center',
        width: 40,
        height: '100%',
        marginRight: 10
    },

    closeIcon: {
        position: 'absolute',
        borderRadius: 50,
        height: 20,
        width: 20,
        marginLeft: 5,
        textAlign: 'center',
        backgroundColor: COLORS.white,
        color: COLORS.white
    },

    svgText: {
        fontSize: TEXTFONTSIZE.Text14,
        color: COLORS.white,
        margin: 10
    },

    bannerContainerStyle: {
        height: '15%',
        backgroundColor: COLORS.LightRed,
        flexDirection: 'row',
        padding: 0,
        marginLeft: 20,
        marginRight: 20
    },

    bannerStyle: {
        height: 100,
        flex: 1,
        backgroundColor: COLORS.white
    },
    needHelpSymbol: {
        position: 'absolute',
        right: 0,
        margin: 20
    },
    guestAccountImage: {
         marginTop: getHp(35) + 45,
         alignItems: 'center'
    }
});  