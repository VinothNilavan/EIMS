import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { getWp, getHp } from '@utils';
import * as ProgressBar from 'react-native-progress';
import { STRINGS, REWARD_TYPES_CATEGORY_CERTIFICATES } from '@constants';

const RewardCertificate = props => {
  const {
    testID,
    iconUrl,
    rewardWidth,
    containerStyle,
    isApplied,
    disabled,
    progress,
    type
  } = props;


  const RenderProgressBar = () => {
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
  const RenderNoProgressBar = () => {
    return (
      <View style={styles.dotProgressContainerStyle}>
        <View style={{ ...styles.dotProgressStyle, marginLeft: 0 }} />
        <View style={styles.dotProgressStyle} />
        <View style={styles.dotProgressStyle} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={[styles.mainContainer, containerStyle]}
      disabled={disabled}>
      {iconUrl && (
        <Image
          accessible={true}
          testID="CertificateImage"
          accessibilityLabel="CertificateImage"
          style={type == REWARD_TYPES_CATEGORY_CERTIFICATES.CHAMP ? styles.imageChamp : styles.imageStar}
          source={{ uri: iconUrl }}
        />
      )}
      {progress != undefined && progress > 0 ? (
        <RenderProgressBar progress={progress} />
      ) : progress == 0 ? (
        <RenderNoProgressBar />
      ) : null}
    </TouchableOpacity>
  );
};

RewardCertificate.propTypes = {
  testID: PropTypes.string,
  svgURI: PropTypes.string,
  rewardWidth: PropTypes.number,
  containerStyle: PropTypes.any,
  countContainerStyle: PropTypes.any,
  countTextStyle: PropTypes.any,
  count: PropTypes.number,
  isApplied: PropTypes.bool,
  disabled: PropTypes.bool,
};

RewardCertificate.defaultProps = {
  testID: 'RewardCertificate',
  rewardWidth: getWp(53),
  count: 0,
  isApplied: false,
  svgURI: '',
  disabled: true,
};

export default RewardCertificate;
