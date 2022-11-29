import React, { useState } from "react";
import styled from "styled-components/macro";
import imageCompression from "browser-image-compression";
import { postArticle } from "../reduxstore/slices/articleSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin-top: 160px;
  margin-left: 60px;
`;
const Title = styled.h2`
  font-size: 1.5rem;
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
  width: 60%;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;
const TabContainer = styled.div`
  background-color: #f2f2f2;
  width: 10vw;
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;
const HrContainer = styled.div`
  background-color: #f2f2f2;
  width: 10vw;
  display: flex;
  justify-content: center;
`;
const ImgContainer = styled.div`
  background-color: #f2f2f2;
  width: 10vw;
  padding: 100px 0;
  display: flex;
  justify-content: center;
`;
const SumContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const UploadDelete = styled.div`
  display: flex;
`;
const Label = styled.label`
  width: 10vw;
  display: flex;
  justify-content: center;
`;
const Hr = styled.hr`
  color: #aaa;
  width: 7vw;
`;
const Input = styled.input`
  height: 2vw;
  margin-left: 10px;
  padding: 1px 0 1px 10px;
`;
const Select = styled.select``;
const Option = styled.option``;
const ImgTab = styled.div``;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
const RegisterBtn = styled.button`
  font-size: 1.2rem;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: var(--color-navy);
  color: white;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    opacity: 0.7;
  }
