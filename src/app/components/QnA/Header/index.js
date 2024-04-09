import React, { useState, useEffect } from 'react';
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
import { Coin, LeaderboardIcon } from '@images';
import { getHp, getWp } from '@utils';
import Collapsible from 'react-native-collapsible';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { COLORS, ScreenNames } from '@constants';
import { useLanguage } from '@hooks';
import { useNavigation } from '@react-navigation/native';

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

const Header = props => {
  const { testID, onPressBtn, permissions, onClick } = props;
  const { qnaStore } = useStores();
  const store = useStores();
  const { userData } = store.appStore;
  let userType = userData.isB2CUser ? 'B2C' : 'B2B';
  const navigation = useNavigation();
  const { doneBtnText, sparkiesText } = useLanguage();

  const [isCollapsed, setisCollapsed] = useState(true);
  const [sparkieCount, setSparkieCount] = useState(0);
  const [currentUnitNum, setCurrentUnitNum] = useState(1);

  const collapsibleHandler = () => {
    setisCollapsed(prevState => !prevState);
    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    if (qnaStore.contentHeaderInfo.rewardInfo) {
      if (qnaStore.contentHeaderInfo.rewardInfo.sparkie != sparkieCount) {
        setSparkieCount(qnaStore.contentHeaderInfo.rewardInfo.sparkie);
      }
    }
  }, [qnaStore?.contentHeaderInfo?.rewardInfo && qnaStore?.contentHeaderInfo?.rewardInfo?.sparkie]);


  useEffect(() => {
    if (qnaStore.contentHeaderInfo.pedagogyProgress) {
      if (qnaStore.contentHeaderInfo.pedagogyProgress
        .currentUnitNum != currentUnitNum) {
        setCurrentUnitNum(qnaStore.contentHeaderInfo.pedagogyProgress
          .currentUnitNum);
      }
    }
  }, [qnaStore?.contentHeaderInfo?.pedagogyProgress && qnaStore?.contentHeaderInfo?.pedagogyProgress
    ?.currentUnitNum]);

  const isProgressNumVisible =
    qnaStore.contentData.contentSubMode != 'higherLevel' &&
    qnaStore.contentData.contentSubMode != 'revise';

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
        <PedagogyItem testID="PedagogyItemQnAHeader" color={bgColor} />
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
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={[headerContainer, isCollapsed ? null : shadow]}>
      <View style={styles.innerContainer}>
        <SVGImageBackground SvgImage="bgHeader" themeBased screenBg>
          <View style={styles.innerSubContainer}>
            <View style={styles.headerBtnContainer}>
              <RoundedButton
                testID="RoundedButtonQnAHeaderDoneBtn"
                type="squareOrange"
                text={doneBtnText}
                textStyle={styles.headerBtnText}
                containerStyle={styles.headerBtnStyle}
                width={styles.headerBtn.width}
                height={styles.headerBtn.height}
                onPress={onPressBtn}
              />
            </View>
            <View style={styles.titleContainer}>
              <BalooThambiRegTextView
                numberOfLines={2}
                ellipsizeMode='tail'
                testID="QnAHeaderPedagogyName"
                style={styles.headerTitle}>
                {qnaStore.contentHeaderInfo.pedagogyName
                  ? qnaStore.contentHeaderInfo.pedagogyName
                  : ''}
              </BalooThambiRegTextView>
            </View>
          </View>
        </SVGImageBackground>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.collapsibleContainer} key="collapsibleView">
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
          <View key="description" style={styles.collapsibleSubContainer}>
            {isProgressNumVisible && (
              <View key="blueCount" style={styles.blueCountContainer}>
                <BalooThambiRegTextView
                  testID="QnAHeaderPedagogyProgress"
                  style={styles.blueCountText}>
                  {qnaStore.contentHeaderInfo.pedagogyProgress
                    ? qnaStore.contentHeaderInfo.pedagogyProgress
                      .currentUnitNum +
                    '/' +
                    qnaStore.contentHeaderInfo.pedagogyProgress.totalUnits
                    : ''}
                </BalooThambiRegTextView>
              </View>
            )}

            <BalooThambiRegTextView style={styles.pedChildTitle}>
              {qnaStore.contentHeaderInfo.pedagogyChild
                ? qnaStore.contentHeaderInfo.pedagogyChild.name
                : ''}
            </BalooThambiRegTextView>
          </View>
          {permissions?.mySparkies && (
            <View key="sparkyProgressView" style={styles.sparkieContainer}>
              <View style={styles.sparkieImgContainer}>
                <Coin
                  accessible={true}
                  testID="QnAHeaderCoinImg"
                  accessibilityLabel="QnAHeaderCoinImg"
                  width={styles.sparkieImg.width}
                  height={styles.sparkieImg.height}
                />
              </View>
              <View key="sparkyPts" style={styles.sparkiePointsContainer}>
                <View style={styles.LeaderAndSparkieContainer}>
                  <View>
                    <BalooThambiRegTextView
                      testID="QnAHeaderInfo"
                      style={styles.sparkiePtsVal}>
                      {qnaStore.contentHeaderInfo.rewardInfo
                        ? qnaStore.contentHeaderInfo.rewardInfo.sparkie
                        : ''}
                    </BalooThambiRegTextView>
                    <BalooThambiRegTextView
                      testID="QnAHeaderSparkiesText"
                      style={styles.sparkiePtsLabel}>
                      {sparkiesText}
                    </BalooThambiRegTextView>
                  </View>
                  {userType == 'B2C' ?
                    <LeaderboardIcon onPress={() => {
                      navigation.navigate(ScreenNames.Leaderboard);
                    }}
                      style={styles.leadericonStyle}
                      width={getWp(56)} height={getHp(52)} />
                    : null}
                </View>
              </View>
            </View>
          )}
        </View>
      </Collapsible>
      <View
        style={[
          styles.collapsibleBtnContainer,
          !isCollapsed ? { bottom: -getHp(10) } : '',
        ]}>
        <SmallRoundButton
          testID="SmallRoundButtonQnAheader"
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
    </View>
  );
};

Header.propTypes = {
  testID: PropTypes.string,
};

Header.defaultProps = {
  testID: 'Header',
};

export default observer(Header);
