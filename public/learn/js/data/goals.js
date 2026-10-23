export const seedGoals = [
  {
    "id": "dsa-patterns-2026",
    "name": "DSA Patterns",
    "description": "17-pattern DSA mastery plan built on the NeetCode 150, with spaced reviews, revision blocks and rest days.",
    "startDate": "2026-08-23",
    "endDate": "2027-01-11",
    "dailyMinutes": 90,
    "nextPhaseDate": "2027-01-12",
    "source": "Aditya_20_Week_DSA_Pattern_Mastery_Plan.pdf",
    "patterns": [
      {
        "number": 1,
        "name": "Arrays & Hashing",
        "detector": "Need O(1) membership/counting/grouping, complement lookup, prefix/suffix accumulation, or a set boundary.",
        "exitTarget": "Choose list vs set vs map quickly; state the invariant and Big-O before coding."
      },
      {
        "number": 2,
        "name": "Two Pointers",
        "detector": "Sorted or symmetric data, pair/triple search, in-place scan, cycle-like movement, or a decision about which boundary can move.",
        "exitTarget": "Explain why moving one pointer cannot discard an optimal answer."
      },
      {
        "number": 3,
        "name": "Sliding Window",
        "detector": "Contiguous subarray/substring + best/longest/shortest/count condition; right expands, left repairs validity.",
        "exitTarget": "State window contents, validity condition, update moment, and why each pointer moves O(n) total."
      },
      {
        "number": 4,
        "name": "Stack & Monotonic Stack",
        "detector": "Nested structure, undo/LIFO state, expression evaluation, or nearest greater/smaller boundary.",
        "exitTarget": "Know what each stack element represents and what event causes it to pop."
      },
      {
        "number": 5,
        "name": "Binary Search",
        "detector": "Monotonic yes/no answer, sorted search space, rotated order, or need to find first/last feasible boundary.",
        "exitTarget": "Write one binary-search template without off-by-one errors and prove which half can be discarded."
      },
      {
        "number": 6,
        "name": "Linked Lists",
        "detector": "Pointer rewiring, node deletion/insertion, fast/slow cycle logic, merge streams, or cache ordering.",
        "exitTarget": "Draw pointer states before coding; never lose the remainder of the list during rewiring."
      },
      {
        "number": 7,
        "name": "Tree Traversal & Recursion",
        "detector": "Hierarchical data where answer combines child results, needs DFS order, or level-by-level BFS.",
        "exitTarget": "Choose DFS preorder/inorder/postorder vs BFS deliberately; state base case and returned meaning."
      },
      {
        "number": 8,
        "name": "BST, Tree Construction & Tree DP",
        "detector": "BST ordering, inorder rank, reconstructing structure from traversals, serializing state, or path value combining child contributions.",
        "exitTarget": "Carry valid bounds/state through recursion and distinguish local return value from global answer."
      },
      {
        "number": 9,
        "name": "Heaps, Intervals & Scheduling",
        "detector": "Repeated best-next choice, top-K/median stream, merging/scheduling by time, or active intervals ordered by finish/size.",
        "exitTarget": "Know whether you need min-heap/max-heap, what key is stored, and when stale/finished items leave."
      },
      {
        "number": 10,
        "name": "Backtracking & Trie Search",
        "detector": "Enumerate choices under constraints, explore/undo state, prefix pruning, or search many words against shared prefixes.",
        "exitTarget": "Define state, choices, constraint, base case and undo step before writing recursion."
      },
      {
        "number": 11,
        "name": "Graph Traversal",
        "detector": "Nodes/edges, connectivity, components, shortest unweighted layers, dependency cycles, or grid cells behaving like vertices.",
        "exitTarget": "Convert the story to graph state, choose BFS vs DFS, and define visited semantics before coding."
      },
      {
        "number": 12,
        "name": "Advanced Graphs",
        "detector": "Weighted shortest path, minimum spanning tree, itinerary/Eulerian ordering, or topological order over inferred symbols.",
        "exitTarget": "Recognize Dijkstra vs Prim/Kruskal vs topological/Eulerian structure from constraints and edge weights."
      },
      {
        "number": 13,
        "name": "1-D Dynamic Programming",
        "detector": "Optimal/counting answer over a linear state where subproblems repeat and future depends on a small prefix/suffix state.",
        "exitTarget": "Write state definition, recurrence, base cases and iteration order before code; then compress space if safe."
      },
      {
        "number": 14,
        "name": "2-D Dynamic Programming",
        "detector": "Two changing dimensions/indices, grid state, two-string alignment, interval DP, or decisions requiring memo over a tuple state.",
        "exitTarget": "Name each DP dimension in plain English and derive transitions from smaller states instead of memorizing code."
      },
      {
        "number": 15,
        "name": "Greedy Decision-Making",
        "detector": "A locally best irreversible choice can be proven safe; track a frontier/range/resource rather than all histories.",
        "exitTarget": "State the greedy invariant and give a short exchange/frontier argument for why the local choice is safe."
      },
      {
        "number": 16,
        "name": "Bit Manipulation",
        "detector": "Odd/even appearances, set bits, binary representation, or arithmetic without + and − — usually with O(1) extra space.",
        "exitTarget": "Name the bit identity you rely on (x^x=0, x&(x−1), shifts) and the 32-bit edge case before coding."
      },
      {
        "number": 17,
        "name": "Math & Geometry",
        "detector": "Matrix rotation/spiral/in-place marking, digit carries, big numbers as strings, fast powers, or points on a grid.",
        "exitTarget": "Write the index formula or arithmetic rule first and say which value must be saved before it is overwritten."
      }
    ],
    "blocks": [
      {
        "id": "baseline",
        "title": "Day 0 — Baseline, Setup & Rules",
        "type": "baseline",
        "start": "2026-08-23",
        "end": "2026-08-23"
      },
      {
        "id": "pattern-1",
        "title": "Pattern 1: Arrays & Hashing",
        "type": "study",
        "patternNumber": 1,
        "start": "2026-08-24",
        "end": "2026-08-30",
        "detector": "Need O(1) membership/counting/grouping, complement lookup, prefix/suffix accumulation, or a set boundary.",
        "exitTarget": "Choose list vs set vs map quickly; state the invariant and Big-O before coding."
      },
      {
        "id": "pattern-2",
        "title": "Pattern 2: Two Pointers",
        "type": "study",
        "patternNumber": 2,
        "start": "2026-08-31",
        "end": "2026-09-06",
        "detector": "Sorted or symmetric data, pair/triple search, in-place scan, cycle-like movement, or a decision about which boundary can move.",
        "exitTarget": "Explain why moving one pointer cannot discard an optimal answer."
      },
      {
        "id": "pattern-3",
        "title": "Pattern 3: Sliding Window",
        "type": "study",
        "patternNumber": 3,
        "start": "2026-09-07",
        "end": "2026-09-13",
        "detector": "Contiguous subarray/substring + best/longest/shortest/count condition; right expands, left repairs validity.",
        "exitTarget": "State window contents, validity condition, update moment, and why each pointer moves O(n) total."
      },
      {
        "id": "pattern-4",
        "title": "Pattern 4: Stack & Monotonic Stack",
        "type": "study",
        "patternNumber": 4,
        "start": "2026-09-14",
        "end": "2026-09-20",
        "detector": "Nested structure, undo/LIFO state, expression evaluation, or nearest greater/smaller boundary.",
        "exitTarget": "Know what each stack element represents and what event causes it to pop."
      },
      {
        "id": "pattern-5",
        "title": "Pattern 5: Binary Search",
        "type": "study",
        "patternNumber": 5,
        "start": "2026-09-21",
        "end": "2026-09-27",
        "detector": "Monotonic yes/no answer, sorted search space, rotated order, or need to find first/last feasible boundary.",
        "exitTarget": "Write one binary-search template without off-by-one errors and prove which half can be discarded."
      },
      {
        "id": "revision-5",
        "title": "Revision 1 — Patterns 1–5",
        "type": "revision",
        "start": "2026-09-28",
        "end": "2026-10-02"
      },
      {
        "id": "bridge-1",
        "title": "Bridge — Mixed Retention",
        "type": "bridge",
        "start": "2026-10-03",
        "end": "2026-10-04"
      },
      {
        "id": "pattern-6",
        "title": "Pattern 6: Linked Lists",
        "type": "study",
        "patternNumber": 6,
        "start": "2026-10-05",
        "end": "2026-10-11",
        "detector": "Pointer rewiring, node deletion/insertion, fast/slow cycle logic, merge streams, or cache ordering.",
        "exitTarget": "Draw pointer states before coding; never lose the remainder of the list during rewiring."
      },
      {
        "id": "pattern-7",
        "title": "Pattern 7: Tree Traversal & Recursion",
        "type": "study",
        "patternNumber": 7,
        "start": "2026-10-12",
        "end": "2026-10-18",
        "detector": "Hierarchical data where answer combines child results, needs DFS order, or level-by-level BFS.",
        "exitTarget": "Choose DFS preorder/inorder/postorder vs BFS deliberately; state base case and returned meaning."
      },
      {
        "id": "pattern-8",
        "title": "Pattern 8: BST, Tree Construction & Tree DP",
        "type": "study",
        "patternNumber": 8,
        "start": "2026-10-19",
        "end": "2026-10-25",
        "detector": "BST ordering, inorder rank, reconstructing structure from traversals, serializing state, or path value combining child contributions.",
        "exitTarget": "Carry valid bounds/state through recursion and distinguish local return value from global answer."
      },
      {
        "id": "pattern-9",
        "title": "Pattern 9: Heaps, Intervals & Scheduling",
        "type": "study",
        "start": "2026-10-26",
        "end": "2026-11-01",
        "patternNumber": 9,
        "detector": "Repeated best-next choice, top-K/median stream, merging/scheduling by time, or active intervals ordered by finish/size.",
        "exitTarget": "Know whether you need min-heap/max-heap, what key is stored, and when stale/finished items leave."
      },
      {
        "id": "pattern-10",
        "title": "Pattern 10: Backtracking & Trie Search",
        "type": "study",
        "start": "2026-11-02",
        "end": "2026-11-08",
        "patternNumber": 10,
        "detector": "Enumerate choices under constraints, explore/undo state, prefix pruning, or search many words against shared prefixes.",
        "exitTarget": "Define state, choices, constraint, base case and undo step before writing recursion."
      },
      {
        "id": "buffer-1",
        "title": "Catch-up day",
        "type": "buffer",
        "start": "2026-11-09",
        "end": "2026-11-09"
      },
      {
        "id": "pattern-16",
        "title": "Pattern 16: Bit Manipulation",
        "type": "study",
        "start": "2026-11-10",
        "end": "2026-11-13",
        "patternNumber": 16,
        "detector": "Odd/even appearances, set bits, binary representation, or arithmetic without + and − — usually with O(1) extra space.",
        "exitTarget": "Name the bit identity you rely on (x^x=0, x&(x−1), shifts) and the 32-bit edge case before coding.",
        "lessonStages": [
          0,
          1,
          2,
          6
        ]
      },
      {
        "id": "pattern-17",
        "title": "Pattern 17: Math & Geometry",
        "type": "study",
        "start": "2026-11-14",
        "end": "2026-11-17",
        "patternNumber": 17,
        "detector": "Matrix rotation/spiral/in-place marking, digit carries, big numbers as strings, fast powers, or points on a grid.",
        "exitTarget": "Write the index formula or arithmetic rule first and say which value must be saved before it is overwritten.",
        "lessonStages": [
          0,
          1,
          2,
          6
        ]
      },
      {
        "id": "revision-2",
        "title": "Revision 2 — Patterns 1–10",
        "type": "revision",
        "start": "2026-11-18",
        "end": "2026-11-22"
      },
      {
        "id": "bridge-2",
        "title": "Bridge — Mixed Recognition",
        "type": "bridge",
        "start": "2026-11-23",
        "end": "2026-11-24"
      },
      {
        "id": "pattern-11",
        "title": "Pattern 11: Graph Traversal",
        "type": "study",
        "start": "2026-11-25",
        "end": "2026-12-02",
        "patternNumber": 11,
        "detector": "Nodes/edges, connectivity, components, shortest unweighted layers, dependency cycles, or grid cells behaving like vertices.",
        "exitTarget": "Convert the story to graph state, choose BFS vs DFS, and define visited semantics before coding."
      },
      {
        "id": "pattern-12",
        "title": "Pattern 12: Advanced Graphs",
        "type": "study",
        "start": "2026-12-03",
        "end": "2026-12-09",
        "patternNumber": 12,
        "detector": "Weighted shortest path, minimum spanning tree, itinerary/Eulerian ordering, or topological order over inferred symbols.",
        "exitTarget": "Recognize Dijkstra vs Prim/Kruskal vs topological/Eulerian structure from constraints and edge weights."
      },
      {
        "id": "buffer-2",
        "title": "Catch-up day",
        "type": "buffer",
        "start": "2026-12-10",
        "end": "2026-12-10"
      },
      {
        "id": "pattern-13",
        "title": "Pattern 13: 1-D Dynamic Programming",
        "type": "study",
        "start": "2026-12-11",
        "end": "2026-12-17",
        "patternNumber": 13,
        "detector": "Optimal/counting answer over a linear state where subproblems repeat and future depends on a small prefix/suffix state.",
        "exitTarget": "Write state definition, recurrence, base cases and iteration order before code; then compress space if safe."
      },
      {
        "id": "pattern-14",
        "title": "Pattern 14: 2-D Dynamic Programming",
        "type": "study",
        "start": "2026-12-18",
        "end": "2026-12-24",
        "patternNumber": 14,
        "detector": "Two changing dimensions/indices, grid state, two-string alignment, interval DP, or decisions requiring memo over a tuple state.",
        "exitTarget": "Name each DP dimension in plain English and derive transitions from smaller states instead of memorizing code."
      },
      {
        "id": "pattern-15",
        "title": "Pattern 15: Greedy Decision-Making",
        "type": "study",
        "start": "2026-12-25",
        "end": "2027-01-02",
        "patternNumber": 15,
        "detector": "A locally best irreversible choice can be proven safe; track a frontier/range/resource rather than all histories.",
        "exitTarget": "State the greedy invariant and give a short exchange/frontier argument for why the local choice is safe."
      },
      {
        "id": "revision-final",
        "title": "Final Revision — All 17 patterns",
        "type": "revision",
        "start": "2027-01-03",
        "end": "2027-01-11"
      }
    ],
    "schedule": [
      {
        "id": "2026-08-23-baseline",
        "date": "2026-08-23",
        "type": "baseline",
        "blockId": "baseline",
        "blockTitle": "Day 0 — Baseline, Setup & Rules",
        "patternNumber": null,
        "focus": "Establish a clean baseline: set up your interview-language template, write the Big-O ladder from memory, cold-attempt Two Sum, then reconstruct and finish with Contains Duplicate.",
        "resourceIds": [
          "lc-two-sum",
          "lc-contains-duplicate"
        ],
        "plannedMinutes": 90,
        "topic": "Establish a clean baseline: set up your interview-language template, write the Big-O ladder from memory, cold-attempt Two Sum, then reconstruct and finish with Contains Duplicate.",
        "plan": ""
      },
      {
        "id": "2026-08-24-p1",
        "date": "2026-08-24",
        "type": "study",
        "blockId": "pattern-1",
        "blockTitle": "Pattern 1: Arrays & Hashing",
        "patternNumber": 1,
        "focus": "Arrays, sets, maps, Big-O and membership 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-contains-duplicate",
          "lc-valid-anagram"
        ],
        "plannedMinutes": 90,
        "topic": "Arrays, sets, maps, Big-O and membership",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-08-25-p1",
        "date": "2026-08-25",
        "type": "study",
        "blockId": "pattern-1",
        "blockTitle": "Pattern 1: Arrays & Hashing",
        "patternNumber": 1,
        "focus": "Frequency maps, canonical keys and complement lookup 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-two-sum",
          "lc-group-anagrams"
        ],
        "plannedMinutes": 90,
        "topic": "Frequency maps, canonical keys and complement lookup",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-08-26-p1",
        "date": "2026-08-26",
        "type": "study",
        "blockId": "pattern-1",
        "blockTitle": "Pattern 1: Arrays & Hashing",
        "patternNumber": 1,
        "focus": "Prefix/suffix accumulation and bucket thinking 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-product-of-array-except-self",
          "lc-top-k-frequent-elements"
        ],
        "plannedMinutes": 90,
        "topic": "Prefix/suffix accumulation and bucket thinking",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-08-27-p1",
        "date": "2026-08-27",
        "type": "study",
        "blockId": "pattern-1",
        "blockTitle": "Pattern 1: Arrays & Hashing",
        "patternNumber": 1,
        "focus": "Encoding, matrix validation and hash-set structure 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-encode-and-decode-strings",
          "lc-valid-sudoku"
        ],
        "plannedMinutes": 90,
        "topic": "Encoding, matrix validation and hash-set structure",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-08-28-p1",
        "date": "2026-08-28",
        "type": "study",
        "blockId": "pattern-1",
        "blockTitle": "Pattern 1: Arrays & Hashing",
        "patternNumber": 1,
        "focus": "Sequence boundaries and arithmetic edge cases 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-longest-consecutive-sequence",
          "lc-plus-one"
        ],
        "plannedMinutes": 90,
        "topic": "Sequence boundaries and arithmetic edge cases",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-08-29-p1",
        "date": "2026-08-29",
        "type": "study",
        "blockId": "pattern-1",
        "blockTitle": "Pattern 1: Arrays & Hashing",
        "patternNumber": 1,
        "focus": "Hashing alternatives: XOR and index/range reasoning 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-single-number",
          "lc-missing-number"
        ],
        "plannedMinutes": 90,
        "topic": "Hashing alternatives: XOR and index/range reasoning",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-08-30-p1",
        "date": "2026-08-30",
        "type": "study",
        "blockId": "pattern-1",
        "blockTitle": "Pattern 1: Arrays & Hashing",
        "patternNumber": 1,
        "focus": "Mastery test: classify first, then cold re-solve 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-two-sum",
          "lc-product-of-array-except-self"
        ],
        "plannedMinutes": 90,
        "topic": "Mastery test: classify first, then cold re-solve",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-08-31-p2",
        "date": "2026-08-31",
        "type": "study",
        "blockId": "pattern-2",
        "blockTitle": "Pattern 2: Two Pointers",
        "patternNumber": 2,
        "focus": "Opposite-direction and same-direction pointer invariants 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-valid-palindrome",
          "lc-happy-number"
        ],
        "plannedMinutes": 90,
        "topic": "Opposite-direction and same-direction pointer invariants",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-01-p2",
        "date": "2026-09-01",
        "type": "study",
        "blockId": "pattern-2",
        "blockTitle": "Pattern 2: Two Pointers",
        "patternNumber": 2,
        "focus": "Sorted pair search and pointer movement proof 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-two-sum-ii-input-array-is-sorted",
          "lc-reverse-bits"
        ],
        "plannedMinutes": 90,
        "topic": "Sorted pair search and pointer movement proof",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-02-p2",
        "date": "2026-09-02",
        "type": "study",
        "blockId": "pattern-2",
        "blockTitle": "Pattern 2: Two Pointers",
        "patternNumber": 2,
        "focus": "3Sum: sort, skip duplicates, shrink search space 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-3sum",
          "lc-spiral-matrix"
        ],
        "plannedMinutes": 90,
        "topic": "3Sum: sort, skip duplicates, shrink search space",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-03-p2",
        "date": "2026-09-03",
        "type": "study",
        "blockId": "pattern-2",
        "blockTitle": "Pattern 2: Two Pointers",
        "patternNumber": 2,
        "focus": "Greedy boundary movement and area reasoning 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-container-with-most-water",
          "lc-rotate-image"
        ],
        "plannedMinutes": 90,
        "topic": "Greedy boundary movement and area reasoning",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-04-p2",
        "date": "2026-09-04",
        "type": "study",
        "blockId": "pattern-2",
        "blockTitle": "Pattern 2: Two Pointers",
        "patternNumber": 2,
        "focus": "Matrix traversal/transform as controlled index movement 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-set-matrix-zeroes",
          "lc-detect-squares"
        ],
        "plannedMinutes": 90,
        "topic": "Matrix traversal/transform as controlled index movement",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-05-p2",
        "date": "2026-09-05",
        "type": "study",
        "blockId": "pattern-2",
        "blockTitle": "Pattern 2: Two Pointers",
        "patternNumber": 2,
        "focus": "Representation reversal and edge handling 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-reverse-integer",
          "lc-3sum"
        ],
        "plannedMinutes": 90,
        "topic": "Representation reversal and edge handling",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-06-p2",
        "date": "2026-09-06",
        "type": "study",
        "blockId": "pattern-2",
        "blockTitle": "Pattern 2: Two Pointers",
        "patternNumber": 2,
        "focus": "Hard capstone and mastery re-solve 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-trapping-rain-water",
          "lc-container-with-most-water"
        ],
        "plannedMinutes": 90,
        "topic": "Hard capstone and mastery re-solve",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-07-p3",
        "date": "2026-09-07",
        "type": "study",
        "blockId": "pattern-3",
        "blockTitle": "Pattern 3: Sliding Window",
        "patternNumber": 3,
        "focus": "Fixed vs variable windows; window invariant 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-best-time-to-buy-and-sell-stock",
          "lc-counting-bits"
        ],
        "plannedMinutes": 90,
        "topic": "Fixed vs variable windows; window invariant",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-08-p3",
        "date": "2026-09-08",
        "type": "study",
        "blockId": "pattern-3",
        "blockTitle": "Pattern 3: Sliding Window",
        "patternNumber": 3,
        "focus": "Unique-content windows and left-bound repair 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-longest-substring-without-repeating-characters",
          "lc-best-time-to-buy-and-sell-stock"
        ],
        "plannedMinutes": 90,
        "topic": "Unique-content windows and left-bound repair",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-09-p3",
        "date": "2026-09-09",
        "type": "study",
        "blockId": "pattern-3",
        "blockTitle": "Pattern 3: Sliding Window",
        "patternNumber": 3,
        "focus": "Frequency windows and relaxed validity 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-longest-repeating-character-replacement",
          "lc-longest-substring-without-repeating-characters"
        ],
        "plannedMinutes": 90,
        "topic": "Frequency windows and relaxed validity",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-10-p3",
        "date": "2026-09-10",
        "type": "study",
        "blockId": "pattern-3",
        "blockTitle": "Pattern 3: Sliding Window",
        "patternNumber": 3,
        "focus": "Exact frequency matching and fixed-size checks 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-permutation-in-string",
          "lc-longest-repeating-character-replacement"
        ],
        "plannedMinutes": 90,
        "topic": "Exact frequency matching and fixed-size checks",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-11-p3",
        "date": "2026-09-11",
        "type": "study",
        "blockId": "pattern-3",
        "blockTitle": "Pattern 3: Sliding Window",
        "patternNumber": 3,
        "focus": "Minimum valid window: formed/required state 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-minimum-window-substring",
          "lc-permutation-in-string"
        ],
        "plannedMinutes": 90,
        "topic": "Minimum valid window: formed/required state",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-12-p3",
        "date": "2026-09-12",
        "type": "study",
        "blockId": "pattern-3",
        "blockTitle": "Pattern 3: Sliding Window",
        "patternNumber": 3,
        "focus": "Monotonic deque for window extrema 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-sliding-window-maximum",
          "lc-longest-substring-without-repeating-characters"
        ],
        "plannedMinutes": 90,
        "topic": "Monotonic deque for window extrema",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-13-p3",
        "date": "2026-09-13",
        "type": "study",
        "blockId": "pattern-3",
        "blockTitle": "Pattern 3: Sliding Window",
        "patternNumber": 3,
        "focus": "Cold hard re-solves and pattern discrimination 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-minimum-window-substring",
          "lc-sliding-window-maximum"
        ],
        "plannedMinutes": 90,
        "topic": "Cold hard re-solves and pattern discrimination",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-14-p4",
        "date": "2026-09-14",
        "type": "study",
        "blockId": "pattern-4",
        "blockTitle": "Pattern 4: Stack & Monotonic Stack",
        "patternNumber": 4,
        "focus": "LIFO state and matching delimiters 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-valid-parentheses",
          "lc-number-of-1-bits"
        ],
        "plannedMinutes": 90,
        "topic": "LIFO state and matching delimiters",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-15-p4",
        "date": "2026-09-15",
        "type": "study",
        "blockId": "pattern-4",
        "blockTitle": "Pattern 4: Stack & Monotonic Stack",
        "patternNumber": 4,
        "focus": "Stateful stacks and constant-time auxiliary state 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-min-stack",
          "lc-valid-parentheses"
        ],
        "plannedMinutes": 90,
        "topic": "Stateful stacks and constant-time auxiliary state",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-16-p4",
        "date": "2026-09-16",
        "type": "study",
        "blockId": "pattern-4",
        "blockTitle": "Pattern 4: Stack & Monotonic Stack",
        "patternNumber": 4,
        "focus": "Expression evaluation and operand order 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-evaluate-reverse-polish-notation",
          "lc-min-stack"
        ],
        "plannedMinutes": 90,
        "topic": "Expression evaluation and operand order",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-17-p4",
        "date": "2026-09-17",
        "type": "study",
        "blockId": "pattern-4",
        "blockTitle": "Pattern 4: Stack & Monotonic Stack",
        "patternNumber": 4,
        "focus": "Monotonic stack: next-greater/next-smaller boundaries 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-daily-temperatures",
          "lc-sum-of-two-integers"
        ],
        "plannedMinutes": 90,
        "topic": "Monotonic stack: next-greater/next-smaller boundaries",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-18-p4",
        "date": "2026-09-18",
        "type": "study",
        "blockId": "pattern-4",
        "blockTitle": "Pattern 4: Stack & Monotonic Stack",
        "patternNumber": 4,
        "focus": "Sort + stack reasoning for converging states 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-car-fleet",
          "lc-daily-temperatures"
        ],
        "plannedMinutes": 90,
        "topic": "Sort + stack reasoning for converging states",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-19-p4",
        "date": "2026-09-19",
        "type": "study",
        "blockId": "pattern-4",
        "blockTitle": "Pattern 4: Stack & Monotonic Stack",
        "patternNumber": 4,
        "focus": "Histogram boundary compression and bitwise satellite 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-largest-rectangle-in-histogram",
          "lc-car-fleet"
        ],
        "plannedMinutes": 90,
        "topic": "Histogram boundary compression and bitwise satellite",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-20-p4",
        "date": "2026-09-20",
        "type": "study",
        "blockId": "pattern-4",
        "blockTitle": "Pattern 4: Stack & Monotonic Stack",
        "patternNumber": 4,
        "focus": "Cold hard re-solve and template recall 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-largest-rectangle-in-histogram",
          "lc-evaluate-reverse-polish-notation"
        ],
        "plannedMinutes": 90,
        "topic": "Cold hard re-solve and template recall",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-21-p5",
        "date": "2026-09-21",
        "type": "study",
        "blockId": "pattern-5",
        "blockTitle": "Pattern 5: Binary Search",
        "patternNumber": 5,
        "focus": "Core binary search, bounds and termination 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-binary-search",
          "lc-search-a-2d-matrix"
        ],
        "plannedMinutes": 90,
        "topic": "Core binary search, bounds and termination",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-22-p5",
        "date": "2026-09-22",
        "type": "study",
        "blockId": "pattern-5",
        "blockTitle": "Pattern 5: Binary Search",
        "patternNumber": 5,
        "focus": "Flattened/structured search spaces 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-koko-eating-bananas",
          "lc-binary-search"
        ],
        "plannedMinutes": 90,
        "topic": "Flattened/structured search spaces",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-23-p5",
        "date": "2026-09-23",
        "type": "study",
        "blockId": "pattern-5",
        "blockTitle": "Pattern 5: Binary Search",
        "patternNumber": 5,
        "focus": "Binary search on answer / feasibility predicate 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-find-minimum-in-rotated-sorted-array",
          "lc-search-in-rotated-sorted-array"
        ],
        "plannedMinutes": 90,
        "topic": "Binary search on answer / feasibility predicate",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-24-p5",
        "date": "2026-09-24",
        "type": "study",
        "blockId": "pattern-5",
        "blockTitle": "Pattern 5: Binary Search",
        "patternNumber": 5,
        "focus": "Rotated sorted arrays and ordered-half detection 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-time-based-key-value-store",
          "lc-koko-eating-bananas"
        ],
        "plannedMinutes": 90,
        "topic": "Rotated sorted arrays and ordered-half detection",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-25-p5",
        "date": "2026-09-25",
        "type": "study",
        "blockId": "pattern-5",
        "blockTitle": "Pattern 5: Binary Search",
        "patternNumber": 5,
        "focus": "Time-indexed values plus arithmetic satellites 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-pow-x-n",
          "lc-multiply-strings"
        ],
        "plannedMinutes": 90,
        "topic": "Time-indexed values plus arithmetic satellites",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-26-p5",
        "date": "2026-09-26",
        "type": "study",
        "blockId": "pattern-5",
        "blockTitle": "Pattern 5: Binary Search",
        "patternNumber": 5,
        "focus": "Partition-based hard binary search 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-median-of-two-sorted-arrays",
          "lc-search-in-rotated-sorted-array"
        ],
        "plannedMinutes": 90,
        "topic": "Partition-based hard binary search",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-27-p5",
        "date": "2026-09-27",
        "type": "study",
        "blockId": "pattern-5",
        "blockTitle": "Pattern 5: Binary Search",
        "patternNumber": 5,
        "focus": "Cold hard re-solve and off-by-one audit 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-median-of-two-sorted-arrays",
          "lc-time-based-key-value-store"
        ],
        "plannedMinutes": 90,
        "topic": "Cold hard re-solve and off-by-one audit",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-09-28-revision-5",
        "date": "2026-09-28",
        "type": "revision",
        "blockId": "revision-5",
        "blockTitle": "Revision 1 — Patterns 1–5",
        "patternNumber": 1,
        "focus": "Cold retrieval revision for Pattern 1: Arrays & Hashing 10m blank recall + detector; 25m each cold solve; 20m error log; 10m update pattern card. Start from a blank editor. Record missed clue, broken invariant, edge case, and corrected detector.",
        "resourceIds": [
          "lc-two-sum",
          "lc-longest-consecutive-sequence"
        ],
        "plannedMinutes": 90,
        "topic": "Cold retrieval revision for Pattern 1: Arrays & Hashing",
        "plan": "10m blank recall + detector; 25m each cold solve; 20m error log; 10m update pattern card. Start from a blank editor. Record missed clue, broken invariant, edge case, and corrected detector."
      },
      {
        "id": "2026-09-29-revision-5",
        "date": "2026-09-29",
        "type": "revision",
        "blockId": "revision-5",
        "blockTitle": "Revision 1 — Patterns 1–5",
        "patternNumber": 2,
        "focus": "Cold retrieval revision for Pattern 2: Two Pointers 10m blank recall + detector; 25m each cold solve; 20m error log; 10m update pattern card. Start from a blank editor. Record missed clue, broken invariant, edge case, and corrected detector.",
        "resourceIds": [
          "lc-3sum",
          "lc-trapping-rain-water"
        ],
        "plannedMinutes": 90,
        "topic": "Cold retrieval revision for Pattern 2: Two Pointers",
        "plan": "10m blank recall + detector; 25m each cold solve; 20m error log; 10m update pattern card. Start from a blank editor. Record missed clue, broken invariant, edge case, and corrected detector."
      },
      {
        "id": "2026-09-30-revision-5",
        "date": "2026-09-30",
        "type": "revision",
        "blockId": "revision-5",
        "blockTitle": "Revision 1 — Patterns 1–5",
        "patternNumber": 3,
        "focus": "Cold retrieval revision for Pattern 3: Sliding Window 10m blank recall + detector; 25m each cold solve; 20m error log; 10m update pattern card. Start from a blank editor. Record missed clue, broken invariant, edge case, and corrected detector.",
        "resourceIds": [
          "lc-longest-repeating-character-replacement",
          "lc-minimum-window-substring"
        ],
        "plannedMinutes": 90,
        "topic": "Cold retrieval revision for Pattern 3: Sliding Window",
        "plan": "10m blank recall + detector; 25m each cold solve; 20m error log; 10m update pattern card. Start from a blank editor. Record missed clue, broken invariant, edge case, and corrected detector."
      },
      {
        "id": "2026-10-01-revision-5",
        "date": "2026-10-01",
        "type": "revision",
        "blockId": "revision-5",
        "blockTitle": "Revision 1 — Patterns 1–5",
        "patternNumber": 4,
        "focus": "Cold retrieval revision for Pattern 4: Stack & Monotonic Stack 10m blank recall + detector; 25m each cold solve; 20m error log; 10m update pattern card. Start from a blank editor. Record missed clue, broken invariant, edge case, and corrected detector.",
        "resourceIds": [
          "lc-daily-temperatures",
          "lc-largest-rectangle-in-histogram"
        ],
        "plannedMinutes": 90,
        "topic": "Cold retrieval revision for Pattern 4: Stack & Monotonic Stack",
        "plan": "10m blank recall + detector; 25m each cold solve; 20m error log; 10m update pattern card. Start from a blank editor. Record missed clue, broken invariant, edge case, and corrected detector."
      },
      {
        "id": "2026-10-02-revision-5",
        "date": "2026-10-02",
        "type": "revision",
        "blockId": "revision-5",
        "blockTitle": "Revision 1 — Patterns 1–5",
        "patternNumber": 5,
        "focus": "Cold retrieval revision for Pattern 5: Binary Search 10m blank recall + detector; 25m each cold solve; 20m error log; 10m update pattern card. Start from a blank editor. Record missed clue, broken invariant, edge case, and corrected detector.",
        "resourceIds": [
          "lc-koko-eating-bananas",
          "lc-median-of-two-sorted-arrays"
        ],
        "plannedMinutes": 90,
        "topic": "Cold retrieval revision for Pattern 5: Binary Search",
        "plan": "10m blank recall + detector; 25m each cold solve; 20m error log; 10m update pattern card. Start from a blank editor. Record missed clue, broken invariant, edge case, and corrected detector."
      },
      {
        "id": "2026-10-03-bridge-1",
        "date": "2026-10-03",
        "type": "bridge",
        "blockId": "bridge-1",
        "blockTitle": "Bridge — Mixed Retention",
        "patternNumber": null,
        "focus": "Mixed detector drill: compare hashing vs binary-search clues. 15m classify 8 stems, then two cold solves.",
        "resourceIds": [
          "lc-group-anagrams",
          "lc-binary-search"
        ],
        "plannedMinutes": 90,
        "topic": "Mixed detector drill: compare hashing vs binary-search clues. 15m classify 8 stems, then two cold solves.",
        "plan": ""
      },
      {
        "id": "2026-10-04-bridge-1",
        "date": "2026-10-04",
        "type": "bridge",
        "blockId": "bridge-1",
        "blockTitle": "Bridge — Mixed Retention",
        "patternNumber": null,
        "focus": "Mixed detector drill: compare sliding-window vs monotonic-stack clues.",
        "resourceIds": [
          "lc-longest-substring-without-repeating-characters",
          "lc-daily-temperatures"
        ],
        "plannedMinutes": 90,
        "topic": "Mixed detector drill: compare sliding-window vs monotonic-stack clues.",
        "plan": ""
      },
      {
        "id": "2026-10-05-p6",
        "date": "2026-10-05",
        "type": "study",
        "blockId": "pattern-6",
        "blockTitle": "Pattern 6: Linked Lists",
        "patternNumber": 6,
        "focus": "Pointer anatomy, reversal and dummy nodes 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-reverse-linked-list",
          "lc-merge-two-sorted-lists"
        ],
        "plannedMinutes": 90,
        "topic": "Pointer anatomy, reversal and dummy nodes",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-06-p6",
        "date": "2026-10-06",
        "type": "study",
        "blockId": "pattern-6",
        "blockTitle": "Pattern 6: Linked Lists",
        "patternNumber": 6,
        "focus": "Fast/slow pointers and one-pass deletion 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-linked-list-cycle",
          "lc-remove-nth-node-from-end-of-list"
        ],
        "plannedMinutes": 90,
        "topic": "Fast/slow pointers and one-pass deletion",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-07-p6",
        "date": "2026-10-07",
        "type": "study",
        "blockId": "pattern-6",
        "blockTitle": "Pattern 6: Linked Lists",
        "patternNumber": 6,
        "focus": "Split-reverse-merge and cycle-style reasoning 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-reorder-list",
          "lc-find-the-duplicate-number"
        ],
        "plannedMinutes": 90,
        "topic": "Split-reverse-merge and cycle-style reasoning",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-08-p6",
        "date": "2026-10-08",
        "type": "study",
        "blockId": "pattern-6",
        "blockTitle": "Pattern 6: Linked Lists",
        "patternNumber": 6,
        "focus": "Deep copy and digit-by-digit linked arithmetic 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-copy-list-with-random-pointer",
          "lc-add-two-numbers"
        ],
        "plannedMinutes": 90,
        "topic": "Deep copy and digit-by-digit linked arithmetic",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-09-p6",
        "date": "2026-10-09",
        "type": "study",
        "blockId": "pattern-6",
        "blockTitle": "Pattern 6: Linked Lists",
        "patternNumber": 6,
        "focus": "Hash map + doubly-linked design for O(1) cache 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-lru-cache",
          "lc-reverse-linked-list"
        ],
        "plannedMinutes": 90,
        "topic": "Hash map + doubly-linked design for O(1) cache",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-10-p6",
        "date": "2026-10-10",
        "type": "study",
        "blockId": "pattern-6",
        "blockTitle": "Pattern 6: Linked Lists",
        "patternNumber": 6,
        "focus": "Heap + linked lists for K-way merge 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-merge-k-sorted-lists",
          "lc-reorder-list"
        ],
        "plannedMinutes": 90,
        "topic": "Heap + linked lists for K-way merge",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-11-p6",
        "date": "2026-10-11",
        "type": "study",
        "blockId": "pattern-6",
        "blockTitle": "Pattern 6: Linked Lists",
        "patternNumber": 6,
        "focus": "K-group reversal and end-of-week mastery 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-reverse-nodes-in-k-group",
          "lc-lru-cache"
        ],
        "plannedMinutes": 90,
        "topic": "K-group reversal and end-of-week mastery",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-12-p7",
        "date": "2026-10-12",
        "type": "study",
        "blockId": "pattern-7",
        "blockTitle": "Pattern 7: Tree Traversal & Recursion",
        "patternNumber": 7,
        "focus": "Recursive tree template and base cases 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-invert-binary-tree",
          "lc-maximum-depth-of-binary-tree"
        ],
        "plannedMinutes": 90,
        "topic": "Recursive tree template and base cases",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-13-p7",
        "date": "2026-10-13",
        "type": "study",
        "blockId": "pattern-7",
        "blockTitle": "Pattern 7: Tree Traversal & Recursion",
        "patternNumber": 7,
        "focus": "Return-value DFS: height and diameter 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-diameter-of-binary-tree",
          "lc-balanced-binary-tree"
        ],
        "plannedMinutes": 90,
        "topic": "Return-value DFS: height and diameter",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-14-p7",
        "date": "2026-10-14",
        "type": "study",
        "blockId": "pattern-7",
        "blockTitle": "Pattern 7: Tree Traversal & Recursion",
        "patternNumber": 7,
        "focus": "Structural comparison and recursive predicates 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-same-tree",
          "lc-subtree-of-another-tree"
        ],
        "plannedMinutes": 90,
        "topic": "Structural comparison and recursive predicates",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-15-p7",
        "date": "2026-10-15",
        "type": "study",
        "blockId": "pattern-7",
        "blockTitle": "Pattern 7: Tree Traversal & Recursion",
        "patternNumber": 7,
        "focus": "BFS level traversal and queue boundaries 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-binary-tree-level-order-traversal",
          "lc-binary-tree-right-side-view"
        ],
        "plannedMinutes": 90,
        "topic": "BFS level traversal and queue boundaries",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-16-p7",
        "date": "2026-10-16",
        "type": "study",
        "blockId": "pattern-7",
        "blockTitle": "Pattern 7: Tree Traversal & Recursion",
        "patternNumber": 7,
        "focus": "Re-solve simple DFS without notes 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-maximum-depth-of-binary-tree",
          "lc-diameter-of-binary-tree"
        ],
        "plannedMinutes": 90,
        "topic": "Re-solve simple DFS without notes",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-17-p7",
        "date": "2026-10-17",
        "type": "study",
        "blockId": "pattern-7",
        "blockTitle": "Pattern 7: Tree Traversal & Recursion",
        "patternNumber": 7,
        "focus": "Mixed DFS/BFS transfer practice 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-subtree-of-another-tree",
          "lc-binary-tree-level-order-traversal"
        ],
        "plannedMinutes": 90,
        "topic": "Mixed DFS/BFS transfer practice",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-18-p7",
        "date": "2026-10-18",
        "type": "study",
        "blockId": "pattern-7",
        "blockTitle": "Pattern 7: Tree Traversal & Recursion",
        "patternNumber": 7,
        "focus": "Mastery: explain traversal choice before code 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-same-tree",
          "lc-binary-tree-right-side-view"
        ],
        "plannedMinutes": 90,
        "topic": "Mastery: explain traversal choice before code",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-19-p8",
        "date": "2026-10-19",
        "type": "study",
        "blockId": "pattern-8",
        "blockTitle": "Pattern 8: BST, Tree Construction & Tree DP",
        "patternNumber": 8,
        "focus": "BST order and ancestor reasoning 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-lowest-common-ancestor-of-a-binary-search-tree",
          "lc-count-good-nodes-in-binary-tree"
        ],
        "plannedMinutes": 90,
        "topic": "BST order and ancestor reasoning",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-20-p8",
        "date": "2026-10-20",
        "type": "study",
        "blockId": "pattern-8",
        "blockTitle": "Pattern 8: BST, Tree Construction & Tree DP",
        "patternNumber": 8,
        "focus": "BST validation and inorder rank 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-validate-binary-search-tree",
          "lc-kth-smallest-element-in-a-bst"
        ],
        "plannedMinutes": 90,
        "topic": "BST validation and inorder rank",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-21-p8",
        "date": "2026-10-21",
        "type": "study",
        "blockId": "pattern-8",
        "blockTitle": "Pattern 8: BST, Tree Construction & Tree DP",
        "patternNumber": 8,
        "focus": "Construct tree from traversal boundaries 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-construct-binary-tree-from-preorder-and-inorder-traversal",
          "lc-lowest-common-ancestor-of-a-binary-search-tree"
        ],
        "plannedMinutes": 90,
        "topic": "Construct tree from traversal boundaries",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-22-p8",
        "date": "2026-10-22",
        "type": "study",
        "blockId": "pattern-8",
        "blockTitle": "Pattern 8: BST, Tree Construction & Tree DP",
        "patternNumber": 8,
        "focus": "State-carrying DFS and constraint propagation 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-count-good-nodes-in-binary-tree",
          "lc-validate-binary-search-tree"
        ],
        "plannedMinutes": 90,
        "topic": "State-carrying DFS and constraint propagation",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-23-p8",
        "date": "2026-10-23",
        "type": "study",
        "blockId": "pattern-8",
        "blockTitle": "Pattern 8: BST, Tree Construction & Tree DP",
        "patternNumber": 8,
        "focus": "Tree DP: local contribution vs global path 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-binary-tree-maximum-path-sum",
          "lc-kth-smallest-element-in-a-bst"
        ],
        "plannedMinutes": 90,
        "topic": "Tree DP: local contribution vs global path",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-24-p8",
        "date": "2026-10-24",
        "type": "study",
        "blockId": "pattern-8",
        "blockTitle": "Pattern 8: BST, Tree Construction & Tree DP",
        "patternNumber": 8,
        "focus": "Serialization grammar and reconstruction 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-serialize-and-deserialize-binary-tree",
          "lc-construct-binary-tree-from-preorder-and-inorder-traversal"
        ],
        "plannedMinutes": 90,
        "topic": "Serialization grammar and reconstruction",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-25-p8",
        "date": "2026-10-25",
        "type": "study",
        "blockId": "pattern-8",
        "blockTitle": "Pattern 8: BST, Tree Construction & Tree DP",
        "patternNumber": 8,
        "focus": "Hard cold re-solves 10m recall/classify | 25m Q1 | 25m Q2 | 20m solution compare | 10m pattern card",
        "resourceIds": [
          "lc-binary-tree-maximum-path-sum",
          "lc-serialize-and-deserialize-binary-tree"
        ],
        "plannedMinutes": 90,
        "topic": "Hard cold re-solves",
        "plan": "10m recall/classify · 25m Q1 · 25m Q2 · 20m solution compare · 10m pattern card"
      },
      {
        "id": "2026-10-26-p9",
        "date": "2026-10-26",
        "type": "study",
        "blockId": "pattern-9",
        "blockTitle": "Pattern 9: Heaps, Intervals & Scheduling",
        "patternNumber": 9,
        "topic": "Heap basics: keep the best k on top",
        "plannedMinutes": 90,
        "focus": "Heap basics: keep the best k on top",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-kth-largest-element-in-a-stream",
          "lc-last-stone-weight"
        ],
        "roles": {
          "lc-kth-largest-element-in-a-stream": "new",
          "lc-last-stone-weight": "new"
        }
      },
      {
        "id": "2026-10-27-p9",
        "date": "2026-10-27",
        "type": "study",
        "blockId": "pattern-9",
        "blockTitle": "Pattern 9: Heaps, Intervals & Scheduling",
        "patternNumber": 9,
        "topic": "Top-K selection: heap vs quickselect",
        "plannedMinutes": 90,
        "focus": "Top-K selection: heap vs quickselect",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-k-closest-points-to-origin",
          "lc-kth-largest-element-in-an-array"
        ],
        "roles": {
          "lc-k-closest-points-to-origin": "new",
          "lc-kth-largest-element-in-an-array": "new"
        }
      },
      {
        "id": "2026-10-28-p9",
        "date": "2026-10-28",
        "type": "study",
        "blockId": "pattern-9",
        "blockTitle": "Pattern 9: Heaps, Intervals & Scheduling",
        "patternNumber": 9,
        "topic": "Scheduling with a heap and a cooldown queue",
        "plannedMinutes": 90,
        "focus": "Scheduling with a heap and a cooldown queue",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-task-scheduler",
          "lc-design-twitter"
        ],
        "roles": {
          "lc-task-scheduler": "new",
          "lc-design-twitter": "new"
        }
      },
      {
        "id": "2026-10-29-p9",
        "date": "2026-10-29",
        "type": "study",
        "blockId": "pattern-9",
        "blockTitle": "Pattern 9: Heaps, Intervals & Scheduling",
        "patternNumber": 9,
        "topic": "Intervals: sort by start, merge overlaps",
        "plannedMinutes": 90,
        "focus": "Intervals: sort by start, merge overlaps",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-meeting-rooms",
          "lc-merge-intervals"
        ],
        "roles": {
          "lc-meeting-rooms": "new",
          "lc-merge-intervals": "new"
        }
      },
      {
        "id": "2026-10-30-p9",
        "date": "2026-10-30",
        "type": "study",
        "blockId": "pattern-9",
        "blockTitle": "Pattern 9: Heaps, Intervals & Scheduling",
        "patternNumber": 9,
        "topic": "Insert and remove intervals: the overlap invariant",
        "plannedMinutes": 90,
        "focus": "Insert and remove intervals: the overlap invariant",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-insert-interval",
          "lc-non-overlapping-intervals"
        ],
        "roles": {
          "lc-insert-interval": "new",
          "lc-non-overlapping-intervals": "new"
        }
      },
      {
        "id": "2026-10-31-p9",
        "date": "2026-10-31",
        "type": "study",
        "blockId": "pattern-9",
        "blockTitle": "Pattern 9: Heaps, Intervals & Scheduling",
        "patternNumber": 9,
        "topic": "Active rooms and two heaps for a running median",
        "plannedMinutes": 90,
        "focus": "Active rooms and two heaps for a running median",
        "plan": "10m recall & classify · 25m first problem · 40m Hard problem · 15m compare & pattern card",
        "resourceIds": [
          "lc-meeting-rooms-ii",
          "lc-find-median-from-data-stream"
        ],
        "roles": {
          "lc-meeting-rooms-ii": "new",
          "lc-find-median-from-data-stream": "new"
        }
      },
      {
        "id": "2026-11-01-p9",
        "date": "2026-11-01",
        "type": "study",
        "blockId": "pattern-9",
        "blockTitle": "Pattern 9: Heaps, Intervals & Scheduling",
        "patternNumber": 9,
        "topic": "Offline queries with a heap; cold re-solve",
        "plannedMinutes": 90,
        "focus": "Offline queries with a heap; cold re-solve",
        "plan": "10m blank-page recall · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold re-solve · 15m error log & card",
        "resourceIds": [
          "lc-minimum-interval-to-include-each-query",
          "lc-task-scheduler"
        ],
        "roles": {
          "lc-minimum-interval-to-include-each-query": "new",
          "lc-task-scheduler": "resolve"
        }
      },
      {
        "id": "2026-11-02-p10",
        "date": "2026-11-02",
        "type": "study",
        "blockId": "pattern-10",
        "blockTitle": "Pattern 10: Backtracking & Trie Search",
        "patternNumber": 10,
        "topic": "Decision trees: choose, explore, un-choose",
        "plannedMinutes": 90,
        "focus": "Decision trees: choose, explore, un-choose",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-subsets",
          "lc-permutations"
        ],
        "roles": {
          "lc-subsets": "new",
          "lc-permutations": "new"
        }
      },
      {
        "id": "2026-11-03-p10",
        "date": "2026-11-03",
        "type": "study",
        "blockId": "pattern-10",
        "blockTitle": "Pattern 10: Backtracking & Trie Search",
        "patternNumber": 10,
        "topic": "Combinations vs permutations: what branches",
        "plannedMinutes": 90,
        "focus": "Combinations vs permutations: what branches",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-combination-sum",
          "lc-letter-combinations-of-a-phone-number"
        ],
        "roles": {
          "lc-combination-sum": "new",
          "lc-letter-combinations-of-a-phone-number": "new"
        }
      },
      {
        "id": "2026-11-04-p10",
        "date": "2026-11-04",
        "type": "study",
        "blockId": "pattern-10",
        "blockTitle": "Pattern 10: Backtracking & Trie Search",
        "patternNumber": 10,
        "topic": "Duplicates: sort, then skip at the same depth",
        "plannedMinutes": 90,
        "focus": "Duplicates: sort, then skip at the same depth",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-combination-sum-ii",
          "lc-subsets-ii"
        ],
        "roles": {
          "lc-combination-sum-ii": "new",
          "lc-subsets-ii": "new"
        }
      },
      {
        "id": "2026-11-05-p10",
        "date": "2026-11-05",
        "type": "study",
        "blockId": "pattern-10",
        "blockTitle": "Pattern 10: Backtracking & Trie Search",
        "patternNumber": 10,
        "topic": "Generating valid structures and partitions",
        "plannedMinutes": 90,
        "focus": "Generating valid structures and partitions",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-generate-parentheses",
          "lc-palindrome-partitioning"
        ],
        "roles": {
          "lc-generate-parentheses": "new",
          "lc-palindrome-partitioning": "new"
        }
      },
      {
        "id": "2026-11-06-p10",
        "date": "2026-11-06",
        "type": "study",
        "blockId": "pattern-10",
        "blockTitle": "Pattern 10: Backtracking & Trie Search",
        "patternNumber": 10,
        "topic": "Grid search and trie basics",
        "plannedMinutes": 90,
        "focus": "Grid search and trie basics",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-word-search",
          "lc-implement-trie-prefix-tree"
        ],
        "roles": {
          "lc-word-search": "new",
          "lc-implement-trie-prefix-tree": "new"
        }
      },
      {
        "id": "2026-11-07-p10",
        "date": "2026-11-07",
        "type": "study",
        "blockId": "pattern-10",
        "blockTitle": "Pattern 10: Backtracking & Trie Search",
        "patternNumber": 10,
        "topic": "Wildcard trie search and constraint pruning",
        "plannedMinutes": 90,
        "focus": "Wildcard trie search and constraint pruning",
        "plan": "10m recall & classify · 25m first problem · 40m Hard problem · 15m compare & pattern card",
        "resourceIds": [
          "lc-design-add-and-search-words-data-structure",
          "lc-n-queens"
        ],
        "roles": {
          "lc-design-add-and-search-words-data-structure": "new",
          "lc-n-queens": "new"
        }
      },
      {
        "id": "2026-11-08-p10",
        "date": "2026-11-08",
        "type": "study",
        "blockId": "pattern-10",
        "blockTitle": "Pattern 10: Backtracking & Trie Search",
        "patternNumber": 10,
        "topic": "Trie + backtracking capstone; cold re-solve",
        "plannedMinutes": 90,
        "focus": "Trie + backtracking capstone; cold re-solve",
        "plan": "10m blank-page recall · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold re-solve · 15m error log & card",
        "resourceIds": [
          "lc-word-search-ii",
          "lc-combination-sum-ii"
        ],
        "roles": {
          "lc-word-search-ii": "new",
          "lc-combination-sum-ii": "resolve"
        }
      },
      {
        "id": "2026-11-09-buffer-1",
        "date": "2026-11-09",
        "type": "buffer",
        "blockId": "buffer-1",
        "blockTitle": "Catch-up day",
        "patternNumber": null,
        "topic": "Catch up or rest",
        "resourceIds": [],
        "plannedMinutes": 0,
        "optional": true,
        "focus": "Catch up or rest",
        "plan": "Finish any unfinished day first, then clear your review queue. If both are done, rest — it still counts.",
        "roles": {}
      },
      {
        "id": "2026-11-10-p16",
        "date": "2026-11-10",
        "type": "study",
        "blockId": "pattern-16",
        "blockTitle": "Pattern 16: Bit Manipulation",
        "patternNumber": 16,
        "topic": "Bits from zero: XOR cancels, AND tests",
        "plannedMinutes": 90,
        "focus": "Bits from zero: XOR cancels, AND tests",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-single-number",
          "lc-number-of-1-bits"
        ],
        "roles": {
          "lc-single-number": "new",
          "lc-number-of-1-bits": "new"
        }
      },
      {
        "id": "2026-11-11-p16",
        "date": "2026-11-11",
        "type": "study",
        "blockId": "pattern-16",
        "blockTitle": "Pattern 16: Bit Manipulation",
        "patternNumber": 16,
        "topic": "Recognition: bit DP and shifting bits out",
        "plannedMinutes": 90,
        "focus": "Recognition: bit DP and shifting bits out",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-counting-bits",
          "lc-reverse-bits"
        ],
        "roles": {
          "lc-counting-bits": "new",
          "lc-reverse-bits": "new"
        }
      },
      {
        "id": "2026-11-12-p16",
        "date": "2026-11-12",
        "type": "study",
        "blockId": "pattern-16",
        "blockTitle": "Pattern 16: Bit Manipulation",
        "patternNumber": 16,
        "topic": "XOR bookkeeping and 32-bit overflow",
        "plannedMinutes": 90,
        "focus": "XOR bookkeeping and 32-bit overflow",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-missing-number",
          "lc-reverse-integer"
        ],
        "roles": {
          "lc-missing-number": "new",
          "lc-reverse-integer": "new"
        }
      },
      {
        "id": "2026-11-13-p16",
        "date": "2026-11-13",
        "type": "study",
        "blockId": "pattern-16",
        "blockTitle": "Pattern 16: Bit Manipulation",
        "patternNumber": 16,
        "topic": "Add without +; cold re-solve",
        "plannedMinutes": 90,
        "focus": "Add without +; cold re-solve",
        "plan": "10m blank-page recall · 25m cold re-solve · 25m review problem · 20m error log · 10m pattern card",
        "resourceIds": [
          "lc-sum-of-two-integers",
          "lc-number-of-1-bits"
        ],
        "roles": {
          "lc-sum-of-two-integers": "new",
          "lc-number-of-1-bits": "resolve"
        }
      },
      {
        "id": "2026-11-14-p17",
        "date": "2026-11-14",
        "type": "study",
        "blockId": "pattern-17",
        "blockTitle": "Pattern 17: Math & Geometry",
        "patternNumber": 17,
        "topic": "Simulation basics: carries and repeating values",
        "plannedMinutes": 90,
        "focus": "Simulation basics: carries and repeating values",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-plus-one",
          "lc-happy-number"
        ],
        "roles": {
          "lc-plus-one": "new",
          "lc-happy-number": "new"
        }
      },
      {
        "id": "2026-11-15-p17",
        "date": "2026-11-15",
        "type": "study",
        "blockId": "pattern-17",
        "blockTitle": "Pattern 17: Math & Geometry",
        "patternNumber": 17,
        "topic": "Matrix geometry: rotate by formula, spiral by walls",
        "plannedMinutes": 90,
        "focus": "Matrix geometry: rotate by formula, spiral by walls",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-rotate-image",
          "lc-spiral-matrix"
        ],
        "roles": {
          "lc-rotate-image": "new",
          "lc-spiral-matrix": "new"
        }
      },
      {
        "id": "2026-11-16-p17",
        "date": "2026-11-16",
        "type": "study",
        "blockId": "pattern-17",
        "blockTitle": "Pattern 17: Math & Geometry",
        "patternNumber": 17,
        "topic": "In-place markers and fast exponentiation",
        "plannedMinutes": 90,
        "focus": "In-place markers and fast exponentiation",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-set-matrix-zeroes",
          "lc-pow-x-n"
        ],
        "roles": {
          "lc-set-matrix-zeroes": "new",
          "lc-pow-x-n": "new"
        }
      },
      {
        "id": "2026-11-17-p17",
        "date": "2026-11-17",
        "type": "study",
        "blockId": "pattern-17",
        "blockTitle": "Pattern 17: Math & Geometry",
        "patternNumber": 17,
        "topic": "Grade-school multiplication and counting squares",
        "plannedMinutes": 90,
        "focus": "Grade-school multiplication and counting squares",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-multiply-strings",
          "lc-detect-squares"
        ],
        "roles": {
          "lc-multiply-strings": "new",
          "lc-detect-squares": "new"
        }
      },
      {
        "id": "2026-11-18-revision-2",
        "date": "2026-11-18",
        "type": "revision",
        "blockId": "revision-2",
        "blockTitle": "Revision 2 — Patterns 1–10",
        "patternNumber": null,
        "topic": "Cold retrieval: Arrays & Hashing + Two Pointers",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Arrays & Hashing + Two Pointers",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-longest-consecutive-sequence",
          "lc-trapping-rain-water"
        ],
        "roles": {
          "lc-longest-consecutive-sequence": "revision",
          "lc-trapping-rain-water": "revision"
        }
      },
      {
        "id": "2026-11-19-revision-2",
        "date": "2026-11-19",
        "type": "revision",
        "blockId": "revision-2",
        "blockTitle": "Revision 2 — Patterns 1–10",
        "patternNumber": null,
        "topic": "Cold retrieval: Sliding Window + Stack",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Sliding Window + Stack",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-minimum-window-substring",
          "lc-daily-temperatures"
        ],
        "roles": {
          "lc-minimum-window-substring": "revision",
          "lc-daily-temperatures": "revision"
        }
      },
      {
        "id": "2026-11-20-revision-2",
        "date": "2026-11-20",
        "type": "revision",
        "blockId": "revision-2",
        "blockTitle": "Revision 2 — Patterns 1–10",
        "patternNumber": null,
        "topic": "Cold retrieval: Binary Search + Linked Lists",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Binary Search + Linked Lists",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 25m second cold solve · 20m error log · 10m pattern cards",
        "resourceIds": [
          "lc-koko-eating-bananas",
          "lc-lru-cache"
        ],
        "roles": {
          "lc-koko-eating-bananas": "revision",
          "lc-lru-cache": "revision"
        }
      },
      {
        "id": "2026-11-21-revision-2",
        "date": "2026-11-21",
        "type": "revision",
        "blockId": "revision-2",
        "blockTitle": "Revision 2 — Patterns 1–10",
        "patternNumber": null,
        "topic": "Cold retrieval: Trees + Tree DP",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Trees + Tree DP",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-diameter-of-binary-tree",
          "lc-binary-tree-maximum-path-sum"
        ],
        "roles": {
          "lc-diameter-of-binary-tree": "revision",
          "lc-binary-tree-maximum-path-sum": "revision"
        }
      },
      {
        "id": "2026-11-22-revision-2",
        "date": "2026-11-22",
        "type": "revision",
        "blockId": "revision-2",
        "blockTitle": "Revision 2 — Patterns 1–10",
        "patternNumber": null,
        "topic": "Cold retrieval: Heaps & Intervals + Backtracking",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Heaps & Intervals + Backtracking",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-meeting-rooms-ii",
          "lc-word-search-ii"
        ],
        "roles": {
          "lc-meeting-rooms-ii": "revision",
          "lc-word-search-ii": "revision"
        }
      },
      {
        "id": "2026-11-23-bridge-2",
        "date": "2026-11-23",
        "type": "bridge",
        "blockId": "bridge-2",
        "blockTitle": "Bridge — Mixed Recognition",
        "patternNumber": null,
        "topic": "Unlabeled mix: classify by invariant before touching code",
        "plannedMinutes": 90,
        "focus": "Unlabeled mix: classify by invariant before touching code",
        "plan": "10m classify both problems without labels · 30m problem 1 · 30m problem 2 · 20m say why the nearby patterns lose",
        "resourceIds": [
          "lc-product-of-array-except-self",
          "lc-car-fleet"
        ],
        "roles": {
          "lc-product-of-array-except-self": "mixed",
          "lc-car-fleet": "mixed"
        }
      },
      {
        "id": "2026-11-24-bridge-2",
        "date": "2026-11-24",
        "type": "bridge",
        "blockId": "bridge-2",
        "blockTitle": "Bridge — Mixed Recognition",
        "patternNumber": null,
        "topic": "Unlabeled mix: search space vs pointer state",
        "plannedMinutes": 90,
        "focus": "Unlabeled mix: search space vs pointer state",
        "plan": "10m classify both problems without labels · 30m problem 1 · 30m problem 2 · 20m say why the nearby patterns lose",
        "resourceIds": [
          "lc-search-in-rotated-sorted-array",
          "lc-copy-list-with-random-pointer"
        ],
        "roles": {
          "lc-search-in-rotated-sorted-array": "mixed",
          "lc-copy-list-with-random-pointer": "mixed"
        }
      },
      {
        "id": "2026-11-25-p11",
        "date": "2026-11-25",
        "type": "study",
        "blockId": "pattern-11",
        "blockTitle": "Pattern 11: Graph Traversal",
        "patternNumber": 11,
        "topic": "Grid DFS/BFS and the visited set",
        "plannedMinutes": 90,
        "focus": "Grid DFS/BFS and the visited set",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-number-of-islands",
          "lc-max-area-of-island"
        ],
        "roles": {
          "lc-number-of-islands": "new",
          "lc-max-area-of-island": "new"
        }
      },
      {
        "id": "2026-11-26-rest",
        "date": "2026-11-26",
        "type": "rest",
        "blockId": "pattern-11",
        "blockTitle": "Pattern 11: Graph Traversal",
        "patternNumber": null,
        "topic": "Rest day — Thanksgiving",
        "resourceIds": [],
        "plannedMinutes": 0,
        "optional": true,
        "focus": "Rest day — Thanksgiving",
        "plan": "No study today. Rest is part of the plan.",
        "roles": {}
      },
      {
        "id": "2026-11-27-p11",
        "date": "2026-11-27",
        "type": "study",
        "blockId": "pattern-11",
        "blockTitle": "Pattern 11: Graph Traversal",
        "patternNumber": 11,
        "topic": "Cloning graphs and multi-source BFS",
        "plannedMinutes": 90,
        "focus": "Cloning graphs and multi-source BFS",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-clone-graph",
          "lc-walls-and-gates"
        ],
        "roles": {
          "lc-clone-graph": "new",
          "lc-walls-and-gates": "new"
        }
      },
      {
        "id": "2026-11-28-p11",
        "date": "2026-11-28",
        "type": "study",
        "blockId": "pattern-11",
        "blockTitle": "Pattern 11: Graph Traversal",
        "patternNumber": 11,
        "topic": "Multi-source BFS and reverse reachability from the border",
        "plannedMinutes": 90,
        "focus": "Multi-source BFS and reverse reachability from the border",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-rotting-oranges",
          "lc-pacific-atlantic-water-flow"
        ],
        "roles": {
          "lc-rotting-oranges": "new",
          "lc-pacific-atlantic-water-flow": "new"
        }
      },
      {
        "id": "2026-11-29-p11",
        "date": "2026-11-29",
        "type": "study",
        "blockId": "pattern-11",
        "blockTitle": "Pattern 11: Graph Traversal",
        "patternNumber": 11,
        "topic": "Border marking; a tree is connected with no cycle",
        "plannedMinutes": 90,
        "focus": "Border marking; a tree is connected with no cycle",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-surrounded-regions",
          "lc-graph-valid-tree"
        ],
        "roles": {
          "lc-surrounded-regions": "new",
          "lc-graph-valid-tree": "new"
        }
      },
      {
        "id": "2026-11-30-p11",
        "date": "2026-11-30",
        "type": "study",
        "blockId": "pattern-11",
        "blockTitle": "Pattern 11: Graph Traversal",
        "patternNumber": 11,
        "topic": "Directed cycles and topological order",
        "plannedMinutes": 90,
        "focus": "Directed cycles and topological order",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-course-schedule",
          "lc-course-schedule-ii"
        ],
        "roles": {
          "lc-course-schedule": "new",
          "lc-course-schedule-ii": "new"
        }
      },
      {
        "id": "2026-12-01-p11",
        "date": "2026-12-01",
        "type": "study",
        "blockId": "pattern-11",
        "blockTitle": "Pattern 11: Graph Traversal",
        "patternNumber": 11,
        "topic": "Union-Find connectivity and redundant edges",
        "plannedMinutes": 90,
        "focus": "Union-Find connectivity and redundant edges",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-number-of-connected-components-in-an-undirected-graph",
          "lc-redundant-connection"
        ],
        "roles": {
          "lc-number-of-connected-components-in-an-undirected-graph": "new",
          "lc-redundant-connection": "new"
        }
      },
      {
        "id": "2026-12-02-p11",
        "date": "2026-12-02",
        "type": "study",
        "blockId": "pattern-11",
        "blockTitle": "Pattern 11: Graph Traversal",
        "patternNumber": 11,
        "topic": "Layered BFS capstone; cold re-solve",
        "plannedMinutes": 90,
        "focus": "Layered BFS capstone; cold re-solve",
        "plan": "10m blank-page recall · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold re-solve · 15m error log & card",
        "resourceIds": [
          "lc-word-ladder",
          "lc-pacific-atlantic-water-flow"
        ],
        "roles": {
          "lc-word-ladder": "new",
          "lc-pacific-atlantic-water-flow": "resolve"
        }
      },
      {
        "id": "2026-12-03-p12",
        "date": "2026-12-03",
        "type": "study",
        "blockId": "pattern-12",
        "blockTitle": "Pattern 12: Advanced Graphs",
        "patternNumber": 12,
        "topic": "Dijkstra: shortest path with positive weights",
        "plannedMinutes": 90,
        "focus": "Dijkstra: shortest path with positive weights",
        "plan": "10m recall & classify · 30m new problem · 20m cold review · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-network-delay-time",
          "lc-top-k-frequent-elements"
        ],
        "roles": {
          "lc-network-delay-time": "new",
          "lc-top-k-frequent-elements": "review"
        }
      },
      {
        "id": "2026-12-04-p12",
        "date": "2026-12-04",
        "type": "study",
        "blockId": "pattern-12",
        "blockTitle": "Pattern 12: Advanced Graphs",
        "patternNumber": 12,
        "topic": "Minimum spanning tree: Prim and Kruskal",
        "plannedMinutes": 90,
        "focus": "Minimum spanning tree: Prim and Kruskal",
        "plan": "10m recall & classify · 30m new problem · 20m cold review · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-min-cost-to-connect-all-points",
          "lc-two-sum-ii-input-array-is-sorted"
        ],
        "roles": {
          "lc-min-cost-to-connect-all-points": "new",
          "lc-two-sum-ii-input-array-is-sorted": "review"
        }
      },
      {
        "id": "2026-12-05-p12",
        "date": "2026-12-05",
        "type": "study",
        "blockId": "pattern-12",
        "blockTitle": "Pattern 12: Advanced Graphs",
        "patternNumber": 12,
        "topic": "Shortest path with a stop limit: Bellman-Ford rounds",
        "plannedMinutes": 90,
        "focus": "Shortest path with a stop limit: Bellman-Ford rounds",
        "plan": "10m recall & classify · 30m new problem · 20m cold review · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-cheapest-flights-within-k-stops",
          "lc-permutation-in-string"
        ],
        "roles": {
          "lc-cheapest-flights-within-k-stops": "new",
          "lc-permutation-in-string": "review"
        }
      },
      {
        "id": "2026-12-06-p12",
        "date": "2026-12-06",
        "type": "study",
        "blockId": "pattern-12",
        "blockTitle": "Pattern 12: Advanced Graphs",
        "patternNumber": 12,
        "topic": "Use every edge once: Eulerian path (Hierholzer)",
        "plannedMinutes": 90,
        "focus": "Use every edge once: Eulerian path (Hierholzer)",
        "plan": "10m recall & classify · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold review · 15m compare & pattern card",
        "resourceIds": [
          "lc-reconstruct-itinerary",
          "lc-min-stack"
        ],
        "roles": {
          "lc-reconstruct-itinerary": "new",
          "lc-min-stack": "review"
        }
      },
      {
        "id": "2026-12-07-p12",
        "date": "2026-12-07",
        "type": "study",
        "blockId": "pattern-12",
        "blockTitle": "Pattern 12: Advanced Graphs",
        "patternNumber": 12,
        "topic": "Minimize the maximum: Dijkstra on the bottleneck",
        "plannedMinutes": 90,
        "focus": "Minimize the maximum: Dijkstra on the bottleneck",
        "plan": "10m recall & classify · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold review · 15m compare & pattern card",
        "resourceIds": [
          "lc-swim-in-rising-water",
          "lc-search-a-2d-matrix"
        ],
        "roles": {
          "lc-swim-in-rising-water": "new",
          "lc-search-a-2d-matrix": "review"
        }
      },
      {
        "id": "2026-12-08-p12",
        "date": "2026-12-08",
        "type": "study",
        "blockId": "pattern-12",
        "blockTitle": "Pattern 12: Advanced Graphs",
        "patternNumber": 12,
        "topic": "Infer the edges, then topological sort",
        "plannedMinutes": 90,
        "focus": "Infer the edges, then topological sort",
        "plan": "10m recall & classify · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold review · 15m compare & pattern card",
        "resourceIds": [
          "lc-alien-dictionary",
          "lc-remove-nth-node-from-end-of-list"
        ],
        "roles": {
          "lc-alien-dictionary": "new",
          "lc-remove-nth-node-from-end-of-list": "review"
        }
      },
      {
        "id": "2026-12-09-p12",
        "date": "2026-12-09",
        "type": "study",
        "blockId": "pattern-12",
        "blockTitle": "Pattern 12: Advanced Graphs",
        "patternNumber": 12,
        "topic": "Which graph algorithm? Cold re-solves",
        "plannedMinutes": 90,
        "focus": "Which graph algorithm? Cold re-solves",
        "plan": "10m blank-page recall · 25m cold re-solve · 25m cold re-solve · 20m error log · 10m pattern card",
        "resourceIds": [
          "lc-network-delay-time",
          "lc-cheapest-flights-within-k-stops"
        ],
        "roles": {
          "lc-network-delay-time": "resolve",
          "lc-cheapest-flights-within-k-stops": "resolve"
        }
      },
      {
        "id": "2026-12-10-buffer-2",
        "date": "2026-12-10",
        "type": "buffer",
        "blockId": "buffer-2",
        "blockTitle": "Catch-up day",
        "patternNumber": null,
        "topic": "Catch up or rest",
        "resourceIds": [],
        "plannedMinutes": 0,
        "optional": true,
        "focus": "Catch up or rest",
        "plan": "Finish any unfinished day first, then clear your review queue. If both are done, rest — it still counts.",
        "roles": {}
      },
      {
        "id": "2026-12-11-p13",
        "date": "2026-12-11",
        "type": "study",
        "blockId": "pattern-13",
        "blockTitle": "Pattern 13: 1-D Dynamic Programming",
        "patternNumber": 13,
        "topic": "State, recurrence and base case from simple stairs",
        "plannedMinutes": 90,
        "focus": "State, recurrence and base case from simple stairs",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-climbing-stairs",
          "lc-min-cost-climbing-stairs"
        ],
        "roles": {
          "lc-climbing-stairs": "new",
          "lc-min-cost-climbing-stairs": "new"
        }
      },
      {
        "id": "2026-12-12-p13",
        "date": "2026-12-12",
        "type": "study",
        "blockId": "pattern-13",
        "blockTitle": "Pattern 13: 1-D Dynamic Programming",
        "patternNumber": 13,
        "topic": "Take or skip; the circular variant",
        "plannedMinutes": 90,
        "focus": "Take or skip; the circular variant",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-house-robber",
          "lc-house-robber-ii"
        ],
        "roles": {
          "lc-house-robber": "new",
          "lc-house-robber-ii": "new"
        }
      },
      {
        "id": "2026-12-13-p13",
        "date": "2026-12-13",
        "type": "study",
        "blockId": "pattern-13",
        "blockTitle": "Pattern 13: 1-D Dynamic Programming",
        "patternNumber": 13,
        "topic": "Palindromes: expand around the center vs a DP table",
        "plannedMinutes": 90,
        "focus": "Palindromes: expand around the center vs a DP table",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-longest-palindromic-substring",
          "lc-palindromic-substrings"
        ],
        "roles": {
          "lc-longest-palindromic-substring": "new",
          "lc-palindromic-substrings": "new"
        }
      },
      {
        "id": "2026-12-14-p13",
        "date": "2026-12-14",
        "type": "study",
        "blockId": "pattern-13",
        "blockTitle": "Pattern 13: 1-D Dynamic Programming",
        "patternNumber": 13,
        "topic": "Segmenting a string",
        "plannedMinutes": 90,
        "focus": "Segmenting a string",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-decode-ways",
          "lc-word-break"
        ],
        "roles": {
          "lc-decode-ways": "new",
          "lc-word-break": "new"
        }
      },
      {
        "id": "2026-12-15-p13",
        "date": "2026-12-15",
        "type": "study",
        "blockId": "pattern-13",
        "blockTitle": "Pattern 13: 1-D Dynamic Programming",
        "patternNumber": 13,
        "topic": "Unbounded choices; tracking both min and max",
        "plannedMinutes": 90,
        "focus": "Unbounded choices; tracking both min and max",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-coin-change",
          "lc-maximum-product-subarray"
        ],
        "roles": {
          "lc-coin-change": "new",
          "lc-maximum-product-subarray": "new"
        }
      },
      {
        "id": "2026-12-16-p13",
        "date": "2026-12-16",
        "type": "study",
        "blockId": "pattern-13",
        "blockTitle": "Pattern 13: 1-D Dynamic Programming",
        "patternNumber": 13,
        "topic": "LIS and subset-sum state design",
        "plannedMinutes": 90,
        "focus": "LIS and subset-sum state design",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-longest-increasing-subsequence",
          "lc-partition-equal-subset-sum"
        ],
        "roles": {
          "lc-longest-increasing-subsequence": "new",
          "lc-partition-equal-subset-sum": "new"
        }
      },
      {
        "id": "2026-12-17-p13",
        "date": "2026-12-17",
        "type": "study",
        "blockId": "pattern-13",
        "blockTitle": "Pattern 13: 1-D Dynamic Programming",
        "patternNumber": 13,
        "topic": "Recurrence from memory: cold re-solves",
        "plannedMinutes": 90,
        "focus": "Recurrence from memory: cold re-solves",
        "plan": "10m blank-page recall · 25m cold re-solve · 25m cold re-solve · 20m error log · 10m pattern card",
        "resourceIds": [
          "lc-house-robber-ii",
          "lc-word-break"
        ],
        "roles": {
          "lc-house-robber-ii": "resolve",
          "lc-word-break": "resolve"
        }
      },
      {
        "id": "2026-12-18-p14",
        "date": "2026-12-18",
        "type": "study",
        "blockId": "pattern-14",
        "blockTitle": "Pattern 14: 2-D Dynamic Programming",
        "patternNumber": 14,
        "topic": "Grid and two-sequence DP tables",
        "plannedMinutes": 90,
        "focus": "Grid and two-sequence DP tables",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-unique-paths",
          "lc-longest-common-subsequence"
        ],
        "roles": {
          "lc-unique-paths": "new",
          "lc-longest-common-subsequence": "new"
        }
      },
      {
        "id": "2026-12-19-p14",
        "date": "2026-12-19",
        "type": "study",
        "blockId": "pattern-14",
        "blockTitle": "Pattern 14: 2-D Dynamic Programming",
        "patternNumber": 14,
        "topic": "State machines and counting combinations",
        "plannedMinutes": 90,
        "focus": "State machines and counting combinations",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-best-time-to-buy-and-sell-stock-with-cooldown",
          "lc-coin-change-ii"
        ],
        "roles": {
          "lc-best-time-to-buy-and-sell-stock-with-cooldown": "new",
          "lc-coin-change-ii": "new"
        }
      },
      {
        "id": "2026-12-20-p14",
        "date": "2026-12-20",
        "type": "study",
        "blockId": "pattern-14",
        "blockTitle": "Pattern 14: 2-D Dynamic Programming",
        "patternNumber": 14,
        "topic": "Turning a target into DP state",
        "plannedMinutes": 90,
        "focus": "Turning a target into DP state",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-target-sum",
          "lc-interleaving-string"
        ],
        "roles": {
          "lc-target-sum": "new",
          "lc-interleaving-string": "new"
        }
      },
      {
        "id": "2026-12-21-p14",
        "date": "2026-12-21",
        "type": "study",
        "blockId": "pattern-14",
        "blockTitle": "Pattern 14: 2-D Dynamic Programming",
        "patternNumber": 14,
        "topic": "Edit operations; memoized DFS on a matrix",
        "plannedMinutes": 90,
        "focus": "Edit operations; memoized DFS on a matrix",
        "plan": "10m recall & classify · 25m first problem · 40m Hard problem · 15m compare & pattern card",
        "resourceIds": [
          "lc-edit-distance",
          "lc-longest-increasing-path-in-a-matrix"
        ],
        "roles": {
          "lc-edit-distance": "new",
          "lc-longest-increasing-path-in-a-matrix": "new"
        }
      },
      {
        "id": "2026-12-22-p14",
        "date": "2026-12-22",
        "type": "study",
        "blockId": "pattern-14",
        "blockTitle": "Pattern 14: 2-D Dynamic Programming",
        "patternNumber": 14,
        "topic": "Counting subsequences",
        "plannedMinutes": 90,
        "focus": "Counting subsequences",
        "plan": "10m recall & classify · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold review · 15m compare & pattern card",
        "resourceIds": [
          "lc-distinct-subsequences",
          "lc-binary-tree-level-order-traversal"
        ],
        "roles": {
          "lc-distinct-subsequences": "new",
          "lc-binary-tree-level-order-traversal": "review"
        }
      },
      {
        "id": "2026-12-23-p14",
        "date": "2026-12-23",
        "type": "study",
        "blockId": "pattern-14",
        "blockTitle": "Pattern 14: 2-D Dynamic Programming",
        "patternNumber": 14,
        "topic": "Interval DP: choose the last action",
        "plannedMinutes": 90,
        "focus": "Interval DP: choose the last action",
        "plan": "10m recall & classify · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold review · 15m compare & pattern card",
        "resourceIds": [
          "lc-burst-balloons",
          "lc-lowest-common-ancestor-of-a-binary-search-tree"
        ],
        "roles": {
          "lc-burst-balloons": "new",
          "lc-lowest-common-ancestor-of-a-binary-search-tree": "review"
        }
      },
      {
        "id": "2026-12-24-p14",
        "date": "2026-12-24",
        "type": "study",
        "blockId": "pattern-14",
        "blockTitle": "Pattern 14: 2-D Dynamic Programming",
        "patternNumber": 14,
        "topic": "State-machine matching capstone; cold re-solve",
        "plannedMinutes": 90,
        "focus": "State-machine matching capstone; cold re-solve",
        "plan": "10m blank-page recall · 45m Hard problem (take a hint after 35 minutes if stuck) · 20m cold re-solve · 15m error log & card",
        "resourceIds": [
          "lc-regular-expression-matching",
          "lc-edit-distance"
        ],
        "roles": {
          "lc-regular-expression-matching": "new",
          "lc-edit-distance": "resolve"
        }
      },
      {
        "id": "2026-12-25-rest",
        "date": "2026-12-25",
        "type": "rest",
        "blockId": "pattern-15",
        "blockTitle": "Pattern 15: Greedy Decision-Making",
        "patternNumber": null,
        "topic": "Rest day — Christmas",
        "resourceIds": [],
        "plannedMinutes": 0,
        "optional": true,
        "focus": "Rest day — Christmas",
        "plan": "No study today. Rest is part of the plan.",
        "roles": {}
      },
      {
        "id": "2026-12-26-p15",
        "date": "2026-12-26",
        "type": "study",
        "blockId": "pattern-15",
        "blockTitle": "Pattern 15: Greedy Decision-Making",
        "patternNumber": 15,
        "topic": "Kadane and farthest reach",
        "plannedMinutes": 90,
        "focus": "Kadane and farthest reach",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-maximum-subarray",
          "lc-jump-game"
        ],
        "roles": {
          "lc-maximum-subarray": "new",
          "lc-jump-game": "new"
        }
      },
      {
        "id": "2026-12-27-p15",
        "date": "2026-12-27",
        "type": "study",
        "blockId": "pattern-15",
        "blockTitle": "Pattern 15: Greedy Decision-Making",
        "patternNumber": 15,
        "topic": "Jump levels and reset points",
        "plannedMinutes": 90,
        "focus": "Jump levels and reset points",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-jump-game-ii",
          "lc-gas-station"
        ],
        "roles": {
          "lc-jump-game-ii": "new",
          "lc-gas-station": "new"
        }
      },
      {
        "id": "2026-12-28-p15",
        "date": "2026-12-28",
        "type": "study",
        "blockId": "pattern-15",
        "blockTitle": "Pattern 15: Greedy Decision-Making",
        "patternNumber": 15,
        "topic": "Greedy with counts and filters",
        "plannedMinutes": 90,
        "focus": "Greedy with counts and filters",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-hand-of-straights",
          "lc-merge-triplets-to-form-target-triplet"
        ],
        "roles": {
          "lc-hand-of-straights": "new",
          "lc-merge-triplets-to-form-target-triplet": "new"
        }
      },
      {
        "id": "2026-12-29-p15",
        "date": "2026-12-29",
        "type": "study",
        "blockId": "pattern-15",
        "blockTitle": "Pattern 15: Greedy Decision-Making",
        "patternNumber": 15,
        "topic": "Last occurrences and a range of open counts",
        "plannedMinutes": 90,
        "focus": "Last occurrences and a range of open counts",
        "plan": "10m recall & classify · 25m problem 1 · 25m problem 2 · 20m compare with a solution · 10m pattern card",
        "resourceIds": [
          "lc-partition-labels",
          "lc-valid-parenthesis-string"
        ],
        "roles": {
          "lc-partition-labels": "new",
          "lc-valid-parenthesis-string": "new"
        }
      },
      {
        "id": "2026-12-30-p15",
        "date": "2026-12-30",
        "type": "study",
        "blockId": "pattern-15",
        "blockTitle": "Pattern 15: Greedy Decision-Making",
        "patternNumber": 15,
        "topic": "Prove it: exchange and frontier arguments",
        "plannedMinutes": 90,
        "focus": "Prove it: exchange and frontier arguments",
        "plan": "10m blank-page recall · 25m cold re-solve · 25m review problem · 20m error log · 10m pattern card",
        "resourceIds": [
          "lc-jump-game-ii",
          "lc-k-closest-points-to-origin"
        ],
        "roles": {
          "lc-jump-game-ii": "resolve",
          "lc-k-closest-points-to-origin": "review"
        }
      },
      {
        "id": "2026-12-31-p15",
        "date": "2026-12-31",
        "type": "study",
        "blockId": "pattern-15",
        "blockTitle": "Pattern 15: Greedy Decision-Making",
        "patternNumber": 15,
        "topic": "Greedy or DP? Decide with a counterexample",
        "plannedMinutes": 90,
        "focus": "Greedy or DP? Decide with a counterexample",
        "plan": "10m blank-page recall · 25m cold re-solve · 25m review problem · 20m error log · 10m pattern card",
        "resourceIds": [
          "lc-hand-of-straights",
          "lc-permutations"
        ],
        "roles": {
          "lc-hand-of-straights": "resolve",
          "lc-permutations": "review"
        }
      },
      {
        "id": "2027-01-01-rest",
        "date": "2027-01-01",
        "type": "rest",
        "blockId": "pattern-15",
        "blockTitle": "Pattern 15: Greedy Decision-Making",
        "patternNumber": null,
        "topic": "Rest day — New Year’s Day",
        "resourceIds": [],
        "plannedMinutes": 0,
        "optional": true,
        "focus": "Rest day — New Year’s Day",
        "plan": "No study today. Rest is part of the plan.",
        "roles": {}
      },
      {
        "id": "2027-01-02-p15",
        "date": "2027-01-02",
        "type": "study",
        "blockId": "pattern-15",
        "blockTitle": "Pattern 15: Greedy Decision-Making",
        "patternNumber": 15,
        "topic": "Greedy mastery checkpoint",
        "plannedMinutes": 90,
        "focus": "Greedy mastery checkpoint",
        "plan": "10m blank-page recall · 25m cold re-solve · 25m review problem · 20m error log · 10m pattern card",
        "resourceIds": [
          "lc-partition-labels",
          "lc-max-area-of-island"
        ],
        "roles": {
          "lc-partition-labels": "resolve",
          "lc-max-area-of-island": "review"
        }
      },
      {
        "id": "2027-01-03-revision-final",
        "date": "2027-01-03",
        "type": "revision",
        "blockId": "revision-final",
        "blockTitle": "Final Revision — All 17 patterns",
        "patternNumber": null,
        "topic": "Cold retrieval: Arrays & Hashing + Two Pointers",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Arrays & Hashing + Two Pointers",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 25m second cold solve · 20m error log · 10m pattern cards",
        "resourceIds": [
          "lc-top-k-frequent-elements",
          "lc-3sum"
        ],
        "roles": {
          "lc-top-k-frequent-elements": "revision",
          "lc-3sum": "revision"
        }
      },
      {
        "id": "2027-01-04-revision-final",
        "date": "2027-01-04",
        "type": "revision",
        "blockId": "revision-final",
        "blockTitle": "Final Revision — All 17 patterns",
        "patternNumber": null,
        "topic": "Cold retrieval: Sliding Window + Stack",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Sliding Window + Stack",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-longest-repeating-character-replacement",
          "lc-largest-rectangle-in-histogram"
        ],
        "roles": {
          "lc-longest-repeating-character-replacement": "revision",
          "lc-largest-rectangle-in-histogram": "revision"
        }
      },
      {
        "id": "2027-01-05-revision-final",
        "date": "2027-01-05",
        "type": "revision",
        "blockId": "revision-final",
        "blockTitle": "Final Revision — All 17 patterns",
        "patternNumber": null,
        "topic": "Cold retrieval: Binary Search + Linked Lists",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Binary Search + Linked Lists",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-median-of-two-sorted-arrays",
          "lc-reorder-list"
        ],
        "roles": {
          "lc-median-of-two-sorted-arrays": "revision",
          "lc-reorder-list": "revision"
        }
      },
      {
        "id": "2027-01-06-revision-final",
        "date": "2027-01-06",
        "type": "revision",
        "blockId": "revision-final",
        "blockTitle": "Final Revision — All 17 patterns",
        "patternNumber": null,
        "topic": "Cold retrieval: Trees + Tree construction",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Trees + Tree construction",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-binary-tree-right-side-view",
          "lc-serialize-and-deserialize-binary-tree"
        ],
        "roles": {
          "lc-binary-tree-right-side-view": "revision",
          "lc-serialize-and-deserialize-binary-tree": "revision"
        }
      },
      {
        "id": "2027-01-07-revision-final",
        "date": "2027-01-07",
        "type": "revision",
        "blockId": "revision-final",
        "blockTitle": "Final Revision — All 17 patterns",
        "patternNumber": null,
        "topic": "Cold retrieval: Heaps + Backtracking",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Heaps + Backtracking",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-find-median-from-data-stream",
          "lc-subsets-ii"
        ],
        "roles": {
          "lc-find-median-from-data-stream": "revision",
          "lc-subsets-ii": "revision"
        }
      },
      {
        "id": "2027-01-08-revision-final",
        "date": "2027-01-08",
        "type": "revision",
        "blockId": "revision-final",
        "blockTitle": "Final Revision — All 17 patterns",
        "patternNumber": null,
        "topic": "Cold retrieval: Bit Manipulation + Math & Geometry",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Bit Manipulation + Math & Geometry",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 25m second cold solve · 20m error log · 10m pattern cards",
        "resourceIds": [
          "lc-sum-of-two-integers",
          "lc-rotate-image"
        ],
        "roles": {
          "lc-sum-of-two-integers": "revision",
          "lc-rotate-image": "revision"
        }
      },
      {
        "id": "2027-01-09-revision-final",
        "date": "2027-01-09",
        "type": "revision",
        "blockId": "revision-final",
        "blockTitle": "Final Revision — All 17 patterns",
        "patternNumber": null,
        "topic": "Cold retrieval: Graphs + Advanced Graphs",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: Graphs + Advanced Graphs",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-course-schedule-ii",
          "lc-swim-in-rising-water"
        ],
        "roles": {
          "lc-course-schedule-ii": "revision",
          "lc-swim-in-rising-water": "revision"
        }
      },
      {
        "id": "2027-01-10-revision-final",
        "date": "2027-01-10",
        "type": "revision",
        "blockId": "revision-final",
        "blockTitle": "Final Revision — All 17 patterns",
        "patternNumber": null,
        "topic": "Cold retrieval: 1-D + 2-D Dynamic Programming",
        "plannedMinutes": 90,
        "focus": "Cold retrieval: 1-D + 2-D Dynamic Programming",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-coin-change",
          "lc-distinct-subsequences"
        ],
        "roles": {
          "lc-coin-change": "revision",
          "lc-distinct-subsequences": "revision"
        }
      },
      {
        "id": "2027-01-11-revision-final",
        "date": "2027-01-11",
        "type": "revision",
        "blockId": "revision-final",
        "blockTitle": "Final Revision — All 17 patterns",
        "patternNumber": null,
        "topic": "Mock interview: two unlabeled problems",
        "plannedMinutes": 90,
        "focus": "Mock interview: two unlabeled problems",
        "plan": "10m blank-page recall + detectors · 25m first cold solve · 40m Hard cold solve · 15m error log & pattern cards",
        "resourceIds": [
          "lc-valid-parenthesis-string",
          "lc-minimum-window-substring"
        ],
        "roles": {
          "lc-valid-parenthesis-string": "revision",
          "lc-minimum-window-substring": "revision"
        }
      }
    ]
  }
];
