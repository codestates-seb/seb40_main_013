import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import imageCompression from "browser-image-compression";
import { postArticle } from "../reduxstore/slices/articleSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import noImg from "../imgs/noImg.gif";
import { priceCheck } from "../components/effectivenessCheck";
import { withReactContent } from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";

const Container = styled.div`
  /* width: 100vw; */
  display: flex;
  flex-direction: column;
  padding-top: 160px;
  overflow-x: hidden;
  align-items: center;
  @media screen and (max-width: 767px) {
    padding: 160px 30px;
  }
`;
const Title = styled.h2`
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--font-navy);
  margin-bottom: 20px;
  .span {
    font-weight: bolder;
    margin-right: 10px;
    color: #aaaaaa;
  }
`;
const Form = styled.form`
  width: 900px;
  padding: 10px 0 30px 0;
  @media screen and (max-width: 767px) {
    padding: 10px 30px;
    width: 100%;
    border: 1px solid #aaa;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 90%;
  }
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  .err {
    color: red;
    font-size: 0.8em;
    margin-top: 10px;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    margin: 10px 0;
    align-items: flex-start;
    width: 100%;
  }
`;
const TabContainer = styled.div`
  background-color: #f2f2f2;
  width: 15vw;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  margin-right: 30px;
  @media screen and (max-width: 767px) {
    width: fit-content;
    border-radius: 5px;
    background-color: white;
    font-size: 1.1rem;
    white-space: nowrap;
    justify-content: flex-start;
    font-weight: 500;
    color: #272727;
    padding: 10px 0;
    margin-left: 10px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 17vw;
  }
`;
const HrContainer = styled.div`
  background-color: #f2f2f2;
  width: 15vw;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 17vw;
  }
`;
const ImgContainer = styled.div`
  background-color: #f2f2f2;
  width: 15vw;
  padding: 100px 0;
  display: flex;
  justify-content: center;
  margin-right: 30px;
  @media screen and (max-width: 767px) {
    width: fit-content;
    border-radius: 5px;
    background-color: white;
    font-size: 1.1rem;
    white-space: nowrap;
    justify-content: flex-start;
    font-weight: 500;
    color: #272727;
    padding: 10px 0;
    margin-left: 10px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 17vw;
  }
`;
const SumContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 70%;
  }
`;
const UploadDelete = styled.div`
  display: flex;
`;
const ImgLabel = styled.label`
  display: inline-block;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2rem;
  @media screen and (max-width: 767px) {
    flex-direction: row;
  }
`;
const Hr = styled.hr`
  color: #aaa;
  width: 10vw;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const Pricecontent = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  height: 2vw;
  padding: 15px 0 15px 10px;
  border: none;
  border: 1px solid #aaa;
  border-radius: 5px;
  font-size: 1rem;
  width: 200px;
  @media screen and (max-width: 767px) {
    border: 1px solid #aaa;
    padding: 15px 10px;
    border-radius: 5px;
    width: 200px;
  }
`;
const SelectBox = styled.div`
  position: relative;
  width: 150px;
  height: 35px;
  border-radius: 4px;
  border: 1px solid #aaa;
  margin-right: 10px;
  @media screen and (max-width: 767px) {
    margin-bottom: 15px;
  }
`;
const IcoArrow = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 35px;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  &.img {
    width: 50%;
    transition: 0.3s;
    transform: rotate(180deg);
  }
`;
const Select = styled.select`
  margin-left: 10px;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: inherit;
  height: inherit;
  padding: 0 5px;
  border: 0 none;
  outline: 0 none;
  background: transparent;
  position: relative;
  z-index: 2;
`;
const Option = styled.option`
  background-color: #aaa;
  padding: 3px 0;
  font-size: 16px;
`;
const ImgTab = styled.div``;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%;
`;
const RegisterBtn = styled.button`
  font-size: 1rem;
  padding: 6px 15px;
  border-radius: 5px;
  background-color: var(--color-navy);
  color: white;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: #123b77;
  }
  @media screen and (max-width: 478px) {
    font-size: 0.8rem;
    padding: 6px 14px;
  }
