# ISC2 CC Cyber Study Lab

A polished local-first study platform for ISC2 Certified in Cybersecurity preparation.

This project has two launchable browser tools:

- **Study Drill** for fast recall, weak area loops, definitions, acronyms, and cram cards
- **Quiz Player** for multiple choice practice with answer locking, explanations, score tracking, domain filters, and missed question review

## Launch

Open this file first:

```text
index.html
```

From the landing page, choose:

```text
tools/drill/index.html
```

or:

```text
tools/quiz/index.html
```

No build step, package install, or backend is required.

## Current Structure

```text
.
├── index.html
├── assets
│   └── styles.css
├── data
│   ├── app-data.js
│   ├── drills.example.json
│   └── questions.example.json
├── docs
│   ├── AI_ANSWER_POLICY.md
│   ├── PROJECT_PLAN.md
│   └── STUDY_WORKFLOW.md
├── tools
│   ├── drill
│   │   └── index.html
│   └── quiz
│       └── index.html
└── source study material folders and files
```

## Study Drill

Use this when you need rapid memorisation.

Features:

- Cyber styled flashcard interface
- Domain filtering
- Search
- Reveal answer when ready
- Mark cards as Known or Weak
- Weak-only review mode
- Copy weak cards as JSON

## Quiz Player

Use this when you want exam style practice.

Features:

- One question at a time
- Clear answer choices
- Click and lock answer flow
- Correct and wrong answer highlighting
- Explanation panel
- Score and missed question tracking
- Domain filtering
- Missed-only review mode
- Copy missed questions as JSON

## Data

The main app data file is:

```text
data/app-data.js
```

It currently contains starter drill cards and starter quiz questions. Later, extracted questions from the source material can be added here or generated into a separate file.

## Answer Policy

The intended answer source order is:

1. Explicit answer key from source material
2. Official ISC2 material or glossary wording
3. Trusted cybersecurity references
4. AI reasoning only when no answer key is available

See:

```text
docs/AI_ANSWER_POLICY.md
```

## Notes

This is currently a static local app. It does not perform live web lookups by itself. Live verification should be handled by a separate AI or research workflow before data is added to the quiz player.
