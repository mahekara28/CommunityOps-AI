from app.analysis.action_engine import assess_health
from app.analysis.champions import identify_champions
from app.analysis.signals import build_signals
from app.models.community import ActivityItem, CommunitySnapshot


def test_health_scoring_and_signals_are_generated() -> None:
    snapshots = [
        CommunitySnapshot(
            week="2026-W31",
            active_contributors=4,
            new_members=3,
            posts_published=2,
            discussions_started=4,
            questions_answered=3,
            questions_unanswered=2,
            pull_requests_merged=2,
            docs_clicks=120,
            event_signups=16,
        ),
        CommunitySnapshot(
            week="2026-W32",
            active_contributors=6,
            new_members=4,
            posts_published=3,
            discussions_started=5,
            questions_answered=4,
            questions_unanswered=3,
            pull_requests_merged=4,
            docs_clicks=160,
            event_signups=21,
        ),
    ]
    activity = [
        ActivityItem(
            id="issue-1",
            source="GitHub Issue",
            kind="issue",
            title="Setup docs need clearer auth guidance",
            author="alex",
            engagement=4,
            labels=["docs", "auth"],
            created_at="2026-08-08T00:00:00Z",
        ),
        ActivityItem(
            id="pr-1",
            source="Pull Request",
            kind="pull_request",
            title="Fix onboarding friction in install flow",
            author="sam",
            engagement=5,
            labels=["onboarding", "setup"],
            created_at="2026-08-09T00:00:00Z",
        ),
    ]

    health = assess_health(snapshots)
    signals = build_signals(snapshots, activity)
    champions = identify_champions(activity)

    assert health.overall_score > 0
    assert health.risk_level in {"critical", "high", "medium", "low"}
    assert len(signals) >= 3
    assert len(champions) == 2
