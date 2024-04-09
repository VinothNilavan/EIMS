import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { getHtmlTemplate } from '../Helpers/QnAhelpers';
import { isTablet } from '@utils';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { COLORS } from '@constants';

const MatchList = (props) => {
    const { QuestionData } = props;
    const [Question_body, set_Question_body] = useState()
    const [disable_webview, set_disable_webview] = useState(true);

    useEffect(() => {
        if (QuestionData) {
            let html_templet = getHtmlTemplate('matchlist', QuestionData);
            set_Question_body(html_templet);
        }
    }, [QuestionData])

    const web_message_handler = (e) => {
        console.log(e);
        console.log(JSON.parse(e.nativeEvent.data))
        set_disable_webview(false)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, flexGrow: 1 }}>
                        <AutoHeightWebView
                            style={{ width: isTablet() ? Dimensions.get('window').width - 120 : Dimensions.get('window').width - 60 , marginTop: 25, opacity: 0.99, alignSelf: 'center' }}
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
                            source={{ html: Question_body, baseUrl: '' }}
                            scalesPageToFit={true}
                            startInLoadingState={true}
                            viewportContent={'width=device-width, user-scalable=no'}
                            onMessage={web_message_handler}
                            originWhitelist={['*']}
                            javaScriptEnabled={disable_webview}
                            androidLayerType={'none'}
                        />
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

export default MatchList