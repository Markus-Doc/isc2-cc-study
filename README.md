# ISC2 CC Study

Private study repository for ISC2 Certified in Cybersecurity exam preparation.

## Purpose

This repository is being organised into two main study tools:

1. Drill tool
   - A fast cram style trainer for key facts, definitions, acronyms, concepts, processes, and weak areas.
   - Intended for quick repeated recall before the exam.

2. Quiz tool
   - A browser based multiple choice question player.
   - Presents questions one at a time.
   - Lets me choose an answer, lock it in, review feedback, then move through the full question set.

## Current Source Material

The existing source material remains in place and can be used as the raw study base.

Visible source areas include:

- Certified in Cybersecurity 2023 material
- Example_Questions
- Study Resources
- Reconstructed exam question bank files

## New Project Structure

```text
.
├── README.md
├── docs
│   ├── PROJECT_PLAN.md
│   ├── AI_ANSWER_POLICY.md
│   └── STUDY_WORKFLOW.md
├── data
│   ├── questions.example.json
│   └── drills.example.json
└── tools
    ├── drill
    │   └── index.html
    └── quiz
        └── index.html
```

## Tool 1: Drill Trainer

Open this file in a browser:

```text
tools/drill/index.html
```

Use it to cram concepts quickly. The first version loads example drill cards from embedded data. Later versions can be generated from the study PDFs, question banks, and notes.

## Tool 2: Multiple Choice Quiz Player

Open this file in a browser:

```text
tools/quiz/index.html
```

Use it to move through questions one at a time, lock answers, view feedback, and track progress.

## Data Files

The tools are designed around simple JSON structures.

- `data/questions.example.json` shows the shape for quiz questions.
- `data/drills.example.json` shows the shape for drill cards.

These can later be replaced or expanded with extracted questions from the source files.

## Answer Key Policy

The preferred source of truth is always:

1. Explicit answer key in the source material
2. Official ISC2 learning objective or glossary wording
3. Trusted security reference material
4. AI reasoning only when no answer key is available

See:

```text
docs/AI_ANSWER_POLICY.md
```

## Important Note

The HTML tools in this repository are static local tools. They do not perform live web searches by themselves. If live verification is needed, an AI assistant or separate backend workflow should be used to enrich the question data before loading it into the quiz tool.
