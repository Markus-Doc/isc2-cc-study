window.ISC2_CC_DATA = {
  domains: [
    'Security Principles',
    'Business Continuity, Disaster Recovery, and Incident Response Concepts',
    'Access Controls Concepts',
    'Network Security',
    'Security Operations'
  ],
  drills: [
    {
      id: 'd001',
      domain: 'Security Principles',
      prompt: 'CIA triad',
      answer: 'Confidentiality, Integrity, and Availability.',
      memoryHook: 'Keep it secret, keep it correct, keep it running.',
      tags: ['core', 'must know']
    },
    {
      id: 'd002',
      domain: 'Security Principles',
      prompt: 'AAA',
      answer: 'Authentication, Authorisation, and Accounting.',
      memoryHook: 'Who are you, what can you do, what did you do.',
      tags: ['identity']
    },
    {
      id: 'd003',
      domain: 'Access Controls Concepts',
      prompt: 'Least privilege',
      answer: 'Grant only the minimum access required to perform authorised tasks.',
      memoryHook: 'Access should be enough, not convenient.',
      tags: ['access control']
    },
    {
      id: 'd004',
      domain: 'Access Controls Concepts',
      prompt: 'Separation of duties',
      answer: 'Split critical tasks across multiple people or roles to reduce fraud, error, and abuse.',
      memoryHook: 'No single person controls the whole risky process.',
      tags: ['governance']
    },
    {
      id: 'd005',
      domain: 'Security Principles',
      prompt: 'Defence in depth',
      answer: 'Use multiple layers of controls so one failure does not expose the whole system.',
      memoryHook: 'One control fails, another still stands.',
      tags: ['architecture']
    },
    {
      id: 'd006',
      domain: 'Business Continuity, Disaster Recovery, and Incident Response Concepts',
      prompt: 'RTO',
      answer: 'Recovery Time Objective. The maximum acceptable time to restore a service after disruption.',
      memoryHook: 'How long can we be down.',
      tags: ['BCDR']
    },
    {
      id: 'd007',
      domain: 'Business Continuity, Disaster Recovery, and Incident Response Concepts',
      prompt: 'RPO',
      answer: 'Recovery Point Objective. The maximum acceptable amount of data loss measured in time.',
      memoryHook: 'How much data can we lose.',
      tags: ['BCDR']
    },
    {
      id: 'd008',
      domain: 'Business Continuity, Disaster Recovery, and Incident Response Concepts',
      prompt: 'Incident response phases',
      answer: 'Preparation, detection and analysis, containment, eradication, recovery, and lessons learned.',
      memoryHook: 'Prepare, detect, contain, remove, recover, improve.',
      tags: ['IR']
    },
    {
      id: 'd009',
      domain: 'Network Security',
      prompt: 'Firewall purpose',
      answer: 'A firewall filters traffic based on rules to allow or block network communication.',
      memoryHook: 'Rules decide what traffic passes.',
      tags: ['network']
    },
    {
      id: 'd010',
      domain: 'Network Security',
      prompt: 'IDS versus IPS',
      answer: 'IDS detects and alerts. IPS detects and can actively block or prevent traffic.',
      memoryHook: 'D detects. P prevents.',
      tags: ['network']
    },
    {
      id: 'd011',
      domain: 'Security Operations',
      prompt: 'Security awareness training',
      answer: 'Training users to recognise threats, follow policy, and reduce human risk.',
      memoryHook: 'People are part of the control environment.',
      tags: ['operations']
    },
    {
      id: 'd012',
      domain: 'Security Operations',
      prompt: 'Change management',
      answer: 'A controlled process for requesting, approving, testing, implementing, and reviewing changes.',
      memoryHook: 'Change safely, not randomly.',
      tags: ['operations']
    },
    {
      id: 'd013',
      domain: 'Security Principles',
      prompt: 'Risk',
      answer: 'The possibility that a threat will exploit a vulnerability and cause harm.',
      memoryHook: 'Threat plus weakness plus impact.',
      tags: ['risk']
    },
    {
      id: 'd014',
      domain: 'Security Principles',
      prompt: 'Vulnerability',
      answer: 'A weakness that could be exploited by a threat.',
      memoryHook: 'The gap an attacker or accident can use.',
      tags: ['risk']
    },
    {
      id: 'd015',
      domain: 'Security Operations',
      prompt: 'Backup testing',
      answer: 'Backups must be tested through restore exercises to confirm they work when needed.',
      memoryHook: 'A backup is only proven after restore.',
      tags: ['BCDR', 'operations']
    }
  ],
  questions: [
    {
      id: 'q001',
      domain: 'Access Controls Concepts',
      question: 'Which security principle means users should only have the access needed to perform their authorised tasks?',
      options: ['Separation of duties', 'Least privilege', 'Defence in depth', 'Nonrepudiation'],
      correctIndex: 1,
      explanation: 'Least privilege limits access to the minimum required for the user, role, or process.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q002',
      domain: 'Security Principles',
      question: 'Which part of the CIA triad focuses on preventing unauthorised disclosure of information?',
      options: ['Integrity', 'Availability', 'Confidentiality', 'Accountability'],
      correctIndex: 2,
      explanation: 'Confidentiality protects information from unauthorised access or disclosure.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q003',
      domain: 'Business Continuity, Disaster Recovery, and Incident Response Concepts',
      question: 'Which metric defines the maximum acceptable time to restore a service after an outage?',
      options: ['RPO', 'RTO', 'MTBF', 'ALE'],
      correctIndex: 1,
      explanation: 'RTO is the Recovery Time Objective. It defines how quickly a service must be restored.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q004',
      domain: 'Business Continuity, Disaster Recovery, and Incident Response Concepts',
      question: 'Which metric defines the maximum acceptable amount of data loss measured in time?',
      options: ['RTO', 'RPO', 'SLE', 'MTTR'],
      correctIndex: 1,
      explanation: 'RPO is the Recovery Point Objective. It defines how far back recovery can go before data loss becomes unacceptable.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q005',
      domain: 'Network Security',
      question: 'What is the main difference between an IDS and an IPS?',
      options: ['An IDS blocks traffic, while an IPS only logs traffic', 'An IDS detects and alerts, while an IPS can actively prevent traffic', 'An IDS encrypts traffic, while an IPS decrypts traffic', 'They are the same control with different names'],
      correctIndex: 1,
      explanation: 'An intrusion detection system primarily detects and alerts. An intrusion prevention system can take action to block or prevent traffic.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q006',
      domain: 'Security Operations',
      question: 'Why should backups be tested regularly?',
      options: ['To increase storage usage', 'To prove that data can be restored when needed', 'To avoid encrypting backup files', 'To replace incident response planning'],
      correctIndex: 1,
      explanation: 'A backup is not fully trustworthy until restore testing proves it can be recovered successfully.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q007',
      domain: 'Security Principles',
      question: 'Which control concept uses multiple layers so that one failed control does not expose the whole system?',
      options: ['Defence in depth', 'Single sign-on', 'Job rotation', 'Risk transference'],
      correctIndex: 0,
      explanation: 'Defence in depth uses layered controls to reduce reliance on any single protection.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q008',
      domain: 'Access Controls Concepts',
      question: 'Which AAA function records user activity for traceability?',
      options: ['Authentication', 'Authorisation', 'Accounting', 'Availability'],
      correctIndex: 2,
      explanation: 'Accounting records activity and supports auditing and accountability.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q009',
      domain: 'Security Operations',
      question: 'What is the purpose of change management?',
      options: ['To prevent all changes', 'To control and document changes to reduce operational risk', 'To remove the need for backups', 'To replace access control'],
      correctIndex: 1,
      explanation: 'Change management ensures changes are requested, assessed, approved, tested, implemented, and reviewed in a controlled way.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q010',
      domain: 'Security Principles',
      question: 'What is a vulnerability?',
      options: ['A weakness that could be exploited', 'The probability of loss only', 'A person who attacks a system', 'A recovery target'],
      correctIndex: 0,
      explanation: 'A vulnerability is a weakness in a system, process, or control that could be exploited by a threat.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q011',
      domain: 'Network Security',
      question: 'What does a firewall primarily do?',
      options: ['Creates passwords', 'Filters network traffic based on rules', 'Stores backups', 'Performs legal review'],
      correctIndex: 1,
      explanation: 'A firewall allows or blocks traffic based on configured rules and policy.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    },
    {
      id: 'q012',
      domain: 'Business Continuity, Disaster Recovery, and Incident Response Concepts',
      question: 'Which activity usually happens after an incident has been contained, eradicated, and recovered from?',
      options: ['Lessons learned', 'Initial compromise', 'Threat modelling', 'Password guessing'],
      correctIndex: 0,
      explanation: 'Lessons learned reviews what happened and improves processes, controls, and response plans.',
      answerSource: 'seeded ISC2 CC concept',
      confidence: 'high'
    }
  ]
}
