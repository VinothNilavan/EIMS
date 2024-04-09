/**
 * Topic list item
 * Upper Tag is in attempts or due date
 * isPriority and isRevice are upper left top strip
 */
import React, { useContext } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonBG, SvgCardTagRevice, ReviceTag, Lock } from '@images';
import {
  SVGImageBackground,
  BalooThambiRegTextView,
  SimpleLottie,
} from '@components';
import { SvgCssUri } from 'react-native-svg/css';
import { ThemeContext } from '@contexts/theme-context';
import { themeSvg } from '@themeSvgs';
import compStyles from './indexCss';
import PropTypes from 'prop-types';
import { useLanguage } from '@hooks';
import { getHp } from '@utils';

const ListItem = props => {
  const theme = useContext(ThemeContext);
  const {
    title,
    desc,
    leftImage,
    percentage,
    isActive,
    isLocked,
    isPriority,
    isRevice,
    isUpperTag,
    upperTagText,
    onClickCallback,
    priorityCount,
  } = props;

  const { reviseLabel, priorityLabel } = useLanguage();

  const Progress0 = themeSvg[theme.name].progress0;
  const Progress30 = themeSvg[theme.name].progress30;
  const Progress60 = themeSvg[theme.name].progress60;

  let cardTag = null;
  let cardUpperTag = null;
  let disabledStyle = {};
  let rightSvgText = null;
  let RightImage = null;
  let percentageComplete = parseInt(percentage);


  cardTag = (
    <View style={{ position: 'absolute', top: getHp('6.5') }}>
      {isPriority ?
        <View style={compStyles.cardTag}>
          <SVGImageBackground
            SvgImage={SvgCardTagRevice}
            style={compStyles.cardTagSvgStyle}>
            <BalooThambiRegTextView style={compStyles.cardTagText}>
            {`${priorityLabel}  ${priorityCount ? priorityCount : ""}`}
            </BalooThambiRegTextView>
          </SVGImageBackground>
        </View> : null}
      {isRevice ?
        <View style={[compStyles.cardTag, { top: 3 }]}>
          <SVGImageBackground
            SvgImage={ReviceTag}
            style={compStyles.cardTagSvgStyle}>
            <BalooThambiRegTextView style={compStyles.cardTagText}>
              {reviseLabel}
            </BalooThambiRegTextView>
          </SVGImageBackground>
        </View> : null}
    </View>
  );





  if (isUpperTag) {
    cardUpperTag = (
      <View style={compStyles.cardUpperTag}>
        <BalooThambiRegTextView style={compStyles.cardUpperTagText}>
          {upperTagText}
        </BalooThambiRegTextView>
      </View>
    );
  }

  if (percentage && percentage != -1) {
    let percentStr = `${percentage}%`;
    rightSvgText = (
      <BalooThambiRegTextView style={compStyles.rightSvgText}>
        {percentStr}
      </BalooThambiRegTextView>
    );
  }

  if (!isActive) {
    disabledStyle = { ...compStyles.disabledStyle };
  }

  switch (true) {
    case percentageComplete == 0:
      RightImage = (
        <Progress0
          width={compStyles.rightSvgStyle.width}
          height={compStyles.rightSvgStyle.height}
        />
      );
      break;
    case percentageComplete > 0 && percentageComplete <= 30:
      RightImage = (
        <Progress30
          width={compStyles.rightSvgStyle.width}
          height={compStyles.rightSvgStyle.height}
        />
      );
      break;
    case percentageComplete > 30 && percentageComplete < 90:
      RightImage = (
        <Progress60
          width={compStyles.rightSvgStyle.width}
          height={compStyles.rightSvgStyle.height}
        />
      );
      break;
    case percentageComplete > 90:
      RightImage = (
        <SimpleLottie
          jsonFileName="progress100"
          theme={theme.name}
          styles={compStyles.rightLottieStyle}
        />
      );
      break;
    default:
      break;
  }
  if (isLocked) {
    RightImage = <Lock />;
    rightSvgText = null;
  }

  return (
    <TouchableOpacity style={compStyles.topicItem} onPress={onClickCallback}>
      <SVGImageBackground SvgImage={ButtonBG} style={compStyles.svgBgContainer}>
        <View style={compStyles.svgbg}>
          <View key="btnContainer" style={compStyles.btnContainer}>
            <View key="btnLeftContainer" style={compStyles.btnLeftContainer}>
              <View style={compStyles.imageHolder}>
                {leftImage.includes('.svg') && (
                  <SvgCssUri width="100%" height="100%" uri={leftImage} />
                )}
              </View>
            </View>
            <View key="btnMidContainer" style={compStyles.btnMidContainer}>
              <BalooThambiRegTextView
                style={{ ...compStyles.btnMidUpperText, ...disabledStyle }}>
                {title}
              </BalooThambiRegTextView>
              <BalooThambiRegTextView
                style={{ ...compStyles.btnMidLowerText, ...disabledStyle }}>
                {desc}
              </BalooThambiRegTextView>
            </View>
            <View key="btnRightContainer" style={compStyles.btnRightContainer}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {percentage === -1 ? null : RightImage}
                {rightSvgText}
              </View>
            </View>
          </View>
          {cardTag}
          {cardUpperTag}
        </View>
      </SVGImageBackground>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  leftImage: PropTypes.string,
  SvgRight: PropTypes.number,
  percentage: PropTypes.number,
  rightJson: PropTypes.string,
  isActive: PropTypes.bool,
  showAttempt: PropTypes.string,
  isPriority: PropTypes.bool,
  isRevice: PropTypes.bool,
  isUpperTag: PropTypes.bool,
  upperTagText: PropTypes.string,
  type: PropTypes.string,
  textStyle: PropTypes.object,
  onClickCallback: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

ListItem.defaultProps = {
  isDisabled: false,
  leftImage: '',
};

export default React.memo(ListItem);
