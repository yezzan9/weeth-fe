import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export interface AccountResponse {
  code: number;
  message: string;
  data: {
    accountId: number;
    description: string;
    totalAmount: number;
    currentAmount: number;
    time: string;
    cardinal: number;
    receipts: any[];
  };
}

export const fetchAccountData = async (
  cardinal: number,
): Promise<AccountResponse> => {
  try {
    const response = await axios.get<AccountResponse>(
      `${BASE_URL}/api/v1/account/${cardinal}`,
    );
    return response.data;
  } catch (error: any) {
    console.error('API 호출 에러:', error.response || error.message);
    throw new Error(
      error.response?.data?.message || 'API 호출 중 문제가 발생했습니다.',
    );
  }
};
