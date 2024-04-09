import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useStores } from '@mobx/hooks';

// //Login Flow
import ForgotPasswordScreen from '@screens/login/ForgotPasswordScreen';
import OTPScreen from '@screens/login/OTPScreen';
import ContactDetailsMissing from '@screens/login/ContactDetailsMissing';
import LoginScreen from '@screens/login/LoginScreen';
import PicturePasswordScreen from '@screens/login/PicturePasswordScreen';
import TextPasswordScreen from '@screens/login/TextPasswordScreen';
import SubscriptionEndedScreen from '@screens/login/SubscriptionEnded';

// //Dashboard
import DashboardScreen from '@screens/dashboard/DashboardScreen';
import GameListingScreen from '@screens/dashboard/GameListingScreen';
import GamePlayArenaScreen from '@screens/dashboard/GamePlayScreen';
import IntroductionScreen from '@screens/dashboard/IntroductionScreen';
import HowIDidScreen from '@screens/dashboard/HowIDidScreen';
import TopicQnAScreen from '@screens/dashboard/TopicQnAScreen';
import TopicListingScreen from '@screens/dashboard/TopicListingScreen';
import TopicMapScreen from '@screens/dashboard/TopicMapScreen';
import TopicSummaryScreen from '@screens/dashboard/TopicSummaryScreen';
import RewardsScreen from '@screens/menu/RewardsScreen';
import SelectSubjectScreen from '@screens/login/SelectSubjectScreen';
import WorksheetListScreen from '@screens/dashboard/WorksheetListScreen';
import WorksheetReportScreen from '@screens/dashboard/WorksheetReportScreen';
import WorksheetQnAScreen from '@screens/dashboard/WorksheetQnAScreen';
import NotificationListScreen from '@screens/dashboard/NotificationListScreen';
import CommonReportScreen from '@screens/dashboard/CommonReportScreen';


//Homework Screen
import HomeworkListScreen from '@screens/homework/HomeworkListScreen';
import HomeworkReportScreen from '@screens/homework/HomeworkReportScreen';
import HomeworkSummaryScreen from '@screens/homework/HomeworkSummaryScreen';
import HomeworkQnAScreen from '@screens/homework/HomeworkQnAScreen';

import PreviewQuestionSearchScreen from '@screens/dashboard/PreviewQuestionSearchScreen';
import PreviewQuestionScreen from '@screens/dashboard/PreviewQuestionScreen';
// //Menu

import MailBoxScreen from '@screens/menu/MailBoxScreen';
import ProfileScreen from '@screens/menu/ProfileScreen';
import StarredQuestionsScreen from '@screens/menu/StarredQuestionsScreen';
import LeaderboardScreen from '@screens/menu/LeaderboardScreen';
import ChangeTextPassWordScreen from '@screens/menu/ChangeTextPassWordScreen';
import ChangePicturePasswordScreen from '@screens/menu/ChangePicturePasswordScreen';
import ChangeNewPicturePasswordScreen from '@screens/menu/ChangeNewPicturePasswordScreen';
import CurrentPicturePasswordScreen from '@screens/menu/CurrentPicturePasswordScreen';
import NewMessageScreen from '@screens/menu/NewMessageScreen';
import MailDetailsScreen from '@screens/menu/MailDetailsScreen';

// //common
import MessagesScreen from '@screens/common/MessagesScreen';

//Screening Test
import ScreenTestScreen from '@screens/screenTest/ScreenTestScreen';
import ScreeningTestReportScreen from '@screens/screenTest/ScreeningTestReportScreen';
import DiscreSkillMapScreen from '@screens/DiscreteSkill/DiscreteSkillMapScreen';
import DiscreteSkillReportScreen from '@screens/DiscreteSkill/DiscreteSkillReportScreen';
import DiscreteSkillQnAScreen from '@screens/DiscreteSkill/DiscreteSkillQnAScreen';
import DiscreteSkillSessionReportScreen from '@screens/DiscreteSkill/DiscreteSkillSessionReportScreen';

// //New Login Flow
import ValidateOTPScreen from '@screens/login/ValidateOTPScreen';
import SelectionScreen from '@screens/login/SelectionScreen';
import StudentDetailsScreen from '@screens/login/StudentDetailsScreen';

import ContactNumberScreen from '@screens/login/ContactNumberScreen';
import OnBoardingScreen from '@screens/login/OnBoardingScreen';
import ExploreMindsparkScreen from '@screens/login/ExploreMindsparkScreen';

