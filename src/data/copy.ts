// Copy for the free-sample flow and the homepage sections.
// Source: Writer's copy doc "Night Porter Site Copy 11-14", with the Orchestrator's 11/14/2026 decisions.

/** Primary ask on both landing pages and the homepage. */
export const SAMPLE_CTA = 'Ask for your free sample';
/** Next to the primary button. */
export const REPLY_LINE = 'or just reply to my email';
/** Secondary link to the existing booking form (#book). */
export const CALL_LINK = 'Book a 15-minute call';

export const SAMPLE_PAGE = {
  title: 'Night Porter | Ask for Your Free Sample',
  desc: "See what the free sample looks like, then name a req or RFQ and we'll put together yours.",
  h1: 'Ask for your free sample',
  intro: "See what the free sample looks like, then name a req or RFQ and we'll put together yours.",
  exA: {
    h2: 'Example, staffing firms',
    label: 'Example, fictional candidate',
    lines: [
      'This is a short outline of a sample submittal package, not a live req and not a real person.',
      'Fictional req: Senior Network Engineer, posted by a staffing firm for a fictional end client.',
      'Fictional candidate: Morgan Ellison (fictional)',
    ],
    containsLabel: 'The package contains:',
    contains: [
      ["Candidate summary.", "A one-page write-up mapped to the req's must-haves, with each fact tied to a source in the materials."],
      ["Skills-to-req match.", "A line-by-line table of the req's required skills, with a match, a partial match, or a gap marked for each one."],
      ['Availability and rate.', 'Clearly labeled placeholders only, for the recruiter to fill in.'],
      ["Recruiter notes box.", "Space for the recruiter's comments before anything is sent."],
    ],
    footer: 'Nothing in this example is a real candidate, a real client, or a real submittal.',
  },
  exB: {
    h2: 'Example, engineering and consulting firms',
    label: 'Closed RFQ, shown as an example',
    facts: [
      ['Issuer', 'City of Bellaire, Texas'],
      ['Number', 'RFQ No. 27-006'],
      ['Title', 'On-Call Engineering Services, Master Professional Services Agreement (MSA), Multiple Categories'],
    ] as [string, string][],
    url: 'https://www.bellairetx.gov/DocumentCenter/View/35941/RFQ-No-27-006-On-Call-Engineering-Services-Master-Professional-Services-Agreement-MSA-Multiple-Categories-PDF',
    urlText: 'The published RFQ (PDF)',
    note: "This is an outline skeleton only. It follows the City's published evaluation criteria. It makes no claim about any firm, and it does not treat this as a bid or a recommendation to submit.",
    sections: [
      ['Cover and basics', ['[placeholder: firm name and contact]', '[placeholder: which MSA categories the firm is responding to (Water and Wastewater; Transportation; Drainage and Flood Mitigation)]']],
      ['Firm information and project team (20 points)', ["[placeholder: the firm's own overview]", '[placeholder: named staff and roles the firm would assign]']],
      ['Firm qualifications and municipal experience (30 points)', ["[placeholder: the firm's own relevant project sheets]", '[placeholder: municipal work the firm chooses to cite]']],
      ['Technical approach and understanding (30 points)', ["[placeholder: the firm's approach to on-call work in the selected categories]"]],
      ['Capacity, availability and responsiveness (15 points)', ["[placeholder: the firm's own capacity and availability]"]],
      ['Reference letters (5 points)', ['[placeholder: references the firm supplies]']],
      ['Interview (short-listed firms only, 50 points)', ['[placeholder: left blank unless the City invites the firm]']],
    ] as [string, string[]][],
    footer: 'No project experience, staff names, or qualifications are filled in. Those lines stay marked for the firm.',
  },
  yesH2: 'What happens when you say yes',
  yes: ['Name a req or RFQ.', 'Delivery within 3 business days, as a PDF plus an editable doc.', 'A 15-minute walkthrough.', 'No obligation.'],
  formH2: 'How to say yes',
  formIntro: "Name a req or RFQ below and we'll put together the free sample.",
  nameLabel: 'Name',
  emailLabel: 'Work email',
  emailHint: "We'll send the sample here.",
  companyLabel: 'Company',
  linkLabel: 'Req or RFQ link',
  linkHint: 'No public link? Just reply to our email instead.',
  button: 'Ask for the sample',
  thanks:
    "Thanks. We'll put together your free sample and send it within 3 business days. There's no obligation. If you'd rather not use the form, replying to any of our emails still works.",
  /** Shown under the form; the address is linked. */
  altLine: 'Or reply to any of our emails, or write to',
};

export const HOME = {
  sampleH2: "Send us one open req or RFQ. We'll do the first one free.",
  sampleSub: "We'll put together a sample submittal package or a response outline, and you keep the final say.",
  finalSayH2: 'You keep the final say',
  finalSay: 'Your recruiter signs off before anything reaches the client. Whether to submit stays your call.',
  foundersNote:
    "I'm Petar. My co-founder Aleks and I are starting a small company that handles submission prep for staffing firms and drafts proposal responses for engineering and consulting firms. You deal with us directly. If you want to see the work first, we'll put together one free sample.",
  worksWithH2: 'Works with what you already use',
  worksWithSub: 'We work with the systems you already pay for.',
  /** Text-only tool names. Empty until Aleks confirms each one; the section is hidden while empty. */
  worksWith: [] as string[],
};
