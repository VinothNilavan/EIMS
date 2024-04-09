import {observable, action, makeObservable} from 'mobx';

export class TeacherAdminStore {
  @observable allUsageSummaryResponse = {};
  @observable teacherDetail = {};
  @observable usageReport = {};
  @observable doRefresh = false;
  @observable studentProfile = {};
  @observable studentReportData = {};
  @observable startDate = '';
  @observable endDate = '';
  @observable selectedClassId = null;
  @observable attendanceReport = null;
  @observable selectedMonth = null;
  @observable selectedMonthName = null;
  @observable attendanceError = null;
  @observable selectedClassName = null;
  @observable presentDates = null;
  @observable selectedStudentUID = null;
  @observable selectedGroupId = null;
  @observable markedDates = null;
  @observable currentStudent = null;
  @observable classesData = null;
  @observable currentScreenName = null;
  @observable currentUsername = null;
  @observable currentUserActivatedProduct = null;

  constructor() {
    makeObservable(this);
  }
  
  @action setAllUsageSummary(response) {
    this.allUsageSummaryResponse = response;
  }

  @action setTeacherDetail(response) {
    this.teacherDetail = response;
  }

  @action setUsageReport(response) {
    this.usageReport = response;
  }

  @action clearStudentData() {
    this.usageReport = {};
    this.doRefresh = false;
  }

  @action toggleRefresh(refresh) {
    this.doRefresh = refresh;
  }

  @action setStudentProfile(response) {
    this.studentProfile = response;
  }

  @action setStudentProfileReportData(response) {
    this.studentReportData = response;
  }

  @action setDates(response) {
    this.startDate = response.startDate;
    this.endDate = response.endDate;
  }

  @action setSelectedGroupId(value) {
    this.selectedClassId = value.id;
    this.selectedClassName = value.name;
  }

  @action setAttendanceReport(response) {
    let attendanceReportArr = [];
    for (let value in response) {
      if (response.hasOwnProperty(value)) {
        for (let val in response[value]) {
          if (response[value].hasOwnProperty('totalDays')) {
            if (typeof response[value][val] === 'object') {
              let object = {
                name: response[value][val]['name'],
                class: value,
                UID: val,
                total:
                  response[value][val]['totalPresentDays'] +
                  '/' +
                  response[value]['totalDays'],
                attendance:
                  response[value][val]['totalPresentMonthDays'] +
                  '/' +
                  response[value]['totalMonthDays'],
              };
              attendanceReportArr.push(object);
            }
          }
        }
      }
    }

    this.attendanceReport = attendanceReportArr;
  }

  @action setSelectedMonth(value) {
    this.selectedMonth = value.id;
    this.selectedMonthName = value.name;
    this.attendanceError = null;
  }

  @action setErrorAttendanceReport(text) {
    this.attendanceError = text;
    this.attendanceReport = null;
  }

  @action setStudentPresentDatesList(response) {
    this.presentDates = response?.presentDates;
    this.selectedStudentUID = response?.UID;
    this.selectedGroupId = response?.groupId[0];
  }

  @action setFullMonthDates(monthArray) {
    this.markedDates = monthArray;
  }

  @action setCurrentStudent(item) {
    this.currentStudent = item;
  }

  @action setClasses(classes) {
    this.classesData = classes;
  }

  @action setScreenName(screenName) {
    this.currentScreenName = screenName;
  }

  @action setCurrentUsername(username) {
    this.currentUsername = username;
  }

  @action resetStatesOnTeacherLogout() {
    this.allUsageSummaryResponse = {};
    this.teacherDetail = {};
    this.usageReport = {};
    this.doRefresh = false;
    this.studentProfile = {};
    this.studentReportData = {};
    this.startDate = '';
    this.endDate = '';
    this.selectedClassId = null;
    this.attendanceReport = null;
    this.selectedMonth = null;
    this.selectedMonthName = null;
    this.attendanceError = null;
    this.selectedClassName = null;
    this.presentDates = null;
    this.selectedStudentUID = null;
    this.selectedGroupId = null;
    this.markedDates = null;
    this.currentStudent = null;
    this.classesData = null;
    this.currentScreenName = null;
    this.currentUsername = null;
    this.currentUserActivatedProduct = null;
  }

  @action resetStatesOnSubjectSelection() {
    this.allUsageSummaryResponse = {};
    this.usageReport = {};
    this.doRefresh = false;
    this.studentProfile = {};
    this.studentReportData = {};
    this.startDate = '';
    this.endDate = '';
    this.selectedClassId = null;
    this.attendanceReport = null;
    this.selectedMonth = null;
    this.selectedMonthName = null;
    this.attendanceError = null;
    this.selectedClassName = null;
    this.presentDates = null;
    this.selectedStudentUID = null;
    this.selectedGroupId = null;
    this.markedDates = null;
    this.currentStudent = null;
    this.classesData = null;
    this.currentScreenName = null;
    this.currentUsername = null;
  }

  @action setProduct(product) {
    this.currentUserActivatedProduct = product;
  }
}
