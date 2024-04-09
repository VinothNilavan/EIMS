import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%'
  },

  titleTextContainer: {
    minWidth: getWp(88),
    maxHeight: getWp(34),
    backgroundColor: COLORS.classificationTitleColor,
    borderRadius: getWp(17),
    alignItems: 'center',
    justifyContent: 'center',
    padding: getWp(5),
    marginBottom: getWp(12),
  },

  titleText: {
    color: COLORS.screenTestDescriptionTextColor,
    fontSize: TEXTFONTSIZE.Text14,
    fontWeight: 'bold',
  },

  bucketContainer: {
    width: getWp(220),
    marginHorizontal: getWp(10),
    minHeight: getWp(185),
  },

  bucketChildContainer: {
    flex: 1,
    marginBottom: getWp(20),
  },
});
