export type Category = "Tier 1 Fundamentals" | "Networking" | "Systems Administration" | "Security";

export type MediaItem = {
  id: string;
  title: string;
  category: Category;
  type: "video" | "pdf";
  url: string;
  description: string;
};

export const mediaLibrary: MediaItem[] = [
  {
    id: "t1-video-1",
    title: "Ticket Triage Basics",
    category: "Tier 1 Fundamentals",
    type: "video",
    url: "https://www.youtube.com/embed/2ePf9rue1Ao",
    description: "How to collect user details, classify urgency, and route tickets.",
  },
  {
    id: "t1-pdf-1",
    title: "Service Desk SOP Quick Guide",
    category: "Tier 1 Fundamentals",
    type: "pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "Standard operating procedures for first-line support workflows.",
  },
  {
    id: "net-video-1",
    title: "OSI Model for Support Engineers",
    category: "Networking",
    type: "video",
    url: "https://www.youtube.com/embed/vv4y_uOneC0",
    description: "Practical OSI troubleshooting steps for support teams.",
  },
  {
    id: "net-pdf-1",
    title: "Network Troubleshooting Checklist",
    category: "Networking",
    type: "pdf",
    url: "https://www.orimi.com/pdf-test.pdf",
    description: "Layered checklist for DNS, DHCP, connectivity, and routing issues.",
  },
  {
    id: "sys-video-1",
    title: "Active Directory Fundamentals",
    category: "Systems Administration",
    type: "video",
    url: "https://www.youtube.com/embed/GfQS7w6fT0E",
    description: "Account lifecycle, groups, permissions, and OU organization.",
  },
  {
    id: "sys-pdf-1",
    title: "Windows Server Maintenance Runbook",
    category: "Systems Administration",
    type: "pdf",
    url: "https://www.africau.edu/images/default/sample.pdf",
    description: "Patch cadence, validation checks, and rollback best practices.",
  },
  {
    id: "sec-video-1",
    title: "Endpoint Security Essentials",
    category: "Security",
    type: "video",
    url: "https://www.youtube.com/embed/inWWhr5tnEA",
    description: "Incident response basics and endpoint hardening controls.",
  },
  {
    id: "sec-pdf-1",
    title: "Security Incident Response Playbook",
    category: "Security",
    type: "pdf",
    url: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    description: "Detection, escalation, containment, and communications templates.",
  },
];

export const categories: Category[] = [
  "Tier 1 Fundamentals",
  "Networking",
  "Systems Administration",
  "Security",
];

export type AdvisorRequest = {
  goals: string;
  knowledge: string;
  role: string;
};

export type AdvisorResponse = {
  track: "Helpdesk Technician" | "Network Support Specialist" | "SysAdmin Track";
  summary: string;
  nextSteps: string[];
};

export function buildLearningPath({ goals, knowledge, role }: AdvisorRequest): AdvisorResponse {
  const input = `${goals} ${knowledge} ${role}`.toLowerCase();

  if (input.includes("network") || input.includes("routing") || input.includes("switch") || input.includes("ccna")) {
    return {
      track: "Network Support Specialist",
      summary: "Focus on network diagnosis, segmentation, and escalation-ready incident handling.",
      nextSteps: [
        "Complete Tier 1 Fundamentals and Networking video modules",
        "Practice DNS/DHCP troubleshooting labs",
        "Review the Network Troubleshooting Checklist PDF weekly",
      ],
    };
  }

  if (input.includes("admin") || input.includes("server") || input.includes("active directory") || input.includes("linux")) {
    return {
      track: "SysAdmin Track",
      summary: "Build systems administration depth across identity, patching, and infrastructure stability.",
      nextSteps: [
        "Finish Systems Administration video modules",
        "Shadow account provisioning and deprovisioning tasks",
        "Apply the Windows Server Maintenance Runbook in a sandbox",
      ],
    };
  }

  return {
    track: "Helpdesk Technician",
    summary: "Start with strong service desk fundamentals and structured customer support workflows.",
    nextSteps: [
      "Complete Tier 1 Fundamentals modules",
      "Use the SOP guide to standardize ticket notes",
      "Move to Security and Networking modules after baseline mastery",
    ],
  };
}
