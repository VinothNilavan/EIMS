import { observable, action, makeObservable } from 'mobx';

export class HomeworkStore {
    @observable homeworkReportResponse = {};
    @observable exerciseWiseSummary = {};
    @observable paginationDetails = {};
    @observable trailList = [];
    @observable currentMonth = '';
    @observable homeworkDates = [];

    constructor() {
        makeObservable(this);
    }

    @action reset() {
        this.homeworkReportResponse = {};
        this.totalRecords = 0;
        this.totalPages = 0;
        this.currentPage = 0;
        this.showingFrom = 0;
        this.showingTo = 0;
        this.trailList = [];
        this.exerciseWiseSummary = {};
    }

    @action init(response) {
        this.homeworkReportResponse = response;
        this.paginationDetails = response?.paginationDetails;
        if (response?.trailList && typeof response?.trailList !== 'undefined') {
            this.trailList = response?.trailList;
        }
        this.trailList.unshift('', '');
    }

    @action setPaginationDetails(response) {
        this.paginationDetails = response?.paginationDetails;
    }

    @action setExerciseWiseSummary(response) {
        this.exerciseWiseSummary = response?.exerciseWiseSummary;
    }

    @action setHomeworkReportResponse(response) {
        this.homeworkReportResponse = response;
    }

    @action setTotalRecords(response) {
        this.totalRecords = response;
    }

    @action setTotalPages(response) {
        this.totalPages = response;
    }

    @action setCurrentPage(response) {
        this.currentPage = response;
    }

    @action setShowingFrom(response) {
        this.showingFrom = response;
    }

    @action setShowingTo(response) {
        this.showingTo = response;
    }

    @action setTrailList(respone) {
        this.trailList = respone;
        this.trailList.unshift('', '');
    }

    @action setCurrentDate(currentDate) {
        this.currentMonth = currentDate;
    }

    @action setHomeworkDates(dates) {
        this.homeworkDates = dates;
    }
}