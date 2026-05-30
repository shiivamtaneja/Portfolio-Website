import "server-only";

import {
  activityQuery,
  metricsQuery,
  projectEventsQuery,
  projectPageViewsQuery,
  trafficSourcesQuery,
} from "@/lib/stats-queries";
import {
  ActivityRow,
  MetricRow,
  ProjectEventRow,
  ProjectPageViewRow,
  StatsData,
  TrafficSourceRow,
} from "@/types/stats.types";
import {
  TRAFFIC_SOURCES,
  buildActivityDays,
  getActivityStart,
  getMonthLabel,
  getMonthStart,
  getPostHogConfig,
  mergeProjectStats,
  normalizeTrafficSources,
  queryPostHog,
  toNumber,
} from "@/lib/stats-helpers";

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
