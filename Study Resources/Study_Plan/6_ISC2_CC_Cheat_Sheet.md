# ISC2 CC — Day-Before-Exam Cheat Sheet

> **Instructions:** Read this the night before AND the morning of your exam. Everything here must be instant recall — no hesitation. If anything below makes you pause, that's your study target for tonight.

---

## CIA Triad — Know Cold

**Confidentiality** = prevent unauthorised disclosure → Encryption, access controls
**Integrity** = prevent unauthorised modification → Hashing, digital signatures
**Availability** = ensure access when needed → Redundancy, backups, failover

---

## ISC2 Code of Ethics — 4 Canons IN ORDER

1. **Protect society**, the common good, necessary public trust and confidence, and the infrastructure
2. **Act honourably**, honestly, justly, responsibly, and legally
3. **Provide diligent and competent service** to principals
4. **Advance and protect** the profession

Canon 1 ALWAYS wins when canons conflict.

---

## Governance Hierarchy

**Policy** (what/why, mandatory) → **Standard** (specific requirements, mandatory) → **Guideline** (recommendations, OPTIONAL) → **Procedure** (step-by-step how, mandatory)

**Regulations** = created by government = legal penalties
**Policies** = created by organisation = disciplinary action
Guidelines = the ONLY optional one

---

## Risk Formula

**Risk = Likelihood × Impact**
**ALE = SLE × ARO** (SLE = Asset Value × Exposure Factor)

---

## Risk Treatments — 4 Options

**Accept** = acknowledge, do nothing | **Avoid** = stop the activity | **Transfer** = insurance/contract | **Mitigate** = implement controls

---

## Authentication Factor Types

**Type 1** = Something you **know** (password, PIN)
**Type 2** = Something you **have** (smart card, token)
**Type 3** = Something you **are** (biometric)
2FA = two DIFFERENT types (password + fingerprint = yes; password + PIN = NO)

---

## Access Control Models

**DAC** = owner decides → Trojan horse risk
**MAC** = labels/central authority → military/classified
**RBAC** = role-based → enterprise
**ABAC** = attributes (time, location, device) → cloud/dynamic

---

## NIST Incident Response Phases

1. **Preparation**
2. **Detection and Analysis**
3. **Containment**, Eradication, and Recovery
4. **Post-Incident Activity** (Lessons Learned)

First action when breach detected = **CONTAIN** (isolate systems)

---

## Recovery Sites

**Hot** = immediate, fully equipped, most expensive
**Warm** = hours–days, partially equipped, medium cost
**Cold** = days–weeks, empty shell, cheapest

---

## RTO vs RPO vs MTD

**RPO** = max acceptable data loss (drives backup frequency)
**RTO** = max acceptable recovery time (must be < MTD)
**MTD** = absolute max downtime before catastrophe

---

## BCP vs DRP

**BCP** = maintain business operations (broad)
**DRP** = restore IT systems (technical subset of BCP)

---

## IDS vs IPS

**IDS** = detect + alert (passive, detective)
**IPS** = detect + block (inline, preventive)

---

## Key Ports — MUST KNOW

22=SSH | 23=Telnet | 25=SMTP | 53=DNS | 80=HTTP | 443=HTTPS | 3389=RDP | 389=LDAP | 636=LDAPS | 20/21=FTP | 161=SNMP

---

## OSI Model Layers (Security Relevant)

L3 (Network) = IP, ICMP, routers, packet filtering firewalls
L4 (Transport) = TCP/UDP, stateful firewalls
L7 (Application) = HTTP, SMTP, DNS, NGFW, IDS/IPS with DPI

---

## Encryption

**Symmetric** = same key both ways (AES, DES) → fast, bulk data
**Asymmetric** = key pair (RSA, ECC) → slow, key exchange, digital signatures
**TLS** = asymmetric handshake → symmetric session

---

## Control Categories

**Physical** = locks, fences, cameras, guards
**Technical/Logical** = firewalls, encryption, IDS, ACLs
**Administrative** = policies, training, background checks, SoD

---

## Control Types

**Preventive** = firewall, lock, encryption, training
**Detective** = IDS, SIEM, audit log, camera
**Corrective** = patching, IR, restore from backup
**Compensating** = backup generator, manual review
**Deterrent** = warning sign, security guard

---

## Social Engineering

**Phishing** = email | **Spear phishing** = targeted email | **Whaling** = exec email
**Vishing** = voice/phone | **Smishing** = SMS/text
**Pharming** = DNS corruption | **Tailgating** = following through door
**Pretexting** = fabricated scenario | **Quid pro quo** = benefit for info

---

## IRT Models

**Dedicated** = full-time staff | **Leveraged** = part-time, pulled from other roles | **Hybrid** = combination
"Pre-existing" is NOT a valid model (exam trap)

---

## Cloud Models

**IaaS** = you manage OS up | **PaaS** = you manage apps + data | **SaaS** = vendor manages everything
**Private** = one org | **Public** = everyone | **Community** = shared by similar orgs | **Hybrid** = mix

---

## Wireless Security (Strongest → Weakest)

**WPA3** > WPA2 > WPA > WEP (broken, never use)

---

## The Manager Mindset — 5 Second Rule

When stuck between two answers:
1. Which answer would a **CISO** choose? → Pick that one
2. Which is more about **policy/governance** than technology? → Pick that one
3. Which involves **assessing before acting**? → Pick that one
4. Which applies **least privilege**? → Pick that one
5. Which says "**integrate with organisational security policy**"? → Pick that one

---

## CAT Exam Reminders

- 100–125 questions, 2 hours, 700/1000 to pass
- **NO going back** — commit and move on
- ~25 questions are unscored beta items — treat ALL as scored
- Harder questions = algorithm thinks you're doing well = good sign
- Read for MOST, BEST, FIRST, PRIMARY, NOT, EXCEPT
- Eliminate 2 obviously wrong → 50/50 on the remainder
- Don't change your gut instinct mid-question

---

*You know this material. Trust your preparation. Think like a manager. You've got this.*
