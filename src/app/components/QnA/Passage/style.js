import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		width: getWp(340),
		backgroundColor: COLORS.white,
		marginTop: getWp(24),
		marginBottom: getWp(24),
	},

	titleText: {
		fontSize: TEXTFONTSIZE.Text20,
		color: COLORS.screenTestDescriptionTextColor,
		marginBottom: getWp(16),
	},

	webviewContainer: {
		width: getWp(300),
	},

	separatorView: {
		height: getWp(20),
	},
	buttonContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnStyle: {
		width: getWp(40),
		height: getWp(40),
		borderRadius: getWp(20),
		backgroundColor: COLORS.orange,
		alignItems: 'center',
		justifyContent: 'center',
	},
	playerContainer: {
		flexDirection: 'column',
		height: getHp(200),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: getWp(16),
		marginBottom: getHp(10),
		overflow: 'hidden',
		backgroundColor: 'black',
	},
});
