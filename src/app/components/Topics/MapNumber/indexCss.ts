import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/COLORS';
import { getWp } from '@utils';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  leftStarContainer: {
    justifyContent: 'center',
    position: 'absolute',
    left: -getWp(41.4),
  },
  leftStarLottie: { height: getWp(67) },
  finishFlag: { alignSelf: 'center' },
  numContainer: {
    width: getWp(67),
    height: getWp(67),
    borderRadius: getWp(67),
    backgroundColor: COLORS.mapTextDarkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  holderContainer: {
    flexDirection: 'row-reverse',
     marginStart: 50, 
     width: getWp(420),
  },
  numRightContainer: {
    width: getWp(67),
    height: getWp(67),
    borderRadius: getWp(67),
    backgroundColor: COLORS.mapTextDarkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  numText: {
    color: COLORS.mapTextBlue,
    fontFamily: 'BalooThambi-Regular',
    fontSize: getWp(29),
    alignSelf: 'center',
  },
  vernacularNumText: {
    fontFamily: 'BalooThambi-Regular',
    fontSize: wp('4'), 
    color: COLORS.mapTextBlue
  },
  activeNumContainer: {
    backgroundColor: COLORS.white,
  },
  activeNumText: {
    color: COLORS.mapTextDarkBlue,
  },
  rightStarContainer: {
    justifyContent: 'center',
    position: 'absolute',
    right: -getWp(35),
  },
  rightStarLottie: {
    height: getWp(67),
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
});
