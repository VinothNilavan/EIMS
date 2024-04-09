import { observable, action, makeObservable } from 'mobx';

export class ProfileStore {
  @observable profileInformation = {};
  @observable name = '';
  @observable grade = 0;
  @observable section = '';
  @observable avatar = '';
  @observable address = '';
  @observable gender = '';
  @observable dob = '';
  @observable profileProgress = 0;
  @observable parentsCode = '';
  @observable parentDetails = {};
  @observable subscriptionDetails = {};
  @observable rewardSummary = {};
  @observable organization = '';
  @observable motherName = '';
  @observable motherEmail = '';
  @observable motherISD = '';
  @observable motherNumber = '';
  @observable fatherName = '';
  @observable fatherEmail = '';
  @observable fatherISD = '';
  @observable fatherNumber = '';
  @observable enableNotification = false;
  @observable enableNotificationSound = false;

  constructor() {
    makeObservable(this);
  }

  @action init(resp) {
    this.profileInformation = resp;
    this.name = resp.name;
    this.grade = resp.grade;
    this.section = resp.section;
    this.organization = resp.organization;
    this.avatar = resp.avatar;
    this.address = resp.address;
    this.gender = resp.gender;
    this.dob = resp.dob;
    this.profileProgress = resp.profileProgress;
    this.parentsCode = resp.parentsCode;
    this.parentDetails = resp.parentDetails;
    this.subscriptionDetails = resp.subscriptionDetails;
    this.rewardSummary = resp.rewardSummary;
    if (this.parentDetails) {
      this.motherName = this.parentDetails.parent2?.name;
      this.motherEmail = this.parentDetails.parent2?.email?.email;
      this.motherNumber = this.parentDetails.parent2?.mobile?.number;
      this.motherISD = this.parentDetails.parent2?.mobile?.extension;

      this.fatherName = this.parentDetails.parent1?.name;
      this.fatherEmail = this.parentDetails.parent1?.email?.email;
      this.fatherNumber = this.parentDetails.parent1?.mobile?.number;
      this.fatherISD = this.parentDetails.parent1?.mobile?.extension;
    }
  }

  @action reset() {
    this.dob = '';
  }

  @action setGender(gen) {
    this.gender = gen;
  }

  @action setAvatar(uri) {
    this.avatar = uri;
  }

  @action setDOB(date) {
    this.dob = date;
  }

  @action setMotherName(name) {
    this.motherName = name;
  }
  @action setMotherEmail(email) {
    this.motherEmail = email;
  }
  @action setMotherISD(isd) {
    this.motherISD = isd;
  }
  @action setMotherNumber(number) {
    this.motherNumber = number;
  }

  @action setFatherName(name) {
    this.fatherName = name;
  }
  @action setFatherEmail(email) {
    this.fatherEmail = email;
  }
  @action setFatherISD(isd) {
    this.fatherISD = isd;
  }
  @action setFatherNumber(number) {
    this.fatherNumber = number;
  }
  @action setEnableNotification(enabled) {
    this.enableNotification = enabled;
  }
  @action setEnableNotificationSound(enabled) {
    this.enableNotificationSound = enabled;
  }
}
