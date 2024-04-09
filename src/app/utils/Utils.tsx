import moment from 'moment';
import crashlytics from '@react-native-firebase/crashlytics';
import { Config } from 'react-native-config';
import { LanguageKey } from './helper';
import { Dimensions, Platform, PlatformIOSStatic, NativeModules } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { setAsValue } from '@utils';

export const replaceInput = response => {
  console.log(
    `response data in utils>>>>${JSON.stringify(response.userAttemptData)}`,
  );
  let body = response?.data?.questionBody;
  let answers = response?.data?.response;
  let borderColor =
    response?.userAttemptData?.result == 'fail'
      ? 'border-color:red;'
      : 'border-color:green;';
  if (response.data.template === 'Blank') {
    let blankArr = Object.keys(answers);
    let user_answers = Object.keys(answers).map(ans => {
      return answers[ans].userAnswer;
    });
    blankArr.forEach((field, index) => {
      body = body.replace('[' + field + ']', () => {
        return `<input style="text-align:center; font-weight:bold; background-color:white; color:black; ${borderColor}; border-radius:25px;" type="text" value="" disabled="disabled">`;
      });
    });
  } else if (response.data.template === 'Dropdown') {
    let ddArr = Object.keys(answers);
    ddArr.forEach((field, index) => {
      let dropDownChoices = response.data?.response[field]?.choices;
      body = body.replace('[' + field + ']', () => {
        let dropdown = ` <div class="select_box"><select id="resizing_select" onchange="changeFunc()" name="${field}" id="${field}" style="${borderColor}" disabled="disabled">`;
        dropdown +=
          '<option hidden disabled selected value="">  Select  </option>';
        dropDownChoices.forEach((choice, choiceIndex) => {
          let option = `<option 
          >${choice.value}</option>`;
          dropdown += option;
        });
        dropdown += '  </select></div>';
        return dropdown;
      });
    });
  } else if (response.data.template === 'Blank_Dropdown') {
    let fieldArr = Object.keys(answers);
    fieldArr.forEach((field, index) => {
      let type = answers[field].type;
      if (type == 'Blank') {
        body = body.replace('[' + field + ']', () => {
          return `<input style="text-align:center; font-weight:bold; background-color:white; color:black; ${borderColor};border-radius:25px;" type="text" value="" disabled="disabled">`;
        });
      } else {
        let dropDownChoices = response.data?.response[field]?.choices;
        body = body.replace('[' + field + ']', () => {
          let dropdown = ` <div class="select_box"><select id="resizing_select" onchange="changeFunc()" name="${field}" id="${field}" style="${borderColor}" disabled="disabled">`;
          dropdown +=
            '<option hidden disabled selected value="">  Select  </option>';
          dropDownChoices.forEach((choice, choiceIndex) => {
            let option = `<option 
          >${choice.value}</option>`;
            dropdown += option;
          });
          dropdown += '  </select></div>';
          return dropdown;
        });
      }
    });
  }

  return body;
};
const checkCorrectAns = (value, actualAnswer) => {
  for (let index = 0; index < actualAnswer.length; index++) {
    if (value == actualAnswer[index]) return true;
  }
  return false;
}



export const appVersionCompare = (v1, v2) => {
  // vnum stores each numeric
  // part of version
  let vnum1 = 0, vnum2 = 0;

  // loop until both string are
  // processed
  for (let i = 0, j = 0; (i < v1.length
    || j < v2.length);) {
    // storing numeric part of
    // version 1 in vnum1
    while (i < v1.length && v1[i] != '.') {
      vnum1 = vnum1 * 10 + (v1[i] - '0');
      i++;
    }

    // storing numeric part of
    // version 2 in vnum2
    while (j < v2.length && v2[j] != '.') {
      vnum2 = vnum2 * 10 + (v2[j] - '0');
      j++;
    }

    if (vnum1 > vnum2)
      return 1;
    if (vnum2 > vnum1)
      return -1;

    // if equal, reset variables and
    // go for next numeric part
    vnum1 = vnum2 = 0;
    i++;
    j++;
  }
  return 0;
};

