from app.analysis.action_engine import assess_health
from app.analysis.signals import build_signals
from app.ingestion.github import GitHubIngestionService


def test_health_scoring_and_signals_are_generated() -> None:
    ingestion = GitHubIngestionService()
    snapshots = ingestion.fetch_weekly_snapshots("nextforge")
    activity = ingestion.fetch_activity_feed("nextforge")

    health = assess_health(snapshots)
    signals = build_signals(snapshots, activity)

    assert health.overall_score > 0
    assert health.risk_level in {"critical", "high", "medium", "low"}
    assert len(signals) >= 3
