// Lessons for the two patterns added when the misfiled NeetCode problems were re-filed:
// 16 Bit Manipulation and 17 Math & Geometry.
// They use the same stage structure as the generated lessons in lessons.js, but these
// blocks are 4 days long, so they cover stages 1, 2, 3 and 7 (see lessonStages in goals.js).

export const extraPatternMeta = {
  16: {
    name: 'Bit Manipulation',
    topic: 'Bit Manipulation',
    leetcode: 'https://leetcode.com/tag/bit-manipulation/',
    video: 'https://www.youtube.com/watch?v=qMPX1AOa83k',
    videoLabel: 'NeetCode walkthrough: Single Number',
    plain: 'Every integer is stored as a row of bits (0s and 1s). Bit manipulation answers a question by working on those bits directly with AND (&), OR (|), XOR (^) and shifts (<<, >>) instead of with ordinary arithmetic or extra memory.',
    analogy: 'Think of a row of light switches. AND asks “are both on?”, OR asks “is either on?”, XOR asks “are they different?”, and a shift slides the whole row one place. XOR is like flipping a switch twice: it ends up exactly where it started.',
    core: 'Use bit identities — x ^ x = 0, x ^ 0 = x, x & (x − 1) clears the lowest set bit — to count, cancel or rebuild values in O(1) extra space.',
    strong: [
      'Every element appears twice except one',
      'Count the 1 bits (Hamming weight) of a number',
      'Reverse or inspect the binary representation',
      'Do arithmetic without the + or − operators',
      'Numbers 0..n with exactly one missing, in O(1) extra space',
    ],
    weak: [
      'The input is a list of integers',
      '“Binary” appears only in a structure name (binary tree, binary search)',
      'The answer is a count',
    ],
    anti: [
      'Need counts of many different values → Hash Map is clearer',
      'Base-10 digits, carries or overflow → Math & Geometry simulation',
      'Sorted data with a monotonic yes/no → Binary Search',
    ],
    brute: 'Count with a hash map, convert each number to a binary string and loop over its characters, or sort first. These work, but they use O(n) extra memory or O(n log n) time.',
    bridge: 'Ask what fact the extra memory is really storing. If it is only “has this appeared an odd number of times?” or “is this bit set?”, one XOR accumulator or one bit test can store it in O(1).',
    invariant: 'After processing i items, the accumulator equals the XOR of exactly those items, so everything that appeared an even number of times has cancelled out.',
    complexity: 'Each bit operation is O(1). Scanning n numbers is O(n); scanning the 32 bits of one number is O(32) = O(1). Counting bits for every number 0..n with dp[i] = dp[i >> 1] + (i & 1) is O(n). Extra space is O(1) unless the output itself is an array.',
    example: 'Single Number on [4,1,2,1,2]: start with acc = 0. 0^4 = 4, 4^1 = 5, 5^2 = 7, 7^1 = 6, 6^2 = 4. The pairs cancelled and 4 is left — no hash map needed.',
    diagram1: '  5  = 0 1 0 1\n  3  = 0 0 1 1\n----------------\n AND   0 0 0 1  = 1   both on\n OR    0 1 1 1  = 7   either on\n XOR   0 1 1 0  = 6   different',
    diagram2: 'x         = 1 0 1 1 0 0   (44)\nx - 1     = 1 0 1 0 1 1   (43)\nx & (x-1) = 1 0 1 0 0 0   (40)\n                  ↑ lowest 1 cleared',
    counter: '“Find the duplicate when one value repeats many times” sounds like XOR, but XOR only cancels values that appear an even number of times. Use a hash set, or Floyd’s cycle detection as in Find the Duplicate Number.',
    edges: ['0 and negative numbers', 'all 32 bits set', 'signed vs unsigned right shift (>> vs >>> in Java/JavaScript)', 'Python ints are unbounded — mask with 0xFFFFFFFF', 'n = 0 in Counting Bits'],
    pitfalls: [
      'Operator precedence: write (x & 1) == 1, not x & 1 == 1',
      'Right-shift a negative number with >> and loop forever',
      'Forget the 32-bit mask in Python for Sum of Two Integers',
      'Shift the result after adding the bit instead of before',
    ],
    hook: 'BITS = XOR cancels, AND tests, SHIFT moves — count or rebuild in O(1) space.',
    questions: [
      'Every number appears twice except one; find it in O(1) space.',
      'Return how many 1 bits a 32-bit integer has.',
      'Find two numbers in an unsorted array that add to a target.',
      'Return the number of 1 bits for every number from 0 to n.',
    ],
    skeleton: 'acc = 0\nfor x in nums:\n    acc ^= x          # pairs cancel\n\ncount = 0\nwhile n:\n    n &= n - 1        # drop the lowest set bit\n    count += 1',
  },
  17: {
    name: 'Math & Geometry',
    topic: 'Math & Geometry',
    leetcode: 'https://leetcode.com/tag/math/',
    video: 'https://www.youtube.com/watch?v=fMSJSS7eO1w',
    videoLabel: 'NeetCode walkthrough: Rotate Image',
    plain: 'These problems have no special data structure. The answer comes from simulating the arithmetic or the movement exactly — carrying digits, walking a matrix layer by layer, or moving each element with an index formula.',
    analogy: 'It is like long multiplication on paper or turning a photo 90° by hand: the method is simple, but you must be exact about which cell goes where and what happens at the edges.',
    core: 'Find the index formula or arithmetic rule, then simulate it exactly — handling carries, boundaries and in-place overwrites in a safe order.',
    strong: [
      'Rotate, transpose or spiral through a matrix',
      'Digits of a number, a carry, or “add one”',
      'Very large numbers stored as strings or arrays',
      'A power or exponent with a huge n',
      'Points and squares on a coordinate grid',
    ],
    weak: [
      'The input is a 2-D matrix',
      'The answer is a number',
      'The words “sum” or “product” appear',
    ],
    anti: [
      'Shortest path or connected regions in a grid → Graph BFS/DFS',
      'Counting or optimizing paths through a grid → 2-D Dynamic Programming',
      'Odd/even appearances or single bits → Bit Manipulation',
    ],
    brute: 'Copy the matrix into a new one, convert huge numbers into built-in integers, or multiply x by itself n times. That uses O(n²) extra memory, breaks the problem’s rules, or takes O(n) multiplications.',
    bridge: 'Work out where each element must go with a formula — (r, c) → (c, n−1−r) for a clockwise rotation — or reuse a half-sized result: xⁿ = (x^(n/2))². Then do it in place, or in O(log n) steps.',
    invariant: 'Every cell or digit already processed is final and correct, and every unprocessed one still holds its original value (or that value is safely stored, like the carry).',
    complexity: 'Matrix walks touch each cell once: O(m·n) time, and O(1) extra space when done in place. Grade-school multiplication of lengths m and n is O(m·n). Fast exponentiation halves n each step: O(log n).',
    example: 'Plus One on [1,2,9]: start at the last digit. 9 + 1 = 10, so write 0 and carry 1. 2 + 1 = 3, no carry, stop. The answer is [1,3,0]. You only need a new leading 1 when every digit was 9.',
    diagram1: 'rotate 90° clockwise = transpose, then reverse each row\n\n1 2 3      1 4 7      7 4 1\n4 5 6  →   2 5 8  →   8 5 2\n7 8 9      3 6 9      9 6 3\n          transpose  reverse rows',
    diagram2: 'spiral = four walls that close in\n\ntop    → → → →\n              ↓  right wall\n↑             ↓\nleft   ← ← ← ←  bottom\n\nafter each side: top++, right--, bottom--, left++',
    counter: '“Count the paths from the top-left to the bottom-right of a grid” uses a matrix, but no formula moves cells around — each cell’s answer depends on its neighbours’ answers. That is 2-D Dynamic Programming.',
    edges: ['1×1 and non-square matrices', 'all 9s in Plus One', 'n = 0, negative n and x = 0 in Pow(x, n)', '“0” times anything in Multiply Strings', 'a zero already in the first row or column (Set Matrix Zeroes)'],
    pitfalls: [
      'Overwrite a cell before saving its value during an in-place rotation',
      'Use the first row as a marker and forget whether it had a zero itself',
      'Let spiral walls cross and print a row twice',
      'Recurse n times in Pow instead of halving, or overflow when negating n',
    ],
    hook: 'MATH = find the formula, guard the edges, overwrite in a safe order.',
    questions: [
      'Rotate an n×n image 90° in place.',
      'Add one to a number stored as an array of digits.',
      'Count the islands of 1s in a grid.',
      'Compute x to the power n for a very large n.',
    ],
    skeleton: 'top, bottom, left, right = 0, m - 1, 0, n - 1\nwhile top <= bottom and left <= right:\n    walk top row left→right;      top += 1\n    walk right column top→bottom; right -= 1\n    if top <= bottom: walk bottom row right→left; bottom -= 1\n    if left <= right: walk left column bottom→top; left += 1',
  },
};

