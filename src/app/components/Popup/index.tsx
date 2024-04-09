/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { BalooThambiRegTextView } from '@components';
import { SimpleLottie } from '@components';
import { HeaderBackground, CloseIcon } from '@images';
import { useStores } from '@mobx/hooks';
import styles from './style';
import { STRINGS, REWARD_TYPES_CATEGORY_CERTIFICATES } from '@constants';
import { UseSound } from '@hooks';

const Popup = props => {
    const { isVisible, onButtonPress } = props;
    const { appStore } = useStores();
    const { playSound } = UseSound();
    let item = appStore.Popup.item;
    let isStar = (item?.category == REWARD_TYPES_CATEGORY_CERTIFICATES.STAR) ? true : false;
    const campImg = (item?.champCertificate?.certificateIcon) ? item.champCertificate.certificateIcon : 'https://mindspark-rearch-assets.s3.ap-southeast-1.amazonaws.com/certificateIcons/champ.png';
    const starImg = (item?.starCertificate?.certificateIcon) ? item.starCertificate.certificateIcon : 'https://mindspark-rearch-assets.s3.ap-southeast-1.amazonaws.com/certificateIcons/star.png';
    let imageUrl = (item?.category == REWARD_TYPES_CATEGORY_CERTIFICATES.STAR) ? starImg : campImg;
    let iconStyle = (item?.category == REWARD_TYPES_CATEGORY_CERTIFICATES.STAR) ? styles.imageSparkie : styles.imageChamp;
    let sparkieText = (item?.champCertificate?.showPopup) ? STRINGS.sparkieChamp : STRINGS.sparkieStar;
    const [popupVisible, setPopupVisibility] = useState(isVisible)

    useEffect(() => {
        let soundFile = require('../../assets/sound/sparkiestaraudio.mp3')
        setPopupVisibility(appStore.Popup.isVisible);
        if (appStore.Popup.isVisible) {
            playSound('', '', soundFile, true);
        }
    }, [appStore.Popup.isVisible])

    const handlePress = () => {
        setPopupVisibility(false);
        if (item?.starCertificate?.showPopup && item?.champCertificate?.showPopup) {
            let itemBkp = item;
            itemBkp.champCertificate.showPopup = false;
            appStore.setPopup({ isVisible: true, item: { ...itemBkp, category: REWARD_TYPES_CATEGORY_CERTIFICATES.STAR } });
            setTimeout(() => {
                setPopupVisibility(true);
            }, 1000)
        }
    }

    const onViewBtnClick = () => {
        setPopupVisibility(false);
        onButtonPress();
    }

    return (
        <Modal isVisible={popupVisible} onBackdropPress={handlePress}>
            <View style={styles.modalOuter}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeContainer} onPress={handlePress}>
                        <CloseIcon />
                    </TouchableOpacity>
                    <View style={styles.youReceivedContainer}>
                        <BalooThambiRegTextView
                            testID="SessionTimeOutDialogTitleText"
                            style={styles.HeaderText}>
                            {STRINGS.congratulations}
                        </BalooThambiRegTextView>
                        <HeaderBackground
                            accessible={true}
                            testID="SessionTimeOutDialogHeaderBg"
                            accessibilityLabel="SessionTimeOutDialogHeaderBg"
                            style={styles.svgBackgroundImage}
                        />
                    </View>
                    <View style={styles.bgRaysContainer}>
                        <BalooThambiRegTextView
                            testID="SessionTimeOutDialogTitleText"
                            style={styles.YouReceivedCertificateText}>
                            {STRINGS.youReceivedCertificate}
                        </BalooThambiRegTextView>
                        <View style={styles.bgRayAnimationContiner}>
                            {isStar ?
                                <SimpleLottie theme={`rewardLotties`} jsonFileName="sparkieStarAnimation" speed={0.3} style={{ height: 300 }} />
                                : <SimpleLottie theme={`rewardLotties`} jsonFileName="sparkieChampAnimation" speed={0.3} style={{ height: 300 }} />
                            }
                        </View>
                        <View style={styles.AnimationContainer}>
                            <SimpleLottie
                                theme={`rewardLotties`}
                                jsonFileName="rewardBGRays"
                                speed={0.3}
                                style={styles.bgRayAnimation} />
                            {imageUrl &&
                                <Image
                                    accessible={true}
                                    testID="CertificateImage"
                                    style={iconStyle}
                                    source={{ uri: imageUrl }}
                                />}
                        </View>
                        <View style={styles.SparkieLabelContainer}>
                            <BalooThambiRegTextView
                                testID="SessionTimeOutDialogTitleText"
                                style={styles.titleText}>
                                {sparkieText}
                            </BalooThambiRegTextView>
                            <TouchableOpacity
                                onPress={onViewBtnClick}
                                style={styles.buttonContainer}>
                                <BalooThambiRegTextView
                                    style={{ alignSelf: 'center', padding: 3, fontSize: 20 }}>
                                    View
                                </BalooThambiRegTextView>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Popup