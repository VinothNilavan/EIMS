import React, { useState,useRef } from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import { RewardSection } from '@components';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { toJS } from 'mobx';
import { CertificateItem, EmptyCertificateComponent } from './CertificateItems';
import { REWARD_TYPES, REWARD_TYPES_SECTION } from '@constants';
import { useToggleCertificateSection } from '@hooks';
import LinearGradient from 'react-native-linear-gradient';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { getHp } from '@utils';

const CertificateList = props => {
  const { testID, setRewardShowCase, selectedReward } = props;
  const store = useStores();
  const { toggleState, toggleSection } = useToggleCertificateSection();
  const scrollViewRef = useRef();

  const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.reward : {};
  permissions.certificates = true;
  let certificatesSpark = store.appStore.rewardData != null && store.appStore.rewardData.certificates != null ?
    store.appStore.rewardData.certificates : { star: [], champ: [] };

  const RenderCertificates = ({ item, certificateRewardSectionType }) => {
    const isSelectedBadge = REWARD_TYPES.CERTIFICATES == selectedReward.type && item.certificateID == selectedReward.item.certificateID;

    let WrapperComponent;
    let isItemSelected = item?.certificateID == selectedReward?.item?.certificateID;
    let selectedTitleStyle = {};
    if (isItemSelected) {
      selectedTitleStyle = styles.linearGradientViewStyle;
      WrapperComponent = LinearGradient;
    } else {
      WrapperComponent = View;
    }

    if (item?.isApplied) {
      WrapperComponent = View;
    }

    return (
      <View
        style={styles.certificateBaseStyle}>
        <WrapperComponent
          accessible={true}
          testID={`RewardShowCaseRenderTitle${item.certificateID}`}
          colors={[`#FD6F4300`, `#FD6F4365`, `#FD6F43C6`]}
          style={{
            margin: 10,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              setRewardShowCase({
                type: REWARD_TYPES.CERTIFICATES,
                item: { ...item, category: certificateRewardSectionType },
              })
            }
            key={item.titleID} >
            <CertificateItem item={item} type={certificateRewardSectionType} isSelectedBadge={isSelectedBadge} />
          </TouchableOpacity>
        </WrapperComponent>
      </View>
    );
  };

  const onViewAllPress =(certificateRewardSectionType)=>{
    scrollViewRef.current.scrollTo({
        x: 0,
        y: 200,
        animated: true,
      });
      toggleSection(certificateRewardSectionType)
  }

  const RenderSectionCertificates = ({ testID, titleCategory, titles, certificateRewardSectionType }) => {
    let ramTitles = toJS(titles);

    let titlesData = ramTitles.length > 3 && !toggleState[certificateRewardSectionType].isVisible ? ramTitles.slice(0, 3) : ramTitles;
    return (
      <RewardSection
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        title={titleCategory}
        rewardSectionChildContainer={styles.rewardSectionChildContainer}
        contentLength={ramTitles.length}
        onViewAllPress={()=>{onViewAllPress(certificateRewardSectionType)}}
        isInfoIcon={true}
        certificateType={certificateRewardSectionType}
        isViewAll={toggleState[certificateRewardSectionType].isVisible}>
        <View style={[{...styles.itemListContainer} , {marginBottom :  titlesData.length === 0  ? 0 : getHp(20)}]}>
          <FlatList
            horizontal={false}
            data={titlesData}
            renderItem={({ item }) => (<RenderCertificates item={item} certificateRewardSectionType={certificateRewardSectionType} />)}
            numColumns={3}
            keyExtractor={item => item.name}
            ListEmptyComponent={<EmptyCertificateComponent type={certificateRewardSectionType} />}
          />
        </View>
      </RewardSection >
    );
  };

  const InitCertificates = () => {
    const composeTitles = Object.keys(certificatesSpark).map(certificateRewardSectionType => {
      let titleCategory = REWARD_TYPES_SECTION[REWARD_TYPES.CERTIFICATES][certificateRewardSectionType];
      let certificateItemValue = certificatesSpark[certificateRewardSectionType]
      let certificateValue = certificateItemValue != null ? certificateItemValue : [];
      return (
        <RenderSectionCertificates testID={testID} titleCategory={titleCategory}
          titles={certificateValue} certificateRewardSectionType={certificateRewardSectionType}
        />
      );
    });
    return composeTitles;
  };

  return (<ScrollView ref={scrollViewRef}>
    {permissions.myBadge && Object.keys(certificatesSpark).length > 0 && <InitCertificates />}
  </ScrollView>);
  
};

CertificateList.propTypes = {
  testID: PropTypes.string,
  rewardShowCaseDetails: PropTypes.func.isRequired,
};

CertificateList.defaultProps = {
  testID: 'CertificateList',
};

export default observer(CertificateList);