// Data contract mirrored from /shared/models.ts (kept in sync with the backend).
// The API speaks camelCase, so these interfaces map 1:1 to the JSON responses.

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

export interface MessageInput {
  name: string;
  email: string;
  body: string;
  website?: string; // honeypot — must stay empty
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Token {
  accessToken: string;
  tokenType: string;
}
