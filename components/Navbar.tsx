"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme(); // ✅ FIXED
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false); // ✅ IMPORTANT

  useEffect(() => {
    setMounted(true);

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    // 🔥 THIS FIXES YOUR ISSUE
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ✅ don't render until mounted
  if (!mounted) return null;

  return (
    <div className="w-full h-16 bg-[var(--background)] text-[var(--foreground)] border-b border-[var(--border)] flex items-center justify-between px-6">
      <Link href="/" className="flex items-center gap-2 group">
        {/* <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
          🔥
        </div> */}

        {/* <span className="font-simbiot text-lg  group-hover:opacity-80 transition">
          Dashupp
        </span> */}
        <span className="font-achiko text-3xl font-extrabold   group-hover:opacity-80 transition">
          DASHUPP
        </span>
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <p className="text-sm text-gray-400 hidden md:block">
              {user.email}
            </p>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] text-sm"
          >
            Login
          </button>
        )}

        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)]"
        >
          {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </div>
  );
}
