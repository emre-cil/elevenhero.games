import apiSlice from '@/app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      extraOptions: {
        noToken: true,
      },
    }),
    auth: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      extraOptions: {
        noToken: true,
      },
    }),
    refresh: builder.query({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
      }),
      extraOptions: {
        initialRefresh: true,
      },
    }),
    logout: builder.query({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `/auth/forgot-password?email=${email}`,
        method: 'POST',
      }),
      extraOptions: {
        noToken: true,
      },
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'PUT',
        body,
      }),
      extraOptions: {
        noToken: true,
      },
    }),
    sendVerificationEmail: builder.mutation({
      query: (email) => ({
        url: `/auth/send-verification-mail?email=${email}`,
        method: 'POST',
      }),
      extraOptions: {
        noToken: true,
      },
    }),

    verifyMail: builder.query({
      query: (body) => ({
        url: '/auth/verify-mail',
        method: 'PUT',
        body,
      }),
      extraOptions: {
        noToken: true,
      },
    }),

    getMoney: builder.query({
      query: () => ({
        url: '/users/getMoney',
        method: 'GET',
      }),
      providesTags: ['Money'],
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
  useResetPasswordMutation,
  useGetMoneyQuery,
} = userApiSlice;
