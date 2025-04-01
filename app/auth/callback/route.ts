import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    
    if (!code) {
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent("Code d'authentification manquant")}`, requestUrl.origin)
      );
    }

    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Erreur lors de l'échange du code:", error);
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent(error.message || "Échec de l'authentification")}`, requestUrl.origin)
      );
    }

    // Redirection vers le dashboard après une authentification réussie
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
  } catch (error: any) {
    console.error("Erreur dans le callback d'authentification:", error);
    
    return NextResponse.redirect(
      new URL(`/auth?error=${encodeURIComponent(error.message || "Une erreur est survenue")}`, new URL(request.url).origin)
    );
  }
}