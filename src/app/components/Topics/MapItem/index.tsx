/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import styles from './indexCss';
import PropTypes from 'prop-types';
import { useStores } from '@mobx/hooks';
import { useLanguage } from '@hooks';

import {
  MapNumber,
  MapProfile,
  MapEdge,
  BalooThambiRegTextView,
} from '@components';

const MapItem = props => {
  const {
    testID,
    type,
    text,
    topicName,
    showTopArrow,
    showBottomArrow,
    isActive,
    showProfile,
    percentage,
    topEdgeOnFinishCallback,
    bottomEdgeOnFinishCallback,
    topEdgePlay,
    bottomEdgePlay,
    animationDuration,
    showFlag,
    profileUrl,
  } = props;
  const store = useStores();
  const isRTL = store?.uiStore?.isRTL;
  const { goText } = useLanguage();

  const renderRight = () => {
    return (
      <View accessible={true} testID={`MapItemRenderRight${testID}`} accessibilityLabel={`MapItemRenderRight${testID}`} style={styles.rightRenderContainer}>
        {showTopArrow && (
          <View style={styles.rightTopArrowContainer}>
            <MapEdge
              testID={`MapEdgeRightMapItemRenderRight${testID}`}
              playOnce={isActive && topEdgePlay ? true : false}
              type="right"
              duration={animationDuration}
              style={styles.rightTopEdge}
              onAnimationFinish={topEdgeOnFinishCallback}
            />
          </View>
        )}
        <View style={styles.proNumTitleContainer}>
          <View style={styles.titleContainer}>
            <BalooThambiRegTextView testID={`MapItemRenderRightTopicName${testID}`} style={styles.title}>
              {topicName}
            </BalooThambiRegTextView>
          </View>
          <View style={styles.rightProNumContainer}>
            {showProfile ? (
              <MapProfile
                testID={`MapItemRenderRightMapProfileProfileUrl${testID}`}
                profileUrl={profileUrl}
                showFlag={showFlag}
                isActive={isActive}
                percentage={percentage}
                position="right"
                containerStyle={styles.rightProfileContainer}
                unitStatus={bottomEdgePlay}
              />
            ) : (
              <MapNumber
                testID={`MapNumberMapItemRenderRightText${testID}`}
                text={text}
                isActive={isActive}
                percentage={percentage}
                showFlag={showFlag}
                position="right"
                containerStyle={styles.rightNumContainer}
              />
            )}
          </View>
        </View>
        {showBottomArrow && (
          <View style={styles.rightBtmArrowContainer}>
            <MapEdge
              testID={`MapEdgeLeftMapItemRenderRight${testID}`}
              duration={animationDuration}
              playOnce={bottomEdgePlay ? true : false}
              type="left"
              style={styles.rightBtmEdge}
              onAnimationFinish={bottomEdgeOnFinishCallback}
            />
          </View>
        )}
      </View>
    );
  };

  const renderLeft = () => {
    return (
      <View accessible={true} testID={`MapItemRenderLeft${testID}`} accessibilityLabel={`MapItemRenderLeft${testID}`} style={styles.leftRenderContainer}>
        {showTopArrow && (
          <View style={styles.leftTopArrowContainer}>
            <MapEdge
              testID={`MapEdgeLeftMapItemRenderLeft${testID}`}
              duration={animationDuration}
              playOnce={isActive && topEdgePlay ? true : false}
              type="left"
              style={styles.leftTopEdge}
              onAnimationFinish={topEdgeOnFinishCallback}
            />
          </View>
        )}
        <View style={styles.proNumTitleContainer}>
          <View style={styles.leftProNumContainer}>
            {showProfile ? (
              <MapProfile
                testID={`MapItemRenderLeftMapProfileProfileUrl${testID}`}
                profileUrl={profileUrl}
                showFlag={showFlag}
                isActive={isActive}
                position="left"
                percentage={percentage}
                containerStyle={styles.leftProfileContainer}
                unitStatus={bottomEdgePlay}
              />
            ) : (
              <MapNumber
                testID={`MapNumberMapItemRenderLeftText${testID}`}
                text={text}
                isActive={isActive}
                showFlag={showFlag}
                position="left"
                percentage={percentage}
              />
            )}
          </View>
          <View style={styles.leftTitleContainer}>
            <BalooThambiRegTextView testID={`MapItemRenderLeftTopicName${testID}`} style={styles.title}>
              {topicName}
            </BalooThambiRegTextView>
          </View>
        </View>
        {showBottomArrow ? (
          <View style={styles.leftBtmArrowContainer}>
            <MapEdge
              testID={`MapEdgeRightMapItemRenderLeft${testID}`}
              playOnce={bottomEdgePlay ? true : false}
              type="right"
              duration={animationDuration}
              style={styles.leftBtmEdge}
              onAnimationFinish={bottomEdgeOnFinishCallback}
            />
          </View>
        ) : null}
      </View>
    );
  };

  const renderInitial = () => {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.mapContainer}>
            {showProfile === true && isActive === true ? (
              <MapProfile
                testID={`MapItemRenderInitialMapProfileProfileUrl${testID}`}
                profileUrl={profileUrl}
                containerStyle={{}}
                isActive={isActive}
                percentage={0}
                unitStatus={bottomEdgePlay}
              />
            ) : (
              <MapNumber
                testID={`MapNumberMapItemRenderInitial${testID}`}
                containerStyle={{}}
                isActive={isActive}
                percentage={0}
                position='initial'
                text={goText ? goText : 'GO'}
              />
            )}
          </View>
          <View style={isRTL ? styles.isRTLInitialPosition : styles.initialPositionStyle}>
            <MapEdge
              testID={`MapEdgeInitialMapItemRenderInitial${testID}`}
              playOnce={isActive && topEdgePlay ? true : false}
              type={isRTL ? "right" : "initial"}
              duration={animationDuration}
              style={isRTL ? styles.RTLrightTopEdge : styles.edgeStyle}
              onAnimationFinish={topEdgeOnFinishCallback}
            />
          </View>
        </View>
      </View>
    );
  };

  if (type == 'initial') {
    return renderInitial();
  } else if (type == 'left') {
    return renderLeft();
  } else if (type == 'right') {
    return renderRight();
  }
};

MapItem.propTypes = {
  testID: PropTypes.string
};

MapItem.defaultProps = {
  testID: 'MapItem'
};
export default MapItem;
