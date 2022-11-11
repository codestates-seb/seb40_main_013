export const nickNameCheck = (name) => {
  let nickreg = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;

  return nickreg.test(name);
};

export const emailCheck = (email) => {
  let emailreg =
    /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

  return emailreg.test(email);
};
