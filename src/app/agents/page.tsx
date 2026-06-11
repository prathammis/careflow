import Link from "next/link";

import { agentFailures, agentHealth, promptVariants } from "@/lib/mock-data";
import RunAgentButton from "@/components/run-agent-button";

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-[#071119] px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Agent Monitoring</p>
          <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">Health, latency, and prompt testing</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Demo monitoring views for runtime, cost, success rate, and prompt A/B comparisons.
              </p>
            </div>
            <div className="flex items-center">
              <Link
                href="/traces"
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
              >
                Open trace store
              </Link>
              <RunAgentButton />
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-400">Healthy agents</p>
            <p className="mt-2 text-3xl font-semibold text-white">{agentHealth.length}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-400">Prompt variants</p>
            <p className="mt-2 text-3xl font-semibold text-white">{promptVariants.length}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-400">Known issues</p>
            <p className="mt-2 text-3xl font-semibold text-white">{agentFailures.length}</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6">
            <h2 className="text-lg font-semibold text-white">Agent health</h2>
            <div className="mt-5 space-y-3">
              {agentHealth.map((agent) => (
                <div key={agent.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
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
                </div>
              ))}
            </div>
          </article>

          <article className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/55 p-6">
            <section>
              <h2 className="text-lg font-semibold text-white">Prompt playground</h2>
              <div className="mt-5 space-y-3">
                {promptVariants.map((variant) => (
                  <div key={variant.version} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-white">{variant.version}</p>
                      <span className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">A/B</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{variant.description}</p>
                    <p className="mt-3 text-sm text-slate-400">{variant.metrics}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white">Failure analysis</h2>
              <div className="mt-5 space-y-3">
                {agentFailures.map((item) => (
                  <div key={item.agent} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-medium text-white">{item.agent}</p>
                    <p className="mt-2 text-sm text-slate-300">Issue: {item.issue}</p>
                    <p className="mt-1 text-sm text-slate-400">Impact: {item.impact}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </section>
      </div>
    </main>
  );
}