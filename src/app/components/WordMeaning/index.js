// External Imports
import React, {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '@mobx/hooks';

// Internal Imports
import styles from './style';
import {SoundWhite} from '@images';
import {MyAutoHeightWebView, RoundedButton} from '@components';
import {getWp, getHp, createValidURL} from '@utils';
import {useLanguage, UseSound} from '@hooks';
import getHtmlTemplate from '@utils/getHtmlTemplate';
import { ScrollView } from 'react-native-gesture-handler';

const WordMeaning = props => {
  const store = useStores();
  const {qnaStore, uiStore} = store;
  const {nextText, prevText} = useLanguage();
  const {playSound, audioCleanup} = UseSound();
  const isRTL = uiStore.isRTL;
  
  const wordMeaningData =
    qnaStore?.wordMeaningData &&
    qnaStore?.wordMeaningData.length > 0 &&
    qnaStore?.wordMeaningData[qnaStore?.wordMeaningCurrentPosition]
      ? qnaStore?.wordMeaningData[qnaStore?.wordMeaningCurrentPosition]
      : null;

  console.log('wordMeaningData >>>>>', qnaStore?.wordMeaningCurrentPosition);

  useEffect(() => {
    if (
      qnaStore?.wordMeaningCurrentPosition ===
      qnaStore.wordMeaningData.length - 1
    ) {
      qnaStore.setWordMeaningStatus('completed');
      qnaStore.setViewQuestionEnabled(true);
    } else {
      if (qnaStore.wordMeaningStatus === 'pending') {
        qnaStore.setWordMeaningStatus('in-progress');
      }
    }
  }, [qnaStore?.wordMeaningCurrentPosition]);

  useEffect(() => {
    uiStore.loader &&
      setTimeout(() => {
        uiStore.setLoader(false);
      }, 800);
  }, [uiStore.loader]);

  const renderWordMeaningItem = (description, voiceover, voName) => {
    let descriptionBody = '';
    if (description && description !== '') {
      descriptionBody = getHtmlTemplate(description, false, isRTL, null, true);
    }

    return (
      <View style={styles.subContainer}>
        {voiceover && voiceover !== '' ? (
          <TouchableOpacity
            onPress={() => playSound(voName, createValidURL(voiceover))}
            style={styles.soundIconContainer}>
            <SoundWhite width={getWp(20)} height={getWp(20)} />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyContainer} />
        )}
        {descriptionBody && descriptionBody !== '' ? (
          <MyAutoHeightWebView
            key="wordMeaningDescriptionKey"
            style={styles.webView}
            customScript={''}
            onSizeUpdated={size => {
              console.log('height :', size.height);
            }}
            source={{html: descriptionBody}}
            zoomable={false}
          />
        ) : null}
      </View>
    );
  };

  if (wordMeaningData !== null)
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:0.8}}>
          {renderWordMeaningItem(
            wordMeaningData?.name,
            wordMeaningData?.voiceover,
            `wordMeaning_${qnaStore?.wordMeaningCurrentPosition}_Name`,
          )}
          <View style={styles.separateView} />
          {wordMeaningData?.description &&
            renderWordMeaningItem(
              wordMeaningData?.description?.value,
              wordMeaningData?.description?.voiceover,
              `wordMeaning_${qnaStore?.wordMeaningCurrentPosition}_Desc1`,
            )}
          {wordMeaningData?.example &&
            renderWordMeaningItem(
              wordMeaningData?.example?.value,
              wordMeaningData?.example?.voiceover,
              `wordMeaning_${qnaStore?.wordMeaningCurrentPosition}_Desc2`,
            )}
        </ScrollView>
        <View style={{flex:0.2}}>
          <View style={styles.buttonContainer}>
            <RoundedButton
              type={`${
                qnaStore?.wordMeaningCurrentPosition <= 0
                  ? 'disabledGray'
                  : 'elevatedBlue'
              }`}
              disabled={qnaStore?.wordMeaningCurrentPosition <= 0}
              text={prevText}
              textStyle={styles.footerButtonText}
              containerStyle={styles.footerButton}
              width={getWp(120)}
              height={getHp(45)}
              onPress={() => {
                if (qnaStore?.wordMeaningCurrentPosition > 0) {
                  uiStore.setLoader(true);
                  audioCleanup(false);
                  qnaStore.setWordMeaningCurrentPosition(
                    qnaStore?.wordMeaningCurrentPosition - 1,
                  );
                }
              }}
            />
            <RoundedButton
              type={`${
                qnaStore?.wordMeaningCurrentPosition ===
                qnaStore?.wordMeaningData.length - 1
                  ? 'disabledGray'
                  : 'elevatedBlue'
              }`}
              text={nextText}
              disabled={
                qnaStore?.wordMeaningCurrentPosition ===
                qnaStore?.wordMeaningData.length - 1
              }
              textStyle={styles.footerButtonText}
              containerStyle={styles.footerButton}
              width={getWp(120)}
              height={getHp(45)}
              onPress={() => {
                if (
                  qnaStore?.wordMeaningCurrentPosition <=
                  qnaStore.wordMeaningData.length - 1
                ) {
                  uiStore.setLoader(true);
                  audioCleanup(false);
                  qnaStore.setWordMeaningCurrentPosition(
                    qnaStore?.wordMeaningCurrentPosition + 1,
                  );
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  else return <View />;
};

WordMeaning.propTypes = {};

WordMeaning.defaultProps = {};

export default observer(WordMeaning);
