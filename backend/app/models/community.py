from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


Priority = Literal["critical", "high", "medium", "low"]
SignalType = Literal["momentum", "risk", "support", "content", "advocacy", "roi"]
SyncMode = Literal["live"]


class CommunitySnapshot(BaseModel):
    week: str
    active_contributors: int
    new_members: int
    posts_published: int
    discussions_started: int
    questions_answered: int
    questions_unanswered: int
    pull_requests_merged: int
    docs_clicks: int
    event_signups: int


class ActivityItem(BaseModel):
    id: str
    source: str
    kind: str = "discussion"
    title: str
    author: str
    engagement: int = 0
    url: str = "#"
    created_at: str = ""
    labels: list[str] = []


class CommunityProfile(BaseModel):
    slug: str
    name: str
    tagline: str
    category: str
    primary_channel: str
    region_focus: str
    members: int
    weekly_active_members: int
    health_score: int
    response_time_hours: float
    growth_rate: float
    repo_owner: str
    repo_name: str
    docs_url: str
    github_token_env: str
    sync_mode: SyncMode
    strategic_focus: list[str]
    positioning_claim: str = ""
    onboarding_promise: str = ""
    proof_goal: str = ""


class CommunityUpdateRequest(BaseModel):
    name: str
    tagline: str
    repo_owner: str
    repo_name: str
    docs_url: str
    github_token_env: str
    sync_mode: SyncMode
    strategic_focus: list[str]
    positioning_claim: str = ""
    onboarding_promise: str = ""
    proof_goal: str = ""


class CommunityHealth(BaseModel):
    overall_score: int
    momentum_score: int
    support_score: int
    advocacy_score: int
    activation_score: int
    roi_score: int
    response_time_hours: float
    unanswered_rate: float
    risk_level: Priority
    summary: str


class Signal(BaseModel):
    id: str
    type: SignalType
    title: str
    description: str
    topic: str
    score: int = Field(ge=0, le=100)
    priority: Priority
    evidence: str = ""


class Champion(BaseModel):
    username: str
    role: str
    score: int = Field(ge=0, le=100)
    specialties: list[str]
    recent_win: str


class TopicCluster(BaseModel):
    topic: str
    volume: int
    intent: Literal["education", "activation", "retention", "advocacy"]
    trend: Literal["surging", "steady", "cooling"]


class ContentOpportunity(BaseModel):
    id: str
    title: str
    format: str
    audience: str
    priority: Priority
    insight: str
    call_to_action: str


class Recommendation(BaseModel):
    id: str
    title: str
    owner: str
    priority: Priority
    impact: str
    due_window: str
    rationale: str
    metric_target: str = ""


class BenchmarkMetric(BaseModel):
    label: str
    value: str
    delta: str
    direction: Literal["up", "down", "flat"]
    context: str


class WorkflowInsight(BaseModel):
    id: str
    title: str
    summary: str
    owner: str
    status: Literal["watch", "act", "scale"]


class SyncStatus(BaseModel):
    mode: SyncMode
    source: str
    label: str
    synced_at: str
    repo: str


class DashboardData(BaseModel):
    community: CommunityProfile
    health: CommunityHealth
    sync_status: SyncStatus
    benchmark_metrics: list[BenchmarkMetric]
    weekly_snapshots: list[CommunitySnapshot]
    live_signals: list[Signal]
    champions: list[Champion]
    topic_clusters: list[TopicCluster]
    content_opportunities: list[ContentOpportunity]
    recommendations: list[Recommendation]
    workflow_insights: list[WorkflowInsight]
    activity_feed: list[ActivityItem]
    community_brief: str
    content_brief: str
