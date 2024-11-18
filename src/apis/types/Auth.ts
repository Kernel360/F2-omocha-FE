export interface RegisterParams {
  email: string;
  password: string;
}

export interface PostRegisterResponseData {
  email: string;
  nickname: null | string;
  birth: null | string;
  phone_number: null | string;
  image_url: null | string;
  role: 'ROLE_USER';
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface CheckEmailParams {
  email: string;
}
