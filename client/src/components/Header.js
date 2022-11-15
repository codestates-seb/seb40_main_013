import styled from "styled-components";
import logo from "../imgs/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3, BsSearch } from "react-icons/bs";

const HeaderBlock = styled.header`
  width: 100%;
  height: 230px;
  color: var(--color-gray);
  div{
    display: flex;
  }
  .top {
    justify-content: end;
    margin: 7px 20px 7px 10px;
  }
  .space {
    margin-right: 7px;
  }
`;
const Logo = styled.div`
  justify-content: center;
  height: 100px;
  justify-content: center;
  align-items: center;
  div{
    font-size: 43px;
    color: var(--color-navy);
  }
`;

const Serach = styled.div`
  margin-right: 8px;
`;


const Category = styled.div`

 display: flex;
 justify-content: space-between;
 border-bottom: 1px solid #AAAAAA;
 padding: 7px;
 margin: 5px 30px 5px 30px;
 .space{
    margin-right: 20px;
  &:hover{
    cursor: pointer;
  }
  }
  .cart-count{
    font-size: 12px;
  }
`;

const Nav =styled.nav`
  background-color: white;
  border: 1px solid #AAAAAA;
  width: 60px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bebcaf;
  padding: 7px;
  margin: 5px 30px 5px 30px;
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

const PageMove = styled(Link)`
  text-decoration: none;
`;

function Header() {
  //const navigate = useNavigate();
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
            <Category>
                <div>
                  <Link to='/sub'>
                    <div className="space">서재</div>
                  </Link>
                  <Link to='/cart'>
                    <div className="space">침실</div>
                  </Link>
                    <div className="space">거실</div>
                    <div className="space">주방</div>
                </div>
                <div>
                    <Serach>
                       <BsSearch size='20'/>
                    </Serach>
                    <div>
                        <BsCart3 size='20'/>
                        <div className="cart-count">(0)</div>
                    </div>
                </div>
            </Category>
            {/* <Nav>
              <div>의자</div>
              <div>책상</div>
              <div>책장</div>
            </Nav> */}
        </HeaderBlock>
      </>
  
    );
  }
  
  export default Header;
