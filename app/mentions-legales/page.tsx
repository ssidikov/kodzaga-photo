import Link from "next/link";
import { ArrowLeft, Scale, Shield, Building, Globe, Mail } from "lucide-react";

export const metadata = {
  title: "Mentions Légales | Alex Photos",
  description: "Mentions légales obligatoires concernant le site internet alex-photos.fr de l'entreprise Alexis Kodzaga.",
};

export default function MentionsLegales() {
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
            Informations obligatoires
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Mentions <em className="gold-text">Légales</em>
          </h1>
          <div className="w-12 gold-divider opacity-50 mb-8" />
          <p className="text-cream/50 text-sm font-light leading-relaxed max-w-xl">
            Conformément aux dispositions de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN), voici les mentions légales du site alex-photos.fr.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Éditeur */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <Building className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">1. Éditeur du site</h2>
                <div className="text-cream/60 text-sm font-light space-y-2 leading-relaxed">
                  <p>
                    <strong className="text-cream font-medium">Nom de l&apos;entreprise :</strong> Alexis Kodzaga (Entrepreneur Individuel)
                  </p>
                  <p>
                    <strong className="text-cream font-medium">Adresse du siège social :</strong> 34 rue de la Croix, 95220 Herblay-sur-Seine, France
                  </p>
                  <p>
                    <strong className="text-cream font-medium">Immatriculation :</strong> Entreprise enregistrée sous le numéro SIREN <span className="text-gold/80 font-medium">100 928 357</span> (SIRET : 10092835700019)
                  </p>
                  <p>
                    <strong className="text-cream font-medium">Activité principale exercée (APE) :</strong> 59.11B — Production de films institutionnels et publicitaires
                  </p>
                  <p className="flex items-center gap-2 mt-4">
                    <strong className="text-cream font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gold/45" /> Contact e-mail :</strong>{" "}
                    <a href="mailto:contact@alex-photos.fr" className="gold-text hover:underline transition-all">
                      contact@alex-photos.fr
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Directeur Publication */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">2. Directeur de la publication</h2>
                <div className="text-cream/60 text-sm font-light leading-relaxed">
                  <p>
                    Le directeur de la publication et responsable de la rédaction du site est <strong className="text-cream font-medium">Monsieur Alexis Kodzaga</strong>, en sa qualité d&apos;éditeur et de propriétaire du site.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hébergeur */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">3. Hébergement du site</h2>
                <div className="text-cream/60 text-sm font-light space-y-2 leading-relaxed">
                  <p>
                    Le site internet est hébergé par <strong className="text-cream font-medium">Vercel Inc.</strong>
                  </p>
                  <p>
                    <strong className="text-cream font-medium">Adresse :</strong> 650 2nd St, San Francisco, CA 94107, États-Unis
                  </p>
                  <p>
                    <strong className="text-cream font-medium">Site internet :</strong>{" "}
                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="gold-text hover:underline transition-all">
                      https://vercel.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Propriété Intellectuelle */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">4. Propriété intellectuelle</h2>
                <div className="text-cream/60 text-sm font-light space-y-4 leading-relaxed">
                  <p>
                    Alexis Kodzaga est propriétaire des droits de propriété intellectuelle ou détient les droits d&apos;usage sur tous les éléments accessibles sur le site internet, notamment les textes, photographies, vidéos, graphismes, logos, icônes et sons.
                  </p>
                  <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l&apos;éditeur.
                  </p>
                  <p>
                    Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments qu&apos;il contient sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RGPD */}
          <div className="bg-surface border border-gold/[0.06] p-8 md:p-10 relative">
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-gold shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-cream font-medium">5. Données personnelles et Cookies</h2>
                <div className="text-cream/60 text-sm font-light space-y-4 leading-relaxed">
                  <p>
                    Ce site n&apos;utilise aucun cookie tiers de suivi publicitaire ou d&apos;analyse d&apos;audience (analytics).
                  </p>
                  <p>
                    Les informations recueillies via le formulaire de contact (nom complet, email, téléphone, date, lieu, prestation et message) sont traitées de manière confidentielle et servent uniquement à répondre aux demandes de devis ou de renseignements.
                  </p>
                  <p>
                    Conformément à la réglementation RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de portabilité et de suppression de vos données personnelles. Vous pouvez exercer ce droit à tout moment par e-mail à l&apos;adresse suivante :{" "}
                    <a href="mailto:contact@alex-photos.fr" className="gold-text hover:underline transition-all">
                      contact@alex-photos.fr
                    </a>
                    .
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
