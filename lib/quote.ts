export const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;
export const ATTACHMENT_EXTENSIONS = [
  "pdf",
  "txt",
  "rtf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
];
export function attachmentError(file: { name: string; size: number }) {
  if (file.size > MAX_ATTACHMENT_BYTES)
    return "Le fichier dépasse 3 Mo. Envoyez une version plus légère ou un lien dans votre message.";
  if (
    !ATTACHMENT_EXTENSIONS.includes(
      file.name.split(".").pop()?.toLowerCase() || "",
    )
  )
    return "Choisissez un document PDF, texte, Word, PowerPoint ou Excel.";
  return "";
}
