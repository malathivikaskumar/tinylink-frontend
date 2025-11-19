// lib/api.ts
import { LinkItem, ApiError } from "../types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL!;

export async function createLink(data: {
  target: string;
  code?: string;
}): Promise<LinkItem | ApiError> {
  const res = await fetch(`${API_URL}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getLinks(): Promise<LinkItem[]> {
  const res = await fetch(`${API_URL}/api/links`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getLinkStats(code: string): Promise<LinkItem | ApiError> {
  const res = await fetch(`${API_URL}/api/links/${code}`);
  return res.json();
}

export async function deleteLink(code: string): Promise<{ ok: boolean } | ApiError> {
  const res = await fetch(`${API_URL}/api/links/${code}`, {
    method: "DELETE",
  });
  return res.json();
}
