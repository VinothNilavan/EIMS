import React from 'react';
import { Share, TouchableOpacity, View } from 'react-native';
import { ShareImg } from '@images';
import styles from './styles';
import { GENERIC } from '@constants';
import { useStores } from '@mobx/hooks';

const onShareClick = async store => {
  const option = {
    subject: '',
    dialogTitle: '',
  };
  const content = {
    title: 'App link',
    message:
      `Accept my invite for EI Mindspark app & get 2 topics in Mindspark for free! Get it from: ${GENERIC.PLAYSTORE_LINK}`,
    url: `${GENERIC.APPSTORE_LINK}`,
  };
  try {
    const result = await Share.share(content, option);
    console.log(`result : ${result}`);
  } catch (error) { console.log(error) }
};

const ShareButton = () => {
  const store = useStores();
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => onShareClick(store)} style={{ marginLeft: 70 }}>
          <ShareImg
            accessible={true}
            testID="ShareButton"
            accessibilityLabel="ShareButton"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShareButton;
