import { Dimensions } from 'react-native';
import { QTypes } from '../../../helpers';
import { COLORS, TEXTFONTSIZE } from '@constants';
import { REACT_NATIVE_BRIDGE } from '../../../components/htmlComponents/REACT_NATIVE_BRIDGE';
import { CONTENT_SERVICE_BRIDGE } from '../../../components/htmlComponents/CONTENT_SERVICE_BRIDGE';
import { Base64 } from 'js-base64';
import { getCommonHtmlTemplate, validateHtmlForMaths } from '../Helpers/QnAhelpers';
import { isTablet, audioHtmlTemplet } from '@utils';
import { Config } from 'react-native-config';

const setDynamicHeightWidth = questionBody => {
  const qBodyArray = questionBody.split(' ');
  const { width } = Dimensions.get('window');
  const updatedBodyArray = qBodyArray.map(data => {
    if (data.indexOf('width') >= 0) {
      return `width=${width - 50}px`;
    }
    return data;
  });
  return updatedBodyArray.join(' ');
};

const isMarkedItem = (current, markedData, isReport) => {
  try {
    let identifier = isReport ? current.identifier : Base64.decode(current.identifier);
    let container1Data = Object.values(markedData.container1);
    let container2Data = Object.values(markedData.container2);
    for (let item of container1Data) {
      if (identifier == item?.identifier) return true;
    }
    for (let item of container2Data) {
      if (identifier == item?.identifier) return true;
    }
  } catch (err) {
    console.log(err);
  }
  return false;
}

