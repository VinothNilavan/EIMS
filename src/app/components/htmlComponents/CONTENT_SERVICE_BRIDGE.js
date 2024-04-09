export const CONTENT_SERVICE_BRIDGE = `

var contentServiceObject;
var contentObject;

function initContentService(data) { 
  try {
    contentServiceObject = new ContentService(data);
    contentObject = contentServiceObject[0];
    let obj = {
      init: 'Init Done',
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));
    return true;
  } catch (err) {
    alert('Errror+');
    window.ReactNativeWebView.postMessage(JSON.stringify({ERROR: 'err'}));
    return true;
  }
}

function evaluateAnswer(data, inputData, id) {
  // let contentServiceObject = new ContentService(data);
  // let contentObject = contentServiceObject[0];
  try {
    if (contentServiceObject) {
      let obj = {
        type: 'ContentService',
        function: 'evaluateAnswer',
      };

      let val = contentObject.evaluateAnswer(
        inputData ? JSON.stringify(inputData) : null,
      );
      let subVal = contentObject.getSubmitData();
      obj.evaluatedResult = val;
      obj.submitData = subVal;
      obj.id = id;
      window.ReactNativeWebView.postMessage(JSON.stringify(obj));
    } else {
      contentServiceObject = new ContentService(data);
      contentObject = contentServiceObject[0];
      let obj = {
        type: 'ContentService',
        function: 'evaluateAnswer',
      };

      let val = contentObject.evaluateAnswer(
        inputData ? JSON.stringify(inputData) : null,
      );
      let subVal = contentObject.getSubmitData();
      obj.evaluatedResult = val;
      obj.submitData = subVal;
      obj.id = id;
      window.ReactNativeWebView.postMessage(JSON.stringify(obj));
    }
  } catch (err) {
    alert(err.message);
    let obj = {
      error: err,
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));
  }
}

function checkIframe() {
  try { 
    var frame = document.getElementById('quesInteractive');
    var win = frame.contentWindow;
    try {
      win.postMessage('checkGameComplete', '*'); 
    } catch (ex) {
      alert('error1');
    }
  } catch (ex) {
    alert('error2');
  }
}

function getTemplate(){
    let obj={
        type:"ContentService",
        function:"getTemplate"
    } 
    let template = contentObject.getTemplate();
    template = template.toLowerCase();
    obj.template=template;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj)); 
    //document.body.style.backgroundColor = 'blue'; 
 }

 function getContentType(){
    let obj={
        type:"ContentService",
        function:"getContentType"
    } 
    let val = contentObject.getContentType(); 
    obj.contentType=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 function getDisplayObject(){
    let obj={
        type:"ContentService",
        function:"getDisplayObject"
    } 
    let val = contentObject.getDisplayObject(); 
    obj.displayObject=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 function getDisplayObjectForView(){
    let obj={
        type:"ContentService",
        function:"getDisplayObjectForView"
    } 
    let val = contentObject.getDisplayObjectForView(); 
    obj.displayObjectForView=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 function getExplanation(){
    let obj={
        type:"ContentService",
        function:"getExplanation"
    } 
    let val = contentObject.getExplanation(); 
    obj.explanation=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 function getHints(){
    let obj={
        type:"ContentService",
        function:"getHints"
    } 
    let val = contentObject.getHints(); 
    obj.hints=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 function getContentInfo(){
    let obj={
        type:"ContentService",
        function:"getContentInfo"
    } 
    let val = contentObject.getContentInfo(); 
    obj.contentInfo=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 function getCorrectAnswer(){
    let obj={
        type:"ContentService",
        function:"getCorrectAnswer"
    } 
    let val = contentObject.getCorrectAnswer(); 
    obj.correctAnswer=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 function getTranslatedDisplayObject(){
    let obj={
        type:"ContentService",
        function:"getTranslatedDisplayObject"
    } 
    let val = contentObject.getTranslatedDisplayObject(); 
    obj.translatedDisplayObject=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 function getTranslatedExplanation(){
    let obj={
        type:"ContentService",
        function:"getTranslatedExplanation"
    } 
    let val = contentObject.getTranslatedExplanation(); 
    obj.translatedExplanation=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 function getTranslatedHints(){
    let obj={
        type:"ContentService",
        function:"getTranslatedHints"
    } 
    let val = contentObject.getTranslatedHints(); 
    obj.translatedHints=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 function checkIndividualBlank(expectedAns, userResponse, fracboxCheck, blankNo, blankName){
    let obj={
        type:"ContentService",
        function:"getTranslatedHints"
    } 
    let val = contentObject.checkIndividualBlank(expectedAns, userResponse, fracboxCheck, blankNo, blankName); 
    obj.checkIndividualBlank=val;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
 }

 

`;
