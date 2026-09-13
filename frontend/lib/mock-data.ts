import { CommunityProfile, DashboardData } from "@/lib/types";

export const mockCommunities: CommunityProfile[] = [
  {
    slug: "nextforge",
    name: "NextForge OSS",
    tagline: "AI-native operating system for developer communities.",
    category: "Open Source",
    primary_channel: "GitHub Discussions",
    region_focus: "Global",
    members: 18420,
    weekly_active_members: 2980,
    health_score: 78,
    response_time_hours: 7.4,
    growth_rate: 12.8,
    repo_owner: "vercel",
    repo_name: "next.js",
    docs_url: "https://nextjs.org/docs",
    github_token_env: "GITHUB_TOKEN",
    sync_mode: "demo" as const,
    strategic_focus: ["Contributor activation", "Support deflection", "AI discoverability"]
  },
  {
    slug: "cloudcanvas",
    name: "CloudCanvas Builders",
    tagline: "Community intelligence for infra and platform teams.",
    category: "Developer Platform",
    primary_channel: "Discord",
    region_focus: "North America + Europe",
    members: 9630,
    weekly_active_members: 1410,
    health_score: 71,
    response_time_hours: 10.6,
    growth_rate: 8.5,
    repo_owner: "microsoft",
    repo_name: "vscode",
    docs_url: "https://code.visualstudio.com/docs",
    github_token_env: "GITHUB_TOKEN",
    sync_mode: "demo" as const,
    strategic_focus: ["Platform adoption", "Champion enablement", "Content ROI"]
  }
];

const baseSnapshots = [
    {
      week: "2026-W32",
      active_contributors: 155,
      new_members: 74,
      posts_published: 8,
      discussions_started: 26,
      questions_answered: 59,
      questions_unanswered: 15,
      pull_requests_merged: 31,
      docs_clicks: 1320,
      event_signups: 88
    },
    {
      week: "2026-W33",
      active_contributors: 163,
      new_members: 79,
      posts_published: 9,
      discussions_started: 29,
      questions_answered: 63,
      questions_unanswered: 14,
      pull_requests_merged: 33,
      docs_clicks: 1430,
      event_signups: 95
    },
    {
      week: "2026-W34",
      active_contributors: 171,
      new_members: 84,
      posts_published: 10,
      discussions_started: 32,
      questions_answered: 67,
      questions_unanswered: 13,
      pull_requests_merged: 35,
      docs_clicks: 1540,
      event_signups: 102
    },
    {
      week: "2026-W35",
      active_contributors: 179,
      new_members: 89,
      posts_published: 8,
      discussions_started: 35,
      questions_answered: 71,
      questions_unanswered: 12,
      pull_requests_merged: 37,
      docs_clicks: 1650,
      event_signups: 109
    },
    {
      week: "2026-W36",
      active_contributors: 187,
      new_members: 94,
      posts_published: 9,
      discussions_started: 38,
      questions_answered: 75,
      questions_unanswered: 11,
      pull_requests_merged: 39,
      docs_clicks: 1760,
      event_signups: 116
    },
    {
      week: "2026-W37",
      active_contributors: 195,
      new_members: 99,
      posts_published: 10,
      discussions_started: 41,
      questions_answered: 79,
      questions_unanswered: 10,
      pull_requests_merged: 41,
      docs_clicks: 1870,
      event_signups: 123
    }
];

function buildSnapshots(offset = 0) {
  return baseSnapshots.map((item) => ({
    ...item,
    active_contributors: item.active_contributors - offset * 18,
    new_members: item.new_members - offset * 9,
    discussions_started: item.discussions_started - offset * 4,
    questions_answered: item.questions_answered - offset * 7,
    questions_unanswered: item.questions_unanswered + offset * 2,
    pull_requests_merged: item.pull_requests_merged - offset * 6,
    docs_clicks: item.docs_clicks - offset * 290,
    event_signups: item.event_signups - offset * 19
  }));
}

