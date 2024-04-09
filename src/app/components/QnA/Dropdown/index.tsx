/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { HintBox, MyAutoHeightWebView, ChoiceList } from '@components';
import { useStores } from '@mobx/hooks';
import { checkForAudio, audioHtmlTemplet } from '@utils';
import { useLanguage } from '@hooks';
import styleSheet from './indexCss';
import getHtmlTemplate from '@utils/getHtmlTemplate';

const Dropdown = props => {
  const styles = styleSheet();
  const {
    showHint,
    setInputResponse,
    disableWebView,
    webref,
    onWebViewCallback,
    isReport
  } = props;
  const [showHintBox, setShowHintBox] = useState(false);
  const [listChoices, setListChoices] = useState(null);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [trials, setTrials] = useState(-1);
  const [btnId, setBtnId] = useState(null);
  const { selectText } = useLanguage();

  let question = props.questionRes;
  let responses = props.responses;
  let userAttemptResponse = props.userAttemptResponse;
  let hintsList = props.hintsList;

  const { qnaStore, uiStore } = useStores();
  const isRTL = uiStore.isRTL;

  useEffect(() => {
    console.log('Inside dropdown button ');
    setTrials(qnaStore.trialCount);
  }, [qnaStore.trialCount]);

  let questionBody = '';

  if (question && question.length > 0) {
    question = question.replace('Dropdown', 'dropdown');
  }
  try {
    questionBody = decodeURI(question);
  } catch (err) {
    questionBody = question;
  }
  questionBody = questionBody.replace('\n', '').replace('\r', '');
  let choices = responses;

  let fields = choices;
  let ddButton;
  for (let field in fields) {
    let userResponses = userAttemptResponse;

    let userAnswer = selectText;

    if (userResponses?.hasOwnProperty(field)) {
      let userResponse = parseInt(userResponses[field].hasOwnProperty('userAnswer') ? userResponses[field].userAnswer : -1);
      if (
        userResponse !== null &&
        userResponse !== undefined &&
        userResponse !== -1 &&
        choices[field] !== null &&
        choices[field] !== undefined &&
        choices[field].choices[userResponse] !== null &&
        choices[field].choices[userResponse] !== undefined
      ) {
        userAnswer = choices[field].choices[userResponse].value;
      }
    }

    if (fields.hasOwnProperty(field)) {
      let fieldArr = field.split('_');
      if (fieldArr[0] === 'dropdown') {
        ddButton = `<button type="button" id="${field}" class="dropdown_button" onclick="ddButtonClickHandler(this)">${userAnswer}<i class="arrow down"></i></button>`;
        questionBody = questionBody.replace('[' + field + ']', ddButton);
      }
    }
  }

  const hintToggle = showBox => {
    setShowHintBox(showBox);
  };

  questionBody = checkForAudio(questionBody);
  questionBody += '';
  let instruction = questionBody?.instructorStimulus?.value ? questionBody?.instructorStimulus?.value : '';
  let audioDetails = audioHtmlTemplet(qnaStore.currentQuestion)

  questionBody = getHtmlTemplate(questionBody, true, isRTL, null, false, false, false, isReport, instruction, audioDetails);

  const ddBtnWebViewMsgHandler = event => {
    console.log(event.nativeEvent.data);

    let msgData = JSON.parse(event.nativeEvent.data);
    console.log(msgData.type);
    if (msgData && msgData.type == 'select') {
      console.log(`dropdown response>>>>choices`);
      console.log(fields[msgData.id].choices);
      setBtnId(msgData.id);
      setListChoices(() => {
        let ddChoices = responses[msgData.id];
        console.log('MAPPER:::::::::::::::' + ddChoices['mapper']);
        let tmpChoices = [];
        let mapper1 = ddChoices?.mapper;
        let localChoices = ddChoices?.choices;
        if (mapper1) {
          mapper1.forEach((val, index) => { tmpChoices.push({ id: val, value: localChoices[val].value }); });
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
    console.log('drop_down choiceitem-', choiceItem);
    const run = `
    ddChoiceSelectHandler("${btnId}","${choiceItem.value}");
      `;
    if (webref?.current) {
      webref.current.injectJavaScript(run);
    }
    setInputResponse(btnId, choiceItem.id);

    const updateHeightScript = `
    updateWebviewHeight();
      `;

    if (webref?.current) {
      webref.current.injectJavaScript(updateHeightScript);
    }
  };

  if (disableWebView) {
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

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer} pointerEvents={isReport ? 'none' : 'auto'} >
        <KeyboardAvoidingView behavior="padding" enabled={true}>
          <MyAutoHeightWebView
            ref={webref}
            onMessage={ddBtnWebViewMsgHandler}
            style={styles.webViewContainer}
            customScript={''}
            onSizeUpdated={size => {
              console.log(size.height);
            }}
            source={{ html: questionBody }}
            startInLoadingState={true}
            zoomable={false}
          />
          <HintBox
            hintList={hintsList}
            toggleCallback={hintToggle}
            showBtn={showHint}
            showHints={showHintBox}
            showHide={!showHintBox}
            trials={trials}
          />
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
    </View >
  );
};

Dropdown.propTypes = {};

Dropdown.defaultProps = {};
export default Dropdown;
