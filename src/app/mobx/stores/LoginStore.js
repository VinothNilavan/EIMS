import { observable, action, makeObservable } from 'mobx';

export class LoginStore {
  @observable loader = false;

  @observable version = '3.0';
  @observable platform = 'mobile';
  @observable appId = '';
  @observable tempJWT = null;
  @observable isAuth = false;
  //obersvable field for the nandi userType 1 for student 2 for teacher
  @observable userType = null;
  @observable didTryAutoLogin = false;
  @observable firstLogin = false;
  @observable username = '';
  @observable errorMessage = '';
  @observable isSkipOnBoardingScreen = false;
  @observable getConfig = {};
  @observable sparkiesChamp = [];
  @observable sparkyFromDate = '';
  @observable sparkyToDate = '';
  @observable loginPermissions = {};
  @observable getResetPasswordDetails = {};
  @observable passwordType = '';
  @observable trustedDeviceModal = false;
  @observable appUpdateDialog = false;
  @observable apkDetails = {};
  @observable parentMobile = '';
  @observable countryCode = '';
  @observable countryName = '';
  @observable studentName = '';
  @observable renewStudents = [];
  @observable freeTrialDays = '7';
  @observable isTrusted = false;
  @observable showTrustedPopUp = false;
  @observable whatsAppConsent = false;
  @observable isOtpLogin = false;
  @observable isVernacularUser = false;
  @observable nationality = '';

  constructor() {
    makeObservable(this);
  }

  @action setUserType(type) {
    this.userType = type;
  }

  @action setVernacularUser(type) {
    this.isVernacularUser = type;
  }

  @action setError(msg) {
    this.errorMessage = msg;
  }

  @action setAppId(appid) {
    this.appId = appid;
  }

  @action setLoader(loaderStatus) {
    this.loader = loaderStatus;
  }

  @action setConfig(data) {
    this.getConfig = data;
  }

  @action setDidTryAutoLogin(status) {
    this.didTryAutoLogin = status;
  }

  @action setTempJwt(tempJWT) {
    this.tempJWT = tempJWT;
  }

  @action setFirstLogin(status) {
    this.firstLogin = status;
  }

  @action setUsername(data) {
    this.username = data;
  }

  @action setIsAuth(status) {
    this.isAuth = status;
  }

  @action setNationality(nationalityValue) {
    this.nationality = nationalityValue;
  }

  @action setResetPasswordDetails(data) {
    this.getResetPasswordDetails = data;
  }

  @action setSparkiesChamp(data) {
    this.sparkiesChamp = data;
  }

  @action setSkipOnBoardingScreen(data) {
    this.isSkipOnBoardingScreen = data;
  }

  @action setPasswordType(data) {
    this.passwordType = data;
  }

  @action setTrustedDeviceModal(data) {
    this.trustedDeviceModal = data;
  }
  @action setAppUpdateDialog(data) {
    this.appUpdateDialog = data;
  }

  @action setAPKDetails(data) {
    this.apkDetails = data;
  }

  @action setParentMobile(data) {
    this.parentMobile = data;
  }

  @action setCountryCode(data) {
    this.countryCode = data;
  }

  @action setCountryName(data) {
    this.countryName = data;
  }

  @action setStudentName(data) {
    this.studentName = data;
  }

  @action setRenewStudents(data) {
    this.renewStudents = data;
  }

  @action setFreeTrialDays(data) {
    this.freeTrialDays = data;
  }

  @action setTrusted(status) {
    this.isTrusted = status;
  }

  @action setShowTrustedPopUp(status) {
    this.showTrustedPopUp = status;
  }

  @action setWhatsAppConsent(data) {
    this.whatsAppConsent = data;
  }

  @action setIsOtpLogin(data) {
    this.isOtpLogin = data;
  }

  @action reset() {
    this.loader = false;

    this.version = '3.0';
    this.platform = 'mobile';
    this.appId = '';
    this.tempJWT = null;
    this.isAuth = false;
    //obersvable field for the nandi userType 1 for student 2 for teacher
    this.userType = null;
    this.didTryAutoLogin = false;
    this.firstLogin = false;
    this.username = '';
    this.errorMessage = '';
    this.isSkipOnBoardingScreen = false;
    this.getConfig = {};
    this.sparkiesChamp = [];
    this.sparkyFromDate = '';
    this.sparkyToDate = '';
    this.loginPermissions = {};
    this.getResetPasswordDetails = {};
    this.passwordType = '';
    this.trustedDeviceModal = false;
    this.appUpdateDialog = false;
    this.apkDetails = {};
    this.parentMobile = '';
    this.countryCode = '';
    this.countryName = '';
    this.studentName = '';
    this.renewStudents = [];
    this.freeTrialDays = '7';
    this.isTrusted = false;
    this.showTrustedPopUp = false;
    this.whatsAppConsent = false;
    this.isOtpLogin = false;
    this.isVernacularUser = false;
    this.nationality = '';
  }
}