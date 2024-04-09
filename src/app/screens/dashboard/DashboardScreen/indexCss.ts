import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp } from '@utils';
const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;

export default StyleSheet.create({
  contentContainer: {},
  flexOne: { flex: 1 },
  buddy: {
    position: 'absolute',
    top: 10,
    right: 5
  },
  svgText: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.white,
  },
  svgText1: {
    fontSize: TEXTFONTSIZE.Text14,
    color: COLORS.white,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    // alignItems: 'flex-start'
  },
  sparkieBannerInstruction1: {
    fontStyle: 'italic'
  },
  sparkieBannerInstruction2: {
    color: COLORS.yellowV2,
    paddingEnd: 5
  },
  sparkieBannerInstruction3: {
    fontWeight: '700',
    color: COLORS.LightGray,
  },
  sparkieBannerInstruction4: {
    fontStyle: 'italic',
    paddingEnd: 5
  },
  bannerContainerStyle: {
    backgroundColor: COLORS.maroonV2,
    flexDirection: 'row',
    padding: 8,
    marginTop: -10,
    justifyContent: 'center',
  },
  starBannerStyle: {
    height: getWp(15),
    width: getWp(15),
    borderRadius: getWp(10),
    alignSelf: 'center'
  },
  bannerContainerStyle1: {
    backgroundColor: COLORS.LightRed,
    flexDirection: 'row',
    width: windowWidth,
    padding: 0,
  },
  closeContainer: {
    marginTop: 5,
    marginLeft: windowWidth-30,
    position: 'absolute',
    borderRadius: 50,
    height: 35,
    width: 35,
    alignItems: 'center'
  },
  closestyle:{
    height: 20,
    width: 20,
    alignItems: 'center'
  },

  bannerStyle: {
    height: 100,
    flex: 1,
    backgroundColor: COLORS.white
  },
});