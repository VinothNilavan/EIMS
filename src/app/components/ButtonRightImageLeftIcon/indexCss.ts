import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../constants/COLORS';
import DIMEN from '../../constants/DIMEN';

export default StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.inputTextBorder,
    height: hp(DIMEN.customInputHeightWithImage),
    borderRadius: 50,
  },
  leftImagecontainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginEnd: wp('2.4'),
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: COLORS.titleDarkBlue,
    fontSize: hp(DIMEN.buttonRightImageLeftIcon),
    fontFamily: 'SourceSansPro-Bold',
  },
  rightImageContainer: {
    flex: 1,
    justifyContent: 'center',
    marginEnd: wp('4.8'),
    alignItems: 'flex-end',
  },
});
