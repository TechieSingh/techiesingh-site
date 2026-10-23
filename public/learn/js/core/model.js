// Pure planning and memory logic. Nothing here touches the DOM or localStorage, so it can be
// unit-tested with `npm test`.

// ---------------------------------------------------------------------------------------------
// Dates (local calendar dates as YYYY-MM-DD strings)

export function localISODate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
export function fmtDate(iso, opts = {}) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', ...opts }).format(new Date(iso + 'T12:00:00'));
}
export function fmtDay(iso) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(iso + 'T12:00:00'));
}
export function addDays(iso, days) {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return localISODate(d);
}
export function daysBetween(a, b) {
  return Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000);
}
export function weekday(iso) {
  return new Date(iso + 'T12:00:00').getDay(); // 0 = Sunday
}

// ---------------------------------------------------------------------------------------------
// Spaced repetition. Red and yellow come back soon; each consecutive green pushes the next
// review further out (14 → 30 → 60 → 120 days) instead of repeating every 14 days forever.

export const GREEN_LADDER = [14, 30, 60, 120];
export const confidenceMeta = {
  green: { label: 'Green', detail: 'Cold recognition + clean solve. Next review 14 days, then 30, 60, 120 while it stays green.', days: GREEN_LADDER[0] },
  yellow: { label: 'Yellow', detail: 'Recognize it, but need a hint / make key mistakes. Review again in 4 days.', days: 4 },
  red: { label: 'Red', detail: 'Cannot reliably recognize or derive it. Review again tomorrow.', days: 1 },
};
const COLOR_RANK = { red: 0, yellow: 1, green: 2 };

export function setConfidenceState(existing = {}, color, date = localISODate()) {
  const sameDay = existing.lastReviewed === date;
  // Re-rating on the same day corrects today's rating rather than counting as another review.
  const base = sameDay ? (existing.baseStreak ?? 0) : (existing.greenStreak ?? (existing.color === 'green' ? 1 : 0));
  const greenStreak = color === 'green' ? base + 1 : 0;
  const days = color === 'green' ? GREEN_LADDER[Math.min(greenStreak, GREEN_LADDER.length) - 1] : confidenceMeta[color].days;
  return {
    ...existing,
    color,
    lastReviewed: date,
    nextReview: addDays(date, days),
    interval: days,
    greenStreak,
    baseStreak: base,
    reviewCount: (existing.reviewCount || 0) + (sameDay ? 0 : 1),
  };
}

// Every rating — pattern, problem or lesson — becomes a review item for its goal.
// `describe(kind, id)` returns { title, subtitle?, url? } or null for items that no longer exist.
export function reviewItems(goal, mastery, describe) {
  const prefix = goal.id + ':';
  const items = [];
  for (const [key, state] of Object.entries(mastery)) {
    if (!key.startsWith(prefix) || !state?.nextReview) continue;
    const [kind, ...rest] = key.slice(prefix.length).split(':');
    if (!['pattern', 'resource', 'lesson'].includes(kind)) continue;
    const id = rest.join(':');
    const info = describe(kind, id);
    if (!info) continue;
    items.push({ key, kind, id, ...info, ...state });
  }
  return items;
}

export function dueItems(items, today = localISODate()) {
  return items
    .filter(x => x.nextReview <= today)
    .sort((a, b) => COLOR_RANK[a.color] - COLOR_RANK[b.color] || a.nextReview.localeCompare(b.nextReview) || a.title.localeCompare(b.title));
}

export function upcomingItems(items, today = localISODate(), withinDays = 7) {
  const limit = addDays(today, withinDays);
  return items.filter(x => x.nextReview > today && x.nextReview <= limit).sort((a, b) => a.nextReview.localeCompare(b.nextReview));
}

// ---------------------------------------------------------------------------------------------
// Rescheduling. A shift {from, days} moves every day dated `from` or later forward by `days`.
// The freed dates are shown as optional rest days, so the timeline stays honest.

export function applyShifts(goal, shifts = []) {
  if (!shifts.length || !goal.schedule?.length) return goal;
  let schedule = goal.schedule.map(d => ({ ...d }));
  for (const shift of shifts) {
    if (!shift.days) continue;
    const firstMoved = schedule.find(d => d.date >= shift.from);
    schedule = schedule.map(d => (d.date >= shift.from ? { ...d, date: addDays(d.date, shift.days), originalDate: d.originalDate || d.date } : d));
    for (let i = 0; i < shift.days; i++) {
      const date = addDays(shift.from, i);
      schedule.push({
        id: `${date}-shift-${shift.id || shift.from}-${i}`,
        date,
        type: 'rest',
        blockId: firstMoved?.blockId || 'rest',
        blockTitle: firstMoved?.blockTitle || 'Rest',
        patternNumber: null,
        topic: shift.reason === 'catch-up' ? 'Plan moved forward — this date was skipped' : 'Rest day (you took this day off)',
        resourceIds: [],
        plannedMinutes: 0,
        optional: true,
        synthetic: true,
      });
    }
    schedule.sort((a, b) => a.date.localeCompare(b.date) || (a.synthetic ? -1 : 0) - (b.synthetic ? -1 : 0));
  }
  const blocks = (goal.blocks || []).map(b => {
    const days = schedule.filter(d => d.blockId === b.id);
    return days.length ? { ...b, start: days[0].date, end: days.at(-1).date } : b;
  });
  const lastDate = schedule.at(-1).date;
  return { ...goal, schedule, blocks, endDate: lastDate > goal.endDate ? lastDate : goal.endDate, plannedEndDate: goal.endDate };
}

export function isRequired(day) {
  return !day.optional && day.type !== 'rest' && day.type !== 'buffer';
}

