// Browser storage. Everything the app saves goes through `store`, so a cloud adapter can
// replace it later with the same methods.

import { EMPTY_DATA, mergeData, validateBackup } from './sync.js';

const PREFIX = 'goalforge.v1.';
const keys = {
  customGoals: PREFIX + 'customGoals',
  resources: PREFIX + 'resources',
  progress: PREFIX + 'progress',
  notes: PREFIX + 'notes',
  mastery: PREFIX + 'mastery',
  timers: PREFIX + 'timers',
  settings: PREFIX + 'settings',
  deleted: PREFIX + 'deleted',
  drafts: PREFIX + 'drafts',
  meta: PREFIX + 'meta',
  snapshot: PREFIX + 'preImportSnapshot',
};
// Keys that are part of the user's data (exported, merged, counted as a change).
const DATA_KEYS = ['customGoals', 'resources', 'progress', 'notes', 'mastery', 'timers', 'settings', 'deleted'];

const listeners = { change: new Set(), error: new Set() };
export function onStoreChange(fn) { listeners.change.add(fn); }
export function onStoreError(fn) { listeners.error.add(fn); }

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Returns true when saved. A failed save (storage full, disabled, private mode) is reported
// to the app instead of being silently lost.
function write(key, value, { silent = false } = {}) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    const quota = err?.name === 'QuotaExceededError' || err?.code === 22;
    const message = quota
      ? 'Your browser’s storage for this app is full, so the last change was not saved. Export a backup now.'
      : 'This browser refused to save your last change. Export a backup now so nothing is lost.';
    listeners.error.forEach(fn => fn(message, err));
    return false;
  }
  const name = Object.keys(keys).find(k => keys[k] === key);
  if (!silent && DATA_KEYS.includes(name)) {
    const meta = read(keys.meta, {});
    meta.lastChangeAt = new Date().toISOString();
    try { localStorage.setItem(keys.meta, JSON.stringify(meta)); } catch { /* reported above if it matters */ }
    listeners.change.forEach(fn => fn(name));
  }
  return true;
}

function current() {
  return {
    customGoals: store.getCustomGoals(),
    resourceOverrides: store.getResourceOverrides(),
    progress: store.getProgress(),
    notes: store.getNotes(),
    mastery: store.getMastery(),
    timers: store.getTimers(),
    settings: store.getSettings(),
    deleted: store.getDeleted(),
  };
}

function saveAll(data, { silent = false } = {}) {
  if (silent) {
    const pairs = [
      [keys.customGoals, data.customGoals ?? EMPTY_DATA.customGoals],
      [keys.resources, data.resourceOverrides ?? EMPTY_DATA.resourceOverrides],
      [keys.progress, data.progress ?? EMPTY_DATA.progress],
      [keys.notes, data.notes ?? EMPTY_DATA.notes],
      [keys.mastery, data.mastery ?? EMPTY_DATA.mastery],
      [keys.timers, data.timers ?? EMPTY_DATA.timers],
      [keys.settings, { activeGoalId: 'dsa-patterns-2026', ...(data.settings || {}) }],
      [keys.deleted, data.deleted ?? { notes: [], goals: [] }],
    ];
    if (pairs.map(([k, v]) => write(k, v, { silent: true })).includes(false)) throw new Error('Could not save synced data — your browser storage may be full.');
    return;
  }
  const ok = [
    store.setCustomGoals(data.customGoals ?? EMPTY_DATA.customGoals),
    store.setResourceOverrides(data.resourceOverrides ?? EMPTY_DATA.resourceOverrides),
    store.setProgress(data.progress ?? EMPTY_DATA.progress),
    store.setNotes(data.notes ?? EMPTY_DATA.notes),
    store.setMastery(data.mastery ?? EMPTY_DATA.mastery),
    store.setTimers(data.timers ?? EMPTY_DATA.timers),
    store.setSettings({ activeGoalId: 'dsa-patterns-2026', ...(data.settings || {}) }),
    store.setDeleted(data.deleted ?? { notes: [], goals: [] }),
  ];
  if (ok.includes(false)) throw new Error('Could not save everything — your browser storage may be full.');
}

export const store = {
  getCustomGoals: () => read(keys.customGoals, []),
  setCustomGoals: v => write(keys.customGoals, v),
  getResourceOverrides: () => read(keys.resources, {}),
  setResourceOverrides: v => write(keys.resources, v),
  getProgress: () => read(keys.progress, {}),
  setProgress: v => write(keys.progress, v),
  getNotes: () => read(keys.notes, []),
  setNotes: v => write(keys.notes, v),
  getMastery: () => read(keys.mastery, {}),
  setMastery: v => write(keys.mastery, v),
  getTimers: () => read(keys.timers, {}),
  setTimers: v => write(keys.timers, v),
  getSettings: () => ({ activeGoalId: 'dsa-patterns-2026', shifts: {}, ...read(keys.settings, {}) }),
  setSettings: v => write(keys.settings, v),
  getDeleted: () => ({ notes: [], goals: [], ...read(keys.deleted, {}) }),
  setDeleted: v => write(keys.deleted, v),
  // Unsaved text in note boxes; not part of a backup.
  getDrafts: () => read(keys.drafts, {}),
  setDrafts: v => write(keys.drafts, v, { silent: true }),
  getMeta: () => read(keys.meta, {}),
  updateMeta(patch) { const meta = { ...read(keys.meta, {}), ...patch }; write(keys.meta, meta, { silent: true }); return meta; },

  exportAll() {
    return { version: 1, app: 'GoalForge', exportedAt: new Date().toISOString(), ...current() };
  },
  hasData() {
    const d = current();
    return Object.keys(d.progress).length > 0 || Object.keys(d.mastery).length > 0 || d.notes.length > 0 || d.customGoals.length > 0;
  },

  // mode: 'merge' keeps the newer copy of every record; 'replace' makes this device match the
  // backup exactly. Either way the data from before the import is kept as an undo snapshot.
  importAll(data, mode = 'merge') {
    const errors = validateBackup(data);
    if (errors.length) throw new Error(errors.join('\n'));
    const before = { version: 1, exportedAt: new Date().toISOString(), ...current() };
    try {
      localStorage.setItem(keys.snapshot, JSON.stringify(before));
    } catch {
      throw new Error('Not enough browser storage to keep an undo copy, so the import was cancelled. Export a backup first, then clear old data.');
    }
    saveAll(mode === 'replace' ? { ...EMPTY_DATA, ...data } : mergeData(before, data));
  },
  getSnapshot: () => read(keys.snapshot, null),
  restoreSnapshot() {
    const snap = read(keys.snapshot, null);
    if (!snap) throw new Error('There is no import to undo.');
    saveAll(snap);
    localStorage.removeItem(keys.snapshot);
  },
  discardSnapshot: () => localStorage.removeItem(keys.snapshot),

  // Replace local data with data that came from the account, without counting it as a local
  // change (so it isn't immediately sent back).
  applySynced(data) { saveAll({ ...EMPTY_DATA, ...data }, { silent: true }); },
  clearLocalData() { saveAll({ ...EMPTY_DATA }, { silent: true }); localStorage.removeItem(keys.drafts); localStorage.removeItem(keys.snapshot); },
};
