import React from 'react';
import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import styles from './indexCss';
import { RewardSection } from '@components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { toJS } from 'mobx';
import { TitleItem } from './TitleComponent';
import { EmptyComponent } from '../BadgeList/badgeComponents';
import { REWARD_TYPES, GET_SORTED_REWARD_TYPES, REWARD_TYPES_SECTION } from '@constants';
import LinearGradient from 'react-native-linear-gradient';
import { getWp } from '@utils';
import { useToggleSection } from '@hooks';

const TitleList = props => {
  const { testID, setRewardShowCase, selectedReward } = props;
  const store = useStores();
  const { toggleState, toggleSection } = useToggleSection();
  const permissions =
    Object.keys(store.uiStore.menuDataPermissions).length > 0
      ? store.uiStore.menuDataPermissions.reward
      : {};
  permissions.titles = true;
  let TITLES =
    store.appStore.rewardData != null &&
      store.appStore.rewardData.titles != null
      ? //&& store.appStore.rewardData?.titles?.length > 0
      GET_SORTED_REWARD_TYPES(store.appStore.rewardData.titles)
      : GET_SORTED_REWARD_TYPES({ upComing: [], onGoing: [], earned: [] });

  const RenderTitle = ({ item, titleRewardSectionType }) => {
    let WrapperComponent;
    let isItemSelected = item?.titleID == selectedReward?.item?.titleID;
    let selectedTitleStyle = {};
    if (isItemSelected) {
      selectedTitleStyle = styles.linearGradientViewStyle;
      WrapperComponent = LinearGradient;
    } else {
      WrapperComponent = View;
    }
    return (
      <View
        style={{
          flexDirection: 'column',
          width: getWp(127),
          alignItems: 'center',
          justifyContent: 'flex-start',
          alignContent: 'flex-end',
          marginVertical: 10,
        }}>
        <WrapperComponent
          accessible={true}
          testID={`RewardShowCaseRenderTitle${item.titleID}`}
          colors={[`#FD6F4300`, `#FD6F4365`, `#FD6F43C6`]}
          style={{
            margin: 10,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              setRewardShowCase({
                type: REWARD_TYPES.TITLES,
                item: { ...item, category: titleRewardSectionType },
              })
            }
            key={item.titleID}
          >
            <TitleItem
              item={item}
              titleRewardSectionType={titleRewardSectionType}
            />
          </TouchableOpacity>
        </WrapperComponent>
      </View>
    );
  };
  const RenderTitles = ({
    testID,
    titleCategory,
    titles,
    titleRewardSectionType,
  }) => {
    let ramTitles = toJS(titles);

    let titlesData =
      ramTitles.length > 3 && !toggleState[titleRewardSectionType].isVisible
        ? ramTitles.slice(0, 3)
        : ramTitles;
    return (
      <RewardSection
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        title={titleCategory}
        rewardSectionChildContainer={styles.rewardSectionChildContainer}
        contentLength={ramTitles.length}
        onViewAllPress={() => toggleSection(titleRewardSectionType)}
        isViewAll={toggleState[titleRewardSectionType].isVisible}>
        <View style={styles.itemListContainer}>
          {titles.length > 0 ? (
            <FlatList
              horizontal={false}
              data={titlesData}
              renderItem={({ item }) => (
                <RenderTitle
                  item={item}
                  titleRewardSectionType={titleRewardSectionType}
                />
              )}
              numColumns={3}
              keyExtractor={(item, index) => `${item.studentName}-${index}`}
            />
          ) : (
            <EmptyComponent />
          )}
        </View>
      </RewardSection>
    );
  };
  const InitTitles = () => {

    const composeTitles = Object.keys(TITLES).map(titleRewardSectionType => {
      let titleCategory = REWARD_TYPES_SECTION[REWARD_TYPES.TITLES][titleRewardSectionType];
      return (
        <RenderTitles
          testID={testID}
          titleCategory={titleCategory}
          titles={TITLES[titleRewardSectionType]}
          titleRewardSectionType={titleRewardSectionType}
        />
      );
    });
    return composeTitles;
  };
  return (
    <ScrollView>
      {permissions.myBadge && Object.keys(TITLES).length > 0 && <InitTitles />}
    </ScrollView>
  );
};

TitleList.propTypes = {
  testID: PropTypes.string,
  rewardShowCaseDetails: PropTypes.func.isRequired,
};

TitleList.defaultProps = {
  testID: 'TitleList',
};

export default observer(TitleList);