import Link from "next/link";
import { notFound } from "next/navigation";

import { patientDetails } from "@/lib/mock-data";

type PatientPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return patientDetails.map((patient) => ({ id: patient.id }));
}

export default async function PatientDetailPage({ params }: PatientPageProps) {
  const { id } = await params;
  const patient = patientDetails.find((entry) => entry.id === id);

  if (!patient) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#071119] px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Patient Detail</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{patient.name}</h1>
            <p className="mt-2 text-sm text-slate-400">Patient {patient.id}</p>
          </div>
          <Link
            href="/patients"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Back to patients
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-white">Risk summary</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  This case is scored by the risk model, then enriched by care-gap and recommendation agents.
                </p>
              </div>
              <span className="rounded-full bg-rose-400/10 px-4 py-2 text-lg font-semibold text-rose-200">
                Risk {patient.risk}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Primary condition</p>
                <p className="mt-2 text-base text-white">{patient.primaryCondition}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Care team</p>
                <p className="mt-2 text-base text-white">{patient.careTeam}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Last touchpoint</p>
                <p className="mt-2 text-base text-white">{patient.lastTouchpoint}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Open care gaps</p>
                <p className="mt-2 text-base text-white">{patient.gaps}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-100">Copilot explanation</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{patient.explanation}</p>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-200">Recommended action</p>
              <p className="mt-3 text-base text-slate-100">{patient.recommendation}</p>
            </div>
          </article>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <h2 className="text-lg font-semibold text-white">Multi-agent view</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">Data Extraction Agent</p>
                  <p className="mt-2 leading-6">Unified recent claims, ADT, and medication records for this patient.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">Risk Prediction Agent</p>
                  <p className="mt-2 leading-6">Assigned a high hospitalization risk score based on utilization and follow-up gaps.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">Care Gap Agent</p>
                  <p className="mt-2 leading-6">Flagged overdue screening and adherence opportunities for outreach.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">Recommendation Agent</p>
                  <p className="mt-2 leading-6">Recommended a care manager outreach task with priority sequencing.</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <h2 className="text-lg font-semibold text-white">Trace context</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                This page is the first drill-down point for the workflow explorer and the place where the Copilot
                agent can explain the score in human-readable terms.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}