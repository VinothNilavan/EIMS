import {CDN_LINKS} from './htmlComponents/CDN';
import {
  STYLES,
  qBodyImageStyle,
  qBodyFont,
} from './htmlComponents/STYLES';
import {REACT_NATIVE_BRIDGE} from './htmlComponents/REACT_NATIVE_BRIDGE';
import {
  MATHJS_CONFIG,
  HandleTheMathJax,
  HandleTheMathJaxEdicine,
} from './htmlComponents/MATHJS_CONFIG';

import {
  IFRAME_BRIDGE_INIT,
  IFRAME_BRIDGE_LISTENER,
  IFRAME_DYNAMIC_HEIGHT_SETTER,
  IFRAME_BRIDGE_LISTENER_WITH_NEW_HEIGHT,
} from './htmlComponents/IFRAME_BRIDGE';
import {CONTENT_SERVICE_BRIDGE} from './htmlComponents/CONTENT_SERVICE_BRIDGE';

export const QHtmlTemplateForIframe = (
  htmlContent,
  needRemove,
  width,
  alignContentToCenter,
  store,
  qStatement,
  qBody,
) => {

  let content = HandleTheMathJaxEdicine(htmlContent);
  content = HandleTheMathJax(content);
  const checkEnableForNewHeight = ["TMP_dragAndDrop","Enrichment_Modules"];
  let isNewHeightEnabled=false;
  for(let i of checkEnableForNewHeight){
    isNewHeightEnabled=`${htmlContent}`.includes(i);
    if(isNewHeightEnabled) break;
  }

  const iFrameBridge = isNewHeightEnabled ? IFRAME_BRIDGE_LISTENER_WITH_NEW_HEIGHT : IFRAME_BRIDGE_LISTENER;

  let style = alignContentToCenter
    ? 'display: flex; justify-content: center; align-items: center;'
    : 'text-align: left;padding-right:5px';
  const direction =
    store &&
    store?.appStore &&
    store?.appStore?.userLanguage &&
    store?.appStore?.userLanguage === 'ur'
      ? 'rtl'
      : 'ltr';

  return `
  <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        ${CDN_LINKS}
        ${MATHJS_CONFIG}
        <script>
          ${REACT_NATIVE_BRIDGE}
          ${CONTENT_SERVICE_BRIDGE}
        </script>
        <style>
           ${STYLES}
           ${qStatement ? qBodyImageStyle : ''}
           ${qBody ? qBodyFont : ''}
        </style>
    </head>
    <body style="width:99%">
        <div dir="${direction}" id="questionnaireContainer" class="${
    qStatement ? 'questionnaireContainer' : ''
  }" style="${style}" >
          <fieldset id="contentField" style="border:none;padding:5px;">
          ${content}
         </fieldset>
        </div>
        <script type="text/javascript">
          ${needRemove && isNewHeightEnabled ? null : IFRAME_BRIDGE_INIT}
          ${needRemove ? null : iFrameBridge}
          ${needRemove && isNewHeightEnabled ? null : IFRAME_DYNAMIC_HEIGHT_SETTER(width)}
        </script>
    </body>
    </html>
      `;
};