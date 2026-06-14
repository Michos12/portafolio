"""Data contract (Phase 0): Pydantic v2 schemas.

The API exposes JSON in camelCase to match Angular, while in Python and the
database we use snake_case. `CamelModel` bridges the two:
- alias_generator=to_camel  -> serializes to camelCase (FastAPI uses by_alias=True).
- populate_by_name=True     -> allows building from snake_case Supabase rows.

Keep in sync with shared/models.ts.
"""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


# --------------------------- Project ---------------------------
class ProjectBase(CamelModel):
    title: str = Field(..., max_length=120)
    description: str = Field(..., max_length=2000)
    tech_stack: list[str] = Field(default_factory=list)
    repo_url: str | None = None
    live_url: str | None = None
    image_url: str | None = None
    featured: bool = False
    order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(CamelModel):
    """All fields optional: only the provided ones are updated (PATCH-like)."""

    title: str | None = Field(None, max_length=120)
    description: str | None = Field(None, max_length=2000)
    tech_stack: list[str] | None = None
    repo_url: str | None = None
    live_url: str | None = None
    image_url: str | None = None
    featured: bool | None = None
    order: int | None = None


class Project(ProjectBase):
    id: int
    created_at: datetime | None = None


# --------------------------- Message / Contact ---------------------------
class MessageCreate(CamelModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    body: str = Field(..., min_length=1, max_length=5000)
    # Anti-spam honeypot: invisible to humans; bots tend to fill it.
    # Must arrive empty; if it has a value the message is discarded (see router).
    website: str | None = ""


class Message(CamelModel):
    id: int
    name: str
    email: EmailStr
    body: str
    created_at: datetime


# --------------------------- Auth ---------------------------
class LoginRequest(CamelModel):
    username: str
    password: str


class Token(CamelModel):
    access_token: str
    token_type: str = "bearer"
