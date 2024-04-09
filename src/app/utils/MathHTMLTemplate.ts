import HTMLTemplateStyle from './HTMLTemplateStyle';
import { MATHJS_CONFIG } from '../components/htmlComponents/MATHJS_CONFIG';
import { COLORS } from '@constants';

const MathHTMLTemplate = (
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
  if (largeFont) {
    fontSize = '18px';
  }

  const direction = isRTL ? 'rtl' : 'ltr';

  let customStyle = '';
  if (alignLeft) {
    customStyle = `body {
      justify-content: flex-start;
    }`;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        ${MATHJS_CONFIG}
        <script></script>
        <style>
          ${HTMLTemplateStyle(isTable, isExplanation)}
          ${customStyle}
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
    <fieldset id="contentField">
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
    </html>`;
};

export default MathHTMLTemplate;
