import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { getHtmlTemplate } from '../Helpers/QnAhelpers';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { UseSound } from '@hooks';

const Ordering = (props) => {
    const { Question_data, is_report } = props;
    const [Question_body, set_Question_body] = useState('');
    const [disable_webview, set_disable_webview] = useState(true);
    const { playSound, audioCleanup, stopAudio } = UseSound();

    useEffect(() => {
        if (Question_data) {
            set_Question_body(getHtmlTemplate('Ordering', Question_data));
        }
    }, [Question_data, Question_body])

    const web_message_handler = (eventData) => {
        let { data } = eventData.nativeEvent;
        let temp_data = JSON.parse(eventData.nativeEvent);
        audioCleanup();
        playSound(`orderingVO${data.id}`, temp_data.sound);
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexWrap: 'wrap' }}>
                <View style={{ flex: 1 }}>
                    <AutoHeightWebView
                        style={{ width: Dimensions.get('window').width - 25, marginTop: 25, marginBottom: 10, opacity: 0.99 }}
                        customStyle={`
                                * {font-family: 'Times New Roman';}
                                p {font-size: 16px;}
                                `}
                        onSizeUpdated={size => console.log('size.height order type', size.height)}
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
                </View>
            </View>
        </View>
    );
};

export default Ordering