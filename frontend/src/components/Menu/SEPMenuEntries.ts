import {
  fileTrayStackedOutline,
  fileTrayStackedSharp,
  cubeOutline,
  cubeSharp,
  cartOutline,
  cartSharp,
  fileTrayOutline,
  fileTrayFullSharp,
} from 'ionicons/icons';
import { MenuEntry } from './MenuEntry';

export const entries: MenuEntry[] = [
  {
    title: 'Stock',
    url: '/stock/',
    iosIcon: fileTrayStackedOutline,
    mdIcon: fileTrayStackedSharp,
  },
  {
    title: 'Packs',
    url: '/packs/',
    iosIcon: cubeOutline,
    mdIcon: cubeSharp,
  },
  {
    title: 'Ventes',
    url: '/ventes/',
    iosIcon: cartOutline,
    mdIcon: cartSharp,
  },
  {
    title: 'Entrées',
    url: '/entrees/',
    iosIcon: fileTrayOutline,
    mdIcon: fileTrayFullSharp,
  },
];
