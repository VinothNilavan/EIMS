import { Dimensions } from "react-native";
import { QTypes } from "../../../helpers";
import getCommonCss from './CommonCss';
import getCommonJs from './CommonJs';
import explanationHtml from "../Qtypes/ExplanationHtml";
import { COLORS, TEXTFONTSIZE } from '@constants';
import { SimpleHtmlTemplate, checkForAudio, getImages } from '@utils';
import { Config } from 'react-native-config';
import { MATHJS_CONFIG, HandleTheMathJaxEdicine, HandleTheMathJax } from '../../../components/htmlComponents/MATHJS_CONFIG';

const regex = /(<([^>]+)>)/ig;
const width = Dimensions.get('window').width;

const isTable = (str) => {
    if (str.indexOf('<table') > -1 || str.indexOf('<TABLE') > -1) {
        return true;
    }
    return false;
}

const isUserAnswered = (userArray, idx) => {
    if (Array.isArray(userArray)) {
        return (userArray.includes(`${idx}`) || userArray.includes(idx))
    } else {
        return false
    }
}

const checkUserAns = (userAnswer, index) => {
    if (userAnswer && !userAnswer?.mcqPattern) {
        return `${index}` === `${userAnswer}`;
    }
    return `${index}` === `${Array.isArray(userAnswer?.mcqPattern?.userAnswer) ? userAnswer?.mcqPattern?.userAnswer[0] : userAnswer?.mcqPattern?.userAnswer}`;
}

const validateHtmlForMaths = (html) => {
    let Data = { isMath: false, data: html }
    let htmlData = html;
    if (html?.indexOf('class="math"') > -1) {
        htmlData = HandleTheMathJaxEdicine(htmlData);
        htmlData = HandleTheMathJax(htmlData);
        htmlData = `${htmlData}`.replaceAll('&#10;', '');
        Data = { isMath: true, data: htmlData }
    }
    return Data
}
const setDynamicHeightWidth = (questionBody) => {
    const qBodyArray = questionBody.split(" ");
    const { width } = Dimensions.get('window');
    const updatedBodyArray = qBodyArray.map((data) => {
        if (data.indexOf("width") >= 0) {
            return `width=${width - 50}px`
        }
        return data;
    })
    return updatedBodyArray.join(" ");
}

