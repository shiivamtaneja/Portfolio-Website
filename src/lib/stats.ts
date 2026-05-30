import "server-only";

import { sideProjects } from "@/lib/constants/side-projects";
import {
  activityQuery,
  metricsQuery,
  projectEventsQuery,
  projectPageViewsQuery,
  trafficSourcesQuery,
} from "@/lib/stats-queries";

const CHATBOT_PROJECT = {
  title: "Ask Shivam",
  descLink: "/projects/chat-bot/",
};

const POSTHOG_REVALIDATE_SECONDS = 60 * 60;
const TRAFFIC_SOURCES = ["Direct", "Google", "GitHub", "LinkedIn", "Other"];

export type StatsData = {
  generatedAt: string;
  isConfigured: boolean;
  error?: string;
  monthLabel: string;
  activityStart: string;
  metrics: {
    visitsThisMonth: number;
    resumeOpens: number;
    projectDemoClicks: number;
    contactFormSubmissions: number;
    chatbotConversations: number;
    chatbotMessages: number;
  };
  trendingProjects: {
    project: string;
    clicks: number;
    views: number;
    total: number;
  }[];
  trafficSources: {
    source: string;
    total: number;
  }[];
  activity: {
    date: string;
    total: number;
  }[];
};

type PostHogQueryResponse = {
  columns?: string[];
  results?: unknown[][];
};

type MetricRow = {
  visits_this_month?: number;
  resume_opens?: number;
  project_demo_clicks?: number;
  contact_form_submissions?: number;
  chatbot_conversations?: number;
  chatbot_messages?: number;
};

type ProjectEventRow = {
  project?: string;
  clicks?: number;
  detail_views?: number;
};

type ProjectPageViewRow = {
  url?: string;
  views?: number;
};

type TrafficSourceRow = {
  source?: string;
  total?: number;
};

type ActivityRow = {
  day?: string;
  total?: number;
};

const emptyStats = (
  now: Date,
  isConfigured: boolean,
  error?: string,
): StatsData => ({
  generatedAt: now.toISOString(),
  isConfigured,
  error,
  monthLabel: getMonthLabel(now),
  activityStart: getActivityStart(now).toISOString(),
  metrics: {
    visitsThisMonth: 0,
    resumeOpens: 0,
    projectDemoClicks: 0,
    contactFormSubmissions: 0,
    chatbotConversations: 0,
    chatbotMessages: 0,
  },
  trendingProjects: [],
  trafficSources: TRAFFIC_SOURCES.map((source) => ({ source, total: 0 })),
  activity: buildActivityDays(getActivityStart(now), []),
});

export async function getStats(): Promise<StatsData> {
  const now = new Date();
  const config = getPostHogConfig();

  if (!config) {
    return emptyStats(now, false);
  }

  const monthStart = getMonthStart(now);
  const activityStart = getActivityStart(now);

  try {
    const [metrics, projectEvents, projectPageViews, trafficSources, activity] =
      await Promise.all([
        queryPostHog<MetricRow>(
          config,
          "portfolio_stats_metrics",
          metricsQuery(monthStart),
        ),
        queryPostHog<ProjectEventRow>(
          config,
          "portfolio_stats_project_events",
          projectEventsQuery(monthStart),
        ),
        queryPostHog<ProjectPageViewRow>(
          config,
          "portfolio_stats_project_pageviews",
          projectPageViewsQuery(monthStart),
        ),
        queryPostHog<TrafficSourceRow>(
          config,
          "portfolio_stats_traffic_sources",
          trafficSourcesQuery(monthStart),
        ),
        queryPostHog<ActivityRow>(
          config,
          "portfolio_stats_activity",
          activityQuery(activityStart),
        ),
      ]);

    const firstMetric = metrics[0] ?? {};

    return {
      generatedAt: now.toISOString(),
      isConfigured: true,
      monthLabel: getMonthLabel(now),
      activityStart: activityStart.toISOString(),
      metrics: {
        visitsThisMonth: toNumber(firstMetric.visits_this_month),
        resumeOpens: toNumber(firstMetric.resume_opens),
        projectDemoClicks: toNumber(firstMetric.project_demo_clicks),
        contactFormSubmissions: toNumber(firstMetric.contact_form_submissions),
        chatbotConversations: toNumber(firstMetric.chatbot_conversations),
        chatbotMessages: toNumber(firstMetric.chatbot_messages),
      },
      trendingProjects: mergeProjectStats(projectEvents, projectPageViews),
      trafficSources: normalizeTrafficSources(trafficSources),
      activity: buildActivityDays(activityStart, activity),
    };
  } catch (error) {
    console.error("Failed to load stats", error);

    return emptyStats(
      now,
      true,
      "Stats are temporarily unavailable. Check the PostHog project ID, host, and personal API key.",
    );
  }
}

function getPostHogConfig() {
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const personalApiKey = process.env.POSTHOG_PERSONAL_API_KEY;

  if (!projectId || !personalApiKey) return null;

  return {
    projectId,
    personalApiKey,
    host: getPostHogApiHost(),
  };
}

function getPostHogApiHost() {
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

async function queryPostHog<T>(
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

function rowsToObjects<T>(data: PostHogQueryResponse): T[] {
  if (!data.columns || !data.results) return [];

  return data.results.map((row) =>
    Object.fromEntries(data.columns!.map((column, index) => [column, row[index]])),
  ) as T[];
}

function mergeProjectStats(
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

    const current =
      projects.get(project) ?? { project, clicks: 0, views: 0, total: 0 };

    current.clicks += toNumber(row.clicks);
    current.views += toNumber(row.detail_views);
    projects.set(project, current);
  }

  for (const row of projectPageViews) {
    const project = projectNameFromUrl(row.url);
    if (!project) continue;

    const current =
      projects.get(project) ?? { project, clicks: 0, views: 0, total: 0 };

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

function normalizeTrafficSources(rows: TrafficSourceRow[]) {
  const sourceTotals = new Map<string, number>(
    TRAFFIC_SOURCES.map((source) => [source, 0]),
  );

  for (const row of rows) {
    const source = TRAFFIC_SOURCES.includes(row.source ?? "")
      ? row.source!
      : "Other";

    sourceTotals.set(source, (sourceTotals.get(source) ?? 0) + toNumber(row.total));
  }

  return TRAFFIC_SOURCES.map((source) => ({
    source,
    total: sourceTotals.get(source) ?? 0,
  }));
}

function buildActivityDays(activityStart: Date, rows: ActivityRow[]) {
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

function projectNameFromUrl(rawUrl?: string) {
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

function projectNameBySlug() {
  return new Map(
    [CHATBOT_PROJECT, ...sideProjects].map((project) => [
      project.descLink.split("/").filter(Boolean)[1],
      project.title,
    ]),
  );
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function cleanProjectName(project?: string) {
  if (!project || project === "Unknown project") return null;

  return project.trim();
}

function getMonthStart(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function getActivityStart(date: Date) {
  const start = startOfUtcDay(date);
  start.setUTCDate(start.getUTCDate() - 83);
  return start;
}

function startOfUtcDay(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value) || 0;
  return 0;
}
