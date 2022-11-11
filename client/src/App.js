import GlobalStyles from './GlobalStyles';
import Header from './components/Header'
import Footer from './components/Footer'
import styled from 'styled-components';

const Main = styled.div`
width: 100%;
height: 1500px;
`;

function App() {
  return (
    <>
    <GlobalStyles />
    <Header/>
    <Main />
    <Footer />
    </>

  );
}

export default App;
