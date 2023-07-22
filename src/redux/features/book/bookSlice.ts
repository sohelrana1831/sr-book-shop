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

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
});

export default bookSlice.reducer;
