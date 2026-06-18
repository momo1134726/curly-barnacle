const STORAGE_KEY = 'ojisan-game-save';

interface SaveData {
  ownedCounts: Record<string, number>;
}

function load(): SaveData {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ownedCounts: {} };
  try {
    return JSON.parse(raw) as SaveData;
  } catch {
    return { ownedCounts: {} };
  }
}

function save(data: SaveData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addOjisan(id: string, count = 1) {
  const data = load();
  data.ownedCounts[id] = (data.ownedCounts[id] ?? 0) + count;
  save(data);
}

export function getOwnedCount(id: string): number {
  return load().ownedCounts[id] ?? 0;
}

export function getAllOwnedCounts(): Record<string, number> {
  return load().ownedCounts;
}
