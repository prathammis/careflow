import { agentFailures, agentHealth, promptVariants } from "@/lib/mock-data";

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-[#071119] px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Agent Monitoring</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Health, latency, and prompt testing</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Demo monitoring views for runtime, cost, success rate, and prompt A/B comparisons.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
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

          <article className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
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