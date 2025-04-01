"use client";

import Navbar from '@/components/layout/navbar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Terms() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0E232E] via-[#0E232E] to-[#134e5c]">
      {/* Background Effects */}
      <div className="light-rays-container">
        <div className="light-ray light-ray-1"></div>
        <div className="light-ray light-ray-2"></div>
        <div className="light-ray light-ray-3"></div>
      </div>

      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-none"
        >
          <h1 className="text-[var(--font-size-habibi-h1)] font-heading text-center mb-8">
            Conditions générales d'utilisation
          </h1>
          
          <div className="bg-[#132D3B] rounded-[30px] p-8">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <p className="text-foreground/80">En vigueur au 01/01/2025</p>
                </div>

                <p className="text-foreground/80">
                  Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement
                  juridique des modalités de mise à disposition du site et des services par Influx social et de
                  définir les conditions d'accès et d'utilisation des services par l'utilisateur.
                </p>

                <p className="text-foreground/80">
                  Les présentes CGU sont accessibles sur le site à la rubrique «CGU».
                </p>

                <p className="text-foreground/80">
                  Toute inscription ou utilisation du site implique l'acceptation sans aucune réserve ni
                  restriction des présentes CGU par l'utilisateur.
                </p>

                <p className="text-foreground/80">
                  Lors de l'inscription sur le site via le formulaire d'inscription, chaque utilisateur
                  accepte expressément les présentes CGU en cochant la case précédant le texte suivant : «
                  Je reconnais avoir lu et compris les CGU et je les accepte ».
                </p>

                <p className="text-foreground/80">
                  En cas de non-acceptation des CGU stipulées dans le présent contrat, l'utilisateur se doit de
                  renoncer à l'accès des services proposés par le site. lacamehouse.org se réserve le droit de
                  modifier unilatéralement et à tout moment le contenu des présentes CGU.
                </p>

                <section>
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">I. ACCÈS AU SITE</h2>
                  <p className="text-foreground/80">
                    Notre site lacamehouse.org permet aux utilisateurs d'expérimenter le soin en santé
                    mentale, à tout moment et depuis n'importe où dans le monde, via un site web / une application
                    mobile qui propose différents services, notamment :
                  </p>
                  <ul className="list-disc pl-24 text-foreground/80 space-y-2">
                    <li>des évaluations en santé mentale ;</li>
                    <li>l'établissement de plans d'action ;</li>
                    <li>l'établissement de projets de soin ;</li>
                    <li>des thérapies assistées par IA ;</li>
                    <li>des visio-consultations avec des professionnels qualifiés ;</li>
                    <li>un espace d'entraide communautaire ;</li>
                  </ul>

                  <p className="text-foreground/80 mt-4">
                    Le site web et l'application mobile sont donc accessible en tout lieu à tout utilisateur
                    disposant d'un accès à Internet.
                  </p>

                  <p className="text-foreground/80">
                    Tous les frais supportés par l'utilisateur pour accéder au service (matériel informatique,
                    logiciels, connexion Internet, etc.) sont à sa charge.
                  </p>

                  <p className="text-foreground/80">
                    L'utilisateur non membre n'a pas accès aux services réservés. Pour cela, il doit s'inscrire
                    en remplissant le formulaire.
                  </p>

                  <p className="text-foreground/80">
                    En acceptant de s'inscrire aux services réservés, l'utilisateur membre s'engage à
                    fournir des informations sincères et exactes concernant ses coordonnées, notamment son
                    adresse email.
                  </p>

                  <p className="text-foreground/80">
                    Pour accéder aux services, l'utilisateur doit ensuite s'identifier à l'aide de son
                    adresse email et du mot de passe qu'il aura choisi lors de son inscription.
                  </p>

                  <p className="text-foreground/80">
                    Tout utilisateur membre régulièrement inscrit pourra également solliciter sa désinscription en
                    se rendant à la page dédiée sur son espace personnel. Celle-ci sera effective dans un délai
                    raisonnable.
                  </p>
                </section>

                <section>
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">II. COLLECTE DE DONNÉES</h2>
                  <p className="text-foreground/80">
                    Le site assure à l'utilisateur une collecte et un traitement d'informations personnelles dans
                    le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à
                    l'informatique, aux fichiers et aux libertés.
                  </p>
                  <p className="text-foreground/80">
                    En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'utilisateur dispose
                    d'un droit d'accès, de rectification, de suppression et d'opposition de ses données
                    personnelles.
                  </p>
                  <p className="text-foreground/80">
                    L'utilisateur peut exercer ce droit :
                  </p>
                  <ul className="list-disc pl-24 text-foreground/80 space-y-2">
                    <li>via son espace personnel</li>
                    <li>via un formulaire de contact</li>
                    <li>par mail à l'adresse email dotho.d@lacamehouse.org</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">III. PROPRIÉTÉ INTELLECTUELLE</h2>
                  <p className="text-foreground/80">
                    Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font
                    l'objet d'une protection par le Code de la propriété intellectuelle et plus
                    particulièrement par le droit d'auteur.
                  </p>
                  <p className="text-foreground/80">
                    La Camé House est une marque déposée par THIOLICA Ludovic.
                  </p>
                  <p className="text-foreground/80">
                    Toute représentation et/ou reproduction et/ou exploitation partielle ou totale de cette
                    marque, de quelque nature que ce soit, est totalement prohibée.
                  </p>
                </section>

                <section>
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">IV. RESPONSABILITÉ</h2>
                  <p className="text-foreground/80">
                    Les sources des informations diffusées sur le site lacamehouse.org sont réputées fiables mais
                    le site ne garantit pas qu'il soit exempt de défauts, d'erreurs ou d'omissions.
                  </p>
                  <p className="text-foreground/80">
                    Les informations communiquées sont présentées à titre indicatif et général sans valeur
                    contractuelle.
                  </p>
                  <p className="text-foreground/80">
                    Malgré des mises à jour régulières, le site lacamehouse.org ne peut être tenu responsable de
                    la modification des dispositions administratives et juridiques survenant après la publication.
                  </p>
                </section>

                <section>
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">V. LIENS HYPERTEXTES</h2>
                  <p className="text-foreground/80">
                    Des liens hypertextes peuvent être présents sur le site. En cliquant sur des liens externes,
                    l'utilisateur sera informé du fait que ceux-ci le feront sortir du site lacamehouse.org.
                  </p>
                  <p className="text-foreground/80">
                    La Camé House n'a pas de contrôle sur ces pages web et ne saurait, en aucun cas, être
                    responsable de leur contenu.
                  </p>
                </section>

                <section>
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">VI. COOKIES</h2>
                  <p className="text-foreground/80">
                    L'utilisateur est informé que lors de ses visites sur le site, des cookies peuvent
                    s'installer automatiquement sur son navigateur.
                  </p>
                  <p className="text-foreground/80">
                    Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l'ordinateur
                    de l'utilisateur par le navigateur et qui sont nécessaires à l'utilisation du site
                    lacamehouse.org.
                  </p>
                  <p className="text-foreground/80">
                    Les cookies ne contiennent pas d'informations personnelles et ne peuvent pas être utilisés
                    pour identifier quelqu'un.
                  </p>
                </section>

                <section>
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">VII. PUBLICATIONS PAR L'UTILISATEUR</h2>
                  <p className="text-foreground/80">
                    Le site permet aux membres de publier des articles et des commentaires dans l'espace
                    d'entraide communautaire.
                  </p>
                  <p className="text-foreground/80">
                    Dans ses publications, le membre s'engage à respecter les règles de la Netiquette (règles de
                    bonne conduite de l'internet) et les règles de droit en vigueur.
                  </p>
                  <p className="text-foreground/80">
                    Le site peut exercer une modération sur les publications et se réserve le droit de refuser
                    leur mise en ligne, sans avoir à s'en justifier auprès du membre.
                  </p>
                </section>

                <section>
                  <h2 className="text-[var(--font-size-habibi-h2)] font-heading mb-4">VIII. DROIT APPLICABLE ET JURIDICTION COMPÉTENTE</h2>
                  <p className="text-foreground/80">
                    La législation française s'applique au présent contrat. En cas d'absence de résolution
                    amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents.
                  </p>
                  <p className="text-foreground/80">
                    Pour toute question relative à l'application des présentes CGU, vous pouvez joindre l'éditeur
                    aux coordonnées inscrites à l'ARTICLE 1.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </div>
        </motion.div>
      </div>
    </main>
  );
}