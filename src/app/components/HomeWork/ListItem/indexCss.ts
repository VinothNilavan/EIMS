import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  cardUpperTag: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5.7'),
    paddingVertical: 0,
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: COLORS.cardUpperTag,
  },
  upperTagExpire: {
    backgroundColor: '#EBEBEB',
  },
  cardUpperTagText: {
    fontSize: 13,
    color: COLORS.white,
  },
  upperTagExpireText: {
    color: '#757575',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLeftContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginEnd: wp('2.4'),
  },
  imageHolder: { width: wp('8.4'), height: hp('3.9') },
  btnMidContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  btnMidUpperText: {
    color: COLORS.topicCardTitle,
    includeFontPadding: false,
    marginBottom: -hp('0.6'),
    textAlignVertical: 'bottom',
    textAlign: 'left',
    fontSize: hp('2'),
    lineHeight: hp('1.8'),
    paddingTop: hp('2.2'),
  },
  btnMidLowerText: {
    fontSize: wp('3.1'),
    color: COLORS.infoMessageGray,
  },
  btnRightContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginEnd: wp('3.3'),
  },
  rightText: {
    color: COLORS.progressBlue,
    fontSize: wp('4.3'),
  },
});
