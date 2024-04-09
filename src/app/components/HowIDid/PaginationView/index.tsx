import React from 'react';
import { View } from 'react-native';
import styles from './style'
import { BalooThambiRegTextView } from '@components'
import { LeftWhiteArrow, RightWhiteArrow } from '@images'
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PaginationView = props => {
    const { testID, currentPage, totalPage, onNextBtnPressed, onPreviousBtnPressed } = props;

    return (
        <View accessible={true} testID={testID} accessibilityLabel={testID} style={styles.container}>
            <TouchableOpacity accessible={true} testID="PaginationViewPreviousButton" accessibilityLabel="PaginationViewPreviousButton" disabled={currentPage === 1} onPress={onPreviousBtnPressed}>
                {currentPage != 1 ? <LeftWhiteArrow /> : <View style={styles.emptyContainer} />}
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <BalooThambiRegTextView testID="PaginationViewCurrentPage" style={styles.text}>{currentPage}</BalooThambiRegTextView>
            </View>
            <TouchableOpacity accessible={true} testID="PaginationViewOnNextBtnPressed" accessibilityLabel="PaginationViewOnNextBtnPressed" disabled={currentPage === totalPage} onPress={onNextBtnPressed}>
                {currentPage != totalPage ? <RightWhiteArrow /> : <View style={styles.emptyContainer} />}
            </TouchableOpacity>
        </View>
    );
}

PaginationView.propTypes = {
    testID: PropTypes.string,
    currentPage: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    onNextBtnPressed: PropTypes.func,
    onPreviousBtnPressed: PropTypes.func,
}

PaginationView.defaultProps = {
    testID: 'PaginationView',
    index: 1,
    totalPage: 1,
    onNextBtnPressed: () => { console.log(`default onNextBtnPressed`) },
    onPreviousBtnPressed: () => { console.log(`default onPreviousBtnPressed`) }
}

export default PaginationView;