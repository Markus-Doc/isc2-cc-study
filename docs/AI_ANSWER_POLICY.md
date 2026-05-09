# AI Answer Policy

## Purpose

This policy defines how answers should be handled when converting study material into quiz questions.

## Source of Truth Order

Use this order when deciding or validating an answer.

1. Explicit answer key from the source file
2. Official ISC2 Certified in Cybersecurity learning material
3. Official ISC2 glossary or domain objective wording
4. Trusted cybersecurity references such as NIST, CISA, OWASP, Microsoft Learn, AWS documentation, or vendor neutral security documentation
5. AI reasoning only when no direct answer key or trusted source is available

## Handling Missing Answer Keys

If a question has no answer key, the conversion workflow should:

1. Analyse the wording carefully
2. Identify the concept being tested
3. Compare answer options against ISC2 CC exam domains
4. Select the best answer
5. Add a confidence rating
6. Add an explanation
7. Mark the source as inferred rather than keyed

## Confidence Values

Use these values:

```text
high
medium
low
```

## Recommended Fields

Questions should include:

```json
{
  "answerSource": "explicit_key | official_reference | trusted_reference | inferred",
  "confidence": "high | medium | low",
  "needsReview": false,
  "reviewNote": ""
}
```

## Live Web Verification

The static HTML quiz tool does not perform live web searches.

If live verification is needed, use a separate AI assisted workflow to enrich the JSON before loading it into the browser tool.

## Review Rule

Any question with an inferred answer and low confidence should be reviewed manually before being treated as exam ready.
