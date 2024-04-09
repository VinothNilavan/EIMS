import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SimpleLottie } from '@components';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import styles from './indexCss';
import { useBackHandler } from '@react-native-community/hooks';
const Loader = props => {
  const { uiStore } = useStores();
  const [showLoader, setShowLoader] = useState(uiStore.loader);

  useEffect(() => {
    if (uiStore.loader) {
      setTimeout(() => {
        setShowLoader(uiStore.loader);
      }, 500);
    } else {
      setShowLoader(uiStore.loader);
    }
  }, [uiStore.loader]);


  useBackHandler(() => {
    return true;
  });

  return (
    showLoader &&
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <SimpleLottie
          jsonFileName="loaderUpdated"
          theme="ocean"
          style={styles.lottie}
          autoResize={true}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};
Loader.propTypes = {};
Loader.defaultProps = {};
export default observer(Loader);