export const getLanguageUrl = (key, baseUrl) => {
  let endTranslationPoint = '';
  switch (`${key}`.toLowerCase()) {
    case LanguageKey.en_IN:
    case LanguageKey.en:
      endTranslationPoint = 'en_IN.json';
      break;
    case LanguageKey.en_GB:
      endTranslationPoint = 'en-GB.json';
      break;
    case LanguageKey.en_US:
      endTranslationPoint = 'en-US.json';
      break;
    case LanguageKey.hi:
      endTranslationPoint = 'hi.json';
      break;
    case LanguageKey.gu:
      endTranslationPoint = 'gu.json';
      break;
    case LanguageKey.ur:
      endTranslationPoint = 'ur.json';
      break;
    case LanguageKey.ka:
      endTranslationPoint = 'ka.json';
      break;
    case LanguageKey.ta:
      endTranslationPoint = 'ta.json';
      break;
    case LanguageKey.pu:
      endTranslationPoint = 'pu.json';
      break;
    case LanguageKey.te:
      endTranslationPoint = 'te.json';
      break;
    case LanguageKey.ma:
      endTranslationPoint = 'ma.json';
      break;
    default:
      endTranslationPoint = 'en_IN.json';
  }
  return `${baseUrl}Asset/Student/translation/${endTranslationPoint}`;
}

export const getSubString = (mainString = '', startString = '', endString = '') => {
  return mainString.substring(mainString.indexOf(startString), mainString.lastIndexOf(endString));
}

export const replaceInputWithAnswer = response => {
  let body = response?.data?.questionBody;
  let questionResponse = response?.data?.response;
  let answers = response?.userAttemptData?.userResponse;
  let borderColor =
    response?.userAttemptData?.result == 'pass'
      ? 'border-color:green;'
      : 'border-color:red;';
  if (response.data.template === 'Blank') {
    let blankArr = Object.keys(questionResponse);
    let user_answers = Object.keys(answers).map(ans => {
      if (
        answers[ans].userAnswer !== null &&
        answers[ans].userAnswer !== undefined
      )
        return answers[ans].userAnswer;
      else return '';
    });
    blankArr.forEach((field, index) => {
      let responseValue = questionResponse[field];
      let actualAnswer = '';
      if (responseValue) {
        let correctAnswers = responseValue.correctAnswers;
        actualAnswer = correctAnswers;
      }
      body = body.replace('[' + field + ']', () => {
        let value = user_answers[index];
        let blankBorder =
          checkCorrectAns(value, actualAnswer) ? 'border-color:green;' : 'border-color:red;';
        return `<input style="text-align:center; font-weight:bold; background-color:white; color:black; ${blankBorder};border-radius:25px;" type="text" value="${value}" disabled="disabled">`;
      });
    });
  } else if (response.data.template === 'Dropdown') {
    let ddArr = Object.keys(answers);
    let user_answers = Object.keys(answers).map(ans => {
      return answers[ans].userAnswer;
    });
    ddArr.forEach((field, index) => {
      let dropDownChoices = response.data?.response[field]?.choices;
      body = body.replace('[' + field + ']', () => {
        let value = user_answers[index];
        let dropdown = `<div class="select_box"><select id="resizing_select" name="${field}" id="${field}" style="${borderColor}" disabled>`;
        dropdown +=
          '<option hidden disabled selected value="">  Select  </option>';
        dropDownChoices.forEach((choice, choiceIndex) => {
          let option = `<option ${user_answers[index] == choiceIndex ? 'selected' : ''
            }>${choice.value}</option>`;
          if (user_answers[index] == choiceIndex) {
            dropdown += option;
          }
        });
        dropdown += '  </select></div>';
        return dropdown;
      });
    });
  } else if (response.data.template === 'Blank_Dropdown') {
    let blankArr = Object.keys(questionResponse);
    let fieldArr = Object.keys(answers);
    let user_answers = Object.keys(answers).map(ans => {
      return answers[ans].userAnswer;
    });
    fieldArr.forEach((field, index) => {
      let type = answers[field].type;
      if (type == 'Blank' && questionResponse[field].type == 'Blank') {
        let blankBorder = checkCorrectAns(answers[field].userAnswer, questionResponse[field].correctAnswers) ? 'border-color:green;' : 'border-color:red;';
        body = body.replace('[' + field + ']', () => {
          let value = user_answers[index];
          return `<input style="text-align:center; font-weight:bold; background-color:white; color:black; ${blankBorder};border-radius:25px;" type="text" value="${value}" disabled="disabled">`;
        });
      } else {
        let dropDownChoices = response.data?.response[field]?.choices;
        body = body.replace('[' + field + ']', () => {
          let value = user_answers[index];
          let dropdown = `<div class="select_box"><select id="resizing_select" onchange="changeFunc()" name="${field}" id="${field}" style="${borderColor}" disabled>`;
          dropdown +=
            '<option hidden disabled selected value="">  Select  </option>';
          dropDownChoices.forEach((choice, choiceIndex) => {
            let option = `<option ${user_answers[index] == choiceIndex ? 'selected' : ''
              }>${choice.value}</option>`;
            dropdown += option;
          });
          dropdown += '  </select></div>';
          return dropdown;
        });
      }
    });
  } else if (response.data.template === 'Interactive') {
    body = `<div style="pointer-events: none">${body}</div>`
  }

  return body;
};

