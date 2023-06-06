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

    getDetails: builder.query({
      query: () => ({
        url: '/users/getDetails',
        method: 'GET',
      }),
      providesTags: ['Profile', 'Money'],
    }),

    updateImage: builder.mutation({
      query: (body) => ({
        url: '/users/updateImage',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useAuthMutation,
  useRefreshQuery,
  useVerifyMailQuery,
  useSendVerificationEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetMoneyQuery,
  useGetDetailsQuery,
  useUpdateImageMutation,
} = userApiSlice;
