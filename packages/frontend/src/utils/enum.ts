export type VMessageType = {
  [key: string]: string;
};

export const VMessage: VMessageType = {
  requiredField: '選択してください',
  emailInvalid: 'メールアドレスが無効です',
  passwordShort: 'パスワードは6文字以上である必要があります',
};
