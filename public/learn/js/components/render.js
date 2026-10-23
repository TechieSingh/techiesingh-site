// HTML rendering. Every function returns a string; app.js puts it on the page and handles
// clicks through data-action attributes (one delegated listener, no per-render binding).

import { confidenceMeta, dayForDate, daysBetween, fmtDate, fmtDay, isRequired, localISODate, neighborDay } from '../core/model.js';
import { lessonForDay } from '../data/lessons.js';

export const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
const safeUrl = u => (/^https?:\/\//i.test(String(u || '')) ? esc(u) : '#');
const icon = name => ({ today: '⌁', timeline: '☷', revision: '↻', resources: '◇', notes: '✎' }[name] || '•');
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const isCustom = goal => goal.source === 'custom';

function ago(iso) {
  if (!iso) return 'never';
  const days = daysBetween(localISODate(new Date(iso)), localISODate());
  return days <= 0 ? 'today' : days === 1 ? 'yesterday' : `${days} days ago`;
}

// ---------------------------------------------------------------------------------------------
// Shell

export function shell({ goals, activeGoal, view, content, banners, backup }) {
  const cloud = backup.cloud && backup.cloud !== 'local' ? backup.cloud : null;
  const CLOUD_TEXT = { synced: 'Synced to your account', saving: 'Saving…', connecting: 'Connecting…', offline: 'Offline — saved here', error: 'Sync problem', 'signed-out': 'Signed out' };
  const chipTone = cloud ? (['offline', 'error'].includes(cloud) ? 'warn' : 'ok') : backup.state === 'connected' ? 'ok' : backup.stale ? 'warn' : '';
  const chipText = cloud ? CLOUD_TEXT[cloud] || 'Synced' : backup.state === 'connected' ? 'Auto-backup on' : backup.last ? `Backed up ${ago(backup.last)}` : 'Not backed up';
  return `<div class="app-shell">
    <aside class="sidebar">
      <div class="brand"><span class="brand-mark">GF</span><div><strong>GoalForge</strong><small>learning OS</small></div></div>
      <nav>
        ${['today', 'timeline', 'revision', 'resources', 'notes'].map(v => `<button class="nav-item ${view === v ? 'active' : ''}" data-action="view" data-view="${v}"><span>${icon(v)}</span>${v[0].toUpperCase() + v.slice(1)}</button>`).join('')}
      </nav>
      ${cloud ? `<div class="site-links"><a href="/journal">✎ Journal</a><a href="/">⌂ techiesingh.com</a></div>` : ''}
      <button class="side-foot" data-action="open-backup"><span class="dot ${cloud ? (['offline', 'error'].includes(cloud) ? 'warn' : 'live') : backup.state === 'connected' ? 'live' : backup.stale ? 'warn' : ''}"></span> ${cloud ? (['offline', 'error'].includes(cloud) ? 'Saved on this device' : 'Synced to your account') : backup.state === 'connected' ? 'Saved here + backup file' : 'Saved in this browser'}</button>
    </aside>
    <main class="main">
      <header class="topbar">
        <div class="goal-picker">
          <label for="goal-select">Current goal</label>
          <div class="goal-picker-row">
            <select id="goal-select" data-change="goal-select">${goals.map(g => `<option value="${esc(g.id)}" ${g.id === activeGoal.id ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</select>
            ${isCustom(activeGoal) ? '<button class="btn ghost small" data-action="edit-goal">Edit goal</button>' : ''}
          </div>
        </div>
        <div class="top-actions">
          <button class="backup-chip ${chipTone}" data-action="open-backup" title="Backup and data">${chipText}</button>
          <button class="btn ghost" data-action="export">Export</button>
          <button class="btn ghost" data-action="import">Import</button>
          <button class="btn primary" data-action="new-goal">＋ New goal</button>
        </div>
      </header>
      ${banners.length ? `<div class="banners">${banners.map(bannerHtml).join('')}</div>` : ''}
      <section class="content">${content}</section>
    </main>
  </div>`;
}

function bannerHtml(b) {
  return `<div class="banner ${b.tone}" role="${b.tone === 'error' ? 'alert' : 'status'}"><p>${b.html}</p><div class="banner-actions">${(b.actions || []).map(a => `<button class="btn small ${a.primary ? 'primary' : 'ghost'}" data-action="${a.action}">${esc(a.label)}</button>`).join('')}${b.dismiss ? `<button class="icon-btn" data-action="${b.dismiss}" aria-label="Dismiss">×</button>` : ''}</div></div>`;
}

// ---------------------------------------------------------------------------------------------
// Today

export function todayView({ goal, progress, mastery, resources, timers, selectedDate, drafts, queue, upcoming, stats, plan }) {
  const today = localISODate();
  const viewing = selectedDate || today;
  const day = dayForDate(goal, viewing);
  const gp = stats.progress;
  const pace = gp.delta > 0 ? `${plural(gp.delta, 'day')} ahead` : gp.delta < 0 ? `${plural(Math.abs(gp.delta), 'day')} behind` : 'On track';
  const t = timers[`${goal.id}:${today}`] || { seconds: 0, running: false };
  const prev = day ? neighborDay(goal, day.date, -1) : null;
  const next = day ? neighborDay(goal, day.date, 1) : null;
  const heading = !day ? 'No scheduled days' : day.date === today ? 'Today' : day.date < today ? `Past · ${fmtDay(day.date)}` : `Upcoming · ${fmtDay(day.date)}`;
  return `<div class="page-head"><div><p class="eyebrow">${fmtDate(viewing, { weekday: 'long' })}</p><h1>${esc(goal.name)}</h1><p>${esc(goal.description)}</p></div>
    <div class="day-nav">
      <button class="btn ghost" data-action="shift-day" data-delta="-1" ${prev ? '' : 'disabled'} aria-label="Previous day">← Prev</button>
      <div class="date-pill">${fmtDate(day?.date || viewing)}</div>
      <button class="btn ghost" data-action="shift-day" data-delta="1" ${next ? '' : 'disabled'} aria-label="Next day">Next →</button>
      ${day && day.date !== today ? '<button class="btn small" data-action="jump-today">Jump to today</button>' : ''}
    </div>
  </div>
  ${planBanner(plan, gp)}
  <div class="stats-grid">
    <div class="stat"><span>Completion</span><strong>${gp.percent}%</strong><small>${gp.completed} / ${gp.total} study days</small></div>
    <div class="stat"><span>Pace</span><strong class="${gp.delta < 0 ? 'bad' : gp.delta > 0 ? 'good' : ''}">${pace}</strong><small>${gp.endDate ? `plan ends ${fmtDate(gp.endDate)}` : 'no plan yet'}</small></div>
    <div class="stat"><span>Streak</span><strong>${plural(stats.streak, 'day')}</strong><small>rest days don’t break it</small></div>
    <div class="stat"><span>Review due</span><strong class="${queue.length ? 'bad' : ''}">${queue.length}</strong><small>${upcoming.length} more in the next 7 days</small></div>
  </div>
  <div class="layout-2">
    <section class="panel hero-card">${dayPanel({ day, goal, progress, mastery, resources, heading, drafts, queue, plan })}</section>
    <aside class="stack">
      <section class="panel timer-card"><div class="panel-head"><div><p class="eyebrow">Focus session</p><h2>90-minute timer</h2></div><span class="dot ${t.running ? 'live' : ''}"></span></div>
        <div class="timer" id="timer-display">${String(Math.floor(t.seconds / 60)).padStart(2, '0')}:${String(t.seconds % 60).padStart(2, '0')}</div>
        <div class="timer-bar"><span style="width:${Math.min(100, (t.seconds / (90 * 60)) * 100)}%"></span></div>
        <div class="timer-actions"><button class="btn primary" id="timer-toggle" data-action="timer-toggle">${t.running ? 'Pause' : t.seconds >= 90 * 60 ? 'Done' : 'Start'}</button><button class="btn ghost" data-action="timer-reset">Reset</button></div>
        <small>Focused in the last 7 days: <b>${fmtMinutes(stats.weekMinutes)}</b></small></section>
      <section class="panel"><div class="panel-head"><h2>Review queue</h2><span>${queue.length} due</span></div>
        ${queue.length ? `${queue.slice(0, 6).map(item => queueRow(item)).join('')}${queue.length > 6 ? `<button class="text-btn" data-action="view" data-view="revision">See all ${queue.length} →</button>` : ''}` : '<p class="muted">Nothing due. Rate problems, lessons and patterns as you study — anything red or yellow comes back here automatically.</p>'}
      </section>
    </aside>
  </div>`;
}

const fmtMinutes = m => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`);

function planBanner(plan, gp) {
  const parts = [];
  if (plan.catchUp && plan.catchUp.days > 0) {
    parts.push(`<div class="plan-banner warn"><div><b>You’re ${plural(-gp.delta, 'day')} behind.</b> The first unfinished day is ${fmtDay(plan.catchUp.from)}. Move the rest of the plan so it starts today — the end date moves to ${fmtDate(plan.catchUpEnd)}.</div><button class="btn small primary" data-action="catch-up">Move plan to today</button></div>`);
  }
  if (plan.shiftedDays > 0) {
    parts.push(`<div class="plan-banner"><div>Plan moved by ${plural(plan.shiftedDays, 'day')} (rest days and catch-ups). It now ends <b>${fmtDate(gp.endDate)}</b> instead of ${fmtDate(plan.plannedEnd)}.</div><button class="btn small ghost" data-action="undo-shift">Undo last change</button></div>`);
  }
  return parts.join('');
}

const ROLE_LABEL = { resolve: 'Cold re-solve', review: 'Spaced review', revision: 'Cold revision', mixed: 'Unlabeled mix' };

function dayPanel({ day, goal, progress, mastery, resources, heading, drafts, queue, plan }) {
  if (!day) {
    return isCustom(goal)
      ? `<div class="empty-plan"><h2>No plan yet</h2><p class="muted">Add the things you want to learn in <b>Resources</b>, then build a dated plan from them.</p><div class="row-actions"><button class="btn ghost" data-action="view" data-view="resources">Open resources</button><button class="btn primary" data-action="plan-builder">Build plan</button></div></div>`
      : '<p class="muted">This goal has no schedule.</p>';
  }
  const today = localISODate();
  const dayState = progress[`${goal.id}:${day.id}`] || {};
  const required = isRequired(day);
  const pattern = day.patternNumber ? goal.patterns.find(p => p.number === day.patternNumber) : null;
  const lesson = lessonForDay(day, goal, resources);
  const res = (day.resourceIds || []).map(id => resources[id]).filter(Boolean);
  const topic = day.topic || day.focus || '';
  const showQueue = ['revision', 'bridge', 'buffer'].includes(day.type) && day.date <= today;

  let body;
  if (day.type === 'rest') {
    body = `<div class="rest-card"><span>☾</span><div><b>${esc(topic)}</b><p class="muted">No study planned. Your streak is safe.</p></div></div>`;
  } else {
    body = `${showQueue ? weakSpots(queue) : ''}
      <div class="problem-list">${lesson ? lessonCard(lesson, goal, progress, mastery) : ''}${res.length ? res.map(r => problemCard(r, goal, progress, mastery, day.roles?.[r.id], day.type)).join('') : day.type === 'buffer' ? '' : '<p class="muted">No linked resources on this day.</p>'}</div>`;
  }
  const canRest = required && day.date === today && !dayState.completed && plan.canRest;
  return `<div class="panel-head"><div><span class="badge ${day.type}">${day.type}</span><h2>${heading}</h2></div>
      ${required ? `<button class="check-btn ${dayState.completed ? 'done' : ''}" data-action="toggle-day" data-id="${esc(day.id)}">${dayState.completed ? '✓ Completed' : 'Mark day complete'}</button>` : ''}</div>
    <h3>${esc(day.blockTitle)}</h3><p class="focus">${esc(topic)}</p>
    ${day.plan ? `<p class="time-plan"><span>⏱</span>${esc(day.plan)}</p>` : ''}
    ${pattern ? `<div class="detector"><b>Pattern detector</b><span>${esc(pattern.detector)}</span></div>` : ''}
    ${body}
    ${plan.journal ? `<div class="journal-offer"><a class="btn small ghost" href="/journal/new?date=${esc(day.date)}">✎ Write about ${day.date === today ? 'today' : fmtDay(day.date)} in your journal</a></div>` : ''}
    ${canRest ? '<div class="rest-offer"><span class="muted">Can’t study today?</span><button class="text-btn" data-action="take-rest">Take today off and move the plan one day</button></div>' : ''}
    ${day.type !== 'rest' ? `<div class="note-box"><label for="quick-note">Notes for ${fmtDay(day.date)}</label>${draftArea('quick-note', `day:${day.id}`, drafts, 'What clue did you miss? What invariant finally clicked?')}<button class="btn small" data-action="save-note" data-draft="day:${esc(day.id)}" data-context-type="day" data-context-id="${esc(day.id)}">Save note</button></div>` : ''}`;
}

function weakSpots(queue) {
  if (!queue.length) return '<div class="weak-spots empty"><b>Your weak spots first</b><p class="muted">Nothing in your review queue — go straight to the planned problems.</p></div>';
  return `<div class="weak-spots"><b>Your weak spots first</b><p class="muted">These are due in your review queue. Do them before the planned problems.</p>${queue.slice(0, 4).map(item => queueRow(item)).join('')}</div>`;
}

export function draftArea(id, key, drafts, placeholder) {
  return `<textarea id="${id}" data-draft-input="${esc(key)}" placeholder="${esc(placeholder)}">${esc(drafts[key] || '')}</textarea>`;
}

function lights(kind, id, color) {
  return ['red', 'yellow', 'green'].map(c => `<button title="${esc(confidenceMeta[c].label + ': ' + confidenceMeta[c].detail)}" aria-label="Rate ${c}" class="light ${c} ${color === c ? 'selected' : ''}" data-action="rate" data-kind="${kind}" data-id="${esc(id)}" data-color="${c}"></button>`).join('');
}

function resourceLinks(r) {
  const links = [];
  if (r.leetcode) links.push(`<a href="${safeUrl(r.leetcode)}" target="_blank" rel="noopener" title="Open on LeetCode">LC</a>`);
  if (r.video) links.push(`<a href="${safeUrl(r.video)}" target="_blank" rel="noopener" title="NeetCode solution video">▶ Video</a>`);
  if (r.url) links.push(`<a href="${safeUrl(r.url)}" target="_blank" rel="noopener">Open</a>`);
  return links.join('');
}

function problemCard(r, goal, progress, mastery, role, dayType) {
  const pkey = `${goal.id}:resource:${r.id}`;
  const p = progress[pkey] || {};
  const m = mastery[pkey] || {};
  const hidePattern = role === 'review' || role === 'mixed' || dayType === 'bridge';
  const patternLine = hidePattern
    ? `<details class="reveal"><summary>Name the pattern first · reveal</summary>${esc(r.pattern || 'Resource')}</details>`
    : `<small>${esc(r.pattern || r.kind || 'Resource')}</small>`;
  return `<div class="problem-card"><button class="tiny-check ${p.completed ? 'done' : ''}" data-action="toggle-resource" data-id="${esc(r.id)}" aria-label="Mark ${esc(r.title)} done">${p.completed ? '✓' : '○'}</button>
    <div class="problem-main"><div><b>${esc(r.title)}</b>${r.difficulty ? `<span class="diff ${r.difficulty.toLowerCase()}">${esc(r.difficulty)}</span>` : ''}${ROLE_LABEL[role] ? `<span class="role-tag ${role}">${ROLE_LABEL[role]}</span>` : ''}</div>${patternLine}</div>
    <div class="resource-links">${resourceLinks(r)}</div>
    <div class="traffic compact">${lights('resource', r.id, m.color)}</div></div>`;
}

function lessonCard(lesson, goal, progress, mastery) {
  const pkey = `${goal.id}:lesson:${lesson.id}`;
  const p = progress[pkey] || {};
  const m = mastery[pkey] || {};
  return `<div class="problem-card lesson-card" data-action="open-lesson" data-id="${esc(lesson.id)}" role="button" tabindex="0"><button class="tiny-check ${p.completed ? 'done' : ''}" data-action="toggle-lesson" data-id="${esc(lesson.id)}" aria-label="Mark lesson done">${p.completed ? '✓' : '○'}</button>
    <div class="problem-main"><div><b>${esc(lesson.title)}</b><span class="diff lesson">≤${lesson.readMinutes} MIN</span></div><small>${esc(lesson.subtitle)}</small></div>
    <div class="resource-links"><button class="lesson-open" data-action="open-lesson" data-id="${esc(lesson.id)}">Learn</button></div>
    <div class="traffic compact">${lights('lesson', lesson.id, m.color)}</div></div>`;
}

const KIND_LABEL = { pattern: 'Pattern', resource: 'Problem', lesson: 'Lesson' };

function queueRow(item) {
  const today = localISODate();
  const late = daysBetween(item.nextReview, today);
  const when = late > 0 ? `${plural(late, 'day')} overdue` : late === 0 ? 'due today' : `due ${fmtDay(item.nextReview)}`;
  const open = item.kind === 'lesson'
    ? `<button class="text-btn" data-action="open-lesson" data-id="${esc(item.id)}">Open</button>`
    : item.url ? `<a class="text-btn" href="${safeUrl(item.url)}" target="_blank" rel="noopener">Open</a>` : '';
  return `<div class="queue-row"><i class="confidence-dot ${item.color}" title="Last rated ${item.color}"></i>
    <div class="queue-main"><b>${esc(item.title)}</b><small>${KIND_LABEL[item.kind]}${item.subtitle ? ` · ${esc(item.subtitle)}` : ''} · ${when}</small></div>
    ${open}<div class="traffic compact">${lights(item.kind, item.id, null)}</div></div>`;
}

export function lessonModal({ lesson, goal, progress, mastery, notes, drafts }) {
  const pkey = `${goal.id}:lesson:${lesson.id}`;
  const p = progress[pkey] || {};
  const m = mastery[pkey] || {};
  const lessonNotes = (notes || []).filter(n => n.goalId === goal.id && n.contextType === 'lesson' && n.contextId === lesson.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const draftKey = `lesson:${lesson.id}`;
  return `<div class="lesson-modal-backdrop" id="lesson-modal" data-action="backdrop" data-close="close-lesson" data-keep-scroll="lesson"><article class="lesson-modal" role="dialog" aria-modal="true" aria-labelledby="lesson-title">
    <header class="lesson-modal-head"><div><span class="badge study">PATTERN ${lesson.patternNumber}</span><h2 id="lesson-title">${esc(lesson.title)}</h2><p>${esc(lesson.subtitle)} · designed for a ≤${lesson.readMinutes}-minute learning block</p></div><button class="icon-btn" data-action="close-lesson" aria-label="Close lesson">×</button></header>
    <div class="lesson-toolbar"><button class="check-btn ${p.completed ? 'done' : ''}" data-action="toggle-lesson" data-id="${esc(lesson.id)}">${p.completed ? '✓ Lesson complete' : 'Mark lesson complete'}</button>
      <div class="lesson-confidence"><span>Revision confidence</span><div class="traffic compact">${lights('lesson', lesson.id, m.color)}</div></div>
      <div class="lesson-links">${lesson.links.map(l => `<a href="${safeUrl(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')}</div></div>
    <div class="lesson-body">${lesson.html}</div>
    <section class="lesson-notes"><div class="lesson-notes-head"><div><p class="eyebrow">Your layer</p><h3>Personal notes</h3></div><span>${lessonNotes.length} saved</span></div>
      ${draftArea('lesson-note-text', draftKey, drafts, 'Write your own detector, invariant, confusion, example, or interview shortcut…')}
      <button class="btn primary" data-action="save-note" data-draft="${esc(draftKey)}" data-context-type="lesson" data-context-id="${esc(lesson.id)}">Save note</button>
      <div class="lesson-note-history">${lessonNotes.length ? lessonNotes.map(n => `<article><small>${new Date(n.createdAt).toLocaleString()}</small><p>${esc(n.text)}</p></article>`).join('') : '<p class="muted">No notes yet. Try writing the pattern detector in your own words.</p>'}</div>
    </section></article></div>`;
}

// ---------------------------------------------------------------------------------------------
// Timeline

export function timelineView({ goal, progress, mastery, resources, filter = 'all', expandedDayId = null }) {
  const today = localISODate();
  let days = goal.schedule;
  if (filter === 'incomplete') days = days.filter(d => isRequired(d) && !progress[`${goal.id}:${d.id}`]?.completed);
  if (filter === 'revision') days = days.filter(d => d.type === 'revision');
  if (filter === 'today') days = days.filter(d => d.date === today);
  // Group consecutive days of the same block (a rest day inside a week stays in that week).
  const groups = [];
  for (const d of days) {
    const last = groups.at(-1);
    if (last && last.blockId === d.blockId) last.items.push(d);
    else groups.push({ blockId: d.blockId, items: [d] });
  }
  const headType = items => (items.find(d => isRequired(d)) || items[0]).type;
  return `<div class="page-head"><div><p class="eyebrow">Calendar</p><h1>Timeline</h1><p>Click any day to open its resources. Completion can still run ahead of the calendar.</p></div><div class="filter-row">${['all', 'today', 'incomplete', 'revision'].map(f => `<button class="chip ${filter === f ? 'active' : ''}" data-action="filter" data-filter="${f}">${f}</button>`).join('')}</div></div>
  ${goal.schedule.length ? '' : `<div class="empty">No days planned yet.${isCustom(goal) ? ' <button class="text-btn" data-action="plan-builder">Build a plan</button>' : ''}</div>`}
  <div class="timeline">${groups.map(({ items }) => `<section class="panel block"><div class="block-title"><div><span class="badge ${headType(items)}">${headType(items)}</span><h2>${esc(items[0].blockTitle)}</h2></div><small>${fmtDay(items[0].date)} → ${fmtDay(items.at(-1).date)}</small></div>${items.map(d => dayRow(d, goal, progress, mastery, resources, today, expandedDayId === d.id)).join('')}</section>`).join('')}</div>`;
}

function dayRow(d, goal, progress, mastery, resources, today, open) {
  const st = progress[`${goal.id}:${d.id}`] || {};
  const res = (d.resourceIds || []).map(id => resources[id]).filter(Boolean);
  const lesson = lessonForDay(d, goal, resources);
  const required = isRequired(d);
  const topic = d.topic || (d.focus || '').split('|')[0];
  return `<div class="day-wrap ${open ? 'open' : ''}">
    <div class="day-row ${d.date === today ? 'today' : ''} ${st.completed ? 'completed' : ''} ${open ? 'expanded' : ''} ${required ? '' : 'rest'}" data-action="expand-day" data-id="${esc(d.id)}" role="button" tabindex="0" aria-expanded="${open}">
      ${required ? `<button class="day-check" data-action="toggle-day" data-id="${esc(d.id)}" aria-label="Mark day complete">${st.completed ? '✓' : '○'}</button>` : `<span class="day-check rest-mark" aria-hidden="true">${d.type === 'buffer' ? '↺' : '☾'}</span>`}
      <div class="day-date"><b>${fmtDay(d.date)}</b><small>${d.date < today ? 'past' : d.date === today ? 'today' : 'planned'}</small></div>
      <div class="day-info"><b>${esc(topic)}</b><div class="day-problems">${lesson ? `<span class="lesson-pill">Learn: ${esc(lesson.patternName)}</span>` : ''}${res.map(r => `<span class="${d.roles?.[r.id] && d.roles[r.id] !== 'new' ? 'is-' + d.roles[r.id] : ''}">${esc(r.title)}</span>`).join('')}</div></div>
      <span class="minutes">${d.plannedMinutes ? `${d.plannedMinutes}m` : d.type}</span>
      <span class="open-hint">${open ? 'Hide' : 'Open'}</span>
    </div>
    ${open ? `<div class="day-detail">
      ${d.plan ? `<p class="time-plan"><span>⏱</span>${esc(d.plan)}</p>` : ''}
      <div class="problem-list">${lesson ? lessonCard(lesson, goal, progress, mastery) : ''}${res.length ? res.map(r => problemCard(r, goal, progress, mastery, d.roles?.[r.id], d.type)).join('') : `<p class="muted">${required ? 'No linked resources on this day.' : 'Nothing planned — rest or catch up.'}</p>`}</div>
      <div class="day-detail-actions"><button class="btn small" data-action="work-day" data-id="${esc(d.id)}">Open on Today</button></div>
    </div>` : ''}
  </div>`;
}

// ---------------------------------------------------------------------------------------------
// Revision

export function revisionView({ goal, mastery, queue, upcoming }) {
  const today = localISODate();
  return `<div class="page-head"><div><p class="eyebrow">Memory system</p><h1>Revision board</h1><p>Completion says you studied it. Confidence says whether you still own it. Every rating — problem, lesson or pattern — feeds one queue.</p></div>
    <div class="legend"><span><i class="confidence-dot green"></i> cold solve · back in 14 → 30 → 60 → 120 days</span><span><i class="confidence-dot yellow"></i> shaky · 4 days</span><span><i class="confidence-dot red"></i> relearn · tomorrow</span></div></div>
  <section class="panel queue-panel"><div class="panel-head"><h2>Due now</h2><span>${queue.length} due · ${upcoming.length} in the next 7 days</span></div>
    ${queue.length ? queue.map(item => queueRow(item)).join('') : '<p class="muted">Nothing is due. Items you rate come back here when their review date arrives.</p>'}
    ${upcoming.length ? `<details class="upcoming"><summary>Coming up this week (${upcoming.length})</summary>${upcoming.map(item => `<div class="mini-row"><i class="confidence-dot ${item.color}"></i><span>${esc(item.title)}</span><small>${fmtDay(item.nextReview)}</small></div>`).join('')}</details>` : ''}
  </section>
  ${goal.patterns.length ? `<h2 class="section-title">Patterns</h2><div class="revision-grid">${goal.patterns.map(p => {
    const key = `${goal.id}:pattern:${p.number}`;
    const st = mastery[key] || {};
    const due = st.nextReview && st.nextReview <= today;
    return `<section class="panel pattern-card ${due ? 'due' : ''}"><div class="pattern-num">${String(p.number).padStart(2, '0')}</div><h2>${esc(p.name)}</h2><p>${esc(p.detector)}</p>
      <div class="traffic">${['red', 'yellow', 'green'].map(c => `<button class="confidence ${c} ${st.color === c ? 'selected' : ''}" data-action="rate" data-kind="pattern" data-id="${p.number}" data-color="${c}" title="${esc(confidenceMeta[c].detail)}"><span></span><b>${confidenceMeta[c].label}</b></button>`).join('')}</div>
      <div class="review-meta"><span>Last: ${st.lastReviewed ? fmtDate(st.lastReviewed) : '—'}</span><span class="${due ? 'bad' : ''}">Next: ${st.nextReview ? fmtDate(st.nextReview) : 'rate to schedule'}</span></div></section>`;
  }).join('')}</div>` : ''}`;
}

// ---------------------------------------------------------------------------------------------
// Resources

export function resourcesView({ goal, resources, goalResourceIds, progress, mastery, query = '', scope = 'goal' }) {
  const q = query.toLowerCase();
  const inGoal = new Set(goalResourceIds);
  const pool = scope === 'goal' ? goalResourceIds.map(id => resources[id]).filter(Boolean) : Object.values(resources);
  const items = pool.filter(r => !q || `${r.title} ${r.pattern || ''} ${r.difficulty || ''} ${(r.tags || []).join(' ')}`.toLowerCase().includes(q));
  const custom = isCustom(goal);
  return `<div class="page-head"><div><p class="eyebrow">Reusable layer</p><h1>Resources</h1><p>Resources are independent of goals: the same problem, article or video can be reused in any goal.${custom ? ' Use “Add to goal” to collect what this goal covers, then build its plan.' : ''}</p></div>
    <div class="resource-tools"><div class="search"><input id="resource-search" data-input="resource-search" value="${esc(query)}" placeholder="Search ${pool.length} resources…" aria-label="Search resources"/></div>
      <div class="filter-row"><button class="chip ${scope === 'goal' ? 'active' : ''}" data-action="res-scope" data-scope="goal">This goal (${goalResourceIds.length})</button><button class="chip ${scope === 'all' ? 'active' : ''}" data-action="res-scope" data-scope="all">All (${Object.keys(resources).length})</button></div>
      <div class="row-actions">${custom ? '<button class="btn ghost" data-action="plan-builder">Build plan</button>' : ''}<button class="btn primary" data-action="add-resource">＋ Add resource</button></div></div></div>
  <section class="panel table-panel">${items.length ? `<div class="resource-table"><div class="rhead"><span>Resource</span><span>Topic</span><span>Status</span><span>Revision</span><span>Links</span></div>${items.map(r => {
    const pk = `${goal.id}:resource:${r.id}`;
    const p = progress[pk] || {};
    const m = mastery[pk] || {};
    return `<div class="rrow"><div><b>${esc(r.title)}</b>${r.difficulty ? `<span class="diff ${r.difficulty.toLowerCase()}">${esc(r.difficulty)}</span>` : ''}${r.custom ? `<span class="own-actions"><button class="text-btn" data-action="edit-resource" data-id="${esc(r.id)}">Edit</button><button class="text-btn danger" data-action="delete-resource" data-id="${esc(r.id)}">Delete</button></span>` : ''}</div>
      <span>${esc(r.pattern || '—')}</span>
      <div class="status-cell"><button class="status-pill ${p.completed ? 'done' : ''}" data-action="toggle-resource" data-id="${esc(r.id)}">${p.completed ? 'Completed' : 'Not done'}</button>${custom ? `<button class="text-btn" data-action="toggle-goal-resource" data-id="${esc(r.id)}">${inGoal.has(r.id) ? 'Remove from goal' : 'Add to goal'}</button>` : ''}</div>
      <div class="traffic compact">${lights('resource', r.id, m.color)}</div>
      <div class="resource-links">${resourceLinks(r)}</div></div>`;
  }).join('')}</div>` : `<div class="empty">${scope === 'goal' && !goalResourceIds.length ? 'This goal has no resources yet. Switch to <b>All</b> to add existing ones, or add your own.' : 'No resources match your search.'}</div>`}</section>`;
}

// ---------------------------------------------------------------------------------------------
// Notes

export function notesView({ goal, notes, query = '', drafts }) {
  const q = query.toLowerCase();
  const items = notes.filter(n => n.goalId === goal.id && (!q || n.text.toLowerCase().includes(q))).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return `<div class="page-head"><div><p class="eyebrow">Your error log</p><h1>Notes</h1><p>Capture missed clues, broken invariants, edge cases, and “why this pattern” explanations.</p></div><div class="search"><input id="notes-search" data-input="notes-search" value="${esc(query)}" placeholder="Search notes…" aria-label="Search notes"/></div></div>
  <section class="panel note-composer">${draftArea('general-note', `general:${goal.id}`, drafts, `Add a general note for ${goal.name}…`)}<button class="btn primary" data-action="save-note" data-draft="general:${esc(goal.id)}" data-context-type="general" data-context-id="">Add note</button></section>
  <div class="notes-list">${items.length ? items.map(n => `<article class="panel note"><div><span class="badge note-badge">${esc(n.contextType || 'general')}</span><small>${new Date(n.createdAt).toLocaleString()}</small></div><p>${esc(n.text)}</p><button class="text-btn danger" data-action="delete-note" data-id="${esc(n.id)}">Delete</button></article>`).join('') : '<div class="empty">No notes yet. Your best notes will eventually become your personal interview playbook.</div>'}</div>`;
}

// ---------------------------------------------------------------------------------------------
// Modals

const modalFrame = (title, body, actions, wide = false) => `<div class="modal-backdrop" id="modal" data-action="backdrop" data-close="close-modal"><div class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><h2 id="modal-title">${title}</h2><button class="icon-btn" data-action="close-modal" aria-label="Close">×</button></div>${body}<div class="modal-actions">${actions}</div></div></div>`;

export function goalModal(goal) {
  const editing = Boolean(goal);
  const g = goal || { name: '', description: '', startDate: localISODate(), endDate: '', dailyMinutes: 60 };
  return modalFrame(editing ? 'Edit goal' : 'Create a new goal',
    `<p>${editing ? 'Change the details of this goal. Its plan and progress stay as they are.' : 'Start with a blank goal. Add resources to it, then build a dated plan from them.'}</p>
    <label>Name<input id="goal-name" value="${esc(g.name)}" placeholder="e.g. System Design"/></label>
    <label>Description<input id="goal-description" value="${esc(g.description)}" placeholder="What does finishing this goal mean?"/></label>
    <div class="two-fields"><label>Start date<input id="goal-start" type="date" value="${esc(g.startDate)}"/></label><label>Target date<input id="goal-end" type="date" value="${esc(g.endDate)}"/></label></div>
    <label>Daily minutes<input id="goal-minutes" type="number" value="${esc(g.dailyMinutes)}" min="5" step="5"/></label>
    ${editing ? '<div class="danger-zone"><div><b>Delete this goal</b><p>Removes the goal with its progress, ratings, notes and timer history on this device.</p></div><button class="btn danger-btn" data-action="delete-goal">Delete goal</button></div>' : ''}`,
    `<button class="btn ghost" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-goal">${editing ? 'Save changes' : 'Create goal'}</button>`);
}

export function resourceModal(resource) {
  const r = resource || { title: '', url: '', kind: 'article', difficulty: '', pattern: '' };
  const kinds = ['problem', 'article', 'video', 'course', 'book', 'other'];
  return modalFrame(resource ? 'Edit resource' : 'Add a resource',
    `<p>Anything you want to learn from: a problem, an article, a video, a course chapter.</p>
    <label>Title<input id="res-title" value="${esc(r.title)}" placeholder="e.g. Designing Data-Intensive Applications, ch. 5"/></label>
    <label>Link<input id="res-url" type="url" value="${esc(r.url || r.leetcode || '')}" placeholder="https://…"/></label>
    <div class="two-fields"><label>Type<select id="res-kind">${kinds.map(k => `<option ${r.kind === k ? 'selected' : ''}>${k}</option>`).join('')}</select></label>
    <label>Difficulty<select id="res-difficulty"><option value="">—</option>${['Easy', 'Medium', 'Hard'].map(d => `<option ${r.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}</select></label></div>
    <label>Topic<input id="res-topic" value="${esc(r.pattern || '')}" placeholder="e.g. Replication"/></label>`,
    `<button class="btn ghost" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-resource">${resource ? 'Save' : 'Add resource'}</button>`);
}

export function planModal({ goal, count, hasProgress }) {
  const days = [['Mon', 1], ['Tue', 2], ['Wed', 3], ['Thu', 4], ['Fri', 5], ['Sat', 6], ['Sun', 0]];
  return modalFrame('Build a plan',
    `<p>Turns this goal’s ${plural(count, 'resource')} into dated study days, in the order they were added.</p>
    ${count ? '' : '<p class="form-error">Add resources to this goal first (Resources → All → “Add to goal”).</p>'}
    ${goal.schedule.length ? `<p class="form-warn">This replaces the current plan of ${plural(goal.schedule.length, 'day')}.${hasProgress ? ' Days you already completed will no longer be counted.' : ''}</p>` : ''}
    <div class="two-fields"><label>Start date<input id="plan-start" data-input="plan-preview" type="date" value="${esc(goal.startDate || localISODate())}"/></label>
    <label>Items per study day<input id="plan-per-day" data-input="plan-preview" type="number" min="1" max="10" value="2"/></label></div>
    <fieldset class="weekday-picker"><legend>Study on</legend>${days.map(([n, v]) => `<label><input type="checkbox" data-input="plan-preview" name="plan-day" value="${v}" ${v === 0 ? '' : 'checked'}/>${n}</label>`).join('')}</fieldset>
    <div class="two-fields"><label>Review day after every … study days<input id="plan-review" data-input="plan-preview" type="number" min="0" max="14" value="4"/></label>
    <label>Minutes per day<input id="plan-minutes" data-input="plan-preview" type="number" min="5" step="5" value="${esc(goal.dailyMinutes || 60)}"/></label></div>
    <p class="plan-preview" id="plan-preview" aria-live="polite"></p>`,
    `<button class="btn ghost" data-action="close-modal">Cancel</button><button class="btn primary" data-action="generate-plan" ${count ? '' : 'disabled'}>Build plan</button>`);
}

export function backupModal({ status, meta, snapshot, persisted }) {
  const fileBlock = {
    unsupported: '<p class="muted">Automatic backup to a file needs Chrome or Edge on a computer. In this browser, use Export regularly.</p>',
    none: '<p>Pick a file once (for example in a cloud-synced folder like OneDrive, Google Drive or Dropbox). After that, every change is written to it automatically.</p><button class="btn primary" data-action="link-backup-file">Choose backup file…</button>',
    'needs-permission': `<p>Linked to <b>${esc(status.name)}</b>, but the browser needs your permission again after a restart.</p><div class="row-actions"><button class="btn primary" data-action="reconnect-backup">Reconnect</button><button class="btn ghost" data-action="unlink-backup">Stop auto-backup</button></div>`,
    connected: `<p>Every change is saved to <b>${esc(status.name)}</b>${meta.lastFileBackupAt ? ` · last written ${ago(meta.lastFileBackupAt)}` : ''}.</p><button class="btn ghost" data-action="unlink-backup">Stop auto-backup</button>`,
  }[status.state];
  return modalFrame('Backup & data',
    `<p>Your progress is stored in this browser only. Clearing site data, switching browsers or using another computer starts from empty — unless you keep a backup.</p>
    <div class="backup-section"><h3>Automatic backup file</h3>${fileBlock}</div>
    <div class="backup-section"><h3>Manual backup</h3><p>Last export: <b>${ago(meta.lastExportAt)}</b>. Import a backup to move your progress to another browser — you can merge it with what is here or replace it.</p><div class="row-actions"><button class="btn primary" data-action="export">Export now</button><button class="btn ghost" data-action="import">Import…</button></div></div>
    ${snapshot ? `<div class="backup-section"><h3>Undo last import</h3><p>Your data from before the import on ${new Date(snapshot.exportedAt).toLocaleString()} is kept.</p><div class="row-actions"><button class="btn ghost" data-action="undo-import">Restore it</button><button class="text-btn" data-action="discard-snapshot">Forget it</button></div></div>` : ''}
    <div class="backup-section"><h3>Browser storage</h3><p>${persisted === true ? 'This browser has marked GoalForge’s storage as persistent, so it won’t clear it to free space.' : persisted === false ? 'The browser may clear this site’s storage when the disk is low on space.' : 'Checking…'}</p>${persisted === false ? '<button class="btn ghost" data-action="request-persist">Ask the browser to keep it</button>' : ''}</div>`,
    '<button class="btn primary" data-action="close-modal">Done</button>', true);
}

export function importModal({ fileName, incoming, current }) {
  const row = (label, a, b) => `<tr><td>${label}</td><td>${a}</td><td>${b}</td></tr>`;
  return modalFrame('Import backup',
    `<p><b>${esc(fileName)}</b>${incoming.exportedAt ? ` · exported ${new Date(incoming.exportedAt).toLocaleString()}` : ''}</p>
    <table class="compare-table"><thead><tr><th></th><th>In the file</th><th>On this device</th></tr></thead><tbody>
    ${row('Completed days', incoming.completedDays, current.completedDays)}${row('Completed problems & lessons', incoming.completedItems, current.completedItems)}${row('Confidence ratings', incoming.ratings, current.ratings)}${row('Notes', incoming.notes, current.notes)}${row('Custom goals', incoming.customGoals, current.customGoals)}${row('Own resources', incoming.customResources, current.customResources)}
    </tbody></table>
    <p><b>Merge</b> keeps the newer version of every item from both sides. <b>Replace</b> makes this device match the file exactly. Either way you can undo it from Backup &amp; data.</p>`,
    '<button class="btn ghost" data-action="close-modal">Cancel</button><button class="btn ghost" data-action="import-replace">Replace</button><button class="btn primary" data-action="import-merge">Merge (recommended)</button>');
}
