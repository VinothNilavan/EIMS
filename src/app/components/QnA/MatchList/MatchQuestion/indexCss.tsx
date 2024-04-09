import { StyleSheet } from 'react-native';
import { COLORS , TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  container: {
    width: getWp(170),
    backgroundColor: COLORS.sortListQuestionBackgroundColor,
    borderRadius: getWp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrangeLetterContainerChildView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(140),
    flex: 1
  },

  webviewContainer: {
    width: getWp(140),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: TEXTFONTSIZE.Text14,
  },
  
  imageContainer : { 
    width: getWp(130), 
    height: getHp(110) 
  }
});
