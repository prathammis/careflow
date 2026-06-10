export type OverviewMetric = {
  label: string;
  value: string;
  delta: string;
  tone: string;
};

export type WorkflowStep = {
  name: string;
  status: string;
  detail: string;
};

export type WorkflowTraceDetail = WorkflowStep & {
  prompt: string;
  response: string;
  runtime: string;
  cost: string;
  logs: string[];
};

export type AgentHealth = {
  name: string;
  runtime: string;
  cost: string;
  success: string;
};

export type PromptVariant = {
  version: string;
  description: string;
  metrics: string;
};

export type PatientSummary = {
  id: string;
  name: string;
  risk: number;
  gaps: number;
  recommendation: string;
};

export type PatientDetail = PatientSummary & {
  primaryCondition: string;
  careTeam: string;
  lastTouchpoint: string;
  explanation: string;
};

export const overviewMetrics: OverviewMetric[] = [
  { label: "Total Patients", value: "18,420", delta: "+6.4%", tone: "text-cyan-300" },
  { label: "High-Risk Patients", value: "1,284", delta: "+118 today", tone: "text-rose-300" },
  { label: "Open Care Gaps", value: "3,902", delta: "-11.2%", tone: "text-amber-300" },
  { label: "Active Workflows", value: "42", delta: "8 running now", tone: "text-emerald-300" },
];

export const workflowSteps: WorkflowStep[] = [
  {
    name: "Data Extraction Agent",
    status: "Validated 4 uploaded files",
    detail: "Parsed CSV claims, normalized identifiers, and generated 12,104 unified patient profiles.",
  },
  {
    name: "Risk Prediction Agent",
    status: "94.1% model confidence",
    detail: "XGBoost scored hospitalization and readmission risk for the active patient population.",
  },
  {
    name: "Care Gap Agent",
    status: "1,021 actionable gaps",
    detail: "Detected overdue screenings, medication adherence issues, and preventive care opportunities.",
  },
  {
    name: "Recommendation Agent",
    status: "Ranked outreach queues",
    detail: "Generated next-best actions with priority, expected impact, and recommended owner.",
  },
  {
    name: "AI Copilot Agent",
    status: "Natural language answers ready",
    detail: "Explains why patients are high risk and surfaces evidence behind each decision.",
  },
];

export const agentHealth: AgentHealth[] = [
  { name: "Risk Prediction", runtime: "286 ms", cost: "$0.018", success: "99.6%" },
  { name: "Care Gap", runtime: "174 ms", cost: "$0.011", success: "98.9%" },
  { name: "Recommendation", runtime: "192 ms", cost: "$0.014", success: "99.2%" },
  { name: "Copilot", runtime: "412 ms", cost: "$0.027", success: "97.8%" },
];

export const promptVariants: PromptVariant[] = [
  {
    version: "Prompt A",
    description: "Prioritize concise explanations with evidence-first formatting.",
    metrics: "Cost $0.021 · Latency 328 ms",
  },
  {
    version: "Prompt B",
    description: "More verbose, clinician-friendly explanations with workflow context.",
    metrics: "Cost $0.029 · Latency 412 ms",
  },
];

export const recentPatients: PatientSummary[] = [
  { id: "104", name: "Maria Thompson", risk: 92, gaps: 4, recommendation: "Schedule outreach within 24h" },
  { id: "228", name: "Andre Johnson", risk: 86, gaps: 2, recommendation: "Care manager review" },
  { id: "417", name: "Priya Patel", risk: 78, gaps: 3, recommendation: "Close preventive screening gaps" },
];

export const patientDetails: PatientDetail[] = [
  {
    id: "104",
    name: "Maria Thompson",
    risk: 92,
    gaps: 4,
    recommendation: "Schedule outreach within 24h",
    primaryCondition: "Type 2 diabetes",
    careTeam: "Care Manager: J. Lee",
    lastTouchpoint: "2026-06-08",
    explanation:
      "High utilization, missed HbA1c follow-up, and a recent medication refill gap are driving the elevated risk score.",
  },
  {
    id: "228",
    name: "Andre Johnson",
    risk: 86,
    gaps: 2,
    recommendation: "Care manager review",
    primaryCondition: "CHF",
    careTeam: "Care Manager: S. Patel",
    lastTouchpoint: "2026-06-09",
    explanation:
      "Recent ED utilization and a late post-discharge follow-up are the primary indicators for outreach.",
  },
  {
    id: "417",
    name: "Priya Patel",
    risk: 78,
    gaps: 3,
    recommendation: "Close preventive screening gaps",
    primaryCondition: "Hypertension",
    careTeam: "Care Manager: A. Rivera",
    lastTouchpoint: "2026-06-06",
    explanation:
      "Open preventive care gaps and an overdue blood pressure follow-up contribute to the care priority score.",
  },
];

