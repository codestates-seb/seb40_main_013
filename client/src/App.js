import { lazy, Suspense, useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components/macro";
import ScrollToTop from "./components/ScrollToTop";
import Button from "./components/Button";
import LoadingIcon from "./components/LoadingIcon";

const MainContainter = styled.div`
  height: 100vh;
  /* width: 100vw; // 주의 */
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
const SearchResult = lazy(() => import("./pages/SearchResult"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  const [mainClick, setMainClick] = useState("");
  const [subclick, setSubClick] = useState("");
  const [searchWord, setSearchWord] = useState("");


  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingIcon></LoadingIcon>}>
        <ScrollToTop />
        <GlobalStyles />
        <Button />
        <div className="App">
          <MainContainter>
            <MainContent>
              <Header
                setMainClick={setMainClick}
                setSubClick={setSubClick}
                setSearchWord={setSearchWord}
                setPage={setPage}
                setProducts={setProducts}
              />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users/login" element={<Login />} />
                <Route path="/members/mypage/*" element={<MyPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/detail/:id" element={<ArticleDetail />} />
                <Route
                  path="/library"
                  element={
                    <Library 
                      mainClick={mainClick} 
                      subclick={subclick} 
                      page={page}
                      setPage={setPage}
                      products={products}
                      setProducts={setProducts}
                    />
                  }
                />
                <Route
                  path="/bedroom"
                  element={
                    <Bedroom 
                      mainClick={mainClick} 
                      subclick={subclick}
                      page={page}
                      setPage={setPage}
                      products={products}
                      setProducts={setProducts}
                    />
                  }
                />
                <Route
                  path="/kitchen"
                  element={
                    <Kitchen 
                      mainClick={mainClick} 
                      subclick={subclick} 
                      page={page}
                      setPage={setPage}
                      products={products}
                      setProducts={setProducts}
                    />
                  }
                />
                <Route
                  path="/livingRoom"
                  element={
                    <LivingRoom 
                      mainClick={mainClick} 
                      subclick={subclick} 
                      page={page}
                      setPage={setPage}
                      products={products}
                      setProducts={setProducts}
                    />
                  }
                />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route 
                  path="/search" 
                  element={
                    <SearchResult 
                      searchWord={searchWord} 
                      setSearchWord={setSearchWord}
                      page={page}
                      setPage={setPage}
                      products={products}
                      setProducts={setProducts}
                    />} />
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