const getQuestionItemHtmlTemplate = (type, QuestionData, hidetime, isRTL, userMarkedListData = {}, attemptedList = [], userResponse = [], isReport = false) => {
  try {
    if (QuestionData) {
      let htmlContent = '';
      let rawContent = ``;
      let rawCss = ``;
      let rawJs = ``;
      let direction = isRTL ? 'rtl' : 'ltr';
      let instruction = QuestionData?.instructorStimulus?.value ? QuestionData?.instructorStimulus?.value : '';
      let isMath = validateHtmlForMaths(QuestionData?.questionBody).isMath;
      let questionBody = validateHtmlForMaths(QuestionData?.questionBody).data;
      let audioDetails = audioHtmlTemplet(QuestionData);
      let deviceWidth = Dimensions.get('window').width;

      switch (`${type}`.toLowerCase()) {
        case QTypes.MCQ:
          rawContent = `<body style="background-color:white;font-size:${TEXTFONTSIZE.Text14
            }px;font-family:BalooThambi-Regular;margin-right:10px;justify-content: center;" dir="${direction}">
              <div class="container" >
                <div class="row">
                  ${audioDetails && audioDetails.hasOwnProperty('instructionAudio') ? audioDetails.instructionAudio : ''}
                  ${instruction && `<div style="width:85%;"><p>${instruction}</p></div><br/>`}
                </div>
                <div>
                  ${audioDetails.questionAudio}
                  <p id="hide">${questionBody}</p>
                </div>
                <br/>
                <div style="font-size:${TEXTFONTSIZE.Text14
            }px;font-family:BalooThambi-Regular;">
                  ${QuestionData.response.mcqPattern.choices
              .map((item, index) => {
                if (!isMath) {
                  isMath = validateHtmlForMaths(item.value).isMath;
                }
                return `<div id=${index} class="row optionStyle" onclick="click_handler(this.id)">
                      <div id=00${index} style="${isRTL ? 'margin-right:5%' : 'margin-left:5%'
                  };background-color:${COLORS.blue
                  };border-radius:50%;padding:5px;color:white;width:25px;height:25px;font-weight:bold;text-align:center;color:white;justify-content: center;align-items: center;"> ${String.fromCharCode(
                    'A'.charCodeAt(0) + index,
                  )} </div>
                    <div class="col-sm-9" style="margin-left:5%;max-width:100%;min-width:70%"> <p>${validateHtmlForMaths(item.value).data
                  }</p></div>
                </div>`;
              })
              .join('')}
                </div>
              </div>    
            </body>`;
          rawCss = `<style>
            * {
              margin: 0;
            }
            img {
                display: inline-block;
                max-width: 95%;
                max-height: 100%;
                object-fit: contain;
            }            
            .optionStyle {
              display:flex;
              flex-direction:row;
              background-color:${COLORS.sortListQuestionBackgroundColor};
              border-radius:5px;
              text-align:center;
              width:100%;
              align-items: center;
              min-height:100px;
              margin-top : 15px;
            }       
            </style>`;
          rawJs = `<script type="text/javascript">  
              function click_handler(id,item,isCorrect) {
                var ddBtnObj = {};
                ddBtnObj.id = id;
                window.ReactNativeWebView.postMessage(JSON.stringify(ddBtnObj));
              }
                setTimeout(function() {
                    $('#hide').fadeOut('fast');
                }, ${hidetime});           
            </script>`;
          htmlContent = getCommonHtmlTemplate(
            rawContent,
            QTypes.MCQ,
            rawCss,
            rawJs,
            isMath,
            null,
            audioDetails.audioObj.question.hideQuesInSeconds,
          );
          break;
        case QTypes.Interactive:
          rawContent = `<body style="font-size:${TEXTFONTSIZE.Text14
            }px;border:none;font-family:BalooThambi-Regular;background-color:white;" dir="${direction}">
            <div class="row" style="flex-direction:row;">
              ${audioDetails && audioDetails.hasOwnProperty('instructionAudio') ? audioDetails.instructionAudio : ''}
              ${instruction && `<div style="width:85%;"><p>${instruction}</p></div><br/>`}
            </div>
            <fieldset id="contentField" style="border:none;height : 100%;width : 90%">  
              ${audioDetails.questionAudio}
              ${setDynamicHeightWidth(QuestionData.questionBody)}
              </fieldset>
              <select id="width_tmp_select">
                <option id="width_tmp_option"></option>
              </select>
              <script type="text/javascript">
              ${REACT_NATIVE_BRIDGE}
              ${CONTENT_SERVICE_BRIDGE}
              ${onToucEventForInteractive}
              </script>
            </body>`;
          rawCss = `<style>
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
                font-size:${TEXTFONTSIZE.Text12}px;
                border-radius:25px;
                background: linear-gradient(to left, ${COLORS.skyBlue} 25px,  white 25px);
              }
              .select_box{
                display:inline-grid;
                width:80px;
                overflow: hidden;
                border:1px solid #969696;
                border-radius:20px;
                position: relative;
                background: linear-gradient(to left, ${COLORS.skyBlue} 20px,  white 20px); 
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
                font-size:${TEXTFONTSIZE.Text12}px;
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
                font-size:${TEXTFONTSIZE.Text12}px;
                display : none;
                visibility:hidden;
                position:absolute;
              } 
              fieldset {
                border: none;
                padding: 5px;
              }
              </style>`;
          rawJs = `<script>
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
                  document.querySelector(".select_box").style.width = tempSelect.offsetWidth + 20 + 'px';
                }
            }
            </script>`;
          htmlContent = getCommonHtmlTemplate(
            rawContent,
            QTypes.Interactive,
            rawCss,
            rawJs,
            isMath,
            null,
            audioDetails.audioObj.question.hideQuesInSeconds,
          );
          break;
        case QTypes.MMcq:
          rawContent = `<body style="font-family:BalooThambi-Regular;" dir="${direction}">
              <br/>
              <div class="container" >
                <div class="row">
                  ${audioDetails && audioDetails.hasOwnProperty('instructionAudio') ? audioDetails.instructionAudio : ''}
                  ${audioDetails && instruction && `<div style="width:85%;"><p>${instruction}</p></div><br/>`}
                </div>
                  ${audioDetails.questionAudio}
                <p>${questionBody}</p>
                  ${QuestionData.response.mcqPattern.choices
              .map((item, index) => {
                if (!isMath)
                  isMath = validateHtmlForMaths(item.value).isMath;
                return `
                  <div id=${index} class="row" style="display:flex;flex-direction:row;background-color:${COLORS.sortListQuestionBackgroundColor
                  };border-radius:5px;text-align:center;padding-top:8%;padding-bottom:8%;width:100%;align-items: center;margin-top:10px" onclick="click_handler(${index})">
                  <div id=divcheck_${index} class="col-sm-1"><input type="checkbox" id="checkbox${index}" ${userResponse.includes(`${index}`) ? "checked" : ""} name="answer" value="${item.value
                  }" onchange="checkbox_handler(this.id)"></div>
                  <div id=00${index} style="background-color:${COLORS.blue}; ${isRTL ? 'margin-right:3%' : 'margin-left:3%'
                  };border-radius:50%;padding:4px;width:30px;height:30px;color:white;font-weight:bold;"> ${String.fromCharCode(
                    'A'.charCodeAt(0) + index,
                  )} </div>
                  <div class="col-sm-6" style="max-width:100%;min-width:70%"> <p>${validateHtmlForMaths(item.value).data
                  }</p></div>
                </div>`;
              })
              .join('')}
              </div>    
            </body>`;
          rawCss = `<style>
              * {
                  margin: 0;
              }
              body {
                background-color:${COLORS.white};
              }
            </style>`;
          rawJs = `<script type="text/javascript">
              function click_handler(id) {
                document.getElementById('checkbox'+id).checked=!document.getElementById('checkbox'+id).checked;
                let obj={id:""+id}
                window.ReactNativeWebView.postMessage(JSON.stringify(obj));
              } 
              function checkbox_handler(id) {
                document.getElementById(id).checked=!document.getElementById(id).checked;
              }    
            </script>`;
          htmlContent = getCommonHtmlTemplate(
            rawContent,
            QTypes.MMcq,
            rawCss,
            rawJs,
            isMath,
            null,
            audioDetails.audioObj.question.hideQuesInSeconds,
          );
          break;
        case QTypes.Matchlist:
          let isImage = false;
          rawContent = `<body style='background-color:white'>
          <div class="row" style='display:flex;flex-direction:row;padding:10px;'>
            ${audioDetails && audioDetails.hasOwnProperty('instructionAudio') ? audioDetails.instructionAudio : ''}
            ${instruction && `<div style="width:85%;"><p>${instruction}</p></div><br/>`}
          </div>
          <div> ${audioDetails.questionAudio}
          <p>${QuestionData?.questionBody}</p>
          </div>
          <div style='display:flex;flex-direction:row;vertical-align:middle;padding-bottom:5px;'>
              <div class="puzzle" style='margin-left:20px;padding-bottom:10px;'>
              ${QuestionData?.stems
              .map(item => {
                return `<div id='questionItem'>
                      <p style='flex:1;align-self:center;font-size:${TEXTFONTSIZE.Text14}px;'>${item.value}</p>
                  </div>`;
              })
              .join('')}
              </div>
              <div class="puzzle" id="puzzle" style='margin-left:20px;padding-bottom:10px;'>
              ${QuestionData?.response?.choices
              .map(item => {
                isImage = `${item.value}`.includes('<img') ? true : false;
                return `<div id="${item.index
                  }" class="number optionItem" draggable="true" value="${item.index
                  }">
                      <p style='flex:1;align-self:center;font-size:${TEXTFONTSIZE.Text14
                  }px;' value="${item.index}">${`${item.value}`.includes('<img')
                    ? item.value.replace('<img', `<img value="${item.index}"`)
                    : item.value
                  }</p>
                  </div>`;
              })
              .join('')}
              </div>
          </div>
      </body>`;
          rawCss = `<style>
          .puzzle {
              flex:1;
              display: flex;
              flex-direction: column;
              gap: 15px;
          }
  
          .number {
              border-radius: 4px;
              cursor: grab;
              user-select: none;
          }

          img {
           
            width:95%;
            height:${isTablet() ? '140px' : '75px'};
            user-drag: none;
            -webkit-user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
          }

          #questionItem {
              display: flex;
              flex:1;
              flex-direction: row;
              background-color: #EBF9FF;
              padding-top: ${isTablet() && !isImage ? '20px' : '5px'};
              padding-bottom: ${isTablet() && !isImage ? '20px' : '5px'};
              border-color: #38A8DF;
              align-self: center;
              width:95%;
              justify-content:center;
              // align-items:center;
              // text-align:center;
              border-radius: 4px;
          }
  
          .optionItem {
              display: flex;
              flex:1;
              flex-direction: row;
              background-color: #EBF9FF;
              padding-top: ${isTablet() && !isImage ? '20px' : '5px'};
              padding-bottom: ${isTablet() && !isImage ? '20px' : '5px'};
              border-style: solid;
              border-color: #38A8DF;
              align-self: center;
              height:150px;
              width:90%;
              justify-content:center;
          }
          .audioImg {
            height : auto;
            display: inline-block;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            background-color:${COLORS.white};
            overflow-clip-margin: content-box;
            overflow: clip;
        }
      </style>`;
          rawJs = `<script>
              // Global variables
              let draggedElement = null;

              // Event listeners
              document.addEventListener('DOMContentLoaded', () => {
                  // Get all the number elements
                  const numbers = Array.from(document.getElementsByClassName('number'));
                  // Attach event listeners for drag and drop
                  numbers.forEach(number => {
                      number.addEventListener('mousedown', handleDragStart);
                      number.addEventListener('touchstart', handleDragStart);
                      number.addEventListener('dragstart', handleDragStart);
                      number.addEventListener('dragover', handleDragOver);
                      number.addEventListener('dragenter', handleDragEnter);
                      number.addEventListener('dragleave', handleDragLeave);
                      //number.addEventListener('drop', handleDrop);
                      number.addEventListener('drop', (e)=>handleDrop(e,number.getAttribute("value")));
                      number.addEventListener('dragend', handleDragEnd);
                  });
              });

              // Drag and drop event handlers
              function handleDragStart(event) {
                  draggedElement = event.target;
                  event.dataTransfer.setData('text/plain', event.target.innerHTML);
                  //event.dataTransfer.setData('text/plain', event.target.textContent);
                  event.target.classList.add('dragging');
              }

              function handleDragOver(event) {
                  event.preventDefault();
              }

              function handleDragEnter(event) {
                  event.target.classList.add('drag-over');
              }

              function handleDragLeave(event) {
                  event.target.classList.remove('drag-over');
              }

              function handleDrop(event,value) {
                event.preventDefault();
                handleDropEvent(event);
              }

              function handleDropEvent(event) {
                const droppedElement = event.target;
                let dropContainer = droppedElement.closest('div[id]').innerHTML;
                let draggedContainer = draggedElement.closest('div[id]').innerHTML;
                let fromIndex = draggedContainer.match(/value="([^"]*)"/g)[0].split("=")[1];
                let toIndex = dropContainer.match(/value="([^"]*)"/g)[0].split("=")[1];
                droppedElement.closest('div[id]').innerHTML = draggedElement.closest('div[id]').innerHTML;
                draggedElement.innerHTML = dropContainer
                draggedElement.classList.remove('dragging');
                droppedElement.classList.remove('drag-over');
                let data = {
                    from: fromIndex.replace(/['"]/g, ''),
                    to: toIndex.replace(/['"]/g, ''),
                }
                window.ReactNativeWebView.postMessage(JSON.stringify(data));
              }

              function handleDragEnd() {
                  draggedElement = null;
                  const numbers = Array.from(document.getElementsByClassName('number'));
                  numbers.forEach(number => number.classList.remove('dragging', 'drag-over'));
              }
          </script>`;
          htmlContent = getCommonHtmlTemplate(
            rawContent,
            QTypes.Matchlist,
            rawCss,
            rawJs,
            null,
            null,
            audioDetails.audioObj.question.hideQuesInSeconds,
          );
          break;
        case QTypes.Ordering:
          rawContent = `<body style='background-color:white;'>
          <div class="row" style='display:flex;flex-direction:row;'>
            ${audioDetails && audioDetails.hasOwnProperty('instructionAudio') ? audioDetails.instructionAudio : ''}
            ${instruction && `<div style="width:85%;"><p>${instruction}</p></div><br/>`}
          </div>
          <div>${audioDetails.questionAudio}
          <p>${QuestionData?.questionBody}</p>
          </div>
          <div style='display:flex;vertical-align:middle;padding-bottom:5px;'>
            <div class="puzzle" id="puzzle" style='flex:1,margin-left:20px;padding-bottom:10px;'>
            ${userMarkedListData.hasOwnProperty('data') && userMarkedListData?.data.length > 0 ? userMarkedListData?.data.map(item => {
            return `  <div id="${item.index
              }" class="number optionItem" draggable="true" value="${item.index
              }">
                        ${item?.voiceover &&
              `<audio id="audio${item.index}" preload="auto">
                          <source src="${item.voiceover}" type="audio/mp3">Unsupported .
                        </audio>
                        <div onclick="playAudio('audio${item.index}')">
                          <img src="${Config.SPEAKER}" alt="A" hight=40 width=40/>
                        </div>`
              }
                        <div id=00${item.index} style="${isRTL ? 'margin-right:5%' : 'margin-left:2%'
              };background-color:${COLORS.blue
              };border-radius:50%;padding:5px;color:white;width:25px;height:25px;font-weight:bold;text-align:center;color:white;justify-content: center;align-items: center;"> ${String.fromCharCode(
                'A'.charCodeAt(0) + item.index,
              )} </div>
                        <p style='flex:1;' value="${item.index}">${item.value
              }</p>
                      </div>
                `;
          }).join('') :
              QuestionData?.response?.choices
                .map(item => {
                  return `  <div id="${item.index
                    }" class="number optionItem" draggable="true" value="${item.index
                    }">
                        ${item?.voiceover ?
                      `<audio id="audio${item.index}" preload="auto">
                          <source src="${item.voiceover}" type="audio/mp3">Unsupported .
                        </audio>
                        <div onclick="playAudio('audio${item.index}')">
                          <img src="${Config.SPEAKER}" alt="A" hight=40 width=40/>
                        </div>`: ''
                    }
                        <div id=00${item.index} style="${isRTL ? 'margin-right:5%' : 'margin-left:2%'
                    };background-color:${COLORS.blue
                    };border-radius:50%;padding:5px;color:white;width:25px;height:25px;font-weight:bold;text-align:center;color:white;justify-content: center;align-items: center;">
                     ${item.optionLabel} </div>
                        <p style='flex:1;' value="${item.index}">${item.value
                    }</p>
                      </div>
                `;
                })
                .join('')}
            </div>
          </div>
        </body>`;
          rawCss = `<style>
          .puzzle {
              flex:1;
              display: flex;
              flex-direction: column;
              gap: 8px;
              overflow:scroll;
          }
  
          .number {
              border-radius: 4px;
              cursor: grab;
              user-select: none;
          }
  
          .optionItem {
            display: flex;
            flex:1;
            flex-direction: row;
            margin: 2%;
            background-color: #EBF9FF;
            padding: 5px;
            border-style: dashed;
            border-color: #38A8DF;
            align-self: center;
            padding:10px;
            width: 80%;
            text-align:center;
            justify-content: center;
            align-items: center;
          }
          .audioImg {
            height : auto;
            display: inline-block;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            background-color:${COLORS.white};
            overflow-clip-margin: content-box;
            overflow: clip;
        }
      </style>`;

          rawJs = `<script>
          // Global variables
          let draggedElement = null;
      
          // Event listeners
          document.addEventListener('DOMContentLoaded', () => {
            // Get all the number elements
            const numbers = Array.from(document.getElementsByClassName('number'));
            // Attach event listeners for drag and drop
            numbers.forEach(number => {
              number.addEventListener('touchstart', handleDragStart);
              number.addEventListener('mousedown', handleDragStart);
              number.addEventListener('dragstart', handleDragStart);
              number.addEventListener('dragover', handleDragOver);
              number.addEventListener('dragenter', handleDragEnter);
              number.addEventListener('dragleave', handleDragLeave);
              //number.addEventListener('drop', handleDrop);
              number.addEventListener('drop', (e)=>handleDrop(e,number.getAttribute("value")));
              number.addEventListener('dragend', handleDragEnd);
            });
          });
      
          // Drag and drop event handlers
          function handleDragStart(event) {
            draggedElement = event.target;
            event.dataTransfer.setData('text/plain', event.target.textContent);
            event.target.classList.add('dragging');
          }
      
          function handleDragOver(event) {
            event.preventDefault();
          }
      
          function handleDragEnter(event) {
            event.target.classList.add('drag-over');
          }
      
          function handleDragLeave(event) {
            event.target.classList.remove('drag-over');
          }
      
          function handleDrop(event,value) {
            event.preventDefault();
            handleDropEvent(event)
          }

          function handleDropEvent(event) {
            const droppedElement = event.target;
            let dropContainer = droppedElement.closest('div[id]').innerHTML;
            let draggedContainer = draggedElement.closest('div[id]').innerHTML;
            let fromIndex = draggedContainer.match(/value="([^"]*)"/g)[0].split("=")[1];
            let toIndex = dropContainer.match(/value="([^"]*)"/g)[0].split("=")[1];
            droppedElement.closest('div[id]').innerHTML = draggedElement.closest('div[id]').innerHTML;
            draggedElement.innerHTML = dropContainer
            draggedElement.classList.remove('dragging');
            droppedElement.classList.remove('drag-over');
            let data = {
                from: fromIndex.replace(/['"]/g, ''),
                to: toIndex.replace(/['"]/g, ''),
            }
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
          }
      
          function handleDragEnd() {
            draggedElement = null;
            const numbers = Array.from(document.getElementsByClassName('number'));
            numbers.forEach(number => number.classList.remove('dragging', 'drag-over'));
          }
        </script>`;
          htmlContent = getCommonHtmlTemplate(
            rawContent,
            QTypes.Ordering,
            rawCss,
            rawJs,
            null,
            null,
            audioDetails.audioObj.question.hideQuesInSeconds,
          );
          break;
        case QTypes.Classification:
          let displayOneByOne = QuestionData?.display?.showChoicesOneByOne
            ? QuestionData?.display?.showChoicesOneByOne
            : false;
          rawCss = `<style>
            .puzzle {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              gap: ${deviceWidth / 40}px;
              text-align:center;
              margin-left:${deviceWidth / 20}px;
              margin-right:${deviceWidth / 20}px;
              padding-bottom:${deviceWidth / 40}px;
            }
            .number {
              border-radius: 4px;
              cursor: grab;
              user-select: none;
            }
            img {
              width: 95%;
              height: 75px;
              user-drag: none;
              -webkit-user-drag: none;
              user-select: none;
              -moz-user-select: none;
              -webkit-user-select: none;
              -ms-user-select: none;
            }
            .optionItem {
              display: flex;
              flex-direction: row;
              background-color: #EBF9FF;
              padding-top: 5px;
              padding-bottom: 5px;
              border-style: solid;
              border-color: #38A8DF;
              align-self: center;
              max-height: ${Dimensions.get('window').height / 10}px;
              justify-content: center;
              text-align: center;
              min-width:${deviceWidth / 3}px;
              max-width:${deviceWidth / 2.5}px;
            }
            .optionText {
              flex:1;
              align-self:center;
              font-size:${isTablet() ? 20 : 14}px;
            }
            .container {
              position: relative;
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 10px;
              background-image: url(data:image/png;base64,${COLORS.boxBase64});
              background-size: 110% 100%;
              min-height: ${Dimensions.get('window').height / 3.3}px;
              margin-left: -${deviceWidth / 25}px;;
              padding-left: 1px;
              padding-top: 30px;
              padding-bottom: 30px;
            }
            .closeIcon {
              display:none;
              margin:${deviceWidth / 50}px;
              align-self:center;
              height:${isTablet() ? 30 : 20}px;
              width:${isTablet() ? 30 : 20}px;
              background-color:white;
              border-radius:${isTablet() ? 15 : 10}px;
              font-size:${isTablet() ? 20 : 14}px;
              z-index:100px;
              align-slef:center;
              justifiy-content:center;
              box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            }
            .closeIconWithCross {
              display: 'block';
              margin:${deviceWidth / 50}px;px;
              align-self:center;
              height:${isTablet() ? 30 : 20}px;
              width:${isTablet() ? 30 : 20}px;
              background-color:white;
              border-radius:${isTablet() ? 15 : 10}px;
              font-size:${isTablet() ? 20 : 14}px;
              z-index:100px;
              align-slef:center;
              justifiy-content:center;
              box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            }
            .containerHeading {
              flex: 1;
              display: flex;
              flex-direction: row;
              vertical-align: middle;
              justify-content: space-around;
              margin-left:20px;
              margin-bottom:10px;
            }
            .headingInnerContainer {
              border-radius: 20px;
              background-color: #FEF5C7;
              align-self: center;
              text-align: center;
              min-width: ${deviceWidth / 4.5}px;
              max-width: ${deviceWidth / 5.5}px;
            }
            .hedingText {
              font-size: ${isTablet() ? 22 : 16}px;
            }
            .innerContainer {
              display:flex;
              flex-direction:row;
              vertical-align:middle;
              margin-right:${deviceWidth / 35}px;
              margin-left:${deviceWidth / 35}px;
            }
            .audioImg {
                height : auto;
                display: inline-block;
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                background-color:${COLORS.white};
                overflow-clip-margin: content-box;
                overflow: clip;
            }
          </style>`;
          rawJs = `<script>
            let draggedElement = null;
            let attemptedList=[${attemptedList}];
            let displayOneByOne = ${displayOneByOne};
            let total=${QuestionData?.response?.choices
              ? QuestionData?.response?.choices.length
              : 0
            };
            let currentIndex = 0;
            currentIndex = ${Object.keys(userMarkedListData).length > 0 ? ((userMarkedListData?.container1.length + userMarkedListData?.container2.length)) : 0}
            let displayindex = [];
            document.addEventListener('DOMContentLoaded', () => {
              const numbers = Array.from(document.getElementsByClassName('number'));
              numbers.forEach((number,index) => {
                  number.addEventListener('mousedown', handleDragStart);
                  number.addEventListener('touchstart', handleDragStart);
                  number.addEventListener('dragstart', handleDragStart);
                  number.addEventListener('dragenter', handleDragEnter);
                  number.addEventListener('dragover', handleDragOver);
                  number.addEventListener('dragleave', handleDragLeave);
                  number.addEventListener('dragend', handleDragEnd);
                  number.addEventListener('drop', handleDrop);
                  if(displayOneByOne) {
                    if (index != 0 && currentIndex == 0) {
                      number.style.display = "none";
                    }
                    displayindex.push(number.getAttribute("value"));
                  }
              });
            });
            function handleDragStart(event) {
              draggedElement = event.target;
              event.dataTransfer.setData('text/plain', event.target.innerHTML);
              event.target.classList.add('dragging');
            }
            function handleDragEnter(event) {
              event.target.classList.add('drag-over');
            }
            function handleDragOver(event) {
              event.preventDefault();
            }
            function handleDragLeave(event) {
              event.target.classList.remove('drag-over');
            }
            function handleDragEnd() {
              draggedElement = null;
              const numbers = Array.from(document.getElementsByClassName('number'));
              numbers.forEach(number => number.classList.remove('dragging', 'drag-over'));
            } 
            function allowDrop(event) {
              event.preventDefault();
            }
            function handleDrop(event) {
              event.preventDefault();
            }
            function dropToContainer1(event) {
              event.preventDefault();
              let draggedContainer = draggedElement.closest('div[id]');
              let parent = document.querySelector("#container1")
              parent.appendChild(draggedContainer);
              let index=draggedElement.getAttribute("value")
              let data = {
                  itemId :index,
                  container : '1'
              };
              document.getElementById("close"+index).style.display = "block";
              if(displayOneByOne && currentIndex < 8) {
                currentIndex++;
                if(currentIndex < displayindex.length) {
                  document.getElementById(displayindex[currentIndex]).style.display = "flex";
                }
              }
              draggedElement.setAttribute('draggable', 'false');
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
            }
            function dropToContainer2(event) {
              event.preventDefault();
              let draggedContainer = draggedElement.closest('div[id]');
              let parent2=document.querySelector("#container2")
              parent2.appendChild(draggedContainer);
              let index=draggedElement.getAttribute("value")
              let data = {
                  itemId : index,
                  container : '2'
              };
              document.getElementById("close"+index).style.display = "block";
              if(displayOneByOne && currentIndex < 8) {
                currentIndex++;
                if(currentIndex < displayindex.length) {
                  document.getElementById(displayindex[currentIndex]).style.display = "flex";
                }
              }
              draggedElement.setAttribute('draggable', 'false');
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
           
            }
            function onClose(id) {
              document.getElementById("close"+id).style.display = "none";
              const questionContainer = document.getElementById("puzzle");
              const element = document.getElementById(id);
              element.setAttribute('draggable', 'true');
              questionContainer.appendChild(element);
              let data = {
                itemId : id,
                option : 'remove'
              };
              if (displayOneByOne) {
                document.getElementById(id).style.display = "none";
                displayindex = displayindex.filter(item => item != id);
                displayindex.push(id);
                document.getElementById(displayindex[currentIndex-1]).style.display = "flex";
                currentIndex--;
              }
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
            }
          </script>`;
          rawContent = `
            <body style='background-color:white' dir=${direction}>
            <div class="row" style='display:flex;flex-direction:row;padding:10px;'>
            ${audioDetails && audioDetails.hasOwnProperty('instructionAudio') ? audioDetails.instructionAudio : ''}
            ${instruction && `<div style="width:85%;"><p>${instruction}</p></div><br/>`}
          </div>  
              <div> 
              ${audioDetails.questionAudio}
                <p>${QuestionData?.questionBody}</p>
              </div>
              <div style='display:flex;flex-direction:row;vertical-align:middle;padding-bottom:5px;align-content:center;justify-content: center;'>
                <div class="puzzle" id="puzzle">
                  ${QuestionData?.response?.choices.map((item, index) => {
            if (isMarkedItem(item, userMarkedListData, isReport)) {
              return '';
            }
            let currentIdentifier = isReport ? item.identifier : Base64.decode(`${item.identifier}`);
            if (attemptedList.length > 0) {
              return attemptedList.includes(parseInt(currentIdentifier)) ? '' : `<div id="${currentIdentifier}" class="number optionItem" draggable="true" value="${currentIdentifier}" dir=${direction}>
                    <div id='close${currentIdentifier}' class="closeIcon" onclick="onClose(${currentIdentifier})">x</div>
                    <p class='optionText' value="${currentIdentifier}" dir=${direction}>${item.value}</p>
                  </div>`
            } else {
              return `<div id="${currentIdentifier}" class="number optionItem" draggable="true" value="${currentIdentifier}" dir=${direction}>
                    <div id='close${currentIdentifier}' class="closeIcon" onclick="onClose(${currentIdentifier})">x</div>
                    <p class='optionText' value="${currentIdentifier}" dir=${direction}>${item.value}</p>
                  </div>`;
            }
          })
              .join('')}
                </div>
              </div>
              <hr>
              <div class='containerHeading'>
                <div class="headingInnerContainer">
                  <p class="hedingText" >${QuestionData.stems[0].value}</p>
                </div>
                <div class="headingInnerContainer">
                  <p class="hedingText">${QuestionData.stems[1].value}</p>
                </div>
              </div>
              <div class='innerContainer'>
                <div class="container" id="container1"  ondrop="dropToContainer1(event)"  ondragover="allowDrop(event)">
                  ${Object.keys(userMarkedListData).length > 0 ? userMarkedListData?.container1.map((item, index) => {
                if (item === '') return '';
                let currentIdentifier = isReport ? item.identifier : Base64.decode(`${item.identifier}`);
                return `<div id="${currentIdentifier}" class="number optionItem" draggable="true" ondrop="dropToContainer1(event)" value="${currentIdentifier}" dir=${direction}>
                            <div id='close${currentIdentifier}' class="closeIconWithCross" onclick="onClose(${currentIdentifier})">x</div>
                            <p class='optionText' value="${currentIdentifier}" dir=${direction}>${item.value}</p>
                          </div>`;
              }).join('') : ''}
                </div>
                <div class="container" id="container2" ondrop="dropToContainer2(event)" ondragover="allowDrop(event)">
                  ${Object.keys(userMarkedListData).length > 0 ? userMarkedListData?.container2.map((item, index) => {
                if (item === '') return '';
                let currentIdentifier = isReport ? item.identifier : Base64.decode(`${item.identifier}`);
                return `<div id="${currentIdentifier}" class="number optionItem" draggable="true" ondrop="dropToContainer2(event)" value="${currentIdentifier}" dir=${direction}>
                              <div id='close${currentIdentifier}' class="closeIconWithCross" onclick="onClose(${currentIdentifier})">x</div>
                              <p class='optionText' value="${currentIdentifier}" dir=${direction}>${item.value}</p>
                            </div>`;
              })
              .join('') : ''}
                </div>
              </div>
            </body>`;
          htmlContent = getCommonHtmlTemplate(
            rawContent,
            QTypes.Classification,
            rawCss,
            rawJs,
            null,
            null,
            audioDetails.audioObj.question.hideQuesInSeconds,
          );
          break;
        case QTypes.SortList:
          rawContent = `<body style='background-color:white' dir=${direction}>
              <div class="container" >
              <div class="row">
                ${audioDetails && audioDetails.hasOwnProperty('instructionAudio') ? audioDetails.instructionAudio : ''}
                ${instruction && `<div style="width:85%;"><p>${instruction}</p></div><br/>`}
              </div>
              <div>
                ${audioDetails.questionAudio}
                <p>${questionBody}</p>
              </div>
              <br/>
            </body>`
          htmlContent = getCommonHtmlTemplate(
            rawContent,
            QTypes.SortList,
            rawCss,
            rawJs,
            null,
            null,
            audioDetails.audioObj.question.hideQuesInSeconds,
          );
          break;
        default:
          htmlContent = '';
      }
      return htmlContent;
    }
  } catch (error) {
    console.log(`getHtml templet error = ${error}`);
  }
};

