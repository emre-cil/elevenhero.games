import apiSlice from '../../app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    auth: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
      }),
    }),
    verifyMail: builder.query({
      query: (body) => ({
        url: '/auth/verify-mail',
        method: 'PUT',
        body,
      }),
    }),

    sendVerificationEmail: builder.mutation({
      query: (email) => ({
        url: `/auth/send-verification-mail?email=${email}`,
        method: 'POST',
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `/auth/forgot-password?email=${email}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useAuthMutation,
  useRefreshQuery,
  useLazyLogoutQuery,
  useVerifyMailQuery,
  useSendVerificationEmailMutation,
  useForgotPasswordMutation,
} = userApiSlice;
