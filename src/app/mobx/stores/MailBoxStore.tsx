import { observable, action, makeObservable } from 'mobx';

export class MailBoxStore {
  @observable mails = [];
  @observable count = 0;
  @observable pageNo = 0;
  @observable shouldPaginate = true;

  constructor() {
    makeObservable(this);
  }

  @action init(resp) {
    this.mails = resp;
    this.count = resp.length;
  }

  @action setPageNo(data) {
    this.pageNo = data;
  }

  @action setShouldPaginate(flag: boolean) {
    this.shouldPaginate = flag;
  }
}
