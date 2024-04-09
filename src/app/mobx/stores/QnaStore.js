import { observable, action, makeObservable } from 'mobx';

export class QnaStore {
  @observable inputData = [];
  @observable loader = false;
  @observable trialCount = 1;
  @observable userAttempt = 1;
  @observable inputResponse = {};
  @observable selectedTopic = {};
  @observable priorityTopic = {};
  @observable mode = '';
  @observable isQnaSkip = false;

  @observable topicId = '';
  @observable worksheetID = '';
  @observable hints = [];
  @observable conditions = [];
  @observable explanation = '';
  @observable showExplanation = false;

  @observable nextQuestionRes = {};

  @observable questionRes = {};
  @observable sessionInformation = {};
  @observable userInfo = {};
  @observable redirectionData = {};
  @observable contentHeaderInfo = {};
  @observable sparkieCount = 0;
  @observable contentData = {};
  @observable currentQuestion = {};
  @observable sessionTimeExceeded = false;
  @observable isSubmitBtnVisible = false;
  @observable isNextBtnVisible = false;
  @observable isSkipBtnVisible = false;
  @observable isAnswerCorrect = false;
  @observable isMotivationBuddy = false;
  @observable isHintVisible = false;
  @observable enableActivityStartModal = false;
  @observable enableActivitySkipButton = false;
  @observable enableRewardCollectModal = false;
  @observable titleRewardObject = {};
  @observable activityButtonType = '';
  @observable disiableBtn = false;
  @observable isOpenActivity = false;
  @observable SubmitNextButtonState = -1;

  //TimeTest
  @observable isTimeTest = false;
  @observable timeTextQuestions = [];
  @observable timeTestData = {};
  @observable questionIndex = 0;
  @observable timeTestUserAnswers = [];
  @observable correctAnswerCount = 0;
  @observable timeTaken = 0;
  @observable isTimeUp = false;
  @observable isTimeTestDone = false;
  @observable multiResponse = false;
  @observable isLastQuestion = false;
  @observable isReadPassageBtnVisible = false;
  @observable isViewQuestionBtnVisible = false;
  @observable responseValidation = {};
  @observable passageData = {};

  //EDICINE Worksheet related
  @observable worksheetResponse = {};
  @observable nextContentSeqNum = 0;
  @observable selectedChoice = -1;
  @observable userResponse = {};
  @observable isOpenedFirstTime = false;
  @observable isSubmitEnabled = false;
  @observable timed = false;
  @observable worksheetInfo = {};

  constructor() {
    makeObservable(this);
  }
  // EDICINE Homework Related
  @observable homeworkID = '';
  @observable homeworkInfo = {};
  @observable homeworkSolution = '';
  @observable homeworkSolutionAttachment = null;
  @observable enableAttachmentModal = false;
  @observable enableHomeworkAttentionModal = false;

  //Effort popup
  @observable isEffortpopupVisible = false;

  /**
   * Worksheet Passage Related
   */
  @observable enableViewWordMeaningButton = false;
  @observable hasVideoPaused = false;
  @observable hasVideoEnd = false;
  @observable enableViewQuestionButton = false;
  @observable hasViewMeaningBtnVisibility = false;
  @observable wordMeaningCurrentPosition = 0;
  @observable wordMeaningData = [];
  @observable enableWordMeaning = false;
  @observable wordMeaningStatus = false;

  //QnA Video
  @observable visibleQnAVideoModal = false;
  @observable QnAVideoURL = '';
  @observable QnAVideoCaptionURL: '';

  //Higher Level Question related
  @observable isHigherLevelQuestion = false;

  //BuddyImage related
  @observable showDefaultBuddy = true;

