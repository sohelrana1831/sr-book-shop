import { apiSlice } from '@/redux/api/apiSlices';
import { IBook } from '@/types/globalTypes';

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/book',
      providesTags: ['book'],
    }),
    getSearchTerm: builder.query({
      query: (value) => `/book/?searchTerm=${value}`,
      providesTags: ['book'],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['book'],
    }),
    editBook: builder.mutation({
      query: (data) => ({
        url: `/book/${data?._id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    singleBook: builder.query<IBook, string>({
      query: (id: string) => `/book/${id}`,
      providesTags: ['book'],
    }),
    getReview: builder.query({
      query: (id: string) => `/book/review/${id}`,
      providesTags: ['review'],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `/book/add-review`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddReviewMutation,
  useSingleBookQuery,
  useAddBookMutation,
  useEditBookMutation,
  useGetReviewQuery,
  useDeleteBookMutation,
  useGetSearchTermQuery,
} = bookApi;
