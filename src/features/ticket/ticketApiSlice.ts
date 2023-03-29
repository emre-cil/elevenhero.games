import { apiSlice } from '../../app/api/apiSlice';

export const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (body) => ({
        url: '/api/tickets/createTicket',
        method: 'POST',
        body,
      }),
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: '/api/tickets/sendMessage',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useCreateTicketMutation, useSendMessageMutation } = ticketApiSlice;
