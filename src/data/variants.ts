// All landing copy. Final, word for word from brief-v2.md. Do not edit without a brief change.
// Bracketed text is a placeholder and must stay bracketed until the real value is supplied.

export type VariantKey = 'staffing' | 'proposals';

interface CardRow {
  label: string;
  value: string;
  chip?: string;
  flag?: string;
  /** Starred rows stay visible on mobile; the rest are hidden below 620px. */
  star?: boolean;
}

export interface Variant {
  title: string;
  desc: string;
  eyebrow: string;
  h1: string;
  subline: string;
  workH2: string;
  tiles: [verb: string, text: string][];
  tile5: string;
  dontDo: string;
  formQ: string;
  formOpts: string[];
  faq: { q: string; a: string }[];
  steps: { name: string; dur: string; line: string; chips?: boolean }[];
  checks: [check: string, line: string][];
  card: {
    drafted: string;
    title: string;
    rows: CardRow[];
    noteTitle: string;
    note: string;
  };
}

const SHARED_FAQ = [
  {
    q: 'What does Night Porter do?',
    a: "Night Porter takes one repeatable job off a US staffing or consulting firm's team and runs it across the tools the firm already uses. Every draft carries its sources, and a person approves anything that leaves.",
  },
  {
    q: 'What happens when it gets something wrong?',
    a: 'It stops and asks. A named person on your team gets the draft with both sources attached, and their correction becomes a new test case.',
  },
];

const STEPS = (word: string) => [
  { name: 'Assessment', dur: '1 to 2 weeks', line: 'We measure the work today and tell you if building anything pays back.' },
  { name: 'Pilot', dur: '4 to 6 weeks after access', line: `We build it and test it on 30 of your past ${word} before you accept.`, chips: true },
  { name: 'Monthly operation', dur: 'Ongoing', line: 'We run it and report accuracy, interventions and cost every month.' },
];

const CHECKS = (word: string): [string, string][] => [
  ['Accuracy', `Tested on 30 past ${word}. Zero serious errors on the test set.`],
  ['Ownership', 'A named person on your side owns each exception.'],
  ['Failure', 'Breaks show, and a manual fallback keeps work moving.'],
  ['Cost', 'Cost per accepted output, your review time included.'],
  ['Access', 'Scoped credentials you can revoke without us.'],
  ['Change', 'Every change versioned, tested and reversible.'],
  ['Adoption', 'Your team knows how to use it, and when to stop it.'],
];

export const CHIPS = ['Working workflow', 'Test results', 'Runbook', 'Manual fallback', 'Training'];

export const DONT_DO = [
  'Write to your systems outside the fields we agree.',
  'Promise perfect accuracy. We publish the measured rate.',
  'Automate every department. One job first.',
  'Offer 24/7 support. [Coverage window]',
];

export const DATA_POINTS = [
  'Read and draft by default. Nothing is written back without your approval.',
  'Credentials scoped to the workflow, revocable by you.',
  "Each client's data kept separate.",
  'No SOC 2 or ISO 27001 yet. We say so up front.',
];

