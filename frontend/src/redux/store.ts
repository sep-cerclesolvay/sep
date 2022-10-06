import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bannerReducer from './bannerSlice';
import entriesReducer from './entriesSlice';
import eventsReducer from './eventsSlice';
import productsReducer from './productsSlice';
import packsReducer from './packsSlice';
import salesReducer from './salesSlice';
import basketReducer from './basketSlice';
import userReducer from './userSlice';
import qrCodeReducer from './qrCodeSlice';
import paymentMethodReducer from './paymentMethodSlice';

// TODO: separate store for SEP and Events
export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    basket: basketReducer,
    user: userReducer,
    entries: entriesReducer,
    events: eventsReducer,
    products: productsReducer,
    packs: packsReducer,
    sales: salesReducer,
    qrCode: qrCodeReducer,
    paymentMethods: paymentMethodReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
