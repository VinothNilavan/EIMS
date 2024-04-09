import React, { useState } from 'react';
import { View, FlatList } from 'react-native';

import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';

import {
  RoundedButton,
  SmallRoundButton,
  PedagogyItem,
  BalooThambiRegTextView,
  SVGImageBackground,
} from '@components';
import { Coin } from '@images';
import { getHp } from '@utils';
import Collapsible from 'react-native-collapsible';
import styles from './indexCss';
import { COLORS } from '@constants';

import { useLanguage } from '@hooks';

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: -10,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const QnAHeader = props => {
  const {
    onHeaderBtnClick,
    showCollapsible,
    headerBtnText,
    sparkieCount,
    fromSkillQna
  } = props;
  const { sparkiesText } = useLanguage();
  const store = useStores();
  const { qnaStore } = useStores();
  const [isCollapsed, setisCollapsed] = useState(true);

  const collapsibleHandler = () => {
    setisCollapsed(prevState => !prevState);
  };

  const permissions =
    Object.keys(store.uiStore.menuDataPermissions).length > 0
      ? store.uiStore.menuDataPermissions.question
      : {};

  const renderProgressItem = data => {
    let bgColor = '';
    switch (data.item.state) {
      case 'in-progress':
        bgColor = COLORS.yellow;
        break;
      case 'passed':
        bgColor = COLORS.green;
        break;
      case 'failed':
        bgColor = COLORS.red;
        break;
      default:
        bgColor = COLORS.pedagogyGray;
        break;
    }
    return (
      <View>
        <PedagogyItem color={bgColor} />
      </View>
    );
  };

  let headerContainer = { ...styles.headerContainer };
  if (isCollapsed) {
    headerContainer = {
      ...styles.headerContainer,
      ...styles.headerContainerCollapsed,
    };
  }
  return (
    <View style={[headerContainer, isCollapsed ? null : shadow]}>
      <View style={[styles.innerContainer, { height: fromSkillQna ? getHp(110) : getHp(144) }]}>
        <SVGImageBackground SvgImage="bgHeader" themeBased screenBg>
          <View style={styles.innerSubContainer}>
            <View style={styles.pedagogyContainer}>
              <FlatList
                keyExtractor={(item, index) => `${index}`}
                contentContainerStyle={styles.pedagogyListContainer}
                data={
                  qnaStore.contentHeaderInfo.pedagogyChild
                    ? qnaStore.contentHeaderInfo.pedagogyChild.progress
                    : []
                }
                horizontal={true}
                renderItem={renderProgressItem}
              />
            </View>
            <View style={styles.titleContainer}>
              <BalooThambiRegTextView
                numberOfLines={2}
                ellipsizeMode='tail'
                style={styles.headerTitle}>
                {qnaStore.contentHeaderInfo.pedagogyName
                  ? qnaStore.contentHeaderInfo.pedagogyName
                  : ''}
              </BalooThambiRegTextView>
            </View>
          </View>
          <View style={styles.headerBtnContainer}>
            <RoundedButton
              type="squareOrange"
              text={headerBtnText}
              textStyle={styles.headerBtnText}
              containerStyle={styles.headerBtnStyle}
              width={styles.headerBtn.width}
              height={styles.headerBtn.height}
              onPress={onHeaderBtnClick}
            />
          </View>
        </SVGImageBackground>
      </View>
      {showCollapsible && (
        <Collapsible collapsed={isCollapsed}>
          <View style={styles.collapsibleContainer} key="collapsibleView">
            <View key="description" style={styles.collapsibleSubContainer}>
              <View key="blueCount" style={styles.blueCountContainer}>
                <BalooThambiRegTextView style={styles.blueCountText}>
                  {qnaStore.contentHeaderInfo.pedagogyProgress
                    ? qnaStore.contentHeaderInfo.pedagogyProgress
                      .currentUnitNum +
                    '/' +
                    qnaStore.contentHeaderInfo.pedagogyProgress.totalUnits
                    : ''}
                </BalooThambiRegTextView>
              </View>

              <BalooThambiRegTextView style={styles.pedChildTitle}>
                {qnaStore.contentHeaderInfo.pedagogyChild
                  ? qnaStore.contentHeaderInfo.pedagogyChild.name
                  : ''}
              </BalooThambiRegTextView>
            </View>
            {permissions.mySparkies && (
              <View key="sparkyProgressView" style={styles.sparkieContainer}>
                <View style={styles.sparkieImgContainer}>
                  <Coin
                    width={styles.sparkieImg.width}
                    height={styles.sparkieImg.height}
                  />
                </View>
                <View key="sparkyPts" style={styles.sparkiePointsContainer}>
                  <BalooThambiRegTextView style={styles.sparkiePtsVal}>
                    {sparkieCount}
                  </BalooThambiRegTextView>

                  <BalooThambiRegTextView style={styles.sparkiePtsLabel}>
                    {sparkiesText}
                  </BalooThambiRegTextView>
                </View>
              </View>
            )}
          </View>
        </Collapsible>
      )}
      {showCollapsible && (
        <View
          style={[
            styles.collapsibleBtnContainer,
            !isCollapsed ? { bottom: -getHp(10) } : '',
          ]}>
          <SmallRoundButton
            onPress={collapsibleHandler}
            iconStyle={{}}
            width={styles.collBtn.width}
            height={styles.collBtn.height}
            iconName={isCollapsed ? 'down' : 'up'}
            iconColor={COLORS.white}
            iconTheme="Entypo"
            type="elevatedOrange"
          />
        </View>
      )}
    </View>
  );
};

export default observer(QnAHeader);
