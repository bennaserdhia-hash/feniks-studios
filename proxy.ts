import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protège le dashboard (/admin et son API) par mot de passe.
 *
 * Identifiants définis via les variables d'environnement :
 *   ADMIN_USER      (par défaut : "feniks")
 *   ADMIN_PASSWORD  (obligatoire en production)
 *
 * Sans ADMIN_PASSWORD en production, l'accès est refusé purement et simplement :
 * mieux vaut un dashboard inaccessible qu'un dashboard ouvert à tous.
 */
export function proxy(request: NextRequest) {
  const user = process.env.ADMIN_USER || "feniks";
  const password = process.env.ADMIN_PASSWORD;

  // En développement local, pas de mot de passe requis.
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  if (!password) {
    return new NextResponse(
      "Dashboard désactivé : la variable ADMIN_PASSWORD n'est pas configurée.",
      { status: 503 }
    );
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const index = decoded.indexOf(":");
      const givenUser = decoded.slice(0, index);
      const givenPassword = decoded.slice(index + 1);
      if (givenUser === user && givenPassword === password) {
        return NextResponse.next();
      }
    } catch {
      // en-tête malformé : on retombe sur la demande d'authentification
    }
  }

  // Attention : les en-têtes HTTP doivent rester en ASCII (pas d'accent ni de tiret long).
  return new NextResponse("Authentification requise", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Feniks Studios Administration"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/portfolio/:path*"],
};
