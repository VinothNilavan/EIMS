import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';

export default StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: COLORS.white,
		alignSelf: 'center',
	},

	childContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},

	headerContainer: {
		flex: 1,
		///flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'center',
		//justifyContent: 'space-between',
		marginTop: getWp(60),
		marginHorizontal: getWp(16),
	},

	RTLHeaderContainer: {
		//sflexDirection: 'row-reverse',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		marginTop: getWp(60),
		marginHorizontal: getWp(16),
	},

	questionCountText: {
		fontSize: TEXTFONTSIZE.Text24,
		color: COLORS.white,
		marginTop: getHp(60),
		textAlign: 'center',
	},

	countContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: getWp(24),
		marginBottom: getWp(30),
	},

	RTLCountContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: getWp(24),
		marginBottom: getWp(30),
	},

	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: getWp(20),
		marginBottom: getWp(20),
	},

	titleText: {
		color: COLORS.topicCardTitle,
		fontSize: TEXTFONTSIZE.Text16,
		alignSelf: 'center',
		backgroundColor: 'transparent',
		fontFamily: 'BalooThambi-Regular',
		width: getWp(250),
	},
});
