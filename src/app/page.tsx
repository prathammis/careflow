const overviewMetrics = [
  { label: "Total Patients", value: "18,420", delta: "+6.4%", tone: "text-cyan-300" },
  { label: "High-Risk Patients", value: "1,284", delta: "+118 today", tone: "text-rose-300" },
  { label: "Open Care Gaps", value: "3,902", delta: "-11.2%", tone: "text-amber-300" },
  { label: "Active Workflows", value: "42", delta: "8 running now", tone: "text-emerald-300" },
];

const workflowSteps = [
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

const agentHealth = [
  { name: "Risk Prediction", runtime: "286 ms", cost: "$0.018", success: "99.6%" },
  { name: "Care Gap", runtime: "174 ms", cost: "$0.011", success: "98.9%" },
  { name: "Recommendation", runtime: "192 ms", cost: "$0.014", success: "99.2%" },
  { name: "Copilot", runtime: "412 ms", cost: "$0.027", success: "97.8%" },
];

const promptVariants = [
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

const recentPatients = [
  { id: "104", name: "Maria Thompson", risk: 92, gaps: 4, recommendation: "Schedule outreach within 24h" },
  { id: "228", name: "Andre Johnson", risk: 86, gaps: 2, recommendation: "Care manager review" },
  { id: "417", name: "Priya Patel", risk: 78, gaps: 3, recommendation: "Close preventive screening gaps" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(28,149,180,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.16),_transparent_24%),linear-gradient(180deg,_#071119_0%,_#0b1721_46%,_#0e1b28_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 rounded-full bg-rose-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-6 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">CareFlow Nexus</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Multi-agent healthcare intelligence with full workflow observability.
            </h1>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200/90">
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">FastAPI ready</span>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5">React + TypeScript</span>
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5">MVP slice 1</span>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
                PRD foundation
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Prioritize patients, explain decisions, and trace every agent step.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                This first build gives the product a real structure: a healthcare operations dashboard,
                patient intelligence views, workflow traces, prompt comparison, and agent monitoring
                placeholders aligned to the MVP scope.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {overviewMetrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm text-slate-400">{metric.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <span className={`text-3xl font-semibold ${metric.tone}`}>{metric.value}</span>
                    <span className="text-sm text-slate-300">{metric.delta}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <section className="rounded-2xl border border-white/10 bg-[#091521]/90 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">Workflow Trace Explorer</h3>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    5-step trace
                  </span>
                </div>
                <div className="mt-5 space-y-4">
                  {workflowSteps.map((step, index) => (
                    <div key={step.name} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/10 text-sm font-semibold text-cyan-100">
                          {index + 1}
                        </div>
                        {index < workflowSteps.length - 1 ? (
                          <div className="mt-2 h-full w-px bg-gradient-to-b from-cyan-400/40 to-transparent" />
                        ) : null}
                      </div>
                      <div className="pb-4">
                        <p className="font-medium text-white">{step.name}</p>
                        <p className="text-sm text-cyan-100/80">{step.status}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-[#091521]/90 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">Agent Monitoring</h3>
                  <span className="rounded-full bg-rose-400/10 px-3 py-1 text-xs font-medium text-rose-200">
                    live health
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {agentHealth.map((agent) => (
                    <article key={agent.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-white">{agent.name}</p>
                        <span className="text-sm text-emerald-200">{agent.success}</span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-300">
                        <div>
                          <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Runtime</span>
                          {agent.runtime}
                        </div>
                        <div>
                          <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Cost</span>
                          {agent.cost}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="grid gap-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white">MVP Scope</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <li>CSV upload and unified patient record generation.</li>
                <li>Risk, care gap, recommendation, and copilot agent flows.</li>
                <li>Workflow tracing with prompt, runtime, cost, and output inspection.</li>
                <li>Agent monitoring with quality, latency, and failure views.</li>
              </ul>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white">Prompt Playground</h3>
              <div className="mt-4 space-y-4">
                {promptVariants.map((variant) => (
                  <article key={variant.version} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-white">{variant.version}</p>
                      <span className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">A/B</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{variant.description}</p>
                    <p className="mt-3 text-sm text-slate-400">{variant.metrics}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white">Patients Requiring Attention</h3>
              <div className="mt-4 space-y-3">
                {recentPatients.map((patient) => (
                  <article key={patient.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-white">{patient.name}</p>
                        <p className="text-sm text-slate-400">Patient {patient.id}</p>
                      </div>
                      <span className="rounded-full bg-rose-400/10 px-3 py-1 text-sm font-medium text-rose-200">
                        Risk {patient.risk}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                      <span>{patient.gaps} open care gaps</span>
                      <span>{patient.recommendation}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
