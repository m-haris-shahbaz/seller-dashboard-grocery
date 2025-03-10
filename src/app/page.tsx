"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/supabase/auth";
import {
  ArrowRight,
  Lock,
  Mail,
  ShoppingBag,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      await login(formData);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full md:w-[45%] flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-xl border border-slate-200 shadow-lg transition-all hover:shadow-xl">
          <div className="p-8 space-y-3">
            <div className="flex justify-center mb-4 bg-theme/10 w-16 h-16 rounded-full mx-auto items-center">
              <ShoppingBag size={32} className="text-theme" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-theme to-blue-600 bg-clip-text text-transparent text-center">
              Seller Dashboard
            </h1>
            <p className="text-slate-500 text-center">
              Enter your credentials to access your store
            </p>
          </div>

          {error && (
            <div className="mx-8 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form action={handleSubmit} className="p-8 pt-0 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Mail size={16} className="text-slate-500" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                required
                className="border-slate-300 focus:ring-theme focus:border-theme"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Lock size={16} className="text-slate-500" />
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-theme hover:text-theme/80 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="border-slate-300 focus:ring-theme focus:border-theme"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="rounded text-theme focus:ring-theme"
              />
              <label htmlFor="remember" className="text-sm text-slate-600">
                Remember me for 30 days
              </label>
            </div>
            <div className="pt-2 flex flex-col space-y-4">
              <Button
                className="w-full bg-theme hover:bg-theme/90 text-theme-text py-6 flex items-center justify-center gap-2 rounded-lg transition-all transform hover:translate-y-[-2px]"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
                {!isLoading && <ArrowRight size={18} />}
              </Button>
              <div className="relative flex items-center py-3">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="mx-3 text-slate-400 text-sm">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <Button
                className="w-full py-6 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 flex items-center justify-center gap-2 rounded-lg transition-all"
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Continue with Google
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-theme hover:underline transition-colors"
                >
                  Register now
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:flex flex-1 flex-col justify-center items-center p-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-6 text-slate-800">
            Grow your business with our seller platform
          </h2>

          <div className="grid gap-6 mb-8">
            <div className="bg-white/90 p-6 rounded-xl shadow-sm flex gap-4 items-start transform transition-all hover:translate-y-[-4px] hover:shadow-md">
              <div className="bg-theme/10 p-3 rounded-full">
                <CheckCircle size={24} className="text-theme" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Streamlined Management
                </h3>
                <p className="text-slate-600">
                  Manage your inventory, orders, and customer relationships all
                  in one place.
                </p>
              </div>
            </div>

            <div className="bg-white/90 p-6 rounded-xl shadow-sm flex gap-4 items-start transform transition-all hover:translate-y-[-4px] hover:shadow-md">
              <div className="bg-theme/10 p-3 rounded-full">
                <CheckCircle size={24} className="text-theme" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Secure Transactions
                </h3>
                <p className="text-slate-600">
                  Built with security at the forefront, ensuring your data and
                  payments are safe.
                </p>
              </div>
            </div>
          </div>

          <div className="space-x-4 flex items-center justify-center">
            <Link
              href="/signup"
              className="text-center bg-theme text-white py-4 px-6 rounded-lg font-medium hover:bg-theme/80 transition-all"
            >
              Start Selling Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
