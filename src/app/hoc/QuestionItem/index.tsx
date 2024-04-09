import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { Base64 } from 'js-base64';
import Footer from './Footer';
import {
  Clock,
  StarAdd,
  CorrectAnswer,
  WrongAnswer,
  StarAdded,
  ChallengeQuestion,
  Activitysvg,
} from '@images';
import { Question, PassageDialog, getNewHtmlTemplate } from '@hoc';
import {
  BalooThambiRegTextView,
  SourceSansProBoldTextView,
  SVGImageBackground,
  RoundedButton,
} from '@components';
import { useLanguage, UseSound } from '@hooks';
import { useStores } from '@mobx/hooks';

import styles from './indexCss';
import { getWp, getHp, replaceString } from '@utils';
import { COLORS } from '@constants/COLORS';
import DeviceInfo from 'react-native-device-info';

const QuestionItem = props => {
  const {
    response,
    seqNum,
    howIDid,
    permissions,
    showStarQues,
    isFromStarredQuestions,
    fromCommonReport,
  } = props;
  let { StarSvg, onPressStar } = props;
  const { playSound } = UseSound();
  const [passageShow, setPassageShow] = useState(false);
  const [questionContent, setQuestionContent] = useState('');
  const [loading, setLoading] = useState(true)

  const {
    conceptText,
    skippedLabel,
    questionText,
    timeTakenText,
    challengeQuestionText,
    viewPassageText,
  } = useLanguage();

  const { uiStore } = useStores();
  const isRTL = uiStore.isRTL;

  const questionData = response.data;

  let type = questionData?.template; //MCQ/Blank/Dropdown/Blank_Dropdown/Interactive
  if (type == 'Game') {
    type = 'Introduction';
  }
  let concept = response.concept;
  let questionNumber = response.Q_id;
  let timeTaken = response?.userAttemptData?.timeTaken;
  let explanation = questionData.explanation;

  if (!howIDid && explanation) {
    explanation = Base64.decode(explanation);
  }

  useEffect(() => {
    if (fromCommonReport) {
      let htmlTempleate = getNewHtmlTemplate(response);
      setTimeout(() => {
        setQuestionContent(htmlTempleate);
        setLoading(false)
      }, Platform.OS === 'ios' ? 1 : 5000);
    }
  }, []);

  let isCorrect =
    response.userAttemptData && response.userAttemptData.result === 'pass';
  let isSkipped =
    response.userAttemptData && (response?.data?.template != 'Introduction' &&
      response?.data?.template != 'Game') && response.userAttemptData.result === 'skip';

  let conceptView = null;
  let AnswerStatusSvg = CorrectAnswer;

  if (concept) {
    conceptView = (
      <View style={styles.generic.conceptContainer}>
        <BalooThambiRegTextView styles={styles.generic.conceptText}>
          {replaceString(conceptText, 'concept', concept)}
        </BalooThambiRegTextView>
      </View>
    );
  }

  if (type == 'Introduction') {
    conceptView = (
      <View>
        <BalooThambiRegTextView styles={styles.generic.conceptText}>
          {replaceString(conceptText, 'concept', concept)}
        </BalooThambiRegTextView>
      </View>
    );
  }

  if (howIDid && response?.contentMode === 'Challenge') {
    let skipped = null;
    if (Object.keys(response?.userAttemptData?.userResponse).length === 0 && !isSkipped) {
      skipped = (
        <BalooThambiRegTextView style={styles.skippedText}>
          {skippedLabel}
        </BalooThambiRegTextView>
      );
    }
    conceptView = (
      <View style={styles?.generic?.conceptContainer}>
        <SVGImageBackground
          containerStyle={{
            height: DeviceInfo.isTablet() ? getHp(45) : getHp(35),
            flex: 1,
            marginTop: 10,
          }}
          testID="<SVGImageBackgroundQuestionLabel"
          SvgImage={ChallengeQuestion}>
          <BalooThambiRegTextView
            testID="QuestionLabeltagText"
            style={{
              fontSize: getWp(14),
              color: COLORS.white,
              paddingLeft: '20%',
              paddingRight: '10%',
              paddingVertical: getHp(2),
              marginLeft: getWp(20),
              marginTop: getHp(5),
            }}>
            {challengeQuestionText}
          </BalooThambiRegTextView>
        </SVGImageBackground>

        {skipped}
      </View>
    );
  }

  if (!isCorrect) {
    AnswerStatusSvg = WrongAnswer;
  }

  if (response.isFavourite || isFromStarredQuestions) {
    StarSvg = StarAdded;
  } else {
    StarSvg = StarAdd;
  }

  let passageData = null;
  let passageView = null;
  if (response?.passageData && response?.passageData?._id) {
    passageData = response?.passageData;
    passageView = (
      <View style={isRTL ? styles.RTLpassageView : styles.passageView}>
        <View style={{ flex: 1 }}>
          <SourceSansProBoldTextView
            style={[styles.generic.questionText, styles.generic.passageText]}>
            {passageData?.title}
          </SourceSansProBoldTextView>
        </View>
        <View style={{ flex: 1 }}>
          <RoundedButton
            type="elevatedOrange"
            text={viewPassageText}
            textStyle={styles.footerButtonText}
            containerStyle={
              isRTL ? styles.RTLFooterButton : styles.footerButton
            }
            width={getWp(180)}
            height={getHp(50)}
            onPress={() => setPassageShow(true)}
          />
        </View>
      </View>
    );
  }

  return (
    <View key="container" style={styles.generic.container}>
      {passageData && (
        <PassageDialog
          isVisible={passageShow}
          passageData={passageData}
          onPress={() => setPassageShow(false)}
        />
      )}
      <View
        key="questionContainer"
        style={[
          styles.generic.innerContainer,
          permissions.viewExplanation ? null : styles.generic.roundedBottom,
        ]}>
        {passageView}
        {type == 'Introduction' && <View style={styles?.generic?.conceptContainer}>
          <SVGImageBackground
            containerStyle={{ height: getHp(35) }}
            testID="<SVGImageBackgroundQuestionLabel"
            SvgImage={Activitysvg}
          />
        </View>}
        <View
          style={
            isRTL
              ? styles.generic.RTLquestionTimeTakenContainer
              : styles.generic.questionTimeTakenContainer
          }>
          {seqNum || questionNumber ? (
            <View
              style={
                isRTL
                  ? styles.generic.RTLquestionContainer
                  : styles.generic.questionContainer
              }>
              <SourceSansProBoldTextView style={styles.generic.questionText}>
                {`${questionText} ${seqNum ? seqNum : questionNumber}`}
              </SourceSansProBoldTextView>
              <View>
                {type === 'Introduction' &&
                  <BalooThambiRegTextView>{response?.data?.name}</BalooThambiRegTextView>}
              </View>
              {isSkipped ? (
                <BalooThambiRegTextView style={styles.skippedText}>
                  {skippedLabel}
                </BalooThambiRegTextView>
              ) : (
                <View>
                  {permissions.correct &&
                    type != 'Introduction' &&
                    permissions.wrong && (
                      <AnswerStatusSvg
                        width={styles.generic.questionSvg.width}
                        height={styles.generic.questionSvg.height}
                      />
                    )}
                </View>
              )}
            </View>
          ) : null}

          {permissions.timeTaken && timeTaken ? (
            <View
              style={
                isRTL
                  ? styles.generic.RTLtimeContainer
                  : styles.generic.timeContainer
              }>
              <Clock
                width={styles.generic.timeSvg.width}
                height={styles.generic.timeSvg.height}
                style={
                  isRTL ? styles.generic.RTLtimeSvg : styles.generic.timeSvg
                }
              />
              <BalooThambiRegTextView styles={styles.generic.timeText}>
                {`${timeTakenText} ${timeTaken} sec`}
              </BalooThambiRegTextView>
            </View>
          ) : null}
        </View>
        {conceptView}
        {loading ? <ActivityIndicator style={{ alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }} /> :
          fromCommonReport && type != 'Introduction' ? questionContent :
            <Question
              style={styles?.generic?.questions}
              userAnswer={
                type === 'MCQ' ?
                  response?.userAttemptData?.userResponse?.mcqPattern ?
                    response?.userAttemptData?.userResponse?.mcqPattern?.userAnswer
                    : response?.userAttemptData?.userResponse?.userAnswer
                  : 0
              }
              question={questionData}
              qresponse={response}
              showAns={howIDid}
              permissions={permissions}
              onSoundBtnClicked={playSound}
            />
        }
      </View>
      {permissions.viewExplanation &&
        String(type) != 'Introduction' ? (
        <Footer
          type={type}
          userAttemptData={response?.userAttemptData}
          explanation={explanation}
          qdata={response?.data?.response}
          response={response}
          howIDid={howIDid}
          onSoundBtnClicked={playSound}
        />
      ) : null}
      <View style={styles.generic.star}>
        {permissions.removeButton && showStarQues && (
          <StarSvg
            width={styles.generic.starSvg.width}
            height={styles.generic.starSvg.height}
            onPress={onPressStar}
          />
        )}
        {permissions.starredQuestions && showStarQues && (
          <StarSvg
            width={styles.generic.starSvg.width}
            height={styles.generic.starSvg.height}
            onPress={onPressStar}
          />
        )}
      </View>
    </View>
  );
};

QuestionItem.propTypes = {};

QuestionItem.defaultProps = {
  showAns: true,
  showTimeTaken: true,
  showAnswerStatus: true,
  howIDid: true,
  StarSvg: StarAdd,
  showStarQues: true,
  isFromStarredQuestions: false,
};

export default React.memo(QuestionItem);
