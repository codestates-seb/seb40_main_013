import styled from "styled-components/macro";
import { Link } from "react-router-dom";
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
  justify-content: center;
  height: 100px;
  justify-content: center;
  align-items: center;
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
  &:focus {
    cursor: pointer;
    color: #ffaf51;
  }
`;

const Serach = styled.div`
  margin-right: 8px;
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
  div{
    height: 100%;
  }
`;

const Nav = styled.nav`
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
  div{
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
    ${Nav}{
      display: block;
    }
  }
`;



function Header() {
  //const navigate = useNavigate();
  const modalRef = useRef();
  const [closeSearch, setCloseSearch] = useState(false);

  const closeHandler = () => {
    setCloseSearch(!closeSearch);
  };

  const outModalCloseHandler = ({ target }) => {
    if (closeSearch && !modalRef.current.contains(target))
      setCloseSearch(false);
  };

  useEffect(() => {
    window.addEventListener("click", outModalCloseHandler);
    return () => {
      window.removeEventListener("click", outModalCloseHandler); //이벤트 한번만 실행되게 하려고 제거.
    };
  });

  return (
    <>
      <HeaderBlock>
        <div className="top">
          <Link to="/users/login">
            <LoginBtn>로그인/회원가입</LoginBtn>
          </Link>
          <Link to="/users/me/*">
            <LoginBtn>마이페이지</LoginBtn>
          </Link>
        </div>
        <Link to="/">
          <Logo>
            <div>DAILY DAILY</div>
          </Logo>
        </Link>
        <CategoryList>
          <div>
            <Link to="/sub">
              <Category>서재 
                <Nav className="1">
                  <div>책상</div>
                  <div>의자</div>
                  <div>책장</div>
                  <div>선반</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/sub">
              <Category>침실  
                <Nav className="2">
                  <div>침대/매트리스</div>
                  <div>행거/옷장</div>
                  <div>화장대</div>
                  <div>거울</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/sub">
              <Category className="space">거실  
                <Nav className="3">
                  <div>소파</div>
                  <div>거실장</div>
                  <div>사이드테이블</div>
                  <div>수납장</div>
                </Nav>
              </Category>
            </Link>
            <Link to="/sub">
              <Category className="space">주방
                <Nav className="4">
                  <div>식탁/아일랜드</div>
                  <div>식탁의자</div>
                  <div>주방수납</div>
                </Nav>
              </Category>
            </Link>
          </div>

          <div>
            <div ref={modalRef} className="modal">
              <Serach onClick={closeHandler}>
                <BsSearch size="20" />
              </Serach>
              {closeSearch && (
                <DownSearch
                  closeSearch={closeSearch}
                  closeHandler={closeHandler}
                />
              )}
            </div>
            <Link to="/cart">
              <div>
                <BsCart3 size="20" />
                <div className="cart-count">(0)</div>
              </div>
            </Link>
          </div>
        </CategoryList>
       
      </HeaderBlock>
    </>
  );
}

export default Header;
