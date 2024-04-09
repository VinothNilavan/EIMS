import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { CardItem, Icon } from 'native-base';
import styles from './indexCss';
import { COLORS } from '@constants/COLORS';
import { RoundedButton, MyAutoHeightWebView, SourceSansProRegTextView } from '@components';
import { getHp, getWp } from '@utils';
import { ErrorClose } from '@images';
import { useLanguage } from '@hooks';

const HintBox = props => {
  const { showBtn, showHints, hintList, toggleCallback, trials } = props;
  const { previousHintText, nextHintText, showHintText, hintText } = useLanguage();
  const [currentPos, setCurrentPos] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  let isShowNext = false;
  let isShowPrev = false;

  useEffect(() => {
    ({ isShowNext, isShowPrev } = configShowNextPrev(hintList, isShowNext, isShowPrev, currentPos));
    setShowNext(isShowNext);
    setShowPrev(isShowPrev);
  }, [props]);

  if (hintList.length === 0) {
    return null;
  }

  const renderPrevAndNextButton = () => {
    return (
      <View key="btnContainer" style={styles.btnContainer}>
        {showPrev === true ? (
          <View key="prevBtnContainer" style={styles.prevBtnContainer}>
            <TouchableOpacity
              key="chevronPrevIconContainer"
              onPress={() => {
                setCurrentPos(currentPos - 1);
              }}
              style={styles.chevronPrevIconContainer}>
              <Icon
                key="chevronIcon"
                name="chevron-left"
                type="Entypo"
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
            <View key="prevTextContainer" style={styles.prevNextTextContainer}>
              <SourceSansProRegTextView style={styles.prevNextStyle}>
                {previousHintText}
              </SourceSansProRegTextView>
            </View>
          </View>
        ) : null}
        {showNext === true ? (
          <View key="nextBtnContainer" style={styles.nextBtnContainer}>
            <View key="nextTextContainer" style={styles.prevNextTextContainer}>
              <SourceSansProRegTextView style={styles.prevNextStyle}>
                {nextHintText}
              </SourceSansProRegTextView>
            </View>
            <TouchableOpacity
              onPress={() => {
                setCurrentPos(currentPos + 1);
              }}
              style={styles.chevronNextIconContainer}>
              <Icon
                name="chevron-right"
                type="Entypo"
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  if (!showBtn || trials > 1) {
    return null;
  } 
  else if (!showHints) { { console.log('returned'); }
  return (
      <View style={styles.hintBtnContainer}>
        <RoundedButton
          type="hintBlue"
          text={showHintText}
          textStyle={styles.hintBtnTextStyle}
          containerStyle={styles.hintBtnContainerStyle}
          width={getWp('90')}
          height={getHp('35')}
          onPress={() => {
            toggleCallback(true);
          }}
        />
      </View>
   );
  } else if (showHints) {
    return (
      <View style={styles.hintBtnContainer}>
        <RoundedButton
          type="hintBlue"
          text={hintText}
          textStyle={styles.hintBtnTextStyle}
          containerStyle={[
            styles.hintBtnContainerStyle,
            styles.positionAbsolute,
          ]}
          width={getWp('90')}
          height={getHp('35')}
          onPress={() => {
            toggleCallback(true);
          }}
        />
        <View style={styles.hintCard}>
          <View key="hintTextContainer" style={styles.hintTextContainer}>
            <MyAutoHeightWebView
              showsHorizontalScrollIndicator={true}
              style={styles.hintWebView}
              customScript={''}
              customStyle={'   '}
              onSizeUpdated={size => {
                console.log('height :', size.height);
              }}
              source={{
                html: `<p style="background-color:${COLORS.hintBg}; ">
                ${hintList[currentPos]}
              </p>`,
              }}
              zoomable={false}
            />
          </View>
          {(showPrev || showNext) && (
            <CardItem style={{ backgroundColor: COLORS.hintBg }}>
              {renderPrevAndNextButton()}
            </CardItem>
          )}
          <ErrorClose
            width={getWp(25)}
            height={getWp(25)}
            style={styles.closeIcon}
            onPress={() => {
              toggleCallback(false);
            }}
          />
        </View>
      </View>
    );
  }
};

HintBox.propTypes = {
  hintList: PropTypes.array,
  showBtn: PropTypes.bool,
  showHints: PropTypes.bool,
  toggleCallback: PropTypes.func,
};

HintBox.defaultProps = {
  hintList: [],
  showBtn: false,
  showHints: false,
};

export default HintBox;

const configShowNextPrev = (hintList, isShowNext, isShowPrev, currentPos) => {
  if (hintList.length === 1) {
    isShowNext = false;
    isShowPrev = false;
  } else if (hintList.length > 1) {
    if (currentPos == 0) {
      isShowNext = true;
      isShowPrev = false;
    } else if (currentPos === hintList.length - 1) {
      isShowNext = false;
      isShowPrev = true;
    } else {
      isShowNext = true;
      isShowPrev = true;
    }
  }
  return { isShowNext, isShowPrev };
}
