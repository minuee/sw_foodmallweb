import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  ::-webkit-scrollbar {
    // display: none;
    width: 1px;
  }

  @font-face {
    font-family: "GlobalSourceHanSans";
    font-weight: normal;
    src: url("../public/fonts/SourceHanSansK-VF.ttf") format("truetype");
  }
  @font-face {
    font-family: "GlobalManrope";
    font-weight: normal;
    src: url("../public/fonts/Manrope-Regular.ttf") format("truetype");
  }
  html {
    font-size: 11px;
    -webkit-text-size-adjust: none;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif, "SourceHanSans","Manrope;
    font-display: fallback;
    -ms-overflow-style: none;
    scrollbar-width: none;
    background-color: #f5f7fb;
    color: #222;
    height: 100%;
    
  }
  body {
    height:100%;
    font-family: var(--custom-font);
    font-weight: 400;
    &.overflow {
      overflow: hidden;
    }
  }
  #__next {
    height:100%;
  }
  button {
    padding: 0;
    border: none;
    cursor: pointer;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    &:disabled {
      cursor: default;
      fill: #f2f3f4;
    }
  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    
  }
  input,
  textarea {
    -webkit-border-radius: 0;
    -webkit-appearance: none;
    border-width: 0;
    max-height : 400px;
  }
  a {
    text-decoration: none;
    color: inherit;
    &:visited {
      color: inherit;
      text-decoration: none;
    }
    &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
    }
  }
  @page { size: landscape; }


  @media print {
    .print-btn {
      display : none;
    }
  }

  .ql-editor{
    min-height: 300px !important;
    max-height: 500px;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
  }
  .ql-editor strong{
    font-weight:bold;
  }
  .ql-editor em{
    font-style: italic;
  }

  .raw-editor {
    max-height : 500px;
  }
`;
