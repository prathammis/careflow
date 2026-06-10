import Link from "next/link";

import { traceEvents, workflowSteps } from "@/lib/mock-data";

export default function WorkflowsPage() {
  return (
    <main className="min-h-screen bg-[#071119] px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Workflow Explorer</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Patient analysis trace</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Inspect the sequence of agents involved in the analysis pipeline and review the prompt,
            response, runtime, and cost for each step.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-lg font-semibold text-white">Trace tree</h2>
            <div className="mt-5 space-y-4">
              {workflowSteps.map((step, index) => (
                <Link
                  key={step.name}
                  href={`/workflows/${encodeURIComponent(step.name)}`}
                  className="flex gap-4 rounded-2xl border border-white/0 p-2 transition hover:border-white/10 hover:bg-white/5"
                >
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
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-lg font-semibold text-white">Execution logs</h2>
            <div className="mt-5 space-y-3">
              {traceEvents.map((event) => (
                <Link
                  key={event.agent}
                  href={`/workflows/${encodeURIComponent(event.agent)}`}
                  className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-white">{event.agent}</p>
                    <span className="text-xs uppercase tracking-[0.18em] text-emerald-200">success</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">Prompt: {event.prompt}</p>
                  <p className="mt-1 text-sm text-slate-400">Response: {event.response}</p>
                  <p className="mt-3 text-sm text-slate-400">Runtime {event.runtime} · Cost {event.cost}</p>
                </Link>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}