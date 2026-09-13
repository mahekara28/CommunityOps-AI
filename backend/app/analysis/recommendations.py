from __future__ import annotations

from app.models.community import CommunityHealth, Recommendation, Signal


def build_recommendations(
    health: CommunityHealth,
    signals: list[Signal],
) -> list[Recommendation]:
    recommendations = [
        Recommendation(
            id="rec-support-sprint",
            title="Launch a 5-day support backlog sprint",
            owner="Community Ops",
            priority="critical",
            impact="Reduce unanswered questions and improve perceived responsiveness.",
            due_window="This week",
            rationale="Backlog growth is the sharpest near-term risk in the current signal set.",
            metric_target="Bring unanswered rate below 12%.",
        ),
        Recommendation(
            id="rec-champion-program",
            title="Formalize a rotating champion amplification loop",
            owner="DevRel",
            priority="high",
            impact="Convert existing power users into repeat advocacy and peer support.",
            due_window="Next 10 days",
            rationale="The community already has visible champions; the system around them is still informal.",
            metric_target="Increase champion-led responses by 25%.",
        ),
    ]

    if health.momentum_score >= 75:
        recommendations.append(
            Recommendation(
                id="rec-launch-series",
                title="Ship a three-part launch education series",
                owner="Content",
                priority="high",
                impact="Capture current discovery demand while momentum is above baseline.",
                due_window="Next 2 weeks",
                rationale="Growth and docs demand are rising together, which is a strong content timing signal.",
                metric_target="Ship 3 proof-oriented assets tied to top recurring topics.",
            )
        )

    if any(signal.type == "support" and signal.priority == "critical" for signal in signals):
        recommendations.append(
            Recommendation(
                id="rec-routing",
                title="Create a response routing matrix for maintainers vs champions",
                owner="Operations",
                priority="medium",
                impact="Protect maintainer focus while keeping first-response time fast.",
                due_window="This sprint",
                rationale="Support quality improves fastest when triage ownership is explicit.",
                metric_target="Cut first-response time by 30%.",
            )
        )

    if health.roi_score >= 72:
        recommendations.append(
            Recommendation(
                id="rec-proof-loop",
                title="Create a monthly community-to-pipeline proof loop",
                owner="Developer Marketing",
                priority="high",
                impact="Translate community momentum into executive-visible ROI.",
                due_window="This month",
                rationale="Leadership pressure is usually highest when teams cannot connect engagement to outcomes.",
                metric_target="Publish one monthly ROI readout with launch, support, and content outcomes.",
            )
        )

    return recommendations
