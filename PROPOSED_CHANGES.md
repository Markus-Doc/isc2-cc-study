# Proposed Changes and Future Improvements

This document tracks suggested improvements for the ISC2 CC Cyber Study Lab.

## Current Priority

### Study Drill follow-up workflow

After a Study Drill session is completed, the app should use the generated study report to help the student continue learning.

Suggested flow:

1. Student completes or exits a Study Drill session.
2. App generates a report of cards marked as `I need to review this`.
3. Report groups weak topics by domain.
4. Student can use the report to generate focused study material.
5. Student can run a review-only drill session.
6. Student can then be re-tested on the same weak areas.

Future versions could automatically create:

- A focused mini study guide from review pile topics
- A mini quiz only for weak cards
- A retest session after review
- Spaced repetition scheduling
- Domain readiness scores

## Public Student Disclaimer

Add a visible disclaimer to the landing page and tools:

> This project is an independent study tool. It is not official ISC2 training material and is not endorsed, certified, or recognised by ISC2. It was built to help students study intentionally, identify weak areas, and practise recall. Students should verify important topics against official ISC2 resources.

## Study Drill Improvements

### Review notes per card

Current idea: each card should allow an optional review note when the student adds it to the review pile.

Example:

```text
Card: What does the CIA triad stand for?
Student note: I keep forgetting Integrity means unauthorised modification.
```

The note should accompany the card in:

- Review pile
- Study report
- Future generated study sessions
- Retest sessions

### Better card flow

Desired flow:

1. Card asks a question.
2. Student thinks about whether they know it.
3. Student reveals the answer.
4. Student chooses `I know this` or `I need to review this`.
5. App automatically moves to the next card.
6. Last card summary appears at top with a `Go back and redo last card` option.

## Quiz Player Improvements

- Import all reconstructed question bank questions into the quiz data.
- Add domain-based mock exams.
- Add timed exam mode.
- Add wrong-answer explanations.
- Add confidence ratings for inferred answers.
- Add answer-source labels such as `answer key`, `official reference`, `trusted reference`, or `inferred`.

## Mobile Readability and Functionality Check

Before finalising the project, test carefully on mobile browsers.

Checklist:

- Landing page fits narrow screens without horizontal scrolling.
- Study Drill buttons are easy to tap.
- Quiz answer choices are readable and tap-friendly.
- Sidebar sections stack cleanly on mobile.
- Text size is readable without zooming.
- Cards do not feel cramped.
- Progress and report sections remain understandable.
- Copy buttons work where browser permissions allow.
- App remains usable in iOS Safari, Android Chrome, and desktop browsers.

## Design Improvements

- Keep the light, eye-comfort theme.
- Keep visual style aligned with the Markus-Doc portfolio aesthetic.
- Make the app a little flashier without hurting readability.
- Prefer soft glass panels, bright cyber accents, clean typography, and obvious action buttons.

## Data Improvements

- Expand drill cards from all study plan resources.
- Convert all question banks into structured quiz data.
- Add source fields for each card and question.
- Track which cards were generated from which source file.
- Add a domain weight map for exam readiness.
