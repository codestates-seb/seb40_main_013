import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';


const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing:boerder-box;
    }
`;

export default GlobalStyles;
