/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native';
import {
  WorkListingContent, CommonHeader, SVGImageBackground, DashboardFooter, BalooThambiBoldTextView,
  CustomModal, BalooThambiRegTextView
} from '@components';
import { useStores } from '@mobx/hooks';
import { API } from '@api';
import { useLanguage } from '@hooks';
import styles from './indexCss';
import moment from 'moment';
import { screenLogging, replaceString } from '@utils';
import { TimedWorksheetModal } from '@hoc';
import { useBackHandler } from '@react-native-community/hooks';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, ApiEndPoint, ScreenNames } from '@constants';
import { useToast } from 'native-base';

const WorksheetListScreen = props => {
  const { liveWorksheetText, olderWorksheetText, letsGoBtnText, workSheetNumberOfQuestions } = useLanguage();
  const store = useStores();
  const [allWorkSheet, setAllWorkSheet] = useState([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { appStore, uiStore } = useStores();
  const [sectionedWorkSheet, setSectionedWorkSheet] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedWorsheetData, setSelectedWorksheetData] = useState(null);
  const [showSearchQueryEmptyMessage, setShowSearchQueryEmptyMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const Toast = useToast();
  let infoMsg = '';
  const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.worksheetList : {};
  let response;

  const crashLog = () => {
    screenLogging("WorksheetListScreen", appStore?.userData);
  }

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const req = { body: {}, store };
        try {
          setLoading(true);

          response = await API(ApiEndPoint.FETCH_WORKSHEETS, req);
          let responseData = response.data;

          if (responseData.resultCode === 'C001') {
            setLoading(false);
            setShowEmptyMessage(!(responseData.worksheetList.length > 0));
            setAllWorkSheet(responseData.worksheetList);
            //Find if priority topic
            let liveWorksheet = [];
            let expiredWorksheet = [];
            responseData.worksheetList.forEach(item => {
              if (item.actions.actionText === 'expired' || item.contentStatus === 'deactive') {
                expiredWorksheet.push(item);
              } else {
                liveWorksheet.push(item);
              }
            });

            setSectionList(liveWorksheet, expiredWorksheet, "calledByApi");
          } else {
            if (response.status && responseData?.resultMessage && responseData?.resultMessage != "") {
              store.uiStore.apiErrorInit({ code: response.status, message: responseData?.resultMessage });
            }
            setLoading(false);
          }
        } catch (e) {
          setLoading(false);
          console.log(`Topic list error>>>${e}`);
        }
        crashLog();
      })();
    }, []),
  );

  useBackHandler(() => { return props.navigation.navigate(ScreenNames.DashboardScreen); });

  useEffect(() => {
    console.log('CALLED1', searchQuery);
    let liveWorksheet = [];
    let expiredWorksheet = [];
    allWorkSheet.forEach(item => {
      if (item.contentName.toLocaleUpperCase().indexOf(searchQuery.toLocaleUpperCase()) != -1) {
        if (item.actions.actionText === 'expired' || item.contentStatus === 'deactive') {
          expiredWorksheet.push(item);
        } else {
          liveWorksheet.push(item);
        }
      }
    });

    let emptyStateTriggeredBy
    if (searchQuery == '') {
      emptyStateTriggeredBy = "apiData"
    } else {
      emptyStateTriggeredBy = "searchQuery"
    }

    setSectionList(liveWorksheet, expiredWorksheet, emptyStateTriggeredBy);
  }, [allWorkSheet, searchQuery]);

  const setSectionList = (liveWorksheet, expiredWorksheet, emptyStateTriggeredBy) => {
    let section = [];
    if (liveWorksheet.length > 0) {
      section.push({ title: liveWorksheetText, data: liveWorksheet });
    }
    if (expiredWorksheet.length > 0) {
      section.push({ title: olderWorksheetText, data: expiredWorksheet });
    }

    if (emptyStateTriggeredBy == "apiData") {
      setShowEmptyMessage(!(section.length > 0));
    }

    if (emptyStateTriggeredBy == "searchQuery") {
      setShowSearchQueryEmptyMessage(!(section.length > 0));
    }
    setSectionedWorkSheet(section);
  };

  const onSearchChange = val => { setSearchQuery(val); };

  const headerBtnClickHandler = () => {
    props.navigation.navigate(ScreenNames.DashboardScreen);
  };

  const callOpenWorkSheet = async worksheet => {

    if (store.uiStore.displayedHomeUsagePopup) {
      store.uiStore.setIsHomeUsageDone(true); 
      return;
    }

    let eventName = worksheet.actions.actionText == "start" ? MixpanelEvents.WORKSHEET_OPEN : MixpanelEvents.WORKSHEET_CONTINUE;
    auth.trackEvent('mixpanel', eventName, { "Category": MixpanelCategories.WORKSHEET, "Action": MixpanelActions.CLICKED, "Label": '' });

    let req = {
      body: { worksheetID: worksheet.contentID, mode: 'test' },
      store: store,
    };
    try {
      let res = await API(ApiEndPoint.OPEN_WORKSHEET, req);
      let responseData = res.data;
      let redirectionCode = responseData.redirectionCode;
      if (responseData.resultCode == 'C004' && responseData.resultMessage == 'redirect' && redirectionCode.toLowerCase() == 'invalid contentid') {
        setShowErrorAlert(true);
      } else if (responseData.resultCode === 'C004' && redirectionCode === 'ContentPage') {
        store.qnaStore.worksheetID = worksheet.contentID;
        store.qnaStore.setWorksheetInfo(worksheet);
        props.navigation.navigate(ScreenNames.WorksheetQnAScreen, { worksheet: worksheet });
      } else if (responseData.resultCode == 'C004' && responseData.resultMessage == 'redirect' && responseData.redirectionData.sessionTimeExceededFlag == true) {
        store.uiStore.apiErrorInit({ code: '200', message: sessionTimedOut });
      } else if (responseData.resultCode === 'C004' && responseData.resultMessage === 'redirect') {
        store.uiStore.apiErrorInit({ code: '200', message: responseData.error[0] });
      } else if (responseData.resultCode === 'C900') {
        if (!Toast.isActive(8)) {
          Toast.show({ id: 8, description: responseData.resultMessage, duration: 2000 });
        }
      }
    } catch (error) { }
  };

  const checkWorksheetstatus = (data) => {
    if (data?.endDateTime && data?.endDateTime != ' ') {
      infoMsg = `Due on ${moment(data?.endDateTime).format('DD MMM YY')}`;
    }
    if (data?.actions?.actionText === 'start') {
      setSelectedWorksheetData(data);
      setVisiblePopup(true);
    } else {
      callOpenWorkSheet(data);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SVGImageBackground testID="SVGImageBackgroundListingDashboard" SvgImage="bgDashboard" themeBased screenBg>
        <CommonHeader testID="HeaderListing" type={"home"} onClick={headerBtnClickHandler} headerBtnType="home" />

        <View style={[styles.contentContainer, permissions.worksheetSearch && !showEmptyMessage ? { flex: 0.7 } : { flex: 0.85 }]}>
          <WorkListingContent
            testID="WorkListingContentWorksheetList"
            sectionList={sectionedWorkSheet}
            onSearch={onSearchChange}
            searchQuery={searchQuery}
            permissions={permissions}
            showEmptyMessage={showEmptyMessage}
            showSearchQueryEmptyMessage={showSearchQueryEmptyMessage}
            loading={loading}
            onClickItem={(data) => { checkWorksheetstatus(data) }}
          />

          <TimedWorksheetModal
            onPress={() => {
              store.qnaStore.setIsOpenedFirstTime(false);
              callOpenWorkSheet(selectedWorsheetData);
              setVisiblePopup(false);
            }}
            isVisible={visiblePopup}
            topic={selectedWorsheetData?.contentName}
            infoMessage={infoMsg}
            subtitle={replaceString(
              workSheetNumberOfQuestions,
              'total',
              selectedWorsheetData?.totalQuestions,
            )}
            title={liveWorksheetText}
            isTimed={selectedWorsheetData?.timed}
            buttonText={letsGoBtnText}
            time={selectedWorsheetData?.totalTime}
          />

        </View>
        <View style={styles.footerContainer}>
          <DashboardFooter
            footerOnPress={() => {
              auth.trackEvent('mixpanel', MixpanelEvents.GO_TO_HOME_FOOTER_PROFILE, { "Category": MixpanelCategories.PROFILE, "Action": MixpanelActions.CLICKED, "Label": "" });
              props.navigation.navigate(ScreenNames.ProfileScreen);
            }}
            permissions={Object.keys(uiStore.menuDataPermissions).length > 0 ? uiStore.menuDataPermissions.home : {}}
            containerStyle={{ position: 'relative' }}
          />
        </View>
        {showErrorAlert &&
          <CustomModal
            containerStyle={styles.modalContainerAlertStyle}
            show={showErrorAlert}
            btnText={"OK"}
            showBtn={false}
            onPress={() => {    
              props.navigation.navigate(ScreenNames.DashboardScreen);
            }}>
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
      </SVGImageBackground>
    </View>
  );
};

export default WorksheetListScreen;
