"use client";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Plus, Trash2, Copy, Search, LogOut, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";
import BackgroundGlow from "../components/BackgroundGlow";

// Definicja typu dla hasła
interface PasswordItem {
  id: number;
  service: string;
  login: string;
  password: string;
}

export default function Dashboard() {
  // Określamy typ dla tablicy danych
  const [data, setData] = useState<PasswordItem[]>([]);
  const [search, setSearch] = useState<string>("");
  const [visible, setVisible] = useState<number | null>(null);
  const [toast, setToast] = useState<string>("");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/passwords");
      if (res.ok) {
        const json: PasswordItem[] = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error("Failed to fetch passwords", error);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      router.push("/");
    } else {
      fetchData();
    }
  }, [router]);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setToast("Copied!");
    setTimeout(() => setToast(""), 2000);
  };

  const remove = async (id: number) => {
    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const filtered = data.filter((i) =>
    i.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-16 relative">
      <BackgroundGlow />
      <ThemeToggle />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 animate-in">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-sm shadow-lg shadow-indigo-500/30">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase dark:text-white">Vault</h1>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                className="input-field pl-10" 
                placeholder="Wyszukaj po nazwie" 
                value={search} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} 
              />
            </div>
            <button onClick={() => router.push("/add")} className="btn-primary">
              <Plus size={20} /> DODAJ
            </button>
            <button 
              onClick={() => { sessionStorage.removeItem("authenticated"); router.push("/"); }} 
              className="btn-primary bg-slate-200 !text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:!text-slate-300 border-none"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {filtered.length === 0 ? (
          <div className="text-center py-20 animate-in">
            <p className="text-slate-400 dark:text-slate-500 uppercase tracking-widest text-xs">No items found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <div 
                key={item.id} 
                className="glass-card p-6 animate-in group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Entry</p>
                    <h3 className="font-bold text-lg tracking-tight dark:text-white">{item.service}</h3>
                  </div>
                  <button 
                    onClick={() => remove(item.id)} 
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white/40 dark:bg-black/20 px-3 py-2 border border-transparent hover:border-indigo-500/20 transition-all">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mr-2">{item.login}</span>
                    <button onClick={() => copy(item.login)} className="text-slate-300 hover:text-indigo-600">
                      <Copy size={14}/>
                    </button>
                  </div>
                  <div className="flex justify-between items-center bg-white/40 dark:bg-black/20 px-3 py-2 border border-transparent hover:border-indigo-500/20 transition-all">
                    <span className="text-xs font-mono tracking-widest dark:text-slate-200">
                      {visible === item.id ? item.password : "••••••••"}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => setVisible(visible === item.id ? null : item.id)} className="text-slate-300 hover:text-indigo-600">
                        {visible === item.id ? <EyeOff size={14}/> : <Eye size={14}/>}
                      </button>
                      <button onClick={() => copy(item.password)} className="text-slate-300 hover:text-indigo-600">
                        <Copy size={14}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 rounded-sm shadow-2xl z-50 animate-in">
          {toast}
        </div>
      )}
    </div>
  );
}
