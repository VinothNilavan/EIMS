import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../constants/COLORS';
import DIMEN from '../../constants/DIMEN';
import { getHp } from '@utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: getHp(60),
    color: COLORS.placeholder,
    fontSize: hp(DIMEN.subTitle),
    borderColor: COLORS.inputTextBorder,
    borderRadius: 50,
    borderWidth: 1,
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
});
