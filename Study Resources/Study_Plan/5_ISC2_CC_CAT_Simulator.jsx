import { useState, useEffect, useRef, useCallback } from "react";

const QUESTIONS = [
  // Domain 1: Security Principles (Q1-Q34)
  {id:1,d:1,q:"In the context of security principles, which of the following BEST exemplifies the concept of least privilege?",o:["Granting every user admin rights to ensure ease of system access","Assigning permissions based on the minimum necessary for job functions","Implementing multi-factor authentication for all system users","Encrypting all data stored on the company's servers"],a:1,r:"Least privilege means users receive only the access rights strictly required for their role."},
  {id:2,d:1,q:"Which of the following BEST describes the principle of 'defence in depth' in cybersecurity?",o:["Using a single, strong firewall to protect the network perimeter","Implementing multiple layers of security controls throughout an IT system","Focusing exclusively on external threats to strengthen network security","Deploying antivirus software on all endpoint devices"],a:1,r:"Defence in depth layers multiple independent controls so that if one fails, others still protect."},
  {id:3,d:1,q:"What does the principle of 'fail-safe defaults' entail?",o:["Systems default to an open access state in case of failure","Systems default to a secure state, denying access when a failure occurs","Automatic backup of all system data during a security breach","Immediate shutdown of systems when a security breach is detected"],a:1,r:"Fail-safe defaults: in the absence of a positive authorisation decision, access is denied."},
  {id:4,d:1,q:"Which of the following BEST describes 'non-repudiation' in information security?",o:["Users can deny their actions on a system","Data cannot be duplicated without authorisation","An entity cannot deny the authenticity of their signature on a document or message","All network communications are encrypted"],a:2,r:"Non-repudiation ensures a party cannot deny having sent/received a message. Digital signatures are the primary mechanism."},
  {id:5,d:1,q:"In cybersecurity, what is meant by the term 'risk transference'?",o:["Eliminating all potential risks from a system","Shifting the responsibility for risk to a third party, such as through insurance","Reducing risk by implementing security controls","Ignoring risk in favour of operational efficiency"],a:1,r:"Risk transference moves the financial burden of a risk to another party. Insurance is the classic example."},
  {id:6,d:1,q:"What is the primary focus of 'data sovereignty' in cybersecurity?",o:["The encryption standards used to secure data","The physical location where data is stored and its legal implications","The amount of data an organisation can store","The speed at which data can be accessed"],a:1,r:"Data sovereignty: data is subject to the laws of the jurisdiction where it is stored."},
  {id:7,d:1,q:"Which concept is central to 'information security governance'?",o:["Ensuring all users have unrestricted access to information","Bypassing standard security protocols to speed up system performance","Aligning information security strategies with business objectives","Focusing solely on technical solutions to secure information"],a:2,r:"Governance aligns security with mission, risk appetite, and business goals."},
  {id:8,d:1,q:"Which principle underlies 'compartmentalisation' in securing information systems?",o:["Granting every user access to all system resources for transparency","Dividing system resources and information into distinct segments to limit access","Centralising all data storage for easier management and security","Removing all barriers to information flow within an organisation"],a:1,r:"Compartmentalisation limits blast radius by segmenting access."},
  {id:9,d:1,q:"'Separation of duties' is designed to:",o:["Concentrate all critical tasks within a single department for efficiency","Assign all security-related tasks to the IT department only","Prevent fraud and errors by dividing tasks among multiple individuals or groups","Ensure that all employees have the ability to perform each other's jobs"],a:2,r:"SoD requires no single individual controls all steps of a critical process."},
  {id:10,d:1,q:"What is the primary objective of a risk assessment procedure?",o:["To assign risk priorities to identified risks","To assess the potential impact of risks on the organisation","To implement controls and measures to reduce or eliminate risks","To provide a structured approach for conducting risk assessments"],a:3,r:"A risk assessment procedure is a structured methodology for identifying, evaluating, and prioritising risks."},
  {id:11,d:1,q:"In risk management, what does the term 'impact' refer to?",o:["The actions taken to transfer or mitigate risks","The frequency of security-related events","The magnitude of harm resulting from unauthorised disclosure, modification, destruction, or loss of information","The potential vulnerabilities in a system or process"],a:2,r:"Impact is the magnitude of harm from a threat exploiting a vulnerability."},
  {id:12,d:1,q:"The concept of 'zero trust security' is based on which assumption?",o:["Trust is granted once and is valid for all network interactions","Trust is never assumed and must be continuously verified","Trust is only necessary for external connections","Trust is based solely on the physical location of access attempts"],a:1,r:"Zero Trust: never trust, always verify. No implicit trust even inside the perimeter."},
  {id:13,d:1,q:"What is the primary goal of 'data minimisation' in privacy and security practices?",o:["To collect as much data as possible for future analysis","To limit data collection to the minimum necessary for the intended purpose","To maximise the storage of data for regulatory compliance","To encrypt all collected data regardless of its sensitivity"],a:1,r:"Data minimisation reduces exposure by not retaining data beyond operational need."},
  {id:14,d:1,q:"'Quantitative risk analysis' primarily involves:",o:["Estimating the impact of risks using descriptive language","Calculating the potential impact of risks using numerical data","Ignoring low-impact risks to focus on high-impact ones","Focusing solely on the qualitative aspects of security vulnerabilities"],a:1,r:"Quantitative = numbers: SLE, ARO, ALE. Qualitative = descriptive (High/Medium/Low)."},
  {id:15,d:1,q:"What is the primary goal of 'threat modelling'?",o:["To design aesthetically pleasing security interfaces","To predict and prioritise potential threats to an IT system","To ensure compliance with international cybersecurity standards","To monitor network traffic in real-time for anomaly detection"],a:1,r:"Threat modelling (STRIDE, PASTA, DREAD) identifies threats during design."},
  {id:16,d:1,q:"'Security convergence' refers to:",o:["The merging of physical and information security practices","The use of a single password across multiple systems","The consolidation of all security logs into one database","The alignment of security and business goals"],a:0,r:"Security convergence integrates physical and logical security under unified governance."},
  {id:17,d:1,q:"Which principle advocates for security policies that adapt over time based on new insights and evolving threats?",o:["Static security policy","Adaptive security policy","Fixed security framework","Immutable security guidelines"],a:1,r:"Adaptive policies are reviewed and updated as the threat landscape changes."},
  {id:18,d:1,q:"Which ISC2 Code of Ethics canon requires members to protect society, the common good, and necessary public trust?",o:["Provide diligent and competent service to principals","Act honourably, honestly, justly, responsibly, and legally","Protect society, the common good, necessary public trust and confidence, and the infrastructure","Advance and protect the profession"],a:2,r:"Canon 1 (highest priority): Protect society, the common good, necessary public trust and confidence, and the infrastructure."},
  {id:19,d:1,q:"What distinguishes 'policies' from 'procedures' in an organisational security context?",o:["Policies are technical, procedures are managerial","Policies state what must be done; procedures describe how to do it","Procedures are legally binding; policies are voluntary","There is no meaningful distinction"],a:1,r:"Policy = what/why. Procedure = step-by-step how."},
  {id:20,d:1,q:"Which of the following is a PREVENTIVE security control?",o:["An intrusion detection system","A firewall","A security audit","A backup generator"],a:1,r:"Firewall = preventive. IDS = detective. Audit = detective. Generator = compensating."},
  {id:21,d:1,q:"Which type of security control is a backup generator?",o:["Preventive","Detective","Compensating/Recovery","Corrective"],a:2,r:"A backup generator compensates for power failure to maintain availability."},
  {id:22,d:1,q:"In cybersecurity, 'asset classification and control' is crucial because:",o:["It ensures all users have equal access to information resources","It mandates the use of strong passwords for all system accounts","It helps identify and apply appropriate protections based on asset value","It requires the encryption of all data, regardless of sensitivity"],a:2,r:"Classification enables proportional controls based on asset sensitivity and value."},
  {id:23,d:1,q:"Which of the following BEST describes the concept of 'privacy'?",o:["Protecting personal information from unauthorised access or disclosure","Ensuring data is accurate and unchanged","Making sure data is always accessible when needed","All of the above"],a:0,r:"Privacy = protecting PII from unauthorised disclosure. Accuracy = integrity. Accessibility = availability."},
  {id:24,d:1,q:"A DevOps team has updated application source code and many unauthorised changes have been made. What is the BEST control to prevent recurrence?",o:["Backup","File labels","Security audit","Hashing"],a:3,r:"Hashing detects any modification to file content by producing a unique digest."},
  {id:25,d:1,q:"What would a security professional use to ensure a specific control is working as expected?",o:["Security testing","Security assessment","Security audit","Security walkthrough"],a:0,r:"Security testing actively verifies a control functions as intended."},
  {id:26,d:1,q:"Communication between end systems is encrypted using a key, often known as a:",o:["Symmetric key","Private key","Asymmetric key","Public key"],a:0,r:"Symmetric encryption uses the same key for encryption and decryption. Session keys are symmetric."},
  {id:27,d:1,q:"Which of the following documents are created by governments or national authorities?",o:["Standards","Guidelines","Regulations","Policies"],a:2,r:"Regulations are created by governments and carry legal/financial penalties."},
  {id:28,d:1,q:"Which of the following is NOT a social engineering technique?",o:["Pretexting","Segregation","Quid pro quo","Tailgating"],a:1,r:"Segregation (of duties) is a security control, not a social engineering technique."},
  {id:29,d:1,q:"When a company hires an insurance company to mitigate the financial consequences of risk, which risk management technique is being applied?",o:["Risk transfer","Risk avoidance","Risk mitigation","Risk tolerance"],a:0,r:"Insurance = risk transfer. Financial burden shifts to the insurer."},
  {id:30,d:1,q:"What is the PRIMARY purpose of the ISC2 Code of Ethics?",o:["To establish technical security standards","To guide the professional conduct of ISC2 members","To define penalties for cybersecurity breaches","To outline specific security technologies to use"],a:1,r:"The Code of Ethics governs professional behaviour of all ISC2 certified members."},
  {id:31,d:1,q:"Sensitivity is a measure of the:",o:["Pertinence assigned to information by its owner for representing need for urgency","Protection and timeliness assigned to information by its owner","Importance assigned to information by its owner, or the purpose of representing its need for protection","Availability and redundancy of information based on storage location"],a:2,r:"Sensitivity = importance assigned by owner denoting need for protection."},
  {id:32,d:1,q:"Risk management is BEST defined as:",o:["The assessment of the potential impact of a threat","The identification, evaluation and prioritisation of risks","The impact and likelihood of a threat","The creation of an incident response team"],a:1,r:"Risk management = identify, evaluate, and prioritise risks, then apply resources to minimise impact."},
  {id:33,d:1,q:"Which regulations address data protection and privacy in Europe?",o:["FISMA","HIPAA","SOX","GDPR"],a:3,r:"GDPR = EU data protection. FISMA = US federal. HIPAA = US healthcare. SOX = US financial."},
  {id:34,d:1,q:"Which of the following is the THIRD canon of the ISC2 Code of Ethics?",o:["Protect society, the common good, necessary public trust and confidence, and the infrastructure","Act honourably, honestly, justly, responsibly, and legally","Provide diligent and competent service to principals","Advance and protect the profession"],a:2,r:"Canon order: (1) Protect society (2) Act honourably (3) Provide diligent service (4) Advance profession."},

  // Domain 2: BC, DR and Incident Response (Q35-Q47)
  {id:35,d:2,q:"What is the PRIMARY goal of conducting a Business Impact Analysis (BIA)?",o:["To identify and prioritise the organisation's risks","To determine the impact of disruptions on business operations","To assess the organisation's compliance with legal requirements","To evaluate the effectiveness of current security measures"],a:1,r:"BIA identifies critical functions and quantifies disruption impact. Outputs: MTD, RTO, RPO."},
  {id:36,d:2,q:"During an incident response, which step should be taken FIRST when a breach is detected?",o:["Begin data recovery procedures immediately","Notify external authorities and stakeholders","Isolate affected systems to prevent further compromise","Conduct a post-incident review to identify lessons learned"],a:2,r:"First priority = containment. Isolate affected systems to stop the spread."},
  {id:37,d:2,q:"What is the PRIMARY purpose of an off-site data backup?",o:["To facilitate rapid access to data in case of a system failure","To comply with industry regulations regarding data preservation","To ensure data availability in the event of a geographical disaster","To reduce the overall cost of the disaster recovery process"],a:2,r:"Off-site backup = geographic redundancy. Survives site-level disasters."},
  {id:38,d:2,q:"Which of the following BEST describes the purpose of a hot site in disaster recovery planning?",o:["A location where backup media is stored off-site","A fully equipped facility where operations can be immediately resumed","A secure facility for the incident response team to meet during a disaster","A temporary office space with basic amenities but no pre-installed equipment"],a:1,r:"Hot site = fully operational, real-time data replication, immediate failover."},
  {id:39,d:2,q:"Which of the following BEST describes the role of a cold site in disaster recovery?",o:["A fully operational secondary office location","An alternate facility with infrastructure but without pre-installed equipment","A virtual environment activated only during an incident","A secure storage location for backup data and software"],a:1,r:"Cold site = basic infrastructure (power, HVAC), no equipment. Cheapest, slowest."},
  {id:40,d:2,q:"In incident response, 'lessons learned' is MOST closely associated with which phase?",o:["Preparation","Detection and Analysis","Containment, Eradication, and Recovery","Post-Incident Activity"],a:3,r:"NIST Phase 4: Post-Incident Activity = Lessons Learned."},
  {id:41,d:2,q:"In the context of disaster recovery strategies, what is the significance of an RPO (Recovery Point Objective)?",o:["It defines the maximum tolerable amount of data loss measured in time","It outlines the total budget allocated for disaster recovery efforts","It specifies the minimum required bandwidth for remote backup","It identifies the critical personnel needed for recovery operations"],a:0,r:"RPO = max acceptable data loss. Expressed as time, drives backup frequency."},
  {id:42,d:2,q:"What is the MOST critical factor to consider when determining the RTO for a critical system?",o:["The cost of downtime per hour for the system","The system's role in daily operations","The maximum tolerable period of disruption for the system","The geographic location of the system's backups"],a:2,r:"RTO is constrained by MTD. RTO must always be less than MTD."},
  {id:43,d:2,q:"Which of the following is the MOST critical component to ensure effective incident response actions?",o:["The availability of a dedicated incident response team","The inclusion of an automatic data backup system","The detailed list of potential incidents and their definitions","The integration of the plan with the organisation's overall security policy"],a:3,r:"An IRP must align with the overarching security policy for authority and consistency."},
  {id:44,d:2,q:"Which of the following options does NOT represent a possible model for an Incident Response Team (IRT)?",o:["Leveraged","Dedicated","Hybrid","Pre-existing"],a:3,r:"Three IRT models: Dedicated, Leveraged, Hybrid. 'Pre-existing' is not a defined model."},
  {id:45,d:2,q:"What is the PRIMARY goal of a Disaster Recovery Plan (DRP)?",o:["Outline a safe escape procedure for the organisation's personnel","Maintain crucial company operations in the event of a disaster","Restore company operations to the last-known reliable operational state","Provide a safe environment for recovery team members"],a:2,r:"DRP = restore IT systems. BCP = maintain business operations. DRP is the technical subset."},
  {id:46,d:2,q:"What is the PRIMARY goal of a Business Continuity Plan (BCP) test?",o:["To fulfil audit requirements","To verify the effectiveness of the plan under simulated conditions","To train new employees on their roles during an incident","To satisfy stakeholder demands for organisational resilience"],a:1,r:"BCP testing validates the plan will work when needed."},
  {id:47,d:2,q:"The term 'Business Impact Plan' refers to:",o:["A strategic plan for measuring financial losses from disruptions","This term does not exist in standard business continuity terminology","An alternate name for the Business Continuity Plan","A subsidiary plan within the DRP"],a:1,r:"'Business Impact Plan' is not a recognised term. Correct terms: BIA, BCP, DRP."},

  // Domain 3: Access Controls Concepts (Q48-Q64)
  {id:48,d:3,q:"Which access control model is MOST appropriate for a military organisation with highly classified information?",o:["Discretionary Access Control (DAC)","Mandatory Access Control (MAC)","Role-Based Access Control (RBAC)","Attribute-Based Access Control (ABAC)"],a:1,r:"MAC uses labels from a central authority. Users can't change clearance. Ideal for classified environments."},
  {id:49,d:3,q:"Which access control model is BEST suited for environments requiring dynamic adjustments based on changing contexts such as user location or time of access?",o:["Mandatory Access Control (MAC)","Discretionary Access Control (DAC)","Role-Based Access Control (RBAC)","Attribute-Based Access Control (ABAC)"],a:3,r:"ABAC evaluates multiple attributes simultaneously: user, resource, and environmental attributes."},
  {id:50,d:3,q:"In a Role-Based Access Control system, which scenario BEST demonstrates 'role explosion'?",o:["A system with a few predefined roles that cover all necessary permissions","A system where individual permissions are directly assigned to users instead of roles","A system that requires a new role for each unique combination of permissions","A system with roles defined at a very high level such as 'user' and 'administrator'"],a:2,r:"Role explosion = unmanageable number of roles from creating new ones instead of reusing."},
  {id:51,d:3,q:"What is the biggest challenge in a Discretionary Access Control (DAC) system?",o:["Ensuring users have minimum necessary permissions","Preventing propagation of access rights when objects are shared widely","Establishing fixed roles that accurately reflect organisational structure","Automatically adjusting permissions based on real-time data attributes"],a:1,r:"DAC risk: Trojan horse problem — malicious program inherits user's permissions."},
  {id:52,d:3,q:"Which principle of access control is primarily concerned with ensuring users are who they claim to be?",o:["Authentication","Authorisation","Accounting","Auditing"],a:0,r:"Authentication = proving identity. Authorisation = granting access. Accounting = recording activity."},
  {id:53,d:3,q:"Which type of authentication is 'something you are'?",o:["Type 1","Type 2","Type 3","Type 4"],a:2,r:"Type 1 = know (password). Type 2 = have (token). Type 3 = are (biometric). Type 4 = somewhere you are."},
  {id:54,d:3,q:"In an organisation using RBAC, which of the following BEST describes 'role mining'?",o:["Defining new roles based on observed user behaviour patterns","Manual assignment of users to predefined roles","Using automated tools to identify and correct improper role assignments","Reviewing and updating roles on a periodic basis"],a:0,r:"Role mining analyses existing user-permission assignments to derive optimal roles (bottom-up)."},
  {id:55,d:3,q:"What access control mechanism is MOST effective in preventing unauthorised access to sensitive resources in a cloud computing environment?",o:["Password complexity requirements","Multifactor authentication (MFA)","Periodic access reviews","Single sign-on (SSO)"],a:1,r:"MFA requires 2+ independent factors. Even if one factor is compromised, the account is protected."},
  {id:56,d:3,q:"In federated access management, what does a SAML assertion provide?",o:["A digital certificate for encrypting data in transit","A request for access between federated domains","A format for exchanging authentication and authorisation data","A schema for role-based access control settings"],a:2,r:"SAML = XML standard for exchanging auth data between IdP and SP. Used in federated SSO."},
  {id:57,d:3,q:"Which access control principle is violated when a user retains access rights to resources after changing roles?",o:["Separation of duties","Least privilege","Mandatory access control","Role explosion"],a:1,r:"Privilege creep = accumulated permissions exceeding current role. Violates least privilege."},
  {id:58,d:3,q:"Which is the MOST effective access control for preventing unauthorised access to a door?",o:["Fences","Turnstiles","Barriers","Locks"],a:3,r:"A lock directly prevents a door from being opened by unauthorised individuals."},
  {id:59,d:3,q:"What is the primary purpose of 'separation of duties' in access control?",o:["To ensure no single individual has control over all aspects of a transaction","To divide responsibilities among multiple systems to improve performance","To segregate network segments for security purposes","To allocate different shifts to employees for 24/7 coverage"],a:0,r:"SoD prevents fraud by requiring multiple people for sensitive transactions."},
  {id:60,d:3,q:"What is the primary security concern associated with delegation of rights?",o:["Increased complexity of access control lists","Potential for privilege escalation","Decreased efficiency in access control administration","Reduced granularity of access control"],a:1,r:"Delegation can enable privilege escalation if not carefully constrained."},
  {id:61,d:3,q:"In context-aware access control, which factor would NOT typically influence access decisions?",o:["The time of the access request","The user's compliance with corporate security training","The risk level associated with the accessed resource","The device used to make the access request"],a:1,r:"Training compliance is HR/governance, not evaluated in real-time access decisions."},
  {id:62,d:3,q:"Which access control model specifies access to an object based on the subject's role in the organisation?",o:["RBAC","MAC","ABAC","DAC"],a:0,r:"RBAC assigns permissions to roles, users are assigned to roles."},
  {id:63,d:3,q:"What type of security control is a biometric reader that grants access to a data centre building?",o:["Administrative control","Physical control","Technical/Logical control","Compensating control"],a:1,r:"Biometric reader at a physical entrance = physical security control."},
  {id:64,d:3,q:"Which of the following is an example of two-factor authentication (2FA)?",o:["Password and PIN","Smart card and fingerprint","Username and password","Two different passwords"],a:1,r:"2FA needs two DIFFERENT types. Smart card (have) + fingerprint (are). Password + PIN = both 'know'."},

  // Domain 4: Network Security (Q65-Q88)
  {id:65,d:4,q:"In the OSI model, at which layer does a network-based IDS typically operate?",o:["Layer 2 (Data Link)","Layer 3 (Network)","Layer 4 (Transport)","Layer 7 (Application)"],a:3,r:"NIDS with deep packet inspection operates at Layer 7 for application-layer content analysis."},
  {id:66,d:4,q:"Which encryption method is considered MOST secure for wireless networks?",o:["WEP","WPA","WPA2","WPA3"],a:3,r:"WPA3 is the strongest. Adds SAE handshake eliminating offline dictionary attacks."},
  {id:67,d:4,q:"Which protocol is primarily used for securely managing network devices remotely?",o:["SNMP","SSH","FTP","HTTP"],a:1,r:"SSH (TCP 22) provides encrypted remote shell access."},
  {id:68,d:4,q:"What is the primary purpose of using a VPN in network security?",o:["To create a secure and encrypted connection over a less secure network","To increase the speed of internet connections","To block malicious traffic and protect against malware","To manage network devices without using secure protocols"],a:0,r:"VPN = encrypted tunnel over untrusted network for confidentiality and integrity."},
  {id:69,d:4,q:"What is the primary function of a network access control (NAC) system?",o:["To encrypt data traffic on a network","To manage the distribution of IP addresses","To control access to a network based on compliance with defined security policies","To monitor network traffic for malicious activities"],a:2,r:"NAC enforces policy compliance (patches, AV, OS version) before granting network access."},
  {id:70,d:4,q:"Which technology is typically used to isolate broadcast domains in a network environment?",o:["VPN","VLAN","NAT","Proxy"],a:1,r:"VLANs logically segment a physical network into separate broadcast domains."},
  {id:71,d:4,q:"What is the main security advantage of implementing network segmentation?",o:["Reducing the overall cost of the network infrastructure","Increasing the speed of the network","Limiting the spread of malware and reducing the attack surface","Simplifying the management of the network"],a:2,r:"Segmentation contains lateral movement — compromise in one segment doesn't propagate."},
  {id:72,d:4,q:"Which protocol is designed to secure SNMP traffic, ensuring both encryption and data integrity?",o:["SNMPv3","SSH","HTTPS","SNMPv2"],a:0,r:"SNMPv3 adds authentication (MD5/SHA) and encryption (DES/AES). v1/v2c use cleartext."},
  {id:73,d:4,q:"What is the primary purpose of implementing a DMZ (Demilitarised Zone)?",o:["To segregate internal network traffic from external traffic","To encrypt all inbound and outbound communications","To provide a secure area for users to access the internet","To host public-facing services while protecting the internal network"],a:3,r:"DMZ hosts public servers (web, mail, DNS) between two firewalls. Compromise doesn't reach internal LAN."},
  {id:74,d:4,q:"In the context of network security, which BEST describes a Zero Trust model?",o:["Trusting all devices within the network but not external devices","Never trusting, always verifying every device whether inside or outside the network","Trusting devices based on their IP addresses","Implementing default allow rules in firewall configurations"],a:1,r:"Zero Trust: no implicit trust, every request verified regardless of source."},
  {id:75,d:4,q:"Which of the following is a characteristic of symmetric encryption within network security?",o:["It uses the same key for encryption and decryption","It uses a public key for encryption and a private key for decryption","It cannot be used for encrypting internet traffic","It provides a method for digital signatures"],a:0,r:"Symmetric = one shared key, fast, bulk data. Asymmetric = key pair, slow, key exchange/signatures."},
  {id:76,d:4,q:"What is the main function of a SIEM system in network security?",o:["To physically secure network hardware","To manage IP address allocations","To aggregate and analyse security-related events and information","To encrypt all data traffic within the network"],a:2,r:"SIEM collects logs, correlates events, generates alerts. Centralised security visibility."},
  {id:77,d:4,q:"What is a honeypot primarily used for?",o:["To serve as a primary defence mechanism against DDoS attacks","To act as a decoy, attracting attackers to monitor their activities","To encrypt data traffic passing through the network","To provide high availability and redundancy for network services"],a:1,r:"Honeypot = deliberately vulnerable decoy to attract and study attackers."},
  {id:78,d:4,q:"Which type of firewall is BEST suited for deep packet inspection (DPI)?",o:["Packet filtering firewall","Stateful firewall","Proxy firewall","Next-Generation Firewall (NGFW)"],a:3,r:"NGFW combines stateful inspection + Layer 7 analysis + IPS + SSL inspection. DPI is defining feature."},
  {id:79,d:4,q:"What is the primary security concern associated with BYOD policies?",o:["Increased complexity of network topology","Potential for unauthorised access to the network","Difficulty in managing IP address allocations","Requirement for additional physical security measures"],a:1,r:"Unmanaged personal devices may lack corporate security controls, creating entry points."},
  {id:80,d:4,q:"Internet Protocol (IP) is known as which level protocol in the OSI model?",o:["Level 7 (Application)","Level 4 (Transport)","Level 3 (Network)","Level 2 (Data Link)"],a:2,r:"IP = Layer 3 (Network). TCP/UDP = Layer 4. HTTP/SMTP = Layer 7."},
  {id:81,d:4,q:"When the mail server sends mail to other mail servers it operates as a:",o:["SMTP Server","SMTP Peer","SMTP Master","SMTP Client"],a:3,r:"Originating server = SMTP client. Receiving server = SMTP server."},
  {id:82,d:4,q:"How many bits represent the OUI (Organisationally Unique Identifier) in a MAC address?",o:["16 bits","48 bits","24 bits","32 bits"],a:2,r:"MAC = 48 bits total. First 24 = OUI (manufacturer). Last 24 = device-specific."},
  {id:83,d:4,q:"Which of the following is a primary security concern when implementing IPv6?",o:["The increased address space makes scanning more difficult","The mandatory use of encryption for IPv6 traffic","Misconfigured devices leading to security vulnerabilities","The elimination of NAT reducing security"],a:2,r:"IPv6 misconfiguration is the primary risk: dual-stack complexity, SLAAC, immature firewall rules."},
  {id:84,d:4,q:"Which of the following communication layers contains errors pertaining to syntax and format?",o:["Application layer","Session layer","Presentation layer","Physical layer"],a:0,r:"Application-layer protocols define message syntax and format. Syntax errors are app-layer concerns."},
  {id:85,d:4,q:"Which solution would ensure the LOWEST possible latency for a global e-commerce platform's customers?",o:["CDN","SaaS","Load balancing","Decentralised data centres"],a:0,r:"CDN places cached content at edge nodes geographically close to users, minimising round-trip time."},
  {id:86,d:4,q:"Which type of attack primarily aims to make a resource inaccessible to its intended users?",o:["Phishing","Denial of Service","Trojans","Cross-Site Scripting"],a:1,r:"DoS overwhelms resources to prevent legitimate access. Targets availability."},
  {id:87,d:4,q:"Which device is used to connect a LAN to the Internet?",o:["Router","Firewall","HIDS","SIEM"],a:0,r:"Routers connect different networks and forward packets between them."},
  {id:88,d:4,q:"What does the TCP three-way handshake consist of?",o:["SYN → ACK → FIN","Offer → Request → ACK","SYN → SYN/ACK → ACK","Discover → Offer → Request"],a:2,r:"TCP handshake: SYN → SYN/ACK → ACK. Option D describes DHCP lease."},

  // Domain 5: Security Operations (Q89-Q115)
  {id:89,d:5,q:"Which of the following BEST describes the primary purpose of a post-incident review?",o:["To update firewall rules to prevent future incidents","To evaluate the incident response process for improvements","To determine the financial impact of the incident on the organisation","To assign blame to team members who failed to prevent the incident"],a:1,r:"Post-incident review is blameless process improvement. Goal = better IRP, not punishment."},
  {id:90,d:5,q:"When configuring a SIEM system, which of the following is MOST critical to its effectiveness in detecting anomalies?",o:["The physical location of the SIEM server","The frequency of signature updates","The integration of threat intelligence feeds","The storage capacity for logs"],a:2,r:"Threat intel feeds enrich SIEM with current IOCs and TTPs. Without them, SIEMs miss novel attacks."},
  {id:91,d:5,q:"In the deployment of an IDS, what is the significance of tuning the IDS?",o:["To decrease the system's power consumption","To reduce the number of false positives and false negatives","To increase the data storage capacity of the system","To improve the graphical user interface for easier use"],a:1,r:"Untuned IDS = too much noise (false positives) or missed threats (false negatives)."},
  {id:92,d:5,q:"When conducting vulnerability assessments, why is it important to perform both automated scanning and manual testing?",o:["Automated scanning can replace manual testing entirely","Manual testing is only necessary for systems that cannot be scanned automatically","Automated scanning identifies all vulnerabilities while manual testing verifies them","Automated scanning and manual testing complement each other, identifying different types of vulnerabilities"],a:3,r:"Automated = broad coverage + known CVEs. Manual = logic flaws + chained vulns + context-dependent issues."},
  {id:93,d:5,q:"What is the primary function of a digital forensic tool in cybersecurity operations?",o:["To block malicious traffic in real-time","To analyse and recover digital evidence after a security incident","To encrypt data to prevent unauthorised access","To serve as a firewall between internal and external networks"],a:1,r:"Digital forensics = identify, preserve, collect, examine, analyse digital evidence. Used post-incident."},
  {id:94,d:5,q:"What role does a SOC analyst primarily play in threat hunting activities?",o:["Designing the company's website","Proactively searching for undetected threats within the network","Managing social media accounts for cybersecurity awareness","Organising company team-building events"],a:1,r:"Threat hunting = proactive, human-led, assumes existing controls have failed."},
  {id:95,d:5,q:"Why is it important to conduct periodic security assessments?",o:["To ensure controls continue to meet organisational security requirements","To comply with the interior design policies of the organisation","To determine the colour scheme for the security team's dashboard","To assess the entertainment value of security training programmes"],a:0,r:"Continuous change requires periodic verification that controls remain effective. PDCA cycle."},
  {id:96,d:5,q:"What is the PRIMARY benefit of implementing a regular patch management process?",o:["To enhance the graphical user interface of security tools","To ensure that all systems are running the latest, most secure software versions","To increase the storage capacity of servers","To improve the aesthetic appeal of the software"],a:1,r:"Patch management = foundational vulnerability management. Unpatched = most common attack vector."},
  {id:97,d:5,q:"What is the PRIMARY purpose of conducting a penetration test within the scope of security operations?",o:["To evaluate the performance of network equipment","To identify vulnerabilities in systems and networks before attackers do","To test the physical strength of the hardware","To assess the company's compliance with security policies"],a:1,r:"Pen testing simulates adversarial attacks to find exploitable vulns before real attackers."},
  {id:98,d:5,q:"When establishing a security baseline, which factor is MOST critical for maintaining system security?",o:["The popularity of the software used","The initial cost of the security tools","The compatibility of security settings with operational requirements","The colour themes of the user interface"],a:2,r:"A baseline that breaks operations will be bypassed. Balance hardening with functionality."},
  {id:99,d:5,q:"In the implementation of network segmentation, what is the PRIMARY security benefit?",o:["Increasing the network's bandwidth and reducing latency","Isolating network segments and containing security breaches","Replacing traditional firewalls with more modern technologies","Centralising all network security controls in one location"],a:1,r:"Segmentation = containment. Prevents lateral movement."},
  {id:100,d:5,q:"Why is User Behaviour Analytics (UBA) important in detecting insider threats?",o:["UBA focuses solely on external threat actors","UBA eliminates the need for traditional security measures","UBA uses machine learning to identify deviations from normal behaviour patterns","UBA increases network traffic for better analysis"],a:2,r:"Insiders have legit credentials so signature-based tools miss them. UBA flags behavioural anomalies."},
  {id:101,d:5,q:"Before applying patches to production systems, which of the following is considered BEST practice?",o:["Apply patches as quickly as possible to production immediately","Test patches in a qualification environment before applying to production","Apply patches based on vendor reputation alone","Apply patches on fixed days regardless of urgency"],a:1,r:"Patches must be tested in staging/QA to confirm no breakage before production deployment."},
  {id:102,d:5,q:"In Change Management, which component addresses the procedures needed to undo changes?",o:["Request for Approval","Rollback","Request for Change","Disaster Recovery"],a:1,r:"Rollback = planned procedure to reverse a change if problems occur."},
  {id:103,d:5,q:"Which of the following is NOT a type of learning activity used in Security Awareness?",o:["Tutorial","Awareness","Education","Training"],a:0,r:"Three levels: Awareness (all staff), Training (role-specific), Education (deep academic). Tutorial is not one."},
  {id:104,d:5,q:"Malicious emails that aim to attack company executives are an example of:",o:["Phishing","Trojans","Whaling","Rootkits"],a:2,r:"Whaling targets senior executives ('big fish'). Spear phishing = specific individual. Phishing = broad."},
  {id:105,d:5,q:"What is an effective way of hardening a system?",o:["Patch the system","Create a DMZ for web application services","Have an IDS in place","Run a vulnerability scan"],a:0,r:"Hardening = patching, disabling services, removing defaults, secure configs. Patching is most direct."},
  {id:106,d:5,q:"Which of these social engineering attacks corrupts an infrastructure service such as Domain Name System (DNS)?",o:["Spear Phishing","Pharming","Vishing","Whaling"],a:1,r:"Pharming corrupts DNS to redirect users to fraudulent sites. Attacks infrastructure, not people directly."},
  {id:107,d:5,q:"Vishing refers to which type of social engineering attack?",o:["Using a fraudulent interactive voice response system to trick victims into divulging sensitive information","Impersonating an authority figure via email","Following an authorised user into a restricted area","Requesting passwords in exchange for compensation"],a:0,r:"Vishing = voice phishing via phone/IVR. Tailgating = following through door. Email impersonation = phishing."},
  {id:108,d:5,q:"Which of the following is NOT an example of a physical security control?",o:["Security cameras","Biometric access controls at a building entrance","Remote control electronic locks","Firewalls"],a:3,r:"Firewalls = technical/logical control. Cameras, biometric readers at doors, locks = physical controls."},
  {id:109,d:5,q:"Which devices have the PRIMARY objective of collecting and analysing security events?",o:["Firewall","Hubs","Routers","SIEM"],a:3,r:"SIEM = purpose-built for collecting, aggregating, correlating, and analysing security events."},
  {id:110,d:5,q:"An organisation needs a network security tool that detects malicious activity. Which of these tools will BEST meet their requirements?",o:["Router","Firewall","IDS","IPS"],a:2,r:"IDS = detect and alert (passive). IPS = detect and block. Question says 'detects' so IDS."},
  {id:111,d:5,q:"Which type of attack will MOST effectively provide privileged access (root access on Unix/Linux) to a computer while hiding its presence?",o:["Rootkits","Phishing","Cross-Site Scripting","Trojans"],a:0,r:"Rootkit = persistent privileged access while hiding from detection."},
  {id:112,d:5,q:"How many data labels are generally considered manageable for an organisation?",o:["1","1–2","2–8","More than 10"],a:2,r:"ISC2 recommends 2–8 labels. Too few = insufficient granularity. Too many = confusion."},
  {id:113,d:5,q:"A community cloud deployment model is where:",o:["A single organisation exclusively uses the cloud infrastructure","Several organisations with similar needs share the infrastructure and resources","Cloud infrastructure is available to the general public","Two or more distinct cloud models are bound together"],a:1,r:"Community = shared by orgs with common concerns. Private = one org. Public = everyone. Hybrid = mix."},
  {id:114,d:5,q:"Which of the following is protected by regulations such as GDPR, HIPAA, and PCI-DSS?",o:["Protected Health Information (PHI)","Secure Credit Card Payments (SCCP)","Personally Identifiable Information (PII)","Publicly Identifiable Information (PII)"],a:2,r:"PII is the overarching concept across GDPR, HIPAA, and PCI-DSS."},
  {id:115,d:5,q:"A contract between a service provider and a customer that defines the expected level of service is known as a:",o:["Rules of Engagement (ROE)","Memorandum of Understanding (MOU)","Service Level Agreement (SLA)","Non-Disclosure Agreement (NDA)"],a:2,r:"SLA defines specific measurable service commitments. MOU = less formal. ROE = pen test scope. NDA = confidentiality."}
];

