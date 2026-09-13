from __future__ import annotations

from app.models.community import Champion


def identify_champions(community_slug: str) -> list[Champion]:
    if community_slug == "cloudcanvas":
        return [
            Champion(
                username="nina-platform",
                role="Community Guide",
                score=91,
                specialties=["Platform engineering", "Internal tooling"],
                recent_win="Hosted a live teardown of deployment guardrails that drove 18 follow-up replies.",
            ),
            Champion(
                username="dexops",
                role="Maintainer",
                score=86,
                specialties=["Observability", "CI reliability"],
                recent_win="Merged the most-requested tracing example and answered six setup questions.",
            ),
        ]

    return [
        Champion(
            username="anika-dev",
            role="Developer Advocate",
            score=94,
            specialties=["Onboarding", "AI SDKs"],
            recent_win="Turned a lengthy support thread into a reusable starter walkthrough.",
        ),
        Champion(
            username="marcelo",
            role="Maintainer",
            score=88,
            specialties=["Reliability", "Production patterns"],
            recent_win="Shipped a webhook reliability fix and documented the rollout path.",
        ),
        Champion(
            username="sarahw",
            role="Community Champion",
            score=83,
            specialties=["Testing", "DX feedback"],
            recent_win="Sparked a high-signal discussion on agent reliability scoring.",
        ),
    ]
