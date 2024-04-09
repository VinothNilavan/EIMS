import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { View, ScrollView } from 'react-native';
import styles from './style';
import { SourceSansProBoldTextView, RoundedButton, Passage } from '@components';
import { useStores } from '@mobx/hooks';
import { getHp, getWp } from '@utils';

const PassageDialog = props => {
  const { isVisible, passageData, onPress } = props;
  const { uiStore, appStore } = useStores();

  const languageData = uiStore?.languageData;
  let titleText =
    languageData && languageData?.hasOwnProperty('passage_questions')
      ? languageData?.passage_questions
      : 'Passage Questions';
  let closeText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('close')
      ? languageData?.btn?.close
      : 'Close';
  const isRTL = uiStore.isRTL;

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <View style={isRTL ? styles.RTLTitleContainer : styles.titleContainer}>
          <SourceSansProBoldTextView style={styles.titleText}>
            {titleText}
          </SourceSansProBoldTextView>
          <RoundedButton
            onPress={onPress}
            width={getWp(100)}
            height={getHp(60)}
            textStyle={styles.closeText}
            type="elevatedOrange"
            text={closeText}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Passage passageTree={passageData} audioCleanup={() => { console.log('clean up'); }} />
        </ScrollView>
      </View>
    </Modal>
  );
};

PassageDialog.propTypes = {
  isVisible: PropTypes.bool,
  passageData: PropTypes.object,
  onPress: PropTypes.func,
};

PassageDialog.defaultProps = {
  onPress: () => { console.log(`PassageDialog default onPress`) },
  isVisible: false,
};

export default PassageDialog;
