from __future__ import annotations

import json

from app.core.database import get_connection, initialize_database
from app.models.community import CommunityProfile, CommunityUpdateRequest


class CommunityRepository:
    def __init__(self) -> None:
        initialize_database()

    def list_communities(self) -> list[CommunityProfile]:
        with get_connection() as connection:
            rows = connection.execute("SELECT * FROM communities ORDER BY members DESC").fetchall()
        return [self._deserialize_row(dict(row)) for row in rows]

    def get_community(self, slug: str) -> CommunityProfile | None:
        with get_connection() as connection:
            row = connection.execute(
                "SELECT * FROM communities WHERE slug = ?",
                (slug,),
            ).fetchone()
        return self._deserialize_row(dict(row)) if row else None

    def create_community(self) -> CommunityProfile:
        with get_connection() as connection:
            existing = connection.execute("SELECT COUNT(*) FROM communities").fetchone()[0]
            slug = f"source-{existing + 1}"
            connection.execute(
                """
                INSERT INTO communities (
                    slug,
                    name,
                    tagline,
                    category,
                    primary_channel,
                    region_focus,
                    members,
                    weekly_active_members,
                    health_score,
                    response_time_hours,
                    growth_rate,
                    repo_owner,
                    repo_name,
                    docs_url,
                    github_token_env,
                    sync_mode,
                    strategic_focus,
                    positioning_claim,
                    onboarding_promise,
                    proof_goal
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    slug,
                    f"Source {existing + 1}",
                    "",
                    "Developer Product",
                    "GitHub",
                    "",
                    0,
                    0,
                    0,
                    0,
                    0,
                    "",
                    "",
                    "",
                    "GITHUB_TOKEN",
                    "live",
                    json.dumps([]),
                    "",
                    "",
                    "",
                ),
            )
        created = self.get_community(slug)
        if created is None:
            raise RuntimeError("Failed to create source")
        return created

    def update_community(self, slug: str, payload: CommunityUpdateRequest) -> CommunityProfile | None:
        with get_connection() as connection:
            connection.execute(
                """
                UPDATE communities
                SET
                    name = ?,
                    tagline = ?,
                    repo_owner = ?,
                    repo_name = ?,
                    docs_url = ?,
                    github_token_env = ?,
                    sync_mode = ?,
                    strategic_focus = ?,
                    positioning_claim = ?,
                    onboarding_promise = ?,
                    proof_goal = ?
                WHERE slug = ?
                """,
                (
                    payload.name.strip(),
                    payload.tagline.strip(),
                    payload.repo_owner.strip(),
                    payload.repo_name.strip(),
                    payload.docs_url.strip(),
                    payload.github_token_env.strip(),
                    payload.sync_mode,
                    json.dumps(payload.strategic_focus),
                    payload.positioning_claim.strip(),
                    payload.onboarding_promise.strip(),
                    payload.proof_goal.strip(),
                    slug,
                ),
            )
        return self.get_community(slug)

    def _deserialize_row(self, row: dict) -> CommunityProfile:
        row["strategic_focus"] = json.loads(row.get("strategic_focus", "[]"))
        return CommunityProfile(**row)
