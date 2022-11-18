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

const MainContainter = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div className="App">
        <MainContainter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/members/mypage/*" element={<MyPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/detail" element={<ArticleDetail />} />
            <Route path="/sub" element={<SubCategory />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
          <Footer />
        </MainContainter>
      </div>
    </BrowserRouter>
  );
}

export default App;
