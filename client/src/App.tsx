import { lazy, Suspense, useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
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

const Header = lazy(async () => await import("./components/Header"));
const Footer = lazy(async () => await import("./components/Footer"));
const Login = lazy(async () => await import("./pages/Login"));
const Main = lazy(async () => await import("./pages/Main"));
const MyPage = lazy(async () => await import("./pages/Mypage"));
const Signup = lazy(async () => await import("./pages/Signup"));
const ArticleDetail = lazy(async () => await import("./pages/detail/ArticleDetail"));
const ShoppingCart = lazy(async () => await import("./pages/ShoppingCart"));
const Library = lazy(async () => await import("./pages/sub/Library"));
const Bedroom = lazy(async () => await import("./pages/sub/Bedroom"));
const Kitchen = lazy(async () => await import("./pages/sub/Kitchen"));
const LivingRoom = lazy(async () => await import("./pages/sub/LivingRoom"));
const SearchResult = lazy(async () => await import("./pages/SearchResult"));
const Register = lazy(async () => await import("./pages/Register"));

function App() {
  const [subclick, setSubClick] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [clickCheck, setClickCheck] = useState(0);

  const clickCheckFunction = () => {
    setClickCheck(Date.now());
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingIcon></LoadingIcon>}>
        <ScrollToTop />
        <GlobalStyles />
        <Button />
        <div className="App">
          <MainContainter>
            <MainContent>
              <Header setSubClick={setSubClick} setSearchWord={setSearchWord} setPage={setPage} setProducts={setProducts} clickCheck={clickCheck} />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users/login" element={<Login />} />
                <Route path="/members/mypage/*" element={<MyPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/detail/:id"
                  element={<ArticleDetail clickCheckFunction={clickCheckFunction} clickCheck={clickCheck} setClickCheck={setClickCheck} />}
                />
                <Route path="/library" element={<Library subclick={subclick} page={page} setPage={setPage} products={products} setProducts={setProducts} />} />
                <Route path="/bedroom" element={<Bedroom subclick={subclick} page={page} setPage={setPage} products={products} setProducts={setProducts} />} />
                <Route path="/kitchen" element={<Kitchen subclick={subclick} page={page} setPage={setPage} products={products} setProducts={setProducts} />} />
                <Route
                  path="/livingRoom"
                  element={<LivingRoom subclick={subclick} page={page} setPage={setPage} products={products} setProducts={setProducts} />}
                />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route
                  path="/search"
                  element={<SearchResult searchWord={searchWord} page={page} setPage={setPage} products={products} setProducts={setProducts} />}
                />
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
