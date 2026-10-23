import { seedGoals } from './data/goals.js';
import { seedResources } from './data/resources.js';
import { lessonById } from './data/lessons.js';
import { store, onStoreChange, onStoreError } from './core/storage.js';
import { mergeData, summarize, validateBackup } from './core/sync.js';
import { cloudLoad, cloudSave } from './core/cloud.js';
import { backupFileStatus, fileBackupSupported, linkBackupFile, reconnectBackupFile, unlinkBackupFile, writeBackupFile } from './core/backup-file.js';
import {
  addDays, applyShifts, buildCustomSchedule, catchUpShift, dayForDate, daysBetween, dueItems, focusMinutes, getGoalProgress,
  localISODate, neighborDay, restDayShift, reviewItems, setConfidenceState, streakForGoal, upcomingItems,
} from './core/model.js';
import {
  backupModal, goalModal, importModal, lessonModal, notesView, planModal, resourceModal, resourcesView, revisionView, shell, timelineView, todayView,
} from './components/render.js';

const TIMER_LIMIT = 90 * 60;
// The page is redrawn on every action; the browser's own scroll restoration fights that.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const seedResourceMap = Object.fromEntries(seedResources.map(r => [r.id, r]));

const state = {
  view: 'today', timelineFilter: 'all', resourceQuery: '', resourceScope: 'goal', noteQuery: '',
  selectedDate: localISODate(), expandedDayId: null, activeLessonId: null, modal: null,
  storageError: null, notice: null, backupStatus: { state: 'none' }, persisted: null,
  // Account sync: 'connecting' | 'synced' | 'saving' | 'offline' | 'error' | 'local' (no account API)
  cloud: { state: 'connecting' },
  drafts: store.getDrafts(),
};

function loadFromStore() {
  Object.assign(state, {
    settings: store.getSettings(), progress: store.getProgress(), mastery: store.getMastery(), notes: store.getNotes(),
    timers: store.getTimers(), customGoals: store.getCustomGoals(), customResources: store.getResourceOverrides(), deleted: store.getDeleted(),
  });
}
loadFromStore();

// ---------------------------------------------------------------------------------------------
// Derived data

const allGoals = () => [...seedGoals, ...state.customGoals];
const resources = () => ({ ...seedResourceMap, ...state.customResources });
const baseGoal = () => allGoals().find(g => g.id === state.settings.activeGoalId) || allGoals()[0];
const shiftsFor = id => state.settings.shifts?.[id] || [];
const activeGoal = () => { const g = baseGoal(); return applyShifts(g, shiftsFor(g.id)); };
const goalResourceIds = goal => [...new Set([...(goal.resourceIds || []), ...goal.schedule.flatMap(d => d.resourceIds || [])])];

function reviewQueue(goal) {
  const res = resources();
  const describe = (kind, id) => {
    if (kind === 'pattern') { const p = goal.patterns.find(x => String(x.number) === id); return p && { title: `P${p.number} · ${p.name}`, subtitle: 'whole pattern' }; }
    if (kind === 'resource') { const r = res[id]; return r && { title: r.title, subtitle: r.pattern || r.kind, url: r.leetcode || r.url }; }
    const l = lessonById(goal, id, res);
    return l && { title: `${l.title} (day ${l.dayIndex})`, subtitle: l.stage };
  };
  const items = reviewItems(goal, state.mastery, describe);
  return { queue: dueItems(items), upcoming: upcomingItems(items) };
}

function backupInfo() {
  const meta = store.getMeta();
  const last = [meta.lastExportAt, meta.lastFileBackupAt].filter(Boolean).sort().at(-1) || null;
  const age = last ? daysBetween(localISODate(new Date(last)), localISODate()) : Infinity;
  const synced = ['synced', 'saving', 'connecting'].includes(state.cloud.state);
  return { meta, state: state.backupStatus.state, cloud: state.cloud.state, last, stale: !synced && state.backupStatus.state !== 'connected' && age > 7 };
}

