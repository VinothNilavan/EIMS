import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './indexCss';
import {
  MyAutoHeightWebView,
  SoundButton,
  SourceSansProBoldTextView,
  SourceSansProRegTextView,
} from '@components';

import PropTypes from 'prop-types';
import { COLORS } from '@constants';
import getHtmlTemplate from '@utils/getHtmlTemplate';
import { useStores } from '@mobx/hooks';

const OrderingQuestions = props => {
  const { item, index, drag, isExplaination, onSoundBtnClicked, fromCommonReportScreen } = props;
  const { uiStore } = useStores();
  const isRTL = uiStore.isRTL;
  const [QuestionText, set_QuestionText] = useState([]);
  useEffect(() => {
    let questionText = getHtmlTemplate(item.value, false, isRTL);
    set_QuestionText(questionText);
  }, []);

  return (
    <View style={isRTL ? styles.RTLContainer : styles.container}>
      {item?.voiceover && item?.voiceover !== '' ? (
        <SoundButton
          onPress={() =>
            onSoundBtnClicked(`orderingVO${index}`, item?.voiceover)
          }
          isRTL={isRTL}
        />
      ) : null}
      <TouchableOpacity
        style={[
          isRTL ? styles.RTLoptionContainer : styles.optionContainer,
          {
            backgroundColor: isExplaination
              ? COLORS.white
              : COLORS.sortListQuestionBackgroundColor,
          },
        ]}
        onLongPress={drag}
        disabled={isExplaination}>
        <View style={styles.indexContainer}>
          <SourceSansProBoldTextView style={styles.indexText}>
            {index != undefined ? String.fromCharCode(index + 65) : String.fromCharCode(item.index + 65)}
          </SourceSansProBoldTextView>
        </View>
        <View
          style={styles.arrangeLetterContainerChildView}
          accessible={false}
          pointerEvents={'none'}>
          {fromCommonReportScreen ?
            <SourceSansProRegTextView> {item.value} </SourceSansProRegTextView>
            : QuestionText && <MyAutoHeightWebView
              key="mcqItemWebView"
              style={styles.webviewContainer}
              customScript={''}
              onSizeUpdated={size => { console.log(size.height) }}
              source={{ html: QuestionText }}
              zoomable={false}
            />
          }
        </View>
      </TouchableOpacity>
    </View>
  );
};

OrderingQuestions.propTypes = {
  isExplaination: PropTypes.bool,
};

OrderingQuestions.defaultProps = {
  isExplaination: false,
};

export default OrderingQuestions;
