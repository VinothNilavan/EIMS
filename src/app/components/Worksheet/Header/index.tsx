import React, { useState } from 'react';
import { View, Image, Platform } from 'react-native';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { useLanguage } from '@hooks';
import DeviceInfo from 'react-native-device-info';
import {
  RoundedButton,
  SmallRoundButton,
  BalooThambiRegTextView,
  SVGImageBackground,
  Pagination,
} from '@components';
import Collapsible from 'react-native-collapsible';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { COLORS } from '@constants';

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
  const { testID, onPressBtn, onPaginationItemPressed, permissions } = props;
  const { closeText, sparkiesText } = useLanguage();
  const { qnaStore } = useStores();
  const [isCollapsed, setisCollapsed] = useState(true);

  const collapsibleHandler = () => {
    setisCollapsed(prevState => !prevState);
  };

  let headerContainer = { ...styles.headerContainer };
  if (isCollapsed) {
    headerContainer = {
      ...styles.headerContainer,
      ...styles.headerContainerCollapsed,
    };
  }

  const getNumberOfLine = configNumberOfLine(isCollapsed)

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={[headerContainer, isCollapsed ? null : shadow]}>
      <View style={styles.innerContainer}>
        <SVGImageBackground
          testID="SVGImageBackgroundWorksheetHeader"
          SvgImage="bgHeader"
          themeBased
          screenBg>
          <View style={styles.innerSubContainer}>
            <View style={styles.pedagogyContainer}>
              {qnaStore?.contentHeaderInfo &&
                qnaStore?.contentHeaderInfo?.pedagogyProgress?.unitList.length >
                0 &&
                permissions?.questionNavigation && (
                  <Pagination
                    unitlist={
                      qnaStore?.contentHeaderInfo?.pedagogyProgress?.unitList
                    }
                    selectedIndex={
                      qnaStore?.contentHeaderInfo?.pedagogyProgress
                        ?.currentUnitNum
                    }
                    callback={onPaginationItemPressed}
                  />
                )}
            </View>
            <View style={{ flex: 1, width: '100%', height: '50%', flexShrink: 1 }}>
              <BalooThambiRegTextView
                testID="WorksheetHeaderPedagogyName"
                numberOfLines={getNumberOfLine()}
                style={styles.headerTitle}>
                {qnaStore?.contentHeaderInfo?.pedagogyName
                  ? qnaStore?.contentHeaderInfo?.pedagogyName
                  : ''}
              </BalooThambiRegTextView>
            </View>


          </View>
          <View style={styles.headerBtnContainer}>
            <RoundedButton
              testID="RoundedButtonWorksheetHeaderCloseText"
              type="squareOrange"
              text={closeText}
              textStyle={styles.headerBtnText}
              containerStyle={styles.headerBtnStyle}
              width={styles.headerBtn.width}
              height={styles.headerBtn.height}
              onPress={onPressBtn}
            />
          </View>
        </SVGImageBackground>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.collapsibleContainer} key="collapsibleView">
          <View key="description" style={styles.collapsibleSubContainer}>
            <BalooThambiRegTextView
              testID="WorkSheetHeaderPedagogyChild"
              style={styles.pedChildTitle}>
              {qnaStore?.contentHeaderInfo?.pedagogyChild
                ? qnaStore?.contentHeaderInfo?.pedagogyChild.name
                : ''}
            </BalooThambiRegTextView>
          </View>
          {permissions?.mySparkies && (
            <View key="sparkyProgressView" style={styles.sparkieContainer}>
              <Image
                accessible={true}
                testID="WorkSheetHeaderSparkyImage"
                accessibilityLabel="WorkSheetHeaderSparkyImage"
                source={require('@images/sparky.png')}
              />
              <View key="sparkyPts" style={styles.sparkiePointsContainer}>
                <BalooThambiRegTextView
                  testID="WorkSheetHeaderRewardInfo"
                  style={styles.sparkiePtsVal}>
                  {qnaStore.contentHeaderInfo?.rewardInfo
                    ? qnaStore.contentHeaderInfo?.rewardInfo.sparkie
                    : ''}
                </BalooThambiRegTextView>

                <BalooThambiRegTextView
                  testID="WorkSheetHeaderSparkiesTest"
                  style={styles.sparkiePtsLabel}>
                  {sparkiesText}
                </BalooThambiRegTextView>
              </View>
            </View>
          )}
        </View>
      </Collapsible>
      {permissions?.mySparkies && <View style={styles.collapsibleBtnContainer}>
        <SmallRoundButton
          testID="RoundedBottonWorkSheetHeader"
          onPress={collapsibleHandler}
          iconStyle={{}}
          width={styles.collBtn.width}
          height={styles.collBtn.height}
          iconName={isCollapsed ? 'down' : 'up'}
          iconColor={COLORS.white}
          iconTheme="Entypo"
          type="elevatedOrange"
        />
      </View>}
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

function configNumberOfLine(isCollapsed) {
  return () => {
    if (isCollapsed) {
      if (Platform.isPad || DeviceInfo.isTablet()) {
        return 2;
      } else {
        return 1;
      }
    }
    return 4;
  };
}

