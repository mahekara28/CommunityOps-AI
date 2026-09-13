from __future__ import annotations

from app.models.community import ContentOpportunity, Signal, TopicCluster


def suggest_content_opportunities(
    signals: list[Signal],
    topics: list[TopicCluster],
) -> list[ContentOpportunity]:
    opportunities: list[ContentOpportunity] = []
    for index, topic in enumerate(topics[:3], start=1):
        format_name = (
            "Interactive repair guide"
            if topic.intent == "activation"
            else "Narrative proof memo"
            if topic.intent == "retention"
            else "Operator recap"
        )
        opportunities.append(
            ContentOpportunity(
                id=f"content-{index}",
                title=f"{topic.topic}: repair the story before the question repeats",
                format=format_name,
                audience=(
                    "New evaluators"
                    if topic.intent == "activation"
                    else "Active adopters"
                    if topic.intent == "retention"
                    else "Internal operators"
                ),
                priority="high" if topic.trend == "surging" else "medium",
                insight=f"{topic.volume} recent high-signal threads point to a persistent gap between the official story and user reality.",
                call_to_action=(
                    "Publish a canonical repair asset and route future discussions back to it."
                    if topic.intent != "advocacy"
                    else "Package practitioner language into repeatable proof and trust assets."
                ),
            )
        )

    if any(signal.type == "advocacy" for signal in signals):
        opportunities.append(
            ContentOpportunity(
                id="content-advocacy",
                title="Turn practitioner explanations into trust-building narrative proof",
                format="Video + quote cards",
                audience="Prospects, adopters, and internal stakeholders",
                priority="medium",
                insight="Member-led trade-off discussions are stronger and more believable than polished top-down messaging.",
                call_to_action="Package authentic build stories into short-form assets for docs, launches, and proof channels.",
            )
        )

    return opportunities
