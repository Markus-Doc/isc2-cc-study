# ISC2 CC — Manager Mindset Decision Framework

> [!tip] Why This Matters
> ISC2 exams are written from the perspective of a **security manager or CISO**, not a hands-on technician. When two answers both look correct, ISC2 **always** wants the one a leader would choose. Community reports consistently identify "thinking like a tech" as the #1 reason people score 680 instead of 720. This framework reprograms your instincts for exam day.

---

## The Core Rule

> **When in doubt: choose governance over technology, prevention over reaction, people/process over tools, and risk-awareness over risk-elimination.**

---

## Decision Rules — "When You See X, Think Y"

### Rule 1: Policy First, Technology Second

When a question asks what should be done **FIRST** or what is **MOST important**, the answer is almost never a technical tool.

| If the question says... | Don't pick... | Pick... |
|---|---|---|
| "What should the organisation do FIRST?" | Deploy a firewall / Install IDS | Develop a policy / Conduct risk assessment |
| "What is MOST important for security?" | Encryption / Antivirus | Aligning security with business objectives |
| "How should management respond?" | Implement technical controls | Review and update policies |

**Mental model:** Technology implements policy. Policy must exist before technology makes sense.

---

### Rule 2: Risk Assessment Before Risk Treatment

ISC2 follows a strict order: **Identify → Assess → Treat → Monitor**. You cannot treat what you haven't assessed.

| If the question says... | Don't pick... | Pick... |
|---|---|---|
| "What is the FIRST step in managing risk?" | Implement controls / Buy insurance | Identify and assess risks |
| "Before implementing controls..." | Choose the cheapest option | Conduct a risk assessment |
| "A new system is being deployed..." | Harden it immediately | Assess the risks it introduces |

---

### Rule 3: Containment Before Investigation

In incident response, **stop the bleeding first**. You cannot investigate effectively while the attacker still has access.

| If the question says... | Don't pick... | Pick... |
|---|---|---|
| "A breach is detected. What FIRST?" | Notify law enforcement / Forensics | Isolate/contain affected systems |
| "Malware is spreading across the network..." | Identify the malware variant | Disconnect affected segments |
| "After containment..." | Resume normal operations | Eradicate, then recover, then review |

**Remember the NIST order:** Preparation → Detection/Analysis → **Containment**/Eradication/Recovery → Post-Incident Activity

---

### Rule 4: Prevent > Detect > Correct

ISC2 values controls in this priority order. If the question asks for the "BEST" control, preventive wins over detective, which wins over corrective.

| Question pattern | Lower priority | Higher priority |
|---|---|---|
| "BEST way to protect..." | IDS (detective) | Firewall/Encryption (preventive) |
| "MOST effective control..." | Audit log review (detective) | Access control policy (preventive) |
| "How to AVOID recurrence..." | Better monitoring | Fix the root cause (corrective → preventive) |

**Exception:** If the question specifically asks about detection or monitoring, then detective controls are correct.

---

### Rule 5: "All of the Above" Is Almost Always Wrong

ISC2 CC questions are designed so that one answer is **clearly best**. "All of the above" or "D. All of the above" is a trap. ISC2 wants you to discriminate between good answers and find the **most** correct one.

---

### Rule 6: Least Privilege, Always

When a question involves access, permissions, or authority — the answer that gives the **minimum necessary** access is correct.

| If the question says... | Don't pick... | Pick... |
|---|---|---|
| "How should access be granted?" | Give broad access, revoke later | Grant minimum required, expand if needed |
| "A user changed departments..." | Keep existing access + add new | Remove old access, grant new role access |
| "Temporary contractor needs access..." | Full employee access for convenience | Time-limited, role-specific access |

---

### Rule 7: Business Continuity Trumps Everything Except Safety

When a question pits security against business operations, ISC2 wants balance — but human safety always comes first, followed by business continuity.