const dayKey = (goal, day) => `${goal.id}:${day.id}`;

// First required, incomplete day dated before today — what "catch up" would move to today.
export function firstMissedDay(goal, progress, today = localISODate()) {
  return goal.schedule.find(d => isRequired(d) && d.date < today && !progress[dayKey(goal, d)]?.completed) || null;
}

export function catchUpShift(goal, progress, today = localISODate()) {
  const missed = firstMissedDay(goal, progress, today);
  if (!missed) return null;
  return { from: missed.date, days: daysBetween(missed.date, today), reason: 'catch-up' };
}

export function restDayShift(goal, progress, date = localISODate()) {
  const day = goal.schedule.find(d => d.date === date);
  if (!day || !isRequired(day) || progress[dayKey(goal, day)]?.completed) return null;
  return { from: date, days: 1, reason: 'rest' };
}

// ---------------------------------------------------------------------------------------------
// Progress

export function getGoalProgress(goal, progress, today = localISODate()) {
  const required = goal.schedule.filter(isRequired);
  const completed = required.filter(d => progress[dayKey(goal, d)]?.completed).length;
  const expectedPast = required.filter(d => d.date < today).length;
  const total = required.length;
  const delta = completed - expectedPast;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const endDate = goal.schedule.at(-1)?.date || goal.endDate;
  const daysLeft = endDate ? Math.max(0, daysBetween(today, endDate)) : 0;
  return { total, completed, expectedPast, delta, percent, daysLeft, endDate };
}

// Consecutive completed required days, walking back from today. Rest and catch-up days are
// skipped, so taking a planned day off does not break the streak.
export function streakForGoal(goal, progress, today = localISODate()) {
  const days = goal.schedule.filter(d => isRequired(d) && d.date <= today);
  let i = days.length - 1;
  if (i >= 0 && days[i].date === today && !progress[dayKey(goal, days[i])]?.completed) i--;
  let streak = 0;
  for (; i >= 0 && progress[dayKey(goal, days[i])]?.completed; i--) streak++;
  return streak;
}

export function dayForDate(goal, date) {
  if (!goal.schedule?.length) return null;
  return goal.schedule.find(d => d.date === date) || goal.schedule.find(d => d.date > date) || goal.schedule.at(-1);
}

export function neighborDay(goal, date, delta) {
  const idx = goal.schedule.findIndex(d => d.date === date);
  if (idx < 0) return null;
  return goal.schedule[idx + delta] || null;
}

export function focusMinutes(timers, goalId, today = localISODate(), days = 7) {
  let seconds = 0;
  for (let i = 0; i < days; i++) seconds += timers[`${goalId}:${addDays(today, -i)}`]?.seconds || 0;
  return Math.round(seconds / 60);
}

// ---------------------------------------------------------------------------------------------
// Custom goals: turn an ordered list of resources into a dated plan.
//   perDay        resources per study day
//   studyWeekdays which weekdays have study (0 = Sunday … 6 = Saturday)
//   reviewEvery   after this many study days, insert a review day (0 = never)

export function buildCustomSchedule({ goalId, resourceIds, resources, startDate, perDay = 2, studyWeekdays = [1, 2, 3, 4, 5, 6], reviewEvery = 0, minutes = 60 }) {
  if (!resourceIds.length) return { schedule: [], blocks: [] };
  if (!studyWeekdays.length) throw new Error('Pick at least one study day of the week.');
  const schedule = [];
  let date = startDate;
  let index = 0;
  let studySinceReview = [];
  const nextStudyDate = () => {
    while (!studyWeekdays.includes(weekday(date))) date = addDays(date, 1);
    const d = date;
    date = addDays(date, 1);
    return d;
  };
  const weekOf = d => Math.floor(daysBetween(startDate, d) / 7) + 1;
  const titleOf = id => resources[id]?.title || id;
  while (index < resourceIds.length) {
    const ids = resourceIds.slice(index, index + perDay);
    index += ids.length;
    const d = nextStudyDate();
    const week = weekOf(d);
    schedule.push({
      id: `${d}-${goalId}-s${schedule.length + 1}`, date: d, type: 'study', blockId: `week-${week}`, blockTitle: `Week ${week}`,
      patternNumber: null, topic: ids.map(titleOf).join(' + '), plan: `${minutes} minutes: work through today's items, then rate how well you know each one.`,
      resourceIds: ids, roles: Object.fromEntries(ids.map(id => [id, 'new'])), plannedMinutes: minutes,
    });
    studySinceReview.push(ids);
    if (reviewEvery > 0 && studySinceReview.length >= reviewEvery && index < resourceIds.length) {
      const reviewIds = studySinceReview.map(x => x[0]).slice(0, Math.max(perDay, 1));
      const rd = nextStudyDate();
      const rweek = weekOf(rd);
      schedule.push({
        id: `${rd}-${goalId}-r${schedule.length + 1}`, date: rd, type: 'revision', blockId: `week-${rweek}`, blockTitle: `Week ${rweek}`,
        patternNumber: null, topic: 'Review: recall earlier items without notes',
        plan: `${minutes} minutes: redo these from memory first, then clear anything due in your review queue.`,
        resourceIds: reviewIds, roles: Object.fromEntries(reviewIds.map(id => [id, 'resolve'])), plannedMinutes: minutes,
      });
      studySinceReview = [];
    }
  }
  const blocks = [];
  for (const d of schedule) {
    const b = blocks.find(x => x.id === d.blockId);
    if (b) b.end = d.date;
    else blocks.push({ id: d.blockId, title: d.blockTitle, type: 'study', start: d.date, end: d.date });
  }
  return { schedule, blocks };
}
