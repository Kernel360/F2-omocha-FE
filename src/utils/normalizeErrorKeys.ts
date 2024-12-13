/* eslint-disable @typescript-eslint/no-explicit-any */

function normalizeErrorKeys(errorData: Record<string, any>): Record<string, any> {
  return {
    statusCode: errorData.status_code ?? errorData.statusCode,
    resultMsg: errorData.result_msg ?? errorData.resultMsg,
    resultData: errorData.result_data ?? errorData.resultData,
  };
}

export default normalizeErrorKeys;
