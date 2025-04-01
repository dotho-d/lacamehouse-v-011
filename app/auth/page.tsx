"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowRight, Check, X } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import { supabase } from '@/lib/supabase/client';
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";


// Schéma de validation pour le formulaire de connexion
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  stayLoggedIn: z.boolean().default(false),
});

// Schéma de validation pour le formulaire d'inscription
const registerSchema = z.object({
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  pseudo: z.string().min(3, "Le pseudo doit contenir au moins 3 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmPassword: z.string(),
  accepted_legal: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les mentions légales",
  }),
  accepted_terms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegistrationStep = 'welcome' | 'legal' | 'terms' | 'firstName' | 'pseudo' | 'email' | 'password' | 'loading';
type AuthMode = 'login' | 'register';

export default function Auth() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>('welcome');
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
  const [isPseudoAvailable, setIsPseudoAvailable] = useState<boolean | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingSubMessage, setLoadingSubMessage] = useState("");
  const { toast } = useToast();

  // États pour les critères de mot de passe
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      stayLoggedIn: false,
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      pseudo: "",
      email: "",
      password: "",
      confirmPassword: "",
      accepted_legal: false,
      accepted_terms: false,
    },
  });

  // Vérification des critères de mot de passe en temps réel
  useEffect(() => {
    const password = registerForm.watch("password");
    if (password) {
      setPasswordCriteria({
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[^A-Za-z0-9]/.test(password)
      });
    }
  }, [registerForm.watch("password")]);

  const checkEmailAvailability = async (email: string) => {
    if (!email || !email.includes('@')) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email);

      if (error) {
        console.error('Error checking email:', error);
        return;
      }

      setIsEmailAvailable(data.length === 0); // Check if the array is empty

    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const checkPseudoAvailability = async (pseudo: string) => {
    if (!pseudo || pseudo.length < 3) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('pseudo')
        .eq('pseudo', pseudo);

      if (error) {
        console.error('Error checking pseudo:', error);
        return;
      }

      setIsPseudoAvailable(data.length === 0); // Check if the array is empty

    } catch (error) {
      console.error('Error checking pseudo:', error);
    }
  };

  const onLogin = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setLoadingMessage("Connexion en cours...");
    setLoadingSubMessage("Vérification de vos identifiants");
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      // Si l'utilisateur a choisi de rester connecté, on définit la session comme persistante
      if (data.stayLoggedIn) {
        await supabase.auth.updateSession({
          refresh_token: authData.session?.refresh_token,
          expires_in: 60 * 60 * 24 * 30 // 30 jours
        });
      }

      setLoadingSubMessage("Redirection vers votre tableau de bord");
      
      setTimeout(() => {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur La Camé House !",
        });
        
        router.push('/dashboard');
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
      });
    }
  };

