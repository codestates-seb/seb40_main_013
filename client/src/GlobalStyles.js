import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style : inside;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    a{
         text-decoration: none;
         color: inherit;
    }
    button{
        border: 0;
        outline: 0;
    }
    input{
        outline: 0;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    /* 스크롤바 가로 사이즈 */
    ::-webkit-scrollbar {
        width: 10px;
        height: 0;
    }

    /* 스크롤바 막대기 */
    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background-color: #002c6d;
    }

    /* 스크롤바 백그라운드 */
    ::-webkit-scrollbar-track {
        background-color: #fff;
    }
    :root{
      // font-color
      --font-red : #FF4040;
      --font-black : #272727;
      --font-ligthblack : #272727;
      --font-navy : #002c6d;
      --font-smoothblack : #272727;
      // font -size 
      --font-smallsize : 13px
      // color
      --color-orange : #FFAF51;
      --color-whiteyellow : #FCF9E9;
      --color-navy : #002C6D;
      --color-gray : #AAAAAA;
      --color-star : #FFC007;
      --hover-navy : #123B77;
      //border-radius 
      --border-radius : 5px;
      //hover-color
      --hover-navy : #123b77;
      --white-hover-gary : #f0f0f0;
      --hover-gary: #aaaaaa;
      --button-gray : #efefef;
      --white-hover-gary : #f0f0f0;

      // center-line
      --color-center-line : #AAAAAA; 
      --button-gray : #efefef;
    }
`;

export default GlobalStyles;
