import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import Header from './components/headers/Header'
import Footer from './components/Footer';
import Login from './pages/Login';

const Main = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <>
    <GlobalStyles />
    <Header/>
    <Main>
      <Login />
    </Main>
    <Footer />
    </>

  );
}

export default App;
