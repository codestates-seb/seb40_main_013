import styled from "styled-components/macro";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsCart3, BsSearch } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import DownSearch from "./search";
import { useSelector } from "react-redux";
import { Toast } from "./Alert";

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
    @media (min-width: 381px) and (max-width: 767px) {
      font-size: 35px;
    }
    @media screen and (max-width: 380px) {
      font-size: 28px;
    }
  }
`;

//우측 상단 버튼
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
  @media screen and (max-width: 380px) {
    padding-left: 10px;
  }
`;

const Nav = styled.nav`
  z-index: 400;
  position: absolute;
  top: 19px;
  left: -70px;
  background-color: white;
  border: 1px solid #aaaaaa;
  width: 6.9em;
  font-size: 15px;
  justify-content: space-between;
  border-bottom: 1px solid #bebcaf;
  padding: 7px;
  margin: 5px 30px 5px 30px;
  div {
    padding: 6px 0px;
    flex-direction: column;
    align-items: center;
  }
  display: none;
  &:hover {
    display: block;
  }
  @media screen and (max-width: 380px) {
    width: 6.7em;
  }
`;

const Category = styled.div`
  position: relative;
  padding-right: 30px;
  &:hover {
    cursor: pointer;
    ${Nav} {
      display: block;
    }
  }
  @media screen and (max-width: 380px) {
    padding-right: 20px;
  }
`;

function Header({ setMainClick, setSubClick, setSearchWord }) {
  const jwtToken = localStorage.getItem("Authorization");
  const navigate = useNavigate();
  const modalRef = useRef();
  const [closeSearch, setCloseSearch] = useState(false);
  const cartCount = useSelector((state) => state);

  const clicMainkMenu = ({ target }) => {
    setMainClick(target.innerHTML);
    setSubClick('')
  };

  const clicSubMenu = ({ target }) => {
    setSubClick(target.innerHTML);
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
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      <HeaderBlock onClick={outModalCloseHandler}>
        <div className="top">
          <Link to="/register">
            <LoginBtn>판매등록</LoginBtn>
          </Link>
          {jwtToken ? (
            <Link>
              <LoginBtn onClick={clickLogOut}>로그아웃</LoginBtn>
            </Link>
          ) : (
            <Link to="/users/login">
              <LoginBtn>로그인/회원가입</LoginBtn>
            </Link>
          )}
          {jwtToken ? (
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
                <div onClick={clicMainkMenu}>서재</div>
                <Nav className="1">
                  <div onClick={clicSubMenu}>책상</div>
                  <div onClick={clicSubMenu}>의자</div>
                  <div onClick={clicSubMenu}>책장</div>
                  <div onClick={clicSubMenu}>선반</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/bedroom">
              <Category>
                <div onClick={clicMainkMenu}>침실</div>
                <Nav className="2">
                  <div onClick={clicSubMenu}>침대/매트리스</div>
                  <div onClick={clicSubMenu}>행거/옷장</div>
                  <div onClick={clicSubMenu}>화장대</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/livingRoom">
              <Category className="space">
                <div onClick={clicMainkMenu}>거실</div>
                <Nav className="3">
                  <div onClick={clicSubMenu}>소파</div>
                  <div onClick={clicSubMenu}>거실장</div>
                  <div onClick={clicSubMenu}>수납장</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/kitchen">
              <Category className="space">
                <div onClick={clicMainkMenu}>주방</div>
                <Nav className="4">
                  <div onClick={clicSubMenu}>식탁/아일랜드</div>
                  <div onClick={clicSubMenu}>식탁의자</div>
                  <div onClick={clicSubMenu}>주방수납</div>
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
            {jwtToken ? (
              <Link to="/cart">
                <div>
                  <BsCart3 size="20" />
                  <div className="cart-count">(0)</div>
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
