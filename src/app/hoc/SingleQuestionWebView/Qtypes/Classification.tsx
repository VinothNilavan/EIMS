import React, { useEffect, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { getHtmlTemplate } from '../Helpers/QnAhelpers';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { QTypes } from '../../../helpers/index';

const Classification = (props) => {
    const { QuestionData } = props;
    const [questionBody, setQuestionBody] = useState()
    const [disableWebview, setDisableWebview] = useState(true);

    useEffect(() => {
        if (QuestionData) {
            setQuestionBody(getHtmlTemplate(QTypes.Classification, QuestionData));
        }
    }, [QuestionData])

    const web_message_handler = (eventData) => {
        console.log(eventData);
        console.log(JSON.parse(eventData.nativeEvent.data))
        setDisableWebview(false)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexWrap: 'wrap' }}>
                <View style={{ flex: 1, margin: '2%' }}>
                    <ScrollView style={{ flex: 1, flexGrow: 1 }}>
                        <AutoHeightWebView
                            style={{ width: Dimensions.get('window').width, marginTop: 25, marginBottom: 10, opacity: 0.99 }}
                            customStyle={`
                                * {font-family: 'Times New Roman';}
                                p {font-size: 16px;}
                                `}
                            onSizeUpdated={size => console.log(size.height)}
                            files={[{
                                href: 'cssfileaddress',
                                type: 'text/css',
                                rel: 'stylesheet'
                            }]}
                            source={{ html: questionBody, baseUrl: '' }}
                            scalesPageToFit={true}
                            viewportContent={'width=device-width, user-scalable=no'}
                            onMessage={web_message_handler}
                            startInLoadingState={true}
                            originWhitelist={['*']}
                            javaScriptEnabled={disableWebview}
                            androidLayerType={'none'}
                        />
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Classification