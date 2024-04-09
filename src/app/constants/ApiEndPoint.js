export const ApiEndPoint = {
  FORCE_UPDATE: '/CommonLogin/forceUpdate',
  OPEN_TOPIC: '/Student/OpenTopic',
  QUIT_WORKSHEET: '/Student/QuitWorksheetV3',
  FETCH_CONTENT_V3: '/Student/FetchFirstContentV3',
  SUBMIT_QUESTION_ATTEMPT: '/Student/SubmitQuestionAttempt',
  SUBMIT_ACTIVITY_ATTEMPT_V3: '/Student/SubmitActivityAttemptV3',
  SUBMIT_QUESTION_ATTEMPT_V3: '/Student/SubmitQuestionAttemptV3',
  UPDATE_QUESTION_ATTEMPT: '/Student/UpdateQuestionAttempt',
  CLOSE_CONTENT: '/Student/CloseContent',
  TOPIC_SESSION_REPORT: '/Student/GetTopicSessionReportV3',
  GET_TOPIC_TRAILS: '/Student/GetTopicTrailV3',
  SET_DEVICE_DETAILS: '/CommonLogin/SetDeviceDetails',
  GET_CONFIG: '/CommonLogin/GetConfig',
  LOGIN_SCREEN: '/CommonLogin/LoginScreen',
  CHECK_USERNAME: '/CommonLogin/CheckUsernameV3',
  VALIDATE_PASSWORD: '/CommonLogin/ValidatePassword',
  TRUSTED_DEVICES: '/CommonLogin/GetTrustedDevicesList',
  HOME_DETAILS: '/Student/GetHomeDetailsV3',
  MENU_LIST: '/Student/GetMenuListV3',
  GET_QUESTION_BY_CODE: '/Student/GetQuestionDetailsByQuestionCode',
  FETCH_WORKSHEETS: '/Student/GetMyWorksheetsV3',
  OPEN_WORKSHEET: '/Student/OpenWorksheet',
  SUBMIT_WORKSHEET: '/Student/SubmitWorksheetQuestionV3',
  GET_WORKSHEET_REPORT: '/Student/GetWorksheetReportV3',
  GET_WORKSHEET_SESSION_REPORT: '/Student/GetWorksheetSessionReport',
  GET_SCREENING_TEST_REPORT: '/Student/GetScreeningTestReport',
  FORGOT_PASSWORD: '/CommonLogin/ForgotPasswordV3',
  TEACHER_RESET_PASSWORD: '/CommonLogin/TeacherResetPassword',
  GET_MY_TOPICS: '/Student/GetMyTopicsV3',
  // GET_MY_MOBILE_TOPICS: '/Student/GetMyTopicsAppV3', -- NOT IN USE
  GET_TOPIC_DETAILS: '/Student/GetTopicDetailsV3',
  START_HIGHER_LEVEL: '/Student/StartTopicHigherLevel',
  QUIT_HIGHER_LEVEL: '/Student/QuitTopicHigherLevel',
  GET_PROFILE_DETAILS: '/Student/GetMyDetailsV3',
  UPDATE_PROFILE_DETAILS: '/Student/UpdateMyDetailsV3',
  UPDATE_PASSWORD: '/Student/UpdateMyPassword',
  ADD_TO_FAVOURITES: '/Student/AddToFavouritiesV3',
  REMOVE_FROM_FAVOURITES: '/Student/RemoveFromFavourities',
  GET_FAVOURITES_LIST: '/Student/GetFavouritesListV3',
  GET_MAILBOX: '/Student/GetMailboxV3',
  SEND_MAIL: '/Student/WriteToMindsparkV3',
  IS_DEVICE_TRUSTED: '/CommonLogin/IsDeviceTrusted',
  SEND_EMAIL_OTP: '/Student/SendOTPToEmailId',
  VALIDATE_EMAIL_OTP: '/Student/ValidateEmailOTP',
  SET_DEVICE_TRUSTED: '/CommonLogin/SetTrustedDevice',
  SEND_MOBILE_OTP: '/Student/SendOTPToMobileNo',
  VALIDATE_MOBILE_OTP: '/Student/ValidatedMobileOTP',
  GET_MAIL_DETAILS: '/Student/GetMessageTrailV3',
  SAVE_RATINGS: '/Student/SaveRating',
  REPLYTOMESSAGE: '/Student/ReplyToMessageV3',
  SET_PASSWORD_AFTER_RESET: '/CommonLogin/SetPasswordAfterResetV3',
  LIST_ACTIVITY: '/Student/ListActivityV3',
  GET_REWARD_INFO: '/Student/GetRewardInfoV3',
  GET_LEADERBOARD_INFO: '/Student/GetLeaderBoardInfoV3',
  UPDATE_PROFILE_PIC: '/Student/UpdateProfilePic',
  QUIT_WORKSHEET_EDICINE: '/Student/QuitWorksheet',
  GET_FILTERED_WORKSHEET_REPORT:
    '/Student/GetFilteredWorksheetQuestionsInReport/',
  NAANDI_PREVIEW_CONTENT: 'Student/PreviewContent/',
  NAANDI_PREVIEW_CONTENT_V3: 'Student/ContentPreviewV3/',
  CHECK_SCREENING_TEST_STATUS: '/Student/CheckScreeningTestStatus',
  GET_HOME_DETAILS_V3: '/Student/GetHomeDetailsV3',
  CHECK_USERNAME_V3: '/CommonLogin/CheckUsernameV3',
  VALID_PASSWORD_V3: '/CommonLogin/ValidatePasswordV3',
  LOGIN_SCREEN_API: '/CommonLogin/LoginScreen',
  FORGOT_PASSWORD_V3: '/CommonLogin/ForgotPasswordV3',
  TEACHER_FORGOT_PASSWORD: '/CommonLogin/TeacherResetPassword',
  SET_DEVICE_DETAIL: '/CommonLogin/SetDeviceDetails',
  GET_LANDING_PAGE: '/CommonLogin/GetLandingPage',
  GET_MY_TOPIC_V3: '/Student/GetMyTopicsV3',
  GET_REWARD_DETAILS: '/Student/GetRewardInfoV3',
  OPEN_SCREENING_TEST: '/Student/OpenScreeningTest',
  GET_STUDENT_DETAILS_V3: '/Teacher/GetStudentDetailsV3',
  UPDATE_USER_DETAILS_V3: '/Teacher/UpdateUserDetailsV3',
  GET_STUDENT_LEARNING_REPORT_V3: '/Teacher/GetStudentLearningReportV3',
  OPEN_ACTIVITY: '/Student/OpenActivity',

  //WorkSheet End Points
  FETCH_TEACHER_WORKSHEETS: '/Teacher/GetWorksheetsV3',
  FETCH_TEACHER_WORKSHEETS_REPORT: '/Teacher/GetWorksheetPerformanceReportV3',
  FETCH_TEACHER_CONTACT_US: '/Teacher/GetSupportDetails',

  //Attendance End Points
  GET_STUDENT_PRESENT_DATES: '/Teacher/GetStudentPresentDatesList',
  GET_STUDENT_ATTENDANCE_REPORT: '/Teacher/GetAllStudentAttendanceReport',
  UPDATE_ATTENDANCE: '/Teacher/UpdateMarkAsPresentDate',

  //Header End Points
  GET_HEADER: '/Teacher/GetHeaderV3',

  //Teacher Dashboard data
  GET_USAGE_SUMMARY: '/Teacher/GetAllUsageSummary',
  GET_USAGE_REPORT: '/Teacher/GetUsageReport',

  //Teacher details
  UPDATE_MY_PROFILE: '/Teacher/UpdateMyPasswordV3',

  //Logout
  STUDENT_LOGOUT: '/CommonLogin/LogoutUserSession',

  //SyncPackages
  SYNC_PACKAGE: '/OfflineSync/SyncPackages',

  CHECK_VERIFIED_DETAILS_FORGOT_PASSWORD: `/CommonLogin/CheckVerifiedDetailsForgotPassword`,
  FORGOT_PASSWORD_SENDOTP: `/CommonLogin/ForgotPasswordSendOTP`,
  FORGOT_PASSWORD_VALIDATE_OTP: `/CommonLogin/ValidateForgotPasswordOTP`,
  CHECK_SESSION_FOR_DEVICE: `/UserManagement/CheckSessionForDevice`,
  VALIDATE_TOKEN: `/CommonLogin/ValidateToken`,
  CHECK_VERIFIED_CONTACT_DETAILS: `/CommonLogin/CheckVerifiedContactDetails`,
  SEND_OTP_TO_MOBILE_EMAIL: `/CommonLogin/SendOTPToMobileEmail`,
  VALIDATE_EMAIL_MOBILE_OTP: `/CommonLogin/ValidateEmailMobileOTP`,
  SET_DEVICE_TRUSTED_NEW: `/CommonLogin/SetTrustedDevice`,
  GET_CONTENT_PREVIEW_FILTERS: '/Student/GetContentPreviewFilters',
  GET_PREVIEW_QUESTION_CONTENT: '/Student/PreviewAllFetchFirstContent',
  GET_PREVIEW_QUESTION_IGRE: '/Student/PreviewActivityFetchFirstContent',
  UPDATED_GET_LEADERBOARD_INFO: '/Student/GetLeaderBoardInfoV3/',
  GET_NOTIFICATION_LIST: '/Student/GetNotificationList',
  VIEW_ALL_NOTIFICATIONS: '/Student/ViewAllNotifications',
  MARK_AS_READ_NOTIFICATION: '/Student/MarkNotificationAsRead',
  UPDATE_DEVICE_NOTIFICATION_TOKEN:
    '/CommonLogin/UpdateDeviceNotificationToken',
  SET_NOTIFICATION_PREFERENCE: '/Student/SetNotificationPreferencesForStudent',
  GET_NOTIFICATION_PREFERENCE: '/Student/GetNotificationPreferencesForStudent',
  APPLY_ENGAGEMENT_REWARD: `/Student/ApplyEngagementReward`,

  // Homework Section
  GET_MY_HOMEWORKKS_V3: '/Student/GetMyHomeworksV3',
  OPEN_HOMEWORK: '/Student/OpenHomework/',
  GET_HOMEWORK_TRIAL_V3: '/Student/GetHomeworkTrailV3',
  GET__FILTERED_HOMEWORK_QUESTIONS_TRIALS:
    '/Student/GetFilteredHomeworkQuestionsInTrail/',
  GET_HOMEWORK_SPARKIE_REPORT_V3: '/Student/GetHomeworkSparkieReportV3/',
  SUBMIT_HOMEWORK_QUESTIONS: '/Student/SubmitHomeworkQuestion',
  UPLOAD_HOMEWORK_SOLUTION: '/Student/UploadSolutionPic/',
  QUIT_HOMEWORK: '/Student/QuitHomeworkV3',
  FETCH_HOMEWORK: '/Student/FetchFirstContent',

  //Signup Flow
  SEND_OTP: 'user_api/send_otpV2',
  VERIFY_OTP: 'user_api/verifyEnteredOtpV2',
  CREATE_USER: 'user_api/createUser',

  GET_USER_PROGRESS_DETAIL_DISCRETE_SKILL:
    '/Student/GetUserProgressDetailForDiscreteSkill',
  GET_DISCRETE_SKILL_SESSION_TRAIL: '/Student/GetDiscreteSkillSessionTrail',
  GET_DISCRETE_SKILL_TRAIL: '/Student/GetDiscreteSkillTrail',
  OPEN_DISCRETE_SKILL: '/Student/OpenDiscreteSkill',
  SUBMIT_DISCRETE_SKILL_QUESTION: '/Student/SubmitDiscreteSkillQuestion',
  GET_DISCRETE_SKILL_SESSION_REPORT: '/Student/GetDiscreteSkillSessionReport',
  QUIT_DISCRETE_SKILL: '/Student/QuitDiscreteSkill',

  //New Login Flow
  GENERATE_OTP: '/CommonLogin/GenerateMobileOTP',
  VALIDATE_OTP: '/CommonLogin/ValidateOTPandSignIn',
  INTERNAL_HAND_SHAKE: '/CommonLogin/EIInternalHandshake',

  //Trusted Device
  ADD_TO_TRUSTED: '/Student/AddTrustedDevice',
  GET_TRUSTED_DEVICES: '/Student/GetTrustedDevice',
  REMOVE_TRUSTED_DEVICE: '/Student/RemoveTrustedDevice',
  START_NEW_SESSION: '/CommonLogin/StartNewSession',


  //Heartbeat 
  HEARTBEAT: '/CommonLogin/HeartBeat',

  //e-cerificate
  GET_CERTIFICATE_POPUP_DETAILS: 'Student/GetCertificatePopupDetails'
};
