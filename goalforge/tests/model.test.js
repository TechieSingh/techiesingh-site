import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addDays, applyShifts, buildCustomSchedule, catchUpShift, dueItems, getGoalProgress, restDayShift, reviewItems,
  setConfidenceState, streakForGoal, upcomingItems,
} from '../../public/learn/js/core/model.js';

test('green reviews spread out 14 → 30 → 60 → 120 days and stay at 120', () => {
  let s = setConfidenceState({}, 'green', '2026-01-01');
  assert.equal(s.nextReview, '2026-01-15');
  const intervals = [s.interval];
  let date = '2026-01-01';
  for (let i = 0; i < 4; i++) {
    date = s.nextReview;
    s = setConfidenceState(s, 'green', date);
    intervals.push(s.interval);
  }
  assert.deepEqual(intervals, [14, 30, 60, 120, 120]);
});

test('red or yellow resets the green ladder', () => {
  let s = setConfidenceState({}, 'green', '2026-01-01');
  s = setConfidenceState(s, 'green', '2026-01-15'); // 30 days
  s = setConfidenceState(s, 'yellow', '2026-02-14');
  assert.equal(s.interval, 4);
  s = setConfidenceState(s, 'green', '2026-02-18');
  assert.equal(s.interval, 14);
  assert.equal(setConfidenceState(s, 'red', '2026-03-04').nextReview, '2026-03-05');
});

test('re-rating on the same day corrects the rating instead of climbing the ladder', () => {
  let s = setConfidenceState({}, 'green', '2026-01-01');
  s = setConfidenceState(s, 'green', '2026-01-15');
  assert.equal(s.interval, 30);
  s = setConfidenceState(s, 'green', '2026-01-15');
  s = setConfidenceState(s, 'green', '2026-01-15');
  assert.equal(s.interval, 30);
  assert.equal(s.reviewCount, 2);
  s = setConfidenceState(s, 'yellow', '2026-01-15');
  s = setConfidenceState(s, 'green', '2026-01-15');
  assert.equal(s.interval, 30, 'switching back to green on the same day restores the same step');
});

test('ratings saved by the old version (no streak) continue the ladder', () => {
  const legacy = { color: 'green', lastReviewed: '2026-01-01', nextReview: '2026-01-15', reviewCount: 1 };
  assert.equal(setConfidenceState(legacy, 'green', '2026-01-15').interval, 30);
});

test('every kind of rating reaches the queue, worst and most overdue first', () => {
  const goal = { id: 'g', patterns: [{ number: 1, name: 'Arrays' }] };
  const mastery = {
    'g:pattern:1': { color: 'green', nextReview: '2026-01-05' },
    'g:resource:two-sum': { color: 'yellow', nextReview: '2026-01-02' },
    'g:resource:old': { color: 'red', nextReview: '2026-01-09' },
    'g:lesson:p1-d1': { color: 'red', nextReview: '2026-01-03' },
    'g:resource:later': { color: 'yellow', nextReview: '2026-01-14' },
    'other:resource:x': { color: 'red', nextReview: '2026-01-01' },
    'g:resource:missing': { color: 'red', nextReview: '2026-01-01' },
  };
  const describe = (kind, id) => (id === 'missing' ? null : { title: `${kind}:${id}` });
  const items = reviewItems(goal, mastery, describe);
  assert.equal(items.length, 5, 'other goals and deleted items are excluded');
  const due = dueItems(items, '2026-01-10').map(x => x.key);
  assert.deepEqual(due, ['g:lesson:p1-d1', 'g:resource:old', 'g:resource:two-sum', 'g:pattern:1']);
  assert.deepEqual(upcomingItems(items, '2026-01-10').map(x => x.key), ['g:resource:later']);
});

