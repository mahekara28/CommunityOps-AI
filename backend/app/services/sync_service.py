from __future__ import annotations

from fastapi import HTTPException

from app.agents.community_ai import build_community_brief
from app.agents.content_ai import build_content_brief
from app.analysis.action_engine import assess_health
from app.analysis.champions import identify_champions
from app.analysis.content_opportunities import suggest_content_opportunities
from app.analysis.recommendations import build_recommendations
from app.analysis.signals import build_signals
from app.analysis.topic_engine import cluster_topics
from app.ingestion.github import GitHubIngestionError, GitHubIngestionService
from app.models.community import DashboardData, Signal, WorkflowInsight
from app.services.community_repository import CommunityRepository


class SyncService:
    def __init__(self) -> None:
        self.repository = CommunityRepository()
        self.ingestion = GitHubIngestionService()

    def build_dashboard(self, slug: str) -> DashboardData:
        community = self.repository.get_community(slug)
        if community is None:
            raise HTTPException(status_code=404, detail="Community not found")

        try:
            weekly_snapshots, activity_feed, benchmark_metrics, sync_status = self.ingestion.fetch_dashboard_inputs(
                community
            )
        except GitHubIngestionError as exc:
            raise HTTPException(status_code=502, detail=str(exc)) from exc
        health = assess_health(weekly_snapshots)
        signals = build_signals(weekly_snapshots, activity_feed)
        champions = identify_champions(activity_feed)
        topic_clusters = cluster_topics(activity_feed)
        content_opportunities = suggest_content_opportunities(signals, topic_clusters)
        recommendations = build_recommendations(health, signals)
        workflow_insights = self._build_workflow_insights(community.strategic_focus, signals)

        return DashboardData(
            community=community,
            health=health,
            sync_status=sync_status,
            benchmark_metrics=benchmark_metrics,
            weekly_snapshots=weekly_snapshots,
            live_signals=signals,
            champions=champions,
            topic_clusters=topic_clusters,
            content_opportunities=content_opportunities,
            recommendations=recommendations,
            workflow_insights=workflow_insights,
            activity_feed=activity_feed,
            community_brief=build_community_brief(
                community.name, sync_status, health, signals, recommendations
            ),
            content_brief=build_content_brief(content_opportunities),
        )

    def _build_workflow_insights(
        self,
        strategic_focus: list[str],
        signals: list[Signal],
    ) -> list[WorkflowInsight]:
        primary_signal = signals[0]
        return [
            WorkflowInsight(
                id="wf-priorities",
                title="Narrative review loop",
                summary="Turn GitHub evidence into a weekly readout of where the product story matches reality and where it does not.",
                owner="Product marketing",
                status="scale" if primary_signal.type in {"roi", "momentum"} else "watch",
            ),
            WorkflowInsight(
                id="wf-routing",
                title="Friction repair lane",
                summary="Separate true product blockers from wording, onboarding, and documentation failures.",
                owner="DevRel",
                status="act" if any(signal.type == "support" for signal in signals) else "watch",
            ),
            WorkflowInsight(
                id="wf-focus",
                title="Story repair stack",
                summary=", ".join(strategic_focus[:3]) or "No narrative repair focus configured yet.",
                owner="Product ops",
                status="scale",
            ),
        ]
