import React, { Fragment, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BalooThambiRegTextView } from '@components';
import { useLanguage } from '@hooks';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { STRINGS, REWARD_TYPES_CATEGORY_CERTIFICATES } from '../../../constants';
import { InfoIcon } from '@images';

import styles from './indexCss';

const RewardSection = props => {
  const {
    children,
    title,
    rewardSectionChildContainer,
    contentLength,
    isViewAll,
    onViewAllPress,
    isInfoIcon,
    certificateType
  } = props;
  const { viewLess, viewAll } = useLanguage();
  const [customModalVisible, setCustomModalVisible] = useState(false);

  const infoIconTapped = () => {
    setCustomModalVisible(true);
  }

  return (
    <Fragment>
      <View style={styles.gradientContainer}>
        <LinearGradient style={styles.gradientStyle} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FFFFFF', '#FFFFFF00']} />
        <View style={styles.gradientContainerStyle}>
          <View style={styles.titleAndInfoContainer}>
            <BalooThambiRegTextView style={styles.gradientTextStyle}> {title} </BalooThambiRegTextView>
          </View>
          {isInfoIcon && <View style={styles.textContainer}>
            <Popover placement={PopoverPlacement.RIGHT} popoverStyle={styles.popoverContainer} isVisible={customModalVisible}
              onRequestClose={() => setCustomModalVisible(false)} from={(
                <TouchableOpacity style={styles.iconContainer} onPress={infoIconTapped}>
                  <Image accessible={true} testID="rewardSection" accessibilityLabel="rewardSection" style={styles.infoIcon} source={InfoIcon} />
                </TouchableOpacity>
              )}>
              <BalooThambiRegTextView testID="rewardInfoTitle" style={styles.msgTextStyle}>
                {certificateType == REWARD_TYPES_CATEGORY_CERTIFICATES.STAR ? STRINGS.eCertificatesStarInfo : STRINGS.eCertificatesChampInfo}
              </BalooThambiRegTextView>
            </Popover>
          </View>
          }
          {contentLength > 3 &&
            (<TouchableOpacity onPress={onViewAllPress}>
              <BalooThambiRegTextView style={styles.gradientViewButtonStyle}>
                {isViewAll ? `${viewLess}` : `${viewAll}`}
              </BalooThambiRegTextView>
            </TouchableOpacity>)
          }
        </View>
      </View>
      <View style={{ ...styles.rewardSectionChildContainer, ...rewardSectionChildContainer }}>
        {children}
      </View>
    </Fragment>
  );
};

export default RewardSection;
