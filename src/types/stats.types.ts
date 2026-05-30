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

export type PostHogQueryResponse = {
  columns?: string[];
  results?: unknown[][];
};

export type MetricRow = {
  visits_this_month?: number;
  resume_opens?: number;
  project_demo_clicks?: number;
  contact_form_submissions?: number;
  chatbot_conversations?: number;
  chatbot_messages?: number;
};

export type ProjectEventRow = {
  project?: string;
  clicks?: number;
  detail_views?: number;
};

export type ProjectPageViewRow = {
  url?: string;
  views?: number;
};

export type TrafficSourceRow = {
  source?: string;
  total?: number;
};

export type ActivityRow = {
  day?: string;
  total?: number;
};
