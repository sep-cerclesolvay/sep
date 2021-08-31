import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSaleById } from 'api/saleAPI';
import { Product } from 'types/Product';
import { Sale } from 'types/Sale';
import { SaleItem } from 'types/SaleItem';
import { AsyncState } from '../types/AsyncState';
import { RootState } from './store';
import { addAsyncThunk } from './utils';

type BasketState = AsyncState<Sale>;

const initialState: BasketState = {
  isLoading: true,
};

export const loadBasket = createAsyncThunk('basket/fetchCount', async (_i, { rejectWithValue }) => {
  try {
    const sale = await fetchSaleById(1);
    // The value we return becomes the `fulfilled` action payload
    return sale;
  } catch (e) {
    return rejectWithValue(e.data);
  }
});

const addItemFn = (state: BasketState, newItem: SaleItem) => {
  if (state.isLoading || state.data === undefined) {
    throw new Error('Can not add products into the basket: Basket is loading');
  }
  if (state.data.items.find((item) => item.product.id == newItem.id)) {
    return {
      ...state,
      data: {
        ...state.data,
        items: state.data.items.map((item) =>
          item.product.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        ),
      },
    };
  }
  return { ...state, data: { ...state.data, items: [newItem] } };
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<SaleItem>) => {
      return addItemFn(state, action.payload);
    },
    addItems: (state, action: PayloadAction<SaleItem[]>) => {
      let newState = { ...state };
      for (const product of action.payload) {
        newState = addItemFn(newState, product);
      }
      return newState;
    },
    removeItem: (state, action: PayloadAction<{ id: Product['id'] }>) => {
      if (state.isLoading || state.data === undefined) {
        throw new Error('Can not remove products into the basket: Basket is loading');
      }
      return {
        ...state,
        data: {
          ...state.data,
          items: state.data.items
            .map((item) => (item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter((item) => item.quantity > 0),
        },
      };
    },
    removeAllItems: (state, action: PayloadAction<{ id: Product['id'] }>) => {
      if (state.isLoading || state.data === undefined) {
        throw new Error('Can not remove products into the basket: Basket is loading');
      }
      return {
        ...state,
        data: { ...state.data, items: state.data.items.filter((product) => product.id !== action.payload.id) },
      };
    },
    clear: () => {
      return { isLoading: false, data: undefined, error: undefined };
    },
  },
  extraReducers: (builder) => {
    addAsyncThunk(builder, loadBasket);
  },
});

export const { addItem, addItems, removeItem, removeAllItems, clear } = basketSlice.actions;

export const selectBasket = (state: RootState): BasketState => state.basket;

export default basketSlice.reducer;
