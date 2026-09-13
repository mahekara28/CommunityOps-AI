from __future__ import annotations

from app.models.community import ActivityItem, CommunitySnapshot, Signal


def build_signals(
    snapshots: list[CommunitySnapshot],
    activity_feed: list[ActivityItem],
) -> list[Signal]:
    latest = snapshots[-1]
    previous = snapshots[-2]
    contributor_delta = latest.active_contributors - previous.active_contributors
    unanswered_delta = latest.questions_unanswered - previous.questions_unanswered
    docs_delta = latest.docs_clicks - previous.docs_clicks
    merged_delta = latest.pull_requests_merged - previous.pull_requests_merged
    question_heavy_items = sum(
        1 for item in activity_feed if "?" in item.title or "help" in item.title.lower()
    )

    signals = [
        Signal(
            id="signal-momentum",
            type="momentum",
            title="Contributor momentum is accelerating",
            description=f"Active contributors grew by {contributor_delta} week over week.",
            topic="Contributor Experience",
            score=min(95, 72 + contributor_delta),
            priority="high",
            evidence=f"{latest.active_contributors} active contributors in the latest weekly window.",
        ),
        Signal(
            id="signal-support",
            type="support",
            title="Support backlog needs attention",
            description=f"Unanswered questions increased by {max(unanswered_delta, 0)} this week.",
            topic="Support",
            score=76 if unanswered_delta > 0 else 58,
            priority="critical" if unanswered_delta > 0 else "medium",
            evidence=f"{question_heavy_items} recent issues or discussions look like support asks.",
        ),
        Signal(
            id="signal-content",
            type="content",
            title="Docs demand is translating into discovery",
            description=f"Docs clicks rose by {docs_delta}, with strong follow-through into discussions.",
            topic="Education",
            score=min(94, 63 + docs_delta // 10),
            priority="medium",
            evidence=f"Educational demand proxy rose from {previous.docs_clicks} to {latest.docs_clicks}.",
        ),
        Signal(
            id="signal-roi",
            type="roi",
            title="Community activity is compounding into product proof",
            description="Merged pull requests and contributor participation are rising together.",
            topic="ROI",
            score=min(96, 62 + max(merged_delta, 0) * 6 + max(contributor_delta, 0)),
            priority="high" if merged_delta >= 0 else "medium",
            evidence=f"{latest.pull_requests_merged} merged pull requests in the latest window.",
        ),
    ]

    if activity_feed:
        signals.append(
            Signal(
                id="signal-advocacy",
                type="advocacy",
                title="Power users are sharing implementation trade-offs",
                description="Discussion threads are moving beyond support into peer-led experience sharing.",
                topic="Advocacy",
                score=81,
                priority="high",
                evidence="Recent activity includes explanation-heavy issues, PRs, and maintainer conversations.",
            )
        )

    return signals
