import { StyleSheet } from 'react-native';
import { getWp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: getWp(19),
        paddingTop: getWp(24),
        paddingBottom: getWp(24),
        paddingRight: getWp(23),
        borderBottomWidth: getWp(0.5),
        borderBottomColor: COLORS.messageAreaBg,
    },
    imageContainerNew: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 20,
        width: 50,
        height: 70,
        alignSelf: 'center'
    },
    popupContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: getWp(11),
        paddingBottom: getWp(11),
        paddingRight: getWp(17),
        paddingLeft: getWp(14),
        borderBottomWidth: getWp(1),
        borderBottomColor: COLORS.messageAreaBg,
    },
    imageContainer: {
        width: getWp(70),
        height: getWp(70),
        borderRadius: getWp(70 / 2),
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageHolder: {
        width: '60%',
        resizeMode: 'contain',
        height : '60%', 
    },
    unreadDot: {
        width: getWp(11),
        height: getWp(11),
        borderRadius: getWp(11/2),
        backgroundColor: '#FE6500',
        marginLeft: -15
    },
    activeContainer: {
        width: getWp(10),
        height: getWp(10),
        borderRadius: getWp(5),
        backgroundColor: COLORS.cardUpperTag,
        position: 'absolute',
        right: getWp(6),
        top: getWp(5),
    },

    messageContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: getWp(15),
        marginRight: getWp(15),
    },

    popupMessageContainer: {
        width: getWp(250),
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: getWp(15),
        marginRight: getWp(15),
    },

    titleTextRead: {
        fontSize: TEXTFONTSIZE.Text16,
        color: "#848484",
        textTransform: 'capitalize',
    },
    titleTextUnRead: {
        fontSize: TEXTFONTSIZE.Text16,
        color: "#FEFEFE",
        textTransform: 'capitalize',
    },

    messageTextUnread: {
        fontSize: TEXTFONTSIZE.Text14,
        color: "#FEFEFE",
    },
    messageTextRead: {
        fontSize: TEXTFONTSIZE.Text14,
        color: "#848484",
    },

    timeTextRead: {
        fontSize: TEXTFONTSIZE.Text13,
        color: "#848484",
    },

    timeTextUnRead: {
        fontSize: TEXTFONTSIZE.Text13,
        color: "#FEFEFE",
    },

    popupTitleTextRead: {
        fontSize: TEXTFONTSIZE.Text16,
        color: "#848484",
        textTransform: 'capitalize',
    },

    popupTitleTextUnRead: {
        fontSize: TEXTFONTSIZE.Text16,
        color: "#000000",
        textTransform: 'capitalize',
    },

    popupMessageText: {
        fontSize: TEXTFONTSIZE.Text14,
        color: COLORS.notificationMessageText,
    },

    popupMessageTimeText: {
        fontSize: TEXTFONTSIZE.Text13,
        color: COLORS.notificationTimeText,
        position: 'absolute',
        right: getWp(17),
        top: getWp(11),
    },
    popupMessageTimeTextUnRead: {
        fontSize: TEXTFONTSIZE.Text13,
        color: "#000000",
        position: 'absolute',
        right: getWp(17),
    }
});