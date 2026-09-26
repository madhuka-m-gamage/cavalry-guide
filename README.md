# Cavalry field guide

**Read it: https://madhuka-m-gamage.github.io/cavalry-guide/**

Cavalry is a Claude Code plugin that runs a phased, gated, test-first program for auditing and fixing
a Vercel-hosted project: from a read-only audit to a signed-off production rollout, with a human making
every decision that matters. This site explains how to run it.

## What's in the guide

| Page | Covers |
|---|---|
| [Overview](https://madhuka-m-gamage.github.io/cavalry-guide/) | The phases, three guarantees, requirements, Deploy values |
| [Getting ready](https://madhuka-m-gamage.github.io/cavalry-guide/getting-ready.html) | A checklist to prepare before the first phase, and quick-start prompts |
| [Pre-flight, Recon, Fortify](https://madhuka-m-gamage.github.io/cavalry-guide/recon-fortify.html) | Environment checks, the audit, characterization tests |
| [Charge](https://madhuka-m-gamage.github.io/cavalry-guide/charge.html) | The per-item loop and merge modes A, B and C |
| [Regroup and Breach](https://madhuka-m-gamage.github.io/cavalry-guide/regroup-breach.html) | Proven pure restructures, and gated production rollout |
| [Tracker and scripts](https://madhuka-m-gamage.github.io/cavalry-guide/tracker-scripts.html) | The tracker file and the five helper scripts |
| [Edge cases](https://madhuka-m-gamage.github.io/cavalry-guide/edge-cases.html) | Unusual situations and the scripts' honest limits |

Every workflow has a step-through animation (play, pause, step, scrub), and every terminal block is real
output from Cavalry 0.2.0, run against a sample project.

The full reference, including recipes, a glossary and appendices, is also available as a Word document:
[cavalry-user-guide.docx](cavalry-user-guide.docx).

## About this repository

This repository holds only the generated site. It is built from the plugin's source and pushed here by a
deploy script, so edits made directly in this repository are overwritten on the next publish.
