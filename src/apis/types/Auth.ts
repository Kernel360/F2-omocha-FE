export interface ErrorResponse {
  // 얘는 겹치는 애들이 많은데 기초 본을 떠 두고 상속을 받아서 쓰는 형식은 어떤가요?
  result_data: unknown;
  result_msg: string;
  status_code: number;
}

export interface RegisterParams {
  login_id: string;
  password: string;
}

export interface LoginParams {
  login_id: string;
  password: string;
}
