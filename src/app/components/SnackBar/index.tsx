import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './style';
import { BalooThambiRegTextView } from '@components';
import { useStores } from '@mobx/hooks';
import { RoundCloseIcon } from '@images';
const SnackBar = props => {
  const [isVisible, setVisibility] = useState(false);
  const { appStore } = useStores();

  useEffect(() => {
    setVisibility(appStore.SnackBar.isVisible);
    if (appStore.SnackBar.isVisible) {
      setTimeout(() => {
        hideSnackBar()
      }, 10000)
    }
  }, [appStore.SnackBar.isVisible]);

  const hideSnackBar = () => {
    setVisibility(false);
    appStore.setSnackBar({
      isVisible: false,
      title: ''
    });
  }

  return (
    isVisible && <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BalooThambiRegTextView
          ellipsizeMode='tail'
          numberOfLines={2}
          style={styles.title} >
          {appStore?.SnackBar?.title}
        </BalooThambiRegTextView>
      </View>
      <TouchableOpacity style={styles.closeContainer} onPress={hideSnackBar}>
        <View style={styles.closeIcon}>
          <RoundCloseIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SnackBar;
