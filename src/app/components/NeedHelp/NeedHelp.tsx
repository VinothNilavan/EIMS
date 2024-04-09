import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, TouchableOpacity, Platform, Linking } from 'react-native';
import { ErrorMsgClose } from '@images';
import { getWp, getHp } from '@utils';
import { COLORS, TEXTFONTSIZE, STRINGS } from '@constants';
import { useLanguage } from '@hooks';

const NeedHelp = (props) => {
    const { showModal, onClick } = props;
    const [show, setShow] = useState(showModal);
    const { helpNeedTimeQuery, helpNeedQuery } = useLanguage();
    const clickEvent = () => {
        onClick();
        setShow(false);
    }

    const openDailPad = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`)
    }
    const openEmailBox = (email) => {
        Linking.openURL(`mailto:${email}`)
    }
    return (
        <View>
            <Modal visible={show} transparent={true} onRequestClose={() => { clickEvent() }} >
                <View style={styles.OuterView}>
                    <View style={styles.InnerView} >
                        <View style={{ height: 40, width: 40, position: 'absolute', right: 0, alignItems: 'flex-end', zIndex: 999 }}>
                            <TouchableOpacity onPress={() => clickEvent()}>
                                <ErrorMsgClose />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.TextView, { marginTop: 20 }]}>
                            <Text style={styles.lightText}>{helpNeedQuery}</Text>
                            <TouchableOpacity onPress={() => openEmailBox(STRINGS.mindsparkEmail)} >
                                <Text style={styles.darkText}>{STRINGS.mindsparkEmail}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.TextView}>
                            <Text style={styles.lightText}>{helpNeedTimeQuery}</Text>
                            <TouchableOpacity onPress={() => openDailPad(STRINGS.mindsparkPhone)} >
                                <Text style={styles.darkText}>{STRINGS.mindsparkPhone}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    NeedHelpContaier: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: getWp(130),
        borderRadius: getWp(20),
        marginLeft: getWp(20),
        borderColor: COLORS.LightRed,
        borderWidth: 1,
        padding: 10,
    },
    NeedHelpText: {
        color: COLORS.LightRed,
        fontSize: TEXTFONTSIZE.Text16,
        alignSelf: 'center',
    },
    OuterView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: Platform.OS === 'ios' ? 0.3 : 0.2,
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