function banners(backup) {
  const out = [];
  if (state.cloud.state === 'offline') out.push({ tone: 'warn', html: 'You’re offline. Changes are kept on this device and will sync to your account when you’re back online.', actions: [{ action: 'sync-now', label: 'Try again' }] });
  if (state.cloud.state === 'error') out.push({ tone: 'error', html: `Couldn’t sync with your account: ${escapeHtml(state.cloud.message)}. Your changes are safe on this device.`, actions: [{ action: 'sync-now', label: 'Try again', primary: true }] });
  if (state.storageError) out.push({ tone: 'error', html: state.storageError, actions: [{ action: 'export', label: 'Export backup now', primary: true }], dismiss: 'dismiss-storage-error' });
  if (state.backupStatus.state === 'needs-permission') out.push({ tone: 'warn', html: `Auto-backup to <b>${escapeHtml(state.backupStatus.name)}</b> is paused until you reconnect it (browsers ask again after a restart).`, actions: [{ action: 'reconnect-backup', label: 'Reconnect', primary: true }] });
  if (state.backupStatus.state === 'error') out.push({ tone: 'error', html: `Auto-backup failed: ${escapeHtml(state.backupStatus.message)}`, actions: [{ action: 'open-backup', label: 'Fix it', primary: true }] });
  const snoozed = (backup.meta.reminderSnoozedUntil || '') >= localISODate();
  if (backup.stale && !snoozed && store.hasData()) {
    out.push({
      tone: 'warn',
      html: `Your progress is saved only in this browser. Last backup: <b>${backup.last ? `${daysBetween(localISODate(new Date(backup.last)), localISODate())} days ago` : 'never'}</b>.`,
      actions: [{ action: 'export', label: 'Export now', primary: true }, ...(fileBackupSupported() ? [{ action: 'open-backup', label: 'Turn on auto-backup' }] : [])],
      dismiss: 'snooze-backup',
    });
  }
  if (state.notice) out.push({ ...state.notice, dismiss: 'dismiss-notice' });
  return out;
}
const escapeHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------------------------------------------------------------------------------------------
// Render

function render() {
  const goal = activeGoal();
  const day = dayForDate(goal, state.selectedDate);
  if (day) state.selectedDate = day.date;
  const res = resources();
  const { queue, upcoming } = reviewQueue(goal);
  const today = localISODate();
  let content = '';
  if (state.view === 'today') {
    const progress = getGoalProgress(goal, state.progress, today);
    const catchUp = progress.delta < 0 ? catchUpShift(goal, state.progress, today) : null;
    const plan = {
      catchUp,
      catchUpEnd: catchUp ? applyShifts(goal, [catchUp]).schedule.at(-1).date : null,
      shiftedDays: shiftsFor(goal.id).reduce((n, s) => n + s.days, 0),
      plannedEnd: baseGoal().endDate,
      canRest: Boolean(restDayShift(goal, state.progress, today)),
      journal: !['local', 'connecting'].includes(state.cloud.state),
    };
    const stats = { progress, streak: streakForGoal(goal, state.progress, today), weekMinutes: focusMinutes(state.timers, goal.id, today) };
    content = todayView({ goal, progress: state.progress, mastery: state.mastery, resources: res, timers: state.timers, selectedDate: state.selectedDate, drafts: state.drafts, queue, upcoming, stats, plan });
  }
  if (state.view === 'timeline') content = timelineView({ goal, progress: state.progress, mastery: state.mastery, resources: res, filter: state.timelineFilter, expandedDayId: state.expandedDayId });
  if (state.view === 'revision') content = revisionView({ goal, mastery: state.mastery, queue, upcoming });
  if (state.view === 'resources') content = resourcesView({ goal, resources: res, goalResourceIds: goalResourceIds(goal), progress: state.progress, mastery: state.mastery, query: state.resourceQuery, scope: state.resourceScope });
  if (state.view === 'notes') content = notesView({ goal, notes: state.notes, query: state.noteQuery, drafts: state.drafts });

  const backup = backupInfo();
  let html = shell({ goals: allGoals(), activeGoal: goal, view: state.view, content, banners: banners(backup), backup });
  html += modalHtml(goal);
  if (state.activeLessonId) {
    const lesson = lessonById(goal, state.activeLessonId, res);
    if (lesson) html += lessonModal({ lesson, goal, progress: state.progress, mastery: state.mastery, notes: state.notes, drafts: state.drafts });
    else state.activeLessonId = null;
  }

  const restore = captureUi();
  document.querySelector('#app').innerHTML = html;
  restore();
  if (state.modal?.type === 'plan') updatePlanPreview();
  if (state.view === 'timeline' && state.expandedDayId && restore.scrollToExpanded) document.querySelector('.day-wrap.open')?.scrollIntoView({ block: 'nearest' });
}

