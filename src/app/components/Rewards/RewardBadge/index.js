import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { getWp, getHp } from '@utils';
import { BalooThambiRegTextView } from '@components';
import { SvgCssUri } from 'react-native-svg/css';
import * as ProgressBar from 'react-native-progress';

const RewardBadge = props => {
  const {
    testID,
    svgURI,
    badgeWidth,
    containerStyle,
    countContainerStyle,
    count,
    countTextStyle,
    disabled,
    Svg,
    progress,
  } = props;

  return (
    <TouchableOpacity
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={[styles.mainContainer, containerStyle]}
      disabled={disabled}>
      {svgURI ? (<SvgCssUri width={badgeWidth} height={badgeWidth} uri={svgURI} />) : Svg ? (<Svg width={badgeWidth} height={badgeWidth} />) : null}
      {progress != undefined && progress > 0 ? (<RenderProgressBar progress={progress} />) : progress == 0 ? (<RenderNoProgressBar />) : null}
      {count != null && count > 1 && (
        <View style={[styles.countContainer, countContainerStyle]}>
          <BalooThambiRegTextView style={[styles.countText, countTextStyle]}> {count} </BalooThambiRegTextView>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const RenderProgressBar = (props) => {
  const { progress } = props;
  return (
    <View style={styles.progressContainerStyle}>
      <ProgressBar.Bar
        progress={progress / 100}
        width={getWp(28)}
        height={getHp(8)}
        unfilledColor={'#000'}
        borderWidth={0}
        color={'#FFF'}
      />
    </View>
  );
};

export const RenderNoProgressBar = () => {
  return (
    <View style={styles.dotProgressContainerStyle}>
      <View style={{ ...styles.dotProgressStyle, marginLeft: 0 }} />
      <View style={styles.dotProgressStyle} />
      <View style={styles.dotProgressStyle} />
    </View>
  );
};

RewardBadge.propTypes = {
  testID: PropTypes.string,
  svgURI: PropTypes.string,
  badgeWidth: PropTypes.number,
  containerStyle: PropTypes.any,
  countContainerStyle: PropTypes.any,
  countTextStyle: PropTypes.any,
  count: PropTypes.number,
  isApplied: PropTypes.bool,
  disabled: PropTypes.bool,
};

RewardBadge.defaultProps = {
  testID: 'RewardBadge',
  badgeWidth: getWp(53),
  count: 0,
  isApplied: false,
  svgURI: '',
  disabled: true,
};

export default RewardBadge;
