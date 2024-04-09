
import { observable, action, makeObservable } from 'mobx';

export class UIStore {
  @observable orientation = 'portrait';
  @observable loader = false;
  @observable theme = 'music';
  @observable screenTestDialog = false;
  @observable sessionExceeded = false;
  @observable apiError = false;
  @observable apiStatusCode = null;
  @observable apiErrorMessage = null;
  @observable menuDataPermissions = {};
  @observable languageData = {};
  @observable specificLoader = false;
  @observable doubleLogin = false;
  @observable firstLogin = true;
  @observable showHomepageOverlay = false;
  @observable showNavbarOverlay = false;
  @observable lastUpdatedTime = null;
  @observable showInactivePopUp = false;
  @observable isAnyChangesInUserData = false;
  @observable initialScreenHeight = 0;
  @observable initialScreenWidth = 0;
  @observable feedbackPopupFirstTime = false;
  @observable isApiCalled = false;
  @observable internetErrorMsg = false;
  @observable isSubjectChanges = false;
  @observable lastBackGroundModeTime = null;
  @observable isRTL = false;
  @observable contentEmpty = false;
  @observable hadDisconnected = false;
  @observable recoverData = [];
  @observable isClicked = false;
  @observable isKeypadOpened = false;
  @observable isHomeUsageDone = false;
  @observable homeUsageTimerStarted = false;    
  @observable displayedHomeUsagePopup = false;    
  @observable closeQnA = false;    
  @observable topScreenName = '';    

  @action reset() {
    this.closeQnA = false;
    this.orientation = 'portrait';
    this.loader = false;
    this.theme = 'ocean';
    this.screenTestDialog = false;
    this.sessionExceeded = false;
    this.doubleLogin = false;
    this.menuDataPermissions = {};
    this.languageData = {};
    this.initialScreenHeight = 0;
    this.initialScreenWidth = 0;
    this.specificLoader = false;
    this.isAnyChangesInUserData = false;
    this.lastBackGroundModeTime = null;
    this.isAnyChangesInUserData = false;
    this.feedbackPopupFirstTime = false;
    this.isApiCalled = false;
    this.internetErrorMsg = false;
    this.isSubjectChanges = false;
    this.contentEmpty = false;
    this.hadDisconnected = false;
    this.recoverData = [];
    this.isClicked = false;
    this.isKeypadOpened = false;
    this.isHomeUsageDone = false;    
    this.displayedHomeUsagePopup = false;    
    this.homeUsageTimerStarted = false;   
    this.topScreenName = '';  
  }

  @observable isNetConnected = true;
  @observable isWifiConnected = true;

  constructor() {
    makeObservable(this);
  }

  @action setIsHomeUsageDone(boolFlag) {
    this.isHomeUsageDone = boolFlag;
  }

  @action setHomeUsageTimerStarted(boolFlag) {
    this.homeUsageTimerStarted = boolFlag;
  }

  @action setDisplayedHomeUsagePopup(boolFlag) {
    this.displayedHomeUsagePopup = boolFlag;
  }

  @action setTopScreenName(screenName) {
    this.topScreenName = screenName;
  }
  
  @action setInitialScreenHeight(data) {
    this.initialScreenHeight = data;
  }

  @action setIsClicked(data) {
    this.isClicked = data;
  }
  @action setHadDisconnected(data) {
    this.hadDisconnected = data;
  }

  @action setRecoverData(data) {
    this.recoverData = data;
  }

  @action setSubjectChanges(data) {
    this.isSubjectChanges = data;
  }

  @action setcontentEmpty(data) {
    this.contentEmpty = data;
  }

  @action setIsApiCalled(data) {
    this.isApiCalled = data;
  }

  @action setFeedBackPopupFirstTime(data) {
    this.feedbackPopupFirstTime = data;
  }

  @action setInitialScreenWidth(data) {
    this.initialScreenWidth = data;
  }

  @action setLastBackGrounndModeTime(data) {
    this.lastBackGroundModeTime = data;
  }

  @action setSessionExceeded(data) {
    this.sessionExceeded = data;
  }

  @action setChangedInUserData(data) {
    this.isAnyChangesInUserData = data;
  }

  @action setDoubleLogin(data) {
    this.doubleLogin = data;
  }

  @action setTheme(theme) {
    this.theme = theme;
  }

  @action setLoader(status) {
    this.loader = status;
  }

  @action setOrientation(data) {
    this.orientation = data;
  }

  @action setScreenTestDialog(status) {
    this.screenTestDialog = status;
  }

  @action setMenuDataPermission(data) {
    this.menuDataPermissions = data;
  }

  @action set_isWifiConnected(data) {
    this.isWifiConnected = data;
  }


  @action setLanguageData(data) {
    this.languageData = data;
  }

  @action setIsNetConnected(flag) {
    this.isNetConnected = flag;
  }

  @action setInterNetErrorMsg(flag) {
    this.internetErrorMsg = flag;
  }

  @action apiErrorReset() {
    this.apiError = false;
    this.apiStatusCode = null;
    this.apiErrorMessage = null;
  }

  @action apiErrorInit(data) {
    this.apiError = true;
    this.apiStatusCode = data.code;
    this.apiErrorMessage = data.message;
  }

  @action setSpecificLoader(status) {
    this.specificLoader = status;
  }

  @action setFirstLogin(status) {
    this.firstLogin = status;
  }

  @action setShowHomepageOverlay(data) {
    this.showHomepageOverlay = data;
  }

  @action setShowNavbarOverlay(data) {
    this.showNavbarOverlay = data;
  }

  @action setLastUpdatedTime(updatedTime) {
    this.lastUpdatedTime = updatedTime;
  }

  @action setShowInactivePopUp(status) {
    this.showInactivePopUp = status;
  }

  @action setRTL(language) {
    if (language) {
      this.isRTL = language === 'ur' ? true : false;
    }
  }

  @action setKeypadOpened(status) {
    this.isKeypadOpened = status;
  }

}
