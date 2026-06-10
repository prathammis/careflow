import Link from "next/link";
import { notFound } from "next/navigation";

import { traceRuns } from "@/lib/mock-data";

type TraceDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return traceRuns.map((run) => ({ id: run.id }));
}

export default async function TraceDetailPage({ params }: TraceDetailPageProps) {
  const { id } = await params;
  const run = traceRuns.find((entry) => entry.id === id);

  if (!run) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#071119] px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Trace Detail</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{run.runLabel}</h1>
            <p className="mt-2 text-sm text-slate-400">{run.workflow} · {run.agent}</p>
          </div>
          <Link
            href="/traces"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Back to trace store
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-lg font-semibold text-white">Execution record</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Prompt</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{run.prompt}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Input data</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{run.inputData}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Output</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{run.output}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Run metadata</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{run.createdAt}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{run.latency} · {run.cost}</p>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <h2 className="text-lg font-semibold text-white">Tool calls</h2>
              <div className="mt-5 space-y-3">
                {run.toolCalls.map((toolCall) => (
                  <div key={toolCall} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                    {toolCall}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <h2 className="text-lg font-semibold text-white">Trace summary</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                This mock store is the first observability layer for CareFlow Nexus. It gives you a place to inspect
                every agent run and later swap in a real trace engine without changing the UI structure.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}