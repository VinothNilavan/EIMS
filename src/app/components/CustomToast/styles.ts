import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp } from '@utils';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: getWp(5),
    width: '95%',
    margin: '2%',
    marginBottom: '2%',
    elevation: 5,
    bottom: '15%',
    //backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  headercontainer: {
    height: '28%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 10,
    //backgroundColor:'rgba(52, 52, 52, 0.8)',
  },
  titleText: {
    fontSize: TEXTFONTSIZE.Text22,
    color: 'black',
    textAlign: 'center',
    padding: '2%',
  },

  descriptionText: {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.screenTestDescriptionTextColor,
    paddingTop: '2%',
    paddingBottom: '2%',
    textAlign: 'center',
  },

  close_button_container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 25,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    right: 1,
    marginLeft: 10,
    marginTop: 2,
    paddingLeft: '20%',
  },
  closebutton: {
    marginBottom: getWp(15),
  },
});
