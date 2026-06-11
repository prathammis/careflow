import Link from "next/link";

const statusTone: Record<string, string> = {
  success: "text-emerald-200 bg-emerald-400/10",
  warning: "text-amber-200 bg-amber-400/10",
  failed: "text-rose-200 bg-rose-400/10",
};

export default async function TracesPage() {
  let runsData: any[] = [];
  let fetchError: string | null = null;
  try {
    const res = await fetch("http://localhost:8000/api/traces", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      runsData = data.items || [];
    } else {
      fetchError = `backend returned ${res.status}`;
    }
  } catch (err: any) {
    fetchError = String(err?.message || err);
  }

  const runs = (runsData || []).map((run: any) => ({
    id: run.id,
    runLabel: run.id,
    workflow: run.workflow || run.agent || "Workflow",
    agent: run.agent || "agent",
    status: run.status || "success",
    latency: run.runtimeMs ? `${run.runtimeMs}ms` : "-",
    cost: run.costUsd ? `$${Number(run.costUsd).toFixed(3)}` : "-",
    prompt: run.prompt || "",
    inputData: run.inputData || JSON.stringify(run.input || {}),
    output: run.output || "",
  }));

  return (
    <main className="min-h-screen bg-[#071119] px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Trace Store</p>
          <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">Mock agent run history</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Browse every mock agent execution with prompt, input data, output, latency, cost, and tool calls.
              </p>
            </div>
            <Link
              href="/agents"
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Back to agents
            </Link>
          </div>
        </header>

        {fetchError ? (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-900/30 p-4 text-sm text-rose-200">
            Error fetching traces: {fetchError}
          </div>
        ) : null}

        <section className="grid gap-4">
          {runs.map((run) => (
            <Link
              key={run.id}
              href={`/traces/${run.id}`}
              className="rounded-3xl border border-white/10 bg-slate-950/55 p-5 transition hover:border-cyan-400/30 hover:bg-slate-950/75"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-white">{run.runLabel}</p>
                  <p className="mt-1 text-sm text-slate-400">{run.workflow}</p>
                  <p className="mt-2 text-sm text-cyan-100/80">{run.agent}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className={`rounded-full px-3 py-1 font-medium ${statusTone[run.status]}`}>{run.status}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">{run.latency}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">{run.cost}</span>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Prompt</p>
                  <p className="mt-2 leading-6">{run.prompt}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Input</p>
                  <p className="mt-2 leading-6">{run.inputData}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Output</p>
                  <p className="mt-2 leading-6">{run.output}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}