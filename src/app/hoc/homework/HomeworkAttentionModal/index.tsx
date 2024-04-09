// External Imports
import React from 'react';
import { View } from 'react-native'
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { getWp, getHp } from '@utils';

// Internal Imports
import styles from './style';
import { BalooThambiRegTextView, RoundedButton } from '@components';
import { HeaderBackground } from '@images';
import {useLanguage} from '@hooks';

const HomeworkAttentionModal = props => {
    const {
        isVisible,
        title,
        message,
        onOkayButtonPressed,
        onNoButtonPressed,
    } = props;
    const {yesbtnText,nobtnText} = useLanguage();
    return (
        <Modal
            isVisible={isVisible}
            animationIn="fadeIn"
            animationOut="fadeOut">
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <BalooThambiRegTextView style={styles.titleText}>
                        {title}
                    </BalooThambiRegTextView>
                    <HeaderBackground style={styles.svgBackgroundImage} />
                </View>
                <View style={{ height: '40%'}}><BalooThambiRegTextView style={styles.messageText}>
                    {message}
                </BalooThambiRegTextView></View>
                <View style={styles.buttonContainer}>
                    <RoundedButton
                        text={yesbtnText}
                        type="elevatedOrange"
                        width={getWp(180)}
                        height={getHp(60)}
                        onPress={onOkayButtonPressed}
                    />
                    <View style={styles.buttonSeparator} />
                    <RoundedButton
                        text={nobtnText}
                        type="secondaryWhite"
                        width={getWp(180)}
                        height={getHp(60)}
                        onPress={onNoButtonPressed}
                        textStyle={styles.buttonSkipText}
                    />
                </View>
            </View>

        </Modal>
    )
}

HomeworkAttentionModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    onOkayButtonPressed: PropTypes.func,
    onNoButtonPressed: PropTypes.func,
};

HomeworkAttentionModal.defaultProps = {
    isVisible: false,
    title: 'Attention \nPlease!',
    message: 'You have already uploaded the image for your solution. Re-upload?',
    onOkayButtonPressed: () => { console.log('ok pressed')},
    onNoButtonPressed: () => { console.log('no pressed')},
};

export default HomeworkAttentionModal;