from __future__ import annotations

from app.models.community import ContentOpportunity, Signal, TopicCluster


def suggest_content_opportunities(
    signals: list[Signal],
    topics: list[TopicCluster],
) -> list[ContentOpportunity]:
    opportunities: list[ContentOpportunity] = []
    for index, topic in enumerate(topics[:3], start=1):
        format_name = (
            "Interactive guide"
            if topic.intent == "activation"
            else "Benchmark teardown"
            if topic.intent == "retention"
            else "Office hours recap"
        )
        opportunities.append(
            ContentOpportunity(
                id=f"content-{index}",
                title=f"{topic.topic}: from recurring questions to reusable proof",
                format=format_name,
                audience=(
                    "New builders"
                    if topic.intent == "activation"
                    else "Existing adopters"
                    if topic.intent == "retention"
                    else "Community educators"
                ),
                priority="high" if topic.trend == "surging" else "medium",
                insight=f"{topic.volume} recent high-signal threads point to sustained demand.",
                call_to_action=(
                    "Publish a canonical resource and route future discussions back to it."
                    if topic.intent != "advocacy"
                    else "Package the best practitioner stories into repeatable advocacy assets."
                ),
            )
        )

    if any(signal.type == "advocacy" for signal in signals):
        opportunities.append(
            ContentOpportunity(
                id="content-advocacy",
                title="Turn champion stories into a social proof campaign",
                format="Video + quote cards",
                audience="Warm prospects and existing members",
                priority="medium",
                insight="Member-led trade-off discussions are strong raw material for credible content.",
                call_to_action="Package authentic build stories into short-form assets for launch channels.",
            )
        )

    return opportunities
