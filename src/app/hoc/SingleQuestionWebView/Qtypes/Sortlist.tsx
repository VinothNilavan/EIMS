import React, { useEffect, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { getHtmlTemplate } from '../Helpers/QnAhelpers';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { QTypes } from "../../../helpers";

const SortList = (props: any) => {
  const { questionData } = props;
  const [questionBody, setQuestionBody] = useState([])
  const [disable_webview, set_disable_webview] = useState(true);

  useEffect(() => {
    if (questionData) {
      if ((questionData.hasOwnProperty('userAttemptData')) && (questionData.userAttemptData.result != 'skip' && questionData.userAttemptData.result != 'unAttempted')) {
        let userAttemptedDataKeys = Object.keys(questionData?.userAttemptData?.userResponse?.SortList);
        let userAttemptedData = userAttemptedDataKeys.map(item => {
          return `${questionData?.userAttemptData?.userResponse?.SortList[item][0]}`
        });
        let updatedSortListQuestion = userAttemptedData.map(item => {
          return questionData.data.response.choices.filter(data => data.identifier == item)[0];
        });
        questionData.data.response.choices = updatedSortListQuestion;
      }
      setQuestionBody(getHtmlTemplate(QTypes.SortList, questionData.data, questionData.userAttemptData));
    }
  }, [questionData])

  const web_message_handler = (eventData) => {
    console.log(JSON.parse(eventData.nativeEvent.data))
    set_disable_webview(false)
  }

  return (
    <View style={{ flex: 1 }} >
      <View style={{ flex: 1, flexWrap: 'wrap' }}>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <AutoHeightWebView
                style={{ width: Dimensions.get('window').width, marginTop: 25, marginBottom: 10, opacity: 0.99 }}
                customStyle={`
                            * {font-family: 'Times New Roman';}
                            p {font-size: 16px;}
                            `}
                onSizeUpdated={size => console.log('size.height sort type', size.height)}
                files={[{
                  href: 'cssfileaddress',
                  type: 'text/css',
                  rel: 'stylesheet'
                }]}
                source={{ html: questionBody, baseUrl: '' }}
                scalesPageToFit={true}
                startInLoadingState={true}
                viewportContent={'width=device-width, user-scalable=no'}
                onMessage={web_message_handler}
                originWhitelist={['*']}
                javaScriptEnabled={disable_webview}
                androidLayerType={'none'}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SortList