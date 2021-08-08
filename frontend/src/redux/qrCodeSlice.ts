import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from 'types/Product';
import { AsyncState } from '../types/AsyncState';
import { RootState } from './store';
import { addAsyncThunk } from './utils';
import { fetchProductById } from 'api/productAPI';
import { useAppSelector } from './hooks';
import { Id } from 'types/Id';

type QrCodeState = AsyncState<Product>;

const initialState: QrCodeState = {
  isLoading: true,
};

export const loadQrCode = createAsyncThunk('products/fetchProductById', async (productId: Id, { rejectWithValue }) => {
  try {
    const response = await fetchProductById(productId);
    return response;
  } catch (e) {
    return rejectWithValue(e.toString());
  }
});

export const qrCodeSlice = createSlice({
  name: 'qrCode',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunk(builder, loadQrCode);
  },
});

export const selectQrCode = (state: RootState): QrCodeState => state.qrCode;
export const useQrCode = (): AsyncState<Product> => useAppSelector(selectQrCode);

export default qrCodeSlice.reducer;
