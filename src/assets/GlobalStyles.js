import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
const mainColor = '#f55a5a'
const GlobalStyles = createGlobalStyle` 
  ${reset}    
    a{
      text-decoration: none;
      color: inherit;
    }
    *{
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      padding: 0;
      margin: 0;
      border: 0;
      outline: 0;
      font-family: 'notokr', sans-serif !important;
    }
    html {
      font-size: 10px;
      scroll-behavior: smooth;
      word-break: break-all;
    }
    body {
      font-size: 1.5rem;
      line-height: normal;
      color: #222;
      font-weight: 400;
      scroll-behavior: smooth;
    }
    
    //scrollbar 스타일 추가
    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
      background-color: #f5f5f5;
      &-track {
        box-shadow: inset 0 0 6px rgba(95, 78, 78, 0.1);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        background-color: #f5f5f5;
      }
    }
    
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(85, 85, 85, 0.15);
    }
    // focus 테두리 리셋
    :focus-visible {
      outline: 0;
    }
    
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input {
      border: none;
    }
    input:disabled {
      background-color: #ddd;
    }
    input:placeholder, textarea:placeholder {
      color: #ddd;
    }
    
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    h1, h2, h3, h4, h5, h6, strong {
      font-weight: 600
    }
    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
    div > header {
      display: flex;
      justify-content: center;
      padding: 20px;
      font-size: 18px;
    }
    section {
      position: relative;
      padding: 25px 0;
    }
    option:disabled {
      color: #bbb;
    }
    article {
      display:flex;
      margin: 0 auto;
      width: 1100px;
      & h1 {
        font-size: 18px;
      }
    }
    table {
      word-break: break-all;
    }
    pre {white-space: pre-wrap;}
    
    article.resume-article {
      padding: 0;
      flex-direction: column;
      margin-bottom: 30px;
      padding: 30px;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 1px 20px 0 rgb(238, 238, 238)
    }
    article > div.activate {
      height: 100%;
      transform: scaleY(1);
      transform-origin: top;
      overflow:hidden;
      border-top: 1px solid #ddd;
      transition: transform 0.26s ease;
    }
    article > div.deactivate {
      height: 0;
      transform-origin: top;
      transform: scaleY(0);
      border: none;
      overflow:hidden;
      transition: transform 0.26s ease;
    }
    #container {
      padding-top: 25px;
    }
    #container > article h1.header-font {
      font-size: 3rem;
    }
    .mainColor-txt{
      color: ${mainColor};
    }
    .mainColor-bg{
      background-color: ${mainColor} !important;
    }
    .mainColor-border{
      border-color: ${mainColor} !important;
    }
    .ellipsis {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .line-clamp_2 {
      overflow: hidden;
      display: -webkit-box !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical
    }
    .location {
      display: flex;
      align-items: center;
      &:before {
        content: '';
        width: 14px;
        aspect-ratio: 1;
        background-image: url('https://static.trycatch.co.kr/assets/img/icon/icon_position.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
    }
    .react-switch-checkbox {
      height: 0;
      width: 0;
      visibility: hidden;
    }
    
    .react-switch-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      width: 68px;
      height: 30px;
      background: #ddd;
      border-radius: 68px;
      position: relative;
      transition: background-color .2s;
    }
    
    .react-switch-label .react-switch-button {
      content: '';
      position: absolute;
      top: 4px;
      left: 4px;
      width: 22px;
      height: 22px;
      border-radius: 22px;
      transition: 0.2s;
      background: #fff;
      box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.4);
    }
    
    .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
      left: calc(100% - 4px);
      transform: translateX(-100%);
    }
    
    .react-switch-checkbox:checked + .react-switch-label {
      background: ${mainColor};
    }
    
    .react-switch-label:active .react-switch-button {
      width: 22px;
    }
    
    .login-container {
      background-color: #fafbfc;
      height: calc(100vh - 81px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .login-content {
      width: 400px;
    }
    .login-body {
      padding: 30px;
      background-color: #fff;
      border: 1px solid #eeeeee;
      border-radius: 30px;
      h1 {font-weight: 400}
    }
    .login-link-content {
      text-align: center;
      & a {
        margin: 0 15px;
        color: #376ef1;
        text-decoration: underline;
      }
    }
    .pw-visibility {
      position: absolute;
      right: 7px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .modal {
      display: none;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .modal button {
      outline: none;
      cursor: pointer;
      border: 0;
    }
    .modal > .section {
      width: 90%;
      max-width: 450px;
      margin: 0 auto;
      padding: 35px;
      border-radius: 20px;
      background-color: #fff;
      /* 팝업이 열릴때 스르륵 열리는 효과 */
      animation: modal-show 0.3s;
      overflow: hidden;
    }
    .modal > .section > header {
      position: relative;
      font-weight: 600;
      justify-content: flex-start;
      align-items: center;
      font-size: 2rem;
      border-bottom: 1px solid #dee2e6;
      height:4.8rem;
      margin-bottom: 2.5rem;
      padding: 0;
      &.border-0 {
        border:0;
        height:2.5rem;
        margin-bottom: 0;
      }
    }
    .modal > .section > header button {
      position: absolute;
      top: -35px;
      right: -15px;
      width: 30px;
      font-size: 50px;
      font-weight: 300;
      text-align: center;
      color: #222;
      background-color: transparent;
    }
    .modal > .section > main .border-bottom {
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 2.5rem;
    }
    .modal > .section > main textarea {
        margin-top: 1rem;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 1rem;
        padding: 1rem 1.5rem;
    }
    .modal > .section > main .resume-con {
      padding: 2rem;
      background-color: #f8f8f8;
      border-radius: 1rem;
      .label {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        display: block;
        &.redBadge:before {
          content: '*';
          color: ${mainColor};
          font-size: 1.8rem;
        }
      }
    }
    .modal > .section > main .gray-box {
      width: 100%;
      border-radius: 1rem;
      background-color: #f8f8f8;
      padding: 2rem;
      font-weight: 600;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      > a {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 6.6rem;
          aspect-ratio: 1;
          object-fit: contain;
          background-color: #fff;
          border: solid 1px #eee;
        }
        span {
          width: 100%;
          font-size: 1.2rem;
          margin: .5rem 0;
        }
      }
      .icon {
        width: 6rem;
        aspect-ratio: 1;
        object-fit: cover;
        margin: 1rem 0 0;
        background-position: center center;
        background-repeat: no-repeat;
        &.sadness-icon {
          background-image: url('https://static.trycatch.co.kr/assets/img/icon/img_sadness.svg');
          margin: 0 0 1rem;
        }
        &.happiness-icon {
          background-image: url('https://static.trycatch.co.kr/assets/img/icon/img_Happiness.svg');
          margin: 0 0 1rem;
        }
        &.apple-icon {
          background-image: url('https://static.trycatch.co.kr/assets/img/icon/icon_Apple.svg');
        }
        &.google-icon {
          background-image: url('https://static.trycatch.co.kr/assets/img/icon/icon_google.svg');
        }
        &.kakao-icon {
          background-image: url('https://static.trycatch.co.kr/assets/img/icon/icon_kakao.svg');
        }
        &.naver-icon {
          background-image: url('https://static.trycatch.co.kr/assets/img/icon/icon_naver.svg');
        }
        &.check-icon {
          width: 6.6rem;
          margin: 0 0 1rem;
          background-image: url('https://static.trycatch.co.kr/assets/img/icon/img_check.svg');
        }
      }
      
      p {
        width: 100%;
      }
      select {
        margin-top: 1.4rem;
        width: 100%;
        height: 3rem;
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 0 1.5rem;
        border-radius: 1rem;
        font-size: 1.2rem;
        -webkit-appearance:none; /* for chrome */
        -moz-appearance:none; /*for firefox*/
        appearance:none;
        background-image: url('https://static.trycatch.co.kr/assets/img/icon/btn_drop_down.svg');
        background-position: 95% center;
        background-size: auto;
        background-repeat: no-repeat;
        & ::-ms-expand{
          display:none;/*for IE10,11*/
        }
      }
    }
    .react-confirm-alert-overlay {
      z-index: 1000;
      background: rgba(0,0,0,0.6);
      .react-confirm-alert-body {
        color: #222;
        h1 {margin-bottom: .5rem}
        .react-confirm-alert-button-group {
          justify-content : flex-end;
          button {
            &:last-child {
              margin-right:0;
              background: none;
              color: ${mainColor};
              border: solid 1px ${mainColor}; 
            }
            &:first-child {
              background: ${mainColor};
              color: #fff;
            }
          }
        }
      }
    }
    .modal > .section > main .modal-scroll {
      border-radius: 10px;
      max-height: 340px;
      background: #f8f8f8;
      overflow: auto
    }
    .modal > .section > main .modal-scroll ul li {
      position: relative;
      margin: 1px;
      padding: 14px;
      font-size: 14px;
      cursor: pointer
    }
    .modal > .section > main .modal-scroll ul li.active {
      font-weight: bold;
      background-color: #ffe1e1;
      color: ${mainColor}
    }
    .modal > .section > main .modal-scroll ul li.active::before {
      content:"";
      position: absolute;
      top: 0;
      right: 20px;
      width: 42px;
      height: 42px;
    }
    .modal > .section > main .modal-scroll ul li:hover {
      color: ${mainColor}
    }
    .modal > .section > footer {
      padding-top: 3rem;
      text-align: center;
    }
    .modal > .section > footer button {
      padding: 10px 25px;
      min-width: 120px;
      color: #fff;
      background-color: ${mainColor};
      border-radius: 10px;
      font-size: 16px;
    }
    .modal > .section > footer button.border {
      background-color: #fff;
      border: 1px solid ${mainColor};
      color: ${mainColor};
      margin-right: 1.5rem;
    }
    .modal.openModal {
      display: flex;
      align-items: center;
      /* 팝업이 열릴때 스르륵 열리는 효과 */
      animation: modal-bg-show 0.3s;
    }
    .Toastify__toast { 
      border-radius: 10px!important
    }
    .radio-component {
      padding: 10px 0;
    }
    .radio-component input[type=radio] {
      margin-right: 5px;
      accent-color:${mainColor};
    }
    .radio-component label {
      margin-right: 15px;
    }
    .btn_profile_image {
      position: absolute;
      right: 0;
      width: 2.5rem;
      height: 2.5rem;
      color: #fff;
      background-color:${mainColor};
      background-image: url('https://static.trycatch.co.kr/assets/img/icon/btn_profile_image.svg');
      background-size: cover;
      background-repeat: no-repeat;
      cursor: pointer;
      border-radius: 50%;
      &.del {
        z-index: 2;
        background-image: none;
        display: flex;
        justify-content: center;
        align-items: center;
        &:before {
          content: '\u2716'
        }
      }
    }
    .fileUploader {
      height: 100%;
      .fileContainer {
        background: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
        height: 100%;
        p {display: none;}
        button {
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background: none;
          border-radius: 0;
          &:hover {
            background: none
          }
        }
      }
    }
    .custom-check-box ~ span{
      font-size: 12px;
    }
    .custom-check-box:checked ~ svg {
      color: ${mainColor} !important;
    }
    .custom-check-box:focus ~ svg rect {
      stroke: #ddd !important;
    }
    .custom-check-box:checked ~ svg rect {
      stroke: ${mainColor} !important;
    }
    .map-custom-overlay {
      background-color: #fff;
      position:relative;
      text-align:center;
      padding:10px 24px;
      border-radius:5px;
      box-shadow:0px 1px 2px #888;
      cursor: pointer; 
      font-size: 12px;
      font-weight: bold;
      transform: translate(0%, -200%)
    }
    @keyframes modal-show {
      from {
        opacity: 0;
        margin-top: -50px;
      }
      to {
        opacity: 1;
        margin-top: 0;
      }
    }
    @keyframes modal-bg-show {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  /*# sourceMappingURL=ReactToastify.css.map */
  :root {
    --toastify-color-light: #fff;
    --toastify-color-dark: #121212;
    --toastify-color-info: #3498db;
    --toastify-color-success: #07bc0c;
    --toastify-color-warning: #f1c40f;
    --toastify-color-error: #e74c3c;
    --toastify-color-transparent: rgba(255, 255, 255, 0.7);
    --toastify-icon-color-info: var(--toastify-color-info);
    --toastify-icon-color-success: var(--toastify-color-success);
    --toastify-icon-color-warning: var(--toastify-color-warning);
    --toastify-icon-color-error: var(--toastify-color-error);
    --toastify-toast-width: 320px;
    --toastify-toast-background: #fff;
    --toastify-toast-min-height: 64px;
    --toastify-toast-max-height: 800px;
    --toastify-font-family: sans-serif;
    --toastify-z-index: 9999;
    --toastify-text-color-light: #757575;
    --toastify-text-color-dark: #fff;
    --toastify-text-color-info: #fff;
    --toastify-text-color-success: #fff;
    --toastify-text-color-warning: #fff;
    --toastify-text-color-error: #fff;
    --toastify-spinner-color: #616161;
    --toastify-spinner-color-empty-area: #e0e0e0;
    --toastify-color-progress-light: linear-gradient(
            to right,
            #4cd964,
            #5ac8fa,
            #007aff,
            #34aadc,
            #5856d6,
            #ff2d55
    );
    --toastify-color-progress-dark: #bb86fc;
    --toastify-color-progress-info: var(--toastify-color-info);
    --toastify-color-progress-success: var(--toastify-color-success);
    --toastify-color-progress-warning: var(--toastify-color-warning);
    --toastify-color-progress-error: var(--toastify-color-error);
  }

  .Toastify__toast-container {
    z-index: var(--toastify-z-index);
    -webkit-transform: translate3d(0, 0, var(--toastify-z-index) px);
    position: fixed;
    padding: 4px;
    width: var(--toastify-toast-width);
    box-sizing: border-box;
    color: #fff;
  }
  .Toastify__toast-container--top-left {
    top: 1em;
    left: 1em;
  }
  .Toastify__toast-container--top-center {
    top: 1em;
    left: 50%;
    transform: translateX(-50%);
  }
  .Toastify__toast-container--top-right {
    top: 1em;
    right: 1em;
  }
  .Toastify__toast-container--bottom-left {
    bottom: 1em;
    left: 1em;
  }
  .Toastify__toast-container--bottom-center {
    bottom: 1em;
    left: 50%;
    transform: translateX(-50%);
  }
  .Toastify__toast-container--bottom-right {
    bottom: 1em;
    right: 1em;
  }

  @media only screen and (max-width : 480px) {
    .Toastify__toast-container {
      width: 100vw;
      padding: 0;
      left: 0;
      margin: 0;
    }
    .Toastify__toast-container--top-left, .Toastify__toast-container--top-center, .Toastify__toast-container--top-right {
      top: 0;
      transform: translateX(0);
    }
    .Toastify__toast-container--bottom-left, .Toastify__toast-container--bottom-center, .Toastify__toast-container--bottom-right {
      bottom: 0;
      transform: translateX(0);
    }
    .Toastify__toast-container--rtl {
      right: 0;
      left: initial;
    }
  }
  .Toastify__toast {
    position: relative;
    min-height: var(--toastify-toast-min-height);
    box-sizing: border-box;
    margin-bottom: 1rem;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    max-height: var(--toastify-toast-max-height);
    overflow: hidden;
    font-family: var(--toastify-font-family);
    cursor: default;
    direction: ltr;
    /* webkit only issue #791 */
    z-index: 0;
  }
  .Toastify__toast--rtl {
    direction: rtl;
  }
  .Toastify__toast--close-on-click {
    cursor: pointer;
  }
  .Toastify__toast-body {
    margin: auto 0;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 6px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
  .Toastify__toast-body > div:last-child {
    word-break: break-word;
    -ms-flex: 1;
    flex: 1;
  }
  .Toastify__toast-icon {
    -webkit-margin-end: 10px;
    margin-inline-end: 10px;
    width: 20px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    display: -ms-flexbox;
    display: flex;
  }

  .Toastify--animate {
    animation-fill-mode: both;
    animation-duration: 0.7s;
  }

  .Toastify--animate-icon {
    animation-fill-mode: both;
    animation-duration: 0.3s;
  }

  @media only screen and (max-width : 480px) {
    .Toastify__toast {
      margin-bottom: 0;
      border-radius: 0;
    }
  }
  .Toastify__toast-theme--dark {
    background: var(--toastify-color-dark);
    color: var(--toastify-text-color-dark);
  }
  .Toastify__toast-theme--light {
    background: var(--toastify-color-light);
    color: var(--toastify-text-color-light);
  }
  .Toastify__toast-theme--colored.Toastify__toast--default {
    background: var(--toastify-color-light);
    color: var(--toastify-text-color-light);
  }
  .Toastify__toast-theme--colored.Toastify__toast--info {
    color: var(--toastify-text-color-info);
    background: var(--toastify-color-info);
  }
  .Toastify__toast-theme--colored.Toastify__toast--success {
    color: var(--toastify-text-color-success);
    background: var(--toastify-color-success);
  }
  .Toastify__toast-theme--colored.Toastify__toast--warning {
    color: var(--toastify-text-color-warning);
    background: var(--toastify-color-warning);
  }
  .Toastify__toast-theme--colored.Toastify__toast--error {
    color: var(--toastify-text-color-error);
    background: var(--toastify-color-error);
  }

  .Toastify__progress-bar-theme--light {
    background: var(--toastify-color-progress-light);
  }
  .Toastify__progress-bar-theme--dark {
    background: var(--toastify-color-progress-dark);
  }
  .Toastify__progress-bar--info {
    background: var(--toastify-color-progress-info);
  }
  .Toastify__progress-bar--success {
    background: var(--toastify-color-progress-success);
  }
  .Toastify__progress-bar--warning {
    background: var(--toastify-color-progress-warning);
  }
  .Toastify__progress-bar--error {
    background: var(--toastify-color-progress-error);
  }
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--info, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--success, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
    background: var(--toastify-color-transparent);
  }

  .Toastify__close-button {
    color: #fff;
    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.3s ease;
    -ms-flex-item-align: start;
    align-self: flex-start;
  }
  .Toastify__close-button--light {
    color: #000;
    opacity: 0.3;
  }
  .Toastify__close-button > svg {
    fill: currentColor;
    height: 16px;
    width: 14px;
  }
  .Toastify__close-button:hover, .Toastify__close-button:focus {
    opacity: 1;
  }

  @keyframes Toastify__trackProgress {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
  .Toastify__progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    z-index: var(--toastify-z-index);
    opacity: 0.7;
    transform-origin: left;
  }
  .Toastify__progress-bar--animated {
    animation: Toastify__trackProgress linear 1 forwards;
  }
  .Toastify__progress-bar--controlled {
    transition: transform 0.2s;
  }
  .Toastify__progress-bar--rtl {
    right: 0;
    left: initial;
    transform-origin: right;
  }

  .Toastify__spinner {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 2px solid;
    border-radius: 100%;
    border-color: var(--toastify-spinner-color-empty-area);
    border-right-color: var(--toastify-spinner-color);
    animation: Toastify__spin 0.65s linear infinite;
  }

  @keyframes Toastify__bounceInRight {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    from {
      opacity: 0;
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      transform: translate3d(10px, 0, 0);
    }
    90% {
      transform: translate3d(-5px, 0, 0);
    }
    to {
      transform: none;
    }
  }
  @keyframes Toastify__bounceOutRight {
    20% {
      opacity: 1;
      transform: translate3d(-20px, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(2000px, 0, 0);
    }
  }
  @keyframes Toastify__bounceInLeft {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(25px, 0, 0);
    }
    75% {
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      transform: translate3d(5px, 0, 0);
    }
    to {
      transform: none;
    }
  }
  @keyframes Toastify__bounceOutLeft {
    20% {
      opacity: 1;
      transform: translate3d(20px, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-2000px, 0, 0);
    }
  }
  @keyframes Toastify__bounceInUp {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    from {
      opacity: 0;
      transform: translate3d(0, 3000px, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(0, -20px, 0);
    }
    75% {
      transform: translate3d(0, 10px, 0);
    }
    90% {
      transform: translate3d(0, -5px, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__bounceOutUp {
    20% {
      transform: translate3d(0, -10px, 0);
    }
    40%, 45% {
      opacity: 1;
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(0, -2000px, 0);
    }
  }
  @keyframes Toastify__bounceInDown {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(0, 25px, 0);
    }
    75% {
      transform: translate3d(0, -10px, 0);
    }
    90% {
      transform: translate3d(0, 5px, 0);
    }
    to {
      transform: none;
    }
  }
  @keyframes Toastify__bounceOutDown {
    20% {
      transform: translate3d(0, 10px, 0);
    }
    40%, 45% {
      opacity: 1;
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(0, 2000px, 0);
    }
  }
  .Toastify__bounce-enter--top-left, .Toastify__bounce-enter--bottom-left {
    animation-name: Toastify__bounceInLeft;
  }
  .Toastify__bounce-enter--top-right, .Toastify__bounce-enter--bottom-right {
    animation-name: Toastify__bounceInRight;
  }
  .Toastify__bounce-enter--top-center {
    animation-name: Toastify__bounceInDown;
  }
  .Toastify__bounce-enter--bottom-center {
    animation-name: Toastify__bounceInUp;
  }

  .Toastify__bounce-exit--top-left, .Toastify__bounce-exit--bottom-left {
    animation-name: Toastify__bounceOutLeft;
  }
  .Toastify__bounce-exit--top-right, .Toastify__bounce-exit--bottom-right {
    animation-name: Toastify__bounceOutRight;
  }
  .Toastify__bounce-exit--top-center {
    animation-name: Toastify__bounceOutUp;
  }
  .Toastify__bounce-exit--bottom-center {
    animation-name: Toastify__bounceOutDown;
  }

  @keyframes Toastify__zoomIn {
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
      opacity: 1;
    }
  }
  @keyframes Toastify__zoomOut {
    from {
      opacity: 1;
    }
    50% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    to {
      opacity: 0;
    }
  }
  .Toastify__zoom-enter {
    animation-name: Toastify__zoomIn;
  }

  .Toastify__zoom-exit {
    animation-name: Toastify__zoomOut;
  }

  @keyframes Toastify__flipIn {
    from {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      animation-timing-function: ease-in;
    }
    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }
    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }
    to {
      transform: perspective(400px);
    }
  }
  @keyframes Toastify__flipOut {
    from {
      transform: perspective(400px);
    }
    30% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      opacity: 1;
    }
    to {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      opacity: 0;
    }
  }
  .Toastify__flip-enter {
    animation-name: Toastify__flipIn;
  }

  .Toastify__flip-exit {
    animation-name: Toastify__flipOut;
  }

  @keyframes Toastify__slideInRight {
    from {
      transform: translate3d(110%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__slideInLeft {
    from {
      transform: translate3d(-110%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__slideInUp {
    from {
      transform: translate3d(0, 110%, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__slideInDown {
    from {
      transform: translate3d(0, -110%, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__slideOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(110%, 0, 0);
    }
  }
  @keyframes Toastify__slideOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(-110%, 0, 0);
    }
  }
  @keyframes Toastify__slideOutDown {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(0, 500px, 0);
    }
  }
  @keyframes Toastify__slideOutUp {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(0, -500px, 0);
    }
  }
  .Toastify__slide-enter--top-left, .Toastify__slide-enter--bottom-left {
    animation-name: Toastify__slideInLeft;
  }
  .Toastify__slide-enter--top-right, .Toastify__slide-enter--bottom-right {
    animation-name: Toastify__slideInRight;
  }
  .Toastify__slide-enter--top-center {
    animation-name: Toastify__slideInDown;
  }
  .Toastify__slide-enter--bottom-center {
    animation-name: Toastify__slideInUp;
  }

  .Toastify__slide-exit--top-left, .Toastify__slide-exit--bottom-left {
    animation-name: Toastify__slideOutLeft;
  }
  .Toastify__slide-exit--top-right, .Toastify__slide-exit--bottom-right {
    animation-name: Toastify__slideOutRight;
  }
  .Toastify__slide-exit--top-center {
    animation-name: Toastify__slideOutUp;
  }
  .Toastify__slide-exit--bottom-center {
    animation-name: Toastify__slideOutDown;
  }

  @keyframes Toastify__spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default GlobalStyles;