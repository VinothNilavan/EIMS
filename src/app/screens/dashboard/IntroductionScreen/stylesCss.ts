import { StyleSheet } from 'react-native';
import { getWp, getHp } from '@utils';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },

  gameDone: {
    position: 'absolute',
    right: wp('35'),
    zIndex: 5
  },

  baseFlexOne: {
    flex: 1
  },

  webviewContainer: {
    flex: 0.95,
    marginTop: '2%'
  },

  sucPopup: {
    height: '90%', 
    width: '70%'
  },

  newMsgModel: {
    marginTop: '2%',
    width: '70%',
    height: '108%',
    paddingVertical: getHp(1),
  },

  roundedButtonStyle: {
    marginTop: hp('2'),
    marginBottom: hp('2'),
    alignSelf: 'center'
  },

  gameDoneRoundedButtonStyle: {
    marginTop: hp('1'),
    marginBottom: hp('1'),
    alignSelf: 'center'
  },

  roundedButtonText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: wp('4')
  },

  higherMsgModel: {
     marginTop: hp('2'), 
     marginBottom: hp('2')
  },

  baseHigherMsgModel: {
    position: 'absolute',
    right: wp('10'),
    top: hp('2'),
    zIndex: 5
  },

  headerFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: getHp(26),
    marginStart: getWp(12),
    marginEnd: getWp(12),
    marginBottom: 10
  },

});
