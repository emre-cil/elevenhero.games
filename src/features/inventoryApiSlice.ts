import apiSlice from '@/app/api/apiSlice';

export const inventoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventory: builder.query({
      query: () => ({
        url: '/inventories',
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetInventoryQuery } = inventoryApiSlice;
