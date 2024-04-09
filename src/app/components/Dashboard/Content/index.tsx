import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import LargeButton from './LargeButton';
import styles from './indexCss';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { useLanguage } from '@hooks';
import PropTypes from 'prop-types';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, ScreenNames } from '@constants';
import { walkthroughable, CopilotStep } from 'react-native-copilot';

const WalkthroughableView = walkthroughable(View);

enum ButtonType {
  topic = 'topic',
  homework = 'homework',
  worksheet = 'worksheet',
  game = 'game'
}

const Content = props => {
  const { testID, containerStyle } = props;
  const navigation = useNavigation();
  const { uiStore } = useStores();
  const {
    worksheetBtnText,
    topicsText,
    gameBtnText,
    homeWorkBtnText,
    learnBtnText,
  } = useLanguage();
  const auth = useContext(AuthContext);

  const onButtonCTA = type => {
    switch (type) {
      case ButtonType.topic:
        auth.trackEvent('mixpanel', MixpanelEvents.TOPIC_PAGE_OPEN, {
          Category: MixpanelCategories.TOPIC,
          Action: MixpanelActions.CLICKED,
          Label: '',
        });
        navigation.navigate(ScreenNames.TopicListingScreen);
        break;
      case ButtonType.homework:
        auth.trackEvent('mixpanel', MixpanelEvents.HOMEWORK_PAGE_OPEN, {
          Category: MixpanelCategories.HOMEWORK,
          Action: MixpanelActions.CLICKED,
          Label: '',
        });
        navigation.navigate(ScreenNames.HomeworkListScreen);
        break;
      case ButtonType.worksheet:
        auth.trackEvent('mixpanel', MixpanelEvents.WORKSHEET_PAGE_OPEN, {
          Category: MixpanelCategories.Worksheet,
          Action: MixpanelActions.CLICKED,
          Label: '',
        });
        navigation.navigate(ScreenNames.WorksheetListScreen);
        break;
      case ButtonType.game:
        auth.trackEvent('mixpanel', MixpanelEvents.GAMES_PAGE_OPEN, {
          Category: MixpanelCategories.GAMES,
          Action: MixpanelActions.CLICKED,
          Label: '',
        });
        navigation.navigate(ScreenNames.GameListingScreen);
        break;
    }
  };

  return (
    <View
      accessible={true}
      testID={testID}
      accessibilityLabel={testID}
      style={{ ...styles.container, ...containerStyle }}>
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {uiStore.menuDataPermissions?.home?.topics &&
          (uiStore.showHomepageOverlay ? (
            <CopilotStep
              text="Start your learning journey by clicking here.!"
              order={3}
              name="Topic">
              <WalkthroughableView>
                <LargeButton
                  testID="LargeButtonContentTopicBtnText"
                  text={topicsText}
                  clicked={() => onButtonCTA(ButtonType.topic)}
                />
              </WalkthroughableView>
            </CopilotStep>
          ) : (
            <View>
              <LargeButton
                testID="LargeButtonContentTopicBtnText"
                text={topicsText}
                clicked={() => onButtonCTA(ButtonType.topic)}
              />
            </View>
          ))}
        {uiStore?.menuDataPermissions?.home?.langlearn && (
          <LargeButton
            text={learnBtnText}
            clicked={() => {
              navigation.navigate(ScreenNames.DiscreSkillMapScreen);
            }}
          />
        )}
        {uiStore.menuDataPermissions?.home?.homeworks && (
          <LargeButton
            testID="LargeButtonContentHomeWorkBtnText"
            text={homeWorkBtnText}
            clicked={() => onButtonCTA(ButtonType.homework)}
          />
        )}
        {uiStore.menuDataPermissions?.home?.worksheets && (
          <LargeButton
            testID="LargeButtonContentWorkSheetBtnText"
            text={worksheetBtnText}
            clicked={() => onButtonCTA(ButtonType.worksheet)}
          />
        )}
        {uiStore.menuDataPermissions?.home?.games &&
          (uiStore.showHomepageOverlay ? (
            <CopilotStep
              text="Complete topics and make learning fun! Unlock games here."
              order={4}
              name="Games">
              <WalkthroughableView>
                <LargeButton
                  testID="LargeButtonContentGameBtnText"
                  text={gameBtnText}
                  clicked={() => onButtonCTA(ButtonType.game)}
                />
              </WalkthroughableView>
            </CopilotStep>
          ) : (
            <View>
              <LargeButton
                testID="LargeButtonContentGameBtnText"
                text={gameBtnText}
                clicked={() => onButtonCTA(ButtonType.game)}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

Content.propTypes = {
  testID: PropTypes.string,
};

Content.defaultProps = {
  testID: 'Content',
};

export default observer(Content);
