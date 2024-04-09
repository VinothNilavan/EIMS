/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/**
|--------------------------------------------------
| TopicMapScreen:
|--------------------------------------------------
*/

import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';
import { ApiEndPoint, ScreenNames } from '@constants';
import { HigherLevelMap } from '@images';
import {
  MapItem,
  RoundedButton,
  BalooThambiRegTextView,
  DetailsScreen,
  DiscreteSkillStat,
  BalooThambiBoldTextView,
  CustomModal
} from '@components';

import { useStores } from '@mobx/hooks';
import { runInAction } from 'mobx';
import { API } from '@api';
import { getHp, screenLogging } from '@utils';
import styles from './indexCss';
import { useLanguage } from '@hooks';

const DiscreteSkillMapScreen = props => {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showButtonList, setshowButtonList] = useState(false);
  const [discreteSkillDetails, setDiscreteSkillDetails] = useState({});
  const [discreteSkillList, setDiscreteSkillList] = useState([]);
  const [update, setUpdate] = useState(false);
  const flatListRef = useRef(null);
  const store = useStores();
  const { appStore } = useStores();
  const [buttonArray, setButtonArray] = useState([]);
  const [continueDisabled, setContinueDisabled] = useState(false);
  const isRTL = store?.uiStore?.isRTL;

  const { howIdidText, continueText, goText } = useLanguage();

  const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.topicMap : {};

  const crashLog = () => {
    screenLogging("DiscreteSkillMapScreen", appStore?.userData);
  }

  useEffect(() => {
    (async () => {
      const req = { body: {}, store };
      try {
        const response = await API(ApiEndPoint.GET_USER_PROGRESS_DETAIL_DISCRETE_SKILL, req);
        if (response.data.resultCode === 'C001') {
          // set discreteSkillDetails
          setDiscreteSkillDetails(response.data);
          constructBaseList(response.data);
          createButtonList(response.data);
        } else {
          store.uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
        }
      } catch (e) {
        console.log(`DISCRETE_SKILL details error>>>${e}`);
      }
      crashLog();
    })();
  }, []);

  const constructBaseList = data => {
    let discreteSkillList = data.pedagogyList.slice();
    if (
      discreteSkillList &&
      discreteSkillList.length &&
      discreteSkillList.length > 0
    ) {
      let tempArray = [];
      let index = 0;
      discreteSkillList.unshift({});
      discreteSkillList.forEach(item => {
        let obj = {
          topic: item.pedagogyID,
          name: item.pedagogyName,
          title: index === 0 ? goText : String(index),
          percentage: 0,
          position: isRTL ? index % 2 === 0 ? 'right' : 'left' : index % 2 === 0 ? 'left' : 'right',
          isActive:
            index === 0
              ? true
              : (item.pedagogyStatus === 'completed' &&
                index !== discreteSkillList.length - 1 &&
                discreteSkillList[index + 1].pedagogyStatus) ||
              (item.pedagogyStatus === 'completed' &&
                index === discreteSkillList.length - 1),
          showProfile: false,
          showFlag: false,
          showStar: false,
          showBottomEdge: index === 1 ? false : true,
          bottomEdgePlay: item.pedagogyStatus,
          animationDuration:
            item.pedagogyStatus === 'in-progress' ||
              (item.pedagogyStatus === 'completed' &&
                index === discreteSkillList.length - 1) ||
              (item.pedagogyStatus === 'completed' &&
                index !== discreteSkillList.length - 1 &&
                !discreteSkillList[index + 1].pedagogyStatus)
              ? 5000
              : 50,
          type: 'lower',
        };
        tempArray.push(obj);
        index = index + 1;
      });
      console.log('\ntemp Array\n', tempArray);

      setDiscreteSkillList(tempArray);
      if (
        discreteSkillList.length ===
        discreteSkillList.filter(
          dsItem => dsItem.pedagogyStatus === 'completed',
        ).length
      ) {
        setContinueDisabled(true);
      }
      setTimeout(() => {
        if (flatListRef && flatListRef.current) {
          flatListRef.current.scrollToIndex({ animated: true, index: 0 });
        }
      }, 3000);
    }
  };

  const createButtonList = data => {
    let buttons = [{ type: 'learn', state: 'continue' }, { type: 'report', state: 'howIDid' }];

    let index = 0;
    buttons = buttons.filter(item => item.state.trim() !== '');
    //check revice button permission
    if (buttons[0] && buttons[0].type == 'revise' && !permissions.reviseButton) {
      buttons.shift();
    }
    console.log('buttons :>> ', buttons);
    buttons.forEach(item => {
      index = index + 1;
      switch (item.type) {
        case 'learn':
          if (item.state === 'redo') {
            item.name = getAttemptString(
              'Start',
              data.contentDetails.contentAttemptNumber + 1,
            );
          } else if (item.state === 'continue') {
            item.name = 'Continue';
            if (index > 1) {
              item.name = getAttemptString(
                'Continue',
                data.contentDetails.contentAttemptNumber,
              );
            }
          } else {
            console.log(`cmg here else >>>>${item.state}`);
            item.name = item.state;
          }
          break;
        case 'revise':
          item.name = item.state;
          break;
        case 'higherLevel':
          item.name = item.state + ' Higher Level';
          break;
        case 'report':
          if (item.state === 'howIDid') {
            item.name = 'How I Did';
          } else {
            item.name = item.state;
          }
          break;
        case 'favourites':
          item.name = 'Starred Questions';
          break;
      }
    });

    console.log('\nButton Array', buttons);
    setButtonArray(buttons);
  };

  const getAttemptString = (title, attempt) => {
    if (attempt === 1) {
      return `${title} ${attempt}st attempt `;
    } else if (attempt === 2) {
      return `${title} 2nd attempt `;
    } else if (attempt === 3) {
      return `${title} 3rd attempt `;
    } else {
      return `${title} ${attempt}th attempt `;
    }
  };

  const renderMapItem = data => {
    if (!data.item.topic) {
      return (
        <MapItem
          type="initial"
          topicName={data.item.name}
          text={data.item.title}
          showProfile={data.item.showProfile}
          profileUrl={data.item.profileUrl}
          isActive={true}
          percentage={data.item.percentage}
          topEdgePlay={discreteSkillList[1].bottomEdgePlay}
          animationDuration={discreteSkillList[1].animationDuration}
          topEdgeOnFinishCallback={() => {
            if (discreteSkillList[1].animationDuration > 100) {
              let temp = discreteSkillList;
              temp[1].isActive = true;
              temp[1].showProfile = true;
              setDiscreteSkillList(temp);
              setUpdate(!update);
            }
          }}
          showFlag={data.item.showFlag}
          showStar={data.item.showStar}
        />
      );
    } else
      if (data.item.position == 'right') {
        return (
          <View style={styles.mapItemLRAlign}>
            <MapItem
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
                  let temp = discreteSkillList;
                  temp[data.index].isActive = true;
                  temp[data.index].showProfile = true;
                  if (data.index == discreteSkillList.length - 1) {
                    temp[data.index].showFlag = true;
                  }
                  setDiscreteSkillList(temp);
                  setUpdate(!update);
                }
              }}
              showFlag={data.item.showFlag}
              showStar={data.item.showStar}
            />
          </View>
        );
      } else if (data.item.position == 'left') {
        return (
          <View style={styles.mapItemLRAlign}>
            <MapItem
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
                  let temp = discreteSkillList;
                  temp[data.index].isActive = true;
                  temp[data.index].showProfile = true;
                  if (data.index == discreteSkillList.length - 1) {
                    temp[data.index].showFlag = true;
                  }
                  setDiscreteSkillList(temp);
                  setUpdate(!update);
                }
              }}
              showFlag={data.item.showFlag}
              showStar={data.item.showStar}
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
          <HigherLevelMap style={styles.higherLevelMap} />
        </View>
      );
    } else if (data.item.type == 'higher') {
      return renderMapItem(data);
    }
  };

  const renderButtonItem = data => {
    return (
      <View style={styles.leftSideButtonsList}>
        <TouchableOpacity
          onPress={() => {
            if (data.item.type === 'report' && data.item.state === 'howIDid') {
              props.navigation.navigate(ScreenNames.DiscreteSkillReportScreen);
            } else {
              callOpenDiscreteSkill(data.item);
            }
          }}>
          <BalooThambiRegTextView style={styles.btnOverlayText}>
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
              return <View style={styles.btmLeftBtnSeparator} />;
            }}
          />
        </View>
      )
    }
  };

  const callOpenDiscreteSkill = async button => {
    
    if (store.uiStore.displayedHomeUsagePopup) {
      store.uiStore.setIsHomeUsageDone(true); 
      return;
    }

    let req = {
      body: {
        discreteSkillID: discreteSkillDetails.inProgressPedagogyID,
        mode: 'Test'
      },
      store: store,
    };
    try {
      let res = await API(ApiEndPoint.OPEN_DISCRETE_SKILL, req);
      let responseData = res.data;
      let redirectionCode = responseData.redirectionCode;

      if (responseData.resultCode == 'C004' && responseData.redirectionCode == 'ContentPage') {
        runInAction(() => { store.qnaStore.topicId = discreteSkillDetails.inProgressPedagogyID; });
        props.navigation.navigate(ScreenNames.DiscreteSkillQnAScreen);
      } else if (responseData.resultCode == 'C004' && responseData.resultMessage == 'redirect' && redirectionCode.toLowerCase() == 'invalid contentid') {
        setShowErrorAlert(true);
      } else {
        store.uiStore.apiErrorInit({ code: res.status, message: responseData?.resultMessage });
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
            isRTL ? styles.RTLbtmBtnContainer : styles.btmBtnContainer,
            buttonArray.length > 2 ? styles.singleBtmBtn : null,
            buttonArray.length === 1 ? styles.startBtn : null,
          ]}>
          <RoundedButton
            type="secondaryWhite"
            text={howIdidText.toUpperCase()}
            textStyle={styles.btmLeftBtnText}
            onPress={() => {
              if (
                buttonArray[1].type === 'report' &&
                buttonArray[1].state === 'howIDid'
              ) {
                props.navigation.navigate(ScreenNames.DiscreteSkillReportScreen, {
                  trailType: 'overall',
                });
              } else {
                //Toast.show({text: buttonArray[1].name.toUpperCase()});
                callOpenDiscreteSkill(buttonArray[1]);
              }
            }}
            width={styles.btmBtnStyle.width}
            height={styles.btmBtnStyle.height}
          />
          <RoundedButton
            type="elevatedOrange"
            text={continueText.toUpperCase()}
            onPress={() => {
              if (
                buttonArray[0].type === 'report' &&
                buttonArray[0].state === 'howIDid'
              ) {
                props.navigation.navigate(ScreenNames.DiscreteSkillReportScreen, {
                  trailType: 'overall',
                });
              } else {
                callOpenDiscreteSkill(buttonArray[0]);
              }
            }}
            textStyle={styles.btmRightBtnText}
            width={rightBtnStyle.width}
            height={rightBtnStyle.height}
            disabled={continueDisabled}
          />
        </View>
      </View>
    );
  };

  const headerBtnClickHandler = () => {
    props.navigation.goBack();
  };
  return (
    <DetailsScreen
      headerBtnType="naandi_home"
      headerBtnClick={headerBtnClickHandler}
      headerTitle={discreteSkillDetails?.inProgressPedagogyName}
      headerDesc=""
      svgUrl=""
      footerContainerStyle={styles.footerContainerStyle}
      showAnimation
      bgName="bgMap"
      bgFooterName="bgFooterInner">
      {discreteSkillDetails && (
        <View style={styles.innerContainer}>
          <View style={styles.subContainer}>
            <View style={styles.innerSubContainer}>
              <View style={[styles.topicStatContainer, { marginTop: getHp(15) }]}>
                {discreteSkillDetails.reportMetrics && (
                  <DiscreteSkillStat
                    passageAttempt={
                      discreteSkillDetails.reportMetrics?.PassagesAttempted
                    }
                    questionAttempt={
                      discreteSkillDetails.reportMetrics?.questionsAttempted
                    }
                    accuracy={
                      discreteSkillDetails.reportMetrics?.overallAccuracy
                    }
                    permissions={permissions}
                    isRTL={isRTL}
                  />
                )}
              </View>
              <View style={styles.contentContainer}>
                <FlatList
                  ref={flatListRef}
                  nestedScrollEnabled={true}
                  contentContainerStyle={{}}
                  data={discreteSkillList}
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

export default observer(DiscreteSkillMapScreen);