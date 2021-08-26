import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import packsReducer from './packsSlice';
import basketReducer from './basketSlice';
import userReducer from './userSlice';
import qrCodeReducer from './qrCodeSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    user: userReducer,
    products: productsReducer,
    packs: packsReducer,
    qrCode: qrCodeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
