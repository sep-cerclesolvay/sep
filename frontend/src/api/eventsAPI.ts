import { Event } from 'types/Event';
import { ReadApi } from './_API';

export const eventsApi = new ReadApi<Event>('events');
