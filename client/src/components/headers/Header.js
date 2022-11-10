import styled from "styled-components";
import logo from './logo.png'
import { BsCart3, BsSearch } from 'react-icons/bs';

const HeaderBlock = styled.header`
  width: 100%;
  height: 215px;
  color: #BEBCAF;
  div{
    display: flex;
  }
  .top{
    justify-content: end;
    margin: 7px 20px 7px 10px;
  }
  .space{
    margin-right: 7px;
  }
`
const Logo = styled.div`
  justify-content: center;
  img{
    width: 250px;
    height: 150px;
  }
`;

const Serach = styled.div`
width: 200px;
height: 15px;
border: 1px solid #BEBCAF;
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
`;

function Header() {
    return (
      <>
        <HeaderBlock>
            <div className="top">
                <div className="space">상품추가</div>
                <div className="space">로그인/회원가입</div>
                <div className="space">마이페이지</div>
            </div>
            <Logo>
                <img src={logo} alt='daily,daily 로고'/>
            </Logo>
            <Category>
                <div>
                    <div className="space">서재</div>
                    <div className="space">침실</div>
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
        </HeaderBlock>
      </>
  
    );
  }
  
  export default Header;