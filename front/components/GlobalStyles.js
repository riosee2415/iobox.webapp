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
`;

const GlobalStyles = createGlobalStyle`

  ${fontStyle}


  body {
    font-family: "NanumBarunGothic", sans-serif;
    color: ${(props) => props.theme.black_C};
  }

  .ant-modal-content{
    border:5px solid ${(props) => props.theme.basicTheme_C};
  }

  .ant-modal-body{
    padding:0;
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
  .ant-radio-inner {
    width: 30px;
    height: 30px;
  }

  .ant-radio-inner::after {
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${Theme.subTheme4_C};
    border-color: ${Theme.grey_C};
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: ${Theme.grey_C};
  }

  .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus,
  .ant-radio-inner {
    border-color: ${Theme.grey_C};
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
  
  @media (max-width : 576px) {
    html { 
      font-size : 14px;
    }
  }
`;

export default GlobalStyles;
