import apiSlice from '@/app/api/apiSlice';

export const nftsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUsername: builder.mutation({
      query: (body) => ({
        url: `/nfts/addUsername?id=${body.id}`,
        method: 'POST',
        body: {
          name: body.username,
        },
      }),
      invalidatesTags: ['Inventory'],
    }),
    claimNFT: builder.mutation({
      query: (body) => ({
        url: '/nfts/claimNFT',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Inventory'],
    }),
  }),
});

export const { useAddUsernameMutation, useClaimNFTMutation } = nftsApiSlice;
