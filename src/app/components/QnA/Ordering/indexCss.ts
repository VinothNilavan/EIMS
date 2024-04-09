import { StyleSheet } from 'react-native';
import { getHp, getWp } from '@utils';

export default StyleSheet.create({
	dragTypeQuestionView: {
		marginTop: getHp(20),
		paddingBottom: getHp(20),
		alignSelf: 'center',
	},
	webViewContainer: {
		width: getWp(393),
	}
});
