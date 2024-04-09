import React, { useEffect, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { getHtmlTemplate } from '../Helpers/QnAhelpers';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { QTypes } from "../../../helpers";
import { MyAutoHeightWebView } from '@components';

const MultiselectMcq = (props) => {
    const { QuestionData, result } = props;
    const [Question_body, set_Question_body] = useState();

    useEffect(() => {
        if (QuestionData) {
            set_Question_body(getHtmlTemplate(QTypes.MMcq, QuestionData, result));
        }
    }, [QuestionData, Question_body])

    const web_message_handler = (e) => {
        console.log(e);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexWrap: 'wrap' }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <AutoHeightWebView
                            style={{ width: Dimensions.get('window').width - 60, marginTop: 25, marginBottom: 10, opacity: 0.99 }}
                            customStyle={`
                                * {font-family: 'Times New Roman';}
                                p {font-size: 16px;}
                                `}
                                onSizeUpdated={size => { console.log(`size  m mcq `, size.height) }}
                                files={[{
                                href: 'cssfileaddress',
                                type: 'text/css',
                                rel: 'stylesheet'
                            }]}
                            source={{ html: Question_body, baseUrl: '' }}
                            scalesPageToFit={true}
                            startInLoadingState={true}
                            viewportContent={'width=device-width, user-scalable=no'}
                            onMessage={web_message_handler}
                            originWhitelist={['*']}
                            javaScriptEnabled={true}
                            androidLayerType={'none'}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
export default MultiselectMcq