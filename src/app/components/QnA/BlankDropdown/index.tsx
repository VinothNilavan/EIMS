/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { HintBox, MyAutoHeightWebView, ChoiceList } from '@components';
import { useStores } from '@mobx/hooks';
import { checkForAudio, audioHtmlTemplet  } from '@utils';
import { useLanguage } from '@hooks';
import getHtmlTemplate from '@utils/getHtmlTemplate';
import styles from './indexCss';

const BlankDropdown = props => {
  const { showHint, onWebViewCallback, webref } = props;
  const { questionRes, hints, responses, userResponse, isReport } = props;
  const [showHintBox, setShowHintBox] = useState(false);
  const [listChoices, setListChoices] = useState(null);
  const [trials, setTrials] = useState(-1);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [btnId, setBtnId] = useState(null);
  const { qnaStore, uiStore } = useStores();
  const { selectText } = useLanguage();
  const [dataAvailable, setDataAvailable] = useState(false);
  const [questionBody, setQuestionBody] = useState([]);
  const [question, setQuestion] = useState([]);
  const isRTL = uiStore.isRTL;

  console.log('hint', showHint);
  useEffect(() => {
    console.log('Inside Blank dropdown ');
    setTrials(qnaStore.trialCount);
  }, [qnaStore.trialCount]);

  useEffect(() => {

    let questionBodyRes = '';

    try {
      questionBodyRes = decodeURI(questionRes);
    } catch (err) {
      questionBodyRes = questionRes;
    }

    let choices = responses;
    let fields = choices;
    let userAnswer = selectText;
    for (let field in fields) {
      if (fields.hasOwnProperty(field)) {
        let fieldArr = field.split('_');

        switch (fieldArr[0]) {
          case 'blank':
            let size = 10;
            let type = 'email';
            let pattern = '[*]*';
            let isNumeric = false;
            try {
              console.log('CHOICE:', choices[field]);
              if (
                choices[field].hasOwnProperty('attributes') &&
                choices[field].attributes.hasOwnProperty('size')
              ) {
                size = choices[field].attributes.size;
                size = size > 20 ? 20 : size; //max size
                size = size < 5 ? 5 : size; //min size
              }
              if (
                choices[field].hasOwnProperty('attributes') &&
                choices[field].attributes.hasOwnProperty('numeric')
              ) {
                isNumeric = choices[field].attributes.numeric;
              }
              if (isNumeric) {
                type = 'number';
                pattern = '[0-9]*';
              }
            } catch (err) {
              console.log('ERROR IN BlankDropdown:', err);
            }
            let userResponseNew = '';
            let userResponses = userResponse;
            if (userResponses?.hasOwnProperty(field)) {
              userResponseNew = userResponses[field].hasOwnProperty('userAnswer')
                ? userResponses[field].userAnswer
                : '';
            }
            console.log('CHOICE Size:', size);
            questionBodyRes = questionBodyRes.replace(
              '[' + field + ']',
              `<input 
                  type="${type}" 
                  pattern="${pattern}"
                  value="${userResponseNew}"
                  autocomplete="off"
                  spellcheck="false" 
                  size="${size}"
                  autocorrect="off"
                  id="${field}"
                  style='width:${size}em;height:2em;border-radius:25px;border:1px solid #969696; padding:2px 8px;text-align:center;font-size:16px'
                  oninput="inputChangeFunction(this.id)" 
               />`,
            );
            break;
          case 'dropdown':
            if (userResponses?.hasOwnProperty(field)) {
              userResponseNew = parseInt(userResponses[field].hasOwnProperty('userAnswer') ? userResponses[field].userAnswer : -1);
            }

            if (
              userResponseNew !== null &&
              userResponseNew !== undefined &&
              userResponseNew !== -1 &&
              choices[field] !== null &&
              choices[field] !== undefined &&
              choices[field].choices[userResponseNew] !== null &&
              choices[field].choices[userResponseNew] !== undefined
            ) {
              userAnswer = choices[field].choices[userResponseNew].value;
            }
            let ddButton = `<button type="button" id="${field}" class="dropdown_button" onclick="ddButtonClickHandler(this)">${userAnswer}<i class="arrow down"></i></button>`;
            questionBodyRes = questionBodyRes.replace('[' + field + ']', ddButton);
            break;
        }
      }
    }

    questionBodyRes = checkForAudio(questionBodyRes);
    let instruction = questionBody?.instructorStimulus?.value ? questionBody?.instructorStimulus?.value : '';
    let audioDetails = audioHtmlTemplet(qnaStore.currentQuestion)
  
    questionBodyRes = getHtmlTemplate(questionBodyRes, true, isRTL, null, false, false, false, isReport, instruction, audioDetails);
    setQuestionBody(questionBodyRes);
    setQuestion(questionBodyRes);
    setDataAvailable(true);
  }, []);

  const ddBtnWebViewMsgHandler = event => {
    console.log(event.nativeEvent.data);

    let msgData = JSON.parse(event.nativeEvent.data);
    console.log(msgData.type);
    if (msgData && msgData.type == 'select') {
      setBtnId(msgData.id);
      setListChoices(() => {
        let ddChoices = responses[msgData.id];
        console.log('MAPPER:::::::::::::::' + ddChoices['mapper']);
        let tmpChoices = [];
        let mapper1 = ddChoices?.mapper;
        let localChoices = ddChoices?.choices;
        if (mapper1) {
          mapper1.forEach((val, index) => {
            tmpChoices.push({ id: val, value: localChoices[val].value });
          });
        }
        return tmpChoices;
      });
      setShowChoiceModal(true);
    } else if (msgData && msgData.type == 'ContentService') {
      onWebViewCallback(event);
    }
  };

  const selectChoiceHandler = choiceItem => {
    setShowChoiceModal(false);
    console.log(`Selected choice item`);
    console.log(choiceItem);
    const run = `
ddChoiceSelectHandler("${btnId}","${choiceItem.value}");
  `;

    if (webref?.current) {
      webref.current.injectJavaScript(run);
    }

    props.setInputResponse(btnId, choiceItem.id);

    const updateHeightScript = `
    updateWebviewHeight();
      `;

    if (webref?.current) {
      webref.current.injectJavaScript(updateHeightScript);
    }
  };

  if (props.disableWebView) {
    const run = `
disableWebView();
  `;
    if (webref?.current) {
      webref.current.injectJavaScript(run);
    }
  }

  const onBackdropHandler = () => {
    setShowChoiceModal(false);
  };

  const hintToggle = showBox => {
    setShowHintBox(showBox);
  };

  return (
    dataAvailable && <View style={styles.container} pointerEvents={isReport ? 'none' : 'auto'}>
      <KeyboardAvoidingView enabled={true}>
        <MyAutoHeightWebView
          ref={webref}
          onMessage={event => {
            let webViewData = JSON.parse(event.nativeEvent.data);
            if (
              webViewData.hasOwnProperty('type') &&
              webViewData.type === 'select'
            ) {
              ddBtnWebViewMsgHandler(event);
            } else {
              !isReport && props.onWebViewCallback(event);
            }
          }}
          style={styles.webViewContainer}
          onSizeUpdated={size => {
            console.log(size.height);
          }}
          source={{ html: questionBody }}
          zoomable={false}
          bounces={false}
          androidLayerType={Platform.OS === 'ios' ? 'software' : 'hardware'}
        />
        {question.length > 0 &&
          <HintBox
            hintList={hints}
            toggleCallback={hintToggle}
            showBtn={showHint}
            showHints={showHintBox}
            showHide={!showHintBox}
            trials={trials}
          />}
        {listChoices && (
          <ChoiceList
            choices={listChoices}
            show={showChoiceModal}
            selectChoiceHandler={selectChoiceHandler}
            onBackdropHandler={onBackdropHandler}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

BlankDropdown.propTypes = {};

BlankDropdown.defaultProps = {};

export default BlankDropdown;
