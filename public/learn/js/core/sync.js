// Backup validation and merging. Pure functions over plain data objects (the same shape as
// store.exportAll()), so they can be tested without a browser.

const isObj = v => v && typeof v === 'object' && !Array.isArray(v);

export const EMPTY_DATA = Object.freeze({
  customGoals: [], resourceOverrides: {}, progress: {}, notes: [], mastery: {}, timers: {}, settings: {}, deleted: { notes: [], goals: [] },
});

// Returns a list of problems; an empty list means the backup is safe to import.
export function validateBackup(data) {
  const errors = [];
  if (!isObj(data)) return ['This file is not a GoalForge backup (expected a JSON object).'];
  if (data.version !== 1) errors.push(`Unsupported backup version: ${JSON.stringify(data.version)}.`);
  const shapes = { customGoals: Array.isArray, resourceOverrides: isObj, progress: isObj, notes: Array.isArray, mastery: isObj, timers: isObj, settings: isObj, deleted: isObj };
  for (const [key, ok] of Object.entries(shapes)) {
    if (data[key] !== undefined && !ok(data[key])) errors.push(`“${key}” has the wrong format.`);
  }
  if (Array.isArray(data.customGoals)) {
    data.customGoals.forEach((g, i) => {
      if (!isObj(g) || typeof g.id !== 'string' || typeof g.name !== 'string' || !Array.isArray(g.schedule)) errors.push(`Custom goal #${i + 1} is incomplete.`);
    });
  }
  if (Array.isArray(data.notes)) {
    data.notes.forEach((n, i) => {
      if (!isObj(n) || typeof n.id !== 'string' || typeof n.text !== 'string') errors.push(`Note #${i + 1} is incomplete.`);
    });
  }
  return errors;
}

export function summarize(data) {
  const progress = Object.values(data.progress || {});
  return {
    exportedAt: data.exportedAt || null,
    completedDays: progress.filter(p => p?.completed && p.dayId).length,
    completedItems: progress.filter(p => p?.completed && (p.resourceId || p.lessonId)).length,
    ratings: Object.keys(data.mastery || {}).length,
    notes: (data.notes || []).length,
    customGoals: (data.customGoals || []).length,
    customResources: Object.keys(data.resourceOverrides || {}).length,
  };
}

const stamp = p => p?.updatedAt || p?.completedAt || '';
const newer = (a, b, time) => (time(b) > time(a) ? b : a);

// Combine two datasets without losing work: for every record the more recently changed copy
// wins, notes and goals are unioned, and anything deleted on either side stays deleted.
export function mergeData(current, incoming) {
  const cur = { ...EMPTY_DATA, ...current };
  const inc = { ...EMPTY_DATA, ...incoming };
  const deleted = {
    notes: [...new Set([...(cur.deleted?.notes || []), ...(inc.deleted?.notes || [])])],
    goals: [...new Set([...(cur.deleted?.goals || []), ...(inc.deleted?.goals || [])])],
  };
  const deletedGoals = new Set(deleted.goals);
  const keepKey = key => !deletedGoals.has(key.split(':')[0]);

  const mergeMap = (a, b, pick) => {
    const out = { ...a };
    for (const [k, v] of Object.entries(b)) out[k] = k in out ? pick(out[k], v) : v;
    return Object.fromEntries(Object.entries(out).filter(([k]) => keepKey(k)));
  };

  const progress = mergeMap(cur.progress, inc.progress, (a, b) => newer(a, b, stamp));
  const mastery = mergeMap(cur.mastery, inc.mastery, (a, b) => {
    if ((b.lastReviewed || '') !== (a.lastReviewed || '')) return (b.lastReviewed || '') > (a.lastReviewed || '') ? b : a;
    return (b.reviewCount || 0) > (a.reviewCount || 0) ? b : a;
  });
  const timers = mergeMap(cur.timers, inc.timers, (a, b) => ({ ...a, seconds: Math.max(a.seconds || 0, b.seconds || 0), running: false }));

  const deletedNotes = new Set(deleted.notes);
  const notesById = new Map();
  for (const n of [...cur.notes, ...inc.notes]) if (!deletedNotes.has(n.id) && !deletedGoals.has(n.goalId)) notesById.set(n.id, n);

  const goalsById = new Map();
  for (const g of [...cur.customGoals, ...inc.customGoals]) {
    if (deletedGoals.has(g.id)) continue;
    const prev = goalsById.get(g.id);
    goalsById.set(g.id, prev ? newer(prev, g, x => x.updatedAt || '') : g);
  }

  const resourceOverrides = { ...inc.resourceOverrides, ...cur.resourceOverrides };
  for (const [id, r] of Object.entries(inc.resourceOverrides)) {
    if (cur.resourceOverrides[id] && (r.updatedAt || '') > (cur.resourceOverrides[id].updatedAt || '')) resourceOverrides[id] = r;
  }

  // Settings are per device (active goal, rest days taken); keep this device's, fill gaps.
  const settings = { ...inc.settings, ...cur.settings, shifts: { ...(inc.settings?.shifts || {}), ...(cur.settings?.shifts || {}) } };

  return {
    customGoals: [...goalsById.values()],
    resourceOverrides,
    progress,
    notes: [...notesById.values()],
    mastery,
    timers,
    settings,
    deleted,
  };
}
