"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, KeyRound } from "lucide-react";
import { AUTH } from "../lib/auth";
import ThemeToggle from "./components/ThemeToggle";
import BackgroundGlow from "./components/BackgroundGlow";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isMounting, setIsMounting] = useState(true);
  const router = useRouter();

  // Wymuszenie Dark Mode na start
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme || theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsMounting(false);
  }, []);

  const handleLogin = () => {
    if (login === AUTH.login && password === AUTH.password) {
      sessionStorage.setItem("authenticated", "true");
      router.push("/dashboard");
    } else {
      setError("ACCESS DENIED");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  if (isMounting) return <div className="min-h-screen bg-[#030712]" />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      {/* Animowane sfery w tle */}
      <BackgroundGlow />
      
      {/* Przycisk zmiany motywu, gdybyś jednak chciał oślepnąć ;) */}
      <ThemeToggle />

      <div className="max-w-md w-full relative z-10 animate-in">
        {/* Dekoracyjny element nad kartą */}
        <div className="flex justify-center mb-[-20px] relative z-20">
          <div className="p-4 bg-indigo-600 shadow-[0_0_30px_rgba(79,70,229,0.5)] rounded-sm group hover:rotate-[360deg] transition-transform duration-700">
            <Lock className="text-white" size={28} />
          </div>
        </div>

        <div className="glass-card p-10 pt-14 border-t-2 border-t-indigo-500/50">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-[0.2em] dark:text-white uppercase mb-2">
              Terminal
            </h1>
            <div className="h-1 w-12 bg-indigo-600 mx-auto" />
            <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-4">
              Secure Auth Protocol v4.2
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Identity</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="text"
                  placeholder="USERNAME"
                  className="input-field pl-10 border-slate-200 dark:border-slate-800 focus:border-indigo-500 !bg-transparent"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Access Key</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="input-field pl-10 border-slate-200 dark:border-slate-800 focus:border-indigo-500 !bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 py-2 rounded-sm animate-pulse">
                <p className="text-red-500 text-[10px] font-black text-center tracking-[0.3em] uppercase">{error}</p>
              </div>
            )}

            <button 
              onClick={handleLogin} 
              className="btn-primary w-full shadow-lg shadow-indigo-500/20 group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                Initialize Login
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
            <div className="flex justify-between items-center text-[9px] font-medium text-slate-500 tracking-tighter uppercase">
              <span>Status: <span className="text-indigo-500 animate-pulse">Encrypted</span></span>
              <span>Hint: {AUTH.login} / {AUTH.password}</span>
            </div>
          </div>
        </div>
        
        {/* Dolne dekoracje */}
        <div className="mt-4 flex justify-between px-2">
          <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800" />
          <div className="w-2 h-1 bg-indigo-500" />
          <div className="w-2 h-1 bg-indigo-500" />
          <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