const getHtmlTemplate = (type, questionData, result, userResponse) => {
    try {
        if (questionData) {
            let html_content = '';
            let rawContent = ``;
            let q_body = '';
            let choices;
            let isMath = validateHtmlForMaths(questionData?.questionBody).isMath;
            let questionBody = validateHtmlForMaths(questionData?.questionBody).data
            switch (`${type}`.toLowerCase()) {
                case QTypes.MCQ:
                    rawContent = ` <body style = "background-color:white;">
                    <br/>
                    <div class="container">
                    <p>${isIframeContent(questionBody) ? setDynamicHeightWidth(questionBody) : questionBody}</p>
                    <div id="hide" style="font-size:18px;font-family:BalooThambi-Regular;">
                            ${questionData.response.mcqPattern.choices.map((item, index) => {
                        if (!isMath) { isMath = validateHtmlForMaths(item.value).isMath; }
                        if (checkUserAns(userResponse, index)) {
                            if (result === 'pass') {
                                return `<div id=${index}  class ='mcqOptionContainer' >
                                            <span id=00${index}  class='mcqOptionIdentifier' style='background-color:#2ECD99;color:white;font-size:18px'> ${String.fromCharCode('A'.charCodeAt(0) + index)} </span>
                                            <div class="col-sm-9" id='mcqOption'> <p>${validateHtmlForMaths(item.value).data}</p></div>
                                        </div>`
                            } else {
                                return `<div id=${index}  class ='mcqOptionContainer'>
                                            <span id=00${index} class='mcqOptionIdentifier' style='background-color:${COLORS.red};color:white;font-size:18px'> ${String.fromCharCode('A'.charCodeAt(0) + index)} </span>
                                            <div class="col-sm-9" id='mcqOption'> <p>${validateHtmlForMaths(item.value).data}</p></div>
                                        </div>`
                            }
                        } else {
                            return `<div id=${index}  class ='mcqOptionContainer' >
                                        <span id=00${index} class='mcqOptionIdentifier' style='font-size:18px'> ${String.fromCharCode('A'.charCodeAt(0) + index)} </span>
                                        <div class="col-sm-9" id='mcqOption'> <p>${validateHtmlForMaths(item.value).data}</p></div>
                                    </div>`
                        }
                    }).join('')}</div>
                            </div>
                        </body>`;
                    html_content = getCommonHtmlTemplate(rawContent, QTypes.MCQ, '', '', isMath);
                    break;
                case QTypes.MMcq:
                    rawContent = ` <body style = "background-color:white">
                    <br/>
                    <div class="container"><p>${questionBody}</p>
                    ${questionData.response.mcqPattern.choices.map((item, index) => {
                        if (!isMath) { isMath = validateHtmlForMaths(item.value).isMath; }
                        if (isUserAnswered(questionData.userAnswer?.mcqPattern?.userAnswer, index) || isUserAnswered(questionData?.userAnswer?.userAnswer, index)) {
                            if (result === 'pass') {
                                return `<div id=${index}  class ='mcqOptionContainer' >
                                            <span id=00${index}  class='mcqOptionIdentifier' style='background-color:#2ECD99;color:${COLORS.white}'> ${String.fromCharCode('A'.charCodeAt(0) + index)} </span>
                                            <div class="col-sm-9" id='mcqOption'> <p>${validateHtmlForMaths(item.value).data}</p></div>
                                        </div>`
                            } else {
                                return `<div id=${index}  class ='mcqOptionContainer'>
                                            <span id=00${index} class='mcqOptionIdentifier' style='background-color:${COLORS.red};color:${COLORS.white}'> ${String.fromCharCode('A'.charCodeAt(0) + index)} </span>
                                            <div class="col-sm-9" id='mcqOption'> <p>${validateHtmlForMaths(item.value).data}</p></div>
                                        </div>`
                            }
                        } else {
                            return `<div id=${index}  class ='mcqOptionContainer' >
                                        <span id=00${index} class='mcqOptionIdentifier'> ${String.fromCharCode('A'.charCodeAt(0) + index)} </span>
                                        <div class="col-sm-9" id='mcqOption'> <p>${validateHtmlForMaths(item.value).data}</p></div>
                                    </div>`
                        }

                    }).join('')}</div></body>`;
                    html_content = getCommonHtmlTemplate(rawContent, QTypes.MMcq, '', '', isMath);
                    break;
                case QTypes.Blank:
                    isMath = validateHtmlForMaths(questionData.data.questionBody).isMath;
                    q_body = validateHtmlForMaths(questionData.data.questionBody).data;
                    choices = questionData.data.response;
                    for (let choice in choices) {
                        if (choices.hasOwnProperty(choice)) {
                            let size = 5;
                            let type = 'text';
                            let pattern = '[a-zA-Z]*';
                            let isNumeric = false;
                            try {
                                if (choices[choice].hasOwnProperty('attributes') && choices[choice].attributes.hasOwnProperty('size')) {
                                    size = choices[choice].attributes.size;
                                    size = size > 20 ? 20 : size;
                                    size = size < 5 ? 5 : size;
                                }
                                if (choices[choice].hasOwnProperty('attributes') && choices[choice].attributes.hasOwnProperty('numeric')) {
                                    isNumeric = choices[choice].attributes.numeric;
                                }
                            } catch (err) { console.log(err); }
                            if (isNumeric) {
                                type = 'number';
                                pattern = '[0-9]+';
                            }
                            let userResponse = '';
                            let userResponses = questionData?.userAttemptData?.userResponse;
                            if (userResponses?.hasOwnProperty(choice)) {
                                userResponse = userResponses[choice].hasOwnProperty('userAnswer')
                                    ? userResponses[choice].userAnswer
                                    : '';
                            }
                            q_body = q_body.replace(
                                '[' + choice + ']',
                                `<input 
                                    type="${type}" 
                                    id="${choice}" 
                                    pattern="${pattern}"
                                    value="${userResponse}"
                                    dir="ltr" 
                                    autocomplete="nope"
                                    spellcheck="false"  
                                    autocorrect="off"
                                    autocapitalize="none" 
                                    size="${size}" 
                                    oninput="inputChangeFunction(this.id)" 
                                    style='width:${size}em;height:2em;border-radius:25px;border:1px solid #969696; padding:2px 8px;text-align:center;font-size:16px;'
                                    disabled
                                    />`,
                            );
                        }
                    }
                    let isIframe = isIframeContent(`${q_body}`);
                    html_content = `${SimpleHtmlTemplate(
                        `${q_body}`,
                        false,
                        false,
                        null,
                        false,
                        isTable(`${q_body}`),
                        false,
                        '',
                        isMath,
                        isIframe, 
                        '',
                        ''
                    )}`;
                    break;
                case QTypes.Dropdown:
                    q_body = validateHtmlForMaths(questionData.data.questionBody).data;
                    q_body = checkForAudio(q_body);
                    isMath = validateHtmlForMaths(questionData.data.questionBody).isMath

                    choices = questionData.data.response;
                    q_body += '';
                    choices = questionData.data.response;
                    let fields = choices;
                    let ddButton;
                    for (let field in fields) {
                        let userResponses = questionData?.userAttemptData?.userResponse;
                        let userAnswer = 'select';
                        if (userResponses?.hasOwnProperty(field)) {
                            userResponses = parseInt(userResponses[field].hasOwnProperty('userAnswer') ? userResponses[field].userAnswer : -1);
                            if (
                                userResponses !== null &&
                                userResponses !== undefined &&
                                userResponses !== -1 &&
                                choices[field] !== null &&
                                choices[field] !== undefined &&
                                choices[field].choices[userResponses] !== null &&
                                choices[field].choices[userResponses] !== undefined
                            ) {
                                userAnswer = choices[field].choices[userResponses].value;
                            }
                        }
                        if (fields.hasOwnProperty(field)) {
                            let fieldArr = field.split('_');
                            switch (fieldArr[0]) {
                                case 'dropdown':
                                    ddButton = `<select id="${field}" name="dropdown_2" class="dropdown_button"  style="border-color:green;" disabled><option selected value= "">${userAnswer}</option></select>`
                                    q_body = q_body.replace('[' + field + ']', ddButton);
                                    break;
                            }
                        }
                    }
                    rawContent = `<body style = "background-color:white"><div class="container"><p>${q_body}</p></div></body>`
                    html_content = getCommonHtmlTemplate(rawContent, QTypes.Dropdown);
                    break;
                case QTypes.Interactive:
                    q_body = `${questionData.questionBody}`.replaceAll(/width='\s*(\d+)px'/ig, `width='${Math.floor(Dimensions.get("screen").width) - 50}px'`);
                    rawContent = `<body style = "background-color:white"><div class="container" style="max-width:100%"><div class="responsive-container">${q_body}</div></div></body>`;
                    html_content = getCommonHtmlTemplate(rawContent, QTypes.Interactive);
                    break;
                case QTypes.Classification:

                    rawContent = `<body style='background-color:white'>
                    <div>
                      <p>${questionData?.questionBody}</p>
                    </div>
                    <div style='display:flex;flex-direction:row;vertical-align:middle;padding-bottom:5px;align-content:center;justify-content: center;'>
                      <div class="puzzle" id="puzzle">
                        ${questionData?.response?.choices.map((item, index) => {
                        return `<div id="${index}" class="number optionItem" draggable="true" value="${index}">
                          <div id='close${index}' class="closeIcon" onclick="onClose(${index})">x</div>
                          <p style='flex:1;align-self:center;font-size:13.454545454545455px;' value="${index}">${item.value}</p>
                        </div>`}).join('')}
                      </div>
                    </div>
                    <hr>
                    <div class='containerHeading'>
                      <div class="headingInnerContainer">
                        <p class="hedingText">${questionData.stems[0].value}</p>
                      </div>
                      <div class="headingInnerContainer">
                        <p class="hedingText">${questionData.stems[1].value}</p>
                      </div>
                    </div>
                    <div style='display:flex;flex-direction:row;vertical-align:middle;padding:10px;'>
                      <div class="container" id="container1" ondrop="dropToContainer1(event)" ondragover="allowDrop(event)"></div>
                      <div class="container" id="container2" ondrop="dropToContainer2(event)" ondragover="allowDrop(event)"></div>
                    </div>
                  </body>`
                    html_content = getCommonHtmlTemplate(rawContent, QTypes.Classification)
                    break;
                case QTypes.Ordering:
                    rawContent = `<body style = "background-color:white">
                    <br/>
                    <div class="container">
                    <p>${questionData.questionBody}</p>
                        ${questionData.response.choices.map((item, index) => {
                        if (!isMath) { isMath = validateHtmlForMaths(item.value).isMath; }
                        return `<br/><div id=${index} class="row" style="display:flex;flex:direction:row;background-color:#EBF9FF;border-radius:5px;text-align:center;padding-top:5%;padding-bottom:5%;width:100%;align-items: center; border: 2px dashed #B3BDC0;">
                                                ${item?.voiceover && `<audio id="audio${item.index}" preload="auto">
                                                        <source src="${item.voiceover}" type="audio/mp3">Unsupported .
                                                    </audio>
                                                    <div onclick="playAudio('audio${item.index}')">
                                                        <img src="${Config.SPEAKER}" alt="A" hight=40 width=40/>
                                                    </div>`}    
                                                <div id=00${index} class="col-sm-1" style="margin-left:5%;background-color:${COLORS.optionBg};color:white;border-radius:100%;padding:3px;"> ${String.fromCharCode('A'.charCodeAt(0) + index)} </div>
                                                <div class="col-sm-9" style="margin-left:5%;width:100%;min-width:80%"> <p>${validateHtmlForMaths(item.value).data}</p></div>
                                            </div>`
                    }).join('')}</div></body>`;
                    html_content = getCommonHtmlTemplate(rawContent, QTypes.Ordering)
                    break;
                case QTypes.Matchlist:
                    let isImage = false;
                    let userAttemtedData = questionData?.userAnswer?.choices.length > 0 ? questionData?.userAnswer?.choices : questionData?.response?.choices;
                    rawContent = `<body style='background-color:white'>
                        <div><p>${questionData?.questionBody}</p></div>
                        <div style='display:flex;flex-direction:row;vertical-align:middle;padding-bottom:5px;'>
                            <div class="puzzle" style='margin-left:10px;padding-bottom:10px;'>
                            ${questionData?.response?.choices?.map((item, index) => {
                        return `<div id='questionItem'>
                                    <p style='flex:1;align-self:center;font-size:${TEXTFONTSIZE.Text14}px;'>${questionData.stems[index].value}</p>
                                </div>`}).join('')}
                            </div>
                            <div class="puzzle" id="puzzle" style='margin-left:20px;padding-bottom:10px;'>
                            ${userAttemtedData.map(item => {
                            isImage = `${item.value}`.includes('<img') ? true : false;
                            return `<div id="${item.index}" class="number optionItem" draggable="false" value="${item.index}">
                                    <p style='flex:1;align-self:center;font-size:${TEXTFONTSIZE.Text14}px;' value="${item.index}">${`${item.value}`.includes('<img') ? item.value.replace('<img', `<img value="${item.index}"`) : item.value}</p>
                                </div>`}).join('')}
                            </div>
                        </div>
                    </body>`
                    html_content = getCommonHtmlTemplate(rawContent, QTypes.Matchlist, '', '', '', isImage)
                    break;
                case QTypes.SortList:
                    rawContent = ` <body style = "background-color:white">
                    <br/>
                    <div class="container"><p>${questionData.questionBody}
                        <br/>
                        </p>
                        <br/>
                        <div class="flex-parent">
                        <div id=0 class="row" style="display:flex;flex:direction:row;background-color:white;border-radius:5px;text-align:center;padding-top:5%;padding-bottom:5%;width:95%;align-items: center;">
            
                        ${questionData.response.choices.map((item, index) => {
                        if (item.value.includes('<img') && questionData.stems[index].value.includes('<img')) {
                            return `<div style="margin: 5px; "><img class="img" src="${getImages(questionData.stems[index].value)}" ></div>
                                            <div style="margin: 5px; "><img class="img" src="${getImages(item.value)}" ></div>
                                        </div>`
                        } else if (item.value.includes('<img')) {
                            return `<div class="box">${questionData.stems[index].value}</div>
                                    <div style="margin: 5px;border: 1px solid #ADC0CD; padding : 20px 20px 20px 20px;"><img class="img" src="${getImages(item.value)}" ></div>`
                        } else if (questionData.stems[index].value.includes('<img')) {
                            return `<div style="margin: 5px; "><img class="img" src="${getImages(questionData.stems[index].value)}" ></div>
                                        <div style="margin: 5px; padding : 20px 20px 20px 20px;"><img class="img" src="${item.value}"> </div>`
                        } else {                      
                            return `<div id=000 class="col-sm-3" style="margin:2%;background-color:#EBF9FF;padding:3px;border-style: dashed;border-color:#38A8DF;padding : 20px 20px 20px 20px;"> ${validateHtmlForMaths(item.value).data} </div>`
                        }
                    }).join('')}</div></body>`
                    html_content = getCommonHtmlTemplate(rawContent, QTypes.SortList)
                    break;
                case QTypes.TextInteraction:
                    q_body = `${questionData.questionBody}`.replaceAll(/width='\s*(\d+)px'/ig, `width='${Math.floor(Dimensions.get("screen").width) - 50}px'`);
                    rawContent = `<div class="container" style="max-width:100%">${q_body}</div>`;
                    html_content = getCommonHtmlTemplate(rawContent, QTypes.TextInteraction)
                    break;
                default: console.log("default ");
                    break;
            }
            return html_content;
        } else {
            return '';
        }
    } catch (err) {
        console.log("err in get html template", err);
    }
}

