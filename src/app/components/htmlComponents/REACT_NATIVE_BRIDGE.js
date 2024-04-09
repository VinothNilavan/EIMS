export const REACT_NATIVE_BRIDGE = `            
   
  
    window.webViewBridge = { 
      send: function(data) { 
                
              // document.getElementById("output").innerHTML=data
        window.ReactNativeWebView.postMessage(data);
        
      }, 
    };

        window.addEventListener('message', function(e) {
      console.log("message received from react native");

      var message;
      try {
        message = JSON.parse(e.data)
      }
      catch(err) {
        console.error("failed to parse message from react-native " + err);
        return;
      }
            document.getElementById("inputbox").value=message.value
            document.getElementById("fromrn").innerHTML="Message from RN:"+message.value  

    });
      

    //init();
    // let obj={access:access};
    // window.ReactNativeWebView.postMessage(JSON.stringify(obj)); 


    function dropDownOnChangeFunction(dropDownId){
      let obj={};
      if(document.getElementById(dropDownId).value!=""){
        obj[dropDownId]=document.getElementById(dropDownId).value;
        var x = document.getElementById("mySelect").value;
        window.ReactNativeWebView.postMessage(JSON.stringify(obj)); 
      }
     
    }

    function inputChangeFunction(inputBoxId){              
      try{
        
        let obj={};  
        obj[inputBoxId]=document.getElementById(inputBoxId).value;
        window.ReactNativeWebView.postMessage(JSON.stringify(obj));                 
  
      
      }catch(err){
        alert(err)
      }
    }

    window.addEventListener("message", function(event) {
      //alert("W:"+event.data)
      console.log("Received post message From RN W:", event); 
      console.log(event.data); 
      let obj={};  
      // obj["received_from_react_w"]=event.data
      // window.ReactNativeWebView.postMessage(JSON.stringify(obj));  
  }, false);

  document.addEventListener("message", function(event) {
     // alert("D:"+event.data)
      console.log("Received post message From RN D:", event); 
      console.log(event.data);
     
      let obj={};  
      obj["received_from_react_d"]=event.data
      window.ReactNativeWebView.postMessage(JSON.stringify(obj));   
  }, false);
  
  window.addEventListener('load', function () {
    let obj = {};
    obj.type = 'loadStatus';
    obj.loaded = true;
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));
  });

  
  function ddButtonClickHandler(elmt) {
    //alert(elmt.id)
    var ddBtnObj = {};
    ddBtnObj.id = elmt.id;
    ddBtnObj.type = 'select';

    window.ReactNativeWebView.postMessage(JSON.stringify(ddBtnObj));
  }

  function ddChoiceSelectHandler(id, value) {
    // alert(value);
    document.getElementById(id).innerHTML = value + '<i class="arrow down"></i>';
  }

  function updateWebviewHeight(){
    window.ReactNativeWebView.postMessage(JSON.stringify({ width:document.body.clientWidth , height: document.body.clientHeight }));
  }

  function disableWebView() {
    document.getElementById("contentField").disabled = true;
  }

  function disableInteractiveWebView() {    
    const iframeEle = document.getElementById("quesInteractive");
    if (iframeEle) {
      //this dosen't seem to be working on android and ios. pointer-events property in 
      //react native webview seems to have issues in behaving properly.
      //instead of this we've used pointerevents on the <view /> enclosing webview in components/QnA/interactiveN/index.js
     iframeEle.classList.add("blockIframe");
    }
  }

  `;
