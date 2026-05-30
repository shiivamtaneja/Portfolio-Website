import { analyticsEvents } from "@/lib/analytics-events";

export function metricsQuery(monthStart: Date) {
  return `
    select
      countIf(event = '$pageview') as visits_this_month,
      countIf(event = '${analyticsEvents.resumeOpened}') as resume_opens,
      countIf(event = '${analyticsEvents.projectLiveOpened}') as project_demo_clicks,
      countIf(event = '${analyticsEvents.contactFormSubmitted}') as contact_form_submissions,
      countIf(event = '${analyticsEvents.chatbotConversationStarted}') as chatbot_conversations,
      countIf(event = '${analyticsEvents.chatbotMessageSent}') as chatbot_messages
    from events
    where timestamp >= parseDateTimeBestEffort('${monthStart.toISOString()}')
      and event in (
        '$pageview',
        '${analyticsEvents.resumeOpened}',
        '${analyticsEvents.projectLiveOpened}',
        '${analyticsEvents.contactFormSubmitted}',
        '${analyticsEvents.chatbotConversationStarted}',
        '${analyticsEvents.chatbotMessageSent}'
      )
  `;
}

export function projectEventsQuery(monthStart: Date) {
  return `
    select
      ifNull(nullIf(toString(properties.project), ''), 'Unknown project') as project,
      countIf(event = '${analyticsEvents.projectLiveOpened}') as clicks,
      countIf(event = '${analyticsEvents.projectDetailOpened}') as detail_views
    from events
    where timestamp >= parseDateTimeBestEffort('${monthStart.toISOString()}')
      and event in (
        '${analyticsEvents.projectLiveOpened}',
        '${analyticsEvents.projectDetailOpened}'
      )
    group by project
    order by clicks + detail_views desc
    limit 12
  `;
}

export function projectPageViewsQuery(monthStart: Date) {
  return `
    select
      toString(properties['$current_url']) as url,
      count() as views
    from events
    where timestamp >= parseDateTimeBestEffort('${monthStart.toISOString()}')
      and event = '$pageview'
      and toString(properties['$current_url']) like '%/projects/%'
    group by url
    order by views desc
    limit 200
  `;
}

export function trafficSourcesQuery(monthStart: Date) {
  return `
    select
      multiIf(
        referrer = '' or referrer = '$direct', 'Direct',
        position(referrer, 'google.') > 0, 'Google',
        position(referrer, 'github.com') > 0, 'GitHub',
        position(referrer, 'linkedin.com') > 0, 'LinkedIn',
        'Other'
      ) as source,
      count() as total
    from (
      select lower(ifNull(toString(properties['$referrer']), '')) as referrer
      from events
      where timestamp >= parseDateTimeBestEffort('${monthStart.toISOString()}')
        and event = '$pageview'
    )
    group by source
    order by total desc
  `;
}

export function activityQuery(activityStart: Date) {
  return `
    select
      toString(toDate(timestamp)) as day,
      count() as total
    from events
    where timestamp >= parseDateTimeBestEffort('${activityStart.toISOString()}')
      and event in (
        '$pageview',
        '${analyticsEvents.resumeOpened}',
        '${analyticsEvents.projectLiveOpened}',
        '${analyticsEvents.projectDetailOpened}',
        '${analyticsEvents.contactFormSubmitted}',
        '${analyticsEvents.chatbotConversationStarted}',
        '${analyticsEvents.chatbotMessageSent}'
      )
    group by day
    order by day asc
  `;
}
