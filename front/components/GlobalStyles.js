import { createGlobalStyle, css } from "styled-components";
import Theme from "../components/Theme";

const fontStyle = css`
  @font-face {
    font-family: "paybooc-Bold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Bold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "InkLipquid";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/InkLipquid.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "NanumBarunGothic";
    font-style: normal;
    font-weight: 400;
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot");
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix")
        format("embedded-opentype"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff")
        format("woff"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf")
        format("truetype");
  }

  @font-face {
    font-family: "NanumBarunGothic";
    font-style: normal;
    font-weight: 700;
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot");
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot?#iefix")
        format("embedded-opentype"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff")
        format("woff"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.ttf")
        format("truetype");
  }

  .nanumbarungothic * {
    font-family: "NanumBarunGothic", sans-serif;
  }

  @font-face {
    font-family: "SBAggroB";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "SBAggroM";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroM.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "GmarketSansBold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;

const GlobalStyles = createGlobalStyle`

  ${fontStyle}


  body {
    font-family: "NanumBarunGothic", sans-serif;
    color: ${(props) => props.theme.black_C};
  }

  .ant-modal-body{
    padding:0;
  }

  .slick-list{
    padding : 0;
  }


  .center .slick-active  {
    font-size : 20px !important;
    border-bottom : 1px solid ${(props) => props.theme.basicTheme_C} !important;
  }

  .ant-drawer-content-wrapper{
    width : 400px !important;

    @media (max-width : 700px) {
      width : 80vw !important;
    }
    
  }
  .ant-switch-checked{
    background-color : ${(props) => props.theme.basicTheme_C};
  }

  .ant-drawer-body{
    padding:0;
  }

  .ant-radio-input:focus {
    box-shadow : 0px 0px 10px ${(props) => props.theme.grey_C} !important;
  }

  .ant-checkbox-checked .ant-checkbox-inner{
    background : ${(props) => props.theme.basicTheme_C};
    border-color : ${(props) => props.theme.basicTheme_C};
  }
  

  .ant-radio-inner {
    width: 30px;
    height: 30px;
    border-color: ${(props) => props.theme.grey_C} !important;
  }

  .ant-radio-inner::after {
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.subTheme4_C};
    border-color: ${(props) => props.theme.grey_C} !important;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: ${Theme.grey_C};
  }

  .ant-checkbox-checked::after{
    border : 1px solid ${(props) => props.theme.basicTheme_C} !important;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner{
    border-color :${(props) => props.theme.basicTheme_C};
  }

  .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus,
  .ant-radio-inner {
    border-color: ${(props) => {
      props.theme.grey_C;
    }};
  }





  .ant-drawer-left{
    left : 50% !important;
    margin : 0 0 0 -250px;

    @media (max-width : 700px) {
      left : 0 !important;
      margin : 0;
    }
  }

  .ant-picker-suffix{
    display:none;
  }

  .ant-picker, .ant-picker:hover, .ant-picker-focused{
    border:none;
    box-shadow:none;
  }

  .ant-picker-dropdown-range {
    padding: 0 !important;
  }

  .ant-picker-panel-container .ant-picker-panels{
    display: flex !important;
    @media(max-width: 700px){
      flex-direction:column !important;
    }

  }
  .anticon.ant-input-clear-icon > svg{
    font-size:1.25rem;
  }

.makeStyles-root-5{
  width : auto !important;
}

.ant-pagination-item-active a{
  color : ${(props) => props.theme.white_C};
}
.ant-pagination-item-active a:hover , .ant-pagination-item a:hover{
  color : ${(props) => props.theme.subTheme_C} !important;
}


.ant-pagination-item-active:focus-visible, .ant-pagination-item-active:hover{
  border-color : ${(props) => props.theme.basicTheme_C};
}

.ant-pagination-item-active{
  border-color : ${(props) => props.theme.basicTheme_C};
  background : ${(props) => props.theme.basicTheme_C};
}
.ant-pagination-item:hover{
  border-color : ${(props) => props.theme.basicTheme_C};
  color : ${(props) => props.theme.subTheme_C} !important;
}
.ant-pagination-prev .ant-pagination-item-link:hover, .ant-pagination-next .ant-pagination-item-link:hover{
  border-color : ${(props) => props.theme.basicTheme_C};
  color : ${(props) => props.theme.subTheme_C} !important;
}



  a {
        color : inherit;
        text-decoration : none;
        display:flex;
        flex-direction:row;
        align-items:center;     
    }
  
  a:hover {
  color : inherit;
  }

  html{
    --antd-wave-shadow-color: none;
  }

  
  
  @media (max-width : 576px) {
    html { 
      font-size : 14px;
    }
  }
`;

export default GlobalStyles;
