import React, { useEffect, useRef, useState } from "react";
import AutoHeightWebView from 'react-native-autoheight-webview';
import { getHtmlTemplate } from '../Helpers/QnAhelpers';
import { Dimensions, View, ScrollView, Platform, StyleSheet } from "react-native";
import WebView from "react-native-webview";

const Mcq = (props) => {
    const { QuestionData, result, userResponse } = props;
    const [Question_body, set_Question_body] = useState('');
    const [webViewHeight, setWebviewHeight] = useState(0);
    const webViewRef = useRef(null);

    const webViewScript = `(function() { window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight);})()`;

    useEffect(() => {
        if (QuestionData) {
            set_Question_body(getHtmlTemplate('mcq', QuestionData, result, userResponse));
        }
    }, [QuestionData])

    const web_message_handler = (webHandler) => {
        let { data } = webHandler.nativeEvent;
        let temp_data = JSON.parse(data);
        console.log('temp_data.height', temp_data.height);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
                <AutoHeightWebView
                    ref={webViewRef}
                    testID="MyAutoHeightWebViewMCQOption"
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
                    source={{ html: Question_body }}
                    zoomable={true}
                    onSizeUpdated={size => { setWebviewHeight(size?.height); console.log(`size mcq `, size?.height) }}
                    androidLayerType={'none'}
                    onLoadEnd={() => webViewRef.current.injectJavaScript(webViewScript)}
                    injectedJavaScript={webViewScript}
                    cacheEnabled={true}
                />
            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    webview: {
        width: Dimensions.get('window').width - 60,
        opacity: 0.99,
    },
});
export default Mcq