"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RunAgentButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRun() {
    setLoading(true);
    try {
      const payload = {
        agent: "Mock Agent",
        status: "success",
        runtimeMs: 123,
        costUsd: 0.005,
        events: [
          { step: "start", ts: new Date().toISOString() },
          { step: "predict", ts: new Date().toISOString() },
          { step: "end", ts: new Date().toISOString() },
        ],
      };

      const res = await fetch("http://localhost:8000/api/traces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/traces");
      } else {
        console.error("create trace failed", await res.text());
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRun}
      disabled={loading}
      className="ml-3 inline-flex items-center rounded-full border border-white/10 bg-emerald-600/80 px-4 py-2 text-sm text-white transition hover:bg-emerald-600"
    >
      {loading ? "Running…" : "Run Agent"}
    </button>
  );
}
