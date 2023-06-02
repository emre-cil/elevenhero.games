import apiSlice from '@/app/api/apiSlice';

export const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTimeLeaderboard: builder.query({
      query: (body) => ({
        url: '/users/allTimeLeaderboard',
        method: 'GET',
        body,
      }),
    }),
    getMonthlyLeaderboard: builder.query({
      query: (body) => ({
        url: '/users/monthlyLeaderboard',
        method: 'GET',
        body,
      }),
    }),
    getProfileImages: builder.query({
      query: () => ({
        url: '/common/getProfileImgs',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllTimeLeaderboardQuery, useGetMonthlyLeaderboardQuery, useGetProfileImagesQuery } =
  commonApiSlice;