const onToucEventForInteractive = ` 
try {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    var frame = document.getElementById("quesInteractive");
    eventer(messageEvent, function (event) {

        let obj={};
        obj.type="IframeResponse"
        obj.response=event.data; 
        if(event.data.height) {
          const iframes=document.getElementsByTagName("iframe");
          for(var i = 0; i < iframes.length; i++) { 
              iframes[i].setAttribute("height",event.data.height); 
          }
        }
        window.webViewBridge.send(JSON.stringify(obj)); 
        if (event.origin == "http://mindspark-ei.s3.amazonaws.com" || event.origin == "http://d2tl1spkm4qpax.cloudfront.net" || event.origin == "mindspark-ei.s3.amazonaws.com" || event.origin == "d2tl1spkm4qpax.cloudfront.net" || $("#offlineStatus").val()=="3" || $("#offlineStatus").val()=="4" || $("#offlineStatus").val()=="7" || event.origin == "https://mindspark-ei.s3.amazonaws.com" || event.origin == "https://d2tl1spkm4qpax.cloudfront.net" || event.origin == "http://27.109.14.76:808") {
            var response1 = "";
            response1 = event.data;

            if (response1.indexOf("||") != -1) {
                dispalAnswerParam = "";
                response1Array = response1.split("||");
                result = parseInt(response1Array[0]);
                $('#userResponse').val(response1Array[1]);
                if(['', 'null', 'undefined'].indexOf(response1Array[2])==-1)
                    $('#extraParameters').val(response1Array[2].replace(/\|~\|/, '||'));
                if (typeof(response1Array[3]) !== 'undefined') {
                    dispalAnswerParam = response1Array[3];
                }
                if (response1Array.length > 4) {
                  resultInt = response1Array[4];

                  if (typeof resultInt === 'string') {
                     resultInt = parseInt(resultInt);
                  }

                  if (typeof resultInt === 'number' && resultInt > 0) {
                    const iframes = document.getElementsByTagName("iframe");
                    for(var i = 0; i < iframes.length; i++) { 
                        iframes[i].setAttribute("height", resultInt); 
                    }
                  }
                }

                var ddBtnObj = {};
                ddBtnObj.id = dispalAnswerParam;
                obj.dispalAnswerParam = ddBtnObj
                window.webViewBridge.send(JSON.stringify(obj)); 
                window.ReactNativeWebView.postMessage(JSON.stringify(obj));               
        
                if (result > 2) {
                    $.post("errorLog.php", "params=" + $("#quesform").find("input").serialize() + "&type=3", function (data) { });
                }
            }
            else if(response1.indexOf("frameHeight=") == 0) {
              frameHeight=response1.replace('frameHeight=','');
              $("#quesInteractive").attr('height',frameHeight);
            }
            else if(response1 == 'triggerSubmit') {
                submitAnswer();
            }
            else if(response1 == 'hideSubmit') {
                $("#submitQuestion").hide();
                $("#submitQuestion1").hide();
                $("#submitQuestion2").hide();
                $('#submit_bar').hide();
                $('#submit_bar1').hide();
                $('#submitArrow').hide();
            }
            else {
                var message;
                try {
                    message = JSON.parse(response1);
                } catch(error) {
                    message = {};
                }
                if(message.hasOwnProperty('subject')) {
                    switch(message.subject) {
                        case 'screenState': {
                            $('iframe').each(function() {
                                if(e.source===this.contentWindow) {
                                    toggleFullscreen(this);
                                    return false;
                                }
                            });
                            break;
                        }
                        case 'trail': {
                            constrTool.trail = message.content.trail;
                            break;
                        }
                    }
                }
            }
        }
    }, false);
}
catch (error) {
    alert('error in getting the response from interactive');
} `;

export default getQuestionItemHtmlTemplate;
