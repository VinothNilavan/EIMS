import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    subContainer: {
        flex: 1,
        paddingHorizontal: getWp(10),
    },

    searchStyle: {
        marginTop: getHp(50),
        marginBottom: getHp(16),
        width: '100%'
    },

    heading: {
        fontSize: TEXTFONTSIZE.Text26,
        alignSelf: 'center',
        color: COLORS.white,
    },

    completeHeading :{
        fontSize: TEXTFONTSIZE.Text26,
        alignSelf: 'center',
        textAlign: 'center',
        color: COLORS.white,
        marginTop: getHp(20),
    },
    subHeading: {
        fontSize: TEXTFONTSIZE.Text18,
        alignSelf: 'center',
        color: COLORS.white,
        marginBottom: getHp(27),
    },

    itemContainer: {
        marginTop: getHp(9),
        marginBottom: getHp(9)
    },

    sectionTitle: {
        color: COLORS.mapDarkBlue,
        fontSize: TEXTFONTSIZE.Text20,
        alignSelf: 'center',
        marginTop: getHp(14),
       // marginBottom: getHp(5)
    },

    buttonContainer: {
        marginTop: getHp(18),
        alignSelf: 'center',
    },

    buttonText: {
        fontFamily: 'BalooThambi-Regular',
        color: COLORS.white,
        fontSize: TEXTFONTSIZE.Text20,
    },
    searchIcon : {
        alignSelf:'center',
         bottom:getWp(50),
        right:5
      },
      emptyData: {
        fontSize: TEXTFONTSIZE.Text20,
        alignSelf: 'center',
        textAlign: 'center',
        color: COLORS.white,
        paddingHorizontal:10,
        bottom :getWp(100)
      },
});
