"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { sendQuote, type QuoteState } from "@/app/actions";
import { projectTypes } from "@/lib/client-content";
import { attachmentError, ATTACHMENT_EXTENSIONS } from "@/lib/quote";
import { IconArrow, IconCheck } from "./Icons";
const initial: QuoteState = { ok: false };
type Values = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};
export default function QuoteForm() {
  const [state, formAction, pending] = useActionState(sendQuote, initial);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [values, setValues] = useState<Values>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const announced = useRef(false);
  const errors = {
    ...state.fieldErrors,
    ...Object.fromEntries(
      Object.entries(localErrors).filter(([, value]) => value),
    ),
  };
  useEffect(() => {
    const requested = new URLSearchParams(location.search).get("projet");
    const type =
      requested === "ia"
        ? projectTypes.find((t) => t.startsWith("Production IA"))
        : requested === "drone"
          ? projectTypes.find((t) => t.startsWith("Prises de vues Drone"))
          : undefined;
    if (type)
      queueMicrotask(() =>
        setSelected((s) => (s.includes(type) ? s : [...s, type])),
      );
  }, []);
  useEffect(() => {
    if (state.ok && !announced.current && !state.demo) {
      announced.current = true;
      track("quote_submitted", { projectTypes: selected.length });
    }
  }, [state.ok, state.demo, selected.length]);
  function update(name: keyof Values, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    setLocalErrors((e) => ({ ...e, [name]: "" }));
  }
  function advance(next: number) {
    if (step === 1 && !values.message.trim()) {
      setLocalErrors((e) => ({
        ...e,
        message: "Décrivez votre projet avant de continuer.",
      }));
      return;
    }
    if (step === 1 && errors.attachment) return;
    track("quote_step_completed", { step: step + 1 });
    setStep(next);
  }
  if (state.ok)
    return (
      <div className="card p-10 md:p-14 text-center" role="status">
        <IconCheck className="h-10 w-10 text-gold-ink mx-auto mb-5" />
        <h2 className="font-display text-2xl font-bold mb-3">
          {state.demo ? "Formulaire testé" : "Demande envoyée"}
        </h2>
        <p className="text-muted">
          {state.demo
            ? "Le mode local de test ne transmet aucun email."
            : "Merci pour votre projet. Notre équipe revient vers vous pour préparer la suite."}
        </p>
      </div>
    );
  return (
    <form
      action={(data) => {
        if (attachment) data.set("attachment", attachment);
        formAction(data);
      }}
      noValidate
      className="card p-6 md:p-10"
    >
      <ol
        aria-label="Étapes de la demande"
        className="flex gap-3 border-b border-border pb-6 mb-7"
      >
        {["Mon projet", "Mon message", "Mes coordonnées"].map((label, i) => (
          <li
            key={label}
            aria-current={i === step ? "step" : undefined}
            className={`flex-1 text-sm ${i === step ? "font-bold text-foreground" : "text-muted"}`}
          >
            <span className="block mb-1">{i + 1} / 3</span>
            <span>{label}</span>
          </li>
        ))}
      </ol>
      <fieldset disabled={pending} className={step === 0 ? "block" : "hidden"}>
        <legend className="text-muted mb-5">
          Quels formats envisagez-vous ? Plusieurs choix sont possibles.
        </legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={selected.includes(type)}
              onClick={() =>
                setSelected((s) =>
                  s.includes(type) ? s.filter((t) => t !== type) : [...s, type],
                )
              }
              className={`flex items-center gap-3 p-4 rounded-xl border text-left ${selected.includes(type) ? "border-gold-ink bg-surface text-foreground" : "border-border text-muted hover:border-gold-ink"}`}
            >
              <span
                aria-hidden="true"
                className="h-5 w-5 shrink-0 border border-muted rounded"
              >
                {selected.includes(type) && <IconCheck className="h-5 w-5" />}
              </span>
              <span className="text-sm">{type}</span>
            </button>
          ))}
        </div>
        {selected.map((type) => (
          <input key={type} type="hidden" name="projectTypes" value={type} />
        ))}
        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={() => advance(1)}
            className="btn btn-gold"
          >
            Continuer <IconArrow className="h-4 w-4" />
          </button>
        </div>
      </fieldset>
      <fieldset disabled={pending} className={step === 1 ? "block" : "hidden"}>
        <legend className="sr-only">Votre message et votre brief</legend>
        <label
          htmlFor="quote-message"
          className="block text-sm font-semibold mb-2"
        >
          Votre message *
        </label>
        <textarea
          id="quote-message"
          name="message"
          rows={6}
          maxLength={10000}
          required
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "quote-message-error" : undefined}
          placeholder="Votre objectif, votre public, la date de diffusion…"
          className="w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-base"
        />
        {errors.message && (
          <p id="quote-message-error" className="text-red-700 text-sm mt-2">
            {errors.message}
          </p>
        )}
        <label
          htmlFor="quote-attachment"
          className="block mt-6 text-sm font-semibold mb-2"
        >
          Un brief à joindre ?
        </label>
        <p id="quote-attachment-help" className="text-sm text-muted mb-3">
          PDF, texte, Word, PowerPoint ou Excel. Maximum 3 Mo. Pour un fichier
          plus lourd, ajoutez un lien dans votre message.
        </p>
        <input
          id="quote-attachment"
          name="attachment"
          type="file"
          accept={ATTACHMENT_EXTENSIONS.map((ext) => `.${ext}`).join(",")}
          aria-invalid={Boolean(errors.attachment)}
          aria-describedby={`quote-attachment-help${errors.attachment ? " quote-attachment-error" : ""}`}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            const error = file ? attachmentError(file) : "";
            setLocalErrors((prev) => ({ ...prev, attachment: error }));
            setAttachment(error ? null : file);
            if (error) e.target.value = "";
          }}
          className="w-full text-sm file:mr-3 file:border file:border-border file:rounded-lg file:bg-surface file:px-4 file:py-3 file:text-foreground"
        />
        {attachment && (
          <p className="text-sm text-muted mt-2">
            Fichier sélectionné : {attachment.name}
          </p>
        )}
        {errors.attachment && (
          <p id="quote-attachment-error" className="text-red-700 text-sm mt-2">
            {errors.attachment}
          </p>
        )}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => setStep(0)}
            className="btn btn-outline"
          >
            Retour
          </button>
          <button
            type="button"
            onClick={() => advance(2)}
            className="btn btn-gold"
          >
            Continuer <IconArrow className="h-4 w-4" />
          </button>
        </div>
      </fieldset>
      <fieldset disabled={pending} className={step === 2 ? "block" : "hidden"}>
        <legend className="sr-only">Vos coordonnées</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          {(
            [
              ["firstName", "Prénom", "text", "given-name"],
              ["lastName", "Nom", "text", "family-name"],
              ["email", "Email", "email", "email"],
              ["phone", "Téléphone", "tel", "tel"],
            ] as const
          ).map(([name, label, type, complete]) => (
            <div key={name}>
              <label
                htmlFor={`quote-${name}`}
                className="block text-sm font-semibold mb-2"
              >
                {label}
                {name !== "phone" && " *"}
              </label>
              <input
                id={`quote-${name}`}
                name={name}
                type={type}
                autoComplete={complete}
                required={name !== "phone"}
                maxLength={name === "email" ? 254 : name === "phone" ? 60 : 100}
                value={values[name]}
                onChange={(e) => update(name, e.target.value)}
                aria-invalid={Boolean(errors[name])}
                aria-describedby={
                  errors[name] ? `quote-${name}-error` : undefined
                }
                className="w-full border border-border bg-surface/60 rounded-xl px-4 py-3 text-base"
              />
              {errors[name] && (
                <p
                  id={`quote-${name}-error`}
                  className="text-red-700 text-sm mt-2"
                >
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
        </div>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px]"
          aria-hidden="true"
        />
        <p className="text-xs text-muted mt-5">
          * Champs obligatoires. Vos informations servent à répondre à votre
          demande.{" "}
          <a className="underline underline-offset-2" href="/mentions-legales">
            Confidentialité
          </a>
        </p>
        <div className="flex justify-between mt-8 gap-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="btn btn-outline"
          >
            Retour
          </button>
          <button
            type="submit"
            disabled={pending}
            className="btn btn-gold disabled:opacity-60"
          >
            {pending ? "Envoi…" : "Envoyer ma demande"}
          </button>
        </div>
      </fieldset>
      {state.error && !pending && (
        <div
          role="alert"
          className="mt-6 p-4 rounded-xl bg-red-50 text-red-800"
        >
          <p>{state.error}</p>
          {state.fieldErrors && (
            <button
              type="button"
              className="underline underline-offset-4 font-semibold mt-3"
              onClick={() =>
                setStep(
                  state.fieldErrors?.message || state.fieldErrors?.attachment
                    ? 1
                    : 2,
                )
              }
            >
              Voir les champs à corriger
            </button>
          )}
        </div>
      )}
    </form>
  );
}
