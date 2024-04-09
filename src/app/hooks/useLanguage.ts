import React from 'react';
import { useStores } from '@mobx/hooks';
import { TEXTFONTSIZE } from '@constants';
import { replaceAll, replaceString } from '@utils';

export const useLanguage = () => {
  const { uiStore, appStore } = useStores();

  const languageData = uiStore.languageData;

  const getLanguageDataAccordingToKeys = (key1, key2, defaultValue, btnText) => {
    if (btnText && languageData && languageData?.hasOwnProperty('btn') && (languageData?.btn?.hasOwnProperty(key1) || languageData?.btn?.hasOwnProperty(key2))) {
      const res = languageData?.btn?.hasOwnProperty(key1) ?
        languageData?.btn[key1] :
        languageData?.btn[key2];
      if (res) defaultValue = res;
      return replaceAll(defaultValue, "<br>", "\n");
    }
    if (languageData && (languageData?.hasOwnProperty(key1) || languageData?.hasOwnProperty(key2))) {
      const res = languageData?.hasOwnProperty(key1) ?
        languageData[key1] :
        languageData[key2];
      if (res) defaultValue = res;
      return replaceAll(defaultValue, "<br>", "\n");
    }
    return defaultValue;
  }

  const need_help = getLanguageDataAccordingToKeys('need_help', 'need help', 'Need help ?', false);

  const worksheetText =
    languageData && languageData?.hasOwnProperty('worksheets')
      ? languageData?.worksheets
      : 'Worksheets';

  const topicsText =
    languageData && languageData?.hasOwnProperty('topics')
      ? languageData?.topics
      : 'Topics';

  const challengeQuestionText = getLanguageDataAccordingToKeys('challenge_question', 'challenge question', 'Challenge Question', false);

  const submitText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('submit')
      ? languageData?.btn?.submit
      : 'Submit';

  let please_enter_the_answer_text = getLanguageDataAccordingToKeys("please_enter_the_answer", "please enter the answer", "Please enter the answer.", false);


  let please_select_an_option_text = getLanguageDataAccordingToKeys('please_select_an_option', 'please select an option', 'Please select an option', false);


  let closeText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('close')
      ? languageData?.btn?.close
      : 'Close';

  let nextText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('next')
      ? languageData?.btn?.next
      : 'Next';

  let prevText = getLanguageDataAccordingToKeys('previous', 'Previous', 'Previous', true);

  let idontknowText = getLanguageDataAccordingToKeys('i_dont_know', 'i dont know', 'I Don’t Know', true);

  let getReadyText = getLanguageDataAccordingToKeys('get_ready', 'get ready', 'Get Ready!', false);

  let baselineTitleText = getLanguageDataAccordingToKeys('baseline_test', 'baseline test', 'Baseline', false);
  let midlineTitleText = getLanguageDataAccordingToKeys('midline_test', 'midline test', 'Midline', false);
  let endlineTitleText = getLanguageDataAccordingToKeys('endline_test', 'endline test', 'Endline', false);

  let titleText = appStore.isScreenTestActive ? getLanguageDataAccordingToKeys('screening_test', 'screening test', 'Level Check', false)
    : getLanguageDataAccordingToKeys('level_test', 'level test', 'Level Test', false);

  let baselineInstruction = getLanguageDataAccordingToKeys('baseline_instruction', 'baseline test instruction', 'Get ready to shine and display your brilliance! This is your opportunity to showcase your unique skills. Embrace the challenge and let your knowledge soar! \n\n Click the "Start" button to participate in this exciting learning experience, ensuring you complete it in one sitting.', false);
  let midlineInstruction = getLanguageDataAccordingToKeys('midline_instruction', 'midline test instruction', baselineInstruction, false);
  let endlineInstruction = getLanguageDataAccordingToKeys('endline_instruction', 'endline test instruction', baselineInstruction, false);
  let INInstruction = "Let's answer a few questions to find out where to start our journey in Mindspark";
  let internationalInstruction = getLanguageDataAccordingToKeys('international_screening_test_instruction', INInstruction, INInstruction, false);

  let testInstuction = appStore.isScreenTestActive ? getLanguageDataAccordingToKeys(
    'screeningtest_instruction',
    'it looks like you are doing mindspark for the first time this year lets do a small screening test to understand your skill level in this subject',
    'It looks like you are doing Mindspark for the first time this year, Let s do a small screening test to understand your skill level in this subject. Click on start test from below.',
    false)
    : getLanguageDataAccordingToKeys(
      'let_take_a_small_level_test_to_understand_how_much_you_already_know_answer_your_questions_carefully',
      "let take a small level test to understand how much you already know. answer your questions carefully.",
      "Let's take a small level test to understand how much you already know. Answer your questions carefully.",
      false)


  let sessionIDText = getLanguageDataAccordingToKeys('session_id', 'session id', 'SESSION ID', false);

  let viewQuestionText = getLanguageDataAccordingToKeys('view_question', 'view questions', 'View Question', true);


  let readPassageText = getLanguageDataAccordingToKeys('read_passage', 'read passage', 'Read Passage', true);

  let viewPassageText = getLanguageDataAccordingToKeys('view_passage', 'view passage', 'View Passage', true);

  let error_in_audio_file_text = getLanguageDataAccordingToKeys('error_in_audio_file', 'error in audio file', 'Error in audio file', false);


  let please_select_answer_text = getLanguageDataAccordingToKeys('please_select_answer', 'please select answer', 'Please select answer', false);


  let some_answers_have_not_been_answered_text = getLanguageDataAccordingToKeys(
    'some_answers_have_not_been_answered',
    'some answers have not been answered',
    'Some answers have not been answered',
    false)

  let audio_is_not_available_text = getLanguageDataAccordingToKeys('audio_is_not_available', 'audio is not available', 'Audio is not available', false);


  const isTamilLang =
    appStore?.userLanguage && appStore?.userLanguage === 'ta'
      ? TEXTFONTSIZE.Text12
      : TEXTFONTSIZE.Text16;

  const yesbtnText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('yes')
      ? languageData?.btn?.yes
      : 'Yes';
  const nobtnText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('no')
      ? languageData?.btn?.no
      : 'No';

  const confirmationText =
    languageData && languageData?.hasOwnProperty('confirmation')
      ? languageData?.confirmation
      : 'Confirmation';
  let viewWordMeaningText = getLanguageDataAccordingToKeys('view_word_meaning', 'view word meaning', 'View Word Meaning', true);

  const sessionEndingConfirmMessage = getLanguageDataAccordingToKeys(
    'session_ending_confirmation_message',
    'do you want exit from the session',
    'Do you want exit from the session?',
    false);

  const sparkiesText =
    languageData && languageData?.hasOwnProperty('sparkies')
      ? languageData?.sparkies
      : 'Sparkies';

  const worksheetBtnText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('worksheets')
      ? languageData?.btn?.worksheets
      : 'Worksheets';

  const topicBtnText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('topics')
      ? languageData?.btn?.topics
      : 'Topics';
  const gameBtnText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('games')
      ? languageData?.btn?.games
      : 'Games';

  let enterPasswordText = getLanguageDataAccordingToKeys('enter_password', 'enter password', 'Enter Password', false);


  let choosePasswordText = getLanguageDataAccordingToKeys('set_new_password', 'set new password', 'Set New Password', false);


  let userNameText =
    languageData && languageData?.hasOwnProperty('hey')
      ? languageData?.hey.toString()
      : 'Hey {{userName}}';

  let loginBtnName =
    languageData?.btn && languageData?.btn.login
      ? languageData?.btn.login
      : 'Login';

  let selectText =
    languageData?.btn && languageData?.btn.select
      ? languageData?.btn.select
      : 'Select';

  const startText = getLanguageDataAccordingToKeys('start', 'start', 'Start', true);
  const continueText = getLanguageDataAccordingToKeys('continue', 'continue', 'Continue', true);

  const skippedText =
    languageData && languageData?.hasOwnProperty('skipped')
      ? languageData?.skipped
      : 'Skipped';

  const seeReportText = getLanguageDataAccordingToKeys('see_report', 'see report', 'See Report', true);

  const learnBtnText = getLanguageDataAccordingToKeys('learn', 'learn', 'Learn', true);


  const liveWorksheetText = getLanguageDataAccordingToKeys('live_worksheets', 'live worksheets', 'Live Worksheets', false);

  const olderWorksheetText = getLanguageDataAccordingToKeys('older_worksheets', 'older worksheets', 'Older Worksheets', false);

  const completedText = getLanguageDataAccordingToKeys(
    'worksheet_question_completed',
    'worksheet question completed',
    '{{completed}} of {{total}} completed',
    false
  )


  const workSheetNumberOfQuestions = getLanguageDataAccordingToKeys(
    'worksheet_total_questions',
    'worksheet total questions',
    'You have a total of {{total}} Questions \n to answer',
    false
  )


  const emptyText = getLanguageDataAccordingToKeys(
    'no_worksheets_are_available',
    'no worksheets are available',
    'No Worksheets are available',
    false
  )


  const timeTakenText = getLanguageDataAccordingToKeys('time_taken', 'time taken', 'Time Taken', false);


  const sparkieEarnedText = getLanguageDataAccordingToKeys('sparkies_earned', 'sparkies earned', 'Sparkies earned', false);

  const youDidQuestionText = getLanguageDataAccordingToKeys(
    'you_did_questions',
    'you did questions',
    'You did {{questions_attempt}} questions',
    false);


  const viewMapText = getLanguageDataAccordingToKeys('view_map', 'view map', 'View my learning map', false);


  const correctText =
    languageData && languageData?.hasOwnProperty('correct')
      ? languageData?.correct
      : 'Correct';
  const wrongText =
    languageData && languageData?.hasOwnProperty('wrong')
      ? languageData?.wrong
      : 'Wrong';

  const howIdidText = getLanguageDataAccordingToKeys('how_i_did', 'how i did', 'See How I Did', true);


  const gameEmptyText = getLanguageDataAccordingToKeys('no_games_are_available', 'no games are available', 'No games are available', false);


  const homeWorkBtnText = getLanguageDataAccordingToKeys('homework', 'homework', 'Homework', true);

  const profileProgressText = getLanguageDataAccordingToKeys('profile_progress', 'profile progress', 'Profile Progres', false);

  const profileCompleteText = getLanguageDataAccordingToKeys('complete_your_profile', 'complete your profile', 'Complete your Profile', false);


  const homeText = getLanguageDataAccordingToKeys('home', 'Home', 'Home', true);

  const staredPularText = getLanguageDataAccordingToKeys(
    'starred_plural_questions',
    'starred questions',
    'Starred Questions',
    false);


  const messageLabelText =
    languageData && languageData?.hasOwnProperty('messages')
      ? languageData?.messages
      : 'Messages';

  const leaderboardLabelText =
    languageData && languageData?.hasOwnProperty('leaderboard')
      ? languageData?.leaderboard
      : 'Leaderboard';

  const rewardLabelText = getLanguageDataAccordingToKeys('my_rewards', 'my rewards', 'My Rewards', false);


  const profileLabelText =
    languageData && languageData?.hasOwnProperty('profile')
      ? languageData?.profile
      : 'Profile';

  const logoutLableText = getLanguageDataAccordingToKeys('logout', 'Logout', 'Logout', true);

  const starredSingularText = getLanguageDataAccordingToKeys('starred_question', 'bookmarked questions', 'Starred Question', false);


  const goHomeBtnText = getLanguageDataAccordingToKeys('go_to_home', 'go_to_home', 'Go to Home', true);


  const attentionPleaseText = getLanguageDataAccordingToKeys('attention_please', 'attention please', 'Attention please', false);


  const noCancelBtnText = getLanguageDataAccordingToKeys('no_cancel', 'no cancel', 'No, cancel', true);

  const yesRemoveBtnText = getLanguageDataAccordingToKeys('yes_remove', 'yes remove', 'Yes, remove', true);

  const thisWillRemoveDescText = getLanguageDataAccordingToKeys(
    'this_will_remove_the_question',
    'this will remove the question',
    'This will remove the question from the bookmarks page. Do you want to remove?',
    false);


  const newMsgBtnText = getLanguageDataAccordingToKeys('new_message', 'new message', 'New Messages', true);

  const searchMsgText = getLanguageDataAccordingToKeys('search_messages', 'search_messages', 'Search messages', false);


  const singularMsgText =
    languageData && languageData?.hasOwnProperty('singular_msg')
      ? languageData?.singular_msg
      : '1 message';

  const pluralMsgText =
    languageData && languageData?.hasOwnProperty('plural_msg')
      ? languageData?.plural_msg
      : 'messages';

  const singularMsgCapitalText =
    languageData && languageData?.hasOwnProperty('message')
      ? languageData?.message
      : 'Messages';

  const rateConvoText = getLanguageDataAccordingToKeys('rate_ur_message', 'how useful was this conversation', 'How useful was this conversation?', false);


  const typeReplyText = getLanguageDataAccordingToKeys('type_your_reply', 'type your reply', 'Type your reply', false);

  const sendText =
    languageData && languageData?.hasOwnProperty('send')
      ? languageData?.send
      : 'Send';

  const msgSuccessText = getLanguageDataAccordingToKeys(
    'message_sent_successfully',
    'message sent successfully',
    'Your message has been sent successfully.',
    false);


  const maxFileSizeText = getLanguageDataAccordingToKeys('max_upload_filesize', 'max size per attachment limit', 'Maximum size allowed is 2 MB.', false);


  const maxFileErrorText = getLanguageDataAccordingToKeys('max_file_error', 'attention maximum attachment limit is 5 if exceeds first 5 attachments will be uploaded', 'You can upload a maximum of 5 files.', false);


  const fileFormatErrorText = getLanguageDataAccordingToKeys('file_format_error', 'file format error', 'File format not supported', false);


  const failedText =
    languageData && languageData?.hasOwnProperty('failed')
      ? languageData?.failed
      : 'Failed';

  const writeYourMsg = getLanguageDataAccordingToKeys('write_ur_message', 'write ur message', 'Write your message', false);


  const attachFileText = getLanguageDataAccordingToKeys('attach_file', 'attach files', 'Attach files', false);


  const storagePermissionText = getLanguageDataAccordingToKeys('storage_permission', 'storage permission', 'Storage permission', false);


  const storageDescText = getLanguageDataAccordingToKeys('storage_dialogue', 'storage dialogue', 'Mindspark needs access to your storage to download a file.', false);


  const downloadFailedText = getLanguageDataAccordingToKeys('donwload_failed', 'donwload failed', 'Download failed', false);

  const yourSection = getLanguageDataAccordingToKeys('your_section', 'your section', 'Your section', false);

  const yourCity = getLanguageDataAccordingToKeys('your_city', 'your city', 'Your city', false);


  const yourCountry = getLanguageDataAccordingToKeys('your_country', 'world ranking', 'World Ranking', false);


  const yourDistrict = getLanguageDataAccordingToKeys('your_district', 'your district', 'Your District', false);

  const yourNationalRanking = getLanguageDataAccordingToKeys('national_ranking', 'national ranking', 'National Ranking', false);

  const sectionLeaderBoardEmpty = getLanguageDataAccordingToKeys(
    'section_leader_board_empty',
    'no one here yet run get started with questions to be on your section leaderboard',
    'No one here, yet. Run, get started with questions to be on your section leaderboard!',
    false);


  const cityLeaderBoardEmpty = getLanguageDataAccordingToKeys(
    'city_leader_board_empty',
    'no one here yet run get started with questions to be on your city leaderboard',
    'No one here, yet. Run, get started with questions to be on your city ranking leaderboard!',
    false);


  const worldLeaderBoardEmpty = getLanguageDataAccordingToKeys('world_leader_board_empty',
    'no one here yet run get started with questions to be on world ranking leaderboard',
    'No one here, yet. Run, get started with questions to be on your world ranking leaderboard!',
    false);

  const sparkieEarned = getLanguageDataAccordingToKeys('sparkie_earned', 'sparkie earned', 'Sparkies earned', false);


  const sparkieLeaderBoard = getLanguageDataAccordingToKeys('sparkie_leader_board', 'sparkie leaderboard', 'Sparkie Leaderboard', false);



  const certificatesLabel = getLanguageDataAccordingToKeys('certificates', 'certificates', 'Certificates', true);

  const badgesLabel =
    languageData && languageData?.hasOwnProperty('badges')
      ? languageData?.badges
      : 'Badges';

  const titleLabel =
    languageData && languageData?.hasOwnProperty('titles')
      ? languageData?.titles
      : 'Titles';

  const earnedBadges = getLanguageDataAccordingToKeys('earned_badges', 'earned badges', 'Earned Badges2', false);

  const ongoingBadges = getLanguageDataAccordingToKeys('ongoing_badges', 'onGoing badges', 'Ongoing Badges', false);

  const upcomingBadges = getLanguageDataAccordingToKeys('upcoming_badges', 'upComing badges', 'Upcoming Badges', false);


  const viewAll = getLanguageDataAccordingToKeys('view_all', 'view all', 'View all', false);


  const viewLess = getLanguageDataAccordingToKeys('view_less', 'view less', 'View less', false);


  const level =
    languageData && languageData?.hasOwnProperty('level')
      ? languageData?.level
      : 'Level';

  const applyBtnText = getLanguageDataAccordingToKeys('apply', 'apply', 'Apply', true);

  const appliedBtnText = getLanguageDataAccordingToKeys('applied', 'applied', 'Applied', true);


  const copyiedToClipboard = getLanguageDataAccordingToKeys('copied_to_clipboard', 'copied to clipboard', 'Copied to clipboard!', false);

  const parentCodeText = getLanguageDataAccordingToKeys('parent_Code', 'parent code', 'Parent Code:', false);


  const changePassBtnText = getLanguageDataAccordingToKeys('change_password', 'change_password', 'Change\npassword', true);


  const viewSubscriptionBtnText = getLanguageDataAccordingToKeys('view_subscription', 'view_subscription', 'View\nSubscription', true);

  const imText =
    languageData && languageData?.hasOwnProperty('im_a')
      ? languageData?.im_a
      : 'I’m a';

  const boyText =
    languageData && languageData?.hasOwnProperty('boy')
      ? languageData?.boy
      : 'Boy';

  const girlText =
    languageData && languageData?.hasOwnProperty('girl')
      ? languageData?.girl
      : 'Girl';

  const neutralText =
    languageData && languageData?.hasOwnProperty('neutral')
      ? languageData?.neutral
      : 'Neutral';

  const nameText =
    languageData && languageData?.hasOwnProperty('name')
      ? languageData?.name
      : 'Name';

  const classText =
    languageData && languageData?.hasOwnProperty('class')
      ? languageData?.class
      : 'Class';

  const sectionText =
    languageData && languageData?.hasOwnProperty('section')
      ? languageData?.section
      : 'Section';

  const schoolText =
    languageData && languageData?.hasOwnProperty('school')
      ? languageData?.school
      : 'School';

  const cityText =
    languageData && languageData?.hasOwnProperty('city')
      ? languageData?.city
      : 'City';

  const dobText = getLanguageDataAccordingToKeys('date_of_birth', 'date_of_birth', 'Date of Birth', false);

  const saveChangesBtnText = getLanguageDataAccordingToKeys('save_changes', 'save_changes', 'Save changes', false);


  const parent1Detail = getLanguageDataAccordingToKeys('parent1_details', 'parent_1_details', 'Parent 1 Details', false);


  const parent2Detail = getLanguageDataAccordingToKeys('parent2_details', 'parent_2_details', 'Parent 2 Details', false);


  const parent1Name = getLanguageDataAccordingToKeys('parent1_name', 'parent_1_name', 'Parent 1 Name', false);


  const parent2Name = getLanguageDataAccordingToKeys('parent2_name', 'parent_2_name', 'Parent 2 Name', false);


  const alphabetsAllowedText = getLanguageDataAccordingToKeys(
    'only_aphabets_allowed',
    'only aphabets allowed',
    'Only alphabets and spaces allowed.',
    false);


  const parent1PhoneLabel = getLanguageDataAccordingToKeys('parent1_phone',
    'parent_1_phone',
    'Parent 1 Phone',
    false);

  const parent2PhoneLabel = getLanguageDataAccordingToKeys('parent2_phone', 'parent_2_phone', 'Parent 2 Phone', false);

  const validPhoneNumText = getLanguageDataAccordingToKeys('enter_valid_number', 'please enter a valid phone number', 'Please enter a valid phone number.', false);


  const parent1EmailLabel = getLanguageDataAccordingToKeys('parent1_email', 'parent_1_email', 'Parent 1 Email', false);


  const parent2EmailLabel = getLanguageDataAccordingToKeys('parent2_email', 'parent_2_email', 'Parent 2 Email', false);


  const validEmailIDText = getLanguageDataAccordingToKeys('enter_valid_email', 'please enter a valid email id', 'Please enter a valid email ID.', false);


  const startDateText = getLanguageDataAccordingToKeys('start_date', 'start_date', 'Start date :', false);


  const endDateText = getLanguageDataAccordingToKeys('end_date', 'end_date', 'End date :', false);

  const notifySetText =
    languageData && languageData?.hasOwnProperty('notification settings')
      ? languageData['notification settings']
      : 'Notification Settings';

  const notificationPlural =
    languageData && languageData?.hasOwnProperty('notification')
      ? languageData?.notification
      : 'Notifications';

  const previewText =
    languageData && languageData?.hasOwnProperty('preview')
      ? languageData?.preview
      : 'preview';

  const soundText = getLanguageDataAccordingToKeys('sound', 'sounds', 'Sounds', false);

  const trustedDevicesText = getLanguageDataAccordingToKeys('trusted_devices', 'trusted devices', 'Trusted Devices', false);

  const privacyPolicy = getLanguageDataAccordingToKeys('privacy_policy', 'privacy policy', 'Privacy Policy', false);
  
  const markAsTrustedProfile = getLanguageDataAccordingToKeys(
    'mark_your_device_text',
    'mark your device as trusted to always stay logged in to your mindspark account.',
    'Mark your device as trusted to always stay\n logged in to your Mindspark account.',
    false
  );

  const thisDeviceText = getLanguageDataAccordingToKeys('this_device', 'this device', 'This Device', false);

  const markTrustedBtnText = getLanguageDataAccordingToKeys('mark_truted', 'mark truted', 'Mark As Trusted', true);

  const subsciptionSingular =
    languageData && languageData?.hasOwnProperty('subscription')
      ? languageData?.subscription
      : 'Subscription';

  const profileUpdatedText = getLanguageDataAccordingToKeys('profile_updated_successfully',
    'profile_updated_successfully',
    'Your profile is successfully updated!',
    false);


  const trustedDeviceEmptyState = getLanguageDataAccordingToKeys('trusted_device_emptyState',
    'no trusted devices! if you mark a device as trusted, we will keep you logged in on it and save you time.',
    "No trusted devices! If you mark a device as trusted, we'll keep you logged in on it and save your time. Mark this device as trusted?",
    false);


  const daysRemainingLabel = getLanguageDataAccordingToKeys('days_remianing', 'days remaining', 'days remaining', false);


  const notYourPasswordMsg = getLanguageDataAccordingToKeys('not_your_password', 'this is not your password try again', 'This is not your password. Please try again.', false);

  const somethingWentWrong = getLanguageDataAccordingToKeys('something_went_wrong',
    'something went wrong',
    'Something went wrong! Please try again.',
    false
  );


  const onlyAplhaPassRules = getLanguageDataAccordingToKeys('only_alpaha_passrule_msg',
    'only alphabet numbers are allowed in a password do not use other special characters',
    'Only alphabets {a-z and A-Z}, numbers {0-9} and special characters {. - _  @} are allowed in a password. Do not use other characters.',
    false);

  const minLengthFour = getLanguageDataAccordingToKeys('min_length_is_four', 'min length is four', 'Minimum length is 4 characters!', false);

  const thisFieldIsRequired = getLanguageDataAccordingToKeys(
    'this_field_is_required',
    'this field is required',
    'This field is required.',
    false
  );

  const changeYourPassMsg = getLanguageDataAccordingToKeys('change_password_msg', 'change password msg', 'Change your password', false);

  const currentPassText = getLanguageDataAccordingToKeys('current_password', 'current password', 'Current password', false);

  const newPassText = getLanguageDataAccordingToKeys('new_password', 'new password', 'New password', false);

  const reEnterNewPass = getLanguageDataAccordingToKeys('retype_new_password', 'retype new password', 'Re-enter your new password', false);

  const passwordNotMatchText = getLanguageDataAccordingToKeys('the_paswword_notmatch', 'the passwords do not match', 'Your password does not match.', false);

  const changePassNolineBreak = getLanguageDataAccordingToKeys('changepass_nolinebreak',
    'change password',
    'Change Password',
    false);

  const yourAndConfirmPassNotMatch = getLanguageDataAccordingToKeys('the_pass_confirm_notmatch',
    'the pass confirm notmatch',
    'The password and confirmation password do not match.',
    false);

  const passChangedSuccessfully = getLanguageDataAccordingToKeys('password_changed_successfully',
    'password changed successfully',
    'Password successfully changed.',
    false);

  const incorrectPassLabel = getLanguageDataAccordingToKeys('incorrect_password', 'incorrect password', 'Incorrect Password!', false);

  const tryAgainBtnText = getLanguageDataAccordingToKeys('try_again', 'try again', 'Try Again', true);

  const uhHoText = getLanguageDataAccordingToKeys('uh_oh', 'uh oh', 'Uh-oh!', false);

  const askMathOrMindspark = getLanguageDataAccordingToKeys(
    'ask_anything_on_mathematics_or_mindspark',
    'ask anything on mathematics or mindspark and we will get back your name class and school details will be recorded when you send a comment',
    'Ask us anything about mathematics or Mindspark and we will reply to you. Your name, class and school details will be recorded when you send a message.',
    false);


  const playedGamesLabel = getLanguageDataAccordingToKeys('played_games', 'played games', 'Played games', false);

  const latestGamesLabel = getLanguageDataAccordingToKeys('lates_games', 'lates games', 'Latest games', false);


  const lockedGamesLabel = getLanguageDataAccordingToKeys('locked_games', 'locked games', 'Locked games', false);


  const noGamesAssignedText = getLanguageDataAccordingToKeys('no_game_assigned', 'oops. level zero! finish a few topics to unlock a game.', 'Oops. Level Zero! Finish a few topics to unlock a game.', false);

  const sessionTimedOut = getLanguageDataAccordingToKeys('session_time_over', 'it_look_like_sessiontimeout', "You cannot attempt more topics or games today. But there's a lot more you can do on Mindspark, go explore!", false);


  const seeMore = getLanguageDataAccordingToKeys('show_more', 'show more', 'See more', false);


  const showQuestion = getLanguageDataAccordingToKeys('show_question', 'show question', 'Show Question', false);

  const hideQuestion = getLanguageDataAccordingToKeys('hide_question', 'hide question', 'Hide Question', false);


  const seeLess = getLanguageDataAccordingToKeys('show_less', 'show less', 'See less', false);


  const letsCompleteTopc = getLanguageDataAccordingToKeys('lets_complete_the_topic', 'lets complete the topic', "Let's complete the topic", false);

  const toUnlockGame = getLanguageDataAccordingToKeys('to_unlock_the_game', 'to unlock the game', 'to unlock this game.', false);

  const doneBtnText =
    languageData &&
      languageData?.hasOwnProperty('done')
      ? languageData?.done
      : 'Done';

  const skipBtnText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('skip')
      ? languageData?.btn?.skip
      : 'Skip';

  const submittedOnText = replaceString(getLanguageDataAccordingToKeys('submitted_on', 'submitted on', 'Submitted on', false), "submittedOn", "");

  const questionText =
    languageData && languageData?.hasOwnProperty('question')
      ? languageData?.question
      : 'Question';

  const questionTextPlural = getLanguageDataAccordingToKeys('questions_plural', 'questions', 'Questions', false);

  const dueOnText = replaceString(getLanguageDataAccordingToKeys('due_on', 'due on', 'Due on', false), "endDateTime", "");


  const wasdueOnText = replaceString(getLanguageDataAccordingToKeys('due_on', 'was due on', 'Was Due on', false), "wasendDateTime", "");


  const worksheetSearchEmpty = getLanguageDataAccordingToKeys('worksheet_search_emptyState',
    'blank sheet! we could not find the worksheet you are looking for. make sure you are using the right spellings or ask an elder for help.',
    "Blank sheet! We couldn't find the Worksheet you're looking for. Make sure you're using the right spellings or ask an elder for help.",
    false
  );

  const worksheetEmptyState = getLanguageDataAccordingToKeys('worksheet_emptyState', 'worksheet absent! ask your teacher to assign you a worksheet.', 'Worksheet absent! Ask your teacher to assign you a Worksheet.', false);

  const searchWorksheetText = getLanguageDataAccordingToKeys('search_worsheets', 'search worksheets', 'Search worksheets', false);


  const recentlyAnnouncedText = getLanguageDataAccordingToKeys('recently_announced', 'recently announced', 'Recently announced', false);


  const pleaseCompleteAllQuestion = getLanguageDataAccordingToKeys('please_complete_all_questions', 'please complete all the questions', 'Please complete all the questions.', false);


  const worksheetLabel =
    languageData && languageData?.hasOwnProperty('worksheetlabel')
      ? languageData?.worksheetlabel
      : 'Worksheet';

  const effortModeLabel = getLanguageDataAccordingToKeys('effort_mode', 'effort mode', 'Effort Mode', false);

  const descEffortModeLabel = getLanguageDataAccordingToKeys('time_to_grow_your_brain_stronger', 'time to grow your brain stronger', 'Time to grow your brain stronger', false);

  const effortLabel = getLanguageDataAccordingToKeys('effort_label', 'effort', 'Effort', false);

  const higherLevelLabel = getLanguageDataAccordingToKeys('higherlevel_label', 'higher_level', 'Higher Level', false);

  const homeWorkLabel = getLanguageDataAccordingToKeys('homework_label', 'homework', 'Homework', false);

  const reviseLabel = getLanguageDataAccordingToKeys('revise_label', 'revise', 'Revise', false);


  const daLabel = getLanguageDataAccordingToKeys('da_label', 'da label', 'DA Question', false);

  const worksheetReportText = getLanguageDataAccordingToKeys('worksheet_report', 'worksheet report', 'Worksheet Report', false);

  const acuracyText =
    languageData && languageData?.hasOwnProperty('accuracy')
      ? languageData?.accuracy
      : 'Accuracy';

  const exerciseWiseSumaryText = getLanguageDataAccordingToKeys('exercise_wise_summary', 'exercise wise summary', 'Exercise-wise Summary', false);

  const topicWiseSumaryText = getLanguageDataAccordingToKeys('topic_wise_summary', 'topic wise summary', 'Topic-wise Summary', false);

  const filterNoQuestionFound = getLanguageDataAccordingToKeys('no_quetions_found_filter', 'uh oh looks like there nothing here', "Uh-oh! It looks like there's nothing here.", false);


  const emptyNotificationText = getLanguageDataAccordingToKeys('no_notifications', 'no notifications available', 'You do not have any notifications yet.', false);

  const homeWorkEmptyStateText = getLanguageDataAccordingToKeys('homework_absent', 'homework absent! ask your teacher to assign you homework.', 'Homework absent! Ask your teacher to assign you Homework.', false);



  const homeWorkSearchEmptyText = getLanguageDataAccordingToKeys('homework_search_notfound', 'homework search notfound', "Blank sheet! We couldn't find the Homework you're looking for. Make sure you're using the right spellings or ask an elder for help.", false);


  const teacherCommentText = getLanguageDataAccordingToKeys('teacher_comments', 'teacher comments', 'Teacher comments', false);


  const noCommentsText = getLanguageDataAccordingToKeys('no_comments', 'no comments', 'No comments', false);


  const letsGoBtnText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('lets_go')
      ? getLanguageDataAccordingToKeys('lets_go', 'lets go', 'Let’s go!', true)
      : (languageData?.btn?.lets_start) ? getLanguageDataAccordingToKeys('lets_start', 'lets start', 'Let’s go!', true)
        : 'Let’s go!';



  const liveHomeworkTitleText = getLanguageDataAccordingToKeys('live_homework_title', 'live homework title', 'Live \nHomework', false);

  const completeNowBtnText = getLanguageDataAccordingToKeys('complete_now', 'complete now', 'Complete now', true);


  const attemptWoksheetOnego = getLanguageDataAccordingToKeys('attempt_worksheet_onego', 'attempt worksheet in one go', 'Attempt\nWorksheet\nin one go!', false);


  const submitWorksheetModalText = getLanguageDataAccordingToKeys('submit_worksheet_modal_text', 'submit worksheet modal text', 'Submit\nWorksheet', false);

  const timedWorksheetoneGoMessage = getLanguageDataAccordingToKeys('you_often_perform_timedworksheet_msg', 'you often perform better if you attempt timedtest in one go', 'You often perform better if you \n attempt timed worksheet in one go.', false);


  const worksheetWillBeSubmited = getLanguageDataAccordingToKeys('worksheet_will_be_sumbitted', 'your worksheet will be submitted to the teacher', 'Your worksheet will be submitted\n to the teacher.', false);


  const completeLaterBtnText = getLanguageDataAccordingToKeys('complete_later', 'complete later', 'Complete later', true);


  const timeLimitText = getLanguageDataAccordingToKeys('time_limit', 'time limit', 'Time Limit', false);


  const searchHomeWorkText = getLanguageDataAccordingToKeys('search_homework', 'search homeworks', 'Search Homework', false);


  const liveHwLabel = getLanguageDataAccordingToKeys('live_homework', 'live homework', 'Live homework', false);


  const completedHomeWorkLabel = getLanguageDataAccordingToKeys('completed_homework', 'completed homework', 'Completed homework', false);


  const seeOlderHwBtnText = getLanguageDataAccordingToKeys('see_older_homework', 'see older homework', 'See older homework', true);


  const submitHwModalText = getLanguageDataAccordingToKeys('submit_hw_modal', 'submit homework', 'Submit\n Homework', false);


  const hwWillBeSubmitedText = getLanguageDataAccordingToKeys('hw_will_be_submitted', 'your homework will be submitted to the teacher', 'Your homework will be submitted to the teacher.', false);

  const attemptHwInOneGo = getLanguageDataAccordingToKeys('attempt_homework_onego', 'attempt homework in one go', 'Attempt \nHomework \nin one go', false);


  const youPerformbetterInOneGo = getLanguageDataAccordingToKeys('you_perfom_better_if_you_attempt_hw_in_onego', 'you often perform better if you attempt homework in one go', 'You often perform better if you attempt homework in one go.', false);

  const subjectiveText =
    languageData && languageData?.hasOwnProperty('subjective')
      ? languageData?.subjective
      : 'Subjective';

  const vieReportBtnText = getLanguageDataAccordingToKeys('view_report', 'view report', 'View report', true);


  const homeWorkReportLabel = getLanguageDataAccordingToKeys('homework_report', 'homework report', 'Homework Report', false);

  const activeTopicsLabel = getLanguageDataAccordingToKeys('active_topics', 'active topics', 'Active topics', false);

  const otherTopicsLabel = getLanguageDataAccordingToKeys('other_topics', 'other topics', 'Other topics', false);


  const topicSearchEmptystateText = getLanguageDataAccordingToKeys(
    'topic_search_emptystate',
    'blank sheet! we could not find the topic you are looking for. make sure you are using the right spellings or ask an elder for help.',
    "Blank sheet! We couldn't find the Topic you're looking for. Make sure you're using the right spellings or ask an elder for help.",
    false);


  const topicEmptyStateText = getLanguageDataAccordingToKeys('topic_emptystate',
    'uh-oh! much empty here. ask your teacher to activate a topic for you.',
    'Uh-oh! Much empty here. Ask your teacher to activate a topic for you.',
    false);

  const thisIsSchoolDeviceBtnText = getLanguageDataAccordingToKeys('this_is_school_device', 'this is school device', 'This is a school device.', false);


  const priorityTopicActiveText = getLanguageDataAccordingToKeys('priority_topic_active', 'priority topic active', 'A priority topic is active.', false);


  const youHaveToCompleteText = getLanguageDataAccordingToKeys('you_have_to_first_complete', 'you_have to first complete', 'You have to first complete', false);

  const toAccessTopicText = getLanguageDataAccordingToKeys('to_access_topic', 'to access topic', 'to access this topic.', false);


  const hangOnText = getLanguageDataAccordingToKeys('hang_on', 'hang on', 'Hang on', false);

  const letsDoActiveTopicText = getLanguageDataAccordingToKeys('lets_do_the_active_topics_now',
    'lets do the active topics now you can do this at home',
    'Let’s do the active topics now.',
    false);

  const lockedText =
    languageData && languageData?.hasOwnProperty('locked')
      ? languageData?.locked
      : 'Locked';

  const upgradeToGetAccess = getLanguageDataAccordingToKeys('upgrade_to_full_version_to_access',
    'this topic is locked. you need to upgrade to the full version to access this topic.',
    'This topic is locked. You need to upgrade to the full version to access this topic',
    false);


  const searchTopicText = getLanguageDataAccordingToKeys('search_topics', 'search topics', 'Search topics', false);

  const unitCompleteText = getLanguageDataAccordingToKeys('units_completed', 'units completed', 'Units Completed', false);

  const attemptNoInitCapText = getLanguageDataAccordingToKeys('attempt_no_initcap', 'attempt', 'attempt', false);


  const priorityLabel = getLanguageDataAccordingToKeys('priority_label', 'priority', 'Priority', false);


  const secondAttemptText = getLanguageDataAccordingToKeys('second_attempt', 'second attempt', '2nd attempt', false);


  const thirdAttemptText = getLanguageDataAccordingToKeys('third_attempt', 'third attempt', '3rd attempt', false);


  const thAttemptText = getLanguageDataAccordingToKeys('th_attempt', 'th attempt', 'th attempt', false);

  const stAttemptText = getLanguageDataAccordingToKeys('st_attempt', 'st attempt', 'st attempt', false);


  const forAttemptNumber = getLanguageDataAccordingToKeys('for_attempt_no', 'for attempt no', 'For attempt no.', false);

  const howIDidEmptyStateText = getLanguageDataAccordingToKeys('how_i_did_emptystate', 'psssst. you are yet to start the race. complete a few questions and come back!', 'Psssst. You are yet to start the race. Complete a few questions and come back!', false);

  const attemptText =
    languageData && languageData?.hasOwnProperty('attempt')
      ? languageData?.attempt
      : 'Attempt';

  const questionDoneText = getLanguageDataAccordingToKeys('questions_done', 'question done', 'Question done', false);


  const conceptText =
    languageData && languageData?.hasOwnProperty('concept')
      ? languageData?.concept
      : 'Concept';

  const exitBtnText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('exit')
      ? languageData?.btn?.exit
      : 'Exit';

  const attempTimedTestOneGo = getLanguageDataAccordingToKeys('attemp_timed_test_in_one_go', 'attempt timedtest in one go', 'Attempt the \nTimed Test \nin one go', false);


  const youOftenPerformTimedTestOneGo = getLanguageDataAccordingToKeys('you_often_perform_timedtest_msg', 'you often perform better if you attempt timedtest in one go', 'You often perform better if \nyou attempt a Timed Test in one go.', false);

  const timedTestText = getLanguageDataAccordingToKeys('timed_test', 'timed test', 'Timed\nTest', false);


  const tryAgainLaterText = getLanguageDataAccordingToKeys('try_again_next_time', 'try again_next_time', 'Try again next time!', false);

  const excellentWorkText = getLanguageDataAccordingToKeys('excellent_work', 'excellent work', 'Excellent Work!', false);

  const yourTimeText = getLanguageDataAccordingToKeys('your_time', 'your_time', 'Your time:', false);


  const tryHarderText = getLanguageDataAccordingToKeys('try_harder', 'try harder', 'Try harder!', false);

  const youNeedToGetMoreQuetionRight = getLanguageDataAccordingToKeys('you_neeed_more_question_right', 'you_need_to_get_more_questions_right', 'You need to get more questions right.', false);


  const timeUpText = getLanguageDataAccordingToKeys('time_up', 'time up', "Time's\nUp!", false);


  const timeWorkSheetOverText = getLanguageDataAccordingToKeys('time_up_msg', 'your time for this worksheet is over the results will be out after the due date', 'Your time for this worksheet is over.\nThe results will be out after the due date.', false);

  const okayBtnText =
    languageData && languageData?.hasOwnProperty('okay')
      ? languageData?.okay
      : 'Okay';

  const selectSolutionImage = getLanguageDataAccordingToKeys('select_solution_image', 'select solution image', 'Select solution image', false);


  const maxSizeHwSolutionAllowed = getLanguageDataAccordingToKeys('max_filesize_allowed_hw_solution', 'file size cannot exceed more than 5mb', 'Maximum size allowed is 5 MB.', false);

  const writeYourSolutionText = getLanguageDataAccordingToKeys('write_your_solution', 'write your solution', 'Write your solution.', false);


  const uploadYourSolutionText = getLanguageDataAccordingToKeys('upload_your_solution', 'upload your solution', 'Upload your solution.', false);


  const uploadBtnText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('upload')
      ? languageData?.btn?.upload
      : 'Upload';

  const takePhotoBtnText = getLanguageDataAccordingToKeys('take_photo', 'take photo', 'Take photo', true);


  const youCanOnlyUploadOneImage = getLanguageDataAccordingToKeys('remember_you_can_add_one_image', 'remember you can only add upload one image per solution', 'Remember, you can only upload one image per solution.', false);

  const sessionTimeOutModalText = getLanguageDataAccordingToKeys('session_timeout', 'session_timeout', 'Session time out', false);

  const sessionTimeOutModalMsg = getLanguageDataAccordingToKeys('it_look_like_sessiontimeout', 'it_look_like_sessiontimeout,', 'You cannot attempt more topics or games. Please Login again to use Mindspark', false);


  const welcomeText =
    languageData && languageData?.hasOwnProperty('welcome')
      ? languageData?.welcome
      : 'Welcome';

  const lookslikeFirstTimeUseText = getLanguageDataAccordingToKeys('looks_like_you_are_msg', 'looks like you are using mindspark for the first time on this device', 'Looks like you are using Mindspark for the first time on this device.', false);

  const markThisAsTrusted = getLanguageDataAccordingToKeys('mark_this_as_trusted', 'mark this as a trusted device', 'Mark this as a trusted device?', false);

  const skipNowBtnText = getLanguageDataAccordingToKeys('skip_now', 'skip for now', 'Skip for now', true);

  const enterYourPhoneEmail = getLanguageDataAccordingToKeys('enter_parent_phone_email', 'enter your parent phone number or email id', 'Enter your parent’s phone number or email ID.', false);

  const enterYourPhoneEmailMsgText = getLanguageDataAccordingToKeys('enter_phone_email_trusted_msg', 'enter your parent’s phone number or email id to mark this device as trusted', 'Enter your parent’s phone number or email ID to mark this device as trusted.', false);


  const phoneEmaiPlaceHolder = getLanguageDataAccordingToKeys('phone_email_placeholder', 'phone email placeholder', 'Parent’s email ID / phone number', false);

  const enterOtpText = getLanguageDataAccordingToKeys('enter_otp', 'enter the otp', 'Reset password using OTP', false);


  const wrongInformationText = getLanguageDataAccordingToKeys('wrong_information', 'wrong information', 'Wrong information?', false);

  const clickHereToChange = getLanguageDataAccordingToKeys('click_here_to_change', 'click here to change', 'Click here to change', false);


  const verifyBtnText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('verify')
      ? languageData?.btn?.verify
      : 'Verify';

  const stillWaitingText = getLanguageDataAccordingToKeys('resend_otp', 'resend otp', 'Still waiting...\nTry resending the OTP', false);


  const autoDetectingOtpText = getLanguageDataAccordingToKeys('auto_detect_otp', 'auto detect otp', 'Auto detecting the OTP...\nPlease wait', false);

  const resendBtnText = getLanguageDataAccordingToKeys('resend', 'resend otp', 'Resend OTP', true);

  const verificationCompleteText = getLanguageDataAccordingToKeys('verification_complete', 'verification complete', 'Verification Complete', false);


  const youWillNotBeloggedOut = getLanguageDataAccordingToKeys('you_will_not_loggedout_msg', 'you will not loggedout msg', 'You will not be automatically logged out from trusted devices.', false);


  const youCanRemoveInProfile = getLanguageDataAccordingToKeys('you_can_remove_this_in_profile', 'you can remove this device from the list of trusted devices from your profile page', 'You can remove this device from the list of trusted devices from your profile page', false);

  const viewExplanationLabel = getLanguageDataAccordingToKeys('view_explanation', 'view explanation', 'View explanation', false);


  const hideExplanationLabel = getLanguageDataAccordingToKeys('hide_explanation', 'hide explanation', 'Hide explanation', false);


  const yourAnswerLabel = getLanguageDataAccordingToKeys('your_answer', 'your answer', 'Your answer', false);


  const correctAnswerText = getLanguageDataAccordingToKeys('right_answer', 'right answer', 'Correct answer', false);

  const correctAnswerTextOther = getLanguageDataAccordingToKeys('correct_answer', 'correct answer', 'Correct answer', false);

  const uploadedSolutionLabel = getLanguageDataAccordingToKeys('uploaded_solution', 'uploaded solution', 'Uploaded solution', false);

  const answerExplantaionLabel = getLanguageDataAccordingToKeys('answer_explantion', 'answer explantion', 'Answer explanation', false);


  const notAttemptedLabel = getLanguageDataAccordingToKeys('not_attempted', 'not attempted', 'Not attempted', false);

  const skippedLabel =
    languageData && languageData?.hasOwnProperty('skipped')
      ? languageData?.skipped
      : 'Skipped';

  const mindaSparkLabel = getLanguageDataAccordingToKeys('to_default', 'mindspark', 'Mindspark', false);


  const attachmentslabel =
    languageData && languageData?.hasOwnProperty('attachments')
      ? languageData?.attachments
      : 'Attachments';

  const toText =
    languageData && languageData?.hasOwnProperty('to')
      ? languageData?.to
      : 'To:';

  const appUpdateAlertMsg = getLanguageDataAccordingToKeys('app_update_alert', 'your app has an update', 'Your app has an update', false);


  const appInstallInstructionMsg = getLanguageDataAccordingToKeys('app_install_instruction', 'click below to install the app', 'Click below to install the app', false);


  const appInstallMSG =
    languageData && languageData?.hasOwnProperty('app_install_message')
      ? languageData?.app_install_message
      : 'app_install_message';

  const updateLabel =
    languageData && languageData?.hasOwnProperty('update')
      ? languageData?.update
      : 'Update';

  const laterLabel =
    languageData && languageData?.hasOwnProperty('later')
      ? languageData?.later
      : 'Later';

  const unableToOpenUrlText = getLanguageDataAccordingToKeys('unable_to_open_url', 'unable to open url', 'unable to open URL', false);

  const thisUserNotRegisteredText = getLanguageDataAccordingToKeys('this_username_notregistered', 'this username notregistered', 'This username is not registered.\n Please create guest account to continue.', false);

  const helloLoginText = getLanguageDataAccordingToKeys('hello_login', 'hello login', 'Hello Login', false);

  const createGuestAccountText = getLanguageDataAccordingToKeys('create_guestaccount', 'create guest account', 'Create Guest Account', false);

  const startFreeTrialText = getLanguageDataAccordingToKeys('start_free_trial', 'start a free trial', 'Start a Free Trial', false)


  const register =
    languageData && languageData?.hasOwnProperty('register')
      ? languageData?.register
      : 'Register';

  const permissionToUseCamera = getLanguageDataAccordingToKeys('permission_to_use_camera', 'permission to use camera', 'Permission to use camera', false);


  const cameraPermissionMsg = getLanguageDataAccordingToKeys('pemission_camera_msg', 'we need your permission to use your camera.', 'We need your permission to use your camera.', false);


  const snapText =
    languageData && languageData?.hasOwnProperty('snap')
      ? languageData?.snap
      : 'SNAP';

  const tapAnyWhereToClose = getLanguageDataAccordingToKeys('tap_anywhere_to_close', 'tap anywhere to close', 'Tap anywhere to close', false);


  const phoneNoLabel = getLanguageDataAccordingToKeys('telephone_number', 'phone number', 'Phone number', false);


  const loggedOutText = getLanguageDataAccordingToKeys('logged_out', 'logged out', 'Logged Out', false);

  const sessionLoggedOutMsg = getLanguageDataAccordingToKeys('session_logged_out_msg', 'you were logged out because you were inactive for a while or tried logging in from a different place.', 'You were logged out because you were inactive for a while or tried logging in from a different place.', false);


  const idleLoggedOutMsg = getLanguageDataAccordingToKeys('idle_logged_out_msg', 'you has been idle for long time!,please login again to continue', 'You has been idle for long time!,Please login again to continue', false);


  const loginAgainBtnText = getLanguageDataAccordingToKeys('login_again', 'login_again', 'Login Again', true);


  const noInternetLabel = getLanguageDataAccordingToKeys('no_internet', 'no_internet', 'No Internet', false);


  const notConnectedToNet = getLanguageDataAccordingToKeys('not_connected_to_network', 'not_connected_to_network', 'Not connected to a network.', false);


  const forgotPasswordText = getLanguageDataAccordingToKeys('forgot_password', 'forgot_password', 'Forgot Password?', false);


  const selectYourFavouriteAnimal = getLanguageDataAccordingToKeys('select_your_favorite_animal', 'select your favorite animal', 'Select your favourite animal', false);

  const selectYourFavouriteFruit = getLanguageDataAccordingToKeys('select_your_favorite_fruit', 'select your favorite fruit', 'Select your favourite fruit', false);

  const selectYourFavoriteFood = getLanguageDataAccordingToKeys('select_your_favorite_food', 'select your favorite food', 'Select your favourite food', false);


  const confirYourPasswodText = getLanguageDataAccordingToKeys('confirm_your_password', 'confirm password', 'Confirm your password', false);


  const newAndConfirmPassMissMatch = getLanguageDataAccordingToKeys('newpassword_not_matching_confirmpassword', 'new password is not matching with confirm password', 'New password is not matching with confirm password.', false);

  const previousHintText = getLanguageDataAccordingToKeys('previous_hint', 'previous_hint', 'Previous Hint', true);


  const nextHintText = getLanguageDataAccordingToKeys('next_hint', 'next_hint', 'Next Hint', true);


  const showHintText = getLanguageDataAccordingToKeys('show_hint', 'show_hint', 'Show Hint', true);

  const hintText =
    languageData &&
      languageData?.hasOwnProperty('btn') &&
      languageData?.btn?.hasOwnProperty('hint')
      ? languageData?.btn?.hint
      : 'Hint';

  const fillAllTheBoxes = getLanguageDataAccordingToKeys('fill_all_boxes', 'fill all the boxes', 'Fill all the boxes', false);

  const attemptedLabel = getLanguageDataAccordingToKeys('attempted_text', 'attempted', 'Attempted', false);


  const totalLabel =
    languageData && languageData?.hasOwnProperty('total')
      ? languageData?.total
      : 'Total';

  const cancelLabel = getLanguageDataAccordingToKeys('cancel_text', 'cancel', 'Cancel', false);

  const typeSomethingLabel = getLanguageDataAccordingToKeys('type_something', 'type something', 'Type something...', false);


  const progressLabel =
    languageData && languageData?.hasOwnProperty('progress')
      ? languageData?.progress
      : 'Progress';

  const removeLabel = getLanguageDataAccordingToKeys('remove_text', 'remove', 'Remove', false);

  const rewardEmptyState = getLanguageDataAccordingToKeys('no_badge_availble', 'empty shelf! start doing questions to win rewards and to see them displayed here.', 'Empty shelf! Start doing questions to win rewards and to see them displayed here. ', false);


  const notifiedTeacherToResetPass = getLanguageDataAccordingToKeys('we_have_notified_teacher_for_password_reset', 'we have notified your teacher to help you reset the password', 'We have notified your teacher to help you reset your password.', false);

  const parentDetailsMissing = getLanguageDataAccordingToKeys('parent_details_missing', 'we are unable to send you an OTP as we do not have your contact details.', 'We are unable to send you an OTP as we do not have your contact details.', false);

  const useOtherOption = getLanguageDataAccordingToKeys('use_other_option', 'please use any of the other options to log in remember to update your phone number once you do', 'Please use any of the other options to log in. Remember to update your phone number once you do!', false);

  const notifiedParentToResetPass = getLanguageDataAccordingToKeys('we_have_notified_parent_for_password_reset', 'we have notified your parent to help you reset the password', 'We have notified your parent to help you reset your password.', false);


  const teacherBtnText = getLanguageDataAccordingToKeys('teacher', 'teacher', 'Teacher', false);

  const parentBtnText = getLanguageDataAccordingToKeys('parent', 'parent', 'Parent', false);


  const notifiedMindsparkToResetPass = getLanguageDataAccordingToKeys('we_have_sent_mail_to_mindspark_for_password_reset', 'we have notified mindspark team to help you reset the password', 'We have notified the Mindspark team to help you reset your password.', false);


  const weWillGetBackText = getLanguageDataAccordingToKeys('we_will_getback', 'we_will_getback', 'We’ll get back to you in 24 hours.', false);

  const passResetApprovalExpiredText = getLanguageDataAccordingToKeys('password_reset_approval_expired', 'password reset approval has expired', 'Password reset approval has expired!', false);


  const passResetExpiredMessage = getLanguageDataAccordingToKeys('whoops_ur_password_reset_expired_msg', 'whoops your approval to reset your password has expired', 'Whoops! Your approval to reset  your password has expired!', false);


  const requestAgainPlease = getLanguageDataAccordingToKeys('request_again_to_create_new_password', 'please put a new request to create a new password', 'Please put a new request to create a new password', false);

  const maxAttemptReachedText = getLanguageDataAccordingToKeys('you_have_reached_max_attempt', 'you have reached the maximum number of attempts to log in into your account', 'You have reached the maximum number of attempts to log in into your account', false);

  const youAlreadyHavePendingPassRequest = getLanguageDataAccordingToKeys('you_already_have_reset_request_msg', 'you already have reset request msg', 'You already have a pending password reset request within the last 24 hours. Your teacher will help you with the password.', false);


  const resetPassLabel = getLanguageDataAccordingToKeys('resetpassword', 'reset_otp', 'Reset Password Using OTP', false);


  const askHelpFromYourLabel = getLanguageDataAccordingToKeys('ask_help_from', 'ask help from your', 'Ask help from your', false);


  const emailUsAtLabel = getLanguageDataAccordingToKeys('email_us_at', 'email us at', 'Email us at', false);


  const orLabel =
    languageData && languageData?.hasOwnProperty('or')
      ? languageData?.or
      : 'or';

  const userNamePlaceHolder =
    languageData && languageData?.hasOwnProperty('Username')
      ? languageData?.Username
      : 'Username';

  const newToMindSparkText = getLanguageDataAccordingToKeys('new_to_mindspark', 'new to mindspark', 'New to Mindspark?\n', false);

  const pleaseEnterValidOtp = getLanguageDataAccordingToKeys('please_enter_valid_otp', 'please enter a valid otp', 'Please enter a valid OTP', false);

  const sentOtpToParent = getLanguageDataAccordingToKeys('we_have_sent_otp_to_parent', 'we_have_sent_otp_to_parent', "We have sent an OTP to your parent's \nmobile number, please enter it below to reset your password", false);


  const yourSubEndedMsg = getLanguageDataAccordingToKeys('subscription_ended_msg', 'oh no your subscription period has ended team mindspark really wanted you back', 'Oh no! Your subscription period has ended! Mindspark really wants you back!', false);


  const cantOpenUrl =
    languageData && languageData?.hasOwnProperty('cant_open_url')
      ? languageData?.cant_open_url
      : "Can't open URl =>";

  const starredQuestionEmptyState = getLanguageDataAccordingToKeys('no_starred_question', 'no_starred_question', 'No bookmarked questions. Click on the "star" next to questions to save the tough ones or your favourite ones here.', false);

  const messageEmptyState = getLanguageDataAccordingToKeys(
    'messages_emptystate',
    'it is pindrop silence here! click on new message to message mindspark. we can help you with any issues or doubts you may have.',
    `It's pindrop silence here! Click on "Write a Message" to message Mindspark. We can help you with any issues or doubts you may have.`,
    false)

  const choseSubjectTxt = getLanguageDataAccordingToKeys('choose_subject', 'choose subject', 'Choose Subject', false);


  const preciousTreasureText = getLanguageDataAccordingToKeys('precious_treasures_text', 'precious treasures lay ahead. choose a subject to start the journey.', 'Precious treasures lay ahead.\n Choose a subject to start the journey.', false);


  const mathsSubject =
    languageData && languageData?.hasOwnProperty('Mindspark')
      ? languageData?.Mindspark
      : 'Maths';

  const englishSubjectText = getLanguageDataAccordingToKeys('english', 'MSE', 'English', false);

  const scienceSubjectText = getLanguageDataAccordingToKeys('science', 'MSS', 'Science', false);

  const mathematicians_dont_give_up = getLanguageDataAccordingToKeys(
    'mathematicians_dont_give_up',
    'pedagogy sdl pass in last attempt message 4',
    "Mathematicians don't give up, just like you! Let's continue learning.",
    false);


  const scientists_dont_give_up = getLanguageDataAccordingToKeys('scientists_dont_give_up', 'scientists dont give up', "Scientists don't give up, just like you! Let's continue learning.", false);


  const your_extra_effort_really_helped = getLanguageDataAccordingToKeys('your_extra_effort_really_helped', 'pedagogy sdl pass in last attempt message 5', 'This was quite a challenge, and your extra effort really helped. Great job!', false);


  const you_meet_all_challenges = getLanguageDataAccordingToKeys('you_meet_all_challenges', 'pedagogy sdl pass in last attempt message 6', 'Superb! You meet all your challenges with a smile.', false);

  const great_to_see_you_work_hard = getLanguageDataAccordingToKeys('great_to_see_you_work_hard', 'pedagogy sdl pass in last attempt message 7', "Brilliant! It's great to see you work hard at these challenges!", false);

  const you_can_do_better = getLanguageDataAccordingToKeys('you_can_do_better', 'pedagogy sdl careful message 4', 'Read the answer carefully.', false);

  const ask_doubts_to_leave_behind = getLanguageDataAccordingToKeys('ask_doubts_to_leave_behind', 'pedagogy sdl careful message 5', 'Take time to read the answer.', false);

  const try_carefully_to_overcome = getLanguageDataAccordingToKeys('try_carefully_to_overcome', 'pedagogy sdl careful message 6', 'Reading the answer will help you learn.', false);


  const doubleLoginHeader = getLanguageDataAccordingToKeys('double_login_header', 'double login title', 'Oops! Logged-out due to double-login', false);


  const doubleLoginMessage = getLanguageDataAccordingToKeys('double_login_message', 'logged into your account from different place', 'Hey, we think you have logged into your account from a different place.', false);

  const doubleLoginNotYouMessage = getLanguageDataAccordingToKeys('double_login_not_you', 'not you login again and change password', 'Not you? Login again and change your password now.', false);

  const goBackText = getLanguageDataAccordingToKeys('go_back_text', 'go back', 'Go Back', false);


  const students_find_this_tough =
    languageData && languageData?.hasOwnProperty('students_find_this_tough')
      ? languageData?.students_find_this_tough
      : "Many students find this tough, so don't worry. You will get another try on this challenge question. You will see the answer only after your second try.";

  const server_down_error =
    languageData && languageData?.hasOwnProperty('server_down_error')
      ? languageData?.server_down_error
      : 'Sorry, our servers are not available at the moment. Please try later.';

  const connectOnWhatsApp = getLanguageDataAccordingToKeys('connect_on_whatsApp', 'connect on whatsApp', 'Connect on WhatsApp', false);

  const askADoubt = getLanguageDataAccordingToKeys('ask_a_doubt', 'ask a doubt', 'Ask A Doubt', false);


  const feedback =
    languageData && languageData?.hasOwnProperty('feedback')
      ? languageData?.feedback
      : 'Feedback';


  const bookmarks =
    languageData && languageData?.hasOwnProperty('bookmarks')
      ? languageData?.bookmarks
      : 'Bookmarks';
  const bookmarkedQuestion = getLanguageDataAccordingToKeys('bookmarked_question', 'bookmarked questions', 'Bookmarked Question', false);

  const changeSubject = getLanguageDataAccordingToKeys('change_subject', 'change subject', 'Change Subject', false);


  const trustedDeviceMaxLimitMsg =
    languageData && languageData?.hasOwnProperty('trusted_max_limit')
      ? languageData?.trusted_max_limit
      : 'You can only save user ID and password in 3 devices, this seems to be your 4th Device.';

  const helpNeedQuery = getLanguageDataAccordingToKeys('help_need_query', 'send query', 'Send your query to', false);

  const helpNeedTimeQuery = getLanguageDataAccordingToKeys('help_need_query_time', 'call us', 'Or call us on (Mon to Fri 10am to 6pm)', false);

  const emptyContent = getLanguageDataAccordingToKeys('empty_content ', 'empty content ', 'Empty Content', false);

  const emptyContentDesc = getLanguageDataAccordingToKeys('Content_for_question_not_available_shortly_this_will_be_rectified', 'content for question not available shortly this will be rectified.', 'Content for question not available, shortly this will be rectified.', false);


  const haveAnAccount = getLanguageDataAccordingToKeys('have_an_account', 'already have an account?', 'Have an account?', false);


  const loginWithExistingMindsparkId = getLanguageDataAccordingToKeys('login_with_existing_mindspark_id', 'login with existing mindspark id', 'Login with Existing Mindspark Id', false);

  const yourSessionEndedText = getLanguageDataAccordingToKeys('your_session_ended', 'oops your session has ended.', 'Oops! Your session has ended.', false);


  // Only if you have subscribed through school
  const b2bUserInstForResetPassword = getLanguageDataAccordingToKeys('only_if_you_have_subscribed_through_school', 'only_if_you_have_subscribed_through_school', 'Only if you have subscribed through school', false);

  const yourSessionExpiryMsgText =
    languageData && languageData?.hasOwnProperty('your_session_ended_msg')
      ? languageData?.your_session_ended_msg
      : 'Hey, we think your session has expired or you have logged into your account from another device.\nNot you? Login again and change your password now.';

  const accuracyText =
    languageData && languageData?.hasOwnProperty('accuracy')
      ? languageData?.accuracy
      : 'Accuracy';
  const passagesAttemptedText = getLanguageDataAccordingToKeys('passages_attempted', 'passages attempted', 'Passages Attempted', false);

  const questionsAttemptedText = getLanguageDataAccordingToKeys('questions_attempted', 'questions attempted', 'Questions Attempted', false);

  const genericEmptyText = getLanguageDataAccordingToKeys('no_data_available', 'no data available', 'No Data Available', false);

  const profileClass =
    languageData && languageData?.hasOwnProperty('profile_class')
      ? languageData?.profile_class
      : 'Class';

  const please_select_all_options = getLanguageDataAccordingToKeys('select_all_possible_options', 'select all possible options', 'Select all possible options', false);

  const totalSparkieEarneText =
    languageData && languageData?.hasOwnProperty('total sparkies earned')
      ? languageData['total sparkies earned']
      : 'Total Sparkies earned';

  const myProfileText =
    languageData && languageData?.hasOwnProperty('my profile')
      ? languageData['my profile']
      : 'My Profile';

  const hoorayText =
    languageData && languageData?.hasOwnProperty('hooray')
      ? languageData?.hooray
      : 'Hooray!';
  const anotherAudioPlayingText =
    languageData && languageData?.hasOwnProperty('another_audio_playing_text')
      ? languageData?.another_audio_playing_text
      : 'Another Audio Is Already Playing';

  const invalidAudioFileText = getLanguageDataAccordingToKeys('invalidAudioFileText', 'invalid audio file', 'Invalid Audio File', false);

  const audioInitialisingText =
    languageData && languageData?.hasOwnProperty('audioInitialisingText')
      ? languageData?.audioInitialisingText
      : 'Audio Is Initilising ';

  const outOfUnitsCompleted = getLanguageDataAccordingToKeys('out_of_units_completed', 'out of units completed', '{{unitsCleared}} out of {{unitsOverall}} units completed', false);

  const outOfUnitCompleted =
    languageData && languageData?.hasOwnProperty('out_of_unit_completed')
      ? languageData?.out_of_unit_completed
      : '{{unitsCleared}} out of {{unitsOverall}} unit completed';

  const saveMyLoginIdAndPassword =
    languageData && languageData?.hasOwnProperty('saveMyLoginIdAndPassword')
      ? languageData?.saveMyLoginIdAndPassword
      : 'Save my login Id and password on this device';

  const activityTxt =
    languageData && languageData?.hasOwnProperty('activity')
      ? languageData?.activity
      : 'Activity';

  const UnitTxt =
    languageData && languageData?.hasOwnProperty('unit')
      ? languageData?.activity
      : 'Unit';

  const UnitsTxt =
    languageData && languageData?.hasOwnProperty('units')
      ? languageData?.activity
      : 'Units';

  const teacherLoginError =
    languageData && languageData?.hasOwnProperty('teacher_login_error')
      ? languageData?.teacher_login_error
      : 'Please login with a valid student user';


  const noThanks = getLanguageDataAccordingToKeys('no_thanks', 'no thanks', 'No,Thanks', false);


  const giveFeedBack =
    languageData && languageData?.hasOwnProperty('give_feedback')
      ? languageData?.give_feedback
      : 'Give FeedBack';

  const WewhouldLoveToHereFromYou =
    languageData && languageData?.hasOwnProperty('We_whould_love_to_hear_from_you')
      ? languageData?.We_whould_love_to_hear_from_you
      : 'We whould love to hear from you!';

  const HelpUsImproveYourExpByGivingUsYourFeedBack =
    languageData && languageData?.hasOwnProperty('Help_us_improve_your_experience_by_giving_us_your_feedback')
      ? languageData?.Help_us_improve_your_experience_by_giving_us_your_feedback
      : 'Help us improve your experience by giving us your feedback';

  const goText = languageData && languageData?.hasOwnProperty('go')
    ? languageData?.go
    : 'Go';

  const NoHomeWorkAssignedInThisMonth =
    languageData && languageData?.hasOwnProperty('No_homework_assigned_in_this_month')
      ? languageData?.No_homework_assigned_in_this_month
      : 'No homework assigned in this month';

  const loginWithContactNumberText =
    languageData &&
      languageData?.hasOwnProperty('login_with_contact_number')
      ? languageData?.login_with_contact_number
      : 'Login/Sign up using OTP';

  const loginSignup =
    languageData &&
      languageData.hasOwnProperty('login_sign_up') ?
      languageData?.login_sign_up
      : 'Login/Sign Up'

  const SignInWithusername =
    languageData &&
      languageData.hasOwnProperty('Sign_in_with_username') ?
      languageData?.Sign_in_with_username
      : 'Sign in with username';

  const appMaintenanceTitle = `App Under Maintenance`

  const appMaintenanceDescription = `🚀 Improvement Underway! The Mindspark will be unavailable from 14th August 7:00 PM (IST) onwards till 16th August 6:00 AM (IST). We appreciate your understanding.`
  const appBannerDescription = `🚀 Improvement is underway! This 23rd February, we're on a mission to perfect your Sparkie counts. You might see changes in your Sparkies!`

  const allText = languageData && languageData?.hasOwnProperty('all')
    ? languageData?.all
    : 'All';

  const explainationText = languageData && languageData?.hasOwnProperty('explanation')
    ? languageData?.explanation
    : 'Explanation';

  const certificateNotFound = languageData && languageData?.hasOwnProperty('certificate_not_found')
    ? languageData?.certificate_not_found
    : 'Certificate Not Found';

  let homeUsage = `You've had 90 minutes of fun learning on Mindspark today. Come back tomorrow for more! \nAnd don't forget, there are other subjects to learn too!`;

  const homeUsagePopup = getLanguageDataAccordingToKeys('home_usage_popup', homeUsage, homeUsage, false);

  const wellDone = getLanguageDataAccordingToKeys('well_done', 'Well Done', 'Well Done!', true);

  return {
    homeUsagePopup,
    wellDone,
    allText,
    explainationText,
    please_select_all_options,
    b2bUserInstForResetPassword,
    loginWithContactNumberText,
    loginSignup,
    SignInWithusername,
    NoHomeWorkAssignedInThisMonth,
    HelpUsImproveYourExpByGivingUsYourFeedBack,
    WewhouldLoveToHereFromYou,
    giveFeedBack,
    noThanks,
    doubleLoginHeader,
    doubleLoginMessage,
    doubleLoginNotYouMessage,
    worksheetText,
    challengeQuestionText,
    submitText,
    please_enter_the_answer_text,
    please_select_an_option_text,
    closeText,
    nextText,
    idontknowText,
    titleText,
    sessionIDText,
    viewQuestionText,
    readPassageText,
    error_in_audio_file_text,
    please_select_answer_text,
    some_answers_have_not_been_answered_text,
    audio_is_not_available_text,
    isTamilLang,
    yesbtnText,
    nobtnText,
    confirmationText,
    sessionEndingConfirmMessage,
    sparkiesText,
    worksheetBtnText,
    topicBtnText,
    gameBtnText,
    enterPasswordText,
    choosePasswordText,
    userNameText,
    loginBtnName,
    selectText,
    startText,
    continueText,
    seeReportText,
    liveWorksheetText,
    olderWorksheetText,
    completedText,
    emptyText,
    timeTakenText,
    sparkieEarnedText,
    youDidQuestionText,
    correctText,
    wrongText,
    howIdidText,
    gameEmptyText,
    homeWorkBtnText,
    profileProgressText,
    homeText,
    staredPularText,
    messageLabelText,
    leaderboardLabelText,
    rewardLabelText,
    profileLabelText,
    logoutLableText,
    starredSingularText,
    goHomeBtnText,
    attentionPleaseText,
    noCancelBtnText,
    yesRemoveBtnText,
    thisWillRemoveDescText,
    newMsgBtnText,
    searchMsgText,
    singularMsgText,
    pluralMsgText,
    singularMsgCapitalText,
    rateConvoText,
    typeReplyText,
    sendText,
    msgSuccessText,
    maxFileSizeText,
    maxFileErrorText,
    fileFormatErrorText,
    failedText,
    writeYourMsg,
    attachFileText,
    storagePermissionText,
    storageDescText,
    downloadFailedText,
    yourSection,
    yourCity,
    yourCountry,
    cityLeaderBoardEmpty,
    sectionLeaderBoardEmpty,
    worldLeaderBoardEmpty,
    sparkieEarned,
    sparkieLeaderBoard,
    badgesLabel,
    titleLabel,
    earnedBadges,
    ongoingBadges,
    upcomingBadges,
    viewAll,
    viewLess,
    level,
    applyBtnText,
    appliedBtnText,
    copyiedToClipboard,
    parentCodeText,
    totalSparkieEarneText,
    changePassBtnText,
    viewSubscriptionBtnText,
    imText,
    boyText,
    girlText,
    neutralText,
    nameText,
    classText,
    sectionText,
    schoolText,
    cityText,
    dobText,
    saveChangesBtnText,
    parent1Detail,
    parent2Detail,
    parent1Name,
    parent2Name,
    alphabetsAllowedText,
    parent1PhoneLabel,
    parent2PhoneLabel,
    validPhoneNumText,
    parent1EmailLabel,
    parent2EmailLabel,
    validEmailIDText,
    startDateText,
    endDateText,
    notifySetText,
    notificationPlural,
    soundText,
    trustedDevicesText,
    markAsTrustedProfile,
    thisDeviceText,
    markTrustedBtnText,
    myProfileText,
    subsciptionSingular,
    profileUpdatedText,
    trustedDeviceEmptyState,
    daysRemainingLabel,
    notYourPasswordMsg,
    somethingWentWrong,
    onlyAplhaPassRules,
    minLengthFour,
    thisFieldIsRequired,
    changeYourPassMsg,
    currentPassText,
    newPassText,
    reEnterNewPass,
    passwordNotMatchText,
    changePassNolineBreak,
    yourAndConfirmPassNotMatch,
    passChangedSuccessfully,
    incorrectPassLabel,
    tryAgainBtnText,
    uhHoText,
    askMathOrMindspark,
    playedGamesLabel,
    latestGamesLabel,
    lockedGamesLabel,
    noGamesAssignedText,
    sessionTimedOut,
    seeMore,
    seeLess,
    letsCompleteTopc,
    toUnlockGame,
    doneBtnText,
    skipBtnText,
    submittedOnText,
    questionText,
    dueOnText,
    worksheetSearchEmpty,
    worksheetEmptyState,
    searchWorksheetText,
    recentlyAnnouncedText,
    pleaseCompleteAllQuestion,
    worksheetLabel,
    effortLabel,
    effortModeLabel,
    descEffortModeLabel,
    higherLevelLabel,
    homeWorkLabel,
    reviseLabel,
    daLabel,
    worksheetReportText,
    questionTextPlural,
    acuracyText,
    exerciseWiseSumaryText,
    topicWiseSumaryText,
    filterNoQuestionFound,
    emptyNotificationText,
    homeWorkEmptyStateText,
    homeWorkSearchEmptyText,
    teacherCommentText,
    letsGoBtnText,
    liveHomeworkTitleText,
    noCommentsText,
    completeNowBtnText,
    attemptWoksheetOnego,
    submitWorksheetModalText,
    timedWorksheetoneGoMessage,
    worksheetWillBeSubmited,
    completeLaterBtnText,
    timeLimitText,
    searchHomeWorkText,
    liveHwLabel,
    completedHomeWorkLabel,
    seeOlderHwBtnText,
    submitHwModalText,
    hwWillBeSubmitedText,
    attemptHwInOneGo,
    youPerformbetterInOneGo,
    subjectiveText,
    vieReportBtnText,
    homeWorkReportLabel,
    activeTopicsLabel,
    otherTopicsLabel,
    topicSearchEmptystateText,
    topicEmptyStateText,
    thisIsSchoolDeviceBtnText,
    priorityTopicActiveText,
    youHaveToCompleteText,
    toAccessTopicText,
    hangOnText,
    letsDoActiveTopicText,
    searchTopicText,
    unitCompleteText,
    attemptNoInitCapText,
    priorityLabel,
    secondAttemptText,
    thirdAttemptText,
    thAttemptText,
    stAttemptText,
    howIDidEmptyStateText,
    attemptText,
    questionDoneText,
    conceptText,
    exitBtnText,
    attempTimedTestOneGo,
    youOftenPerformTimedTestOneGo,
    timedTestText,
    tryAgainLaterText,
    excellentWorkText,
    yourTimeText,
    tryHarderText,
    youNeedToGetMoreQuetionRight,
    timeUpText,
    okayBtnText,
    timeWorkSheetOverText,
    selectSolutionImage,
    maxSizeHwSolutionAllowed,
    writeYourSolutionText,
    uploadYourSolutionText,
    uploadBtnText,
    takePhotoBtnText,
    youCanOnlyUploadOneImage,
    sessionTimeOutModalText,
    sessionTimeOutModalMsg,
    welcomeText,
    lookslikeFirstTimeUseText,
    markThisAsTrusted,
    skipNowBtnText,
    enterYourPhoneEmail,
    enterYourPhoneEmailMsgText,
    phoneEmaiPlaceHolder,
    enterOtpText,
    wrongInformationText,
    clickHereToChange,
    verifyBtnText,
    stillWaitingText,
    autoDetectingOtpText,
    resendBtnText,
    verificationCompleteText,
    youWillNotBeloggedOut,
    youCanRemoveInProfile,
    viewExplanationLabel,
    hideExplanationLabel,
    yourAnswerLabel,
    correctAnswerText,
    uploadedSolutionLabel,
    answerExplantaionLabel,
    notAttemptedLabel,
    skippedLabel,
    mindaSparkLabel,
    attachmentslabel,
    toText,
    appUpdateAlertMsg,
    appInstallInstructionMsg,
    appInstallMSG,
    updateLabel,
    laterLabel,
    unableToOpenUrlText,
    thisUserNotRegisteredText,
    helloLoginText,
    createGuestAccountText,
    startFreeTrialText,
    register,
    permissionToUseCamera,
    cameraPermissionMsg,
    snapText,
    tapAnyWhereToClose,
    phoneNoLabel,
    loggedOutText,
    sessionLoggedOutMsg,
    loginAgainBtnText,
    noInternetLabel,
    notConnectedToNet,
    forgotPasswordText,
    selectYourFavouriteAnimal,
    selectYourFavouriteFruit,
    selectYourFavoriteFood,
    forAttemptNumber,
    confirYourPasswodText,
    newAndConfirmPassMissMatch,
    previousHintText,
    nextHintText,
    showHintText,
    hintText,
    fillAllTheBoxes,
    attemptedLabel,
    totalLabel,
    cancelLabel,
    typeSomethingLabel,
    progressLabel,
    removeLabel,
    rewardEmptyState,
    notifiedTeacherToResetPass,
    notifiedParentToResetPass,
    teacherBtnText,
    parentBtnText,
    notifiedMindsparkToResetPass,
    weWillGetBackText,
    passResetApprovalExpiredText,
    passResetExpiredMessage,
    requestAgainPlease,
    maxAttemptReachedText,
    youAlreadyHavePendingPassRequest,
    resetPassLabel,
    askHelpFromYourLabel,
    emailUsAtLabel,
    orLabel,
    userNamePlaceHolder,
    newToMindSparkText,
    pleaseEnterValidOtp,
    sentOtpToParent,
    yourSubEndedMsg,
    cantOpenUrl,
    starredQuestionEmptyState,
    messageEmptyState,
    choseSubjectTxt,
    preciousTreasureText,
    mathsSubject,
    englishSubjectText,
    scienceSubjectText,
    mathematicians_dont_give_up,
    scientists_dont_give_up,
    your_extra_effort_really_helped,
    you_meet_all_challenges,
    great_to_see_you_work_hard,
    you_can_do_better,
    ask_doubts_to_leave_behind,
    try_carefully_to_overcome,
    parentDetailsMissing,
    useOtherOption,
    goBackText,
    students_find_this_tough,
    upgradeToGetAccess,
    lockedText,
    profileCompleteText,
    server_down_error,
    connectOnWhatsApp,
    askADoubt,
    bookmarks,
    bookmarkedQuestion,
    feedback,
    learnBtnText,
    topicsText,
    accuracyText,
    questionsAttemptedText,
    passagesAttemptedText,
    viewPassageText,
    viewWordMeaningText,
    prevText,
    genericEmptyText,
    profileClass,
    hoorayText,
    anotherAudioPlayingText,
    invalidAudioFileText,
    audioInitialisingText,
    workSheetNumberOfQuestions,
    outOfUnitsCompleted,
    outOfUnitCompleted,
    viewMapText,
    changeSubject,
    helpNeedQuery,
    helpNeedTimeQuery,
    haveAnAccount,
    loginWithExistingMindsparkId,
    trustedDeviceMaxLimitMsg,
    idleLoggedOutMsg,
    yourSessionEndedText,
    yourSessionExpiryMsgText,
    wasdueOnText,
    showQuestion,
    hideQuestion,
    saveMyLoginIdAndPassword,
    activityTxt,
    UnitTxt,
    UnitsTxt,
    teacherLoginError,
    goText,
    need_help,
    previewText,
    correctAnswerTextOther,
    testInstuction,
    skippedText,
    emptyContent,
    emptyContentDesc,
    yourDistrict,
    yourNationalRanking,
    certificatesLabel,
    certificateNotFound,
    appMaintenanceDescription,
    appBannerDescription,
    appMaintenanceTitle,
    baselineTitleText,
    midlineTitleText,
    endlineTitleText,
    baselineInstruction,
    midlineInstruction,
    endlineInstruction,
    getReadyText,
    internationalInstruction,
    privacyPolicy
  };
};