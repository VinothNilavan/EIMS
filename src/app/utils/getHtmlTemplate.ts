import {
  SimpleHtmlTemplate,
  getWp,
  ContentServiceHTMLTemplate,
  MathHTMLTemplate,
  MathContentServiceHTMLTemplate,
  HandleTheMathJax,
  IframeHTMLTemplate,
  IframeMathHTMLTemplate,
} from '@utils';

const getHtmlTemplate = (
  str,
  largeFont = false,
  isRTL = false,
  userLang = null,
  alignLeft = false,
  isExplanation = false,
  isNewHeightEnabled = false,
  isReport = false,
  instruction = '',
  audioDetails = {},
) => {

  const replaceAll = (str, target, payload) => {
    let regex = new RegExp(target, 'g');
    return str.replace(regex, payload);
  };

  if (str) {
    //since <em> tag is not supported in mobile MAtjax version we are removing  
    if (`${str}`.includes('<em>')) {
      let temp = replaceAll(`${str}`, '<em>', '');
      temp = replaceAll(`${temp}`, '</em>', '');
      str = temp;
    }
    //Check for Math expressions and string manipulation
    str = HandleTheMathJax(str);
    let isMath = false;
    let isIframe = false;
    let htmlTemplate = '';
    let isFrac = false;
    let isBlankDD = false;
    let isTable = false;

    //Check for Math expression
    if (str.indexOf('class="math"') > -1 || isFrac) {
      isMath = true;
    }

    //Check for IFRAME
    if (str.indexOf('<iframe') > -1) {
      isIframe = true;
    }

    //Check for BLANK & DropDown

    if (str.indexOf('blank_') > -1 || str.indexOf('dropdown_') > -1) {
      isBlankDD = true;
    }

    if (str.indexOf('<table') > -1 || str.indexOf('<TABLE') > -1) {
      isTable = true;
    }

    if (isMath && isIframe) {
      let width = 300;

      htmlTemplate = IframeMathHTMLTemplate(
        str,
        true,
        isRTL,
        getWp(width),
        isTable,
        isExplanation,
        isNewHeightEnabled,
        isReport,
        instruction,
        audioDetails,
      );
      console.log('here 1', isExplanation, isTable);
    } else if (isIframe) {
      let width = 370;

      htmlTemplate = IframeHTMLTemplate(
        str,
        true,
        isRTL,
        getWp(width),
        isTable,
        isExplanation,
        isNewHeightEnabled,
        isReport,
        instruction,
        audioDetails,
      );
      console.log('here 2', isExplanation, isTable);
    } else if (isMath && isBlankDD) {
      console.log('here 3');
      htmlTemplate = MathContentServiceHTMLTemplate(
        str,
        true,
        isRTL,
        userLang,
        alignLeft,
        isTable,
        instruction,
        audioDetails,
      );
    } else if (isBlankDD) {
      console.log('here 4');
      htmlTemplate = ContentServiceHTMLTemplate(
        str,
        largeFont,
        isRTL,
        userLang,
        alignLeft,
        isTable,
        isExplanation,
        instruction,
        audioDetails,
      );
    } else if (isMath) {
      console.log('here 5');
      htmlTemplate = MathHTMLTemplate(
        str,
        largeFont,
        isRTL,
        userLang,
        alignLeft,
        isTable,
        isExplanation,
        instruction,
        audioDetails
      );
    } else {
      // Load simplified template
      console.log('here 6');
      htmlTemplate = SimpleHtmlTemplate(
        str,
        largeFont,
        isRTL,
        userLang,
        alignLeft,
        isTable,
        isExplanation,
        null,
        isMath,
        isIframe,
        instruction,
        audioDetails
      );
    }
    return htmlTemplate;
  } else {
    return str;
  }
};

export default getHtmlTemplate;
