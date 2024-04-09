import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ScrollView, Platform } from "react-native";
import { getHtmlTemplate } from '../Helpers/QnAhelpers';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { deviceWidth } from '@utils';
import { COLORS } from '@constants';

const Interactive = (props) => {
    const { QuestionData } = props;
    const [Question_body, set_Question_body] = useState()
    const [webViewHeight, setWebviewHeight] = useState(0);
    const webViewRef = useRef(null);

    const webViewScript = `(function() { window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight);})()`;

    useEffect(() => {
        if (QuestionData && QuestionData.questionBody) {
            let htmlTemplate = getHtmlTemplate('interactive', QuestionData);
            set_Question_body(htmlTemplate);
        }

    }, [QuestionData])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexWrap: 'wrap' }}>
                <ScrollView style={{ flex: 1, flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
                        <AutoHeightWebView
                            ref={webViewRef}
                            style={[styles.webview, Platform.OS === 'android' && { height: webViewHeight ? webViewHeight : 600 }]}
                            customStyle={`
                                * {font-family: 'Times New Roman';}
                                p {font-size: 16px;}
                                `}
                            files={[{
                                href: 'cssfileaddress',
                                type: 'text/css',
                                rel: 'stylesheet'
                            }]}
                            source={{ html: Question_body, baseUrl: '' }}
                            scalesPageToFit={true}
                            startInLoadingState={true}
                            viewportContent={'width=device-width, user-scalable=no'}
                            originWhitelist={['*']}
                            javaScriptEnabled={true}
                            onSizeUpdated={size => { setWebviewHeight(size?.height); console.log(`size interactive `, size?.height) }}
                            androidLayerType={'none'}
                            onLoadEnd={() => webViewRef.current.injectJavaScript(webViewScript)}
                            injectedJavaScript={webViewScript}
                            cacheEnabled={true}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignContent: 'center',
        elevation: 6,
        flexShrink: 1,
    },
    Text: {
        fontWeight: "bold",
        fontSize: 16,
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    webview: {
        width: deviceWidth() - 80,
        marginTop: 25,
        marginBottom: 10,
        opacity: 0.99,
        alignSelf: 'center'
    }
});

export default Interactive