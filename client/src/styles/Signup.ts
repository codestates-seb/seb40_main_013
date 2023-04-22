import styled from "styled-components/macro";

interface PropsStyled {
  isCheck?: boolean | null;
}

export const Wrapper = styled.form`
  width: 100%;
  height: 85vh;
  margin-top: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 330px) {
    width: 300px;
  }
`;

export const SignupWrapper = styled.div`
  width: 80%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0px 0px 50px 0px;
  border: 1px solid #aaaaaa;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 30%);
  border-radius: 7px;
  @media screen and (max-width: 500px) {
    height: 70vh;
  }
`;

export const UserWriteTitle = styled.div<PropsStyled>`
  margin-top: 50px;
  width: 70%;
  height: 25px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  &:nth-child(4) {
    margin-top: ${(props) => (props.isCheck != null && props.isCheck ? "15px" : "40px")};
  }
  &:nth-child(7) {
    margin-top: ${(props) => (props.isCheck != null && props.isCheck ? "15px" : "40px")};
  }
  &:nth-child(10) {
    margin-top: ${(props) => (props.isCheck != null && props.isCheck ? "15px" : "40px")};
  }
`;
export const UserWriteInput = styled.input`
  margin-top: 10px;
  width: 70%;
  height: 35px;
  padding-left: 10px;
  border: 1px solid #aaaaaa;

  @media screen and (max-width: 768px) {
    width: 70%;
    margin-top: 10px;
    border: 1px solid #aaaaaa;
  }
`;

export const UserSubmitBtn = styled.button`
  margin-top: 30px;
  width: 70%;
  height: 47px;
  cursor: pointer;
  background-color: var(--color-navy);
  border-radius: var(--border-radius);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const ErrorDisplay = styled.div`
  width: 70%;
  margin-top: 10px;
  font-size: 15px;
  color: red;
`;
