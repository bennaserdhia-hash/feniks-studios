"use client";

import { useActionState, useEffect, useState } from "react";
import { sendQuote, type QuoteState } from "@/app/actions";
import { projectTypes } from "@/lib/content";
import { IconArrow, IconCheck } from "./Icons";

const initial: QuoteState = { ok: false };

export default function QuoteForm() {
  const [state, formAction, pending] = useActionState(sendQuote, initial);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");

  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  // Pré-sélection du type "Production IA" quand on arrive depuis /ia (?projet=ia)
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("projet") !== "ia") return;
    const ia = projectTypes.find((t) => t.startsWith("Production IA"));
    if (ia) setSelected((s) => (s.includes(ia) ? s : [...s, ia]));
  }, []);

  if (state.ok) {
    return (
      <div className="card p-10 md:p-14 text-center">
        <div className="h-16 w-16 rounded-full mx-auto grid place-items-center bg-gold/15 border border-gold/30 text-gold mb-6">
          <IconCheck className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl font-extrabold mb-3">Message envoyé !</h3>
        <p className="text-muted max-w-md mx-auto">
          Merci pour votre demande. Notre équipe revient vers vous très rapidement pour
          échanger sur votre projet.
        </p>
        {state.demo && (
          <p className="text-xs text-muted-2 mt-6 max-w-md mx-auto">
            (Mode démonstration : l'envoi d'email n'est pas encore configuré. La demande a
            été journalisée côté serveur. Voir le README pour brancher l'envoi réel.)
          </p>
        )}
      </div>
    );
  }

  const steps = ["Mon projet", "Mon message", "Mes coordonnées"];

  return (
    <form action={formAction} className="card p-6 md:p-10">
      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div
              className={`h-8 w-8 rounded-full grid place-items-center text-sm font-display font-bold shrink-0 transition-colors ${
                i <= step
                  ? "bg-gold text-[#1a1508]"
                  : "bg-surface-2 border border-border text-muted-2"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-xs hidden sm:block ${
                i <= step ? "text-foreground" : "text-muted-2"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`h-px flex-1 ${i < step ? "bg-gold" : "bg-border"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: project types */}
      <div className={step === 0 ? "block" : "hidden"}>
        <p className="text-muted mb-5">
          Si vous avez déjà une idée, sélectionnez le(s) type(s) de vidéo concerné(s) :
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {projectTypes.map((t) => {
            const on = selected.includes(t);
            return (
              <button
                type="button"
                key={t}
                onClick={() => toggle(t)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-colors ${
                  on
                    ? "border-gold/60 bg-gold/10 text-foreground"
                    : "border-border bg-surface-2/50 text-muted hover:border-gold/30"
                }`}
              >
                <span
                  className={`h-5 w-5 rounded grid place-items-center shrink-0 border ${
                    on ? "bg-gold border-gold text-[#1a1508]" : "border-muted-2"
                  }`}
                >
                  {on && <IconCheck className="h-3.5 w-3.5" />}
                </span>
                <span className="text-sm">{t}</span>
              </button>
            );
          })}
        </div>
        {selected.map((t) => (
          <input key={t} type="hidden" name="projectTypes" value={t} />
        ))}
        <div className="flex justify-end mt-8">
          <button type="button" onClick={() => setStep(1)} className="btn btn-gold">
            Continuer <IconArrow className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Step 2: message + file */}
      <div className={step === 1 ? "block" : "hidden"}>
        <label className="block mb-2 text-sm font-medium">
          Votre message <span className="text-gold">*</span>
        </label>
        <textarea
          name="message"
          rows={6}
          placeholder="Décrivez votre projet, vos objectifs, votre échéance…"
          className="w-full rounded-xl bg-surface-2/60 border border-border px-4 py-3 text-foreground placeholder:text-muted-2 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition"
        />
        {state.fieldErrors?.message && (
          <p className="text-red-400 text-sm mt-1">{state.fieldErrors.message}</p>
        )}

        <label className="block mt-6 mb-2 text-sm font-medium text-muted">
          Un fichier à nous transmettre ? (optionnel)
        </label>
        <label className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-border bg-surface-2/40 cursor-pointer hover:border-gold/40 transition">
          <input
            type="file"
            className="hidden"
            accept=".txt,.rtf,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
          <span className="text-sm text-muted">
            {fileName || "Choisir un fichier (pdf, doc, ppt, xls… max 10 Mo)"}
          </span>
        </label>
        <input type="hidden" name="fileName" value={fileName} />

        <div className="flex justify-between mt-8">
          <button type="button" onClick={() => setStep(0)} className="btn btn-ghost">
            <IconArrow className="h-4 w-4 rotate-180" /> Retour
          </button>
          <button type="button" onClick={() => setStep(2)} className="btn btn-gold">
            Continuer <IconArrow className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Step 3: coordinates */}
      <div className={step === 2 ? "block" : "hidden"}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field name="firstName" label="Prénom" required error={state.fieldErrors?.firstName} />
          <Field name="lastName" label="Nom" required error={state.fieldErrors?.lastName} />
          <Field name="email" label="Email" type="email" required error={state.fieldErrors?.email} />
          <Field name="phone" label="Téléphone" type="tel" />
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px]"
          aria-hidden
        />

        <p className="text-xs text-muted-2 mt-4">* Champs obligatoires</p>

        <div className="flex justify-between mt-8">
          <button type="button" onClick={() => setStep(1)} className="btn btn-ghost">
            <IconArrow className="h-4 w-4 rotate-180" /> Retour
          </button>
          <button type="submit" disabled={pending} className="btn btn-gold disabled:opacity-60">
            {pending ? "Envoi…" : "Envoyer ma demande"}
            {!pending && <IconArrow className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Message d'erreur — hors des étapes, donc toujours visible */}
      {state.error && !pending && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-300 bg-red-50 px-5 py-4"
        >
          <p className="text-red-700 text-sm leading-relaxed">{state.error}</p>
          {state.fieldErrors && Object.keys(state.fieldErrors).length > 0 && (
            <button
              type="button"
              onClick={() => setStep(state.fieldErrors?.message ? 1 : 2)}
              className="mt-2 text-red-700 text-sm font-semibold underline underline-offset-2"
            >
              Voir les champs à corriger
            </button>
          )}
        </div>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        name={name}
        type={type}
        className="w-full rounded-xl bg-surface-2/60 border border-border px-4 py-3 text-foreground placeholder:text-muted-2 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition"
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
