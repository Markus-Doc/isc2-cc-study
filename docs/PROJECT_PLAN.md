# ISC2 CC Study Tool Project Plan

## Goal

Build a private study system for ISC2 Certified in Cybersecurity exam preparation.

The system has two tools:

1. Drill trainer
2. Multiple choice quiz player

Both tools should be simple, local first, browser based, and easy to update from source files.

## Tool 1: Drill Trainer

### Purpose

Help me cram the information I need to remember quickly.

### Study Mode

The drill trainer should focus on:

- Definitions
- Acronyms
- Security principles
- Access control concepts
- Business continuity and disaster recovery terms
- Incident response steps
- Network security fundamentals
- Security operations concepts
- Risk concepts
- Legal, ethical, and governance basics

### Desired Behaviour

The tool should show one prompt at a time.

For each card, I should be able to:

- Reveal the answer
- Mark it as known
- Mark it as weak
- Continue to the next item
- Review weak items more often

## Tool 2: Quiz Player

### Purpose

Turn all available questions into a multiple choice question and answer style page.

### Desired Behaviour

The quiz player should:

- Show one question at a time
- Present all answer options clearly
- Let me click an answer
- Lock in my selected answer
- Show correct answer and explanation
- Track progress through the full set
- Track correct and incorrect answers
- Allow review of wrong answers

## Data Source Strategy

The source repository may include:

- PDFs
- Existing question banks
- HTML or JavaScript content
- Study resource files
- Rough reconstructed question material
- Final reconstructed question material

These should eventually be converted into structured JSON.

## Suggested Data Pipeline

1. Inventory all files
2. Extract text from source files
3. Identify questions and answer options
4. Identify answer keys if present
5. Map each question to one ISC2 CC domain if possible
6. Add explanations
7. Store as JSON
8. Load JSON into the quiz player

## Suggested Question Object

```json
{
  "id": "q001",
  "domain": "Security Principles",
  "question": "Which security principle ensures users have only the access required for their role?",
  "options": [
    "Separation of duties",
    "Least privilege",
    "Defence in depth",
    "Nonrepudiation"
  ],
  "correctIndex": 1,
  "explanation": "Least privilege means granting only the minimum access required to perform authorised tasks.",
  "source": "manual seed",
  "confidence": "high"
}
```

## Build Phases

### Phase 1

Create repository structure, README, data examples, and first static HTML tools.

### Phase 2

Extract all available questions into `data/questions.generated.json`.

### Phase 3

Extract drill cards into `data/drills.generated.json`.

### Phase 4

Improve quiz UX with search, filters, weak area review, and exportable results.

### Phase 5

Add AI assisted answer validation workflow for questions where the answer key is missing.
