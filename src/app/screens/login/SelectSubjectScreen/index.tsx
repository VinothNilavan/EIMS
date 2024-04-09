/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '@contexts/auth-context';
import { MixpanelCategories, MixpanelEvents, MixpanelActions } from '@constants';
import { SVGImageBackground, SourceSansProBoldTextView, SourceSansProRegTextView, CommonHeader } from '@components';
import styles from './style';
import { Angreji, Bhasha, Science, Ganith, Gujarati, Kannada, Marathi, Punjabi, Tamil, Telugu, Urdu, subjectBg, Odiya } from '@images';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { API } from '@api';
import { getHp, getAsValue, setAsValue, getProductName, screenLogging } from '@utils';
import { ApiEndPoint, ScreenNames } from '@constants';
import { useLanguage } from '@hooks';
import { HeaderType } from '../../../utils/helper';

const SelectSubjectScreen = props => {
  const accessFromTeacherDashboard = props && props.route && props.route.params && props.route.params.accessFromTeacherDashboard ?
    props.route.params.accessFromTeacherDashboard : false;
  const { choseSubjectTxt, preciousTreasureText } = useLanguage();
  const store = useStores();
  const auth = useContext(AuthContext);
  const { appStore, uiStore, loginStore } = store;

  let data = appStore.userRedirectionData;

  if (props.route && props.route.params && props.route.params.fromNavHeader) {
    data = appStore.subjects;
  }

  const languageData = uiStore.languageData;
  const isRTL = uiStore.isRTL;

  useEffect(() => {
    screenLogging("SelectSubjectScreen", appStore?.userData);
    getSubjectList();
  }, []);

  const getSubjectList = () => {
    let subjectList = [];
    if (data && data.length > 0) {
      data.map(product => {
        if (!loginStore?.isVernacularUser && product === 'MS2') { } //disabled english for Non-vernacular user
        else {
          subjectList.push(getSubject(product));
        }
      });
    }
    return subjectList;
  };

  const getSubject = product => {
    let SvgImageName;
    let subjectName;
    switch (product) {
      case 'MS1':
        SvgImageName= Ganith;
        subjectName = languageData?.Mindspark || "Maths";
        break;

      case 'MS2':
        SvgImageName= Angreji;
        subjectName = languageData?.MSE || "English";
        break;

      case 'MS3':
        SvgImageName= Science;
        subjectName = languageData?.MSS || "Science";
        break;

      case 'MS4':
        SvgImageName= Bhasha;
        subjectName = languageData?.MSHi || "Basha";
        break;

      case 'MS5':
        SvgImageName= Urdu;
        subjectName = languageData?.MSUr || "Urdu";
        break;

      case 'MS6':
        SvgImageName= Marathi;
        subjectName = languageData?.MSMa || "Marathi";
        break;

      case 'MS7':
        SvgImageName= Punjabi;
        subjectName = languageData?.MSPu || "Punjabi";
        break;

      case 'MS8':
        SvgImageName= Gujarati;
        subjectName = languageData?.MSGu || "Gujarati";
        break;

      case 'MS9':
        SvgImageName= Telugu;
        subjectName = languageData?.MSTe || "Telugu";
        break;

      case 'MS10':
        SvgImageName= Tamil;
        subjectName = languageData?.MSTa || "Tamil";
        break;

      case 'MS11':
        SvgImageName= Kannada;
        subjectName = languageData?.MSKa || "Kannada";
        break;

      case 'MS13':
        SvgImageName= Odiya;
        subjectName = languageData?.MSOr || "Oriya";
        break;
    }

    return (
      <TouchableOpacity
        key={product}
        style={styles.itemContainer}
        onPress={() => {
          auth.trackEvent('mixpanel', MixpanelEvents.SUBJECT_SELECTION, {
            Category: MixpanelCategories.LOGIN,
            Action: MixpanelActions.CLICKED,
            Label: '',
          });
          onSubjectSelected(product, subjectName);
        }}>
        <SVGImageBackground
          testID="SVGImageBackgroundSelectedSubject"
          SvgImage={subjectBg}
          subjectSelection={true}>
          <View style={styles.itemSubContainer}>
            <SvgImageName
              accessible={true}
              testID="SelectedSubjectImage"
              accessibilityLabel="SelectedSubjectImage"
              style={styles.iconStyle}
              height={getHp(55)}
            />
            <SourceSansProBoldTextView
              testID="SelectedSubjectNameText"
              style={styles.subjectText}>
              {subjectName}
            </SourceSansProBoldTextView>
          </View>
        </SVGImageBackground>
      </TouchableOpacity>
    );
  };

  const onSubjectSelected = async (product, subjectName) => {
    console.log('APP respp product selected', product);

    store.appStore.setSelectedSubject(product);
    await setAsValue('subjectName', subjectName);
    await setAsValue('ProductName', product);
    store.appStore.setHomeUsageAlertEnable(false);
    store.uiStore.setDisplayedHomeUsagePopup(false);

    if (props.route && props.route.params && props.route.params.fromNavHeader) {
      const reqBody = {
        body: {
          username: store.appStore.username,
          trustedDeviceId: store.appStore.trustedDeviceId,
          //product means MS1- mindspark, MS2- MSE and default also mindspark ... subject is different.
          productName: getProductName(product),
          platform: 'mobile',
        },
        store: store,
      };
      const response = await API(ApiEndPoint.START_NEW_SESSION, reqBody);
      if (response.data.resultCode === 'C001') {
        loginStore.setUserType(1);
        appStore.setJwt(response.headers.jwt);
        await setAsValue('jwt', response.headers.jwt);
        await setAsValue('oldJWT', response.headers.jwt);
        props.navigation.navigate(ScreenNames.DashboardScreen);
      }
    } else {
      try {
        const jwt = await getAsValue('jwt');
        const reqBody = {
          body: {
            token: jwt,
            productSelection: product,
            platform: 'mobile',
          },
          jwt: jwt,
          store: store,
        };

        const response = await API(ApiEndPoint.GET_LANDING_PAGE, reqBody);

        if (response.data.resultCode === 'C001' && response.data.resultMessage === 'success') {
          loginStore.setUserType(1);
          appStore.setJwt(response.headers.jwt);
          await setAsValue('jwt', response.headers.jwt);
          await setAsValue('oldJWT', response.headers.jwt);
          loginStore.setIsAuth(true);
          props.navigation.navigate(ScreenNames.DashboardScreen);
        } else if (response.data.resultCode == 'CL0028') {
          store.uiStore.apiErrorInit({ code: 'Oops!', message: response?.data?.resultMessage });
        } else if (response.data.resultCode == 'C004' && response.data.redirectionCode == 'subscriptionPage') {
          props.navigation.navigate(ScreenNames.SubscriptionEndedAleartScreen, { username: loginStore.username });
        } else {
          uiStore.apiErrorInit({ code: response.status, message: response.data?.resultMessage });
        }
      } catch (e) {
        console.log('APP Respp LoginScreenAPI Error ', e);
      }
    }
  };

  return (
    <View style={styles.screen}>
      <CommonHeader
        headerType={HeaderType.login}
        testID="LoginHeaderSelectSubjectScreen"
        theme={'generic'}
        lottieFileName={'naandi_header'}
        containerStyle={styles.header}
        hideBackButton={!accessFromTeacherDashboard}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}>
        <View style={styles.innerContainer}>
          <SourceSansProBoldTextView
            testID="SelectedSubjectSubjectTxt"
            style={styles.title}>
            {choseSubjectTxt}
          </SourceSansProBoldTextView>
          <SourceSansProRegTextView
            testID="SelectedSubjectPreciousTreasureText"
            style={styles.subTitle}>
            {preciousTreasureText}
          </SourceSansProRegTextView>
          <View style={[isRTL ? styles.gridRTLContainer : styles.gridContainer]}>
            {getSubjectList()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default observer(SelectSubjectScreen);
