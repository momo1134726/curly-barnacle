import { getOwnedTypeCount, getTotalDraws } from '../systems/SaveSystem';
import type { MissionDef } from '../types/mission';

export const MISSIONS: MissionDef[] = [
  {
    id: 'mission_first_draw',
    title: 'はじめてのガチャを引く',
    reward: 1,
    target: 1,
    getProgress: getTotalDraws,
  },
  {
    id: 'mission_draw_10',
    title: 'ガチャを合計10回引く',
    reward: 2,
    target: 10,
    getProgress: getTotalDraws,
  },
  {
    id: 'mission_draw_30',
    title: 'ガチャを合計30回引く',
    reward: 5,
    target: 30,
    getProgress: getTotalDraws,
  },
  {
    id: 'mission_collect_5',
    title: 'おじさんを5種類集める',
    reward: 2,
    target: 5,
    getProgress: getOwnedTypeCount,
  },
  {
    id: 'mission_collect_15',
    title: 'おじさんを15種類集める',
    reward: 3,
    target: 15,
    getProgress: getOwnedTypeCount,
  },
  {
    id: 'mission_collect_all',
    title: 'おじさんを全種類集める',
    reward: 10,
    target: 30,
    getProgress: getOwnedTypeCount,
  },
];
