from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.models.community import CommunityUpdateRequest
from app.services.community_repository import CommunityRepository
from app.services.sync_service import SyncService

router = APIRouter(prefix="/api")

repository = CommunityRepository()
sync_service = SyncService()


@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/communities")
def list_communities():
    return repository.list_communities()


@router.get("/communities/{slug}")
def get_community(slug: str):
    return repository.get_community(slug)


@router.patch("/communities/{slug}")
def update_community(slug: str, payload: CommunityUpdateRequest):
    community = repository.update_community(slug, payload)
    if community is None:
        raise HTTPException(status_code=404, detail="Community not found")
    return community


@router.get("/dashboard/{slug}")
def get_dashboard(slug: str):
    return sync_service.build_dashboard(slug)


@router.post("/sync/{slug}")
def sync_community(slug: str):
    return sync_service.build_dashboard(slug)
