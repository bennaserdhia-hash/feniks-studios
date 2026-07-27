import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase côté serveur (jamais exposé au navigateur).
 *
 * Utilise la clé secrète (service_role) : elle contourne les RLS, ce qui est
 * voulu — seul notre code serveur, déjà protégé par mot de passe pour /admin,
 * y accède. La clé ne doit JAMAIS être préfixée NEXT_PUBLIC_.
 *
 * Variables d'environnement attendues :
 *   SUPABASE_URL         (ex. https://xxxx.supabase.co)
 *   SUPABASE_SECRET_KEY  (clé « secret » / service_role du projet)
 *
 * Si elles ne sont pas définies, on renvoie null : l'appelant retombe alors
 * sur le fichier JSON local (lecture seule) pour ne jamais casser le site.
 */
let cached: SupabaseClient | null | undefined;

export function getServiceClient(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    cached = null;
    return null;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export const PORTFOLIO_TABLE = "feniks_portfolio";
