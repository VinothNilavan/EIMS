import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import { MyAutoHeightWebView } from '@components';
import styles from './indexCss';
import getHtmlTemplate from '@utils/getHtmlTemplate';
import { useStores } from '@mobx/hooks';

const ChoiceList = props => {
  const { choices, show, selectChoiceHandler, onBackdropHandler } = props;
  const { uiStore } = useStores();
  const isRTL = uiStore.isRTL;

  const renderChoiceList = ({ item, index }) => {
    let htmlsource = getHtmlTemplate(item.value, false, isRTL);
    return (
      <TouchableOpacity onPress={() => selectChoiceHandler(item)}>
        <View style={styles.choiceItem}>
          <MyAutoHeightWebView
            onMessage={() => { console.log('onMessage'); }}
            style={styles.webViewContainer}
            customScript={''}
            onSizeUpdated={size => {
              console.log(size.height);
            }}
            source={{ html: htmlsource }}
            zoomable={false}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal isVisible={show} onBackdropPress={onBackdropHandler}>
      <View style={styles.container}>
        {choices && <FlatList
          keyExtractor={(item, index) => `${index}`}
          scrollEnabled={true}
          data={choices}
          renderItem={renderChoiceList}
        />}
      </View>
    </Modal>
  );
};

ChoiceList.propTypes = {};

ChoiceList.defaultProps = {};

export default ChoiceList;
