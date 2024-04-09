import { observable, action, makeObservable } from 'mobx';

export class AppStore {
  @observable isException = false;
  @observable loader = false;
  @observable jwt = '';
  @observable userData = {};
  @observable userLanguage = '';
  @observable rewardData = {};
  @observable earnedRewardData = {};
  @observable activityID = '';
  @observable userRedirectionData = [];
  @observable screeningData = {};
  @observable screenTestQuestions = {};
  @observable screeningTestReport = {};
  @observable pushNotificationToken = '';
  @observable inputData = [];
  @observable isScreenTestActive = false;
  @observable isAssesementTestActive = false;
  @observable sessionInformation = {};
  @observable isTrusted = false;
  @observable trustedDeviceId = '';
  @observable username = '';
  @observable subjects = '';
  @observable selectedSubject = '';
  @observable showEarnedPopUp = false;
  @observable isTopicHadReward = false;
  @observable validatepasswordApiCalled = false;
  @observable homeUsageAlertEnable = false;
  @observable selectedSubValue = '';
  
  @observable SnackBar = {
    isVisible: false,
    title: ''
  };
  @observable Popup = {
    isVisible: false,
    type:'',
    title: '',
    item:{},
  }

  @action setIsException(status) {
    this.isException = status;
  }
  constructor() {
    makeObservable(this);
    this.earnedRewardDataSchema = {
      isVisible: false,
      earnedContent: {},
      onPress: () => { console.log('onpress'); },
    };
    this.setEarnedRewardData(this.earnedRewardDataSchema);
  }

  @action setHomeUsageAlertEnable(status) {
    this.homeUsageAlertEnable = status;
  }

  @action setLoader(status) {
    this.loader = status;
  }

  @action setJwt(jwt) {
    this.jwt = jwt;
  }

  @action setUserData(data) {
    this.userData = data;
  }

  @action setSessionInformation(data) {
    this.sessionInformation = data;
  }

  @action setRewardData(data = {}) {
    this.rewardData = data;
  }

  @action setUserRedirectionData(data) {
    this.userRedirectionData = data;
  }

  @action setScreeningData(data) {
    this.screeningData = data;
  }

  @action setScreenTestQuestions(data) {
    this.screenTestQuestions = data;
  }

  @action setScreeningTestReport(data) {
    this.screeningTestReport = data;
  }

  @action setUserLanguage(userLanguage) {
    this.userLanguage = userLanguage;
  }
  @action resetAppStoreOnLogout() {
    this.loader = false;
    this.jwt = '';
    this.userData = {};
    this.rewardData = {};
    this.activityID = '';
    this.userRedirectionData = [];
    this.screeningData = {};
    this.screenTestQuestions = {};
    this.screeningTestReport = {};
    this.inputData = [];
    this.showEarnedPopUp = false;
    this.isTopicHadReward = false;
    this.validatepasswordApiCalled = false;
    this.homeSessionTimeOut = false;
    this.homeUsageAlertEnable = false;
    this.selectedSubValue = '';
  }
  @action setSelectedSubValue(subVal) {
    this.selectedSubValue = subVal;
  }

  @action setScreenTestActive(status) {
    this.isScreenTestActive = status;
  }

  @action setAssesementTestActive(status) {
    this.isAssesementTestActive = status;
  }

  @action setValidatePassordApiCalled(status) {
    this.validatepasswordApiCalled = status;
  }
  @action setPushNotificationToken(token) {
    this.pushNotificationToken = token;
  }
  @action setEarnedRewardData(eRewardData) {
    this.earnedRewardData = eRewardData;
  }

  @action setTrusted(status) {
    this.isTrusted = status;
  }

  @action setShowEarnedPopUp(status) {
    this.showEarnedPopUp = status;
  }

  @action setTopicHadReward(status) {
    this.isTopicHadReward = status;
  }

  @action setTrustedDeviceId(deviceId) {
    this.trustedDeviceId = deviceId;
  }

  @action setUsername(user) {
    this.username = user;
  }

  @action setSubjects(value) {
    this.subjects = value;
  }

  @action setSelectedSubject(value) {
    this.selectedSubject = value;
  }

  @action setSnackBar(value) {
    this.SnackBar = value;
  }

  @action setPopup(value) {
    this.Popup = value
  }

}
