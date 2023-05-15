import apiSlice from '@/app/api/apiSlice';

export const formationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFormation: builder.query({
      query: () => ({
        url: '/formations',
        method: 'GET',
      }),
      providesTags: ['Formation', 'Inventory'],
    }),
    updateFormation: builder.mutation({
      query: (data) => ({
        url: '/formations',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Formation'],
    }),
  }),
});

export const { useGetFormationQuery, useUpdateFormationMutation, useLazyGetFormationQuery } = formationApiSlice;
