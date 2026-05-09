# ISC2 Certified in Cybersecurity (CC) — Reconstructed Exam Q&A Bank

> **Purpose:** Educational exam preparation only. Compiled from publicly available community sources including ISC2 Community forums, Quizlet, Scribd documents, CareerEmployer practice tests, Docsity, GitHub study repos, InfoTechSite practice sets, and exam-experience reports (2024–2026). All answers include rationale grounded in ISC2 CC Study Guide concepts.
> **Exam Format (current as of March 2026):** Computer Adaptive Testing (CAT), effective October 1 2025. 100–125 questions. 2 hours. Pearson VUE test centres only (no online proctoring). No skipping or returning to questions. Passing score: 700/1000 scaled. ~25 questions are unscored beta/pre-test items — you cannot identify them, treat every question as scored. Exam fee: US$199 (free via ISC2 One Million Certified in Cybersecurity programme where eligible).
> **Current Exam Outline:** The five-domain outline below is current until **September 1, 2026**, when a revised outline takes effect with updated domain weights and new topics (Security Governance as standalone domain, cloud security, Zero Trust, threat intelligence, penetration testing concepts). If you are sitting the exam before September 1 2026, study the outline below.

---

## Table of Contents

- [[#Domain 1 Security Principles (26%)]]
- [[#Domain 2 BC DR and Incident Response (10%)]]
- [[#Domain 3 Access Controls Concepts (22%)]]
- [[#Domain 4 Network Security (24%)]]
- [[#Domain 5 Security Operations (18%)]]
- [[#High-Yield Concept Tables]]
- [[#CAT Exam Strategy Notes]]

---

## Domain 1: Security Principles (26%)

> [!info] Weight
> ~26 questions. Heaviest domain. Covers CIA triad, risk management, governance, ISC2 Code of Ethics, security controls classification, laws/regulations/policies, privacy, threat modelling, encryption fundamentals, security principles (least privilege, defence in depth, fail-safe, separation of duties, non-repudiation, zero trust).

---

### Q1
**In the context of security principles, which of the following BEST exemplifies the concept of least privilege?**

A. Granting every user admin rights to ensure ease of system access
B. Assigning permissions based on the minimum necessary for job functions
C. Implementing multi-factor authentication for all system users
D. Encrypting all data stored on the company's servers

> [!success] Answer: B
> Least privilege means users receive only the access rights strictly required for their role. Granting admin rights universally violates this. MFA and encryption are separate controls unrelated to privilege scoping.

---

### Q2
**Which of the following BEST describes the principle of 'defence in depth' in cybersecurity?**

A. Using a single, strong firewall to protect the network perimeter
B. Implementing multiple layers of security controls throughout an IT system
C. Focusing exclusively on external threats to strengthen network security
D. Deploying antivirus software on all endpoint devices

> [!success] Answer: B
> Defence in depth layers multiple independent controls so that if one fails, others still protect the asset. A single control point is a single point of failure.

---

### Q3
**What does the principle of 'fail-safe defaults' entail?**

A. Systems default to an open access state in case of failure
B. Systems default to a secure state, denying access when a failure occurs
C. Automatic backup of all system data during a security breach
D. Immediate shutdown of systems when a security breach is detected

> [!success] Answer: B
> Fail-safe defaults means that in the absence of a positive authorisation decision, access is denied. The system fails closed, not open.

---

### Q4
**Which of the following BEST describes 'non-repudiation' in information security?**

A. Users can deny their actions on a system
B. Data cannot be duplicated without authorisation
C. An entity cannot deny the authenticity of their signature on a document or message
D. All network communications are encrypted

> [!success] Answer: C
> Non-repudiation ensures that a sender or receiver cannot later deny having sent or received a message. Digital signatures are the primary technical mechanism. It is distinct from confidentiality and integrity.

---

### Q5
**In cybersecurity, what is meant by the term 'risk transference'?**

A. Eliminating all potential risks from a system
B. Shifting the responsibility for risk to a third party, such as through insurance
C. Reducing risk by implementing security controls
D. Ignoring risk in favour of operational efficiency

> [!success] Answer: B
> Risk transference (also called risk sharing) moves the financial burden of a risk to another party. Insurance and contractual indemnification are the most common mechanisms. Note: it does not eliminate the risk itself.

---

### Q6
**What is the primary focus of 'data sovereignty' in cybersecurity?**

A. The encryption standards used to secure data
B. The physical location where data is stored and its legal implications
C. The amount of data an organisation can store
D. The speed at which data can be accessed

> [!success] Answer: B
> Data sovereignty refers to the legal concept that data is subject to the laws of the jurisdiction in which it is stored. Critical for cloud deployments where data may cross borders.

---

### Q7
**Which concept is central to 'information security governance'?**

A. Ensuring all users have unrestricted access to information
B. Bypassing standard security protocols to speed up system performance
C. Aligning information security strategies with business objectives
D. Focusing solely on technical solutions to secure information

> [!success] Answer: C
> Governance aligns security with the organisation's mission, risk appetite, and business goals. It is a management-level concern, not purely technical.

---

### Q8
**Which principle underlies 'compartmentalisation' in securing information systems?**

A. Granting every user access to all system resources for transparency
B. Dividing system resources and information into distinct segments to limit access
C. Centralising all data storage for easier management and security
D. Removing all barriers to information flow within an organisation

> [!success] Answer: B
> Compartmentalisation limits the blast radius of a breach by ensuring a user or process with access to one segment cannot automatically access others. It is a core principle in classified environments.

---

### Q9
**'Separation of duties' is designed to:**

A. Concentrate all critical tasks within a single department for efficiency
B. Assign all security-related tasks to the IT department only
C. Prevent fraud and errors by dividing tasks among multiple individuals or groups
D. Ensure that all employees have the ability to perform each other's jobs

> [!success] Answer: C
> Separation of duties (SoD) requires that no single individual controls all steps of a critical process. It is a preventive administrative control that reduces insider threat risk.

---

### Q10
**What is the primary objective of a risk assessment procedure?**

A. To assign risk priorities to identified risks
B. To assess the potential impact of risks on the organisation
C. To implement controls and measures to reduce or eliminate risks
D. To provide a structured approach for conducting risk assessments

> [!success] Answer: D
> A risk assessment procedure is a structured methodology. Assigning priorities and assessing impact are outputs of the procedure, not its definition. ISC2 defines it as a process to identify, evaluate, and prioritise risks.

---

### Q11
**In risk management, what does the term 'impact' refer to?**

A. The actions taken to transfer or mitigate risks
B. The frequency of security-related events
C. The magnitude of harm resulting from the consequences of unauthorised disclosure, modification, destruction, or loss of information
D. The potential vulnerabilities in a system or process

> [!success] Answer: C
> Risk is commonly expressed as: Risk = Likelihood × Impact. Impact is the magnitude of harm or loss resulting from a threat exploiting a vulnerability. The ISC2 Study Guide defines it precisely as the magnitude of harm expected from consequences of unauthorised activity.

---

### Q12
**The concept of 'zero trust security' is based on which assumption?**

A. Trust is granted once and is valid for all network interactions
B. Trust is never assumed and must be continuously verified
C. Trust is only necessary for external connections
D. Trust is based solely on the physical location of access attempts

> [!success] Answer: B
> Zero Trust operates on "never trust, always verify." No user, device, or network segment is implicitly trusted even inside the perimeter. Continuous authentication and micro-segmentation are hallmarks.

---

### Q13
**What is the primary goal of 'data minimisation' in privacy and security practices?**

A. To collect as much data as possible for future analysis
B. To limit data collection to the minimum necessary for the intended purpose
C. To maximise the storage of data for regulatory compliance
D. To encrypt all collected data regardless of its sensitivity

> [!success] Answer: B
> Data minimisation is a privacy principle embedded in frameworks like GDPR. It reduces exposure and liability by not retaining data beyond what is operationally needed.

---

### Q14
**'Quantitative risk analysis' primarily involves:**

A. Estimating the impact of risks using descriptive language
B. Calculating the potential impact of risks using numerical data
C. Ignoring low-impact risks to focus on high-impact ones
D. Focusing solely on the qualitative aspects of security vulnerabilities

> [!success] Answer: B
> Quantitative analysis produces numbers: Single Loss Expectancy (SLE), Annual Rate of Occurrence (ARO), and Annual Loss Expectancy (ALE = SLE × ARO). Qualitative uses descriptive categories like High/Medium/Low.

---

### Q15
**What is the primary goal of 'threat modelling'?**

A. To design aesthetically pleasing security interfaces
B. To predict and prioritise potential threats to an IT system
C. To ensure compliance with international cybersecurity standards
D. To monitor network traffic in real-time for anomaly detection

> [!success] Answer: B
> Threat modelling (e.g., STRIDE, PASTA, DREAD) systematically identifies threats during design so controls can be built in rather than bolted on.

---

### Q16
**'Security convergence' refers to:**

A. The merging of physical and information security practices
B. The use of a single password across multiple systems
C. The consolidation of all security logs into one database
D. The alignment of security and business goals

> [!success] Answer: A
> Security convergence integrates physical security (guards, locks, CCTV) with logical/information security under unified governance. It eliminates gaps that exist when both are siloed.

---

### Q17
**Which principle advocates for security policies that adapt over time based on new insights and evolving threats?**

A. Static security policy
B. Adaptive security policy
C. Fixed security framework
D. Immutable security guidelines

> [!success] Answer: B
> An adaptive policy is reviewed and updated as the threat landscape changes. Security policies should never be treated as static documents.

---

### Q18
**Which ISC2 Code of Ethics canon requires members to protect society, the common good, and necessary public trust?**

A. Provide diligent and competent service to principals
B. Act honourably, honestly, justly, responsibly, and legally
C. Protect society, the common good, necessary public trust and confidence, and the infrastructure
D. Advance and protect the profession

> [!success] Answer: C
> The ISC2 Code of Ethics has four canons in priority order: (1) Protect society... (2) Act honourably... (3) Provide diligent and competent service... (4) Advance and protect the profession. Canon 1 always takes precedence.

---

### Q19
**What distinguishes 'policies' from 'procedures' in an organisational security context?**

A. Policies are technical, procedures are managerial
B. Policies state what must be done; procedures describe how to do it
C. Procedures are legally binding; policies are voluntary
D. There is no meaningful distinction

> [!success] Answer: B
> In the governance hierarchy: Policy (what/why) → Standard (specific requirements) → Guideline (recommendations) → Procedure (step-by-step how). ISC2 exams test this hierarchy frequently.

---

### Q20
**Which of the following is a PREVENTIVE security control?**

A. An intrusion detection system
B. A firewall
C. A security audit
D. A backup generator

> [!success] Answer: B
> A firewall is preventive — it blocks unauthorised traffic before a breach occurs. An IDS is detective. An audit is detective/corrective. A backup generator is a recovery/compensating control.

---

### Q21
**Which type of security control is a backup generator?**

A. Preventive
B. Detective
C. Compensating/Recovery
D. Corrective

> [!success] Answer: C
> A backup generator compensates for a power failure, maintaining availability. It does not prevent or detect threats.

---

### Q22
**In cybersecurity, 'asset classification and control' is crucial because:**

A. It ensures all users have equal access to information resources
B. It mandates the use of strong passwords for all system accounts
C. It helps identify and apply appropriate protections based on asset value
D. It requires the encryption of all data, regardless of sensitivity

> [!success] Answer: C
> Asset classification categorises information by sensitivity (e.g., public, internal, confidential, restricted) so appropriate controls can be applied proportionally to value and risk.

---

### Q23
**Which of the following BEST describes the concept of 'privacy'?**

A. Protecting personal information from unauthorised access or disclosure
B. Ensuring data is accurate and unchanged
C. Making sure data is always accessible when needed
D. All of the above

> [!success] Answer: A
> Privacy is specifically about protecting personal information (PII) from unauthorised disclosure. Accuracy (integrity) and availability are separate CIA triad properties.

---

### Q24
**A DevOps team has updated application source code and many unauthorised changes have been made. What is the BEST control to prevent recurrence?**

A. Backup
B. File labels
C. Security audit
D. Hashing

> [!success] Answer: D
> Hashing produces a fixed-length digest of file content. Any modification changes the hash, making unauthorised changes detectable. It ensures file integrity, directly addressing the problem of detecting unauthorised modifications.

---

### Q25
**What would a security professional use to ensure a specific control is working as expected?**

A. Security testing
B. Security assessment
C. Security audit
D. Security walkthrough

> [!success] Answer: A
> Security testing (e.g., penetration testing, control validation testing) actively verifies whether a control functions as intended. An assessment is broader. An audit measures compliance. A walkthrough is a tabletop exercise.

---

### Q26
**Communication between end systems is encrypted using a key, often known as a:**

A. Symmetric key
B. Private key
C. Asymmetric key
D. Public key

> [!success] Answer: A
> Symmetric encryption uses the same key for both encryption and decryption. It is efficient for bulk data encryption. Asymmetric encryption uses a key pair (public/private). The "session key" in TLS handshakes is symmetric.

---

### Q27
**Which of the following documents are created by governments or national authorities?**

A. Standards
B. Guidelines
C. Regulations
D. Policies

> [!success] Answer: C
> Regulations are created by governments or national agencies and frequently carry financial penalties for non-compliance. Standards are created by governing or professional bodies. Policies and procedures are internal organisational documents (see ISC2 Study Guide, Chapter 1, Module 4).

---

### Q28
**Which of the following is NOT a social engineering technique?**

A. Pretexting
B. Segregation
C. Quid pro quo
D. Tailgating

> [!success] Answer: B
> Segregation (as in separation/segregation of duties) is a security control, not a social engineering technique. Pretexting, quid pro quo, and tailgating are all recognised social engineering attack methods.

---

### Q29
**When a company hires an insurance company to mitigate the financial consequences of risk, which risk management technique is being applied?**

A. Risk transfer
B. Risk avoidance
C. Risk mitigation
D. Risk tolerance

> [!success] Answer: A
> Purchasing insurance is the textbook example of risk transfer (also called risk sharing). The financial burden of the risk is shifted to the insurance provider. Risk avoidance eliminates the activity. Risk mitigation reduces likelihood or impact. Risk tolerance (acceptance) acknowledges and retains the risk.

---

### Q30
**What is the PRIMARY purpose of the ISC2 Code of Ethics?**

A. To establish technical security standards
B. To guide the professional conduct of ISC2 members
C. To define penalties for cybersecurity breaches
D. To outline specific security technologies to use

> [!success] Answer: B
> The ISC2 Code of Ethics governs the professional behaviour and ethical obligations of all ISC2 certified members. Its four canons provide guidance for conduct, with "protect society" as the overriding priority.

---

### Q31
**Sensitivity is a measure of the:**

A. Pertinence assigned to information by its owner, or the purpose of representing its need for urgency
B. Protection and timeliness assigned to information by its owner, or the purpose of representing its need for urgency
C. Importance assigned to information by its owner, or the purpose of representing its need for protection
D. Availability and redundancy of information based on its storage location

> [!success] Answer: C
> Sensitivity measures the importance assigned to information by its owner for the purpose of denoting the need for protection. Higher sensitivity requires stricter controls.

---

### Q32
**Risk management is BEST defined as:**

A. The assessment of the potential impact of a threat
B. The identification, evaluation and prioritisation of risks
C. The impact and likelihood of a threat
D. The creation of an incident response team

> [!success] Answer: B
> Risk management is the systematic process of identifying, evaluating, and prioritising risks, followed by the coordinated application of resources to minimise, monitor, and control the probability or impact of adverse events.

---

### Q33
**Which regulations address data protection and privacy in Europe?**

A. FISMA
B. HIPAA
C. SOX
D. GDPR

> [!success] Answer: D
> GDPR (General Data Protection Regulation) is the EU's comprehensive data protection framework. FISMA applies to US federal agencies. HIPAA covers US healthcare data. SOX covers US financial reporting.

---

### Q34
**Which of the following is the THIRD canon of the ISC2 Code of Ethics?**

A. Protect society, the common good, necessary public trust and confidence, and the infrastructure
B. Act honourably, honestly, justly, responsibly, and legally
C. Provide diligent and competent service to principals
D. Advance and protect the profession

> [!success] Answer: C
> The canons in order: (1) Protect society... (2) Act honourably... (3) Provide diligent and competent service to principals... (4) Advance and protect the profession. The exam frequently tests the order.

---

## Domain 2: BC, DR and Incident Response (10%)

> [!info] Weight
> ~10 questions. Lightest domain. Focus: BIA, BCP vs DRP, RTO vs RPO vs MTD, incident response phases (NIST SP 800-61), hot/warm/cold sites, tabletop exercises, IRT models.

---

### Q35
**What is the PRIMARY goal of conducting a Business Impact Analysis (BIA)?**

A. To identify and prioritise the organisation's risks
B. To determine the impact of disruptions on business operations
C. To assess the organisation's compliance with legal requirements
D. To evaluate the effectiveness of current security measures

> [!success] Answer: B
> The BIA identifies critical business functions and quantifies the impact of their disruption. Outputs include MTD (Maximum Tolerable Downtime), RTO, and RPO values that drive BCP and DRP design.

---

### Q36
**During an incident response, which step should be taken FIRST when a breach is detected?**

A. Begin data recovery procedures immediately
B. Notify external authorities and stakeholders
C. Isolate affected systems to prevent further compromise
D. Conduct a post-incident review to identify lessons learned

> [!success] Answer: C
> The first priority upon detecting a breach is containment — isolating affected systems to stop the spread. Notification and post-incident review come later in the process. Acting without containment allows the attacker to persist.

---

### Q37
**What is the PRIMARY purpose of an off-site data backup?**

A. To facilitate rapid access to data in case of a system failure
B. To comply with industry regulations regarding data preservation
C. To ensure data availability in the event of a geographical disaster
D. To reduce the overall cost of the disaster recovery process

> [!success] Answer: C
> Off-site backup is a geographic redundancy control. If a disaster (fire, flood, earthquake) destroys the primary site, off-site backups ensure recovery is still possible.

---

### Q38
**Which of the following BEST describes the purpose of a hot site in disaster recovery planning?**

A. A location where backup media is stored off-site
B. A fully equipped facility where operations can be immediately resumed
C. A secure facility for the incident response team to meet during a disaster
D. A temporary office space with basic amenities but no pre-installed equipment

> [!success] Answer: B
> Hot site: fully operational, real-time or near-real-time data replication, ready for immediate failover. Most expensive. Warm site: partially equipped, hours to days. Cold site: basic infrastructure only, days to weeks. Least expensive.

---

### Q39
**Which of the following BEST describes the role of a cold site in disaster recovery?**

A. A fully operational secondary office location
B. An alternate facility with infrastructure but without pre-installed equipment
C. A virtual environment activated only during an incident
D. A secure storage location for backup data and software

> [!success] Answer: B
> A cold site has the physical space and basic utilities (power, HVAC, connectivity) but no pre-installed hardware or systems. It is the least expensive and slowest to activate of the three site types.

---

### Q40
**In incident response, 'lessons learned' is MOST closely associated with which phase?**

A. Preparation
B. Detection and Analysis
C. Containment, Eradication, and Recovery
D. Post-Incident Activity

> [!success] Answer: D
> The NIST SP 800-61 incident response lifecycle has four phases: (1) Preparation, (2) Detection and Analysis, (3) Containment/Eradication/Recovery, (4) Post-Incident Activity. Lessons learned documents are produced in phase 4.

---

### Q41
**In the context of disaster recovery strategies, what is the significance of an RPO (Recovery Point Objective)?**

A. It defines the maximum tolerable amount of data loss measured in time
B. It outlines the total budget allocated for disaster recovery efforts
C. It specifies the minimum required bandwidth for remote backup
D. It identifies the critical personnel needed for recovery operations

> [!success] Answer: A
> RPO answers "how much data can we afford to lose?" It is expressed as a time interval (e.g., RPO of 4 hours means backups must occur at least every 4 hours). RTO answers "how quickly must systems be restored?"

---

### Q42
**What is the MOST critical factor to consider when determining the RTO for a critical system?**

A. The cost of downtime per hour for the system
B. The system's role in daily operations
C. The maximum tolerable period of disruption for the system
D. The geographic location of the system's backups

> [!success] Answer: C
> RTO is constrained by the Maximum Tolerable Downtime (MTD) — the absolute longest a business function can be unavailable before unacceptable harm occurs. RTO must always be less than MTD.

---

### Q43
**Which of the following is the MOST critical component to ensure effective incident response actions?**

A. The availability of a dedicated incident response team
B. The inclusion of an automatic data backup system
C. The detailed list of potential incidents and their definitions
D. The integration of the plan with the organisation's overall security policy

> [!success] Answer: D
> An IRP that is not aligned with the overarching security policy will create gaps and contradictions. Integration ensures authority, communication channels, and escalation paths are consistent organisationally.

---

### Q44
**Which of the following options does NOT represent a possible model for an Incident Response Team (IRT)?**

A. Leveraged
B. Dedicated
C. Hybrid
D. Pre-existing

> [!success] Answer: D
> ISC2 CC curriculum describes three IRT models: Dedicated (full-time staff), Leveraged (part-time, drawn from other roles), and Hybrid (combination). "Pre-existing" is not a defined IRT model (see ISC2 Study Guide, Chapter 2, Module 1).

---

### Q45
**What is the PRIMARY goal of a Disaster Recovery Plan (DRP)?**

A. Outline a safe escape procedure for the organisation's personnel
B. Maintain crucial company operations in the event of a disaster
C. Restore company operations to the last-known reliable operational state
D. Provide a safe environment for recovery team members

> [!success] Answer: C
> The DRP's objective is restoring IT systems and data to operational status after a disruption. The BCP covers continuity of broader business operations. The DRP is the technical subset focused on system restoration (see ISC2 Study Guide, Chapter 2, Module 4).

---

### Q46
**What is the PRIMARY goal of a Business Continuity Plan (BCP) test?**

A. To fulfil audit requirements
B. To verify the effectiveness of the plan under simulated conditions
C. To train new employees on their roles during an incident
D. To satisfy stakeholder demands for organisational resilience

> [!success] Answer: B
> BCP testing (tabletop exercises, walkthroughs, simulations, parallel tests, full interruption tests) validates that the plan will actually work when needed. An untested plan is of unknown value.

---

### Q47
**The term 'Business Impact Plan' refers to:**

A. A strategic plan for measuring financial losses from disruptions
B. This term does not exist in standard business continuity terminology
C. An alternate name for the Business Continuity Plan
D. A subsidiary plan within the DRP

> [!success] Answer: B
> "Business Impact Plan" is not a recognised term. The correct terms are Business Impact Analysis (BIA), Business Continuity Plan (BCP), and Disaster Recovery Plan (DRP). This is a common exam trick question.

---

## Domain 3: Access Controls Concepts (22%)

> [!info] Weight
> ~22 questions. Focus: MAC vs DAC vs RBAC vs ABAC, physical vs logical controls, authentication factors (Type 1/2/3), authorisation, accounting, identification, SSO, SAML, federation, privilege creep, need-to-know.

---

### Q48
**Which access control model is MOST appropriate for a military organisation with highly classified information?**

A. Discretionary Access Control (DAC)
B. Mandatory Access Control (MAC)
C. Role-Based Access Control (RBAC)
D. Attribute-Based Access Control (ABAC)

> [!success] Answer: B
> MAC uses labels assigned by a central authority (e.g., Top Secret, Secret, Unclassified). Users cannot change their own clearance or share objects outside their classification. Ideal where strict confidentiality hierarchy is mandated by policy.

---

### Q49
**Which access control model is BEST suited for environments requiring dynamic adjustments based on changing contexts such as user location or time of access?**

A. Mandatory Access Control (MAC)
B. Discretionary Access Control (DAC)
C. Role-Based Access Control (RBAC)
D. Attribute-Based Access Control (ABAC)

> [!success] Answer: D
> ABAC evaluates multiple attributes simultaneously: user attributes, resource attributes, and environmental attributes (time, location, device). This enables fine-grained, context-aware decisions that MAC/DAC/RBAC cannot achieve alone.

---

### Q50
**In a Role-Based Access Control system, which scenario BEST demonstrates 'role explosion'?**

A. A system with a few predefined roles that cover all necessary permissions
B. A system where individual permissions are directly assigned to users instead of roles
C. A system that requires a new role for each unique combination of permissions
D. A system with roles defined at a very high level such as "user" and "administrator"

> [!success] Answer: C
> Role explosion occurs when the number of roles grows unmanageably because administrators create new roles instead of reusing existing ones. It is a maintenance and audit nightmare.

---

### Q51
**What is the biggest challenge in a Discretionary Access Control (DAC) system?**

A. Ensuring users have minimum necessary permissions
B. Preventing propagation of access rights when objects are shared widely
C. Establishing fixed roles that accurately reflect organisational structure
D. Automatically adjusting permissions based on real-time data attributes

> [!success] Answer: B
> In DAC, object owners control who has access. The Trojan horse problem arises when a malicious program inherits the permissions of the user running it, allowing uncontrolled propagation.

---

### Q52
**Which principle of access control is primarily concerned with ensuring users are who they claim to be?**

A. Authentication
B. Authorisation
C. Accounting
D. Auditing

> [!success] Answer: A
> The AAA framework: Authentication (proving identity), Authorisation (granting appropriate access), Accounting/Auditing (recording what was done). Authentication always precedes authorisation (see ISC2 Study Guide, Chapter 3).

---

### Q53
**Which type of authentication is 'something you are'?**

A. Type 1
B. Type 2
C. Type 3
D. Type 4

> [!success] Answer: C
> Authentication factor types: Type 1 = Something you know (password, PIN, passphrase). Type 2 = Something you have (token, smart card, OTP device). Type 3 = Something you are (biometrics: fingerprint, retina, voice). Type 4 (sometimes referenced) = Somewhere you are (location).

---

### Q54
**In an organisation using RBAC, which of the following BEST describes 'role mining'?**

A. Defining new roles based on observed user behaviour patterns
B. Manual assignment of users to predefined roles
C. Using automated tools to identify and correct improper role assignments
D. Reviewing and updating roles on a periodic basis

> [!success] Answer: A
> Role mining analyses existing user-permission assignments to derive optimal roles. It is a bottom-up approach to establishing RBAC structure based on real-world usage data.

---

### Q55
**What access control mechanism is MOST effective in preventing unauthorised access to sensitive resources in a cloud computing environment?**

A. Password complexity requirements
B. Multifactor authentication (MFA)
C. Periodic access reviews
D. Single sign-on (SSO)

> [!success] Answer: B
> MFA requires two or more independent factors (e.g., password + OTP). Even if one factor is compromised, the account remains protected. Cloud environments are particularly vulnerable to credential stuffing and phishing.

---

### Q56
**In federated access management, what does a SAML assertion provide?**

A. A digital certificate for encrypting data in transit
B. A request for access between federated domains
C. A format for exchanging authentication and authorisation data
D. A schema for role-based access control settings

> [!success] Answer: C
> Security Assertion Markup Language (SAML) is an XML-based standard for exchanging authentication and authorisation data between an Identity Provider (IdP) and a Service Provider (SP). Used in SSO across organisational boundaries.

---

### Q57
**Which access control principle is violated when a user retains access rights to resources after changing roles?**

A. Separation of duties
B. Least privilege
C. Mandatory access control
D. Role explosion

> [!success] Answer: B
> This describes privilege creep — accumulated permissions that exceed current role requirements. Least privilege requires that access be recalibrated whenever a user changes roles, not just when they leave.

---

### Q58
**Which is the MOST effective access control for preventing unauthorised access to a door?**

A. Fences
B. Turnstiles
C. Barriers
D. Locks

> [!success] Answer: D
> A lock directly prevents a door from being opened by unauthorised individuals. Fences, barriers, and turnstiles deter or slow access but a lock provides positive access control at the entry point itself.

---

### Q59
**What is the primary purpose of 'separation of duties' in access control?**

A. To ensure no single individual has control over all aspects of a transaction
B. To divide responsibilities among multiple systems to improve performance
C. To segregate network segments for security purposes
D. To allocate different shifts to employees for 24/7 coverage

> [!success] Answer: A
> SoD is a fraud prevention control. By requiring multiple people to complete sensitive transactions (e.g., initiating and approving a payment), it prevents any single person from committing and concealing wrongdoing.

---

### Q60
**What is the primary security concern associated with delegation of rights?**

A. Increased complexity of access control lists
B. Potential for privilege escalation
C. Decreased efficiency in access control administration
D. Reduced granularity of access control

> [!success] Answer: B
> Delegation allows a user to grant some or all of their access rights to another. If not carefully constrained, this enables privilege escalation — a lower-privileged user accumulating rights beyond their entitlement.

---

### Q61
**In context-aware access control, which factor would NOT typically influence access decisions?**

A. The time of the access request
B. The user's compliance with corporate security training
C. The risk level associated with the accessed resource
D. The device used to make the access request

> [!success] Answer: B
> Context-aware (ABAC) controls evaluate: time, location, device posture, resource sensitivity, and network characteristics. Training compliance is a HR/governance concern, not typically evaluated in real-time access decisions.

---

### Q62
**Which access control model specifies access to an object based on the subject's role in the organisation?**

A. RBAC
B. MAC
C. ABAC
D. DAC

> [!success] Answer: A
> Role-Based Access Control (RBAC) assigns permissions to roles, and users are assigned to roles. Access decisions are based on the role, not the individual user identity. It simplifies administration in enterprise environments.

---

### Q63
**What type of security control is a biometric reader that grants access to a data centre building?**

A. Administrative control
B. Physical control
C. Technical/Logical control
D. Compensating control

> [!success] Answer: B
> A biometric reader at a physical entrance is a physical security control. Although it uses biometric technology (which is also a logical concept), when deployed to control physical entry, it is classified as a physical control.

---

### Q64
**Which of the following is an example of two-factor authentication (2FA)?**

A. Password and PIN
B. Smart card and fingerprint
C. Username and password
D. Two different passwords

> [!success] Answer: B
> Two-factor authentication requires factors from two different categories. Smart card = something you have (Type 2). Fingerprint = something you are (Type 3). Password + PIN = both "something you know" (Type 1), which is single-factor.

---

## Domain 4: Network Security (24%)

> [!info] Weight
> ~24 questions. Second-heaviest domain. Covers OSI model, TCP/IP, firewalls, IDS/IPS, VPN, DMZ, VLAN, encryption, wireless security, network protocols and ports, cloud networking, CDN.

---

### Q65
**In the OSI model, at which layer does a network-based IDS typically operate?**

A. Layer 2 (Data Link)
B. Layer 3 (Network)
C. Layer 4 (Transport)
D. Layer 7 (Application)

> [!success] Answer: D
> Network-based IDS/IPS systems that perform deep packet inspection operate at Layer 7 to understand application-layer content. Basic packet filtering firewalls operate at Layers 3–4. The question tests understanding of where security devices sit in the stack.

---

### Q66
**Which encryption method is considered MOST secure for wireless networks?**

A. WEP
B. WPA
C. WPA2
D. WPA3

> [!success] Answer: D
> WPA3 (2018) is the current strongest standard. WEP is completely broken (IV attacks). WPA is vulnerable to TKIP attacks. WPA2 with AES is still acceptable but WPA3 adds SAE (Simultaneous Authentication of Equals) handshake, eliminating offline dictionary attacks.

---

### Q67
**Which protocol is primarily used for securely managing network devices remotely?**

A. SNMP
B. SSH
C. FTP
D. HTTP

> [!success] Answer: B
> SSH (TCP 22) provides encrypted remote shell access. SNMP can be used for device management but SNMPv1/v2 transmit in cleartext. FTP and HTTP are unencrypted.

---

### Q68
**What is the primary purpose of using a VPN in network security?**

A. To create a secure and encrypted connection over a less secure network
B. To increase the speed of internet connections
C. To block malicious traffic and protect against malware
D. To manage network devices without using secure protocols

> [!success] Answer: A
> A VPN establishes an encrypted tunnel over an untrusted network (the internet) providing confidentiality and integrity for data in transit. It does not inherently block malware or manage devices.

---

### Q69
**What is the primary function of a network access control (NAC) system?**

A. To encrypt data traffic on a network
B. To manage the distribution of IP addresses
C. To control access to a network based on compliance with defined security policies
D. To monitor network traffic for malicious activities

> [!success] Answer: C
> NAC enforces policy compliance before granting network access: checking patch levels, antivirus definitions, OS versions, and other security posture attributes. Non-compliant devices are quarantined or given limited access.

---

### Q70
**Which technology is typically used to isolate broadcast domains in a network environment?**

A. VPN
B. VLAN
C. NAT
D. Proxy

> [!success] Answer: B
> VLANs (Virtual Local Area Networks) logically segment a physical network into separate broadcast domains. This improves security (isolation) and performance (reduced broadcast traffic) without requiring separate physical hardware.

---

### Q71
**What is the main security advantage of implementing network segmentation?**

A. Reducing the overall cost of the network infrastructure
B. Increasing the speed of the network
C. Limiting the spread of malware and reducing the attack surface
D. Simplifying the management of the network

> [!success] Answer: C
> Segmentation contains lateral movement. An attacker who compromises one segment cannot freely pivot to others. This is the principle behind DMZs, VLANs, and micro-segmentation in zero trust architectures.

---

### Q72
**Which protocol is designed to secure SNMP traffic, ensuring both encryption and data integrity?**

A. SNMPv3
B. SSH
C. HTTPS
D. SNMPv2

> [!success] Answer: A
> SNMPv3 adds USM (User-based Security Model) providing authentication (MD5/SHA) and encryption (DES/AES). SNMPv1 and v2c use community strings in cleartext and should not be used on untrusted networks.

---

### Q73
**What is the primary purpose of implementing a DMZ (Demilitarised Zone)?**

A. To segregate internal network traffic from external traffic
B. To encrypt all inbound and outbound communications
C. To provide a secure area for users to access the internet
D. To host public-facing services while protecting the internal network

> [!success] Answer: D
> A DMZ is a network segment between the external firewall (internet-facing) and the internal firewall (LAN-facing). Public servers (web, mail, DNS) live in the DMZ. If compromised, attackers cannot directly reach the internal network.

---

### Q74
**In the context of network security, which BEST describes a Zero Trust model?**

A. Trusting all devices within the network but not external devices
B. Never trusting, always verifying every device whether inside or outside the network
C. Trusting devices based on their IP addresses
D. Implementing default allow rules in firewall configurations

> [!success] Answer: B
> Zero Trust eliminates the concept of a trusted internal network. Every access request is verified regardless of source, using MFA, device posture checking, and least privilege.

---

### Q75
**Which of the following is a characteristic of symmetric encryption within network security?**

A. It uses the same key for encryption and decryption
B. It uses a public key for encryption and a private key for decryption
C. It cannot be used for encrypting internet traffic
D. It provides a method for digital signatures

> [!success] Answer: A
> Symmetric encryption (AES, DES, 3DES) uses a single shared secret key. It is fast and efficient for bulk data but requires a secure key exchange mechanism. Asymmetric encryption (RSA, ECC) uses key pairs and is used for key exchange and digital signatures.

---

### Q76
**What is the main function of a SIEM system in network security?**

A. To physically secure network hardware
B. To manage IP address allocations
C. To aggregate and analyse security-related events and information
D. To encrypt all data traffic within the network

> [!success] Answer: C
> A SIEM collects logs from multiple sources, correlates events, and generates alerts. It provides centralised visibility for security operations and supports compliance reporting and incident investigation.

---

### Q77
**What is a honeypot primarily used for?**

A. To serve as a primary defence mechanism against DDoS attacks
B. To act as a decoy, attracting attackers to monitor their activities
C. To encrypt data traffic passing through the network
D. To provide high availability and redundancy for network services

> [!success] Answer: B
> A honeypot is a deliberately vulnerable system designed to attract attackers. Monitoring activity on the honeypot provides threat intelligence, slows attackers down, and can reveal TTPs (Tactics, Techniques, and Procedures).

---

### Q78
**Which type of firewall is BEST suited for deep packet inspection (DPI)?**

A. Packet filtering firewall
B. Stateful firewall
C. Proxy firewall
D. Next-Generation Firewall (NGFW)

> [!success] Answer: D
> NGFWs combine traditional stateful inspection with application-layer analysis (Layer 7), IPS capabilities, SSL inspection, and user-identity awareness. DPI is a defining feature. Packet filtering only examines headers at Layers 3–4.

---

### Q79
**What is the primary security concern associated with BYOD policies?**

A. Increased complexity of network topology
B. Potential for unauthorised access to the network
C. Difficulty in managing IP address allocations
D. Requirement for additional physical security measures

> [!success] Answer: B
> Personal devices may lack patch management, antivirus, and configuration controls enforced on corporate devices. BYOD creates unmanaged endpoints that can introduce malware or serve as entry points for attackers.

---

### Q80
**Internet Protocol (IP) is known as which level protocol in the OSI model?**

A. Level 7 (Application)
B. Level 4 (Transport)
C. Level 3 (Network)
D. Level 2 (Data Link)

> [!success] Answer: C
> IP operates at OSI Layer 3 (Network layer). ICMP and IGMP are also Layer 3 protocols. TCP/UDP are Layer 4. SNMP, HTTP, DNS are Layer 7.

---

### Q81
**When the mail server sends mail to other mail servers it operates as a:**

A. SMTP Server
B. SMTP Peer
C. SMTP Master
D. SMTP Client

> [!success] Answer: D
> When initiating a connection to deliver mail to another server, the originating server acts as an SMTP client. The receiving server acts as the SMTP server. This is a common protocol-role trick question.

---

### Q82
**How many bits represent the OUI (Organisationally Unique Identifier) in a MAC address?**

A. 16 bits
B. 48 bits
C. 24 bits
D. 32 bits

> [!success] Answer: C
> A MAC address is 48 bits (6 bytes) total. The first 24 bits are the OUI (assigned by IEEE to manufacturers). The last 24 bits are the device-specific identifier.

---

### Q83
**Which of the following is a primary security concern when implementing IPv6?**

A. The increased address space makes scanning more difficult
B. The mandatory use of encryption for IPv6 traffic
C. Misconfigured devices leading to security vulnerabilities
D. The elimination of NAT reducing security

> [!success] Answer: C
> IPv6 introduces new configuration complexity. Dual-stack environments can create unexpected routing paths. Auto-configuration (SLAAC) may assign addresses administrators are unaware of. Many firewalls have immature IPv6 rule support. Misconfiguration is the primary risk.

---

### Q84
**Which of the following communication layers contains errors pertaining to syntax and format?**

A. Application layer
B. Session layer
C. Presentation layer
D. Physical layer

> [!success] Answer: A
> Application-layer protocols (HTTP, SMTP, FTP) define message syntax and format. Errors in protocol formatting/parsing are application-layer concerns. The Presentation layer handles encoding/translation (encryption, compression, character sets).

---

### Q85
**Which solution would ensure the LOWEST possible latency for a global e-commerce platform's customers?**

A. CDN
B. SaaS
C. Load balancing
D. Decentralised data centres

> [!success] Answer: A
> A Content Delivery Network (CDN) places cached copies of content at edge nodes geographically close to users. This minimises round-trip time (latency). Load balancing distributes traffic but does not reduce geographic latency.

---

### Q86
**Which type of attack primarily aims to make a resource inaccessible to its intended users?**

A. Phishing
B. Denial of Service
C. Trojans
D. Cross-Site Scripting

> [!success] Answer: B
> A Denial of Service (DoS) attack overwhelms a system's resources to prevent legitimate users from accessing it. It targets availability — one of the three CIA triad properties.

---

### Q87
**Which device is used to connect a LAN to the Internet?**

A. Router
B. Firewall
C. HIDS
D. SIEM

> [!success] Answer: A
> A router connects different networks and forwards packets between them. A firewall controls traffic but does not inherently route between networks. HIDS and SIEM are monitoring tools.

---

### Q88
**What does the TCP three-way handshake consist of?**

A. SYN → ACK → FIN
B. Offer → Request → ACK
C. SYN → SYN/ACK → ACK
D. Discover → Offer → Request

> [!success] Answer: C
> The TCP three-way handshake establishes a reliable connection: (1) Client sends SYN, (2) Server responds with SYN/ACK, (3) Client confirms with ACK. Option D describes a DHCP lease process.

---

## Domain 5: Security Operations (18%)

> [!info] Weight
> ~18 questions. Covers patch management, change management, configuration management, physical security, personnel security, incident detection, log management, vulnerability management, data handling, security awareness, social engineering.

---

### Q89
**Which of the following BEST describes the primary purpose of a post-incident review?**

A. To update firewall rules to prevent future incidents
B. To evaluate the incident response process for improvements
C. To determine the financial impact of the incident on the organisation
D. To assign blame to team members who failed to prevent the incident

> [!success] Answer: B
> A post-incident review (lessons learned) improves the IRP for future incidents. It is blameless in nature — the goal is process improvement, not punitive action. It typically produces updated procedures, training needs, and control recommendations.

---

### Q90
**When configuring a SIEM system, which of the following is MOST critical to its effectiveness in detecting anomalies?**

A. The physical location of the SIEM server
B. The frequency of signature updates
C. The integration of threat intelligence feeds
D. The storage capacity for logs

> [!success] Answer: C
> Threat intelligence feeds enrich SIEM detections with current IOCs (Indicators of Compromise), attacker infrastructure, and threat actor TTPs. Without current threat intelligence, SIEMs rely only on static rules and may miss novel attacks.

---

### Q91
**In the deployment of an IDS, what is the significance of tuning the IDS?**

A. To decrease the system's power consumption
B. To reduce the number of false positives and false negatives
C. To increase the data storage capacity of the system
D. To improve the graphical user interface for easier use

> [!success] Answer: B
> An untuned IDS generates noise (false positives) that overwhelms analysts, or misses genuine threats (false negatives). Tuning correlates rules to the specific environment to achieve an acceptable signal-to-noise ratio.

---

### Q92
**When conducting vulnerability assessments, why is it important to perform both automated scanning and manual testing?**

A. Automated scanning can replace manual testing entirely
B. Manual testing is only necessary for systems that cannot be scanned automatically
C. Automated scanning identifies all vulnerabilities while manual testing verifies them
D. Automated scanning and manual testing complement each other, identifying different types of vulnerabilities

> [!success] Answer: D
> Automated scanners excel at broad coverage and known CVE detection. Manual testing (including penetration testing) finds logic flaws, chained vulnerabilities, and context-dependent issues that automated tools miss.

---

### Q93
**What is the primary function of a digital forensic tool in cybersecurity operations?**

A. To block malicious traffic in real-time
B. To analyse and recover digital evidence after a security incident
C. To encrypt data to prevent unauthorised access
D. To serve as a firewall between internal and external networks

> [!success] Answer: B
> Digital forensics involves the identification, preservation, collection, examination, and analysis of digital evidence. Forensic tools (EnCase, FTK, Autopsy, Volatility) are used post-incident, not as preventive controls.

---

### Q94
**What role does a SOC analyst primarily play in threat hunting activities?**

A. Designing the company's website
B. Proactively searching for undetected threats within the network
C. Managing social media accounts for cybersecurity awareness
D. Organising company team-building events

> [!success] Answer: B
> Threat hunting is a proactive, human-led activity that assumes existing security controls have failed. Analysts search for evidence of threat actors who have bypassed automated detection.

---

### Q95
**Why is it important to conduct periodic security assessments?**

A. To ensure controls continue to meet organisational security requirements
B. To comply with the interior design policies of the organisation
C. To determine the colour scheme for the security team's dashboard
D. To assess the entertainment value of security training programmes

> [!success] Answer: A
> The threat landscape, organisational systems, and business requirements change continuously. Periodic assessments verify that controls remain effective and relevant. This aligns with the Plan-Do-Check-Act (PDCA) improvement cycle.

---

### Q96
**What is the PRIMARY benefit of implementing a regular patch management process?**

A. To enhance the graphical user interface of security tools
B. To ensure that all systems are running the latest, most secure software versions
C. To increase the storage capacity of servers
D. To improve the aesthetic appeal of the software

> [!success] Answer: B
> Patch management is a foundational vulnerability management control. Unpatched systems are the most common attack vector. Patches fix known vulnerabilities that are actively exploited in the wild.

---

### Q97
**What is the PRIMARY purpose of conducting a penetration test within the scope of security operations?**

A. To evaluate the performance of network equipment
B. To identify vulnerabilities in systems and networks before attackers do
C. To test the physical strength of the hardware
D. To assess the company's compliance with security policies

> [!success] Answer: B
> Penetration testing simulates adversarial attacks under controlled conditions to identify exploitable vulnerabilities before real attackers find them.

---

### Q98
**When establishing a security baseline, which factor is MOST critical for maintaining system security?**

A. The popularity of the software used
B. The initial cost of the security tools
C. The compatibility of security settings with operational requirements
D. The colour themes of the user interface

> [!success] Answer: C
> A security baseline that breaks operational functionality will be bypassed or disabled. The baseline must balance security hardening with the system's ability to perform its intended functions.

---

### Q99
**In the implementation of network segmentation, what is the PRIMARY security benefit?**

A. Increasing the network's bandwidth and reducing latency
B. Isolating network segments and containing security breaches
C. Replacing traditional firewalls with more modern technologies
D. Centralising all network security controls in one location

> [!success] Answer: B
> Segmentation is a containment strategy. It prevents lateral movement by ensuring a compromise in one segment cannot freely propagate to others. It implements least-privilege at the network layer.

---

### Q100
**Why is User Behaviour Analytics (UBA) important in detecting insider threats?**

A. UBA focuses solely on external threat actors
B. UBA eliminates the need for traditional security measures
C. UBA uses machine learning to identify deviations from normal behaviour patterns
D. UBA increases network traffic for better analysis

> [!success] Answer: C
> Insider threats are difficult to detect with signature-based tools because the actor has legitimate credentials. UBA establishes a behavioural baseline and flags anomalies: unusual access times, data exfiltration patterns, or privilege abuse.

---

### Q101
**Before applying patches to production systems, which of the following is considered BEST practice?**

A. Apply patches as quickly as possible to production immediately
B. Test patches in a qualification environment before applying to production
C. Apply patches based on vendor reputation alone
D. Apply patches on fixed days regardless of urgency

> [!success] Answer: B
> Patches must be tested in a non-production (staging/QA) environment to confirm they do not break functionality. Rapid deployment without testing can cause outages worse than the vulnerability itself.

---

### Q102
**In Change Management, which component addresses the procedures needed to undo changes?**

A. Request for Approval
B. Rollback
C. Request for Change
D. Disaster Recovery

> [!success] Answer: B
> A rollback is the planned procedure to reverse a change if it causes problems. Every change request should have a documented rollback plan before implementation.

---

### Q103
**Which of the following is NOT a type of learning activity used in Security Awareness?**

A. Tutorial
B. Awareness
C. Education
D. Training

> [!success] Answer: A
> The ISC2 Study Guide identifies three levels of security learning: Awareness (broad, all staff), Training (role-specific skills), and Education (deep academic understanding). "Tutorial" is not one of the three recognised categories.

---

### Q104
**Malicious emails that aim to attack company executives are an example of:**

A. Phishing
B. Trojans
C. Whaling
D. Rootkits

> [!success] Answer: C
> Whaling is a targeted phishing attack specifically directed at senior executives or high-value targets. Standard phishing targets a broad audience. Spear phishing targets specific individuals. Whaling targets the "big fish."

---

### Q105
**What is an effective way of hardening a system?**

A. Patch the system
B. Create a DMZ for web application services
C. Have an IDS in place
D. Run a vulnerability scan

> [!success] Answer: A
> System hardening involves reducing the attack surface by patching, disabling unnecessary services, removing default accounts, and applying secure configurations. Patching is the most direct hardening action. IDS is detective, not hardening.

---

### Q106
**Which of these social engineering attacks corrupts an infrastructure service such as Domain Name System (DNS)?**

A. Spear Phishing
B. Pharming
C. Vishing
D. Whaling

> [!success] Answer: B
> A pharming attack corrupts DNS or host file entries to redirect users to a fraudulent website. Unlike phishing (which uses fake emails), pharming manipulates network infrastructure itself.

---

### Q107
**Vishing refers to which type of social engineering attack?**

A. Using a fraudulent interactive voice response system to trick victims into divulging sensitive information
B. Impersonating an authority figure via email
C. Following an authorised user into a restricted area
D. Requesting passwords in exchange for compensation

> [!success] Answer: A
> Vishing (voice phishing) uses phone calls or fraudulent IVR systems to trick victims into revealing sensitive information such as PINs or account numbers (see ISC2 Study Guide, Chapter 5, Module 4). Tailgating = following into restricted area. Email impersonation = phishing.

---

### Q108
**Which of the following is NOT an example of a physical security control?**

A. Security cameras
B. Biometric access controls at a building entrance
C. Remote control electronic locks
D. Firewalls

> [!success] Answer: D
> Firewalls are technical/logical security controls that filter network traffic. Security cameras, biometric readers at physical entry points, and electronic locks are all physical controls.

---

### Q109
**Which devices have the PRIMARY objective of collecting and analysing security events?**

A. Firewall
B. Hubs
C. Routers
D. SIEM

> [!success] Answer: D
> SIEM (Security Information and Event Management) systems are purpose-built for collecting, aggregating, correlating, and analysing security events from multiple sources. Firewalls filter traffic. Hubs and routers are networking devices.

---

### Q110
**An organisation needs a network security tool that detects malicious activity. Which of these tools will BEST meet their requirements?**

A. Router
B. Firewall
C. IDS
D. IPS

> [!success] Answer: C
> An Intrusion Detection System (IDS) is designed to detect and alert on malicious activity. An IPS detects AND prevents/blocks. The question specifically says "detects" — making IDS the best answer. Firewalls filter based on rules but are not primarily detection tools.

---

### Q111
**Which type of attack will MOST effectively provide privileged access (root access on Unix/Linux platforms) to a computer while hiding its presence?**

A. Rootkits
B. Phishing
C. Cross-Site Scripting
D. Trojans

> [!success] Answer: A
> A rootkit provides persistent privileged access to a system while actively concealing its presence. Once installed, it is very difficult to detect because it modifies the OS to hide its processes and files.

---

### Q112
**How many data labels are generally considered manageable for an organisation?**

A. 1
B. 1–2
C. 2–8
D. More than 10

> [!success] Answer: C
> The ISC2 Study Guide recommends that data classification schemes use a manageable number of labels, typically 2–8. Too few labels provide insufficient granularity; too many create confusion and administrative overhead.

---

### Q113
**A community cloud deployment model is where:**

A. A single organisation exclusively uses the cloud infrastructure
B. Several organisations with similar needs share the infrastructure and resources
C. Cloud infrastructure is available to the general public
D. Two or more distinct cloud models are bound together

> [!success] Answer: B
> Community cloud is shared by several organisations with common concerns (regulatory compliance, security requirements, industry-specific needs). Private cloud = single organisation. Public cloud = general public. Hybrid cloud = combination of models.

---

### Q114
**Which of the following is protected by regulations such as GDPR, HIPAA, and PCI-DSS?**

A. Protected Health Information (PHI)
B. Secure Credit Card Payments (SCCP)
C. Personally Identifiable Information (PII)
D. Publicly Identifiable Information (PII)

> [!success] Answer: C
> PII is any information that can identify an individual. GDPR protects EU citizens' PII. HIPAA specifically protects PHI (a subset of PII in healthcare). PCI-DSS protects cardholder data. The overarching concept across all three is PII protection.

---

### Q115
**A contract between a service provider and a customer that defines the expected level of service is known as a:**

A. Rules of Engagement (ROE)
B. Memorandum of Understanding (MOU)
C. Service Level Agreement (SLA)
D. Non-Disclosure Agreement (NDA)

> [!success] Answer: C
> An SLA defines specific measurable service commitments (uptime, response time, support hours) between a provider and customer. An MOU is a less formal agreement. An ROE defines engagement boundaries (e.g., pen testing scope). An NDA protects confidential information.

---

---

## High-Yield Concept Tables

> [!abstract] Quick Reference

### CIA Triad

| Property | Definition | Example Control |
|---|---|---|
| Confidentiality | Prevent unauthorised disclosure | Encryption, access controls |
| Integrity | Prevent unauthorised modification | Hashing, digital signatures, version control |
| Availability | Ensure authorised access when needed | Redundancy, backups, DDoS protection |

### Authentication Factor Types

| Type | Factor | Examples |
|---|---|---|
| Type 1 | Something you know | Password, PIN, passphrase |
| Type 2 | Something you have | Smart card, OTP token, mobile authenticator |
| Type 3 | Something you are | Fingerprint, retina, voice, facial recognition |
| Type 4 (contextual) | Somewhere you are | GPS location, IP geolocation |

### Access Control Models

| Model | Who Controls | Use Case |
|---|---|---|
| DAC | Object owner | Standard OS file systems |
| MAC | Central authority (labels) | Military/government classified systems |
| RBAC | Roles assigned by admin | Enterprise environments |
| ABAC | Policy engine (multiple attributes) | Cloud, complex dynamic environments |

### Firewall Types

| Type | Layer | Capability |
|---|---|---|
| Packet filtering | 3–4 | IP/port rules only |
| Stateful inspection | 3–4 | Tracks connection state |
| Proxy/application | 7 | Full protocol awareness |
| NGFW | 3–7 | DPI, IPS, SSL inspection, app ID |

### Incident Response Phases (NIST SP 800-61)

1. Preparation
2. Detection and Analysis
3. Containment, Eradication, and Recovery
4. Post-Incident Activity (Lessons Learned)

### Recovery Site Types

| Site | Ready Time | Cost | Equipment |
|---|---|---|---|
| Hot | Immediate | Highest | Fully pre-installed, real-time data sync |
| Warm | Hours to days | Medium | Partially equipped, periodic data sync |
| Cold | Days to weeks | Lowest | Basic infrastructure only, no equipment |

### Risk Treatments

| Treatment | Description |
|---|---|
| Accept/Tolerate | Acknowledge the risk and do nothing further |
| Transfer/Share | Insurance, contractual indemnification |
| Mitigate/Reduce | Implement controls to reduce likelihood or impact |
| Avoid | Stop the activity that creates the risk |

### Security Control Categories

| Category | Description | Examples |
|---|---|---|
| Physical | Tangible mechanisms | Locks, fences, cameras, guards, bollards |
| Technical/Logical | Hardware/software mechanisms | Firewalls, IDS/IPS, encryption, ACLs |
| Administrative | Policies and procedures | Security awareness training, SoD, background checks |

### Security Control Types

| Type | Purpose | Examples |
|---|---|---|
| Preventive | Stop incidents before they occur | Firewall, encryption, locks, training |
| Detective | Identify incidents during or after occurrence | IDS, SIEM, audit logs, security cameras |
| Corrective | Fix issues after detection | Patching, incident response, backup restoration |
| Compensating | Alternative when primary control not feasible | Backup generator, manual review |
| Deterrent | Discourage potential attackers | Warning signs, security guards, login banners |
| Recovery | Restore normal operations | Backups, DR sites, system rebuild |

### Key Port Numbers (High-Frequency on Exam)

| Service | Port | Protocol |
|---|---|---|
| FTP (data) | 20 | TCP |
| FTP (control) | 21 | TCP |
| SSH | 22 | TCP |
| Telnet | 23 | TCP |
| SMTP | 25 | TCP |
| DNS | 53 | TCP/UDP |
| HTTP | 80 | TCP |
| HTTPS | 443 | TCP |
| SNMP | 161 | UDP |
| RDP | 3389 | TCP |
| LDAP | 389 | TCP |
| LDAPS | 636 | TCP |

### Governance Hierarchy

```
Policy → Standard → Guideline → Procedure
(what/why)  (specific req)  (recommendation)  (step-by-step)
```

| Document | Nature | Created By | Compliance |
|---|---|---|---|
| Policy | High-level intent (what and why) | Senior management | Mandatory |
| Standard | Specific requirements | IT/security teams | Mandatory |
| Guideline | Recommendations | Advisory bodies | Optional |
| Procedure | Step-by-step instructions (how) | Operations staff | Mandatory |
| Regulation | Legal requirements | Government/authorities | Mandatory (legal penalties) |

### ISC2 Code of Ethics — Four Canons (in priority order)

1. Protect society, the common good, necessary public trust and confidence, and the infrastructure
2. Act honourably, honestly, justly, responsibly, and legally
3. Provide diligent and competent service to principals
4. Advance and protect the profession

### Cloud Service Models

| Model | Provider Manages | Customer Manages |
|---|---|---|
| IaaS | Infrastructure (compute, storage, network) | OS, middleware, apps, data |
| PaaS | Infrastructure + OS + middleware | Apps and data |
| SaaS | Everything | User configuration only |

### Cloud Deployment Models

| Model | Description |
|---|---|
| Private | Exclusively for one organisation |
| Public | Available to the general public |
| Community | Shared by organisations with similar concerns |
| Hybrid | Combination of two or more models |

### Social Engineering Techniques

| Technique | Description |
|---|---|
| Phishing | Fraudulent email to extract information or trigger action |
| Spear phishing | Targeted phishing at a specific individual |
| Whaling | Phishing targeting senior executives |
| Vishing | Voice/phone-based phishing (fraudulent IVR) |
| Smishing | SMS/text-based phishing |
| Pretexting | Creating a fabricated scenario to gain trust |
| Tailgating | Following an authorised person through a secured door |
| Baiting | Leaving infected media (USB) for victim to find |
| Quid pro quo | Offering a benefit in exchange for information |
| Pharming | Corrupting DNS to redirect users to fake sites |

---

## CAT Exam Strategy Notes

> [!tip] CAT-Specific Advice (current as of March 2026)

- **You cannot skip or return to questions.** Commit to each answer before moving on.
- **Harder questions appearing = good sign.** The algorithm is calibrating upward because you are performing well. Each new question is calibrated so you have approximately a 50% chance of answering correctly.
- **Exam length is variable:** 100–125 questions. The exam ends when the algorithm reaches 95% statistical confidence in your pass/fail status.
- **~25 questions are unscored beta/pre-test items.** You cannot identify them. Treat every question as scored.
- **Time:** 2 hours for up to 125 questions. ~1 minute per question average is comfortable.
- **Scoring:** Scaled 0–1000, passing is 700. CAT weights harder questions more heavily.
- **No online proctoring.** ISC2 exams must be taken at an authorised Pearson VUE test centre.
- **The ISC2 self-paced course alone is NOT sufficient.** Community reports consistently indicate that a significant portion of questions go beyond the free course material.
- **Recommended supplements:** Prabh Nair YouTube playlist, LinkedIn Learning CC practice exams (free, 4 tests), Elizabeth Ekedoro crash course materials, Thor Pedersen videos and study guide, CertPrep practice exams.
- **Scenario-based questions dominate.** ISC2 tests application of concepts, not definition recall. Read each question twice. Look for qualifiers: MOST, BEST, FIRST, PRIMARY.
- **The ISC2 "manager mindset" applies.** When in doubt, choose the answer that a senior security manager or CISO would select — policy, governance, and risk-awareness oriented, not purely technical.
- **Watch for "NOT" and "EXCEPT" questions.** These ask you to identify the incorrect or excluded option. Easy to miss under time pressure.
- **Eliminate obviously wrong answers first.** On a 4-option MCQ, eliminating 2 wrong answers gives you a 50/50 chance at worst.

> [!warning] Exam Integrity
> This document is for educational preparation only. It reconstructs question *styles and concepts* from publicly available community sources. Memorising these questions does not substitute for genuine understanding. ISC2 uses scenario variants — the same concept will appear with different wording. Focus on *understanding the why* behind every answer. ISC2 exams carry a confidentiality clause — candidates must not divulge specific exam content.

---

*Sources: ISC2 Community forums, ISC2 official exam outline and FAQ, ISC2 Study Guide chapter references, CareerEmployer practice tests, Scribd CC Q&A documents, Docsity exam question sets, InfoTechSite practice sets (Sets 1–4), GitHub ISC2-CC-Dump-Questions-Study-Material, Quizlet CC flashcard decks, Prabh Nair CC Playlist (YouTube), CBT Nuggets CAT format guide, OpenExamPrep CC question bank, FlashGenius CC certification guide. Compiled March 2026.*
