"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  // Récupérer le paramètre 'next' s'il existe
  const next = searchParams.get("next") || "/dashboard";

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Vérifier si une session existe déjà
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Erreur lors de la récupération de la session:", error);
          throw error;
        }

        if (!data?.session) {
          router.push("/auth");
          return;
        }

        // Vérifier si l'utilisateur existe déjà dans la table users
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Erreur lors de la récupération de l'utilisateur:", userError);
          throw userError;
        }

        if (userData.user) {
          const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("id", userData.user.id)
            .single();

          // Ignorer l'erreur si c'est juste qu'aucune ligne n'a été trouvée
          if (fetchError && fetchError.code !== "PGRST116") {
            console.error("Erreur lors de la vérification de l'utilisateur:", fetchError);
          }

          // Si l'utilisateur n'existe pas encore dans la table users, l'ajouter
          if (!existingUser) {
            // Récupérer les données d'inscription du localStorage
            const registration_data_str = localStorage.getItem("registration_data");
            const registration_data = registration_data_str ? JSON.parse(registration_data_str) : null;
            
            // Si l'utilisateur s'est inscrit via le formulaire (et non pas juste connecté)
            if (registration_data) {
              const { error: rpcError } = await supabase.rpc("create_new_user", {
                user_id: userData.user.id,
                user_email: userData.user.email || "",
                user_first_name: registration_data.first_name,
                user_pseudo: registration_data.pseudo,
                user_accepted_terms: registration_data.accepted_terms,
                user_accepted_legal: registration_data.accepted_legal,
                user_accepted_date: new Date().toISOString()
              });

              if (rpcError) {
                console.error("Erreur lors de la création de l'utilisateur:", rpcError);
                throw rpcError;
              }
            } else {
              // Si l'utilisateur s'est connecté directement avec Google
              const google_name = userData.user.user_metadata?.full_name || 
                               userData.user.user_metadata?.name || 
                               "Utilisateur";
              
              const base_pseudo = google_name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
              const random_suffix = Math.floor(Math.random() * 10000);
              const pseudo = `${base_pseudo}${random_suffix}`;
              
              const { error: rpcError } = await supabase.rpc("create_new_user", {
                user_id: userData.user.id,
                user_email: userData.user.email || "",
                user_first_name: google_name,
                user_pseudo: pseudo,
                user_accepted_terms: true,
                user_accepted_legal: true,
                user_accepted_date: new Date().toISOString()
              });

              if (rpcError) {
                console.error("Erreur lors de la création de l'utilisateur:", rpcError);
                throw rpcError;
              }
            }
            
            // Nettoyer localStorage
            localStorage.removeItem("registration_data");
          }

          // Rediriger vers le tableau de bord
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur La Camé House !",
          });
          
          router.push(next);
        }
      } catch (error: any) {
        console.error("Erreur durant le callback d'authentification:", error);
        toast({
          variant: "destructive",
          title: "Erreur d'authentification",
          description: error.message || "Une erreur est survenue lors de l'authentification",
        });
        router.push("/auth");
      }
    };

    handleAuthCallback();
  }, [router, toast, next]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-heading text-[#FFF5EB]">Authentification en cours</h2>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D4A676] mx-auto mt-6"></div>
        <p className="text-sm font-jura text-foreground/80 mt-4">
          Veuillez patienter pendant que nous vous connectons...
        </p>
      </div>
    </div>
  );
}