import apiSlice from '@/app/api/apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: '/products/getActives',
        method: 'GET',
      }),
    }),
    buyProduct: builder.mutation({
      query: (id: number) => ({
        url: `/products/buy?id=${id}&count=1`,
        method: 'POST',
      }),
      invalidatesTags: ['Money', 'Inventory'],
    }),
    openBox: builder.mutation({
      query: (data: any) => ({
        url: `/products/openBox?boxId=${data.boxId}&prodId=${data.prodId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Inventory'],
    }),
  }),
});

export const { useGetProductsQuery, useBuyProductMutation, useOpenBoxMutation } = productsApiSlice;
