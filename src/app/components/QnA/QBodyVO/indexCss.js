import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
  RTLQbodyVoiceOverContainer: {
    marginTop: getWp(16),
    marginLeft: getWp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },

  QbodyVoiceOverContainer: {
    marginTop: getWp(16),
    marginLeft: getWp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  soundIconContainer: {
    width: getWp(46),
    height: getWp(46),
    borderRadius: getWp(15),
    backgroundColor: COLORS.soundButtonBackgroundColor,
    borderWidth: getWp(3),
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getWp(12)
  },
  soundIcon: {
    width: getWp(20),
    height: getWp(20)
  },
  quesVOContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
});
