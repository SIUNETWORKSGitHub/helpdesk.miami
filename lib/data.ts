export type Category =
  | "SMB Onboarding"
  | "Cybersecurity Awareness"
  | "Cloud & SaaS Tools"
  | "Troubleshooting";

export type RoleTag = "SMB Employee" | "IT Support" | "IT Manager" | "Security Champion";
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";
export type DocumentType = "Lesson" | "Checklist" | "Guide" | "Runbook" | "Policy";

export type Chapter = {
  title: string;
  timestamp: string;
};

export type MediaItem = {
  id: string;
  title: string;
  category: Category;
  type: "video" | "pdf";
  url: string;
  description: string;
  role: RoleTag;
  skillLevel: SkillLevel;
  durationMinutes: number;
  documentType: DocumentType;
  chapters?: Chapter[];
};

export const mediaLibrary: MediaItem[] = [
  {
    id: "onboarding-video-1",
    title: "SMB Service Desk Onboarding Essentials",
    category: "SMB Onboarding",
    type: "video",
    url: "https://www.youtube.com/embed/2ePf9rue1Ao",
    description: "Get new employees productive with core ticketing, escalation, and communication habits.",
    role: "SMB Employee",
    skillLevel: "Beginner",
    durationMinutes: 9,
    documentType: "Lesson",
    chapters: [
      { title: "Welcome to SMB Support", timestamp: "00:00" },
      { title: "Ticket Intake Standards", timestamp: "02:10" },
      { title: "Escalation Hand-off Rules", timestamp: "05:45" },
    ],
  },
  {
    id: "onboarding-pdf-1",
    title: "SMB IT Onboarding Checklist",
    category: "SMB Onboarding",
    type: "pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "Role-based onboarding checklist for staff, managers, and internal IT coordinators.",
    role: "IT Manager",
    skillLevel: "Beginner",
    durationMinutes: 12,
    documentType: "Checklist",
  },
  {
    id: "security-video-1",
    title: "Cybersecurity Awareness for SMB Teams",
    category: "Cybersecurity Awareness",
    type: "video",
    url: "https://www.youtube.com/embed/inWWhr5tnEA",
    description: "Train employees to identify phishing, secure endpoints, and report incidents quickly.",
    role: "Security Champion",
    skillLevel: "Beginner",
    durationMinutes: 11,
    documentType: "Lesson",
    chapters: [
      { title: "Threats SMB Teams Face", timestamp: "00:00" },
      { title: "Phishing Recognition", timestamp: "03:00" },
      { title: "Incident Reporting Workflow", timestamp: "07:15" },
    ],
  },
  {
    id: "security-pdf-1",
    title: "SMB Incident Response Runbook",
    category: "Cybersecurity Awareness",
    type: "pdf",
    url: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    description: "Step-by-step response flow for triage, containment, evidence capture, and communication.",
    role: "IT Support",
    skillLevel: "Intermediate",
    durationMinutes: 16,
    documentType: "Runbook",
  },
  {
    id: "cloud-video-1",
    title: "Cloud SaaS Admin Fundamentals",
    category: "Cloud & SaaS Tools",
    type: "video",
    url: "https://www.youtube.com/embed/GfQS7w6fT0E",
    description: "Manage identity, permissions, and app governance across common SMB SaaS platforms.",
    role: "IT Support",
    skillLevel: "Intermediate",
    durationMinutes: 14,
    documentType: "Lesson",
    chapters: [
      { title: "SaaS Governance Basics", timestamp: "00:00" },
      { title: "Access & Role Policies", timestamp: "04:20" },
      { title: "Compliance Checkpoints", timestamp: "10:05" },
    ],
  },
  {
    id: "cloud-pdf-1",
    title: "Cloud Access Governance Guide",
    category: "Cloud & SaaS Tools",
    type: "pdf",
    url: "https://www.africau.edu/images/default/sample.pdf",
    description: "Practical guide for account lifecycle controls and SaaS audit readiness in SMB environments.",
    role: "IT Manager",
    skillLevel: "Advanced",
    durationMinutes: 18,
    documentType: "Guide",
  },
  {
    id: "troubleshooting-video-1",
    title: "SMB Network & Endpoint Troubleshooting",
    category: "Troubleshooting",
    type: "video",
    url: "https://www.youtube.com/embed/vv4y_uOneC0",
    description: "Resolve common Wi-Fi, DNS, and workstation issues using repeatable triage steps.",
    role: "IT Support",
    skillLevel: "Intermediate",
    durationMinutes: 13,
    documentType: "Lesson",
    chapters: [
      { title: "Rapid Triage Flow", timestamp: "00:00" },
      { title: "Network Diagnostics", timestamp: "03:40" },
      { title: "User Recovery & Closure", timestamp: "08:55" },
    ],
  },
  {
    id: "troubleshooting-pdf-1",
    title: "SMB Troubleshooting Policy Template",
    category: "Troubleshooting",
    type: "pdf",
    url: "https://www.orimi.com/pdf-test.pdf",
    description: "Policy template for issue ownership, SLA response windows, and escalation governance.",
    role: "IT Manager",
    skillLevel: "Intermediate",
    durationMinutes: 10,
    documentType: "Policy",
  },
];

