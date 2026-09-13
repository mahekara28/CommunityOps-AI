from __future__ import annotations

from collections import Counter

from app.models.community import ActivityItem, Champion


SPECIALTY_KEYWORDS = {
    "docs": "Documentation",
    "doc": "Documentation",
    "onboarding": "Onboarding",
    "setup": "Setup",
    "install": "Setup",
    "bug": "Reliability",
    "error": "Reliability",
    "fix": "Reliability",
    "auth": "Authentication",
    "deploy": "Deployment",
    "release": "Release workflow",
    "performance": "Performance",
    "testing": "Testing",
    "test": "Testing",
    "example": "Implementation patterns",
    "guide": "Guides",
    "support": "Support triage",
}


def identify_champions(activity_feed: list[ActivityItem]) -> list[Champion]:
    if not activity_feed:
        return []

    scoreboard: dict[str, dict[str, object]] = {}
    for item in activity_feed:
        author = item.author or "unknown"
        bucket = scoreboard.setdefault(
            author,
            {
                "activity_count": 0,
                "engagement": 0,
                "issues": 0,
                "pulls": 0,
                "support_signals": 0,
                "specialties": Counter(),
                "best_item": item,
                "best_score": -1,
            },
        )
        bucket["activity_count"] = int(bucket["activity_count"]) + 1
        bucket["engagement"] = int(bucket["engagement"]) + item.engagement
        if item.kind == "pull_request":
            bucket["pulls"] = int(bucket["pulls"]) + 1
        else:
            bucket["issues"] = int(bucket["issues"]) + 1

        normalized = " ".join([item.title.lower(), item.kind.lower(), " ".join(label.lower() for label in item.labels)])
        if any(token in normalized for token in ["question", "help", "error", "bug", "support", "how"]):
            bucket["support_signals"] = int(bucket["support_signals"]) + 1

        for keyword, label in SPECIALTY_KEYWORDS.items():
            if keyword in normalized:
                cast_counter = bucket["specialties"]
                assert isinstance(cast_counter, Counter)
                cast_counter[label] += 1

        item_score = item.engagement + (8 if item.kind == "pull_request" else 4) + len(item.labels)
        if item_score > int(bucket["best_score"]):
            bucket["best_item"] = item
            bucket["best_score"] = item_score

    champions: list[Champion] = []
    for username, details in scoreboard.items():
        activity_count = int(details["activity_count"])
        engagement = int(details["engagement"])
        pulls = int(details["pulls"])
        support_signals = int(details["support_signals"])
        best_item = details["best_item"]
        assert isinstance(best_item, ActivityItem)

        if pulls >= activity_count / 2 and pulls > 0:
            role = "Maintainer signal"
        elif support_signals > 0:
            role = "Support signal"
        else:
            role = "Contributor signal"

        specialties_counter = details["specialties"]
        assert isinstance(specialties_counter, Counter)
        specialties = [label for label, _ in specialties_counter.most_common(3)]
        if not specialties:
            fallback = "Pull requests" if pulls > 0 else "Repository feedback"
            specialties = [fallback, "Developer reality"]

        score = min(96, 58 + activity_count * 9 + min(engagement, 12) * 2)
        recent_win = f"Most visible recent signal: {best_item.title}."

        champions.append(
            Champion(
                username=username,
                role=role,
                score=score,
                specialties=specialties,
                recent_win=recent_win,
            )
        )

    return sorted(champions, key=lambda item: item.score, reverse=True)[:4]