function buildSignals(offset = 0) {
  return [
    {
      id: "signal-momentum",
      type: "momentum",
      title: "Contributor momentum is accelerating",
      description: offset === 0 ? "Active contributors grew by 8 week over week." : "Contributor growth is steady but less explosive than the portfolio leader.",
      topic: "Contributor Experience",
      score: 80 - offset * 9,
      priority: offset === 0 ? "high" : "medium",
      evidence: offset === 0 ? "195 active contributors in the latest weekly window." : "Contributor activity is healthy but concentrated in fewer maintainers."
    },
    {
      id: "signal-support",
      type: "support",
      title: "Support backlog needs attention",
      description: offset === 0 ? "Unanswered questions grew in the previous cycle and still need tighter routing." : "Support asks are clustering around setup friction and extension workflows.",
      topic: "Support",
      score: 76 + offset * 4,
      priority: "critical",
      evidence: offset === 0 ? "10 recent issues or discussions still look like support asks." : "A larger share of questions remain maintainer-dependent."
    },
    {
      id: "signal-content",
      type: "content",
      title: "Docs demand is translating into discovery",
      description: offset === 0 ? "Docs clicks are rising and discussion topics are getting more implementation-specific." : "Documentation demand is high and users want workflow-specific examples.",
      topic: "Education",
      score: 88 - offset * 5,
      priority: "medium",
      evidence: offset === 0 ? "Educational demand proxy rose from 1760 to 1870." : "Help-seeking behavior suggests docs are being used as part of evaluation."
    },
    {
      id: "signal-roi",
      type: "roi",
      title: "Community activity is compounding into product proof",
      description: offset === 0 ? "Merged pull requests and contributor participation are rising together." : "Community activity is creating proof, but it is not yet evenly distributed.",
      topic: "ROI",
      score: 84 - offset * 8,
      priority: offset === 0 ? "high" : "medium",
      evidence: offset === 0 ? "41 merged pull requests in the latest window." : "There is visible impact, but fewer signals are converting into shipped velocity."
    },
    {
      id: "signal-advocacy",
      type: "advocacy",
      title: "Power users are sharing implementation trade-offs",
      description: offset === 0 ? "The community is maturing beyond Q&A into peer-led experience exchange." : "Practitioner credibility is present and can be amplified into stronger ecosystem trust.",
      topic: "Advocacy",
      score: 81 - offset * 4,
      priority: "high",
      evidence: "Recent activity includes explanation-heavy issues, PRs, and maintainer conversations."
    }
  ] as DashboardData["live_signals"];
}

function buildRecommendations(offset = 0) {
  return [
    {
      id: "rec-support-sprint",
      title: "Launch a 5-day support backlog sprint",
      owner: "Community Ops",
      priority: "critical",
      impact: "Reduce unanswered questions and improve perceived responsiveness.",
      due_window: "This week",
      rationale: "Backlog growth is the sharpest short-term operational risk.",
      metric_target: offset === 0 ? "Bring unanswered rate below 12%." : "Reduce maintainer-owned setup questions by 20%."
    },
    {
      id: "rec-champion-program",
      title: "Formalize a rotating champion amplification loop",
      owner: "DevRel",
      priority: "high",
      impact: "Convert power users into repeat advocacy and peer support.",
      due_window: "Next 10 days",
      rationale: "The people are already there; the system around them is not.",
      metric_target: offset === 0 ? "Increase champion-led responses by 25%." : "Create 3 new peer-led reference examples."
    },
    {
      id: "rec-launch-series",
      title: "Ship a three-part launch education series",
      owner: "Content",
      priority: "high",
      impact: "Capture discovery demand while momentum is elevated.",
      due_window: "Next 2 weeks",
      rationale: "Growth and docs consumption are rising together.",
      metric_target: offset === 0 ? "Ship 3 proof-oriented assets tied to top recurring topics." : "Ship 2 workflow-specific activation assets."
    },
    {
      id: "rec-proof-loop",
      title: "Create a monthly community-to-pipeline proof loop",
      owner: "Developer Marketing",
      priority: "high",
      impact: "Translate community momentum into executive-visible ROI.",
      due_window: "This month",
      rationale: "Leadership pressure is usually highest when teams cannot connect engagement to outcomes.",
      metric_target: "Publish one monthly ROI readout with launch, support, and content outcomes."
    }
  ] as DashboardData["recommendations"];
}

