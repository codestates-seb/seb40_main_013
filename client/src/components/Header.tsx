import styled from "styled-components/macro";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3, BsSearch } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import DownSearch from "./search";
import { Toast } from "./Alert";
import Apis from "../apis/apis";

const HeaderBlock = styled.header`
  width: 100vw;
  height: 129px;
  color: var(--color-gray);
  div {
    display: flex;
  }
  .top {
    justify-content: end;
    margin: 7px 20px 7px 10px;
  }
  position: fixed;
  background-color: white;
  z-index: 12;
`;

const Logo = styled.div`
  height: 64px;
  align-items: center;
  justify-content: center;
  div {
    font-size: 43px;
    color: var(--color-navy);
    @media screen and (max-width: 380px) {
      font-size: 28px;
    }
    @media (min-width: 381px) and (max-width: 767px) {
      font-size: 35px;
    }
    @media screen and (min-width: 1024px) {
      font-size: 48px;
    }
  }
`;

// 우측 상단 버튼
const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 5px;
  white-space: nowrap;
  color: var(--color-gray);
  border: none;
  background-color: white;
  &:hover {
    cursor: pointer;
    color: #ffaf51;
  }
  &:focus {
    color: #ffaf51;
  }
  @media (min-width: 381px) and (max-width: 767px) {
    font-size: 14px;
    margin-left: 3px;
  }
  @media screen and (max-width: 380px) {
    font-size: 12px;
    margin-left: 0;
  }
`;

const Serach = styled.div`
  margin-right: 8px;
  z-index: 300;
  cursor: pointer;
`;

const CategoryList = styled.div`
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #aaaaaa;
  padding: 0px 7px;
  margin: 0px 30px 0px 30px;
  .cart-count {
    font-size: 12px;
    @media screen and (max-width: 380px) {
      display: none;
    }
  }
  padding-left: 20px;
  div {
    height: 100%;
  }
  @media screen and (max-width: 479px) {
    padding-left: 2px;
    font-size: 14px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 15px;
  }
`;

const Nav = styled.nav`
  z-index: 400;
  position: absolute;
  top: 19px;
  left: -45px;
  background-color: white;
  border: 1px solid #aaaaaa;
  width: 7.2em;
  font-size: 15px;
  justify-content: space-between;
  border-bottom: 1px solid #bebcaf;
  padding: 7px;
  margin: 5px 30px 5px 30px;
  div {
    padding: 6px 0px;
    flex-direction: column;
    align-items: center;
    &:hover {
      color: #002c6d;
      font-weight: 500;
    }
  }
  display: none;
  &:hover {
    display: block;
  }
  @media screen and (max-width: 479px) {
    width: 6.8em;
    font-size: 13px;
    left: -50px;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    font-size: 14px;
    left: -45.5px;
  }
`;

const Category = styled.div`
  position: relative;
  width: 5rem;
  justify-content: center;
  &:hover {
    cursor: pointer;
    ${Nav} {
      display: block;
    }
  }
  @media screen and (max-width: 479px) {
    width: 3.1rem;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    width: 4.5rem;
  }
`;

const BigSub = styled.div`
  width: inherit;
  display: flex;
  justify-content: center;
  font-weight: 500;
  &.space {
    &:hover {
      color: #002c6d;
    }
  }
  &.click-space {
    color: #ffaf51;
    &:hover {
      color: #002c6d;
    }
  }
