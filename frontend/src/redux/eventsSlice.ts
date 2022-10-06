import { AsyncState } from '../types/AsyncState';
import { RootState } from './store';
import { useAppSelector } from './hooks';
import { Event } from 'types/Event';
import { eventsApi } from 'api/eventsAPI';
import { createRestSlice } from './rest';

export const { slice, extraReducers } = createRestSlice({
  name: 'events',
  api: eventsApi,
});

export const { fetchAll: loadEvents } = extraReducers;
export const selectEvents = (state: RootState) => state.events;
export const useEvents = (): AsyncState<Event[]> => useAppSelector(selectEvents);

export default slice.reducer;
