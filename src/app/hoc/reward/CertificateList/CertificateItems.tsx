import React, { memo } from 'react';
import { View, Image } from 'react-native';
import styles from './indexCss';
import { RewardCertificate, BalooThambiRegTextView } from '@components';
import { CorrectAnswer, SelectedBadgeSVG, GrayStar, GrayChamp } from '@images';
import { getWp, getHp } from '@utils';
import { STRINGS, REWARD_TYPES_CATEGORY_CERTIFICATES } from '@constants';
import { isTablet } from '@utils';

export const CertificateItem = memo(props => {
  const { item, type, isSelectedBadge } = props;

  return (
    <View style={{ alignItems: 'center' }}>
      {isSelectedBadge && item?.isApplied && (
        <View style={styles.selectedCertificateSVGContainer}>
          <SelectedBadgeSVG width={getWp(95)} heigth={getWp(150)} preserveAspectRatio={'none'} />
        </View>
      )}
      <View style={styles.certificateItemContainer}>
        <RewardCertificate testID={'certificateItem'} iconUrl={item?.certificateIcon} type={type} />
        <BalooThambiRegTextView style={styles.certificateItemText}> {item.name} </BalooThambiRegTextView>
        {item.isApplied != undefined && item.isApplied ? (
          <CorrectAnswer width={getWp(21)} height={getWp(21)} style={styles.checkMarkContainer} />
        ) : null}
      </View>
    </View>
  );
});



export const EmptyCertificateComponent = ({ type = REWARD_TYPES_CATEGORY_CERTIFICATES.STAR }) => {
  let imgIcon = GrayStar;
  let champStarString = STRINGS.emptyCertificateStar
  let iconStyle = styles.imageContainer;
  let marginLeft = 30;

  if (type == REWARD_TYPES_CATEGORY_CERTIFICATES.CHAMP) {
    imgIcon = GrayChamp;
    champStarString = STRINGS.emptyCertificateChamp;
    iconStyle = [{ ...styles.imageContainer, height: 65, width: 80 }];
    marginLeft = 0;
  }
  return (
    <View style={[{ ...styles.emptyContainer }, { marginBottom: type == REWARD_TYPES_CATEGORY_CERTIFICATES.CHAMP ? getHp(45) : 0 } ]}>
      <View styel={{ width: '20%' }}>
        <Image style={iconStyle} source={imgIcon} />
      </View>
      <View style={{ width: isTablet() ? '90%' : '80%', marginLeft, paddingRight: 10 }}>
        <BalooThambiRegTextView style={styles.emptyStateText} numberOfLines={0}> {champStarString} </BalooThambiRegTextView>
      </View>
    </View >
  );
};