# ISC2 CC — Tricky Distinctions That Cost People the Exam

> [!warning] Purpose
> These are the confusable pairs and near-synonyms that cause wrong answers under time pressure. If you can nail every distinction below without hesitation, you eliminate the most common trap questions on the CC exam.

---

## 1. BCP vs DRP

| | Business Continuity Plan (BCP) | Disaster Recovery Plan (DRP) |
|---|---|---|
| **Scope** | Entire organisation — all critical business functions | IT systems and data specifically |
| **Goal** | **Maintain** operations during a disruption | **Restore** IT operations after a disruption |
| **Timeframe** | During and immediately after the event | After containment, focused on getting back to normal |
| **Relationship** | Parent plan — DRP is a subset of BCP | Child plan — technical component of BCP |
| **Exam trigger** | "keep the business running" | "restore systems to last known good state" |

**Trap:** "What is the PRIMARY goal of a DRP?" — The answer is **restore**, not **maintain**. "Maintain" = BCP.

---

## 2. RTO vs RPO vs MTD

| | RTO | RPO | MTD |
|---|---|---|---|
| **Full name** | Recovery Time Objective | Recovery Point Objective | Maximum Tolerable Downtime |
| **Question it answers** | "How fast must we recover?" | "How much data can we lose?" | "How long can we be down before it's catastrophic?" |
| **Measured in** | Time (hours/minutes) | Time (hours/minutes) — but represents data loss | Time (hours/days) |
| **Relationship** | RTO must be < MTD | RPO drives backup frequency | The absolute ceiling — exceeded = unacceptable harm |
| **Example** | RTO = 4 hours (systems back in 4h) | RPO = 1 hour (backup every hour) | MTD = 8 hours (beyond 8h, business fails) |

**Trap:** RPO is measured in time but represents **data**, not downtime. "RPO of 4 hours" means you can afford to lose up to 4 hours of data, so backups must run at least every 4 hours.

---

## 3. IDS vs IPS

| | IDS | IPS |
|---|---|---|
| **Function** | **Detects** and **alerts** | **Detects** and **blocks/prevents** |
| **Action** | Passive — notifies admin | Active — drops/rejects malicious traffic |
| **Placement** | Monitors a copy of traffic (span/mirror port) | Inline — sits in the traffic path |
| **Control type** | Detective | Preventive (and detective) |
| **Exam trigger** | "detect" / "alert" / "monitor" | "prevent" / "block" / "stop" |

**Trap:** If the question says "detect malicious activity" — answer is IDS. If it says "prevent" — answer is IPS. Read the verb carefully.

---

## 4. DAC vs MAC vs RBAC vs ABAC

| | DAC | MAC | RBAC | ABAC |
|---|---|---|---|---|
| **Who decides** | Object **owner** | **Central authority** (labels) | **Admin** assigns roles | **Policy engine** (attributes) |
| **Flexibility** | High (owner can share freely) | Low (rigid hierarchy) | Medium (role-based) | Highest (context-aware) |
| **Risk** | Trojan horse / propagation | Inflexibility, administrative burden | Role explosion | Policy complexity |
| **Use case** | Standard OS file systems | Military/classified environments | Enterprise workforce | Cloud, dynamic environments |
| **Exam trigger** | "owner controls access" | "labels" / "clearance" / "classified" | "based on job role" | "time of day" / "location" / "context" |

---

## 5. Authentication vs Authorisation vs Accounting

| | Authentication | Authorisation | Accounting |
|---|---|---|---|
| **Question** | "Who are you?" | "What can you do?" | "What did you do?" |
| **Order** | First | Second | Third |
| **Mechanism** | Password, biometric, token | ACLs, permissions, roles | Audit logs, SIEM |
| **Exam trigger** | "verify identity" / "prove who they are" | "grant access" / "permissions" | "track" / "record" / "log" |

**Trap:** "Ensuring users are who they claim to be" = Authentication. NOT authorisation.

---

## 6. Symmetric vs Asymmetric Encryption

| | Symmetric | Asymmetric |
|---|---|---|
| **Keys** | One shared key | Key pair (public + private) |
| **Speed** | Fast | Slow |
| **Use case** | Bulk data encryption, session keys | Key exchange, digital signatures, small data |
| **Examples** | AES, DES, 3DES, Blowfish | RSA, ECC, Diffie-Hellman |
| **Key problem** | Key distribution (how to share securely?) | Computationally expensive |
| **Exam trigger** | "session key" / "same key" / "shared secret" | "key pair" / "digital signature" / "public key" |

**Trap:** TLS uses **both** — asymmetric for the handshake/key exchange, then symmetric for the session. If asked what encrypts the bulk data → symmetric.

---

## 7. Threat vs Vulnerability vs Risk

| | Threat | Vulnerability | Risk |
|---|---|---|---|
| **Definition** | Something that **could** cause harm | A weakness that can be **exploited** | The **probability and impact** of a threat exploiting a vulnerability |
| **Formula** | — | — | Risk = Threat × Vulnerability × Impact (conceptual) |
| **Example** | Hacker, earthquake, malware | Unpatched server, weak password | Likelihood of hacker exploiting unpatched server × business impact |
| **You control** | No (threats exist externally) | Yes (patch, harden, configure) | Yes (by reducing vulnerability or impact) |

---

## 8. Risk Treatments — Accept vs Avoid vs Transfer vs Mitigate

