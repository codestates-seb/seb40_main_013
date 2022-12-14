import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { nickNameCheck, pwdCheck, phoneCheck } from "../effectivenessCheck";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../reduxstore/slices/userSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Apis from "../../apis/apis";
import Swal from "sweetalert2";
import { Alert } from "../Alert";

const EditContainter = styled.div`
  display: flex;
  width: 75vw;
  justify-content: center;
  @media screen and (max-width: 389px) {
    flex-direction: column;
    align-items: center;
    width: 88vw;
  }
  @media (min-width: 390px) and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    width: 100vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    flex-direction: column;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 30px;
  border-radius: 5px;
  padding: 20px 20px 20px 40px;
  width: 45vw;
  border: 1px solid var(--color-center-line);
  @media screen and (max-width: 390px) {
    width: 80vw;
    padding: 15px;
    margin: 40px 0;
  }

  @media (min-width: 390px) and (max-width: 767px) {
    width: 80vw;
    padding: 15px;
    margin: 40px 0;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 90%;
    padding: 15px;
    margin: 30px;
  }
`;

const ErrorDisplay = styled.div`
  font-size: 1.2vw;
  color: red;
  margin-top: 13px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin: 10px 15px 0 0;
  color: var(--font-black);
  @media screen and (max-width: 390px) {
    font-size: 0.8rem;
  }
`;
const Input = styled.input`
  margin-top: 10px;
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
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    padding: 10px 20px;
    margin: 15px 0;
  }
`;
//?????? ???????????? ?????? ??????
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
  &:hover {
    background-color: #123b77;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
  }
`;
//???????????? ?????????
const PwdHide = styled.div`
  margin-top: 10px;
`;
//??????
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
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
  }
`;

const Delete = styled.button`
  color: #ff4040;
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 7px 30px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    border: 1px solid #ff4040;
  }
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
  &:hover {
    background-color: #123b77;
  }
  /* @media screen and (max-width: 390px) {
    padding: 5px 20px;
  } */
`;

