import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

let isIPhoneX = false;
const height = 896;
const width = 414;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV) {
  isIPhoneX = (width === X_WIDTH && height === X_HEIGHT) || (width === XSMAX_WIDTH && height === XSMAX_HEIGHT);
}

export const respHp = (orientation, percentage) => {
  if (orientation === 'PORTRAIT') {
    return hp(percentage);
  } else {
    return wp(percentage);
  }
};

export const respWp = (orientation, percentage) => {
  if (orientation === 'PORTRAIT') {
    return wp(percentage);
  } else {
    return hp(percentage);
  }
};

export const getHp = (pixels = height) => {
  return hp(((pixels / height) * 100).toFixed(2));
};

export const getWp = (pixels = width) => {
  return wp(((pixels / width) * 100).toFixed(2));
};

export const getStatusBarHeight = () => {
  return isIPhoneX ? 44 : 20;
};

export const getAspectRation = () => {
  return wp('100') / hp('100');
};

export const toTitleCase = str => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const checkForAudio = quesData => {
  console.log('CHECK AUDIO:', quesData.indexOf('<audio>'));
  let newQData = quesData;
  if (quesData.indexOf('<audio>') > -1) {
    newQData = quesData.replace('controls', '');
  }
  return newQData;
};

export const camelCaseToString = (string = '') => {
  return toTitleCase(string.replace(/([a-z0-9])([A-Z])/g, '$1 $2'));
};

export { hp, wp };

export const notificationRedirection = (notificationDetails, navigation) => {
  switch (notificationDetails?.redirectionCode.toLowerCase()) {
    case 'message':
      navigation.navigate('MailBoxScreen');
      break;
    case 'settings':
      navigation.navigate('ChangeTextPassWordScreen');
      break;
    case 'profile':
      navigation.navigate('ProfileScreen');
      break;
    case 'worksheet_list_page':
    case 'worksheet_page':
    case 'worksheetpage':
    case 'worksheetlist':
    case 'worksheetlistpage':
    case 'new_worksheet':
      navigation.navigate('WorksheetListScreen');
      break;
    case 'leaderboard':
      navigation.navigate('Leaderboard');
      break;
    case 'topicmap':
    case 'topic_map_page':
    case 'topics_page':
    case 'topicspage':
    case 'topiclistpage':
      if (typeof notificationDetails?.redirectionData === 'object') {
        navigation.navigate('TopicMapScreen', { topicID: notificationDetails?.redirectionData?.id });
      } else {
        navigation.navigate('TopicListingScreen');
      }
      break;
    case 'bell':
      navigation.navigate('NotificationScreen');
      break;
    case 'rewards_page':
      navigation.navigate('RewardsScreen', { tab: 'certificates' });
      break;
    default:
      navigation.navigate('DashboardScreen');
      break;
  }
}