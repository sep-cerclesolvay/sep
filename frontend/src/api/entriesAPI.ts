import { Entry } from 'types/Entry';
import { CRUDApi } from './_API';

const entriesApi = new CRUDApi<Entry, Entry>('entries');

export const fetchEntries = entriesApi.fetchAll;
