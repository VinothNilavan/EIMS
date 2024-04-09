import {COLORS} from '@constants';

export const STYLES = ` *{
  margin:0;
}
#questionnaireContainer{
    width:100% !important;
    text-align:center;
    /*padding:5px;*/
  }

  #questionnaireContainer table {

      border-collapse: collapse;
      font-size: 16px;
      
  }
  #questionnaireContainer table tr:first-child {
      font-weight: 700;
  }
  #questionnaireContainer table td,
  #questionnaireContainer table th {
      padding: 5px;
      line-height: 18px;
      margin:10px;
  }
  #questionnaireContainer img {
      display: inline-block;
      height: auto;
      max-width: 95%;
      max-height: 100%;
      object-fit:contain;
  }
  
  #quesInteractive {
    //width: 100% !important;  
  }
  
  .img-container {
    text-align: center;
    width:"40px" ;
    height="40px";
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
  }

  #myImg {
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }

  .dropdown_button {
    position:relative;
    padding:2px 40px 2px 15px;
    border:1px solid #969696;
    font-size:16px;
    border-radius:25px;
    background: linear-gradient(to left, ${COLORS.skyBlue} 25px,  white 25px);
  }

  /* Arrows in CSS */
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

  /* The Modal (background) */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
  }

  /* Modal Content (image) */
  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  /* Caption of Modal Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation */
  .modal-content,
  #caption {
    -webkit-animation-name: zoom;
    -webkit-animation-duration: 0.6s;
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @-webkit-keyframes zoom {
    from {
      -webkit-transform: scale(0);
    }
    to {
      -webkit-transform: scale(1);
    }
  }

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  /* The Close Button */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px) {
    .modal-content {
      width: 100%;
    }
  }
  
  `;

export const qBodyImageStyle = `#questionnaireContainer img {
    display: inline-block;
    height: auto;
    max-width: 150px;
    max-height: 150px;
    object-fit:contain;
  }`;

export const qBodyFont = `#questionnaireContainer { font-size:16px;}`;