export const VARIANTS: Record<VariantKey, Variant> = {
  staffing: {
    title: 'Night Porter | Submission Prep for US Staffing Firms',
    desc: 'We take submission prep off your recruiters: CV, notes and transcripts turned into client-ready packages, tested on 30 of your past submissions.',
    eyebrow: 'For US staffing firms',
    h1: "Submission prep, off your recruiters' desks.",
    subline: "We draft every package in your client's format. A recruiter approves it before anything goes out.",
    workH2: 'How a submission moves through Night Porter',
    tiles: [
      ['Collect.', 'The req, CV, notes and transcripts.'],
      ['Extract.', 'Every fact, linked to its source.'],
      ['Draft.', "The package in your client's template."],
      ['Flag.', 'Conflicting sources go to the recruiter.'],
    ],
    tile5: 'Nothing reaches your client until a recruiter says yes.',
    dontDo: 'Screen, rank or reject candidates. Your recruiters decide.',
    formQ: 'How many recruiters on your team?',
    formOpts: ['Under 10', '10 to 20', '20 to 50', 'More than 50'],
    faq: [
      ...SHARED_FAQ,
      { q: 'Does this replace our recruiters?', a: 'No. It takes the formatting and assembly off them. Every candidate decision stays with your recruiters.' },
      {
        q: 'Our ATS already has AI. Why would we need this?',
        a: "It might cover it. Show us on your last five submissions. Built-in AI works inside the ATS; submission prep also needs your files, transcripts and client templates. If your ATS covers it, we'll say so.",
      },
    ],
    steps: STEPS('submissions'),
    checks: CHECKS('submissions'),
    card: {
      drafted: 'Drafted 6:12 a.m.',
      title: 'Submission package · VP Finance search · Kellerman Group',
      rows: [
        { label: 'Candidate', value: 'Dana Whitfield', chip: 'CV p.1', star: true },
        { label: 'Current role', value: 'Group Financial Controller, Halden Industries', chip: 'CV p.1', star: true },
        { label: 'Prior role', value: 'CFO, Bellrose Packaging, 2019 to 2023', flag: 'sources disagree', star: true },
        { label: 'Compensation', value: '$215k base', chip: 'Screen Sep 14' },
        { label: 'Availability', value: '8 weeks notice', chip: 'Screen Sep 14' },
        { label: 'Format', value: 'Kellerman template v4', chip: 'Client pack', star: true },
      ],
      noteTitle: 'Waiting for you: CFO or interim CFO?',
      note: 'The CV and the Sep 14 screen disagree. Both sources attached.',
    },
  },
  proposals: {
    title: 'Night Porter | Proposal Prep for Engineering and Consulting',
    desc: 'We take first drafts off your team: RFP to proposal draft built from your past proposals, resumes and project sheets, with every claim sourced.',
    eyebrow: 'For US consulting and engineering firms',
    h1: "First proposal drafts, off your team's desks.",
    subline: 'We draft from your past proposals, resumes and project sheets, and flag every gap. We never submit anything.',
    workH2: 'How an RFP moves through Night Porter',
    tiles: [
      ['Intake.', 'The RFP, its requirements and deadlines.'],
      ['Match.', 'Past projects, resumes and sections, each sourced.'],
      ['Draft.', 'A first draft in your house format.'],
      ['Flag.', 'Gaps and unmet criteria go to your proposal lead.'],
    ],
    tile5: 'Your team edits and signs off. We never submit.',
    dontDo: 'Pick bids, set fees or submit proposals. Your principals decide.',
    formQ: 'How many proposals do you send a month?',
    formOpts: ['Under 5', '5 to 10', '10 to 20', 'More than 20'],
    faq: [
      ...SHARED_FAQ,
      {
        q: 'We already use proposal software. How is this different?',
        a: 'It stores your content. We do the assembly on top: reading the RFP, matching, drafting and flagging gaps. If your tools already cover that, the assessment will tell you.',
      },
      {
        q: 'Could it invent project experience?',
        a: "No. Every claim links to the file it came from. If your records don't support a requirement, the draft flags the gap instead of filling it.",
      },
    ],
    steps: STEPS('proposals'),
    checks: CHECKS('proposals'),
    card: {
      drafted: 'Drafted 5:48 a.m.',
      title: 'First draft · RFQ 26-114 · Harlow County civil services',
      rows: [
        { label: 'Req 3.1, similar projects', value: '3 matched', chip: 'Project sheets · 3', star: true },
        { label: 'Req 3.2, project manager', value: 'J. Ortega, PE', chip: 'Resume · Ortega', star: true },
        { label: 'Req 3.3, fee schedule', value: 'Left for your team', chip: 'Not drafted' },
        { label: 'Req 3.4, local office', value: 'No office within 50 miles found', flag: 'no matching record', star: true },
        { label: 'Format', value: 'House proposal template', chip: 'Proposal library', star: true },
      ],
      noteTitle: 'Waiting for you: local office requirement',
      note: 'Nothing in your records meets it. The requirement is quoted in full.',
    },
  },
};

export const DATA_QA: [q: string, a: string][] = [
  ['What do you read?', '[Systems by name, confirmed per engagement in the statement of work]'],
  ['What do you write?', 'Only items a person on your team has approved, and only to fields named in the statement of work.'],
  ['Whose credentials?', 'Scoped to the workflow, held in your accounts wherever the vendor allows, and revocable by you without contacting us.'],
  ['Do AI providers train on our data?', '[Named providers and their training and retention terms]'],
  ['Where is data hosted?', '[Hosting provider and region]'],
  ['Is it encrypted?', '[In transit and at rest: confirm]'],
  ['Is there an audit log?', '[What is logged, and who can see it]'],
  ['Is our data separate from other clients?', '[Confirm with the technical founder in writing]'],
  ['How long do you keep it?', '[Retention schedule and deletion window]'],
  ['Where is your team?', '[International transfer line]'],
  ['Do you hold certifications?', "Not yet. We don't hold SOC 2 or ISO 27001. We'll send our written security practice on request."],
  ['Data-processing terms:', '[Link]'],
  ['Security contact:', '[Email]'],
];
