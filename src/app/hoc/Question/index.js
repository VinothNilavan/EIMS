import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import {
  MyAutoHeightWebView,
  MCQOption,
  SortListQuestion,
  OrderingQuestion,
  ClassificationCorrectAnswer,
  MatchListOptions,
} from '@components';
import { replaceInput, replaceInputWithAnswer, getHp } from '@utils';
import getHtmlTemplate from '@utils/getHtmlTemplate';
import { useStores } from '@mobx/hooks';
import { UseSound } from '@hooks';

const Question = props => {
  const {
    testID,
    question,
    style,
    showAns,
    userAnswer,
    optionContainerStyle,
    optionTextContainerStyle,
    optionTextStyle,
    webContentStyle,
    qresponse,
    onSoundBtnClicked,
  } = props;

  const { uiStore } = useStores();
  const [QuestionBody, set_QuestionBody] = useState();
  const checkEnableForNewHeight = ["TMP_dragAndDrop", "Enrichment_Modules"];
  let isNewHeightEnabled = false;
  const isRTL = uiStore.isRTL;
  const { audioCleanup } = UseSound();

  useEffect(() => {
    return () => {
      audioCleanup();
    }
  }, []);

  useEffect(() => {
    let userResponse;
    if (qresponse?.userAttemptData) {
      ({ userResponse } = qresponse.userAttemptData);
    }

    let questionText = '';
    if (showAns && userResponse && Object.keys(userResponse).length > 0) {
      questionText = replaceInputWithAnswer(qresponse);
    } else if (
      question?.questionBody !== null &&
      typeof question?.questionBody !== 'undefined'
    ) {
      questionText = replaceInput(qresponse);
    }

    for (let i of checkEnableForNewHeight) {
      isNewHeightEnabled = `${questionText}`.includes(i);
      if (isNewHeightEnabled) break;
    }
    if (question.template != 'Interactive' || Platform.isPad || DeviceInfo.isTablet()) {
      isNewHeightEnabled = false;
    }
    let questionBody = getHtmlTemplate(questionText, false, isRTL, null, false, false, isNewHeightEnabled);
    set_QuestionBody(questionBody);
  }, [])

  const renderOptions = () => {
    switch (question.template) {
      case 'MCQ':
        return question?.response?.mcqPattern?.choices.map((item, index) => {
          return (
            <MCQOption
              testID="MCQOptionQuestion"
              index={index}
              option={item?.value}
              key={index}
              showAns={showAns}
              userAnswer={userAnswer}
              answer={
                !qresponse?.data?.response?.mcqPattern?.hasOwnProperty('correctAnswer')
                  ? qresponse?.data?.responseValidation?.validResponse
                    ?.identifier[0]
                  : qresponse?.data?.response?.mcqPattern?.correctAnswer
              }
              containerStyle={optionContainerStyle}
              optionContainerStyle={optionTextContainerStyle}
              optionTextStyle={optionTextStyle}
              webContentStyle={webContentStyle}
              resultFlag={qresponse?.userAttemptData?.result}
              isRTL={isRTL}
            />
          );
        });
      case 'SortList':
        const sortListQuestion = [
          ...question.response.choices.map(itr => ({
            ...itr,
            isSelected: false,
          })),
        ];
        return sortListQuestion.map(item => {
          return (
            <SortListQuestion
              testID="SortListQuestionQuestion"
              key={item.identifier}
              item={item}
              index={item.index}
              arrangeTypeQuestionsAnswers={[]}
              callBackForAssignAnswer={() => { console.log('cal back assign'); }}
              dragType={false}
              dragAndDropCallback={() => { console.log('dragAndDropCallback'); }}
            />
          );
        });
      case 'Classification':
        return (
          <ClassificationCorrectAnswer response={question} reportPage={true} />
        )

      case 'Ordering':
        return question?.userAnswer?.Ordering?.userAnswer?.map((item, index) => {
          let idx = '';
          let choiceItem = question?.response?.choices?.filter((data, index1) => {
            if (data.identifier == item) {
              idx = index1;
              return data;
            }
          });
          return (
            <OrderingQuestion
              testID="OrderingQuestionQuestionItem"
              item={choiceItem[0]}
              index={idx}
              key="OrderingQuestionRender"
              dragType={false}
              containerStyle={styles.orderOptionContainer}
              onSoundBtnClicked={onSoundBtnClicked}
              dragAndDropCallback={() => { console.log('call back'); }}
            />
          )
        });
      case 'MatchList':
        return (
          <MatchListOptions
            testID="MatchListOptionsQuestion"
            response={question}
          />
        );
    }
  };

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={[styles.parentContainer, style]}>
      {QuestionBody && QuestionBody !== '' ? (
        <View style={styles.container} pointerEvents={'none'}>
          <MyAutoHeightWebView
            testID="MyAutoHeightWebViewQuestion"
            style={styles.webViewStyle}
            files={[]}
            customScript={''}
            customStyle={`
            `}
            onSizeUpdated={() => { console.log('size updated'); }}
            source={{
              html: QuestionBody,
            }}
            zoomable={true}
          />
        </View>
      ) : null}
      <View
        style={[
          styles.answerContainer,
          question.template == 'SortList' ? {
            marginTop: getHp(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignContent: 'center',
            display: 'flex'
          } : '',
        ]}>
        {renderOptions()}
      </View>
    </View>
  );
};

Question.propTypes = {
  testID: PropTypes.string,
  question: PropTypes.object,
  optionContainerStyle: PropTypes.any,
  optionTextContainerStyle: PropTypes.any,
  optionTextStyle: PropTypes.any,
  webContentStyle: PropTypes.any,
};

Question.defaultProps = {
  testID: 'Question',
  option: [],
  showAns: true,
};
export default Question;
