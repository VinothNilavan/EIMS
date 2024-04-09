import { COLORS } from '@constants';
import { Platform } from 'react-native';

const HTMLTemplateStyle = (isTable, isExplanation = false) => {
  let customBodyStyle = '';
  let customImageStyle = '';

  if (isTable) {
    customBodyStyle = `body {display: block;font-size:16px}`;
    if (isExplanation) customImageStyle = `table img {max-width: 200px;}`;
    else customImageStyle = `table img {max-width: 360px;}`;
  }
  const fontUrl = Platform.select({
    ios: "BalooThambi-Regular.ttf",
    android: "file:///android_asset/fonts/BalooThambi-Regular.ttf",
  });


  return `
  @font-face {
    font-family: 'BalooThambi-Regular';
    src:url('${fontUrl}') format('truetype');
    font-weight:normal;
  }
  * {
      margin: 0;
    }
    body {
      width: 99%;
      font-size: 16px;
      display: flex;      
      padding-left: 10px;
    }
    fieldset {
      border: none;
      padding: 5px;
    }
    img {
      display: inline-block;
      height: auto;
      max-width: 95%;
      max-height: 100%;
      object-fit: contain;
    }
    .img-container {
      text-align: center;
      width: '40px';
      height: '40px';
    }
    table {
      margin:0;
    }
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
      display : block;
      visibility:hidden;
      position:absolute;
    } 

    responsive-container {
      position: relative;
      overflow: hidden;
      padding-top: 56.25%; /* Maintain a 16:9 aspect ratio (9 / 16 * 100) */
    }
    
    /* Style the iframe to fit within the container */
    .responsive-container iframe {
      top: 0;
      left: 0;
      width: 100%; /* Fill the entire width of the container */
      height: 100%; /* Fill the entire height of the container */
      border: 0; /* Remove iframe border */
    }
    
    
    ${customBodyStyle}
    ${customImageStyle}
    
  `;
};

export default HTMLTemplateStyle;
