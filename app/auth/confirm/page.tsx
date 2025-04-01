"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import { supabase } from '@/lib/supabase/client';

type ConfirmationStep = 'enter_code' | 'loading' | 'valid_registration';

export default function Confirm() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(['', '', '', '', '', '']);
  const [currentStep, setCurrentStep] = useState<ConfirmationStep>('enter_code');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingSubMessage, setLoadingSubMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();

  // Dans votre composant Confirm
  useEffect(() => {
    // Extract token and email from URL parameters
    const tokenFromParams = searchParams.get('token');
    const emailFromParams = searchParams.get('email');
    
    if (tokenFromParams && tokenFromParams.length === 6) {
      const tokenArray = tokenFromParams.split('');
      setToken(tokenArray);
    }
    
    // Si l'email est présent dans les paramètres, le stocker dans le localStorage
    if (emailFromParams) {
      localStorage.setItem('confirmationEmail', emailFromParams);
    }
  }, [searchParams]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newToken = [...token];
      newToken[index] = value;
      setToken(newToken);
      
      // Auto-focus next input if current input has a value
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !token[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Only proceed if the pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newToken = pastedData.split('');
      setToken(newToken);
      
      // Focus last input after paste
      inputRefs.current[5]?.focus();
    }
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
  
const handleConfirm = async () => {
  // Check if all token inputs are filled
  if (token.some(digit => !digit)) {
    toast({
      variant: "destructive",
      title: "Code incomplet",
      description: "Veuillez saisir tous les chiffres du code de vérification.",
    });
    return;
  }
  
  setCurrentStep('loading');
  setLoadingMessage("Chargement en cours...");
  setLoadingSubMessage("Vérification du compte...");
  
  try {
    // Récupérer l'email à partir des paramètres d'URL ou du localStorage
    const email = searchParams.get('email') || localStorage.getItem('confirmationEmail');
    
    if (!email) {
      throw new Error("Email non trouvé. Veuillez recommencer le processus d'inscription.");
    }
    
    // Combine token digits into a single string
    const tokenString = token.join('');
    
    // Utiliser correctement la méthode verifyOtp en fournissant l'email
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: tokenString,
      type: 'signup'
    });

    if (error) throw error;
    
    // Update user status in your custom users table if needed
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) throw userError;
    
    if (userData.user) {
      // Utiliser une fonction rpc pour mettre à jour l'utilisateur
      const { error: rpcError } = await supabase.rpc('update_user_email_confirmed', {
        user_id: userData.user.id
      });
        
      if (rpcError) throw rpcError;
    }
    
    // Show success state after a delay
    setTimeout(() => {
      setCurrentStep('valid_registration');
      // Supprimer l'email du localStorage si vous l'avez stocké
      localStorage.removeItem('confirmationEmail');
    }, 3000);
    
  } catch (error: any) {
    setCurrentStep('enter_code');
    toast({
      variant: "destructive",
      title: "Erreur de vérification",
      description: error.message || "Une erreur est survenue lors de la vérification du code.",
    });
  }
};

  const renderContent = () => {
    switch (currentStep) {
      case 'loading':
        return renderLoadingAnimation();
        
      case 'valid_registration':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-xl font-heading text-[#FFF5EB]">Inscription validée</h2>
            
            <div className="flex justify-center">
              <Check size={60} className="text-green-500" />
            </div>
            
            <p className="text-sm font-jura text-foreground/80">
              Tu peux maintenant te connecter et commencer ton aventure avec nous... Bienvenue à La Camé House :)
            </p>
            
            <div className="flex justify-center">
              <Button 
                onClick={() => router.push('/auth')}
                className="btn-cta"
              >
                <span>Se connecter</span>
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        );
        
      default: // 'enter_code'
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-heading text-[#FFF5EB] text-center mb-4">Entrez le code reçu par email</h2>
            
            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  maxLength={1}
                  className="w-12 h-14 text-center text-lg bg-[rgba(187,187,187,0.15)] border-[#999999] text-[#999999] rounded-xl"
                  value={token[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                />
              ))}
            </div>
            
            <p className="text-sm font-jura text-foreground/80 text-center">
              Saisissez le code à 6 chiffres envoyé à votre adresse email.
            </p>

            <div className="flex justify-center">
              <Button 
                onClick={handleConfirm}
                className="btn-cta"
              >
                <span>Vérifier le compte</span>
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        );
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
              <span className="font-heading text-2xl text-[#FFF5EB] -rotate-3">Vérification du&nbsp;</span>
              <span className="font-logo text-5xl text-[#FFF5EB] rotate-3 translate-y-1">Compte</span>
            </div>

            {renderContent()}
          </div>
        </motion.div>
      </div>
    </main>
  );
}