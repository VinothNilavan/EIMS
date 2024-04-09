import React, { useState, useCallback } from 'react';
import { View, Modal, TouchableOpacity, Linking } from 'react-native';
import { ErrorMsgClose } from '@images';
import { BalooThambiRegTextView } from '@components';
import { useStores } from '@mobx/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { useLanguage } from '@hooks';
import { getAsValue } from '@utils';
import styles from './styles';
import { NativeBaseProvider, Card } from 'native-base';

const FeedBackModal = (props) => {
    const [show, setShow] = useState(true);
    const store = useStores();
    const { onClick } = props;
    const { noThanks, giveFeedBack, WewhouldLoveToHereFromYou, HelpUsImproveYourExpByGivingUsYourFeedBack } = useLanguage();

    useFocusEffect(
        useCallback(() => {
            setShow(true);
            setTimeout(() => {
                closeEvent();
            }, 10000);
        }, []),
    );

    const closeEvent = () => {
        setShow(false);
        onClick();
    }

    const onFeedbackCTA = async () => {
        console.log("UserType", userData);
        
        const { sessionInformation, userData } = store.appStore;
        console.log(JSON.stringify(userData));
        let sessionId = sessionInformation.sessionID || '';
        let classId = userData.grade || '';
        let userType = userData.isB2CUser ? 'B2C' : userData.userType;
        let username = userData.username || '';

        const subjectName = await getAsValue('subjectName');
        // let subject = subjectName || 'Maths';
        let subject_Name = userData.subject || '';
        let school = userData.schoolName || '' + userData.schoolCode || '';
        let nationality = userData.nationality || '';
        let language = userData.language || '';
        let url = `https://forms.zohopublic.in/educationalinitiativesprivat/form/MindsparkFeedbackStudent/formperma/7tTA7TtjDKi7iSBwDsL2IRp2GoUh0Bpt0EyfOSBLgDY?sessionid=${sessionId}&class=${classId}&platform=app&&usersubscription=${userType}&username=${username}&subject=${subject_Name}&schoolname=${school}&usertype=${userType}&nationality=${nationality}&language=${language}`;
        // Linking.openURL(url);
        closeEvent();
    };

    return (

        <View>
            <Modal visible={show} transparent={true} onRequestClose={() => { closeEvent() }} >
                <NativeBaseProvider>
                    <Card style={styles.OuterView}>
                        <View >
                            <View style={styles.CloseBtnView}>
                                <TouchableOpacity onPress={() => closeEvent()}>
                                    <ErrorMsgClose />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.TextView, { marginTop: 20 }]}>
                                <BalooThambiRegTextView style={styles.lightText}>{WewhouldLoveToHereFromYou}</BalooThambiRegTextView>
                                <View style={{ marginTop: 5 }}>
                                    <BalooThambiRegTextView style={styles.darkText}>{HelpUsImproveYourExpByGivingUsYourFeedBack}</BalooThambiRegTextView>
                                </View>

                                <View style={styles.ButtonGroup}>
                                    <TouchableOpacity
                                        onPress={() => closeEvent()}
                                        style={styles.NoThanksButton}>
                                        <BalooThambiRegTextView style={styles.NoThanksTextStyle}>{noThanks}</BalooThambiRegTextView>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => onFeedbackCTA()}
                                        style={styles.GiveFeedBack}  >
                                        <BalooThambiRegTextView style={styles.GiveFeedBackText}>{giveFeedBack}</BalooThambiRegTextView>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </Card>
                </NativeBaseProvider>
            </Modal>
        </View>
    )
}

export default FeedBackModal;
