import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";
const root = path.resolve(import.meta.dirname, "..");
let sent = [];
let providerMode = "success";
const environment = {
  NODE_ENV: "production",
  RESEND_API_KEY: "mock-key",
  CONTACT_EMAIL: "contact@example.test",
};
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const sandboxModule = { exports: {} };
  cache.set(file, sandboxModule);
  if (file.endsWith(".json")) {
    sandboxModule.exports = JSON.parse(fs.readFileSync(file, "utf8"));
    return sandboxModule.exports;
  }
  const js = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      resolveJsonModule: true,
      esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(
    js,
    {
      module: sandboxModule,
      exports: sandboxModule.exports,
      Buffer,
      File,
      FormData,
      AbortSignal,
      process: { env: environment },
      console: { error() {}, log() {} },
      fetch: async (_url, options) => {
        sent.push(JSON.parse(options.body));
        if (providerMode === "network") throw new Error("mock failure");
        return {
          ok: providerMode === "success",
          status: providerMode === "success" ? 200 : 503,
        };
      },
      require: (spec) => {
        const base = spec.startsWith("@/")
          ? path.join(root, spec.slice(2))
          : path.resolve(path.dirname(file), spec);
        const resolved = [".ts", ".json", ""]
          .map((ext) => base + ext)
          .find((p) => fs.existsSync(p));
        if (!resolved) throw new Error("Unexpected import " + spec);
        return load(resolved);
      },
    },
    { filename: file },
  );
  return sandboxModule.exports;
}
const { sendQuote } = load(path.join(root, "app/actions.ts"));
function form(file) {
  const data = new FormData();
  for (const [name, value] of Object.entries({
    firstName: "Test",
    lastName: "Local",
    email: "test@example.test",
    message: "Brief de test local, sans envoi réel.",
  }))
    data.set(name, value);
  if (file) data.set("attachment", file);
  return data;
}
(async () => {
  const content = Buffer.from(
    "Pièce jointe : caractère accentué et contenu intégral.",
  );
  let result = await sendQuote(
    { ok: false },
    form(new File([content], "brief.txt")),
  );
  assert.equal(result.ok, true);
  assert.equal(
    Buffer.from(sent[0].attachments[0].content, "base64").compare(content),
    0,
  );
  assert.equal(sent[0].attachments[0].filename, "brief.txt");
  result = await sendQuote(
    { ok: false },
    form(new File([Buffer.alloc(3 * 1024 * 1024)], "limite.pdf")),
  );
  assert.equal(result.ok, true);
  const before = sent.length;
  result = await sendQuote(
    { ok: false },
    form(new File([Buffer.alloc(3 * 1024 * 1024 + 1)], "trop-grand.pdf")),
  );
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.attachment);
  assert.equal(sent.length, before);
  result = await sendQuote(
    { ok: false },
    form(new File(["bad"], "programme.exe")),
  );
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.attachment);
  const invalid = form();
  invalid.set("email", "pas-un-email");
  result = await sendQuote({ ok: false }, invalid);
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.email);
  const malformed = form();
  malformed.set("firstName", new File(["data"], "nom.txt"));
  result = await sendQuote({ ok: false }, malformed);
  assert.equal(result.ok, false);
  assert.ok(result.fieldErrors.firstName);
  providerMode = "failed";
  result = await sendQuote({ ok: false }, form());
  assert.equal(result.ok, false);
  providerMode = "network";
  result = await sendQuote({ ok: false }, form());
  assert.equal(result.ok, false);
  delete environment.RESEND_API_KEY;
  result = await sendQuote({ ok: false }, form());
  assert.equal(result.ok, false);
  const spam = form();
  spam.set("company", "spam");
  const requests = sent.length;
  result = await sendQuote({ ok: false }, spam);
  assert.equal(result.ok, true);
  assert.equal(sent.length, requests);
  console.log(
    "10 contrôles du formulaire validés ; aucun email ni appel réseau réel.",
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
