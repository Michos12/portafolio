// Shared data contract: Frontend (Angular) <-> Backend (FastAPI).
// The API exposes/consumes JSON in camelCase to match Angular conventions
// (see backend/app/schemas.py -> CamelModel).
// Keep this file in sync with the backend Pydantic schemas.

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  order: number;
  createdAt?: string;
}

/** Payload to create/update a project from the admin panel. */
export interface ProjectInput {
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string | null;
  liveUrl?: string | null;
  imageUrl?: string | null;
  featured?: boolean;
  order?: number;
}

/** Contact form payload. `website` is an anti-spam honeypot: must stay empty. */
export interface MessageInput {
  name: string;
  email: string;
  body: string;
  website?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Token {
  accessToken: string;
  tokenType: string;
}

/** Repository returned by the cached proxy /api/github/activity. */
export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  updatedAt: string;
}
