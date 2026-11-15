"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase, hasSupabaseConfig } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const configured = hasSupabaseConfig();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const { data: admin, error: adminError } = await supabase
        .from("admin_users").select("user_id").eq("user_id", data.user.id).maybeSingle();
      if (adminError || !admin) {
        await supabase.auth.signOut();
        throw new Error("এই অ্যাকাউন্টে Admin অনুমতি নেই। সাইটের মালিকের সঙ্গে যোগাযোগ করুন।");
      }
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  }

  return <main className="admin-shell">
    <section className="admin-login-card">
      <Link href="/" className="admin-brand">SHAHIN4L <span>CONTROL ROOM</span></Link>
      <p className="eyebrow eyebrow-light">PRIVATE ACCESS</p>
      <h1>Welcome back.</h1>
      <p className="admin-muted">Sign in to manage published content, articles and media.</p>
      {!configured ? <div className="admin-alert">Admin login এখনো চালু হয়নি। Supabase project তৈরি করে Vercel-এর Environment Variables সেট করতে হবে। নিচের সেটআপ গাইড দেখুন।</div> : null}
      <form onSubmit={submit} className="admin-form">
        <label>Email address<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /></label>
        <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password" /></label>
        <button className="button" disabled={!configured || busy}>{busy ? "Signing in…" : "Sign in securely"}</button>
      </form>
      {message ? <p className="admin-error" role="alert">{message}</p> : null}
      <Link href="/admin#setup" className="admin-help">Admin setup instructions</Link>
      <Link href="/" className="admin-back">← Back to website</Link>
    </section>
  </main>;
}
