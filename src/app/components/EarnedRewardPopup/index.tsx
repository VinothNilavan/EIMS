/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { BalooThambiRegTextView, RoundedButton, SimpleLottie } from '@components';
import { YouRecievedSVG } from '@images';
import { useStores } from '@mobx/hooks';
import { getWp, getHp } from '@utils';
import styles from './indexCss';
import { SvgCssUri } from 'react-native-svg/css';
import { observer } from 'mobx-react';
import { useLanguage } from '@hooks';

const EarnedRewardPopup = params => {
    const { appStore } = useStores();
    const [show, setShow] = useState(true);
    const { title, badge, onPress, renderOkay = false } = params;
    const { tapAnyWhereToClose, okayBtnText } = useLanguage();

    const handlePress = () => {
        appStore.setShowEarnedPopUp(false);
        setShow(false);
        onPress();
    }

    const earnedRewardContent = () => {
        if (title) {
            return (
                <View style={styles.earndRewardContentContainer}>
                    <SvgCssUri uri={title.titleImg} height={getWp(40)} width={getWp(240)} preserveAspectRatio={"none"} />
                    <BalooThambiRegTextView style={styles.earnedBadgeTextStyle}>{title.titleName}</BalooThambiRegTextView>
                </View>
            );
        }
        else if (badge && !title) {
            return (
                <View style={{ ...styles.earndRewardContentContainer, marginTop: getHp(35) }}>
                    <SvgCssUri uri={badge[0].badgeImg} height={getWp(130)} width={getWp(130)} preserveAspectRatio={"none"} />
                    <BalooThambiRegTextView style={{
                        ...styles.earnedBadgeTextStyle,
                        position: 'relative',
                        marginTop: getHp(15),
                        color: "#000"
                    }}>{badge[0].badgeName}</BalooThambiRegTextView>
                </View>
            );
        } else {
            return null;
        }
    }
    return (
        <Modal isVisible={(appStore.showEarnedPopUp && show) || false} onBackdropPress={handlePress}>
            <TouchableOpacity onPress={handlePress} >
                <View style={styles.modalOuter}>
                    <View style={styles.modalContainer}>
                        <View style={styles.youReceivedContainer}>
                            <YouRecievedSVG />
                        </View>
                        <View style={styles.bgRaysContainer}>
                            <SimpleLottie theme={`rewardLotties`} jsonFileName="rewardBGRays" speed={0.3} />
                        </View>
                        {earnedRewardContent()}
                        <BalooThambiRegTextView style={styles.bottomTextStyle}>{tapAnyWhereToClose}</BalooThambiRegTextView>
                        {
                            renderOkay && <RoundedButton
                                text={okayBtnText}
                                type={`elevatedOrange`}
                                width={styles.okayBtnContainerStyle.width}
                                height={styles.okayBtnContainerStyle.height}
                                containerStyle={styles.okayBtnContainerStyle}
                            />
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

EarnedRewardPopup.propTypes = {
    isModalVisible: PropTypes.bool.isRequired,
};

EarnedRewardPopup.defaultProps = {
    isModalVisible: false,
};

export default observer(EarnedRewardPopup);