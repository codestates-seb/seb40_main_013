import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    a{
         text-decoration: none;
         color: inherit;
    }
    button{
        border: 0;
        outline: 0;
    }
    :root{
      // font-color
      --font-red : #FF2323;
      --font-black : #0E0E0E;
      --font-ligthblack : #515151;
      --font-navy : #002C6D;
      // font -size 
      --font-smallsize : 13px
      // color
      --color-orange : #FFAF51;
      --color-whiteyellow : #FCF9E9;
      --color-navy : #002C6D;
      --color-gray : #BEBCAF;
      --color-star : #FFC007;
      //border-radius 
      --border-radius : 5px;
      //border-color
      --border-navy : #002C6D;
      // center-line
      --color-center-line : #BEBCAF; 
    }
`;

export default GlobalStyles;
