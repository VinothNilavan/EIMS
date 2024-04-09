/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import { View, SectionList, SafeAreaView } from 'react-native';
import styles from './indexCss';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Game, RoundedButton, InfoPopup, BalooThambiRegTextView } from '@components';
import TextfontSize from '@constants/TextfontSize';
import { getWp, getAsValue, setAsValue } from '@utils';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { useStores } from '@mobx/hooks';
import { useNavigation } from '@react-navigation/native';
import { API } from '@api';
import { runInAction } from 'mobx';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLanguage } from '@hooks';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, ApiEndPoint, ScreenNames } from '@constants';

const GameListingContent = props => {
  const { testID, gameList, showMoreObj, toggleMoreOrLess } = props;

  const { sessionTimedOut, seeMore, seeLess, letsCompleteTopc, toUnlockGame, uhHoText } = useLanguage();
  const [showInactiveModal, setShowInactiveModal] = useState({ visible: false, content: '' });
  const navigation = useNavigation();
  const store = useStores();
  const auth = useContext(AuthContext);

  const callOpenActivity = async data => {

    if (!configGameActive(data)) {
      setShowInactiveModal({ visible: true, content: data?.item?.topicName });
      return false;
    }

    if (store.uiStore.displayedHomeUsagePopup) {
      store.uiStore.setIsHomeUsageDone(true); 
      return;
    }

    runInAction(() => {
      store.appStore.activityID = data.item.contentID;
    });
    const reqBody = {
      jwt: await getAsValue('jwt'),
      store: store,
      body: { activityID: data.item.contentID },
    };
    const res = await API(ApiEndPoint.OPEN_ACTIVITY, reqBody);
    try {
      if (res.data.resultCode === 'C004') {
        if (res?.data?.resultMessage == 'redirect' && res?.data?.redirectionData?.sessionTimeExceededFlag) {
          store.uiStore.apiErrorInit({ code: '200', message: sessionTimedOut });
          store.qnaStore.reset();
          store.loginStore.setIsAuth(false);
          await setAsValue('jwt', '');
          store.appStore.setJwt(null);
          store.loginStore.setSkipOnBoardingScreen(true)
        } else {
          navigation.navigate(ScreenNames.GamePlayArenaScreen, { data: data.item });
        }
      } else if (res.data.resultCode === 'C002') {
        console.warn('Res data>', JSON.stringify(res.data));
      }
    }
    catch (error) {
      console.log('res game error', error);
    }
  };

  const renderGameItem = data => {
    let isActive = configGameActive(data);
    return (
      <View
        accessible={true}
        testID={testID}
        accessibilityLabel={testID}
        style={styles.mainContainer}>
        <TouchableOpacity onPress={() => {
          auth.trackEvent('mixpanel', MixpanelEvents.PLAY_GAME, { "Category": MixpanelCategories.GAMES, "Action": MixpanelActions.CLICKED, "Label": "" });
          callOpenActivity(data)
        }}>
          <Game testID="GameGameListingContent"
            image={data.item.contentImage}
            title={data.item.contentName}
            isActive={isActive}
            onPress={() => { }}
            desc={data.item.parentContentName}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderGameSectionHeader = data => {
    return (
      <BalooThambiRegTextView
        testID="GameListingContentTitle"
        style={styles.header}>
        {data.section.title}
      </BalooThambiRegTextView>
    );
  };

  const renderGameSectionFooter = getMoreGameSection(gameList, showMoreObj, seeMore, seeLess, toggleMoreOrLess);

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <InfoPopup
            testID="InfoPopupGameListingContent"
            show={showInactiveModal.visible}
            svgText={uhHoText}
            onPress={() =>
              setShowInactiveModal({ ...showInactiveModal, visible: false })
            }
            desc={letsCompleteTopc}
            highlightText={showInactiveModal?.content == '' ? 'Topic not found' : showInactiveModal?.content}
            desc_end={toUnlockGame}
          />
          <SectionList
            accessible={true}
            testID="GameListingContentSectionList"
            accessibilityLabel="GameListingContentSectionList"
            sections={gameList}
            keyExtractor={(item, index) => item + index}
            renderItem={renderGameItem}
            renderSectionHeader={renderGameSectionHeader}
            renderSectionFooter={renderGameSectionFooter}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

GameListingContent.propTypes = {
  testID: PropTypes.string
};

GameListingContent.defaultProps = {
  testID: 'GameListingContent'
};
export default observer(GameListingContent);

const configGameActive = (data) => {
  return data.section.key == 'locked' ? false : true;
}
const getMoreGameSection = (gameList, showMoreObj, seeMore, seeLess, toggleMoreOrLess) => {
  return data => {
    if (gameList[data.section.index] && gameList[data.section.index].showMoreBtn) {
      let showMoreBtn = showMoreObj[data.section.key];
      return (
        <View style={styles.footer}>
          <RoundedButton
            testID="RoundedButtonGameListingContentShowMore"
            type="teacherBlue"
            text={showMoreBtn === 0 ? `${seeMore}` : `${seeLess}`}
            borderRadius={50}
            width={getWp('100')}
            height={hp('4')}
            textStyle={{ fontSize: TextfontSize.Text14 }}
            onPress={() => {
              console.log('showMoreObj:', showMoreObj);
              console.log('Key:', data.section.key);
              console.log('Index:', data.section.index);
              toggleMoreOrLess(data.section.key, data.section.index);
            }} />
        </View>
      );
    }
  };
}