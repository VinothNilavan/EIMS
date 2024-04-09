// External Imports
import React, { useState, Fragment, useEffect } from 'react';
import { View, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { useLanguage } from '@hooks';
import { decodeEntity } from 'html-entities';
import { useStores } from '@mobx/hooks';

// Internal Imports
import { DownGreyArrow, UpGreyArrow } from '@images';
import styles from './style';
import { MyAutoHeightWebView, BalooThambiRegTextView } from '@components';
import { getHp } from '@utils';
import getHtmlTemplate from '@utils/getHtmlTemplate';
import { STRINGS } from '../../../../constants/STRINGS';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Footer = props => {
  const {
    testID,
    type,
    explanation,
    howIDid,
    response,
    enableExplaination,
  } = props;
  const [isCollapsed, setIsCollapssed] = useState(true);
  const [height, setHeight] = useState(hp('1'));
  const {
    viewExplanationLabel,
    hideExplanationLabel,
    yourAnswerLabel,
    correctAnswerText,
    uploadedSolutionLabel,
    answerExplantaionLabel,
    skippedLabel,
  } = useLanguage();
  const { uiStore } = useStores();
  const isRTL = uiStore.isRTL;
  const [showYourAnswer, setShowYourAnswer] = useState(true);
  const [showCorrectAnswer, setshowCorrectAnswer] = useState(true);
  const [explanationBody, setExplanationBody] = useState();
  const [userExplaination, setUserExplaination] = useState('')
  const [uploadedFile, setUploadedFile] = useState('')

  const questionData = response?.data;
  const userAttemptData = response?.userAttemptData;
  const isCorrect =
    questionData?.userResult && questionData?.userResult === 'pass';
  const char = 'A';
  const viewExplainationText = viewExplanationLabel;
  const hideExplainationText = hideExplanationLabel;

  const yourAnswerText = yourAnswerLabel;

  const rightAnswerText = correctAnswerText;

  useEffect(() => {
    let explanationBody = getHtmlTemplate(explanation, false, isRTL);
    setExplanationBody(explanationBody);
  }, [explanation]);

  useEffect(() => {
    let uploadedFile = '';
    let uploadedFileDetails =
      userAttemptData?.userResponse &&
      userAttemptData?.userResponse?.uploads &&
      userAttemptData?.userResponse?.uploads.length > 0 &&
      userAttemptData?.userResponse?.uploads[0];

    if (uploadedFileDetails?.hasOwnProperty('uri')) {
      uploadedFile = uploadedFileDetails?.uri;
    } else if (uploadedFileDetails?.hasOwnProperty('filePath')) {
      uploadedFile = uploadedFileDetails?.filePath;
    }

    if (uploadedFile === STRINGS.dummyImgUrl) {
      uploadedFile = '';
    }


    let userExplaination =
      userAttemptData?.userResponse &&
      userAttemptData?.userResponse?.textInteraction &&
      userAttemptData?.userResponse?.textInteraction?.userAnswer;
    if (
      userExplaination !== null &&
      typeof userExplaination !== 'undefined' &&
      userExplaination !== ''
    ) {
      userExplaination = getHtmlTemplate(userExplaination, false, isRTL);
    }
    setUserExplaination(userExplaination)
    setUploadedFile(uploadedFile);
  }, [userAttemptData]);

  const showAnswer = () => {
    if (type === 'MCQ') {
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
                  isCorrect ? null : styles.generic.optionContainerWrong,
                ]}>
                <BalooThambiRegTextView
                  style={[
                    styles.generic.option,
                    isCorrect ? null : styles.generic.optionWrong,
                  ]}>
                  {response?.data?.userResult === 'skip' ?
                    skippedLabel :
                    String.fromCharCode(
                      char.charCodeAt(0) +
                      userAttemptData?.userResponse?.mcqPattern?.userAnswer,
                    )}
                </BalooThambiRegTextView>
              </View>
            </View>
          )}
          {showCorrectAnswer && (
            <View
              style={[
                styles.generic.answerSubContainer,
                { marginTop: getHp(5) },
              ]}>
              <BalooThambiRegTextView style={styles.generic.answerHeading}>
                {userAttemptData.result == 'pass'
                  ? yourAnswerText
                  : rightAnswerText}
              </BalooThambiRegTextView>
              <View
                style={[
                  styles.generic.optionContainer,
                  styles.generic.optionContainerRight,
                ]}>
                <BalooThambiRegTextView
                  style={[styles.generic.option, styles.generic.optionRight]}>
                  {String.fromCharCode(
                    char.charCodeAt(0) +
                    questionData?.response?.mcqPattern?.correctAnswer,
                  )}
                </BalooThambiRegTextView>
              </View>
            </View>
          )}
        </View>
      );
    } else if (questionData?.response != null) {
      let correct_answers = null;
      switch (type) {
        case 'Blank':
          correct_answers = Object.keys(questionData?.response).map(ans => {
            return questionData?.response[ans]?.correctAnswers.join(', ');
          });
          break;
        case 'Dropdown':
          correct_answers = Object.keys(questionData?.response).map(ans => {
            const correctAnswer =
              questionData?.response[ans].choices[
              questionData?.response[ans].correctAnswer
              ];
            if (correctAnswer?.hasOwnProperty('value'))
              return correctAnswer?.value;
            else return correctAnswer;
          });
          break;
        case 'Blank_Dropdown':
          let template;
          correct_answers = Object.keys(questionData?.response).map(ans => {
            template = questionData?.response[ans].type;
            if (template == 'Blank') {
              return questionData?.response[ans]?.correctAnswers.join(', ');
            } else {
              return questionData?.response[ans].choices[
                questionData?.response[ans].correctAnswer
              ]?.value;
            }
          });
          break;
        default:
          break;
      }

      if (correct_answers) {
        return (
          <Fragment>
            {showCorrectAnswer && (
              <View style={styles.generic.answerContainer}>
                <BalooThambiRegTextView style={styles.generic.answers}>
                  {userAttemptData.result == 'pass'
                    ? yourAnswerText
                    : rightAnswerText}{`: ${decodeEntity(correct_answers.join(', '))}`}
                </BalooThambiRegTextView>
              </View>
            )}
          </Fragment>
        );
      }
    }

    return <View />;
  };

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={styles.generic.container}>
      <View key="innerContainer" style={styles.generic.innerContainer}>
        <View
          key="innerLeftContainer"
          style={{
            ...styles.generic.innerLeftContainer,
          }}>
          {enableExplaination && (
            <TouchableOpacity
              style={styles.generic.row}
              transparent
              onPress={() => {
                setIsCollapssed(!isCollapsed);
              }}>
              {isCollapsed ? (
                <DownGreyArrow
                  accessible={true}
                  testID="FooterDownGreyArrow"
                  accessibilityLabel="FooterDownGreyArrow"
                  width={styles.generic.innerLeftSvgStyle.width}
                  height={styles.generic.innerLeftSvgStyle.height}
                  style={styles.generic.innerLeftSvg}
                />
              ) : (
                <UpGreyArrow
                  accessible={true}
                  testID="FooterUpGreyArrow"
                  accessibilityLabel="FooterUpGreyArrow"
                  width={styles.generic.innerLeftSvgStyle.width}
                  height={styles.generic.innerLeftSvgStyle.height}
                  style={styles.generic.innerLeftSvg}
                />
              )}
              <BalooThambiRegTextView
                testID="FooterExplanation"
                styles={styles.generic.innerLeftText}>
                {isCollapsed ? viewExplainationText : hideExplainationText}
              </BalooThambiRegTextView>
            </TouchableOpacity>
          )}
        </View>
        {howIDid && showAnswer()}
      </View>
      <View
        key="collapsibleContainer"
        style={styles.generic.collapsibleContainer}>
        <Collapsible collapsed={isCollapsed}>
          <View style={styles.generic.explainationContainer} pointerEvents="none">
            {userExplaination && userExplaination !== '' ? (
              <View>
                <BalooThambiRegTextView
                  testID="FooterYourAnswerLabel"
                  styles={styles.generic.explainationTitle}>
                  {yourAnswerLabel}
                </BalooThambiRegTextView>
                <View style={{ height: height }}>
                  <MyAutoHeightWebView
                    testID="MyAutoHeightWebViewFooterUserExplanation"
                    source={{ html: userExplaination }}
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
                    onSizeUpdated={size => {
                      setHeight(size.height + hp('8'));
                    }}
                    zoomable={false}
                  />
                </View>
              </View>
            ) : (
              <View />
            )}
            {uploadedFile && uploadedFile !== '' ? (
              <View>
                <BalooThambiRegTextView
                  testID="FooterUploadedSolutionLabel"
                  styles={styles.generic.explainationTitle}>
                  {uploadedSolutionLabel}
                </BalooThambiRegTextView>
                <Image
                  accessible={true}
                  testID="FooterImage"
                  accessibilityLabel="FooterImage"
                  style={styles.generic.explainationImageContainer}
                  source={{ uri: uploadedFile }}
                  resizeMode="stretch"
                />
              </View>
            ) : (
              <View />
            )}
            <BalooThambiRegTextView
              testID="FooterAnswerExplantaionLabel"
              styles={styles.generic.explainationTitle}>
              {answerExplantaionLabel}
            </BalooThambiRegTextView>
            {explanationBody && <MyAutoHeightWebView
              testID="MyAutoHeightWebViewFooterExplanationBody"
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
              onSizeUpdated={size => {
                console.log('height :', size.height);
              }}
              zoomable={true}
            />}
          </View>
        </Collapsible>
      </View>
    </View>
  );
};

Footer.propTypes = {
  testID: PropTypes.string,
  enableExplaination: PropTypes.bool,
};

Footer.defaultProps = {
  testID: 'Footer',
  enableExplaination: false,
};

export default Footer;