function modalHtml(goal) {
  const m = state.modal;
  if (!m) return '';
  if (m.type === 'goal') return goalModal(m.edit ? baseGoal() : null);
  if (m.type === 'resource') return resourceModal(m.id ? resources()[m.id] : null);
  if (m.type === 'plan') return planModal({ goal: baseGoal(), count: (baseGoal().resourceIds || []).length, hasProgress: Object.keys(state.progress).some(k => k.startsWith(goal.id + ':')) });
  if (m.type === 'backup') return backupModal({ status: state.backupStatus, meta: store.getMeta(), snapshot: store.getSnapshot(), persisted: state.persisted });
  if (m.type === 'import') return importModal({ fileName: m.fileName, incoming: summarize(m.data), current: summarize(store.exportAll()) });
  return '';
}

// Keep keyboard focus, text selection and scroll positions across a full re-render.
function captureUi() {
  const ae = document.activeElement;
  let selector = null;
  if (ae && ae !== document.body) {
    if (ae.id) selector = '#' + CSS.escape(ae.id);
    else if (ae.dataset?.action) selector = ['action', 'id', 'kind', 'color', 'view', 'filter', 'delta', 'scope'].filter(k => ae.dataset[k] !== undefined).map(k => `[data-${k}="${CSS.escape(ae.dataset[k])}"]`).join('');
  }
  const selection = ae && 'selectionStart' in ae ? [ae.selectionStart, ae.selectionEnd] : null;
  const scrolls = [...document.querySelectorAll('[data-keep-scroll]')].map(el => [el.dataset.keepScroll, el.scrollTop]);
  const winY = window.scrollY;
  const fn = () => {
    if (selector) {
      const el = document.querySelector(selector);
      if (el) { el.focus({ preventScroll: true }); if (selection && 'setSelectionRange' in el) try { el.setSelectionRange(...selection); } catch { /* not a text input */ } }
    }
    for (const [key, top] of scrolls) { const el = document.querySelector(`[data-keep-scroll="${key}"]`); if (el) el.scrollTop = top; }
    window.scrollTo(0, winY);
  };
  fn.scrollToExpanded = false;
  return fn;
}

// ---------------------------------------------------------------------------------------------
// Actions

const now = () => new Date().toISOString();
const saveSettings = () => store.setSettings(state.settings);

function toggleProgress(key, fields) {
  const cur = state.progress[key] || {};
  const completed = !cur.completed;
  state.progress[key] = { ...cur, ...fields, completed, completedAt: completed ? now() : null, completedOn: completed ? localISODate() : null, updatedAt: now() };
  store.setProgress(state.progress);
}

function addShift(shift) {
  if (!shift) return;
  const id = baseGoal().id;
  state.settings.shifts = { ...(state.settings.shifts || {}), [id]: [...shiftsFor(id), { ...shift, id: Date.now().toString(36), at: now() }] };
  saveSettings();
}