`;

function Header({ setSubClick, setSearchWord, setPage, setProducts, clickCheck }) {
  const navigate = useNavigate();
  const modalRef = useRef();
  const [closeSearch, setCloseSearch] = useState(false);
  const [headerCartCount, setHeaderCartCount] = useState(0);
  const [clickSubWord, setClickSubWord] = useState('');

  const clickMainkMenu = () => {
    setSubClick("");
    setPage(0);
    setProducts([]);
  };

  const clickSubMenu = ({target}) => {
    setSubClick(target.innerText);
    setPage(0);
    setProducts([]);
  };

  const closeHandler = () => {
    setCloseSearch(!closeSearch);
  };

  const outModalCloseHandler = (e) => {
    if (closeSearch && !modalRef.current.contains(e.target))
      setCloseSearch(false);
  };
  
  const clickLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
    Toast("success", "로그아웃에 성공하셨습니다!");
  };

  //jwt토큰
  const jwt = localStorage.getItem("Authorization")
  useEffect(()=>{

    if(jwt){
      Apis.get(`carts`, {
        headers: {
          Authorization: `${jwt}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setHeaderCartCount(res.data.productCarts.length);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [jwt])

  useEffect(() => {
    if (clickCheck > 0) {
      if (jwt) {
      Apis.get(`carts`, {
      headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
      },
      })
      .then((res) => {
      setHeaderCartCount(res.data.productCarts.length);
      return res.data;
      })
      .catch((err) => {
      console.log(err);
      });
      }
    }
    }, [clickCheck]);

  useEffect(() => {
      const escKeyModalClose = (e) => {
          if (e.keyCode === 27) {
            setCloseSearch(false);
          }
      };
      window.addEventListener("keydown", escKeyModalClose);
  }, []);

  useEffect(() => {
    const subColorHandler = ({ target }) => {
      setClickSubWord(target.innerText)
    };
    window.addEventListener("click", subColorHandler);
}, []);

  return (
    <>
      <HeaderBlock onClick={outModalCloseHandler}>
        <div className="top">
          <Link to="/register">
            {localStorage.getItem("authority") ? (
              <LoginBtn>판매등록</LoginBtn>
            ) : null}
          </Link>
          {localStorage.getItem("Authorization") ? (
            <Link>
              <LoginBtn onClick={clickLogOut}>로그아웃</LoginBtn>
            </Link>
          ) : (
            <Link to="/users/login">
              <LoginBtn>로그인/회원가입</LoginBtn>
            </Link>
          )}
          {localStorage.getItem("Authorization") ? (
            <Link to="/members/mypage/purchase">
              <LoginBtn>마이페이지</LoginBtn>
            </Link>
          ) : (
            <Link to="/users/login">
              <LoginBtn>마이페이지</LoginBtn>
            </Link>
          )}
        </div>
        <Link to="/">
          <Logo>
            <div>DAILY DAILY</div>
          </Logo>
        </Link>
        <CategoryList>
          <div>
            <Link to="/library">
              <Category>
                <BigSub className={clickSubWord === '서재' ? "click-space" : "space"} onClick={clickMainkMenu}>
                  서재
                </BigSub>
                <Nav className="1">
                  <div onClick={clickSubMenu}>책상</div>
                  <div onClick={clickSubMenu}>의자</div>
                  <div onClick={clickSubMenu}>책장</div>
                  <div onClick={clickSubMenu}>선반</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/bedroom">
              <Category>
                <BigSub className={clickSubWord === '침실' ? "click-space" : "space"} onClick={clickMainkMenu}>
                  침실
                </BigSub>
                <Nav className="2">
                  <div onClick={clickSubMenu}>침대/매트리스</div>
                  <div onClick={clickSubMenu}>행거/옷장</div>
                  <div onClick={clickSubMenu}>화장대</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/livingRoom">
              <Category>
                <BigSub className={clickSubWord === '거실' ? "click-space" : "space"} onClick={clickMainkMenu}>
                  거실
                </BigSub>
                <Nav className="3">
                  <div onClick={clickSubMenu}>소파</div>
                  <div onClick={clickSubMenu}>거실장</div>
                  <div onClick={clickSubMenu}>수납장</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/kitchen">
              <Category>
                <BigSub className={clickSubWord === '주방' ? "click-space" : "space"} onClick={clickMainkMenu}>
                  주방
                </BigSub>
                <Nav className="4">
                  <div onClick={clickSubMenu}>식탁/아일랜드</div>
                  <div onClick={clickSubMenu}>식탁의자</div>
                  <div onClick={clickSubMenu}>주방수납</div>
                </Nav>
              </Category>
            </Link>
          </div>
          <div>
            <div ref={modalRef} className="modal">
              <Serach onClick={closeHandler}>
                <BsSearch size="20" />
              </Serach>
              <DownSearch
                closeSearch={closeSearch}
                closeHandler={closeHandler}
                setSearchWord={setSearchWord}
              />
            </div>
            {localStorage.getItem("Authorization") ? (
              <Link to="/cart">
                <div>
                  <BsCart3 size="20" />
                  <div className="cart-count">({headerCartCount})</div>
                </div>
              </Link>
            ) : (
              <Link to="/users/login">
                <div>
                  <BsCart3 size="20" />
                  <div className="cart-count">(0)</div>
                </div>
              </Link>
            )}
          </div>
        </CategoryList>
      </HeaderBlock>
    </>
  );
}

export default Header;

