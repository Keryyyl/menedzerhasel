"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { AUTH } from "../lib/auth";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (login === AUTH.login && password === AUTH.password) {
      sessionStorage.setItem("authenticated", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="p-3 bg-slate-800 rounded-xl">
            <Lock className="text-white" size={24} />
          </div>
        </div>

        <h1 className="text-2xl font-light text-slate-800 text-center mb-8 tracking-tight">
          Password Manager
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button onClick={handleLogin} className="btn-primary">
            Sign In
          </button>
        </div>

        <p className="text-slate-500 text-xs text-center mt-6">
          Default credentials: {AUTH.login} / {AUTH.password}
        </p>
      </div>
    </div>
  );
}
