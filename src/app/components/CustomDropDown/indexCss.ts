import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: getWp(13),
    paddingVertical: getHp(10),
    paddingHorizontal: getWp(16),
    marginBottom: getHp(20),
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  dropdownStyle: {
    width: '92%',
    textAlign: 'left',
    paddingHorizontal: getWp(10),
  },
  btnTextStyle: {
    alignSelf: 'flex-start',
    fontSize: TEXTFONTSIZE.Text16,
    fontFamily: 'SourceSansPro-Regular',
  },
  btnStyle: {
    textAlign: 'left',
  },
  frame: {
    top: getHp(280),
    left: getWp(17),
    height: getHp(200),
  },
  rowItemStyle: {
    paddingVertical: getHp(10),
  }
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: TEXTFONTSIZE.Text16,
    fontFamily: 'SourceSansPro-Regular',
    paddingHorizontal: getWp(10),
    paddingVertical: getHp(8),
    borderWidth: getWp(0.5),
    // borderColor: 'purple',
    borderRadius: getWp(8),
    color: COLORS.answerText,
    paddingRight: getWp(30), // to ensure the text is never behind the icon
  },
});
