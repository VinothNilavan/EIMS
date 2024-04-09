import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  PanResponder,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { checkForAudio } from '@utils';
import { MyAutoHeightWebView, HintBox } from '@components';
import styles from './indexCss';
import { useStores } from '@mobx/hooks';
import { getQuestionItemHtmlTemplate } from '@hoc';
import { QTypes } from '../../../helpers';

const InteractiveN = props => {
  const { interactiveRef, showHint, disableWebView } = props;
  const [showHintBox, setShowHintBox] = useState(false);
  const [interactiveQuestionBody, setInteractiveQuestionBody] = useState();
  const [questionHint, setquestionHint] = useState();
  const [disableTouchWebView, setDisableTouchWebView] = useState(false)
  const { qnaStore, uiStore } = useStores();
  const [trials, setTrials] = useState(-1);
  const isRTL = uiStore.isRTL;

  useEffect(() => {
    setTrials(qnaStore.trialCount);
  }, [qnaStore.trialCount]);

  useEffect(() => {
    let question = props.questionRes;
    let questionBody = '';

    try {
      setquestionHint(question.data[0].hints);
      questionBody = decodeURI(question.data[0].questionBody);
    } catch (err) {
      questionBody = question.data[0].questionBody;
    }
    questionBody = checkForAudio(questionBody);
    if (disableWebView) {
      setDisableTouchWebView(true)
    }
    let bodyNew = getQuestionItemHtmlTemplate(QTypes.Interactive, question.data[0], 0, isRTL)
    setInteractiveQuestionBody(bodyNew);
  }, [props.questionRes]);

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => Platform.OS === 'ios' ? false : true,    //( Made this for some interactive question Qcode : 56486)
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        return true;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  const hintToggle = showBox => {
    setShowHintBox(showBox);
  };

  return (
    interactiveQuestionBody && <View
      style={styles.container}
      pointerEvents={disableWebView ? 'none' : 'auto'}>
      <KeyboardAvoidingView enabled={true}>
        <ScrollView>
          <MyAutoHeightWebView
            {...panResponder.panHandlers}
            onMessage={props.onWebViewCallback}
            source={{
              html: interactiveQuestionBody
            }}
            style={styles.webViewContainer}
            ref={interactiveRef}
            onStartShouldSetResponder={() => false}
            zoomable={false}
            showsHorizontalScrollIndicator={true}
            noAutoPlay={false}
          />
          <HintBox
            hintList={questionHint}
            toggleCallback={hintToggle}
            showBtn={showHint}
            showHints={showHintBox}
            showHide={!showHintBox}
            trials={trials}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

InteractiveN.propTypes = {};

InteractiveN.defaultProps = {};

export default InteractiveN;