| Priority order | Example |
|---|---|
| 1. Human safety | Evacuate before securing servers |
| 2. Business continuity | Keep critical operations running |
| 3. Data/asset protection | Protect sensitive information |
| 4. Cost efficiency | Minimise financial impact |

---

### Rule 8: The "Why" Beats the "How"

When two answers describe the same general idea but one explains the **purpose** and the other explains the **mechanism**, ISC2 usually wants the purpose.

| Question | Technical answer (avoid) | Purpose answer (choose) |
|---|---|---|
| "Why implement SoD?" | "To split admin accounts" | "To prevent fraud by dividing tasks" |
| "Purpose of encryption?" | "To use AES-256 on data" | "To protect confidentiality of data" |
| "Why patch management?" | "To install vendor updates" | "To reduce vulnerabilities in systems" |

---

### Rule 9: Governance Hierarchy — Know Who Creates What

This gets tested constantly. Burn this into memory:

| Document | Created by | Compliance | Penalties |
|---|---|---|---|
| **Regulation** | Government/authorities | Mandatory | Legal/financial penalties |
| **Policy** | Senior management | Mandatory internally | Disciplinary action |
| **Standard** | Professional/governing bodies | Mandatory | Varies |
| **Guideline** | Advisory bodies | **Optional** | None |
| **Procedure** | Operations/IT staff | Mandatory internally | Disciplinary action |

**Trap question pattern:** "Which is optional?" → Guidelines. Always guidelines.

---

### Rule 10: Think "Manager Reviewing a Report," Not "Tech Fixing a Problem"

The ISC2 exam persona is someone who:

- Receives reports, not runs scans
- Approves budgets, not configures firewalls
- Asks "what is the business risk?" not "what is the CVE?"
- Chooses between risk treatments (accept/transfer/mitigate/avoid), not between tools
- Cares about **compliance, governance, and organisational alignment**

When you read a question, mentally ask: *"If I were the CISO reading this in an email from my team, which answer would I choose?"*

---

## Red Flag Answer Patterns — Almost Always Wrong

These answer patterns are **nearly always incorrect** on the ISC2 CC:

| Red flag | Why it's wrong |
|---|---|
| "Immediately implement..." | ISC2 wants assessment before action |
| "Eliminate all risk" | Risk can never be fully eliminated |
| "Grant full access for convenience" | Violates least privilege |
| "The IT department alone should..." | Security is everyone's responsibility |
| "Ignore/accept without analysis" | Risk acceptance requires informed analysis |
| "Technology X solves the problem completely" | No single control is sufficient (defence in depth) |
| Any answer that is **extreme** or **absolute** | ISC2 prefers balanced, proportionate responses |

---

## Green Flag Answer Patterns — Usually Correct

| Green flag | Why it's correct |
|---|---|
| "Conduct a risk assessment" | Assessment precedes all action |
| "Align with business objectives" | Security serves the business |
| "Apply the principle of least privilege" | Foundational access control principle |
| "Implement multiple layers of control" | Defence in depth |
| "Review and update policies regularly" | Adaptive security governance |
| "Ensure separation of duties" | Fraud/error prevention |
| "Integrate with the organisation's security policy" | Governance alignment |
| Answers containing "FIRST... assess/identify/contain" | Correct incident/risk sequence |

---

## The 5-Second Decision Tiebreaker

When you're stuck between two answers on exam day:

1. **Which answer is more abstract/governance-level?** → Pick that one
2. **Which answer a CISO would choose in a board meeting?** → Pick that one
3. **Which answer addresses the root cause, not the symptom?** → Pick that one
4. **Which answer uses words like "policy," "risk," "assess," "align"?** → Pick that one
5. **Still stuck?** → Pick the answer that is **more cautious and process-oriented**

---

*Remember: ISC2 is testing whether you think like a security professional, not whether you can configure a firewall. The exam rewards judgement, not trivia.*
