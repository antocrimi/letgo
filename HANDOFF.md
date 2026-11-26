# Controlled Surrender — handoff

Read this first if you are picking the project up cold. It records what the piece is, the design ethos, who decided what, what is verified, and what is still open.

Written 25 November 2026, at the end of the conversation that built it.

## What this is

"The Art of Controlled Surrender" is a single-page interactive essay by Anto (Antonello Crimi). It translates Heather Berlin's TED2026 talk *How to Rewire Your Brain — and Find Your Flow* and grounds it in peer-reviewed neuroscience.

- It is a **personal experiment**, private for now. It is not client work and not frog-branded.
- All five acts are built. Nothing has been visually reviewed by the model that wrote it (see "Not yet verified").

## Files in this folder

| File | What it is |
|---|---|
| `essay.html` | The full essay: one self-contained HTML file, vanilla CSS and JS. This is the source of truth. |
| `build-prompt-v2.md` | The specification the essay was built from. Read it before changing anything. |
| `original-prompt.md` | Anto's first prompt, before review. Kept to show what changed and why. |
| `HANDOFF.md` | This file. |

One level up: `index.html` is `essay.html` encrypted behind a password page, and `tools/lock.mjs` regenerates it. After any edit to `essay.html`, run `node tools/lock.mjs` and commit the new `index.html`. This whole `source` folder stays out of GitHub.

The essay was also published as a private Claude artifact named "Controlled Surrender". That copy has the same content without the outer HTML document wrapper.

## Design ethos

These come from Anto's original prompt and held throughout.

- **The bar is a flagship interactive essay**: The Pudding, Stripe Press, The New York Times. Not a SaaS landing page, not a dashboard.
- **Swiss-Italian rationalist typography meets living, organic neural motion.** Rigor in the type and grid; life in the brain.
- **Motion explains. It does not decorate.**
- **One idea carried all the way through: every interaction on the page changes the brain on the stage.** This was added during review and became the test for every tool.
- **Controls are bespoke editorial instruments.** No default sliders, stock modals or crowded boxes.
- **The science is graded honestly.** A claim carries the badge its evidence earns, even when that makes the story less tidy.

Visual system: gallery paper `#F5F2EB` and charcoal `#141311`, with a Dark Studio mode on obsidian `#0D0E11`. DM Serif Display for display (switched from Instrument Serif on 25 November 2026), Inter for body, JetBrains Mono for telemetry and citations. Six circuit colours: cobalt, amber, vermilion, violet, teal, emerald. Hairline rules, film grain at 3%.

## Decisions Anto made

- **Personal experiment, private.** This removed the brand question and deferred the rights question.
- **Keep all four levers in Act IV.** Cutting to two was proposed; he asked what cutting would buy, and the answer did not justify it.
- **Build in three reviewed stages**, not one pass.
- **Liked the brain and the motion after Build 1.** His one correction: the cerebrum, cerebellum and brainstem outlines overlapped and looked sketchy. He asked for it to be refined and suggested connecting the areas.
- **Approved Builds 2 and 3 with "go"**, and delegated detail: "act based on best judgement".
- **Publish as a GitHub Pages site behind a password page.** He set the password himself. It is not recorded here.

## Calls made by the model on his behalf

He accepted these by approving the builds, but did not specify them. Revisit freely.

- **A third evidence badge, `EARLY EVIDENCE`**, for the jazz and rap studies, which have small samples.
- **Badge the claim, not the paragraph.** Behaviour and mechanism get separate badges.
- **The brain is a stylised hybrid schematic and says so on the stage.** A true sagittal cut cannot show the lateral prefrontal cortex or the insula.
- **The three brain outlines were merged into one continuous silhouette** in answer to his overlap note.
- **State-engine priority rule.** Scroll drives the brain by default. Any direct input switches to manual and holds. Scroll takes over again when a new chapter becomes active, or on "Follow scroll".
- **One shared pacer component** with three skins (ring, breath, wave), instead of three separate ones.
- **Incubation sits below the inverted-U curve**, not on it, because time off the task has no performance score.
- **In the expressive vs task table, the default mode network is "unchanged" for task flow.** Ulrich's studies show a medial prefrontal decrease, not a whole-network one.
- **Lever 02's safety pathway runs from the lower medial prefrontal cortex to the amygdala**, not from the lateral prefrontal cortex.
- **A "not clinical guidance" line sits under Lever 02.**
- **The password page encrypts the essay** (AES-256-GCM, key derived by PBKDF2) instead of only hiding it.

