import React, { Fragment, useEffect, useState } from 'react';
import { View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { QHtmlTemplateForIframe, MyAutoHeightWebView } from '@components';
import styles from './indexCss';
import { useStores } from '@mobx/hooks';
import { checkForAudio } from '@utils';

const QuestionContainer = ({ questionTree }) => {
  const store = useStores();
  const [QuestionBody, setQuestionBody] = useState([]);

  useEffect(() => {
    let questionBody = '';
    let questionView = '';
    if (questionTree?.questionBody && questionTree?.questionBody.length > 0) {
      questionView = questionTree.questionBody;
      questionView = checkForAudio(questionView);

      questionBody = QHtmlTemplateForIframe(
        questionView,
        false,
        wp(100),
        store,
        true,
        true,
        true,
      );
    }
    setQuestionBody(questionBody);
  }, []);

  return (
    <Fragment>
      {QuestionBody.length > 0 && (
        <View style={styles.questionBodyContainer}>
          <MyAutoHeightWebView
            key="mcqItemWebView"
            style={{ width: wp(100) }}
            files={[
              {
                href: 'contentService',
                type: 'text/javascript',
                rel: 'script',
              },
            ]}
            customScript={''}
            customStyle={``}
            onSizeUpdated={size => {
              console.log(size.height);
            }}
            source={{ html: QuestionBody }}
            zoomable={false}
          />
        </View>
      )}
    </Fragment>
  );
};

export default React.memo(QuestionContainer);
