import React, { useState, Fragment, useEffect } from 'react';
import { View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { DownGreyArrow, UpGreyArrow } from '@images';
import { useLanguage } from '@hooks';
import styles from './indexCss';
import {
  MyAutoHeightWebView,
  BalooThambiRegTextView,
  ClassificationCorrectAnswer,
  MatchListCorrectAnswer,
  OrderingCorrectAnswer,
  SortListCorrectAnswer,
  SoundButton
} from '@components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStores } from '@mobx/hooks';
import getHtmlTemplate from '@utils/getHtmlTemplate';
import explanationHtml from '../../SingleQuestionWebView/Qtypes/ExplanationHtml';

const Footer = props => {
  let [isCollapsed, setIsCollapssed] = useState(true);
  const {
    type,
    userAttemptData,
    explanation,
    qdata,
    response,
    howIDid,
    onSoundBtnClicked,
    singleWebview,
  } = props;
  const {
    viewExplanationLabel,
    yourAnswerLabel,
    correctAnswerText,
    hideExplanationLabel,
  } = useLanguage();
  const store = useStores();
  const [showYourAnswer, setShowYourAnswer] = useState(true);
  const [showCorrectAnswer, setshowCorrectAnswer] = useState(true);
  const [explanationBody, setExplanationBody] = useState(null);
  const isRTL = store?.uiStore?.isRTL;
  const char = 'A';

  const viewExplainationText = viewExplanationLabel;
  const yourAnswerText = yourAnswerLabel;
  const rightAnswerText = correctAnswerText;

  useEffect(() => {
    let showYourAnswer = true;
    let showCorrectAnswer = true;

    // For Challenge type question

    if (howIDid) {
      if (response.contentMode === 'Challenge') {
        // If Skipped
        if (Object.keys(userAttemptData?.userResponse).length === 0) {
          if (store.topicTrailsStore.topicDetails.totaltAttempts === 1) {
            showYourAnswer = false;
            showCorrectAnswer = false;
          } else if (store.topicTrailsStore.topicDetails.totaltAttempts > 1) {
            showYourAnswer = false;
            showCorrectAnswer = true;
          }
        } else {
          //If answered
          if (
            userAttemptData?.result == 'fail' &&
            store.topicTrailsStore.topicDetails.totaltAttempts === 1
          ) {
            showCorrectAnswer = false;
          } else {
            if (userAttemptData?.result == 'pass') {
              showYourAnswer = false;
              showCorrectAnswer = true;
            } else {
              showCorrectAnswer = true;
            }
          }
        }
      } else {
        if (userAttemptData?.result == 'pass') {
          showYourAnswer = false;
          showCorrectAnswer = true;
        } else {
          showYourAnswer = true;
          showCorrectAnswer = true;
        }
      }
      if ((!explanation) && ['MatchList', 'SortList', 'Classification', 'Ordering'].includes(type)) {
        showYourAnswer = false;
        showCorrectAnswer = false;
        setExplanationBody(" ");
      }
    }
    setShowYourAnswer(showYourAnswer);
    setshowCorrectAnswer(showCorrectAnswer);
  }, [howIDid]);


  useEffect(() => {
    let explanationBody = null;
    if (explanation) {
      if (singleWebview) {
        explanationBody = explanationHtml(explanation);
      } else {
        explanationBody = getHtmlTemplate(explanation, false, isRTL);
      }
    }
    setExplanationBody(explanationBody);
  }, [explanation])

  const getConcatenatedMcqOptions = (array) => {
    let your_ans = "";
    array.forEach((data, index) => {
      if (index != array.length - 1)
        your_ans = your_ans + String.fromCharCode(char.charCodeAt(0) + parseInt(data)) + ', ';
      else
        your_ans = your_ans + String.fromCharCode(char.charCodeAt(0) + parseInt(data));
    });
    return your_ans;
  };

  const getConcatenated = (array) => {
    let your_ans = [];
    array.forEach((data, index) => {
      your_ans[index] = String.fromCharCode(char.charCodeAt(0) + parseInt(data));
    });
    return your_ans;
  };

  const getYourMCQOptions = () => {
    if (userAttemptData?.userResponse?.mcqPattern?.userAnswer != null) {
      return Array.isArray(userAttemptData?.userResponse?.mcqPattern?.userAnswer) ?
        getConcatenatedMcqOptions(userAttemptData?.userResponse?.mcqPattern?.userAnswer) :
        String.fromCharCode(char.charCodeAt(0) + userAttemptData?.userResponse?.mcqPattern?.userAnswer);
    } else {
      return Array.isArray(userAttemptData?.userResponse?.userAnswer) ?
        getConcatenatedMcqOptions(userAttemptData?.userResponse?.userAnswer) :
        String.fromCharCode(char.charCodeAt(0) + userAttemptData?.userResponse?.userAnswer);
    }
  };

  const getCorrectMCQOption = () => {
    if (qdata?.mcqPattern?.correctAnswer != null) {
      return Array.isArray(qdata?.mcqPattern?.correctAnswer) ?
        getConcatenatedMcqOptions(qdata?.mcqPattern?.correctAnswer) :
        String.fromCharCode(char.charCodeAt(0) + qdata?.mcqPattern?.correctAnswer);
    } else {
      return Array.isArray(response?.data?.responseValidation?.validResponse?.identifier) ?
        getConcatenatedMcqOptions(response?.data?.responseValidation?.validResponse?.identifier) :
        String.fromCharCode(char.charCodeAt(0) + response?.data?.responseValidation?.validResponse?.identifier);
    }
  };


  const showAnswer = () => {
    if (type === 'MCQ' && userAttemptData?.result && Array.isArray(userAttemptData?.userResponse?.userAnswer)) {
      return (
        <View style={styles.generic.answerContainer}>
          {showYourAnswer && (
            <View style={styles.generic.answerSubContainer}>
              <BalooThambiRegTextView style={styles.generic.answerHeading}>
                {`${yourAnswerText}: `}
              </BalooThambiRegTextView>
              <View style={styles.generic.answers}>
                <BalooThambiRegTextView style={styles.generic.answerVal}>
                  {getYourMCQOptions()}
                </BalooThambiRegTextView>
              </View>
            </View>
          )}
          <BalooThambiRegTextView style={styles.generic.answers}>
            {userAttemptData?.result == 'pass'
              ? `${yourAnswerText} `
              : `${rightAnswerText}: `}
          </BalooThambiRegTextView>
          <View
            style={[
              styles.generic.optionContainer,
              userAttemptData?.result == 'pass'
                ? null
                : styles.generic.answerHeading,
            ]}>
            <BalooThambiRegTextView
              style={[
                styles.generic.option,
                userAttemptData?.result == 'pass'
                  ? null
                  : styles.generic.optionRight,
              ]}>
              {getCorrectMCQOption()}
            </BalooThambiRegTextView>
          </View>
        </View>
      );
    } else if (type === 'MCQ' && userAttemptData?.result) {
      return (
        <View style={styles.generic.answerContainer}>
          {showYourAnswer && (
            <View style={styles.generic.answerSubContainer}>
              <BalooThambiRegTextView style={styles.generic.answerHeading}>
                {yourAnswerText}
              </BalooThambiRegTextView>
              <View
                style={[
                  styles.generic.optionContainer,
                  userAttemptData?.result == 'pass'
                    ? null
                    : styles.generic.optionContainerWrong,
                ]}>
                <BalooThambiRegTextView
                  style={[
                    styles.generic.option,
                    userAttemptData?.result == 'pass'
                      ? null
                      : styles.generic.optionWrong,
                  ]}>
                  {getYourMCQOptions()}
                </BalooThambiRegTextView>
              </View>
            </View>
          )}

          {showCorrectAnswer && type != 'Interactive' &&
            <View style={styles.generic.answerSubContainer}>
              <BalooThambiRegTextView>
                {rightAnswerText}
              </BalooThambiRegTextView>
              <View
                style={[
                  styles.generic.optionContainer,
                  styles.generic.optionContainerRight,
                ]}>
                <BalooThambiRegTextView
                  style={[styles.generic.option, styles.generic.optionRight]}>
                  {getCorrectMCQOption()}
                </BalooThambiRegTextView>
              </View>
            </View>
          }
        </View>
      );
    } else if (qdata && qdata != null) {
      let correct_answers = null;
      switch (type) {
        case 'Blank':
          correct_answers = Object.keys(qdata).map(ans => {
            return qdata[ans]?.correctAnswers[0];
          });
          break;
        case 'Dropdown':
          correct_answers = Object.keys(qdata).map(ans => {
            return qdata[ans]?.choices[qdata[ans]?.correctAnswer]?.value;
          });
          break;
        case 'Blank_Dropdown':
          let template;
          correct_answers = Object.keys(qdata).map(ans => {
            template = qdata[ans].type;
            if (template == 'Blank') {
              return qdata[ans]?.correctAnswers[0];
            } else {
              return qdata[ans].choices[qdata[ans].correctAnswer].value;
            }
          });
          break;
        case 'SortList':
          correct_answers = Object.keys(
            response?.data?.responseValidation?.validResponse?.identifier,
          ).map(key => {
            let userAnswer =
              response?.data?.responseValidation?.validResponse?.identifier[
              key
              ][0];
            return String.fromCharCode(userAnswer + 65);
          });

          break;
        case 'MatchList':
          correct_answers = Object.keys(
            response?.data?.responseValidation?.validResponse?.identifier,
          ).map(key => {
            let userAnswer =
              response?.data?.responseValidation?.validResponse?.identifier[
              key
              ][0];
            return String.fromCharCode(userAnswer + 65);
          });
          break;
        case 'Ordering':
          if (userAttemptData?.userResponse?.Ordering?.userAnswer && Array.isArray(userAttemptData?.userResponse?.Ordering?.userAnswer)) {
            correct_answers = getConcatenated(userAttemptData?.userResponse?.Ordering?.userAnswer);
          } else {
            correct_answers = Object.keys(
              userAttemptData?.userResponse?.Ordering,
            ).map(key => {
              let userAnswer = userAttemptData?.userResponse?.Ordering[key][0];
              return String.fromCharCode(userAnswer + 65);
            });
          }
          break;
        case 'Classification':
          correct_answers = '';
          break;
        case 'Interactive':
          correct_answers = '';
          break;
        default:
          correct_answers = userAttemptData?.userResponse && Object.keys(userAttemptData?.userResponse).map(
            ans => {
              return userAttemptData?.userResponse[ans]?.userAnswer;
            },
          );
          break;
      }

      if (correct_answers) {
        return (
          <Fragment>
            {showCorrectAnswer && type != 'Interactive' && (
              <View style={styles.generic.answerContainer}>
                <BalooThambiRegTextView style={styles.generic.answers}>
                  {userAttemptData?.result == 'pass'
                    ? yourAnswerText
                    : rightAnswerText}
                  <BalooThambiRegTextView style={styles.generic.answerVal}>
                    {` : ${correct_answers.join(', ')}`}
                  </BalooThambiRegTextView>
                </BalooThambiRegTextView>
              </View>
            )}
          </Fragment>
        );
      }
    }
    return <View />;
  };

  const renderOptionItem = () => {
    switch (type) {
      case 'Classification':
        return <ClassificationCorrectAnswer response={response} />;
      case 'MatchList':
        return <MatchListCorrectAnswer response={response?.data} />;
      case 'Ordering':
        return (<OrderingCorrectAnswer response={response} onSoundBtnClicked={onSoundBtnClicked} />);
      case 'SortList':
        return <SortListCorrectAnswer response={response?.data} />;
    }
  };

  const getVoiceOverUrl = () => {
    let str = explanation
    let audioData = str.substring(str.lastIndexOf('<audio>'), str.lastIndexOf('</audio>'));
    if (audioData != '') {
      let src = /<audio.*?src='(.*?)'/.exec(audioData)[1];
      if (src.length >= 1) return src;
    }
    return '';
  };

  return (
    <View key="container" style={styles.generic.container}>
      <View key="innerContainer" style={styles.generic.innerContainer}>
        <View
          key="innerLeftContainer"
          style={{
            ...styles.generic.innerLeftContainer,
          }}>
          {explanationBody !== null && <TouchableOpacity
            style={styles.generic.row}
            transparent
            onPress={() => {
              setIsCollapssed(!isCollapsed);
            }}>
            {isCollapsed ? (
              <DownGreyArrow
                width={styles.generic.innerLeftSvgStyle.width}
                height={styles.generic.innerLeftSvgStyle.height}
                style={styles.generic.innerLeftSvg}
              />
            ) : (
              <UpGreyArrow
                width={styles.generic.innerLeftSvgStyle.width}
                height={styles.generic.innerLeftSvgStyle.height}
                style={styles.generic.innerLeftSvg}
              />
            )}
            <BalooThambiRegTextView styles={styles.generic.innerLeftText}>
              {isCollapsed ? viewExplainationText : hideExplanationLabel}
            </BalooThambiRegTextView>
          </TouchableOpacity>}
        </View>
        {howIDid && showAnswer()}
      </View>
      <View
        key="collapsibleContainer"
        style={styles.generic.collapsibleContainer}>
        <Collapsible collapsed={isCollapsed}>
          <View style={styles.generic.explanationView}>
            {isCollapsed == false && renderOptionItem()}
            {explanationBody !== null && (((explanationBody.indexOf('<audio>') > -1) ?
              (<SoundButton style={styles.generic.myAudio}
                onPress={() => onSoundBtnClicked('', '', getVoiceOverUrl())}
                isRTL={isRTL}
              />)
              :
              (<MyAutoHeightWebView
                source={{ html: explanationBody }}
                style={styles.generic.webViewStyle}
                files={[
                  {
                    href: 'contentService',
                    type: 'text/javascript',
                    rel: 'script',
                  },
                ]}
                customScript={''}
                customStyle={''}
                onSizeUpdated={size => { console.log(`size`) }}
                zoomable={true}
              />))
            )}
          </View>
        </Collapsible>
      </View>
    </View>
  );
};

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
