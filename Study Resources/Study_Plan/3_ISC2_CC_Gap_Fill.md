# ISC2 CC — Gap-Fill: Topics Not Yet Covered

> [!info] What This Is
> Cross-referenced the community tip list against your existing four deliverables (Q Bank, Manager Mindset, Tricky Distinctions, Cheat Sheet). Everything below represents **gaps** — topics that were missing or insufficiently covered. Read this BEFORE running the quiz simulator.

---

## Table of Contents

- [[#1 IAAA Framework]]
- [[#2 Attacks Mapped to CIA Triad]]
- [[#3 Cryptography Fundamentals]]
- [[#4 PHI and Regulatory Detail]]
- [[#5 NIDS vs HIDS and SOAR and CASB]]
- [[#6 Microsegmentation and IoT Isolation]]
- [[#7 IPv4 vs IPv6]]
- [[#8 OSI Model — Full Detail with Data Units]]
- [[#9 TCP IP Model]]
- [[#10 Hardening Configuration Management and Change Management]]
- [[#11 AUP Password Policy and BYOD Detail]]
- [[#12 Data Lifecycle Destruction and Retention]]
- [[#13 Data Classification vs Labelling]]
- [[#14 Cloud Characteristics and MSP]]
- [[#15 MOU vs MOA vs SLA]]
- [[#16 Backup Types — Full Differential Incremental]]
- [[#17 Redundancy]]
- [[#18 Environmental vs Natural vs Manmade Threats]]

---

## 1. IAAA Framework

Your existing materials cover AAA. The exam also tests the **four-step IAAA** model:

| Step | Question It Answers | Example |
|---|---|---|
| **Identification** | "Who do you claim to be?" | Typing a username, presenting a badge |
| **Authentication** | "Prove it." | Password, fingerprint, OTP |
| **Authorisation** | "What are you allowed to do?" | ACLs, RBAC permissions check |
| **Accountability** | "What did you do?" | Audit logs, SIEM, session recording |

The order is always: **I → A → A → A**. You cannot authenticate without first identifying. You cannot authorise without authenticating. Accountability tracks everything after access is granted.

> [!warning] Exam Trap
> "Which step comes FIRST?" — The answer is always **Identification**, not Authentication. A user must claim an identity before proving it.

---

## 2. Attacks Mapped to CIA Triad

This is a high-frequency exam pattern: "Which element of the CIA triad does this attack compromise?"

### Attacks on Confidentiality (unauthorised disclosure)

| Attack | How It Compromises Confidentiality |
|---|---|
| Eavesdropping / Sniffing | Intercepting data in transit |
| Man-in-the-Middle (MitM) | Intercepting and reading communications |
| Shoulder surfing | Visually observing credentials |
| Social engineering (phishing, vishing, etc.) | Tricking users into disclosing information |
| Data breach / exfiltration | Stealing stored data |
| Dumpster diving | Recovering discarded sensitive documents |

**Controls:** Encryption, access controls, data masking, clean desk policy, shredding

### Attacks on Integrity (unauthorised modification)

| Attack | How It Compromises Integrity |
|---|---|
| MitM (modification variant) | Altering data in transit |
| SQL injection | Modifying database content |
| Malware / Trojans | Modifying files or system configuration |
| Salami attack | Making small, undetectable changes over time |
| Replay attack | Resending captured legitimate data to cause unauthorised actions |

**Controls:** Hashing, digital signatures, version control, input validation, code signing

### Attacks on Availability (denying access)

| Attack | How It Compromises Availability |
|---|---|
| DoS / DDoS | Overwhelming resources so legitimate users can't access |
| Ransomware | Encrypting files so users can't access them |
| Physical destruction | Fire, flood, sabotage |
| SYN flood | Exhausting TCP connection table |

**Controls:** Redundancy, load balancing, DDoS mitigation, backups, failover sites, UPS/generators

> [!tip] Exam Shortcut
> If the attack **reads** data → Confidentiality. If it **changes** data → Integrity. If it **blocks** data → Availability. Some attacks hit multiple (MitM can hit C and I, ransomware hits A and sometimes C).

---

## 3. Cryptography Fundamentals

### Plaintext vs Ciphertext

| Term | Definition |
|---|---|
| **Plaintext** | Readable, unencrypted data (the original message) |
| **Ciphertext** | Encrypted, unreadable data (the output of encryption) |

Encryption: Plaintext + Key → Ciphertext
Decryption: Ciphertext + Key → Plaintext

### Hashing

- Produces a **fixed-length digest** (hash) from any input
- **One-way** — cannot reverse a hash back to original data
- **Deterministic** — same input always produces same hash
- **Any change** to input produces a completely different hash (avalanche effect)
- Used for: integrity verification, password storage, digital signatures
- Common algorithms: MD5 (broken, don't use), SHA-1 (deprecated), **SHA-256** (current standard)
- Hashing is NOT encryption — it cannot be decrypted

### Digital Signatures

A digital signature provides **three things**:
1. **Authentication** — proves who sent the message
2. **Integrity** — proves the message wasn't altered
3. **Non-repudiation** — sender cannot deny sending it

**How it works:**
1. Sender hashes the message → produces digest
2. Sender encrypts the digest with their **private key** → this is the digital signature
3. Receiver decrypts the signature with sender's **public key** → recovers the digest
4. Receiver hashes the received message independently → compares digests
5. If digests match → message is authentic and unaltered

> [!warning] Key Distinction
> **Encryption** = public key encrypts, private key decrypts (confidentiality)
> **Digital signature** = private key signs, public key verifies (authentication/integrity/non-repudiation)

### Public Key vs Private Key

| Key | Who has it | Used for |
|---|---|---|
| **Public key** | Anyone — shared freely | Encrypt data TO the owner, verify signatures FROM the owner |
| **Private key** | Owner ONLY — never shared | Decrypt data sent to owner, create digital signatures |

**Exam rule:** If the question mentions **confidentiality** → encrypt with recipient's public key. If it mentions **non-repudiation or authentication** → sign with sender's private key.

---

## 4. PHI and Regulatory Detail

### PHI — Protected Health Information

- PHI is a **subset** of PII specific to **healthcare**
- Includes: medical records, diagnosis, treatment information, health insurance data, any data that can identify an individual AND relates to their health
- Protected by **HIPAA** (Health Insurance Portability and Accountability Act) in the US
- HIPAA applies to: healthcare providers, health plans, healthcare clearinghouses, and their business associates

### Regulatory Quick Reference

| Regulation | Region | Protects | Key Requirement |
|---|---|---|---|
| **GDPR** | EU/EEA | PII of EU residents | Data minimisation, right to erasure, consent, breach notification within 72 hours |
| **HIPAA** | US | PHI | Privacy Rule, Security Rule, Breach Notification Rule |
| **PCI-DSS** | Global | Cardholder data | 12 requirements for handling payment card data |
| **SOX** | US | Financial reporting data | Internal controls over financial reporting |
| **FISMA** | US | Federal government systems | Risk-based approach to securing federal IT systems |

---

## 5. NIDS vs HIDS, and SOAR, and CASB

### NIDS vs HIDS

| | NIDS (Network-based IDS) | HIDS (Host-based IDS) |
|---|---|---|
| **Monitors** | Network traffic (packets on the wire) | Activity on a single host (file changes, logs, processes) |
| **Placement** | Network tap or span port | Installed as agent on individual host |
| **Visibility** | All traffic on the network segment | Deep visibility into one system |
| **Encrypted traffic** | Cannot inspect (unless TLS termination) | Can inspect — sees data after decryption |
| **Example tools** | Snort, Suricata, Zeek | OSSEC, Tripwire |
| **Exam trigger** | "monitor network traffic" | "monitor file integrity" / "host-level changes" |

### SOAR — Security Orchestration, Automation, and Response

- **What it does:** Automates incident response workflows, integrates multiple security tools, executes playbooks automatically
- **Relationship to SIEM:** SIEM **detects** → SOAR **responds**. SOAR acts on SIEM alerts.
- **Key benefit:** Reduces response time by automating repetitive tasks (blocking IPs, isolating hosts, creating tickets)
- **Exam trigger:** "automate incident response" / "orchestrate security tools"

### CASB — Cloud Access Security Broker

- **What it does:** Acts as a gatekeeper between an organisation's users and cloud service providers
- **Functions:** Visibility into cloud usage, compliance enforcement, data loss prevention, threat protection
- **Placement:** Between the user and the cloud (inline proxy or API-based)
- **Exam trigger:** "enforce security policy for cloud services" / "shadow IT visibility"

---

## 6. Microsegmentation and IoT Isolation

### Microsegmentation

- Takes network segmentation to a **granular level** — applies security policies to individual workloads or applications, not just network segments
- Core component of **Zero Trust Architecture**
- Traditional segmentation = VLANs and firewall zones
- Microsegmentation = software-defined policies at the workload level
- **Benefit:** Even if an attacker breaches one workload, they cannot move laterally to adjacent workloads in the same segment

### IoT Device Isolation

- IoT devices (cameras, sensors, smart thermostats, medical devices) often:
  - Cannot be patched or updated
  - Run outdated/insecure firmware
  - Have weak or default credentials
  - Lack encryption capability
- **Best practice:** Place IoT devices on a **separate, isolated VLAN** or network segment
- Apply strict firewall rules — only allow necessary traffic to/from IoT segment
- Monitor IoT traffic for anomalies
- **Exam trigger:** "how to secure IoT devices on the network" → **isolate/segment them**

---

## 7. IPv4 vs IPv6

| | IPv4 | IPv6 |
|---|---|---|
| **Address size** | 32 bits | 128 bits |
| **Format** | Dotted decimal (192.168.1.1) | Hexadecimal with colons (2001:0db8::1) |
| **Address space** | ~4.3 billion addresses | 340 undecillion (virtually unlimited) |
| **NAT** | Commonly used (to conserve addresses) | Not needed (enough addresses) |
| **IPSec** | Optional | Built-in (but not always enforced) |
| **Auto-configuration** | DHCP | SLAAC (Stateless Address Auto-Configuration) + DHCPv6 |
| **Security concern** | Well-understood, mature firewall rules | Misconfiguration risk, dual-stack complexity, immature firewall support |

> [!warning] Exam Focus
> The primary IPv6 security concern is **misconfiguration**, not the protocol itself. Dual-stack environments (running both v4 and v6) create unexpected attack paths if IPv6 isn't properly firewalled.

---

## 8. OSI Model — Full Detail with Data Units

**Mnemonic (top-down):** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing

| Layer | Name | Data Unit | Function | Protocols/Devices |
|---|---|---|---|---|
| 7 | **Application** | Data | User interface, network services | HTTP, HTTPS, FTP, SMTP, DNS, SNMP, SSH, Telnet, LDAP |
| 6 | **Presentation** | Data | Encryption, compression, formatting, character encoding | SSL/TLS (encryption), JPEG, ASCII, MPEG |
| 5 | **Session** | Data | Establish, manage, terminate sessions | NetBIOS, RPC, PPTP |
| 4 | **Transport** | **Segments** (TCP) / **Datagrams** (UDP) | End-to-end delivery, flow control, error recovery | TCP, UDP |
| 3 | **Network** | **Packets** | Routing, logical addressing (IP) | IP, ICMP, IGMP, IPSec; **Routers** |
| 2 | **Data Link** | **Frames** | Physical addressing (MAC), error detection | Ethernet, Wi-Fi (802.11), ARP; **Switches, Bridges** |
| 1 | **Physical** | **Bits** | Raw electrical/optical signal transmission | Cables, hubs, repeaters, connectors |

### Must-Know Data Unit Names

```
Layer 7-5: Data
Layer 4:   Segments (TCP) / Datagrams (UDP)
Layer 3:   Packets
Layer 2:   Frames
Layer 1:   Bits
```

### Security Device Placement in OSI

| Device | Primary Layer(s) |
|---|---|
| Packet filtering firewall | Layer 3–4 |
| Stateful inspection firewall | Layer 3–4 |
| Proxy firewall | Layer 7 |
| NGFW | Layer 3–7 |
| IDS/IPS (with DPI) | Layer 7 |
| Switch | Layer 2 |
| Router | Layer 3 |
| Hub | Layer 1 |

---

## 9. TCP/IP Model

The TCP/IP model is a **4-layer** simplified version of the OSI model:

| TCP/IP Layer | OSI Equivalent | Protocols |
|---|---|---|
| **Application** | Layers 7, 6, 5 | HTTP, FTP, SMTP, DNS, SSH |
| **Transport** | Layer 4 | TCP, UDP |
| **Internet** | Layer 3 | IP, ICMP, ARP |
| **Network Access** (Link) | Layers 2, 1 | Ethernet, Wi-Fi, physical media |

> [!tip] Exam Note
> The CC exam primarily tests the OSI model, but may reference TCP/IP. Know that TCP/IP collapses OSI Layers 5–7 into one "Application" layer and Layers 1–2 into "Network Access."

---

## 10. Hardening, Configuration Management, and Change Management

### System Hardening

Reducing the attack surface by removing unnecessary components and securing what remains:

- **Patch** the operating system and all applications
- **Disable** unnecessary services, ports, and protocols
- **Remove** default accounts and change default passwords
- **Apply** security configuration baselines (CIS Benchmarks, DISA STIGs)
- **Enable** host-based firewall
- **Install** endpoint protection (AV/EDR)
- **Restrict** administrative access
- **Enable** audit logging

### Configuration Management

Maintaining a documented, approved state for all systems:

- **Baseline configuration:** The approved, documented security state for a system
- **Configuration items:** Any component under configuration management control
- **Configuration change control:** Process to approve changes to baselines
- **Verification and audit:** Regular checks that systems match their approved baseline
- **Benefit:** Detect drift (unauthorised changes) and maintain consistency

### Change Management — Components

| Component | Purpose |
|---|---|
| **Request for Change (RFC)** | Formal proposal documenting the requested change |
| **Impact assessment** | Analyse what the change will affect (systems, users, security) |
| **Approval** | Change Advisory Board (CAB) or designated authority reviews and approves |
| **Testing** | Validate the change in a non-production environment |
| **Implementation** | Execute the change in production during approved window |
| **Documentation** | Record what was changed, when, by whom |
| **Rollback plan** | Pre-defined procedure to undo the change if it fails |
| **Post-implementation review** | Verify the change achieved its objective without side effects |

> [!warning] Exam Focus
> The exam loves the **rollback** component. Every change MUST have a documented rollback plan before implementation.

---

## 11. AUP, Password Policy, and BYOD Detail

### AUP — Acceptable Use Policy

- Defines **what users are and are not permitted to do** with organisational IT resources
- Covers: internet use, email use, software installation, personal device use, data handling
- Signed by all users (employees, contractors, temps) as a condition of access
- Violation = disciplinary action
- **Exam trigger:** "what policy governs how employees use company systems?" → AUP

### Password Policy

Common requirements defined in a password policy:

| Element | Example |
|---|---|
| Minimum length | 12+ characters |
| Complexity | Uppercase, lowercase, numbers, special characters |
| Expiration | Every 90 days (though NIST 800-63 now recommends against forced rotation unless compromise is suspected) |
| History | Cannot reuse last 10 passwords |
| Lockout | Account locked after 5 failed attempts |
| MFA | Required for privileged accounts and remote access |

### BYOD — Bring Your Own Device (Detail)

Key BYOD security considerations:

- **MDM** (Mobile Device Management): Enforce security policies on personal devices — remote wipe, encryption, PIN lock
- **Containerisation:** Separate corporate data from personal data on the device
- **Network segmentation:** Place BYOD devices on a separate VLAN from production systems
- **AUP for BYOD:** Users sign a specific agreement covering monitoring, data wiping, and acceptable use
- **Risk:** Unpatched personal devices, data leakage, lost/stolen devices, malware from personal app stores

---

## 12. Data Lifecycle, Destruction, and Retention

### Data Lifecycle (6 Stages)

```
Create → Store → Use → Share → Archive → Destroy
```

| Stage | Security Consideration |
|---|---|
| **Create** | Classify and label at creation. Apply appropriate controls. |
| **Store** | Encrypt at rest. Apply access controls. Backup. |
| **Use** | Apply least privilege. Monitor access. |
| **Share** | Encrypt in transit. Apply DLP. Verify recipient authorisation. |
| **Archive** | Move to long-term storage. Maintain integrity and access controls. |
| **Destroy** | Use approved destruction methods. Verify completeness. |

### Data Destruction Methods

| Method | Media Type | Description |
|---|---|---|
| **Overwriting** | HDDs, tapes | Write random data over existing data (multiple passes) |
| **Degaussing** | Magnetic media (HDDs, tapes) | Strong magnetic field destroys data by randomising magnetic domains. **Does NOT work on SSDs.** |
| **Crypto-shredding** | Encrypted media | Destroy the encryption key, rendering data unrecoverable |
| **Physical destruction** | All media | Shredding, incineration, pulverisation, drilling |
| **Secure erase** | SSDs | Manufacturer-specific command to reset all cells |

> [!warning] Exam Trap
> **Degaussing does NOT work on SSDs** (solid state drives use flash memory, not magnetic media). For SSDs, use crypto-shredding, secure erase, or physical destruction.

### Data Retention

- Defines **how long** data must be kept before it can be destroyed
- Driven by: legal/regulatory requirements, business needs, contractual obligations
- **Retention schedule:** Document listing data types and their mandatory retention periods
- Retaining data longer than required **increases risk** (more data to breach) and **increases cost** (storage)
- Data minimisation principle: don't keep what you don't need

---

## 13. Data Classification vs Labelling

| | Classification | Labelling |
|---|---|---|
| **What it is** | Assigning a sensitivity level based on the data's value and impact of disclosure | Physically or digitally marking the data with its classification |
| **Who does it** | **Data owner** (senior management responsible for the data) | System administrators, data custodians, automated tools |
| **When** | At creation, and reviewed when context changes | After classification is determined |
| **Examples** | "This document is Confidential" | Header/footer marking, metadata tag, colour-coded label |

### Common Classification Levels

| Government/Military | Commercial/Corporate |
|---|---|
| Top Secret | Restricted / Highly Confidential |
| Secret | Confidential |
| Confidential | Internal Use Only |
| Unclassified | Public |

> [!tip] Exam Note
> The **data owner** classifies. The **data custodian** implements technical controls (backup, encryption). The **data steward** manages data quality. The **data processor** processes data on behalf of the controller.

---

## 14. Cloud Characteristics and MSP

### NIST Essential Cloud Characteristics (5)

| Characteristic | Meaning |
|---|---|
| **On-demand self-service** | Provision resources without human interaction with provider |
| **Broad network access** | Available over the network via standard mechanisms (browser, API) |
| **Resource pooling** | Provider's resources are shared (multi-tenant) and dynamically assigned |
| **Rapid elasticity** | Scale up or down automatically based on demand |
| **Measured service** | Usage is monitored, controlled, reported (pay-for-what-you-use) |

### MSP — Managed Service Provider

- A third-party company that **remotely manages** a customer's IT infrastructure or end-user systems
- Can include: network management, security monitoring (MSSP = Managed Security Service Provider), cloud management, helpdesk
- **Security concern:** The MSP has privileged access to your systems — supply chain risk
- The organisation **remains responsible** for security of its data even when using an MSP (you can outsource the task, not the accountability)

---

## 15. MOU vs MOA vs SLA

| | MOU | MOA | SLA |
|---|---|---|---|
| **Full name** | Memorandum of Understanding | Memorandum of Agreement | Service Level Agreement |
| **Formality** | Informal, non-binding | More formal than MOU, may be binding | Formal, legally binding contract |
| **Purpose** | Documents mutual understanding and intent between parties | Documents specific agreed-upon actions and responsibilities | Defines specific measurable service commitments |
| **Enforceable?** | Generally not legally enforceable | May be enforceable depending on jurisdiction | Yes — contractual obligations |
| **Example** | "We agree to share threat intelligence data" | "Agency A will provide 50 hours/month of analyst support to Agency B" | "99.9% uptime, 4-hour response time for Severity 1 incidents" |

> [!tip] Exam Shortcut
> MOU = intent ("we plan to cooperate"). MOA = commitment ("here's what we'll each do"). SLA = contract ("here's what you'll deliver, with penalties if not").

---

## 16. Backup Types — Full, Differential, Incremental

| Type | What It Backs Up | Restore Speed | Backup Speed | Storage Used |
|---|---|---|---|---|
| **Full** | Everything | Fastest (one set to restore) | Slowest | Most |
| **Differential** | Everything changed since **last full** backup | Medium (full + latest differential) | Medium (grows over time) | Medium |
| **Incremental** | Everything changed since **last backup of any type** | Slowest (full + every incremental since) | Fastest (smallest backup) | Least |

### How They Work — Example

Monday: **Full backup**
Tuesday: Files A, B change → Differential backs up A, B. Incremental backs up A, B.
Wednesday: Files C, D change → Differential backs up A, B, C, D (everything since Monday full). Incremental backs up only C, D (since Tuesday backup).
Thursday: File E changes → Differential backs up A, B, C, D, E. Incremental backs up only E.

### Restore Scenario

- **Full only:** Restore Monday's full → done
- **Full + Differential:** Restore Monday's full + Thursday's differential → done (2 restores)
- **Full + Incremental:** Restore Monday's full + Tuesday's incremental + Wednesday's incremental + Thursday's incremental → done (4 restores)

> [!warning] Exam Trap
> Differential = since last **full**. Incremental = since last **any** backup. Differential grows larger each day; incremental stays small but requires more restores.

---

## 17. Redundancy

Redundancy = eliminating single points of failure to ensure availability.

| Type | Method |
|---|---|
| **Data redundancy** | RAID arrays, replication, backups |
| **Server redundancy** | Failover clusters, load balancing |
| **Network redundancy** | Redundant links, dual ISPs, diverse routing |
| **Power redundancy** | UPS (Uninterruptible Power Supply), backup generators, dual power feeds |
| **Site redundancy** | Hot/warm/cold sites, geographically dispersed data centres |

### RAID Levels (Exam-Relevant)

| Level | Description | Min Disks | Fault Tolerance |
|---|---|---|---|
| **RAID 0** | Striping only (performance, NO redundancy) | 2 | None — one disk fails, all data lost |
| **RAID 1** | Mirroring (exact copy on second disk) | 2 | 1 disk failure |
| **RAID 5** | Striping with distributed parity | 3 | 1 disk failure |
| **RAID 6** | Striping with double parity | 4 | 2 disk failures |
| **RAID 10** | Mirror + stripe (RAID 1+0) | 4 | 1 disk per mirrored pair |

> [!warning] Exam Trap
> **RAID is not a backup.** RAID provides availability (survives disk failure) but does NOT protect against: accidental deletion, ransomware, corruption, or site-level disaster. You still need backups.

---

## 18. Environmental vs Natural vs Manmade Threats

| Category | Source | Examples |
|---|---|---|
| **Natural** | Acts of nature | Earthquake, flood, hurricane, tornado, wildfire, volcanic eruption, pandemic |
| **Environmental** | Conditions affecting the physical environment of equipment | HVAC failure, humidity, temperature extremes, water leaks, power fluctuations, static electricity |
| **Manmade** | Human action (intentional or accidental) | Sabotage, terrorism, arson, theft, accidental deletion, misconfiguration, social engineering, war |

> [!tip] Distinction
> **Natural** = you cannot prevent the event itself, only mitigate its impact (geographic diversity, flood barriers).
> **Environmental** = facility-level conditions you CAN control (HVAC monitoring, fire suppression, moisture sensors).
> **Manmade** = intentional (attacks, sabotage) or unintentional (human error, accidents). Address with controls both technical and administrative.

### Environmental Controls for Data Centres

| Control | Purpose |
|---|---|
| HVAC | Maintain temperature (18–27°C) and humidity (40–60%) |
| Fire suppression | Gas-based (FM-200, Novec) for electronic equipment — NOT water sprinklers |
| Water/moisture sensors | Detect leaks before equipment damage |
| UPS + Generator | Power continuity during outages |
| Hot/cold aisle containment | Efficient cooling, prevent equipment overheating |
| EMI shielding | Protect against electromagnetic interference |

> [!warning] Exam Detail
> For data centres: **gas-based fire suppression** (not water). Water damages equipment. FM-200 and Novec 1230 are the exam-expected answers for server room fire suppression.

---

*This document fills every gap between your existing study materials and the community tip list. Read it once now, then revisit any section that didn't feel instant-recall before running the quiz simulator.*