function saveCustomGoals() { store.setCustomGoals(state.customGoals); }
function updateCustomGoal(id, patch) {
  state.customGoals = state.customGoals.map(g => (g.id === id ? { ...g, ...patch, updatedAt: now() } : g));
  saveCustomGoals();
}

const val = id => document.getElementById(id)?.value ?? '';

const actions = {
  view: d => { state.view = d.view; state.activeLessonId = null; },
  'shift-day': d => { const next = neighborDay(activeGoal(), state.selectedDate, Number(d.delta)); if (next) { state.selectedDate = next.date; state.expandedDayId = next.id; } },
  'jump-today': () => { state.selectedDate = localISODate(); },
  'toggle-day': d => { const g = activeGoal(); toggleProgress(`${g.id}:${d.id}`, { goalId: g.id, dayId: d.id }); },
  'toggle-resource': d => { const g = activeGoal(); toggleProgress(`${g.id}:resource:${d.id}`, { goalId: g.id, resourceId: d.id }); },
  'toggle-lesson': d => { const g = activeGoal(); toggleProgress(`${g.id}:lesson:${d.id}`, { goalId: g.id, lessonId: d.id }); },
  rate: d => {
    const g = activeGoal();
    const key = `${g.id}:${d.kind}:${d.id}`;
    state.mastery[key] = setConfidenceState(state.mastery[key], d.color);
    store.setMastery(state.mastery);
  },
  'open-lesson': d => { state.activeLessonId = d.id; },
  'close-lesson': () => { state.activeLessonId = null; },
  'expand-day': d => { state.selectedDate = activeGoal().schedule.find(x => x.id === d.id)?.date || state.selectedDate; state.expandedDayId = state.expandedDayId === d.id ? null : d.id; },
  'work-day': d => { const day = activeGoal().schedule.find(x => x.id === d.id); if (day) { state.selectedDate = day.date; state.view = 'today'; } },
  filter: d => { state.timelineFilter = d.filter; },
  'res-scope': d => { state.resourceScope = d.scope; },

  'save-note': d => {
    const text = (state.drafts[d.draft] || '').trim();
    if (!text) return;
    state.notes.push({ id: crypto.randomUUID(), goalId: activeGoal().id, text, contextType: d.contextType, contextId: d.contextId || null, createdAt: now() });
    store.setNotes(state.notes);
    delete state.drafts[d.draft];
    store.setDrafts(state.drafts);
  },
  'delete-note': d => {
    if (!confirm('Delete this note?')) return false;
    state.notes = state.notes.filter(n => n.id !== d.id);
    store.setNotes(state.notes);
    state.deleted.notes = [...new Set([...state.deleted.notes, d.id])];
    store.setDeleted(state.deleted);
  },

  'timer-toggle': () => {
    const key = `${activeGoal().id}:${localISODate()}`;
    const t = state.timers[key] || { seconds: 0, running: false };
    if (!t.running && t.seconds >= TIMER_LIMIT) return false;
    state.timers[key] = { ...t, running: !t.running, lastTick: Date.now() };
    store.setTimers(state.timers);
  },
  'timer-reset': () => { state.timers[`${activeGoal().id}:${localISODate()}`] = { seconds: 0, running: false, lastTick: null }; store.setTimers(state.timers); },

  'take-rest': () => { addShift(restDayShift(activeGoal(), state.progress, localISODate())); },
  'catch-up': () => { addShift(catchUpShift(activeGoal(), state.progress, localISODate())); state.selectedDate = localISODate(); },
  'undo-shift': () => {
    const id = baseGoal().id;
    state.settings.shifts = { ...state.settings.shifts, [id]: shiftsFor(id).slice(0, -1) };
    saveSettings();
  },

  // Goals
  'new-goal': () => { state.modal = { type: 'goal' }; },
  'edit-goal': () => { state.modal = { type: 'goal', edit: true }; },
  'save-goal': () => {
    const name = val('goal-name').trim(), start = val('goal-start'), end = val('goal-end');
    const minutes = Math.max(5, Number(val('goal-minutes')) || 60);
    if (!name || !start || !end) { alert('Add a name, start date, and target date.'); return false; }
    if (end < start) { alert('The target date must be after the start date.'); return false; }
    const fields = { name, description: val('goal-description').trim() || 'Custom learning goal.', startDate: start, endDate: end, dailyMinutes: minutes };
    if (state.modal.edit) updateCustomGoal(baseGoal().id, fields);
    else {
      const g = { id: `custom-${Date.now()}`, ...fields, nextPhaseDate: null, source: 'custom', patterns: [], blocks: [], schedule: [], resourceIds: [], updatedAt: now() };
      state.customGoals.push(g);
      saveCustomGoals();
      state.settings.activeGoalId = g.id;
      saveSettings();
      state.resourceScope = 'all';
      state.view = 'resources';
    }
    state.modal = null;
  },
  'delete-goal': () => {
    const g = baseGoal();
    if (!confirm(`Delete “${g.name}” with its progress, ratings, notes and timer history? This cannot be undone (unless you have a backup).`)) return false;
    const prefix = g.id + ':';
    const strip = obj => Object.fromEntries(Object.entries(obj).filter(([k]) => !k.startsWith(prefix)));
    state.progress = strip(state.progress); store.setProgress(state.progress);
    state.mastery = strip(state.mastery); store.setMastery(state.mastery);
    state.timers = strip(state.timers); store.setTimers(state.timers);
    state.notes = state.notes.filter(n => n.goalId !== g.id); store.setNotes(state.notes);
    state.customGoals = state.customGoals.filter(x => x.id !== g.id); saveCustomGoals();
    state.deleted.goals = [...new Set([...state.deleted.goals, g.id])]; store.setDeleted(state.deleted);
    const { [g.id]: _, ...shifts } = state.settings.shifts || {};
    state.settings = { ...state.settings, shifts, activeGoalId: seedGoals[0].id };
    saveSettings();
    state.modal = null;
    state.view = 'today';
  },
  'goal-select': (d, el) => { state.settings.activeGoalId = el.value; saveSettings(); state.selectedDate = localISODate(); state.expandedDayId = null; state.activeLessonId = null; },

  // Resources
  'add-resource': () => { state.modal = { type: 'resource' }; },
  'edit-resource': d => { state.modal = { type: 'resource', id: d.id }; },
  'save-resource': () => {
    const title = val('res-title').trim(), url = val('res-url').trim();
    if (!title) { alert('Give the resource a title.'); return false; }
    if (url && !/^https?:\/\//i.test(url)) { alert('Links must start with http:// or https://'); return false; }
    const id = state.modal.id || `res-${Date.now().toString(36)}`;
    const topic = val('res-topic').trim();
    state.customResources = { ...state.customResources, [id]: { id, title, url, kind: val('res-kind'), difficulty: val('res-difficulty') || null, pattern: topic, tags: topic ? [topic] : [], custom: true, updatedAt: now() } };
    store.setResourceOverrides(state.customResources);
    const g = baseGoal();
    if (!state.modal.id && g.source === 'custom') updateCustomGoal(g.id, { resourceIds: [...(g.resourceIds || []), id] });
    state.modal = null;
  },
  'delete-resource': d => {
    if (!confirm('Delete this resource? It is removed from every goal that uses it.')) return false;
    const { [d.id]: _, ...rest } = state.customResources;
    state.customResources = rest;
    store.setResourceOverrides(rest);
    state.customGoals = state.customGoals.map(g => ({ ...g, resourceIds: (g.resourceIds || []).filter(x => x !== d.id) }));
    saveCustomGoals();
  },
  'toggle-goal-resource': d => {
    const g = baseGoal();
    const ids = g.resourceIds || [];
    updateCustomGoal(g.id, { resourceIds: ids.includes(d.id) ? ids.filter(x => x !== d.id) : [...ids, d.id] });
  },
  'plan-builder': () => { state.modal = { type: 'plan' }; },
  'generate-plan': () => {
    const g = baseGoal();
    try {
      const { schedule, blocks } = buildCustomSchedule({ goalId: g.id, resources: resources(), ...readPlanForm(g) });
      updateCustomGoal(g.id, { schedule, blocks, endDate: schedule.at(-1)?.date || g.endDate });
      const { [g.id]: _, ...shifts } = state.settings.shifts || {};
      state.settings.shifts = shifts;
      saveSettings();
      state.modal = null;
      state.view = 'today';
      state.selectedDate = localISODate();
    } catch (err) { alert(err.message); return false; }
  },

  // Backup & data
  export: () => exportBackup(),
  import: () => { const input = document.getElementById('import-file'); input.value = ''; input.click(); return false; },
  'import-merge': () => runImport('merge'),
  'import-replace': () => {
    if (!confirm('Replace everything on this device with the backup? (You can undo it from Backup & data.)')) return false;
    return runImport('replace');
  },
  'open-backup': async () => { await refreshBackupStatus(); state.persisted = (await navigator.storage?.persisted?.()) ?? null; state.modal = { type: 'backup' }; },
  'link-backup-file': async () => {
    try {
      const name = await linkBackupFile(store.exportAll());
      store.updateMeta({ lastFileBackupAt: now() });
      state.backupStatus = { state: 'connected', name };
    } catch (err) { if (err?.name !== 'AbortError') alert(`Could not set up the backup file: ${err.message}`); }
  },
  'reconnect-backup': async () => {
    if (await reconnectBackupFile()) { await backupNow(); await refreshBackupStatus(); }
  },
  'unlink-backup': async () => { await unlinkBackupFile(); state.backupStatus = { state: 'none' }; },
  'undo-import': () => {
    if (!confirm('Restore your data from before the last import? Changes made since then are lost.')) return false;
    store.restoreSnapshot();
    loadFromStore();
    state.notice = { tone: 'info', html: 'Restored your data from before the import.' };
  },
  'discard-snapshot': () => { store.discardSnapshot(); },
  'request-persist': async () => { state.persisted = (await navigator.storage?.persist?.()) ?? null; },
  'snooze-backup': () => { store.updateMeta({ reminderSnoozedUntil: addDays(localISODate(), 3) }); },
  'dismiss-storage-error': () => { state.storageError = null; },
  'dismiss-notice': () => { state.notice = null; },
  'close-modal': () => { state.modal = null; },
  'sync-now': () => syncNow(),
};

async function act(name, data, el) {
  const fn = actions[name];
  if (!fn) return;
  const result = await fn(data, el);
  if (result !== false) render();
}

function readPlanForm(goal) {
  return {
    resourceIds: goal.resourceIds || [],
    startDate: val('plan-start') || localISODate(),
    perDay: Math.max(1, Math.min(10, Number(val('plan-per-day')) || 1)),
    studyWeekdays: [...document.querySelectorAll('input[name="plan-day"]:checked')].map(x => Number(x.value)),
    reviewEvery: Math.max(0, Number(val('plan-review')) || 0),
    minutes: Math.max(5, Number(val('plan-minutes')) || 60),
  };
}

function updatePlanPreview() {
  const out = document.getElementById('plan-preview');
  if (!out) return;
  const g = baseGoal();
  try {
    const { schedule } = buildCustomSchedule({ goalId: g.id, resources: resources(), ...readPlanForm(g) });
    if (!schedule.length) { out.textContent = ''; return; }
    const reviews = schedule.filter(d => d.type === 'revision').length;
    const end = schedule.at(-1).date;
    out.innerHTML = `${schedule.length} days (${reviews} review day${reviews === 1 ? "" : "s"}), ending <b>${new Date(end + 'T12:00:00').toDateString()}</b>${g.endDate && end > g.endDate ? ' — after your target date' : ''}.`;
  } catch (err) { out.textContent = err.message; }
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(store.exportAll(), null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `goalforge-backup-${localISODate()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  store.updateMeta({ lastExportAt: now() });
}

function runImport(mode) {
  try {
    store.importAll(state.modal.data, mode);
  } catch (err) { alert(err.message); return false; }
  loadFromStore();
  state.modal = null;
  state.notice = { tone: 'info', html: `Backup ${mode === 'merge' ? 'merged' : 'restored'}. Changed your mind? <b>Backup &amp; data → Undo last import</b>.` };
}

document.getElementById('import-file').addEventListener('change', async e => {
  const file = e.target.files[0];
  if (!file) return;
  let data;
  try { data = JSON.parse(await file.text()); } catch { alert('That file is not valid JSON, so it cannot be a GoalForge backup.'); return; }
  const errors = validateBackup(data);
  if (errors.length) { alert(`This backup can’t be imported:\n\n${errors.slice(0, 8).join('\n')}`); return; }
  state.modal = { type: 'import', data, fileName: file.name };
  render();
});

// ---------------------------------------------------------------------------------------------
// Events: one listener per event type, routed by data-action.

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const link = e.target.closest('a');
  if (link && el.contains(link) && link !== el) return; // let links inside clickable rows open
  if (el.dataset.action === 'backdrop') { if (e.target === el) act(el.dataset.close, {}, el); return; }
  e.stopPropagation();
  act(el.dataset.action, el.dataset, el);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && (state.modal || state.activeLessonId)) {
    if (state.modal) state.modal = null; else state.activeLessonId = null;
    render();
    return;
  }
  const el = e.target;
  if ((e.key === 'Enter' || e.key === ' ') && el.dataset?.action && el.getAttribute('role') === 'button') {
    e.preventDefault();
    act(el.dataset.action, el.dataset, el);
  }
});

let draftTimer;
const flushDrafts = () => { clearTimeout(draftTimer); store.setDrafts(state.drafts); };
// Save unsent note text right away if the tab is hidden or closed.
window.addEventListener('pagehide', flushDrafts);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushDrafts(); });
document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.draftInput) {
    state.drafts[el.dataset.draftInput] = el.value;
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => store.setDrafts(state.drafts), 400);
  } else if (el.dataset.input === 'resource-search') { state.resourceQuery = el.value; render(); }
  else if (el.dataset.input === 'notes-search') { state.noteQuery = el.value; render(); }
  else if (el.dataset.input === 'plan-preview') updatePlanPreview();
});

document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.change) act(el.dataset.change, el.dataset, el);
});

// ---------------------------------------------------------------------------------------------
// Storage errors and automatic backup

onStoreError(message => { state.storageError = message; render(); });

let backupTimer;
let cloudTimer;
onStoreChange(() => {
  if (['synced', 'saving', 'offline', 'error'].includes(state.cloud.state)) {
    clearTimeout(cloudTimer);
    cloudTimer = setTimeout(pushToCloud, 1500);
  }
});

onStoreChange(() => {
  if (state.backupStatus.state !== 'connected') return;
  clearTimeout(backupTimer);
  backupTimer = setTimeout(backupNow, 2500);
});

async function backupNow() {
  try {
    if (await writeBackupFile(store.exportAll())) store.updateMeta({ lastFileBackupAt: now() });
    else await refreshBackupStatus();
  } catch (err) {
    state.backupStatus = { state: 'error', message: err.message || 'the file could not be written' };
  }
  render();
}

async function refreshBackupStatus() {
  try { state.backupStatus = await backupFileStatus(); } catch { state.backupStatus = { state: 'none' }; }
}

// ---------------------------------------------------------------------------------------------
// Focus timer

// A timer left running when the tab was closed is paused at its last value, instead of
// counting all the time the app was closed as focus time.
for (const [key, t] of Object.entries(state.timers)) {
  if (t.running && Date.now() - (t.lastTick || 0) > 15000) state.timers[key] = { ...t, running: false };
}

setInterval(() => {
  let stopped = false;
  for (const [key, t] of Object.entries(state.timers)) {
    if (!t.running) continue;
    const nowMs = Date.now();
    const delta = Math.max(0, Math.floor((nowMs - (t.lastTick || nowMs)) / 1000));
    if (!delta) continue;
    const seconds = Math.min(TIMER_LIMIT, t.seconds + delta);
    const running = seconds < TIMER_LIMIT;
    state.timers[key] = { ...t, seconds, running, lastTick: t.lastTick + delta * 1000 };
    if (!running) stopped = true;
  }
  if (!Object.values(state.timers).some(t => t.running) && !stopped) return;
  store.setTimers(state.timers);
  if (stopped) { render(); return; }
  const t = state.timers[`${activeGoal().id}:${localISODate()}`];
  const display = document.getElementById('timer-display');
  if (t && display) {
    display.textContent = `${String(Math.floor(t.seconds / 60)).padStart(2, '0')}:${String(t.seconds % 60).padStart(2, '0')}`;
    const bar = document.querySelector('.timer-bar span');
    if (bar) bar.style.width = `${Math.min(100, (t.seconds / TIMER_LIMIT) * 100)}%`;
  }
}, 1000);

// ---------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------
// Account sync

const sameData = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const dataOnly = d => { const { version, app, exportedAt, ...rest } = d || {}; return rest; };

function applyFromCloud(remote) {
  const local = dataOnly(store.exportAll());
  const merged = mergeData(local, dataOnly(remote));
  if (!sameData(merged, local)) {
    store.applySynced(merged);
    loadFromStore();
  }
  return merged;
}

async function connectCloud() {
  const res = await cloudLoad();
  if (res.state === 'unavailable') { state.cloud = { state: 'local' }; return render(); }
  if (res.state === 'signed-out') { location.href = '/login?next=/learn'; return; }
  if (res.state !== 'ok') { state.cloud = res; return render(); }
  // Another person used GoalForge in this browser before: start from their account, not the
  // previous person's local data.
  const meta = store.getMeta();
  if (meta.cloudUserId && meta.cloudUserId !== res.userId) {
    store.clearLocalData();
    loadFromStore();
    state.drafts = {};
  }
  store.updateMeta({ cloudUserId: res.userId });
  const merged = res.data ? applyFromCloud(res.data) : dataOnly(store.exportAll());
  state.cloud = { state: 'synced', at: new Date().toISOString() };
  render();
  if (!res.data || !sameData(merged, dataOnly(res.data))) await pushToCloud();
}

async function pushToCloud() {
  clearTimeout(cloudTimer);
  state.cloud = { ...state.cloud, state: 'saving' };
  const res = await cloudSave(store.exportAll());
  if (res.state === 'signed-out') { location.href = '/login?next=/learn'; return; }
  if (res.state !== 'ok') { state.cloud = res; render(); return; }
  applyFromCloud(res.data);
  state.cloud = { state: 'synced', at: new Date().toISOString() };
  render();
}

async function syncNow() {
  if (state.cloud.state === 'local') return false;
  const res = await cloudLoad();
  if (res.state === 'ok') {
    const merged = res.data ? applyFromCloud(res.data) : null;
    if (!res.data || !sameData(merged, dataOnly(res.data))) await pushToCloud();
    else state.cloud = { state: 'synced', at: new Date().toISOString() };
  }
  else if (res.state === 'signed-out') location.href = '/login?next=/learn';
  else state.cloud = res;
}

window.addEventListener('online', () => { if (['offline', 'error'].includes(state.cloud.state)) syncNow().then(render); });
document.addEventListener('visibilitychange', () => {
  // Pick up changes made on another device when you come back to this tab.
  if (document.visibilityState === 'visible' && state.cloud.state === 'synced') syncNow().then(render);
});

render();
connectCloud();
refreshBackupStatus().then(render);
navigator.storage?.persisted?.().then(p => { state.persisted = p; });