## What changed from the original prompt, and why

| Original | Now | Reason |
|---|---|---|
| Task flow: `dlpfc ↑` locked in | Control stays engaged at a working level; alarm and self-talk quiet | Ulrich 2014 found increases in inferior frontal gyrus and putamen, decreases in medial prefrontal cortex and amygdala |
| Incubation `ESTABLISHED` via Beaty 2018 | Behaviour `ESTABLISHED` (Sio & Ormerod; Baird 2012); mechanism `LEADING MODEL` | Beaty 2018 is about creative ability, not incubation |
| Jazz and rap studies `ESTABLISHED` | `EARLY EVIDENCE` | Small samples |
| LC–NE paper in European Journal of Neuroscience | Frontiers in Psychology | Wrong journal |
| "Anatomically grounded sagittal cutaway" | Labelled schematic | Anatomically impossible as specified |
| "Chinese Finger Trap" | "Finger trap" | Naming |
| Font alternates, Tailwind syntax | One face per role, plain CSS | Ambiguity; single-file build |
| No rule for who controls the brain | Explicit priority rule | Five inputs drive one stage |

## Evidence status

**Checked online during the build:** the Berlin talk exists (TED2026, April 2026); Ulrich et al. 2014 and 2016; van der Linden, Tops & Bakker 2021; Beaty et al. 2018; Baird et al. 2012.

**Cited from memory, not rechecked:** Limb & Braun 2008 and Liu et al. 2012, including their sample sizes of 6 and 12; Craske et al. 2014; Sio & Ormerod 2009; Menon 2011; Beaty et al. 2015; Aston-Jones & Cohen 2005; Beilock & Carr 2001; Csikszentmihalyi 1990. Verify these before the essay is shown to anyone who will check.

**Not checked against the talk itself:** the transcript could not be opened. The finger trap, the four levers and the "cold tea test" come from Anto's prompt. The essay assumes "cold tea test" means the tea you forgot to drink. All Act I copy is original wording, not Berlin's.

## Not yet verified

- **No build was seen rendered by the model.** The script passed a syntax check only. Anto viewed Build 1 in a browser and liked it; Builds 2 and 3 have no recorded review.
- Untested by eye: the Flow Lab curve, the comparison table, all four lever tools, the compass, the citations drawer, the phone Expand sheet, reduced-motion behaviour.
- The password page was verified by decrypting it back to the exact essay in Node. It has not been run in a browser.

## Open items

- **Rights.** The essay is a derivative of a TED talk. This was parked while it stays private. If it is published or shown outside, check with Legal first.
- **Password strength.** The current password is short. Anto was told; his call.
- **Act IV and Act V overlap.** The compass repeats three of the four levers. The plan was to judge this once both were visible.
- **Magnetic hover and parallax** from the motion spec are only lightly implemented.

## Code map for `essay.html`

One `<style>` block, then the markup, then one script.

- **Tokens** are on `:root`, redefined for dark under both `prefers-color-scheme` and `[data-theme="dark"]`.
- **Markup:** `aside.stage` is the Neural Stage. `main.essay` holds `section.beat` chapters. Each beat's `data-state` names the brain state it asks for.
- **Script, in order:** circuit and tract data (`C`, `T`); named states (`STATES`) and state helpers (`trapState`, `spotlight`, `mix`); brain SVG construction; the state engine (`readScroll`, `setMode`, `beatState`); theme; finger trap; Flow Lab (`LAB`, `selectLab`); phone HUD; the shared pacer (`makePacer`); Levers 1 to 4; compass (`COMP`, `pickQ`); `DYN`, which maps tool-driven beats to live states; the frame loop.
- **A state** is six circuit intensities from 0 to 1, a pulse speed, a tremor amount, an ambient colour, a caption, and an optional `safe` value that draws the safety pathway.
- **Tract brightness is derived**, not set: each pathway takes the lower of its two endpoint circuits.
- **To add a chapter:** add a `section.beat` with a `data-state`, and either a `STATES` entry or a `DYN` entry.

## How Anto works

- Direct and executive. Recommendation first, evidence second.
- Wants one thing named that you would not recommend, and why.
- Ask before guessing on anything material; otherwise use judgment and say what you chose.
