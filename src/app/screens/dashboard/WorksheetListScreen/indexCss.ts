import { StyleSheet } from 'react-native';
import { getWp, getHp } from '@utils';
import { COLORS } from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    elevation: 2,
    zIndex: 2
  },
  innerSubContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideMenuContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 0.7,
    zIndex: 100,
  },
  buddy: {
    position: 'absolute',
    right: getWp(16),
    top: getHp(18)
  },
  footerContainer: {
    bottom: 1,
    position: 'absolute',
    width: '100%'
  },
  modalContainerAlertStyle: {
    backgroundColor: COLORS.subtitleDarkBlue,
    paddingBottom: 0,
  },
  errorView: {
    padding: getWp(24),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: COLORS.white,
    fontSize: getWp(28),
    paddingTop: 16,
  },
  secondaryTextStyle: {
    color: COLORS.white,
    marginBottom: getHp(16),
    textAlign: 'center',
  }
});
