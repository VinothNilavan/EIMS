/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/**
|--------------------------------------------------
| TopicMapScreen:
|--------------------------------------------------
*/

import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';
import { useStores } from '@mobx/hooks';
import { HigherLevelMap } from '@images';
import { TopicStat, MapItem, RoundedButton, SmallRoundButton, BalooThambiRegTextView, BalooThambiBoldTextView, DetailsScreen, CustomModal } from '@components';
import { runInAction } from 'mobx';
import { API } from '@api';
import { setAsValue, unitsCheck, replaceString, screenLogging } from '@utils';
import styles from './indexCss';
import { useLanguage } from '@hooks';
import { useBackHandler } from '@react-native-community/hooks';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, COLORS, ApiEndPoint, ScreenNames } from '@constants';

const TopicMapScreen = props => {
  const [showButtonList, setshowButtonList] = useState(false);
  const { topic, topicID } = props.route.params;
  const [topicDetails, setTopicDetails] = useState({});
  const [TopicList, setTopicList] = useState([]);
  const [update, setUpdate] = useState(false);
  const flatListRef = useRef(null);
  const store = useStores();
  const { appStore } = useStores();
  const [buttonArray, setButtonArray] = useState([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const { startText, continueText, higherLevelLabel, howIdidText,
    staredPularText, secondAttemptText, thirdAttemptText, stAttemptText,
    thAttemptText, outOfUnitsCompleted } = useLanguage();

  const auth = useContext(AuthContext);

  const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.topicMap : {};

  const evaluateProgress = () => {
    const { grade } = store.appStore.userData;
    const conDetails = topicDetails.contentDetails;
    if (grade > 3) {
      return (((conDetails.unitsCleared / conDetails.unitsOverall) * 100).toFixed(0) + '%');
    } else {
      return (conDetails.unitsCleared + '/' + conDetails.unitsOverall);
    }
  };

  useBackHandler(() => { return props.navigation.goBack(); });

  const tractMixEvent = (event = MixpanelEvents.HOW_I_DID) => {
    auth.trackEvent('mixpanel', event, { Category: MixpanelCategories.TOPIC, Action: MixpanelActions.CLICKED, Label: `` });
  }

  const crashLog = () => { screenLogging('TopicMapScreen', appStore?.userData); };

  useEffect(() => { (async () => {
      let contentId = topic?.contentID !== null && topic?.contentID !== '' && typeof topic?.contentID !== 'undefined' ? topic?.contentID : topicID;

      const req = { body: { topicID: contentId }, store };
      try {
        const response = await API(ApiEndPoint.GET_TOPIC_DETAILS, req);
        if (response.data.resultCode === 'C001') {
          // set topicDetails
          setTopicDetails(response.data);
          constructBaseList(response.data);
          createButtonList(response.data);
          let userData = store.appStore.userData;
          if (userData) {
            if (!userData?.sparkies) {
              userData.sparkies = store.appStore.userData.sparkies;
            }
          }
        } else {
          if (response.status && response.data?.resultMessage && response.data?.resultMessage != '') {
            store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
          }
        }
      } catch (e) {
        console.log(`Topic details error>>>${e}`);
      }
      crashLog();
    })();
  }, [constructBaseList, topic, setTopicDetails, store]);

  const constructBaseList = data => {
    let topicList = data.topicData.unitList.slice();
    if (topicList && topicList.length && topicList.length > 0) {
      let higherTopicList = data.topicData.higherLevelUnitList.slice();
      let tempArray = [];
      let index = 0;
      topicList.unshift({});
      topicList.forEach(item => {
        let obj = {
          topic: item.unitID,
          name: item.unitName,
          profileUrl: store?.appStore.userData.avatar,
          title: index === 0 ? 'GO' : String(index),
          percentage: index === 0 ? 0 : item.contentAccuracy,
          position: index % 2 === 0 ? 'left' : 'right',
          isActive:
            index === 0
              ? true
              : (item.unitStatus === 'completed' &&
                index !== topicList.length - 1 &&
                topicList[index + 1].unitStatus) ||
              (item.unitStatus === 'completed' &&
                index === topicList.length - 1 &&
                higherTopicList.length !== 0),
          showProfile: false,
          showFlag:
            index === topicList.length - 1 &&
            item.unitStatus === 'completed' &&
            higherTopicList.length !== 0,
          showBottomEdge: index === 1 ? false : true,
          bottomEdgePlay: item.unitStatus,
          animationDuration:
            item.unitStatus === 'in-progress' ||
              (item.unitStatus === 'completed' &&
                index === topicList.length - 1 &&
                !higherTopicList.length) ||
              (item.unitStatus === 'completed' &&
                index !== topicList.length - 1 &&
                !topicList[index + 1].unitStatus)
              ? 5000
              : 50,
          type: 'lower',
        };
        tempArray.push(obj);
        index = index + 1;
      });
      if (data.topicData.higherLevelStatus) {
        tempArray.push({
          type: 'higherLevelLogo',
        });
      }

      if (higherTopicList && higherTopicList.length) {
        index = 0;
        higherTopicList.unshift({});
        higherTopicList.forEach(item => {
          let obj = {
            topic: index === 0 ? 'ab' : item.unitID,
            name: item.unitName,
            profileUrl: store.appStore.userData.avatar,
            title: index === 0 ? 'GO' : String(index),
            percentage: index === 0 ? 0 : item.contentAccuracy,
            position: index % 2 !== 0 ? 'left' : 'right',
            isActive:
              index === 0
                ? data.topicData.higherLevelAttemptNumber === 1
                : item.unitStatus === 'completed' &&
                index !== higherTopicList.length - 1 &&
                higherTopicList[index + 1].unitStatus,
            showProfile: false,
            showFlag:
              index === higherTopicList.length - 1 &&
              item.unitStatus === 'completed',
            showBottomEdge: index === 0 ? false : true,
            bottomEdgePlay: item.unitStatus,
            animationDuration:
              item.unitStatus === 'in-progress' ||
                (item.unitStatus === 'completed' &&
                  index === higherTopicList.length - 1) ||
                (item.unitStatus === 'completed' &&
                  !higherTopicList[index + 1].unitStatus)
                ? 5000
                : 50,
            type: 'higher',
          };
          tempArray.push(obj);
          index = index + 1;
        });
      }

      setTopicList(tempArray);
      setTimeout(() => {
        scrollToIndex();
      }, 3000);
    }
  };

  const scrollToIndex = () => {
    try {
      if (flatListRef && flatListRef.current) {
        flatListRef.current.scrollToIndex({ animated: true, index: 0 });
      }
    } catch (err) {
      console.log('TopicMapScreen scrollToIndex = ', err);
    }
  }

  const createButtonList = data => {
    let buttons = [];
    if (data.contentDetails.buttons && data.contentDetails.buttons.length) {
      buttons = buttons.concat(data.contentDetails.buttons);
    }
    if (data.topicMetrics.buttons && data.topicMetrics.buttons.length) {
      buttons = buttons.concat(data.topicMetrics.buttons);
    }
    if (data.topicData.higherLevelButton) {
      let temp = {
        type: 'higherLevel',
        state: data.topicData.higherLevelButton,
      };

      buttons.push(temp);
    }

    let index = 0;
    buttons = buttons.filter(item => item.state.trim() !== '');
    //check revice button permission
    if (
      buttons[0] &&
      buttons[0].type == 'revise' &&
      !permissions.reviseButton
    ) {
      buttons.shift();
    }
    buttons.forEach(item => {
      index = index + 1;
      console.log('\nIndex', index);
      switch (item.type) {
        case 'learn':
          if (item.state === 'redo') {
            item.name = getAttemptString(
              startText,
              data.contentDetails.contentAttemptNumber + 1,
            );
          } else if (item.state === 'continue') {
            item.name = continueText;
            if (index > 1) {
              item.name = getAttemptString(
                continueText,
                data.contentDetails.contentAttemptNumber,
              );
            }
          } else if (item.state === 'start') {
            item.name = startText;
          } else {
            item.name = item.state;
          }
          break;
        case 'revise':
          item.name = item.state;
          break;
        case 'higherLevel':
          item.name = item.state + ` ${higherLevelLabel}`;
          break;
        case 'report':
          if (item.state === 'howIDid') {
            item.name = howIdidText;
          } else {
            item.name = item.state;
          }
          break;
        case 'favourites':
          item.name = staredPularText;
          break;
      }
    });

    console.log('\nButton Array', buttons);
    setButtonArray(buttons);
  };

  const getAttemptString = (title, attempt) => {
    if (attempt === 1) {
      return `${title} ${attempt}${stAttemptText} `;
    } else if (attempt === 2) {
      return `${title} ${secondAttemptText} `;
    } else if (attempt === 3) {
      return `${title} ${thirdAttemptText}`;
    } else {
      return `${title} ${replaceString(
        thAttemptText,
        'attemptNumber',
        attempt,
      )}`;
    }
  };

  const renderMapItem = data => {
    if (!data.item.topic) {
      return (
        <MapItem
          testID={`${data.index}`}
          type="initial"
          topicName={data.item.name}
          showProfile={data.item.showProfile}
          profileUrl={data.item.profileUrl}
          isActive={true}
          percentage={data.item.percentage}
          topEdgePlay={TopicList[1].bottomEdgePlay}
          animationDuration={TopicList[1].animationDuration}
          topEdgeOnFinishCallback={() => {
            if (TopicList[1].animationDuration > 100) {
              let temp = TopicList;
              temp[1].isActive = true;
              temp[1].showProfile = true;
              setTopicList(temp);
              setUpdate(!update);
            }
          }}
          showFlag={data.item.showFlag}
        />
      );
    } else if (data.item.position == 'right') {
      return (
        <View style={styles.mapItemLRAlign}>
          <MapItem
            testID={data.index}
            type="right"
            showTopArrow={data.item.showTopEdge}
            animationDuration={data.item.animationDuration}
            showBottomArrow={data.item.showBottomEdge}
            showProfile={data.item.showProfile}
            profileUrl={data.item.profileUrl}
            isActive={data.item.isActive}
            percentage={data.item.percentage}
            text={data.item.title}
            topicName={data.item.name}
            bottomEdgePlay={data.item.bottomEdgePlay}
            bottomEdgeOnFinishCallback={() => {
              if (data.item.animationDuration > 100) {
                let temp = TopicList;
                temp[data.index].isActive = true;
                temp[data.index].showProfile = true;
                if (data.index == TopicList.length - 1) {
                  temp[data.index].showFlag = true;
                }
                setTopicList(temp);
                setUpdate(!update);
              }
            }}
            showFlag={data.item.showFlag}
          />
        </View>
      );
    } else if (data.item.position == 'left') {
      return (
        <View style={styles.mapItemLRAlign}>
          <MapItem
            testID={data.index}
            type="left"
            animationDuration={data.item.animationDuration}
            showTopArrow={data.item.showTopEdge}
            showBottomArrow={data.item.showBottomEdge}
            showProfile={data.item.showProfile}
            profileUrl={data.item.profileUrl}
            isActive={data.item.isActive}
            percentage={data.item.percentage}
            text={data.item.title}
            topicName={data.item.name}
            bottomEdgePlay={data.item.bottomEdgePlay}
            bottomEdgeOnFinishCallback={() => {
              if (data.item.animationDuration > 100) {
                let temp = TopicList;
                temp[data.index].isActive = true;
                temp[data.index].showProfile = true;
                if (data.index == TopicList.length - 1) {
                  temp[data.index].showFlag = true;
                }
                setTopicList(temp);
                setUpdate(!update);
              }
            }}
            showFlag={data.item.showFlag}
          />
        </View>
      );
    }
  };

  const renderCombindedViews = data => {
    if (data.item.type == 'lower') {
      return renderMapItem(data);
    } else if (data.item.type == 'higherLevelLogo') {
      return (
        <View>
          <HigherLevelMap
            accessible={true}
            testID={`TopicMapRenderCombindedViews${data.index}`}
            accessibilityLabel={`TopicMapRenderCombindedViews${data.index}`}
            style={styles.higherLevelMap}
          />
        </View>
      );
    } else if (data.item.type == 'higher') {
      return renderMapItem(data);
    }
  };

  const renderButtonItem = data => {
    console.log('ITEMS>', data);
    return (
      <View style={styles.leftSideButtonsList}>
        <TouchableOpacity
          accessible={true}
          testID={`TopicMapRenderButtonTouchableComp${data.name}`}
          accessibilityLabel={`TopicMapRenderButtonTouchableComp${data.name}`}
          onPress={() => {
            data.item.name === ('continue Higher Level' || 'start Higher Level')
              ? store.qnaStore.setIsHigherLevelQuestion(true)
              : store.qnaStore.setIsHigherLevelQuestion(false);
            if (data.item.type === 'report' && data.item.state === 'howIDid') {
              tractMixEvent();
              props.navigation.navigate(ScreenNames.HowIDidScreen, { topic: topic });
            } else if (data.item.type === 'favourites') {
              props.navigation.navigate(ScreenNames.StarredQuestionsScreen);
            } else {
              if (data.item.name == 'continue Higher Level' || data.item.name === 'start Higher Level') {
                tractMixEvent(MixpanelEvents.HIGHER_LEVEL);
                startHigerLevel();
              } else {
                tractMixEvent(MixpanelEvents.TOPIC_CONTINUE);
                callOpenTopic(data.item);
              }
            }
          }}>
          <BalooThambiRegTextView
            testID={`TopicMapRenderButtonDataItemName${data.name}`}
            style={styles.btnOverlayText}>
            {data.item.name.toUpperCase()}
          </BalooThambiRegTextView>
        </TouchableOpacity>
      </View>
    );
  };

  const renderButtonList = () => {
    if (showButtonList) {
      return (
        <View style={styles.btmLeftBtnContainer}>
          <FlatList
            data={buttonArray.slice(1)}
            renderItem={renderButtonItem}
            keyExtractor={item => item.name}
            ItemSeparatorComponent={() => {
              return sepatatorView();
            }}
          />
        </View>
      );
    }
  };

  const callOpenTopic = async button => {

    if (store.uiStore.displayedHomeUsagePopup) {
      store.uiStore.setIsHomeUsageDone(true); 
      return;
    }

    let req = {
      body: {
        topicID: topicDetails.contentDetails.contentID,
        mode: button.type,
        action: button.state,
      },
      store: store,
    };
    try {
      let res = await API(ApiEndPoint.OPEN_TOPIC, req);
      let responseData = res.data;
      let redirectionCode = responseData.redirectionCode;
      let responeMsg = responseData.resultMessage;
      let redirectionData = responseData.redirectionData;
      let responseCode = responseData.resultCode;

      if (responseCode == 'C004' && redirectionCode == 'ContentPage') {
        runInAction(() => { store.qnaStore.topicId = topicDetails.contentDetails.contentID; });
        props.navigation.replace(ScreenNames.TopicQnAScreen);
      } else if (responseCode == 'C004' && responeMsg == 'redirect' && redirectionCode.toLowerCase() == 'invalid contentid') {
        setShowErrorAlert(true);
      } else if (responseCode == 'C004' && responeMsg == 'redirect' && redirectionData.sessionTimeExceededFlag == true) {
        store.qnaStore.reset();
        store.loginStore.setIsAuth(false);
        await setAsValue('jwt', '');
        store.appStore.setJwt(null);
        store.loginStore.setSkipOnBoardingScreen(true);
      } else {
        store.uiStore.apiErrorInit({ code: response.status, message: responeMsg });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startHigerLevel = async () => {
    let req = {
      body: { topicID: topicDetails.contentDetails.contentID },
      store: store,
    };
    try {
      let res = await API(ApiEndPoint.START_HIGHER_LEVEL, req);
      if (res.data.resultCode == 'C004' && res.data.redirectionCode == 'ContentPage') {
        runInAction(() => {
          store.qnaStore.topicId = topicDetails.contentDetails.contentID;
        });
        props.navigation.replace(ScreenNames.TopicQnAScreen);
      } else if (res.data.resultCode == 'C004' && res.data.resultMessage == 'redirect' && res.data.redirectionData.sessionTimeExceededFlag == true) {
        store.qnaStore.reset();
        store.loginStore.setIsAuth(false);
        await setAsValue('jwt', '');
        store.appStore.setJwt(null);
        store.loginStore.setSkipOnBoardingScreen(true);
      } else {
        store.uiStore.apiErrorInit({
          code: response.status,
          message: res.data?.resultMessage,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderButtons = () => {
    let rightBtnStyle = { ...styles.btmBtnStyle };
    if (buttonArray.length > 2) {
      rightBtnStyle = { ...styles.btmBtnStyle, ...styles.longBtnBtnStyle };
    }
    return (
      <View style={styles.btmBtnMainContainer}>
        {renderButtonList()}
        <View
          style={[
            styles.btmBtnContainer,
            buttonArray.length > 2 ? styles.singleBtmBtn : null,
            buttonArray.length === 1 ? styles.startBtn : null,
          ]}>
          {buttonArray.length === 2 ? (
            <RoundedButton
              testID="RoundedButtonsTopicMapBtmLeftBtnText"
              type="secondaryWhite"
              text={buttonArray[1].name.toUpperCase()}
              textStyle={styles.btmLeftBtnText}
              onPress={() => {
                store.qnaStore.setIsHigherLevelQuestion(false);
                if (buttonArray[1].type === 'report' && buttonArray[1].state === 'howIDid') {
                  tractMixEvent();
                  props.navigation.navigate(ScreenNames.HowIDidScreen, { topic: topic });
                } else {
                  tractMixEvent(MixpanelEvents.TOPIC_CONTINUE);
                  callOpenTopic(buttonArray[1]);
                }
              }}
              width={styles.btmBtnStyle.width}
              height={styles.btmBtnStyle.height}
            />
          ) : (
            buttonArray.length > 2 && (
              <SmallRoundButton
                testID="SmallRoundButtonTopicMapShowButtonList"
                onPress={() => {
                  setshowButtonList(!showButtonList);
                }}
                containerStyle={styles.leftArrowContainer}
                iconName="caretup"
                iconColor={COLORS.orange}
                iconTheme="AntDesign"
                type="secondaryWhite"
                width={styles.leftArrowContainer.width}
                height={styles.leftArrowContainer.height}
              />
            )
          )}
          <RoundedButton
            testID="RoundedButtonsTopicMapButtonArrayName"
            type="elevatedOrange"
            text={buttonArray[0].name.toUpperCase()}
            onPress={() => {
              store.qnaStore.setIsHigherLevelQuestion(false);
              tractMixEvent(MixpanelEvents.TOPIC_START);
              if (buttonArray[0].type === 'report' && buttonArray[0].state === 'howIDid') {
                tractMixEvent();
                props.navigation.navigate(ScreenNames.HowIDidScreen, { topic: topic });
              } else {
                if (buttonArray[0].name == 'revise') {
                  tractMixEvent(MixpanelEvents.REVISE);
                } else {
                  tractMixEvent(MixpanelEvents.TOPIC_CONTINUE);
                }
                callOpenTopic(buttonArray[0]);
              }
            }}
            textStyle={styles.btmRightBtnText}
            width={rightBtnStyle.width}
            height={rightBtnStyle.height}
          />
        </View>
      </View>
    );
  };

  let desc = null;

  if (topicDetails.contentDetails) {
    if (store.appStore?.userLanguage == 'en-IN') {
      desc = `${topicDetails.contentDetails.unitsCleared} out of ${unitsCheck(
        topicDetails.contentDetails.unitsOverall,
      )} completed`;
    } else {
      let temp = replaceString(
        outOfUnitsCompleted,
        'unitsCleared',
        topicDetails.contentDetails.unitsCleared
          ? topicDetails.contentDetails.unitsCleared
          : '',
      );

      temp = replaceString(
        temp,
        'unitsOverall',
        unitsCheck(topicDetails.contentDetails.unitsOverall)
          ? unitsCheck(topicDetails.contentDetails.unitsOverall)
          : '',
      );
      temp = replaceString(temp, 'units', '');
      temp = replaceString(temp, 'unit', '');
      desc = temp;
    }
  }

  const headerBtnClickHandler = () => {
    tractMixEvent(MixpanelEvents.GO_BACK_TO_TOPIC_TAB);
    props.navigation.navigate(ScreenNames.TopicListingScreen);
  };

  return (
    <DetailsScreen
      testID="DetailsScreenTopicMap"
      headerBtnType="back"
      headerBtnClick={headerBtnClickHandler}
      headerTitle={topicDetails?.contentDetails?.contentName}
      headerDesc={topicDetails?.topicMetrics?.attempt > 1 ? '' : desc}
      svgUrl={topicDetails?.contentDetails?.topicIcon}
      footerContainerStyle={styles.footerContainerStyle}
      showAnimation
      bgName="bgMap"
      bgFooterName="bgFooterInner">
      {topicDetails && topicDetails.topicMetrics && (
        <View style={styles.innerContainer}>
          <View style={styles.subContainer}>
            <View style={styles.innerSubContainer}>
              <View style={styles.topicStatContainer}>
                <TopicStat
                  testID="TopicStatTopicMap"
                  attempt={topicDetails.topicMetrics.attempt}
                  progress={evaluateProgress()}
                  accuracy={topicDetails.topicMetrics.accuracy}
                  permissions={permissions}
                  showProgress={
                    topicDetails?.contentDetails?.contentSubMode ===
                      'higherLevel' ||
                      topicDetails?.contentDetails?.contentAttemptNumber > 1
                      ? false
                      : true
                  }
                />
              </View>
              <View style={styles.contentContainer}>
                <FlatList
                  ref={flatListRef}
                  nestedScrollEnabled={true}
                  contentContainerStyle={{}}
                  data={TopicList}
                  inverted={true}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={renderCombindedViews}
                />
              </View>
            </View>
          </View>
          {buttonArray.length > 0 && renderButtons()}
        </View>
      )}
      {showErrorAlert &&
        <CustomModal
          containerStyle={styles.modalContainerAlertStyle}
          show={showErrorAlert}
          btnText={"OK"}
          showBtn={false}
          onPress={() => { props.navigation.navigate(ScreenNames.DashboardScreen); }}>
          <View style={styles.errorView}>
            <BalooThambiBoldTextView style={styles.textStyle}>
              {"Error"}
            </BalooThambiBoldTextView>
            {<BalooThambiRegTextView style={styles.secondaryTextStyle}>
              {"Invalid Content ID"}
            </BalooThambiRegTextView>}
          </View>
        </CustomModal>
      }
    </DetailsScreen>
  );
};

export default observer(TopicMapScreen);

const sepatatorView = () => {
  return <View style={styles.btmLeftBtnSeparator} />;
};
