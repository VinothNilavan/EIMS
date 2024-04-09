import { QTypes } from "../../../helpers";
import { Platform, Dimensions } from 'react-native';
import { isTablet } from '@utils';
import { COLORS, TEXTFONTSIZE } from '@constants';

const fontSize = `${TEXTFONTSIZE.Text18}px`;
const fontUrl = Platform.select({
    ios: "BalooThambi-Regular.ttf",
    android: "file:///android_asset/fonts/BalooThambi-Regular.ttf",
});

const defaultFont = `@font-face {
    font-family: 'BalooThambi-Regular';
    src:url('${fontUrl}') format('truetype');
    font-size: ${fontSize};
}`;

export default getCommonCss = (questionTemplet = '', isMath = false, isImage = false) => {
    let cssContent = '';
    switch (`${questionTemplet}`.toLowerCase()) {
        case QTypes.MCQ:
            cssContent = `
                <style>
                  ${defaultFont}
                    * {
                        margin: 0;
                        background-color:${COLORS.white};
                    }
                    div, p {
                        font-family: 'BalooThambi-Regular';
                        font-size:${fontSize};
                    }
                    img {
                        height : auto;
                        display: inline-block;
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                        background-color:${COLORS.white};
                        overflow-clip-margin: content-box;
                        overflow: clip;
                    }
                    .mcqOptionContainer {
                        display:flex;
                        flex-direction:row;
                        width:100%;
                        align-items: center;
                        padding:10px;
                    }
                    .mcqOptionIdentifier {
                       background-color:#BEBEBE;
                       border-radius:50%;
                       padding:5px;
                       padding-bottom:10px;
                       text-align:center;
                       justify-content: center;
                       align-items: center;
                       width:25px;
                       height:20px;
                       font-weight:bold 
                    }
                    #mcqOption {
                        margin-left:5%;
                        max-width:100%;
                        min-width:80%
                    }
                    .mcqOptionContainer iframe {
                        top: 0;
                        left: 0;
                        width: 100%; /* Fill the entire width of the container */
                        height: 100%; /* Fill the entire height of the container */
                        border: 0; /* Remove iframe border */
                    }
                </style>`;
            break;
        case QTypes.MMcq:
            cssContent = ` <style>
                    ${defaultFont}
                    * {
                        margin: 0;
                        background-color:${COLORS.white};
                    }
                    .mcqOptionContainer {
                        display:flex;
                        flex-direction:row;
                        width:100%;
                        align-items: center;
                        padding:10px;
                    }
                    .mcqOptionIdentifier {
                       background-color:#BEBEBE;
                       border-radius:50%;
                       padding:5px;
                       padding-bottom:10px;
                       text-align:center;
                       justify-content: center;
                       align-items: center;
                       width:25px;
                       height:20px;
                       font-weight:bold 
                    }
                    #mcqOption {
                        margin-left:5%;
                        max-width:100%;
                        min-width:70%
                    }
                 </style>`;
            break;
        case QTypes.Dropdown:
            cssContent = `
                 <style>
                    ${defaultFont}
                    * {
                        margin: 0;
                        pointer-events: none;
                        background-color: ${COLORS.howIdidFooter};
                    }
                    .dropdown_button {
                        position:relative;
                        width:30%;
                        border:1px solid #969696;
                        font-size:16px;
                        border-radius:20px;
                        background: linear-gradient(to left, skyblue 20px,  white 20px);
                    }
                    .arrow {
                        right: 6px;
                        position: absolute;
                        top: 55%;
                        width:2%;
                        transform: translate(0,-50%);
                        height: 1px;
                        border-left: 4px solid transparent;
                        border-right: 4px solid transparent;
                        border-top: 6px solid #fff;
                        margin-left: 15px;
                    }
                    .down {
                    }
                    img{
                        height : 30%;
                        width : 30%;
                    }
                </style>`
            break;
        case QTypes.Interactive:
            cssContent = ` 
                <style>
                    ${defaultFont}
                    * {
                        margin: 0;
                        font-size: ${fontSize};
                        width:100%;
                        max-width:100%;
                        pointer-events: none;
                    }
                    img {
                        max-width:100%;
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
                        width : 100%;
                        border: 0; 
                    }
                   
                </style>`
            break;
        case QTypes.Classification:
            cssContent = `
            <style>
            .puzzle {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              gap: ${Dimensions.get('window').width / 40}px;
              text-align:center;
              margin-left:${Dimensions.get('window').width / 20}px;
              padding-bottom:${Dimensions.get('window').width / 40}px;
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
              min-width:${Dimensions.get('window').width / 3}px;
              max-width:${Dimensions.get('window').width / 2.5}px;
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
              gap: 7px;
              background-image: url(data:image/png;base64,${COLORS.boxBase64});
            //   background-color: #38A8DF;
            //   box-shadow: 8px 10px 10px rgba(0, 0, 0, 0.2);
            //   background: linear-gradient(
            //     to bottom,
            //     #b0e0e9, 
            //     #87ceeb 60%, 
            //     #38A8DF 120% 
            //  );
              background-size: 110% 100%;
              min-height: ${Dimensions.get('window').height / 3.3}px;
              margin-left: -${Dimensions.get('window').width / 25}px;;
              padding-left: 20px;
              padding-top: 20px;
            }
            .closeIcon {
              display:none;
              margin:${Dimensions.get('window').width / 50}px;px;
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
              min-width: ${Dimensions.get('window').width / 4.5}px;
              max-width: ${Dimensions.get('window').width / 5.5}px;
            }
            .hedingText {
              font-size: ${isTablet() ? 22 : 16}px;
            }
          </style>
            `;
            break;
        case QTypes.Ordering:
            cssContent = `
                <style>
                    * {
                        margin: 0;
                    }
                    ${defaultFont}
                </style>    `
            break;
        case QTypes.Matchlist:
            cssContent =
                `<style>
                ${defaultFont} 
                div, p {
                    font-family: 'BalooThambi-Regular';
                    font-size:${fontSize};
                }
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
                    padding-top: ${(isTablet() && !isImage) ? '20px' : '5px'};
                    padding-bottom: ${(isTablet() && !isImage) ? '20px' : '5px'};
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
                    padding-top: ${(isTablet() && !isImage) ? '20px' : '5px'};
                    padding-bottom: ${(isTablet() && !isImage) ? '20px' : '5px'};
                    border-style: solid;
                    border-color: #38A8DF;
                    align-self: center;
                    height:150px;
                    width:90%;
                    justify-content:center;
                }
                </style>`
            break;
        case QTypes.SortList:
            cssContent =
                `<style>
                    * {
                        margin: 0;
                    }
                    ${defaultFont}
                .img-container {
                    text-align: center;
                    width:"60px" ;
                    height="60px";
                    }
                    .play {
                    display: inline-block;
                    background: transparent;
                    box-sizing: border-box;
                    width: 40px;
                    height: 40px;
                    border-color: transparent transparent transparent #F8651F;
                    transition: 100ms all ease;
                    cursor: pointer;
                        
                    // play state
                    border-style: solid;
                    border-width: 10px 0 10px 15px; 
                    &.paused {
                        border-style: double;
                        border-width: 0px 0 0px 25px;
                } 
                &:hover {
                    border-color: transparent transparent transparent #F8651F;
                }
             </style>`;
            break;
        case QTypes.TextInteraction:
            cssContent = `
                <style>
                    * {
                        margin: 0;
                        font-size:  ${fontSize};
                        width:100%;
                        max-width:100%;
                        pointer-events: none;
                        background-color: ${COLORS.howIdidFooter};
                    }
                    ${defaultFont}
                    img {
                        max-width:100%;
                    }
                </style>`;
            break;
        default: console.log("getCommonCss  -> default ");
            break;
    }
    return cssContent;
}