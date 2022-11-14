import styled from "styled-components/macro";
import logo from '../imgs/logo.png'
import { Link } from 'react-router-dom';
import { BsCart3, BsSearch } from 'react-icons/bs';

const HeaderBlock = styled.header`
  width: 100%;
  height: 230px;
  color: #BEBCAF;
  div{
    display: flex;
  }
  .top {
    justify-content: end;
    margin: 7px 20px 7px 10px;
  }
`
const Logo = styled.div`
  justify-content: center;
  img{
    width: 245px;
    height: 150px;
  }
`;

const Serach = styled.div`
  width: 200px;
  height: 15px;
  border: 1px solid #bebcaf;
  padding: 3px;
  margin-right: 10px;
  justify-content: end;
`;

const Category = styled.div`
 display: flex;
 justify-content: space-between;
 border-bottom: 1px solid #BEBCAF;
 padding: 7px;
 margin: 5px 30px 5px 30px;
 .space{
    margin-right: 7px;
  &:hover{
    cursor: pointer;

  }
  }
`;

const Nav =styled.nav`
  background-color: white;
  border: 1px solid #BEBCAF;
  width: 60px;
  display: flex;
  flex-direction: column;
  position: relative;
  left: 20px;
  bottom: 10px;
  div{
    justify-content: center;
    padding: 5px;
  }
  /* display: none; */
`;

//우측 상단 버튼
const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 5px;
  white-space: nowrap;
  color: #797979;
  border: none;
  background-color: white;
  &:hover {
    cursor: pointer;
    color: #ffaf51;
  }
`;


function Header() {
  //const navigate = useNavigate();
    return (
      <>
        <HeaderBlock>
            <div className="top">
                <Link to="/users/login">
                  <LoginBtn className="space">로그인/회원가입</LoginBtn>
                </Link>
                <Link to="/users/me/*">
                  <LoginBtn className="space">마이페이지</LoginBtn>
                </Link>
            </div>
              <Logo>
                <Link to="/">
                  <img src={logo} alt='daily,daily 로고'/>
                </Link>
              </Logo>
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
                        <BsSearch/>
                    </Serach>
                    <div>
                        <BsCart3 />
                        <div> (0)</div>
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
