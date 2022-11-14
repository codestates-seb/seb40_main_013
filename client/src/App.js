<<<<<<< HEAD
import GlobalStyles from './GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/headers/Header'
import Footer from './components/Footer';
import Login from './pages/Login';
import Main from './pages/Main';
import MyPage from './pages/Mypage';

const MainContainter = styled.div`
  display: flex;
  justify-content: center;
=======
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Main from "./pages/Main";
import MyPage from "./pages/Mypage";
import Signup from "./pages/Signup";
import ArticleDetail from "./pages/detail/ArticleDetail";
import SubCategory from "./pages/SubCategory";
import ShoppingCart from './pages/ShoppingCart'

const MainContainter = styled.div`
  /* display: flex;
  justify-content: center; */
>>>>>>> dab95ec5c2f7f888c1e204edffd7f222bea84032
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
<<<<<<< HEAD
        <div className="App">
        <Header/>
=======
      <div className="App">
        <Header />
>>>>>>> dab95ec5c2f7f888c1e204edffd7f222bea84032
        <MainContainter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/me/*" element={<MyPage />} />
<<<<<<< HEAD
=======
            <Route path="/signup" element={<Signup />} />
            <Route path="/detail/:id" element={<ArticleDetail />} />
            <Route path="/sub" element={<SubCategory />} />
            <Route path="/cart" element={<ShoppingCart />} />
>>>>>>> dab95ec5c2f7f888c1e204edffd7f222bea84032
          </Routes>
        </MainContainter>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
