import React from "react";
import styled from "styled-components";

function Signup() {
  return (
    <Wrapper>
      <SignupContents>123</SignupContents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const SignupContents = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid red;
`;

export default Signup;
