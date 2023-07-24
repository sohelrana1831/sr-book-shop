import { IBook } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';

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
