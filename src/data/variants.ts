// All landing copy. Final, word for word from brief-v2.md. Do not edit without a brief change.
// Bracketed text is a placeholder and must stay bracketed until the real value is supplied.

import site from '../../site.config.mjs';

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

// [[Double brackets]] mark a value not confirmed yet. Never deploy a page that still shows one.

const WHAT_WE_DO = (a: string) => ({ q: 'What does Night Porter do?', a });

const WRONG_FAQ = {
  q: 'What happens when it gets something wrong?',
  a: 'It stops and asks. A named person on your team gets the draft with both sources attached, and their correction becomes a new test case.',
};

const COST_FAQ = {
  q: 'What does it cost?',
  a: "Each step has a fixed fee, agreed in writing before it starts. The assessment tells you whether the pilot pays back. If it doesn't, we'll tell you not to buy it.",
};

export const FOUNDERS: [name: string, line: string][] = [
  ['Petar Kovacevic', 'commercial. Runs your assessment and stays your contact from the first call to the monthly report.'],
  ['Leonardo Djinic', 'technical. Builds and tests every workflow, and is the person your IT team talks to.'],
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
  'Offer 24/7 support. The work runs overnight; we answer weekdays, [[9 a.m. to 6 p.m. ET]]. Anything that breaks outside those hours falls back to your manual process until morning.',
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
      WHAT_WE_DO(
        "Night Porter takes submission prep off your recruiters. We pull the req, CV, notes and transcripts together into a package in your client's format. Every fact carries its source, and a recruiter approves it before it goes out.",
      ),
      WRONG_FAQ,
      { q: 'Does this replace our recruiters?', a: 'No. It takes the formatting and assembly off them. Every candidate decision stays with your recruiters.' },
      {
        q: 'Our ATS already has AI. Why would we need this?',
        a: "It might cover it. Show us on your last five submissions. Built-in AI works inside the ATS; submission prep also needs your files, transcripts and client templates. If your ATS covers it, we'll say so.",
      },
      COST_FAQ,
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
      WHAT_WE_DO(
        'Night Porter takes first proposal drafts off your team. We read the RFP, match your past projects and resumes to each requirement, and draft in your house format. Every claim carries its source, and we never submit anything.',
      ),
      WRONG_FAQ,
      {
        q: 'We already use proposal software. How is this different?',
        a: 'It stores your content. We do the assembly on top: reading the RFP, matching, drafting and flagging gaps. If your tools already cover that, the assessment will tell you.',
      },
      {
        q: 'Could it invent project experience?',
        a: "No. Every claim links to the file it came from. If your records don't support a requirement, the draft flags the gap instead of filling it.",
      },
      COST_FAQ,
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

/** [question, answer, optional link: when set, the whole answer is that link] */
export const DATA_QA: [q: string, a: string, href?: string][] = [
  ['What do you read?', 'Only the systems named in your statement of work, such as [[your ATS, document storage, shared inbox]]. Access is scoped to the folders and records the job needs.'],
  ['What do you write?', 'Only items a person on your team has approved, and only to fields named in the statement of work.'],
  ['Whose credentials?', 'Scoped to the workflow, held in your accounts wherever the vendor allows, and revocable by you without contacting us.'],
  ['Do AI providers train on our data?', 'We use [[provider]] under commercial terms that do not use your inputs or outputs to train models. They retain data for [[X days]] for abuse monitoring, then delete it.'],
  ['Where is data hosted?', '[[Hosting provider]], [[region]]. Your data stays in the US unless your statement of work says otherwise.'],
  ['Is it encrypted?', 'Yes. [[TLS 1.2 or higher]] in transit and [[AES-256]] at rest.'],
  ['Is there an audit log?', "Every read, draft, flag and approval is logged with a timestamp and who or what did it. You can request your firm's log at any time."],
  ['Is our data separate from other clients?', "Yes. Each client runs in its own [[workspace / storage]] with its own credentials. One client's files are never used to draft for another."],
  ['How long do you keep it?', 'Working files for [[30]] days after each job closes. When an engagement ends, we delete everything within [[30]] days and confirm it in writing.'],
  ['Where is your team?', 'Our team works from the US and Europe. Where your data is accessed outside the US, that access is covered by our data-processing terms.'],
  ['Do you hold certifications?', "Not yet. We don't hold SOC 2 or ISO 27001. We'll send our written security practice on request."],
  ['Data-processing terms:', 'Request our DPA', `mailto:${site.securityEmail}?subject=DPA%20request`],
  ['Security contact:', site.securityEmail, `mailto:${site.securityEmail}`],
];
