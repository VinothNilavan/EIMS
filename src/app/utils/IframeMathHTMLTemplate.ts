import { REACT_NATIVE_BRIDGE } from '../components/htmlComponents/REACT_NATIVE_BRIDGE';
import { CONTENT_SERVICE_BRIDGE } from '../components/htmlComponents/CONTENT_SERVICE_BRIDGE';
import {
  IFRAME_BRIDGE_INIT,
  IFRAME_BRIDGE_LISTENER,
  IFRAME_DYNAMIC_HEIGHT_SETTER,
  IFRAME_BRIDGE_LISTENER_WITH_NEW_HEIGHT,
} from '../components/htmlComponents/IFRAME_BRIDGE';
import { getWp } from './ViewUtils';
import HTMLTemplateStyle from './HTMLTemplateStyle';
import { MATHJS_CONFIG } from '../components/htmlComponents/MATHJS_CONFIG';
import { COLORS } from '@constants';
import { Config } from 'react-native-config';


const IframeMathHTMLTemplate = (
  content,
  largeFont,
  isRTL,
  width = getWp(300),
  isTable,
  isExplanation,
  isNewHeightEnabled,
  isReport,
  instruction,
  audioDetails
) => {
  let fontSize = '18px';
  if (largeFont) {
    fontSize = '18px';
  }
  const direction = isRTL ? 'rtl' : 'ltr';

  return `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="${Config.Jquery}"></script> 
    <script src="${Config.CDN_BASE_URL}Student/assets/js/contentService.js?v=2.3.2.20"></script>
    ${MATHJS_CONFIG}
    <style>
    .arrow {
      right: 7px;
      position: absolute;
      top: 50%;
      transform: translate(0,-50%);
      height: 2px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 8px solid #fff;
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
      padding:2px 40px 2px 15px;
      position:relative;
      border:1px solid #969696;
      font-size:16px;
      border-radius:25px;
      background: linear-gradient(to left, ${COLORS.skyBlue} 25px,  white 25px);
    }
      ${HTMLTemplateStyle(isTable, isExplanation)}
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
  <body style="font-size:${fontSize};font-family:BalooThambi-Regular" dir="${direction}">
  <div style='display:flex;flex-direction:row;'>
    ${audioDetails && audioDetails.hasOwnProperty('instructionAudio') ? audioDetails.instructionAudio : ''}
    ${instruction && `<div style="width:85%;"><p>${instruction}</p></div><br/>`}
  </div>  
  <fieldset id="contentField" style="border:none">  
    ${content}
    </fieldset>
    <select id="width_tmp_select">
      <option id="width_tmp_option"></option>
    </select>
    <script type="text/javascript">
    ${REACT_NATIVE_BRIDGE}
    ${CONTENT_SERVICE_BRIDGE}
    ${IFRAME_BRIDGE_INIT}
    ${isNewHeightEnabled ? IFRAME_BRIDGE_LISTENER_WITH_NEW_HEIGHT : IFRAME_BRIDGE_LISTENER}
    ${!isReport && IFRAME_DYNAMIC_HEIGHT_SETTER(width, isExplanation)}
    </script>
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

export default IframeMathHTMLTemplate;