export const agentFailures = [
  {
    agent: "Copilot",
    issue: "Token spikes on long patient histories",
    impact: "Higher latency and cost for complex explanations",
  },
  {
    agent: "Risk Prediction",
    issue: "Missing labs in 3.2% of records",
    impact: "Needs stronger missing-data handling before production",
  },
  {
    agent: "Care Gap",
    issue: "Duplicate claim keys in one source feed",
    impact: "Required fallback deduplication logic",
  },
];

export const traceEvents = [
  {
    agent: "Data Extraction Agent",
    prompt: "Parse uploaded claims and build unified patient records.",
    response: "12,104 records normalized with 98.7% schema match.",
    runtime: "214 ms",
    cost: "$0.009",
  },
  {
    agent: "Risk Prediction Agent",
    prompt: "Score hospitalization risk for active patients.",
    response: "1,284 high-risk patients identified for outreach.",
    runtime: "286 ms",
    cost: "$0.018",
  },
  {
    agent: "Care Gap Agent",
    prompt: "Find preventive, medication, and screening gaps.",
    response: "3,902 open gaps prioritized by clinical urgency.",
    runtime: "174 ms",
    cost: "$0.011",
  },
  {
    agent: "Recommendation Agent",
    prompt: "Suggest next-best actions for the care team.",
    response: "Outreach tasks assigned to care managers by priority.",
    runtime: "192 ms",
    cost: "$0.014",
  },
  {
    agent: "AI Copilot Agent",
    prompt: "Explain why a patient is high risk.",
    response: "Provided an evidence-based explanation with risk drivers.",
    runtime: "412 ms",
    cost: "$0.027",
  },
];

export const workflowTraceDetails: WorkflowTraceDetail[] = [
  {
    name: "Data Extraction Agent",
    status: "Validated 4 uploaded files",
    detail: "Parsed CSV claims, normalized identifiers, and generated 12,104 unified patient profiles.",
    prompt: "Parse uploaded claims and unify member identifiers across files.",
    response: "12,104 records normalized with 98.7% schema match.",
    runtime: "214 ms",
    cost: "$0.009",
    logs: [
      "Ingested claims.csv, admissions.csv, pharmacy.csv, and labs.csv.",
      "Applied field normalization for patient_id, member_id, and plan_id.",
      "Produced structured patient profiles ready for downstream scoring.",
    ],
  },
  {
    name: "Risk Prediction Agent",
    status: "94.1% model confidence",
    detail: "XGBoost scored hospitalization and readmission risk for the active patient population.",
    prompt: "Score hospitalization risk for active patients using the latest unified record.",
    response: "1,284 high-risk patients identified for outreach.",
    runtime: "286 ms",
    cost: "$0.018",
    logs: [
      "Loaded the latest XGBoost model version v12.",
      "Combined claims utilization, recent encounters, and medication gaps.",
      "Produced ranked risk scores for patient prioritization.",
    ],
  },
  {
    name: "Care Gap Agent",
    status: "1,021 actionable gaps",
    detail: "Detected overdue screenings, medication adherence issues, and preventive care opportunities.",
    prompt: "Identify care gaps for preventive screening, adherence, and follow-up.",
    response: "3,902 open gaps prioritized by clinical urgency.",
    runtime: "174 ms",
    cost: "$0.011",
    logs: [
      "Matched quality measures against the active roster.",
      "Flagged overdue HbA1c, blood pressure, and statin adherence gaps.",
      "Ranked opportunities by urgency and outreach feasibility.",
    ],
  },
  {
    name: "Recommendation Agent",
    status: "Ranked outreach queues",
    detail: "Generated next-best actions with priority, expected impact, and recommended owner.",
    prompt: "Recommend next-best outreach actions for the care team.",
    response: "Outreach tasks assigned to care managers by priority.",
    runtime: "192 ms",
    cost: "$0.014",
    logs: [
      "Cross-checked patient risk, open gaps, and recency of touchpoints.",
      "Suggested care manager outreach sequences and intervention types.",
      "Prepared a prioritized action queue for the dashboard.",
    ],
  },
  {
    name: "AI Copilot Agent",
    status: "Natural language answers ready",
    detail: "Explains why patients are high risk and surfaces evidence behind each decision.",
    prompt: "Explain why the selected patient is high risk in clear, human-readable language.",
    response: "Provided an evidence-based explanation with risk drivers.",
    runtime: "412 ms",
    cost: "$0.027",
    logs: [
      "Pulled the selected patient and trace context from the workflow graph.",
      "Synthesized risk, gaps, and recommendation outputs into a narrative response.",
      "Returned a clinician-friendly explanation with supporting evidence.",
    ],
  },
];