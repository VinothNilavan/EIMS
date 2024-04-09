import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
  instructorStimulusContainer: {
    marginTop: getWp(10),
    marginLeft: getWp(10),
    marginRight: getWp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: getWp(352),
  },

  RTLInstructorStimulusContainer: {
    marginTop: getWp(16),
    marginLeft: getWp(16),
    marginRight: getWp(16),
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },

  instructorStimulusTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    width: getWp(220),
  },

  RTLInstructorStimulusTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  instructorStimulusText: {
    fontSize: TEXTFONTSIZE.Text24,
    color: COLORS.screenTestDescriptionTextColor,
  },

  RTLInstructorStimulusText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.screenTestDescriptionTextColor,
    textAlign: 'right',
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
  },

  soundIcon: {
    width: getWp(20),
    height: getWp(20),
  },
});
