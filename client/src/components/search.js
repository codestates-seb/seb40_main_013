import styled from "styled-components/macro";
import { BsSearch } from 'react-icons/bs';
import { IoMdClose} from 'react-icons/io';

const SearchBlock = styled.div`
  position: fixed; //absolute로 바꿀수도 있음
  width:100%; 
  height:80%; 
  z-index: 300; 
  overflow:hidden; 
  transition:0.3s height;  
  top: 160px;
  left: 0; 
  background-color: white;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  &.closed{
    height: 0; 
  }
  .search-section{
    width: 80%;
    max-width: 800px;
    flex-direction: column;
    justify-content: center;
  }
`;

const FormBlock = styled.div`

`;

const Form = styled.form`
  margin-top: 20vh;
  display: flex;
  width: 100%;
  height: 60px;
  div{
    align-items: center;
  }
`;

const SearchInput = styled.div`
  width: 100%;
  border-bottom: 3px solid #002C6D;
  margin-right: 15px;
  input{
    border: none;
    width: 100%;
    height: 100%;
    font-size: 30px;
    padding: 10px;
    &:focus {outline: none;} 
  }
`;

const Ranking = styled.div`
  flex-direction: column;
  align-items: center;
  /* height: 350px; */
  padding-top: 30px;
  .recent{
    height: 30px;
  }
`;

function DownSearch({closeSearch, closeHandler}){
    return(
      <SearchBlock className={ closeSearch ? '' : 'closed'}>
        <div className="search-section">
            <Form >
                <SearchInput >
                    <input type="text"></input>
                    <div>
                        <BsSearch color="#002C6D" size='26'/>
                    </div>
                </SearchInput>
                <div onClick={closeHandler}><IoMdClose size='32'/></div>
            </Form>
          <Ranking>
                <div className="recent">최근 검색어</div>
                <div>
                    <div>두닷</div>
                    <div>의자</div>
                    <div>책상</div>
                    <div>담요</div>
                    <div>쇼파</div>
                </div>
          </Ranking>
        </div>
      </SearchBlock>
    )
}

export default DownSearch;

