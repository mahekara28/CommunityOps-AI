import { getCommunities, getDashboardData } from "@/lib/api";
import { DashboardData } from "@/lib/types";

function toMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong while loading GitHub intelligence.";
}

export interface PortfolioDataResult {
  communities: Awaited<ReturnType<typeof getCommunities>>;
  dashboards: DashboardData[];
  errors: Array<{ slug: string; name: string; message: string }>;
}

export async function getPortfolioData(): Promise<PortfolioDataResult> {
  const communities = await getCommunities();
  const results = await Promise.allSettled(
    communities.map(async (community) => {
      const { data } = await getDashboardData(community.slug);
      return data;
    }),
  );

  const dashboards: DashboardData[] = [];
  const errors: PortfolioDataResult["errors"] = [];

  results.forEach((result, index) => {
    const community = communities[index];
    if (result.status === "fulfilled") {
      dashboards.push(result.value);
      return;
    }
    errors.push({
      slug: community.slug,
      name: community.name,
      message: toMessage(result.reason),
    });
  });

  return { communities, dashboards, errors };
}

export async function getCommunityPageData(slug: string) {
  const communities = await getCommunities();
  const community = communities.find((item) => item.slug === slug) ?? null;

  try {
    const dashboardResponse = await getDashboardData(slug);
    return {
      communities,
      community,
      dashboard: dashboardResponse.data,
      mode: dashboardResponse.mode,
      error: null,
    };
  } catch (error) {
    return {
      communities,
      community,
      dashboard: null,
      mode: null,
      error: toMessage(error),
    };
  }
}
