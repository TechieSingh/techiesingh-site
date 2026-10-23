import { describe, it, expect } from "vitest";
import { plainExcerpt, readingMinutes, renderMarkdown } from "@/lib/markdown";
import { isValidSlug, slugify } from "@/lib/slug";
import { isISODate } from "@/lib/dates";
import { hasStudy, studyForDate } from "@/lib/study";

describe("markdown", () => {
  it("renders common markdown", () => {
    const html = renderMarkdown("# Title\n\nSome **bold** and `code`.\n\n- a\n- b\n\n```js\nlet x = 1;\n```");
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<li>a</li>");
    expect(html).toContain('<code class="language-js">');
  });

  it("strips anything that could run code", () => {
    const evil = [
      "<script>alert(1)</script>",
      '<img src="x" onerror="alert(1)">',
      "[click](javascript:alert(1))",
      '<a href="javascript:alert(1)">x</a>',
      '<iframe src="https://evil.example"></iframe>',
      '<div style="background:url(javascript:alert(1))">x</div>',
      '<svg onload="alert(1)"></svg>',
    ].join("\n\n");
    const html = renderMarkdown(evil);
    expect(html).not.toMatch(/<script|onerror|onload|javascript:|<iframe|<svg|style=/i);
  });

  it("makes external links safe", () => {
    const html = renderMarkdown("[site](https://example.com)");
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');
  });

  it("excerpts and reading time", () => {
    expect(plainExcerpt("## Hello\n\nThis is **a** test.")).toBe("Hello This is a test.");
    expect(plainExcerpt("word ".repeat(200), 30).length).toBeLessThanOrEqual(30);
    expect(readingMinutes("word ".repeat(660))).toBe(3);
    expect(readingMinutes("")).toBe(1);
  });
});

describe("slugs and dates", () => {
  it("slugify makes valid addresses", () => {
    expect(slugify("Two Pointers & Sliding Window: Week 3!")).toBe("two-pointers-and-sliding-window-week-3");
    expect(slugify("  Café  déjà vu  ")).toBe("cafe-deja-vu");
    expect(isValidSlug(slugify("Hello -- World"))).toBe(true);
    expect(isValidSlug("Bad Slug")).toBe(false);
    expect(isValidSlug("-leading")).toBe(false);
  });
  it("validates ISO dates", () => {
    expect(isISODate("2026-10-23")).toBe(true);
    expect(isISODate("2026-13-01")).toBe(false);
    expect(isISODate("23/10/2026")).toBe(false);
  });
});

describe("study summary for the journal", () => {
  const goalId = "dsa-patterns-2026";
  const data = {
    settings: { activeGoalId: goalId, shifts: {} },
    progress: {
      [`${goalId}:2026-10-23-p8`]: { goalId, dayId: "2026-10-23-p8", completed: true, completedAt: "2026-10-24T02:00:00Z", completedOn: "2026-10-23" },
      [`${goalId}:resource:lc-binary-tree-maximum-path-sum`]: { goalId, resourceId: "lc-binary-tree-maximum-path-sum", completed: true, completedAt: "2026-10-23T18:00:00Z" },
      [`${goalId}:lesson:p8-d5`]: { goalId, lessonId: "p8-d5", completed: true, completedAt: "2026-10-23T17:00:00Z" },
      [`${goalId}:resource:lc-two-sum`]: { goalId, resourceId: "lc-two-sum", completed: true, completedAt: "2026-08-24T18:00:00Z" },
    },
    timers: { [`${goalId}:2026-10-23`]: { seconds: 5400 } },
  };

  it("lists what was planned and done that day, in the learner's own calendar", () => {
    const s = studyForDate(data, "2026-10-23");
    expect(s.goals).toHaveLength(1);
    const g = s.goals[0];
    expect(g.day?.topic).toBe("Tree DP: local contribution vs global path");
    expect(g.dayCompleted).toBe(true);
    expect(g.focusMinutes).toBe(90);
    expect(g.completed.map(c => c.kind).sort()).toEqual(["day", "lesson", "problem"]);
    expect(g.completed.find(c => c.kind === "problem")?.title).toBe("Binary Tree Maximum Path Sum");
    expect(g.completed.find(c => c.kind === "lesson")?.title).toBe("Lesson: BST, Tree Construction & Tree DP (day 5)");
    expect(hasStudy(s)).toBe(true);
  });

  it("uses the completion day recorded by the browser, not the UTC timestamp", () => {
    // Completed late on Oct 23 in New York = Oct 24 in UTC.
    expect(studyForDate(data, "2026-10-24").goals[0]?.completed.some(c => c.kind === "day")).toBeFalsy();
  });

  it("follows rest days and catch-ups (shifted plan)", () => {
    const shifted = { ...data, progress: {}, timers: {}, settings: { activeGoalId: goalId, shifts: { [goalId]: [{ from: "2026-10-23", days: 1 }] } } };
    const s = studyForDate(shifted, "2026-10-24");
    expect(s.goals[0].day?.id).toBe("2026-10-23-p8");
    expect(studyForDate(shifted, "2026-10-23").goals[0].day?.type).toBe("rest");
  });

  it("is empty without data", () => {
    expect(hasStudy(studyForDate(null, "2026-10-23"))).toBe(false);
  });
});
