import {StyleSheet} from 'react-native';
import { getWp} from '@utils';

export default StyleSheet.create({
  matchQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    flexShrink: 1,
  },
  boxMargin: {
    marginRight: getWp(10),
  },
});
