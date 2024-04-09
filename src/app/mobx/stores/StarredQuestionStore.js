
import { observable, action, makeObservable } from 'mobx';

export class StarredQuestionStore {
  @observable favouritesResponse = {};
  @observable userInformation = {};
  @observable favouritesList = {};
  @observable topicList = {};
  @observable favouritesCount = 0;

  constructor() {
    makeObservable(this);
  }

  @action setFavouriteList(data) {
    this.favouritesList = data;
  }

  @action setTopicList(data) {
    this.topicList = data;
  }

  @action init(response) {
    this.favouritesResponse = response;
    this.userInformation = response.userInformation;
    this.favouritesList = response.favouritesDetails.favouritesList;
    this.topicList = response.topicDetails.topicList;
    this.favouritesCount = response.favouritesDetails.favouritesCount;
  }

  @action reset() {
    this.favouritesResponse = {};
    this.userInformation = {};
    this.favouritesList = [];
    this.topicList = [];
    this.favouritesCount = null;
  }
}
