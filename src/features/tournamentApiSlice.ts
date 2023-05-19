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
    createTournament: builder.mutation({
      query: (body) => ({
        url: '/tournaments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tournament'],
    }),
    joinTournament: builder.mutation({
      query: (body) => ({
        url: '/tournaments/join',
        method: 'PUT',
        body,
      }),
    }),
    cancelTournament: builder.mutation({
      query: (body) => ({
        url: '/tournaments/cancel',
        method: 'DELETE',
      }),
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
} = tournamentApiSlice;