export const categories: Category[] = [
  "SMB Onboarding",
  "Cybersecurity Awareness",
  "Cloud & SaaS Tools",
  "Troubleshooting",
];

export const roleTags: RoleTag[] = ["SMB Employee", "IT Support", "IT Manager", "Security Champion"];
export const skillLevels: SkillLevel[] = ["Beginner", "Intermediate", "Advanced"];
export const documentTypes: DocumentType[] = ["Lesson", "Checklist", "Guide", "Runbook", "Policy"];

export function getDurationBucket(durationMinutes: number): "Under 10 min" | "10-20 min" | "20+ min" {
  if (durationMinutes < 10) {
    return "Under 10 min";
  }

  if (durationMinutes <= 20) {
    return "10-20 min";
  }

  return "20+ min";
}

export type AdvisorRequest = {
  goals: string;
  knowledge: string;
  role: string;
};

export type AdvisorResponse = {
  track: "SMB Onboarding" | "Cybersecurity Awareness" | "Cloud & SaaS Tools" | "Troubleshooting";
  summary: string;
  nextSteps: string[];
};

export function buildLearningPath({ goals, knowledge, role }: AdvisorRequest): AdvisorResponse {
  const input = `${goals} ${knowledge} ${role}`.toLowerCase();

  if (input.includes("security") || input.includes("phishing") || input.includes("compliance") || input.includes("risk")) {
    return {
      track: "Cybersecurity Awareness",
      summary: "Prioritize cyber hygiene, incident readiness, and role-specific awareness controls for SMB operations.",
      nextSteps: [
        "Complete the cybersecurity awareness video lesson",
        "Adopt the SMB incident response runbook during tabletop drills",
        "Assign a security champion in each internal department",
      ],
    };
  }

  if (input.includes("cloud") || input.includes("saas") || input.includes("identity") || input.includes("microsoft 365")) {
    return {
      track: "Cloud & SaaS Tools",
      summary: "Strengthen cloud account governance, SaaS controls, and compliance visibility for growing teams.",
      nextSteps: [
        "Finish the cloud SaaS admin fundamentals lesson",
        "Review and apply the cloud access governance guide",
        "Schedule monthly SaaS role-permission audits",
      ],
    };
  }

  if (input.includes("troubleshoot") || input.includes("network") || input.includes("ticket") || input.includes("incident")) {
    return {
      track: "Troubleshooting",
      summary: "Improve service quality with structured triage and faster recovery workflows across SMB support queues.",
      nextSteps: [
        "Complete SMB network and endpoint troubleshooting lesson",
        "Adopt the troubleshooting policy template with SLA expectations",
        "Run a weekly review of escalated tickets and root causes",
      ],
    };
  }

  return {
    track: "SMB Onboarding",
    summary: "Build foundational readiness so new SMB members and internal IT teams can collaborate effectively.",
    nextSteps: [
      "Start with the SMB service desk onboarding essentials lesson",
      "Roll out the SMB IT onboarding checklist for new hires",
      "Use Siucloud AI monthly to refresh role-based training paths",
    ],
  };
}
