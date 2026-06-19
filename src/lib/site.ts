/*
  Central site configuration and verified facts.
  Edit identity, links, and credentials here. Everything else reads from this file.
  Items marked TODO are placeholders for you to replace.
*/

export const site = {
  name: "Rizwan Qureshy",
  title: "AI Strategist, Equinix",
  tagline:
    "AI strategist bridging technology and business strategy for responsible, high-impact AI adoption.",
  description:
    "Rizwan Qureshy is an AI strategist working at the intersection of enterprise AI adoption, sales enablement, and AI governance. Author of Think Before You AI.",
  // TODO: replace with your real custom domain.
  url: "https://example.com",
  // TODO: replace with your real contact email.
  email: "hello@example.com",
  locale: "en_US",
};

export const social = {
  // TODO: replace with your real LinkedIn URL.
  linkedin: "https://www.linkedin.com/in/rizwan-qureshy",
  // TODO: replace with the book's real Amazon URL.
  amazon: "https://www.amazon.com/dp/REPLACE-ME",
};

export const book = {
  title: "Think Before You AI",
  subtitle:
    "A Strategic Guide to Generative AI for Sales Enablement and Revenue Growth",
  // TODO: replace with the book's real Amazon URL.
  buyUrl: social.amazon,
  // Verified: reached Top 20 in its category on Amazon.
  highlight: "Reached Top 20 in its Amazon category",
};

/* The five content pillars that define the point of view. */
export const pillars = [
  {
    title: "Responsible and ethical AI",
    summary:
      "Governance, transparency, accountability, and bias. Building AI that earns trust at enterprise scale.",
  },
  {
    title: "AI for sales growth and enablement",
    summary:
      "Turning generative AI into measurable revenue impact for go-to-market teams.",
  },
  {
    title: "Build vs buy",
    summary:
      "The hybrid AI approach: when to build, when to buy, and how to combine both for enterprises.",
  },
  {
    title: "Avoiding costly AI pitfalls",
    summary:
      "The expensive mistakes enterprises make with AI, and how to sidestep them before they scale.",
  },
  {
    title: "Scaling AI adoption with confidence",
    summary:
      "Rolling out AI across large teams with the change management and guardrails that make it stick.",
  },
];

/* Verified, public credential proof points for the hero and About page. */
export const credentials = [
  {
    label: "Equinix",
    detail:
      "AI strategist and leader at the world's largest data center company. Product Owner of ACE, Equinix's first generative AI based digital sales assistant.",
  },
  {
    label: "Author",
    detail:
      "Wrote Think Before You AI, a strategic guide to generative AI for sales enablement and revenue growth.",
  },
  {
    label: "Harvard, MIT, McCombs",
    detail:
      "Certifications in AI, Design and Technology, Digital Transformation, and the Ethics of AI.",
  },
  {
    label: "AI governance certified",
    detail:
      "IAPP Certified AI Governance Professional (AIGP) and IEEE CertifAIEd AI Ethicist.",
  },
];

/* Speaking topics drawn from the pillars. */
export const speakingTopics = pillars.map((p) => p.title);

/* Feature flags. */
export const flags = {
  speaking: true,
  selectedWork: false, // NDA: keep off until genericized case studies exist.
};
