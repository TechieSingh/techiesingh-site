// Rebuilds the not-yet-started part of the DSA plan in js/data/goals.js.
//
//   node tools/build-plan.mjs
//
// Days before CUTOFF are kept exactly as they are (same ids, dates and problems), so progress
// already saved in the browser still lines up. Everything from CUTOFF onward is generated from
// the curated tables below:
//   * every problem is studied in its real NeetCode category (Bit Manipulation and Math &
//     Geometry get their own blocks instead of being hidden inside other patterns);
//   * at most one Hard problem per day, with the time plan adjusted when there is one;
//   * no "re-solve the problem you did yesterday": a cold re-solve is at least 3 days after
//     first contact, and leftover slots become interleaved reviews of older patterns;
//   * catch-up (buffer) days and rest days on Thanksgiving, Dec 25 and Jan 1;
//   * the plan still ends on the original end date.
// The script is idempotent: running it again produces the same file.

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../../public/learn/', import.meta.url);
const goalsPath = fileURLToPath(new URL('js/data/goals.js', root));
const { seedGoals } = await import(new URL('js/data/goals.js', root));
const { seedResources } = await import(new URL('js/data/resources.js', root));

const CUTOFF = '2026-10-26';
const END = '2027-01-11';
const HOLIDAYS = { '2026-11-26': 'Thanksgiving', '2026-12-25': 'Christmas', '2027-01-01': 'New Year’s Day' };

const R = Object.fromEntries(seedResources.map(r => [r.id, r]));
const goal = structuredClone(seedGoals.find(g => g.id === 'dsa-patterns-2026'));

const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00Z') - new Date(a + 'T12:00:00Z')) / 864e5);
const isHard = id => R[id].difficulty === 'Hard';

// ---------------------------------------------------------------------------------------------
// Patterns: add the two real NeetCode categories that used to be spread across other patterns.
const newPatterns = [
  { number: 16, name: 'Bit Manipulation', detector: 'Odd/even appearances, set bits, binary representation, or arithmetic without + and − — usually with O(1) extra space.', exitTarget: 'Name the bit identity you rely on (x^x=0, x&(x−1), shifts) and the 32-bit edge case before coding.' },
  { number: 17, name: 'Math & Geometry', detector: 'Matrix rotation/spiral/in-place marking, digit carries, big numbers as strings, fast powers, or points on a grid.', exitTarget: 'Write the index formula or arithmetic rule first and say which value must be saved before it is overwritten.' },
];
goal.patterns = [...goal.patterns.filter(p => p.number <= 15), ...newPatterns];
goal.description = '17-pattern DSA mastery plan built on the NeetCode 150, with spaced reviews, revision blocks and rest days.';

// ---------------------------------------------------------------------------------------------
// Curated future blocks. In each day's list: a plain id is a new problem, '~id' is a cold
// re-solve of a problem from earlier in the week, and REVIEW is an interleaved review slot that
// is filled automatically from older patterns.
const REVIEW = 'REVIEW';
const P = n => goal.patterns.find(p => p.number === n);
const study = (n, days) => ({ kind: 'study', id: `pattern-${n}`, title: `Pattern ${n}: ${P(n).name}`, patternNumber: n, days });

