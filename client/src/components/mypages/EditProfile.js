import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { nickNameCheck, pwdCheck, phoneCheck } from "../effectivenessCheck";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../reduxstore/slices/userSlice";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Apis from "../../apis/apis";

const EditContainter = styled.div`
  display: flex;
  width: 80vw;
  justify-content: center;
  @media (min-width: 391px) and (max-width: 767px) {
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 30px;
  border-radius: 5px;
  padding: 20px 20px 20px 40px;
  width: 60vw;
  border: 1px solid var(--color-center-line);
  @media screen and (max-width: 390px) {
    width: 100%;
    padding: 15px;
    margin: 40px 0;
  }
  @media (min-width: 390px) and (max-width: 767px) {
    width: 100%;
    padding: 15px;
    margin: 40px 0;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 90%;
    padding: 15px;
    margin: 30px;
  }
`;

const ErrorDisplay = styled.div`
  font-size: 1vw;
  color: red;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin: 10px 15px 8px 0;
  color: var(--font-black);
`;
const Input = styled.input`
  padding: 8px 5px;
  width: 300px;
  border: 1px solid var(--color-center-line);
  border-radius: 5px;
  transition: 1s;
  .email {
    color: #aaaaaa;
  }
  &:hover {
    outline: none;
    /* border-color: 1px solid #FFAF51; */
    box-shadow: 0px 0px 0px 1.5px #ffaf51;
  }
  &:focus-within {
    outline: none;
    /* border-color: 1px solid #FFAF51; */
    box-shadow: 0px 0px 0px 3px #ffaf51;
  }
  @media screen and (max-width: 390px) {
    width: 100%;
    padding: 7px;
    margin: 5px 0;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    width: 100%;
    padding: 7px;
    margin: 5px 0;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    padding: 10px 20px;
    margin: 15px 0;
  }
`;
//현재 비밀번호 확인 버튼
const CurInputBtn = styled.div`
  display: flex;
  align-items: center;
`;
const CurPwdBtn = styled.button`
  color: white;
  background-color: var(--color-navy);
  border: none;
  border-radius: 5px;
  padding: 7px 20px;
  margin-left: 10px;
  white-space: nowrap;
  height: fit-content;
  cursor: pointer;
  @media (min-width: 768px) and (max-width: 1024px) {

  }
`;
//버튼
const Buttons = styled.div`
  display: flex;
  margin-top: 20px;
  width: 400px;
  justify-content: flex-end;
  @media screen and (max-width: 390px) {
    width: 100%;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
  }
`;

const Delete = styled.button`
  color: var(--color-navy);
  border: 1px solid var(--color-navy);
  border-radius: 5px;
  padding: 7px 30px;
  margin-right: 10px;
  cursor: pointer;
  @media screen and (max-width: 390px) {
    padding: 5px 20px;
  }
`;
const Edit = styled.button`
  color: white;
  background-color: var(--color-navy);
  border: none;
  border-radius: 5px;
  padding: 7px 30px;
  cursor: pointer;
  @media screen and (max-width: 390px) {
    padding: 5px 20px;
  }
`;

//정보 수정하는 법
const HowtoEditMobile = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: fit-content;
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid var(--color-center-line);
  display: none;
  .editTitle{
    font-size: 1.5rem;
    font-weight: 700;
    color: #002C6D;
  }
  .explain{
    padding: 10px 0;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    width: 100%;
    display: flex;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 90%;
    display: flex;
    margin: 0 30px;
  }
`;

const HowtoEdit = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: fit-content;
  margin: 20px 20px 20px 30px;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid var(--color-center-line);
  .editTitle{
    font-size: 1.5rem;
    font-weight: 700;
    color: #002C6D;
  }
  .explain{
    padding: 10px 0;
    font-size: 1.1vw;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    display:none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display:none;
  }
`;
const Warning = styled.h2`
  color: red;
  font-weight: 500;
  font-size: 1.1rem;
  margin: 10px 0;
`;


