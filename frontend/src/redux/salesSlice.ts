import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncState } from '../types/AsyncState';
import { RootState } from './store';
import { addAsyncThunk } from './utils';
import { useAppSelector } from './hooks';
import { fetchSales } from 'api/saleAPI';
import { Sale } from 'types/Sale';

type SalesState = AsyncState<Sale[]>;

const initialState: SalesState = {
  isLoading: true,
};

export const loadSales = createAsyncThunk('sales/fetchSales', async (_i, { rejectWithValue }) => {
  try {
    const response = await fetchSales();
    return response?.sort((a, b) => b.created_date.localeCompare(a.created_date));
  } catch (e: any) {
    return rejectWithValue(e.data);
  }
});

export const productsSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Sale>) => {
      if (state.data) {
        return { ...state, data: [action.payload, ...state.data] };
      }
    },
  },
  extraReducers: (builder) => {
    addAsyncThunk(builder, loadSales);
  },
});

export const { add } = productsSlice.actions;

export const selectSales = (state: RootState): SalesState => state.sales;
export const useSales = (): AsyncState<Sale[]> => useAppSelector(selectSales);

export default productsSlice.reducer;
