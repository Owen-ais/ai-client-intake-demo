"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    service: "",
    problem: "",
    urgency: "Medium",
    tried: "",
    budget: "",
    nextStep: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function generateDraft(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setResult(data.result);
    } catch {
      setError("Something went wrong. Check the terminal for errors.");
    } finally {
      setLoading(false);
    }
  }

  function loadExample() {
    setForm({
      businessName: "Lakeside Accountants",
      contactName: "Sarah Miller",
      email: "sarah@lakesideaccountants.co.uk",
      service: "Client intake automation",
      problem:
        "They receive new client enquiries by email but spend too much time manually asking the same follow-up questions, checking details, and writing similar replies.",
      urgency: "Medium",
      tried:
        "They currently use email and a spreadsheet. They do not have a proper intake form, automated summary, or follow-up process.",
      budget: "£300-£500",
      nextStep: "Send a proposal and example automation workflow",
      notes:
        "They want something simple that saves admin time without needing a complicated CRM.",
    });
    setResult(null);
    setError("");
  }

  function clearForm() {
    setForm({
      businessName: "",
      contactName: "",
      email: "",
      service: "",
      problem: "",
      urgency: "Medium",
      tried: "",
      budget: "",
      nextStep: "",
      notes: "",
    });
    setResult(null);
    setError("");
  }

  function copyResult() {
    if (!result) return;

    const text = `
Client Summary:
${result.summary}

Main Problem:
${result.mainProblem}

Priority:
${result.priorityLevel}

Suggested Next Step:
${result.suggestedNextStep}

Recommended Automation:
${result.recommendedAutomation}

Missing Information:
${result.missingInformation?.map((item) => `- ${item}`).join("\n") || ""}

Review Notes:
${result.reviewNotes?.map((item) => `- ${item}`).join("\n") || ""}

Follow-Up Email:
${result.followUpEmail}
`;

    navigator.clipboard.writeText(text.trim());
  }

  const inputClass =
    "mt-2 w-full rounded-2xl border border-white/10 bg-[#081727] px-4 py-3.5 text-sm text-white shadow-inner shadow-black/20 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10";

  const labelClass = "text-sm font-bold text-slate-200";

  const priorityClass =
    result?.priorityLevel === "High"
      ? "bg-red-400/10 text-red-200 ring-red-300/20"
      : result?.priorityLevel === "Low"
      ? "bg-emerald-400/10 text-emerald-200 ring-emerald-300/20"
      : "bg-amber-400/10 text-amber-200 ring-amber-300/20";

  return (
    <main className="min-h-screen overflow-hidden bg-[#06111f] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-[-12%] top-[20%] h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[30%] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <header className="border-b border-white/10 bg-[#06111f]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/20">
              AI
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-300 ring-4 ring-[#06111f]" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">
                AI Admin Assistant
              </p>
              <p className="text-xs font-medium text-slate-400">
                Client intake automation demo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearForm}
              className="hidden rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-slate-300 transition hover:border-cyan-300/40 hover:bg-white/10 sm:inline-flex"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={loadExample}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-black/20 transition hover:bg-cyan-100"
            >
              Load example
            </button>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              AI automation for small business admin
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              Turn messy enquiries into clear client actions.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Enter a client enquiry and generate a clean summary, priority
              level, missing information, suggested next step, and professional
              follow-up email draft.
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ["Summarise", "Clean client context"],
                ["Prioritise", "High / Medium / Low"],
                ["Draft reply", "Ready to review"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p className="font-black text-white">{title}</p>
                  <p className="mt-1 text-sm text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-300/20 to-emerald-300/10 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#081727] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-cyan-200">
                      Finished workflow preview
                    </p>
                    <p className="text-xs text-slate-500">
                      Structured output cards
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                    Human reviewed
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    ["Client summary", "Business context"],
                    ["Priority level", "High / Medium / Low"],
                    ["Missing information", "Questions to ask"],
                    ["Follow-up email", "Draft ready to review"],
                  ].map(([item, label], index) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300 text-sm font-black text-slate-950">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-white">{item}</p>
                          <p className="mt-1 text-sm text-slate-400">{label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5">
                  <p className="text-sm font-black text-cyan-100">
                    Product-style output
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    The AI response is split into usable sections instead of one
                    messy text block.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 text-center sm:grid-cols-3 lg:px-8">
          {[
            ["Client intake", "Capture enquiry details"],
            ["Structured AI", "Generate clean outputs"],
            ["Review & send", "Human approval first"],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-[#06111f]/60 p-5"
            >
              <p className="font-black text-white">{title}</p>
              <p className="mt-1 text-sm text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <form
            onSubmit={generateDraft}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                  Step 1
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Enquiry details
                </h2>
              </div>

              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                Local demo
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Business name</label>
                <input
                  className={inputClass}
                  name="businessName"
                  value={form.businessName}
                  onChange={updateField}
                  placeholder="Lakeside Accountants"
                />
              </div>

              <div>
                <label className={labelClass}>Contact name</label>
                <input
                  className={inputClass}
                  name="contactName"
                  value={form.contactName}
                  onChange={updateField}
                  placeholder="Sarah Miller"
                />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  className={inputClass}
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="name@business.co.uk"
                />
              </div>

              <div>
                <label className={labelClass}>Service interested in</label>
                <input
                  className={inputClass}
                  name="service"
                  value={form.service}
                  onChange={updateField}
                  placeholder="Client intake automation"
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Problem they want solved</label>
                <textarea
                  className={inputClass}
                  name="problem"
                  value={form.problem}
                  onChange={updateField}
                  rows={4}
                  placeholder="Describe the admin problem, enquiry, or client need."
                />
              </div>

              <div>
                <label className={labelClass}>Urgency</label>
                <select
                  className={inputClass}
                  name="urgency"
                  value={form.urgency}
                  onChange={updateField}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Budget, if known</label>
                <input
                  className={inputClass}
                  name="budget"
                  value={form.budget}
                  onChange={updateField}
                  placeholder="£300-£500 / unsure"
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>What have they tried already?</label>
                <textarea
                  className={inputClass}
                  name="tried"
                  value={form.tried}
                  onChange={updateField}
                  rows={3}
                  placeholder="Current process, spreadsheet, CRM, manual emails, etc."
                />
              </div>

              <div>
                <label className={labelClass}>Preferred next step</label>
                <input
                  className={inputClass}
                  name="nextStep"
                  value={form.nextStep}
                  onChange={updateField}
                  placeholder="Send proposal / quote / call"
                />
              </div>

              <div>
                <label className={labelClass}>Extra notes</label>
                <textarea
                  className={inputClass}
                  name="notes"
                  value={form.notes}
                  onChange={updateField}
                  rows={3}
                  placeholder="Any useful context"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
              Do not enter passwords, recovery codes, secret keys, private
              credentials, or sensitive client data.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center rounded-full bg-cyan-300 px-6 py-4 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating structured result..." : "Generate AI result"}
            </button>
          </form>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                  Step 2
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Generated result
                </h2>
              </div>

              {result && (
                <button
                  type="button"
                  onClick={copyResult}
                  className="rounded-full border border-cyan-300/30 px-4 py-2 text-xs font-black text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950"
                >
                  Copy result
                </button>
              )}
            </div>

            <div className="min-h-[720px] rounded-[1.75rem] border border-white/10 bg-[#020817] p-5">
              {loading ? (
                <div className="flex min-h-[650px] items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-cyan-300/20 border-t-cyan-300" />
                    <p className="mt-5 text-sm font-black text-slate-200">
                      Generating structured client result...
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Creating summary cards, next steps, and email draft.
                    </p>
                  </div>
                </div>
              ) : error ? (
                <div className="rounded-2xl border border-red-300/20 bg-red-300/10 p-5 text-sm leading-6 text-red-100">
                  {error}
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                        Priority
                      </p>
                      <span
                        className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${priorityClass}`}
                      >
                        {result.priorityLevel || "Medium"}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                        Recommended automation
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-200">
                        {result.recommendedAutomation}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                      Client summary
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">
                      {result.summary}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                      Main problem
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">
                      {result.mainProblem}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                      Suggested next step
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">
                      {result.suggestedNextStep}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                        Missing information
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                        {result.missingInformation?.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                        Review notes
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                        {result.reviewNotes?.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                      Follow-up email draft
                    </p>
                    <pre className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-200">
                      {result.followUpEmail}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[650px] items-center justify-center text-center">
                  <div className="max-w-sm">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-2xl text-cyan-200">
                      ✦
                    </div>
                    <p className="text-2xl font-black text-white">
                      Structured result will appear here
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Load the example or enter a real sample enquiry to generate
                      professional result cards.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-6 py-5 text-sm text-slate-400">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Demo only. AI output should always be reviewed before being sent
              to a real client.
            </p>
            <p className="font-bold text-cyan-200">
              Built for small business admin automation
            </p>
          </div>
        </footer>
      </section>
    </main>
  );
}