  @action reset() {
    this.inputData = [];
    this.isAnswerCorrect = false;
    this.isMotivationBuddy = false;
    this.trialCount = 1;
    this.inputResponse = {};
    this.hints = [];
    this.conditions = [];
    this.explanation = '';
    this.showExplanation = false;
    this.questionRes = {};
    this.sessionInformation = {};
    this.userInfo = {};
    this.redirectionData = {};
    this.contentHeaderInfo = {};
    this.contentData = {};
    this.currentQuestion = {};
    this.sessionTimeExceeded = false;
    this.isSubmitBtnVisible = false;
    this.isNextBtnVisible = false;
    this.isEffortpopupVisible = false;
    this.isHintVisible = false;
    this.isTimeTest = false;
    this.timeTextQuestions = [];
    this.timeTestData = {};
    this.questionIndex = 0;
    this.timeTestUserAnswers = [];
    this.correctAnswerCount = 0;
    this.timeTaken = 0;
    this.isTimeUp = false;
    this.isTimeTestDone = false;
    this.multiResponse = false;
    this.isLastQuestion = false;
    this.isReadPassageBtnVisible = false;
    this.isViewQuestionBtnVisible = false;
    this.responseValidation = {};
    this.passageData = {};
    this.sparkieCount = 0;
    this.isSkipBtnVisible = false;
    this.enableActivityStartModal = false;
    this.enableRewardCollectModal = false;
    this.titleRewardObject = {};
    this.activityButtonType = '';
    this.disiableBtn = false
    this.userAttempt = 1;
    this.SubmitNextButtonState = -1;

    /**
     * EDICINE WORKSHEET related
     */
    this.selectedChoice = -1;
    this.nextContentSeqNum = 0;
    this.userResponse = {};
    this.isOpenedFirstTime = false;
    this.isSubmitEnabled = false;
    this.timed = false;
    /**
     * Ends
     */

    // Edicine Homework
    this.homeworkSolution = '';
    this.homeworkSolutionAttachment = null;
    this.enableAttachmentModal = false;

    /**
     * Video Passage
     */
    this.enableWordMeaning = false;
    this.hasViewMeaningBtnVisibility = false;
    this.wordMeaningCurrentPosition = 0;
    this.wordMeaningData = [];

    this.enableViewWordMeaningButton = false;
    this.hasVideoPaused = false;
    this.hasVideoEnd = false;
    this.enableViewQuestionButton = false;
    this.wordMeaningStatus = false;

    //QnA Video
    this.visibleQnAVideoModal = false;
    this.QnAVideoURL = '';
    this.QnAVideoCaptionURL = '';
    //BuddyImage related
    this.showDefaultBuddy = true;
  }

  @action hideSubmitAndNext() {
    this.isSubmitBtnVisible = false;
    this.isNextBtnVisible = false;
  }

  @action hideSubmitAndNextWithHandleAllCases() {
    // SubmitNextButtonState
    //  0 ---> (both submit & next Buttons disable)
    //  1 ---> ( Only for submitButton ) 
    //  2 ---> (Only for NextButton ) 
    //  3 ---> (For Both Buttons Enable) 
    if (!this.isSubmitBtnVisible && !this.isNextBtnVisible) {
      this.SubmitNextButtonState = 0;
    } else if (this.isSubmitBtnVisible && this.isNextBtnVisible) {
      this.SubmitNextButtonState = 3;
    } else if (this.isSubmitBtnVisible) {
      this.SubmitNextButtonState = 1;
    } else {
      this.SubmitNextButtonState = 2;
    }
    this.isSubmitBtnVisible = false;
    this.isNextBtnVisible = false;
  }

  @action UnhideSubmitAndNextWithHandleAllCases() {
    // SubmitNextButtonState
    //  0 ---> (both submit & next Buttons disable)
    //  1 ---> ( Only for submitButton ) 
    //  2 ---> (Only for NextButton ) 
    //  3 ---> (For Both Buttons Enable) 
    if (this.SubmitNextButtonState === 0) {
      this.isSubmitBtnVisible = false;
      this.isNextBtnVisible = false;
    } else if (this.SubmitNextButtonState === 1) {
      this.isSubmitBtnVisible = true;
      this.isNextBtnVisible = false;
    } else if (this.SubmitNextButtonState === 2) {
      this.isSubmitBtnVisible = false;
      this.isNextBtnVisible = true;
    } else {
      this.isSubmitBtnVisible = true;
      this.isNextBtnVisible = true;
    }
    this.SubmitNextButtonState = -1;
  }




