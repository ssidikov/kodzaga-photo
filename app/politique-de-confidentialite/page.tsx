import Link from "next/link";
import { ArrowLeft, Shield, Eye, Database, FileText, UserCheck, Cookie } from "lucide-react";

export const metadata = {
  title: "Politique de Confidentialité | Alex Photos",
  description: "Politique de confidentialité concernant la protection des données personnelles sur le site alex-photos.fr.",
};

export default function PolitiqueDeConfidentialite() {
  return (
    <div className="min-h-screen bg-bg text-cream font-body py-24 px-6 md:px-14">
      {/* Decorative background grid elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,168,76,0.05),transparent)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cream/40 hover:text-gold transition-colors duration-300 font-body text-[11px] tracking-[0.2em] uppercase mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>

        {/* Header */}
        <div className="mb-16">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/45 mb-4">
            Protection des données
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Politique de <em className="gold-text">Confidentialité</em>
          </h1>
          <div className="w-12 gold-divider opacity-50 mb-8" />
          <p className="text-cream/50 text-sm font-light leading-relaxed max-w-xl">
            La présente politique de confidentialité a pour but de vous informer sur la manière dont vos données personnelles sont collectées, traitées et protégées sur le site alex-photos.fr.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">1. Responsable du traitement</h2>
                <div className="text-cream/60 text-sm font-light leading-relaxed">
                  <p>
                    Le traitement des données personnelles collectées sur le site est effectué sous la responsabilité de <strong className="text-cream font-medium">Monsieur Alexis Kodzaga</strong>, en sa qualité d&apos;éditeur et responsable du site.
                  </p>
                  <p className="mt-2">
                    Pour toute question relative à la protection de vos données, vous pouvez nous écrire à l&apos;adresse suivante :{" "}
                    <a href="mailto:contact@alex-photos.fr" className="gold-text hover:underline transition-all">
                      contact@alex-photos.fr
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Données collectées */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">2. Données personnelles collectées</h2>
                <div className="text-cream/60 text-sm font-light space-y-3 leading-relaxed">
                  <p>
                    Nous collectons uniquement les données personnelles que vous nous fournissez volontairement lors de l&apos;envoi du formulaire de contact et de réservation :
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-cream/50">
                    <li><strong className="text-cream/70 font-medium">Identité :</strong> Nom complet.</li>
                    <li><strong className="text-cream/70 font-medium">Coordonnées :</strong> Adresse e-mail, numéro de téléphone.</li>
                    <li><strong className="text-cream/70 font-medium">Détails du projet :</strong> Prestation souhaitée, date souhaitée, lieu, options choisies et message rédigé.</li>
                  </ul>
                  <p className="text-[13px] text-cream/40 italic">
                    Aucune donnée dite &quot;sensible&quot; (données de santé, opinions politiques, etc.) n&apos;est collectée ou demandée.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Finalités */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">3. Finalités et base légale du traitement</h2>
                <div className="text-cream/60 text-sm font-light space-y-3 leading-relaxed">
                  <p>
                    Vos données sont collectées et traitées uniquement pour les finalités suivantes :
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-cream/50">
                    <li>Répondre à vos demandes de renseignements et de devis.</li>
                    <li>Planifier et organiser les séances de shooting photo / prestations.</li>
                    <li>Gérer la relation commerciale et la facturation.</li>
                  </ul>
                  <p>
                    La base légale de ce traitement est <strong className="text-cream font-medium">votre consentement</strong> (lorsque vous soumettez le formulaire) et l&apos;exécution de <strong className="text-cream font-medium">mesures précontractuelles</strong> nécessaires à l&apos;établissement d&apos;une prestation de service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conservation et destinataires */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">4. Durée de conservation et destinataires</h2>
                <div className="text-cream/60 text-sm font-light space-y-3 leading-relaxed">
                  <p>
                    <strong className="text-cream font-medium">Destinataires :</strong> Vos données sont destinées à l&apos;usage exclusif de Monsieur Alexis Kodzaga. Elles ne sont jamais vendues, louées ou transmises à des tiers à des fins publicitaires ou commerciales.
                  </p>
                  <p>
                    <strong className="text-cream font-medium">Conservation :</strong> 
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-cream/50">
                    <li>Pour les simples demandes de devis ou de renseignements n&apos;ayant pas abouti à un contrat : conservation pour une durée maximale de <strong className="text-cream/70">3 ans</strong> à compter du dernier contact de votre part.</li>
                    <li>Pour les clients ayant réalisé une prestation : conservation pendant toute la durée de la relation contractuelle, puis archivage pour les durées légales de conservation des factures et contrats (10 ans).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Droits */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">5. Vos droits sur vos données</h2>
                <div className="text-cream/60 text-sm font-light space-y-3 leading-relaxed">
                  <p>
                    Conformément aux réglementations européenne (RGPD) et française (loi Informatique et Libertés), vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-cream/50">
                    <li><strong className="text-cream/70 font-medium">Droit d&apos;accès :</strong> obtenir la confirmation que des données vous concernant sont traitées.</li>
                    <li><strong className="text-cream/70 font-medium">Droit de rectification :</strong> demander la mise à jour ou correction de vos données.</li>
                    <li><strong className="text-cream/70 font-medium">Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;) :</strong> demander la suppression de vos données personnelles sous réserve des obligations légales de conservation.</li>
                    <li><strong className="text-cream/70 font-medium">Droit à la limitation ou opposition :</strong> demander à restreindre ou vous opposer au traitement de vos données.</li>
                  </ul>
                  <p className="mt-4">
                    Vous pouvez exercer ces droits en contactant Monsieur Alexis Kodzaga par e-mail à :{" "}
                    <a href="mailto:contact@alex-photos.fr" className="gold-text hover:underline transition-all">
                      contact@alex-photos.fr
                    </a>
                    . Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (cnil.fr).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">6. Cookies et technologies similaires</h2>
                <div className="text-cream/60 text-sm font-light space-y-3 leading-relaxed">
                  <p>
                    Notre site est conçu pour respecter au mieux la vie privée de ses visiteurs.
                  </p>
                  <p>
                    <strong className="text-cream font-medium">Traceurs analytiques et publicitaires :</strong> Aucun cookie tiers (de type Google Analytics, Facebook Pixel, etc.) n&apos;est utilisé ni installé sur votre navigateur pour suivre votre navigation.
                  </p>
                  <p>
                    <strong className="text-cream font-medium">Cookies techniques :</strong> Seuls des cookies techniques fonctionnels ou de sécurité, directement liés à la plateforme d&apos;hébergement (Vercel), peuvent être déposés pour assurer la sécurité et le bon chargement des pages. Ils ne collectent aucune donnée comportementale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center text-cream/20 text-[11px] font-light">
          Dernière mise à jour : Mai 2026
        </div>
      </div>
    </div>
  );
}
