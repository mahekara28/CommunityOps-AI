export type Priority = "critical" | "high" | "medium" | "low";
export type SyncMode = "live";

export interface CommunityProfile {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  primary_channel: string;
  region_focus: string;
  members: number;
  weekly_active_members: number;
  health_score: number;
  response_time_hours: number;
  growth_rate: number;
  repo_owner: string;
  repo_name: string;
  docs_url: string;
  github_token_env: string;
  sync_mode: SyncMode;
  strategic_focus: string[];
  positioning_claim: string;
  onboarding_promise: string;
  proof_goal: string;
}

export interface CommunityHealth {
  overall_score: number;
  momentum_score: number;
  support_score: number;
  advocacy_score: number;
  activation_score: number;
  roi_score: number;
  response_time_hours: number;
  unanswered_rate: number;
  risk_level: Priority;
  summary: string;
}

export interface CommunitySnapshot {
  week: string;
  active_contributors: number;
  new_members: number;
  posts_published: number;
  discussions_started: number;
  questions_answered: number;
  questions_unanswered: number;
  pull_requests_merged: number;
  docs_clicks: number;
  event_signups: number;
}

export interface Signal {
  id: string;
  type: string;
  title: string;
  description: string;
  topic: string;
  score: number;
  priority: Priority;
  evidence: string;
}

export interface Champion {
  username: string;
  role: string;
  score: number;
  specialties: string[];
  recent_win: string;
}

export interface TopicCluster {
  topic: string;
  volume: number;
  intent: string;
  trend: string;
}

export interface ContentOpportunity {
  id: string;
  title: string;
  format: string;
  audience: string;
  priority: Priority;
  insight: string;
  call_to_action: string;
}

export interface Recommendation {
  id: string;
  title: string;
  owner: string;
  priority: Priority;
  impact: string;
  due_window: string;
  rationale: string;
  metric_target: string;
}

export interface ActivityItem {
  id: string;
  source: string;
  kind: string;
  title: string;
  author: string;
  engagement: number;
  url: string;
  created_at: string;
  labels: string[];
}

export interface BenchmarkMetric {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down" | "flat";
  context: string;
}

export interface WorkflowInsight {
  id: string;
  title: string;
  summary: string;
  owner: string;
  status: "watch" | "act" | "scale";
}

export interface SyncStatus {
  mode: SyncMode;
  source: string;
  label: string;
  synced_at: string;
  repo: string;
}

export interface CommunityUpdateRequest {
  name: string;
  tagline: string;
  repo_owner: string;
  repo_name: string;
  docs_url: string;
  github_token_env: string;
  sync_mode: SyncMode;
  strategic_focus: string[];
  positioning_claim: string;
  onboarding_promise: string;
  proof_goal: string;
}

export interface DashboardData {
  community: CommunityProfile;
  health: CommunityHealth;
  sync_status: SyncStatus;
  benchmark_metrics: BenchmarkMetric[];
  weekly_snapshots: CommunitySnapshot[];
  live_signals: Signal[];
  champions: Champion[];
  topic_clusters: TopicCluster[];
  content_opportunities: ContentOpportunity[];
  recommendations: Recommendation[];
  workflow_insights: WorkflowInsight[];
  activity_feed: ActivityItem[];
  community_brief: string;
  content_brief: string;
}
