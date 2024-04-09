import { StyleSheet } from 'react-native';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { getWp, getHp } from '@utils';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { isTablet } from '@utils';

const isTablets = isTablet();

export default StyleSheet.create({

  tileStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10
  },

  profileStyle: {
    height: '100%',
    marginRight: getWp(4),
    marginLeft: getWp(5),
    justifyContent: 'center',
    flex: 1
  },

  titleStyle: {
    fontSize: TEXTFONTSIZE.Text12,
    color: COLORS.leaderBoardTitleColor,
  },

  whiteTextColor: {
    color: COLORS.white,
  },
  titleTextStyle: {
    fontSize: TEXTFONTSIZE.Text11,
    color: Colors.white,
    position: 'absolute',
    lineHeight: 11,
    textAlign: "center",
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%'
  },
  bannerContainer: {
    position: 'absolute',
    marginTop: isTablets ? getHp(2) : getHp(6),
    zIndex: 100,
    marginLeft: isTablets ? getWp(-5) : 0,
  }
});