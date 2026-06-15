import { AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { requireAdminPage } from "@/lib/admin-auth";
import { getTariffCatalog, seedDefaultTariffs } from "@/lib/tariffs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TariffManager from "./TariffManager";

export const metadata = {
  title: "Tarifs | Admin",
  robots: { index: false, follow: false },
};

async function loadCatalog() {
  try {
    await seedDefaultTariffs();
    return {
      catalog: await getTariffCatalog({ includeInactive: true }),
      error: null,
    };
  } catch (error) {
    return { catalog: null, error };
  }
}

export default async function TariffsPage() {
  await requireAdminPage();
  const { catalog, error } = await loadCatalog();

  if (catalog) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.35em] text-[#C9A84C]/60">
              Tarifs
            </p>
            <h1 className="text-xl font-semibold text-[#f0ece3] md:text-2xl">
              Packs et options
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-[#f0ece3]/40">
              Modifie les noms, prix, contenus inclus, badges et options affiches sur le site.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/#tarifs" target="_blank">
              <ExternalLink className="h-4 w-4" />
              Voir le site
            </Link>
          </Button>
        </div>

        <TariffManager catalog={catalog} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <Card className="border-yellow-500/20 bg-yellow-500/[0.04]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-300">
            <AlertTriangle className="h-5 w-5" />
            Tables tarifs absentes
          </CardTitle>
          <CardDescription>
            Le code est pret. Il faut pousser le schema Drizzle avant de modifier les tarifs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <code className="block rounded-lg border border-white/10 bg-[#06080f] px-4 py-3 text-sm text-[#f0ece3]">
            npm run db:push
          </code>
          <p className="text-xs text-[#f0ece3]/35">
            Erreur source: {error instanceof Error ? error.message : "schema indisponible"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
