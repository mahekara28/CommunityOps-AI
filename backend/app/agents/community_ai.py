from __future__ import annotations

from app.models.community import CommunityHealth, Recommendation, Signal, SyncStatus


def build_community_brief(
    community_name: str,
    sync_status: SyncStatus,
    health: CommunityHealth,
    signals: list[Signal],
    recommendations: list[Recommendation],
) -> str:
    top_signal = signals[0]
    next_step = recommendations[0]
    return (
        f"{community_name} is sitting at a health score of {health.overall_score}/100. "
        f"The strongest current signal is '{top_signal.title.lower()}', while the biggest operational risk "
        f"is a {health.unanswered_rate}% unanswered rate. The product is currently running in "
        f"{sync_status.mode} mode from {sync_status.source.lower()}. The most important next move is to "
        f"{next_step.title.lower()}."
    )
