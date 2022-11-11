import GlobalStyles from './GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header'
import Footer from './components/Footer';
import Login from './pages/Login';
import Main from './pages/Main';
import MyPage from './pages/Mypage';
import SubCategory from './components/subcategory';


const MainContainter = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
        <div className="App">
        <Header/>
        <MainContainter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/me/*" element={<MyPage />} />
            <Route path="/sub" element={<SubCategory />} />
          </Routes>
        </MainContainter>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
