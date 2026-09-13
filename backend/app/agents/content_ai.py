from __future__ import annotations

from app.models.community import ContentOpportunity


def build_content_brief(opportunities: list[ContentOpportunity]) -> str:
    if not opportunities:
        return "No clear narrative repair assets were detected this week."

    lead = opportunities[0]
    return (
        f"Lead with a {lead.format.lower()} built around '{lead.title}'. "
        f"This theme matters because {lead.insight.lower()} "
        f"The asset should drive readers toward: {lead.call_to_action.lower()}"
    )
