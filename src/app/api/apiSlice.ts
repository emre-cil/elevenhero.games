// import { setSuccessRefresh, setFailedRefresh } from '@/features/User/userSlice';
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// Define a service using a base URL and expected endpoint, and a function to transform the header.
const baseQuery = (args: any, api: BaseQueryApi, extraOptions: any) =>
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).user;
      if (accessToken && !extraOptions?.noToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

const baseQueryWithReauth = async (args: string | FetchArgs, api: any, extraOptions: any) => {
  // while (api?.getState()?.user?.refreshPending === true && !extraOptions?.initialRefresh && !extraOptions?.noToken) {
  //   // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
  //   await new Promise((resolve) => setTimeout(resolve, 50));
  // }
  const result = await baseQuery(args, api, extraOptions);
  // if (result?.error?.status === 401 || result?.error?.status === 403) {
  //   const refreshResult = await baseQuery(
  //     {
  //       url: '/RefreshToken/getRefreshToken',
  //       method: 'GET',
  //       credentials: 'include',
  //       withCredentials: true,
  //     },
  //     api,
  //     {
  //       ...extraOptions,
  //       noToken: true,
  //     },
  //   );
  //   if (refreshResult?.data) {
  //     api.dispatch(setSuccessRefresh(refreshResult?.data));
  //     return baseQuery(args, api, extraOptions);
  //   }
  //   api.dispatch(setFailedRefresh());
  //   return { error: { status: 401 } };
  // }

  return result;
};



const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default apiSlice;
