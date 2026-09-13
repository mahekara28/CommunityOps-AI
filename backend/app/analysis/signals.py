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
            id="signal-onboarding-gap",
            type="momentum",
            title="Onboarding story is outpacing first-run reality",
            description=f"Docs demand moved by {docs_delta} while unresolved questions changed by {unanswered_delta}.",
            topic="Onboarding Claim",
            score=min(95, 66 + max(docs_delta // 12, 0) + max(unanswered_delta, 0) * 3),
            priority="critical" if unanswered_delta > 0 else "high",
            evidence=f"{latest.docs_clicks} docs-intent events versus {latest.questions_unanswered} unanswered questions in the latest window.",
        ),
        Signal(
            id="signal-support-gap",
            type="support",
            title="Support language is hiding implementation friction",
            description=f"{max(unanswered_delta, 0)} additional unresolved questions suggest the current guidance is not finishing the job.",
            topic="Troubleshooting Reality",
            score=78 if unanswered_delta > 0 else 59,
            priority="critical" if unanswered_delta > 0 else "medium",
            evidence=f"{question_heavy_items} recent items still read like direct help requests instead of deeper product discussion.",
        ),
        Signal(
            id="signal-proof-gap",
            type="content",
            title="User curiosity is visible, but the proof narrative is still thin",
            description=f"Docs and issue activity rose by {docs_delta} and {contributor_delta} respectively, but the experience still needs clearer proof packaging.",
            topic="Proof Packaging",
            score=min(94, 62 + max(docs_delta // 10, 0)),
            priority="medium",
            evidence=f"Educational demand proxy rose from {previous.docs_clicks} to {latest.docs_clicks}.",
        ),
        Signal(
            id="signal-message-gap",
            type="roi",
            title="Shipped changes are not automatically becoming product narrative",
            description="Merged pull requests and contributor participation are rising, but those wins still need better explanation and distribution.",
            topic="Launch Messaging",
            score=min(96, 61 + max(merged_delta, 0) * 6 + max(contributor_delta, 0)),
            priority="high" if merged_delta >= 0 else "medium",
            evidence=f"{latest.pull_requests_merged} merged pull requests landed in the latest window.",
        ),
    ]

    if activity_feed:
        signals.append(
            Signal(
                id="signal-voice-gap",
                type="advocacy",
                title="Practitioner language is richer than the official story",
                description="Users and maintainers are already explaining important trade-offs in the open, which means the official narrative is lagging behind reality.",
                topic="Field Voice",
                score=81,
                priority="high",
                evidence="Recent activity includes explanation-heavy issues, PRs, and maintainer conversations.",
            )
        )

    return signals
