import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { BalooThambiRegTextView } from '@components';
import { REWARD_TYPES_CATEGORY_CERTIFICATES, STRINGS } from '../../constants';
import styles from './indexCss';
import { InfoIcon } from '@images';

export default CustomPopup = (props) => {
    const { type, customModalVisible, isInfoIcon, onPress } = props;
    return (
        <View style={styles.mainWrapper}>
            {isInfoIcon &&
                <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
                    <Image accessible={true} testID="rewardSection" accessibilityLabel="rewardSection"
                        style={styles.infoIcon} source={InfoIcon}
                    />
                </TouchableOpacity>}
            {customModalVisible && <View style={styles.MessageContainer}>
                <View style={styles.leftarrowContainer} />
                <View style={styles.textContainer}>
                    <BalooThambiRegTextView testID="rewardInfoTitle" style={styles.msgTextStyle} numberOfLines={4}>
                        {type == REWARD_TYPES_CATEGORY_CERTIFICATES.STAR ? STRINGS.eCertificatesStarInfo : STRINGS.eCertificatesChampInfo}
                    </BalooThambiRegTextView>
                </View>
            </View>}
        </View>
    );
}