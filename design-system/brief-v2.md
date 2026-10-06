# Night Desk Landing Page Design Brief v2

Sep 30, 2026 · @Big boss

This brief replaces v1 entirely. It cuts the page from about 1,300 words to about 650 per variant, so it reads faster, and it moves the booking form up.

## What changed and why

The review found the page tells its three-step flow four times and says "a person approves" eight or more times. v2 gives each message one home and cuts everything that repeats it.

| Message | Its one home in v2 | Removed from |
| --- | --- | --- |
| What the job is | H1 | Section 2 lead line and paragraph |
| How the work flows | The five step tiles | Hero subline, section 2 paragraph, measures line |
| A person approves | Hero subline, the card's waiting note, step 5 | Exclusion list, FAQ, card buttons |
| It's a service, not software | One caption under the example card | FAQ, near the bottom of the page |
| Data and security detail | New /data page for IT | Most of the on-page data section, now 4 lines plus a link |

**Other changes:**

1. **The form moves up.** It now comes before the data, about and FAQ sections, roughly halfway down the page instead of 73%.
2. **The eyebrow now names the segment** ("For US staffing firms"), so it tells the visitor something instead of repeating the tagline.
3. **The example cards lose their buttons.** "Approve" looked like a real primary button and made the card read as a software screenshot. On mobile the cards show four rows, not six.
4. **The proposals card's Req 3.4 row gets a value,** so it no longer looks broken.
5. **The form drops to four fields.** The button says "Pick a time", because it opens the calendar.
6. **The FAQ drops to four questions per variant,** each answered in 40 words or fewer.
7. **The root page cards now read in parallel,** and its data link goes to the new /data page, not the staffing page.
8. **The sticky header is approved.** On a phone it's the only shortcut to the form, so it stays, with the button hidden while the hero or form button is on screen.
9. **Text size rule clarified.** Body copy stays at 16px minimum. Form labels, captions and the footer may use the design system's 14px Small style. v1's acceptance line read too strictly.

## Brand and visual rules

These are unchanged from v1. Use the Night Desk design system.

| Element | Rule |
| --- | --- |
| Ground | Paper `#F5F3EE` everywhere. No dark mode on these pages. |
| Text | Night ink `#0F1726`; secondary `#4B5970`; labels `#5E6A7E` |
| Surfaces | `panel` `#FFFFFF` for the form and example cards; `raise` `#EEEBE3` for tiles and chips; `line` `#DDD8CC` hairlines only |
| Accent | Signal deep `#0B7489` for underlined links and focus rings only. No cyan on Paper. |
| Amber | Only inside the example cards, on the one item waiting for a person. Never in page chrome. |
| Status pills | Flagged: `#A63E35` on `#F6E1DE`. Waiting for you: `#8A5A0C` on `#F8ECD4`. Always with a text label. |
| Type | Archivo 800 for H1, 700 for H2 and H3. IBM Plex Sans for body, 16px minimum. IBM Plex Mono for eyebrows, labels, timestamps, chips and every number. Labels, captions and the footer may use the 14px Small style. |
| Sizes | H1 56px desktop / 36px mobile. H2 24px. Body 16px, line height 1.6, 65 characters a line at most. |
| Case | Sentence case for headlines and buttons. Mono labels uppercase. |
| Layout | 1120px container, 16px mobile gutters, 8px grid, 48 to 64px between sections, one column below 620px |
| Shape | 4px radius; 6px for the example cards; pill radius only on status pills. Hairlines, no shadows. |
| Buttons | Primary: Night ink fill, Paper text. Only one primary button visible per screen. |
| Header | Sticky. Wordmark SVG left, 104 to 132px wide. The "Book a call" button hides while the hero button or the form is on screen. |
| Imagery | No photos, stock, illustration or gradients. The only pictures are the example cards. |

## Layout

Both variants use this order. Nothing is added between sections.

