// External Imports
import React, {useImperativeHandle,useEffect,useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {useStores} from '@mobx/hooks';
import {Base64} from 'js-base64';

// Internal Imports
import styles from './style';
import {MyAutoHeightWebView} from '@components';
import getHtmlTemplate from '@utils/getHtmlTemplate';

const TextInteraction = React.forwardRef((props, ref) => {
  const {qnaStore, uiStore} = useStores();
  const {questionData} = props;
  const isRTL = uiStore.isRTL;
  const [QuestionBody,set_QuestionBody]=useState([]);

  useEffect(()=>{
    let questionBody = '';
    if (questionData?.questionBody && questionData?.questionBody.length > 0) {
      try {
        questionBody = decodeURI(questionData.questionBody);
      } catch (err) {
        questionBody = questionData.questionBody;
      }
      questionBody = getHtmlTemplate(questionBody, false, isRTL);
    }
    set_QuestionBody(questionBody);
  },[])
  

  useImperativeHandle(ref, () => ({
    evaluteAnswer() {
      const isValidResponse = hasValidUserResponse();
      let validScore = questionData?.responseValidation?.validResponse?.score
        ? questionData?.responseValidation?.validResponse?.score
        : 1;
      let payload = {};
      payload.isDynamic = questionData?.isDynamic;
      payload.contentID = questionData?.contentID;
      payload.result = isValidResponse
        ? Base64.encode('pass')
        : Base64.encode('unAttempted');
      payload.userResponse = {};
      payload.userAttemptData = {};
      if (isValidResponse) {
        payload.userAttemptData.trials = [
          {
            userResponse: {},
            result: isValidResponse
              ? Base64.encode('true')
              : Base64.encode('unAttempted'),
            score: isValidResponse ? validScore : 0,
          },
        ];
      }

      let contentInfo = {};
      contentInfo.contentID = questionData?.contentID;
      contentInfo.contentVersionID = questionData?._id;
      contentInfo.contentType = questionData?.contentType;
      contentInfo.questionType = questionData?.template;
      contentInfo.revisionNum = questionData?.revisionNo;
      contentInfo.langCode = questionData?.langCode;
      payload.contentInfo = contentInfo;
      payload.remainingTime = 0;
      payload.nextContentSeqNum = null;

      return payload;
    },
  }));

  const hasValidUserResponse = () => {
    let isValidResponse = false;
    if (
      qnaStore?.homeworkSolution &&
      typeof qnaStore?.homeworkSolution !== 'undefined' &&
      qnaStore?.homeworkSolution !== ''
    ) {
      isValidResponse = true;
    }

    if (
      qnaStore?.homeworkSolutionAttachment &&
      typeof qnaStore?.homeworkSolutionAttachment !== 'undefined'
    ) {
      isValidResponse = true;
    }

    return isValidResponse;
  };

  return (
    <View style={styles.container}>
      {QuestionBody && <MyAutoHeightWebView
        style={styles.questionContainer}
        files={[
          {
            href: 'contentService',
            type: 'text/javascript',
            rel: 'script',
          },
        ]}
        onSizeUpdated={size => { console.log(' size updated => ', size); }}
        source={{html: QuestionBody}}
        zoomable={false}
      />}
    </View>
  );
});

TextInteraction.propTypes = {
  questionData: PropTypes.object.isRequired,
};

TextInteraction.defaultProps = {
  questionData: null,
};

export default TextInteraction;
