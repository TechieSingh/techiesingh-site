// Everything shown on the public pages lives in this file. Edit it to update the site.
// Fields left empty are hidden; nothing here is invented — fill in the TODOs with your own words.

export type Link = { label: string; href: string };

export const profile = {
  name: "Aditya Singh",
  handle: "techiesingh",
  headline: "MS Information Systems student at Northeastern University",
  location: "Boston, MA",
  // TODO: two or three short paragraphs about you, in your own words.
  bio: [] as string[],
  email: "", // optional public contact email; leave empty to hide it
  links: [
    { label: "GitHub", href: "https://github.com/TechieSingh" },
    { label: "GitLab", href: "https://gitlab.com/techiesingh" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/techiesingh" },
  ] as Link[],
  currentlyLearning: "Data structures & algorithms — 17 patterns over the NeetCode 150",
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  tech: string[];
  links: Link[];
  year: number;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "goalforge",
    name: "GoalForge",
    summary: "A learning tracker that turns a study plan into daily work, spaced reviews and honest progress.",
    description: [
      "Built to run a 20-week plan for the NeetCode 150. Each day shows a short lesson, the problems to solve and a 90-minute time plan; progress shows whether you are ahead or behind the calendar.",
      "Every problem, lesson and pattern can be rated red, yellow or green. Ratings feed one review queue with growing intervals (14, 30, 60, 120 days), so weak spots come back and strong ones fade into the background.",
      "Missed days can be absorbed by moving the plan forward; rest days don't break the streak. Custom goals can be built from any list of resources.",
    ],
    tech: ["JavaScript (ES modules)", "Supabase", "Node test runner"],
    links: [
      { label: "Source", href: "https://github.com/TechieSingh/goal-tracker-site" },
    ],
    year: 2026,
    featured: true,
  },
  {
    slug: "techiesingh-com",
    name: "techiesingh.com",
    summary: "This site: portfolio, invite-only learning space and a journal that can publish to the blog.",
    description: [
      "Next.js on Vercel with Supabase for sign-in and storage. Row-level security keeps every member's learning data and journal private; only published entries are public.",
    ],
    tech: ["Next.js", "TypeScript", "Supabase (Postgres, Auth)", "Vercel"],
    links: [{ label: "Source", href: "https://github.com/TechieSingh/techiesingh-site" }],
    year: 2026,
    featured: true,
  },
  // TODO: add your other projects here.
];

// Resume. Empty sections are hidden; while everything is empty the page says it's coming soon.
export type ResumeItem = { title: string; org: string; place?: string; start: string; end: string; points: string[] };

export const resume = {
  pdfUrl: "", // e.g. "/resume.pdf" after adding the file to /public
  education: [
    // TODO: confirm dates and add details.
    { title: "MS, Information Systems", org: "Northeastern University", place: "Boston, MA", start: "", end: "", points: [] },
  ] as ResumeItem[],
  experience: [] as ResumeItem[], // TODO
  skills: [] as { group: string; items: string[] }[], // TODO
};