  @action showSubmit() {
    this.isSubmitBtnVisible = true;
    this.isNextBtnVisible = false;
    this.isSkipBtnVisible = false;
  }

  @action hideSkip() {
    this.isSkipBtnVisible = false;
  }

  @action updateUserAttempt(attempt) {
    this.userAttempt = attempt;
  }

  @action setDisableBTn(flag) {
    this.disiableBtn = flag;
  }

  @action showSkip() {
    this.isSkipBtnVisible = true;
  }

  @action skipQnaQuestion() {
    this.isQnaSkip = true;
  }

  @action hideHint() {
    this.isHintVisible = false;
  }

  @action showHint() {
    this.isHintVisible = true;
  }

  @action setTrials(count) {
    this.trialCount = count;
  }

  @action setActivitySkipButton(status) {
    this.enableActivitySkipButton = status;
  }

  @action showNextBtn() {
    this.isSubmitBtnVisible = false;
    this.isNextBtnVisible = true;
    this.isViewQuestionBtnVisible = false;
    this.isReadPassageBtnVisible = false;
    this.isSkipBtnVisible = false;
    this.hasViewMeaningBtnVisibility = false;
  }

  @action showEffortpopup() {
    this.isEffortpopupVisible = true;
  }

  @action hideEffortpopup() {
    this.isEffortpopupVisible = false;
  }

  @action setNextQuestionData(data) {
    this.nextQuestionRes = data;
  }

  @action setLoader(show) {
    this.loader = show;
  }

  @action setPriorityTopic(data) {
    this.priorityTopic = data;
  }

  @action initTimedTest(response) {
    this.isTimeTest = true;
    this.timeTestData = response;
    if (response.childContents) {
      this.timeTextQuestions = response.childContents.data;
      if (this.timeTextQuestions && this.timeTextQuestions.length > 0) {
        this.contentData.data[0] = response.childContents.data[0];
        this.currentQuestion = response.childContents.data[0];
      }
    }
    if (this.currentQuestion.template == 'MCQ') {
      this.hideSubmitAndNext();
    } else {
      this.showSubmit();
    }
  }

  @action setTimeTaken(time) {
    this.timeTaken = time;
  }

  @action saveTimeTestResponse(userResponse) {
    this.timeTestUserAnswers.push(userResponse);
    this.questionIndex = this.questionIndex + 1;
  }

  @action saveTimeTestResponseAndShowNext(userResponse) {
    this.timeTestUserAnswers.push(userResponse);
    this.questionIndex = this.questionIndex + 1;
    this.contentData.contentSeqNum = this.questionIndex + 1;
    this.currentQuestion = this.timeTextQuestions[this.questionIndex];
    this.contentData.data[0] = this.timeTextQuestions[this.questionIndex];
    if (this.currentQuestion.template == 'MCQ') {
      this.hideSubmitAndNext();
    } else {
      this.showSubmit();
    }
  }

  @action setIsTimeUp(timeUp) {
    this.isTimeUp = timeUp;
  }

  @action setIsTimeTestDone(done) {
    this.isTimeTestDone = done;
  }

  // Homework Related
  @action setHomeworkID(homeworkID) {
    this.homeworkID = homeworkID;
  }

  @action setHomeworkInfo(homeworkInfo) {
    this.homeworkInfo = homeworkInfo;
  }

  @action setHomeworkSolution(value) {
    this.homeworkSolution = value;
  }

  @action setHomeworkSolutionAttachment(attachment) {
    this.homeworkSolutionAttachment = attachment;
  }

