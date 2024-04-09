import { observable, action, makeObservable } from 'mobx';

export class TestStore {
  @observable showHint = false;
  @observable showHintBox = false;

  constructor() {
    makeObservable(this);
  }

  @action setShowHint(visible) {
    this.showHint = visible;
  }

  @action setShowHintBox(visible) {
    this.showHintBox = visible;
  }

  @action reset() {
    this.showHintBox = false;
    this.showHint = false;
  }
}
