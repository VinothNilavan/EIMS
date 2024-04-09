/**
 * Topic list item
 * Upper Tag is in attempts or due date
 * isPriority and isRevice are upper left top strip
 */
import React from 'react';
import { View } from 'react-native';
import styles from '../../RoundedButton/indexCss';
import compStyles from './indexCss';
import PropTypes from 'prop-types';
import { getWp } from '@utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonBG, SvgCardTagRevice, Done } from '@images';
import { SVGImageBackground, BalooThambiRegTextView } from '@components';
import { SvgCssUri } from 'react-native-svg/css';
import { useLanguage } from '@hooks';

const WorksheetListItem = props => {
  const { testID, title, desc, leftImage, isRecentlyAnnounced, isStart, isInProgress,
    isExpired, isCompleted, upperTagText, onClickCallback, permissions
  } = props;

  const { startText, continueText, seeReportText, recentlyAnnouncedText } = useLanguage();
  let recentlyAnnouncedView = renderRecentlyAnnouncedView(isRecentlyAnnounced, permissions, recentlyAnnouncedText);

  return (
    <TouchableOpacity disabled={isCompleted} accessible={true} testID={testID} accessibilityLabel={testID} style={compStyles.topicItem} onPress={onClickCallback}>
      <SVGImageBackground testID="SVGImageBackgroundWorkSheetListItem" SvgImage={ButtonBG} style={styles.svgBgContainer}>
        <View style={compStyles.svgbg}>
          {upperTagText && (
            <View
              style={[
                compStyles.cardUpperTag,
                upperTagText && compStyles.highlightColor,
                isExpired && compStyles.submitColor,
              ]}>
              {upperTagText && (
                <BalooThambiRegTextView
                  testID="WorkSheetListItemUpperTagText"
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
              <View style={compStyles.imageHolder}>
                {leftImage.includes('.svg') && (
                  <SvgCssUri accessible={true} testID="WorkSheetListItemSvgUri" accessibilityLabel="WorkSheetListItemSvgUri" width="100%" height="100%" uri={leftImage} />
                )}
              </View>
            </View>
            <View key="btnMidContainer" style={compStyles.btnMidContainer}>
              <BalooThambiRegTextView testID="WorkSheetListItemTitle" style={{ ...compStyles.btnMidUpperText }}>
                {title}
              </BalooThambiRegTextView>
              <BalooThambiRegTextView testID="WorkSheetListItemDesc" style={{ ...compStyles.btnMidLowerText }}>
                {desc}
              </BalooThambiRegTextView>
            </View>
            {permissions.worksheetStatus && (
              <View
                key="btnRightContainer"
                style={compStyles.btnRightContainer}>
                {isCompleted && (
                  <Done
                    accessible={true}
                    testID="WorkSheetListItemDoneImg"
                    accessibilityLabel="WorkSheetListItemDoneImg"
                    style={compStyles.doneStyle}
                    height={getWp(24)}
                    width={getWp(24)}
                  />
                )}
                {(isStart || isExpired || isInProgress) && (
                  <BalooThambiRegTextView testID="WorkSheetListItemDetailsText" style={compStyles.buttonText}>
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

WorksheetListItem.propTypes = {
  testID: PropTypes.string,
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

WorksheetListItem.defaultProps = {
  testID: 'WorksheetListItem'
};

export default WorksheetListItem;

const renderRecentlyAnnouncedView = (isRecentlyAnnounced, permissions, recentlyAnnouncedText) => {
  let recentlyAnnouncedView = null;
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
