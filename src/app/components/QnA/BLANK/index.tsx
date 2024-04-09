/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { HintBox } from '@components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useStores } from '@mobx/hooks';
import { checkForAudio, audioHtmlTemplet } from '@utils';
import styles from './indexCss';
import getHtmlTemplate from '@utils/getHtmlTemplate';
import AutoHeightWebView from 'react-native-autoheight-webview';

import {
  View,
  ScrollView,
  Platform,
} from 'react-native';

const BLANK = props => {
  const [showHintBox, setShowHintBox] = useState(false);
  const [newHeight, setNewHeight] = useState(hp('1'));
  const { showHint, disableWebView, webref } = props;
  const [dataAvailable, set_dataAvailable] = useState(false);
  const [QuestionBody, set_QuestionBody] = useState([]);
  const [Question, set_Question] = useState([]);
  const checkEnableForNewHeight = ["TMP_dragAndDrop", "Enrichment_Modules"];
  let isNewHeightEnabled = false;

  const [trials, setTrials] = useState(-1);

  const { qnaStore, uiStore } = useStores();
  const isRTL = uiStore.isRTL;

  console.log('hint', showHint);

  useEffect(() => {
    let question = props.questionRes;

    let questionBody = '';
    try {
      questionBody = decodeURI(question.data[0].questionBody);
    } catch (err) {
      questionBody = question.data[0].questionBody;
    }
    let choices = question.data[0].response;
    for (let choice in choices) {
      if (choices.hasOwnProperty(choice)) {
        let size = 5;
        let type = 'email';
        let pattern = '[a-zA-Z]*';
        let isNumeric = false;
        try {
          if (
            choices[choice].hasOwnProperty('attributes') &&
            choices[choice].attributes.hasOwnProperty('size')
          ) {
            size = choices[choice].attributes.size;
            size = size > 20 ? 20 : size; //max size
            size = size < 5 ? 5 : size; //min size
          }
          if (
            choices[choice].hasOwnProperty('attributes') &&
            choices[choice].attributes.hasOwnProperty('numeric')
          ) {
            isNumeric = choices[choice].attributes.numeric;
          }
        } catch (err) { }
        if (isNumeric) {
          type = 'number';
          pattern = '[0-9]+';
        }
        let userResponse = '';
        let userResponses = props.userResponse;
        if (userResponses?.hasOwnProperty(choice)) {
          userResponse = userResponses[choice].hasOwnProperty('userAnswer')
            ? userResponses[choice].userAnswer
            : '';
        }
        questionBody = questionBody + `<br/>`;
        questionBody = questionBody.replace(
          '[' + choice + ']',
          `<input 
                type="${type}" 
                id="${choice}" 
                pattern="${pattern}"
                value="${userResponse}"
                autocomplete="nope"
                spellcheck="false"  
                autocorrect="off"
                autocapitalize="none" 
                size="${size}" 
                oninput="inputChangeFunction(this.id)" 
                style='width:${size}em;height:2em;border-radius:25px;border:1px solid #969696; padding:2px 8px;text-align:center;font-size:16px;'
              />`,
        );
      }
    }
    questionBody = checkForAudio(questionBody);
    for (let i of checkEnableForNewHeight) {
      isNewHeightEnabled = `${questionBody}`.includes(i);
      if (isNewHeightEnabled) break;
    }
    let instruction = questionBody?.instructorStimulus?.value ? questionBody?.instructorStimulus?.value : '';
    let audioDetails = audioHtmlTemplet(qnaStore.currentQuestion)
    questionBody = getHtmlTemplate(questionBody, false, isRTL, null, false, false, isNewHeightEnabled, false, instruction, audioDetails);
    set_QuestionBody(questionBody);
    set_Question(question);
    set_dataAvailable(true);
  }, [qnaStore?.contentData?.contentSeqNum]);

  useEffect(() => {
    setTrials(qnaStore.trialCount);
  }, [qnaStore.trialCount]);


  const hintToggle = showBox => {
    setShowHintBox(showBox);
  };

  if (disableWebView) {
    const run = `disableWebView();`;
    if (webref && webref.current) {
      webref.current.injectJavaScript(run);
    }
  }
  return (
    dataAvailable &&
    <View style={styles.container}>
      <ScrollView style={{}}>
        <View style={styles.innserContainer}>
          <AutoHeightWebView
            ref={webref}
            showsHorizontalScrollIndicator
            onMessage={props.onWebViewCallback}
            style={[styles.webViewContainer,
            { height: newHeight }]}
            onSizeUpdated={size => {
              console.log('NBLANK:' + size + ':' + hp('1'));
              setNewHeight(size.height);
            }}
            source={{ html: QuestionBody, baseUrl: '' }}
            startInLoadingState={true}
            androidLayerType={Platform.OS === 'ios' ? 'software' : 'hardware'}
            zoomable={false}
            bounces={false}
          />
          {Question.length > 0 &&
            <HintBox
              hintList={Question?.data[0].hints}
              toggleCallback={hintToggle}
              showBtn={showHint}
              showHints={showHintBox}
              showHide={!showHintBox}
              trials={trials}
            />}
        </View>
      </ScrollView>
    </View>
  );
};

BLANK.propTypes = {};

BLANK.defaultProps = {};

export default BLANK;
