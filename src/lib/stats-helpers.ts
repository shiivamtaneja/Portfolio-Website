import { sideProjects } from "@/lib/constants/side-projects";
import {
  ActivityRow,
  PostHogQueryResponse,
  ProjectEventRow,
  ProjectPageViewRow,
  TrafficSourceRow,
} from "@/types/stats.types";

export const CHATBOT_PROJECT = {
  title: "Ask Shivam",
  descLink: "/projects/chat-bot/",
};

export const POSTHOG_REVALIDATE_SECONDS = 60;
export const TRAFFIC_SOURCES = [
  "Direct",
  "Google",
  "GitHub",
  "LinkedIn",
  "Other",
];

export function getPostHogConfig() {
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const personalApiKey = process.env.POSTHOG_PERSONAL_API_KEY;

  if (!projectId || !personalApiKey) return null;

  return {
    projectId,
    personalApiKey,
    host: getPostHogApiHost(),
  };
}

export function getPostHogApiHost() {
  if (process.env.POSTHOG_API_HOST) {
    return process.env.POSTHOG_API_HOST.replace(/\/$/, "");
  }

  const publicHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

  return publicHost
    .replace("https://eu.i.posthog.com", "https://eu.posthog.com")
    .replace("https://us.i.posthog.com", "https://us.posthog.com")
    .replace(/\/$/, "");
}

export async function queryPostHog<T>(
  config: NonNullable<ReturnType<typeof getPostHogConfig>>,
  name: string,
  query: string,
): Promise<T[]> {
  const response = await fetch(
    `${config.host}/api/projects/${config.projectId}/query/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.personalApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        query: {
          kind: "HogQLQuery",
          query,
        },
      }),
      next: {
        revalidate: POSTHOG_REVALIDATE_SECONDS,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`PostHog query failed with ${response.status}`);
  }

  const data = (await response.json()) as PostHogQueryResponse;

  return rowsToObjects<T>(data);
}

export function rowsToObjects<T>(data: PostHogQueryResponse): T[] {
  if (!data.columns || !data.results) return [];

  return data.results.map((row) =>
    Object.fromEntries(
      data.columns!.map((column, index) => [column, row[index]]),
    ),
  ) as T[];
}

export function mergeProjectStats(
  projectEvents: ProjectEventRow[],
  projectPageViews: ProjectPageViewRow[],
) {
  const projects = new Map<
    string,
    { project: string; clicks: number; views: number; total: number }
  >();

  for (const row of projectEvents) {
    const project = cleanProjectName(row.project);
    if (!project) continue;

    const current = projects.get(project) ?? {
      project,
      clicks: 0,
      views: 0,
      total: 0,
    };

    current.clicks += toNumber(row.clicks);
    current.views += toNumber(row.detail_views);
    projects.set(project, current);
  }

  for (const row of projectPageViews) {
    const project = projectNameFromUrl(row.url);
    if (!project) continue;

    const current = projects.get(project) ?? {
      project,
      clicks: 0,
      views: 0,
      total: 0,
    };

    current.views += toNumber(row.views);
    projects.set(project, current);
  }

  return Array.from(projects.values())
    .map((project) => ({
      ...project,
      total: project.clicks + project.views,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6);
}

export function normalizeTrafficSources(rows: TrafficSourceRow[]) {
  const sourceTotals = new Map<string, number>(
    TRAFFIC_SOURCES.map((source) => [source, 0]),
  );

  for (const row of rows) {
    const source = TRAFFIC_SOURCES.includes(row.source ?? "")
      ? row.source!
      : "Other";

    sourceTotals.set(
      source,
      (sourceTotals.get(source) ?? 0) + toNumber(row.total),
    );
  }

  return TRAFFIC_SOURCES.map((source) => ({
    source,
    total: sourceTotals.get(source) ?? 0,
  }));
}

export function buildActivityDays(activityStart: Date, rows: ActivityRow[]) {
  const rowMap = new Map(rows.map((row) => [row.day, toNumber(row.total)]));
  const days: { date: string; total: number }[] = [];
  const cursor = new Date(activityStart);
  const today = startOfUtcDay(new Date());

  while (cursor <= today) {
    const date = cursor.toISOString().slice(0, 10);

    days.push({
      date,
      total: rowMap.get(date) ?? 0,
    });

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return days;
}

export function projectNameFromUrl(rawUrl?: string) {
  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl);
    const slug = url.pathname.split("/").filter(Boolean)[1];

    if (!slug) return null;

    return projectNameBySlug().get(slug) ?? titleFromSlug(slug);
  } catch {
    return null;
  }
}

export function projectNameBySlug() {
  return new Map(
    [CHATBOT_PROJECT, ...sideProjects].map((project) => [
      project.descLink.split("/").filter(Boolean)[1],
      project.title,
    ]),
  );
}

export function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function cleanProjectName(project?: string) {
  if (!project || project === "Unknown project") return null;

  return project.trim();
}

export function getMonthStart(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

export function getActivityStart(date: Date) {
  const start = startOfUtcDay(date);
  start.setUTCDate(start.getUTCDate() - 83);
  return start;
}

export function startOfUtcDay(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

export function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value) || 0;
  return 0;
}
