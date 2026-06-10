import { patientDetails } from "@/lib/mock-data";

export default function PatientsPage() {
  return (
    <main className="min-h-screen bg-[#071119] px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Patient Intelligence</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">High-risk patient review</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Demo patient records for ranking outreach, care-gap review, and explainable risk scoring.
          </p>
        </header>

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          {patientDetails.map((patient) => (
            <article key={patient.id} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-white">{patient.name}</p>
                  <p className="text-sm text-slate-400">Patient {patient.id}</p>
                </div>
                <span className="rounded-full bg-rose-400/10 px-3 py-1 text-sm font-medium text-rose-200">
                  Risk {patient.risk}
                </span>
              </div>

              <dl className="mt-5 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-500">Primary condition</dt>
                  <dd>{patient.primaryCondition}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-500">Care team</dt>
                  <dd>{patient.careTeam}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-500">Last touchpoint</dt>
                  <dd>{patient.lastTouchpoint}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-slate-500">Open gaps</dt>
                  <dd>{patient.gaps}</dd>
                </div>
              </dl>

              <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                {patient.explanation}
              </p>

              <p className="mt-4 text-sm text-cyan-200">Recommended action: {patient.recommendation}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}