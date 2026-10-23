// Checks on the DSA plan data itself (js/data/*.js).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { seedGoals } from '../../public/learn/js/data/goals.js';
import { seedResources } from '../../public/learn/js/data/resources.js';
import { lessonForDay } from '../../public/learn/js/data/lessons.js';
import { daysBetween } from '../../public/learn/js/core/model.js';

const goal = seedGoals.find(g => g.id === 'dsa-patterns-2026');
const R = Object.fromEntries(seedResources.map(r => [r.id, r]));
const CUTOFF = '2026-10-26';
const future = goal.schedule.filter(d => d.date >= CUTOFF);

// NeetCode's own category for each of our 17 patterns.
const CATEGORY_TO_PATTERNS = {
  'Arrays & Hashing': [1], 'Two Pointers': [2], 'Sliding Window': [3], Stack: [4, 10], 'Binary Search': [5], 'Linked List': [6],
  Trees: [7, 8], 'Heap / Priority Queue': [9], Intervals: [9], Backtracking: [10], Tries: [10], Graphs: [11], 'Advanced Graphs': [12],
  '1-D Dynamic Programming': [13], '2-D Dynamic Programming': [14], Greedy: [15], 'Bit Manipulation': [16], 'Math & Geometry': [17],
};

test('the catalog is the NeetCode 150 and every problem sits in its real category', () => {
  assert.equal(seedResources.length, 150);
  for (const r of seedResources) {
    assert.ok(CATEGORY_TO_PATTERNS[r.neetcodeCategory]?.includes(r.patternNumber), `${r.title} is NeetCode “${r.neetcodeCategory}” but filed under P${r.patternNumber} ${r.pattern}`);
    assert.equal(r.pattern, goal.patterns.find(p => p.number === r.patternNumber).name);
    assert.match(r.video, /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/, `${r.title} has a solution video`);
  }
  assert.equal(seedResources.filter(r => r.patternNumber === 16).length, 7);
  assert.equal(seedResources.filter(r => r.patternNumber === 17).length, 8);
});

test('days that already happened are exactly as they were', () => {
  const original = JSON.parse(fs.readFileSync(new URL('./fixtures/original-past-days.json', import.meta.url)));
  const now = goal.schedule.filter(d => d.date < CUTOFF).map(({ id, date, type, blockId, patternNumber, resourceIds }) => ({ id, date, type, blockId, patternNumber, resourceIds }));
  assert.deepEqual(now, original);
});

test('the calendar is continuous, ids are unique, and it still ends on Jan 11', () => {
  const dates = goal.schedule.map(d => d.date);
  for (let i = 1; i < dates.length; i++) assert.equal(daysBetween(dates[i - 1], dates[i]), 1, `gap or duplicate after ${dates[i - 1]}`);
  assert.equal(new Set(goal.schedule.map(d => d.id)).size, goal.schedule.length);
  assert.equal(dates.at(-1), '2027-01-11');
  assert.equal(goal.endDate, '2027-01-11');
  for (const holiday of ['2026-11-26', '2026-12-25', '2027-01-01']) assert.equal(goal.schedule.find(d => d.date === holiday).type, 'rest', holiday);
});

test('every problem is studied in its own pattern week', () => {
  for (const r of seedResources) {
    const studied = goal.schedule.some(d => d.type === 'study' && d.patternNumber === r.patternNumber && d.resourceIds.includes(r.id));
    assert.ok(studied, `${r.title} (P${r.patternNumber}) never appears in a P${r.patternNumber} study day`);
  }
  for (let n = 1; n <= 17; n++) assert.ok(goal.blocks.some(b => b.patternNumber === n), `pattern ${n} has a block`);
});

test('upcoming days: at most one Hard, time plans add up to 90 minutes', () => {
  for (const d of future.filter(x => ['study', 'revision', 'bridge'].includes(x.type))) {
    assert.ok(d.resourceIds.filter(id => R[id].difficulty === 'Hard').length <= 1, `${d.id} has two Hard problems`);
    const minutes = [...d.plan.matchAll(/(\d+)m\b/g)].reduce((n, m) => n + Number(m[1]), 0);
    assert.equal(minutes, 90, `${d.id} plan adds up to ${minutes}m`);
    assert.equal(d.plannedMinutes, 90);
  }
});

test('upcoming days: no problem comes back within 3 days, and roles match patterns', () => {
  const seen = {};
  for (const d of goal.schedule.filter(x => x.date >= '2026-10-19')) {
    for (const id of d.resourceIds) {
      if (seen[id] && d.date >= CUTOFF) assert.ok(daysBetween(seen[id], d.date) >= 3, `${R[id].title} repeats ${seen[id]} → ${d.date}`);
      seen[id] = d.date;
    }
  }
  for (const d of future.filter(x => x.type === 'study')) {
    for (const id of d.resourceIds) {
      const role = d.roles[id];
      if (role === 'review') assert.notEqual(R[id].patternNumber, d.patternNumber, `${d.id} review should come from an older pattern`);
      else assert.equal(R[id].patternNumber, d.patternNumber, `${d.id}: ${R[id].title} is not ${d.patternNumber}`);
    }
  }
});

test('every study day has a real lesson, including the new patterns', () => {
  for (const d of goal.schedule.filter(x => x.type === 'study')) {
    const lesson = lessonForDay(d, goal, R);
    assert.ok(lesson, `${d.id} has no lesson`);
    assert.ok(!lesson.html.includes('Lesson content unavailable'), `${d.id} lesson ${lesson.id} is missing`);
    assert.ok(lesson.links.every(l => !l.url.includes('/results?')), `${d.id} links to a search page instead of a video`);
  }
  const bitDays = goal.schedule.filter(d => d.patternNumber === 16 && d.type === 'study').map(d => lessonForDay(d, goal, R));
  assert.deepEqual(bitDays.map(l => l.stage), ['Foundations: from zero to a mental picture', 'Recognition: see the fingerprint in the wording', 'Invariant, template & complexity', 'Mastery: instant recognition under pressure']);
});

test('a rest day inside a week does not shift the lesson stages', () => {
  const p11 = goal.schedule.filter(d => d.blockId === 'pattern-11' && d.type === 'study').map(d => lessonForDay(d, goal, R).id);
  assert.deepEqual(p11, ['p11-d1', 'p11-d2', 'p11-d3', 'p11-d4', 'p11-d5', 'p11-d6', 'p11-d7']);
});