const EditProfile = ({ getUserdata }) => {
  console.log({ getUserdata });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialToken = localStorage.getItem("Authorization");

  //비빌번호 타입 변경
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false
  });
  //password type 변경하는 함수
    const handlePasswordType = e => {
        setPasswordType(() => {
            if (!passwordType.visible) {
                return { type: 'text', visible: true };
            }
            return { type: 'password', visible: false };
        })
    }

  const [updateNickName, setUpdatNickName] = useState('');
  const [curpwd, setCurpwd] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');
  const [updatePwdCheck, setUpdatePwdCheck] = useState('');
  const [updateAddress, setUpdateAddress] = useState('');
  const [updatePhone, setUpdatePhone] = useState('');

  const [nicknameConfirm, setNicknameConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [updatePwdCheckConfirm, setUpdatePwdCheckConfirm] = useState(false);
  const [updatePhoneConfirm, setUpdatePhoneConfirm] = useState(false);

  //비밀번호 일치 확인
  const [curpwdConform, setCurpwdConform] = useState(false);

  //닉네임 저장하기
  useEffect(()=>{
    if(!updateNickName){
      setUpdatNickName(getUserdata?.nickname)
    }
    if(!updateAddress){
      setUpdateAddress(getUserdata?.address)
    }
    if(!updatePhone){
      setUpdatePhone(getUserdata?.phone)
    }
  })

  const handleUpdateNickName = e => {
    setUpdatNickName(e.target.value);
  };
  const handlecurPassword = (e) => {
    setCurpwd(e.target.value);
  };
  const handleUpdatePassword = (e) => {
    setUpdatePassword(e.target.value);
  };
  const handleUpdatePwdCheck = (e) => {
    setUpdatePwdCheck(e.target.value);
  };
  const handleUpdateAddress = (e) => {
    setUpdateAddress(e.target.value);
  };
  const handleUpdatePhone = (e) => {
    setUpdatePhone(e.target.value);
  };

  //confirm nickname
  useEffect(() => {
    if (updateNickName === "" || !nickNameCheck(updateNickName)) {
      setNicknameConfirm(false);
    } else {
      setNicknameConfirm(true);
    }

    //confirm password
    if (updatePassword === "" || !pwdCheck(updatePassword)) {
      setPasswordConfirm(false);
    } else {
      setPasswordConfirm(true);
    }

    //confirm passwordCheck
    if (updatePwdCheck === "" || updatePassword !== updatePwdCheck) {
      setUpdatePwdCheckConfirm(false);
    } else {
      setUpdatePwdCheckConfirm(true);
    }

    //confirm phone
    if (!phoneCheck(updatePhone)) {
      setUpdatePhoneConfirm(false);
    } else {
      setUpdatePhoneConfirm(true);
    }
  }, [updateNickName, updatePassword, updatePwdCheck, updatePhone]);

  // 현재 password 받아오기
  console.log(curpwd);
  const onConfirmPwd = () => {
    Apis.post(
      `password`,
      {
        password: curpwd,
      },
      {
        headers: {
          Authorization: initialToken,
        },
      }
    )
      .then((res) => {
        console.log(res);
        setCurpwdConform(true)
        alert("비밀번호가 일치합니다!");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.data.message === "Password does not match") {
          alert("입력하신 비밀번호가 일치하지않습니다.");
        }
        setCurpwdConform(false)
      });
  };

  //정보수정하기
  const updateInform = e => {
    let pwd = '';
    if(updatePassword === ''){
      pwd = curpwd
    }else {
      pwd = updatePassword
    }
    const updatedata = {
      nickname: updateNickName,
      password: pwd,
      address: updateAddress,
      phone: updatePhone,
    };
    console.log(updatedata);
    if(curpwdConform === true){
      dispatch(updateUser(updatedata));
      navigate('/members/mypage/purchase')
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if(window.confirm('확인을 누르면 회원 정보가 삭제됩니다.')){
      Apis.delete(`/members/mypage`,{
        headers: {
          Authorization: initialToken
        },
      }
      ).then(()=>{
        localStorage.clear();
        window.alert('그동안 이용해주셔서 감사합니다.');
        navigate('/');
      })
      .catch((err)=>alert(err.response.data.message));
    }else{
      return;
    }
  };

  return (
    <EditContainter>
      <HowtoEditMobile>
        <h2 className="editTitle">How to Edit</h2>
        <Warning>현재 비밀번호 입력후, 일치확인을 하셔야 정보수정이 가능합니다.</Warning>
        <ul>
          <li className="explain">닉네임: 수정하지 않으면 기존 닉네임이 유지됩니다.</li>
          <li className="explain">현재비밀번호(필수): 반드시 입력해야합니다.</li>
          <li className="explain">비밀번호: 수정하지않으면 비워도 됩니다.</li>
          <li className="explain">주소: 수정하지않으면 비워도 됩니다.</li>
          <li className="explain">휴대번호: 수정하지않으면 비워도 됩니다.</li>
        </ul>
      </HowtoEditMobile>
      <Container>
        <Label htmlFor="email">이메일</Label>
        <Input
          name="email"
          className="email"
          value={getUserdata?.email}
          disabled
        ></Input>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          name="UpdateNickName"
          value={updateNickName}
          onChange={handleUpdateNickName}
          required
        ></Input>
        {!nicknameConfirm ? (
          <ErrorDisplay>
            띄어쓰기 없이 2자이상 8자 이하 영어 또는 숫자 또는 한글로
            입력해주세요!
          </ErrorDisplay>
        ) : null}
        <div>
          <Label htmlFor="password">
            현재 비밀번호 ( * 필수입력 : 대/소문자 구분 )
          </Label>
          <span onClick={handlePasswordType}>
            {  passwordType.visible ? <AiFillEyeInvisible /> : <AiFillEye />  }
          </span>
        </div>
        <CurInputBtn>
          <Input
            name="Password"
            type={passwordType.type}
            onChange={handlecurPassword}
            required
          ></Input>
          <CurPwdBtn
            onClick={() => {
              onConfirmPwd();
            }}
          >
            확인
          </CurPwdBtn>
        </CurInputBtn>
        <div>
          <Label htmlFor="password">비밀번호</Label>
          <span onClick={handlePasswordType}>
            {  passwordType.visible ? <AiFillEyeInvisible /> : <AiFillEye />  }
          </span>
        </div>
        <Input
          name="password"
          type={passwordType.type}
          onChange={handleUpdatePassword}
          required
        ></Input>
        {!passwordConfirm ? (
          <ErrorDisplay>
            문자,숫자,특수문자를 최소 하나씩사용하여 최소 8자로 만들어주세요!
          </ErrorDisplay>
        ) : null}
        <div>
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <span onClick={handlePasswordType}>
            {  passwordType.visible ? <AiFillEyeInvisible /> : <AiFillEye />  }
          </span>
        </div>
        <Input 
        name="confirmPassword"
        type={passwordType.type}
        onChange={handleUpdatePwdCheck}
        required></Input>
        {!updatePwdCheckConfirm ? (
            <ErrorDisplay>
              위에 작성하신 비밀번호와 같은 비밀번호를 입력해주세요!
            </ErrorDisplay>
          ) : null}
        <Label htmlFor="address">주소</Label>
        <Input 
          name="address"
          value={updateAddress}
          onChange={handleUpdateAddress}
          ></Input>
        <Label htmlFor="phone">휴대폰 번호 ( 예: 010-1234-5678 )</Label>
        <Input 
          name="phone"
          value={updatePhone}
          onChange={handleUpdatePhone}
        ></Input>
        {!updatePhoneConfirm ? (
          <ErrorDisplay>
            위의 양식에 맞게 -와 숫자를 섞어서 작성해주세요.
          </ErrorDisplay>
        ) : null}
        <Buttons>
          <Delete onClick={handleDelete}>회원탈퇴</Delete>
          <Edit onClick={updateInform}>정보수정</Edit>
        </Buttons>
      </Container>
      <HowtoEdit>
        <h2 className="editTitle">How to Edit</h2>
        <Warning>현재 비밀번호 입력후, 일치확인을 하셔야 정보수정이 가능합니다.</Warning>
        <ul>
          <li className="explain">닉네임: 수정하지 않으면 기존 닉네임이 유지됩니다.</li>
          <li className="explain">현재비밀번호(필수): 반드시 입력해야합니다.</li>
          <li className="explain">비밀번호: 수정하지않으면 비워도 됩니다.</li>
          <li className="explain">주소: 수정하지않으면 비워도 됩니다.</li>
          <li className="explain">휴대번호: 수정하지않으면 비워도 됩니다.</li>
        </ul>
      </HowtoEdit>
    </EditContainter>
  );
};

export default EditProfile;
