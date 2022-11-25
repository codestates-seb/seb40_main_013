export const nickNameCheck = (name) => {
  let nickreg = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;

  return nickreg.test(name);
};
//2자 이상 8자 이하 영어 또는 숫자 또는 한글로 구성 초성및 모음은 허가하지않음

export const emailCheck = (email) => {
  let emailreg =
    /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

  return emailreg.test(email);
};
// 이메일 정규식

export const pwdCheck = (pwd) => {
  let pwdreg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,20}$/;

  return pwdreg.test(pwd);
};

//최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자

export const phoneCheck = (phone) => {
  let phonereg = /01[016789]-[0-9]{3,4}-[0-9]{4}/;

  return phonereg.test(phone);
};