const LoginStackNavigator = createStackNavigator();

export const LoginNavigator = () => {
  const { loginStore } = useStores();
  let initialRoute = loginStore.isSkipOnBoardingScreen === true ? 'LoginScreen' : 'OnBoardingScreen';
  return (
    <LoginStackNavigator.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}>
      <LoginStackNavigator.Screen
        name="ContactNumberScreen"
        component={ContactNumberScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen name="LoginScreen" component={LoginScreen} />
      <LoginStackNavigator.Screen
        name="ValidateOTPScreen"
        component={ValidateOTPScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="ContactDetailsMissing"
        component={ContactDetailsMissing}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="ExploreMindsparkScreen"
        component={ExploreMindsparkScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="PicturePasswordScreen"
        component={PicturePasswordScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="TextPasswordScreen"
        component={TextPasswordScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="SubscriptionEndedScreen"
        options={{ headerShown: false }}
        component={SubscriptionEndedScreen}
      />
      <LoginStackNavigator.Screen
        name="SelectionScreen"
        component={SelectionScreen}
        options={{ headerShown: false }}
      />
      <LoginStackNavigator.Screen
        name="StudentDetailsScreen"
        component={StudentDetailsScreen}
      />
    </LoginStackNavigator.Navigator>
  );
};

const DashboardStackNavigator = createStackNavigator();

export const DashboardNavigator = () => {
  const store = useStores();
  const data = store.appStore.userRedirectionData;

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  let initialRoute =
    data && data.length ? 'SelectSubjectScreen' : 'DashboardScreen';
  return (
    <DashboardStackNavigator.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}>
      <DashboardStackNavigator.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />

      <DashboardStackNavigator.Screen
        name="SubscriptionEndedAleartScreen"
        component={SubscriptionEndedScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="SelectSubjectScreen"
        component={SelectSubjectScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="TopicListingScreen"
        component={TopicListingScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="StarredQuestionsScreen"
        component={StarredQuestionsScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="TopicMapScreen"
        component={TopicMapScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />

      <DashboardStackNavigator.Screen
        name="HowIDidScreen"
        component={HowIDidScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="CommonReportScreen"
        component={CommonReportScreen}
        options={{ headerShown: false, animationEnabled: true, transitionSpec: { open: config, close: config } }}
      />
      <DashboardStackNavigator.Screen
        name="TopicQnAScreen"
        component={TopicQnAScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="MailBoxScreen"
        component={MailBoxScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="MailDetailsScreen"
        component={MailDetailsScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="NewMessageScreen"
        component={NewMessageScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="GameListingScreen"
        component={GameListingScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="TopicSummaryScreen"
        component={TopicSummaryScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="WorksheetListScreen"
        component={WorksheetListScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="WorksheetQnAScreen"
        component={WorksheetQnAScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="WorksheetReportScreen"
        component={WorksheetReportScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="HomeworkListScreen"
        component={HomeworkListScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="HomeworkReportScreen"
        component={HomeworkReportScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="HomeworkSummaryScreen"
        component={HomeworkSummaryScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="HomeworkQnAScreen"
        component={HomeworkQnAScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="GamePlayArenaScreen"
        component={GamePlayArenaScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="ChangeTextPassWordScreen"
        component={ChangeTextPassWordScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="CurrentPicturePasswordScreen"
        component={CurrentPicturePasswordScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="ChangePicturePasswordScreen"
        component={ChangePicturePasswordScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="ChangeNewPicturePasswordScreen"
        component={ChangeNewPicturePasswordScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="PreviewQnASearchScreen"
        component={PreviewQuestionSearchScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="PreviewQnAScreen"
        component={PreviewQuestionScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="NotificationScreen"
        component={NotificationListScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="ScreenTestScreen"
        component={ScreenTestScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="ScreeningTestReportScreen"
        component={ScreeningTestReportScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="DiscreSkillMapScreen"
        component={DiscreSkillMapScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="DiscreteSkillReportScreen"
        component={DiscreteSkillReportScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="DiscreteSkillQnAScreen"
        component={DiscreteSkillQnAScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="DiscreteSkillSessionReportScreen"
        component={DiscreteSkillSessionReportScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <DashboardStackNavigator.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{ headerShown: false }}
      />
      <DashboardStackNavigator.Screen
        name="IntroductionScreen"
        component={IntroductionScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
    </DashboardStackNavigator.Navigator>
  );
};