const blocks = [
  study(9, [
    ['Heap basics: keep the best k on top', ['lc-kth-largest-element-in-a-stream', 'lc-last-stone-weight']],
    ['Top-K selection: heap vs quickselect', ['lc-k-closest-points-to-origin', 'lc-kth-largest-element-in-an-array']],
    ['Scheduling with a heap and a cooldown queue', ['lc-task-scheduler', 'lc-design-twitter']],
    ['Intervals: sort by start, merge overlaps', ['lc-meeting-rooms', 'lc-merge-intervals']],
    ['Insert and remove intervals: the overlap invariant', ['lc-insert-interval', 'lc-non-overlapping-intervals']],
    ['Active rooms and two heaps for a running median', ['lc-meeting-rooms-ii', 'lc-find-median-from-data-stream']],
    ['Offline queries with a heap; cold re-solve', ['lc-minimum-interval-to-include-each-query', '~lc-task-scheduler']],
  ]),
  study(10, [
    ['Decision trees: choose, explore, un-choose', ['lc-subsets', 'lc-permutations']],
    ['Combinations vs permutations: what branches', ['lc-combination-sum', 'lc-letter-combinations-of-a-phone-number']],
    ['Duplicates: sort, then skip at the same depth', ['lc-combination-sum-ii', 'lc-subsets-ii']],
    ['Generating valid structures and partitions', ['lc-generate-parentheses', 'lc-palindrome-partitioning']],
    ['Grid search and trie basics', ['lc-word-search', 'lc-implement-trie-prefix-tree']],
    ['Wildcard trie search and constraint pruning', ['lc-design-add-and-search-words-data-structure', 'lc-n-queens']],
    ['Trie + backtracking capstone; cold re-solve', ['lc-word-search-ii', '~lc-combination-sum-ii']],
  ]),
  { kind: 'buffer', id: 'buffer-1', title: 'Catch-up day' },
  study(16, [
    ['Bits from zero: XOR cancels, AND tests', ['lc-single-number', 'lc-number-of-1-bits']],
    ['Recognition: bit DP and shifting bits out', ['lc-counting-bits', 'lc-reverse-bits']],
    ['XOR bookkeeping and 32-bit overflow', ['lc-missing-number', 'lc-reverse-integer']],
    ['Add without +; cold re-solve', ['lc-sum-of-two-integers', '~lc-number-of-1-bits']],
  ]),
  study(17, [
    ['Simulation basics: carries and repeating values', ['lc-plus-one', 'lc-happy-number']],
    ['Matrix geometry: rotate by formula, spiral by walls', ['lc-rotate-image', 'lc-spiral-matrix']],
    ['In-place markers and fast exponentiation', ['lc-set-matrix-zeroes', 'lc-pow-x-n']],
    ['Grade-school multiplication and counting squares', ['lc-multiply-strings', 'lc-detect-squares']],
  ]),
  { kind: 'revision', id: 'revision-2', title: 'Revision 2 — Patterns 1–10', days: [
    ['Cold retrieval: Arrays & Hashing + Two Pointers', ['lc-longest-consecutive-sequence', 'lc-trapping-rain-water']],
    ['Cold retrieval: Sliding Window + Stack', ['lc-minimum-window-substring', 'lc-daily-temperatures']],
    ['Cold retrieval: Binary Search + Linked Lists', ['lc-koko-eating-bananas', 'lc-lru-cache']],
    ['Cold retrieval: Trees + Tree DP', ['lc-diameter-of-binary-tree', 'lc-binary-tree-maximum-path-sum']],
    ['Cold retrieval: Heaps & Intervals + Backtracking', ['lc-meeting-rooms-ii', 'lc-word-search-ii']],
  ] },
  { kind: 'bridge', id: 'bridge-2', title: 'Bridge — Mixed Recognition', days: [
    ['Unlabeled mix: classify by invariant before touching code', ['lc-product-of-array-except-self', 'lc-car-fleet']],
    ['Unlabeled mix: search space vs pointer state', ['lc-search-in-rotated-sorted-array', 'lc-copy-list-with-random-pointer']],
  ] },
  study(11, [
    ['Grid DFS/BFS and the visited set', ['lc-number-of-islands', 'lc-max-area-of-island']],
    ['Cloning graphs and multi-source BFS', ['lc-clone-graph', 'lc-walls-and-gates']],
    ['Multi-source BFS and reverse reachability from the border', ['lc-rotting-oranges', 'lc-pacific-atlantic-water-flow']],
    ['Border marking; a tree is connected with no cycle', ['lc-surrounded-regions', 'lc-graph-valid-tree']],
    ['Directed cycles and topological order', ['lc-course-schedule', 'lc-course-schedule-ii']],
    ['Union-Find connectivity and redundant edges', ['lc-number-of-connected-components-in-an-undirected-graph', 'lc-redundant-connection']],
    ['Layered BFS capstone; cold re-solve', ['lc-word-ladder', '~lc-pacific-atlantic-water-flow']],
  ]),
  study(12, [
    ['Dijkstra: shortest path with positive weights', ['lc-network-delay-time', REVIEW]],
    ['Minimum spanning tree: Prim and Kruskal', ['lc-min-cost-to-connect-all-points', REVIEW]],
    ['Shortest path with a stop limit: Bellman-Ford rounds', ['lc-cheapest-flights-within-k-stops', REVIEW]],
    ['Use every edge once: Eulerian path (Hierholzer)', ['lc-reconstruct-itinerary', REVIEW]],
    ['Minimize the maximum: Dijkstra on the bottleneck', ['lc-swim-in-rising-water', REVIEW]],
    ['Infer the edges, then topological sort', ['lc-alien-dictionary', REVIEW]],
    ['Which graph algorithm? Cold re-solves', ['~lc-network-delay-time', '~lc-cheapest-flights-within-k-stops']],
  ]),
  { kind: 'buffer', id: 'buffer-2', title: 'Catch-up day' },
  study(13, [
    ['State, recurrence and base case from simple stairs', ['lc-climbing-stairs', 'lc-min-cost-climbing-stairs']],
    ['Take or skip; the circular variant', ['lc-house-robber', 'lc-house-robber-ii']],
    ['Palindromes: expand around the center vs a DP table', ['lc-longest-palindromic-substring', 'lc-palindromic-substrings']],
    ['Segmenting a string', ['lc-decode-ways', 'lc-word-break']],
    ['Unbounded choices; tracking both min and max', ['lc-coin-change', 'lc-maximum-product-subarray']],
    ['LIS and subset-sum state design', ['lc-longest-increasing-subsequence', 'lc-partition-equal-subset-sum']],
    ['Recurrence from memory: cold re-solves', ['~lc-house-robber-ii', '~lc-word-break']],
  ]),
  study(14, [
    ['Grid and two-sequence DP tables', ['lc-unique-paths', 'lc-longest-common-subsequence']],
    ['State machines and counting combinations', ['lc-best-time-to-buy-and-sell-stock-with-cooldown', 'lc-coin-change-ii']],
    ['Turning a target into DP state', ['lc-target-sum', 'lc-interleaving-string']],
    ['Edit operations; memoized DFS on a matrix', ['lc-edit-distance', 'lc-longest-increasing-path-in-a-matrix']],
    ['Counting subsequences', ['lc-distinct-subsequences', REVIEW]],
    ['Interval DP: choose the last action', ['lc-burst-balloons', REVIEW]],
    ['State-machine matching capstone; cold re-solve', ['lc-regular-expression-matching', '~lc-edit-distance']],
  ]),
  study(15, [
    ['Kadane and farthest reach', ['lc-maximum-subarray', 'lc-jump-game']],
    ['Jump levels and reset points', ['lc-jump-game-ii', 'lc-gas-station']],
    ['Greedy with counts and filters', ['lc-hand-of-straights', 'lc-merge-triplets-to-form-target-triplet']],
    ['Last occurrences and a range of open counts', ['lc-partition-labels', 'lc-valid-parenthesis-string']],
    ['Prove it: exchange and frontier arguments', ['~lc-jump-game-ii', REVIEW]],
    ['Greedy or DP? Decide with a counterexample', ['~lc-hand-of-straights', REVIEW]],
    ['Greedy mastery checkpoint', ['~lc-partition-labels', REVIEW]],
  ]),
  { kind: 'revision', id: 'revision-final', title: 'Final Revision — All 17 patterns', days: [
    ['Cold retrieval: Arrays & Hashing + Two Pointers', ['lc-top-k-frequent-elements', 'lc-3sum']],
    ['Cold retrieval: Sliding Window + Stack', ['lc-longest-repeating-character-replacement', 'lc-largest-rectangle-in-histogram']],
    ['Cold retrieval: Binary Search + Linked Lists', ['lc-median-of-two-sorted-arrays', 'lc-reorder-list']],
    ['Cold retrieval: Trees + Tree construction', ['lc-binary-tree-right-side-view', 'lc-serialize-and-deserialize-binary-tree']],
    ['Cold retrieval: Heaps + Backtracking', ['lc-find-median-from-data-stream', 'lc-subsets-ii']],
    ['Cold retrieval: Bit Manipulation + Math & Geometry', ['lc-sum-of-two-integers', 'lc-rotate-image']],
    ['Cold retrieval: Graphs + Advanced Graphs', ['lc-course-schedule-ii', 'lc-swim-in-rising-water']],
    ['Cold retrieval: 1-D + 2-D Dynamic Programming', ['lc-coin-change', 'lc-distinct-subsequences']],
    ['Mock interview: two unlabeled problems', ['lc-valid-parenthesis-string', 'lc-minimum-window-substring']],
  ] },
];

