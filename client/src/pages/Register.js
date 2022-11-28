import React, { useState } from "react";
import styled from "styled-components/macro";

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
  .span{
    font-weight: bolder;
    margin-right: 10px;
    color: #AAAAAA;
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
  background-color: #F2F2F2;
  width: 10vw;
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;
const HrContainer = styled.div`
  background-color: #F2F2F2;
  width: 10vw;
  display: flex;
  justify-content: center;
`;
const ImgContainer = styled.div`
  background-color: #F2F2F2;
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
  &:hover{
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
  &:hover{
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
  //썸네일 파일 미리볼 url 저장해두는 state
  const [fileImage, setFileImage] = useState('');

  //썸네일파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  }

  //썸네일파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage('')
  }

  //디테일 파일 미리볼 url 저장해두는 state
  const [detailFileImage, setDetailFileImage] = useState('');

  //디테일 파일 저장
  const savedetailFileImage = (e) => {
    setDetailFileImage(URL.createObjectURL(e.target.files[0]));
  }

  //디테일 파일 삭제
  const deletedetailFileImage = () => {
    URL.revokeObjectURL(detailFileImage);
    setDetailFileImage('')
  }

  //폼 등록하기
  const handleRegister = () => {

  }
  return(
    <Container>
      <Title><span className="span">|</span>제품등록</Title>
      <Form>
      <InputContainer>
          <TabContainer>
            <Label htmlFor="id">판매자 아이디</Label>
          </TabContainer>
          <Input
          name="id"
          className="id"></Input>
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
          <TabContainer>
            <Label htmlFor="title">제품명</Label>
          </TabContainer>
          <Input
          name="title"
          className="title"></Input>
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
          placeholder="숫자만 입력해주세요."></Input>
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
        <TabContainer>
          <Label>카테고리</Label>
        </TabContainer>
          <Input></Input>
          <Input></Input>
        </InputContainer>
        <HrContainer>
          <Hr></Hr>
        </HrContainer>
        <InputContainer>
        <ImgContainer>
          <ImgTab>썸네일 사진</ImgTab>
        </ImgContainer>
          <SumContainer>
            {fileImage && (
              <Img 
                alt="sumnail"
                src={fileImage}/>
            )}
            <UploadDelete>
              <SumnailUpload
                name="sumnailUpload"
                type="file"
                accept="image/*"
                onChange={saveFileImage}
              />
              <DeleteSumnaeil onClick={()=> deleteFileImage()}>삭제</DeleteSumnaeil>
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
            {detailFileImage && (
              <Img 
                alt="detailImg"
                src={detailFileImage}/>
            )}
            <UploadDelete>
              <SumnailUpload
                name="detailImg"
                type="file"
                accept="image/*"
                onChange={savedetailFileImage}
              />
              <DeleteSumnaeil onClick={()=> deletedetailFileImage()}>삭제</DeleteSumnaeil>
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
}

export default Register;