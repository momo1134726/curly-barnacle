export interface MissionDef {
  id: string;
  title: string;
  reward: number; // 報酬チケット枚数
  target: number;
  getProgress: () => number;
}