export const replaceString = (input, string, value) => {
  let replaced = input.toString();
  replaced = replaced.replace(/[{}]/g, '');
  replaced = replaced.replace(string, value);

  return replaced;
};

export const replaceTwiceString = (input, string1, value1, string2, value2) => {
  let replaced = input.toString();
  replaced = replaced.replace(/[{}]/g, '');
  replaced = replaced.replace(string1, value1);
  replaced = replaced.replace(string2, value2);

  return replaced;
};

export const replaceAll = (str, target, payload) => {
  let replaced = str.toString();
  replaced = replaced.replace(/[{}]/g, '');
  let regex = new RegExp(target, 'g');
  return replaced.replace(regex, payload);
};

export const getParsedTimeDifference = dateString => {
  let today = moment();
  let yesterday = moment().subtract(1, 'day');
  let date = moment(dateString);

  if (date.isSame(today, 'day')) {
    return date.format('h:mm a');
  } else if (date.isSame(yesterday, 'day')) {
    return 'Yesterday';
  } else {
    return date.format('DD MMM');
  }
};

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const slugify = string => {
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '_') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const validateUserResponseArrays = (array1, array2) => {
  let validatedArray = [];
  if (array1 && array2 && array1.length === array2.length) {
    validatedArray = array1.filter(item1 => {
      return array2.find(item2 => item1 === item2?.identifier);
    });
  }

  return validatedArray.length === array1.length;
};

export const validateArrays = (array1, array2) => {
  let validatedArray = [];
  if (array1 && array2) {
    validatedArray = array1.filter(item1 => {
      return array2.find(item2 => item1.toString() === item2.toString());
    });
  }

  return validatedArray.length === array1.length;
};

