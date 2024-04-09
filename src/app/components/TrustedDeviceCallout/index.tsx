// External Imports
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// Internal Imports
import styles from './style'

import { SourceSansProRegTextView } from '@components';

const TrustedDeviceCallout = props => {
    const { onSaveMySession, disableTrustedDevice } = props;

    return (
        <View style={styles.trustedPopUp}>
            <SourceSansProRegTextView style={styles.trustPopUpTxt}>
                Would you like to save your login details?
                You will be kept signed in for the next 1 year in this device.
            </SourceSansProRegTextView>
            <View style={styles.borderBtnContainer}>
                <TouchableOpacity onPress={() => onSaveMySession()}>
                    <View style={styles.borderButton}>
                        <SourceSansProRegTextView style={styles.borderText}>Yes</SourceSansProRegTextView>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => disableTrustedDevice()}>
                    <View style={[styles.borderButton, { marginLeft: 40 }]}>
                        <SourceSansProRegTextView style={styles.borderText}>No</SourceSansProRegTextView>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

TrustedDeviceCallout.propTypes = {
    onSaveMySession: PropTypes.func,
    disableTrustedDevice: PropTypes.func,
};

TrustedDeviceCallout.defaultProps = {
    onSaveMySession: () => { console.log('truested flow')},
    disableTrustedDevice: () => { console.log('disableTrustedDevice')}
};

export default TrustedDeviceCallout;