//?????? ???????????? ???
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
  .editTitle {
    font-size: 1.4rem;
    font-weight: 700;
    color: #002c6d;
  }
  .explain {
    padding: 10px 0;
  }
  @media screen and (max-width: 389px) {
    width: 80vw;
    display: flex;
    li {
      font-size: 0.8rem;
    }
  }
  @media (min-width: 390px) and (max-width: 767px) {
    width: 80vw;
    display: flex;
    li {
      font-size: 0.8rem;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 90%;
    display: flex;
    margin: 0 30px;
    li {
      font-size: 0.9rem;
    }
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
  .editTitle {
    font-size: 1.2rem;
    font-weight: 700;
    color: #002c6d;
  }
  .explain {
    padding: 10px 0;
    font-size: 1vw;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
`;
const Warning = styled.h2`
  color: red;
  font-weight: 500;
  font-size: 0.9rem;
  margin: 10px 0;
`;

const EditProfile = ({ getUserdata }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialToken = localStorage.getItem("Authorization");

  //???????????? ?????? ??????
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });
  //password type ???????????? ??????
  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const [updateNickName, setUpdatNickName] = useState("");
  const [curpwd, setCurpwd] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updatePwdCheck, setUpdatePwdCheck] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");

  const [nicknameConfirm, setNicknameConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [updatePwdCheckConfirm, setUpdatePwdCheckConfirm] = useState(false);
  const [updatePhoneConfirm, setUpdatePhoneConfirm] = useState(false);

  //???????????? ?????? ??????
  const [curpwdConform, setCurpwdConform] = useState(false);

  //?????????, ??????, ??????????????? ????????????
  useEffect(() => {
    if (!updateNickName) {
      setUpdatNickName(getUserdata?.nickname);
    }
    if (!updateAddress) {
      setUpdateAddress(getUserdata?.address);
    }
    if (!updatePhone) {
      setUpdatePhone(getUserdata?.phone);
    }
  });

  const handleUpdateNickName = (e) => {
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

  // ?????? password ????????????
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
        setCurpwdConform(true);
        Alert("success", "??????????????? ???????????????!");
      })
      .catch((err) => {
        if (err.response.data.message === "Password does not match") {
          Alert("error", "???????????? ??????????????? ????????????????????????.");
        }
        setCurpwdConform(false);
      });
  };

  //??????????????????
  const updateInform = () => {
    let pwd = "";
    let updatedata = {};
    if (updatePassword === "") {
      pwd = curpwd;
    } else {
      pwd = updatePassword;
    }
    if (updateNickName === getUserdata.nickname) {
      updatedata = {
        password: pwd,
        address: updateAddress,
        phone: updatePhone,
      };
    } else if (updateNickName !== getUserdata.nickname) {
      updatedata = {
        nickname: updateNickName,
        password: pwd,
        address: updateAddress,
        phone: updatePhone,
      };
    }
    if (curpwdConform === true) {
      Swal.fire({
        title: "?????????????????????????",
        text: "????????? ???????????????.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "??????",
        confirmButtonColor: "#002C6D",
        cancelButtonText: "??????",
        cancelButtonColor: "#aaaaaa",
        reverseButtons: true,
      }).then((res) => {
        if (res.isConfirmed) {
          let pwd = "";
          let updatedata = {};
          if (updatePassword === "") {
            pwd = curpwd;
          } else {
            pwd = updatePassword;
          }
          if (updateNickName === getUserdata.nickname) {
            updatedata = {
              password: pwd,
              address: updateAddress,
              phone: updatePhone,
            };
          } else if (updateNickName !== getUserdata.nickname) {
            updatedata = {
              nickname: updateNickName,
              password: pwd,
              address: updateAddress,
              phone: updatePhone,
            };
          }
          dispatch(updateUser({ updatedata, navigate }));
        }
      });
    } else if (!curpwdConform) {
      Alert("warning", "?????? ??????????????? ??????????????????");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
      if (!localStorage.getItem("authority")) {
      if (curpwdConform === true) {
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "red",
        cancelButtonText: "No, cancel!",
        cancelButtonColor: "#aaaaaa",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Apis.delete(`/members/mypage`, {
          headers: {
          Authorization: initialToken,
          },
        })
        .then((res) => {
          localStorage.clear();
          Swal.fire({
          title: "Deleted!",
          text: "????????? ?????????????????? ???????????????.",
          icon: "success",
          confirmButtonColor: "#002C6D",
        });
          navigate("/");
        })
          .catch((err) => {
            console.log(err);
          });
        }
      });
      } else if (!curpwdConform) {
        Alert("warning", "?????? ??????????????? ??????????????????");
      }
      } else {
        Alert("error", "????????????????????? ??????????????? ??????????????????!");
      }
    };

  return (
    <EditContainter>
      <HowtoEditMobile>
        <h2 className="editTitle">How to Edit</h2>
        <Warning>
          ?????? ???????????? ?????? ???, ??????????????? ????????? ??????????????? ???????????????.
        </Warning>
        <ul>
          <li className="explain">
            ?????????: ???????????? ????????? ?????? ???????????? ???????????????.
          </li>
          <li className="explain">
            ?????? ????????????(??????): ????????? ?????????????????????.
          </li>
          <li className="explain">????????????: ???????????? ????????? ????????? ?????????.</li>
          <li className="explain">??????: ???????????? ????????? ????????? ?????????.</li>
          <li className="explain">????????????: ???????????? ????????? ????????? ?????????.</li>
        </ul>
      </HowtoEditMobile>
      <Container>
        <Label htmlFor="email">?????????</Label>
        <Input
          name="email"
          className="email"
          value={getUserdata?.email}
          disabled
        ></Input>
        <Label htmlFor="nickname">?????????</Label>
        <Input
          name="UpdateNickName"
          value={updateNickName || ""}
          onChange={handleUpdateNickName}
          required
        ></Input>
        {!nicknameConfirm ? (
          <ErrorDisplay>
            ???????????? ?????? 2????????? 8??? ?????? ?????? ?????? ?????? ?????? ?????????
            ??????????????????!
          </ErrorDisplay>
        ) : null}
        <PwdHide>
          <Label htmlFor="password">
            ?????? ???????????? ( * ???????????? : ???/????????? ?????? )
          </Label>
          <span onClick={handlePasswordType}>
            {passwordType.visible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </PwdHide>
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
            ??????
          </CurPwdBtn>
        </CurInputBtn>
        <PwdHide>
          <Label htmlFor="password">????????????</Label>
          <span onClick={handlePasswordType}>
            {passwordType.visible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </PwdHide>
        <Input
          name="password"
          type={passwordType.type}
          onChange={handleUpdatePassword}
          required
        ></Input>
        {!passwordConfirm ? (
          <ErrorDisplay>
            ??????, ??????, ??????????????? ?????? ????????? ??????????????????(8~20???)
          </ErrorDisplay>
        ) : null}
        <PwdHide>
          <Label htmlFor="confirmPassword">???????????? ??????</Label>
          <span onClick={handlePasswordType}>
            {passwordType.visible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </PwdHide>
        <Input
          name="confirmPassword"
          type={passwordType.type}
          onChange={handleUpdatePwdCheck}
          required
        ></Input>
        {!updatePwdCheckConfirm ? (
          <ErrorDisplay>
            ?????? ???????????? ??????????????? ?????? ??????????????? ??????????????????!
          </ErrorDisplay>
        ) : null}
        <Label htmlFor="address">??????</Label>
        <Input
          name="address"
          value={updateAddress || ""}
          onChange={handleUpdateAddress}
        ></Input>
        <Label htmlFor="phone">????????? ?????? ( ???: 010-1234-5678 )</Label>
        <Input
          name="phone"
          value={updatePhone || ""}
          onChange={handleUpdatePhone}
        ></Input>
        {!updatePhoneConfirm ? (
          <ErrorDisplay>
            ?????? ????????? ?????? - ??? ????????? ????????? ??????????????????.
          </ErrorDisplay>
        ) : null}
        <Buttons>
          {curpwdConform ? (
            <Delete onClick={handleDelete}>????????????</Delete>
          ) : (
            <Delete>????????????</Delete>
          )}
          <Edit onClick={updateInform}>????????????</Edit>
        </Buttons>
      </Container>
      <HowtoEdit>
        <h2 className="editTitle">How to Edit</h2>
        <Warning>
          ?????? ???????????? ?????? ???, ??????????????? ????????? ???????????? ??? ????????? ???????????????.
        </Warning>
        <ul>
          <li className="explain">
            ?????????: ???????????? ????????? ?????? ???????????? ???????????????.
          </li>
          <li className="explain">
            ?????? ????????????(??????): ????????? ?????????????????????.
          </li>
          <li className="explain">????????????: ???????????? ????????? ????????? ?????????.</li>
          <li className="explain">??????: ???????????? ????????? ????????? ?????????.</li>
          <li className="explain">????????????: ???????????? ????????? ????????? ?????????.</li>
        </ul>
      </HowtoEdit>
    </EditContainter>
  );
};

export default EditProfile;
