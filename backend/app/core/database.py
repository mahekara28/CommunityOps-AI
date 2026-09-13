from __future__ import annotations

import json
import sqlite3
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[2]
DB_PATH = ROOT_DIR / "communityops.db"


SEED_COMMUNITIES = [
    (
        "nextforge",
        "NextForge OSS",
        "AI-native operating system for developer communities.",
        "Open Source",
        "GitHub Discussions",
        "Global",
        18420,
        2980,
        78,
        7.4,
        12.8,
        "vercel",
        "next.js",
        "https://nextjs.org/docs",
        "GITHUB_TOKEN",
        "live",
        json.dumps(["Contributor activation", "Support deflection", "AI discoverability"]),
    ),
    (
        "cloudcanvas",
        "CloudCanvas Builders",
        "Community intelligence for infra and platform teams.",
        "Developer Platform",
        "Discord",
        "North America + Europe",
        9630,
        1410,
        71,
        10.6,
        8.5,
        "microsoft",
        "vscode",
        "https://code.visualstudio.com/docs",
        "GITHUB_TOKEN",
        "live",
        json.dumps(["Platform adoption", "Champion enablement", "Content ROI"]),
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
    }
    for name, definition in column_definitions.items():
        if name not in existing_columns:
            connection.execute(f"ALTER TABLE communities ADD COLUMN {name} {definition}")


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
                strategic_focus TEXT NOT NULL DEFAULT '[]'
            )
            """
        )
        _ensure_columns(connection)
        count = connection.execute("SELECT COUNT(*) FROM communities").fetchone()[0]
        if count == 0:
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
                    strategic_focus
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                SEED_COMMUNITIES,
            )
        else:
            for row in SEED_COMMUNITIES:
                connection.execute(
                    """
                    UPDATE communities
                    SET
                        repo_owner = ?,
                        repo_name = ?,
                        docs_url = ?,
                        github_token_env = ?,
                        sync_mode = ?,
                        strategic_focus = ?
                    WHERE slug = ?
                    """,
                    (row[11], row[12], row[13], row[14], row[15], row[16], row[0]),
                )
