import { observable, action, makeObservable } from 'mobx';

export class WorksheetQnaStore {
  @observable worksheetID = '';
  @observable worksheetResponse = {};
  @observable contentHeaderInfo = {};
  @observable currentQuestion = {};
  @observable inputData = [];
  @observable contentData = {};
  @observable isAnswerCorrect = false;
  @observable nextContentSeqNum = 0;
  @observable selectedChoice = -1;
  @observable userResponse = {};
  @observable isOpenedFirstTime = false;
  @observable isSubmitEnabled = false;
  @observable timed = false;
  @observable sessionInformation = {};

  constructor() {
    makeObservable(this);
  }

  @action init(response) {
    this.worksheetResponse = response;
    this.contentHeaderInfo = response.contentHeaderInfo;
    this.contentData = response.contentData;
    this.timed = response.contentHeaderInfo?.timed;
    this.sessionInformation = response.sessionInformation;
    this.selectedChoice =
      response.contentData?.contentParams?.userAttemptData?.userResponse?.mcqPattern?.userAnswer;

    this.isOpenedFirstTime = response.contentHeaderInfo?.isOpenedFirstTime;
    this.userResponse =
      response.contentData?.contentParams?.userAttemptData?.userResponse;
    if (response.contentData.hasOwnProperty('data')) {
      this.currentQuestion = response.contentData.data[0];
    }
    if (response.contentHeaderInfo?.submitButton) {
      this.isSubmitEnabled =
        response.contentHeaderInfo?.submitButton?.action?.viewState;
    } else {
      let completed = response.contentHeaderInfo?.pedagogyProgress?.unitList?.filter(
        item => item.unitStatus == 'completed',
      );

      if (
        completed.length ==
        response.contentHeaderInfo?.pedagogyProgress?.unitList.length
      ) {
        this.isSubmitEnabled = true;
      }
    }
  }

  @action reset() {
    this.selectedChoice = -1;
    this.nextContentSeqNum = 0;
    this.userResponse = {};
    this.inputData = [];
    this.isOpenedFirstTime = false;
    this.isSubmitEnabled = false;
    this.timed = false;
  }

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
}
