import styled from "styled-components/macro";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsCart3, BsSearch } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import DownSearch from "./search";

const HeaderBlock = styled.header`
  width: 100%;
  height: 170px;
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
  z-index: 2;
`;

const Logo = styled.div`
  height: 90px;
  align-items: center;
  justify-content: center;
  div {
    font-size: 43px;
    color: var(--color-navy);
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
`;

const CategoryList = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #aaaaaa;
  padding: 0px 7px;
  margin: 0px 30px 0px 30px;
  .cart-count {
    font-size: 12px;
  }
  padding-left: 20px;
  div {
    height: 100%;
  }
`;

const Nav = styled.nav`
  z-index: 200;
  position: absolute;
  top: 22px;
  left: -70px;
  background-color: white;
  border: 1px solid #aaaaaa;
  width: 105px;
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
`;

function Header({ setClick }) {
  const jwtToken = localStorage.getItem("Authorization");
  const navigate = useNavigate();
  const modalRef = useRef();
  const [closeSearch, setCloseSearch] = useState(false);

  const clickMenu = ({ target }) => {
    setClick(target.innerHTML);
    // console.log(target.innerHTML);
  };

  const closeHandler = () => {
    setCloseSearch(!closeSearch);
  };

  const clickLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
    window.alert("로그아웃에 성공하셨습니다!");
  };
  const outModalCloseHandler = ({ target }) => {
    if (closeSearch && !modalRef.current.contains(target))
      setCloseSearch(false);
    // console.log(target.innerHTML);
  };

  useEffect(() => {
    window.addEventListener("click", outModalCloseHandler);
    return () => {
      window.removeEventListener("click", outModalCloseHandler); //이벤트 한번만 실행되게 하려고 제거.
    };
  }, []);

  return (
    <>
      <HeaderBlock>
        <div className="top">
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
            <Link to="/sub">
              <Category>
                <div onClick={clickMenu}>서재</div>
                <Nav className="1">
                  <div onClick={clickMenu}>책상</div>
                  <div onClick={clickMenu}>의자</div>
                  <div onClick={clickMenu}>책장</div>
                  <div onClick={clickMenu}>선반</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/sub">
              <Category>
                <div onClick={clickMenu}>침실</div>
                <Nav className="2">
                  <div onClick={clickMenu}>침대</div>
                  <div onClick={clickMenu}>행거/옷장</div>
                  <div onClick={clickMenu}>화장대</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/sub">
              <Category className="space">
                <div onClick={clickMenu}>거실</div>
                <Nav className="3">
                  <div onClick={clickMenu}>소파</div>
                  <div onClick={clickMenu}>거실장</div>
                  <div onClick={clickMenu}>수납장</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/sub">
              <Category className="space">
                <div onClick={clickMenu}>주방</div>
                <Nav className="4">
                  <div onClick={clickMenu}>식탁/아일랜드</div>
                  <div onClick={clickMenu}>식탁의자</div>
                  <div onClick={clickMenu}>주방수납</div>
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
