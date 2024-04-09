import { REACT_NATIVE_BRIDGE } from '../components/htmlComponents/REACT_NATIVE_BRIDGE';
import { CONTENT_SERVICE_BRIDGE } from '../components/htmlComponents/CONTENT_SERVICE_BRIDGE';
import HTMLTemplateStyle from './HTMLTemplateStyle';
import { COLORS } from '@constants';
import { Config } from 'react-native-config';

const ContentServiceHTMLTemplate = (
  content,
  largeFont,
  isRTL,
  userLang,
  alignLeft,
  isTable,
  isExplanation,
  instruction,
  audioDetails
) => {

  let fontSize = '18px';
  let lineHeigt = '1.4';
  if (largeFont) {
    fontSize = '18px'; //changed from 24px to 18px
    lineHeigt = '2.0';
  }
  const direction = isRTL ? 'rtl' : 'ltr';

  return `
      <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">    <title>Document</title>
    <script src="${Config.CDN_BASE_URL}Student/assets/js/contentService.js?v=2.3.2.20"></script>
    <script>
    ${REACT_NATIVE_BRIDGE}
    ${CONTENT_SERVICE_BRIDGE}
    </script>
    <style>
        ${HTMLTemplateStyle(isTable, isExplanation)}
    </style>
    <style>
    
    /* Arrows in CSS */
    .arrow {
      right: 6px;
        position: absolute;
        top: 55%;
        transform: translate(0,-50%);
        height: 1px;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 6px solid #fff;
        margin-left: 15px;
    }
    
    .right {
      transform: translate(0,-50%) rotate(270deg);
      -webkit-transform: translate(0,-50%) rotate(270deg);
    }
    
    .left {
      transform: translate(0,-50%) rotate(90deg);
      -webkit-transform: translate(0,-50%) rotate(90deg);
    }
    
    .up {
      transform: translate(0,-50%) rotate(180deg);
        -webkit-transform: translate(0,-50%) rotate(180deg);
    }
    
    .down {
    }
    .dropdown_button {
      position:relative;
      padding:4px 40px 4px 20px;
      border:1px solid #969696;
      font-size:16px;
      border-radius:20px;
      background: linear-gradient(to left, ${COLORS.skyBlue} 20px,  white 20px);
    }
    .select_box{
      display:inline-grid;
      width:80px;
      overflow: hidden;
      border:1px solid #969696;
      border-radius:20px;
      position: relative;
      background: linear-gradient(to left, ${COLORS.skyBlue
    } 20px,  white 20px); 
      padding:4px 0px 4px 20px;
    }
    .select_box:after{
      width: 0; 
      height: 0; 
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 6px solid white;
      position: absolute;
      top: 40%;
      right: 5px;
      content: "";
      z-index: 98;
     }
    .select_box select{      
      font-size:14px;
      width: 120%;
      border: 0;
      position: relative;
      z-index: 99;
      background: none;
    }
    .select_box select:focus-visible {
      outline:none
    }
    #width_tmp_select{
      font-size:16px;
      display : none;
      visibility:hidden;
      position:absolute;
    } 

    </style>
  </head>
  <body style="font-size:${fontSize};line-height: ${lineHeigt};font-family:BalooThambi-Regular" dir="${direction}">
  <div style='display:flex;flex-direction:row;'>
      ${audioDetails && audioDetails.hasOwnProperty('instructionAudio') ? audioDetails.instructionAudio : ''}
      ${instruction && `<div style="width:85%;"><p>${instruction}</p></div><br/>`}
    </div>  
  <fieldset id="contentField" style='font-family:BalooThambi-Regular;font-weight: normal;'> 
  ${audioDetails?.questionAudio} 
    ${content}
    </fieldset>
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
  function playAudio(audioId) {
    const audioElement = document.getElementById(audioId);
    pauseAll();
    audioElement.play();
  }
  function pauseAll() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audioElement => {
      audioElement.pause();
      audioElement.currentTime = 0;
    });
    currentAudio = null;
  }
  ${audioDetails && audioDetails.hasOwnProperty('audioObj') && audioDetails?.audioObj.hasOwnProperty('instruction') && audioDetails?.audioObj?.instruction.hasOwnProperty('autoPlay') &&
      audioDetails?.audioObj?.instruction?.autoPlay ? `playAudio('instructionVo')` : ''};
  </script>
  </html>
      `;
};
export default ContentServiceHTMLTemplate;