export const generateValidArray = arryString => {
  let replacedString = arryString.replace(/[\[\]']+/g, '');
  replacedString = replacedString.replace(/['"]+/g, '');
  return replacedString.split(',');
};

export const createValidURL = urlString => {
  return urlString.replace(/ /g, '%20');
};

export const convertFirstCharToCaptial = string => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

export function HandleTheMathJax(data) {
  let optionVal = data !== null && typeof data !== 'undefined' ? data : '';
  if (optionVal.indexOf('</equ>') > 0) {
    optionVal = optionVal
      .replace(new RegExp('<equ>', 'g'), '<span class="math">')
      .replace(new RegExp('</equ>', 'g'), '</span>');
  }

  let res = optionVal.match(/\{frac\((.*?)\|(.*?)\)\}/g);
  if (res) {
    let res1;
    for (let val of res) {
      res1 = val.split('frac')[1].replace(/[()}]/g, '');
      res1 = res1.split('|');
      res1[0] = isNaN(res1[0]) ? res1[0] : `${res1[0]}`;
      res1[1] = isNaN(res1[1]) ? res1[1] : `${res1[1]}`;
      res1 = `<span class="math">${res1[0]} \\over ${res1[1]}</span>`;
      optionVal = optionVal.replace(val, res1);
    }
  }

  optionVal = optionVal.replace(/class='math'/gi, 'class="math"');
  optionVal = optionVal.replace(
    new RegExp('math">', 'g'),
    'math">$',
  );
  let index1 = optionVal.indexOf(`math">`, 0);
  while (index1 >= 0) {
    let index2 = optionVal.indexOf(`</span>`, index1 + 1);
    optionVal = optionVal.slice(0, index2) + optionVal.slice(index2).replace("</span>", "$</span>");
    index1 = optionVal.indexOf(`math">`, index2);
  }
  return optionVal;
}

export const isHTML = text => {
  try {
    const fragment = new DOMParser().parseFromString(text, 'text/html');
    return fragment.body.children.length > 0;
  } catch (error) { }
  return false;
};

export const unitsCheck = (unitsNumber) => {
  let unitsCount = unitsNumber > 1 ? 'units' : 'unit';
  return unitsNumber + ' ' + unitsCount;
};

export const getProductName = (product) => {
  switch (product) {
    case 'MS1':
      return 'Mindspark';
    case 'MS2':
      return 'MSE';
    case 'MS3':
      return 'MSS';
    case 'MS4':
      return 'MSHi';
    case 'MS5':
      return 'MSUr';
    case 'MS6':
      return 'MSMa';
    case 'MS7':
      return 'MSPu';
    case 'MS8':
      return 'MSGu';
    case 'MS9':
      return 'MSTe';
    case 'MS10':
      return 'MSTa';
    case 'MS11':
      return 'MSKa';
    default:
      return 'Mindspark';
  }
}

export const isOnlineUser = (Config.ENV != 'Offline')

export const screenLogging = (screenName: string, data: any) => {
  try {
    if (!isOnlineUser) return;
    if (data) {
      const crashLogData = {
        screenname: screenName,
        username: data?.username,
        userType: data?.userType,
        subject: data?.subject,
        isB2CUser: data?.isB2CUser ? "true" : "false",
      }
      crashlytics().log(`${JSON.stringify(crashLogData)}`);
    } else {
      crashlytics().log(screenName);
    }
  } catch (error) {
    console.log(`screenLogging error ${error}`)
  }
}

export const getImages = string => {
  const images = [];
  try {
    const imgRex = /<img.*?src='(.*?)'[^>]+>/g;
    let img;
    while ((img = imgRex.exec(string))) {
      images.push(img[1]);
    }
    return images;
  } catch (error) {
    console.log(`getImages error ${error}`)
    return images;
  }
};

export const deviceHeight = () => Dimensions.get('window').height;
export const deviceWidth = () => Dimensions.get('window').width;


export enum ValidationMessage {
  PhoneNumberRequired = 'Phone Number is required',
  MinimumLength10 = 'Minimum length required is 10',
  PleaseEnterValidPhoneNumber = 'Please enter a valid Phone Number',
  MinimumLength04 = 'Minimum length required is 4',
  InvalidFormat = 'Enter Phone Number in Valid Format'
}

export const deviceInfo = () => {
  if (Platform.OS == 'ios') {
    const platformIOS = Platform as PlatformIOSStatic
    return (platformIOS.isPad) ? 'Ipad' : 'Iphone';
  }
  return (DeviceInfo.isTablet()) ? 'Tablet' : 'AndroidPhone';
}

export const isTablet = () => {
  return DeviceInfo.isTablet() == true
}

export const captureDeviceDetails = async (store) => {
  try {
    let manufacturer = '';
    let carrier = '';
    let model = DeviceInfo.getModel();
    let deviceName = '';
    let serialNumber = '';
    let deviceId = '';
    let batteryLevel = 1;
    let storage = 100; // in bytes 
    let freeStorage = 100; // inbytes
    let networkConnectivity = store.uiStore.isWifiConnected || store.uiStore.isNetConnected;
    let blutoothConnectivity = false;
    let deviceOrientation = deviceHeight() > deviceWidth() ? "PORTRAIT" : "LANDSCAPE";
    let language = '';
    let keyBoardConnected = false;
    let batteryStatus = '';
    let networkOperator = '';
    let simOperator = '';
    let deviceLanguage = NativeModules.I18nManager ? NativeModules.I18nManager.localeIdentifier : null;
    let deviceScreenResolution = `${deviceHeight()} * ${deviceWidth()}`;
    await DeviceInfo.getAndroidId().then((info) => { deviceId = info; }).catch(err => console.log(err));
    await DeviceInfo.getFreeDiskStorage().then((info) => { freeStorage = info; }).catch(err => console.log(err));
    await DeviceInfo.getManufacturer().then((info) => { manufacturer = info; }).catch(err => console.log(err));
    await DeviceInfo.getCarrier().then((info) => { carrier = info; }).catch(err => console.log(err));
    await DeviceInfo.getDeviceName().then((deviceName) => { deviceName = deviceName; }).catch(err => console.log(err));
    await DeviceInfo.getSerialNumber().then((info) => { serialNumber = info; });
    await DeviceInfo.getBatteryLevel().then((info) => { batteryLevel = info * 100; }).catch(err => console.log(err));
    await DeviceInfo.getTotalMemory().then((totalMemory) => { storage = totalMemory; }).catch(err => console.log(err));
    await DeviceInfo.isHeadphonesConnected().then((enabled) => { blutoothConnectivity = enabled; }).catch(err => console.log(err));
    await DeviceInfo.isKeyboardConnected().then((status) => { keyBoardConnected = status }).catch(err => console.log(err));
    await DeviceInfo.getPowerState().then((batteryInfo) => { batteryStatus = batteryInfo.batteryState; }).catch(err => console.log(err));

    if (Platform.OS === 'ios') {
      language = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0];
      deviceId = DeviceInfo.getDeviceId();
    } else {
      language = NativeModules.I18nManager.localeIdentifier;
    }

    if (NativeModules.TelephonyModule) {
      networkOperator = NativeModules.TelephonyModule.getNetworkOperator();
      simOperator = NativeModules.TelephonyModule.getSimOperator();
    } else {
      networkOperator = carrier;
      simOperator = carrier;
    }
    
    let capturingDeviceDetails = {
      manufacturer: manufacturer,
      carrier: carrier,
      model: model,
      deviceName: deviceName,
      serialNumber: serialNumber,
      deviceId: deviceId,
      batteryLevel: batteryLevel,
      totalStorage: storage,
      networkConnectivity: networkConnectivity,
      bluetoothConnectivity: blutoothConnectivity,
      deviceOrientation: deviceOrientation,
      deviceScreenResolution: deviceScreenResolution,
      deviceOnScreenKeyboardStatus: keyBoardConnected,
      deviceLanguage,
      networkOperator,
      simOperator,
      freeStorage,
      batteryStatus
    }

    if (capturingDeviceDetails.serialNumber.length < 5 ) {
      delete capturingDeviceDetails.serialNumber;
    }

    if (capturingDeviceDetails.deviceId.length < 5 ) {
      delete capturingDeviceDetails.deviceId;
    }

    if (capturingDeviceDetails.networkOperator.length < 3 ) {
      delete capturingDeviceDetails.networkOperator;
    }

    if (capturingDeviceDetails.simOperator.length < 3 ) {
      delete capturingDeviceDetails.simOperator;
    }
    return capturingDeviceDetails;

  } catch (error) {
    console.log(`captureDeviceDetails error ${error}`);
    return null;
  }
}

export const clearUserData = async (store, navigation, screenName) => {
  store.loginStore.reset();
  await setAsValue('jwt', '');
  await setAsValue('oldJWT', '');
  await setAsValue('HeartBeatInterval', '');
  store.loginStore.setSkipOnBoardingScreen(true);
  store.appStore.setTrustedDeviceId('');
  store.appStore.setTrusted(false);
  await setAsValue('trustedDeviceId', '');
  store.appStore.resetAppStoreOnLogout();
  store.uiStore.reset();
  navigation.navigate(screenName, {});
}

export const GetCertificateHtmlTemplet = (certificateLink = '') => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <script src="${Config.PDF_JS}"></script>
    <script src="${Config.PDFWORKER_JS}"></script>
    <style>
    .container {
      width:100%;
      height:100%;
      border-radius:30px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow:'hidden';
    }
    .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #3498db;
      animation: spin 1s linear infinite;
      align-self:center
    } 
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .image {
      display: none;
      width:${isTablet() ? '78%' : '110%'};
      height:${isTablet() ? '85%' : '100%'};
      border-radius:40px;
      object-fit:cover;
    }
    </style>
    
  </head>
  <body>
    <div class="container">
      <div class="loader"></div>
      <img id="pdfImage" src="" alt="" class="image"  onload="imageLoaded()"/>
    <div>
    <script>
      const pdfUrl = '${certificateLink}'
      const imgElement = document.getElementById('pdfImage');
      const renderPage = (pdf, pageNumber) => {
        pdf.getPage(pageNumber).then(page => {
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext).promise.then(() => {
            const imageDataUrl = canvas.toDataURL('image/jpeg'); // Convert canvas to base64 image data
            console.log('Page', pageNumber, 'converted to image:', imageDataUrl);
            imgElement.src = imageDataUrl; // Set the image source
          });
        });
      };
  
      const loadPDF = async () => {
        try {
          const loadingTask = pdfjsLib.getDocument(pdfUrl);
          const pdf = await loadingTask.promise;
          const numPages = pdf.numPages;
          const pageNumber = 1;
          renderPage(pdf, pageNumber);
        } catch(err) {
          var loader = document.querySelector('.loader');
          loader.style.display = 'none';
          window.ReactNativeWebView.postMessage(JSON.stringify({ error:err.message }));
        }
      };
  
      function imageLoaded() {
        var loader = document.querySelector('.loader');
        var image = document.querySelector('.image');
        
        loader.style.display = 'none'; // Hide the loader
        image.style.display = 'block'; // Show the image
        let obj = {
          imageloaded: true,
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(obj));
      }

      loadPDF();
    </script>
  </body>
  </html>`

}

const getQuestionVoiceUrl = (str = '') => {
  let audioData = str.substring(str.lastIndexOf('<audio>'), str.lastIndexOf('</audio>'));
  let regex = /<audio.*?src='(.*?)'/;
  if (audioData != '') {
    let src = regex.exec(audioData)[1];
    if (src.length >= 1) return src;
  }
  return '';
};

export const getAudioUrls = data => {
  let audioObj = {
    instruction: { audioUrl: '', autoPlay: false },
    question: { audioUrl: '', autoPlay: false, hideQuesInSeconds: 0 },
    explination: { audioUrl: '', autoPlay: false }
  }
  let alreadyAdded = false;
  if (data && data?.hasOwnProperty('instructorStimulus') && data?.instructorStimulus.hasOwnProperty('voiceover')) {
    audioObj.instruction.audioUrl = data?.instructorStimulus.voiceover;
    if (data?.instructorStimulus.hasOwnProperty('voiceoverAutoPlay') && data?.instructorStimulus?.voiceoverAutoPlay) {
      audioObj.instruction.autoPlay = data?.instructorStimulus?.voiceoverAutoPlay;
    }
  }
  if (data.hasOwnProperty('quesVoiceover') && data.quesVoiceover.length > 0) {
    audioObj.question.audioUrl = data?.quesVoiceover;
    if (data?.hasOwnProperty('quesVoiceoverAutoPlay') && data?.quesVoiceoverAutoPlay && (!data?.instructorStimulus?.voiceoverAutoPlay)) {
      audioObj.question.autoPlay = data?.quesVoiceoverAutoPlay;
    }
    alreadyAdded = true;
  }
  if (data.hasOwnProperty('questionBody') && alreadyAdded == false && data.questionBody.includes('.mp3')) {
    audioObj.question.audioUrl = getQuestionVoiceUrl(data.questionBody);
    if (data?.hasOwnProperty('quesVoiceoverAutoPlay') && data?.quesVoiceoverAutoPlay && (!data?.instructorStimulus?.voiceoverAutoPlay)) {
      audioObj.question.autoPlay = data?.quesVoiceoverAutoPlay;
    }
    alreadyAdded = true;
  }
  if (data.hasOwnProperty('questionBodyVoiceover') && alreadyAdded == false && data?.questionBodyVoiceover) {
    audioObj.question.audioUrl = data?.questionBodyVoiceover;
    if (data?.hasOwnProperty('quesVoiceoverAutoPlay') && data?.quesVoiceoverAutoPlay && (!data?.instructorStimulus?.voiceoverAutoPlay)) {
      audioObj.question.autoPlay = data?.quesVoiceoverAutoPlay;
    }
  }
  if (data.hasOwnProperty('display') && data.display.hasOwnProperty('hideQuesInSeconds') && data.display.hideQuesInSeconds != null) {
    audioObj.question.hideQuesInSeconds = parseInt(data.display.hideQuesInSeconds) * 1000;
  }
  return audioObj;
}

export const USE_NATIVE_DRIVER = Platform.select({
  ios: true,
  android: Platform.constants?.Release !== '12',
  default: true,
});

export const audioHtmlTemplet = (QuestionData) => {
  let audioObj = getAudioUrls(QuestionData);
  let htmlTemplet = { instructionAudio: '', questionAudio: '', audioObj };
  if (audioObj.instruction.audioUrl) {
    htmlTemplet.instructionAudio = `<audio id="instructionVo" preload="auto" ${audioObj.instruction.autoPlay ? 'autoplay' : ''}>
    <source src="${audioObj.instruction.audioUrl}" type="audio/mp3">Unsupported .
    </audio>
    <div onclick="playAudio('instructionVo')" style='width:15%;'>
      <img class="audioImg" src="${Config.SPEAKER}" alt="A" hight=45 width=45/>
    </div>`
  }
  if (audioObj.question.audioUrl) {
    htmlTemplet.questionAudio = `<audio id="questionVo" preload="auto" ${audioObj.question.autoPlay ? 'autoplay' : ''}>
    <source src="${audioObj.question.audioUrl}" type="audio/mp3">Unsupported .
    </audio>
    <div id="quesAudio" onclick="playAudio('questionVo')" style='width:15%;'>
        <img class="audioImg" src="${Config.SPEAKER}" alt="A" hight=45 width=45/>
      </div>`
  }
  return htmlTemplet;
}