// ---------------------------------------------------------------------------------------------
// Time plans: 90 minutes, adjusted to what the day actually contains.
function timePlan(type, slots) {
  if (type === 'rest') return 'No study today. Rest is part of the plan.';
  if (type === 'buffer') return 'Finish any unfinished day first, then clear your review queue. If both are done, rest — it still counts.';
  const hard = slots.filter(s => isHard(s.id)).length;
  if (type === 'revision') return hard
    ? '10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards'
    : '10m blank-page recall + detectors · 25m first cold solve · 25m second cold solve · 20m error log · 10m pattern cards';
  if (type === 'bridge') return '10m classify both problems without labels · 30m problem 1 · 30m problem 2 · 20m say why the nearby patterns lose';
  const roles = slots.map(s => s.role);
  const hardNew = slots.some(s => s.role === 'new' && isHard(s.id));
  if (roles.every(r => r === 'resolve')) return '10m blank-page recall · 25m cold re-solve · 25m cold re-solve · 20m error log · 10m pattern card';
  if (hardNew && roles.includes('resolve')) return '10m blank-page recall · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold re-solve · 15m error log & card';
  if (hardNew && roles.includes('review')) return '10m recall & classify · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold review · 15m compare & pattern card';
  if (hardNew) return '10m recall & classify · 25m first problem · 40m Hard problem · 15m compare & pattern card';
  if (roles.includes('resolve')) return '10m blank-page recall · 25m cold re-solve · 25m review problem · 20m error log · 10m pattern card';
  if (roles.includes('review')) return '10m recall & classify · 30m new problem · 20m cold review · 20m compare with a solution · 10m pattern card';
  return '10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card';
}