  @action setEnableAttachmentModal(enabled) {
    this.enableAttachmentModal = enabled;
  }

  @action setEnableHomeworkAttentionModal(enabled) {
    this.enableHomeworkAttentionModal = enabled;
  }

  /**
   *
   * EDICINE Worksheet related
   */
  @action setSelectedChoice(index) {
    console.log('\n\n----selectedChoiceUpdate', index);
    this.selectedChoice = index;
  }
  @action setUserResponse(response) {
    this.userResponse = response;
  }
  @action setIsOpenedFirstTime(bool) {
    this.isOpenedFirstTime = bool;
  }
  @action setIsSubmitEnabled(bool) {
    this.isSubmitEnabled = bool;
  }

  @action setWorksheetInfo(data) {
    this.worksheetInfo = data;
  }

  //Higher Question Related
  @action setIsHigherLevelQuestion(data) {
    this.isHigherLevelQuestion = data;
  }

  /**
   *
   * Ends
   */

  @action init(response) {
    this.isQnaSkip = false;
    this.isMotivationBuddy = false;
    this.userAttempt = 1;
    this.questionRes = response;
    this.sessionInformation = response.sessionInformation;
    this.userInfo = response.userInfo;
    this.redirectionData = response.redirectionData;
    this.sessionTimeExceeded =
      response.redirectionData &&
      response.redirectionData.sessionTimeExceededFlag &&
      response.redirectionData.sessionTimeExceededFlag;
    this.contentHeaderInfo = response.contentHeaderInfo;
    this.contentData = response.contentData;

    if (
      response?.contentData?.hasOwnProperty('passageData') &&
      response?.contentData?.passageData &&
      response?.contentData?.passageData.length > 0
    ) {
      this.passageData = response?.contentData?.passageData[0];
      if (
        response?.contentData?.childContentSeqNum &&
        response?.contentData?.childContentSeqNum === 1
      ) {
        this.isViewQuestionBtnVisible = true;
        this.enableViewQuestionButton = true;
      } else {
        this.isReadPassageBtnVisible = true;
      }
    }
    /**
     * Video passage related
     */
    if (
      this.passageData &&
      this.passageData?._id &&
      this.passageData?.type === 'video' &&
      this.passageData?.descriptionFile &&
      this.passageData?.descriptionFile !== ''
    ) {
      if (
        response?.contentData?.childContentSeqNum &&
        response?.contentData?.childContentSeqNum === 1
      ) {
        this.enableViewQuestionButton = false;
        this.enableViewWordMeaningButton = false;
      } else {
        this.enableViewQuestionButton = true;
        this.enableViewWordMeaningButton = true;
      }
      //Set Word meaning position
      if (this.contentHeaderInfo?.wordMeaningProgress?.lastWordMeaningID) {
        let wordMeaningPosition = this.passageData?.wordList.indexOf(
          this.contentHeaderInfo?.wordMeaningProgress?.lastWordMeaningID,
        );
        this.setWordMeaningCurrentPosition(
          wordMeaningPosition >= 0 ? wordMeaningPosition : 0,
        );
      }
      //Set Word meaning status
      this.setWordMeaningStatus(
        this.contentHeaderInfo?.wordMeaningProgress?.wordstatus,
      );
    } else {
      this.enableViewWordMeaningButton = true;
    }

    if (
      response?.contentData?.hasOwnProperty('wordMeaningData') &&
      response?.contentData?.wordMeaningData &&
      response?.contentData?.wordMeaningData.length > 0
    ) {
      this.wordMeaningData = response?.contentData?.wordMeaningData;
      if (
        response?.contentData?.childContentSeqNum &&
        response?.contentData?.childContentSeqNum === 1
      ) {
        this.hasViewMeaningBtnVisibility = true;
      }

      this.wordMeaningStatus = this.contentHeaderInfo?.wordMeaningProgress
        ?.wordstatus
        ? this.contentHeaderInfo?.wordMeaningProgress?.wordstatus
        : 'pending';

      // This is applicable to only video passage
      if (
        this.passageData &&
        this.passageData?._id &&
        this.passageData?.type === 'video'
      ) {
        switch (this.wordMeaningStatus) {
          case 'pending':
            this.enableViewQuestionButton = false;
            this.enableViewWordMeaningButton = false;
            break;
          case 'in-progress':
            this.enableViewQuestionButton = false;
            this.enableViewWordMeaningButton = true;
            break;
          case 'completed':
            this.enableViewQuestionButton = true;
            this.enableViewWordMeaningButton = true;
            break;

          default:
            this.enableViewQuestionButton = false;
            this.enableViewWordMeaningButton = false;
            break;
        }
      }
    }

    if (!(this.wordMeaningData && this.wordMeaningData.length > 0)) {
      this.hasViewMeaningBtnVisibility = false;
    }

    if (response.contentData.hasOwnProperty('data')) {
      this.isTimeTest = false;

      if (response.contentData.contentMode === 'timedTest') {
        this.initTimedTest(response.contentData.data[0]);
        return;
      } else if (
        response.contentData.contentMode === 'regular' &&
        response?.contentData?.hasOwnProperty('contentSubMode') &&
        response?.contentData?.contentSubMode === 'timedTest'
      ) {
        this.initTimedTest(response.contentData.data[0]);
        return;
      }
      this.hints = response.contentData.data[0].hints;
      if (response.contentData.hasOwnProperty('data')) {
        this.currentQuestion = response.contentData.data[0];
      }
      this.conditions = response.contentData.data[0].conditions;
      this.explanation = response.contentData.data[0].explanation;
      this.trialCount = response.contentData.data[0].trials;
      this.responseValidation = response.contentData.data[0].responseValidation;
      this.multiResponse = response?.contentData?.data[0].multiResponse;
      if (this.hints && this.hints.length > 0 && this.trialCount === 1) {
        this.isHintVisible = true;
      }
      if (
        (this.currentQuestion.template == 'MCQ' && !this.multiResponse) ||
        this.currentQuestion.template == 'Remedial'
      ) {
        this.hideSubmitAndNext();
      } else if (this.currentQuestion.template === 'Game') {
        this.hideSubmitAndNext();
        this.showSkip();
      } else {
        this.showSubmit();
      }
    }


    if (response?.contentData?.contentType === 'activity') {
      if (this.currentQuestion.template == 'Introduction') {
        this.isOpenActivity = true;
      }
      // else {
      //   this.enableActivityStartModal = true;
      // }
    }

    if (response?.contentHeaderInfo?.hasOwnProperty('alert')) {
      if (Array.isArray(response?.contentData)) {
        this.enableRewardCollectModal = true;
        this.titleRewardObject = response?.contentHeaderInfo?.alert?.title;
      }
    }

    if (response.contentData.contentSubMode == 'challenge') {
      this.showSkip();
    }
    try {
      if (response.contentHeaderInfo.hasOwnProperty('rewardInfo')) {
        this.sparkieCount = response.contentHeaderInfo?.rewardInfo.sparkie;
      }
    } catch (err) {
      console.log('ERROR QSTORE::::', err);
    }

    /**
     * EDICINE Worksheet related
     */
    this.timed = response.contentHeaderInfo?.timed;
    this.selectedChoice =
      response.contentData?.contentParams?.userAttemptData?.userResponse?.mcqPattern?.userAnswer;
    this.isOpenedFirstTime = response.contentHeaderInfo?.isOpenedFirstTime;
    this.userResponse =
      response.contentData?.contentParams?.userAttemptData?.userResponse;

    if (response.contentHeaderInfo?.pedagogyType === 'worksheet') {
      let completed = response.contentHeaderInfo?.pedagogyProgress?.unitList?.filter(
        item => item.unitStatus == 'completed',
      );
      if (
        completed &&
        completed.length ==
        response.contentHeaderInfo?.pedagogyProgress?.unitList.length
      ) {
        this.isSubmitEnabled = true;
      }
    } else {
      if (response.contentHeaderInfo?.submitButton) {
        this.isSubmitEnabled =
          response.contentHeaderInfo?.submitButton?.action?.viewState;
      } else {
        let completed = response.contentHeaderInfo?.pedagogyProgress?.unitList?.filter(
          item => item.unitStatus == 'completed',
        );
        if (
          completed &&
          completed.length ==
          response.contentHeaderInfo?.pedagogyProgress?.unitList.length
        ) {
          this.isSubmitEnabled = true;
        }
      }
    }

    /**
     * Worksheet related ends
     */

    //  Edicine Homework
    let homeworkUserResponse =
      response.contentData?.contentParams?.userAttemptData?.userResponse;
    if (homeworkUserResponse && typeof homeworkUserResponse !== 'undefined') {
      this.homeworkSolution = homeworkUserResponse?.textInteraction?.userAnswer;
      if (
        homeworkUserResponse?.uploads &&
        homeworkUserResponse?.uploads.length > 0 &&
        homeworkUserResponse?.uploads[0]
      ) {
        this.homeworkSolutionAttachment = homeworkUserResponse?.uploads[0];
      }
    }

    // Edicine Homeworks End
  }

