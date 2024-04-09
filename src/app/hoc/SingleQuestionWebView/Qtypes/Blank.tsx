import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Dimensions, StyleSheet, Platform } from "react-native";
import { getHtmlTemplate } from '../Helpers/QnAhelpers';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { QTypes } from '../../../helpers/index';

const Blank = (props) => {
    const { QuestionData } = props;
    const [questionBody, setQuestionBody] = useState([])
    const [disableWebview, setDisableWebview] = useState(true);
    const [webViewHeight, setWebviewHeight] = useState(null);
    const webViewRef = useRef(null);

    const webViewScript = `(function() { window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight);})()`;

    useEffect(() => {
        console.log("Blank Useeffect");
        if (QuestionData && QuestionData.data) {
            setQuestionBody(getHtmlTemplate(QTypes.Blank, QuestionData));
        }
    }, [QuestionData])

    const web_message_handler = (webHandler) => {
        let { data } = webHandler.nativeEvent;
        let temp_data = JSON.parse(data);
        console.log('temp_data.height', temp_data.height);
    }

    return (
        <View style={{ flex: 1 }} >
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            <AutoHeightWebView
                                ref={webViewRef}
                                testID="MyAutoHeightWebViewBlankOption"
                                style={[styles.webview, Platform.OS === 'android' && { height: webViewHeight ? webViewHeight : 600 }]}
                                customScript={''}
                                customStyle={`
                                            * {font-family: 'Times New Roman';}
                                            p {font-size: 16px;}
                                            `}
                                files={[{
                                    href: 'cssfileaddress',
                                    type: 'text/css',
                                    rel: 'stylesheet'
                                }]}
                                startInLoadingState={true}
                                onMessage={web_message_handler}
                                originWhitelist={['*']}
                                source={{ html: questionBody }}
                                zoomable={true}
                                onSizeUpdated={size => { setWebviewHeight(size?.height); console.log(`size blank`, size?.height); }}
                                androidLayerType={'none'}
                                onLoadEnd={() => webViewRef.current.injectJavaScript(webViewScript)}
                                injectedJavaScript={webViewScript}
                                cacheEnabled={true}
                                scrollEnabled={true}
                                showsHorizontalScrollIndicator={true}
                                javaScriptEnabled={disableWebview}
                                scalesPageToFit={true}
                                viewportContent={'width=device-width, user-scalable=no'}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    webview: {
        width: Dimensions.get('window').width - 60, opacity: 0.99,
    },
});
export default Blank