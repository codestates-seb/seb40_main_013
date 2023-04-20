import { Link, useNavigate } from "react-router-dom";
import { BsCart3, BsSearch } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import DownSearch from "./search";
import { Toast } from "./Alert";
import Apis from "../apis/apis";
import * as Style from "../styles/HeaderStyle";

function Header({ setSubClick, setSearchWord, setPage, setProducts, clickCheck }) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [closeSearch, setCloseSearch] = useState(false);
  const [headerCartCount, setHeaderCartCount] = useState(0);
  const [clickSubWord, setClickSubWord] = useState("");

  const clickMainkMenu = () => {
    setSubClick("");
    setPage(0);
    setProducts([]);
  };

  const clickSubMenu = ({ target }) => {
    setSubClick(target.innerText);
    setPage(0);
    setProducts([]);
  };

  const closeHandler = () => {
    setCloseSearch(!closeSearch);
  };

  const outModalCloseHandler = (e) => {
    if (closeSearch && !modalRef.current.contains(e.target)) setCloseSearch(false);
  };

  const clickLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
    Toast("success", "로그아웃에 성공하셨습니다!");
  };

  // jwt토큰
  const jwt = localStorage.getItem("Authorization");
  useEffect(() => {
    if (jwt != null) {
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
  }, [jwt]);

  useEffect(() => {
    if (clickCheck > 0) {
      if (jwt != null) {
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
      // console.dir(target)
      setClickSubWord(target.innerText);
    };
    window.addEventListener("click", subColorHandler);
  }, []);

  return (
    <>
      <Style.HeaderBlock onClick={outModalCloseHandler}>
        <div className="top">
          {localStorage.getItem("authority") != null ? <Style.LoginBtn to="/register">판매등록</Style.LoginBtn> : null}
          {jwt != null ? (
            <Style.LoginBtn to="/" onClick={clickLogOut}>
              로그아웃
            </Style.LoginBtn>
          ) : (
            <Style.LoginBtn to="/users/login">로그인/회원가입</Style.LoginBtn>
          )}
          {jwt != null ? (
            <Style.LoginBtn to="/members/mypage/purchase">마이페이지</Style.LoginBtn>
          ) : (
            <Style.LoginBtn to="/users/login">마이페이지</Style.LoginBtn>
          )}
        </div>
        <Style.Logo to="/">
          <div>DAILY DAILY</div>
        </Style.Logo>
        <Style.CategoryList>
          <div>
            <Style.Category to="/library">
              <Style.BigSub className={clickSubWord === "서재" ? "click-space" : "space"} onClick={clickMainkMenu}>
                서재
              </Style.BigSub>
              <Style.Nav className="1">
                <div onClick={clickSubMenu}>책상</div>
                <div onClick={clickSubMenu}>의자</div>
                <div onClick={clickSubMenu}>책장</div>
                <div onClick={clickSubMenu}>선반</div>
              </Style.Nav>
            </Style.Category>
            <Style.Category to="/bedroom">
              <Style.BigSub className={clickSubWord === "침실" ? "click-space" : "space"} onClick={clickMainkMenu}>
                침실
              </Style.BigSub>
              <Style.Nav className="2">
                <div onClick={clickSubMenu}>침대/매트리스</div>
                <div onClick={clickSubMenu}>행거/옷장</div>
                <div onClick={clickSubMenu}>화장대</div>
              </Style.Nav>
            </Style.Category>
            <Style.Category to="/livingRoom">
              <Style.BigSub className={clickSubWord === "거실" ? "click-space" : "space"} onClick={clickMainkMenu}>
                거실
              </Style.BigSub>
              <Style.Nav className="3">
                <div onClick={clickSubMenu}>소파</div>
                <div onClick={clickSubMenu}>거실장</div>
                <div onClick={clickSubMenu}>수납장</div>
              </Style.Nav>
            </Style.Category>
            <Style.Category to="/kitchen">
              <Style.BigSub className={clickSubWord === "주방" ? "click-space" : "space"} onClick={clickMainkMenu}>
                주방
              </Style.BigSub>
              <Style.Nav className="4">
                <div onClick={clickSubMenu}>식탁/아일랜드</div>
                <div onClick={clickSubMenu}>식탁의자</div>
                <div onClick={clickSubMenu}>주방수납</div>
              </Style.Nav>
            </Style.Category>
          </div>
          <div>
            <div ref={modalRef} className="modal">
              <Style.Serach onClick={closeHandler}>
                <BsSearch size="20" />
              </Style.Serach>
              <DownSearch closeSearch={closeSearch} closeHandler={closeHandler} setSearchWord={setSearchWord} />
            </div>
            {jwt != null ? (
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
        </Style.CategoryList>
      </Style.HeaderBlock>
    </>
  );
}

export default Header;
