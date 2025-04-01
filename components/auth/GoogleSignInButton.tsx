"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleIcon from '@/assets/icones/google.svg';
import { useToast } from "@/hooks/use-toast";

type Props = {
  mode: "signin" | "signup";
  registration_data?: {
    accepted_legal: boolean;
    accepted_terms: boolean;
    first_name: string;
    pseudo: string;
  };
};

export function GoogleSignInButton({ mode, registration_data }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      // Store registration data if in signup mode
      if (mode === "signup" && registration_data) {
        localStorage.setItem("registration_data", JSON.stringify(registration_data));
      }
  
      console.log("Attempting Google sign in...");
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
  
      // Si nous arrivons ici sans redirection, c'est un problème
      console.log("OAuth response:", data, error);
      
      if (error) throw error;
      
      // Normalement, on ne devrait jamais atteindre ce point car la
      // redirection aura déjà eu lieu
      console.log("Sign in successful but no redirect happened:", data);
      
    } catch (error: any) {
      console.error("Erreur de connexion avec Google:", error);
      
      let errorMessage = "Une erreur est survenue lors de la connexion avec Google";
      
      if (error.message?.includes("popup_closed_by_user")) {
        errorMessage = "La fenêtre de connexion a été fermée. Veuillez réessayer.";
      } else if (error.message?.includes("popup_blocked")) {
        errorMessage = "Le popup a été bloqué par votre navigateur. Veuillez autoriser les popups pour ce site.";
      } else if (error.message?.includes("unauthorized_client")) {
        errorMessage = "Configuration OAuth incorrecte. Veuillez contacter le support.";
      }
      
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
      });
      
      setIsLoading(false);
    }
  };

  const isSignupReady = mode !== "signup" || 
                       (registration_data && 
                        registration_data.accepted_legal && 
                        registration_data.accepted_terms && 
                        registration_data.first_name && 
                        registration_data.first_name.length >= 2 &&
                        registration_data.pseudo && 
                        registration_data.pseudo.length >= 3);

  return (
    <div className="flex justify-center mt-1 mb-1">
      <button 
        type="button"
        onClick={signInWithGoogle}
        disabled={isLoading || !isSignupReady}
        className="group flex items-center justify-center space-x-0 bg-transparent transition-all duration-300 ease-in-out rounded-md py-1 px-0 mx-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-b-2 border-[#D4A676]"></div>
        ) : (
          <>
            <span className="font-jura max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:mr-1 transition-all duration-300 ease-in-out text-[#D4A676]">
              {mode === "signin" ? "Se connecter avec" : "S'inscrire avec"}
            </span>
            <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 ease-in-out group-hover:scale-105">
              <GoogleIcon style={{ width: '100%', height: '100%' }} />
            </div>
          </>
        )}
      </button>
    </div>
  );
}