`;
const Cancle = styled.button`
  font-size: 1.2rem;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: var(--color-navy);
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
const Img = styled.img`
  margin: 10px 20px;
  border-radius: 5px;
  width: 100%;
  height: 150px;
`;
const SumnailUpload = styled.input`
  margin-left: 10px;
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

  //썸네일 파일 미리볼 url 저장해두는 state
  const [fileImage, setFileImage] = useState("");
  //디테일 파일 미리볼 url 저장해두는 state
  const [detailFileImage, setDetailFileImage] = useState("");
  //썸네일 이미지 저장해두는 state
  const [thumbnailImg, setThumbnailImg] = useState("");
  //콘텐츠 이미지 저장해두는 state
  const [contentsImg, setContentsImg] = useState("");
  //판매자 이름 저장해두는 state
  const [sellerId, setSellerId] = useState("");
  //상품 이름 저장해두는 state
  const [contentsName, setContentsName] = useState("");
  //상품 가격 저장해두는 state
  const [contentsPrice, setContentsPrice] = useState("");
  const [bigCategory, setBigCategory] = useState("대분류");
  const [subCategory, setSubCategory] = useState("");

  const subOptios = [
    { category: "책장", query: 1 },
    { category: "의자", query: 1 },
    { category: "책상", query: 1 },
    { category: "선반", query: 1 },
    { category: "침대/메트리스", query: 2 },
    { category: "행거/옷장", query: 2 },
    { category: "화장대", query: 2 },
    { category: "소파", query: 3 },
    { category: "거실장", query: 3 },
    { category: "수납장", query: 3 },
    { category: "식탁/아일랜드", query: 4 },
    { category: "식탁의자", query: 4 },
    { category: "주방수납", query: 4 },
  ];

  let selectSubCategory = subOptios?.filter((data) => {
    if (bigCategory === "서재" && data.query === 1) {
      return data;
    } else if (bigCategory === "침실" && data.query == 2) {
      return data;
    } else if (bigCategory === "거실" && data.query == 3) {
      return data;
    } else if (bigCategory === "주방" && data.query == 4) {
      return data;
    }
  });

  const changeSubCategory = (e) => {
    setSubCategory(e.target.value);
  };
  console.log(bigCategory);
  console.log(subCategory);


  const changeId = (e) => {
    setSellerId(e.target.value);
  };
  const changeContentName = (e) => {
    setContentsName(e.target.value);
  };
  const changeContentPrice = (e) => {
    setContentsPrice(e.target.value);
  };

  const changeThumbnailImg = async (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    console.log(e);
    e.preventDefault();
    if (e.target.files) {
      const [file] = e.target.files;
      console.log([file]);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      console.log("압축시작");
      const compressFile = await imageCompression(file, options);
      const thumbnailFile = new File([compressFile], "thumbnailImg.JPG");
      setThumbnailImg(thumbnailFile);
    }
  };
  //썸네일파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  //디테일 파일 저장

  const changeContentImg = async (e) => {
    setDetailFileImage(URL.createObjectURL(e.target.files[0]));
    console.log(e);
    e.preventDefault();
    if (e.target.files) {
      const [file] = e.target.files;
      console.log([file]);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      console.log("압축시작");
      const compressFile = await imageCompression(file, options);
      const contentFile = new File([compressFile], "contentImage.JPG");
      setContentsImg([contentFile]);
      if (contentsImg) {
        setContentsImg([...contentsImg, contentFile]);
      }
    }
  };
  console.log(contentsImg);

  //디테일 파일 삭제
  const deletedetailFileImage = () => {
    URL.revokeObjectURL(detailFileImage);
    setDetailFileImage("");
  };

  //카테고리 선택하기
  function FirstCateChange(e) {
    setBigCategory(e.target.value);
  }

  //폼 등록하기
  const handleRegister = (e) => {
    e.preventDefault();
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

    dispatch(postArticle({ postArticleData, navigate }));
  };

  return (
    <Container>
      <Title>
        <span className="span">|</span>제품등록
      </Title>
      <Form>
        <InputContainer>
          <TabContainer>
            <Label htmlFor="id">판매자 아이디</Label>
          </TabContainer>
          <Input name="id" className="id" onChange={changeId} />
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <TabContainer>
            <Label htmlFor="title">제품명</Label>
          </TabContainer>
          <Input name="title" className="title" onChange={changeContentName} />
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <TabContainer>
            <Label htmlFor="price">판매가</Label>
          </TabContainer>
          <Input
            name="price"
            className="price"
            placeholder="숫자만 입력해주세요."
            onChange={changeContentPrice}
          />
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <TabContainer>
            <Label>카테고리</Label>
          </TabContainer>
          <Select
            className="cate-control"
            id="FirstCate"
            name="FirstCate"
            value={bigCategory}

            onChange={(e) => FirstCateChange(e)}
          >
            <Option>대분류</Option>
            <Option value="서재">서재</Option>
            <Option value="침실">침실</Option>
            <Option value="거실">거실</Option>
            <Option value="주방">주방</Option>
          </Select>
          <Select
            className="cate-control"
            id="SubCate"
            name="SubCate"
            onChange={(e) => changeSubCategory(e)}
          >
            {selectSubCategory.map((option) => (
              <Option key={option.category}>{option.category}</Option>
            ))}

          </Select>
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <ImgContainer>
            <ImgTab>썸네일 사진</ImgTab>
          </ImgContainer>
          <SumContainer>
            {fileImage && <Img alt="sumnail" src={fileImage} />}
            <UploadDelete>
              <SumnailUpload
                name="sumnailUpload"
                type="file"
                accept="image/*"
                onChange={changeThumbnailImg}
              />
              <DeleteSumnaeil onClick={() => deleteFileImage()}>
                삭제
              </DeleteSumnaeil>
            </UploadDelete>
          </SumContainer>
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <ImgContainer>
            <ImgTab>상세 사진</ImgTab>
          </ImgContainer>
          <SumContainer>
            {detailFileImage && <Img alt="detailImg" src={detailFileImage} />}
            <UploadDelete>
              <SumnailUpload
                name="detailImg"
                type="file"
                accept="image/*"
                onChange={changeContentImg}
              />
              <DeleteSumnaeil onClick={() => deletedetailFileImage()}>
                삭제
              </DeleteSumnaeil>
            </UploadDelete>
          </SumContainer>
        </InputContainer>
        <Buttons>
          <RegisterBtn onClick={handleRegister}>등록하기</RegisterBtn>
          <Cancle>취소</Cancle>
        </Buttons>
      </Form>
    </Container>
  );
};

export default Register;
