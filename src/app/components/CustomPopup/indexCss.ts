import { StyleSheet, Platform } from 'react-native';
import { TEXTFONTSIZE } from '@constants';
import { getWp, getHp, isTablet } from '@utils';

const msgContainerHeight = isTablet() ? getHp(145) : getHp(100);
export default StyleSheet.create({
  mainWrapper: {
    flex: 1,
    zIndex: 100,
    flexDirection: 'row',
  },
  msgTextStyle: {
    fontSize: TEXTFONTSIZE.Text13,
    width: '100%',
    alignSelf: 'center'
  },
  iconContainer: {
    marginLeft: getWp(15),
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 50,
    height: 50
  },
  leftarrowContainer: {
    width: 25,
    height: 25,
    backgroundColor: "white",
    transform: [{ rotate: '45deg' }],
    left: getWp(-5),
    top: getHp(10)
  },
  infoIcon: {
    position: 'absolute',
    width: getWp(15),
    height: getWp(15),
    marginLeft: 10
  },
  MessageContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: getHp(5),
    maxWidth: getWp(190),
    minWidth: getWp(100),
    left: getWp(50),
    height: Platform.OS === 'ios' ? msgContainerHeight : getHp(100),
    marginTop: getHp(-20)
  },
  textContainer: {
    width: '95%',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: getHp(-10),
    padding: 5,
  }
});
