
import { QTypes } from "../../../helpers";
export default getCommonJs = (questionTemplet = '') => {
    let js_content = '';
    switch (`${questionTemplet}`.toLowerCase()) {
        case QTypes.MMcq:
            js_content = `
                    <script type="text/javascript">
                        function click_handler(id) {
                            document.getElementById('checkbox'+id).checked=!document.getElementById('checkbox'+id).checked;
                            let obj={id:""+id}
                            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
                        } 
                        function checkbox_handler(id) {
                            document.getElementById(id).checked=!document.getElementById(id).checked;
                        }    
                    </script>`;
            break;
        case QTypes.Dropdown:
            js_content = `<script type="text/javascript">
                    function click_handler(id) {
                        document.getElementById('00'+id).style.backgroundColor='lightgreen';
                        window.ReactNativeWebView.postMessage(JSON.stringify({id:id}));
                    }  ClickHandler(elmt) {
                        var ddBtnObj = {};
                        ddBtnObj.id = elmt.id;
                        ddBtnObj.type = 'select';
                        window.ReactNativeWebView.postMessage(JSON.stringify(ddBtnObj));
                    } 
                    function ddChoiceSelectHandler(id, value) {
                        document.getElementById(id).innerHTML = value + '<i class="arrow down"></i>';
                    } 
                    function ddButton
                    function updateWebviewHeight(){
                        window.ReactNativeWebView.postMessage(JSON.stringify({ width:document.body.clientWidth , height: document.body.clientHeight }));
                    }  
                </script>`
            break;
        case QTypes.Interactive:
            js_content = `<script type="text/javascript">
                            function click_handler(id) {
                                document.getElementById('00'+id).style.backgroundColor='lightgreen';
                                window.ReactNativeWebView.postMessage(JSON.stringify({id:id}));
                            }     
                        </script>`;
            break;
        case QTypes.Classification:
            js_content = `
                    <script type="text/javascript">
                        function click_handler(id) {
                            document.getElementById('00'+id).style.backgroundColor='lightgreen';
                            window.ReactNativeWebView.postMessage(JSON.stringify({id:id}));
                        }  
                    </script>`
            break;
        case QTypes.Ordering:
            js_content = `<script type="text/javascript"> 
                    function click_handler(id,url) {
                        let obj={id:id,sound:url};
                        window.ReactNativeWebView.postMessage(JSON.stringify(obj));
                    } 
                </script>`
            break;
        case QTypes.TextInteraction:
            js_content = `
                    <script type="text/javascript">
                        function click_handler(id) {
                            document.getElementById('00'+id).style.backgroundColor='lightgreen';
                            window.ReactNativeWebView.postMessage(JSON.stringify({id:id}));
                        }     
                    </script>`
            break;
        default:
            console.log("getCommonJS  -> default ");
            break;
    }
    return js_content;
}   