const goal = () => ({
  id: 'g', endDate: '2026-03-05', blocks: [{ id: 'b1', start: '2026-03-01', end: '2026-03-05' }],
  schedule: ['01', '02', '03', '04', '05'].map((d, i) => ({ id: `d${i + 1}`, date: `2026-03-${d}`, type: 'study', blockId: 'b1', blockTitle: 'B1', resourceIds: [] })),
});

test('taking a rest day moves the rest of the plan by one day', () => {
  const g = goal();
  const shift = restDayShift(g, {}, '2026-03-03');
  assert.deepEqual(shift, { from: '2026-03-03', days: 1, reason: 'rest' });
  const shifted = applyShifts(g, [shift]);
  assert.deepEqual(shifted.schedule.map(d => `${d.date}:${d.id}`), ['2026-03-01:d1', '2026-03-02:d2', '2026-03-03:' + shifted.schedule[2].id, '2026-03-04:d3', '2026-03-05:d4', '2026-03-06:d5']);
  assert.equal(shifted.schedule[2].type, 'rest');
  assert.equal(shifted.endDate, '2026-03-06');
  assert.equal(shifted.blocks[0].end, '2026-03-06');
  assert.equal(restDayShift(g, { 'g:d3': { completed: true } }, '2026-03-03'), null, 'cannot skip a day already done');
});

test('catch-up moves the first missed day to today', () => {
  const g = goal();
  const progress = { 'g:d1': { completed: true } };
  const shift = catchUpShift(g, progress, '2026-03-04');
  assert.deepEqual(shift, { from: '2026-03-02', days: 2, reason: 'catch-up' });
  const shifted = applyShifts(g, [shift]);
  assert.equal(shifted.schedule.find(d => d.id === 'd2').date, '2026-03-04');
  assert.equal(getGoalProgress(shifted, progress, '2026-03-04').delta, 0, 'no longer behind');
  assert.equal(getGoalProgress(g, progress, '2026-03-04').delta, -2);
});

test('rest and buffer days do not count toward progress or break the streak', () => {
  const g = goal();
  g.schedule[2] = { ...g.schedule[2], type: 'rest', optional: true };
  const progress = { 'g:d1': { completed: true }, 'g:d2': { completed: true }, 'g:d4': { completed: true } };
  const p = getGoalProgress(g, progress, '2026-03-05');
  assert.equal(p.total, 4);
  assert.equal(p.completed, 3);
  assert.equal(p.delta, 0);
  assert.equal(streakForGoal(g, progress, '2026-03-05'), 3);
});

test('custom plans respect study weekdays, items per day and review days', () => {
  const resources = Object.fromEntries(['a', 'b', 'c', 'd', 'e'].map(id => [id, { id, title: id.toUpperCase() }]));
  // 2026-03-02 is a Monday. Study Mon/Wed/Fri, 2 per day, review after every 2 study days.
  const { schedule, blocks } = buildCustomSchedule({ goalId: 'c', resourceIds: ['a', 'b', 'c', 'd', 'e'], resources, startDate: '2026-03-01', perDay: 2, studyWeekdays: [1, 3, 5], reviewEvery: 2, minutes: 45 });
  assert.deepEqual(schedule.map(d => [d.date, d.type, d.resourceIds.join('')]), [
    ['2026-03-02', 'study', 'ab'],
    ['2026-03-04', 'study', 'cd'],
    ['2026-03-06', 'revision', 'ac'],
    ['2026-03-09', 'study', 'e'],
  ]);
  assert.equal(new Set(schedule.map(d => d.id)).size, schedule.length);
  assert.deepEqual(blocks.map(b => b.id), ['week-1', 'week-2']);
  assert.equal(schedule[0].plannedMinutes, 45);
  assert.throws(() => buildCustomSchedule({ goalId: 'c', resourceIds: ['a'], resources, startDate: '2026-03-01', studyWeekdays: [] }));
});

test('date helpers', () => {
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(addDays('2026-03-08', 1), '2026-03-09', 'daylight-saving change does not skip a day');
});
