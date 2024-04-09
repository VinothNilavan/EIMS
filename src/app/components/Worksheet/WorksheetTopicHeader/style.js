import {StyleSheet, Platform} from 'react-native';
import {COLORS, TEXTFONTSIZE} from '@constants';
import {getWp, getHp} from '@utils';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  container: {
    marginTop: getHp(25),
    backgroundColor: COLORS.white,
    borderRadius: getWp(13),
    marginHorizontal: getWp(16),
  },

  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getWp(40),
    marginBottom: getHp(25),
    flex:1,
  },

  accuracyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: DeviceInfo.isTablet() ? getHp(70) : getHp(52),
    marginEnd: getWp(40),
    width:'60%'
  },

  marginLeft: {
    marginLeft: getWp(12),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  svgText: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.white,
    textAlign: 'center',
  },

  itemStyle: {
    alignItems: 'center',
    marginLeft: getWp(15),
  },

  svgStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  text: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.screenTestDescriptionTextColor,
    marginLeft: getWp(5),
    textAlign: 'center',
  },

  background: {
    backgroundColor: COLORS.worksheetReportQuestionOptionColor,
    borderRadius: getWp(10),
    padding: getWp(10),
    marginLeft: 0,
  },

  title: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.screenTestDescriptionTextColor,
    textAlign: 'center',
    marginTop: getHp(20),
    marginBottom: getHp(16),
  },
  topicDetailsContainer: {
    borderTopColor: COLORS.topicListBorderColor,
    borderTopWidth: 1,
    paddingHorizontal: getWp(16),
    paddingVertical: getHp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },

  topicTitle: {
    fontSize: TEXTFONTSIZE.Text18,
    color: COLORS.screenTestDescriptionTextColor,
    flex: 1,
    lineHeight: Platform.isPad ? getHp(35) : getHp(30)
  },

  itemContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  itemTitle: {
    fontSize: TEXTFONTSIZE.Text16,
    color: COLORS.screenTestDescriptionTextColor,
  },

  number: {
    fontSize: TEXTFONTSIZE.Text28,
    color: COLORS.screenTestDescriptionTextColor,
  },
  svgContainer: {
    width: getWp(60),
    height: getWp(60),
    marginEnd: getWp(-5)
  },
});
