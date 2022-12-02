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
  width: 100vw;
  z-index: 300;
  overflow: hidden;
  transition: 0.3s height;
  top: 8.04rem;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  &.closed {
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
  .cl {
    cursor: pointer;
    &:hover {
      color: black;
    }
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
  button {
    background-color: white;
    cursor: pointer;
  }
`;

const SearchWord = styled.div`
  color: #6b6b6b;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 5vh 0px;
  font-weight: 300;
  font-size: 1.3rem;
  &.line {
    border-right: 1px solid #dbdbdc;
  }
  .recent {
    height: 2em;
    text-decoration: #ffaf51 wavy underline;
    text-underline-offset: 7px;
  }
`;

const SearchList = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  max-height: 330px; //높이조절 잘됨
  overflow: hidden;
  section {
    padding: 10px 30px;
    width: 100%;
    display: flex;
    align-items: center;
    span {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .hover {
    width: 100%;
    font-size: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.8em;
    max-height: 2.65em;
    min-height: 2.4em;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:hover {
      text-decoration: #ffaf51 wavy underline;
      text-underline-offset: 7px;
      cursor: pointer;
      color: black;
    }
    padding-top: 5px;
  }
  .recent2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const RecentWordAllDetete = styled.span`
  font-size: 1rem;
  color: #aaaaaa;
  cursor: pointer;
  width: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: end;
  &:hover {
    color: black;
  }
`;

const SearchIcon = styled(BsSearch)`
  width: 1.8rem;
  height: 1.8rem;
  color: #002c6d;
  cursor: pointer;
  &:hover {
    color: #123b77;
  }
`;

const WordCloseIcon = styled(TfiClose)`
  width: 1rem;
  height: 1rem;
  color: #6b6b6b;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

function DownSearch({ closeSearch, closeHandler, setSearchWord }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputWord, setInputWord] = useState("");
  const [triger, setriger] = useState(0); //

  const test = inputWord.replace(/^\s+|\s+$/gm, "");

  console.log(test);
  const inputChageHandler = ({ target }) => {
    setInputWord(target.value);
  };

  const searchResultHandler = (e) => {
    e.preventDefault();
    if (test.length === 0) {
      Alert("warning", "첫번째 글자에 공백이 입력되었습니다.");
    } else {
      setSearchWord(test);
      handleAddKeyword(test); //##
      navigate("/search");
      closeHandler();
      setInputWord("");
      setriger(Date.now());
    }
  };

  const clickWordSearch = ({ target }) => {
    setSearchWord(target.innerText);
    handleAddKeyword(target.innerText);
    closeHandler();
    navigate("/search");
    setInputWord("");
  };

  const popularSelector = useSelector(
    (state) => state.article.popularSearchInitial
  );

  console.log(popularSelector);

  useEffect(() => {
    dispatch(popularSearch());
  }, [triger]);

  //string은 map을 사용 할 수 없기때문에 object 형태로 변환 시키기 위해 parsing을 해줘야함
  const loadRecentKeyword = localStorage.getItem("keywords")
    ? JSON.parse(localStorage.getItem("keywords"))
    : [];
  const [keywords, setKeywords] = useState(loadRecentKeyword);

  useEffect(() => {
    //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
    localStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  const handleAddKeyword = (text) => {
    const newKeyword = {
      id: Date.now(),
      text: text,
    };
    const sameKeywordRemove = keywords.filter((thisKeyword) => {
      return thisKeyword.text != newKeyword.text;
    });
    setKeywords([newKeyword, ...sameKeywordRemove]);
  };

  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((thisKeyword) => {
      return thisKeyword.id != id;
    });
    setKeywords(nextKeyword);
  };
  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([]);
  };

  return (
    <SearchBlock className={closeSearch ? "" : "closed"}>
      <div className="search-section">
        <Form>
          <SearchInput>
            <input
              type="text"
              value={inputWord}
              onChange={inputChageHandler}
              maxLength="23"
            ></input>
            <button onClick={searchResultHandler}>
              <SearchIcon />
            </button>
          </SearchInput>
          <div onClick={closeHandler} className="cl">
            <TfiClose size="24" />
          </div>
        </Form>
        <div>
          <SearchWord className="line">
            <div className="recent">최근 검색어</div>
            <SearchList>
              {keywords?.map(({ id, text }) => (
                <section className="recent2" key={id}>
                  <span className="hover" onClick={clickWordSearch}>
                    {text}
                  </span>
                  <WordCloseIcon
                    //눌렸을때 해야하는거라 arrow function을 사용하여 실행. 그냥 함수 쓰면은 그려지자마자 바로 실행됨
                    onClick={() => {
                      handleRemoveKeyword(id);
                    }}
                  />
                </section>
              ))}
            </SearchList>
            <RecentWordAllDetete onClick={handleClearKeywords}>
              전체 삭제
            </RecentWordAllDetete>
          </SearchWord>
          <SearchWord>
            <div className="recent">인기 검색어</div>
            <SearchList>
              {popularSelector?.map((el, idx) => (
                <section className="recent2" key={idx}>
                  <span>{idx + 1}.&nbsp;&nbsp;</span>
                  <span className="hover" onClick={clickWordSearch}>
                    {el.keyword}
                  </span>
                </section>
              ))}
            </SearchList>
          </SearchWord>
        </div>
      </div>
    </SearchBlock>
  );
}

export default DownSearch;
