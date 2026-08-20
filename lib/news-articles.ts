export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }

export type NewsArticle = {
  slug: string
  date: string
  title: string
  excerpt: string
  content: ArticleBlock[]
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "the-unassigned-problem",
    date: "August 15, 2026",
    title: "The Unassigned Problem",
    excerpt:
      "Some of the most consequential matters in a family office begin as questions that appear too unusual, too narrow, or too temporary to require a dedicated owner.",
    content: [
      {
        type: "paragraph",
        text: "A portfolio company is seeking access to a new market, but the formal approval process has stalled without explanation.",
      },
      {
        type: "paragraph",
        text: "A principal is presented with an opportunity by a well-connected intermediary, but no one can determine whether the intermediary has actual influence or merely proximity.",
      },
      {
        type: "paragraph",
        text: "A family initiative touches government, philanthropy, reputation, and commercial interests at the same time.",
      },
      {
        type: "paragraph",
        text: "A dispute develops in a jurisdiction where the family's legal rights are clear, but the practical path to enforcing them is not.",
      },
      {
        type: "paragraph",
        text: "These matters are often assigned to the adviser whose mandate appears closest to the subject. Counsel examines the law. Bankers examine the economics. Government affairs advisers identify officials. Communications advisers assess reputational exposure. Security professionals evaluate physical and informational risk.",
      },
      { type: "paragraph", text: "Each may provide a sound answer." },
      { type: "paragraph", text: "The principal's question may still remain unanswered." },

      { type: "heading", text: "How the problem is misclassified" },
      {
        type: "paragraph",
        text: "The difficulty is rarely a lack of expertise. It is that the matter does not respect the boundaries between professional disciplines.",
      },
      {
        type: "paragraph",
        text: "A market access issue may depend on government priorities, commercial relationships, local legitimacy, and the credibility of the proposed partner.",
      },
      {
        type: "paragraph",
        text: "A reputational issue may carry legal, political, financial, and personal consequences that develop at different speeds.",
      },
      {
        type: "paragraph",
        text: "An investment opportunity may be financially compelling but institutionally unrealistic.",
      },
      {
        type: "paragraph",
        text: "A family matter may appear private until it begins affecting a board, lender, counterparty, regulator, or public institution.",
      },
      {
        type: "paragraph",
        text: "When the issue is divided among several advisers, each adviser may evaluate a different version of the facts. Important assumptions remain untested because no one has responsibility for the whole question.",
      },
      { type: "paragraph", text: "That is the unassigned problem." },

      { type: "heading", text: "Four characteristics" },
      { type: "paragraph", text: "An unassigned problem usually has four characteristics." },
      {
        type: "list",
        items: [
          "No natural owner. The issue matters, but it does not sit clearly within an existing executive role or advisory mandate.",
          "Fragmented information. The relevant facts are distributed across the family office, operating businesses, outside advisers, local relationships, and the principal.",
          "Informal power matters. The outcome depends partly on people who may not appear on an organizational chart, transaction document, or formal decision path.",
          "Time changes the options. Delay does not merely postpone the decision. It may strengthen another party, reduce confidentiality, harden institutional positions, or close a path that was previously available.",
        ],
      },
      {
        type: "paragraph",
        text: "The presence of these characteristics should change how the matter is handled.",
      },

      { type: "heading", text: "A practical test" },
      {
        type: "paragraph",
        text: "Before placing an unusual matter into an existing mandate, the family office should ask:",
      },
      {
        type: "list",
        items: [
          "What decision does the principal actually need to make?",
          "Does any current adviser have access to all material facts, or does each hold only part of the picture?",
          "Does the outcome depend on institutional relationships, informal authority, local credibility, or sequencing?",
          "Are the people with formal authority the same people who can cause the matter to advance or stop?",
          "What options disappear if the family waits thirty, sixty, or ninety days?",
          "Which assumptions are being repeated because no one has been asked to test them?",
          "Who is accountable for producing one integrated recommendation?",
        ],
      },
      {
        type: "paragraph",
        text: "These questions frequently reveal that the matter has been assigned by subject matter rather than by the decision the principal must make.",
      },

      { type: "heading", text: "The appropriate response" },
      {
        type: "paragraph",
        text: "The answer is not necessarily another permanent hire or a larger advisory group.",
      },
      {
        type: "paragraph",
        text: "In many cases, the better structure is temporary and specific. One person owns the full question. The relevant advisers remain within their disciplines. Facts are consolidated. Formal and informal decision makers are mapped. Assumptions are tested independently. The principal receives a single assessment that identifies the available options, the interests affecting each option, and the consequences of acting or declining to act.",
      },
      { type: "paragraph", text: "The structure should last only as long as the matter requires." },
      {
        type: "paragraph",
        text: "Family offices are designed to manage persistent needs. They should not be expected to maintain permanent internal capabilities for every jurisdiction, institution, relationship, or special situation they may encounter.",
      },
      {
        type: "paragraph",
        text: "The more useful question is not which existing adviser is closest to the subject.",
      },
      { type: "paragraph", text: "It is who can own the whole question long enough to produce a decision." },
    ],
  },
  {
    slug: "on-the-nature-of-patient-capital",
    date: "December 30, 2025",
    title: "On the Nature of Patient Capital",
    excerpt:
      "In an environment shaped by short-term pressures, the discipline of long-horizon thinking remains essential.",
    content: [
      {
        type: "paragraph",
        text: "The current landscape rewards speed and scale. Yet for families and institutions with multi-generational mandates, the calculus differs fundamentally. Patient capital is not passive capital; it is capital deployed with the clarity that comes from understanding time differently.",
      },
      {
        type: "paragraph",
        text: "We continue to advise principals who measure outcomes across decades, not quarters. This orientation shapes everything: the relationships we enter, the counsel we provide, and the structures we recommend.",
      },
    ],
  },
  {
    slug: "governance-in-transition",
    date: "December 30, 2025",
    title: "Governance in Transition",
    excerpt:
      "Leadership succession remains one of the most consequential challenges facing enterprises and families alike.",
    content: [
      {
        type: "paragraph",
        text: "The transfer of leadership; whether in a family enterprise, a sovereign context, or a closely-held fund, carries implications that extend far beyond the immediate transition. Done well, it preserves institutional knowledge while creating space for necessary evolution.",
      },
      {
        type: "paragraph",
        text: "Our work in this area emphasizes preparation over reaction. The most successful transitions we have counseled share a common thread: they began years before any formal announcement.",
      },
    ],
  },
  {
    slug: "discretion-as-discipline",
    date: "December 30, 2025",
    title: "Discretion as Discipline",
    excerpt: "In an age of transparency, the value of measured communication has only increased.",
    content: [
      {
        type: "paragraph",
        text: "Discretion is often misunderstood as secrecy. In practice, it is the discipline of speaking precisely, sharing deliberately, and understanding that not all matters benefit from broad visibility.",
      },
      {
        type: "paragraph",
        text: "For the families and institutions we serve, this discipline is foundational. Reputation is built through consistent action over time, and preserved through the wisdom to know when silence serves better than statement.",
      },
    ],
  },
]

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug)
}