| Treatment | What you do | Example | Exam trigger |
|---|---|---|---|
| **Accept/Tolerate** | Acknowledge it, do nothing more | "The cost of control exceeds the potential loss" | "informed decision to live with the risk" |
| **Avoid** | Stop the activity entirely | "We won't offer that service" | "eliminate the risk-creating activity" |
| **Transfer/Share** | Shift financial burden to third party | Insurance, outsourcing, contracts | "insurance" / "third party" / "contractual" |
| **Mitigate/Reduce** | Implement controls to lower likelihood or impact | Firewall, patching, training | "implement controls" / "reduce" |

**Trap:** Risk transfer does NOT eliminate the risk — it shifts the **financial consequence**. The underlying risk still exists.

---

## 9. Policy vs Standard vs Guideline vs Procedure

| | Policy | Standard | Guideline | Procedure |
|---|---|---|---|---|
| **What** | High-level intent (what and why) | Specific mandatory requirements | Recommendations | Step-by-step instructions (how) |
| **Compliance** | Mandatory | Mandatory | **Optional** | Mandatory |
| **Created by** | Senior management | IT/security teams | Advisory bodies | Operations staff |
| **Example** | "All data must be encrypted" | "Use AES-256 for encryption" | "Consider using full-disk encryption" | "Step 1: Open BitLocker. Step 2: Select drive..." |

**Trap:** Guidelines are the ONLY optional item in the hierarchy. Standards, policies, and procedures are all mandatory.

---

## 10. Regulation vs Policy

| | Regulation | Policy |
|---|---|---|
| **Created by** | Government/national authorities | Organisation's senior management |
| **Scope** | Legal jurisdiction | Internal to the organisation |
| **Penalties** | Legal/financial penalties (fines, prosecution) | Disciplinary action (termination, reprimand) |
| **Examples** | GDPR, HIPAA, SOX, PCI-DSS | "Acceptable Use Policy," "Password Policy" |

---

## 11. Hot Site vs Warm Site vs Cold Site

| | Hot | Warm | Cold |
|---|---|---|---|
| **Ready time** | Minutes (immediate failover) | Hours to days | Days to weeks |
| **Equipment** | Fully installed, live data sync | Partially equipped, periodic sync | Empty shell — power, HVAC, connectivity only |
| **Cost** | Highest | Medium | Lowest |
| **Exam trigger** | "immediate" / "real-time" | "hours" / "partially equipped" | "days to weeks" / "no equipment" |

---

## 12. Phishing Family

| Attack | Vector | Target |
|---|---|---|
| **Phishing** | Email | Broad / anyone |
| **Spear phishing** | Email | Specific individual |
| **Whaling** | Email | Senior executives ("big fish") |
| **Vishing** | Voice/phone call (fraudulent IVR) | Anyone (via phone) |
| **Smishing** | SMS/text message | Anyone (via text) |
| **Pharming** | DNS corruption/poisoning | Anyone visiting the poisoned domain |

**Trap:** Pharming is NOT a phishing variant — it corrupts **infrastructure** (DNS), not messages. All others involve direct communication with the victim.

---

## 13. Preventive vs Detective vs Corrective Controls

| Type | When it acts | Purpose | Examples |
|---|---|---|---|
| **Preventive** | Before the incident | Stop it from happening | Firewall, locks, encryption, training, access controls |
| **Detective** | During/after the incident | Discover that it happened | IDS, SIEM, audit logs, security cameras, smoke detectors |
| **Corrective** | After the incident | Fix and restore | Patching, incident response, backup restoration |

**Trap:** A **firewall** is preventive. An **IDS** is detective. An **IPS** is preventive (because it blocks). **Audit** is detective. **Backup generator** is compensating/recovery.

---

## 14. Physical vs Technical vs Administrative Controls

| Category | Nature | Examples |
|---|---|---|
| **Physical** | Tangible, real-world | Locks, fences, guards, cameras, bollards, mantraps |
| **Technical/Logical** | Hardware/software | Firewalls, IDS, encryption, ACLs, MFA |
| **Administrative** | People/process/policy | Training, background checks, SoD, policies, procedures |

**Trap:** A biometric reader **at a door** = physical control. Biometric authentication **on a laptop login** = technical/logical control. Context matters.

---

## 15. SLE / ARO / ALE (Quantitative Risk)

| Term | Formula | Meaning |
|---|---|---|
| **SLE** (Single Loss Expectancy) | Asset Value × Exposure Factor | Cost of ONE incident |
| **ARO** (Annual Rate of Occurrence) | Historical data / estimates | How many times per year |
| **ALE** (Annual Loss Expectancy) | SLE × ARO | Expected yearly loss |

**Example:** Server worth $100,000. Fire destroys 40% (EF=0.4). SLE = $40,000. Fires happen once every 10 years (ARO=0.1). ALE = $40,000 × 0.1 = **$4,000/year**.

If a control costs less than $4,000/year to implement, it's cost-justified.

---

## 16. Identification vs Authentication vs Authorisation

| Step | Action | Example |
|---|---|---|
| **Identification** | Claiming an identity | Typing your username |
| **Authentication** | Proving that identity | Entering your password + OTP |
| **Authorisation** | Being granted access based on proven identity | System checks your role, grants file access |

**Order is always:** Identification → Authentication → Authorisation → Accounting

---

## 17. Need-to-Know vs Least Privilege

| | Need-to-Know | Least Privilege |
|---|---|---|
| **Focus** | **Data/information** access | **System permissions/rights** |
| **Principle** | Only access information required for your task | Only granted minimum permissions for your role |
| **Overlap** | High — they reinforce each other | High — but scoped differently |
| **Exam trigger** | "access to classified information" | "permissions" / "admin rights" / "access rights" |

---

*Print this. Read it the night before. Read it the morning of. These distinctions are where exam points live and die.*