  @action initSearchData(response) {
    this.questionRes = response;
    this.contentData = response;
    if (
      response?.hasOwnProperty('passageData') &&
      response?.passageData &&
      response?.passageData.length > 0
    ) {
      this.passageData = response?.passageData[0];
      this.isViewQuestionBtnVisible = true;
    }
    if (response.hasOwnProperty('data')) {
      this.hints = response.data[0].hints;
      this.currentQuestion = response.data[0];
      this.conditions = response.data[0].conditions;
      this.explanation = response.data[0].explanation;
      this.trialCount = response.data[0].trials;
      this.responseValidation = response.data[0].responseValidation;
      this.multiResponse = response?.data[0].multiResponse;
      if (this.hints && this.hints.length > 0 && this.trialCount === 1) {
        this.isHintVisible = true;
      }
      if (
        (this.currentQuestion.template == 'MCQ' &&
          this.multiResponse === false) ||
        this.currentQuestion.template == 'Remedial'
      ) {
        this.hideSubmitAndNext();
      } else {
        this.showSubmit();
      }
    }
  }

  @action setRewardTitle(response) {
    if (response?.contentHeaderInfo?.hasOwnProperty('alert')) {
      this.enableRewardCollectModal = true;
      this.titleRewardObject = response?.contentHeaderInfo?.alert?.title;
    }
  }

  @action setViewMeaningBtnVisible(visible) {
    this.hasViewMeaningBtnVisibility = visible;
  }

  @action setViewQuestionEnabled(hasEnabled) {
    this.enableViewQuestionButton = hasEnabled;
  }
  @action setWordMeaningCurrentPosition(position) {
    this.wordMeaningCurrentPosition = position;
  }

  @action setWordMeaning(wordMeaning) {
    this.wordMeaningData = wordMeaning;
  }

  @action setWordMeaningEnabled(enabled) {
    this.enableWordMeaning = enabled;
  }

  @action setWordMeaningStatus(status) {
    this.wordMeaningStatus = status;
  }

  /**
   * QnA Video
   */
  @action setQnAVideoVisibility(enable) {
    this.visibleQnAVideoModal = enable;
  }
  @action setQnAVideoURL(videoURL) {
    this.QnAVideoURL = videoURL;
  }
  @action setQnAVideoCaptionURL(captionURL) {
    this.QnAVideoCaptionURL = captionURL;
  }

  @action setViewWordMeaningEnabled(hasEnabled) {
    this.enableViewWordMeaningButton = hasEnabled;
  }

  @action setVideoEnd(hasEnd) {
    this.hasVideoEnd = hasEnd;
  }
}
