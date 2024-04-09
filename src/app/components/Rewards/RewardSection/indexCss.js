import { StyleSheet } from 'react-native';
import { TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
  gradientStyle: {
    height: getHp(42),
    justifyContent: "center",
    opacity: .17,
    position: 'absolute',
    width: "100%"
  },
  gradientContainerStyle: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: getHp(42)
  },
  gradientViewButtonStyle: {
    color: `#F8651F`,
    fontSize: TEXTFONTSIZE.Text13,
    marginRight: 20
  },
  gradientContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradientTextStyle: {
    color: 'white',
    opacity: 1,
    fontSize: TEXTFONTSIZE.Text15
  },
  rewardSectionChildContainer: {
    marginBottom: getHp(15)
  },
  titleAndInfoContainer: {
    flexDirection: 'row'
  },
  infoIcon: {
    width: getWp(22),
    height: getWp(22),
    marginLeft: 10
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 50,
    height: 50
  },
  textContainer: {
    flex: 1,
    zIndex: 100,
    flexDirection: 'row',
    color: '#212121',
  },
  msgTextStyle: {
    fontSize: TEXTFONTSIZE.Text13,
    width: '100%',
    color: '#212121',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popoverContainer: {
    padding: 5
  }
});
