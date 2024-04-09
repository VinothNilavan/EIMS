import { StyleSheet, Dimensions } from 'react-native';
import { getHp, getWp } from '@utils';
import { useStores } from '@mobx/hooks';

const styleSheetFunc = () => {
  const { uiStore } = useStores();
  const isRTL = uiStore.isRTL;

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    innerContainer: {
      backgroundColor: 'transparent',
      alignItems: 'center',
    },
    webViewContainer: {
      marginTop: getHp(27),
      marginBottom: getHp(45),
      marginEnd: isRTL ? getWp(16.5) : getWp(0),
      width: Dimensions.get('window').width - 50,
    },
  });
};

export default styleSheetFunc;