function buildChampions(offset = 0) {
  return [
    {
      username: offset === 0 ? "anika-dev" : "nina-platform",
      role: offset === 0 ? "Developer Advocate" : "Community Guide",
      score: 94 - offset * 5,
      specialties: offset === 0 ? ["Onboarding", "AI SDKs"] : ["Platform engineering", "Workflow adoption"],
      recent_win: offset === 0 ? "Converted a support thread into a reusable starter walkthrough." : "Hosted a teardown that turned repeated setup questions into a reusable guide."
    },
    {
      username: offset === 0 ? "marcelo" : "dexops",
      role: "Maintainer",
      score: 88 - offset * 2,
      specialties: offset === 0 ? ["Reliability", "Production patterns"] : ["Observability", "CI reliability"],
      recent_win: offset === 0 ? "Reduced webhook setup friction and documented the rollout path." : "Merged a tracing example and cleared a cluster of onboarding blockers."
    },
    {
      username: offset === 0 ? "sarahw" : "kay-observe",
      role: "Community Champion",
      score: 83 - offset,
      specialties: offset === 0 ? ["Testing", "DX feedback"] : ["Examples", "Support"],
      recent_win: offset === 0 ? "Started a high-signal discussion on agent reliability scoring." : "Turned repeated issue comments into a practical workflow checklist."
    }
  ] as DashboardData["champions"];
}

function buildWorkflowInsights(offset = 0) {
  return [
    {
      id: "wf-priorities",
      title: "Executive proof loop",
      summary: "Turn activity, activation, and support signals into one operator-readable weekly brief.",
      owner: "DevRel lead",
      status: "scale"
    },
    {
      id: "wf-routing",
      title: "Support routing lane",
      summary: offset === 0
        ? "Separate maintainer-grade product blockers from repeat onboarding asks and docs gaps."
        : "Distinguish environment-specific blockers from reusable guidance opportunities.",
      owner: "Community ops",
      status: "act"
    },
    {
      id: "wf-focus",
      title: "Strategic focus stack",
      summary: mockCommunities[offset]?.strategic_focus.join(", ") ?? "",
      owner: "Program manager",
      status: "scale"
    }
  ] as DashboardData["workflow_insights"];
}

function buildContentOpportunities(offset = 0) {
  return [
    {
      id: "content-1",
      title: offset === 0
        ? "Onboarding Systems: from recurring questions to reusable proof"
        : "Workflow Templates: from repeated setup friction to fast activation",
      format: "Interactive guide",
      audience: "New builders",
      priority: "high",
      insight: offset === 0
        ? "Two recent high-signal threads point to repeated onboarding confusion."
        : "Users want opinionated examples, not just API references.",
      call_to_action: "Publish a canonical guide and route future replies back to it."
    },
    {
      id: "content-2",
      title: offset === 0
        ? "Agent Reliability: from recurring questions to reusable proof"
        : "Extension Workflows: from scattered issue replies to durable enablement",
      format: "Benchmark teardown",
      audience: "Existing adopters",
      priority: "high",
      insight: "Reliability conversations are moving from setup to evaluation and proof.",
      call_to_action: "Turn field questions into a metrics and testing resource."
    },
    {
      id: "content-advocacy",
      title: "Turn champion stories into a social proof campaign",
      format: "Video + quote cards",
      audience: "Warm prospects and existing members",
      priority: "medium",
      insight: "Member-led trade-off discussions are strong raw material for credible advocacy.",
      call_to_action: "Package authentic builder stories into short-form launch assets."
    }
  ] as DashboardData["content_opportunities"];
}

function buildActivityFeed(offset = 0) {
  return [
    {
      id: offset === 0 ? "NF-1" : "CC-1",
      source: "GitHub Discussion",
      kind: "discussion",
      title: offset === 0
        ? "Best practices for onboarding contributors to the AI SDK starter"
        : "What is the best way to distribute extension templates across teams?",
      author: offset === 0 ? "anika-dev" : "nina-platform",
      engagement: 42 - offset * 6,
      url: "#",
      created_at: "2026-09-10T09:30:00Z",
      labels: offset === 0 ? ["onboarding", "starter"] : ["template", "workflow"]
    },
    {
      id: offset === 0 ? "NF-2" : "CC-2",
      source: "Pull Request",
      kind: "pull_request",
      title: offset === 0
        ? "Refactor auth webhooks and reduce setup time for self-hosted users"
        : "Improve extension install diagnostics and recovery hints",
      author: offset === 0 ? "marcelo" : "dexops",
      engagement: 27 - offset * 3,
      url: "#",
      created_at: "2026-09-09T14:12:00Z",
      labels: ["auth", "developer-experience"]
    },
    {
      id: offset === 0 ? "NF-3" : "CC-3",
      source: "Issue",
      kind: "issue",
      title: offset === 0
        ? "Users are asking for production deployment examples with retries"
        : "Teams need better examples for onboarding enterprise extensions",
      author: offset === 0 ? "pallav" : "kay-observe",
      engagement: 19 + offset * 2,
      url: "#",
      created_at: "2026-09-08T18:22:00Z",
      labels: ["deployment", "example"]
    },
    {
      id: offset === 0 ? "NF-4" : "CC-4",
      source: "GitHub Discussion",
      kind: "discussion",
      title: offset === 0
        ? "How teams are measuring agent reliability in staging"
        : "How are teams proving platform adoption beyond installs?",
      author: offset === 0 ? "sarahw" : "dexops",
      engagement: 31 - offset,
      url: "#",
      created_at: "2026-09-07T07:45:00Z",
      labels: ["reliability", "testing"]
    }
  ] as DashboardData["activity_feed"];
}

