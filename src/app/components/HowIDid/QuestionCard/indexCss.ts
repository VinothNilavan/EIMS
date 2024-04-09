import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default {
  container: {
    marginTop: getHp(42),
    marginHorizontal: getWp(10),
    borderRadius: getWp(20),
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  innerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: getWp(17),
    paddingVertical: getHp(25),
  },
  conceptText: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.conceptsColor,
    marginBottom: getHp(30),
  },
  questionTimeTakenContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getHp(30),
  },
  questionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  questionText: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.screenTestDescriptionTextColor,
    marginRight: getWp(10),
  },
  questionSvg: {
    width: getWp(24),
    height: getWp(24),
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeSvg: {
    width: wp('4.5'),
    height: hp('2.1'),
    marginRight: wp('2.4'),
  },
  topicText: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text20,
    marginBottom: getHp(12),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.howIdidFooter,
    paddingVertical: getHp(32),
    width: '100%',
  },
  statsText: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text20,
  },
  qTagContainer: {
    marginBottom: getHp(15),
  },
};
