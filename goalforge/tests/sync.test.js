import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeData, summarize, validateBackup } from '../../public/learn/js/core/sync.js';

test('validation rejects files that are not GoalForge backups', () => {
  assert.ok(validateBackup(null).length);
  assert.ok(validateBackup([]).length);
  assert.ok(validateBackup({ version: 2 }).length);
  assert.ok(validateBackup({ version: 1, progress: [] }).length);
  assert.ok(validateBackup({ version: 1, notes: [{ text: 'no id' }] }).length);
  assert.ok(validateBackup({ version: 1, customGoals: [{ id: 'x' }] }).length);
  assert.deepEqual(validateBackup({ version: 1, progress: {}, notes: [], mastery: {} }), []);
});

test('merge keeps the newer copy of each record from both sides', () => {
  const current = {
    progress: {
      'g:d1': { completed: true, completedAt: '2026-01-05T10:00:00Z', updatedAt: '2026-01-05T10:00:00Z' },
      'g:d2': { completed: false, completedAt: null, updatedAt: '2026-01-09T10:00:00Z' },
    },
    mastery: { 'g:resource:a': { color: 'red', lastReviewed: '2026-01-02', reviewCount: 1 } },
    notes: [{ id: 'n1', goalId: 'g', text: 'mine' }],
    timers: { 'g:2026-01-05': { seconds: 600 } },
  };
  const incoming = {
    progress: {
      'g:d2': { completed: true, completedAt: '2026-01-08T10:00:00Z', updatedAt: '2026-01-08T10:00:00Z' },
      'g:d3': { completed: true, completedAt: '2026-01-07T10:00:00Z' },
    },
    mastery: { 'g:resource:a': { color: 'green', lastReviewed: '2026-01-06', reviewCount: 2 } },
    notes: [{ id: 'n2', goalId: 'g', text: 'theirs' }],
    timers: { 'g:2026-01-05': { seconds: 900, running: true } },
  };
  const m = mergeData(current, incoming);
  assert.equal(m.progress['g:d1'].completed, true, 'kept from this device');
  assert.equal(m.progress['g:d2'].completed, false, 'un-ticked here later than it was ticked there');
  assert.equal(m.progress['g:d3'].completed, true, 'added from the backup');
  assert.equal(m.mastery['g:resource:a'].color, 'green');
  assert.deepEqual(m.notes.map(n => n.id).sort(), ['n1', 'n2']);
  assert.deepEqual(m.timers['g:2026-01-05'], { seconds: 900, running: false });
});

test('deleted notes and goals stay deleted after a merge', () => {
  const current = { notes: [{ id: 'n1', goalId: 'g', text: 'a' }], deleted: { notes: ['n2'], goals: ['custom-1'] }, customGoals: [] };
  const incoming = {
    notes: [{ id: 'n2', goalId: 'g', text: 'deleted here' }, { id: 'n3', goalId: 'custom-1', text: 'goal deleted' }],
    customGoals: [{ id: 'custom-1', name: 'Old', schedule: [] }, { id: 'custom-2', name: 'New', schedule: [] }],
    progress: { 'custom-1:d1': { completed: true } },
  };
  const m = mergeData(current, incoming);
  assert.deepEqual(m.notes.map(n => n.id), ['n1']);
  assert.deepEqual(m.customGoals.map(g => g.id), ['custom-2']);
  assert.equal(m.progress['custom-1:d1'], undefined);
});

test('this device keeps its own rest days and active goal', () => {
  const m = mergeData({ settings: { activeGoalId: 'a', shifts: { a: [{ from: '2026-01-02', days: 1 }] } } }, { settings: { activeGoalId: 'b', shifts: { a: [], b: [{ from: '2026-01-03', days: 2 }] } } });
  assert.equal(m.settings.activeGoalId, 'a');
  assert.equal(m.settings.shifts.a.length, 1);
  assert.equal(m.settings.shifts.b.length, 1);
});

test('summary counts what a backup contains', () => {
  const s = summarize({ exportedAt: 'x', progress: { a: { completed: true, dayId: 'd' }, b: { completed: true, resourceId: 'r' }, c: { completed: false, dayId: 'e' } }, mastery: { m: {} }, notes: [{}, {}] });
  assert.deepEqual(s, { exportedAt: 'x', completedDays: 1, completedItems: 1, ratings: 1, notes: 2, customGoals: 0, customResources: 0 });
});
