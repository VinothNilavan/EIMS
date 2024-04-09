import React, { Fragment, useState, useEffect } from 'react';
import { View, Image } from 'react-native';

import { RewardBadge, BalooThambiRegTextView, SimpleLottie, RoundedButton, RewardPopup } from '@components';
import styles from './indexCss';
import { getWp, getHp } from '@utils';
import { REWARD_TYPES, REWARD_TYPES_CATEGORY, STRINGS } from '@constants';
import { SvgCssUri } from 'react-native-svg/css';
import { CorrectAnswer, SelectedTitleSVG, StarBadge1 } from '@images';
import { useLanguage } from '@hooks';
import { useStores } from '@mobx/hooks';

const RewardShowcase = props => {
  const {
    testID,
    rewardShowCaseDetails: { type, item },
    onSetRewardsClick,
    fromDashboardScreen
  } = props;
  const { level, applyBtnText, appliedBtnText } = useLanguage();
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [enablePositiveMessage, setEnablePositiveMessage] = useState(false);
  const { appStore } = useStores();

  useEffect(() => {
    if (fromDashboardScreen) {
      setShowRewardPopup(true);
    }
  }, [fromDashboardScreen])

  const CertificateShowCase = () => {
    let isContentApplied = item.isApplied;
    let iconStyle = item?.category == 'star' ? styles.imageSparkie : styles.imageChamp;
    let certificateName = item?.category == 'star' ? 'Sparkie Star' : 'Sparkie Champ';
    setEnablePositiveMessage((item.latest && isContentApplied) || (item?.latest && !isContentApplied) ? false : true)
    return (
      <View>
        <View style={[styles.rewardTitleContainer]}>
          {item?.certificateIcon && (
            <Image
              accessible={true}
              testID="CertificateImage"
              style={iconStyle}
              source={{ uri: item?.certificateIcon }}
            />
          )}
          <BalooThambiRegTextView
            testID="RewardShowCaseItemName1"
            style={styles.rewardNameTextStyle}>
            {certificateName}
          </BalooThambiRegTextView>
          <View style={{ flexDirection: 'row', marginLeft: getWp(5), marginRight: getWp(5) }}>
            <RoundedButton
              testID="RoundedButtonRewardShowCase"
              onPress={() => setShowRewardPopup(true)}
              type={item?.certificateLink ? "elevatedOrange" : "secondaryWhite"}
              text={'View'}
              height={styles.applyReward.height}
              textStyle={item?.certificateLink ? { ...styles.applyRewardTextStyle, color: 'white' } : { ...styles.applyRewardTextStyle, color: '#AFAFAF' }}
              containerStyle={{ margin: getHp(10) }}
              disabled={item?.certificateLink ? false : true}
            />
            <RoundedButton
              testID="RoundedButtonRewardShowCase"
              onPress={() => {
                if (item.latest && isContentApplied) {
                  appStore.setSnackBar({ isVisible: true, title: STRINGS.certificateApplied })
                } else {
                  item?.latest && onSetRewardsClick()
                }
              }}
              type="secondaryWhite"
              text={isContentApplied ? appliedBtnText : applyBtnText}
              height={styles.applyReward.height}
              width={isContentApplied ? getWp(200) : getWp(160)}
              containerStyle={{ margin: getHp(10) }}
              textStyle={(enablePositiveMessage) ? { ...styles.applyRewardTextStyle, color: '#AFAFAF' } : styles.applyRewardTextStyle}
              SvgImage={isContentApplied && CorrectAnswer}
              isRTLSvg={true}
              disabled={enablePositiveMessage} />
          </View>
        </View>
        {enablePositiveMessage &&
          <BalooThambiRegTextView
            numberOfLines={3}
            testID="RewardShowCaseItemName1"
            style={styles.positiveMessageStyle}>
            {STRINGS.positiveMessage}
          </BalooThambiRegTextView>}
      </View>
    );
  };

  const BadgeShowCase = () => {
    const { injectProps, containerNewStyle} = configProps(item);
    return (
      <Fragment>
        {item?.badgeIcon && (
          <RewardBadge
            testID="RewardBadgeRewardShowCase"
            {...injectProps}
            count={item?.count}
            containerStyle={containerNewStyle}
            countContainerStyle={styles.rewardBadgeCountContainerStyle}
            badgeWidth={getHp(114)}
            progress={item?.progress}
          />
        )}
        {item.name && (
          <BalooThambiRegTextView
            testID="RewardShowCaseItemName1"
            style={styles.rewardNameTextStyle}>
            {item.name}
          </BalooThambiRegTextView>
        )}
        {item.badgeType && (
          <BalooThambiRegTextView
            testID="RewardShowCaseItemBadgeType"
            style={styles.rewardTypeTextStyle}>
            {level} {item.badgeType}
          </BalooThambiRegTextView>
        )}
        {item.description && (
          <BalooThambiRegTextView
            testID="RewardShowCaseItemDescription"
            style={styles.rewardDescriptionTextStyle}>
            {item.description}
          </BalooThambiRegTextView>
        )}
      </Fragment>
    );
  };

  const TitleShowCase = () => {
    return (
      <View>
        <View style={styles.rewardTitleContainer}>
          <View style={styles.rewardTitleSVGContainer}>
            {!item?.titleIcon ? (
              <SelectedTitleSVG />
            ) : (
              <SvgCssUri
                accessible={true}
                testID="RewardShowCaseSVGUri"
                accessibilityLabel="RewardShowCaseSVGUri"
                uri={item.titleIcon}
                style={styles.titleIconSvgStyle}
                width={styles.titleIconSvgStyle.width}
                height={styles.titleIconSvgStyle.height}
                preserveAspectRatio={'none'}
              />
            )}
          </View>
          <BalooThambiRegTextView
            testID="RewardShowCaseItemName2"
            numberOfLines={1}
            style={styles.rewardTitleNameStyle}>
            {item?.name}
          </BalooThambiRegTextView>
        </View>
        <BalooThambiRegTextView
          testID="RewardShowCaseTopicName"
          style={styles.rewardTitleTextStyle}>
          {item.category == REWARD_TYPES_CATEGORY.EARNED
            ? 'You earned '
            : 'Earn '}
          this title by completing {`${item?.topicName}`}
        </BalooThambiRegTextView>
      </View>
    );
  };

  const RenderAppliedButton = () => {
    if (item.category != REWARD_TYPES_CATEGORY.EARNED) {
      return null;
    }

    let isContentApplied = item.isApplied;
    let btnText = isContentApplied ? appliedBtnText : applyBtnText
    let svgImageFlag = isContentApplied && CorrectAnswer

    return (
      <RoundedButton
        testID="RoundedButtonRewardShowCase"
        onPress={onSetRewardsClick}
        type="secondaryWhite"
        text={btnText}
        width={styles.applyReward.width}
        height={styles.applyReward.height}
        containerStyle={{ marginTop: getHp(10) }}
        textStyle={styles.applyRewardTextStyle}
        SvgImage={svgImageFlag}
        isRTLSvg={true}
        disabled={isContentApplied}
      />
    );
  };

  const RenderShowCase = () => {
    let showCaseContent = null;
    switch (type) {
      case REWARD_TYPES.BADGES:
        showCaseContent = <BadgeShowCase />;
        break;
      case REWARD_TYPES.TITLES:
        showCaseContent = <TitleShowCase />;
        break;
      case REWARD_TYPES.CERTIFICATES:
        showCaseContent = <CertificateShowCase />;
        break;
    }

    return (
      <View
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        style={styles.rewardShowCaseContainer}>
        <RenderBGRays item={item} enablePositiveMessage={type == REWARD_TYPES.CERTIFICATES ? enablePositiveMessage : false} />
        {showRewardPopup && <RewardPopup type={item?.category} certificateLink={item.certificateLink} isVisible={showRewardPopup} onCloseClick={() => setShowRewardPopup(!showRewardPopup)} certificateId={item?.certificateID} date={item?.name} />}
        {showCaseContent}
        <RenderAppliedButton />
      </View>
    );
  };
  return item != undefined ? <RenderShowCase /> : null;
};

const RenderBGRays = ({ enablePositiveMessage }) => {
  return (
    <View style={styles.rewardsBgRaysContainer}>
      {!enablePositiveMessage && <SimpleLottie
        testID="SimpleLottieRenderBGRays"
        theme={`rewardLotties`}
        jsonFileName="rewardBGRays"
        speed={0.4}
      />}
    </View>
  );
}

export default RewardShowcase;

const configProps = (item) => {
  let injectProps = {};
  let containerNewStyle = {};
  if (item.category == 'earned') {
    injectProps.svgURI = item?.badgeIcon;
    containerNewStyle = styles.rewardBadgeContainerStyle;
  } else {
    containerNewStyle = styles.rewardBadgeContainerStyle1;
    injectProps.Svg = StarBadge1;
  }
  return {injectProps, containerNewStyle};
}