/* eslint-disable react-hooks/exhaustive-deps */
// External Imports

import React, { Fragment } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';

// Internal Imports
import { BalooThambiRegTextView } from '@components';
import styles from './style';
import { SelectedTitleSVG  } from '@images';
import { getWp } from '@utils';
import PropTypes from 'prop-types';

const LeaderboardNameItem = props => {
    const { testID, permissions, item, type } = props;

    return (
        <Fragment>
            {permissions.profileName && (
                <View style={styles.profileStyle}>
                    <BalooThambiRegTextView
                        testID={`Leaderboard${item.upid}`}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={[
                            styles.titleStyle,
                            item.thisUser && styles.whiteTextColor
                        ]}>
                        {item.name}
                    </BalooThambiRegTextView>
                    {item?.title?.length > 0 && (
                        <View
                            style={styles.tileStyle}>
                            <SelectedTitleSVG
                                accessible={true}
                                testID={`Leaderboard${item.upid}`}
                                accessibilityLabel={`Leaderboard${item.upid}`}
                                width={'90%'}
                                height={
                                    String(item.title).length > 12 ? getWp(35) : getWp(30)
                                }
                                preserveAspectRatio="none"
                            />
                            <BalooThambiRegTextView
                                testID={`Leaderboard${item.upid}`}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[styles.titleTextStyle]}>
                                {item.title}
                            </BalooThambiRegTextView>
                        </View>
                    )}
                </View>
            )}

        </Fragment>
    );
};

LeaderboardNameItem.propTypes = {
    testID: PropTypes.string,
};

LeaderboardNameItem.defaultProps = {
    testID: 'LeaderboardNameItem',
};

export default observer(LeaderboardNameItem);