// ---------------------------------------------------------------------------------------------
// Layout: place blocks day by day from CUTOFF, inserting holiday rest days where they fall.
const past = goal.schedule.filter(d => d.date < CUTOFF);
const future = [];
let date = CUTOFF;
function nextDate(blockForRest) {
  while (HOLIDAYS[date]) {
    future.push({ id: `${date}-rest`, date, type: 'rest', blockId: blockForRest.id, blockTitle: blockForRest.title, patternNumber: null,
      topic: `Rest day — ${HOLIDAYS[date]}`, resourceIds: [], plannedMinutes: 0, optional: true });
    date = addDays(date, 1);
  }
  const d = date; date = addDays(date, 1); return d;
}
const suffix = b => b.kind === 'study' ? `p${b.patternNumber}` : b.id;

for (const b of blocks) {
  if (b.kind === 'buffer') {
    const d = nextDate(b);
    future.push({ id: `${d}-${b.id}`, date: d, type: 'buffer', blockId: b.id, blockTitle: b.title, patternNumber: null,
      topic: 'Catch up or rest', resourceIds: [], plannedMinutes: 0, optional: true });
    continue;
  }
  if (b.id === 'revision-final') {
    // The final revision fills the remaining calendar exactly.
    let remaining = 0; for (let x = date; x <= END; x = addDays(x, 1)) if (!HOLIDAYS[x]) remaining++;
    if (remaining !== b.days.length) throw new Error(`Final revision needs ${remaining} days but has ${b.days.length}`);
  }
  b.days.forEach(([topic, items], i) => {
    const d = nextDate(b);
    const slots = items.map(x => x === REVIEW ? { id: null, role: 'review' }
      : x.startsWith('~') ? { id: x.slice(1), role: 'resolve' }
      : { id: x, role: b.kind === 'study' ? 'new' : b.kind === 'revision' ? 'revision' : 'mixed' });
    for (const s of slots) if (s.id && !R[s.id]) throw new Error(`Unknown resource ${s.id}`);
    future.push({ id: `${d}-${suffix(b)}`, date: d, type: b.kind, blockId: b.id, blockTitle: b.title,
      patternNumber: b.kind === 'study' ? b.patternNumber : null, topic, slots, plannedMinutes: 90, _dayIndex: i });
  });
}
if (addDays(date, -1) !== END) throw new Error(`Plan ends ${addDays(date, -1)}, expected ${END}`);

