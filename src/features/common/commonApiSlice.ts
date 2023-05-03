import apiSlice from '@/app/api/apiSlice';

export const ticketApiSlice = apiSlice.injectEndpoints({
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
  }),
});

export const { useGetAllTimeLeaderboardQuery, useGetMonthlyLeaderboardQuery } = ticketApiSlice;