const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const section = (title, body, active = false) => `<section class="lesson-section ${active ? 'active' : ''}"><h3>${title}</h3>${body}</section>`;
const quiz = items => `<div class="lesson-quiz">${items.map((q, i) => `<div class="quiz-row"><span>${i + 1}</span><p>${esc(q)}</p></div>`).join('')}</div>`;
const list = (items, cls = '') => `<ul${cls ? ` class="${cls}"` : ''}>${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
const pre = (text, cls = 'lesson-diagram') => `<pre class="${cls}">${esc(text)}</pre>`;
const HEURISTIC = 'ROUGH INTERVIEW HEURISTIC (not a law)\n\nn ≈ 20        exponential may be possible\nn ≈ 100       O(n³) sometimes possible\nn ≈ 1,000     O(n²) may be possible\nn ≈ 100,000   usually O(n log n) / O(n)\nn ≈ 1,000,000 usually near-linear\n\nAlways consider language, constants and actual time limits.';

function lead(day, goal) {
  return `<p class="lesson-lead"><b>Day ${day} goal:</b> ${goal} You only need basic variables, loops, and <code>if/else</code>. Do not try to memorize the final code; build a picture you can reconstruct.</p>`;
}
const hookBox = m => `<div class="lesson-memory-hook"><span>ONE-LINE MEMORY HOOK</span><strong>${esc(m.hook)}</strong></div>`;
const anchors = m => pre(m.diagram1) + pre(m.diagram2) + `<p><b>Memory hook:</b> ${esc(m.hook)}</p>`;

// Stage 1 — Foundations
function foundations(m, day) {
  return lead(day, 'Build the idea from scratch.') + hookBox(m)
    + section('0. Cold guess — do this before reading', `<p>Read these tiny prompts. Guess the pattern in 20 seconds each. Being wrong is useful because your brain now has a prediction to correct.</p>${quiz([m.questions[0], m.questions[2]])}`, true)
    + section('1. What is this, in plain English?', `<p>${esc(m.plain)}</p><p>${esc(m.analogy)}</p><p><b>The real job:</b> ${esc(m.core)}</p>`)
    + section('2. First mental picture', `${pre(m.diagram1)}<p>Trace it with your finger. The picture matters more than syntax today.</p>`)
    + section('3. One tiny worked example', `<p>${esc(m.example)}</p>${pre(m.diagram2)}`)
    + section('4. The slow idea vs the useful idea', `<p><b>Brute force:</b> ${esc(m.brute)}</p><p><b>Bridge:</b> ${esc(m.bridge)}</p>`)
    + section('5. Complexity intuition', `<p>${esc(m.complexity)}</p>`)
    + section('6. 60-second teach-back', quiz([`Explain ${m.name} to a 12-year-old.`, 'What repeated work or extra memory does this pattern remove?', 'What does its main state remember?']), true)
    + section('Before today’s two problems', `<p><b>Close the lesson before solving.</b> For each problem, spend 60–90 seconds naming the data shape, the brute force, the likely pattern, and one competing pattern. Save only the clue you missed — not a copied solution.</p><p>Redraw these two anchors once:</p>${anchors(m)}`);
}

// Stage 2 — Recognition
function recognition(m, day) {
  return lead(day, 'Train the classifier before touching code.') + hookBox(m)
    + section('1. Pattern fingerprint: strong clues', `<p>Strong clues describe structure. They are much safer than memorizing keywords.</p>${list(m.strong, 'strong-clues')}`)
    + section('2. Weak clues — do NOT overreact', `<p>These may appear, but they are not enough by themselves:</p>${list(m.weak, 'weak-clues')}`)
    + section('3. Anti-clues: when your first guess is probably wrong', list(m.anti, 'danger-clues'))
    + section('4. Constraints are clues too', `${pre(HEURISTIC)}<p>For this pattern: ${esc(m.complexity)}</p>`)
    + section('5. Strip away the story', `<p>Interviewers talk about users, images, money or sensors. Replace the nouns with structure. Your compressed sentence for this pattern: <b>${esc(m.core)}</b></p>`)
    + section('6. Counterexample: looks similar, but is not this pattern', `<div class="lesson-callout warning"><p>${esc(m.counter)}</p></div>`)
    + section('7. Decision gate', quiz([
      `Does the prompt contain a strong structural signal such as: ${m.strong[0]}, or ${m.strong[1]}?`,
      `Can I state the invariant in one sentence: “${m.invariant}”?`,
      'Can I rule out at least one nearby pattern for a structural reason, not just a keyword?',
      'Do the constraints make the brute force too expensive?',
    ]), true)
    + section('Before today’s two problems', `<p><b>Classification protocol:</b> before code, say the strongest structural clue, the target complexity, and one reason a nearby pattern loses. If wrong, note the missed clue in one sentence.</p>${anchors(m)}`);
}

// Stage 3 — Invariant, template & complexity
function invariant(m, day) {
  return lead(day, 'Understand why it works and how to count the cost.') + hookBox(m)
    + section('1. Start from brute force, not the template', `<p>${esc(m.brute)}</p><p>Now ask which work is repeated and what information lets you skip it. ${esc(m.bridge)}</p>`)
    + section('2. The invariant — your correctness anchor', `<div class="lesson-callout strong"><p>${esc(m.invariant)}</p></div><p>If you cannot explain why every step preserves this sentence, pause. Coding before the invariant is clear is how “works on examples only” bugs happen.</p>`)
    + section('3. Skeleton, not a memorized LeetCode solution', `${pre(m.skeleton, 'lesson-code')}<p>Rewrite this from memory once. What matters is the order of the steps and the invariant.</p>`)
    + section('4. Complexity: derive it from operations', `<p>${esc(m.complexity)}</p>${pre("COUNT, DON'T GUESS\nitems/states × work per item/state = time\nmaximum extra live state              = space")}`)
    + section('5. Edge cases worth testing before submit', list(m.edges))
    + section('6. Spot-the-bug mindset', `<p>Do not just ask “does my code run?” Ask which invariant could break on an edge case or because of the order of updates.</p>${list(m.pitfalls)}`)
    + section('7. Blank-editor recall', quiz(['Write the invariant without scrolling up.', 'Write the skeleton from memory.', 'Explain the time complexity in sentences, not just Big-O symbols.']), true)
    + section('Before today’s two problems', `<p><b>Blank-editor rule:</b> state the invariant, write the skeleton, and derive the complexity before reading any solution. If stuck, record the exact step you could not justify.</p>${anchors(m)}`);
}

// Stage 7 — Mastery
function mastery(m, day) {
  const map = `PATTERN: ${m.name}\n\nCORE → ${m.core}\n\nSTRONG SIGNALS\n- ${m.strong.slice(0, 3).join('\n- ')}\n\nINVARIANT\n${m.invariant}\n\nCOMPLEXITY\n${m.complexity}\n\nMEMORY HOOK\n${m.hook}`;
  return lead(day, 'Compress the pattern into a fast interview memory map.') + hookBox(m)
    + section('1. One-screen memory map', pre(map))
    + section('2. Rapid classifier — no coding', quiz(m.questions), true)
    + section('3. Complexity oral test', `<p>Explain this without looking: ${esc(m.complexity)}</p><p>Then answer: what input size would make the brute force suspicious? What changes the space complexity?</p>`)
    + section('4. Cold skeleton test', `<p>Close this lesson mentally and write the skeleton from memory. Then compare:</p>${pre(m.skeleton, 'lesson-code')}`)
    + section('5. Interview checklist', list(['Restate the problem in structural terms.', 'Extract constraints and the target complexity.', 'Describe the brute force first.', 'Name the pattern and one competing pattern.', 'State the invariant.', 'Walk one tiny example.', 'Code cleanly.', 'Test the edge cases.', 'State time and space from the operations.']))
    + section('6. Week exit test', `<div class="lesson-callout strong"><p>You are “green” only if you can identify the pattern from an unlabeled prompt, justify it with structural clues, state the invariant, derive the complexity, and reject a nearby pattern without looking at notes.</p></div>`)
    + section('Before today’s problems', `<p><b>Certification protocol:</b> close all notes. Classify before coding, name one competing pattern, give the invariant, estimate complexity, and rebuild the skeleton. Mark green only when those steps feel reproducible.</p>${anchors(m)}`);
}

const builders = [foundations, recognition, invariant, null, null, null, mastery];
const wordCount = html => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

// Lesson ids follow lessons.js: p<pattern>-d<position in block>. Stage index per position.
export const extraLessonStages = { 16: [0, 1, 2, 6], 17: [0, 1, 2, 6] };

export const extraLessonDocs = Object.fromEntries(
  Object.entries(extraLessonStages).flatMap(([num, stages]) => stages.map((stage, i) => {
    const html = builders[stage](extraPatternMeta[num], i + 1);
    return [`p${num}-d${i + 1}`, { html, wordCount: wordCount(html) }];
  })),
);
