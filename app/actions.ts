"use server";

import { site } from "@/lib/content";

export type QuoteState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  demo?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendQuote(
  _prev: QuoteState,
  formData: FormData
): Promise<QuoteState> {
  // Honeypot anti-spam (champ caché "company")
  if ((formData.get("company") as string)?.trim()) {
    return { ok: true }; // on ignore silencieusement les bots
  }

  const firstName = (formData.get("firstName") as string)?.trim() ?? "";
  const lastName = (formData.get("lastName") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";
  const types = formData.getAll("projectTypes").map(String);
  const fileName = (formData.get("fileName") as string)?.trim() ?? "";

  const fieldErrors: Record<string, string> = {};
  if (!firstName) fieldErrors.firstName = "Prénom requis";
  if (!lastName) fieldErrors.lastName = "Nom requis";
  if (!email) fieldErrors.email = "Email requis";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Email invalide";
  if (!message) fieldErrors.message = "Merci de décrire votre projet";

  if (Object.keys(fieldErrors).length) {
    return { ok: false, fieldErrors, error: "Veuillez corriger les champs indiqués." };
  }

  const subject = `Nouvelle demande de devis — ${firstName} ${lastName}`;
  const lines = [
    `Nom : ${firstName} ${lastName}`,
    `Email : ${email}`,
    `Téléphone : ${phone || "—"}`,
    `Types de projet : ${types.length ? types.join(", ") : "—"}`,
    fileName ? `Fichier joint (mentionné) : ${fileName}` : "",
    "",
    "Message :",
    message,
  ].filter(Boolean);

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
      <h2 style="color:#c2954c">Nouvelle demande de devis</h2>
      <p><strong>Nom :</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Téléphone :</strong> ${escapeHtml(phone) || "—"}</p>
      <p><strong>Types de projet :</strong> ${types.map(escapeHtml).join(", ") || "—"}</p>
      ${fileName ? `<p><strong>Fichier mentionné :</strong> ${escapeHtml(fileName)}</p>` : ""}
      <p><strong>Message :</strong></p>
      <p style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${escapeHtml(
        message
      )}</p>
    </div>`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || site.email;
  const from = process.env.CONTACT_FROM || "Feniks Studios <onboarding@resend.dev>";

  // Pas de clé configurée.
  if (!apiKey) {
    // En développement : on journalise et on confirme, pratique pour tester.
    if (process.env.NODE_ENV !== "production") {
      console.log("[DEVIS — mode démo, email non configuré]\n" + lines.join("\n"));
      return { ok: true, demo: true };
    }
    // En production : surtout ne PAS faire croire que c'est parti.
    console.error(
      "[DEVIS PERDU] RESEND_API_KEY absente en production. Demande reçue :\n" +
        lines.join("\n")
    );
    return {
      ok: false,
      error: `L'envoi automatique est momentanément indisponible. Écrivez-nous directement à ${to}, nous vous répondrons rapidement.`,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      // on journalise la demande pour ne rien perdre, même si l'envoi échoue
      console.error(
        `[DEVIS NON ENVOYÉ] Resend ${res.status} ${detail}\n` + lines.join("\n")
      );
      return {
        ok: false,
        error: `L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous directement à ${to}.`,
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("sendQuote error:", err);
    return {
      ok: false,
      error: "Une erreur réseau est survenue. Merci de réessayer.",
    };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
