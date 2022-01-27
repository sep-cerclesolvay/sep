import { Pack } from 'types/Pack';
import { CRUDApi } from './_API';

const packApi = new CRUDApi<Pack, Pack>('packs');

export const fetchPacks = packApi.fetchAll;
export const fetchPackById = packApi.fetchById;
