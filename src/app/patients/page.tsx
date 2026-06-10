import Link from "next/link";

import { patientDetails } from "@/lib/mock-data";

export default function PatientsPage() {
  return (
    <main className="min-h-screen bg-[#071119] px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Patient Intelligence</p>
          <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">High-risk patient review</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Ranked patients, care gaps, and explainable risk summaries in one focused view.
              </p>
            </div>
            <Link
              href="/traces"
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Open related traces
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-400">Patients shown</p>
            <p className="mt-2 text-3xl font-semibold text-white">{patientDetails.length}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-400">Highest risk</p>
            <p className="mt-2 text-3xl font-semibold text-rose-200">92</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-400">Open care gaps</p>
            <p className="mt-2 text-3xl font-semibold text-amber-200">9</p>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          {patientDetails.map((patient) => (
            <article key={patient.id} className="rounded-3xl border border-white/10 bg-slate-950/55 p-5 transition hover:border-cyan-400/30 hover:bg-slate-950/75">
              <Link href={`/patients/${patient.id}`} className="block">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{patient.name}</p>
                    <p className="text-sm text-slate-400">Patient {patient.id}</p>
                  </div>
                  <span className="rounded-full bg-rose-400/10 px-3 py-1 text-sm font-medium text-rose-200">
                    Risk {patient.risk}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Condition</p>
                    <p className="mt-1 text-white">{patient.primaryCondition}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Care team</p>
                    <p className="mt-1 text-white">{patient.careTeam}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Last touchpoint</p>
                    <p className="mt-1 text-white">{patient.lastTouchpoint}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Open gaps</p>
                    <p className="mt-1 text-white">{patient.gaps}</p>
                  </div>
                </div>

                <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                  {patient.explanation}
                </p>

                <p className="mt-4 text-sm text-cyan-200">Recommended action: {patient.recommendation}</p>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}