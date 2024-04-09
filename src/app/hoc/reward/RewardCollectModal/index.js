// External Imports
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {getWp, getHp} from '@utils';

// Internal Imports
import styles from './style';
import {
  BalooThambiRegTextView,
  RoundedButton,
  RewardBadge,
  SimpleLottie,
} from '@components';
import {HeaderBackground, SelectedTitleSVG} from '@images';
import {useLanguage} from '@hooks';

const RewardCollectionModal = props => {
  const {
    testID,
    isVisible,
    item,
    title,
    onSkipBtnPressed,
    onStartBtnPressed,
    rewardtype,
  } = props;

  const {okayBtnText} = useLanguage();

  return (
    <Modal
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      isVisible={isVisible}
      animationIn="fadeIn"
      onBackdropPress={onSkipBtnPressed}
      animationOut="fadeOut">
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <BalooThambiRegTextView
            testID="RewardCollectionModalTitle"
            style={styles.titleText}>
            {title}
          </BalooThambiRegTextView>
          <HeaderBackground
            accessible={true}
            testID="RewardCollectionModalHeaderBg"
            accessibilityLabel="RewardCollectionModalHeaderBg"
            style={styles.svgBackgroundImage}
          />
        </View>
        {rewardtype === 'badge' ? (
          <View style={{alignItems: 'center', marginVertical: 50}}>
            <View style={styles.rewardsBgRaysContainer}>
              <SimpleLottie
                testID="SimpleLottieRewardCollectionModal"
                theme={`rewardLotties`}
                jsonFileName="rewardBGRays"
                speed={0.4}
              />
            </View>

            <RewardBadge
              testID="RewardBadgeRewardCollectionModal"
              svgURI={Array.isArray(item) ? item[0].badgeImg : item.badgeImg}
              containerStyle={styles.rewardBadgeContainerStyle}
              badgeWidth={getHp(100)}
            />

            <BalooThambiRegTextView
              testID="RewardCollectionModalBadgeName"
              style={styles.subTitleText}>
                {Array.isArray(item) ? item[0].badgeName : item.badgeName}
            </BalooThambiRegTextView>
          </View>
        ) : (
          <View style={{alignItems: 'center', marginVertical: 50}}>
            <View style={styles.rewardsBgRaysTtileContainer}>
              <SimpleLottie
                testID="SimpleLottieRewardCollectionModal"
                theme={`rewardLotties`}
                jsonFileName="rewardBGRays"
                speed={0.4}
              />
            </View>
            <View style={styles.rewardTitleContainer}>
              <View style={styles.rewardTitleSVGContainer}>
                {<SelectedTitleSVG width="250" />}
              </View>
              <BalooThambiRegTextView
                testID="RewardShowCaseItemName2"
                style={styles.rewardTitleNameStyle}>
                  {Array.isArray(item) ? item[0].titleName : item.titleName}
              </BalooThambiRegTextView>
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <RoundedButton
            testID="RoundedButtonRewardCollectionModal"
            text={rewardtype === 'badge' ? okayBtnText : 'Collect'}
            textStyle={styles.collectText}
            type="elevatedOrange"
            width={getWp(150)}
            height={getHp(60)}
            onPress={() => {
              onStartBtnPressed();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

RewardCollectionModal.propTypes = {
  testID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onSkipBtnPressed: PropTypes.func,
  onStartBtnPressed: PropTypes.func,
  onHide: PropTypes.func,
  item: PropTypes.object,
  rewardtype: PropTypes.string,
};

RewardCollectionModal.defaultProps = {
  testID: 'RewardCollectionModal',
  isVisible: false,
  homework: null,
  title: 'You Received',
  rewardtype: 'badge',
  item: {},
  onSkipBtnPressed: () => {console.log(`RewardCollectionModal onSkipBtnPressed`)},
  onStartBtnPressed: () => {console.log(`RewardCollectionModal onStartBtnPressed`)},
};

export default RewardCollectionModal;
