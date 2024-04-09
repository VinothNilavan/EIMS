// External Imports
import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { useStores } from '@mobx/hooks';
import { runInAction } from 'mobx';
import moment from 'moment';

// Internal Imports
import { RoundedButton, BalooThambiRegTextView, CommonHeader, SVGImageBackground, DashboardFooter,
  CustomModal, BalooThambiBoldTextView } from '@components';

import styles from './style';
import { API } from '@api';
import { getMonthYear } from '@utils';
import { HomeworkListContent, HomeworkStartModal } from '@hoc';
import { HomeworkEmptyState } from '@images';
import { getWp, screenLogging } from '@utils';
import { useLanguage } from '@hooks';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions, ApiEndPoint, ScreenNames } from '@constants';
import { useBackHandler } from '@react-native-community/hooks';
import { useToast } from 'native-base';

const HomeworkListScreen = props => {
  const Toast = useToast();
  const store = useStores();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { homeWorkEmptyStateText, homeWorkSearchEmptyText, goHomeBtnText, NoHomeWorkAssignedInThisMonth } =
    useLanguage();
  const { appStore, uiStore } = useStores();
  const { homeworkStore } = store;
  const [allLiveHomeworks, setAllLiveHomeworks] = useState([]);
  const [allCompletedHomeworks, setAllCompletedHomeworks] = useState([]);
  const [liveHomeworks, setLiveHomeworks] = useState([]);
  const [completedHomeworks, setCompletedHomeworks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [emptyMessage, setEmptyMessage] = useState(homeWorkEmptyStateText);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [enableHomeworkModal, setEnableHomeworkModal] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [isWorkSheetButtonEnabled, setIsWorkSheetButtonEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);

  const permissions = Object.keys(store.uiStore.menuDataPermissions).length > 0 ? store.uiStore.menuDataPermissions.homeworkList : {};

  useBackHandler(() => { return props.navigation.navigate(ScreenNames.DashboardScreen); });

  useEffect(() => {
    homeworkStore.setHomeworkDates([moment()]);
    homeworkStore.setCurrentDate(moment());
    fetchHomeworks();
    crashLog();
  }, []);

  const crashLog = () => {
    screenLogging("HomeworkListScreen", appStore?.userData);
  }

  useEffect(() => {
    if (selectedHomework !== null) {
      setEnableHomeworkModal(true);
    }
  }, [selectedHomework]);

  useEffect(() => {
    if (!checkPoints) {
      setEmptyMessage(NoHomeWorkAssignedInThisMonth);
      setLiveHomeworks(allLiveHomeworks);
      setCompletedHomeworkSection(allCompletedHomeworks);
      return;
    }
    if (searchQuery !== null && searchQuery !== '') {
      let liveHomeworks = [];
      let completedHomeworks = [];

      allLiveHomeworks.forEach(homework => {
        if (homework?.name.toLocaleUpperCase().indexOf(searchQuery.toLocaleUpperCase()) != -1) {
          liveHomeworks.push(homework);
        }
      });

      allCompletedHomeworks.forEach(homework => {
        if (homework?.name.toLocaleUpperCase().indexOf(searchQuery.toLocaleUpperCase()) != -1) {
          completedHomeworks.push(homework);
        }
      });

      setEmptyMessage(homeWorkSearchEmptyText);
      setShowEmptyMessage( !(liveHomeworks.length > 0 && completedHomeworks.length > 0) );
      setLiveHomeworks(liveHomeworks);
      setCompletedHomeworkSection(completedHomeworks);
    }
  }, [allCompletedHomeworks, allLiveHomeworks, searchQuery]);

  const fetchHomeworks = async () => {
    try {
      const req = {
        body: { homeworkType: 'all' },
        store
      };
      setLoading(true);
      const response = await API(ApiEndPoint.GET_MY_HOMEWORKKS_V3, req);
      if (response.data.resultCode === 'C001') {
        const dataResponse = response?.data?.data;
        setAllLiveHomeworks(dataResponse?.live);
        setLiveHomeworks(dataResponse?.live);
        const updateHomeworks = updateCompletedHomeworks(
          dataResponse?.completed,
        );
        setAllCompletedHomeworks(updateHomeworks);
        setCompletedHomeworkSection(updateHomeworks);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(`Homework List Error>>>${e}`);
    }
  };

  const fetchHomeworkByMonthAndYear = async (date) => {
    const year = moment(date).format('Y');
    try {
      const req = {
        body: {
          homeworkType: 'completed',
          month: moment(date).format('M'),
        },
        store,
      };
      setLoading(true);
      const response = await API(ApiEndPoint.GET_MY_HOMEWORKKS_V3, req);
      if (response.data.resultCode === 'C001') {
        const dataResponse = response?.data?.data?.completed.filter(item => {
          return moment(item.endDate).format('Y') === year;
        });
        const allCompletedHomeworkList = allCompletedHomeworks.concat(
          updateCompletedHomeworks(dataResponse),
        );
        setAllCompletedHomeworks(allCompletedHomeworkList);
        setLiveHomeworks(allLiveHomeworks);
        setCompletedHomeworkSection(allCompletedHomeworkList);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(`Homework List Error>>>${e}`);
    }
  };

  const updateCompletedHomeworks = completedHomeworks => {
    if (completedHomeworks !== null && completedHomeworks !== undefined) {
      completedHomeworks.map(
        homework =>
          (homework.month_year = getMonthYear(homeworkStore?.currentMonth)),
      );
    }

    return completedHomeworks;
  };

  const setCompletedHomeworkSection = completedHomeworks => {
    if (
      completedHomeworks !== null &&
      typeof completedHomeworks !== 'undefined'
    ) {
      let allMonthYear = homeworkStore?.homeworkDates.map(date =>
        getMonthYear(date),
      );
      const completedHomeworkSection = allMonthYear.map(month => {
        let sectionData = {};
        const filterHomeworks = completedHomeworks.filter(
          item => item?.month_year === month,
        );
        sectionData.title = month;
        sectionData.data = filterHomeworks;

        return sectionData;
      });

      setCompletedHomeworks(completedHomeworkSection);
    }
  };

  const mixpanelTrackEvent = (hwString) => {
    auth.trackEvent('mixpanel', hwString, { Category: MixpanelCategories.HOMEWORK, Action: MixpanelActions.CLICKED, Label: '' });
  }

  const openHomework = async homework => {

    if (store.uiStore.displayedHomeUsagePopup) {
      store.uiStore.setIsHomeUsageDone(true); 
      return;
    }

    if ( homework != null && typeof homework !== 'undefined' && isWorkSheetButtonEnabled ) {
      mixpanelTrackEvent(homework?.status ? MixpanelEvents.HOMEWORK_CONTINUE : MixpanelEvents.HOMEWORK_OPEN);
      setIsWorkSheetButtonEnabled(false);
      setEnableHomeworkModal(false);

      try {
        const req = {
          body: { homeworkID: homework?.homeworkId, mode: 'test' },
          store,
        };

        const res = await API(ApiEndPoint.OPEN_HOMEWORK, req);
        let redirectionCode = res.data.redirectionCode;

        if ( res.data.resultCode === 'C004' && res.data.redirectionCode === 'ContentPage' ) {
          runInAction(() => {
            store.qnaStore.setHomeworkID(homework?.homeworkId);
            store.qnaStore.setHomeworkInfo(homework);
          });
          props.navigation.replace(ScreenNames.HomeworkQnAScreen, { homework: homework });
          setSelectedHomework(null);
        } else if (res.data.resultCode == 'C004' && res.data.resultMessage == 'redirect' && redirectionCode.toLowerCase() == 'invalid contentid') {
          setShowErrorAlert(true); 
        } else if (res.data.resultCode === 'C900') {
          Toast.show({ text: res.data.resultMessage, duration: 2000 });
        }
        setIsWorkSheetButtonEnabled(true);
      } catch (error) {
        console.log(`Open Homework Error>>>${error}`);
      }
    }
  };

  const headerBtnClickHandler = () => {
    props.navigation.navigate(ScreenNames.DashboardScreen);
  };

  const onHomeworkPressed = homework => {
    const actionText = homework?.actions && homework?.actions.length > 0 && homework?.actions[0] && homework?.actions[0].actionText ? homework?.actions[0].actionText : '';

    if (homework?.status === 'in-progress' && actionText !== 'See Report') {
      openHomework(homework);
    } else if (homework?.status !== 'complete' && actionText !== 'See Report') {
      setSelectedHomework(homework);
    } else {
      mixpanelTrackEvent(MixpanelEvents.HOMEWORK_SEE_REPORT);
      props.navigation.navigate(ScreenNames.HomeworkReportScreen, { homework: homework });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SVGImageBackground testID="SVGImageBackgroundListingDashboard" SvgImage="bgDashboard" themeBased screenBg>
        <CommonHeader testID="HeaderListing" type={"home"} onClick={headerBtnClickHandler} headerBtnType="home" containerStyle={{ marginTop: -16 }} />
        <View style={styles.contentContainer}>
          {liveHomeworks.length === 0 && completedHomeworks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <HomeworkEmptyState
                accessible={true}
                testID="HomeworkListEmptyStateSvg"
                accessibilityLabel="HomeworkListEmptyStateSvg"
                width={getWp(150)}
                style={styles.emptyStateIcon}
              />
              {loading === false && (
                <BalooThambiRegTextView
                  testID="HomeworkListEmptyStateText"
                  style={styles.textColor}>
                  {homeWorkEmptyStateText}
                </BalooThambiRegTextView>
              )}
              {loading === false && (
                <RoundedButton
                  testID="RoundedButtonHomeworkListGoHomeBtn"
                  onPress={() => {
                    props.navigation.navigate(ScreenNames.DashboardScreen);
                  }}
                  type="primaryOrange"
                  text={goHomeBtnText}
                  width={150}
                  containerStyle={{ ...styles.goHomeBtnContainer }}
                />
              )}
            </View>
          ) : (
            <HomeworkListContent
              testID="HomeworkListContentHomeworkList"
              liveHomeworks={liveHomeworks}
              completedHomeworks={completedHomeworks}
              onSearch={setSearchQuery}
              searchQuery={searchQuery}
              permissions={permissions}
              showEmptyMessage={showEmptyMessage}
              onPress={onHomeworkPressed}
              emptyMessage={emptyMessage}
              oldHomeworkBtnPressed={() => {
                const previouseDate = moment(
                  homeworkStore?.currentMonth,
                ).subtract(1, 'months');
                homeworkStore.setCurrentDate(previouseDate);
                homeworkStore.setHomeworkDates(
                  homeworkStore?.homeworkDates.concat(previouseDate),
                );
                fetchHomeworkByMonthAndYear(previouseDate);
              }}
            />
          )}
          <HomeworkStartModal
            testID="HomeworkStartHomeworkListContent"
            isVisible={enableHomeworkModal}
            homework={selectedHomework}
            onSkipBtnPressed={() => {
              setSelectedHomework(null);
              setEnableHomeworkModal(false);
            }}
            onStartBtnPressed={openHomework}
          />
        </View>
        <DashboardFooter
          footerOnPress={() => {
            auth.trackEvent('mixpanel', MixpanelEvents.GO_TO_HOME_FOOTER_PROFILE, { "Category": MixpanelCategories.PROFILE, "Action": MixpanelActions.CLICKED, "Label": "" });
            props.navigation.navigate(ScreenNames.ProfileScreen);
          }}
          permissions={Object.keys(uiStore.menuDataPermissions).length > 0 ? uiStore.menuDataPermissions.home : {}}
          containerStyle={{ position: 'relative' }}
        />
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

HomeworkListScreen.propTypes = {};

HomeworkListScreen.defaultProps = {};

export default HomeworkListScreen;

const checkPoints = (allCompletedHomeworks, allLiveHomeworks) => {
  return (allCompletedHomeworks !== null && allCompletedHomeworks.length > 0) ||
    (allLiveHomeworks !== null && allLiveHomeworks.length > 0);
}