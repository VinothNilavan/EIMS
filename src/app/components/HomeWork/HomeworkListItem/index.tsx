/**
 * Homework list item
 * Upper Tag is in attempts or due date
 * isPriority and isRevice are upper left top strip
 */
import React from 'react';
import { View } from 'react-native';
import styles from '../../RoundedButton/indexCss';
import compStyles from './indexCss';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonBG, SvgCardTagRevice } from '@images';
import { SVGImageBackground, BalooThambiRegTextView } from '@components';
import { useLanguage } from '@hooks';
import { SvgCssUri } from 'react-native-svg/css';

const HomeworkListItem = props => {
  const {
    title,
    desc,
    leftImage,
    isRecentlyAnnounced,
    isStart,
    isBackgroundRed,
    isInProgress,
    isExpired,
    upperTagText,
    onClickCallback,
    permissions,
  } = props;

  const { recentlyAnnouncedText, startText, continueText, seeReportText } = useLanguage();

  let recentlyAnnouncedView = configRecentlyAnnouncedView(isRecentlyAnnounced, permissions, recentlyAnnouncedView, recentlyAnnouncedText);

  return (
    <TouchableOpacity style={compStyles.topicItem} onPress={onClickCallback}>
      <SVGImageBackground SvgImage={ButtonBG} style={styles.svgBgContainer}>
        <View style={compStyles.svgbg}>
          {upperTagText && (
            <View
              style={[
                compStyles.cardUpperTag,
                upperTagText && isBackgroundRed ? compStyles.highlightRedColor : compStyles.highlightColor,
                isExpired && compStyles.submitColor,
              ]}>
              {upperTagText && (
                <BalooThambiRegTextView
                  style={[
                    compStyles.cardTagText,
                    isExpired && compStyles.submitTextColor,
                  ]}>
                  {upperTagText}
                </BalooThambiRegTextView>
              )}
            </View>
          )}
          {recentlyAnnouncedView}
          <View
            key="btnContainer"
            style={[
              compStyles.btnContainer,
              !isRecentlyAnnounced && compStyles.marginTop,
            ]}>
            <View key="btnLeftContainer" style={compStyles.btnLeftContainer}>
              {leftImage !== '' && typeof leftImage !== 'undefined'
                && leftImage.indexOf('http') > -1 && leftImage.indexOf('https') > -1
                && <View style={compStyles.imageHolder}>{ }
                  <SvgCssUri width="100%" height="100%" uri={leftImage} />
                </View>}
            </View>
            <View key="btnMidContainer" style={compStyles.btnMidContainer}>
              <BalooThambiRegTextView style={{ ...compStyles.btnMidUpperText }}>
                {title}
              </BalooThambiRegTextView>
              <BalooThambiRegTextView style={{ ...compStyles.btnMidLowerText }}>
                {desc}
              </BalooThambiRegTextView>
            </View>
            {permissions.homeworkStatus && (
              <View
                key="btnRightContainer"
                style={compStyles.btnRightContainer}>
                {(isStart || isExpired || isInProgress) && (
                  <BalooThambiRegTextView style={compStyles.buttonText}>
                    {isStart && startText}
                    {isInProgress && continueText}
                    {isExpired && seeReportText}
                  </BalooThambiRegTextView>
                )}
              </View>
            )}
          </View>
        </View>
      </SVGImageBackground>
    </TouchableOpacity>
  );
};

HomeworkListItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  leftImage: PropTypes.string,
  onClickCallback: PropTypes.func.isRequired,
  isRecentlyAnnounced: PropTypes.bool,
  isStart: PropTypes.bool,
  isInProgress: PropTypes.bool,
  isExpired: PropTypes.bool,
  isCompleted: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  upperTagText: PropTypes.string,
  permissions: PropTypes.array,
};

HomeworkListItem.defaultProps = {};

export default HomeworkListItem;

const configRecentlyAnnouncedView = (isRecentlyAnnounced, permissions, recentlyAnnouncedView, recentlyAnnouncedText) => {
  if (isRecentlyAnnounced && permissions.recentlyAnnounced) {
    recentlyAnnouncedView = (
      <View style={compStyles.cardTag}>
        <SVGImageBackground
          SvgImage={SvgCardTagRevice}
          style={compStyles.cardTagSvgStyle}>
          <BalooThambiRegTextView style={compStyles.cardTagText}>
            {recentlyAnnouncedText}
          </BalooThambiRegTextView>
        </SVGImageBackground>
      </View>
    );
  }
  return recentlyAnnouncedView;
}

