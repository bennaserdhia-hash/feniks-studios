"use server";
import { site, projectTypes } from "@/lib/content";
import { attachmentError } from "@/lib/quote";
export type QuoteState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  demo?: boolean;
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function sendQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  if (text("company")) return { ok: true };
  const firstName = text("firstName"),
    lastName = text("lastName"),
    email = text("email"),
    phone = text("phone"),
    message = text("message");
  const types = formData
    .getAll("projectTypes")
    .filter(
      (v): v is string => typeof v === "string" && projectTypes.includes(v),
    );
  const attachment = formData.get("attachment");
  const file =
    attachment instanceof File && attachment.size > 0 ? attachment : null;
  const fieldErrors: Record<string, string> = {};
  if (!firstName || firstName.length > 100)
    fieldErrors.firstName = "Indiquez un prénom de 100 caractères maximum.";
  if (!lastName || lastName.length > 100)
    fieldErrors.lastName = "Indiquez un nom de 100 caractères maximum.";
  if (!EMAIL_RE.test(email) || email.length > 254)
    fieldErrors.email = "Indiquez une adresse email valide.";
  if (phone.length > 60)
    fieldErrors.phone = "Le numéro de téléphone est trop long.";
  if (!message || message.length > 10000)
    fieldErrors.message = "Décrivez votre projet en 10 000 caractères maximum.";
  if (file) {
    const error = attachmentError(file);
    if (error) fieldErrors.attachment = error;
  }
  if (Object.keys(fieldErrors).length)
    return {
      ok: false,
      fieldErrors,
      error:
        "Vérifiez les informations indiquées avant de renvoyer votre demande.",
    };
  const filename =
    file?.name
      .split(/[\\/]/)
      .pop()
      ?.replace(/[\r\n\u0000]/g, "") || "document";
  const lines = [
    `Nom : ${firstName} ${lastName}`,
    `Email : ${email}`,
    `Téléphone : ${phone || "Non renseigné"}`,
    `Types de projet : ${types.join(", ") || "À définir"}`,
    ...(file ? [`Pièce jointe : ${filename}`] : []),
    "",
    "Message :",
    message,
  ];
  const to = process.env.CONTACT_EMAIL || site.email;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") return { ok: true, demo: true };
    console.error(
      "[devis] Envoi indisponible : configuration email manquante.",
    );
    return {
      ok: false,
      error: `L’envoi automatique est momentanément indisponible. Écrivez-nous à ${to}, avec votre brief en pièce jointe.`,
    };
  }
  try {
    const attachments = file
      ? [
          {
            filename,
            content: Buffer.from(await file.arrayBuffer()).toString("base64"),
          },
        ]
      : undefined;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM || "Feniks Studios <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Nouvelle demande de devis — ${firstName} ${lastName}`,
        text: lines.join("\n"),
        html: `<div style="font-family:Arial,sans-serif;color:#17150f"><h2>Nouvelle demande de devis</h2><p style="white-space:pre-wrap">${escapeHtml(lines.join("\n"))}</p></div>`,
        attachments,
      }),
    });
    if (!response.ok) {
      console.error(
        `[devis] Échec du fournisseur email : HTTP ${response.status}.`,
      );
      return {
        ok: false,
        error: `Votre demande n’a pas pu être envoyée. Réessayez ou écrivez-nous directement à ${to}.`,
      };
    }
    return { ok: true };
  } catch {
    console.error("[devis] Échec ou expiration de la connexion email.");
    return {
      ok: false,
      error: `La connexion a été interrompue. Vos informations sont conservées : réessayez ou écrivez-nous à ${to}.`,
    };
  }
}
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
