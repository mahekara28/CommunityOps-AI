from __future__ import annotations

from app.models.community import ContentOpportunity


def build_content_brief(opportunities: list[ContentOpportunity]) -> str:
    if not opportunities:
        return "No meaningful content opportunities were detected this week."

    lead = opportunities[0]
    return (
        f"Lead with {lead.format.lower()} content around '{lead.title}'. "
        f"This theme is timely because {lead.insight.lower()} "
        f"The content should drive readers toward: {lead.call_to_action.lower()}"
    )
