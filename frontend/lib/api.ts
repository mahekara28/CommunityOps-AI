import { CommunityProfile, CommunityUpdateRequest, DashboardData } from "@/lib/types";

const DEFAULT_BASE_URL = "http://127.0.0.1:8000";

async function parseError(response: Response) {
  try {
    const payload = (await response.json()) as { detail?: string };
    return payload.detail ?? `Request failed with ${response.status}`;
  } catch {
    return `Request failed with ${response.status}`;
  }
}

export async function getDashboardData(
  slug: string,
): Promise<{ data: DashboardData; mode: "live" }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL;

  const response = await fetch(`${baseUrl}/api/dashboard/${slug}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = (await response.json()) as DashboardData;
  return { data, mode: "live" };
}

export async function getCommunities(): Promise<CommunityProfile[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL;

  const response = await fetch(`${baseUrl}/api/communities`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as CommunityProfile[];
}

export async function createCommunity(): Promise<CommunityProfile> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL;

  const response = await fetch(`${baseUrl}/api/communities`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as CommunityProfile;
}

export async function updateCommunityConfig(
  slug: string,
  payload: CommunityUpdateRequest,
): Promise<CommunityProfile> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL;
  const response = await fetch(`${baseUrl}/api/communities/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as CommunityProfile;
}

export async function syncCommunity(slug: string): Promise<DashboardData> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL;
  const response = await fetch(`${baseUrl}/api/sync/${slug}`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as DashboardData;
}