`;
const Cancle = styled.button`
  font-size: 1rem;
  color: #ff4040;
  border: 1px solid #efefef;
  padding: 6px 15px;
  border-radius: 5px;
  background-color: #efefef;
  cursor: pointer;
  &:hover {
    border: 1px solid #ff4040;
  }
  @media screen and (max-width: 478px) {
    font-size: 0.8rem;
    padding: 6px 14px;
  }
`;
const Img = styled.img`
  margin: 10px 20px 10px 0;
  border-radius: 5px;
  width: 100%;
  height: 150px;
  @media (min-width: 768px) and (max-width: 1023px) {
    width: fit-content;
    max-width: 100%;
  }
`;
const Noimg = styled.img`
  @media screen and (max-width: 478px) {
    width: 200px;
  }
`;
const SumnailUpload = styled.input`
  margin-left: 10px;
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
const DeleteSumnaeil = styled.button`
  background-color: var(--color-navy);
  color: white;
  width: 55px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
`;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //????????? ?????? ????????? url ??????????????? state
  const [fileImage, setFileImage] = useState("");
  //????????? ?????? ????????? url ??????????????? state
  const [detailFileImage, setDetailFileImage] = useState("");
  //????????? ????????? ??????????????? state
  const [thumbnailImg, setThumbnailImg] = useState("");
  //????????? ????????? ??????????????? state
  const [contentsImg, setContentsImg] = useState("");
  //????????? ?????? ??????????????? state
  const [sellerId, setSellerId] = useState("");
  //?????? ?????? ??????????????? state
  const [contentsName, setContentsName] = useState("");
  //?????? ?????? ??????????????? state
  const [contentsPrice, setContentsPrice] = useState("");
  const [bigCategory, setBigCategory] = useState("?????????");
  const [subCategory, setSubCategory] = useState("");
  //????????????
  const [click, setClick] = useState(0);
  const clickFunction = () => {
    setClick(Date.now());
  };
  const brandOptios = [
    { brandName: "??????", query: 1 },
    { brandName: "?????????", query: 2 },
    { brandName: "????????????", query: 3 },
    { brandName: "?????????", query: 4 },
    { brandName: "?????????", query: 5 },
    { brandName: "?????????", query: 6 },
    { brandName: "??????", query: 7 },
    { brandName: "??????", query: 8 },
  ];
  const subOptios = [
    { category: "??????", query: 1 },
    { category: "??????", query: 1 },
    { category: "??????", query: 1 },
    { category: "??????", query: 1 },
    { category: "??????/????????????", query: 2 },
    { category: "??????/??????", query: 2 },
    { category: "?????????", query: 2 },
    { category: "??????", query: 3 },
    { category: "?????????", query: 3 },
    { category: "?????????", query: 3 },
    { category: "??????/????????????", query: 4 },
    { category: "????????????", query: 4 },
    { category: "????????????", query: 4 },
  ];

  let selectSubCategory = subOptios?.filter((data) => {
    if (bigCategory === "??????" && data.query === 1) {
      return data;
    } else if (bigCategory === "??????" && data.query == 2) {
      return data;
    } else if (bigCategory === "??????" && data.query == 3) {
      return data;
    } else if (bigCategory === "??????" && data.query == 4) {
      return data;
    }
  });

  const changeSubCategory = (e) => {
    setSubCategory(e.target.value);
  };

  const changeBrand = (e) => {
    let result = 0;
    let filterBrand = brandOptios.filter(
      (data) => data.brandName === e.target.value
    );
    result = filterBrand[0].query;
    setSellerId(result);
  };

  const changeContentName = (e) => {
    setContentsName(e.target.value.trim());
  };
  const handleChangeWhiteSpace = (e) => {
    e.target.value = e.target.value;
  };
  const changeContentPrice = (e) => {
    let c = e.target.value;
    if( c === '' || parseInt(c) < 5000){
      Alert("warning", "5,000??? ?????? ?????? ??????");
      setContentsPrice(5000)
    } else if (parseInt(c)>10000000) {
      Alert("warning", "10,000,000??? ?????? ?????? ??????");
      setContentsPrice(10000000)
    } 
    else{
      setContentsPrice(parseInt(c));
    }
  };

  const changeThumbnailImg = async (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    e.preventDefault();
    if (e.target.files) {
      const [file] = e.target.files;

      const options = {
        maxSizeMB: 0.2,
        useWebWorker: true,
      };
      console.log("????????????");
      const compressFile = await imageCompression(file, options);
      const thumbnailFile = new File([compressFile], "thumbnailImg.JPG");
      setThumbnailImg(thumbnailFile);
    }
  };

  //??????????????? ??????
  const deleteFileImage = (e) => {
    e.preventDefault();
    URL.revokeObjectURL(fileImage);
    setFileImage("");
    setThumbnailImg("");
  };

  //????????? ?????? ??????

  const changeContentImg = async (e) => {
    e.preventDefault();
    setDetailFileImage(URL.createObjectURL(e.target.files[0]));
    if (e.target.files) {
      const [file] = e.target.files;
      const options = {
        maxSizeMB: 0.2,
        useWebWorker: true,
      };
      console.log("????????????");
      const compressFile = await imageCompression(file, options);
      const contentFile = new File([compressFile], "contentImage.JPG");

      setContentsImg([contentFile]);
      if (contentsImg) {
        setContentsImg([...contentsImg, contentFile]);
      }
    }
  };
  //????????? ?????? ??????
  const deletedetailFileImage = (e) => {
    e.preventDefault();
    URL.revokeObjectURL(detailFileImage);
    setDetailFileImage("");
    setContentsImg("");
  };

  //???????????? ????????????
  function FirstCateChange(e) {
    setBigCategory(e.target.value);
    if (e.target.value === "??????") {
      setSubCategory("??????");
    } else if (e.target.value === "??????") {
      setSubCategory("??????/????????????");
    } else if (e.target.value === "??????") {
      setSubCategory("??????");
    } else if (e.target.value === "??????") {
      setSubCategory("??????/????????????");
    }
  }
  const handleRegister = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "????????? ?????????????????????????",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002C6D",
      cancelButtonColor: "#d33",
      confirmButtonText: "????????????",
    })
      .then((result) => {
        if (result.isConfirmed) {
          registConfirm();
          clickFunction();
        }
      })
      .catch((err) => console.log(err));

    // dispatch(postArticle({ postArticleData, navigate }));
  };
  const registConfirm = () => {
    if (
      sellerId === "" ||
      contentsName === "" ||
      thumbnailImg === "" ||
      contentsImg === "" ||
      contentsPrice === ""
    ) {
      Alert("error", "?????? ???????????? ????????? ???????????? ?????????!");
    } else if (contentsPrice < 5000) {
      Alert("error", "????????? ??????????????? 5000???????????? ????????? ");
    } else if (contentsPrice > 10000000) {
      Alert("error", "????????? ??????????????? 1000????????????????????? ????????? ");
      }else {
      let postArticleData = {
        sellerId: sellerId,
        title: contentsName,
        price: contentsPrice,
        content: contentsImg,
        img: thumbnailImg,
        main: bigCategory,
        sub: subCategory,
        optionList: [
          { color: "White", stock: 1000 },
          { color: "Black", stock: 1000 },
        ],
      };
      Alert("success", "?????? ????????? ?????????????????????!");
      dispatch(postArticle({ postArticleData, navigate }));
    }
  };

  //????????? ??????
  const [priceConfirm, setPriceConfirm] = useState(false);
  useEffect(() => {
    if (!priceCheck(contentsPrice)) {
      setPriceConfirm(false);
    } else {
      setPriceConfirm(true);
    }
    if (Number(contentsPrice) % 100 === 0) {
      setPriceConfirm(false);
    } else {
      setPriceConfirm(true);
    }
  });

  return (
    <Container>
      <Title>
        ????????????
      </Title>
      <Form>
        <InputContainer>
          <TabContainer>
            <Label htmlFor="id">????????? ??????</Label>
          </TabContainer>
          <SelectBox>
            <Select className="cate-control" onChange={(e) => changeBrand(e)}>
              <Option>?????????</Option>
              {brandOptios.map((option) => (
                <Option key={option.query}>{option.brandName}</Option>
              ))}
            </Select>
            <IcoArrow className="icoArrow">
              <IoIosArrowDown />
            </IcoArrow>
          </SelectBox>
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <TabContainer>
            <Label htmlFor="title">
              ????????? <span>&nbsp;(40??? ??????)</span>
            </Label>
          </TabContainer>
          <Input
            placeholder="???????????? ??????????????????"
            maxLength="40"
            name="title"
            className="title"
            onChange={changeContentName}
          />
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <TabContainer>
            <Label htmlFor="price">
              ????????? <span>&nbsp;(5,000 ??? ??????)</span>
            </Label>
          </TabContainer>
          <Pricecontent>
            <Input
              placeholder="????????? ??????????????????"
              name="pric e"
              type="number"
              className="price"
              min={5000}
              max={10000000}
              value={contentsPrice}
              onChange={changeContentPrice}
            />
            {contentsPrice < 5000 ? (
              <div className="err">
                5000??? ???????????? ?????????????????? 100???????????? ?????????????????????
              </div>
            ) : (
              ""
            )}
          </Pricecontent>
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <TabContainer>
            <Label>????????????</Label>
          </TabContainer>
          <SelectBox>
            <Select
              className="cate-control"
              id="FirstCate"
              name="FirstCate"
              value={bigCategory}
              onChange={(e) => FirstCateChange(e)}
            >
              <Option>?????????</Option>
              <Option value="??????">??????</Option>
              <Option value="??????">??????</Option>
              <Option value="??????">??????</Option>
              <Option value="??????">??????</Option>
            </Select>
            <IcoArrow className="icoArrow">
              <IoIosArrowDown />
            </IcoArrow>
          </SelectBox>
          <SelectBox>
            <Select
              id="SubCate"
              name="SubCate"
              onChange={(e) => changeSubCategory(e)}
            >
              {selectSubCategory.map((option) => (
                <Option key={option.category} value={option.category}>
                  {option.category}
                </Option>
              ))}
            </Select>
            <IcoArrow className="icoArrow">
              <IoIosArrowDown />
            </IcoArrow>
          </SelectBox>
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <ImgContainer>
            <ImgTab>????????? ??????</ImgTab>
          </ImgContainer>
          <SumContainer>
            {fileImage && <Img alt="sumnail" src={fileImage} />}
            <UploadDelete>
              <ImgLabel htmlFor="sumnail">
                <div className="noImg">
                  {thumbnailImg === "" ? <Noimg src={noImg} alt="noImg" /> : ""}
                </div>
              </ImgLabel>
              <SumnailUpload
                name="sumnailUpload"
                type="file"
                id="sumnail"
                accept="image/*"
                onChange={changeThumbnailImg}
              />
              {thumbnailImg === "" ? (
                ""
              ) : (
                <DeleteSumnaeil onClick={(e) => deleteFileImage(e)}>
                  ??????
                </DeleteSumnaeil>
              )}
            </UploadDelete>
          </SumContainer>
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <ImgContainer>
            <ImgTab>?????? ??????</ImgTab>
          </ImgContainer>
          <SumContainer>
            {detailFileImage && <Img alt="detailImg" src={detailFileImage} />}
            <UploadDelete>
              <ImgLabel htmlFor="detailImage">
                <div className="noImg">
                  {contentsImg === "" ? <Noimg src={noImg} alt="noImg" /> : ""}
                </div>
              </ImgLabel>
              <SumnailUpload
                name="detailImg"
                id="detailImage"
                type="file"
                accept="image/*"
                onChange={changeContentImg}
              />
              {contentsImg === "" ? (
                ""
              ) : (
                <DeleteSumnaeil onClick={(e) => deletedetailFileImage(e)}>
                  ??????
                </DeleteSumnaeil>
              )}
            </UploadDelete>
          </SumContainer>
        </InputContainer>
        <Buttons>
          <RegisterBtn onClick={handleRegister}>????????????</RegisterBtn>
          <Link to="/">
            <Cancle>??????</Cancle>
          </Link>
        </Buttons>
      </Form>
    </Container>
  );
};

export default Register;
