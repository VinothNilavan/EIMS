import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { getHtmlTemplate } from '../Helpers/QnAhelpers';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { COLORS } from '@constants';

const TextInteractive = (props) => {
    const { QuestionData } = props;
    const [Question_body, set_Question_body] = useState([])
    const [disable_webview, set_disable_webview] = useState(true);

    useEffect(() => {
        if (QuestionData && QuestionData.questionBody) {
            set_Question_body(getHtmlTemplate('textinteraction', QuestionData));
        }
    }, [QuestionData])

    const web_message_handler = (webHandler) => {
        console.log(JSON.parse(webHandler.nativeEvent.data))
        set_disable_webview(false)
    }

    return (
        <View style={{ flex: 1 }} >
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            <AutoHeightWebView
                                style={{ width: Dimensions.get('screen').width - 60, marginTop: 25, marginBottom: 10, opacity: 0.99 }}
                                customStyle={`
                                * {font-family: 'Times New Roman';}
                                p {font-size: 16px;}
                                `}
                                onSizeUpdated={size => console.log('size.height text interactive', size.height)}
                                files={[{
                                    href: 'cssfileaddress',
                                    type: 'text/css',
                                    rel: 'stylesheet'
                                }]}
                                source={{ html: Question_body, baseUrl: '' }}
                                scalesPageToFit={true}
                                viewportContent={'width=device-width, user-scalable=no'}
                                onMessage={web_message_handler}
                                originWhitelist={['*']}
                                scrollEnabled={true}
                                showsHorizontalScrollIndicator={true}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.red,//"darkred",
        justifyContent: 'center',
        alignContent: 'center',
        elevation: 6,
        flexShrink: 1,

    },
    Text: {
        // textAlign:'center',
        fontWeight: "bold",
        fontSize: 16,
        flexShrink: 1,
        flexWrap: 'wrap',
        // alignSelf:'center' 
    }
});

export default TextInteractive