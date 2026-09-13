from __future__ import annotations

from app.models.community import ActivityItem, TopicCluster


KEYWORDS = {
    "onboarding": ("Onboarding Systems", "activation"),
    "deployment": ("Production Readiness", "retention"),
    "reliability": ("Agent Reliability", "retention"),
    "testing": ("Testing Patterns", "education"),
    "support": ("Support Operations", "retention"),
    "docs": ("Documentation Experience", "education"),
    "example": ("Implementation Patterns", "activation"),
    "guide": ("Guided Learning", "education"),
    "auth": ("Authentication Friction", "activation"),
    "starter": ("Starter Kits", "activation"),
    "performance": ("Performance Tuning", "retention"),
}


def cluster_topics(activity_feed: list[ActivityItem]) -> list[TopicCluster]:
    scores: dict[str, dict[str, str | int]] = {}
    for item in activity_feed:
        normalized = " ".join([item.title.lower(), " ".join(item.labels).lower(), item.kind.lower()])
        for keyword, (topic_name, intent) in KEYWORDS.items():
            if keyword in normalized:
                bucket = scores.setdefault(topic_name, {"volume": 0, "intent": intent})
                bucket["volume"] = int(bucket["volume"]) + 1

    clusters = [
        TopicCluster(
            topic=topic,
            volume=int(data["volume"]),
            intent=str(data["intent"]),
            trend="surging" if int(data["volume"]) >= 3 else "steady" if int(data["volume"]) >= 2 else "cooling",
        )
        for topic, data in scores.items()
    ]
    return sorted(clusters, key=lambda item: item.volume, reverse=True)
