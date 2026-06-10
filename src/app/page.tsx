"use client";

import Link from "next/link";
import { useState } from "react";

import {
  overviewMetrics,
  recentPatients,
} from "@/lib/mock-data";

type UploadPreview = {
  fileName: string;
  headers: string[];
  rowCount: number;
  sampleRows: Record<string, string>[];
};

function parseCsv(text: string): UploadPreview | null {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return null;
  }

  const headers = lines[0]
    .split(",")
    .map((header) => header.trim())
    .filter(Boolean);

  const sampleRows = lines.slice(1, 4).map((line) => {
    const values = line.split(",");

    return headers.reduce<Record<string, string>>((row, header, index) => {
      row[header] = (values[index] ?? "").trim();
      return row;
    }, {});
  });

  return {
    fileName: "uploaded-file.csv",
    headers,
    rowCount: Math.max(lines.length - 1, 0),
    sampleRows,
  };
}

export default function Home() {
  const [uploadPreview, setUploadPreview] = useState<UploadPreview | null>(null);
  const [uploadStatus, setUploadStatus] = useState("No CSV uploaded yet");

  async function handleCsvUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const text = await file.text();
    const preview = parseCsv(text);

    if (!preview) {
      setUploadPreview(null);
      setUploadStatus("The CSV needs a header row and at least one data row.");
      return;
    }

    setUploadPreview({ ...preview, fileName: file.name });
    setUploadStatus(`Loaded ${preview.rowCount} rows from ${file.name}`);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(28,149,180,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.16),_transparent_24%),linear-gradient(180deg,_#071119_0%,_#0b1721_46%,_#0e1b28_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 rounded-full bg-rose-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-8 sm:px-8 lg:px-10">
        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
              CareFlow Nexus
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              A cleaner starting point for a multi-agent healthcare platform.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Use the pages in the top navigation to move between patients, workflows, traces, and agents.
              This home screen now stays focused on the essentials instead of repeating every section.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200/90">
              <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10" href="/patients">
                Patients
              </Link>
              <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10" href="/workflows">
                Workflows
              </Link>
              <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10" href="/traces">
                Traces
              </Link>
              <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10" href="/agents">
                Agents
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">CSV Upload Studio</p>
              <h2 className="mt-2 text-lg font-semibold text-white">Import demo data</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Upload a CSV when you want to preview a patient file. This panel stays compact now so the page
                remains readable.
              </p>
              <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15">
                <span>Choose CSV</span>
                <input accept=",.csv,text/csv" className="hidden" type="file" onChange={handleCsvUpload} />
              </label>
              <p className="mt-3 text-sm text-slate-300">{uploadStatus}</p>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Preview</p>
              {uploadPreview ? (
                <div className="mt-3 space-y-3 text-sm text-slate-300">
                  <p>
                    <span className="text-slate-500">File:</span> {uploadPreview.fileName}
                  </p>
                  <p>
                    <span className="text-slate-500">Rows:</span> {uploadPreview.rowCount}
                  </p>
                  <p>
                    <span className="text-slate-500">Headers:</span> {uploadPreview.headers.join(", ")}
                  </p>
                </div>
              ) : (
                <p className="mt-2 text-sm leading-6 text-slate-400">A preview will appear here after upload.</p>
              )}
            </section>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overviewMetrics.map((metric) => (
            <article key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <span className={`text-3xl font-semibold ${metric.tone}`}>{metric.value}</span>
                <span className="text-sm text-slate-300">{metric.delta}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">Quick access</h2>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-500">Pages</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { href: "/patients", title: "Patients", text: "Review high-risk patients and care gaps." },
                { href: "/workflows", title: "Workflows", text: "Inspect the agent chain for a case." },
                { href: "/traces", title: "Traces", text: "Open the mock observability store." },
                { href: "/agents", title: "Agents", text: "Check health, prompts, and failures." },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 hover:bg-white/10"
                >
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">Patients needing attention</h2>
              <Link className="text-sm text-cyan-200 transition hover:text-cyan-100" href="/patients">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {recentPatients.map((patient) => (
                <Link
                  key={patient.id}
                  href={`/patients/${patient.id}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 hover:bg-white/10"
                >
                  <div>
                    <p className="font-medium text-white">{patient.name}</p>
                    <p className="text-sm text-slate-400">Patient {patient.id} · {patient.gaps} open care gaps</p>
                  </div>
                  <span className="rounded-full bg-rose-400/10 px-3 py-1 text-sm font-medium text-rose-200">
                    Risk {patient.risk}
                  </span>
                </Link>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
