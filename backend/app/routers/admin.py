"""Protected admin endpoints: login (issues JWT) + project CRUD.

All write routes depend on get_current_admin (valid JWT).
"""

from fastapi import APIRouter, Depends, HTTPException

from ..auth import authenticate_admin, create_access_token, get_current_admin
from ..db import get_supabase
from ..schemas import LoginRequest, Project, ProjectCreate, ProjectUpdate, Token

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.post("/login", response_model=Token)
def login(payload: LoginRequest):
    if not authenticate_admin(payload.username, payload.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return Token(access_token=create_access_token(payload.username))


@router.post("/projects", response_model=Project, status_code=201)
def create_project(payload: ProjectCreate, admin: str = Depends(get_current_admin)):
    sb = get_supabase()
    res = sb.table("projects").insert(payload.model_dump()).execute()
    return res.data[0]


@router.put("/projects/{project_id}", response_model=Project)
def update_project(
    project_id: int,
    payload: ProjectUpdate,
    admin: str = Depends(get_current_admin),
):
    data = payload.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")
    sb = get_supabase()
    res = sb.table("projects").update(data).eq("id", project_id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Project not found")
    return res.data[0]


@router.delete("/projects/{project_id}", status_code=204)
def delete_project(project_id: int, admin: str = Depends(get_current_admin)):
    sb = get_supabase()
    sb.table("projects").delete().eq("id", project_id).execute()
    return None
