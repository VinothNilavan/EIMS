import { observable, action, makeObservable } from 'mobx';

export class WorksheetStore {
  @observable worksheetReportResponse = {};
  @observable userInformation = {};
  @observable topicList = [];
  @observable trailList = {};
  @observable paginationDetails = {};

  constructor() {
    makeObservable(this);
  }

  @action reset() {
    this.worksheetReportResponse = {};
    this.userInformation = {};
    this.topicList = [];
    this.trailList = {};
    this.paginationDetails = {};
  }

  @action setTrailList(list) {
    this.trailList = list;
    this.trailList.unshift('', '');
  }

  @action setTopicList(list) {
    this.topicList = list;
  }

  @action init(response) {
    this.worksheetReportResponse = response;
    this.userInformation = response.userInformation;
    this.topicList = response.topicList;
    this.trailList = response.trailList;
    this.trailList.unshift('', '');
    this.paginationDetails = response.paginationDetails;
  }

  @action setPaginationDetails(details) {
    this.paginationDetails = details;
  }
}
