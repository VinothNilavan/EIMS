import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getWp } from '@utils';
import TextfontSize from '../../constants/TextfontSize';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: '90%',
    borderRadius: getWp(10),
    backgroundColor: COLORS.white,
    margin: '5%',
    bottom: 70,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    backgroundColor: COLORS.white,
    zIndex: 100,
    height: '100%',
    borderTopRightRadius: getWp(10),
    borderBottomRightRadius: getWp(10),
  },
  closeIcon: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 50,
    height: 20,
    width: 20,
    marginLeft: 5,
    textAlign: 'center',
  },
  closeText: { color: 'white', marginLeft: 6, marginTop: -6, lineHeight: 31 },
  titleContainer: {
    width: '85%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: TextfontSize.Text14,
  }
});
