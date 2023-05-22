import apiSlice from '@/app/api/apiSlice';

export const tournamentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveTournaments: builder.query({
      query: () => ({
        url: '/tournaments/getActives',
        method: 'GET',
      }),
      providesTags: ['Tournament'],
    }),
    getLatestTournament: builder.query({
      query: () => ({
        url: '/tournaments/getLatest',
        method: 'GET',
      }),
      providesTags: ['Tournament'],
    }),
    createTournament: builder.mutation({
      query: (body) => ({
        url: '/tournaments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tournament', 'Money'],
    }),
    joinTournament: builder.mutation({
      query: (id) => ({
        url: `/tournaments/join?tournamentId=${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Tournament', 'Money'],
    }),
    cancelTournament: builder.mutation({
      query: (id) => ({
        url: `/tournaments/cancel?tournamentId=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tournament', 'Money'],
    }),

    getUsersTournaments: builder.query({
      query: () => ({
        url: '/tournaments',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetActiveTournamentsQuery,
  useCreateTournamentMutation,
  useJoinTournamentMutation,
  useCancelTournamentMutation,
  useGetUsersTournamentsQuery,
  useGetLatestTournamentQuery,
} = tournamentApiSlice;
