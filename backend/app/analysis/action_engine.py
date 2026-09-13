from __future__ import annotations

from app.models.community import CommunityHealth, CommunitySnapshot


def assess_health(snapshots: list[CommunitySnapshot]) -> CommunityHealth:
    latest = snapshots[-1]
    unanswered_total = latest.questions_answered + latest.questions_unanswered
    unanswered_rate = latest.questions_unanswered / unanswered_total if unanswered_total else 0.0
    momentum_score = min(100, 55 + latest.new_members // 3 + latest.posts_published * 2)
    support_score = max(45, 94 - int(unanswered_rate * 100) - int(latest.questions_unanswered * 1.5))
    advocacy_score = min(100, 50 + latest.event_signups // 4 + latest.pull_requests_merged)
    activation_score = min(100, 48 + latest.docs_clicks // 45 + latest.new_members // 4)
    roi_score = min(100, 44 + latest.pull_requests_merged + latest.posts_published * 3)
    overall_score = round(
        (momentum_score * 0.24)
        + (support_score * 0.24)
        + (advocacy_score * 0.18)
        + (activation_score * 0.17)
        + (roi_score * 0.17)
    )

    if unanswered_rate >= 0.22:
        risk_level = "critical"
    elif unanswered_rate >= 0.16:
        risk_level = "high"
    elif unanswered_rate >= 0.10:
        risk_level = "medium"
    else:
        risk_level = "low"

    summary = (
        "The product story is being stressed by live support friction, so messaging and onboarding probably need repair."
        if risk_level in {"critical", "high"}
        else "The repo story is mostly aligned, with clear room to turn repeated questions into sharper docs and stronger narrative proof."
    )

    return CommunityHealth(
        overall_score=overall_score,
        momentum_score=momentum_score,
        support_score=support_score,
        advocacy_score=advocacy_score,
        activation_score=activation_score,
        roi_score=roi_score,
        response_time_hours=round(max(3.2, latest.questions_unanswered / 1.4), 1),
        unanswered_rate=round(unanswered_rate * 100, 1),
        risk_level=risk_level,
        summary=summary,
    )