const DOMAIN_NAMES = {1:"Security Principles",2:"BC, DR & IR",3:"Access Controls",4:"Network Security",5:"Security Operations"};
const DOMAIN_COLORS = {1:"#c05746",2:"#b8860b",3:"#4a7c59",4:"#4a6fa5",5:"#7b5ea7"};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CATSimulator() {
  const [phase, setPhase] = useState("menu");
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(7200);
  const [examSize, setExamSize] = useState(100);
  const [domainFilter, setDomainFilter] = useState(0);
  const timerRef = useRef(null);

  const startExam = useCallback(() => {
    let pool = domainFilter === 0 ? [...QUESTIONS] : QUESTIONS.filter(q => q.d === domainFilter);
    const shuffled = shuffle(pool).slice(0, Math.min(examSize, pool.length));
    setQuestions(shuffled);
    setQIdx(0);
    setSelected(null);
    setConfirmed(false);
    setAnswers([]);
    setTimer(7200);
    setPhase("exam");
  }, [examSize, domainFilter]);

  useEffect(() => {
    if (phase === "exam") {
      timerRef.current = setInterval(() => {
        setTimer(t => {
          if (t <= 1) { clearInterval(timerRef.current); setPhase("results"); return 0; }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [phase]);

  const confirmAnswer = () => {
    if (selected === null) return;
    const correct = selected === questions[qIdx].a;
    setAnswers(prev => [...prev, { qId: questions[qIdx].id, domain: questions[qIdx].d, selected, correct, correctAnswer: questions[qIdx].a }]);
    setConfirmed(true);
  };

  const nextQuestion = () => {
    if (qIdx + 1 >= questions.length) {
      clearInterval(timerRef.current);
      setPhase("results");
    } else {
      setQIdx(qIdx + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };

  const formatTime = (s) => `${Math.floor(s/3600)}:${String(Math.floor((s%3600)/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const getScore = () => {
    const correct = answers.filter(a => a.correct).length;
    const total = answers.length;
    const pct = total > 0 ? Math.round((correct / total) * 1000) : 0;
    return { correct, total, pct };
  };

  const getDomainStats = () => {
    const stats = {};
    for (const d of [1,2,3,4,5]) {
      const domAnswers = answers.filter(a => a.domain === d);
      const correct = domAnswers.filter(a => a.correct).length;
      stats[d] = { total: domAnswers.length, correct, pct: domAnswers.length > 0 ? Math.round((correct/domAnswers.length)*100) : 0 };
    }
    return stats;
  };

  // MENU SCREEN
  if (phase === "menu") {
    return (
      <div style={{fontFamily:"'JetBrains Mono', 'Fira Code', monospace", background:"#0a0e17", color:"#c8d6e5", minHeight:"100vh", padding:"24px", boxSizing:"border-box"}}>
        <div style={{maxWidth:680, margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{fontSize:11,letterSpacing:6,color:"#4a6fa5",marginBottom:8,textTransform:"uppercase"}}>ISC2 Certified in Cybersecurity</div>
            <h1 style={{fontSize:28,fontWeight:700,color:"#e8ecf1",margin:0,letterSpacing:"-0.5px"}}>CAT Exam Simulator</h1>
            <div style={{fontSize:12,color:"#5a6a7e",marginTop:8}}>115 questions · Timed · No backtracking · Scored by domain</div>
          </div>

          <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:8,padding:24,marginBottom:20}}>
            <div style={{fontSize:13,color:"#8899aa",marginBottom:12,fontWeight:600,textTransform:"uppercase",letterSpacing:2}}>Exam Configuration</div>

            <div style={{marginBottom:20}}>
              <label style={{fontSize:12,color:"#6b7a8d",display:"block",marginBottom:8}}>Number of Questions</label>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {[25,50,75,100,115].map(n => (
                  <button key={n} onClick={() => setExamSize(n)} style={{
                    padding:"8px 16px",fontSize:13,borderRadius:4,border: examSize===n ? "1px solid #4a6fa5" : "1px solid #1e293b",
                    background: examSize===n ? "#1a2744" : "#0d1321", color: examSize===n ? "#7db4f0" : "#5a6a7e",
                    cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"
                  }}>{n}{n===100 ? " (exam)" : n===115 ? " (all)" : ""}</button>
                ))}
              </div>
            </div>

            <div style={{marginBottom:20}}>
              <label style={{fontSize:12,color:"#6b7a8d",display:"block",marginBottom:8}}>Domain Filter</label>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button onClick={() => setDomainFilter(0)} style={{
                  padding:"8px 16px",fontSize:12,borderRadius:4,cursor:"pointer",fontFamily:"inherit",
                  border: domainFilter===0 ? "1px solid #4a6fa5" : "1px solid #1e293b",
                  background: domainFilter===0 ? "#1a2744" : "#0d1321", color: domainFilter===0 ? "#7db4f0" : "#5a6a7e"
                }}>All Domains</button>
                {[1,2,3,4,5].map(d => (
                  <button key={d} onClick={() => setDomainFilter(d)} style={{
                    padding:"8px 16px",fontSize:11,borderRadius:4,cursor:"pointer",fontFamily:"inherit",
                    border: domainFilter===d ? `1px solid ${DOMAIN_COLORS[d]}` : "1px solid #1e293b",
                    background: domainFilter===d ? "#1a2744" : "#0d1321",
                    color: domainFilter===d ? DOMAIN_COLORS[d] : "#5a6a7e"
                  }}>D{d}</button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={startExam} style={{
            width:"100%",padding:"14px",fontSize:15,fontWeight:700,borderRadius:6,border:"none",
            background:"linear-gradient(135deg,#1a3a5c,#2a5a8c)",color:"#e8ecf1",cursor:"pointer",
            fontFamily:"inherit",letterSpacing:1,textTransform:"uppercase",transition:"all 0.2s"
          }}>Begin Exam</button>

          <div style={{marginTop:24,padding:16,background:"#0d1321",border:"1px solid #1a1f2e",borderRadius:6,fontSize:11,color:"#4a5568",lineHeight:1.7}}>
            <strong style={{color:"#6b7a8d"}}>CAT Rules:</strong> Questions are randomised. You cannot go back. A 2-hour timer runs from start. Confirm each answer before proceeding. Score breakdown by domain shown at end. 700/1000 = pass.
          </div>
        </div>
      </div>
    );
  }

  // EXAM SCREEN
  if (phase === "exam") {
    const q = questions[qIdx];
    const progress = ((qIdx + (confirmed ? 1 : 0)) / questions.length) * 100;
    const timeWarning = timer < 600;

    return (
      <div style={{fontFamily:"'JetBrains Mono', 'Fira Code', monospace", background:"#0a0e17", color:"#c8d6e5", minHeight:"100vh", padding:"16px", boxSizing:"border-box"}}>
        <div style={{maxWidth:720, margin:"0 auto"}}>
          {/* Header Bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,fontSize:11,color:"#5a6a7e"}}>
            <span>Q {qIdx+1} / {questions.length}</span>
            <span style={{color:timeWarning?"#c05746":"#4a6fa5",fontWeight:timeWarning?700:400}}>{formatTime(timer)}</span>
          </div>

          {/* Progress Bar */}
          <div style={{height:3,background:"#1a1f2e",borderRadius:2,marginBottom:16,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:"#4a6fa5",transition:"width 0.3s",borderRadius:2}}/>
          </div>

          {/* Domain Badge */}
          <div style={{display:"inline-block",padding:"3px 10px",borderRadius:3,fontSize:10,fontWeight:600,letterSpacing:1,
            background:`${DOMAIN_COLORS[q.d]}15`,color:DOMAIN_COLORS[q.d],border:`1px solid ${DOMAIN_COLORS[q.d]}30`,
            marginBottom:16,textTransform:"uppercase"
          }}>Domain {q.d}: {DOMAIN_NAMES[q.d]}</div>

          {/* Question */}
          <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:8,padding:24,marginBottom:16}}>
            <p style={{fontSize:14,lineHeight:1.75,margin:0,color:"#e0e7ef"}}>{q.q}</p>
          </div>

          {/* Options */}
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
            {q.o.map((opt, i) => {
              let bg = "#0d1321";
              let border = "#1e293b";
              let col = "#a0aec0";
              let indicator = String.fromCharCode(65+i);
              let indicatorBg = "#1a1f2e";
              let indicatorCol = "#5a6a7e";

              if (confirmed) {
                if (i === q.a) { bg = "#0a2e1a"; border = "#1a6b3a"; col = "#6be89a"; indicatorBg = "#1a6b3a"; indicatorCol = "#0a2e1a"; }
                else if (i === selected && !answers[answers.length-1]?.correct) { bg = "#2e0a0a"; border = "#8b3a3a"; col = "#e86b6b"; indicatorBg = "#8b3a3a"; indicatorCol = "#2e0a0a"; }
              } else if (i === selected) {
                bg = "#1a2744"; border = "#4a6fa5"; col = "#7db4f0"; indicatorBg = "#4a6fa5"; indicatorCol = "#0a0e17";
              }

              return (
                <button key={i} onClick={() => !confirmed && setSelected(i)} disabled={confirmed} style={{
                  display:"flex",alignItems:"flex-start",gap:12,padding:"12px 16px",borderRadius:6,
                  border:`1px solid ${border}`,background:bg,color:col,cursor:confirmed?"default":"pointer",
                  fontFamily:"inherit",fontSize:13,lineHeight:1.6,textAlign:"left",transition:"all 0.15s",
                  opacity: confirmed && i !== q.a && i !== selected ? 0.4 : 1
                }}>
                  <span style={{flexShrink:0,width:24,height:24,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:11,fontWeight:700,background:indicatorBg,color:indicatorCol
                  }}>{indicator}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Rationale (shown after confirm) */}
          {confirmed && (
            <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:6,padding:16,marginBottom:16,fontSize:12,lineHeight:1.7,color:"#8899aa"}}>
              <strong style={{color:"#6b7a8d"}}>Rationale:</strong> {q.r}
            </div>
          )}

          {/* Action Button */}
          {!confirmed ? (
            <button onClick={confirmAnswer} disabled={selected===null} style={{
              width:"100%",padding:"12px",fontSize:13,fontWeight:700,borderRadius:6,border:"none",
              background: selected!==null ? "linear-gradient(135deg,#1a3a5c,#2a5a8c)" : "#1a1f2e",
              color: selected!==null ? "#e8ecf1" : "#3a4558",cursor: selected!==null ? "pointer" : "not-allowed",
              fontFamily:"inherit",letterSpacing:1,textTransform:"uppercase",transition:"all 0.2s"
            }}>Confirm Answer</button>
          ) : (
            <button onClick={nextQuestion} style={{
              width:"100%",padding:"12px",fontSize:13,fontWeight:700,borderRadius:6,border:"none",
              background:"linear-gradient(135deg,#1a3a5c,#2a5a8c)",color:"#e8ecf1",cursor:"pointer",
              fontFamily:"inherit",letterSpacing:1,textTransform:"uppercase"
            }}>{qIdx + 1 >= questions.length ? "View Results" : "Next Question →"}</button>
          )}
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (phase === "results") {
    const { correct, total, pct } = getScore();
    const passed = pct >= 700;
    const domainStats = getDomainStats();
    const missed = answers.filter(a => !a.correct);

    return (
      <div style={{fontFamily:"'JetBrains Mono', 'Fira Code', monospace", background:"#0a0e17", color:"#c8d6e5", minHeight:"100vh", padding:"24px", boxSizing:"border-box"}}>
        <div style={{maxWidth:680, margin:"0 auto"}}>
          {/* Score Header */}
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{fontSize:11,letterSpacing:4,color:"#5a6a7e",marginBottom:12,textTransform:"uppercase"}}>Exam Complete</div>
            <div style={{fontSize:64,fontWeight:700,color:passed?"#6be89a":"#e86b6b",lineHeight:1}}>{pct}</div>
            <div style={{fontSize:13,color:"#5a6a7e"}}>/ 1000 scaled</div>
            <div style={{
              display:"inline-block",marginTop:12,padding:"6px 20px",borderRadius:4,fontSize:12,fontWeight:700,letterSpacing:2,
              background:passed?"#0a2e1a":"#2e0a0a",color:passed?"#6be89a":"#e86b6b",border:`1px solid ${passed?"#1a6b3a":"#8b3a3a"}`,
              textTransform:"uppercase"
            }}>{passed ? "PASS" : "BELOW PASSING"}</div>
            <div style={{fontSize:12,color:"#5a6a7e",marginTop:12}}>{correct} / {total} correct ({Math.round((correct/total)*100)}%)</div>
          </div>

          {/* Domain Breakdown */}
          <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:8,padding:20,marginBottom:20}}>
            <div style={{fontSize:11,color:"#6b7a8d",letterSpacing:2,marginBottom:16,fontWeight:600,textTransform:"uppercase"}}>Domain Performance</div>
            {[1,2,3,4,5].map(d => {
              const s = domainStats[d];
              if (s.total === 0) return null;
              const barPct = s.pct;
              return (
                <div key={d} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4}}>
                    <span style={{color:DOMAIN_COLORS[d]}}>D{d}: {DOMAIN_NAMES[d]}</span>
                    <span style={{color: barPct >= 70 ? "#6be89a" : barPct >= 50 ? "#b8860b" : "#e86b6b"}}>{s.correct}/{s.total} ({barPct}%)</span>
                  </div>
                  <div style={{height:6,background:"#1a1f2e",borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${barPct}%`,background: barPct >= 70 ? "#1a6b3a" : barPct >= 50 ? "#8b6914" : "#8b3a3a",borderRadius:3,transition:"width 0.5s"}}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Missed Questions Review */}
          {missed.length > 0 && (
            <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:8,padding:20,marginBottom:20}}>
              <div style={{fontSize:11,color:"#6b7a8d",letterSpacing:2,marginBottom:16,fontWeight:600,textTransform:"uppercase"}}>
                Review Missed ({missed.length})
              </div>
              <div style={{maxHeight:400,overflowY:"auto"}}>
                {missed.map((m, i) => {
                  const q = QUESTIONS.find(qq => qq.id === m.qId);
                  return (
                    <div key={i} style={{padding:"12px 0",borderBottom:"1px solid #1a1f2e",fontSize:12,lineHeight:1.6}}>
                      <div style={{color:"#8899aa",marginBottom:4}}>Q{q.id} · <span style={{color:DOMAIN_COLORS[q.d]}}>D{q.d}</span></div>
                      <div style={{color:"#c8d6e5",marginBottom:6}}>{q.q}</div>
                      <div style={{color:"#e86b6b",fontSize:11}}>Your answer: {String.fromCharCode(65+m.selected)}. {q.o[m.selected]}</div>
                      <div style={{color:"#6be89a",fontSize:11}}>Correct: {String.fromCharCode(65+q.a)}. {q.o[q.a]}</div>
                      <div style={{color:"#5a6a7e",fontSize:11,marginTop:4,fontStyle:"italic"}}>{q.r}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Retry */}
          <button onClick={() => { setPhase("menu"); }} style={{
            width:"100%",padding:"14px",fontSize:13,fontWeight:700,borderRadius:6,border:"none",
            background:"linear-gradient(135deg,#1a3a5c,#2a5a8c)",color:"#e8ecf1",cursor:"pointer",
            fontFamily:"inherit",letterSpacing:1,textTransform:"uppercase"
          }}>Return to Menu</button>
        </div>
      </div>
    );
  }

  return null;
}
