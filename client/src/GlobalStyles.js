import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';


const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing:boerder-box;
    }
    a{
         text-decoration:none;
         color:inherit;
    }
`;

export default GlobalStyles;
