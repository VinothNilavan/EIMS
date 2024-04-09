import { observable, action, makeObservable } from 'mobx';

export class TopicTrailsStore {
  @observable topicTrailResponse = {};
  @observable userInformation = {};
  @observable topicDetails = {};
  @observable trailList = {};

  constructor() {
    makeObservable(this);
  }

  @action setTrailList(list) {
    this.trailList = list;
  }

  @action setTopicDetails(details) {
    this.topicDetails = details;
  }

  @action init(response) {
    this.topicTrailResponse = response;
    this.userInformation = response.userInformation;
    this.topicDetails = response.topicDetails;
    this.trailList = response.trailList;
  }

  @action setWorksheetTrialResponse(response) {
    this.topicTrailResponse = response;
  }

  @action reset() {
    this.topicTrailResponse = {};
    this.userInformation = {};
    this.topicDetails = {};
    this.trailList = {};
  }
}
