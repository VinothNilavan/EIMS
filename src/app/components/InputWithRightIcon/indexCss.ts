import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.inputTextBorder,
    height: getHp(60),
    borderRadius: 50,
    width: '100%',
  },
  ImageStyle: {},
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: TEXTFONTSIZE.Text20,
    fontFamily: 'SourceSansPro-Regular',
    paddingVertical: 0,
  },
  imageContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginEnd: getWp(24),
    paddingTop: getWp(5),
  },
});
