import HTMLTemplateStyle from '../HTMLTemplateStyle';
import { MATHJS_CONFIG } from '../../components/htmlComponents/MATHJS_CONFIG';
const SimpleHtmlTemplate = (
  content,
  largeFont,
  isRTL,
  userLang,
  alignLeft,
  isTable,
  isExplanation,
  fontUrl,
  isMath,
  isIframe,
  instruction,
  audioDetails
) => {
  let fontSize = '18px';
  if (largeFont) {
    fontSize = '18px';
  }
  if (userLang && userLang == 'ta') {
    fontSize = '16px';
  }
  const direction = isRTL ? 'rtl' : 'ltr';

  const langCode = userLang ? userLang : isRTL ? 'ur' : 'en';

  let fontFamily = 'BalooThambi-Regular';

  let customStyle = '';

  if (alignLeft) {
    customStyle = `body {
      justify-content: flex-start;
    }`;
  }

  return `
    <!DOCTYPE html>
<html lang="${langCode}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
  <title>Document</title>
  <style>
  ${HTMLTemplateStyle(isTable, isExplanation)}
  ${customStyle}
  </style>
  ${(isMath) ? MATHJS_CONFIG : ''}
</head>
<body style="font-size:${fontSize};font-family:${fontFamily}" dir="${direction}">
  <div style='display:flex;flex-direction:row;'>
      ${audioDetails && audioDetails.hasOwnProperty('instructionAudio') ? audioDetails.instructionAudio : ''}
      ${instruction && `<div style="width:85%;"><p>${instruction}</p></div><br/>`}
  </div> 
  ${isIframe ?
      `<div class="responsive-container">
      ${content}
    </div>`:
      `<fieldset id="contentField">
      ${content}
    </fieldset>`}
  <select id="width_tmp_select">
  <option id="width_tmp_option"></option>
</select>
</body>
<script>
  setTimeout(function () {
    window.scrollTo(0, 0);
  },1500);
changeFunc();
function changeFunc(){
let tempSelectOption = document.querySelector("#width_tmp_option");
  let tempSelect = document.querySelector("#width_tmp_select");
  let select = document.querySelector("#resizing_select");
  if(tempSelectOption && tempSelect && select){
    tempSelect.style.display = 'block';
    tempSelectOption.innerHTML = select.options[select.selectedIndex].text;
    console.log(tempSelect.offsetWidth);
    document.querySelector(".select_box").style.width = tempSelect.offsetWidth + 20 + 'px';
  }
}
</script>
</html>
    `;
};

export default SimpleHtmlTemplate;
