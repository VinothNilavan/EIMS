/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { API } from '@api';
import { useStores } from '@mobx/hooks';
import { ApiEndPoint, COLORS } from '@constants';
import styles from './style';
import { RoundedButton, Passage, SVGImageBackground } from '@components';
import { observer } from 'mobx-react';
import { ErrorClose, Back } from '@images';
import { QnAScreen } from '@hoc';
import { getWp, getHp } from '@utils';
import { runInAction } from 'mobx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useQnA, useLanguage } from '@hooks';

const SearchQuestionScreen = props => {
  const [qcode, setQCode] = useState('24574');
  const [langCode, setLangCode] = useState('gu');
  const [pid, setPID] = useState('MSGu');
  const [skipQuestion] = useState(false);

  const store = useStores();
  const { qnaStore, uiStore } = useStores();

  const {
    submitFunction,
    setEnableScroll,
    enableScroll,
    renderCSHtmlView,
    scrollViewRef,
    parentScrollRef,
    renderQuestionsItem,
    renderExplanation,
    reset,
    initializeAudioSection,
    audioCleanup,
    showQuesVO,
    showInsStVO,
    playSound,
    qBodyVoiceOver,
  } = useQnA('SEARCH');

  const { submitText } = useLanguage();

  const isRTL = uiStore.isRTL;

  useEffect(() => {
    reset();
    return () => {
      audioCleanup();
    };
  }, []);

  const search = async () => {
    const reqBody = {
      store: store,
      body: {
        context: langCode,
        pid: pid,
        qCode: qcode,
      },
    };

    try {
      const response = await API(
        ApiEndPoint.NAANDI_PREVIEW_CONTENT_V3,
        reqBody,
      );
      if (response.data.resultCode === 'C001') {
        reset();
        qnaStore.initSearchData(response.data);
        if (
          qnaStore.currentQuestion.template === 'SortList' ||
          qnaStore.currentQuestion.template === 'MatchList'
        ) {
          // setEnableScroll(false);
        } else {
          setEnableScroll(true);
        }
        await audioCleanup();
        initializeAudioSection(response?.data?.data[0]);
      } else {
        console.log('API ERROR');
      }
    } catch (e) {
      console.log(`Search API  API error>>>${e}`);
    }
  };

  const renderButtonView = () => {
    console.log(`Button view rendering>>>>>>>>>`);
    console.log(`Submit btn visible>>>>>${qnaStore.isSubmitBtnVisible}`);
    return (
      <View
        accessible={true}
        testID="SearchQuestionRenderButtonView"
        accessibilityLabel="SearchQuestionRenderButtonView"
        style={
          isRTL ? styles.RTLFooterButtonContainer : styles.footerButtonContainer
        }>
        {qnaStore.isReadPassageBtnVisible && (
          <RoundedButton
            testID="RoundedButtonSearchQuestionIsReadPassageBtnVisible"
            type="elevatedOrange"
            text={'READ PASSAGE'}
            textStyle={styles.footerButtonText}
            containerStyle={styles.footerButton}
            width={wp('50')}
            height={Platform.OS === 'ios' ? hp('5') : hp('6')}
            onPress={() => {
              runInAction(() => {
                qnaStore.isReadPassageBtnVisible = false;
                qnaStore.isViewQuestionBtnVisible = true;
              });
            }}
          />
        )}
        {qnaStore.isViewQuestionBtnVisible && (
          <RoundedButton
            testID="RoundedButtonSearchQuestionIsViewQuestionBtnVisible"
            type="elevatedOrange"
            text={'View Question'}
            textStyle={styles.footerButtonText}
            containerStyle={styles.footerButton}
            width={wp('50')}
            height={Platform.OS === 'ios' ? hp('5') : hp('6')}
            onPress={() => {
              runInAction(() => {
                qnaStore.isReadPassageBtnVisible = true;
                qnaStore.isViewQuestionBtnVisible = false;
              });
            }}
          />
        )}
        {qnaStore.isSubmitBtnVisible && (
          <RoundedButton
            testID="RoundedButtonSearchQuestionIsSubmitBtnVisible"
            type="elevatedOrange"
            text={submitText}
            textStyle={styles.buttonTextstyle}
            containerStyle={styles.roundButtonContainerStyle}
            width={getWp(150)}
            height={getHp(50)}
            onPress={() => {
              qnaStore.setLoader(true);
              store.uiStore.setIsClicked(true);
              submitFunction();
            }}
          />
        )}
      </View>
    );
  };

  const renderPassageView = () => {
    return (
      <Passage
        testID="PassageSearchQuestion"
        passageTree={qnaStore.passageData}
        audioCleanup={audioCleanup}
      />
    );
  };

  const renderSearchFields = () => {
    return (
      <View style={styles.headerContainer}>
        <SVGImageBackground
          testID="SVGImageBackgroundSearchQuestionHeader"
          SvgImage="bgHeader"
          themeBased>
          <View
            accessible={true}
            testID="SearchQuestionSearchFieldContainer"
            accessibilityLabel="SearchQuestionSearchFieldContainer"
            style={
              isRTL
                ? styles.RTLSearchFieldContainer
                : styles.searchFieldContainer
            }>
            <View style={isRTL ? styles.RTLContainer : styles.container}>
              <TextInput
                accessible={true}
                testID="SearchQuestionQCode"
                accessibilityLabel="SearchQCode"
                style={styles.input}
                placeholder={' QCode '}
                value={qcode}
                keyboardType="numeric"
                placeholderTextColor={COLORS.infoMessageGray}
                onChangeText={text => {
                  setQCode(text);
                }}
              />
              {qcode !== '' && (
                <TouchableOpacity
                  accessible={true}
                  testID="SearchQuestionSetQCode"
                  accessibilityLabel="SearchSetQCode"
                  onPress={() => {
                    setQCode('');
                    reset();
                  }}>
                  <ErrorClose width={getWp(24)} height={getHp(24)} />
                </TouchableOpacity>
              )}
            </View>
            <View style={isRTL ? styles.RTLContainer : styles.container}>
              <TextInput
                accessible={true}
                testID="SearchQuestionLanguage"
                accessibilityLabel="SearchQuestionLanguage"
                style={styles.input}
                placeholder={'Language'}
                value={langCode}
                autoCapitalize={false}
                placeholderTextColor={COLORS.infoMessageGray}
                onChangeText={text => {
                  setLangCode(text);
                }}
              />
              {langCode !== '' && (
                <TouchableOpacity
                  accessible={true}
                  testID="SearchQuestionSetLanguageCode"
                  accessibilityLabel="SearchQuestionSetLanguageCode"
                  onPress={() => {
                    setLangCode('');
                    reset();
                  }}>
                  <ErrorClose width={getWp(24)} height={getHp(24)} />
                </TouchableOpacity>
              )}
            </View>
            <View style={isRTL ? styles.RTLContainer : styles.container}>
              <TextInput
                accessible={true}
                testID="SearchQuestionPID"
                accessibilityLabel="SearchQuestionPID"
                style={styles.input}
                placeholder={'PID'}
                value={pid}
                autoCapitalize={false}
                placeholderTextColor={COLORS.infoMessageGray}
                onChangeText={text => {
                  setPID(text);
                }}
              />
              {pid !== '' && (
                <TouchableOpacity
                  accessible={true}
                  testID="SearchQuestionSetPID"
                  accessibilityLabel="SearchQuestionSetPID"
                  onPress={() => {
                    setPID('');
                    reset();
                  }}>
                  <ErrorClose width={getWp(24)} height={getHp(24)} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={
              isRTL
                ? styles.RTLHeaderButtonContainer
                : styles.headerButtonContainer
            }>
            <Back
              accessible={true}
              testID="SearchQuestionBackImage"
              accessibilityLabel="SearchQuestionBackImage"
              onPress={async () => {
                audioCleanup();

                setTimeout(() => {
                  props.navigation.goBack();
                }, 1000);
              }}
              width={getWp(56)}
              height={getHp(52)}
            />
            {qcode !== '' && langCode !== '' && pid !== '' && (
              <RoundedButton
                testID="RoundedButtonSearchQuestionSearchBtn"
                type="squareOrange"
                text="Search"
                textStyle={styles.buttonTextstyle}
                containerStyle={styles.roundButtonContainerStyle}
                width={getWp(150)}
                height={getHp(50)}
                onPress={() => {
                  audioCleanup();
                  search();
                }}
              />
            )}
          </View>
        </SVGImageBackground>
      </View>
    );
  };

  return (
    <QnAScreen
      testID="QnAScreenSearchQuestion"
      qnaStore={qnaStore}
      renderPassageView={renderPassageView}
      renderBottomButtons={renderButtonView}
      renderSearchFields={renderSearchFields}
      searchQScreen={true}
      parentScrollRef={parentScrollRef}
      enableScroll={enableScroll}
      skipQuestion={skipQuestion}
      scrollViewRef={scrollViewRef}
      renderQuestionsItem={renderQuestionsItem}
      renderExplanation={renderExplanation}
      renderCSHtmlView={renderCSHtmlView}
      showQuesVO={showQuesVO}
      showInsStVO={showInsStVO}
      playSound={playSound}
      qBodyVoiceOver={qBodyVoiceOver}
    />
  );
};
export default observer(SearchQuestionScreen);