// ---------------------------------------------------------------------------------------------
// Fill REVIEW slots with interleaved reviews from older patterns, spaced away from any other
// appearance of the same problem.
const firstStudyEnd = {};
for (const d of [...past, ...future]) {
  if (d.type !== 'study') continue;
  const ids = d.slots ? d.slots.map(s => s.id) : d.resourceIds;
  for (const id of ids) if (id && R[id].patternNumber === d.patternNumber) {
    const blockEnd = [...past, ...future].filter(x => x.blockId === d.blockId).at(-1).date;
    firstStudyEnd[id] ??= blockEnd;
  }
}
const appearances = {};
const note = (id, dt) => (appearances[id] ??= []).push(dt);
past.forEach(d => d.resourceIds.forEach(id => note(id, d.date)));
future.forEach(d => d.slots?.forEach(s => s.id && note(s.id, d.date)));
const lastPatternReview = {};

for (const d of future) {
  if (!d.slots) continue;
  for (const slot of d.slots) {
    if (slot.id) continue;
    const others = d.slots.filter(s => s.id);
    const allowHard = others.every(s => s.role === 'resolve' && !isHard(s.id));
    const candidates = seedResources.filter(r => {
      if (r.patternNumber === d.patternNumber || others.some(s => s.id === r.id)) return false;
      if (!firstStudyEnd[r.id] || daysBetween(firstStudyEnd[r.id], d.date) < 7) return false;
      if (!allowHard && r.difficulty === 'Hard') return false;
      return (appearances[r.id] || []).every(x => Math.abs(daysBetween(x, d.date)) >= 10);
    });
    const lastSeen = id => (appearances[id] || []).filter(x => x < d.date).sort().at(-1) || '0000';
    // Rotate through patterns; inside a pattern prefer a Medium (an Easy re-solve teaches
    // little), then the problem seen longest ago.
    const weight = r => ({ Hard: 1, Medium: 0, Easy: 2 })[r.difficulty];
    candidates.sort((a, b) =>
      (lastPatternReview[a.patternNumber] || '0000').localeCompare(lastPatternReview[b.patternNumber] || '0000')
      || a.patternNumber - b.patternNumber
      || weight(a) - weight(b)
      || lastSeen(a.id).localeCompare(lastSeen(b.id))
      || a.id.localeCompare(b.id));
    const pick = candidates[0];
    if (!pick) throw new Error(`No review candidate for ${d.id}`);
    slot.id = pick.id;
    note(pick.id, d.date);
    lastPatternReview[pick.patternNumber] = d.date;
  }
}

// ---------------------------------------------------------------------------------------------
// Finalize day records. Past days only gain the topic/plan split of their original focus text.
function splitFocus(focus) {
  const m = focus.match(/^(.*?)\s+(10m .*)$/s);
  return m ? { topic: m[1].trim(), plan: m[2].replace(/ \| /g, ' · ').trim() } : { topic: focus, plan: '' };
}
const pastDays = past.map(d => {
  const { topic, plan, slots, roles, optional, _dayIndex, ...rest } = d;
  return { ...rest, ...splitFocus(d.focus) };
});
const futureDays = future.map(({ slots, _dayIndex, ...d }) => {
  const resourceIds = slots ? slots.map(s => s.id) : d.resourceIds;
  const roles = slots ? Object.fromEntries(slots.map(s => [s.id, s.role])) : {};
  const plan = timePlan(d.type, slots || []);
  return { ...d, focus: d.topic, plan, resourceIds, roles };
});
goal.schedule = [...pastDays, ...futureDays];

// Blocks: keep past ones, rebuild the rest from the days.
const pastBlocks = goal.blocks.filter(b => b.end < CUTOFF);
const futureBlocks = [];
for (const b of blocks) {
  const days = futureDays.filter(d => d.blockId === b.id);
  const block = { id: b.id, title: b.title, type: b.kind, start: days[0].date, end: days.at(-1).date };
  if (b.kind === 'study') Object.assign(block, { patternNumber: b.patternNumber, detector: P(b.patternNumber).detector, exitTarget: P(b.patternNumber).exitTarget });
  if (b.kind === 'study' && b.days.length < 7) block.lessonStages = [0, 1, 2, 6];
  futureBlocks.push(block);
}
goal.blocks = [...pastBlocks, ...futureBlocks];
goal.endDate = END;

const others = seedGoals.filter(g => g.id !== goal.id);
fs.writeFileSync(goalsPath, 'export const seedGoals = ' + JSON.stringify([goal, ...others], null, 2) + ';\n');
console.log(`Kept ${pastDays.length} past days, generated ${futureDays.length} days (${CUTOFF} → ${END}).`);
