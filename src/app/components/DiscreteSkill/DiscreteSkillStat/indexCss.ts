import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		marginHorizontal: getWp(16),
		justifyContent: 'center',
	},
	subContainer: {
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center',
	},
	accuracyVal: {
		color: COLORS.white,
		fontSize: TEXTFONTSIZE.Text20,
		textAlign: 'center'
	},
	accuracyPerVal: {
		fontSize: TEXTFONTSIZE.Text10,
	},
	title: {
		color: COLORS.white,
		fontFamily: 'BalooThambi-Regular',
		fontSize: TEXTFONTSIZE.Text18,
		lineHeight: getWp(18),
		paddingTop: getHp(9),
		textAlign: 'center',
	},
	progressSvgStyle: {
		height: getWp(49),
		width: getWp(49),
		justifyContent: 'center',
	},
	svgStyle: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
	},
	attemptText: {
		fontSize: TEXTFONTSIZE.Text18,
		alignSelf: 'center',
	},
	accSvgStyle: {
		width: getWp(59.3),
		height: getWp(59.3),
		justifyContent: 'center',
	},
	svgContainer: {
		width: getWp(60),
		height: getWp(60),
		alignItems: 'center',
		justifyContent: 'center',
	},
	svgBgStyle: {
		width: '100%',
		height: '100%',
	},
	accuractText: {
		marginBottom: getHp(20),
	},
});
