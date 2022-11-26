import { lazy, Suspense, useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components/macro";
import ScrollToTop from "./components/ScrollToTop";
import Button from "./components/Button";

const MainContainter = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const MainContent = styled.div`
  flex: 1;
`;

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Login = lazy(() => import("./pages/Login"));
const Main = lazy(() => import("./pages/Main"));
const MyPage = lazy(() => import("./pages/Mypage"));
const Signup = lazy(() => import("./pages/Signup"));
const ArticleDetail = lazy(() => import("./pages/detail/ArticleDetail"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart"));
const Library = lazy(() => import("./pages/sub/Library"));
const Bedroom = lazy(() => import("./pages/sub/Bedroom"));
const Kitchen = lazy(() => import("./pages/sub/Kitchen"));
const LivingRoom = lazy(() => import("./pages/sub/LivingRoom"));

function App() {
  const [click, setClick] = useState("");

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....!</div>}>
        <ScrollToTop />
        <GlobalStyles />
        <Button />
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
                <Route path="/library" element={<Library click={click} />} />
                <Route path="/bedroom" element={<Bedroom click={click} />} />
                <Route path="/kitchen" element={<Kitchen click={click} />} />
                <Route path="/livingRoom" element={<LivingRoom click={click} />} />
                <Route path="/cart" element={<ShoppingCart />} />
              </Routes>
            </MainContent>
            <Footer />
          </MainContainter>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
