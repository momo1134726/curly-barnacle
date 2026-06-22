const STORAGE_KEY = 'ojisan-game-save';

interface SaveData {
  ownedCounts: Record<string, number>;
  tickets: number;
  totalDraws: number;
  claimedMissionIds: string[];
  lastLoginDate: string | null;
  loginStreak: number;
}

const DEFAULT_DATA: SaveData = {
  ownedCounts: {},
  tickets: 0,
  totalDraws: 0,
  claimedMissionIds: [],
  lastLoginDate: null,
  loginStreak: 0,
};

function load(): SaveData {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...DEFAULT_DATA };
  try {
    return { ...DEFAULT_DATA, ...(JSON.parse(raw) as Partial<SaveData>) };
  } catch {
    return { ...DEFAULT_DATA };
  }
}

function save(data: SaveData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// --- おじさん所持 ---

export function addOjisan(id: string, count = 1) {
  const data = load();
  data.ownedCounts[id] = (data.ownedCounts[id] ?? 0) + count;
  data.totalDraws += count;
  save(data);
}

export function getOwnedCount(id: string): number {
  return load().ownedCounts[id] ?? 0;
}

export function getAllOwnedCounts(): Record<string, number> {
  return load().ownedCounts;
}

export function getOwnedTypeCount(): number {
  const counts = load().ownedCounts;
  return Object.values(counts).filter((c) => c > 0).length;
}

export function getTotalDraws(): number {
  return load().totalDraws;
}

// --- ガチャチケット ---

export function getTickets(): number {
  return load().tickets;
}

export function addTickets(amount: number) {
  const data = load();
  data.tickets += amount;
  save(data);
}

export function useTicket(): boolean {
  const data = load();
  if (data.tickets <= 0) return false;
  data.tickets -= 1;
  save(data);
  return true;
}

// --- ミッション ---

export function isMissionClaimed(missionId: string): boolean {
  return load().claimedMissionIds.includes(missionId);
}

export function claimMission(missionId: string) {
  const data = load();
  if (!data.claimedMissionIds.includes(missionId)) {
    data.claimedMissionIds.push(missionId);
    save(data);
  }
}

export function getClaimedMissionIds(): string[] {
  return load().claimedMissionIds;
}

// --- ログインボーナス ---

function todayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export interface LoginResult {
  isNewLogin: boolean;
  streak: number;
}

/** その日初めての起動なら streak を進めてセーブする */
export function checkAndApplyDailyLogin(): LoginResult {
  const data = load();
  const today = todayString();

  if (data.lastLoginDate === today) {
    return { isNewLogin: false, streak: data.loginStreak };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;

  data.loginStreak = data.lastLoginDate === yesterdayStr ? data.loginStreak + 1 : 1;
  data.lastLoginDate = today;
  save(data);

  return { isNewLogin: true, streak: data.loginStreak };
}

export function getLoginStreak(): number {
  return load().loginStreak;
}
