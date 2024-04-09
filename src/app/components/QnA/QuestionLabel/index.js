/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { COLORS } from '@constants/COLORS';
import {
  HomeWork,
  ReviceTag,
  HlTag,
  TimedTest,
  EffortTag,
  WorkSheet,
  ChallengeQuestion,
} from '@images';

import { SVGImageBackground, BalooThambiRegTextView } from '@components';
import { useStores } from '@mobx/hooks';
import { getWp, getHp } from '@utils';
import { useLanguage } from '@hooks';

const QuestionLabel = props => {
  const store = useStores();
  const { worksheetLabel, challengeQuestionText, effortLabel, higherLevelLabel, homeWorkLabel, reviseLabel, daLabel } = useLanguage();

  let type
  if (store.qnaStore.contentHeaderInfo.pedagogyType === 'homework' || store.qnaStore.contentHeaderInfo.pedagogyType === 'worksheet') {
    type = store.qnaStore.contentHeaderInfo.pedagogyType
      ? store.qnaStore.contentHeaderInfo.pedagogyType
      : null;
  } else {
    type = store.qnaStore.contentData.contentSubMode
      ? store.qnaStore.contentData.contentSubMode
      : null;
  }
  let svgLabel = null;
  let tagText = null;
  switch (type) {
    case 'challenge':
      svgLabel = ChallengeQuestion;
      tagText = challengeQuestionText;
      break;
    case 'remediation':
      svgLabel = EffortTag;
      tagText = effortLabel;
      break;
    case 'higherLevel':
      svgLabel = HlTag;
      tagText = higherLevelLabel;
      break;
    case 'timedTest':
      break;
    case 'homework':
      svgLabel = HomeWork;
      tagText = homeWorkLabel;
      break;
    case 'revise':
      svgLabel = ReviceTag;
      tagText = reviseLabel;
      break;
    case 'worksheet':
      svgLabel = WorkSheet;
      tagText = worksheetLabel;
      break;
    case 'da':
      svgLabel = ReviceTag;
      tagText = daLabel;
      break;
    default:
      return null;
  }

  if (type === 'timedTest') {
    return <TimedTest width={getWp(150)} />;
  }

  return (
    <SVGImageBackground
      testID="<SVGImageBackgroundQuestionLabel"
      SvgImage={svgLabel}>
      <BalooThambiRegTextView
        testID="QuestionLabeltagText"
        style={{
          fontSize: getWp(14),
          color: COLORS.white,
          paddingLeft: getWp(35),
          paddingRight: getWp(30),
          paddingVertical: getHp(2),
          marginLeft: getWp(10),
        }}>
        {tagText}
      </BalooThambiRegTextView>
    </SVGImageBackground>
  );
};

QuestionLabel.propTypes = {};

QuestionLabel.defaultProps = {};

export default QuestionLabel;