const onRegister = async (data: z.infer<typeof registerSchema>) => {
  setRegistrationStep('loading');
  setLoadingMessage("Chargement en cours...");
  setLoadingSubMessage("Vérification de l'email...");
  
  try {
    // Vérifier d'abord si l'email existe déjà
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', data.email)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    // Si l'email existe déjà
    if (existingUsers) {
      setRegistrationStep('email');
      toast({
        variant: "destructive",
        title: "Email déjà utilisé",
        description: "Cet email est déjà associé à un compte. Veuillez vous connecter ou utiliser un autre email.",
      });
      return;
    }
    
    setLoadingSubMessage("Création du compte...");
    
    // Continuez avec l'inscription
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          pseudo: data.pseudo,
          accepted_terms: data.accepted_terms,
          accepted_legal: data.accepted_legal,
          accepted_date: new Date().toISOString(),
        },
        emailRedirectTo: `${window.location.origin}/auth/confirm?email=${encodeURIComponent(data.email)}`
      }
    });

    if (error) throw error;
    
    // Stocker l'email pour la page de confirmation
    localStorage.setItem('confirmationEmail', data.email);

    // Utiliser la fonction RPC pour créer l'utilisateur
    if (authData.user) {
      try {
        const { error: rpcError } = await supabase.rpc('create_new_user', {
          user_id: authData.user.id,
          user_email: data.email,
          user_first_name: data.first_name,
          user_pseudo: data.pseudo,
          user_accepted_terms: data.accepted_terms,
          user_accepted_legal: data.accepted_legal,
          user_accepted_date: new Date().toISOString()
        });

        if (rpcError) {
          // Si l'erreur est liée à un email en doublon, gérer spécifiquement
          if (rpcError.code === '23505' && rpcError.message.includes('email_key')) {
            console.log('Email déjà utilisé dans la base de données');
            // L'utilisateur a été créé dans auth mais pas dans la table users
            // On peut soit supprimer l'utilisateur auth ou ignorer l'erreur 
            // car l'utilisateur devra quand même confirmer son email
          } else {
            throw rpcError;
          }
        }
      } catch (rpcError: any) {
        console.error('Erreur RPC:', rpcError);
        // Ne pas interrompre le flux d'inscription si l'erreur est liée à un doublon d'email
        if (!(rpcError.code === '23505' && rpcError.message.includes('email_key'))) {
          throw rpcError;
        }
      }
    }

    setTimeout(() => {
      setLoadingSubMessage("Vous allez être redirigé vers la page de confirmation.");
      
      setTimeout(() => {
        toast({
          title: "Inscription réussie",
          description: "Un email de confirmation vous a été envoyé",
        });
        
        router.push(`/auth/confirm?email=${encodeURIComponent(data.email)}`);
      }, 2000);
    }, 3000);
    
  } catch (error: any) {
    console.error('Erreur d\'inscription:', error);
    setIsLoading(false);
    setRegistrationStep('password');
    toast({
      variant: "destructive",
      title: "Erreur d'inscription",
      description: error.message || "Une erreur est survenue lors de l'inscription",
    });
  }
};

  const renderPasswordCriteria = () => {
    return (
      <div className="space-y-2 w-full max-w-sm mx-auto mt-2 text-sm">
        <div className="flex items-center">
          {passwordCriteria.minLength ? <Check size={16} className="text-green-500 mr-2" /> : <X size={16} className="text-red-500 mr-2" />}
          <span className={passwordCriteria.minLength ? "text-green-500" : "text-red-500"}>Au moins 8 caractères</span>
        </div>
        <div className="flex items-center">
          {passwordCriteria.hasUppercase ? <Check size={16} className="text-green-500 mr-2" /> : <X size={16} className="text-red-500 mr-2" />}
          <span className={passwordCriteria.hasUppercase ? "text-green-500" : "text-red-500"}>Au moins une majuscule</span>
        </div>
        <div className="flex items-center">
          {passwordCriteria.hasLowercase ? <Check size={16} className="text-green-500 mr-2" /> : <X size={16} className="text-red-500 mr-2" />}
          <span className={passwordCriteria.hasLowercase ? "text-green-500" : "text-red-500"}>Au moins une minuscule</span>
        </div>
        <div className="flex items-center">
          {passwordCriteria.hasNumber ? <Check size={16} className="text-green-500 mr-2" /> : <X size={16} className="text-red-500 mr-2" />}
          <span className={passwordCriteria.hasNumber ? "text-green-500" : "text-red-500"}>Au moins un chiffre</span>
        </div>
        <div className="flex items-center">
          {passwordCriteria.hasSpecial ? <Check size={16} className="text-green-500 mr-2" /> : <X size={16} className="text-red-500 mr-2" />}
          <span className={passwordCriteria.hasSpecial ? "text-green-500" : "text-red-500"}>Au moins un caractère spécial</span>
        </div>
      </div>
    );
  };

  const renderLoadingAnimation = () => {
    return (
      <div className="flex flex-col items-center justify-center space-y-6">
        <h2 className="text-xl font-heading text-[#FFF5EB] text-center">{loadingMessage}</h2>
        
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D4A676]"></div>
        
        <p className="text-sm font-jura text-foreground/80 text-center mt-4">
          {loadingSubMessage}
        </p>
      </div>
    );
  };

  const renderRegistrationStep = () => {
    switch (registrationStep) {
      case 'loading':
        return renderLoadingAnimation();
        
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <p className="text-foreground/80">
              Nous sommes ravis de vous accompagner dans votre démarche de changement.
              Commençons par créer votre compte en quelques étapes simples.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setRegistrationStep('legal')}
                className="btn-cta"
              >
                <span>Commencer</span>
                <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm font-jura text-[#FFF5EB]">
                Déjà un compte ? <span className="underline text-[#D4A676] cursor-pointer hover:text-[#D4A676]/80" onClick={() => setAuthMode('login')}>Se connecter</span>
              </p>
            </div>
          </div>
        );
      case 'legal':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-heading text-[#FFF5EB] text-center mb-4">Mentions légales</h3>
            <ScrollArea className="h-[30vh] w-full rounded-md border p-4">
              <div className="text-sm text-foreground/80">
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <p className="text-foreground/80">En vigueur au 01/01/2025</p>
                  </div>

                  <section className="space-y-4">
                    <p className="text-foreground/80">
                      Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en
                      l'économie numérique, il est porté à la connaissance des utilisateurs du site
                      lacamehouse.org, les présentes mentions légales.
                    </p>

                    <p className="text-foreground/80">
                      La connexion et la navigation sur le site par l'utilisateur implique acceptation intégrale et
                      sans réserve des présentes mentions légales. Ces dernières sont accessibles sur le site à la
                      rubrique "Mentions légales".
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-base font-heading mb-2">I. ÉDITION DU SITE</h3>
                    <p className="text-foreground/80">
                      L'édition et la direction de la publication du site est assurée par Monsieur Ludovic THIOLICA,
                      domicilié quelque part en France, dont l'adresse e-mail est dotho.d@lacamehouse.org.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-base font-heading mb-2">II. HÉBERGEUR</h3>
                    <p className="text-foreground/80">
                      L'hébergeur du Site est la société Framer, dont le siège social est situé au Rozengracht,
                      Amsterdam, North Holland NL.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-base font-heading mb-2">III. ACCÈS AU SITE</h3>
                    <p className="text-foreground/80">
                      Le site est normalement accessible, à tout moment pour l'utilisateur.
                    </p>
                    <p className="text-foreground/80">
                      Toutefois, l'éditeur pourra, à tout moment, suspendre, limiter ou interrompre le site afin
                      de procéder, notamment, à des mises à jour ou des modifications de son contenu.
                    </p>
                    <p className="text-foreground/80">
                      L'éditeur ne pourra en aucun cas être tenu responsable des conséquences éventuelles de
                      cette indisponibilité sur les activités de l'utilisateur.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-base font-heading mb-2">IV. COLLECTE DES DONNÉES</h3>
                    <p className="text-foreground/80">
                      Le site assure à l'utilisateur une collecte et un traitement des données personnelles dans le
                      respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à
                      l'informatique, aux fichiers et aux libertés.
                    </p>
                    <p className="text-foreground/80">
                      En vertu de la réglementation applicable en matière de protection des données à caractère
                      personnel, l'utilisateur dispose d'un droit d'accès, de rectification, de suppression et
                      d'opposition de ses données personnelles. L'utilisateur peut exercer ce droit :
                    </p>
                    <ul className="list-disc pl-8 text-foreground/80 space-y-2">
                      <li>depuis son espace personnel ;</li>
                      <li>depuis le formulaire de contact ;</li>
                      <li>par mail à l'adresse email suivante : dotho.d@lacamehouse.org ;</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-base font-heading mb-2">V. INFORMATIONS COMPLÉMENTAIRES</h3>
                    <p className="text-foreground/80">
                      Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou
                      partie du site, sans autorisation expresse de l'éditeur est prohibée et pourra entraîner des
                      actions et poursuites judiciaires telles que prévues par la réglementation en vigueur.
                    </p>
                    <p className="text-foreground/80">
                      Pour plus d'informations sur les conditions d'utilisation du site, se reporter aux CGU du
                      site lacamehouse.org, accessibles depuis la rubrique "CGU".
                    </p>
                    <p className="text-foreground/80">
                      Pour plus d'informations en matière de protection des données à caractère personnel, se
                      reporter à la Charte en matière de protection des données à caractère personnel du site
                      lacamehouse.org, accessible depuis la rubrique "Données personnelles".
                    </p>
                    <p className="text-foreground/80">
                      Pour plus d'informations en matière de cookies, se reporter à la Charte en matière de cookies du
                      site lacamehouse.org, accessible à la rubrique "Cookies"
                    </p>
                  </section>
                </div>
              </div>
            </ScrollArea>
            <div className="flex items-center space-x-2 justify-center">
              <Checkbox
                id="acceptLegal"
                checked={registerForm.watch("accepted_legal")}
                onCheckedChange={(checked) => 
                  registerForm.setValue("accepted_legal", checked as boolean)
                }
              />
              <label htmlFor="acceptLegal" className="text-sm text-foreground/80">
                J'ai pris connaissances des mentions légales et je les accepte.
              </label>
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setRegistrationStep('terms')}
                className={`btn-cta ${!registerForm.watch("accepted_legal") ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!registerForm.watch("accepted_legal")}
              >
                <span>Continuer</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-heading text-[#FFF5EB] text-center mb-4">Conditions d'utilisation</h2>
            <ScrollArea className="h-[30vh] w-full rounded-md border p-4">
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
                  <h3 className="text-base font-heading mb-2">I. ACCÈS AU SITE</h3>
                  <p className="text-foreground/80">
                    Notre site lacamehouse.org permet aux utilisateurs d'expérimenter le soin en santé
                    mentale, à tout moment et depuis n'importe où dans le monde, via un site web / une application
                    mobile qui propose différents services, notamment :
                  </p>
                  <ul className="list-disc pl-8 text-foreground/80 space-y-2">
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
                  <h3 className="text-base font-heading mb-2">II. COLLECTE DE DONNÉES</h3>
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
                  <ul className="list-disc pl-8 text-foreground/80 space-y-2">
                    <li>via son espace personnel</li>
                    <li>via un formulaire de contact</li>
                    <li>par mail à l'adresse email dotho.d@lacamehouse.org</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-base font-heading mb-2">III. PROPRIÉTÉ INTELLECTUELLE</h3>
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
                  <h3 className="text-base font-heading mb-2">IV. RESPONSABILITÉ</h3>
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
                  <h3 className="text-base font-heading mb-2">V. LIENS HYPERTEXTES</h3>
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
                  <h3 className="text-base font-heading mb-2">VI. COOKIES</h3>
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
                  <h3 className="text-base font-heading mb-2">VII. PUBLICATIONS PAR L'UTILISATEUR</h3>
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
                  <h3 className="text-base font-heading mb-2">VIII. DROIT APPLICABLE ET JURIDICTION COMPÉTENTE</h3>
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
            <div className="flex items-center space-x-2 justify-center">
              <Checkbox
                id="acceptTerms"
                checked={registerForm.watch("accepted_terms")}
                onCheckedChange={(checked) => 
                  registerForm.setValue("accepted_terms", checked as boolean)
                }
              />
              <label htmlFor="acceptTerms" className="text-sm text-foreground/80">
                J'ai pris connaissance des conditions d'utilisation et je les accepte.
              </label>
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setRegistrationStep('firstName')}
                className={`btn-cta ${!registerForm.watch("accepted_terms") ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!registerForm.watch("accepted_terms")}
              >
                <span>Continuer</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        );
      case 'firstName':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-heading text-[#FFF5EB] text-center mb-4">Quel est votre prénom ?</h2>
            <div className="space-y-2 flex flex-col items-center">
              <Input
                type="text"
                placeholder="Votre prénom"
                className="w-1/2 max-w-sm bg-[rgba(187,187,187,0.15)] border-[#999999] text-[#999999] rounded-xl"
                {...registerForm.register("first_name")}
              />
              {registerForm.formState.errors.first_name && (
                <p className="text-red-500 text-sm">{registerForm.formState.errors.first_name.message}</p>
              )}
              <p className="text-sm font-jura text-foreground/80 text-center mt-2 max-w-sm">
                Votre prénom ne sera pas visible par les autres utilisateurs et sera utilisé uniquement dans le cadre de nos échanges (email, SMS)
              </p>
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setRegistrationStep('pseudo')}
                className={`btn-cta ${!registerForm.watch("first_name") ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!registerForm.watch("first_name")}
              >
                <span>Continuer</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        );
      case 'pseudo':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-heading text-[#FFF5EB] text-center mb-4">Choisissez un pseudo</h2>
            <div className="space-y-2 flex flex-col items-center">
              <Input
                type="text"
                placeholder="Votre pseudo"
                className="w-1/2 max-w-sm bg-[rgba(187,187,187,0.15)] border-[#999999] text-[#999999] rounded-xl"
                {...registerForm.register("pseudo")}
                onChange={(e) => {
                  registerForm.register("pseudo").onChange(e);
                  checkPseudoAvailability(e.target.value);
                }}
              />
              {registerForm.formState.errors.pseudo && (
                <p className="text-red-500 text-sm">{registerForm.formState.errors.pseudo.message}</p>
              )}
              {isPseudoAvailable !== null && (
                <p className={isPseudoAvailable ? "text-green-500" : "text-red-500"} style={{ fontSize: "0.875rem" }}>
                  {isPseudoAvailable 
                    ? "Ce pseudo est disponible" 
                    : "Ce pseudo est déjà utilisé"}
                </p>
              )}
              <p className="text-sm font-jura text-foreground/80 text-center mt-2 max-w-sm">
                Votre pseudo sera visible par les autres utilisateurs. Il est unique et vous distingue des autres utilisateurs. S'il ne vous plait plus, vous pourrez le modifier.
              </p>
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setRegistrationStep('email')}
                className={`btn-cta ${!registerForm.watch("pseudo") || isPseudoAvailable !== true ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!registerForm.watch("pseudo") || isPseudoAvailable !== true}
              >
                <span>Continuer</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        );
        
        case 'email':
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-heading text-[#FFF5EB] text-center mb-4">Quelle est votre adresse email ?</h2>
              <div className="space-y-2 flex flex-col items-center">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="w-1/2 max-w-sm bg-[rgba(187,187,187,0.15)] border-[#999999] text-[#999999] rounded-xl"
                  {...registerForm.register("email")}
                  onChange={(e) => {
                    registerForm.register("email").onChange(e);
                    checkEmailAvailability(e.target.value);
                  }}
                />
                {registerForm.formState.errors.email && (
                  <p className="text-red-500 text-sm">{registerForm.formState.errors.email.message}</p>
                )}
                {isEmailAvailable !== null && (
                  <p className={isEmailAvailable ? "text-green-500" : "text-red-500"} style={{ fontSize: "0.875rem" }}>
                    {isEmailAvailable 
                      ? "Cette adresse email est disponible" 
                      : "Cette adresse email existe déjà dans notre base de données"}
                  </p>
                )}
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => setRegistrationStep('password')}
                  className={`btn-cta ${!registerForm.watch("email") || isEmailAvailable !== true ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!registerForm.watch("email") || isEmailAvailable !== true}
                >
                  <span>Continuer</span>
                  <ArrowRight size={20} />
                </button>
              </div>
              
              {/* Ajoutez une séparation */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-500"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0E232E] text-[#FFF5EB]">ou</span>
                </div>
              </div>
              
              {/* Bouton Google avec toutes les données d'inscription */}
              <GoogleSignInButton 
                mode="signup" 
                registration_data={{
                  accepted_legal: registerForm.watch("accepted_legal"),
                  accepted_terms: registerForm.watch("accepted_terms"),
                  first_name: registerForm.watch("first_name"),
                  pseudo: registerForm.watch("pseudo")
                }}
              />
              
              <p className="text-sm font-jura text-foreground/80 text-center mt-2">
                En vous inscrivant avec Google, vous utilisez les informations que vous avez saisies précédemment.
              </p>
            </div>
          );
      case 'password':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-heading text-[#FFF5EB] text-center mb-4">Choisissez un mot de passe sécurisé</h2>
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-1/2 relative mx-auto">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  className="w-full bg-[rgba(187,187,187,0.15)] border-[#999999] text-[#999999] rounded-xl pr-10"
                  {...registerForm.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="w-1/2 relative mx-auto mt-4">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  className="w-full bg-[rgba(187,187,187,0.15)] border-[#999999] text-[#999999] rounded-xl pr-10"
                  {...registerForm.register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999]"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm">{registerForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            {renderPasswordCriteria()}
            
            <div className="flex justify-center">
              <button 
                onClick={registerForm.handleSubmit(onRegister)}
                className={`btn-cta ${!registerForm.watch("password") || !registerForm.watch("confirmPassword") || 
                  !passwordCriteria.minLength || !passwordCriteria.hasUppercase || !passwordCriteria.hasLowercase || 
                  !passwordCriteria.hasNumber || !passwordCriteria.hasSpecial ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!registerForm.watch("password") || !registerForm.watch("confirmPassword") || 
                  !passwordCriteria.minLength || !passwordCriteria.hasUppercase || !passwordCriteria.hasLowercase || 
                  !passwordCriteria.hasNumber || !passwordCriteria.hasSpecial}
              >
                <span>S'inscrire</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAuthContent = () => {
    if (isLoading) {
      return renderLoadingAnimation();
    }
    
    if (authMode === 'login') {
      return (
        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
          <div className="space-y-2 flex flex-col items-center">
            <div className="w-1/2 mx-auto">
              <Input
                type="email"
                placeholder="Email"
                className="w-full bg-[rgba(187,187,187,0.15)] border-[#999999] text-[#999999] rounded-xl"
                {...loginForm.register("email")}
              />
            </div>
            {loginForm.formState.errors.email && (
              <p className="text-red-500 text-sm">{loginForm.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2 flex flex-col items-center">
            <div className="w-1/2 relative mx-auto">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                className="w-full bg-[rgba(187,187,187,0.15)] border-[#999999] text-[#999999] rounded-xl pr-10"
                {...loginForm.register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {loginForm.formState.errors.password && (
              <p className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-center items-center">
            <Checkbox
              id="stayLoggedIn"
              className="mr-2"
              checked={loginForm.watch("stayLoggedIn")}
              onCheckedChange={(checked) => 
                loginForm.setValue("stayLoggedIn", checked as boolean)
              }
            />
            <label htmlFor="stayLoggedIn" className="text-[#FFF5EB] text-sm">
              Rester connecté(e)
            </label>
          </div>

          <div className="flex justify-center">
            <button 
              type="submit" 
              className="btn-cta"
            >
              <span>Se connecter</span>
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Ajoutez une séparation */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-500"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0E232E] text-[#FFF5EB]">ou</span>
            </div>
          </div>
          
          {/* Bouton Google */}
          <GoogleSignInButton mode="signin" />
          
          <div className="text-center mt-4">
            <p className="text-sm font-jura text-[#FFF5EB]">
              Pas encore de compte ? <span className="underline text-[#D4A676] cursor-pointer hover:text-[#D4A676]/80" onClick={() => {setAuthMode('register'); setRegistrationStep('welcome');}}>S'inscrire</span>
            </p>
          </div>
        </form>
      );
    } else {
      return renderRegistrationStep();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0E232E] via-[#0E232E] to-[#134e5c]">
      <Navbar />
      
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-16 h-auto max-h-[75vh] my-8 mt-[17.5vh]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="bg-[rgba(15,0,0,0.26)] rounded-[25px] border-2 border-white/50 p-8">
            <div className="flex items-baseline justify-center mb-6 whitespace-nowrap">
              {authMode === 'login' || registrationStep === 'welcome' ? (
                <>
                  <span className="font-heading text-2xl text-[#FFF5EB] -rotate-3">Bienvenue à&nbsp;</span>
                  <span className="font-logo text-5xl text-[#FFF5EB] rotate-3 translate-y-1">La Camé House</span>
                </>
              ) : (
                <>
                  <span className="font-heading text-2xl text-[#FFF5EB] -rotate-3">Inscription à&nbsp;</span>
                  <span className="font-logo text-5xl text-[#FFF5EB] rotate-3 translate-y-1">La Camé House</span>
                </>
              )}
            </div>

            {renderAuthContent()}
          </div>
        </motion.div>
      </div>
    </main>
  );
}