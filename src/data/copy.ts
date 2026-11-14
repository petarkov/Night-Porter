// Copy for the free-sample flow and the new homepage sections.
// Every string marked TBD is a slot for the Writer's copy doc. Search for "TBD" before merging.

/** Primary ask on both landing pages (hero and sticky header). */
export const SAMPLE_CTA = 'Ask for your free sample';
/** Secondary link under the primary button on the landing pages. */
export const CALL_LINK = 'Or book a 15-minute call';

export const SAMPLE_PAGE = {
  title: 'Night Porter | Ask for Your Free Sample',
  desc: 'TBD: meta description for /sample/.',
  h1: 'TBD: /sample/ heading',
  intro: 'TBD: one or two lines on what the free sample is and what happens after you ask.',
  /** Shown beside the form. */
  replyLine: 'Or just reply to my email.',
  nameLabel: 'Name',
  emailLabel: 'Work email',
  companyLabel: 'Company',
  linkLabel: 'TBD: label for the req or RFQ link field',
  linkHint: 'TBD: short hint under the link field',
  button: 'TBD: submit button text',
  /** {name} is replaced with the first name. Petar committed to the 3-business-day promise on 10/27/2026. */
  thanks: 'TBD: thank-you line, {name}, including delivery within 3 business days.',
};

export const HOME = {
  /** Free-sample line in the homepage hero, under the existing two lines. */
  sampleLine: 'TBD: homepage free-sample hero line',
  sampleLink: SAMPLE_CTA,
  finalSayH2: 'You keep the final say',
  finalSay: ['TBD: final-say point 1', 'TBD: final-say point 2', 'TBD: final-say point 3'],
  foundersH2: 'TBD: founders note heading',
  foundersNote: 'TBD: founders note',
  worksWithH2: 'Works with what you already use',
  /** Text-only tool names. Leave empty until Aleks confirms each one; the section is hidden while empty. */
  worksWith: [] as string[],
};
