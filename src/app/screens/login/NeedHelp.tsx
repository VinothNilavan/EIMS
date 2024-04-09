import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { ErrorMsgClose } from '@images';
import { getWp, getHp } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';
import {useLanguage} from '@hooks';

const NeedHelp = () => {
    const [show, setShow] = useState(false);
    const {need_help} = useLanguage();
    return (
        <View>
            <TouchableWithoutFeedback onPress={() => { setShow(true) }} style={styles.NeedHelpContaier} >
                <Text style={styles.NeedHelpText}>{`${need_help}`}</Text>
            </TouchableWithoutFeedback>
            <Modal visible={show} transparent={true} onRequestClose={() => { setShow(false) }} >

                <View style={styles.OuterView}>
                    <View style={styles.InnerView} >
                        <View style={{ height: 40, width: 40, position: 'absolute', right: 0, alignItems: 'flex-end', zIndex: 999 }}>
                            <TouchableOpacity onPress={() => setShow(false)}>
                                <ErrorMsgClose />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.TextView, { marginTop: 20 }]}>
                            <Text style={styles.lightText}>Send your query to</Text>
                            <Text style={styles.darkText}>mindspark@ei-india.com</Text>
                        </View>

                        <View style={styles.TextView}>
                            <Text style={styles.lightText} >Or call us on (Mon to Fri 10am to 6pm)</Text>
                            <Text style={styles.darkText}>1800-102-8885</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    NeedHelpContaier: {
        //height: getHp(35),
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        width: getWp(130),
        borderRadius: getWp(20),
        marginLeft: getWp(20),
        borderColor: COLORS.LightRed,
        borderWidth: 1,
        padding:10,
        //marginBottom : 10,
    },
    NeedHelpText: {
        color: COLORS.LightRed,
        alignSelf: 'center',
        fontSize: TEXTFONTSIZE.Text16,
    },
    OuterView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.7,
    },
    InnerView: {
        width: Dimensions.get('window').width - 40,
        backgroundColor: '#f8f8ff',
        minHeight: getHp(150)
    },
    lightText: {
        fontSize: 14,
    },
    darkText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    TextView: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
    },
})
export default NeedHelp;


