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
import ShoppingCart from "./pages/ShoppingCart";
import { useState } from "react";

const MainContainter = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const MainContent = styled.div`
  flex: 1;
`;

function App() {
  const [click, setClick] = useState("");

  return (
    <BrowserRouter>
      <GlobalStyles />
      <div className="App">
        <MainContainter>
          <MainContent>
            <Header setClick={setClick} />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/users/login" element={<Login />} />
              <Route path="/members/mypage/*" element={<MyPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/detail/:id" element={<ArticleDetail />} />
              <Route path="/sub" element={<SubCategory click={click} />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
          </MainContent>
          <Footer />
        </MainContainter>
      </div>
    </BrowserRouter>
  );
}

export default App;
