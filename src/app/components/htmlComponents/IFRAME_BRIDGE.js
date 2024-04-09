export function IFRAME_DYNAMIC_HEIGHT_SETTER(width, isExplanation, isEnableNewHeightForIFrame) {

    return `
            $(document).ready(function () {
                var images = $("img");
                console.log("images",images);
                const iframes=document.getElementsByTagName("iframe");
                console.log("Iframe List",iframes);    
                for(var i = 0; i < iframes.length; i++) { 
                    var oldH = iframes[i].getAttribute('height').replace("px","");
                    var oldW = iframes[i].getAttribute('width').replace("px","");
                    console.log("Old Height:",oldH)
                    console.log("Screen Width:",${width});
                  var iframeWidthDiv = ${width}
                    console.log("Old width:",iframes[i].getAttribute('width'));
                    let width=${width}
                    var iframeWidth=iframeWidthDiv;
                    var newH=oldH * (iframeWidth / oldW);
                    
                    console.log("New Height:",newH);
                      if(${isExplanation}) {
                          if(oldH < 250) { // this condition is req as oldH/2 and oldW/2 not working properly for small iframes
                              iframes[i].setAttribute("height", oldH); 
                              iframes[i].setAttribute("width", oldW);
                          } else {
                              iframes[i].setAttribute("height", oldH/2); 
                              iframes[i].setAttribute("width", oldW/2);
                          } 
                      } else {
                         if(${isEnableNewHeightForIFrame}) {
                            if(oldH <= 250) {
                                iframes[i].setAttribute("height", newH); 
                            } else {
                                iframes[i].setAttribute("height", oldH); 
                            }
                         } else {
                            iframes[i].setAttribute("height", newH); 
                         }
                         iframes[i].setAttribute("width", iframeWidth); 
                      }
                    
                    let obj={};   
                    obj.iframe={
                        NewHeight:newH+"",
                        NewWidth:iframeWidth,
                        oldHVal : oldH,
                         oldWVal : oldW,
                         totalWidth: ${width}
                    } 
                  //   alert(JSON.stringify(obj.iframe))
                    //window.ReactNativeWebView.postMessage(JSON.stringify(obj)); 
                    //TODO:ADD THIS if needed for checking height and width
                  //   alert(JSON.stringify(obj));
                } 
            });
    `;
}

export const IFRAME_BRIDGE_INIT = `
    $(document).ready(function () {
        console.log("Ready::::");
    
            var frame = document.getElementById("quesInteractive");
            if (frame) {
              frame.onload = function(){
      
                  setTimeout(function(){ 
      
                  var win = frame.contentWindow;
                  try{
                      win.postMessage("checkGameComplete",'*');
                  }catch(ex){
                      alert('error');
                  }
      
                  }, 1000); 
                  
              }   
            } 
        });
    `;

export const IFRAME_BRIDGE_LISTENER = `
    try {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        var frame = document.getElementById("quesInteractive");
        // Listen to message from child window
        console.log("Frame:",frame);
        eventer(messageEvent, function (e) {
            if(event.data.height) {
                const iframes=document.getElementsByTagName("iframe");
                for(var i = 0; i < iframes.length; i++) { 
                    iframes[i].setAttribute("height",event.data.height); 
                }
            }
            
            console.log("MSG From Iframe Origin.............",e);
            console.log("MSG:::",e.data);
            // alert("MSG:::"+e);
            let obj={};
            obj.type="IframeResponse"
            obj.response=e.data;
            //obj["iframeHeight"]=e.data.split("||||||")[1];
            //obj["iFrameAnswer"]=e.data.split("||||||")[0]; 
            if(!isNaN(e.data.split("||||||||")[1])){
                let newHeight=e.data.split("||||||||")[1];
    
                if(newHeight > 0)
                {
                    newHeight=newHeight+"px"
                    //$("#quesInteractive").attr('height',newHeight);  
                }
                else if(newHeight == 0 && isNaN(newHeight))
                {
                    alert(newHeight);
                    setTimeout(function(){ 
                        var win = frame.contentWindow;
                        try{
                            win.postMessage("checkGameComplete",'*');
                        }catch(ex)
                        {
                            alert('error');
                        }
                    }, 1000); 
                }
            }
            window.webViewBridge.send(JSON.stringify(obj)); 
            if (e.origin == "http://mindspark-ei.s3.amazonaws.com" || e.origin == "http://d2tl1spkm4qpax.cloudfront.net" || e.origin == "mindspark-ei.s3.amazonaws.com" || e.origin == "d2tl1spkm4qpax.cloudfront.net" || $("#offlineStatus").val()=="3" || $("#offlineStatus").val()=="4" || $("#offlineStatus").val()=="7" || e.origin == "https://mindspark-ei.s3.amazonaws.com" || e.origin == "https://d2tl1spkm4qpax.cloudfront.net") {
                var response1 = "";
                response1 = e.data;
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
                    if (result > 2) {
                        $.post("errorLog.php", "params=" + $("#quesform").find("input").serialize() + "&type=3", function (data) {
    
                        });
                    }
                    console.log("Result:",result);
                    console.log("QTYPE:",newQues.quesType);
                  // calcAns(result, newQues.quesType);
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
    catch (ex) {
        alert('error in getting the response from interactive');
    } 
    `;

export const IFRAME_BRIDGE_LISTENER_WITH_NEW_HEIGHT = `
    try {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        var frame = document.getElementById("quesInteractive");
        // Listen to message from child window
        console.log("Frame:",frame);
        eventer(messageEvent, function (e) {
            console.log("MSG From Iframe Origin.............",e);
            console.log("MSG:::",e.data);
            let obj={};
            obj.type="IframeResponse"
            obj.response=e.data;
            if(!isNaN(e.data.split("||||||||")[1])){
                let newHeight=e.data.split("||||||||")[1];
    
                if(newHeight > 0)
                {
                    newHeight=newHeight+"px"
                    $("#quesInteractive").attr('height',newHeight);  
                }
                else if(newHeight == 0 && isNaN(newHeight))
                {
                    alert(newHeight);
                    setTimeout(function(){ 
                        var win = frame.contentWindow;
                        try{
                            win.postMessage("checkGameComplete",'*');
                        }catch(ex)
                        {
                            alert('error');
                        }
                    }, 1000); 
                }
            }
            window.webViewBridge.send(JSON.stringify(obj)); 
            if (e.origin == "http://mindspark-ei.s3.amazonaws.com" || e.origin == "http://d2tl1spkm4qpax.cloudfront.net" || e.origin == "mindspark-ei.s3.amazonaws.com" || e.origin == "d2tl1spkm4qpax.cloudfront.net" || $("#offlineStatus").val()=="3" || $("#offlineStatus").val()=="4" || $("#offlineStatus").val()=="7" || e.origin == "https://mindspark-ei.s3.amazonaws.com" || e.origin == "https://d2tl1spkm4qpax.cloudfront.net") {
                var response1 = "";
                response1 = e.data;
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
                    if (result > 2) {
                        $.post("errorLog.php", "params=" + $("#quesform").find("input").serialize() + "&type=3", function (data) {
    
                        });
                    }
                    console.log("Result:",result);
                    console.log("QTYPE:",newQues.quesType);
                  // calcAns(result, newQues.quesType);
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
    catch (ex) {
        alert('error in getting the response from interactive');
    } 
    `;
