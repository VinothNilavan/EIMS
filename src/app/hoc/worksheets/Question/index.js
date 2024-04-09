import React from 'react';
import {View} from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';
import {
  QHtmlTemplateForIframe,
  MyAutoHeightWebView,
  NaandiMCQOption,
  SortListQuestion,
  ClassificationQuestion,
  OrderingQuestion,
  MatchQuestion,
  MatchAnswer,
  MatchListCorrectAnswer,
  MatchListOptions,
} from '@components';
import {replaceInput, replaceInputWithAnswer} from '@utils';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useStores} from '@mobx/hooks';

const Question = props => {
  const {
    response,
    style,
    showAns,
    userAnswer,
    optionContainerStyle,
    optionTextContainerStyle,
    optionTextStyle,
    webContentStyle,
    qresponse,
    resultFlag,
  } = props;
  const question = response.data;
  const store = useStores();
  let questionBody = '';
  if (question?.questionBody && question?.questionBody !== '') {
    questionBody = QHtmlTemplateForIframe(
      showAns
        ? replaceInputWithAnswer(response)
        : replaceInput(question.questionBody),
        false,
      wp('75%'),
      store,
    );
  }

  // console.log(`Explanation Q body>>>>${questionBody}`);

  const renderOptions = () => {
    switch (question.template) {
      case 'MCQ':
        return question?.response?.mcqPattern?.choices?.map((item, index) => {
          return (
            <NaandiMCQOption
              index={index}
              option={item.value}
              key={index}
              showAns={showAns}
              resultFlag={resultFlag}
              userAnswer={userAnswer}
              answer={question?.response?.mcqPattern?.correctAnswer}
              containerStyle={optionContainerStyle}
              optionContainerStyle={optionTextContainerStyle}
              optionTextStyle={optionTextStyle}
              webContentStyle={webContentStyle}
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
              key={item.identifier}
              item={item}
              arrangeTypeQuestionsAnswers={[]}
              callBackForAssignAnswer={() => {console.log(`SortListQuestion call back`)}}
              dragType={false}
              dragAndDropCallback={() => {console.log(`SortListQuestion`)}}
            />
          );
        });
      case 'Classification':
        const classificationContainer = [
          ...question.response.choices.map(itr => ({
            ...itr,
            isSelected: false,
          })),
        ];
        return classificationContainer.map(item => {
          return (
            <ClassificationQuestion
              dragToContainer1={() => {console.log(`container 1 drag`)}}
              dragToContainer2={() => {console.log(`container 2 drag`)}}
              item={item}
              dragType={false}
              dragAndDropCallback={() => {console.log(`SortListQuestion`)}}
            />
          );
        });

      case 'Ordering':
        return question?.response?.choices.map((item, index) => {
          return (
            <OrderingQuestion
              item={item}
              index={index}
              dragType={false}
              containerStyle={styles.orderOptionContainer}
              dragAndDropCallback={() => {console.log(`SortListQuestion`)}}
            />
          );
        });
      case 'MatchList':
        return <MatchListOptions response={question} />;
    }
  };

  return (
    <View style={[styles.parentContainer, style]}>
      {questionBody && questionBody !== '' ? (
        <View style={styles.container}>
          <MyAutoHeightWebView
            style={styles.webViewStyle}
            files={[]}
            customScript={''}
            customStyle={``}
            onSizeUpdated={size => {
              console.log('height :', size.height);
            }}
            source={{
              html: questionBody,
            }}
            zoomable={true}
          />
        </View>
      ) : null}
      <View
        style={[
          styles.answerContainer,
          question.template == 'SortList' ? {flexDirection: 'row'} : '',
        ]}>
        {renderOptions()}
      </View>
    </View>
  );
};

Question.propTypes = {
  question: PropTypes.object,
  optionContainerStyle: PropTypes.any,
  optionTextContainerStyle: PropTypes.any,
  optionTextStyle: PropTypes.any,
  webContentStyle: PropTypes.any,
};

Question.defaultProps = {
  option: [],
  showAns: true,
};
export default Question;