export function buildMockDashboardData(slug = "nextforge"): DashboardData {
  const community =
    mockCommunities.find((item) => item.slug === slug) ?? mockCommunities[0];
  const offset = community.slug === "nextforge" ? 0 : 1;

  return {
    community,
    health: {
      overall_score: 81 - offset * 6,
      momentum_score: 89 - offset * 11,
      support_score: 66 - offset * 2,
      advocacy_score: 84 - offset * 5,
      activation_score: 82 - offset * 8,
      roi_score: 79 - offset * 7,
      response_time_hours: 9.3 + offset * 2.2,
      unanswered_rate: 18.8 + offset * 3.7,
      risk_level: offset === 0 ? "high" : "critical",
      summary:
        offset === 0
          ? "Growth is healthy and advocacy is real, but support pressure is starting to outrun the current response loop."
          : "The program is strategically promising, but activation and support still depend too heavily on core maintainers."
    },
    sync_status: {
      mode: "demo",
      source: "Seeded workspace data",
      label: "Demo intelligence",
      synced_at: "2026-09-13T09:30:00Z",
      repo: `${community.repo_owner}/${community.repo_name}`
    },
    benchmark_metrics: [
      {
        label: "Activation pulse",
        value: offset === 0 ? "99" : "72",
        delta: offset === 0 ? "+5 week over week" : "+2 week over week",
        direction: "up",
        context: "New contributors entering the ecosystem."
      },
      {
        label: "Contributor pulse",
        value: offset === 0 ? "195" : "141",
        delta: offset === 0 ? "+8 vs last week" : "+3 vs last week",
        direction: "up",
        context: "Builders contributing across support and shipping work."
      },
      {
        label: "Support load",
        value: offset === 0 ? "10" : "17",
        delta: offset === 0 ? "79 resolved this week" : "61 resolved this week",
        direction: offset === 0 ? "flat" : "down",
        context: "Questions that still need routing or better content."
      },
      {
        label: "Content demand",
        value: offset === 0 ? "1870" : "1580",
        delta: offset === 0 ? "+110 intent signals" : "+60 intent signals",
        direction: "up",
        context: "Learning demand that can be turned into compounding assets."
      },
      {
        label: "Advocacy lift",
        value: `${community.growth_rate}%`,
        delta: "Growth across the rolling month",
        direction: "up",
        context: "How much community energy is expanding the top of funnel."
      }
    ],
    weekly_snapshots: buildSnapshots(offset),
    live_signals: buildSignals(offset),
    champions: buildChampions(offset),
    topic_clusters: offset === 0
      ? [
          { topic: "Onboarding Systems", volume: 2, intent: "activation", trend: "surging" },
          { topic: "Agent Reliability", volume: 2, intent: "retention", trend: "surging" },
          { topic: "Production Readiness", volume: 1, intent: "retention", trend: "steady" }
        ]
      : [
          { topic: "Workflow Templates", volume: 3, intent: "activation", trend: "surging" },
          { topic: "Extension Operations", volume: 2, intent: "retention", trend: "steady" },
          { topic: "Documentation Experience", volume: 2, intent: "education", trend: "steady" }
        ],
    content_opportunities: buildContentOpportunities(offset),
    recommendations: buildRecommendations(offset),
    workflow_insights: buildWorkflowInsights(offset),
    activity_feed: buildActivityFeed(offset),
    community_brief:
      offset === 0
        ? "NextForge OSS is sitting at a health score of 81/100. The strongest current signal is contributor momentum, while the biggest operational risk is support spillover."
        : "CloudCanvas Builders is showing promising platform adoption, but it still needs better workflow packaging and faster support deflection.",
    content_brief:
      offset === 0
        ? "Lead with an interactive onboarding guide, then follow with proof-heavy reliability content that turns community questions into durable assets."
        : "Lead with workflow templates and platform examples that shorten evaluation time for new teams."
  };
}

export const mockDashboardData = buildMockDashboardData();