| # | Section | Desktop (1440px) | Mobile (390px) |
| --- | --- | --- | --- |
| 1 | Hero | Left: eyebrow, H1, subline, button, one line under it. Right: example card with its caption. | Eyebrow, H1, subline and button on the first screen, then the card |
| 2 | The work (#work) | H2, then five step tiles in a row. Each tile: number, one-word verb in Archivo 700, one line. Tile 5 is ink-filled with Paper text, set apart as the gate. | Tiles stacked, same numbering |
| 3 | How it works | H2, three columns (step name, duration in mono, one line). Deliverable chips under the pilot column. Fixed-fee line below. | Stacked |
| 4 | The seven checks | H2, a 2-column grid of seven short items (mono label and one line), a small-type line, the fee line | One column |
| 5 | What we don't do | H2, five short bullets in two columns | One column |
| 6 | Booking (#book) | `panel` surface. Left: H2 and one line. Right: the four fields, then the calendar step. No empty half. | Full width |
| 7 | Your data (#data) | H2, four short bullets, link "Full detail for your IT team" to /data | Same |
| 8 | Who we are (#about) | H2, one line, two text-only founder blocks | Stacked |
| 9 | FAQ | Four questions, all visible, in two columns | One column |
| 10 | Footer | Wordmark, entity line, Privacy, /data link, contact email | Stacked |

Header anchor links: The work (#work), Your data (#data), About (#about). The button scrolls to #book.

### Example card: /staffing

`panel` card, 6px radius, hairline border. **No buttons.** Caption under the card, in the 14px Small style, `ink-2`: "Example draft, synthetic data. We run the work; your team reviews and approves."

- **Top row:** `EXAMPLE · SYNTHETIC DATA` left; `Drafted 6:12 a.m.` right (mono).
- **Title:** Submission package · VP Finance search · Kellerman Group
- **Rows** (label, value, evidence chip). On mobile, show only the rows marked \*:
  - Candidate \* · Dana Whitfield · `CV p.1`
  - Current role \* · Group Financial Controller, Halden Industries · `CV p.1`
  - Prior role \* · CFO, Bellrose Packaging, 2019 to 2023 · coral pill `Flagged: sources disagree`
  - Compensation · $215k base · `Screen Sep 14`
  - Availability · 8 weeks notice · `Screen Sep 14`
  - Format \* · Kellerman template v4 · `Client pack`
- **Waiting note** (3px amber bar): bold "Waiting for you: CFO or interim CFO?" Second line in `ink-2`: "The CV and the Sep 14 screen disagree. Both sources attached."

### Example card: /proposals

Same component, same caption and rules. No buttons.

- **Top row:** `EXAMPLE · SYNTHETIC DATA` left; `Drafted 5:48 a.m.` right.
- **Title:** First draft · RFQ 26-114 · Harlow County civil services
- **Rows** (mobile shows \* only):
  - Req 3.1, similar projects \* · 3 matched · `Project sheets · 3`
  - Req 3.2, project manager \* · J. Ortega, PE · `Resume · Ortega`
  - Req 3.3, fee schedule · Left for your team · `Not drafted`
  - Req 3.4, local office \* · No office within 50 miles found · coral pill `Flagged: no matching record`
  - Format \* · House proposal template · `Proposal library`
- **Waiting note:** bold "Waiting for you: local office requirement". Second line: "Nothing in your records meets it. The requirement is quoted in full."

All names, numbers and the county are synthetic. Keep them that way.

### Root page `/`

One screen. At 390px, the H1, the line and at least the first card are visible without scrolling. Two large link cards side by side on desktop, stacked on mobile. Header: wordmark only. Footer as on the variants.

### Data page `/data` (new)

For the IT or security reader. It uses the same header (wordmark only) and footer. Layout: H1, one intro line, then a two-column list of question and answer pairs (question in Archivo 700 18px, answer in body text), ending with the contact line. Bracketed answers stay bracketed in the prototype.

## Final copy

Use these words exactly. `{WORD}` means **submissions** on /staffing and **proposals** on /proposals. Show bracketed text as written.

### Shared (both variants)

**Header:** The work · Your data · About · \[Book a call\]

**Hero button:** Book a 20-minute call

**Under the button:** No slides. We'll tell you honestly if we can help.

**Section 3, H2:** Three steps. Stop after any of them.

| Step | Duration | Line |
| --- | --- | --- |
| Assessment | 1 to 2 weeks | We measure the work today and tell you if building anything pays back. |
| Pilot | 4 to 6 weeks after access | We build it and test it on 30 of your past {WORD} before you accept. |
| Monthly operation | Ongoing | We run it and report accuracy, interventions and cost every month. |

Pilot chips: Working workflow · Test results · Runbook · Manual fallback · Training

Fixed fee for each step, agreed in writing first.

**Section 4, H2:** Seven checks before you accept the build

| Check | Line |
| --- | --- |
| Accuracy | Tested on 30 past {WORD}. Zero serious errors on the test set. |
| Ownership | A named person on your side owns each exception. |
| Failure | Breaks show, and a manual fallback keeps work moving. |
| Cost | Cost per accepted output, your review time included. |
| Access | Scoped credentials you can revoke without us. |
| Change | Every change versioned, tested and reversible. |
| Adoption | Your team knows how to use it, and when to stop it. |

(Small type) We're new, so this standard stands in for client logos.

**Part of the pilot fee is due only after the build passes. Still failing after one round of fixes? That part is waived.**

**Section 5, H2:** What we don't do

- &#91;VARIANT LINE\]
- Write to your systems outside the fields we agree.
- Promise perfect accuracy. We publish the measured rate.
- Automate every department. One job first.
- Offer 24/7 support. \[Coverage window\]

**Section 6, H2:** Tell us how the work runs today.

20 minutes. If we can't help, we'll say so.

Fields: Name · Work email · Company · \[VARIANT QUESTION\]

**Button:** Pick a time

Under the calendar: No time that works? Email \[contact email\].

**Confirmation:** You're booked. A calendar invite is on its way.

**Section 7, H2:** Your data

- Read and draft by default. Nothing is written back without your approval.
- Credentials scoped to the workflow, revocable by you.
- Each client's data kept separate.
- No SOC 2 or ISO 27001 yet. We say so up front.

Link: Full detail for your IT team → /data

**Section 8, H2:** Who we are

Two founders. One of us is on every call.

&#91;Founder 1, commercial: name, one line\]

&#91;Founder 2, technical: name, one line\]

**Section 9, H2:** Questions

**What does Night Desk do?** Night Desk takes one repeatable job off a US staffing or consulting firm's team and runs it across the tools the firm already uses. Every draft carries its sources, and a person approves anything that leaves.

**What happens when it gets something wrong?** It stops and asks. A named person on your team gets the draft with both sources attached, and their correction becomes a new test case.

&#91;Plus the two variant questions\]

**Footer:** \[wordmark\] · \[Legal entity name\] · Privacy · Data · \[contact email\]

### /staffing

- **Meta title:** Night Desk | Submission Prep for US Staffing Firms
- **Meta description:** We take submission prep off your recruiters: CV, notes and transcripts turned into client-ready packages, tested on 30 of your past submissions.
- **Eyebrow:** FOR US STAFFING FIRMS
- **H1:** Submission prep, off your recruiters' desks.
- **Subline:** We draft every package in your client's format. A recruiter approves it before anything goes out.
- **Section 2, H2:** How a submission moves through Night Desk
- **Tiles:**
  1. **Collect.** The req, CV, notes and transcripts.
  2. **Extract.** Every fact, linked to its source.
  3. **Draft.** The package in your client's template.
  4. **Flag.** Conflicting sources go to the recruiter.
  5. **Approve.** Nothing reaches your client until a recruiter says yes.
- **Don't-do line:** Screen, rank or reject candidates. Your recruiters decide.
- **Form question:** How many recruiters on your team? Under 10 / 10 to 20 / 20 to 50 / More than 50
- **FAQ:**
  - **Does this replace our recruiters?** No. It takes the formatting and assembly off them. Every candidate decision stays with your recruiters.
  - **Our ATS already has AI. Why would we need this?** It might cover it. Show us on your last five submissions. Built-in AI works inside the ATS; submission prep also needs your files, transcripts and client templates. If your ATS covers it, we'll say so.

### /proposals

- **Meta title:** Night Desk | Proposal Prep for Engineering and Consulting
- **Meta description:** We take first drafts off your team: RFP to proposal draft built from your past proposals, resumes and project sheets, with every claim sourced.
- **Eyebrow:** FOR US CONSULTING AND ENGINEERING FIRMS
- **H1:** First proposal drafts, off your team's desks.
- **Subline:** We draft from your past proposals, resumes and project sheets, and flag every gap. We never submit anything.
- **Section 2, H2:** How an RFP moves through Night Desk
- **Tiles:**
  1. **Intake.** The RFP, its requirements and deadlines.
  2. **Match.** Past projects, resumes and sections, each sourced.
  3. **Draft.** A first draft in your house format.
  4. **Flag.** Gaps and unmet criteria go to your proposal lead.
  5. **Approve.** Your team edits and signs off. We never submit.
- **Don't-do line:** Pick bids, set fees or submit proposals. Your principals decide.
- **Form question:** How many proposals do you send a month? Under 5 / 5 to 10 / 10 to 20 / More than 20
- **FAQ:**
  - **We already use proposal software. How is this different?** It stores your content. We do the assembly on top: reading the RFP, matching, drafting and flagging gaps. If your tools already cover that, the assessment will tell you.
  - **Could it invent project experience?** No. Every claim links to the file it came from. If your records don't support a requirement, the draft flags the gap instead of filling it.

### Root page `/`

- **Meta title:** Night Desk | Managed AI Operations for Services Firms
- **Meta description:** Night Desk takes one repeatable job off US staffing and consulting firms and runs it across your tools, with a person approving anything that leaves.
- **H1:** We run the work between your systems.
- **Line:** One repeatable job, taken off your team, with a person approving anything that leaves.
- **Card 1:** STAFFING FIRMS · Submission prep: from approved req to client-ready package → /staffing
- **Card 2:** CONSULTING AND ENGINEERING FIRMS · Proposal drafts: from RFP to first draft → /proposals
- **Bottom link:** How we handle your data → /data

### Data page `/data`

- **Meta title:** Night Desk | How We Handle Your Data
- **H1:** How Night Desk handles your data
- **Intro:** Night Desk runs one repeatable job for US staffing and consulting firms. This page is for whoever checks our security.
- **What do you read?** \[Systems by name, confirmed per engagement in the statement of work\]
- **What do you write?** Only items a person on your team has approved, and only to fields named in the statement of work.
- **Whose credentials?** Scoped to the workflow, held in your accounts wherever the vendor allows, and revocable by you without contacting us.
- **Do AI providers train on our data?** \[Named providers and their training and retention terms\]
- **Where is data hosted?** \[Hosting provider and region\]
- **Is it encrypted?** \[In transit and at rest: confirm\]
- **Is there an audit log?** \[What is logged, and who can see it\]
- **Is our data separate from other clients?** \[Confirm with the technical founder in writing\]
- **How long do you keep it?** \[Retention schedule and deletion window\]
- **Where is your team?** \[International transfer line\]
- **Do you hold certifications?** Not yet. We don't hold SOC 2 or ISO 27001. We'll send our written security practice on request.
- **Data-processing terms:** \[Link\]
- **Security contact:** \[Email\]

## Rules, acceptance and prompt

### Do not

- Add sections, stats, logos, testimonials, prices or imagery. None exist yet.
- Put buttons in the example cards.
- Link /staffing and /proposals to each other. Only the root page shows both.
- Use cyan on Paper, or amber outside the example cards.
- Use accordions or tabs.
- Rewrite copy, or fill placeholders with invented names or details.
- Name ATS or proposal software vendors.
- Use em dashes, exclamation marks or title case.

### Done when

1. Each variant is about 650 words or fewer, not counting /data.
2. At 390px, the eyebrow, H1, subline and button fit on the first screen. At 390px the root page shows its H1, line and first card without scrolling.
3. The booking section starts before the halfway point of each variant page on desktop, and within about six phone screens on mobile.
4. The example cards have no buttons, carry the caption, and show four rows on mobile.
5. Tile 5 reads as the approval gate: ink-filled, set apart, not amber.
6. Only one primary button is visible at any scroll position.
7. Body copy is at least 16px. Labels, captions and the footer use nothing smaller than the 14px Small style.
8. Every number, timestamp, label and chip is in IBM Plex Mono, and every status pill has a text label.
9. The pages stay on Paper in dark mode, and every placeholder shows as bracketed text.
10. The copy matches the Final copy section word for word.

### Prompt for Claude Design

Paste this, then paste the **What changed**, **Layout** and **Final copy** sections of this brief underneath it.

```
Update the Night Desk prototype to brief v2, pasted below. v2 replaces v1 entirely. The goal is a page that reads faster: about half the words, the booking form higher up, and each message said once.

Apply every change in "What changed and why". Rebuild /staffing and /proposals in the section order in the Layout table, remove the buttons from both example cards, add the caption under each card, and show only the starred rows on mobile. Update the root page and add the new /data page.

Use the Final copy word for word and delete any v1 copy not in it. Keep every bracketed placeholder as written. Keep all brand rules from the Night Desk design system and the rules table in this brief. The sticky header is approved.

Do not add sections, imagery, buttons in the cards, links between the two variants, accordions, vendor names, em dashes, exclamation marks or title case.

When done, check each of the ten "Done when" items and report Pass or Fail with evidence, including the word count per variant and where the booking section starts, in pixels, at 390px and 1440px.
```
