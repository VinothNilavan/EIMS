import { COLORS, TEXTFONTSIZE } from '@constants';
import { getHp } from '@utils';

export default {
  btn: {
    backgroundColor: COLORS.orange,
    height: getHp(60),
    alignSelf: 'center',
    elevation: 0,
    width: '100%',
    borderRadius: getHp(60),
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
  },
  disabledBtn: {
    backgroundColor: COLORS.gray,
  },
  maroonBtn: {
    backgroundColor: COLORS.maroon,
  },
  btnText: { fontSize: TEXTFONTSIZE.Text20, color: COLORS.white },
};
