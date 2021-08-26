import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncState } from '../types/AsyncState';
import { RootState } from './store';
import { addAsyncThunk } from './utils';
import { useAppSelector } from './hooks';
import { Pack } from 'types/Pack';
import { fetchPacks } from 'api/packAPI';

type PacksState = AsyncState<Pack[]>;

const initialState: PacksState = {
  isLoading: true,
};

export const loadPacks = createAsyncThunk('products/fetchPacks', async (_i, { rejectWithValue }) => {
  try {
    const response = await fetchPacks();
    return response;
  } catch (e) {
    return rejectWithValue(e.data);
  }
});

export const productsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunk(builder, loadPacks);
  },
});

export const selectPacks = (state: RootState): PacksState => state.packs;
export const usePacks = (): AsyncState<Pack[]> => useAppSelector(selectPacks);

export default productsSlice.reducer;
