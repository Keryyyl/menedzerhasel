"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import BackgroundGlow from "../components/BackgroundGlow";


export default function Add() {
  const [service, setService] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("authenticated");
    if (!isAuth) router.push("/");
  }, [router]);

  const handleAdd = async () => {
    if (!service || !login || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, login, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Error saving password");
      }
    } catch (error) {
      console.error("Failed to add password:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 transition-colors duration-300 relative">
      <BackgroundGlow /> {/* Dodaj to tutaj */}
      <ThemeToggle />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Vault</span>
        </button>

        <div className="glass-card rounded-2xl p-8 border">
          <h1 className="text-2xl font-light text-slate-800 dark:text-white mb-6 tracking-tight">
            Dodaj nowe hasło
          </h1>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Serwis
              </label>
              <input
                type="text"
                placeholder="e.g., GitHub, Gmail, Netflix"
                className="input-field"
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Login / Email
              </label>
              <input
                type="text"
                placeholder="your.email@example.com"
                className="input-field"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Hasło
              </label>
              <input
                type="password"
                placeholder="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleAdd}
              className="btn-primary flex items-center justify-center gap-2 mt-8 shadow-lg"
            >
              <Save size={18} />
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
