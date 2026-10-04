import { Suspense } from "react";
import { LoginForm } from "@/features/auth/LoginForm";

export const metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-ink">Welcome back</h1>
      <p className="mt-2 text-ink-soft">Log in to your Travel Panda account.</p>
      <div className="panel mt-8 rounded-3xl p-6">
        <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-mist/70" />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
