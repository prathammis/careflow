import Link from "next/link";
import { notFound } from "next/navigation";

import { workflowTraceDetails } from "@/lib/mock-data";

type WorkflowDetailPageProps = {
  params: Promise<{ agent: string }>;
};

export function generateStaticParams() {
  return workflowTraceDetails.map((step) => ({ agent: step.name }));
}

export default async function WorkflowDetailPage({ params }: WorkflowDetailPageProps) {
  const { agent } = await params;
  const step = workflowTraceDetails.find((entry) => entry.name === agent);

  if (!step) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#071119] px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Workflow Step</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{step.name}</h1>
            <p className="mt-2 text-sm text-slate-400">{step.status}</p>
          </div>
          <Link
            href="/workflows"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Back to workflow explorer
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-lg font-semibold text-white">Trace details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Prompt</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{step.prompt}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Response</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{step.response}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Runtime</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{step.runtime}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Cost</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{step.cost}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-100">Step summary</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{step.detail}</p>
            </div>
          </article>

          <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-lg font-semibold text-white">Execution logs</h2>
            <div className="mt-5 space-y-3">
              {step.logs.map((log) => (
                <div key={log} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                  {log}
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}