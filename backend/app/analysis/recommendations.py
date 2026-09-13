from __future__ import annotations

from app.models.community import CommunityHealth, Recommendation, Signal


def build_recommendations(
    health: CommunityHealth,
    signals: list[Signal],
) -> list[Recommendation]:
    recommendations = [
        Recommendation(
            id="rec-claim-repair",
            title="Rewrite the top-level setup promise around the actual first-run path",
            owner="Product Marketing",
            priority="critical",
            impact="Reduce trust erosion caused by a claim that feels easier than the real onboarding experience.",
            due_window="This week",
            rationale="The fastest way to reduce narrative damage is to close the promise gap at the top of the funnel.",
            metric_target="Lower unanswered rate and reduce repeat setup questions.",
        ),
        Recommendation(
            id="rec-objection-log",
            title="Build a reusable objection and confusion log from current GitHub issues",
            owner="DevRel",
            priority="high",
            impact="Turn repeated user friction into a structured repair list for docs, messaging, and onboarding.",
            due_window="Next 10 days",
            rationale="The open issue stream already contains the language of the gap. It just needs to be organized.",
            metric_target="Convert the top recurring confusion themes into tracked repair items.",
        ),
    ]

    if health.momentum_score >= 75:
        recommendations.append(
            Recommendation(
                id="rec-onboarding-proof",
                title="Publish an honest onboarding guide with exact steps, edge cases, and expected failure points",
                owner="Docs",
                priority="high",
                impact="Reduce the mismatch between launch language and the lived experience of a new developer.",
                due_window="Next 2 weeks",
                rationale="Interest is present, but the current path still creates enough confusion to distort the product story.",
                metric_target="Reduce first-use support questions and increase docs completion confidence.",
            )
        )

    if any(signal.type == "support" and signal.priority == "critical" for signal in signals):
        recommendations.append(
            Recommendation(
                id="rec-troubleshooting-layer",
                title="Create a troubleshooting layer that answers the questions users are already asking",
                owner="Support",
                priority="medium",
                impact="Protect trust by closing the gap between official docs and real-world debugging needs.",
                due_window="This sprint",
                rationale="Support friction is now visible enough that silence becomes part of the product narrative.",
                metric_target="Cut repeated debugging questions and improve first-response resolution quality.",
            )
        )

    if health.roi_score >= 72:
        recommendations.append(
            Recommendation(
                id="rec-proof-loop",
                title="Turn shipped fixes and user wins into a weekly proof memo",
                owner="Growth",
                priority="high",
                impact="Make real adoption evidence visible enough to support launches, sales, and internal alignment.",
                due_window="This month",
                rationale="If proof stays buried in issues and pull requests, the external story will keep lagging behind the product.",
                metric_target="Publish one repeatable proof memo built directly from repo evidence.",
            )
        )

    return recommendations
