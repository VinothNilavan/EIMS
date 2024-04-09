import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
	container: {
		flexDirection: 'column',
		height: getHp(200),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: getWp(16),
		marginBottom: getHp(10),
		overflow: 'hidden',
		backgroundColor: COLORS.white,
	},
	videoView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	btnStyle: {
		width: getWp(40),
		height: getWp(40),
		borderRadius: getWp(20),
		backgroundColor: COLORS.orange,
		alignItems: 'center',
		justifyContent: 'center'
	},
	fullScreenContainer: {
		flex: 1,
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
});