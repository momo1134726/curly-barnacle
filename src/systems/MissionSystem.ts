import { MISSIONS } from '../data/missions';
import { addTickets, claimMission, isMissionClaimed } from './SaveSystem';
import type { MissionDef } from '../types/mission';

export interface MissionStatus {
  def: MissionDef;
  progress: number;
  isComplete: boolean;
  isClaimed: boolean;
}

export function getMissionStatuses(): MissionStatus[] {
  return MISSIONS.map((def) => {
    const progress = Math.min(def.getProgress(), def.target);
    return {
      def,
      progress,
      isComplete: progress >= def.target,
      isClaimed: isMissionClaimed(def.id),
    };
  });
}

export function claimMissionReward(missionId: string): boolean {
  const status = getMissionStatuses().find((s) => s.def.id === missionId);
  if (!status || !status.isComplete || status.isClaimed) return false;
  claimMission(missionId);
  addTickets(status.def.reward);
  return true;
}
