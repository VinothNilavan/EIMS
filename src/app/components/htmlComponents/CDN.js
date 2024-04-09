
import { Config } from 'react-native-config';

let CDN_LINKS = 
`<script src="${Config.Polyfill}"></script>
<script src="${Config.Jquery}"></script>
<script src="${Config.CDN_BASE_URL}Student/assets/js/contentService.js?v=2.3.2.20"/>
<link rel="stylesheet" href="${Config.Iv_viewer_css}">
<script src="${Config.Iv_viewer_js}"></script>
`
export { CDN_LINKS };
