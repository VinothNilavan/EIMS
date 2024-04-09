import React, { Fragment, useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';

import { getHp, getWp, setAsValue } from '@utils';
import { APIFormData } from '@api';

import { COLORS, TEXTFONTSIZE } from '@constants';
import {
  SourceSansProRegTextView,
  CustomButton,
  CustomDropDown,
  CustomTextInput,
  CustomCheckBox,
  TrustedDeviceCallout,
  CommonHeader
} from '@components';
import { useStores } from '@mobx/hooks';
import { observer } from 'mobx-react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { ApiEndPoint, ScreenNames } from '@constants';
import { useAuth } from '@hooks';
import { HeaderType } from '../../utils/helper';

const StudentDetailsScreen = props => {
  const classesOG = [
    { label: 'Class 1', value: '1' },
    { label: 'Class 2', value: '2' },
    { label: 'Class 3', value: '3' },
    { label: 'Class 4', value: '4' },
    { label: 'Class 5', value: '5' },
    { label: 'Class 6', value: '6' },
    { label: 'Class 7', value: '7' },
    { label: 'Class 8', value: '8' },
    { label: 'Class 9', value: '9' },
    { label: 'Class 10', value: '10' },
  ];
  const syllabusOG = [
    { label: 'ICSE', value: 'ICSE' },
    { label: 'CBSE', value: 'CBSE' },
    { label: 'IGCSE', value: 'IGCSE' },
  ];

  const store = useStores();
  const { loginStore, profileStore } = useStores();

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSyllabus, setSelectedSyllabus] = useState('');

  const [studentName, setStudentName] = useState('');
  const [studentNameError, setStudentNameError] = useState('');
  const [syllabus, setSyllabus] = useState(syllabusOG);
  const [classes, setClasses] = useState(classesOG);

  const {
    dispatch,
    TRUSTED_DEVICE,
    trustedDevice,
    trusetedDeviceConfirmed,
    TRUSTED_DEVICE_CONFIRMED,
  } = useAuth('text');

  const selectDropdown = (item, type) => {
    if (type == 'class') {
      configSyllabusOG(setSelectedClass, item, syllabusOG, setSyllabus);
    } else {
      configClassesOG(setSelectedSyllabus, item, classesOG, setClasses);
    }
  };

  const isValidStudentName = value => {
    const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    value = `${value}`.trim();
    return regex.test(value);
  };

  const validateInputFields = student => {
    let usernameStatus = true;

    if (student == '') {
      setStudentNameError('Username is required');
      usernameStatus = false;
    }
    if (usernameStatus && !isValidStudentName(student)) {
      setStudentNameError('Please enter a valid name');
      usernameStatus = false;
    }

    if (usernameStatus && student.length < 4) {
      setStudentNameError('Minimum length required is 4');
      usernameStatus = false;
    }

    if (usernameStatus) {
      setStudentNameError('');
    }

    return usernameStatus;
  };

  const onSaveMySession = async () => {
    dispatch({ type: TRUSTED_DEVICE_CONFIRMED, value: !trusetedDeviceConfirmed });
    loginStore.setTrusted(true);
  };

  const showTrustedDevicePopUp = () => {
    if (trusetedDeviceConfirmed) {
      loginStore.setTrusted(false);
      dispatch({
        type: TRUSTED_DEVICE_CONFIRMED,
        value: !trusetedDeviceConfirmed,
      });
    }
    dispatch({ type: TRUSTED_DEVICE, value: !trustedDevice });
  };

  const disableTrustedDevice = () => {
    dispatch({ type: TRUSTED_DEVICE, value: !trustedDevice });
  };

  const onSubmit = async () => {
    if (validateInputFields(studentName)) {
      const formData = new FormData();
      FormData.prototype[Symbol.toStringTag] = 'FormData';

      formData.append('mobile', loginStore.parentMobile);
      formData.append('studentCountryCode', loginStore.countryCode);
      formData.append('studentName', `${studentName}`.trim());
      formData.append('class', selectedClass);
      formData.append('curriculum', selectedSyllabus);
      formData.append('whatsAppConsent', loginStore.whatsAppConsent);
      formData.append('website', 'app');

      const req = { body: formData, store };

      try {
        const response = await APIFormData(ApiEndPoint.CREATE_USER, req, true);
        if (response.data.code === 555) {
          const { trailPeriod, userData, eisecretKey } = response.data;
          const { username } = userData;
          loginStore.setUsername(username);
          loginStore.setFreeTrialDays(trailPeriod);
          profileStore.setFatherNumber(loginStore.parentMobile);
          setAsValue('userName', username);
          props.navigation.navigate(ScreenNames.ExploreMindsparkScreen, {
            eisecretKey: eisecretKey,
          });
        } else if (response.data.code === -666) {
          Keyboard.dismiss();
          // Show User List
          loginStore.setRenewStudents(response.data.data);
          setShowUserList(true);
        }
      } catch (err) {
        console.log(`API Error>>>>${JSON.stringify(err)}`);
      }
    }
  };

  return (
    <Fragment>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        style={{ backgroundColor: 'white' }}>
        <View style={styles.screen}>
          <CommonHeader
            headerType={HeaderType.login}
            testID="LoginHeaderTextPassword"
            containerStyle={styles.header}
            hideBackButton={false}
            iconStyle={{
              iconName: 'left',
              iconColor: COLORS.maroon,
              iconTheme: 'AntDesign',
              type: 'maroon',
              width: 30,
              height: 30,
            }}
            isNewFlow={true}
          />
          <View style={styles.innerContainer}>
            <SourceSansProRegTextView
              testID="LoginNewToMindSparkText"
              style={styles.inputHeader}>
              Student Name
            </SourceSansProRegTextView>
            <View style={styles.inputContainer}>
              <CustomTextInput
                testID="CustomTextInputStudentNameInput"
                value={studentName}
                placeholder={'Full Name of student'}
                isError={studentNameError != ''}
                style={styles.input}
                onChangeText={text => setStudentName(text)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {studentNameError != '' && (
                <SourceSansProRegTextView
                  style={styles.errorMessage}
                  testID="StudentNameError">
                  {studentNameError}
                </SourceSansProRegTextView>
              )}
            </View>
            <SourceSansProRegTextView
              testID="LoginNewToMindSparkText"
              style={styles.inputHeader}>
              Class
            </SourceSansProRegTextView>
            <CustomDropDown
              items={classes}
              preSelectedValue={selectedClass}
              onSelect={item => selectDropdown(item, 'class')}
              containerStyle={styles.dropDownContainer}
              showPlaceHolder={true}
              placeHolderValue="Select class"
            />
            <SourceSansProRegTextView
              testID="LoginNewToMindSparkText"
              style={styles.inputHeader}>
              Syllabus
            </SourceSansProRegTextView>
            <CustomDropDown
              items={syllabus}
              preSelectedValue={selectedSyllabus}
              onSelect={item => selectDropdown(item, 'syllabus')}
              containerStyle={styles.dropDownContainer}
              showPlaceHolder={true}
              placeHolderValue="Select syllabus"
            />
            <View style={styles.btnContainer}>
              <CustomButton
                disabled={selectedSyllabus == '' || selectedClass == ''}
                testId={'sendOtpButton'}
                onSubmit={onSubmit}
                btnText={'Next'}
              />
            </View>
            <CustomCheckBox
              label={'Remember me on this device'}
              isSelected={trustedDevice}
              setIsSelected={showTrustedDevicePopUp}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      {trustedDevice && !trusetedDeviceConfirmed && (
        <TrustedDeviceCallout
          onSaveMySession={onSaveMySession}
          disableTrustedDevice={disableTrustedDevice}
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: getHp(840),
  },
  header: {
    marginBottom: getHp(10),
  },
  innerContainer: {
    paddingHorizontal: getWp(33),
    paddingVertical: getHp(50),
    width: '100%',
  },
  btnContainer: {
    marginTop: getHp(20),
    marginBottom: getHp(15),
  },
  inputContainer: {
    marginBottom: getHp(25),
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingVertical: getHp(0),
    paddingHorizontal: getWp(12),
    borderRadius: getWp(30),
    marginBottom: getHp(30),
  },
  inputHeader: {
    fontSize: TEXTFONTSIZE.Text20,
    color: COLORS.inputHeaderColor,
    marginBottom: getHp(10),
  },
  input: {
    width: '100%',
    height: getHp(60),
    justifyContent: 'center',
    textAlign: 'left',
    paddingHorizontal: getWp(20),
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: getWp(30),
    color: COLORS.answerText,
    fontSize: TEXTFONTSIZE.Text18,
    fontFamily: 'SourceSansPro-Regular',
  },
  errorMessage: {
    color: COLORS.errorMessage,
    fontSize: TEXTFONTSIZE.Text16,
    textAlign: 'center',
    marginTop: getHp(8),
  },
});

export default observer(StudentDetailsScreen);

const configClassesOG = (setSelectedSyllabus, item, classesOG, setClasses) => {
  setSelectedSyllabus(item ? item : '');
  if (item === 'IGCSE') {
    let tempArray = [...classesOG];
    tempArray = tempArray.filter((item) => {
      if (item.value === '6' || item.value === '7' || item.value === '8') {
        return false;
      }
      return true;
    });
    setClasses(tempArray);
  } else {
    setClasses(classesOG);
  }
}

const configSyllabusOG = (setSelectedClass, item, syllabusOG, setSyllabus) => {
  setSelectedClass(item ? item : '');
  if (item === '6' || item === '7' || item === '8') {
    let tempArray = [...syllabusOG];
    tempArray = tempArray.filter(item => item.value !== 'IGCSE');
    setSyllabus(tempArray);
  } else {
    setSyllabus(syllabusOG);
  }
}

