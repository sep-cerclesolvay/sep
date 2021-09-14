import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncState } from '../types/AsyncState';
import { RootState } from './store';
import { addAsyncThunk } from './utils';
import { useAppSelector } from './hooks';
import { PaymentMethod } from 'types/PaymentMethod';
import { fetchPaymentMethods } from 'api/paymentMethodAPI';

type PaymentMethodsState = AsyncState<PaymentMethod[]>;

const initialState: PaymentMethodsState = {
  isLoading: true,
};

export const loadPaymentMethods = createAsyncThunk(
  'paymentMethods/fetchPaymentMethods',
  async (_i, { rejectWithValue }) => {
    try {
      const response = await fetchPaymentMethods();
      return response;
    } catch (e) {
      return rejectWithValue(JSON.stringify(e));
    }
  }
);

export const paymentMethodSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunk(builder, loadPaymentMethods);
  },
});

export const selectPaymentMethods = (state: RootState): PaymentMethodsState => state.paymentMethods;
export const usePaymentMethods = (): AsyncState<PaymentMethod[]> => useAppSelector(selectPaymentMethods);

export default paymentMethodSlice.reducer;
