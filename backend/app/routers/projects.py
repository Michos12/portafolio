"""Public project endpoints (read from Supabase)."""

from fastapi import APIRouter, HTTPException

from ..db import get_supabase
from ..schemas import Project

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=list[Project])
def list_projects():
    sb = get_supabase()
    res = sb.table("projects").select("*").order("order").execute()
    return res.data


@router.get("/{project_id}", response_model=Project)
def get_project(project_id: int):
    sb = get_supabase()
    res = sb.table("projects").select("*").eq("id", project_id).limit(1).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Project not found")
    return res.data[0]
