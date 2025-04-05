import Axios from 'axios';
import QueryString from 'qs';
import { AxiosError, AxiosRequestConfig } from 'axios';

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  validateStatus: () => true,
});

type Response<T> = {
  data: T;
  statusCode: number;
  message: string;
};

export const httpRequest = async <T = unknown>(
  request: AxiosRequestConfig & { query?: Record<string, string> },
): Promise<{ status: number; response: Response<T> }> => {
  const { query } = request;
  const queryString = QueryString.stringify(query);
  if (query) {
    request.url += `?${queryString}`;
    delete request.query;
  }
  const result = await axios<Response<T>>(request);

  if (result instanceof AxiosError) {
    // TODO handle later
    throw result;
  }
  return { response: result.data, status: result.status };
};
