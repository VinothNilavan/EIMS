import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Dimensions, Text } from 'react-native';
import styles from './indexCss';
import { COLORS } from '@constants/COLORS';
import { ExplanationCorrect, ExplanationWrong, SoundSvg } from '@images';
import DeviceInfo from 'react-native-device-info';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useLanguage } from '@hooks';

import {
  SourceSansProBoldTextView,
  CorrectMCQ,
  MyAutoHeightWebView,
  CorrectMultiSelectMCQ,
  ClassificationCorrectAnswer,
  MatchListCorrectAnswer,
  OrderingCorrectAnswer,
  SortListCorrectAnswer,
} from '@components';


import { getWp } from '@utils';
import { useStores } from '@mobx/hooks';
import PropTypes from 'prop-types';

const Explanation = props => {
  const {
    testID,
    explanation,
    type,
    isCorrect,
    mcqData,
    audioData,
    onSoundBtnClicked,
    response,
  } = props;
  const { correctAnswerTextOther, explainationText } = useLanguage();
  const { uiStore } = useStores();
  const [newHeight, setnewHeight] = useState(hp('1'));
  const isRTL = uiStore.isRTL;

  const renderTitleView = () => {
    return (
      <View style={isRTL ? styles.RTLtitleContainer : styles.titleContainer}>
        {audioData && audioData !== '' ? (
          <TouchableOpacity
            style={styles.soundIconContainer}
            onPress={() => onSoundBtnClicked(audioData)}>
            <SoundSvg width={getWp(20)} height={getWp(20)} />
          </TouchableOpacity>
        ) : null}
        {explanation ? (
          <SourceSansProBoldTextView style={styles.titleText}>
            {explainationText}
          </SourceSansProBoldTextView>
        ) : null}
      </View>
    );
  };

  const checkforHardWareAccelerationDisabled = () => {
    return Platform.OS === 'android' && !DeviceInfo.isTablet() && newHeight > Dimensions.get('window').height ? true : false;
  }

  const correctAnsLabelText = () => {
    return ['MatchList', 'Classification', 'Ordering', 'SortList'].includes(type) ? `${correctAnswerTextOther}:` : ''
  }

  const renderOptionItem = () => {
    switch (type) {
      case 'MCQ':
        if (response?.multiResponse) {
          return <CorrectMultiSelectMCQ response={response} />;
        } else {
          return (
            <CorrectMCQ
              isCorrect={isCorrect}
              response={response}
              mcqData={mcqData}
            />
          );
        }
      case 'Classification':
        return <ClassificationCorrectAnswer response={response} />;
      case 'MatchList':
        return <MatchListCorrectAnswer response={response} />;
      case 'Ordering':
        return (
          <OrderingCorrectAnswer
            response={response}
            onSoundBtnClicked={onSoundBtnClicked}
          />
        );
      case 'SortList':
        return (
          <SortListCorrectAnswer
            response={response}
            questionType={response?.questionType}
          />
        );
    }
  };

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      key="container"
      style={[styles.container, { borderTopColor: isCorrect ? COLORS.explanationGreen : COLORS.explanationRed }]}>
      <View
        key="correctWrongLabel"
        style={isRTL ? styles.RTLCorrectWrongLabelContainer : styles.correctWrongLabelContainer}>

        {isCorrect === true ? (
          <ExplanationCorrect
            accessible={true}
            testID="ExplanationCorrect"
            accessibilityLabel="ExplanationCorrect"
          />
        ) : (
          <ExplanationWrong
            accessible={true}
            testID="ExplanationCorrect"
            accessibilityLabel="ExplanationCorrect"
          />
        )}
        <Text style={styles.correctAnsSubtitleText}> {correctAnsLabelText()} </Text>
      </View>
      {renderOptionItem()}
      {renderTitleView()}

      <MyAutoHeightWebView
        showsHorizontalScrollIndicator={true}
        testID="MyAutoHeightWebViewExplanation"
        style={styles.webviewContainer}
        onSizeUpdated={size => {
          setnewHeight(size.height + hp('2'));
        }}
        androidAcceleration={checkforHardWareAccelerationDisabled() ? 'false' : 'true'}
        androidLayerType={checkforHardWareAccelerationDisabled() ? 'hardware' : 'software'}
        source={{ html: explanation }}
        zoomable={false}
      />
      <View
        accessible={true}
        testID="ExplanationSeperateView"
        accessibilityLabel="ExplanationSeperateView"
        style={styles.separateView}
      />
    </View>
  );
};

Explanation.propTypes = {
  testID: PropTypes.string,
  enableMultiSelectMCQ: PropTypes.bool,
  onSoundBtnClicked: PropTypes.func,
};

Explanation.defaultProps = {
  testID: 'Explanation',
  enableMultiSelectMCQ: false,
  onSoundBtnClicked: () => { console.log('sound btn clicked'); },
};
export default Explanation;
