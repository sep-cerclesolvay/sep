import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncState } from '../types/AsyncState';
import { RootState } from './store';
import { addAsyncThunk } from './utils';
import { useAppSelector } from './hooks';
import { Entry } from 'types/Entry';
import { fetchEntries } from 'api/entriesAPI';

type EntriesState = AsyncState<Entry[]>;

const initialState: EntriesState = {
  isLoading: true,
};

export const loadEntries = createAsyncThunk('entries/fetchEntries', async (_i, { rejectWithValue }) => {
  try {
    const response = await fetchEntries();
    return response;
  } catch (e) {
    return rejectWithValue(JSON.stringify(e));
  }
});

export const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunk(builder, loadEntries);
  },
});

export const selectEntries = (state: RootState): EntriesState => state.entries;
export const useEntries = (): AsyncState<Entry[]> => useAppSelector(selectEntries);

export default entriesSlice.reducer;
