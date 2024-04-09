import { observable, action, makeObservable } from 'mobx';

export class NotificationStore {
    @observable notificationInformation = {};
    @observable notificationList = {};
    @observable paginationDetails = {};

    constructor() {
        makeObservable(this);
    }

    @action init(response) {
        response = Array.isArray(response) ? response[0] : response;
        this.notificationInformation = response;
        this.notificationList = response.notificationList;
        this.paginationDetails = response.paginationDetails;
    }

    @action setNotificationInformation(response) {
        this.notificationInformation = response;
    }

    @action setNotificationList(response) {
        this.notificationList = response;
    }

    @action setPaginationDetails(response) {
        this.paginationDetails = response;
    }

    @action reset() {
        this.notificationInformation = {};
        this.notificationList = {};
        this.paginationDetails = {};
    }
}