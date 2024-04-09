import { StyleSheet } from 'react-native';
import { getWp } from '@utils';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: widthPercentageToDP('100'),
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 15
  },
  box: {
    width: 200,
    height: 200
  },
  bottomHeaderContainer: {
    paddingTop: 2.5,
    elevation: 4,
    backgroundColor: '#dddd',
    borderRadius: 15,
    zIndex: 10,
  },
  listContainer: {
    marginTop: -5,
    marginLeft: -5,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#dddd',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,//0.9,
    shadowRadius: 5,
    elevation: 4,
    maxHeight: '60%'
  },
  listInnerContainer: {
    backgroundColor: '#dddd',
    elevation: 4,
    zIndex: 10,
    borderRadius: 15
  },
  sheetContent: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: getWp(32),
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#dddd',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 4,
  }
});
export default styles;