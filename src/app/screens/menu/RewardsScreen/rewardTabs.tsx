import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BalooThambiRegTextView } from '@components';
import styles from './indexCss';
import { getWp } from '@utils';
import { REWARD_TYPES } from '../../../constants';

export const RewardTabs = ({ testID, item, index, onTabTitlePress, isActive = false }) => {
    const { title, type } = item;
    let tabStyle = { ...styles.tabContainerStyle, borderBottomWidth: isActive ? 3 : 0 };

    if (type == REWARD_TYPES.CERTIFICATES) {
        tabStyle = { ...tabStyle, width: getWp(140) };
    }
    let textStyle = { ...styles.tabContainerTextStyle, color: isActive ? `#FEDB31` : `#FFFFFF` };
    return (
        <TouchableOpacity accessible={true} testID={`RewardTabsRewardsContent${testID}`} style={tabStyle} onPress={onTabTitlePress}
            accessibilityLabel={`RewardTabsRewardsContent${testID}`} >
            <BalooThambiRegTextView testID="rewardTabsTitle" style={textStyle}> {title} </BalooThambiRegTextView>
        </TouchableOpacity>
    );
} 