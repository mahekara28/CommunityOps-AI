from __future__ import annotations

from dataclasses import dataclass


@dataclass(slots=True)
class CommunityRow:
    slug: str
    name: str
    tagline: str
    category: str
    primary_channel: str
    region_focus: str
    members: int
    weekly_active_members: int
    health_score: int
    response_time_hours: float
    growth_rate: float
