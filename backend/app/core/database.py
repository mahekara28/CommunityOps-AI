from __future__ import annotations

import json
import sqlite3
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[2]
DB_PATH = ROOT_DIR / "narrative_gap.db"


SEED_COMMUNITIES = [
    (
        "primary-source",
        "Primary Product",
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
]


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def _ensure_columns(connection: sqlite3.Connection) -> None:
    existing_columns = {
        row["name"] for row in connection.execute("PRAGMA table_info(communities)").fetchall()
    }
    column_definitions = {
        "repo_owner": "TEXT NOT NULL DEFAULT ''",
        "repo_name": "TEXT NOT NULL DEFAULT ''",
        "docs_url": "TEXT NOT NULL DEFAULT ''",
        "github_token_env": "TEXT NOT NULL DEFAULT 'GITHUB_TOKEN'",
        "sync_mode": "TEXT NOT NULL DEFAULT 'live'",
        "strategic_focus": "TEXT NOT NULL DEFAULT '[]'",
        "positioning_claim": "TEXT NOT NULL DEFAULT ''",
        "onboarding_promise": "TEXT NOT NULL DEFAULT ''",
        "proof_goal": "TEXT NOT NULL DEFAULT ''",
    }
    for name, definition in column_definitions.items():
        if name not in existing_columns:
            connection.execute(f"ALTER TABLE communities ADD COLUMN {name} {definition}")


def _should_reset_legacy_seed(connection: sqlite3.Connection) -> bool:
    rows = connection.execute(
        "SELECT slug, repo_owner, repo_name FROM communities ORDER BY slug"
    ).fetchall()
    signatures = {(row["slug"], row["repo_owner"], row["repo_name"]) for row in rows}
    return signatures == {
        ("cloudcanvas", "microsoft", "vscode"),
        ("nextforge", "vercel", "next.js"),
    }


def initialize_database() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with get_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS communities (
                slug TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                tagline TEXT NOT NULL,
                category TEXT NOT NULL,
                primary_channel TEXT NOT NULL,
                region_focus TEXT NOT NULL,
                members INTEGER NOT NULL,
                weekly_active_members INTEGER NOT NULL,
                health_score INTEGER NOT NULL,
                response_time_hours REAL NOT NULL,
                growth_rate REAL NOT NULL,
                repo_owner TEXT NOT NULL DEFAULT '',
                repo_name TEXT NOT NULL DEFAULT '',
                docs_url TEXT NOT NULL DEFAULT '',
                github_token_env TEXT NOT NULL DEFAULT 'GITHUB_TOKEN',
                sync_mode TEXT NOT NULL DEFAULT 'live',
                strategic_focus TEXT NOT NULL DEFAULT '[]',
                positioning_claim TEXT NOT NULL DEFAULT '',
                onboarding_promise TEXT NOT NULL DEFAULT '',
                proof_goal TEXT NOT NULL DEFAULT ''
            )
            """
        )
        _ensure_columns(connection)
        count = connection.execute("SELECT COUNT(*) FROM communities").fetchone()[0]
        if count == 0 or _should_reset_legacy_seed(connection):
            connection.execute("DELETE FROM communities")
            connection.executemany(
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
                SEED_COMMUNITIES,
            )