const isIframeContent = (content) => content.indexOf('<iframe') > -1;

const getSampleHtmlTemplet = () => {
    console.log("sample html templet called");
    return `<!DOCTYPE html>
        <html>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <title>Mindspark</title>
        <head>
           <link rel="stylesheet" href="${Config.Min_css}">
            <script src="${Config.Jquery}" defer></script> 
            ${MATHJS_CONFIG}
            <script src="${Config.CDN_BASE_URL}Student/assets/js/contentService.js?v=2.3.2.20" defer></script>
            <script src="${Config.CDN_BASE_URL}Student/assets/js/contentService.js?v=2.3.2.20" defer></script>
        </head>
        </html>`;
}

const getCommonHtmlTemplate = (content = '', questionTemplate = '', cssTemplet = '', jsTemplet = '', isMath = false, isImage = false, hideQuesInSeconds = 0) => {
    //Check for IFRAME
    let isIframe = isIframeContent(content);
    return `<!DOCTYPE html>
        <html>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <title>Mindspark</title>
        <head>
            ${isMath ? MATHJS_CONFIG : ``} 
            ${isMath ? `` : `<link rel="stylesheet" href="${Config.Min_css}">`}
            <script src="${Config.Jquery}" async></script> 
            <script src="${Config.CDN_BASE_URL}Student/assets/js/contentService.js?v=2.3.2.20" async></script>
            ${isIframe ? iframeDynamicWidth(width) : ``}
            ${cssTemplet ? cssTemplet : getCommonCss(questionTemplate, isMath, isImage)}
            ${jsTemplet ? jsTemplet : getCommonJs(questionTemplate)}
        </head>
            ${content}
            <script>
              var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
              var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
              var eventer = window[eventMethod];
              function hideQuestionAudio(time) {
                setTimeout(() => {
                    document.getElementById('quesAudio').style.display = "none";
                }, time);
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
                eventer(messageEvent, function (event) {
                    if(event.data.height) {
                        const iframes = document.getElementsByTagName("iframe");
                        for(let i = 0; i < iframes.length; i++) { 
                            iframes[i].setAttribute("height",event.data.height); 
                        }
                    }
                });
                ${hideQuesInSeconds > 0 ? `hideQuestionAudio(${hideQuesInSeconds})` : ''}
            </script>
    </html>`;
}

const HtmlToText = html_content => {
    try {
        if (html_content) {
            return `${html_content}`.replaceAll('<br>', '\n').replace(regex, "");
        }
    } catch (err) {
        console.log(err);
    }
}

const iframeDynamicWidth = (width) => {
    return ` <script type="text/javascript">        
            $(document).ready(function () {
                const iframes=document.getElementsByTagName("iframe");
                for(var i = 0; i < iframes.length; i++) { 
                    let oldH = iframes[i].getAttribute('height').replace("px","");
                    let oldW = iframes[i].getAttribute('width').replace("px","");
                    let iframeWidth=${width};
                    let newH=parseInt(oldH) * (parseInt(iframeWidth) / parseInt(oldW));
                    iframes[i].setAttribute("height", newH + 20); 
                    iframes[i].setAttribute("width", ${width - 50});
                }
            });
         </script>`;
}

export { getHtmlTemplate, HtmlToText, explanationHtml, getCommonHtmlTemplate, validateHtmlForMaths, getSampleHtmlTemplet }