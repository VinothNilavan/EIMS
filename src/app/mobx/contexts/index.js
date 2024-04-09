import React, { createContext } from 'react';
import {
  LoginStore,
  AppStore,
  UIStore,
  LeaderBoardStore,
  QnaStore,
  TopicTrailsStore,
  ProfileStore,
  StarredQuestionStore,
  MailBoxStore,
  WorksheetStore,
  WorksheetQnaStore,
  TeacherAdminStore,
  NotificationStore,
  HomeworkStore,
} from '../stores';

export const storesContext = createContext({
  loginStore: new LoginStore(),
  appStore: new AppStore(),
  uiStore: new UIStore(),
  leaderBoardStore: new LeaderBoardStore(),
  qnaStore: new QnaStore(),
  topicTrailsStore: new TopicTrailsStore(),
  profileStore: new ProfileStore(),
  starredQuestionStore: new StarredQuestionStore(),
  mailBoxStore: new MailBoxStore(),
  worksheetStore: new WorksheetStore(),
  worksheetQnaStore: new WorksheetQnaStore(),
  teacherAdminStore: new TeacherAdminStore(),
  notificationStore: new NotificationStore(),
  homeworkStore: new HomeworkStore(),
});
