import { observable, action, makeObservable } from 'mobx';

export class LeaderBoardStore {
  @observable currentMonth = '';
  @observable groupSparkieData = [];
  @observable groupDailyStreakData = [];
  @observable lastUpdatedOn = '';
  @observable startDate = '';
  @observable endDate = '';
  @observable currentPage = 0;
  @observable showingFrom = 0;
  @observable showingTo = 0;
  @observable totalPages = 0;
  @observable totalRecords = 0;
  @observable myRankDetails = {};

  constructor() {
    makeObservable(this);
  }

  @action init(response) {
    this.currentMonth = response?.currentMonth;
    this.groupSparkieData = response?.groupSparkieData;
    this.groupDailyStreakData = response?.groupDailyStreakData;
    this.lastUpdatedOn = response?.lastUpdatedOn;
    this.startDate = response?.startDate;
    this.endDate = response?.endDate;
    this.myRankDetails = response.myRankDetails;
    this.setPaginationDetails(response);
  }

  @action setPaginationDetails(response) {
    this.currentPage = response?.currentPage;
    this.showingFrom = response?.showingFrom;
    this.showingTo = response?.showingTo;
    this.totalPages = response?.totalPages;
    this.totalRecords = response?.totalRecords;
  }

  @action reset() {
    this.currentMonth = '';
    this.groupSparkieData = [];
    this.groupDailyStreakData = [];
    this.startDate = '';
    this.lastUpdatedOn = '';
    this.endDate = '';
    this.currentPage = 0;
    this.showingFrom = 0;
    this.showingTo = 0;
    this.totalPages = 0;
    this.totalRecords = 0;
    this.myRankDetails = {};
  }

  @action setCurrentMonth(currentMonth) {
    this.currentMonth = currentMonth;
  }

  @action setGroupSparkieData(sparkieData) {
    this.groupSparkieData = sparkieData;
  }

  @action setGroupDailyStreakData(dailySparkieData) {
    this.groupDailyStreakData = dailySparkieData;
  }

  @action setLastUpdatedOn(lastUpdatedOn) {
    this.lastUpdatedOn = lastUpdatedOn;
  }

  @action setStartDate(startDate) {
    this.startDate = startDate;
  }

  @action setEndDate(endDate) {
    this.endDate = endDate;
  }

  @action setCurrentPage(currentPage) {
    this.currentPage = currentPage;
  }

  @action setShowingFrom(showingFrom) {
    this.showingFrom = showingFrom;
  }

  @action setShowingTo(showingTo) {
    this.showingTo = showingTo;
  }

  @action setTotalPages(totalPages) {
    this.totalPages = totalPages;
  }

  @action setTotalRecords(totalRecords) {
    this.totalRecords = totalRecords;
  }
}
