export interface Response<T> {
  result_data: T;
  result_msg: string;
  status_code: number;
}
