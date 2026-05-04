"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your credentials.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please enter both an email and a password.");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) alert(error.message);
    else alert("Account created!");
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-6 py-12">
      {/* Branding / Hero Section */}
      {/* <Hero
        subtitle="Login"
        description="Login to track, analyze and optimize your Facebook and Google Ads in one clean dashboard."
      /> */}
      <Hero
        subtitle={mode === "login" ? "Login" : "Create Account"}
        description={
          mode === "login"
            ? "Login to track, analyze and optimize your Meta and Google Ads in one clean dashboard."
            : "Join Dashupp to track, analyze and optimize your Meta and Google Ads in one clean dashboard."
        }
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 p-8 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] w-full max-w-sm space-y-4 shadow-2xl"
      >
        <input
          type="email"
          className="w-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <input
          type="password"
          className="w-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] p-2 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* The Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--foreground)] transition-colors"
          >
            {showPassword ? (
              <EyeOff size={16} strokeWidth={2} />
            ) : (
              <Eye size={16} strokeWidth={2} />
            )}
          </button>
        </div>

        <div className="pt-2 space-y-3">
          {/* <button
            onClick={handleLogin}
            className="w-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 p-3 rounded-lg text-sm font-bold uppercase tracking-tight transition-all"
          >
            Login
          </button> */}
          <button
            onClick={mode === "login" ? handleLogin : handleSignup}
            className="w-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 p-3 rounded-lg text-sm font-bold uppercase tracking-tight transition-all"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[var(--border)]"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--card)] px-2 text-[var(--muted-foreground)]">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] p-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
          >
            Google
          </button>
        </div>

        {/* THE TOGGLE: This is how they switch modes */}
        <p className="text-center text-xs text-gray-400 pt-2">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-[var(--foreground)] font-bold underline hover:text-[var(--accent)] transition-colors"
          >
            {mode === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
