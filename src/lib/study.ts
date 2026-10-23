// "What did I study on this date?" — reads a person's GoalForge data (synced to their account)
// and the GoalForge plan, so a journal entry can be linked to that day's study.
import { seedGoals } from "../../public/learn/js/data/goals.js";
import { seedResources } from "../../public/learn/js/data/resources.js";
import { applyShifts } from "../../public/learn/js/core/model.js";

type Day = { id: string; date: string; type: string; topic?: string; focus?: string; blockTitle?: string; resourceIds?: string[] };
type Goal = { id: string; name: string; schedule: Day[]; patterns: { number: number; name: string }[]; endDate?: string };
type Resource = { id: string; title: string; pattern?: string };
type ProgressRecord = { goalId?: string; dayId?: string; resourceId?: string; lessonId?: string; completed?: boolean; completedAt?: string | null; completedOn?: string };

export type LearnData = {
  customGoals?: Goal[];
  resourceOverrides?: Record<string, Resource>;
  progress?: Record<string, ProgressRecord>;
  timers?: Record<string, { seconds?: number }>;
  settings?: { activeGoalId?: string; shifts?: Record<string, unknown[]> };
};

export type StudySummary = {
  date: string;
  goals: {
    goalId: string;
    goalName: string;
    day: { id: string; type: string; topic: string; blockTitle: string } | null;
    dayCompleted: boolean;
    completed: { kind: "day" | "problem" | "lesson"; title: string }[];
    focusMinutes: number;
  }[];
};

const SEED_GOALS = seedGoals as unknown as Goal[];
const SEED_RESOURCES = Object.fromEntries((seedResources as unknown as Resource[]).map(r => [r.id, r]));

// The day a record was completed, in the learner's own calendar when GoalForge recorded it.
const completedDate = (p: ProgressRecord) => p.completedOn || (p.completedAt ? p.completedAt.slice(0, 10) : "");

export function studyForDate(data: LearnData | null | undefined, date: string): StudySummary {
  const summary: StudySummary = { date, goals: [] };
  if (!data) return summary;
  const goals = [...SEED_GOALS, ...(data.customGoals || [])];
  const resources: Record<string, Resource> = { ...SEED_RESOURCES, ...(data.resourceOverrides || {}) };
  const progress = data.progress || {};
  const active = data.settings?.activeGoalId || SEED_GOALS[0]?.id;

  for (const base of goals) {
    const goal = applyShifts(base, data.settings?.shifts?.[base.id] || []) as Goal;
    const done = Object.entries(progress).filter(([key, p]) => key.startsWith(goal.id + ":") && p.completed && completedDate(p) === date);
    const focusMinutes = Math.round((data.timers?.[`${goal.id}:${date}`]?.seconds || 0) / 60);
    const planned = goal.schedule.find(d => d.date === date) || null;
    if (!done.length && !focusMinutes && goal.id !== active) continue;
    if (!done.length && !focusMinutes && !planned) continue;

    const dayTitle = (id: string) => {
      const d = goal.schedule.find(x => x.id === id);
      return d ? `${d.blockTitle ? d.blockTitle + " — " : ""}${d.topic || d.focus || d.id}` : id;
    };
    const lessonTitle = (id: string) => {
      const m = /^p(\d+)-d(\d+)$/.exec(id);
      const pattern = m && goal.patterns.find(p => p.number === Number(m[1]));
      return pattern ? `Lesson: ${pattern.name} (day ${m![2]})` : `Lesson ${id}`;
    };
    const completed = done.map(([, p]) =>
      p.dayId ? { kind: "day" as const, title: dayTitle(p.dayId) }
      : p.lessonId ? { kind: "lesson" as const, title: lessonTitle(p.lessonId) }
      : { kind: "problem" as const, title: resources[p.resourceId || ""]?.title || p.resourceId || "Problem" });

    summary.goals.push({
      goalId: goal.id,
      goalName: goal.name,
      day: planned ? { id: planned.id, type: planned.type, topic: planned.topic || planned.focus || "", blockTitle: planned.blockTitle || "" } : null,
      dayCompleted: Boolean(planned && progress[`${goal.id}:${planned.id}`]?.completed),
      completed,
      focusMinutes,
    });
  }
  // Active goal first.
  summary.goals.sort((a, b) => Number(b.goalId === active) - Number(a.goalId === active));
  return summary;
}

export function hasStudy(s: StudySummary | null | undefined): boolean {
  return Boolean(s?.goals.some(g => g.completed.length || g.focusMinutes || g.day));
}
