import { IBook } from '@/types/globalTypes';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAddBookMutation } from './bookApi';

interface IState {
  book: IBook[];
  isLodging: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: IState = {
  book: [],
  isLodging: false,
  isError: false,
  error: null,
};

export const createBook = createAsyncThunk(
  'book/createBook',
  async ({ ...payload }: IBook) => {
    const data = useAddBookMutation(payload);
    console.log({ data });
    return data;
  }
);

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getBooks: (state, action: PayloadAction) => {
      state.book = action.payload;
    },
    setLodging: (state, action: PayloadAction<boolean>) => {
      state.isLodging = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createBook.pending, (state) => {
  //       (state.isLodging = true), (state.isError = false), (state.error = null);
  //     })
  //     .addCase(createBook.fulfilled, (state, action) => {
  //       (state = action.payload), (state.isLodging = false);
  //     })
  //     .addCase(createBook.rejected, (state, action) => {
  //       (state.book = null),
  //         (state.isError = false),
  //         (state.error = action.error.message!);
  //     })
  //     .addCase(loginbook.pending, (state) => {
  //       (state.isLodging = true), (state.isError = false), (state.error = null);
  //     })
  //     .addCase(loginbook.fulfilled, (state, action) => {
  //       (state.book.email = action.payload), (state.isLodging = false);
  //     })
  //     .addCase(loginbook.rejected, (state, action) => {
  //       (state.book.email = null),
  //         (state.isError = false),
  //         (state.error = action.error.message!);
  //     });
  // },
});

export const { getBooks, setLodging } = bookSlice.actions;

export default bookSlice.reducer;
