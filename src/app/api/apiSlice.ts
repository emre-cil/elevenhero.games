// import { setSuccessRefresh, setFailedRefresh } from '@/features/User/userSlice';
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/store';
import { setCredentials } from '@/features/user/userSlice';

// Define a service using a base URL and expected endpoint, and a function to transform the header.
const baseQuery = (args: any, api: any, extraOptions: any) =>
  fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).user;
      if (accessToken && !extraOptions?.noToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  while (api?.getState()?.user?.refreshPending === true && !extraOptions?.initialRefresh && !extraOptions?.noToken) {
    // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
      },
      api,
      {
        ...extraOptions,
        noToken: true,
        initialRefresh: true,
      },
    );
    // if there is data on result, we assume it is the new credentials
    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult?.data));
      return baseQuery(args, api, extraOptions);
    }
    // else we assume the refresh failed and we clear the credentials
    api.dispatch(setCredentials({}));
    return { error: { status: 401 } };
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Money', 'Inventory', 'Formation', 'Tournament', 'Profile'],
});

export default apiSlice;
