"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, X, ShieldCheck, CheckCircle2, KeyRound } from "lucide-react";
import { LandingPageBackdrop } from "@/components/layout/LandingPageBackdrop";
import { supabase, isSupabaseConfigured } from "@/utils/supabaseClient";
import { loginUser } from "@/utils/authStore";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Forgot Password States
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      email,
      firstName: "Organisateur",
      lastName: "Ubbi",
      role: "organizer",
    });

    const searchParams = new URLSearchParams(window.location.search);
    const redirectUrl = searchParams.get("redirect") || "/dashboard/organizer";
    router.push(redirectUrl);
  };

  const handleSendPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSendingReset(true);
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/login?reset=true`,
        });
      } catch (err) {
        console.error("Password reset email error", err);
      }
    }

    setIsSendingReset(false);
    setResetEmailSent(true);
  };

  return (
    <div className="relative min-h-screen text-[#111326] antialiased overflow-hidden">
      {/* 1. Landing Page Floue en Arrière-plan */}
      <LandingPageBackdrop />

      {/* 2. Superposition Sombre avec Flou Glassmorphism */}
      <div className="fixed inset-0 z-50 bg-[#0a0331]/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* 3. Fenêtre Modal Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/60 max-w-md w-full relative z-50 animate-in fade-in zoom-in-95 duration-200 my-auto">
          
          {/* Bouton de Fermeture X */}
          <Link
            href="/"
            className="absolute top-5 right-5 p-2 rounded-full text-[#666A80] hover:text-[#111326] hover:bg-[#F7F7FA] transition-colors"
            title="Fermer et retourner à l'accueil"
          >
            <X className="w-5 h-5" />
          </Link>

          {/* MODE RÉINITIALISATION DE MOT DE PASSE OUBLIÉ */}
          {isForgotPasswordMode ? (
            <div className="space-y-4">
              <div className="text-center mb-4 pr-6 pl-2">
                <div className="w-14 h-14 bg-[#E5F6FF] text-[#009FEF] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner border border-[#009FEF]/20">
                  <KeyRound className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-extrabold text-[#111326]">Réinitialisation de Mot de Passe</h2>
                <p className="mt-1 text-xs text-[#666A80]">
                  Saisissez l'adresse email de votre compte. Nous vous enverrons un lien sécurisé pour choisir un nouveau mot de passe.
                </p>
              </div>

              {resetEmailSent ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2 my-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h3 className="font-extrabold text-sm text-emerald-900">Email de réinitialisation envoyé ! 📩</h3>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Un lien sécurisé a été envoyé à <strong>{email}</strong>. Ouvrez votre boîte mail et cliquez sur le lien pour créer votre nouveau mot de passe.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPasswordMode(false);
                      setResetEmailSent(false);
                    }}
                    className="text-xs text-[#2A1464] font-extrabold hover:underline block mx-auto pt-2"
                  >
                    ← Retourner à la connexion
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendPasswordReset} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1">
                      Votre Adresse Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#666A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemple@domaine.sn"
                        className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium transition-colors outline-none"
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingReset}
                    className="w-full bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>{isSendingReset ? "Envoi du lien..." : "Envoyer le lien de réinitialisation 🔒"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordMode(false)}
                    className="text-xs text-[#666A80] hover:text-[#111326] font-semibold block mx-auto pt-1"
                  >
                    ← Annuler et revenir à la connexion
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* MODE CONNEXION CLASSIQUE AVEC MOT DE PASSE */
            <>
              <div className="text-center mb-5 pr-6 pl-2">
                <h2 className="text-2xl font-extrabold text-[#111326]">Connexion</h2>
                <p className="mt-1 text-xs text-[#666A80]">
                  Connectez-vous pour accéder à votre espace Ubbi.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#666A80] mb-1">
                    Adresse Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#666A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemple@domaine.sn"
                      className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium transition-colors outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#666A80]">
                      Mot de passe *
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordMode(true)}
                      className="text-[11px] font-bold text-[#009FEF] hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#666A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium transition-colors outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2A1464] hover:bg-[#1F0D4F] text-white font-extrabold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all mt-2"
                >
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4 text-[#009FEF]" />
                </button>
              </form>
            </>
          )}

          <div className="mt-6 pt-4 border-t border-[#E2E4ED] text-center text-xs text-[#666A80]">
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-bold text-[#009FEF] hover:underline">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
