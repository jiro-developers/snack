'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: unset;
    box-sizing: border-box;
    font-style: normal;

    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin: 0;
    padding: 0;
  }

  :root {
    font-size: 16px;
    --scrollbar-width: 0px; // useSetupScrollbarWidth 훅을 통해 브라우저마다 다른 스크롤 크기를 잡을때 calc에 초깃값이 제대로 들어가지 않아 초기화 시켜줌 
  }

  html,
  body {
    position: relative;
    max-width: 100%;
    min-height: 100vh;
  }

  a,
  a:active,
  a:link,
  a:visited {
    text-decoration: none;
    color: unset;
    -webkit-tap-highlight-color: transparent;
  }

  button {
    cursor: pointer;
    outline: none;
    border: 0;
    background-color: unset;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  p, ul, ol, li, a, input, select, textarea {
    margin: 0;
    padding: 0;
    border: 0 none;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  sub {
    vertical-align: baseline;
  }

  a,
  img,
  button {
    user-select: none;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: transparent;
  }
`;

export default GlobalStyles;
