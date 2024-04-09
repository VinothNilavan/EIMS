/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './style';
import { MyAutoHeightWebView, SourceSansProRegTextView } from '@components';
import { useStores } from '@mobx/hooks';
import { WhiteCloseIcon } from '@images';
import getHtmlTemplate from '@utils/getHtmlTemplate';

const ClassificationButton = ({
  item,
  callBack,
  containerType,
  disableClick,
  withoutWebView,
}) => {
  const store = useStores();
  const [dataAvailable, setDataAvailable] = useState(false);
  const [questionTree, setQuestionTree] = useState([]);
  const isRTL = store?.uiStore?.isRTL;

  useEffect(() => {
    if (withoutWebView) {
      console.log('not using webview')
    } else {
       let itemValue = `${item.value}`.length > 9 ? true : false
       let questionTreeHtml = getHtmlTemplate(item.value, false, itemValue, isRTL, null, true);
       setQuestionTree(questionTreeHtml);
    }
    setDataAvailable(true);
  }, []);

  return (
    dataAvailable &&
    <View style={isRTL ? styles.RTLContainer : styles.container}>
      <TouchableOpacity
        style={{ marginLeft: '5%' }}
        disabled={disableClick}
        onPress={() => {
          callBack(item, containerType);
        }}>
        <WhiteCloseIcon />
      </TouchableOpacity>
      <View style={styles.webviewContainer}>
        {withoutWebView ? <SourceSansProRegTextView>{item.value}</SourceSansProRegTextView> :
          <MyAutoHeightWebView
            key="mcqItemWebView"
            style={styles.webviewContentContainer}
            customScript={''}
            onSizeUpdated={(size) => { console.log(size) }}
            source={{ html: questionTree }}
            zoomable={false}
          />}
      </View>
    </View>
  );
};

export default React.memo(ClassificationButton);
