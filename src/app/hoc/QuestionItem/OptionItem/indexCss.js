import {StyleSheet} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp, getHp} from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: getHp(15),
  },
  optionNumberContainer: {marginRight: getWp(16)},

  optionText: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.lightGray20,
    fontFamily: 'Roboto-Bold',
  },
});
