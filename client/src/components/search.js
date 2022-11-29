import styled from "styled-components/macro";
import { BsSearch } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert } from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import { popularSearch } from "../reduxstore/slices/articleSlice";

const SearchBlock = styled.div`
  position: fixed;
  width:100vw; 
  z-index: 300; 
  overflow:hidden; 
  transition:0.3s height;  
  top: 8.04rem;
  left: 0; 
  background-color: white;
  display: flex;
  justify-content: center;
  &.closed{
    height: 0; 
  }
  .search-section {
    width: 80%;
    max-width: 800px;
    flex-direction: column;
    justify-content: center;
  }
`;

// const FormBlock = styled.form`
//   width: 100%;
//   .dis{
//     display: none;
//   }
// `;

const Form = styled.form`
  margin-top: 17vh;
  display: flex;
  width: 100%;
  height: 60px;
  div {
    align-items: center;
  }
`;

const SearchInput = styled.div`
  width: 100%;
  border-bottom: 3px solid #002c6d;
  margin-right: 15px;
  color: #272727;
  input {
    border: none;
    width: 100%;
    font-size: 30px;
    padding: 10px;
    &:focus {
      outline: none;
    }
  }
  .dis{
    display: none;
  }
`;

const SearchWord = styled.div`
  color: black;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 5vh 0px;
  font-weight: 300;
  font-size: 20px;
  &.line{
    border-right: 1px solid #dbdbdc;
  }
  .recent{
    height: 2em;
    text-decoration: #FFAF51 wavy underline;
    text-underline-offset : 7px;
    .word{
        font-size: 63px;
        line-height:8px
    }
  }
`;

const SearchList = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  section{
    padding: 10px 30px;
    font-size: 1.2rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.8em;
    max-height: 2.65em;
    min-height: 2.4em;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .hover{
    &:hover{
      text-decoration: #FFAF51 wavy underline;
      text-underline-offset : 7px;
    }
  }
  .recent2{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const WordCloseIcon = styled(TfiClose)`
  width: 1rem;
  height: 1rem;
  color: #272727;
`;

function DownSearch({closeSearch, closeHandler, setSearchWord}){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputWord, setInputWord] = useState('')

    const test = inputWord.replace(/^\s+|\s+$/gm,'')
    
    const inputChageHandler = ({target}) => {

      setInputWord(target.value)
    }

    const searchResultHandler = () => {
      if(test.length === 0 ){
        Alert('warning', '첫번째 글자에 공백이 입력되었습니다.')
      } else{
        setSearchWord(test)
        navigate('/search')
        closeHandler()
        setInputWord('')
      }
    }

    // const onSubmitSearch = (e) => {
    //   if (e.key === "Enter") {
    //     setSearchWord(test)
    //     closeHandler()
    //     navigate('/search')
    //     setInputWord('')
    //   } 
    //   // else if(inputWord.length === 0 ){
    //   //   Alert('warning', '첫번째 글자에 공백이 입력되었습니다.')
    //   // }
    // }

    const clickWordSearch = ({target}) => {
      console.log(target.innerText);
      setSearchWord(target.innerText)
      closeHandler()
      navigate('/search')
      setInputWord('')
    }

    const popularSelector = useSelector(state => state.article.popularSearchInitial)
    console.log(popularSelector);

    useEffect(()=>{

      dispatch(popularSearch());
    },[])

    return(
      <SearchBlock className={ closeSearch ? '' : 'closed'}>
        <div className="search-section">
            <Form>
                <SearchInput>
                    <input type="text" value={inputWord} onChange={inputChageHandler}
                      // onKeyUp={onSubmitSearch}
                      >

                      </input>
                    <input type="text" className="dis"/>
                    <div onClick={searchResultHandler}>
                        <BsSearch color="#002C6D" size='26'/>
                    </div>
                </SearchInput>
                <div onClick={closeHandler}><TfiClose size='24'/></div>
            </Form>
          <div>
            <SearchWord className="line">
              <div className="recent">최근 검색어</div>
              <SearchList>
                  {popularSelector?.map((el, idx)=>(
                    <section className="recent2" key={idx}>
                      <span className="word hover" onClick={clickWordSearch}>{el.keyword}</span>
                      <WordCloseIcon size='15'/>
                    </section>
                  ))}
              </SearchList>
            </SearchWord>
            <SearchWord>
              <div className="recent">인기 검색어</div>
              <SearchList>
                  {popularSelector?.map((el, idx)=>(
                    <section key={idx}>
                      <span className="word">{idx + 1}.&nbsp;&nbsp;</span>
                      <span className="word hover" onClick={clickWordSearch}>{el.keyword}</span>
                    </section>
                  ))}
              </SearchList>
            </SearchWord>
          </div>
        </div>
      </SearchBlock>
    )
}

export default DownSearch;
